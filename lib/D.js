/**
 * @module D
 * @description Exports all library logic.
 */

import constructors from './constants/constructors';

export * from './helpers/checkTypes';

/**
 * @function D
 * @param {*} value - Any value.
 * @returns {Super} Wrap of the argument.
 * @description Function for creating a D-wrap of an object.
 */
function D(value) {
	for (let i = constructors.length - 1; i >= 0; i--) {
		const levelConstructors = constructors[i];

    for (let k = 0, len = levelConstructors.length; k < len; k++) {
      const constructor = levelConstructors[k];

      if (constructor.check(value)) {
        return new constructor.cls(value);
      }
    }
	}
}

export default D;
