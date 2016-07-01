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
import { isNumber, defineProperties, validate } from './helpers';

const toRadian = Math.PI / 180;
const toDegree = 180 / Math.PI;
const ln2 = Math.LN2;
const ln10 = Math.LN10;

export class Num extends Super {
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
	constructor(number = 0) {
    super(Number(number));

    /**
     * @member {Number} Num#$
     * @public
     * @description Original number.
     */
	}

  /**
   * @member {Number} Num#abs
   * @public
   * @readonly
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
   * @description Synonym for
   * [Math.acos]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/acos}.
   */
	acos(toDegrees) {
		return (toDegrees ? toDegree : 1) * Math.acos(this.$);
	}

  /**
   * @method Num#asin
   * @public
   * @param {Boolean|*} [toDegrees = false] If it is truthy the return value is transformed into degrees.
   * @returns {Number} Arcsine of the number.
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
   * @description Synonym for
   * [Math.atan]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/atan}.
   */
	atan(toDegrees) {
		return (toDegrees ? toDegree : 1) * Math.atan(this.$);
	}

  /**
   * @member {Number} Num#ceil
   * @public
   * @readonly
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
   * @description Synonym for
   * [Math.cos]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/cos}.
   */
	cos(asDegrees) {
		return Math.cos((asDegrees ? toRadian : 1) * this.$);
	}

  /**
   * @member {Number} Num#cube
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
   * @member {Number} Num#exp
   * @public
   * @readonly
   * @description Synonym for
   * [Math.exp]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/exp}.
   */
	get exp() {
		return Math.exp(this.$);
	}

  /**
   * @member {Number} Num#floor
   * @public
   * @readonly
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
		const args = Array.prototype.slice.call(arguments, 1);

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
	}

  /**
   * @member {Number} Num#ln
   * @public
   * @readonly
   * @description Synonym for
   * [Math.log]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/log}.
   */
  get ln() {
		return Math.log(this.$);
	}

  /**
   * @method Num#log
   * @public
   * @param {Number} number
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
   * @method Num#pow
   * @public
   * @param {Number} power
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
	}

  /**
   * @method Num#root
   * @public
   * @param {Number} power
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
   * @member {Number} Num#round
   * @public
   * @readonly
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
   * @method Num#sin
   * @public
   * @param {Boolean|*} [asDegrees = false] If it is truthy the number is treated as a degree value.
   * @returns {Number} Sine of the number.
   * @description Synonym for
   * [Math.sin]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/sin}.
   */
	sin(asDegrees) {
		return Math.sin((asDegrees ? toRadian : 1) * this.$);
	}

  /**
   * @member {Number} Num#sq
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
   * @member {Number} Num#sqrt
   * @public
   * @readonly
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
   * @description Synonym for
   * [Math.tan]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/tan}.
   */
  tan(asDegrees) {
		return Math.tan((asDegrees ? toRadian : 1) * this.$);
	}

  /**
   * @method Num#timeout
   * @public
   * @param {*} value - Value to be resolved by the promise.
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
	}

  /**
   * @method Num#base
   * @public
   * @param {Number} [base = 10]
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
	}

  /**
   * @method Num#toExponential
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
	}

  /**
   * @method Num#toFixed
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
	}

  /**
   * @method Num#toPrecision
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
	}

	valueOf() {
		return Number(this.$);
	}
}

defineProperties(Num.prototype, {
  /**
   * @member {Number} Num#acosh
   * @public
   * @readonly
   * @description Synonym for
   * [Math.acosh]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/acosh}.
   */
	'get acosh': (() => {
		if (Math.acosh) {
			return function () {
				return Math.acosh(this.$);
			};
		}

		return function () {
			const number = this.$;

			return Math.log(number + Math.sqrt(number*number - 1));
		};
	})(),

  /**
   * @member {Number} Num#asinh
   * @public
   * @readonly
   * @description Synonym for
   * [Math.asinh]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/asinh}.
   */
  'get asinh': (() => {
		if (Math.asinh) {
			return function () {
				return Math.asinh(this.$);
			};
		}

		return function () {
			const number = this.$;

			return Math.log(number + Math.sqrt(number*number + 1));
		};
	})(),

  /**
   * @member {Number} Num#atanh
   * @public
   * @readonly
   * @description Synonym for
   * [Math.atanh]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/atanh}.
   */
  'get atanh': (() => {
		if (Math.atanh) {
			return function () {
				return Math.atanh(this.$);
			};
		}

		return function () {
			const number = this.$;

			return Math.log((1 + number) / (1 - number)) / 2;
		};
	})(),

  /**
   * @member {Number} Num#cbrt
   * @public
   * @readonly
   * @description Synonym for
   * [Math.cbrt]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/cbrt}.
   */
	'get cbrt': (() => {
		if (Math.cbrt) {
			return function () {
				return Math.cbrt(this.$);
			};
		}

		return function () {
			const y = Math.pow(Math.abs(this.$), 1/3);

			return y > 0 ? y : -y;
		};
	})(),

  /**
   * @member {Number} Num#cosh
   * @public
   * @readonly
   * @description Synonym for
   * [Math.cosh]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/cosh}.
   */
	'get cosh': (() => {
		if (Math.cosh) {
			return function () {
				return Math.cosh(this.$);
			};
		}

		return function () {
			const exp = Math.exp(this.$);

			return (exp + 1/exp) / 2;
		};
	})(),

  /**
   * @member {Number} Num#log2
   * @public
   * @readonly
   * @description Synonym for
   * [Math.log2]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/log2}.
   */
	'get log2': (() => {
		if (Math.log2) {
			return function () {
				return Math.log2(this.$);
			};
		}

		return function () {
			return Math.log(this.$) / ln2;
		};
	})(),

  /**
   * @member {Number} Num#log10
   * @public
   * @readonly
   * @description Synonym for
   * [Math.log10]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/log10}.
   */
	'get log10': (() => {
		if (Math.log10) {
			return function () {
				return Math.log10(this.$);
			};
		}

		return function () {
			return Math.log(this.$) / ln10;
		};
	})(),

  /**
   * @member {Number} Num#sign
   * @public
   * @readonly
   * @description Synonym for
   * [Math.sign]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/sign}.
   */
	'get sign': (() => {
		if (Math.sign) {
			return function () {
				return Math.sign(this.$);
			};
		}

		return function () {
			const number = this.$;

			if (!number) {
				return number;
			}

			return number > 0 ? 1 : -1;
		};
	})(),

  /**
   * @member {Number} Num#sinh
   * @public
   * @readonly
   * @description Synonym for
   * [Math.sinh]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/sinh}.
   */
	'get sinh': (() => {
		if (Math.sinh) {
			return function () {
				return Math.sinh(this.$);
			};
		}

		return function () {
			const exp = Math.exp(this.$);

			return (exp - 1/exp) / 2;
		};
	})(),

  /**
   * @member {Number} Num#tanh
   * @public
   * @readonly
   * @description Synonym for
   * [Math.tanh]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/tanh}.
   */
	'get tanh': (() => {
		if (Math.tanh) {
			return function () {
				return Math.tanh(this.$);
			};
		}

		return function () {
			const number = this.$;

			if (number === Infinity) {
				return 1;
			}

			if (number === -Infinity) {
				return -1;
			}

			const exp = Math.exp(2 * number);

			return (exp - 1) / (exp + 1);
		};
	})()
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
    throw new Error('Second argument must be greater than first!');
  }

  return start + Math.floor((end - start + 1) * Math.random());
}

export default Num;
