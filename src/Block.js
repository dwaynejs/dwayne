/**
 * @module Block
 * @private
 * @mixin
 * @description Exports Block class.
 */

import { Elem } from './Elem';
import {
  defineFrozenProperties, defineProperties,
  assign, escapeRegex, mapObject,
  toObjectKeys, collectFromObject,
  iterateArray, iterateObject,
  isFunction, isNil, isArray,
  setToStringTag, hasOwnProperty,
  removeArrayElem, create,
  getProto, setProto, keys
} from './utils';
import * as Blocks from './blocks';
import * as Mixins from './mixins';

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

/**
 * @callback BlockRegisterHook
 * @public
 * @param {Block} Block - Registering block.
 * @param {String} name - Block name.
 * @returns Return value is used for registering the block.
 * If Block subclass returned it's registered instead of the initial block, otherwise
 * the initial block is used.
 */

/**
 * @callback MixinRegisterHook
 * @public
 * @param {Block} Mixin - Registering mixin.
 * @param {String} name - Mixin name.
 * @returns Return value is used for registering the mixin.
 * If Mixin subclass returned it's registered instead of the initial mixin, otherwise
 * the initial mixin is used.
 */

const rootBlocks = create(null);
const rootMixins = create(null);
const blockHooks = [];
const mixinHooks = [];
const { isPrototypeOf } = {};
const TAG_NAME_REGEX = /^[a-z][a-z\d\-_.:!@#$%^&*()[\]{}='"\\]*$/i;
const ATTR_NAME_REGEX = /^[\u0000-\u0020\s'">/=]+$/;
const SVG_NS = 'http://www.w3.org/2000/svg';
const D_REST_REGEX = /^d-rest(?:#|$)/;
const WATCHED_ARG_PREFIX_REGEX = /^args\./;
const WATCHED_GLOBAL_PREFIX_REGEX = /^globals\./;
const NAMED_D_BLOCK_REGEX = /^d-block:([\s\S]+)$/;
const COMMA_REGEX = /,/;
const afterElem = new Elem();
const emptyChildren = [];
const emptyAttrs = {};
let evalMode;
let getting = [];
let changed;

/**
 * @class Block
 * @public
 * @param {Object} opts - Element options.
 * @returns {Block} Instance of Block.
 * @description Class for dynamic templating.
 *
 * @example
 * import { D, Block, initApp } from 'dwayne';
 *
 * class App extends Block {
 *   static template = '<Hello text="{text}"/>';
 *
 *   constructor(opts) {
 *     super(opts);
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
 * Block.block('App', App);
 * Block.block('Hello', 'Hello, {args.text}!');
 *
 * initApp('App', document.getElementById('root'));
 */
class Block {
  static _blocks = create(rootBlocks);
  static _mixins = create(rootMixins);

  /**
   * @member {Object} [Block.defaultArgs = null]
   * @type {Object}
   * @public
   * @description Block default args.
   */
  static defaultArgs = null;

  /**
   * @member {Object} [Block.defaultLocals = null]
   * @type {Object}
   * @public
   * @description Block default locals.
   */
  static defaultLocals = null;

  /**
   * @member {Object} [Block.template = { vars: [], value: [] }]
   * @type {Object}
   * @public
   * @description Block template.
   */
  static template = {
    vars: [],
    value: []
  };

  /**
   * @method Block.onEvalError
   * @public
   * @param {EvaluationError} err - The method is called when an evaluation error occurs.
   */
  static onEvalError(err) {
    console.error(`Eval error (evaluating "${ err.expression }" in context of block "${ err.block.$$.name }"):`, err);
  }

  /**
   * @method Block.beforeRegisterBlock
   * @public
   * @param {BlockRegisterHook} hook - Block register hook.
   */
  static beforeRegisterBlock(hook) {
    blockHooks.push(hook);

    return () => {
      removeArrayElem(blockHooks, hook);
    };
  }

  /**
   * @method Block.beforeRegisterMixin
   * @public
   * @param {MixinRegisterHook} hook - Mixin register hook.
   */
  static beforeRegisterMixin(hook) {
    mixinHooks.push(hook);

    return () => {
      removeArrayElem(mixinHooks, hook);
    };
  }

  /**
   * @method Block.block
   * @public
   * @param {String} name - Block or mixin name.
   * @param {Template|typeof Block} Subclass - Subclass of Block or template string of it.
   * @returns {typeof Block|undefined} Returns registered Block or undefined if the block hasn't been registered.
   * @description Register block in the namespace of this.
   */
  static block(name, Subclass) {
    if (isFunction(Subclass) && !isInstanceOf(Block, Subclass)) {
      const constructor = Subclass;

      Subclass = class extends Block {
        constructor(opts) {
          super(opts);

          this::constructor(opts);
        }
      };
    }

    if (!isFunction(Subclass) && isArray(Subclass)) {
      Subclass = class extends Block {
        static template = {
          vars: [],
          value: Subclass
        };
      };
    }

    if (!isFunction(Subclass) && Subclass.vars && Subclass.value) {
      Subclass = class extends Block {
        static template = Subclass;
      };
    }

    if (!isFunction(Subclass)) {
      console.warn(`Block must be a string (representing a block template), a function or a class that extends Block class (name: "${ name }") (Block.block)`);

      return;
    }

    if (!isInstanceOf(Block, Subclass)) {
      extendBlock(Subclass);
    }

    if (rootBlocks[name]) {
      console.warn(`The "${ name }" block is a built-in block so the block will not be registered (Block.block)`);

      return;
    }

    if (!TAG_NAME_REGEX.test(name)) {
      console.warn(`Name "${ name }" is not allowed for blocks so the block will not be registered (Block.block)`);

      return;
    }

    if (!hasOwnProperty(this, '_blocks')) {
      this._blocks = create(getProto(this)._blocks);
    }

    if (!hasOwnProperty(this, 'defaultLocals')) {
      this.defaultLocals = {};
    }

    if (!hasOwnProperty(this, 'defaultArgs')) {
      this.defaultArgs = create(null);
    }

    try {
      Subclass = blockHooks.reduce((returnValue, hook) => {
        const currentReturnValue = hook(returnValue, name, this);

        return isInstanceOf(Block, currentReturnValue)
          ? currentReturnValue
          : returnValue;
      }, Subclass);
    } catch (err) {
      console.error('Uncaught error in "beforeRegisterBlock" hook:', err);
    }

    const {
      vars,
      value
    } = Subclass.template;

    Subclass._html = value;
    Subclass._vars = vars;

    if (hasOwnProperty(Subclass, 'defaultArgs')) {
      setProto(Subclass.defaultArgs, null);
    }

    this._blocks[name] = Subclass;

    return Subclass;
  }

  /**
   * @method Block.mixin
   * @public
   * @param {String} name - Block or mixin name.
   * @param {typeof Mixin|AfterUpdate} Subclass - Subclass of Mixin or AfterUpdate callback.
   * @returns {typeof Mixin|undefined} Returns registered Block or undefined if the block hasn't been registered.
   * @description Register mixin in the namespace of this.
   */
  static mixin(name, Subclass) {
    if (isFunction(Subclass) && !isInstanceOf(Mixin, Subclass)) {
      const afterUpdate = Subclass;

      Subclass = class extends Mixin {
        afterUpdate(newValue, oldValue) {
          this::afterUpdate(newValue, oldValue, this);
        }
      };
    }

    if (!isInstanceOf(Mixin, Subclass)) {
      console.warn(`The "${ name }" class does not extend Mixin and will not be registered (Block.mixin)`);

      return;
    }

    if (rootMixins[name]) {
      console.warn(`The "${ name }" mixin is a built-in mixin so the mixin will not be registered (Block.mixin)`);

      return;
    }

    if (!ATTR_NAME_REGEX.test(name)) {
      console.warn(`Name "${ name }" is not allowed for mixins so the mixin will not be registered (Block.mixin)`);

      return;
    }

    if (!hasOwnProperty(this, '_mixins')) {
      this._mixins = create(getProto(this)._mixins);
    }

    try {
      Subclass = mixinHooks.reduce((returnValue, hook) => {
        const currentReturnValue = hook(returnValue, name, this);

        return isInstanceOf(Mixin, currentReturnValue)
          ? currentReturnValue
          : returnValue;
      }, Subclass);
    } catch (err) {
      console.error('Uncaught error in "beforeRegisterMixin" hook:', err);
    }

    Subclass._match = constructMixinRegExp(name);

    this._mixins[name] = Subclass;

    return Subclass;
  }

  /**
   * @method Block.wrap
   * @public
   * @param {...Wrapper} wrappers - Functions that return wrapped block.
   * @returns {typeof Block} New block.
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
    return wrappers.reduce(wrapBlock, this);
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
      parentTemplate,
      prevBlock
    } = opts;
    const watchersToRemove = [];
    const constructor = getProto(this).constructor;
    const childrenBlocks = [];
    const mixins = [];
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
       * @property {Object[]} argsChildren - Block args children.
       * @property {Block[]} children - Child blocks.
       * @property {Mixin[]} mixins - Child mixins.
       * @property {Elem} parentElem - Parent element.
       * @property {Elem} content - Content elements.
       * @property {Function} evaluate - Evaluate function.
       * @property {Object} globals - Private globals scope.
       * @property {Object} locals - Private locals scope.
       * @property {Object[]} watchersToRemove - Watchers to remove before removing element.
       */
      $$: {
        name,
        dBlockName,
        dBlocks: [],
        parent,
        parentElem,
        parentScope,
        parentBlock,
        parentTemplate,
        content: new Elem(),
        ns: constructor,
        argsChildren: children,
        children: childrenBlocks,
        mixins,
        prevBlock,
        watchersToRemove,
        isRemoved: false,
        evaluate: (func, onChange, targetBlock, forDElements, forDItem, forDEach) => {
          if (!isFunction(func)) {
            return func;
          }

          forDElements = !!forDElements;
          forDItem = !!forDItem;

          const scope = (name === '#d-item' && !forDItem) || forDEach
            ? (forDEach || this).$$.scope
            : this;
          const { watchersToRemove } = targetBlock ? targetBlock.$$ : {};
          const onChangeFlag = !!onChange;

          const evaluate = () => {
            let result;

            if (onChangeFlag) {
              evalMode = true;
              getting = [];
            }

            try {
              result = func(scope);
            } catch (err) {
              err.expression = func.expression;
              err.original = func.original;
              err.block = this;

              if (isFunction(constructor.onEvalError)) {
                try {
                  constructor.onEvalError(err);
                } catch (e) {
                  console.error('Uncaught error in onEvalError:', e);
                }
              }
            }

            if (onChangeFlag) {
              const localWatchers = [];

              iterateArray(getting, (watchers) => {
                const watcher = () => {
                  const newResult = evaluate();

                  if (newResult !== result && !targetBlock.$$.isRemoved) {
                    onChange(newResult, result);
                  }
                };
                const watcherBlock = {
                  forDElements,
                  watcher,
                  watchers
                };

                watcher.onRemove = () => {
                  iterateArray(localWatchers, (watcherBlock) => {
                    const {
                      watcher,
                      watchers
                    } = watcherBlock;

                    removeArrayElem(watchersToRemove, watcherBlock);
                    removeArrayElem(watchers, watcher);
                  });
                };

                localWatchers.push(watcherBlock);
                watchersToRemove.push(watcherBlock);
                watchers.push(watcher);
              });

              evalMode = false;
              getting = [];
            }

            return result;
          };

          return evaluate();
        },
        remove: (isParentSignal) => {
          this.$$.isRemoved = true;

          removeWatchers(watchersToRemove);

          iterateArray(childrenBlocks, removeWithParentSignal);

          iterateArray(mixins, removeWithParentSignal);

          try {
            this.beforeRemove();
          } catch (err) {
            console.error(`Uncaught error in ${ name }#beforeRemove:`, err);
          }

          if (!isParentSignal && isParentBlock) {
            parent.$$.removeContent(this.$$.content);
          }

          if (!isParentSignal && parentBlock) {
            removeArrayElem(parentBlock.$$.children, this);
          }

          this.$$.content.remove();
        },
        addContent: (contentToAdd, notRecursive) => {
          const index = this.$$.content.indexOf(contentToAdd[0].previousSibling) + 1;

          if (index === 0) {
            this.$$.content = contentToAdd.add(this.$$.content);
          } else {
            this.$$.content = this.$$.content
              .slice(0, index)
              .add(contentToAdd, this.$$.content.slice(index));
          }

          if (isParentBlock && !notRecursive) {
            parent.$$.addContent(contentToAdd);
          }
        },
        moveContent: (contentToMove, after) => {
          const index = this.$$.content.indexOf(contentToMove[0]);
          const indexToPut = this.$$.content.indexOf(after[0]) + 1;

          if (indexToPut === 0) {
            this.$$.content = contentToMove.add(
              this.$$.content.slice(indexToPut, index),
              this.$$.content.slice(index + contentToMove.length)
            );
          } else if (index > indexToPut) {
            this.$$.content = this.$$.content
              .slice(0, indexToPut)
              .add(
                contentToMove,
                this.$$.content.slice(indexToPut, index),
                this.$$.content.slice(index + contentToMove.length)
              );
          } else {
            this.$$.content = this.$$.content
              .slice(0, index)
              .add(
                this.$$.content.slice(index + contentToMove.length, indexToPut),
                contentToMove,
                this.$$.content.slice(indexToPut)
              );
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
            after = this.$$.content.elem(-1);
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

    iterateObject(constructor.defaultLocals, (value, variable) => {
      this[variable] = value;
    });
    iterateArray(constructor._vars, (variable) => {
      this[variable] = this[variable];
    });

    const argsObject = create(null);
    let args = create(constructor.defaultArgs || null);
    let wasDRest;

    iterateObject(originalArgs, (value, arg) => {
      const isDRest = D_REST_REGEX.test(arg);
      const localArgs = isDRest || wasDRest
        ? create(args)
        : args;

      args = localArgs;

      if (isDRest) {
        const restArgs = parentScope.$$.evaluate(value, (value) => {
          iterateObject(localArgs, cleanProperty);
          assign(localArgs, transformRestArgs(value));
          calculateArgs(args, argsObject);
        }, this);

        wasDRest = true;

        return assign(localArgs, transformRestArgs(restArgs));
      }

      const isDElements = name === 'd-elements';
      const forDElements = isDElements && arg === 'value';

      wasDRest = false;

      if (name !== 'd-each' || arg !== 'uid') {
        value = parentScope.$$.evaluate(value, (value) => {
          localArgs[arg] = value;
          calculateArgs(args, argsObject);
        }, this, forDElements, isDElements && parentBlock.$$.name === '#d-item');
      }

      localArgs[arg] = value;
    });

    defineFrozenProperties(this, {
      /**
       * @member {Object} Block#args
       * @type {Object}
       * @public
       */
      args: argsObject,

      /**
       * @member {Object} Block#globals
       * @type {Object}
       * @public
       */
      globals: create(
        parentScope
          ? parentScope.globals
          : null
      ),

      /**
       * @member {Block|undefined} Block#parentScope
       * @type {Block|undefined}
       * @public
       */
      parentScope,

      /**
       * @member {Block|undefined} Block#parentTemplate
       * @type {Block|undefined}
       * @public
       */
      parentTemplate
    });

    calculateArgs(args, argsObject);

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
   * @method Block#beforeRemove
   * @public
   * @description Is called before the block removal.
   */
  beforeRemove() {}

  /**
   * @method Block#getContent
   * @public
   * @returns {Elem}
   * @description Returns contents of the block.
   */
  getContent() {
    return this.$$.content.slice();
  }

  /**
   * @method Block#evaluateAndWatch
   * @public
   * @param {Function} func - Function to evaluate.
   * @param {Watcher} callback - Callback which is called when the expression value is changed.
   * @returns {*} Evaluation result.
   * @description Method for evaluating an expression in context of the block and watching for the changes.
   */
  evaluateAndWatch(func, callback) {
    return this.$$.evaluate(func, callback, this);
  }

  /**
   * @method Block#watch
   * @public
   * @param {...('args'|'globals'|String)} [vars] - Vars to watch (args, globals or locals).
   * If no specified all locals, args and globals are to be watched.
   * If the 'args' string all args are to be watched.
   * If the 'globals' string all globals are to be watched.
   * @param {VarsWatcher} watcher - Called when watched vars are changed.
   * @description Method for watching for vars. If no vars passed in arguments
   * all vars are to be watched. If the 'args' string is in the arguments all args are to be watched.
   * If the 'globals' string is in the arguments all globals are to be watched.
   * Otherwise specified vars will be watched.
   * Watchers should not be put inside the constructor. It is considered best
   * practice to do it inside the {@link Block#afterConstruct} method.
   * Note that these expressions (vars, i.e. "args.arg") are not to be
   * evaluated so you cannot put there things like "a[b]" or any js code,
   * only expressions like "a", "b", "args.a", "args.b" and "globals.a", "globals.b".
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
   *     this.watch('args.a', 'globals.r', () => {});
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
      watchForAllLocals(this, watcher);
      watchForAllArgs(this, watcher);
      watchForAllGlobals(this, watcher);

      oldWatcher();

      return;
    }

    iterateArray(arguments, (variable) => {
      if (variable === oldWatcher) {
        return;
      }

      variable = `${ variable }`;

      if (variable === '$') {
        return watchForAllLocals(this, watcher);
      }

      if (variable === 'args') {
        return watchForAllArgs(this, watcher);
      }

      if (variable === 'globals') {
        return watchForAllGlobals(this, watcher);
      }

      if (WATCHED_ARG_PREFIX_REGEX.test(variable)) {
        variable = variable.replace(WATCHED_ARG_PREFIX_REGEX, '');

        if (!this.$$.args[variable]) {
          return;
        }

        this.$$.args[variable].watchers.perm.push(watcher);

        return;
      }

      if (WATCHED_GLOBAL_PREFIX_REGEX.test(variable)) {
        variable = variable.replace(WATCHED_GLOBAL_PREFIX_REGEX, '');

        if (!this.$$.globals[variable]) {
          return;
        }

        const { watchers } = this.$$.globals[variable];

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

setToStringTag(Block, 'Block');
setProto(Block.prototype, null);

registerBuiltIns(Blocks, rootBlocks, Block);

const blocks = Block._blocks;

class Mixin {
  static evaluate = true;

  /**
   * @method Mixin.wrap
   * @public
   * @param {...Wrapper} wrappers - Functions that return wrapped mixin.
   * @returns {Mixin} New mixin.
   * @description Method for wrapping mixins.
   * It is considered best practice to just extends the old mixin with a new one.
   */
  static wrap(...wrappers) {
    return wrappers.reduce(wrapMixin, this);
  }

  constructor(opts) {
    const {
      name,
      value,
      dynamic,
      elem,
      args,
      comment,
      parentBlock,
      parentScope,
      parentTemplate
    } = opts;
    const watchersToRemove = [];
    const watchers = [];

    defineFrozenProperties(this, {
      $$: {
        name,
        _value: value,
        value,
        isDynamic: dynamic,
        parentScope,
        parentBlock,
        parentTemplate,
        watchers,
        watchersToRemove,
        isRemoved: false,
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
          this.$$.isRemoved = true;

          removeWatchers(watchersToRemove);

          try {
            this.beforeRemove();
          } catch (err) {
            console.error(`Uncaught error in ${ name }#beforeRemove:`, err);
          }

          if (!isParentSignal && parentBlock) {
            removeArrayElem(parentBlock.$$.mixins, this);
          }
        }
      }
    });

    this.args = args;
    this.comment = comment;
    this.parentScope = parentScope;
    this.parentTemplate = parentTemplate;
    this.elem = elem;
    this.node = elem[0];

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

setToStringTag(Mixin, 'Mixin');

registerBuiltIns(Mixins, rootMixins, Mixin);

const mixins = Block._mixins;

function initApp(html, node) {
  const parentElem = new Elem(node).elem(0);

  if (!parentElem.length) {
    throw new Error('No valid element to insert the app into was given! (initApp)');
  }

  if (parentElem.prop('DwayneRootBlock')) {
    throw new Error('There already exists a Dwayne app inside the given element! (initApp)');
  }

  if (isArray(html)) {
    html = {
      vars: [],
      value: html
    };
  }

  class RootBlock extends Block {
    static _vars = html.vars;
    static _html = html.value
  }

  const block = createBlock({
    node: {
      name: '#RootBlock'
    },
    Constructor: RootBlock,
    parent: parentElem,
    parentElem
  });

  parentElem
    .prop('DwayneRootBlock', block)
    .attr('dwayne-root', '');
}

function removeApp(node) {
  const elem = new Elem(node);

  if (!elem.length) {
    throw new Error('No valid element to remove the app from was given! (removeApp)');
  }

  const { DwayneRootBlock } = elem[0];

  if (!DwayneRootBlock) {
    throw new Error('No app registered inside the given element! (removeApp)');
  }

  DwayneRootBlock.$$.remove();
  elem.removeAttr('dwayne-root');

  delete elem[0].DwayneRootBlock;
}

function registerBuiltIns(set, scope, proto) {
  iterateObject(set, (register) => {
    const {
      name,
      value
    } = register(proto, createBlock, Block);

    if (proto === Block) {
      const {
        vars,
        value: html
      } = value.template;

      value._html = html;
      value._vars = vars;
    } else {
      value._match = constructMixinRegExp(name);
    }

    scope[name] = value;
  });
}

function createBlock({ node, Constructor, parent, parentElem, parentBlock, parentScope, parentTemplate, prevBlock }) {
  const doc = new Elem(parentElem[0].ownerDocument);
  const elem = parentElem[0].namespaceURI === SVG_NS
    ? doc.create('svg')
    : doc;
  const localBlocks = parentScope ? parentScope.$$.ns._blocks : blocks;
  const localMixins = parentScope ? parentScope.$$.ns._mixins : mixins;
  let children = node.children = node.children || emptyChildren;
  let args = node.attrs = node.attrs || emptyAttrs;
  let name = node.name || 'UnknownBlock';
  let constructor = Constructor || (node.name && localBlocks[node.name]);
  let dBlockMatch;
  let dBlockName;
  let dBlockArgs;
  let dBlockChildren;
  let dElementsName;

  if (name === 'd-block' && args.name) {
    name = 'd-elements';
    constructor = localBlocks[name];
    dElementsName = args.name;
    dBlockArgs = args;
    dBlockChildren = children;
    children = emptyChildren;

    delete args.name;
    args = {};
  } else if (name === 'd-block' && hasOwnProperty(args, 'constructor')) {
    name = 'UnknownBlock';
    constructor = parentScope.$$.evaluate(args.constructor);

    if (isFunction(constructor)) {
      delete args.constructor;
    } else {
      constructor = null;
    }
  } else if ((dBlockMatch = name.match(NAMED_D_BLOCK_REGEX)) || name === 'd-block') {
    constructor = blocks['d-block'];
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

  if (dBlockMatch || name === 'd-block') {
    parentScope.$$.dBlocks.push(blockInstance);
  }

  if (dBlockArgs) {
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

  try {
    blockInstance.afterRender();
  } catch (err) {
    console.error(`Uncaught error in ${ name }#afterRender:`, err);
  }

  return blockInstance;
}

function createMixin({ name, Mixin, dynamic, value, args, comment, elem, parentBlock, parentScope, parentTemplate }) {
  const mixin = new Mixin({
    name,
    value,
    dynamic,
    args,
    comment,
    elem,
    parentBlock,
    parentScope,
    parentTemplate
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

function isInstanceOf(Class, Subclass) {
  return Class::isPrototypeOf(Subclass) && Class.prototype::isPrototypeOf(Subclass.prototype);
}

function removeWatchers(watchersToRemove) {
  iterateArray(watchersToRemove, removeWatcher);
}

function constructPrivateScope(object, type, parentScope) {
  let scope = {};

  if (type === 'globals') {
    scope = create(
      parentScope
        ? parentScope.$$.globals
        : null
    );
  }

  return collectFromObject(object, (scope, value, key) => {
    scope[key] = {
      value,
      watchers: {
        temp: [],
        perm: []
      }
    };
  }, scope);
}

function constructPublicScope(scope, scopeValues, privateScope) {
  defineProperties(scope, mapObject(scopeValues, (value, key) => {
    const scope = privateScope[key];
    const { watchers } = scope;

    return {
      configurable: false,
      enumerable: true,
      get() {
        if (evalMode) {
          if (getting.indexOf(watchers.temp) === -1) {
            getting.push(watchers.temp);
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

        const oldTempWatchers = watchers.temp.slice();
        const oldValue = scope.value;

        watchers.temp = [];
        scope.value = value;

        iterateArray(oldTempWatchers, removeTempWatcher);
        changed.push({
          scope,
          oldValue,
          value
        });

        setTimeout(() => {
          if (!changed) {
            return;
          }

          const was = [];
          const values = [];

          for (let i = changed.length - 1; i >= 0; i--) {
            const {
              scope,
              value,
              oldValue
            } = changed[i];

            iterateArray(scope.watchers.perm, (watcher) => {
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

          iterateArray(was, (watcher, i) => {
            const {
              value,
              oldValue
            } = values[i];

            watcher(value, oldValue);
          });
        }, 0);
      }
    };
  }));
}

function watchForAllLocals(block, watcher) {
  iterateObject(block.$$.locals, ({ watchers }) => {
    watchers.perm.push(watcher);
  });
}

function watchForAllGlobals(block, watcher) {
  const {
    globals,
    watchersToRemove
  } = block.$$;

  for (const glob in globals) {
    /* eslint guard-for-in: 0 */
    const watchers = globals[glob].watchers.perm;

    watchers.push(watcher);
    watchersToRemove.push({
      watcher,
      watchers
    });
  }
}

function watchForAllArgs(block, watcher) {
  iterateObject(block.$$.args, ({ watchers }) => {
    watchers.perm.push(watcher);
  });
}

function calculateArgs(args, argsObject) {
  iterateArray(keys(argsObject), (arg) => {
    if (!(arg in args)) {
      argsObject[arg] = undefined;
    }
  });

  for (const arg in args) {
    argsObject[arg] = args[arg];
  }
}

function transformRestArgs(args) {
  return collectFromObject(args, addArgs);
}

function transformRestAttrs(attrs, mixins, mixinDefaultOpts) {
  return collectFromObject(attrs, (eventualAttrs, value, attr) => {
    if (D_REST_REGEX.test(attr)) {
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
  });
}

function mixinMatch(mixins, attr) {
  let match;

  for (const name in mixins) {
    const Mixin = mixins[name];
    const localMatch = attr.match(Mixin._match);

    if (localMatch) {
      const argsMatch = localMatch[1];
      let args;

      if (argsMatch === '') {
        args = [];
      } else if (argsMatch) {
        args = argsMatch.split(COMMA_REGEX);
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
  iterateObject(attrsObject, ({ type, value }, attr) => {
    if (!attrs[attr]) {
      if (type === 'attr') {
        elem.removeAttr(attr);
      } else {
        value.$$.remove();
      }

      delete attrsObject[attr];
    }
  });

  const mixins = [];

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
        value: prevValue
      } = attrsObject[attr];

      if (type === 'attr') {
        if (prevType === 'mixin') {
          prevValue.$$.remove();
        }

        if (prevValue !== value) {
          elem.attr(attr, value);
        }

        nextValue = value;
      } else {
        const mixin = prevValue;

        if (prevType === 'attr') {
          elem.removeAttr(attr);
        }

        mixin.$$.isDynamic = dynamic;

        if (dynamic) {
          executeMixinWatchers(mixin, value);
        } else if (!mixin.$$.evaluated && opts.Mixin.evaluate) {
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

        nextValue = mixin;
      }

      nextType = type;
      nextDynamic = dynamic;
    } else {
      if (type === 'attr') {
        elem.attr(attr, value);

        nextValue = value;
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
      iterateArray(mixins, (buildMixin) => {
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

  iterateArray(mixin.$$.watchers, (watcher) => {
    watcher(value, oldValue);
  });
}

function constructMixinRegExp(name) {
  return new RegExp(`^${ escapeRegex(name) }(?:\\(([^\\)]*)\\))?(?:#([\\s\\S]*))?$`);
}

function extendBlock(cls) {
  setProto(cls, Block);
  setProto(cls.prototype, Block.prototype);
}

function insertTemplates(template, templates) {
  const { vars, value } = template;
  const newTemplates = create(null);
  const newVars = toObjectKeys(vars);

  assign(newTemplates, templates);
  iterateArray(value, forEachNode);

  function forEachNode({ type, value, children }, index, tree) {
    if (type === '#comment') {
      value = value.trim();

      if (newTemplates[value]) {
        tree[index] = newTemplates[value].value;
        assign(newVars, toObjectKeys(newTemplates[value].vars));
      }
    } else {
      iterateArray(children, forEachNode);
    }
  }

  vars.length = 0;
  vars.push(...keys(newVars));

  return template;
}

function wrapBlock(block, wrapper) {
  const returnValue = wrapper(block);

  return isInstanceOf(Block, returnValue)
    ? returnValue
    : block;
}

function wrapMixin(mixin, wrapper) {
  const returnValue = wrapper(mixin);

  return isInstanceOf(Mixin, returnValue)
    ? returnValue
    : mixin;
}

function removeWithParentSignal(child) {
  child.$$.remove(true);
}

function remove(child) {
  child.$$.remove();
}

function cleanProperty(value, arg, object) {
  delete object[arg];
}

function removeWatcher({ watcher, watchers }) {
  removeArrayElem(watchers, watcher);
}

function removeTempWatcher(watcher) {
  watcher.onRemove();
  watcher();
}

function addArgs(args, value, arg) {
  if (D_REST_REGEX.test(arg)) {
    assign(args, transformRestArgs(value));
  } else {
    args[arg] = value;
  }
}

export { Block, Mixin, initApp, removeApp, insertTemplates };
