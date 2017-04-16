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
export const { isArray } = Array;

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
  /* eslint eqeqeq: 0 */
  return value == null;
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
