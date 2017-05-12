import {
  except, create, assign,
  iterateObject, iterateArray,
  isNil, isString, isArray
} from '../../utils';
import { isDocument } from '../Elem';
import { Elem } from '../../Elem';
import { SVG_NS, blocks, mixins } from '../../constants';
import { cleanProperty } from './cleanProperty';
import { calculateAttrs } from './calculateAttrs';
import { normalizeArgs } from './normalizeArgs';
import { constructPrivateScope } from './constructPrivateScope';
import { constructPublicScope } from './constructPublicScope';
import { isInstanceOf } from './isInstanceOf';
import { InternalMixin } from './InternalMixin';
import { Block } from '../../Block';
import { Mixin } from '../../Mixin';

const emptyArray = [];

export function createBlock({ node, parent, parentElem, parentBlock, parentScope, parentTemplate, prevBlock }) {
  const doc = isDocument(parentElem[0])
    ? parentElem
    : new Elem(parentElem[0].ownerDocument);
  const args = node.args || {};
  const { type } = node;
  const isElements = type === blocks.Elements;
  let { children } = node;
  let constructor = !isString(type) && type;
  let DynamicBlockArgs;

  if (type === blocks.DynamicBlock) {
    DynamicBlockArgs = except(args, 'type');
  }

  if (isArray(constructor)) {
    constructor = class extends Block {
      static html = constructor;
    };
  }

  if (!isInstanceOf(Block, constructor) && !isString(type)) {
    throw new Error(`Wrong block type given: ${ type }`);
  }

  if (!constructor) {
    const { value } = node;
    const elem = (
      parentElem[0].namespaceURI === SVG_NS
        ? doc.create('svg')
        : doc
    ).create(type);
    const currentAttrs = create(null);
    const currentMixins = create(null);
    let attrs = create(null);
    let wasRest;
    const attrsChain = [attrs];

    iterateObject(args, (value, attr) => {
      const isRest = value.mixin === mixins.Rest;
      const localAttrs = isRest || wasRest
        ? create(attrs)
        : attrs;

      if (attrs !== localAttrs) {
        attrsChain.push(localAttrs);
      }

      attrs = localAttrs;

      if (isRest) {
        const restAttrs = parentScope.$$.evaluate(value, (value) => {
          iterateObject(localAttrs, cleanProperty);
          assign(localAttrs, value);
          calculateAttrs({
            newAttrs: normalizeArgs(attrsChain),
            currentAttrs,
            currentMixins,
            elem,
            parentBlock,
            firstTime: false
          });
        }, parentBlock);

        wasRest = true;

        return assign(localAttrs, restAttrs);
      }

      wasRest = false;

      if (isInstanceOf(Mixin, value.mixin)) {
        localAttrs[attr] = new InternalMixin({
          Mixin: value.mixin,
          args: value.args,
          parentScope,
          parentTemplate,
          value
        });

        return;
      }

      localAttrs[attr] = parentScope.$$.evaluate(value, (value) => {
        localAttrs[attr] = value;
        calculateAttrs({
          newAttrs: normalizeArgs(attrsChain),
          currentAttrs,
          currentMixins,
          elem,
          parentBlock,
          firstTime: false
        });
      }, parentBlock);
    });

    parentBlock.$$.mixinsToBuild.push(calculateAttrs({
      newAttrs: normalizeArgs(attrsChain),
      currentAttrs,
      currentMixins,
      elem,
      parentBlock,
      firstTime: true
    }));

    if (type === '#comment') {
      elem.text(value);
    }

    if (type === '#text') {
      let text = parentScope.$$.evaluate(value, (value) => {
        if (isNil(value)) {
          value = '';
        }

        elem.text(`${ value }`);
      }, parentBlock);

      if (isNil(text)) {
        text = '';
      }

      elem.text(`${ text }`);
    }

    const isParentBlock = parent instanceof Block;
    const childBlocks = [];

    /* istanbul ignore if */
    if (type === 'iframe' && !('src' in attrs)) {
      elem.on('load', () => {
        const document = elem[0].contentDocument;
        const doc = new Elem(document);

        new Elem(document.documentElement).remove();
        iterateChildren(childBlocks, true);

        function iterateChildren(children, isRoot) {
          iterateArray(children, (child) => {
            if (child instanceof Block) {
              if (isRoot) {
                child.$$.parentElem = doc;
                child.$$.parent = doc;
                child.$$.content.into(doc);
              }

              iterateChildren(child.$$.children, false);
            } else {
              child.into(doc);
            }
          });
        }
      });
    }

    if (prevBlock instanceof Block) {
      prevBlock.$$.insertAfterIt(elem, false);
    } else if (prevBlock) {
      elem.insertAfter(prevBlock);

      if (isParentBlock) {
        parent.$$.addContent(elem);
      }
    } else if (isParentBlock) {
      parent.$$.insertInStartOfIt(elem, false);
    } else {
      elem.into(parentElem, false);
    }

    if (children) {
      let prevBlock;
      let parentElem = elem;

      /* istanbul ignore if */
      if (type === 'template') {
        parentElem = new Elem(elem[0].content = elem[0].content || doc[0].createDocumentFragment());
      } else if (type === 'iframe') {
        if ('src' in attrs) {
          children = emptyArray;
        } else {
          const document = elem[0].contentDocument;

          new Elem(document.documentElement).remove();

          parentElem = new Elem(document);
        }
      }

      iterateArray(children, (child) => {
        prevBlock = createBlock({
          node: child,
          parent: parentElem,
          parentElem,
          parentBlock,
          parentScope,
          parentTemplate,
          prevBlock
        });
        childBlocks.push(prevBlock);
      });
    }

    return elem;
  }

  const blockInstance = new constructor({
    args,
    DynamicBlockArgs,
    children,
    parent,
    parentElem,
    parentBlock,
    parentScope,
    parentTemplate,
    prevBlock
  });
  const {
    $$,
    $$: { name },
    args: Args,
    globals,
    ...locals
  } = blockInstance;

  const html = isElements
    ? Args.value || []
    : constructor.html;

  $$.args = constructPrivateScope(Args);
  $$.locals = constructPrivateScope(locals);
  $$.globals = constructPrivateScope(globals, 'globals', parentScope);

  if (type === blocks.Item) {
    const scopeValues = {
      [node.itemName]: node.item,
      [node.indexName]: node.index
    };
    const scope = parentScope.$$.Constructor === blocks.Item
      ? parentScope.$$.scope
      : parentScope;

    $$.privateScope = constructPrivateScope(scopeValues);
    constructPublicScope($$.scope = create(scope), scopeValues, $$.privateScope);
  }

  constructPublicScope(Args, Args, $$.args);
  constructPublicScope(globals, globals, $$.globals);
  constructPublicScope(blockInstance, locals, $$.locals);

  try {
    blockInstance.afterConstruct();
  } catch (err) {
    console.error(`Uncaught error in ${ name }#afterConstruct:`, err);
  }

  prevBlock = undefined;
  parentScope = isElements
    ? Args.parentScope
    : blockInstance;
  parentTemplate = isElements
    ? Args.parentTemplate
    : blockInstance;

  iterateArray(html, (child) => {
    prevBlock = createBlock({
      node: child,
      parent: blockInstance,
      parentElem,
      parentBlock: blockInstance,
      parentScope,
      parentTemplate,
      prevBlock
    });
  });

  blockInstance.$$.isRendered = true;

  iterateArray(blockInstance.$$.mixinsToBuild, (executeBuilders) => {
    executeBuilders();
  });
  blockInstance.$$.mixinsToBuild = [];

  try {
    blockInstance.afterRender();
  } catch (err) {
    console.error(`Uncaught error in ${ name }#afterRender:`, err);
  }

  return blockInstance;
}
