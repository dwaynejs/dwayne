/**
 * @module Block
 * @private
 * @mixin
 * @description Exports Block class.
 */

import { Arr } from './Arr';
import { doc, Elem } from './Elem';
import { Str } from './Str';
import { Super } from './Super';
import {
  iterate, validate,
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

/**
 * @callback Wrapper
 * @param {Block} Block class to wrap.
 * @returns {Block} New Block class.
 */

const rootBlocks = Object.create(null);
const rootMixins = Object.create(null);
const isPrototypeOf = {}.isPrototypeOf;
const tagName = new RegExp(`^${ htmlAllowedTagSymbols }$`, 'i');
const attrName = new RegExp(`^${ htmlAllowedAttrSymbols }$`);
const expressionRegExp = /^\{[\s\S]+\}$/;
const { document } = global;
const svgNS = 'http://www.w3.org/2000/svg';
let onEvalError = (err) => {
  console.error(`Eval error (evaluating "${ err.expression }" in context of block "${ err.block.$$.name }"):`, err);
};
let evalMode;
let getting;
let changed;

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
  static _blocks = Object.create(rootBlocks);
  static _mixins = Object.create(rootMixins);

  /**
   * @member {Boolean} [Block.collapseWhiteSpace = true]
   * @type {Boolean}
   * @public
   * @description If the whitespace between html elements and
   * in the start and the end inside the tag should be omitted during parsing.
   */
  static collapseWhiteSpace = true;

  static get onEvalError() {
    return onEvalError;
  }

  static set onEvalError(listener) {
    if (isFunction(listener)) {
      onEvalError = listener;
    } else {
      onEvalError = null;
    }
  }

  static getBlocks() {
    return new Super({ ...this._blocks });
  }

  static getMixins() {
    return new Super({ ...this._mixins });
  }

  /**
   * @method Block.register
   * @public
   * @param {String} name - Block or mixin name.
   * @param {Block|Mixin} Subclass - Subclass of Block or Mixin.
   * @returns {void}
   * @description Register block or mixin in the namespace of this.
   */
  static register(name, Subclass) {
    const _this = new Super(this);

    if (!_this.hasOwn('_blocks')) {
      Subclass._blocks = Object.create(_this.proto().$._blocks);
    }

    if (!_this.hasOwn('_mixins')) {
      Subclass._mixins = Object.create(_this.proto().$._mixins);
    }

    const {
      _blocks,
      _mixins
    } = this;

    if (!isInstanceOfBlock(Subclass) && !isInstanceOfMixin(Subclass)) {
      console.warn(`The "${ name }" class does not extend Block or Mixin and will not be registered (Block.register)`);

      return;
    }

    if (isInstanceOfBlock(Subclass)) {
      if (rootBlocks[name]) {
        console.warn(`The "${ name }" block is a built-in block so the block will not be registered (Block.register)`);

        return;
      }

      if (!tagName.test(name)) {
        console.warn(`Name "${ name }" is not allowed for blocks so the block will not be registered (Block.register)`);

        return;
      }

      Subclass._html = deepCloneChildren(
        markupToJSON(
          `${ Subclass.template || '' }`,
          Subclass.collapseWhiteSpace
        )
      );

      _blocks[name] = Subclass;
    } else {
      if (rootMixins[name]) {
        console.warn(`The "${ name }" mixin is a built-in mixin so the mixin will not be registered (Block.register)`);

        return;
      }

      if (!attrName.test(name)) {
        console.warn(`Name "${ name }" is not allowed for mixins so the mixin will not be registered (Block.register)`);

        return;
      }

      Subclass._match = new RegExp(`^${ new Str(name).escapeRegExp().$ }(?:-([\\s\\S]+))?$`);

      _mixins[name] = Subclass;
    }
  }

  /**
   * @member {String} Block.template
   * @type {String}
   * @public
   * @description Block template.
   */

  /**
   * @method Block.wrap
   * @public
   * @param {Wrapper} func - Function that returns wrapped block.
   * @returns {Block} New block.
   * @description Method for wrapping blocks into another blocks.
   * It is considered best practice to just extends the old block with a new one.
   *
   * @example
   * class MyBlock extends Block {
   *   static template = '<div>123</div>';
   * }
   *
   * MyBlock.wrap((Block) => {
   *   return class extends Block {
   *     static template = `<section class="wrapper">${ Block.template }</section>`;
   *
   *     constructor() {
   *       this.additionalVar = 'additional';
   *     }
   *   };
   * });
   */
  static wrap(func) {
    validate([func], ['function']);

    return func(this);
  }

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
          parent: parentScope,
          parentBlock,
          ns: new Super(this).proto().$.constructor,
          children: new Arr([]),
          mixins: new Arr([]),
          elems: {
            start: doc.createComment(` ${ name }: start `),
            end: doc.createComment(` ${ name }: end `),
            content: new Elem(),
            parent
          },
          watchersToRemove,
          evaluate: (expression, onChange, instance, forDElements, forDItem, forDEach) => {
            if (!expressionRegExp.test(expression)) {
              return expression || true;
            }

            forDElements = !!forDElements;
            forDItem = !!forDItem;
            expression = expression.replace(/^\{|\}$/g, '');

            const store = (name === '#d-item' && !forDItem) || forDEach
              ? (forDEach || this).$$.scope
              : this;

            /* eslint no-new-func: 0 */
            const { watchersToRemove } = instance ? instance.$$ : {};
            const func = new Function(
              '',
              'with(document.DwayneStore){$$.expr=eval("$$.expr="+$$.expr);return $$.expr}'
            );

            return evaluate.call(this);

            function evaluate() {
              let result;

              if (onChange) {
                evalMode = true;
                getting = new Arr([]);
              }

              store.$$.expr = expression;
              document.DwayneStore = store;

              try {
                result = func();
              } catch (err) {
                if (onEvalError) {
                  err.expression = expression;
                  err.block = this;
                  onEvalError(err);
                }
              }

              if (onChange) {
                const localWatchers = new Arr([]);

                getting.forEach((watchers) => {
                  const watcher = () => {
                    const newResult = evaluate.call(this);

                    if (newResult !== result) {
                      onChange(newResult, result);
                    }
                  };
                  const watcherBlock = {
                    forDElements,
                    watcher,
                    watchers
                  };

                  watcher.onRemove = () => {
                    localWatchers.forEach((watcherBlock) => {
                      const {
                        watcher,
                        watchers
                      } = watcherBlock;
                      const index1 = watchersToRemove.indexOf(watcherBlock);
                      const index2 = watchers.indexOf(watcher);

                      if (index1 !== -1) {
                        watchersToRemove.splice(index1, 1);
                      }

                      if (index2 !== -1) {
                        watchers.splice(index2, 1);
                      }
                    });
                  };

                  localWatchers.push(watcherBlock);
                  watchersToRemove.push(watcherBlock);
                  watchers.push(watcher);
                });

                evalMode = false;
                getting = new Arr([]);
              }

              store.$$.expr = null;
              document.DwayneStore = null;

              return result;
            }
          }
        }
      }
    });

    const args = new Super(originalArgs).map((value, arg) => {
      if (name === 'd-each' && (
        arg === 'item'
        || arg === 'index'
        || arg === 'uid'
      )) {
        return value;
      }

      const forDElements = name === 'd-elements' && arg === 'value';

      return parentScope.$$.evaluate(value, (value) => {
        this.args[arg] = value;
      }, this, forDElements, forDElements && parentBlock.$$.name === '#d-item');
    }).$;

    this.args = args;
    this.children = children || new Arr([]);
    this.global = Object.create(
      parentScope
        ? Object.create(parentScope.global)
        : null
    );

    this.$$.elems.start.$[0].DwayneBlock = this;
    this.$$.elems.end.$[0].DwayneBlock = this;

    if (parentBlock) {
      parentBlock.$$.children.push(this);
    }

    /**
     * @member {Object} Block#args
     * @type {Object}
     * @public
     */
    /**
     * @member {Object} Block#global
     * @type {Object}
     * @public
     */
  }

  /**
   * @method Block#afterConstruct
   * @public
   * @description Is called after block construction (including all scopes)
   * but before rendering the block and its children.
   */
  afterConstruct() {}

  /**
   * @method Block#afterRender
   * @public
   * @description Is called after block has been rendered.
   */
  afterRender() {}

  /**
   * @method Block#afterRender
   * @public
   * @description Is called before the block removal.
   */
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
      name,
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

    removeWatchers(watchersToRemove);

    children.forEach((child) => {
      child.remove(true);
    });

    mixins.forEach((mixin) => {
      mixin.remove(true);
    });

    try {
      this.beforeRemove();
    } catch (err) {
      console.error(`Uncaught error in ${ name }#beforeRemove:`, err);
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
   * @method Block#watch
   * @public
   * @param {...String} [args] - Vars to watch (args, global or local).
   * @param {Watcher} watcher - Called when watched vars are changed.
   * @description Method for watching for vars. If no vars passed in arguments
   * all vars are to be watched. Otherwise specified vars will be watched.
   * Watchers should not be put inside the constructor. It is considered best
   * practice to do it inside the {@link Block#afterConstruct} method.
   * Note that these expressions (vars, i.e. "args.arg") are not to be
   * evaluated so you cannot put there things like "a[b]" or any js code,
   * only expressions like "a", "b", "args.a", "args.b" and "global.a", "global.b".
   *
   * @example
   * class MyBlock extends Block {
   *   static template = '<div />';
   *
   *   afterConstruct() {
   *     this.watch('a', () => {});
   *     this.watch('args.a', 'global.r', () => {});
   *     this.watch(() => {});
   *   }
   * }
   */
  watch() {
    const watcher = arguments[arguments.length - 1];

    if (!isFunction(watcher)) {
      return;
    }

    if (arguments.length === 1) {
      for (const global in this.$$.global) {
        /* eslint guard-for-in: 0 */
        const watchers = this.$$.global[global].watchers.perm;

        watchers.push(watcher);
        this.$$.watchersToRemove.push({
          watcher,
          watchers
        });
      }

      iterate(this.$$.args, ({ watchers }) => {
        watchers.perm.push(watcher);
      });

      return iterate(this.$$.locals, ({ watchers }) => {
        watchers.perm.push(watcher);
      });
    }

    iterate(arguments, (variable) => {
      if (variable === watcher) {
        return;
      }

      variable = `${ variable }`;

      if (/^args\./.test(variable)) {
        variable = variable.replace(/^args\./, '');

        if (!this.$$.args[variable]) {
          return;
        }

        this.$$.args[variable].watchers.perm.push(watcher);

        return;
      }

      if (/^global\./.test(variable)) {
        variable = variable.replace(/^global\./, '');

        if (!this.$$.global[variable]) {
          return;
        }

        this.$$.global[variable].watchers.perm.push(watcher);

        return;
      }

      if (!this.$$.locals[variable]) {
        return;
      }

      this.$$.locals[variable].watchers.perm.push(watcher);
    });
  }

  /**
   * @method Block#watchArgs
   * @public
   * @param {...String} [args] - Args to watch.
   * @param {Watcher} watcher - Called when watched args are changed.
   * @description Method for watching for args. If no args passed in arguments
   * all args are to be watched. Otherwise specified args will be watched.
   * Watchers should not be put inside the constructor. It is considered best
   * practice to do it inside the {@link Block#afterConstruct} method.
   *
   * @example
   * class MyBlock extends Block {
   *   static template = '<div />';
   *
   *   afterConstruct() {
   *     this.watchArgs('a', () => {});
   *     this.watchArgs('a', 'b', () => {});
   *     this.watchArgs(() => {});
   *   }
   * }
   */
  watchArgs() {
    const watcher = arguments[arguments.length - 1];

    if (!isFunction(watcher)) {
      return;
    }

    if (arguments.length === 1) {
      return iterate(this.$$.args, ({ watchers }) => {
        watchers.perm.push(watcher);
      });
    }

    iterate(arguments, (arg) => {
      if (arg === watcher) {
        return;
      }

      if (!this.$$.args[arg]) {
        return;
      }

      this.$$.args[arg].watchers.perm.push(watcher);
    });
  }

  /**
   * @method Block#watchGlobal
   * @public
   * @param {...String} [globals] - Globals to watch.
   * @param {Watcher} watcher - Called when watched globals are changed.
   * @description Method for watching for globals. If no globals passed in arguments
   * all globals are to be watched. Otherwise specified globals will be watched.
   * Watchers should not be put inside the constructor. It is considered best
   * practice to do it inside the {@link Block#afterConstruct} method.
   *
   * @example
   * class MyBlock extends Block {
   *   static template = '<div />';
   *
   *   afterConstruct() {
   *     this.watchGlobal('a', () => {});
   *     this.watchGlobal('a', 'b', () => {});
   *     this.watchGlobal(() => {});
   *   }
   * }
   */
  watchGlobals() {
    const watcher = arguments[arguments.length - 1];

    if (!isFunction(watcher)) {
      return;
    }

    if (arguments.length === 1) {
      for (const global in this.$$.global) {
        /* eslint guard-for-in: 0 */
        const watchers = this.$$.global[global].watchers.perm;

        watchers.push(watcher);
        this.$$.watchersToRemove.push({
          watcher,
          watchers
        });
      }

      return;
    }

    iterate(arguments, (global) => {
      if (global === watcher) {
        return;
      }

      if (!this.$$.global[global]) {
        return;
      }

      this.$$.global[global].watchers.perm.push(watcher);
    });
  }

  /**
   * @method Block#watchLocals
   * @public
   * @param {...String} [locals] - Locals to watch.
   * @param {Watcher} watcher - Called when watched locals are changed.
   * @description Method for watching for locals. If no locals passed in arguments
   * all locals are to be watched. Otherwise specified locals will be watched.
   * Watchers should not be put inside the constructor. It is considered best
   * practice to do it inside the {@link Block#afterConstruct} method.
   *
   * @example
   * class MyBlock extends Block {
   *   static template = '<div />';
   *
   *   afterConstruct() {
   *     this.watchLocals('a', () => {});
   *     this.watchLocals('a', 'b', () => {});
   *     this.watchLocals(() => {});
   *   }
   * }
   */
  watchLocals() {
    const watcher = arguments[arguments.length - 1];

    if (!isFunction(watcher)) {
      return;
    }

    if (arguments.length === 1) {
      return iterate(this.$$.locals, ({ watchers }) => {
        watchers.perm.push(watcher);
      });
    }

    iterate(arguments, (local) => {
      if (local === watcher) {
        return;
      }

      if (!this.$$.locals[local]) {
        return;
      }

      this.$$.locals[local].watchers.perm.push(watcher);
    });
  }
}

registerBuiltIns(Blocks, rootBlocks, Block);

const blocks = Block._blocks;

class Mixin {
  static evaluate = true;

  constructor(opts) {
    const {
      name,
      value,
      elem,
      match,
      parentBlock,
      parentScope
    } = opts;

    Object.defineProperties(this, {
      $$: {
        value: {
          name,
          _value: value,
          parent: parentScope,
          parentBlock,
          watchersToRemove: new Arr([])
        }
      }
    });

    this.match = new Arr(match).slice(1).$;
    this.block = parentScope;
    this.elem = elem;
    this.node = elem.$[0];

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
      name,
      parentBlock,
      watchersToRemove
    } = this.$$;

    removeWatchers(watchersToRemove);

    try {
      this.beforeRemove();
    } catch (err) {
      console.error(`Uncaught error in ${ name }#beforeRemove:`, err);
    }

    if (!isParentSignal && parentBlock) {
      const index = parentBlock.$$.mixins.indexOf(this);

      if (index !== -1) {
        parentBlock.$$.mixins.splice(index, 1);
      }
    }
  }
}

registerBuiltIns(Mixins, rootMixins, Mixin);

const mixins = Block._mixins;

function initApp(block, node) {
  if (!blocks[block]) {
    throw new Error(`No "${ block }" block is registered! (initApp)`);
  }

  const start = doc.createComment(' d-root: start ');
  const end = doc.createComment(' d-root: end ');
  const parent = new Elem(node);

  parent.html('');

  new Elem([
    start,
    end
  ]).into(parent);

  createBlock({
    node: {
      name: block,
      attrs: {},
      children: new Arr([])
    },
    after: start,
    parent
  });
}

function registerBuiltIns(set, scope, proto) {
  iterate(set, (register) => {
    const {
      name,
      value
    } = register(proto, createBlock);

    if (proto === Block) {
      value._html = deepCloneChildren(
        markupToJSON(
          `${ value.template || '' }`,
          value.collapseWhiteSpace
        )
      );
    } else {
      value._match = new RegExp(`^${ new Str(name).escapeRegExp().$ }(?:-([\\s\\S]+))?$`);
    }

    scope[name] = value;
  });
}

function createBlock({ node, after, parent, parentBlock, parentScope }) {
  parentScope = (node && node.block) || parentScope;

  const name = (node && node.name) || 'UnknownBlock';
  const args = (node && node.attrs) || {};
  const children = (node && node.children) || new Arr([]);
  const elem = parent.prop('namespaceURI') === svgNS
    ? doc.svg()
    : new Elem(doc.template().$[0].content);
  const localBlocks = parentScope ? parentScope.$$.ns._blocks : blocks;
  const localMixins = parentScope ? parentScope.$$.ns._mixins : mixins;
  let constructor = node && node.name && localBlocks[node.name];
  let dBlockMatch;

  if (!children.length && ((dBlockMatch = name.match(/^d-block-([\s\S]+)$/)) || name === 'd-block')) {
    constructor = blocks['d-block'];
    args.name = dBlockMatch ? dBlockMatch[1] : '{null}';
  }

  if (!constructor) {
    const {
      value,
      children
    } = node;

    if (name === '#text' && expressionRegExp.test(value)) {
      return createBlock({
        node: {
          name: 'd-text',
          attrs: { value },
          children: new Arr([]),
          block: parentScope
        },
        after,
        parent,
        parentBlock,
        parentScope
      });
    }

    const element = elem.create(name);
    const currentMixins = new Arr([]);

    const attrs = new Super(args).object((object, value, attr) => {
      let match;

      for (const name in localMixins) {
        const Mixin = localMixins[name];
        const localMatch = attr.match(Mixin._match);

        if (localMatch) {
          match = {
            match: localMatch,
            Mixin,
            name
          };

          break;
        }
      }

      if (match) {
        currentMixins.push({
          name: match.name,
          Mixin: match.Mixin,
          match: match.match,
          value,
          elem: element,
          parentBlock,
          parentScope
        });

        return;
      }

      if (!value) {
        object[attr] = '';

        return;
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

    currentMixins.forEach((opts) => {
      createMixin(opts);
    });

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

  Object.defineProperties(blockInstance, {
    args: {
      value: blockInstance.args
    },
    global: {
      value: blockInstance.global
    }
  });

  let html = name === 'd-elements'
    ? new Arr(blockInstance.args.value || [])
    : deepCloneChildren(constructor._html, blockInstance);

  if (name === 'd-elements' && parentBlock.$$.name === '#d-item') {
    html = deepCloneChildren(html, parentBlock);
  }

  const {
    $$,
    args: Args,
    global,
    ...locals
  } = blockInstance;

  delete locals.$;
  delete locals.$$;

  $$.args = constructPrivateScope(Args);
  $$.locals = constructPrivateScope(locals);
  $$.global = constructPrivateScope(global, 'global', parentScope);

  if (name === '#d-item') {
    const scopeValues = {
      [node.itemName]: node.item,
      [node.indexName]: node.index
    };
    let parent = blockInstance;
    let scope = parentScope;
    let DItemFound;

    while (!DItemFound && parent !== parentScope && (parent = parent.$$.parentBlock)) {
      DItemFound = parent.$$.name === '#d-item';
    }

    if (DItemFound) {
      scope = parent.$$.scope;
    }

    $$.ns = parentScope.$$.ns;
    $$.privateScope = constructPrivateScope(scopeValues);
    constructPublicScope($$.scope = Object.create(scope), scopeValues, $$.privateScope);
  }

  if (name === 'd-each') {
    $$.scope = Object.create(parentScope);
  }

  constructPublicScope(Args, Args, $$.args);
  constructPublicScope(global, global, $$.global);
  constructPublicScope(blockInstance, locals, $$.locals);

  try {
    blockInstance.afterConstruct();
  } catch (err) {
    console.error(`Uncaught error in ${ name }#afterConstruct:`, err);
  }

  const elems = new Elem([
    $$.elems.start,
    $$.elems.end
  ]);

  if (after.length) {
    elems.insertAfter(after);
  } else {
    elems.into(parent);
  }

  after = $$.elems.start;

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

function createMixin({ name, Mixin, value, match, elem, parentBlock, parentScope }) {
  const mixin = new Mixin({
    name,
    value,
    match,
    elem,
    parentBlock,
    parentScope
  });

  if (Mixin.evaluate) {
    const value = mixin.value = mixin.evaluateAndWatch((newValue, oldValue) => {
      mixin.value = newValue;

      try {
        mixin.afterUpdate(newValue, oldValue);
      } catch (err) {
        console.error(`Uncaught error in ${ name }#afterUpdate:`, err);
      }
    });

    mixin.afterUpdate(value);
  }
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

function removeWatchers(watchersToRemove) {
  watchersToRemove.forEach(({ watcher, watchers }) => {
    const index = watchers.indexOf(watcher);

    if (index !== -1) {
      watchers.splice(index, 1);
    }
  });
}

function constructPrivateScope(object, type, parentScope) {
  let scope = {};

  if (type === 'global') {
    scope = Object.create(
      parentScope
        ? parentScope.$$.global
        : null
    );
  }

  return new Super(object).object((scope, value, key) => {
    scope[key] = {
      value,
      watchers: {
        temp: new Arr([]),
        perm: new Arr([])
      }
    };
  }, scope).$;
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

        if (!changed) {
          changed = [];
        }

        const oldTempWatchers = scope.watchers.temp.slice();
        const oldValue = scope.value;

        scope.watchers.temp = new Arr([]);
        scope.value = value;

        oldTempWatchers.forEach((watcher) => {
          watcher.onRemove();
          watcher();
        });
        changed.push({
          scope,
          oldValue,
          value
        });

        setTimeout(() => {
          if (!changed) {
            return;
          }

          const was = new Arr([]);
          const values = [];

          for (let i = changed.length - 1; i >= 0; i--) {
            const {
              scope,
              value,
              oldValue
            } = changed[i];

            scope.watchers.perm.forEach((watcher) => {
              const index = was.indexOf(watcher);

              if (index === -1) {
                was.push(watcher);
                values.push({
                  value,
                  oldValue
                });
              } else {
                values[index].oldValue = oldValue;
              }
            });

            changed.splice(i, 1);
          }

          changed = null;

          was.forEach((watcher, i) => {
            const {
              value,
              oldValue
            } = values[i];

            watcher(value, oldValue);
          });
        }, 0);
      }
    };
  }).$);
}

export { Block, Mixin, initApp };
