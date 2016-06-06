/**
 * @module helpers/toArray
 * @private
 * @description Exports toArray method.
 */

import { isArrayLike, isString } from './checkTypes';

/**
 * @function toArray
 * @param {*} value - Any value.
 * @returns {Array} Create array.
 * @description Function for creating an array of any value.
 */
export function toArray(value) {
	const array = [];

	if (isArrayLike(value) && !isString(value)) {
		for (let i = 0, length = value.length; i < length; i++) {
      array.push(value[i]);
		}
	} else {
    array.push(value);
	}

	return array;
}
