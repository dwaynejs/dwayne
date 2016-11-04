/**
 * @module Switcher
 * @private
 * @mixin
 * @description Exports Switcher class.
 */

import {
  isArray, isFunction, isString, isUndefined,
  iterate, Symbol, toArray, defineProperties
} from './helpers';

/**
 * @typedef {'boolean'|'equals'|'strictEquals'|'call'} SwitcherMode
 * @public
 * @description Enum type of switcher modes.
 */

/**
 * @callback SwitcherCallCallback
 * @public
 * @param {*} value - Switcher value.
 * @returns {Boolean|*} On what the callback returns depends if the case is a match (truthy for the match).
 */

/**
 * @callback SwitcherMatchCallback
 * @public
 * @param {...*} args - Arguments from the second argument that switcher was called with.
 * @param {*} value - Switcher value.
 * @param {*} matched - Switcher matched case.
 */

/**
 * @class Switcher
 * @public
 * @param {Object} [cases = {}] - Object of cases.
 * @param {SwitcherMode} [mode = 'equals'] - Switcher mode.
 * @param {*} [defaultValue] - Switcher default value.
 * @returns {Switcher} - Instance of Switcher.
 * @description Switcher class for creating functions working similar to switch (value) {} construction,
 * but with the value assignment. Switcher instance is a function that accepts a value argument and an optional
 * args argument. Args with additional switcher value and matched case
 * are passed into the function of the matched case (if it is a function).
 *
 * @example
 * const switcher = new Switcher();
 * const switcher = new Switcher({
 *   case1: 'value1',
 *   case2: 'value2'
 * });
 * const switcher = new Switcher('strictEquals');
 * const switcher = new Switcher({
 *   case1: 'value1',
 *   case2: 'value2'
 * }, 'strictEquals');
 * const switcher = new Switcher('strictEquals', 'defaultValue');
 * const switcher = new Switcher({
 *   case1: 'value1',
 *   case2: 'value2'
 * }, 'strictEquals', 'defaultValue');
 *
 * // See [switcher]{@link switcher} examples for more information.
 */
class Switcher extends Function {
  constructor(cases = {}, mode = 'equals', defaultValue) {
    super();

    if (isString(cases)) {
      if (!isUndefined(arguments[1])) {
        defaultValue = mode;
      }

      mode = cases;
      cases = {};
    }

    const eventualCases = [];

    iterate(cases, (value, Case) => {
      eventualCases.push({ case: Case, value });
    });

    function switcher(value, args = []) {
      const { mode, default: def, cases } = switcher.$$;

      let ret = iterate(cases, ({ value: val, case: Case }) => {
        if (
          (mode === 'boolean' && Case) ||
          /* eslint eqeqeq: 0 */
          (mode === 'equals' && Case == value) ||
          (mode === 'strictEquals' && Case === value) ||
          (mode === 'call' && Case(value))
        ) {
          return { case: Case, value: val };
        }
      });

      if (isUndefined(ret)) {
        ret = { value: def };
      }

      if (!isFunction(ret.value)) {
        return ret.value;
      }

      args = toArray(args, true);
      args.push(value, ret.case);

      return ret.value.apply(null, args);
    }

    /**
     * @member Switcher#$$
     * @type {Object}
     * @protected
     * @property {Array} cases - Array of cases.
     * @property {SwitcherMode} mode - Switcher mode.
     * @property {*} default - Switcher default value.
     * @description Config parameters.
     */
    Object.defineProperty(switcher, '$$', {
      value: {
        cases: eventualCases,
        mode,
        default: defaultValue
      }
    });
    Object.setPrototypeOf(switcher, Switcher.prototype);

    return switcher;
  }

  /**
   * @method Switcher#case
   * @public
   * @param {*|SwitcherCallCallback|Array.<*|SwitcherCallCallback>} cases - Case or an array of cases.
   * @param {*|SwitcherMatchCallback} value - Value that has to be assigned or a function
   * that is called with switcher value, if it's the case.
   * @returns {Switcher} Returns this.
   * @description Method for defining new cases.
   *
   * @example
   * const sw = new Switcher()
   *   .case(1, 'one')
   *   .case(2, 'two');
   *
   * sw(1); // 'one'
   * sw(2); // 'two'
   */
  case(cases, value) {
    if (!isArray(cases)) {
      cases = [cases];
    }

    iterate(cases, (Case) => {
      this.$$.cases.push({ case: Case, value });
    });

    return this;
  }

  /**
   * @method Switcher#default
   * @public
   * @param {*} def - New default value.
   * @returns {Switcher} Returns this.
   * @description Method for redefining default switcher value.
   *
   * @example
   * const sw = new Switcher()
   *   .case(1, 'one')
   *   .default('three');
   *
   * sw(1); // 'one'
   * sw(2); // 'three'
   */
  default(def) {
    this.$$.default = def;

    return this;
  }

  /**
   * @method Switcher#mode
   * @public
   * @param {SwitcherMode} mode - New switcher mode.
   * @returns {Switcher} Returns this.
   * @description Method for redefining switcher mode.
   *
   * @example
   * const sw = new Switcher()
   *   .mode('strictEquals')
   *   .case(1, 'number')
   *   .case('1', 'string');
   *
   * sw(1);   // 'number'
   * sw('1'); // 'string'
   */
  mode(mode) {
    this.$$.mode = mode;

    return this;
  }
}

defineProperties(Switcher.prototype, {
  [Symbol.toStringTag]: 'Switcher'
});

/**
 * @function switcher
 * @public
 * @param {Object} [cases = {}] - Object of cases.
 * @param {SwitcherMode} [mode = 'equals'] - Switcher mode.
 * @param {*} [defaultValue] - Switcher default value.
 * @returns {Switcher} New instance of Switcher.
 * @description Simple wrap of [new Switcher(...)]{@link Switcher}.
 * 
 * @example
 * const sw = switcher({
 *   1: 'foo',
 *   2: 'bar'
 * });
 * sw(1); // 'foo'
 * sw(2); // 'bar'
 * sw(3); // undefined
 * 
 * @example
 * const sw = switcher()
 *   .case([1, 2], 'foo')
 *   .case(3, 'bar');
 *   
 * sw(1); // 'foo'
 * sw(2); // 'foo'
 * sw(3); // 'bar'
 * 
 * @example
 * const sw = switcher('call')
 *   .case(isArray, 'array')
 *   .case(isString, 'string')
 *   .case(isNumber, 'number')
 *   .default('rest');
 *   
 * sw([]);    // 'array'
 * sw('foo'); // 'string'
 * sw(123);   // 'number'
 * sw({});    // 'rest'
 * 
 * @example
 * const sw = switcher({
 *   1: (value) => {
 *     console.log(value + 1);
 *   },
 *   2: () => {
 *     console.log(value - 1);
 *   }
 * });
 * 
 * sw(1); // 2
 * sw(2); // 1
 * 
 * @example
 * const sw = switcher({
 *   first: (array) => array[0],
 *   last: (array) => array[array.length - 1]
 * }, 'equals', (array, index) => array[index]);
 * const array = [1, 2, 3, 4];
 * 
 * sw('first', [array]); // 1
 * sw('last', [array]);  // 4
 * sw(1, [array]);       // 2
 * sw(2, [array]);       // 3
 */
function switcher(cases, mode, defaultValue) {
  return new Switcher(...arguments);
}

/**
 * @function when
 * @public
 * @param {Boolean|*} condition - Condition used for returning the proper value.
 * @param {*} value1 - Value if the condition is truthy.
 * @param {*} value2 - Value if the condition is falsey.
 * @returns {*} value1 or value2.
 * @description Synonym for
 * [ternary operator]{@link https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Operators/Conditional_Operator}.
 * 
 * @example
 * when(true, 'true', 'false'); // 'true'
 */
function when(condition, value1, value2) {
  return condition ? value1 : value2;
}

export { Switcher, switcher, when };
