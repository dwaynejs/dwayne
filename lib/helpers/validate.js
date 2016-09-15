/**
 * @module helpers/validate
 * @private
 * @description Exports validate method.
 */

import checkExpressions from '../constants/validateCheckExpressions';
import { iterate } from './iterate';
import { isArray } from './checkTypes';

const numbers = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th'];

/**
 * @function validate
 * @private
 * @param {Object} args - Arguments of function.
 * @param {Object} options - Object with validate parameters.
 * @param {String} [name] - Name of the function what called validate.
 * @returns {void}
 * @description Function for checking arguments of other functions.
 */
export function validate(args, options, name) {
  iterate(options, (array, number) => {
    if (!isArray(array)) {
      array = [array];
    }

    iterate(array, (checker) => {
      checker = checkExpressions[checker];

      if (!checker.check(args[number])) {
        throw new checker.error(checker.text.replace('$n', numbers[number]) + (name ? ` (at ${ name })` : ''));
      }
    });
  });
}
