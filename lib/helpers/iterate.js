/**
 * @module helpers/iterate
 * @private
 * @description Exports iterate method.
 */

import { isArrayLike, isUndefined } from './checkTypes';

/**
 * @callback IterateCallback
 * @param {*} value - Iteration value.
 * @param {String|Number} key - Iteration key.
 * @param {*} object - Initial iterable object.
 */

/**
 * @function iterate
 * @param {(Object|Array|null|undefined)} object - Value to iterate over.
 * @param {IterateCallback} callback - Callback that is called on every iteration.
 * @returns {*} If callback returns not undefined then iterate returns this value.
 * @description Function for iterating over all types of values.
 */
export function iterate(object, callback) {
  const array = isArrayLike(object);

  let iterated = 0;

  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      if (array && iterated++ >= object.length) {
        break;
      }

      const value = callback(object[key], array ? Number(key) : key, object);

      if (!isUndefined(value)) {
        return value;
      }
    }
  }
}
