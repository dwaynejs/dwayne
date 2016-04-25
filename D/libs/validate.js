import checkTypeMethods from '../methods/check-type-methods';

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
		check: (n) => n != null,
		text: '$n argument must be not null or undefined!',
		error: TypeError
	},
	'array': {
		check: checkTypeMethods.isArray,
		text: '$n argument must be an array!',
		error: TypeError
	},
	'array||!': {
		check: (n) => checkTypeMethods.isArray(n) || checkTypeMethods.isUndefined(n) || checkTypeMethods.isNull(n),
		text: '$n argument must be an array, or undefined, or null!',
		error: TypeError
	},
	'arrayAlike': {
		check: checkTypeMethods.isArrayAlike,
		text: '$n argument must be array alike!',
		error: TypeError
	},
	'arrayAlike||!': {
		check: (n) => checkTypeMethods.isArrayAlike(n) || checkTypeMethods.isUndefined(n) || checkTypeMethods.isNull(n),
		text: '$n argument must be array alike, or undefined, or null!',
		error: TypeError
	},
	'date': {
		check: checkTypeMethods.isDate,
		text: '$n argument must be a date!',
		error: TypeError
	},
	'date||!': {
		check: (n) => checkTypeMethods.isDate(n) || checkTypeMethods.isUndefined(n) || checkTypeMethods.isNull(n),
		text: '$n argument must be a date, or undefined, or null!',
		error: TypeError
	},
	'dateAlike': {
		check: checkTypeMethods.isDateAlike,
		text: '$n argument must be date alike!',
		error: TypeError
	},
	'dateAlike||!': {
		check: (n) => checkTypeMethods.isDateAlike(n) || checkTypeMethods.isUndefined(n) || checkTypeMethods.isNull(n),
		text: '$n argument must be date alike, or undefined, or null!',
		error: TypeError
	},
	'function': {
		check: checkTypeMethods.isFunction,
		text: '$n argument must be a function!',
		error: TypeError
	},
	'function||!': {
		check: (n) => checkTypeMethods.isFunction(n) || checkTypeMethods.isUndefined(n) || checkTypeMethods.isNull(n),
		text: '$n argument must be a function, or undefined, or null!',
		error: TypeError
	},
	'int': {
		check: checkTypeMethods.isInteger,
		text: '$n argument must be an integer!',
		error: TypeError
	},
	'int||!': {
		check: (n) => checkTypeMethods.isInteger(n) || checkTypeMethods.isUndefined(n) || checkTypeMethods.isNull(n),
		text: '$n argument must be an integer, or undefined, or null!',
		error: TypeError
	},
	'intAlike': {
		check: checkTypeMethods.isIntegerAlike,
		text: '$n argument must be integer alike!',
		error: TypeError
	},
	'intAlike||!': {
		check: (n) => checkTypeMethods.isIntegerAlike(n) || checkTypeMethods.isUndefined(n) || checkTypeMethods.isNull(n),
		text: '$n argument must be integer alike, or undefined, or null!',
		error: TypeError
	},
	'number': {
		check: checkTypeMethods.isNumber,
		text: '$n argument must be a number!',
		error: TypeError
	},
	'number||!': {
		check: (n) => checkTypeMethods.isNumber(n) || checkTypeMethods.isUndefined(n) || checkTypeMethods.isNull(n),
		text: '$n argument must be a number, or undefined, or null!',
		error: TypeError
	},
	'numberAlike': {
		check: checkTypeMethods.isNumberAlike,
		text: '$n argument must be number alike!',
		error: TypeError
	},
	'numberAlike||!': {
		check: (n) => checkTypeMethods.isNumberAlike(n) || checkTypeMethods.isUndefined(n) || checkTypeMethods.isNull(n),
		text: '$n argument must be number alike, or undefined, or null!',
		error: TypeError
	},
	'object': {
		check: checkTypeMethods.isObject,
		text: '$n argument must be an object!',
		error: TypeError
	},
	'object||!': {
		check: (n) => checkTypeMethods.isObject(n) || checkTypeMethods.isUndefined(n) || checkTypeMethods.isNull(n),
		text: '$n argument must be an object, or undefined, or null!',
		error: TypeError
	},
	'regexp': {
		check: checkTypeMethods.isRegexp,
		text: '$n argument must be a regular expression!',
		error: TypeError
	},
	'regexp||!': {
		check: (n) => checkTypeMethods.isRegexp(n) || checkTypeMethods.isUndefined(n) || checkTypeMethods.isNull(n),
		text: '$n argument must be a regular expression, or undefined, or null!',
		error: TypeError
	},
	'string': {
		check: checkTypeMethods.isString,
		text: '$n argument must be a string!',
		error: TypeError
	},
	'string||!': {
		check: (n) => checkTypeMethods.isString(n) || checkTypeMethods.isUndefined(n) || checkTypeMethods.isNull(n),
		text: '$n argument must be a string, or undefined, or null!',
		error: TypeError
	}
};

export function validate(args, options) {
	for (let number in options) {
		if (options.hasOwnProperty(number)) {
			let array = options[number];
			if (!checkTypeMethods.isArray(array)) {
				array = [array];
			}
			for (let i = 0; i < array.length; i++) {
				const checker = check[array[i]];
				if (!checker.check(args[number])) {
					throw new checker.error(checker.text.replace('$n', numbers[number]));
				}
			}
		}
	}
}