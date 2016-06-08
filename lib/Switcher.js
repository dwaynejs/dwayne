/**
 * @module Switcher
 * @private
 * @mixin
 * @description Exports Switcher class.
 */

import { isArray, isFunction, isObject, isUndefined, iterate, supportSymbol } from './helpers';

export class Switcher {
  /**
   * @class Switcher
   * @public
   * @param {Object} [cases={}] - Object of cases.
   * @param {String} [mode="equals"] - Switcher mode.
   * @param {*} [def] - Switcher default value.
   * @returns {Switcher} - Instance of Switcher.
   * @description Switcher class for creating functions working similar to switch (value) {} construction,
   * but with the value assignment.
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
   * // See {@link switcher} examples for more information.
   */
  constructor(cases = {}, mode = 'equals', def) {
    if (arguments.length && !isObject(cases)) {
      if (arguments.length !== 1) {
        def = mode;
      }

      mode = cases;
      cases = {};
    }

    const eventualCases = [];

    iterate(cases, (value, Case) => {
      eventualCases.push({ case: Case, value });
    });

    function switcher(value) {
      const { mode, 'default': def, cases } = switcher.$;

      const ret = iterate(cases, ({ value: val, 'case': Case }) => {
        if (
          (mode === 'boolean' && Case) ||
          (mode === 'equals' && Case == value) ||
          (mode === 'strictEquals' && Case === value) ||
          (mode === 'call' && Case(value))
        ) {
          return { return: val };
        }
      });

      return !isUndefined(ret) ? (isFunction(ret.return) ? ret.return(value) : ret.return) : def;
    }

    Object.defineProperty(switcher, '$', {
      value: {
        cases: eventualCases,
        mode,
        default: def
      }
    });
    Object.setPrototypeOf(switcher, Switcher.prototype);

    return switcher;
  }

  /**
   * @method Switcher#case
   * @public
   * @param {(*|Array)} cases - Case or an array of cases.
   * @param {(*|Function)} value - Value that has to be assigned or a function
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
  'case'(cases, value) {
    if (!isArray(cases)) {
      cases = [cases];
    }

    iterate(cases, (Case) => {
      this.$.cases.push({ case: Case, value });
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
  'default'(def) {
    this.$.default = def;

    return this;
  }

  /**
   * @method Switcher#mode
   * @public
   * @param {String} mode - New switcher mode.
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
    this.$.mode = mode;

    return this;
  }
  
  toString() {
    return Function.prototype.toString.call(this);
  }
}

if (supportSymbol) {
  Switcher.prototype[Symbol.toStringTag] = 'Switcher';
}

/**
 * @function switcher
 * @public
 * @param {...*} args - Arguments that are passed to a Switcher constructor.
 * @returns {Switcher}
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
 */
export function switcher(...args) {
  return new Switcher(...args);
}

export default Switcher;
