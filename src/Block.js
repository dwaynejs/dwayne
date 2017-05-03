import { Elem } from './Elem';
import {
  defineFrozenProperties,
  assign, iterateArray, iterateObject,
  isFunction, isArray,
  setToStringTag, hasOwnProperty,
  removeArrayElem, create,
  getProto, setProto
} from './utils';
import {
  constructMixinRegex, isInstanceOf, normalizeArgs,
  removeWatchers, removeWithParentSignal, cleanProperty,
  transformRestArgs, calculateArgs, wrapBlock
} from './helpers/Block';
import {
  D_REST_REGEX,
  rootBlocks, rootMixins
} from './constants';
import { Mixin } from './Mixin';

/**
 * @typedef {Object} Template
 * @public
 * @property {String[]} vars - Template used vars.
 * @property {Object[]} value - Template itself.
 */

/**
 * @typedef {Object[]} ScopelessTemplate
 * @public
 */

/**
 * @typedef {Error} EvaluationError
 * @public
 * @property {Function} func - Function which caused eval error.
 * @property {String} original - Evaluated expression original js.
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
 * @param {typeof Block|typeof Mixin} Block class to wrap.
 * @returns {typeof Block} New Block class.
 */

/**
 * @callback AfterUpdate
 * @public
 * @param {*} newValue - New value.
 * @param {*} oldValue - Old value.
 * @param {Mixin} mixin - Mixin instance.
 */

/**
 * @callback BlockRegisterHook
 * @public
 * @param {typeof Block} Block - Registering block.
 * @param {String} name - Block name.
 * @returns Return value is used for registering the block.
 * If Block subclass returned it's registered instead of the initial block, otherwise
 * the initial block is used.
 */

/**
 * @callback MixinRegisterHook
 * @public
 * @param {typeof Mixin} Mixin - Registering mixin.
 * @param {String} name - Mixin name.
 * @returns Return value is used for registering the mixin.
 * If Mixin subclass returned it's registered instead of the initial mixin, otherwise
 * the initial mixin is used.
 */

/**
 * @callback RemoveHook
 * @public
 */

const blockHooks = [];
const mixinHooks = [];
const TAG_NAME_REGEX = /^[a-z][a-z\d\-_.:!@#$%^&*()[\]{}='"\\]*$/i;
const ATTR_NAME_REGEX = /^[^\u0000-\u0020\s'">/=]+$/;
const toStringTag = '[object Block]';
const afterElem = new Elem();
const emptyObject = {};
let evalMode = false;
let gettingVars = [];

/**
 * @class Block
 * @extends null
 * @public
 * @param {Object} opts - Block options.
 * @returns {Block} Instance of Block.
 *
 * @example
 * import { Block, initApp } from 'dwayne';
 *
 * class App extends Block {
 *   static template = '<Hello text="{text}"/> ({ this.times })';
 *
 *   constructor(opts) {
 *     super(opts);
 *
 *     this.text = 'world';
 *     this.times = 0;
 *
 *     this.setInterval();
 *   }
 *
 *   setInterval() {
 *     this.interval = setInterval(() => {
 *       this.times++;
 *     });
 *   }
 *
 *   beforeRemove() {
 *     clearInterval(this.interval);
 *   }
 * }
 *
 * Block.block('App', App);
 * Block.block('Hello', html`Hello, {args.text}!`);
 *
 * initApp('App', document.getElementById('root'));
 */
class Block {
  /**
   * @member {Object.<String, typeof Block>} Block._blocks
   * @type {Object.<String, typeof Block>}
   * @protected
   * @description Block namespace blocks.
   */
  static _blocks = create(rootBlocks);

  /**
   * @member {Object.<String, typeof Mixin>} Block._mixins
   * @type {Object.<String, typeof Mixin>}
   * @protected
   * @description Block namespace mixins.
   */
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
   * @function Block.onEvalError
   * @public
   * @param {EvaluationError} err - The method is called when an evaluation error occurs.
   */
  static onEvalError(err) {
    console.error(`Eval error (evaluating "${ err.original || err.func }" in context of ${ err.block.$$.name }):`, err);
  }

  /**
   * @function Block.beforeRegisterBlock
   * @public
   * @param {BlockRegisterHook} hook - Block register hook.
   * @returns {RemoveHook}
   */
  static beforeRegisterBlock(hook) {
    blockHooks.push(hook);

    return () => {
      removeArrayElem(blockHooks, hook);
    };
  }

  /**
   * @function Block.beforeRegisterMixin
   * @public
   * @param {MixinRegisterHook} hook - Mixin register hook.
   * @returns {RemoveHook}
   */
  static beforeRegisterMixin(hook) {
    mixinHooks.push(hook);

    return () => {
      removeArrayElem(mixinHooks, hook);
    };
  }

  /**
   * @function Block.block
   * @public
   * @param {String} name - Block or mixin name.
   * @param {Template|ScopelessTemplate|typeof Block} Subclass - Subclass of Block or template string of it.
   * @returns {typeof Block|undefined} Returns registered Block or undefined if the block hasn't been registered.
   * @description Register block in the namespace of this.
   */
  static block(name, Subclass) {
    if (isFunction(Subclass) && !isInstanceOf(Block, Subclass)) {
      const constructor = Subclass;

      Subclass = class extends Block {
        static template = constructor.template;

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

    if (!isFunction(Subclass) && isArray(Subclass.vars) && isArray(Subclass.value)) {
      Subclass = class extends Block {
        static template = Subclass;
      };
    }

    if (!isInstanceOf(Block, Subclass)) {
      console.warn(`Block must be a template (array or an object from an html loader), a function or a class that extends Block class (name: "${ name }") (Block.block)`);

      return;
    }

    if (name === 'd-elements') {
      console.warn('The "d-elements" block is a built-in block so the block will not be registered (Block.block)');

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

    Subclass._blocks = hasOwnProperty(Subclass, '_blocks')
      ? Subclass._blocks
      : create(this._blocks);
    Subclass._mixins = hasOwnProperty(Subclass, '_mixins')
      ? Subclass._mixins
      : create(this._mixins);

    if (hasOwnProperty(Subclass, 'defaultArgs')) {
      setProto(Subclass.defaultArgs, null);
    }

    this._blocks[name] = Subclass;

    return Subclass;
  }

  /**
   * @function Block.get
   * @public
   * @param {String} name - Block name.
   * @returns {typeof Block|undefined} Returns registered Block with specified name.
   */
  static get(name) {
    return this._blocks[name];
  }

  /**
   * @function Block.getMixin
   * @public
   * @param {String} name - Mixin name.
   * @returns {typeof Mixin|undefined} Returns registered Mixin with specified name.
   */
  static getMixin(name) {
    return this._mixins[name];
  }

  /**
   * @function Block.mixin
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
      console.warn(`The "${ name }" class does not extend Mixin or is not an afterUpdate function, so it will not be registered (Block.mixin)`);

      return;
    }

    if (name === 'd-rest') {
      console.warn('The "d-rest" mixin is a built-in mixin so the mixin will not be registered (Block.mixin)');

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

    Subclass._match = constructMixinRegex(name);

    this._mixins[name] = Subclass;

    return Subclass;
  }

  /**
   * @function Block.wrap
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
      dBlockArgs,
      children,
      parent,
      parentElem,
      parentBlock,
      parentScope,
      parentTemplate,
      prevBlock
    } = opts;
    const watchersToRemove = [];
    const { constructor } = getProto(this);
    const childrenBlocks = [];
    const mixins = [];
    const isParentBlock = parent instanceof Block;

    defineFrozenProperties(this, {
      /**
       * @member {Object} Block#$$
       * @type {Object}
       * @protected
       * @property {Object} Block#$$.args - Private args scope.
       * @property {Block[]} Block#$$.children - Child blocks.
       * @property {Elem} Block#$$.content - Content elements.
       * @property {Object|void} Block#$$.dBlockArgs - d-block args.
       * @property {String|void} Block#$$.dBlockName - d-block name.
       * @property {Block[]} Block#$$.dBlocks - d-block's within the block.
       * @property {Function} Block#$$.evaluate - Evaluate function.
       * @property {Object} Block#$$.globals - Private globals scope.
       * @property {Object[]} Block#$$.htmlChildren - Block html children.
       * @property {Boolean} Block#$$.isRemoved - If the block is removed.
       * @property {Boolean} Block#$$.isRendered - If the block is rendered.
       * @property {Object} Block#$$.locals - Private locals scope.
       * @property {Mixin[]} Block#$$.mixins - Child mixins.
       * @property {Function[]} Block#$$.mixinsToBuild - Pending mixins builders.
       * @property {String} Block#$$.name - Block name.
       * @property {typeof Block} Block#$$.ns - Block constructor.
       * @property {Block|Elem|void} Block#$$.parent - Parent block or elem.
       * @property {Block|void} Block#$$.parentBlock - Parent block.
       * @property {Elem} parentElem - Parent element.
       * @property {Block|void} Block#$$.parentScope - Parent scope.
       * @property {Block|void} Block#$$.parentTemplate - Parent template.
       * @property {Block|Elem|void} Block#$$.prevBlock - Parent template.
       * @property {Watcher[]} Block#$$.watchers - Temporary vars watchers.
       * @property {Object[]} Block#$$.watchersToRemove - Watchers to remove before removing the block.
       */
      $$: {
        name,
        dBlockName,
        dBlockArgs,
        dBlocks: [],
        parent,
        parentElem,
        parentScope,
        parentBlock,
        parentTemplate,
        content: new Elem(),
        ns: constructor,
        htmlChildren: children || [],
        children: childrenBlocks,
        mixins,
        mixinsToBuild: [],
        prevBlock,
        watchersToRemove,
        isRemoved: false,
        isRendered: false,
        evaluate: (func, onChange, targetBlock, forDElements, forDItem) => {
          if (!isFunction(func)) {
            return func;
          }

          forDElements = !!forDElements;
          forDItem = !!forDItem;

          const scope = name === '#d-item' && !forDItem
            ? this.$$.scope
            : this;
          const { watchersToRemove } = targetBlock ? targetBlock.$$ : emptyObject;
          const onChangeFlag = !!onChange;

          const evaluate = () => {
            let result;

            if (onChangeFlag) {
              evalMode = true;
              gettingVars = [];
            }

            try {
              result = func(scope);
            } catch (err) {
              err.func = func;
              err.original = func.original;
              err.block = this;

              if (isFunction(constructor.onEvalError)) {
                try {
                  constructor.onEvalError(err);
                } catch (e) {
                  console.error(`Uncaught error in ${ name }.onEvalError:`, e);
                }
              }
            }

            if (onChangeFlag) {
              const localWatchers = [];

              iterateArray(gettingVars, (watchers) => {
                const watcher = () => {
                  iterateArray(localWatchers, (watcherBlock) => {
                    const {
                      watcher,
                      watchers
                    } = watcherBlock;

                    removeArrayElem(watchersToRemove, watcherBlock);
                    removeArrayElem(watchers, watcher);
                  });

                  const newResult = evaluate();

                  if (newResult !== result && !targetBlock.$$.isRemoved && !this.$$.isRemoved) {
                    onChange(newResult, result);
                  }
                };
                const watcherBlock = {
                  forDElements,
                  watcher,
                  watchers
                };

                localWatchers.push(watcherBlock);
                watchersToRemove.push(watcherBlock);
                watchers.push(watcher);
              });

              evalMode = false;
              gettingVars = [];
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
        changeContent: (newContent) => {
          this.$$.content = newContent;

          if (this.$$.isRendered && !this.$$.isRemoved) {
            try {
              this.afterDOMChange();
            } catch (err) {
              console.error(`Uncaught error in ${ name }#afterDOMChange:`, err);
            }
          }
        },
        addContent: (contentToAdd, notRecursive) => {
          const oldContent = this.$$.content;
          const index = oldContent.indexOf(contentToAdd[0].previousSibling) + 1;
          let newContent;

          if (index === 0) {
            newContent = contentToAdd.add(oldContent);
          } else {
            newContent = oldContent
              .slice(0, index)
              .add(contentToAdd, oldContent.slice(index));
          }

          this.$$.changeContent(newContent);

          if (isParentBlock && !notRecursive) {
            parent.$$.addContent(contentToAdd, notRecursive);
          }
        },
        moveContent: (contentToMove, after) => {
          const oldContent = this.$$.content;
          const index = oldContent.indexOf(contentToMove[0]);
          const indexToPut = oldContent.indexOf(after[0]) + 1;
          let newContent;

          if (indexToPut === 0) {
            newContent = contentToMove.add(
              oldContent.slice(indexToPut, index),
              oldContent.slice(index + contentToMove.length)
            );
          } else if (index > indexToPut) {
            newContent = oldContent
              .slice(0, indexToPut)
              .add(
                contentToMove,
                oldContent.slice(indexToPut, index),
                oldContent.slice(index + contentToMove.length)
              );
          } else {
            newContent = oldContent
              .slice(0, index)
              .add(
                oldContent.slice(index + contentToMove.length, indexToPut),
                contentToMove,
                oldContent.slice(indexToPut)
              );
          }

          this.$$.changeContent(newContent);

          if (isParentBlock && indexToPut) {
            parent.$$.moveContent(contentToMove, after);
          }
        },
        removeContent: (contentToRemove) => {
          this.$$.changeContent(this.$$.content.filter((elem) => (
            contentToRemove.indexOf(elem) === -1
          )));

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
    iterateArray(constructor.template.vars || [], (variable) => {
      this[variable] = this[variable];
    });

    const argsObject = create(null);
    const { defaultArgs } = constructor;
    let args = create(defaultArgs || null);
    let wasDRest;
    const argsChain = [];

    if (defaultArgs) {
      argsChain.push(defaultArgs);
    }

    argsChain.push(args);

    iterateObject(originalArgs, (value, arg) => {
      const isDRest = D_REST_REGEX.test(arg);
      const localArgs = isDRest || wasDRest
        ? create(args)
        : args;

      if (args !== localArgs) {
        argsChain.push(localArgs);
      }

      args = localArgs;

      if (isDRest) {
        const restArgs = parentScope.$$.evaluate(value, (value) => {
          iterateObject(localArgs, cleanProperty);
          assign(localArgs, transformRestArgs(value));
          calculateArgs(normalizeArgs(argsChain), args, argsObject);
        }, this);

        wasDRest = true;

        return assign(localArgs, transformRestArgs(restArgs));
      }

      const isDElements = name === 'd-elements';
      const forDElements = isDElements && arg === 'value';

      wasDRest = false;

      localArgs[arg] = parentScope.$$.evaluate(value, (value) => {
        localArgs[arg] = value;
        calculateArgs(normalizeArgs(argsChain), args, argsObject);
      }, this, forDElements, isDElements && parentBlock.$$.name === '#d-item');
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
      )
    });

    calculateArgs(normalizeArgs(argsChain), args, argsObject);

    if (parentBlock) {
      parentBlock.$$.children.push(this);
    }
  }

  /**
   * @function Block#afterConstruct
   * @public
   * @description Is called after block construction (including all scopes)
   * but before rendering the block and its children.
   */
  afterConstruct() {}

  /**
   * @function Block#afterDOMChange
   * @public
   * @description Is called after block DOM structure has changed. Note that
   * it's important not to modify the DOM structure within the block. You can only insert
   * elements to empty elements (which Dwayne considers empty) and remove ones from them.
   */
  afterDOMChange() {}

  /**
   * @function Block#afterRender
   * @public
   * @description Is called after block has been rendered.
   */
  afterRender() {}

  /**
   * @function Block#beforeRemove
   * @public
   * @description Is called before the block removal.
   */
  beforeRemove() {}

  /**
   * @function Block#getDOM
   * @public
   * @returns {Elem}
   * @description Returns DOM contents of the block.
   */
  getDOM() {
    return this.$$.content.slice();
  }

  /**
   * @function Block#getName
   * @public
   * @returns {String}
   * @description Returns Block name.
   */
  getName() {
    return this.$$.name;
  }

  /**
   * @function Block#getParentElem
   * @public
   * @returns {Elem|void}
   * @description Returns parent Elem.
   */
  getParentElem() {
    return this.$$.parentElem.slice();
  }

  /**
   * @function Block#getParentScope
   * @public
   * @returns {Block|void}
   * @description Returns block in which template the block is located in.
   */
  getParentScope() {
    return this.$$.parentScope;
  }

  /**
   * @function Block#getParentTemplate
   * @public
   * @returns {Block|void}
   * @description Returns block in which template the block is located in.
   */
  getParentTemplate() {
    return this.$$.parentTemplate;
  }

  /**
   * @function Block#evaluate
   * @public
   * @param {Function} func - Function to evaluate.
   * @param {Watcher} [callback] - If present, callback which is called when the expression value is changed.
   * @param {Block|Mixin} [target = this] - What block or mixin requests the value.
   * @returns {*} Evaluation result.
   * @description Method for evaluating an expression in context of the block and watching for the changes.
   */
  evaluate(func, callback, target = this) {
    return this.$$.evaluate(func, callback, target);
  }

  toString() {
    return toStringTag;
  }
}

setToStringTag(Block, 'Block');
setProto(Block.prototype, null);

export { Block, gettingVars, evalMode };
