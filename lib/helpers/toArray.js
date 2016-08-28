/**
 * @module helpers/toArray
 * @private
 * @description Exports toArray method.
 */

import { isArray, isArrayLike, isString } from './checkTypes';
import { iterate } from './iterate';

/**
 * @function toArray
 * @param {*} value - Any value.
 * @param {Boolean} [createNewArray = false] - If it is needed to create new array.
 * @returns {Array} Create array.
 * @description Function for creating an array of any value.
 */
export function toArray(value, createNewArray) {
  if (isArray(value) && !createNewArray) {
    return value;
  }

  const array = [];

  if (isArrayLike(value) && !isString(value)) {
    iterate(value, (value) => {
      array.push(value);
    });
  } else {
    array.push(value);
  }

  return array;
}
