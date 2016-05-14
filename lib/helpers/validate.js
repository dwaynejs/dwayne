import * as methods from './checkTypes';

const numbers = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th'];

const check = {
	'>0': {
		check: (n) => n > 0,
		text: '$n argument must be positive!',
		error: RangeError
	},
	'>=0': {
		check: (n) => n >= 0,
		text: '$n argument must be non-negative!',
		error: RangeError
	},
	'<0': {
		check: (n) => n < 0,
		text: '$n argument must be negative!',
		error: RangeError
	},
	'<=0': {
		check: (n) => n <= 0,
		text: '$n argument must be non-positive!',
		error: RangeError
	},
	'!!': {
		check: methods.isNullOrUndefined,
		text: '$n argument must be not null or undefined!',
		error: TypeError
	},
	'array': {
		check: methods.isArray,
		text: '$n argument must be an array!',
		error: TypeError
	},
	'array||!': {
		check: (a) => methods.isArray(a) || methods.isNullOrUndefined(a),
		text: '$n argument must be an array, or undefined, or null!',
		error: TypeError
	},
	'arrayLike': {
		check: methods.isArrayLike,
		text: '$n argument must be array-like!',
		error: TypeError
	},
	'arrayLike||!': {
		check: (a) => methods.isArrayLike(a) || methods.isNullOrUndefined(a),
		text: '$n argument must be array-like, or undefined, or null!',
		error: TypeError
	},
	'date': {
		check: methods.isDate,
		text: '$n argument must be a date!',
		error: TypeError
	},
	'date||!': {
		check: (d) => methods.isDate(d) || methods.isNullOrUndefined(d),
		text: '$n argument must be a date, or undefined, or null!',
		error: TypeError
	},
	'dateLike': {
		check: methods.isDateLike,
		text: '$n argument must be date-like!',
		error: TypeError
	},
	'dateLike||!': {
		check: (d) => methods.isDateLike(d) || methods.isNullOrUndefined(d),
		text: '$n argument must be date-like, or undefined, or null!',
		error: TypeError
	},
	'function': {
		check: methods.isFunction,
		text: '$n argument must be a function!',
		error: TypeError
	},
	'function||!': {
		check: (f) => methods.isFunction(f) || methods.isNullOrUndefined(f),
		text: '$n argument must be a function, or undefined, or null!',
		error: TypeError
	},
	'int': {
		check: methods.isInteger,
		text: '$n argument must be an integer!',
		error: TypeError
	},
	'int||!': {
		check: (i) => methods.isInteger(i) || methods.isNullOrUndefined(i),
		text: '$n argument must be an integer, or undefined, or null!',
		error: TypeError
	},
	'intLike': {
		check: methods.isIntegerLike,
		text: '$n argument must be integer-like!',
		error: TypeError
	},
	'intLike||!': {
		check: (i) => methods.isIntegerLike(i) || methods.isNullOrUndefined(i),
		text: '$n argument must be integer-like, or undefined, or null!',
		error: TypeError
	},
	'number': {
		check: methods.isNumber,
		text: '$n argument must be a number!',
		error: TypeError
	},
	'number||!': {
		check: (n) => methods.isNumber(n) || methods.isNullOrUndefined(n),
		text: '$n argument must be a number, or undefined, or null!',
		error: TypeError
	},
	'numberLike': {
		check: methods.isNumberLike,
		text: '$n argument must be number-like!',
		error: TypeError
	},
	'numberLike||!': {
		check: (n) => methods.isNumberLike(n) || methods.isNullOrUndefined(n),
		text: '$n argument must be number-like, or undefined, or null!',
		error: TypeError
	},
	'object': {
		check: methods.isObject,
		text: '$n argument must be an object!',
		error: TypeError
	},
	'object||!': {
		check: (o) => methods.isObject(o) || methods.isNullOrUndefined(o),
		text: '$n argument must be an object, or undefined, or null!',
		error: TypeError
	},
	'regexp': {
		check: methods.isRegExp,
		text: '$n argument must be a regular expression!',
		error: TypeError
	},
	'regexp||!': {
		check: (r) => methods.isRegExp(r) || methods.isNullOrUndefined(r),
		text: '$n argument must be a regular expression, or undefined, or null!',
		error: TypeError
	},
	'string': {
		check: methods.isString,
		text: '$n argument must be a string!',
		error: TypeError
	},
	'string||!': {
		check: (s) => methods.isString(s) || methods.isNullOrUndefined(s),
		text: '$n argument must be a string, or undefined, or null!',
		error: TypeError
	}
};

export function validate(args, options, name) {
	for (let number in options) {
		if (options.hasOwnProperty(number)) {
			let array = options[number];
      
			if (!methods.isArray(array)) {
				array = [array];
			}
      
			for (let i = 0; i < array.length; i++) {
				const checker = check[array[i]];
				if (!checker.check(args[number])) {
					throw new checker.error(`${ checker.text.replace('$n', numbers[number]) } (in ${ name })`);
				}
			}
		}
	}
}
