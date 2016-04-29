import { toString } from '../../libs/to-string';

export const isArray = Array.isArray || function isArray(array) {
	return toString(array) === 'Array';
};
export function isArrayAlike(array) {
	if (!array || isFunction(array)) {
		return false;
	}
	
	const length = array.length;
	
	return isInteger(length) && length >= 0;
}
export function isBoolean(boolean) {
	return toString(boolean) === 'Boolean';
}
export function isDate(date) {
	return toString(date) === 'Date';
}
export function isDateAlike(date) {
	date = new Date(date);
	return !isNaN(date.getTime());
}
export const isFinite = Number.isFinite || function isFinite(number) {
	return isNumber(number) && !isNaN(number) && number !== Infinity && number !== -Infinity;
};
export function isFunction(func) {
	return toString(func) === 'Function';
}
export const isInteger = Number.isInteger || function isInteger(integer) {
	return isNumber(integer) && integer % 1 === 0;
};
export function isIntegerAlike(integer) {
	integer = parseInt(Number(integer));
	return !!(integer || integer === 0);
}
export const isNaN = Number.isNaN || function isNaN(nan) {
	return nan !== nan;
};
export function isNull(nul) {
	return nul === null;
}
export function isNullOrUndefined(nul) {
	return nul === null || typeof nul === 'undefined';
}
export function isNumber(number) {
	return toString(number) === 'Number';
}
export function isNumberAlike(number) {
	if (isNaN(number) || number === 'NaN') {
		return true;
	}
	
	number = Number(number);
	
	return !!(number || number === 0);
}
export function isObject(object) {
	return !!object && typeof object === 'object';
}
export function isRegExp(regexp) {
	return toString(regexp) === 'RegExp';
}
export function isString(string) {
	return toString(string) === 'String';
}
export function isUndefined(undef) {
	return typeof undef === 'undefined';
}