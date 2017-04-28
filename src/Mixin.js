import {
  defineFrozenProperties,
  removeArrayElem, setToStringTag
} from './utils';
import { wrapMixin, removeWatchers } from './helpers/Block';

/**
 * @class Mixin
 * @public
 * @param {Object} opts - Mixin options.
 * @returns {Mixin} Instance of Mixin.
 */
class Mixin {
  /**
   * @member {Boolean} [Mixin.evaluate = true]
   * @type {Boolean}
   * @public
   * @description If the mixin value should be evaluated and watched or not.
   */
  static evaluate = true;

  /**
   * @method Mixin.wrap
   * @public
   * @param {...Wrapper} wrappers - Functions that return wrapped mixin.
   * @returns {typeof Mixin} New mixin.
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
          isParentSignal = !!isParentSignal;
          this.$$.isRemoved = true;

          removeWatchers(watchersToRemove);

          try {
            this.beforeRemove(isParentSignal);
          } catch (err) {
            console.error(`Uncaught error in ${ name }#beforeRemove:`, err);
          }

          if (!isParentSignal) {
            removeArrayElem(parentBlock.$$.mixins, this);
          }
        }
      }
    });

    /**
     * @member {String[]} [Mixin#args]
     * @type {String[]}
     * @public
     */
    this.args = args;

    /**
     * @member {String} [Mixin#comment]
     * @type {String}
     * @public
     */
    this.comment = comment;

    /**
     * @member {Block} [Mixin#parentBlock]
     * @type {Block}
     * @public
     */
    this.parentBlock = parentBlock;

    /**
     * @member {Block} [Mixin#parentScope]
     * @type {Block}
     * @public
     */
    this.parentScope = parentScope;

    /**
     * @member {Block} [Mixin#parentTemplate]
     * @type {Block}
     * @public
     */
    this.parentTemplate = parentTemplate;

    /**
     * @member {Elem} Mixin#elem
     * @type {Elem}
     * @public
     */
    this.elem = elem;

    /**
     * @member {Element} Mixin#node
     * @type {Element}
     * @public
     */
    this.node = elem[0];

    parentBlock.$$.mixins.push(this);
  }

  afterUpdate() {}

  /**
   * @method Mixin#beforeRemove
   * @public
   * @param {Boolean} isElementRemoved - If element removed as well.
   * @description Is called before the mixin removal.
   */
  beforeRemove(isElementRemoved) {}

  /**
   * @method Block#evaluate
   * @public
   * @param {Watcher} [callback] - If present, callback which is called when the mixin value is changed.
   * @returns {*} Evaluation result.
   * @description Method for evaluating the mixin value and watching for the changes.
   */
  evaluate(callback) {
    return this.$$.evaluate(callback);
  }

  toString() {
    return '[object Mixin]';
  }
}

setToStringTag(Mixin, 'Mixin');

export { Mixin };
