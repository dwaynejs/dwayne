import {
  except, create, assign,
  iterateObject, iterateArray,
  isNil
} from '../../utils';
import { Elem } from '../../Elem';
import {
  SVG_NS, D_REST_REGEX
} from '../../constants';
import { cleanProperty } from './cleanProperty';
import { transformRestAttrs } from './transformRestAttrs';
import { calculateAttrs } from './calculateAttrs';
import { mixinMatch } from './mixinMatch';
import { constructPrivateScope } from './constructPrivateScope';
import { constructPublicScope } from './constructPublicScope';
import { Block } from '../../Block';

const NAMED_D_BLOCK_REGEX = /^d-block:([\s\S]+)$/;

export function createBlock({ node, Constructor, parent, parentElem, parentBlock, parentScope, parentTemplate, prevBlock }) {
  const doc = new Elem(parentElem[0].ownerDocument);
  const elem = parentElem[0].namespaceURI === SVG_NS
    ? doc.create('svg')
    : doc;
  const localBlocks = parentTemplate ? parentTemplate.$$.ns._blocks : Block._blocks;
  const localMixins = parentTemplate ? parentTemplate.$$.ns._mixins : Block._mixins;
  let children = node.children = node.children || [];
  let args = node.attrs = node.attrs || {};
  let name = node.name || 'UnknownBlock';
  let constructor = Constructor || (node.name && localBlocks[node.name]);
  let dBlockMatch;
  let dBlockName;
  let dBlockArgs;
  let dBlockChildren;
  let dElementsName;
  let dElementsConstructor;

  if (name === 'd-block' && args.name) {
    name = 'd-elements';
    constructor = localBlocks[name];
    dElementsName = args.name;
    dBlockArgs = except(args, 'name');
    dBlockChildren = children;
    children = [];
    args = {};
  } else if (name === 'd-block' && args.Constructor) {
    name = 'UnknownBlock';
    constructor = localBlocks[name];
    dElementsConstructor = args.Constructor;
    dBlockArgs = except(args, 'Constructor');
    dBlockChildren = children;
    children = [];
    args = {};
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
    const {
      value,
      children
    } = node;

    const element = elem.create(name);
    const currentAttrs = create(null);
    let attrs = create(null);
    let wasDRest;
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

      attrs = localAttrs;

      if (isDRest) {
        const restAttrs = parentScope.$$.evaluate(value, (value) => {
          setTimeout(() => {
            iterateObject(localAttrs, cleanProperty);
            assign(localAttrs, transformRestAttrs(
              value, localMixins, mixinDefaultOpts
            ));
            calculateAttrs(attrs, currentAttrs, element, false);
          }, 0);
        }, parentBlock);

        wasDRest = true;

        return assign(localAttrs, transformRestAttrs(
          restAttrs, localMixins, mixinDefaultOpts
        ));
      }

      const match = mixinMatch(localMixins, attr);

      wasDRest = false;

      if (match) {
        if (value === true) {
          value = 'true';
        }

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
          calculateAttrs(attrs, currentAttrs, element, false);
        }, parentBlock)
      };
    });

    const createMixins = calculateAttrs(attrs, currentAttrs, element, true);

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

    if (children) {
      const parentElem = name === 'template'
        ? new Elem(element[0].content)
        : element;
      let prevBlock;

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
      });
    }

    const isParentBlock = parent instanceof Block;

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

    createMixins();

    return element;
  }

  const {
    $$,
    args: Args,
    globals,
    ...locals
  } = blockInstance;

  if (dElementsName) {
    node = {
      attrs: dBlockArgs,
      children: dBlockChildren
    };
    node.name = parentScope.$$.evaluate(dElementsName, (newName) => {
      node.name = newName;

      Args.value = [node];
    }, blockInstance, true);

    Args.value = [node];
    Args.parentScope = parentScope;
    Args.parentTemplate = parentTemplate;
  }

  if (dElementsConstructor) {
    node = {
      name,
      attrs: dBlockArgs,
      children: dBlockChildren
    };

    Args.Constructor = parentScope.$$.evaluate(dElementsConstructor, (newConstructor) => {
      Args.Constructor = newConstructor;
      Args.value = [node];
    }, blockInstance, true);
    Args.value = [node];
    Args.parentScope = parentScope;
    Args.parentTemplate = parentTemplate;
  }

  const html = name === 'd-elements'
    ? Args.value || []
    : constructor._html;

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

  if (name === 'd-each') {
    $$.scope = create(parentScope.$$.name === '#d-item' ? parentScope.$$.scope : parentScope, {
      [Args.item || '$item']: {
        value: null,
        writable: true
      },
      [Args.index || '$index']: {
        value: null,
        writable: true
      }
    });
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

  try {
    blockInstance.afterRender();
  } catch (err) {
    console.error(`Uncaught error in ${ name }#afterRender:`, err);
  }

  return blockInstance;
}
