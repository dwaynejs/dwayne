import { Elem } from './Elem';
import {
  defineFrozenProperties,
  assign, iterateArray, iterateObject,
  isFunction, setToStringTag,
  removeArrayElem, create,
  getProto, setProto
} from './utils';
import {
  normalizeArgs, removeWatchers, removeWithParentSignal,
  cleanProperty, InternalMixin, calculateArgs,
  wrapBlock, extendBlock, getDefaultArgs, isInstanceOf
} from './helpers/Block';
import { blocks, mixins } from './constants';
import { Mixin } from './Mixin';

/**
 * @typedef {BlockNode[]} Template
 * @public
 * @property {String[]} vars - Template used vars.
 */

/**
 * @typedef {Object} BlockNode
 * @public
 * @property {String|typeof Block} type - Block type.
 * @property {Object} [args] - Block args.
 * @property {BlockNode[]} children - Block children.
 * @property {*} value - Text or comment node value.
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
 *   static html = html`<Hello text="{text}"/> ({ this.times })`;
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
   * @member {Object} [Block.args = null]
   * @type {Object}
   * @public
   * @description Block args description.
   */
  static args = null;

  /**
   * @member {Object} [Block.defaultLocals = null]
   * @type {Object}
   * @public
   * @description Block default locals.
   */
  static defaultLocals = null;

  /**
   * @member {String} [Block.displayName = null]
   * @type {String}
   * @public
   * @description Block display name.
   */
  static displayName = null;

  /**
   * @member {Template} [Block.html = []]
   * @type {Template}
   * @public
   * @description Block template.
   */
  static html = [];

  /**
   * @method Block.extend
   * @public
   * @param {...(typeof Block)} blocks - Blocks that will be extended by the context.
   * @returns {typeof Block} Returns this.
   * @description Method for extending blocks. Usually used with extending the default block.
   */
  static extend(...blocks) {
    return blocks.reduce(extendBlock, this);
  }

  /**
   * @method Block.onEvalError
   * @public
   * @param {EvaluationError} err - The method is called when an evaluation error occurs.
   */
  static onEvalError(err) {
    console.error(`Eval error (evaluating "${ err.original || err.func }" in context of ${ err.block.$$.name }):`, err);
  }

  /**
   * @method Block.wrap
   * @public
   * @param {...Wrapper} wrappers - Functions that return wrapped block.
   * @returns {typeof Block} New block.
   * @description Method for wrapping blocks into another blocks.
   * It is considered best practice to just extends the old block with a new one.
   */
  static wrap(...wrappers) {
    return wrappers.reduce(wrapBlock, this);
  }

  constructor(opts) {
    const {
      args: originalArgs,
      DynamicBlockArgs,
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
    const name = constructor.displayName || constructor.name;
    const childrenBlocks = [];
    const childrenMixins = [];
    const isParentBlock = parent instanceof Block;
    const isElements = constructor === blocks.Elements;

    defineFrozenProperties(this, {
      /**
       * @member {Object} Block#$$
       * @type {Object}
       * @protected
       * @property {Object} Block#$$.args - Private args scope.
       * @property {Block[]} Block#$$.children - Child blocks.
       * @property {Elem} Block#$$.content - Content elements.
       * @property {Object|void} Block#$$.DynamicBlockArgs - DynamicBlock args.
       * @property {Function} Block#$$.evaluate - Evaluate function.
       * @property {Object} Block#$$.globals - Private globals scope.
       * @property {Object[]} Block#$$.htmlChildren - Block html children.
       * @property {Boolean} Block#$$.isRemoved - If the block is removed.
       * @property {Boolean} Block#$$.isRendered - If the block is rendered.
       * @property {Object} Block#$$.locals - Private locals scope.
       * @property {Mixin[]} Block#$$.mixins - Child mixins.
       * @property {Function[]} Block#$$.mixinsToBuild - Pending mixins builders.
       * @property {String} Block#$$.name - Block name.
       * @property {typeof Block} Block#$$.Constructor - Block constructor.
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
        DynamicBlockArgs,
        parent,
        parentElem,
        parentScope,
        parentBlock,
        parentTemplate,
        content: new Elem(),
        Constructor: constructor,
        htmlChildren: children || [],
        children: childrenBlocks,
        mixins: childrenMixins,
        mixinsToBuild: [],
        prevBlock,
        watchersToRemove,
        isRemoved: false,
        isRendered: false,
        evaluate: (func, onChange, targetBlock, forElements, forItem) => {
          if (!isFunction(func)) {
            return func;
          }

          forElements = !!forElements;

          const scope = constructor === blocks.Item && !forItem
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
                  forElements,
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
          iterateArray(childrenMixins, removeWithParentSignal);

          try {
            this._beforeRemove();
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
              this._afterDOMChange();
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
    iterateArray(constructor.html.vars || [], (variable) => {
      this[variable] = this[variable];
    });

    const argsObject = create(null);
    const {
      args: argsDescriptions
    } = constructor;
    const defaultArgs = getDefaultArgs(argsDescriptions);
    let args = create(defaultArgs);
    let wasRest;
    const argsChain = [defaultArgs, args];

    iterateObject(originalArgs, (value, arg) => {
      const isRest = value.mixin === mixins.Rest;
      const localArgs = isRest || wasRest
        ? create(args)
        : args;

      if (args !== localArgs) {
        argsChain.push(localArgs);
      }

      args = localArgs;

      if (isRest) {
        const restArgs = parentScope.$$.evaluate(value, (value) => {
          iterateObject(localArgs, cleanProperty);
          assign(localArgs, value);
          calculateArgs(normalizeArgs(argsChain), args, argsObject);
        }, this);

        wasRest = true;

        return assign(localArgs, restArgs);
      }

      wasRest = false;

      if (isInstanceOf(Mixin, value.mixin)) {
        localArgs[arg] = new InternalMixin({
          Mixin: value.mixin,
          args: value.args,
          value,
          parentScope,
          parentTemplate
        });

        return;
      }

      const forElements = isElements && arg === 'value';

      localArgs[arg] = parentScope.$$.evaluate(value, (value) => {
        localArgs[arg] = value;
        calculateArgs(normalizeArgs(argsChain), args, argsObject);
      }, this, forElements, isElements && parentBlock.$$.Constructor === blocks.Item);
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
   * @method Block#_afterConstruct
   * @protected
   */
  _afterConstruct() {
    this.afterConstruct();
  }

  /**
   * @method Block#afterConstruct
   * @public
   * @description Is called after block construction (including all scopes)
   * but before rendering the block and its children.
   */
  afterConstruct() {}

  /**
   * @method Block#_afterDOMChange
   * @protected
   */
  _afterDOMChange() {
    this.afterDOMChange();
  }

  /**
   * @method Block#afterDOMChange
   * @public
   * @description Is called after block DOM structure has changed. Note that
   * it's important not to modify the DOM structure within the block. You can only insert
   * elements to empty elements (which Dwayne considers empty) and remove ones from them.
   */
  afterDOMChange() {}

  /**
   * @method Block#_afterRender
   * @protected
   */
  _afterRender() {
    this.afterRender();
  }

  /**
   * @method Block#afterRender
   * @public
   * @description Is called after block has been rendered.
   */
  afterRender() {}

  /**
   * @method Block#_beforeRemove
   * @protected
   */
  _beforeRemove() {
    this.beforeRemove();
  }

  /**
   * @method Block#beforeRemove
   * @public
   * @description Is called before the block removal.
   */
  beforeRemove() {}

  /**
   * @method Block#getConstructor
   * @public
   * @returns {typeof Block}
   * @description Returns Block constructor.
   */
  getConstructor() {
    return getProto(this).constructor;
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
   * @method Block#getName
   * @public
   * @returns {String}
   * @description Returns Block name.
   */
  getName() {
    return this.$$.name;
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
   * @description Returns block in which template the block is located in.
   */
  getParentScope() {
    return this.$$.parentScope;
  }

  /**
   * @method Block#getParentTemplate
   * @public
   * @returns {Block|void}
   * @description Returns block in which template the block is located in.
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

  toString() {
    return toStringTag;
  }
}

setToStringTag(Block, 'Block');
setProto(Block.prototype, null);

export { Block, gettingVars, evalMode };
