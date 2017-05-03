import {
  except, create, assign,
  iterateObject, iterateArray,
  isNil
} from '../../utils';
import { isDocument } from '../Elem';
import { Elem } from '../../Elem';
import {
  SVG_NS, D_REST_REGEX
} from '../../constants';
import { cleanProperty } from './cleanProperty';
import { transformRestAttrs } from './transformRestAttrs';
import { calculateAttrs } from './calculateAttrs';
import { normalizeArgs } from './normalizeArgs';
import { mixinMatch } from './mixinMatch';
import { constructPrivateScope } from './constructPrivateScope';
import { constructPublicScope } from './constructPublicScope';
import { Block } from '../../Block';

const NAMED_D_BLOCK_REGEX = /^d-block:([\s\S]+)$/;
const emptyArray = [];

export function createBlock({ node, parent, parentElem, parentBlock, parentScope, parentTemplate, prevBlock }) {
  const doc = isDocument(parentElem[0])
    ? parentElem
    : new Elem(parentElem[0].ownerDocument);
  const elem = parentElem[0].namespaceURI === SVG_NS
    ? doc.create('svg')
    : doc;
  const localBlocks = parentTemplate ? parentTemplate.$$.ns._blocks : Block._blocks;
  const localMixins = parentTemplate ? parentTemplate.$$.ns._mixins : Block._mixins;
  const args = node.attrs || {};
  const name = node.name || 'UnknownBlock';
  let { children } = node;
  let constructor = node.Constructor || (node.name && localBlocks[node.name]);
  let dBlockMatch;
  let dBlockName;
  let dBlockArgs;

  if (name === 'd-block' && args.name) {
    dBlockArgs = except(args, 'name');
  } else if (name === 'd-block' && args.Constructor) {
    dBlockArgs = except(args, 'Constructor');
  } else if ((dBlockMatch = name.match(NAMED_D_BLOCK_REGEX)) || name === 'd-block') {
    constructor = Block._blocks['d-block'];
    dBlockName = dBlockMatch ? dBlockMatch[1] : null;
  }

  let blockInstance;

  if (constructor) {
    try {
      blockInstance = new constructor({
        name,
        args,
        dBlockName,
        dBlockArgs,
        children,
        parent,
        parentElem,
        parentBlock,
        parentScope,
        parentTemplate,
        prevBlock
      });
    } catch (err) {
      console.error(`Uncaught error in new ${ name }:`, err);
      constructor = null;
    }
  }

  if (!constructor) {
    const { value } = node;

    const element = elem.create(name);
    const currentAttrs = create(null);
    let attrs = create(null);
    let wasDRest;
    const attrsChain = [attrs];
    const mixinDefaultOpts = {
      elem: element,
      parentBlock,
      parentScope,
      parentTemplate
    };

    iterateObject(args, (value, attr) => {
      const isDRest = D_REST_REGEX.test(attr);
      const localAttrs = isDRest || wasDRest
        ? create(attrs)
        : attrs;

      if (attrs !== localAttrs) {
        attrsChain.push(localAttrs);
      }

      attrs = localAttrs;

      if (isDRest) {
        const restAttrs = parentScope.$$.evaluate(value, (value) => {
          iterateObject(localAttrs, cleanProperty);
          assign(localAttrs, transformRestAttrs(
            value,
            localMixins,
            mixinDefaultOpts
          ));
          calculateAttrs(normalizeArgs(attrsChain), attrs, currentAttrs, element, false);
        }, parentBlock);

        wasDRest = true;

        return assign(localAttrs, transformRestAttrs(
          restAttrs, localMixins, mixinDefaultOpts
        ));
      }

      const match = mixinMatch(localMixins, attr);

      wasDRest = false;

      if (match) {
        localAttrs[attr] = {
          type: 'mixin',
          dynamic: false,
          opts: {
            value,
            ...match,
            ...mixinDefaultOpts
          },
          value
        };

        return;
      }

      localAttrs[attr] = {
        type: 'attr',
        value: parentScope.$$.evaluate(value, (value) => {
          localAttrs[attr] = {
            type: 'attr',
            value
          };
          calculateAttrs(normalizeArgs(attrsChain), attrs, currentAttrs, element, false);
        }, parentBlock)
      };
    });

    parentBlock.$$.mixinsToBuild.push(calculateAttrs(normalizeArgs(attrsChain), attrs, currentAttrs, element, true));

    if (name === '#comment') {
      element.text(value);
    }

    if (name === '#text') {
      let text = parentScope.$$.evaluate(value, (value) => {
        if (isNil(value)) {
          value = '';
        }

        element.text(`${ value }`);
      }, parentBlock);

      if (isNil(text)) {
        text = '';
      }

      element.text(`${ text }`);
    }

    const isParentBlock = parent instanceof Block;
    const childBlocks = [];

    /* istanbul ignore if */
    if (name === 'iframe' && !('src' in attrs)) {
      element.on('load', () => {
        const document = element[0].contentDocument;
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
      prevBlock.$$.insertAfterIt(element, false);
    } else if (prevBlock) {
      element.insertAfter(prevBlock);

      if (isParentBlock) {
        parent.$$.addContent(element);
      }
    } else if (isParentBlock) {
      parent.$$.insertInStartOfIt(element, false);
    } else {
      element.into(parentElem, false);
    }

    if (children) {
      let prevBlock;
      let parentElem = element;

      /* istanbul ignore if */
      if (name === 'template') {
        parentElem = new Elem(element[0].content = element[0].content || doc[0].createDocumentFragment());
      } else if (name === 'iframe') {
        if ('src' in attrs) {
          children = emptyArray;
        } else {
          const document = element[0].contentDocument;

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

    return element;
  }

  const {
    $$,
    args: Args,
    globals,
    ...locals
  } = blockInstance;

  const html = name === 'd-elements'
    ? Args.value || []
    : constructor.template.value || constructor.template;

  $$.args = constructPrivateScope(Args);
  $$.locals = constructPrivateScope(locals);
  $$.globals = constructPrivateScope(globals, 'globals', parentScope);

  if (name === '#d-item') {
    const scopeValues = {
      [node.itemName]: node.item,
      [node.indexName]: node.index
    };
    const scope = parentScope.$$.name === '#d-item'
      ? parentScope.$$.scope
      : parentScope;

    $$.ns = parentScope.$$.ns;
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
  parentScope = name === 'd-elements'
    ? Args.parentScope
    : blockInstance;
  parentTemplate = name === 'd-elements'
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
