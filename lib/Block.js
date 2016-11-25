/**
 * @module Block
 * @private
 * @mixin
 * @description Exports Block class.
 */

import { Arr } from './Arr';
import { find, doc, Elem } from './Elem';
import { Super } from './Super';
import {
  iterate, defineProperties, validate,
  isFunction, isNil, isUndefined
} from './helpers';
import * as Blocks from './blocks';
import * as Mixins from './mixins';
import { htmlAllowedTagSymbols, htmlAllowedAttrSymbols } from './constants';
import markupToJSON from './helpers/markupToJSON';

/**
 * @callback Watcher
 * @param {*} newValue - New value.
 * @param {*} oldValue - Old value.
 */

const blocks = Object.create(null);
const mixins = Object.create(null);
const isPrototypeOf = {}.isPrototypeOf;
const tagName = new RegExp(`^${ htmlAllowedTagSymbols }$`, 'i');
const attrName = new RegExp(`^${ htmlAllowedAttrSymbols }$`);
const { document } = global;
const svgNS = 'http://www.w3.org/2000/svg';
let evalMode;
let getting;

/**
 * @class Block
 * @public
 * @param {Object} opts - Element options.
 * @returns {Block} Instance of Block.
 * @description Class for dynamic templating.
 *
 * @example
 * import { D, Block, initApp, registerBlock } from 'dwayne';
 *
 * class App extends Block {
 *   static template = '<Hello text="{text}"/>';
 *
 *   constructor(args, children) {
 *     super(args, children);
 *
 *     this.text = 'world (0)';
 *     this.times = 0;
 *
 *     this.setInterval();
 *   }
 *
 *   setInterval() {
 *     D(1000).interval(() => {
 *       this.text = `world (${ ++this.times })`;
 *     });
 *   }
 * }
 *
 * class Hello extends Block {
 *   static template = 'Hello, <d-text value="{args.text}"/>!';
 * }
 *
 * Block.App = App;
 * Block.Hello = Hello;
 *
 * initApp();
 */
class Block {
  /**
   * @member {Boolean} [Block.collapseWhiteSpace = true]
   * @type {Boolean}
   * @public
   * @description If the whitespace between html elements and
   * in the start and the end inside the tag should be omitted during parsing.
   */
  static collapseWhiteSpace = true;

  /**
   * @member {Object} [Block.defaultArgs = true]
   * @type {Object}
   * @public
   * @description Provide default args if that args may not appear in the args
   * (using "d-rest") but you use them in your template and want them to be watched.
   */
  static defaultArgs = {};

  constructor(opts) {
    const {
      name,
      args: originalArgs,
      children,
      parent,
      parentBlock,
      parentScope
    } = opts;
    const watchersToRemove = new Arr([]);

    Object.defineProperties(this, {
      /**
       * @member {Block} Block#$
       * @type {Block}
       * @public
       * @description This.
       */
      $: {
        value: this
      },

      /**
       * @member {Object} Block#$$
       * @type {Object}
       * @protected
       * @property {Object} args - Private args scope.
       * @property {Arr} children - Child blocks.
       * @property {Arr} mixins - Child mixins.
       * @property {Object} elems - Elements connected to the block.
       * @property {Elem} elems.parent - Parent element.
       * @property {Elem} elems.start - Start comment block.
       * @property {Elem} elems.end - End comment block.
       * @property {Elem} elems.content - Content elements.
       * @property {Function} evaluate - Evaluate function.
       * @property {Object} global - Private global scope.
       * @property {Object} locals - Private locals scope.
       * @property {Arr} watchersToRemove - Watchers to remove before removing element.
       */
      $$: {
        value: {
          name,
          originalArgs,
          parent: parentScope,
          parentBlock,
          children: new Arr([]),
          mixins: new Arr([]),
          elems: {
            start: doc.createComment(` ${ name }: start `),
            end: doc.createComment(` ${ name }: end `),
            content: new Elem(),
            parent
          },
          watchersToRemove,
          evaluate: (expression, onChange, instance) => {
            if (/^\{[\s\S]+\}$/.test(expression)) {
              expression = expression.replace(/^\{|\}$/g, '');
            } else {
              expression = /"/.test(expression)
                ? `'${ expression }'`
                : `"${ expression }"`;
            }

            /* eslint no-new-func: 0 */
            const { watchersToRemove } = instance ? instance.$$ : {};
            const func = new Function('', `
              with (document.DwayneStore) {
                try {
                  $$.expr = eval($$.expr);
                  return $$.expr;
                } catch (err) {}
              }
            `);

            return evaluate.call(this);

            function evaluate() {
              if (onChange) {
                evalMode = true;
                getting = new Arr([]);
              }

              this.$$.expr = expression;
              document.DwayneStore = this;

              const result = func();

              if (onChange) {
                getting.forEach((watchers) => {
                  const watcher = () => {
                    const newResult = evaluate.call(this);

                    if (newResult !== result) {
                      onChange(newResult, result);
                    }
                  };
                  const watcherBlock = {
                    watcher,
                    watchers
                  };

                  watcher.onRemove = () => {
                    const index = watchersToRemove.indexOf(watcherBlock);

                    if (index !== -1) {
                      watchersToRemove.splice(index, 1);
                    }
                  };

                  watchersToRemove.push(watcherBlock);
                  watchers.push(watcher);
                });

                evalMode = false;
                getting = new Arr([]);
              }
              this.$$.expr = null;
              document.DwayneStore = null;

              return result;
            }
          }
        }
      }
    });

    const args = new Super(originalArgs).map((value, arg) => (
      parentScope.$$.evaluate(value, (value) => {
        this.args[arg] = value;
      }, this)
    )).$;

    this.args = args;
    this.children = children || new Arr([]);
    this.global = parentBlock ? Object.create(parentBlock.global) : {};

    new Super(this)
      .proto()
      .forEach((func, prop) => {
        this[prop] = func;
      });

    this.$$.elems.start.$[0].DwayneBlock = this;
    this.$$.elems.end.$[0].DwayneBlock = this;

    if (parentBlock) {
      parentBlock.$$.children.push(this);
    }
  }

  afterConstruct() {}

  afterRender() {}

  beforeRemove() {}

  evaluateAndWatch(expression, callback) {
    return this.$$.parent.$$.evaluate(expression, callback, this);
  }

  evaluateOnce(expression) {
    return this.$$.parent.$$.evaluate(expression);
  }

  /**
   * @method Block#remove
   * @public
   * @description Method fot forcing the block to be removed. Calls
   * remove method for all of its child blocks and calls beforeRemove function.
   */
  remove(isParentSignal) {
    const {
      parentBlock,
      children,
      mixins,
      elems: {
        start,
        content,
        end
      },
      watchersToRemove
    } = this.$$;

    watchersToRemove.forEach(({ watcher, watchers }) => {
      const index = watchers.indexOf(watcher);

      if (index !== -1) {
        watchers.splice(index, 1);
      }
    });

    children.forEach((child) => {
      child.remove(true);
    });

    mixins.forEach((mixin) => {
      mixin.remove(true);
    });

    try {
      this.beforeRemove();
    } catch (err) {
      console.error('Uncaught error in beforeRemove:', err);
    }

    if (!isParentSignal && parentBlock) {
      const index = parentBlock.$$.children.indexOf(this);

      if (index !== -1) {
        parentBlock.$$.children.splice(index, 1);
      }
    }

    new Elem([
      start,
      content,
      end
    ]).remove();
  }

  /**
   * @method Block#watchArgs
   * @public
   * @param {String} arg - Arg to watch.
   * @param {Watcher} watcher - Called when watched args are changed.
   */
  watchArgs(arg, watcher) {
    validate([arg, watcher], ['string', 'function'], 'Block#watchArgs');

    this.$$.args[arg].watchers.perm.push(watcher);
  }

  /**
   * @method Block#watchLocals
   * @public
   * @param {String} local - Local variable to watch.
   * @param {Watcher} watcher - Called when watched locals are changed.
   */
  watchLocals(local, watcher) {
    validate([local, watcher], ['string', 'function'], 'Block#watchLocals');

    this.$$.locals[local].watchers.perm.push(watcher);
  }
}

registerBuiltIns(Blocks, Block);

class Mixin {
  static evaluate = true;

  constructor(opts) {
    const {
      value,
      elem,
      match,
      parentBlock,
      parentScope
    } = opts;

    Object.defineProperties(this, {
      $$: {
        value: {
          _value: value,
          parent: parentScope,
          parentBlock,
          watchersToRemove: new Arr([])
        }
      }
    });

    this.match = new Arr(match).slice(1).$;
    this.elem = elem;

    if (new Super(this).proto().$.constructor.evaluate) {
      this.value = this.evaluateAndWatch((newValue, oldValue) => {
        this.value = newValue;

        try {
          this.afterUpdate(newValue, oldValue);
        } catch (err) {
          console.error(`Uncaught error in ${ name }#onUpdate:`, err);
        }
      });

      this.afterUpdate(this.value);
    }

    if (parentBlock) {
      parentBlock.$$.mixins.push(this);
    }
  }

  afterUpdate() {}

  beforeRemove() {}

  evaluateAndWatch(callback) {
    const {
      _value,
      parent
    } = this.$$;

    return parent.$$.evaluate(_value, callback, this);
  }

  evaluateOnce() {
    const {
      _value,
      parent
    } = this.$$;

    return parent.$$.evaluate(_value);
  }

  /**
   * @method Mixin#remove
   * @public
   * @description Method fot forcing the mixin to be removed.
   */
  remove(isParentSignal) {
    const {
      parentBlock,
      watchersToRemove
    } = this.$$;

    watchersToRemove.forEach(({ watcher, watchers }) => {
      const index = watchers.indexOf(watcher);

      if (index !== -1) {
        watchers.splice(index, 1);
      }
    });

    try {
      this.beforeRemove();
    } catch (err) {
      console.error('Uncaught error in beforeRemove:', err);
    }

    if (!isParentSignal && parentBlock) {
      const index = parentBlock.$$.mixins.indexOf(this);

      if (index !== -1) {
        parentBlock.$$.mixins.splice(index, 1);
      }
    }
  }
}

registerBuiltIns(Mixins, Mixin);

function initApp() {
  const root = find('d-root').first();

  if (!root.length) {
    throw new Error('No d-root element is found! (initApp)');
  }

  iterate(Block, (Block, name) => {
    if (name === 'collapseWhiteSpace' || name === 'defaultArgs') {
      return;
    }

    if (!isFunction(Block)) {
      console.warn(`The "${ name }" block is not a function and will not be registered (initApp)`);

      return;
    }

    if (!tagName.test(name)) {
      console.warn(`Name "${ name }" is not allowed for blocks so the block will not be registered (initApp)`);

      return;
    }

    if (!isInstanceOfBlock(Block)) {
      console.warn(`The "${ name }" block does not extend Block and will not be registered (initApp)`);

      return;
    }

    blocks[name] = Block;

    defineProperties(Block, {
      _html: deepCloneChildren(
        markupToJSON(
          `${ Block.template || '' }`,
          Block.collapseWhiteSpace
        )
      )
    });
  });

  iterate(Mixin, (Mixin, name) => {
    if (name === 'evaluate') {
      return;
    }

    if (!isFunction(Mixin)) {
      console.warn(`The "${ name }" mixin is not a function and will not be registered (initApp)`);

      return;
    }

    if (!attrName.test(name)) {
      console.warn(`Name "${ name }" is not allowed for mixins so the mixin will not be registered (initApp)`);

      return;
    }

    if (!isInstanceOfMixin(Mixin)) {
      console.warn(`The "${ name }" mixin does not extend Mixin and will not be registered (initApp)`);

      return;
    }

    mixins[name] = Mixin;

    defineProperties(Mixin, {
      _match: new RegExp(`^${ name }(?:-([\\s\\S]+))?$`)
    });
  });

  const block = root.attr('block');

  if (!blocks[block]) {
    throw new Error(`No "${ block }" block is registered! (initApp)`);
  }

  const replacement = doc.createComment(' d-root: start ');

  replacement.add(doc.createComment(' d-root: end '));

  root.replace(replacement);

  createBlock({
    node: {
      name: block,
      attrs: {},
      children: new Arr([])
    },
    after: replacement.first(),
    parent: root.parent(),
    args: {}
  });
}

function registerBuiltIns(set, proto) {
  iterate(set, (register) => {
    const {
      name,
      value
    } = register(proto, createBlock);

    Object.defineProperty(proto, name, {
      value,
      enumerable: true
    });
  });
}

function createBlock({ Block: constructor, node, after, parent, parentBlock, parentScope }) {
  const name = (node && node.name) || 'UnknownBlock';
  const args = (node && node.attrs) || {};
  const children = (node && node.children) || new Arr([]);
  const elem = parent.prop('namespaceURI') === svgNS
    ? doc.svg()
    : new Elem(doc.template().$[0].content);
  let dBlockMatch;

  parentScope = (node && node.block) || parentScope;
  constructor = constructor || (node && node.name ? blocks[node.name] : null);

  if (!children.length && (dBlockMatch = name.match(/^d-block-([\s\S]+)$/) || name === 'd-block')) {
    constructor = blocks['d-block'];

    args.name = dBlockMatch ? dBlockMatch[1] : null;
  }

  if (!constructor) {
    const {
      value,
      children
    } = node;
    const element = elem.create(name);

    const attrs = new Super(args).object((object, value, attr) => {
      const match = iterate(mixins, (Mixin, name) => {
        const match = attr.match(Mixin._match);

        if (match) {
          return {
            match,
            name
          };
        }
      });

      if (match) {
        return createMixin({
          name: match.name,
          match: match.match,
          value,
          elem: element,
          parentBlock,
          parentScope
        });
      }

      object[attr] = parentScope.$$.evaluate(value, (value) => {
        element.attr(attr, value);
      }, parentBlock);
    }).$;

    if (!isNil(value)) {
      element.text(value);
    }

    if (attrs) {
      element.attr(attrs);
    }

    if (after.length) {
      element.insertAfter(after);
    } else {
      element.into(parent);
    }

    after = new Elem();

    if (children) {
      transformDIfChildren(children).forEach((child) => {
        const block = createBlock({
          node: child,
          after,
          parent: element,
          parentBlock,
          parentScope
        });

        if (block instanceof Block) {
          after = block.$$.elems.end;
        } else {
          after = block;
        }
      });
    }

    return element;
  }

  const blockInstance = new constructor({
    name,
    args,
    children,
    parent,
    parentBlock,
    parentScope
  });

  const html = name === 'd-elements'
    ? new Arr(blockInstance.args.value || [])
    : deepCloneChildren(constructor._html, blockInstance);

  const {
    $$,
    args: Args,
    global,
    ...locals
  } = blockInstance;
  const eventualArgs = {
    ...Args,
    ...constructor.defaultArgs
  };

  delete locals.$;
  delete locals.$$;

  $$.args = constructPrivateScope(eventualArgs);
  $$.locals = constructPrivateScope(locals);
  $$.global = constructPrivateScope(global);

  constructPublicScope(Args, eventualArgs, blockInstance.$$.args);
  constructPublicScope(global, global, blockInstance.$$.global);
  constructPublicScope(blockInstance, locals, blockInstance.$$.locals);

  try {
    blockInstance.afterConstruct();
  } catch (err) {
    console.error(`Uncaught error in ${ name }#afterConstruct:`, err);
  }

  const block = new Elem([
    $$.elems.start,
    $$.elems.end
  ]);

  if (after.length) {
    block.insertAfter(after);
  } else {
    block.into(parent);
  }

  after = $$.elems.start;

  // console.log(blockInstance);

  transformDIfChildren(html).forEach((child) => {
    const block = createBlock({
      node: child,
      after,
      parent,
      parentBlock: blockInstance,
      parentScope
    });

    if (block instanceof Block) {
      const { elems } = block.$$;

      after = elems.end;

      $$.elems.content.add(elems.start, elems.content, elems.end);
    } else {
      after = block;

      $$.elems.content.add(block);
    }
  });

  try {
    blockInstance.afterRender();
  } catch (err) {
    console.error(`Uncaught error in ${ name }#afterRender:`, err);
  }

  return blockInstance;
}

function createMixin({ name, value, match, elem, parentBlock, parentScope }) {
  const Mixin = mixins[name];

  new Mixin({
    value,
    match,
    elem,
    parentBlock,
    parentScope
  });
}

function deepCloneChildren(children, block) {
  return new Arr(children || []).map((child) => {
    const {
      name,
      attrs,
      value,
      children
    } = child;
    const newChild = {
      name,
      value,
      attrs: { ...attrs }
    };

    if (block) {
      newChild.block = block;
    }

    if (children) {
      newChild.children = deepCloneChildren(children, block);
    }

    return newChild;
  });
}

function transformDIfChildren(children) {
  return new Arr(children || [])
    .concat({})
    .object((object, child) => {
      const { name } = child;
      const {
        html,
        ifElse
      } = object;

      if (name !== 'd-else-if' && name !== 'd-else') {
        if (ifElse) {
          html.push({
            name: 'd-if',
            block: ifElse.$[0].block,
            children: ifElse
          });

          object.ifElse = null;
        }

        if (name === 'd-if') {
          object.ifElse = new Arr([child]);
        } else if (!isUndefined(name)) {
          html.push(child);
        }
      } else {
        (ifElse || html).push(child);

        if (name === 'd-else' && ifElse) {
          html.push({
            name: 'd-if',
            block: ifElse.$[0].block,
            children: ifElse
          });

          object.ifElse = null;
        }
      }
    }, {
      html: new Arr([]),
      ifElse: null
    }).$.html;
}

function isInstanceOfBlock(block) {
  return isPrototypeOf.call(Block, block) && isPrototypeOf.call(Block.prototype, block.prototype);
}

function isInstanceOfMixin(mixin) {
  return isPrototypeOf.call(Mixin, mixin) && isPrototypeOf.call(Mixin.prototype, mixin.prototype);
}

function constructPrivateScope(object) {
  return new Super(object).map((value) => ({
    value,
    watchers: {
      temp: new Arr([]),
      perm: new Arr([])
    }
  })).$;
}

function constructPublicScope(scope, scopeValues, privateScope) {
  new Super(scope).define(new Super(scopeValues).map((value, key) => {
    const scope = privateScope[key];

    return {
      get() {
        if (evalMode) {
          if (getting.indexOf(scope.watchers.temp) === -1) {
            getting.push(scope.watchers.temp);
          }
        }

        return scope.value;
      },
      set(value) {
        if (value === scope.value) {
          return;
        }

        const oldTempWatchers = scope.watchers.temp;
        const oldValue = scope.value;

        scope.watchers.temp = new Arr([]);
        scope.value = value;

        oldTempWatchers.forEach((watcher) => {
          watcher.onRemove();
          watcher();
        });
        scope.watchers.perm.forEach((watcher) => {
          watcher(value, oldValue);
        });
      }
    };
  }).$);
}

export { Block, Mixin, initApp };
