/**
 * @module D
 * @private
 * @description Exports D function.
 */

import constructors from './constants/constructors';

export * from './helpers/checkTypes';

/**
 * @function D
 * @public
 * @param {*} [value] - Any value.
 * @returns {DWrap} Wrap of the argument.
 * @description Function for creating a D-wrap of an object.
 *
 * @example
 * D({});            // Super
 * D(() => {});      // Func
 * D([]);            // Arr
 * D(1);             // Num
 * D('1');           // Str
 * D(new Date());    // Dat
 * D(document.body); // Elem
 */
export function D(value) {
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
