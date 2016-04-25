import { assign } from '../../libs/assign';

const methods = {
	isArray(array) {
		return Object.prototype.toString.call(array) === '[object Array]';
	},
	isBoolean(boolean) {
		return Object.prototype.toString.call(boolean) === '[object Boolean]';
	},
	isDate(date) {
		return Object.prototype.toString.call(date) === '[object Date]';
	},
	isFunction(func) {
		return typeof func === 'function';
	},
	isNaN(nan) {
		return nan !== nan;
	},
	isNumber(number) {
		return Object.prototype.toString.call(number) === '[object Number]';
	},
	isNull(nul) {
		return nul === null;
	},
	isNullOrUndefined(nul) {
		return nul === null || typeof nul === 'undefined';
	},
	isObject(object) {
		return !!object && (typeof object === 'object' || Object.prototype.toString.call(object) === '[object Object]');
	},
	isRegexp(regexp) {
		return regexp instanceof RegExp;
	},
	isString(string) {
		return Object.prototype.toString.call(string) === '[object String]';
	},
	isUndefined(undef) {
		return typeof undef === 'undefined';
	}
};

methods.isNaN = Number.isNaN || methods.isNaN;
methods.isArray = Array.isArray || methods.isArray;

assign(methods, {
	isDateAlike(date) {
		date = new Date(date);
		return !methods.isNaN(date.getTime());
	},
	isFinite(number) {
		return methods.isNumber(number) && !methods.isNaN(number) && number !== Infinity && number !== -Infinity;
	},
	isInteger(integer) {
		return methods.isNumber(integer) &&
			integer % 1 === 0;
	},
	isNumberAlike(number) {
		if (methods.isNaN(number) || number === 'NaN') {
			return true;
		}

		number = Number(number);

		return !!(number || number === 0);
	}
});

methods.isInteger = Number.isInteger || methods.isInteger;
methods.isFinite = Number.isFinite || methods.isFinite;

assign(methods, {
	isArrayAlike(array) {
		if (!array || methods.isFunction(array)) {
			return false;
		}

		const length = array.length;

		return methods.isInteger(length) && length >= 0;
	},
	isIntegerAlike(integer) {
		integer = parseInt(Number(integer));
		return !!(integer || integer === 0);
	}
});

export default methods;