/**
 * @module helpers/assign
 * @private
 * @description Exports Object.assign-like method.
 */

import { iterate } from './iterate';

/**
 * @const
 * @function assign
 * @param {Object} target - Object to assign rest of arguments to.
 * @param {...Object} objects - Objects that are assigned to the target.
 * @returns {Object} Target.
 */
export function assign(target, objects) {
  iterate(arguments, (source, index) => {
    if (index) {
      iterate(source, (value, key) => {
        target[key] = value;
      });
    }
  });
    
	return target;
}
