/**
 * @module helpers/class
 * @private
 * @description Exports class-creating helpers.
 */

import { defineProperties } from './defineProperty';
import { isPrimitive } from './checkTypes';

/**
 * @function inherits
 * @param {Function} subClass - Sub class to be inherited from superClass.
 * @param {Function} superClass - Super class that sub class inherits from.
 * @description Function for setting classes inheritance.
 * @returns {void}
 */
export function inherits(subClass, superClass) {
  Object.setPrototypeOf(subClass.prototype, superClass.prototype);
  Object.setPrototypeOf(subClass, superClass);

  defineProperties(subClass.prototype, {
    constructor: subClass
  });
}

/**
 * @function checkClassInstance
 * @param {*} instance - Instance to check.
 * @param {Function} cls - Class to check if the instance is an instance of it.
 * @param {String} name - Name of the class.
 * @returns {void}
 */
export function checkClassInstance(instance, cls, name) {
  if (!(instance instanceof cls)) {
    throw new Error(`Class constructor ${ name } cannot be invoked without 'new'`);
  }
}

/**
 * @function possibleSuperClassReturn
 * @param {*} instance - Instance to call super class with.
 * @param {Function} superClass - Super class to call.
 * @param {Array} [args] - Arguments to call the super class with.
 * @returns {*} What super class call returns or the instance itself.
 */
export function possibleSuperClassReturn(instance, superClass, args = []) {
  const returned = superClass.apply(instance, args);

  return isPrimitive(returned) ? instance : returned;
}
