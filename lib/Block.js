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
  defineUsualProperties, defineFrozenProperties,
  assign, constructEvalFunction, iterate, validate,
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
 * @callback VarsWatcher
 * @public
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
const dRestRegExp = /^d-rest(?:#|$)/;
const afterElem = new Elem();
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
   * @member {Boolean} [Block.defaultArgs = null]
   * @type {Boolean}
   * @public
   * @description If the whitespace between html elements and
   * in the start and the end inside the tag should be omitted during parsing.
   */
  static defaultArgs = null;

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

    if (isString(Subclass)) {
      Subclass = class extends Block {
        static template = Subclass;
      };
    }

    if (!isFunction(Subclass)) {
      console.warn(`Block must be a string (representing a block template), a function or a class that extends Block class (name: "${ name }") (Block.block)`);

      return;
    }

    if (!isInstanceOfBlock(Subclass)) {
      extendBlock(Subclass);
    }

    if (rootBlocks[name]) {
      console.warn(`The "${ name }" block is a built-in block so the block will not be registered (Block.block)`);

      return;
    }

    if (!tagName.test(name)) {
      console.warn(`Name "${ name }" is not allowed for blocks so the block will not be registered (Block.block)`);

      return;
    }

    if (!_this.hasOwn('_blocks')) {
      this._blocks = Object.create(_this.proto().$._blocks);
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
    Subclass._variables = new Super(variables)
      .except('$$', '$')
      .keys();

    if (new Super(Subclass).hasOwn('defaultArgs')) {
      new Super(Subclass.defaultArgs).proto(null);
    }

    this._blocks[name] = Subclass;
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

    if (!_this.hasOwn('_mixins')) {
      this._mixins = Object.create(_this.proto().$._mixins);
    }

    Subclass._match = constructMixinRegExp(name);

    this._mixins[name] = Subclass;
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
      dBlockName,
      children,
      parent,
      parentElem,
      parentBlock,
      parentScope,
      prevBlock
    } = opts;
    const watchersToRemove = new Arr([]);
    const constructor = new Super(this).proto().$.constructor;
    const childrenBlocks = new Arr([]);
    const mixins = new Arr([]);
    const isParentBlock = parent instanceof Block;

    defineFrozenProperties(this, {
      /**
       * @member {Block} Block#$
       * @type {Block}
       * @public
       * @description This.
       */
      $: this,

      /**
       * @member {Object} Block#$$
       * @type {Object}
       * @protected
       * @property {Object} args - Private args scope.
       * @property {Arr} children - Child blocks.
       * @property {Arr} mixins - Child mixins.
       * @property {Elem} parentElem - Parent element.
       * @property {Elem} content - Content elements.
       * @property {Function} evaluate - Evaluate function.
       * @property {Object} global - Private global scope.
       * @property {Object} locals - Private locals scope.
       * @property {Arr} watchersToRemove - Watchers to remove before removing element.
       */
      $$: {
        name,
        dBlockName,
        parent,
        parentElem,
        parentScope,
        parentBlock,
        content: new Elem(),
        ns: constructor,
        children: childrenBlocks,
        mixins,
        prevBlock,
        watchersToRemove,
        evaluate: (func, onChange, instance, forDElements, forDItem, forDEach) => {
          if (!isFunction(func)) {
            return func;
          }

          forDElements = !!forDElements;
          forDItem = !!forDItem;

          const scope = (name === '#d-item' && !forDItem) || forDEach
            ? (forDEach || this).$$.scope
            : this;
          const { watchersToRemove } = instance ? instance.$$ : {};

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
              err.expression = func.expression;
              err.original = func.original;
              err.block = this;

              if (isFunction(constructor.onEvalError)) {
                constructor.onEvalError(err);
              }
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

          if (!isParentSignal && isParentBlock) {
            parent.$$.removeContent(this.$$.content);
          }

          if (!isParentSignal && parentBlock) {
            const index = parentBlock.$$.children.indexOf(this);

            if (index !== -1) {
              parentBlock.$$.children.splice(index, 1);
            }
          }

          this.$$.content.remove();
        },
        addContent: (contentToAdd, notRecursive) => {
          const index = this.$$.content.indexOf(contentToAdd.$[0].previousSibling) + 1;

          if (index === 0) {
            this.$$.content = contentToAdd
              .slice()
              .pushArray(this.$$.content.$);
          } else {
            this.$$.content = this.$$.content
              .slice(0, index)
              .pushArray(contentToAdd.$)
              .pushArray(this.$$.content.slice(index).$);
          }

          if (isParentBlock && !notRecursive) {
            parent.$$.addContent(contentToAdd);
          }
        },
        moveContent: (contentToMove, after) => {
          const index = this.$$.content.indexOf(contentToMove.$[0]);
          const indexToPut = this.$$.content.indexOf(after.$[0]) + 1;

          if (indexToPut === 0) {
            this.$$.content = contentToMove
              .slice()
              .pushArray(this.$$.content.slice(indexToPut, index).$)
              .pushArray(this.$$.content.slice(index + contentToMove.length).$);
          } else if (index > indexToPut) {
            this.$$.content = this.$$.content
              .slice(0, indexToPut)
              .pushArray(contentToMove.$)
              .pushArray(this.$$.content.slice(indexToPut, index).$)
              .pushArray(this.$$.content.slice(index + contentToMove.length).$);
          } else {
            this.$$.content = this.$$.content
              .slice(0, index)
              .pushArray(this.$$.content.slice(index + contentToMove.length, indexToPut).$)
              .pushArray(contentToMove.$)
              .pushArray(this.$$.content.slice(indexToPut).$);
          }

          if (isParentBlock && indexToPut) {
            parent.$$.moveContent(contentToMove, after);
          }
        },
        removeContent: (contentToRemove) => {
          this.$$.content = this.$$.content.filter((elem) => (
            contentToRemove.indexOf(elem) === -1
          ));

          if (isParentBlock) {
            parent.$$.removeContent(contentToRemove);
          }
        },
        insertInStartOfIt: (contentToInsert, moveFlag) => {
          const { prevBlock } = this.$$;
          let after = afterElem;

          if (prevBlock instanceof Block) {
            after = prevBlock.$$.insertAfterIt(contentToInsert, moveFlag);
          } else if (prevBlock) {
            after = prevBlock;
            contentToInsert.insertAfter(prevBlock);

            if (isParentBlock) {
              if (moveFlag) {
                parent.$$.moveContent(contentToInsert, after);
              } else {
                parent.$$.addContent(contentToInsert, true);
              }
            }
          } else if (isParentBlock) {
            const { prevBlock } = parent.$$;

            if (prevBlock) {
              let notRecursive;

              if (prevBlock instanceof Block) {
                after = prevBlock.$$.insertAfterIt(contentToInsert, moveFlag);
                notRecursive = true;
              } else {
                after = prevBlock;
                notRecursive = false;
                contentToInsert.insertAfter(prevBlock);
              }

              if (moveFlag) {
                parent.$$.moveContent(contentToInsert, after);
              } else {
                parent.$$.addContent(contentToInsert, notRecursive);
              }
            } else {
              after = parent.$$.insertInStartOfIt(contentToInsert, moveFlag);
            }
          } else {
            contentToInsert.into(parentElem, false);
          }

          if (moveFlag) {
            this.$$.moveContent(contentToInsert, after);
          } else {
            this.$$.addContent(contentToInsert, true);
          }

          return after;
        },
        insertAfterIt: (contentToInsert, moveFlag) => {
          const { prevBlock } = this.$$;
          let after = afterElem;
          let tryToAddOrMove;

          if (this.$$.content.length) {
            after = this.$$.content.last();
            tryToAddOrMove = true;
            contentToInsert.insertAfter(after);
          } else if (prevBlock instanceof Block) {
            after = prevBlock.$$.insertAfterIt(contentToInsert, moveFlag);
          } else if (prevBlock) {
            after = prevBlock;
            tryToAddOrMove = true;
            contentToInsert.insertAfter(prevBlock);
          } else if (isParentBlock) {
            after = parent.$$.insertInStartOfIt(contentToInsert, moveFlag);
          } else {
            contentToInsert.into(parentElem, false);
          }

          if (isParentBlock && tryToAddOrMove) {
            if (moveFlag) {
              parent.$$.moveContent(contentToInsert, after);
            } else {
              parent.$$.addContent(contentToInsert);
            }
          }

          return after;
        }
      }
    });

    constructor._variables.forEach((variable) => {
      this[variable] = isUndefined(this[variable]) ? undefined : this[variable];
    });

    const argsObject = Object.create(null);
    const $argsObject = new Super(argsObject);
    let args = Object.create(constructor.defaultArgs || null);

    new Super(originalArgs).forEach((value, arg) => {
      const isDRest = dRestRegExp.test(arg);
      const localArgs = isDRest
        ? Object.create(args)
        : args;

      args = localArgs;

      if (isDRest) {
        const restArgs = parentScope.$$.evaluate(value, (value) => {
          iterate(localArgs, (value, arg) => {
            delete localArgs[arg];
          });
          defineUsualProperties(localArgs, transformRestArgs(value));
          calculateArgs(args, argsObject, $argsObject);
        }, this);

        return defineUsualProperties(localArgs, transformRestArgs(restArgs));
      }

      const isDElements = name === 'd-elements';
      const forDElements = isDElements && arg === 'value';

      if (name !== 'd-each' || arg !== 'uid') {
        value = parentScope.$$.evaluate(value, (value) => {
          localArgs[arg] = value;
          calculateArgs(args, argsObject, $argsObject);
        }, this, forDElements, isDElements && parentBlock.$$.name === '#d-item');
      }

      defineUsualProperties(localArgs, {
        [arg]: value
      });
    });

    const realArgs = {};

    for (const arg in args) {
      realArgs[arg] = args[arg];
    }

    defineFrozenProperties(this, {
      /**
       * @member {Object} Block#args
       * @type {Object}
       * @public
       */
      args: argsObject,

      /**
       * @member {Object} Block#children
       * @type {Object}
       * @public
       */
      children: children || new Arr([]),

      /**
       * @member {Object} Block#global
       * @type {Object}
       * @public
       */
      global: Object.create(
        parentScope
          ? Object.create(parentScope.global)
          : null
      ),

      /**
       * @member {Block|undefined} Block#parentScope
       * @type {Block|undefined}
       * @public
       */
      parentScope
    });

    calculateArgs(args, argsObject, $argsObject);

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
    validate([expression], ['string'], 'Block#evaluateAndWatch');

    const {
      expression: code,
      original
    } = parseJS(expression, expression, true);

    const func = constructEvalFunction(code, original);

    return this.$$.parentScope.$$.evaluate(func, callback, this);
  }

  /**
   * @method Block#evaluateOnce
   * @public
   * @param {String} expression - Expression to evaluate.
   * @returns {*} Evaluation result.
   * @description Method for evaluating an expression in context of the block once.
   */
  evaluateOnce(expression) {
    validate([expression], ['string'], 'Block#evaluateOnce');

    const {
      expression: code,
      original
    } = parseJS(expression, expression, true);

    const func = constructEvalFunction(code, original);

    return this.$$.parentScope.$$.evaluate(func);
  }

  /**
   * @method Block#setLocals
   * @public
   * @param {Object} locals - Object to assign to this.
   * @description Method for simple assigning some values to this.
   */
  setLocals(locals) {
    assign(this, locals);
  }

  /**
   * @method Block#watch
   * @public
   * @param {...('args'|'globals'|String)} [vars] - Vars to watch (args, global or local).
   * If no specified all locals, args and globals are to be watched.
   * If the 'args' string all args are to be watched.
   * If the 'global' string all globals are to be watched.
   * @param {VarsWatcher} watcher - Called when watched vars are changed.
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
   * Note that the watcher is executed right away because in most cases
   * this behaviour is very convenient.
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
  watch(...vars) {
    const oldWatcher = arguments[arguments.length - 1];

    if (!isFunction(oldWatcher)) {
      console.warn(`The last argument (watcher) wasn't specified (${ this.$$.name }#watch)`);

      return;
    }

    const watcher = () => {
      oldWatcher();
    };

    if (arguments.length === 1) {
      watchForAllGlobals(this, watcher);
      watchForAllArgs(this, watcher);

      iterate(this.$$.locals, ({ watchers }) => {
        watchers.perm.push(watcher);
      });
      oldWatcher();

      return;
    }

    iterate(arguments, (variable) => {
      if (variable === oldWatcher) {
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

        const { watchers } = this.$$.global[variable];

        watchers.perm.push(watcher);
        this.$$.watchersToRemove.push({
          watcher,
          watchers
        });

        return;
      }

      if (!this.$$.locals[variable]) {
        return;
      }

      this.$$.locals[variable].watchers.perm.push(watcher);
    });

    oldWatcher();
  }
}

new Super(Block.prototype).proto(null);

registerBuiltIns(Blocks, rootBlocks, Block);

const blocks = Block._blocks;

class Mixin {
  static evaluate = true;

  constructor(opts) {
    const {
      name,
      value,
      dynamic,
      elem,
      args,
      comment,
      parentBlock,
      parentScope
    } = opts;
    const watchersToRemove = new Arr([]);
    const watchers = new Arr([]);

    defineFrozenProperties(this, {
      $$: {
        name,
        _value: value,
        value,
        isDynamic: dynamic,
        parentScope,
        parentBlock,
        watchers,
        watchersToRemove,
        evaluate: (watcher) => {
          const {
            isDynamic,
            value,
            _value
          } = this.$$;
          const currentValue = isDynamic
            ? value
            : parentScope.$$.evaluate(_value);

          if (watcher) {
            watchers.push(watcher);
          }

          return currentValue;
        },
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
    });

    this.args = args;
    this.comment = comment;
    this.parentScope = parentScope;
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
    return this.$$.evaluate(callback);
  }

  /**
   * @method Block#evaluateOnce
   * @public
   * @returns {*} Evaluation result.
   * @description Method for evaluating the mixin value once.
   */
  evaluateOnce() {
    return this.$$.evaluate();
  }
}

registerBuiltIns(Mixins, rootMixins, Mixin);

const mixins = Block._mixins;

function initApp(block, node) {
  if (!blocks[block]) {
    throw new Error(`No "${ block }" block is registered! (initApp)`);
  }

  const parentElem = new Elem(node);

  parentElem.html('');

  parentElem.$[0].DwayneRootBlock = createBlock({
    node: {
      name: block,
      attrs: {},
      children: new Arr([])
    },
    parent: parentElem,
    parentElem
  });
  parentElem.attr('dwayne-root', block);
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
      value._variables = new Super(variables)
        .except('$$', '$')
        .keys();
    } else {
      value._match = constructMixinRegExp(name);
    }

    scope[name] = value;
  });
}

function createBlock({ node, parent, parentElem, parentBlock, parentScope, prevBlock }) {
  const elem = parentElem.prop('namespaceURI') === svgNS
    ? doc.svg()
    : new Elem(doc.template().$[0].content);
  const localBlocks = parentScope ? parentScope.$$.ns._blocks : blocks;
  const localMixins = parentScope ? parentScope.$$.ns._mixins : mixins;
  let children = node.children || new Arr([]);
  let args = node.attrs || {};
  let name = node.name || 'UnknownBlock';
  let constructor = node.name && localBlocks[node.name];
  let dBlockMatch;
  let dBlockName;
  let dBlockArgs;
  let dBlockChildren;
  let dElementsName;

  if (!children.length && ((dBlockMatch = name.match(/^d-block:([\s\S]+)$/)) || name === 'd-block') && !args.name) {
    constructor = blocks['d-block'];
    dBlockName = dBlockMatch ? dBlockMatch[1] : null;
  } else if (name === 'd-block' && args.name) {
    name = 'd-elements';
    constructor = localBlocks[name];
    dElementsName = args.name;
    dBlockArgs = new Super(args).except('name').$;
    dBlockChildren = children;
    children = new Arr([]);
    args = {};
  }

  if (!constructor) {
    const {
      value,
      children
    } = node;

    const element = elem.create(name);
    const currentAttrs = Object.create(null);
    let attrs = Object.create(null);
    const mixinDefaultOpts = {
      elem: element,
      parentBlock,
      parentScope
    };

    new Super(args).forEach((value, attr) => {
      const isDRest = dRestRegExp.test(attr);
      const localAttrs = isDRest
        ? Object.create(attrs)
        : attrs;

      attrs = localAttrs;

      if (isDRest) {
        const restAttrs = parentScope.$$.evaluate(value, (value) => {
          setTimeout(() => {
            iterate(localAttrs, (value, arg) => {
              delete localAttrs[arg];
            });
            assign(localAttrs, transformRestAttrs(
              value, localMixins, mixinDefaultOpts
            ));
            calculateAttrs(attrs, currentAttrs, element, false);
          }, 0);
        }, parentBlock);

        return assign(localAttrs, transformRestAttrs(
          restAttrs, localMixins, mixinDefaultOpts
        ));
      }

      const match = mixinMatch(localMixins, attr);

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
        ? new Elem(element.$[0].content)
        : element;
      let prevBlock;

      children.forEach((child) => {
        prevBlock = createBlock({
          node: child,
          parent: parentElem,
          parentElem,
          parentBlock,
          parentScope,
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

  const blockInstance = new constructor({
    name,
    args,
    dBlockName,
    children,
    parent,
    parentElem,
    parentBlock,
    parentScope,
    prevBlock
  });

  const {
    $$,
    args: Args,
    global,
    ...locals
  } = blockInstance;

  if (dBlockArgs) {
    node = {
      attrs: dBlockArgs,
      children: dBlockChildren
    };
    node.name = parentScope.$$.evaluate(dElementsName, (newName) => {
      node.name = newName;

      const html = new Arr([node]);

      Args.value = newName === 'd-if'
        ? transformDIfChildren(html)
        : html;
    }, blockInstance, true);

    const html = new Arr([node]);

    Args.value = node.name === 'd-if'
      ? transformDIfChildren(html)
      : html;
    Args.parentScope = blockInstance;
  }

  const html = name === 'd-elements'
    ? new Arr(Args.value || [])
    : constructor._html;

  delete locals.$;
  delete locals.children;
  delete locals.parentScope;

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

  prevBlock = undefined;
  parentScope = name === 'd-elements'
    ? Args.parentScope
    : blockInstance;

  html.forEach((child) => {
    prevBlock = createBlock({
      node: child,
      parent: blockInstance,
      parentElem,
      parentBlock: blockInstance,
      parentScope,
      prevBlock
    });
  });

  try {
    blockInstance.afterRender();
  } catch (err) {
    console.error(`Uncaught error in ${ name }#afterRender:`, err);
  }

  return blockInstance;
}

function createMixin({ name, Mixin, dynamic, value, args, comment, elem, parentBlock, parentScope }) {
  const mixin = new Mixin({
    name,
    value,
    dynamic,
    args,
    comment,
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

  return mixin;
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
            children: ifElse
          });

          object.ifElse = null;
        }

        if (name === 'd-if') {
          object.ifElse = new Arr([child]);
        } else if (name) {
          html.push(child);
        }
      } else {
        (ifElse || html).push(child);

        if (name === 'd-else' && ifElse) {
          html.push({
            name: 'd-if',
            children: ifElse
          });

          object.ifElse = null;
        }
      }

      if (name) {
        child.children = transformDIfChildren(child.children);
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
    const isDEach = name === 'd-each';
    let { value } = child;
    let excludeLocal = {};

    if (isDEach) {
      excludeLocal = {
        [child.attrs.item || '$item']: true,
        [child.attrs.index || '$index']: true
      };
    }

    child.attrs = new Super(attrs).map((value, attr) => {
      if (value === true) {
        return true;
      }

      if (value[0] !== '{' || value[value.length - 1] !== '}') {
        return value;
      }

      const parsed = parseJS(value.slice(1, -1), value, true);

      if (!parsed) {
        return value;
      }

      if (parsed.rest) {
        throw new Error('Attribute, mixin and argument computed values must be of the format "{<js_expression>}"');
      }

      const isUID = attr === 'uid';

      const usedVariables = new Super(parsed.variables).filter((value, variable) => {
        if (isDEach && isUID && excludeLocal[variable]) {
          return;
        }

        if (!exclude[variable]) {
          return true;
        }
      }).$;

      assign(variables, usedVariables);

      return constructEvalFunction(parsed.expression, parsed.original);
    }).$;

    if (name !== '#text') {
      exclude = {
        ...exclude,
        ...excludeLocal
      };

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
          value
        });

        break;
      }

      const { index } = match;

      if (index) {
        children.push({
          name: '#text',
          value: value.slice(0, index)
        });
        value = value.slice(index);
      }

      const parsed = parseJS(value.slice(1), initialValue);

      if (!parsed) {
        children.push({
          name: '#text',
          value
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
        value: constructEvalFunction(parsed.expression, parsed.original)
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
      configurable: false,
      enumerable: true,
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

function calculateArgs(args, argsObject, $argsObject) {
  $argsObject.propertyNames().forEach((arg) => {
    if (!(arg in args)) {
      argsObject[arg] = undefined;
    }
  });

  for (const arg in args) {
    argsObject[arg] = args[arg];
  }
}

function transformRestArgs(args) {
  return new Super(args).object((args, value, arg) => {
    if (dRestRegExp.test(arg)) {
      assign(args, transformRestArgs(value));
    } else {
      args[arg] = value;
    }
  }).$;
}

function transformRestAttrs(attrs, mixins, mixinDefaultOpts) {
  return new Super(attrs).object((eventualAttrs, value, attr) => {
    if (dRestRegExp.test(attr)) {
      return assign(eventualAttrs, transformRestAttrs(value, mixins, mixinDefaultOpts));
    }

    const match = mixinMatch(mixins, attr);

    if (match) {
      eventualAttrs[attr] = {
        type: 'mixin',
        dynamic: true,
        opts: {
          value,
          ...match,
          ...mixinDefaultOpts
        },
        value
      };

      return;
    }

    eventualAttrs[attr] = {
      type: 'attr',
      value
    };
  }).$;
}

function mixinMatch(mixins, attr) {
  let match;

  for (const name in mixins) {
    const Mixin = mixins[name];
    const localMatch = attr.match(Mixin._match);

    if (localMatch) {
      const argsMatch = localMatch[1];
      let args;

      if (/^\s*$/.test(argsMatch)) {
        args = [];
      } else if (argsMatch) {
        args = new Str(argsMatch)
          .split(/,\s*/)
          .map((s) => new Str(s).trim())
          .$;
      }

      match = {
        args,
        comment: localMatch[2],
        Mixin,
        name
      };

      break;
    }
  }

  return match;
}

function calculateAttrs(attrs, attrsObject, elem, firstTime) {
  iterate(attrsObject, ({ type, value }, attr) => {
    if (!attrs[attr]) {
      if (type === 'attr') {
        elem.removeAttr(attr);
      } else {
        value.$$.remove();
      }

      delete attrsObject[attr];
    }
  });

  const mixins = new Arr([]);

  for (const attr in attrs) {
    const {
      type,
      dynamic,
      value,
      opts
    } = attrs[attr];
    let nextType;
    let nextDynamic;
    let nextValue;

    if (attrsObject[attr]) {
      const {
        type: prevType,
        value: mixin
      } = attrsObject[attr];

      if (type === 'attr') {
        if (prevType === 'mixin') {
          value.$$.remove();
        }

        elem.attr(attr, value);
      } else {
        if (prevType === 'attr') {
          elem.removeAttr(attr);
        }

        mixin.$$.isDynamic = dynamic;

        if (dynamic) {
          executeMixinWatchers(mixin, value);
        } else if (!mixin.$$.evaluated) {
          const newValue = mixin.$$.parentScope.$$.evaluate(value, (newValue) => {
            const {
              type,
              dynamic
            } = attrs[attr];

            if (type === 'mixin' && !dynamic) {
              executeMixinWatchers(mixin, newValue);
            }
          }, mixin);

          mixin.$$.evaluated = true;

          executeMixinWatchers(mixin, newValue);
        }
      }

      nextType = type;
      nextDynamic = dynamic;
      nextValue = mixin;
    } else {
      if (type === 'attr') {
        elem.attr(attr, value);
      } else {
        const buildMixin = () => {
          opts.dynamic = dynamic;

          const mixin = createMixin(opts);

          if (!dynamic && opts.Mixin.evaluate) {
            const {
              parentScope,
              value
            } = opts;
            const firstValue = parentScope.$$.evaluate(value, (newValue) => {
              const {
                type,
                dynamic
              } = attrs[attr];

              if (type === 'mixin' && !dynamic) {
                executeMixinWatchers(mixin, newValue);
              }
            }, mixin);

            mixin.$$.evaluated = true;
            mixin.$$.value = firstValue;
          }

          nextValue = mixin;

          return {
            attr,
            opts: {
              type,
              dynamic,
              value: mixin
            }
          };
        };

        if (firstTime) {
          mixins.push(buildMixin);
        } else {
          buildMixin();
        }
      }

      nextType = type;
      nextDynamic = dynamic;
    }

    attrsObject[attr] = {
      type: nextType,
      dynamic: nextDynamic,
      value: nextValue
    };
  }

  if (firstTime) {
    return () => {
      mixins.forEach((buildMixin) => {
        const {
          attr,
          opts
        } = buildMixin();

        attrsObject[attr] = opts;
      });
    };
  }
}

function executeMixinWatchers(mixin, value) {
  const oldValue = mixin.$$.value;

  mixin.$$.value = value;

  mixin.$$.watchers.forEach((watcher) => {
    watcher(value, oldValue);
  });
}

function constructMixinRegExp(name) {
  return new RegExp(`^${ new Str(name).escapeRegExp().$ }(?:\\(([^\\)]*)\\))?(?:#([\\s\\S]*))?$`);
}

function extendBlock(cls) {
  new Super(cls).proto(Block);
  new Super(cls.prototype).proto(Block.prototype);
}

export { Block, Mixin, initApp };
