/**
 * @module Num
 * @private
 * @mixin
 * @description Exports Num class.
 */

import { Super } from './Super';
import { Func } from './Func';
import { Promise } from './Promise';
import { constructors } from './constants';
import {
  isNumber, isFinite, toArray,
  defineProperties, validate, Symbol
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
class Num extends Super {
  constructor(number = 0) {
    super(number);

    /**
     * @member Num#$
     * @type {Number}
     * @public
     * @description Original number.
     */
  }

  /**
   * @member Num#abs
   * @type {Number}
   * @public
   * @readonly
   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/abs
   * @description Synonym for
   * [Math.abs]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/abs}.
   *
   * @example
   * new Num(1).abs;  // 1
   * new Num(-1).abs; // 1
   */
  get abs() {
    return Math.abs(this.$);
  }

  /**
   * @method Num#acos
   * @public
   * @param {Boolean|*} [toDegrees = false] If it is truthy the return value is transformed into degrees.
   * @returns {Number} Arccosine of the number.
   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/acos
   * @description Synonym for
   * [Math.acos]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/acos}.
   */
  acos(toDegrees) {
    return (toDegrees ? toDegree : 1) * Math.acos(this.$);
  }

  /**
   * @member Num#acosh
   * @type {Number}
   * @public
   * @readonly
   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/acosh
   * @description Synonym for
   * [Math.acosh]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/acosh}.
   */
  get acosh() {
    const number = this.$;

    return Math.log(number + Math.sqrt(number * number - 1));
  }

  /**
   * @member Num#asinh
   * @type {Number}
   * @public
   * @readonly
   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/asinh
   * @description Synonym for
   * [Math.asinh]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/asinh}.
   */
  get asinh() {
    const number = this.$;

    return Math.log(number + Math.sqrt(number * number + 1));
  }

  /**
   * @method Num#asin
   * @public
   * @param {Boolean|*} [toDegrees = false] If it is truthy the return value is transformed into degrees.
   * @returns {Number} Arcsine of the number.
   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/asin
   * @description Synonym for
   * [Math.asin]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/asin}.
   */
  asin(toDegrees) {
    return (toDegrees ? toDegree : 1) * Math.asin(this.$);
  }

  /**
   * @method Num#atan
   * @public
   * @param {Boolean|*} [toDegrees = false] If it is truthy the return value is transformed into degrees.
   * @returns {Number} Arcsine of the number.
   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/atan
   * @description Synonym for
   * [Math.atan]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/atan}.
   */
  atan(toDegrees) {
    return (toDegrees ? toDegree : 1) * Math.atan(this.$);
  }

  /**
   * @member Num#atanh
   * @type {Number}
   * @public
   * @readonly
   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/atanh
   * @description Synonym for
   * [Math.atanh]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/atanh}.
   */
  get atanh() {
    const number = this.$;

    return Math.log((1 + number) / (1 - number)) / 2;
  }

  /**
   * @member Num#cbrt
   * @type {Number}
   * @public
   * @readonly
   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/cbrt
   * @description Synonym for
   * [Math.cbrt]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/cbrt}.
   */
  get cbrt() {
    const cbrt = Math.pow(Math.abs(this.$), 1 / 3);

    return this.$ > 0 ? cbrt : -cbrt;
  }

  /**
   * @member Num#ceil
   * @type {Number}
   * @public
   * @readonly
   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil
   * @description Synonym for
   * [Math.ceil]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil}.
   *
   * @example
   * new Num(1.1).ceil;  // 2
   * new Num(-1.1).ceil; // -1
   */
  get ceil() {
    return Math.ceil(this.$);
  }

  /**
   * @method Num#cos
   * @public
   * @param {Boolean|*} [asDegrees = false] If it is truthy the number is treated as a degree value.
   * @returns {Number} Cosine of the number.
   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/cos
   * @description Synonym for
   * [Math.cos]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/cos}.
   */
  cos(asDegrees) {
    return Math.cos((asDegrees ? toRadian : 1) * this.$);
  }

  /**
   * @member Num#cosh
   * @type {Number}
   * @public
   * @readonly
   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/cosh
   * @description Synonym for
   * [Math.cosh]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/cosh}.
   */
  get cosh() {
    const exp = this.exp;

    return (exp + 1 / exp) / 2;
  }

  /**
   * @member Num#cube
   * @type {Number}
   * @public
   * @readonly
   * @description Cube of the number.
   *
   * @example
   * new Num(2).cube;  // 8
   * new Num(-3).ceil; // -27
   */
  get cube() {
    return this.$ * this.$ * this.$;
  }

  /**
   * @member Num#exp
   * @type {Number}
   * @public
   * @readonly
   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/exp
   * @description Synonym for
   * [Math.exp]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/exp}.
   */
  get exp() {
    return Math.exp(this.$);
  }

  /**
   * @member Num#floor
   * @type {Number}
   * @public
   * @readonly
   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/floor
   * @description Synonym for
   * [Math.floor]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/floor}.
   *
   * @example
   * new Num(1.1).floor;  // 1
   * new Num(-1.1).floor; // -2
   */
  get floor() {
    return Math.floor(this.$);
  }

  /**
   * @method Num#interval
   * @public
   * @param {Function} func - Function that is called every <number> milliseconds.
   * @param {Array} [args] - Arguments passed to the function.
   * @returns {Function} Function that aborts the interval. The context of the function (if it's not already bound)
   * is the object with the abort method.
   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/setInterval
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
  interval(func, args = []) {
    validate([func], ['function'], 'Num#interval');

    func = new Func(func).bindContext({ abort });
    args = toArray(args);

    const number = this.$;

    let timeout;
    let aborted;

    setTimeout(function interval() {
      func.apply(null, args);

      if (!aborted) {
        timeout = setTimeout(interval, number);
      }
    }, 0);

    return abort;

    function abort() {
      aborted = true;

      return clearTimeout(timeout);
    }
  }

  /**
   * @member Num#ln
   * @type {Number}
   * @public
   * @readonly
   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/log
   * @description Synonym for
   * [Math.log]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/log}.
   */
  get ln() {
    return Math.log(this.$);
  }

  /**
   * @method Num#log
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
  }

  /**
   * @member Num#log2
   * @type {Number}
   * @public
   * @readonly
   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/log2
   * @description Synonym for
   * [Math.log2]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/log2}.
   */
  get log2() {
    return this.ln / ln2;
  }

  /**
   * @member Num#log10
   * @type {Number}
   * @public
   * @readonly
   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/log10
   * @description Synonym for
   * [Math.log10]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/log10}.
   */
  get log10() {
    return this.ln / ln10;
  }

  /**
   * @method Num#pow
   * @public
   * @param {Number} power - Power the number should be raised to.
   * @returns {Number} The number to the <power> power.
   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/pow
   * @description Synonym for
   * [Math.pow]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/pow}.
   *
   * @example
   * new Num(4).pow(.5); // 2
   * new Num(3).pow(2);  // 9
   */
  pow(power) {
    return Math.pow(this.$, power);
  }

  /**
   * @method Num#root
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
  }

  /**
   * @member Num#round
   * @type {Number}
   * @public
   * @readonly
   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/round
   * @description Synonym for
   * [Math.round]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/round}.
   *
   * @example
   * new Num(1.1).floor;  // 1
   * new Num(-1.1).floor; // -1
   * new Num(1.5).floor;  // 2
   */
  get round() {
    return Math.round(this.$);
  }

  /**
   * @member Num#sign
   * @type {Number}
   * @public
   * @readonly
   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/sign
   * @description Synonym for
   * [Math.sign]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/sign}.
   */
  get sign() {
    const number = this.$;

    if (!number) {
      return number;
    }

    return number > 0 ? 1 : -1;
  }

  /**
   * @method Num#sin
   * @public
   * @param {Boolean|*} [asDegrees = false] If it is truthy the number is treated as a degree value.
   * @returns {Number} Sine of the number.
   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/sin
   * @description Synonym for
   * [Math.sin]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/sin}.
   */
  sin(asDegrees) {
    return Math.sin((asDegrees ? toRadian : 1) * this.$);
  }

  /**
   * @member Num#sinh
   * @type {Number}
   * @public
   * @readonly
   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/sinh
   * @description Synonym for
   * [Math.sinh]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/sinh}.
   */
  get sinh() {
    const exp = this.exp;

    return (exp - 1 / exp) / 2;
  }

  /**
   * @member Num#sq
   * @type {Number}
   * @public
   * @readonly
   * @description The square of the number.
   *
   * @example
   * new Num(2).sq;  // 4
   * new Num(-3).sq; // 9
   */
  get sq() {
    return this.$ * this.$;
  }

  /**
   * @member Num#sqrt
   * @type {Number}
   * @public
   * @readonly
   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/sqrt
   * @description Synonym for
   * [Math.sqrt]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/sqrt}.
   */
  get sqrt() {
    return Math.sqrt(this.$);
  }

  /**
   * @method Num#tan
   * @public
   * @param {Boolean|*} [asDegrees = false] If it is truthy the number is treated as a degree value.
   * @returns {Number} Tangent of the number.
   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/tan
   * @description Synonym for
   * [Math.tan]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/tan}.
   */
  tan(asDegrees) {
    return Math.tan((asDegrees ? toRadian : 1) * this.$);
  }

  /**
   * @member Num#tanh
   * @type {Number}
   * @public
   * @readonly
   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/tanh
   * @description Synonym for
   * [Math.tanh]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/tanh}.
   */
  get tanh() {
    const number = this.$;

    if (!isFinite(number)) {
      return this.sign;
    }

    const exp = Math.exp(2 * number);

    return (exp - 1) / (exp + 1);
  }

  /**
   * @method Num#timeout
   * @public
   * @param {*} [value] - Value to be resolved by the promise.
   * @returns {Promise} Promise that could be aborted.
   * @see https://developer.mozilla.org/en/docs/Web/API/WindowTimers/setTimeout
   * @description Promise-based analogue of
   * [setTimeout]{@link https://developer.mozilla.org/en/docs/Web/API/WindowTimers/setTimeout}.
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
  }

  /**
   * @method Num#toBase
   * @public
   * @param {Number} [base = 10] - Base that the number should inverted to.
   * @returns {String} A string representation of the number in <base> base.
   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Number/toString
   * @description Synonym for
   * [Number#toString]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Number/toString}.
   *
   * @example
   * new Num(4).toBase(2); // 100
   * new Num(3).toBase();  // 3
   */
  toBase(base = 10) {
    return this.$.toString(base);
  }

  /**
   * @method Num#toExponential
   * @public
   * @param {Number} [fractionDigits] - See the link.
   * @returns {String} A string representation of the number in the exponential format.
   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Number/toExponential
   * @description Synonym for
   * [Number#toExponential]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Number/toExponential}.
   */
  toExponential(fractionDigits) {
    return this.$.toExponential(fractionDigits);
  }

  /**
   * @method Num#toFixed
   * @public
   * @param {Number} [digits = 0] - See the link.
   * @returns {String} Fixed-point formatted number.
   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed
   * @description Synonym for
   * [Number#toFixed]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed}.
   */
  toFixed(digits) {
    return this.$.toFixed(digits);
  }

  /**
   * @method Num#toPrecision
   * @public
   * @param {Number} [precision] - See the link.
   * @returns {String} A string representation of the number to the specified precision.
   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Number/toPrecision
   * @description Synonym for
   * [Number#toPrecision]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Number/toPrecision}.
   */
  toPrecision(precision) {
    return this.$.toPrecision(precision);
  }

  valueOf() {
    return Number(this.$);
  }
}

defineProperties(Num.prototype, {
  [Symbol.toStringTag]: 'Num'
});

constructors[1].push({
  check: isNumber,
  cls: Num
});

/**
 * @function rand
 * @public
 * @param {Number} [start = 0] - Start of the range.
 * @param {Number} [end = 1] - End of the range.
 * @returns {Number} Random number.
 * @description Returns a random number in the range specified by the arguments.
 *
 * @example
 * rand(1, 5); // 2.315
 * rand(1, 5); // 4.356763
 */
function rand(start = 0, end = 1) {
  return start + (end - start) * Math.random();
}

/**
 * @function random
 * @public
 * @param {Integer} start - Start of the range.
 * @param {Integer} end - End of the range.
 * @returns {Number} Random integer.
 * @description Returns a random integer number in the range specified by the arguments.
 *
 * @example
 * random(1, 5); // 3
 * random(1, 5); // 1
 */
function random(start, end) {
  validate([start, end], ['intLike', 'intLike'], 'random');

  if (end <= start) {
    throw new Error('The second argument must be greater than the first!', 'random');
  }

  return Math.floor(rand(start, end + 1));
}

export { Num, rand, random };
