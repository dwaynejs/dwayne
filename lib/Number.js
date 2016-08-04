/**
 * @module Num
 * @private
 * @mixin
 * @description Exports Num class.
 */

import Super from './Super';
import Func from './Function';
import Promise from './Promise';
import constructors from './constants/constructors';
import {
  isNumber, isFinite,
  defineProperties, validate, Symbol,
  inherits, checkClassInstance, possibleSuperClassReturn
} from './helpers';

const toRadian = Math.PI / 180;
const toDegree = 180 / Math.PI;
const ln2 = Math.LN2;
const ln10 = Math.LN10;

/**
 * @class Num
 * @extends Super
 * @public
 * @param {Number} [number = 0] - A number to wrap.
 * @returns {Num} Instance of Num.
 * @description Wrap of a number.
 *
 * @example
 * const num = new Num(1);
 */
export function Num(number = 0) {
  checkClassInstance(this, Num, 'Num');

  return possibleSuperClassReturn(this, Super, [Number(number)]);

  /**
   * @member {Number} Num#$
   * @public
   * @description Original number.
   */
}

inherits(Num, Super);

defineProperties(Num.prototype, {
  /**
   * @member {Number} Num#abs
   * @public
   * @readonly
   * @returns {Number} Absolute value.
   * @description Synonym for
   * [Math.abs]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/abs}.
   *
   * @example
   * new Num(1).abs;  // 1
   * new Num(-1).abs; // 1
   */
  'get abs'() {
    return Math.abs(this.$);
  },

  /**
   * @member {Function} Num#acos
   * @public
   * @param {Boolean|*} [toDegrees = false] If it is truthy the return value is transformed into degrees.
   * @returns {Number} Arccosine of the number.
   * @description Synonym for
   * [Math.acos]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/acos}.
   */
  acos(toDegrees) {
    return (toDegrees ? toDegree : 1) * Math.acos(this.$);
  },

  /**
   * @member {Number} Num#acosh
   * @public
   * @readonly
   * @returns {Number} Hyperbolic arccosine.
   * @description Synonym for
   * [Math.acosh]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/acosh}.
   */
  'get acosh'() {
    const number = this.$;

    return Math.log(number + Math.sqrt(number * number - 1));
  },

  /**
   * @member {Number} Num#asinh
   * @public
   * @readonly
   * @returns {Number} Hyperbolic arcsine.
   * @description Synonym for
   * [Math.asinh]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/asinh}.
   */
  'get asinh'() {
    const number = this.$;

    return Math.log(number + Math.sqrt(number * number + 1));
  },

  /**
   * @member {Function} Num#asin
   * @public
   * @param {Boolean|*} [toDegrees = false] If it is truthy the return value is transformed into degrees.
   * @returns {Number} Arcsine of the number.
   * @description Synonym for
   * [Math.asin]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/asin}.
   */
  asin(toDegrees) {
    return (toDegrees ? toDegree : 1) * Math.asin(this.$);
  },

  /**
   * @member {Function} Num#atan
   * @public
   * @param {Boolean|*} [toDegrees = false] If it is truthy the return value is transformed into degrees.
   * @returns {Number} Arcsine of the number.
   * @description Synonym for
   * [Math.atan]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/atan}.
   */
  atan(toDegrees) {
    return (toDegrees ? toDegree : 1) * Math.atan(this.$);
  },

  /**
   * @member {Number} Num#atanh
   * @public
   * @readonly
   * @returns {Number} Hyperbolic arctangent.
   * @description Synonym for
   * [Math.atanh]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/atanh}.
   */
  'get atanh'() {
    const number = this.$;

    return Math.log((1 + number) / (1 - number)) / 2;
  },

  /**
   * @member {Number} Num#cbrt
   * @public
   * @readonly
   * @returns {Number} Cube root.
   * @description Synonym for
   * [Math.cbrt]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/cbrt}.
   */
  'get cbrt'() {
    const cbrt = Math.pow(Math.abs(this.$), 1 / 3);

    return this.$ > 0 ? cbrt : -cbrt;
  },

  /**
   * @member {Number} Num#ceil
   * @public
   * @readonly
   * @returns {Number} Ceil.
   * @description Synonym for
   * [Math.ceil]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil}.
   *
   * @example
   * new Num(1.1).ceil;  // 2
   * new Num(-1.1).ceil; // -1
   */
  'get ceil'() {
    return Math.ceil(this.$);
  },

  /**
   * @member {Function} Num#cos
   * @public
   * @param {Boolean|*} [asDegrees = false] If it is truthy the number is treated as a degree value.
   * @returns {Number} Cosine of the number.
   * @description Synonym for
   * [Math.cos]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/cos}.
   */
  cos(asDegrees) {
    return Math.cos((asDegrees ? toRadian : 1) * this.$);
  },

  /**
   * @member {Number} Num#cosh
   * @public
   * @readonly
   * @returns {Number} Hyperbolic cosine.
   * @description Synonym for
   * [Math.cosh]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/cosh}.
   */
  'get cosh'() {
    const exp = this.exp;

    return (exp + 1 / exp) / 2;
  },

  /**
   * @member {Number} Num#cube
   * @public
   * @readonly
   * @returns {Number} Cube of the number.
   * @description Cube of the number.
   *
   * @example
   * new Num(2).cube;  // 8
   * new Num(-3).ceil; // -27
   */
  'get cube'() {
    return this.$ * this.$ * this.$;
  },

  /**
   * @member {Number} Num#exp
   * @public
   * @readonly
   * @returns {Number} Exponent.
   * @description Synonym for
   * [Math.exp]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/exp}.
   */
  'get exp'() {
    return Math.exp(this.$);
  },

  /**
   * @member {Number} Num#floor
   * @public
   * @readonly
   * @returns {Number} Floor.
   * @description Synonym for
   * [Math.floor]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/floor}.
   *
   * @example
   * new Num(1.1).floor;  // 1
   * new Num(-1.1).floor; // -2
   */
  'get floor'() {
    return Math.floor(this.$);
  },

  /**
   * @member {Function} Num#interval
   * @public
   * @param {Function} func - Function that is called every <number> milliseconds.
   * @returns {Function} Function that aborts the interval. The context of the function (if it's not already bound)
   * is the object with tha abort method.
   * @description Analogue of the
   * [setInterval]{@link https://developer.mozilla.org/en/docs/Web/API/WindowTimers/setInterval}.
   *
   * @example
   * const times = 0;
   * new Num(50).interval(function () {
   *   if (++times === 10) {
   *     this.abort();
   *   }
   * });
   */
  interval(func) {
    validate([func], ['function'], 'Num#interval');

    func = new Func(func).bindContext({ abort });

    const number = this.$;
    const args = [].slice.call(arguments, 1);

    let timeout;
    let aborted;

    (function interval() {
      func.apply(null, args);

      if (!aborted) {
        timeout = setTimeout(interval, number);
      }
    })();

    return abort;

    function abort() {
      aborted = true;

      return clearTimeout(timeout);
    }
  },

  /**
   * @member {Number} Num#ln
   * @public
   * @readonly
   * @returns {Number} Natural logarithm.
   * @description Synonym for
   * [Math.log]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/log}.
   */
  'get ln'() {
    return Math.log(this.$);
  },

  /**
   * @member {Function} Num#log
   * @public
   * @param {Number} number - Number to get logarithm of.
   * @returns {Number} Logarithm of the argument number to the number base.
   * @description Returns the logarithm of the argument number to the number base.
   *
   * @example
   * new Num(2).log(16);  // 4
   * new Num(3).log(243); // 5
   */
  log(number) {
    return Math.log(number) / Math.log(this.$);
  },

  /**
   * @member {Number} Num#log2
   * @public
   * @readonly
   * @returns {Number} Base 2 logarithm.
   * @description Synonym for
   * [Math.log2]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/log2}.
   */
  'get log2'() {
    return this.ln / ln2;
  },

  /**
   * @member {Number} Num#log10
   * @public
   * @readonly
   * @returns {Number} Base 10 logarithm.
   * @description Synonym for
   * [Math.log10]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/log10}.
   */
  'get log10'() {
    return this.ln / ln10;
  },

  /**
   * @member {Function} Num#pow
   * @public
   * @param {Number} power - Power the number should be raised to.
   * @returns {Number} The number to the <power> power.
   * @description Synonym for
   * [Math.pow]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/pow}.
   *
   * @example
   * new Num(4).pow(.5); // 2
   * new Num(3).pow(2);  // 9
   */
  pow(power) {
    return Math.pow(this.$, power);
  },

  /**
   * @member {Function} Num#root
   * @public
   * @param {Number} power - Power the number should be raised to.
   * @returns {Number} The <power> root of the number.
   * @description Synonym for number.pow(1 / power);
   *
   * @example
   * new Num(4).root(2);   // 0.5
   * new Num(243).root(5); // 3
   */
  root(power) {
    return Math.pow(this.$, 1 / power);
  },

  /**
   * @member {Number} Num#round
   * @public
   * @readonly
   * @returns {Number} Rounded number.
   * @description Synonym for
   * [Math.round]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/round}.
   *
   * @example
   * new Num(1.1).floor;  // 1
   * new Num(-1.1).floor; // -1
   * new Num(1.5).floor;  // 2
   */
  'get round'() {
    return Math.round(this.$);
  },

  /**
   * @member {Number} Num#sign
   * @public
   * @readonly
   * @returns {Number} Number sign.
   * @description Synonym for
   * [Math.sign]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/sign}.
   */
  'get sign'() {
    const number = this.$;

    if (!number) {
      return number;
    }

    return number > 0 ? 1 : -1;
  },

  /**
   * @member {Function} Num#sin
   * @public
   * @param {Boolean|*} [asDegrees = false] If it is truthy the number is treated as a degree value.
   * @returns {Number} Sine of the number.
   * @description Synonym for
   * [Math.sin]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/sin}.
   */
  sin(asDegrees) {
    return Math.sin((asDegrees ? toRadian : 1) * this.$);
  },

  /**
   * @member {Number} Num#sinh
   * @public
   * @readonly
   * @returns {Number} Hyperbolic sine.
   * @description Synonym for
   * [Math.sinh]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/sinh}.
   */
  'get sinh'() {
    const exp = this.exp;

    return (exp - 1 / exp) / 2;
  },

  /**
   * @member {Number} Num#sq
   * @public
   * @readonly
   * @returns {Number} Squared number.
   * @description The square of the number.
   *
   * @example
   * new Num(2).sq;  // 4
   * new Num(-3).sq; // 9
   */
  'get sq'() {
    return this.$ * this.$;
  },

  /**
   * @member {Number} Num#sqrt
   * @public
   * @readonly
   * @returns {Number} Square root.
   * @description Synonym for
   * [Math.sqrt]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/sqrt}.
   */
  'get sqrt'() {
    return Math.sqrt(this.$);
  },

  /**
   * @member {Function} Num#tan
   * @public
   * @param {Boolean|*} [asDegrees = false] If it is truthy the number is treated as a degree value.
   * @returns {Number} Tangent of the number.
   * @description Synonym for
   * [Math.tan]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/tan}.
   */
  tan(asDegrees) {
    return Math.tan((asDegrees ? toRadian : 1) * this.$);
  },

  /**
   * @member {Number} Num#tanh
   * @public
   * @readonly
   * @returns {Number} Hyperbolic tangent.
   * @description Synonym for
   * [Math.tanh]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/tanh}.
   */
  'get tanh'() {
    const number = this.$;

    if (!isFinite(number)) {
      return this.sign;
    }

    const exp = Math.exp(2 * number);

    return (exp - 1) / (exp + 1);
  },

  /**
   * @member {Function} Num#timeout
   * @public
   * @param {*} [value] - Value to be resolved by the promise.
   * @returns {Promise} Promise that could be aborted.
   * @description Promise-based analogue of
   * {@link https://developer.mozilla.org/en/docs/Web/API/WindowTimers/setTimeout}.
   *
   * @example
   * new Num(50).timeout('resolved').then((value) => {
   *   console.log(value); // 'resolved'
   * });
   *
   * const promise = new Num(50).timeout();
   * promise.abort();
   */
  timeout(value) {
    let timeout;
    let reject;

    const promise = new Promise((resolve, rej) => {
      reject = rej;
      timeout = setTimeout(resolve, this.$, value);
    });

    promise.abort = function abort() {
      clearTimeout(timeout);

      reject(new Error('Timeout was aborted'));

      return this;
    };

    return promise;
  },

  /**
   * @member {Function} Num#toBase
   * @public
   * @param {Number} [base = 10] - Base that the number should inverted to.
   * @returns {String} A string representation of the number in <base> base.
   * @description Synonym for
   * [Number#toString]
   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Number/toString}.
   *
   * @example
   * new Num(4).toBase(2); // 100
   * new Num(3).toBase();  // 3
   */
  toBase(base = 10) {
    return this.$.toString(base);
  },

  /**
   * @member {Function} Num#toExponential
   * @public
   * @param {Number} [fractionDigits] - See
   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Number/toExponential}.
   * @returns {String} A string representation of the number in the exponential format.
   * @description Synonym for
   * [Number#toExponential]
   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Number/toExponential}.
   */
  toExponential(fractionDigits) {
    return this.$.toExponential(fractionDigits);
  },

  /**
   * @member {Function} Num#toFixed
   * @public
   * @param {Number} [digits] - See
   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed}.
   * @returns {String} Fixed-point formatted number.
   * @description Synonym for
   * [Number#toFixed]
   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed}.
   */
  toFixed(digits) {
    return this.$.toFixed(digits);
  },

  /**
   * @member {Function} Num#toPrecision
   * @public
   * @param {Number} [precision] - See
   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Number/toPrecision}.
   * @returns {String} A string representation of the number to the specified precision.
   * @description Synonym for
   * [Number#toPrecision]
   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Number/toPrecision}.
   */
  toPrecision(precision) {
    return this.$.toPrecision(precision);
  },

  valueOf() {
    return Number(this.$);
  },

  [Symbol.toStringTag]: 'Num'
});

constructors[1].push({
  check: isNumber,
  cls: Num
});

/**
 * @function rand
 * @param {Number} [start = 0] - Start of the range.
 * @param {Number} [end = 1] - End of the range.
 * @returns {Number} Random number.
 * @description Returns a random number in the range specified by the arguments.
 *
 * @example
 * rand(1, 5); // 2.315
 * rand(1, 5); // 4.356763
 */
export function rand(start = 0, end = 1) {
  return start + (end - start) * Math.random();
}

/**
 * @function random
 * @param {Integer} start - Start of the range.
 * @param {Integer} end - End of the range.
 * @returns {Number} Random integer.
 * @description Returns a random integer number in the range specified by the arguments.
 *
 * @example
 * random(1, 5); // 3
 * random(1, 5); // 1
 */
export function random(start, end) {
  validate([start, end], ['intLike', 'intLike'], 'random');

  if (end <= start) {
    throw new Error('The second argument must be greater than the first!');
  }

  return Math.floor(rand(start, end + 1));
}

export default Num;
