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
  assign, iterate, validate, toJSON,
  isFunction, isNil, isString, isUndefined
} from './helpers';
import * as Blocks from './blocks';
import * as Mixins from './mixins';
import { htmlAllowedTagSymbols, htmlAllowedAttrSymbols } from './constants';
import markupToJSON from './helpers/markupToJSON';
import parseJS from './helpers/parseJS';

/**
 * @typedef {Error} EvaluationError
 * @public
 * @property {String} expression - Expression which has been evaluated with the error.
 * @property {Block} block - Block in context of which the expression has been evaluated with the error.
 */

/**
 * @callback Watcher
 * @public
 * @param {*} newValue - New value.
 * @param {*} oldValue - Old value.
 */

/**
 * @callback Wrapper
 * @public
 * @param {Block} Block class to wrap.
 * @returns {Block} New Block class.
 */

/**
 * @callback AfterUpdate
 * @public
 * @param {*} newValue - New value.
 * @param {*} oldValue - Old value.
 * @param {*} mixin - Mixin instance.
 */

const rootBlocks = Object.create(null);
const rootMixins = Object.create(null);
const isPrototypeOf = {}.isPrototypeOf;
const tagName = new RegExp(`^${ htmlAllowedTagSymbols }$`, 'i');
const attrName = new RegExp(`^${ htmlAllowedAttrSymbols }$`);
const svgNS = 'http://www.w3.org/2000/svg';
const curlyBracketRegExp = /\{/;
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
 *   static template = 'Hello, {args.text}!';
 * }
 *
 * Block.register('App', App);
 * Block.register('Hello', 'Hello, {args.text}!');
 *
 * initApp('App', document.getElementById('root'));
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

  /**
   * @member {String} [Block.template = '']
   * @type {String}
   * @public
   * @description Block template.
   */
  static template = '';

  /**
   * @method Block.onEvalError
   * @public
   * @param {EvaluationError} err - The method is called when an evaluation error occurs.
   */
  static onEvalError(err) {
    console.error(`Eval error (evaluating "${ err.expression }" in context of block "${ err.block.$$.name }"):`, err);
  }

  static getBlocks() {
    return new Super({ ...this._blocks });
  }

  static getMixins() {
    return new Super({ ...this._mixins });
  }

  /**
   * @method Block.block
   * @public
   * @param {String} name - Block or mixin name.
   * @param {String|Block} Subclass - Subclass of Block or template string of it.
   * @returns {void}
   * @description Register block in the namespace of this.
   */
  static block(name, Subclass) {
    const _this = new Super(this);

    if (!_this.hasOwn('_blocks')) {
      Subclass._blocks = Object.create(_this.proto().$._blocks);
    }

    const { _blocks } = this;

    if (isString(Subclass)) {
      Subclass = class extends Block {
        static template = Subclass;
      };
    }

    if (!isInstanceOfBlock(Subclass)) {
      console.warn(`The "${ name }" class does not extend Block and will not be registered (Block.block)`);

      return;
    }

    if (rootBlocks[name]) {
      console.warn(`The "${ name }" block is a built-in block so the block will not be registered (Block.block)`);

      return;
    }

    if (!tagName.test(name)) {
      console.warn(`Name "${ name }" is not allowed for blocks so the block will not be registered (Block.block)`);

      return;
    }

    const variables = {};

    Subclass._html = transformDIfChildren(
      transformJSExpressions(
        markupToJSON(
          `${ Subclass.template || '' }`,
          Subclass.collapseWhiteSpace
        ),
        variables
      )
    );
    Subclass._variables = new Super(variables).keys();

    _blocks[name] = Subclass;
  }

  /**
   * @method Block.mixin
   * @public
   * @param {String} name - Block or mixin name.
   * @param {Mixin|AfterUpdate} Subclass - Subclass of Mixin or AfterUpdate callback.
   * @returns {void}
   * @description Register mixin in the namespace of this.
   */
  static mixin(name, Subclass) {
    const _this = new Super(this);

    if (!_this.hasOwn('_mixins')) {
      Subclass._mixins = Object.create(_this.proto().$._mixins);
    }

    const { _mixins } = this;

    if (isFunction(Subclass) && !isInstanceOfMixin(Subclass)) {
      const afterUpdate = Subclass;

      Subclass = class extends Mixin {
        afterUpdate(newValue, oldValue) {
          afterUpdate.call(this, newValue, oldValue, this);
        }
      };
    }

    if (!isInstanceOfMixin(Subclass)) {
      console.warn(`The "${ name }" class does not extend Mixin and will not be registered (Block.mixin)`);

      return;
    }

    if (rootMixins[name]) {
      console.warn(`The "${ name }" mixin is a built-in mixin so the mixin will not be registered (Block.mixin)`);

      return;
    }

    if (!attrName.test(name)) {
      console.warn(`Name "${ name }" is not allowed for mixins so the mixin will not be registered (Block.mixin)`);

      return;
    }

    Subclass._match = new RegExp(`^${ new Str(name).escapeRegExp().$ }(?:-([\\s\\S]+))?$`);

    _mixins[name] = Subclass;
  }

  /**
   * @method Block.wrap
   * @public
   * @param {...Wrapper} wrappers - Functions that return wrapped block.
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
   *     constructor(opts) {
   *       super(opts);
   *
   *       this.additionalVar = 'additional';
   *     }
   *   };
   * });
   */
  static wrap(...wrappers) {
    return new Arr(arguments).reduce((block, wrapper) => wrapper(block), this);
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
    const constructor = new Super(this).proto().$.constructor;
    const childrenBlocks = new Arr([]);
    const mixins = new Arr([]);
    const startComment = doc.createComment(` ${ name }: start `);
    const content = new Elem();
    const endComment = doc.createComment(` ${ name }: end `);

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
          ns: constructor,
          children: childrenBlocks,
          mixins,
          elems: {
            start: startComment,
            end: endComment,
            content,
            parent
          },
          watchersToRemove,
          evaluate: (expression, onChange, instance, forDElements, forDItem, forDEach) => {
            forDElements = !!forDElements;
            forDItem = !!forDItem;

            const scope = (name === '#d-item' && !forDItem) || forDEach
              ? (forDEach || this).$$.scope
              : this;
            const { watchersToRemove } = instance ? instance.$$ : {};
            let func;

            try {
              func = new Function('$', `return ${ expression }`);
            } catch (err) {
              throw new Error(`Syntax error (in "${ expression }" in context of block "${ this.$$.name }"): ${ err.message }`);
            }

            /* eslint no-new-func: 0 */
            const evaluate = () => {
              let result;

              if (onChange) {
                evalMode = true;
                getting = new Arr([]);
              }

              try {
                result = func(scope);
              } catch (err) {
                err.expression = expression;
                err.block = this;
                constructor.onEvalError(err);
              }

              if (onChange) {
                const localWatchers = new Arr([]);

                getting.forEach((watchers) => {
                  const watcher = () => {
                    const newResult = evaluate();

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

              return result;
            };

            return evaluate();
          },
          remove: (isParentSignal) => {
            removeWatchers(watchersToRemove);

            childrenBlocks.forEach((child) => {
              child.$$.remove(true);
            });

            mixins.forEach((mixin) => {
              mixin.$$.remove(true);
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
              startComment,
              content,
              endComment
            ]).remove();
          }
        }
      }
    });

    constructor._variables.forEach((variable) => {
      this[variable] = isUndefined(this[variable]) ? undefined : this[variable];
    });

    Object.defineProperties(this, {
      /**
       * @member {Object} Block#args
       * @type {Object}
       * @public
       */
      args: {
        value: new Super(originalArgs).map((value, arg) => {
          if (name === 'd-each' && (
              arg === 'item'
              || arg === 'index'
              || arg === 'uid'
            )) {
            return arg === 'uid' ? value : JSON.parse(value);
          }

          if ((name.match(/^d-block-([\s\S]+)$/) || name === 'd-block') && arg === 'name') {
            return value;
          }

          const forDElements = name === 'd-elements' && arg === 'value';

          if (value === '""') {
            return true;
          }

          return parentScope.$$.evaluate(value, (value) => {
            this.args[arg] = value;
          }, this, forDElements, forDElements && parentBlock.$$.name === '#d-item');
        }).$
      },

      /**
       * @member {Object} Block#children
       * @type {Object}
       * @public
       */
      children: {
        value: children || new Arr([])
      },

      /**
       * @member {Object} Block#global
       * @type {Object}
       * @public
       */
      global: {
        value: Object.create(
          parentScope
            ? Object.create(parentScope.global)
            : null
        )
      }
    });

    startComment.$[0].DwayneBlock = this;
    endComment.$[0].DwayneBlock = this;

    if (parentBlock) {
      parentBlock.$$.children.push(this);
    }
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

  /**
   * @method Block#evaluateAndWatch
   * @public
   * @param {String} expression - Expression to evaluate.
   * @param {Watcher} callback - Callback which is called when the expression value is changed.
   * @returns {*} Evaluation result.
   * @description Method for evaluating an expression in context of the block and watching for the changes.
   */
  evaluateAndWatch(expression, callback) {
    validate([expression], ['string']);

    ({ expression } = parseJS(expression, expression, true));

    return this.$$.parent.$$.evaluate(expression, callback, this);
  }

  /**
   * @method Block#evaluateOnce
   * @public
   * @param {String} expression - Expression to evaluate.
   * @returns {*} Evaluation result.
   * @description Method for evaluating an expression in context of the block once.
   */
  evaluateOnce(expression) {
    validate([expression], ['string']);

    ({ expression } = parseJS(expression, expression, true));

    return this.$$.parent.$$.evaluate(expression);
  }

  /**
   * @method Block#watch
   * @public
   * @param {...('args'|'globals'|String)} [vars] - Vars to watch (args, global or local).
   * If no specified all locals, args and globals are to be watched.
   * If the 'args' string all args are to be watched.
   * If the 'global' string all globals are to be watched.
   * @param {Watcher} watcher - Called when watched vars are changed.
   * @description Method for watching for vars. If no vars passed in arguments
   * all vars are to be watched. If the 'args' string is in the arguments all args are to be watched.
   * If the 'global' string is in the arguments all globals are to be watched.
   * Otherwise specified vars will be watched.
   * Watchers should not be put inside the constructor. It is considered best
   * practice to do it inside the {@link Block#afterConstruct} method.
   * Note that these expressions (vars, i.e. "args.arg") are not to be
   * evaluated so you cannot put there things like "a[b]" or any js code,
   * only expressions like "a", "b", "args.a", "args.b" and "global.a", "global.b".
   * Also note that if there are more than one var that are changed at once (synchronously)
   * the watcher is called only once.
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
      watchForAllGlobals(this, watcher);
      watchForAllArgs(this, watcher);

      return iterate(this.$$.locals, ({ watchers }, local) => {
        watchers.perm.push((newValue, oldValue) => {
          watcher(newValue, oldValue, local, 'locals');
        });
      });
    }

    iterate(arguments, (variable) => {
      if (variable === watcher) {
        return;
      }

      variable = `${ variable }`;

      if (variable === 'args') {
        return watchForAllArgs(this, watcher);
      }

      if (variable === 'global') {
        return watchForAllGlobals(this, watcher);
      }

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
    const watchersToRemove = new Arr([]);

    Object.defineProperties(this, {
      $$: {
        value: {
          name,
          _value: value,
          parent: parentScope,
          parentBlock,
          watchersToRemove: new Arr([]),
          remove: (isParentSignal) => {
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

  /**
   * @method Block#evaluateAndWatch
   * @public
   * @param {Watcher} callback - Callback which is called when the mixin value is changed.
   * @returns {*} Evaluation result.
   * @description Method for evaluating the mixin value and watching for the changes.
   */
  evaluateAndWatch(callback) {
    const {
      _value,
      parent
    } = this.$$;

    return parent.$$.evaluate(_value, callback, this);
  }

  /**
   * @method Block#evaluateOnce
   * @public
   * @returns {*} Evaluation result.
   * @description Method for evaluating the mixin value once.
   */
  evaluateOnce() {
    const {
      _value,
      parent
    } = this.$$;

    return parent.$$.evaluate(_value);
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
      const variables = {};

      value._html = transformJSExpressions(
        markupToJSON(
          `${ value.template || '' }`,
          value.collapseWhiteSpace
        ),
        variables
      );
      value._variables = new Super(variables).keys();
    } else {
      value._match = new RegExp(`^${ new Str(name).escapeRegExp().$ }(?:-([\\s\\S]+))?$`);
    }

    scope[name] = value;
  });
}

function createBlock({ node, after, parent, parentBlock }) {
  const parentScope = node.block;
  const name = node.name || 'UnknownBlock';
  const args = node.attrs || {};
  const children = node.children || new Arr([]);
  const elem = parent.prop('namespaceURI') === svgNS
    ? doc.svg()
    : new Elem(doc.template().$[0].content);
  const localBlocks = parentScope ? parentScope.$$.ns._blocks : blocks;
  const localMixins = parentScope ? parentScope.$$.ns._mixins : mixins;
  let constructor = node.name && localBlocks[node.name];
  let dBlockMatch;

  if (!children.length && ((dBlockMatch = name.match(/^d-block-([\s\S]+)$/)) || name === 'd-block')) {
    constructor = blocks['d-block'];
    args.name = dBlockMatch ? dBlockMatch[1] : null;
  }

  if (!constructor) {
    const {
      value,
      children
    } = node;

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
          value: value === '""' ? 'true' : value,
          elem: element,
          parentBlock,
          parentScope
        });

        return;
      }

      object[attr] = parentScope.$$.evaluate(value, (value) => {
        element.attr(attr, value);
      }, parentBlock);
    }).$;

    if (!isNil(value)) {
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
      children.forEach((child) => {
        const block = createBlock({
          node: child,
          after,
          parent: element,
          parentBlock
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

  const {
    $$,
    args: Args,
    global,
    ...locals
  } = blockInstance;
  let html;

  if (name === 'd-elements' && parentBlock.$$.name === '#d-item') {
    html = deepCloneChildren(Args.value, parentBlock);
  } else if (name === 'd-elements') {
    html = new Arr(Args.value || []);
  } else {
    html = deepCloneChildren(constructor._html, blockInstance);
  }

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
    $$.scope = Object.create(parentScope.$$.name === '#d-item' ? parentScope.$$.scope : parentScope, {
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

  html.forEach((child) => {
    const block = createBlock({
      node: child,
      after,
      parent,
      parentBlock: blockInstance
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

          child.children = transformDIfChildren(child.children);
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

function transformJSExpressions(children, variables, exclude = {}) {
  return new Arr(children || []).object((children, child) => {
    const {
      name,
      attrs,
      children: ownChildren,
      value: initialValue
    } = child;
    let { value } = child;

    child.attrs = new Super(attrs).map((value) => {
      if (value.indexOf('{')) {
        return toJSON(value);
      }

      const parsed = parseJS(value.slice(1), value);

      if (!parsed) {
        return toJSON(value);
      }

      if (parsed.rest) {
        throw new Error('Attribute, mixin and argument computed values must be of the format "{<js_expression>}"');
      }

      const usedVariables = new Super(parsed.variables).filter((value, variable) => {
        if (!exclude[variable]) {
          return true;
        }
      }).$;

      assign(variables, usedVariables);

      return parsed.expression;
    }).$;

    if (name !== '#text') {
      if (name === 'd-each') {
        exclude = {
          ...exclude,
          [child.attrs.item ? JSON.parse(child.attrs.item) : '$item']: true,
          [child.attrs.index ? JSON.parse(child.attrs.index) : '$index']: true
        };
      }

      if (ownChildren) {
        child.children = transformJSExpressions(ownChildren, variables, exclude);
      }

      children.push(child);

      return;
    }

    while (value.length) {
      const match = value.match(curlyBracketRegExp);

      if (!match) {
        children.push({
          name: '#text',
          value: toJSON(value)
        });

        break;
      }

      const { index } = match;

      if (index) {
        children.push({
          name: '#text',
          value: toJSON(value.slice(0, index))
        });
        value = value.slice(index);
      }

      const parsed = parseJS(value.slice(1), initialValue);

      if (!parsed) {
        children.push({
          name: '#text',
          value: toJSON(value)
        });

        break;
      }

      const usedVariables = new Super(parsed.variables).filter((value, variable) => {
        if (!exclude[variable]) {
          return true;
        }
      }).$;

      assign(variables, usedVariables);

      children.push({
        name: '#text',
        value: parsed.expression
      });
      value = parsed.rest;
    }
  }, new Arr([]));
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

function watchForAllGlobals(block, watcher) {
  const {
    global: globals,
    watchersToRemove
  } = block.$$;

  for (const global in globals) {
    /* eslint guard-for-in: 0 */
    const watchers = globals[global].watchers.perm;

    watchers.push(watcher);
    watchersToRemove.push({
      watcher,
      watchers
    });
  }
}

function watchForAllArgs(block, watcher) {
  iterate(block.$$.args, ({ watchers }) => {
    watchers.perm.push(watcher);
  });
}

export { Block, Mixin, initApp };
