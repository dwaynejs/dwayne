import D from '../../';
import methods from '../../methods';
import { default as parent, transform } from '../Object';
import Arr from '../Array';
import Promise from '../Promise';
import { defineProperties, validate } from '../../libs';

const NativeNumber = Number,
	//toAngle = 180 / Math.PI,
	toRadian = Math.PI / 180;

const cls = class Number extends parent {
	constructor(number = 0) {
		super((() => {
			if (methods.isNumber(number)) {
				return number;
			}

			return NativeNumber(number);
		})());
	}

	get abs() {
		return Math.abs(this.$);
	}
	get acos() {
		return Math.acos(this.$);
	}
	get acosh() {
		return Math.acosh(this.$);
	}
	array(mapFn) {
		const array = [];

		for (let i = 0, length = this.$; i < length; i++) {
			array.push(mapFn ? mapFn(i) : i);
		}

		return new Arr(array);
	}
	get asin() {
		return Math.asin(this.$);
	}
	get asinh() {
		return Math.asinh(this.$);
	}
	get atan() {
		return Math.atan(this.$);
	}
	get atanh() {
		return Math.atanh(this.$);
	}
	get ceil() {
		return Math.ceil(this.$);
	}
	cos(cond) {
		return Math.cos((cond ? toRadian : 1) * this.$);
	}
	get cosh() {
		return Math.cosh(this.$);
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
		f = transform(f);

		validate([f], ['function']);

		f = f.bind({ clear });

		const number = this.$;
		const args = Array.prototype.slice.call(arguments, 1);

		let timeout;

		(function interval() {
			f.apply(null, args);
			timeout = setTimeout(interval, number);
		})();

		function clear() {
			return clearTimeout(timeout);
		}

		return clear;
	}
	get log() {
		return Math.log(this.$);
	}
	get log2() {
		return Math.log2(this.$);
	}
	get log10() {
		return Math.log10(this.$);
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
	get sinh() {
		return Math.sinh(this.$);
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
	get tanh() {
		return Math.tanh(this.$);
	}
	timeout(value) {
		let timeout;

		const promise = new Promise((resolve) => {
			timeout = setTimeout(resolve, this.$, value);
		});

		promise.clear = function clear() {
			clearTimeout(timeout);

			return this;
		};

		return promise;
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
};

defineProperties(cls.prototype, {
	'get cbrt': (() => {
		if (Math.cbrt) {
			return function () {
				return Math.cbrt(this.$);
			};
		}

		return function () {
			const y = Math.pow(Math.abs(this.$), 1/3);

			return x > 0 ? y : -y;
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
	})()
});

D.Number = cls;
D.constructors.unshift({
	check: methods.isNumber,
	cls
});

export default cls;