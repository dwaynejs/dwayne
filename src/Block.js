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
  constructMixinRegex, isInstanceOf,
  removeWatchers, removeWithParentSignal, cleanProperty,
  transformRestArgs, calculateArgs,
  watchForAllArgs, watchForAllGlobals, watchForAllLocals,
  extendBlock, wrapBlock
} from './helpers/Block';
import {
  D_REST_REGEX, Scope,
  rootBlocks, rootMixins
} from './constants';
import { initApp } from './initApp';

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
 * @param {typeof Block|typeof Mixin} Block class to wrap.
 * @returns {typeof Block} New Block class.
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

const blockHooks = [];
const mixinHooks = [];
const TAG_NAME_REGEX = /^[a-z][a-z\d\-_.:!@#$%^&*()[\]{}='"\\]*$/i;
const ATTR_NAME_REGEX = /^[\u0000-\u0020\s'">/=]+$/;
const WATCHED_ARG_PREFIX_REGEX = /^args\./;
const WATCHED_GLOBAL_PREFIX_REGEX = /^globals\./;
const afterElem = new Elem();

/**
 * @class Block
 * @extends null
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
 * initApp(html`<App/>`, document.getElementById('root'));
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
   * @method Block.get
   * @public
   * @param {String} name - Block name.
   * @returns {typeof Block|undefined} Returns registered Block with specified name.
   */
  static get(name) {
    return (this._blocks || {})[name];
  }

  /**
   * @method Block.init
   * @public
   * @param {Elem|Element} [container] - Container of the app.
   * @returns {void}
   * @description Method for initializing app.
   */
  static init(container) {
    const klass = this;

    initApp(htmlScopeless`<d-block Constructor="{klass}"/>`, container);
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

    Subclass._match = constructMixinRegex(name);

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
       * @property {Object[]} htmlChildren - Block html children.
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
        htmlChildren: children,
        children: childrenBlocks,
        mixins,
        prevBlock,
        watchersToRemove,
        isRemoved: false,
        isRendered: false,
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
              Scope.evalMode = true;
              Scope.gettingVars = [];
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

              iterateArray(Scope.gettingVars, (watchers) => {
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

              Scope.evalMode = false;
              Scope.gettingVars = [];
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

          if (this.$$.isRendered) {
            try {
              this.afterDOMChange();
            } catch (err) {
              console.error(`Uncaught error in ${ name }#afterContentChange:`, err);
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
      )
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
   * @method Block#afterDOMChange
   * @public
   * @description Is called after block DOM structure has changed.
   */
  afterDOMChange() {}

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
   * @method Block#getChildBlocks
   * @public
   * @returns {Block[]}
   * @description Returns child blocks.
   */
  getChildBlocks() {
    return this.$$.blocks.slice();
  }

  /**
   * @method Block#getChildBlocks
   * @public
   * @returns {Mixin[]}
   * @description Returns child mixins.
   */
  getChildMixins() {
    return this.$$.mixins.slice();
  }

  /**
   * @method Block#getChildren
   * @public
   * @returns {Object[]}
   * @description Returns Block HTML children.
   */
  getChildren() {
    return this.$$.htmlChildren;
  }

  /**
   * @method Block#getDOM
   * @public
   * @returns {Elem}
   * @description Returns DOM contents of the block.
   */
  getDOM() {
    return this.$$.content.slice();
  }

  /**
   * @method Block#getParentBlock
   * @public
   * @returns {Block|void}
   * @description Returns parent block.
   */
  getParentBlock() {
    return this.$$.parentBlock;
  }

  /**
   * @method Block#getParentElem
   * @public
   * @returns {Elem|void}
   * @description Returns parent Elem.
   */
  getParentElem() {
    return this.$$.parentElem.slice();
  }

  /**
   * @method Block#getParentScope
   * @public
   * @returns {Block|void}
   * @description Returns parent scope.
   */
  getParentScope() {
    return this.$$.parentScope;
  }

  /**
   * @method Block#getParentTemplate
   * @public
   * @returns {Block|void}
   * @description Returns parent template.
   */
  getParentTemplate() {
    return this.$$.parentTemplate;
  }

  /**
   * @method Block#evaluate
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

export { Block };
