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
 */
export const isArray = Array.isArray || function isArray(value) {
  return toStringTag(value) === 'Array';
};

/**
 * @function isArrayLike
 * @public
 * @param {*} value - Value to check if it is array-like.
 * @returns {Boolean} If the argument is array-like or not.
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
 */
export function isBoolean(value) {
  return toStringTag(value) === 'Boolean';
}

/**
 * @function isDate
 * @public
 * @param {*} value - Value to check if it is a date.
 * @returns {Boolean} If the argument is a date or not.
 */
export function isDate(value) {
  return toStringTag(value) === 'Date';
}

/**
 * @function isDateLike
 * @public
 * @param {*} value - Value to check if it is date-like.
 * @returns {Boolean} If the argument is date-like or not.
 */
export function isDateLike(value) {
  value = new Date(value);
  
  return !isNaN(value.getTime());
}

/**
 * @function isFinite
 * @public
 * @param {*} value - Value to check if it is finite.
 * @returns {Boolean} If the argument is finite or not.
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
 */
export function isFunction(value) {
  return toStringTag(value) === 'Function' || typeof value === 'function';
}

/**
 * @function isInteger
 * @public
 * @param {*} value - Value to check if it is an integer.
 * @returns {Boolean} If the argument is an integer or not.
 */
export function isInteger(value) {
  return isNumber(value) && value % 1 === 0;
}

/**
 * @function isIntegerLike
 * @public
 * @param {*} value - Value to check if it is integer-like.
 * @returns {Boolean} If the argument is integer-like or not.
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
 */
export function isNull(value) {
  return value === null;
}

/**
 * @function isNullOrUndefined
 * @public
 * @param {*} value - Value to check if it is null or undefined.
 * @returns {Boolean} If the argument is null or undefined or not.
 */
export function isNullOrUndefined(value) {
  return value === null || typeof value === 'undefined';
}

/**
 * @function isNumber
 * @public
 * @param {*} value - Value to check if it is a number.
 * @returns {Boolean} If the argument is a number or not.
 */
export function isNumber(value) {
  return toStringTag(value) === 'Number';
}

/**
 * @function isNumberLike
 * @public
 * @param {*} value - Value to check if it is number-like.
 * @returns {Boolean} If the argument is number-like or not.
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
 */
export function isObject(value) {
  return !!value && (toStringTag(value) === 'Object' || typeof value === 'object' || value instanceof Object);
}

/**
 * @function isPrimitive
 * @public
 * @param {*} value - Value to check if it is primitive.
 * @returns {Boolean} If the argument is primitive or not.
 */
export function isPrimitive(value) {
  return isNull(value) || /^(number|string|boolean|symbol|undefined)$/.test(typeof value);
}

/**
 * @function isRegExp
 * @public
 * @param {*} value - Value to check if it is a regular expression.
 * @returns {Boolean} If the argument is a regular expression or not.
 */
export function isRegExp(value) {
  return toStringTag(value) === 'RegExp';
}

/**
 * @function isString
 * @public
 * @param {*} value - Value to check if it is a string.
 * @returns {Boolean} If the argument is a string or not.
 */
export function isString(value) {
  return toStringTag(value) === 'String';
}

/**
 * @function isUndefined
 * @public
 * @param {*} value - Value to check if it is undefined.
 * @returns {Boolean} If the argument is undefined or not.
 */
export function isUndefined(value) {
  return typeof value === 'undefined';
}
