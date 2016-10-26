/**
 * @module helpers/checkTypes
 * @private
 * @mixin
 * @description Exports is<Type> methods.
 */

import { toStringTag } from './toStringTag';

/**
 * @function isArray
 * @public
 * @param {*} value - Value to check if it is an array.
 * @returns {Boolean} If the argument is an array or not.
 * 
 * @example
 * isArray([]);                             // true
 * isArray(0);                              // true
 * isArray(document.querySelectorAll('*')); // false
 */
export function isArray(value) {
  return toStringTag(value) === 'Array';
}

/**
 * @function isArrayLike
 * @public
 * @param {*} value - Value to check if it is array-like.
 * @returns {Boolean} If the argument is array-like or not.
 * @description Basically returns if the argument has non-negative integer "length" property and isn't a function.
 * 
 * @example
 * isArrayLike([]);                             // true
 * isArrayLike('');                             // true
 * isArrayLike(() => {});                       // false
 * isArrayLike(document.querySelectorAll('*')); // true
 */
export function isArrayLike(value) {
  if (!value || isFunction(value)) {
    return false;
  }
  
  const length = value.length;
  
  return isInteger(length) && length >= 0;
}

/**
 * @function isBoolean
 * @public
 * @param {*} value - Value to check if it is a boolean.
 * @returns {Boolean} If the argument is a boolean or not.
 * 
 * @example
 * isBoolean(true);               // true
 * isBoolean(new Boolean(false)); // true
 * isBoolean(null);               // false
 */
export function isBoolean(value) {
  return toStringTag(value) === 'Boolean';
}

/**
 * @function isDate
 * @public
 * @param {*} value - Value to check if it is a date.
 * @returns {Boolean} If the argument is a date or not.
 * 
 * @example
 * isDate(new Date());                 // true
 * isDate('1999-12-31T23:59:59.999Z'); // false
 */
export function isDate(value) {
  return toStringTag(value) === 'Date';
}

/**
 * @function isDateLike
 * @public
 * @param {*} value - Value to check if it is date-like.
 * @returns {Boolean} If the argument is date-like or not.
 * @description Basically returns if new Date(argument) is not invalid date.
 * 
 * @example
 * isDateLike(new Date());                 // true
 * isDateLike('1999-12-31T23:59:59.999Z'); // true
 * isDateLike(0);                          // true
 */
export function isDateLike(value) {
  value = new Date(value);
  
  return !isNaN(value.getTime());
}

/**
 * @function isElement
 * @public
 * @param {*} value - Value to check if it is an element.
 * @returns {Boolean} If the argument is element or not.
 *
 * @example
 * isElement(document.querySelector('html')); // true
 */
export function isElement(value) {
  return /Element$/.test(toStringTag(value));
}

/**
 * @function isFinite
 * @public
 * @param {*} value - Value to check if it is finite.
 * @returns {Boolean} If the argument is finite or not.
 * 
 * @example
 * isFinite(0);        // true
 * isFinite('0');      // false
 * isFinite(Infinity); // false
 * isFinite(NaN);      // false
 */
export function isFinite(value) {
  if (!isNumber(value)) {
    return false;
  }
  
  value = Number(value);

  return !isNaN(value) && value !== Infinity && value !== -Infinity;
}

/**
 * @function isFunction
 * @public
 * @param {*} value - Value to check if it is a function.
 * @returns {Boolean} If the argument is a function or not.
 * 
 * @example
 * isFunction(() => {});            // true
 * 
 * const func = () => {};
 * Object.setPrototypeOf(func, {});
 * isFunction(func);                // true
 */
export function isFunction(value) {
  return toStringTag(value) === 'Function' || typeof value === 'function';
}

/**
 * @function isInteger
 * @public
 * @param {*} value - Value to check if it is an integer.
 * @returns {Boolean} If the argument is an integer or not.
 *
 * @example
 * isInteger(0);             // true
 * isInteger(0.1);           // false
 * isInteger(new Number(0)); // true
 * isInteger('0');           // false
 * isInteger(Infinity);      // false
 * isInteger(NaN);           // false
 */
export function isInteger(value) {
  return isNumber(value) && value % 1 === 0;
}

/**
 * @function isIntegerLike
 * @public
 * @param {*} value - Value to check if it is integer-like.
 * @returns {Boolean} If the argument is integer-like or not.
 *
 * @example
 * isIntegerLike(0);             // true
 * isIntegerLike(new Number(0)); // true
 * isIntegerLike(0.1);           // false
 * isIntegerLike('0');           // true
 */
export function isIntegerLike(value) {
  value = parseInt(Number(value));

  return !!(value || value === 0);
}

/**
 * @function isNaN
 * @public
 * @param {*} value - Value to check if it is NaN.
 * @returns {Boolean} If the argument is NaN or not.
 *
 * @example
 * isNaN(0);               // false
 * isNaN('NaN');           // false
 * isNaN(NaN);             // true
 * isNaN(new Number(NaN)); // true
 */
export function isNaN(value) {
  if (!isNumber(value)) {
    return false;
  }
  
  value = Number(value);

  return value !== value;
}

/**
 * @function isNull
 * @public
 * @param {*} value - Value to check if it is null.
 * @returns {Boolean} If the argument is null or not.
 *
 * @example
 * isNull(null);      // true
 * isNull(undefined); // false
 */
export function isNull(value) {
  return value === null;
}

/**
 * @function isNil
 * @public
 * @param {*} value - Value to check if it is null or undefined.
 * @returns {Boolean} If the argument is null or undefined or not.
 *
 * @example
 * isNil(null);      // true
 * isNil(undefined); // true
 * isNil(false);     // false
 */
export function isNil(value) {
  return value === null || typeof value === 'undefined';
}

/**
 * @function isNumber
 * @public
 * @param {*} value - Value to check if it is a number.
 * @returns {Boolean} If the argument is a number or not.
 *
 * @example
 * isNumber(0);             // true
 * isNumber(new Number(0)); // true
 * isNumber(NaN);           // true
 * isNumber('0');           // false
 */
export function isNumber(value) {
  return toStringTag(value) === 'Number';
}

/**
 * @function isNumberLike
 * @public
 * @param {*} value - Value to check if it is number-like.
 * @returns {Boolean} If the argument is number-like or not.
 *
 * @example
 * isNumberLike(0);          // true
 * isNumberLike('0');        // true
 * isNumberLike('Infinity'); // true
 * isNumberLike('NaN');      // true
 * isNumberLike(NaN);        // true
 */
export function isNumberLike(value) {
  if (isNaN(value) || value === 'NaN') {
    return true;
  }
  
  value = Number(value);
  
  return !!(value || value === 0);
}

/**
 * @function isObject
 * @public
 * @param {*} value - Value to check if it is an object.
 * @returns {Boolean} If the argument is an object or not.
 *
 * @example
 * isObject({});   // true
 * isObject(1);    // false
 * isObject(null); // false
 */
export function isObject(value) {
  return !!value && (toStringTag(value) === 'Object' || typeof value === 'object' || value instanceof Object);
}

/**
 * @function isPlainObject
 * @public
 * @param {*} value - Value to check if it is a plain object.
 * @returns {Boolean} If the argument is a plain object or not.
 *
 * @example
 * const obj = {};
 *
 * ifPlainObject(obj); // true
 *
 * Object.setPrototypeOf(object, null);
 *
 * ifPlainObject(obj); // true
 *
 * Object.setPrototypeOf(object, {});
 *
 * ifPlainObject(obj); // false
 */
export function isPlainObject(value) {
  if (isPrimitive(value)) {
    return false;
  }

  const proto = Object.getPrototypeOf(value);

  if (isNull(proto)) {
    return true;
  }

  const constructor = proto.constructor;

  return isFunction(constructor) &&
    constructor instanceof constructor &&
    isNull(Object.getPrototypeOf(proto));
}

/**
 * @function isPrimitive
 * @public
 * @param {*} value - Value to check if it is primitive.
 * @returns {Boolean} If the argument is primitive or not.
 *
 * @example
 * isPrimitive(1);             // true
 * isPrimitive({});            // false
 * isPrimitive('');            // true
 * isPrimitive(new Number(0)); // false
 * isPrimitive(true);          // true
 * isPrimitive(Symbol('foo')); // true
 * isPrimitive(null);          // true
 * isPrimitive(undefined);     // true
 */
export function isPrimitive(value) {
  return isNull(value) || /^(number|string|boolean|symbol|undefined)$/.test(typeof value);
}

/**
 * @function isRegExp
 * @public
 * @param {*} value - Value to check if it is a regular expression.
 * @returns {Boolean} If the argument is a regular expression or not.
 *
 * @example
 * isRegExp(/foo/);             // true
 * isRegExp('/foo/');           // false
 * isRegExp(new RegExp('foo')); // true
 */
export function isRegExp(value) {
  return toStringTag(value) === 'RegExp';
}

/**
 * @function isString
 * @public
 * @param {*} value - Value to check if it is a string.
 * @returns {Boolean} If the argument is a string or not.
 *
 * @example
 * isString('0');             // true
 * isString(new String('0')); // true
 */
export function isString(value) {
  return toStringTag(value) === 'String';
}

/**
 * @function isSymbol
 * @public
 * @param {*} value - Value to check if it is a symbol.
 * @returns {Boolean} If the argument is a symbol or not.
 *
 * @example
 * isSymbol(Symbol('1')); // true
 */
export function isSymbol(value) {
  return toStringTag(value) === 'Symbol';
}

/**
 * @function isUndefined
 * @public
 * @param {*} value - Value to check if it is undefined.
 * @returns {Boolean} If the argument is undefined or not.
 *
 * @example
 * isUndefined(null);      // false
 * isUndefined(undefined); // true
 */
export function isUndefined(value) {
  return typeof value === 'undefined';
}
