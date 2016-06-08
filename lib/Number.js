import Super from './Super';
import Func from './Function';
import Promise from './Promise';
import constructors from './constants/constructors';
import { isNumber, defineProperties, validate } from './helpers';

const NativeNumber = global.Number;
const toRadian = Math.PI / 180;
const toDegree = 180 / Math.PI;
const ln2 = Math.LN2;
const ln10 = Math.LN10;

export class Number extends Super {
	constructor(number = 0) {
		super(number);
	}

	get abs() {
		return Math.abs(this.$);
	}
	acos(cond) {
		return (cond ? toDegree : 1) * Math.acos(this.$);
	}
	asin(cond) {
		return (cond ? toDegree : 1) * Math.asin(this.$);
	}
	atan(cond) {
		return (cond ? toDegree : 1) * Math.atan(this.$);
	}
	get ceil() {
		return Math.ceil(this.$);
	}
	cos(cond) {
		return Math.cos((cond ? toRadian : 1) * this.$);
	}
	get cube() {
		return this.$ * this.$ * this.$;
	}
	get exp() {
		return Math.exp(this.$);
	}
	get floor() {
		return Math.floor(this.$);
	}
	interval(f) {
		validate([f], ['function'], 'Number#interval');

		f = new Func(f).bindContext({ abort });

		const number = this.$;
		const args = Array.prototype.slice.call(arguments, 1);

		let timeout;
		let aborted;

		(function interval() {
			f.apply(null, args);

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
	get ln() {
		return Math.log(this.$);
	}
	log(x) {
		return Math.log(x) / Math.log(this.$);
	}
	pow(power) {
		return Math.pow(this.$, power);
	}
	root(power) {
		return Math.pow(this.$, 1 / power);
	}
	get round() {
		return Math.round(this.$);
	}
	sin(cond) {
		return Math.sin((cond ? toRadian : 1) * this.$);
	}
	get sqrt() {
		return Math.sqrt(this.$);
	}
	get square() {
		return this.$ * this.$;
	}
	tan(cond) {
		return Math.tan((cond ? toRadian : 1) * this.$);
	}
	timeout(value) {
		let timeout;
		let rej;

		const promise = new Promise((resolve, reject) => {
			rej = reject;
			timeout = setTimeout(resolve, this.$, value);
		});

		promise.abort = function abort() {
			clearTimeout(timeout);
			
			rej(new Error('Timeout was aborted'));

			return this;
		};

		return promise;
	}
	toBase(base = 10) {
		return this.$.toString(base);
	}
	toExponential() {
		return this.$.toExponential.apply(this.$, arguments);
	}
	toFixed() {
		return this.$.toFixed.apply(this.$, arguments);
	}
	toPrecision() {
		return this.$.toPrecision.apply(this.$, arguments);
	}
	valueOf() {
		return NativeNumber(this.$);
	}
}

defineProperties(Number.prototype, {
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
	cls: Number
});

export function rand(a = 0, b = 1) {
  return a + (b - a) * Math.random();
}
export function random(a, b) {
  validate([a, b], ['intLike', 'intLike'], 'random');

  if (b <= a) {
    throw new Error('Second argument must be greater than first!');
  }

  return a + Math.floor((b - a + 1) * Math.random());
}

export default Number;
