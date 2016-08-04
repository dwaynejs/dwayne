/**
 * @module helpers/crossClassMethods
 * @private
 * @description Exports crossClassMethods.
 */

import D from '../D';

/**
 * @namespace
 * @private
 * @type {Object}
 */
export const crossClassMethods = {
  transformAnchor,
  htmlElement
};

/**
 * @function transformAnchor
 * @abstract
 * @memberof module:helpers/crossClassMethods.crossClassMethods
 * @param {Elem} elem - Elem to transform.
 * @returns {void}
 * @description Function for transformation html-anchors by {@link Router}.
 */
function transformAnchor() {}

/**
 * @function htmlElement
 * @abstract
 * @memberof module:helpers/crossClassMethods.crossClassMethods
 * @param {Element} elem - Elem to wrap.
 * @returns {Elem} Instance of Elem or an Elem subclass.
 * @description Function for wrapping elements.
 */
function htmlElement(elem) {
  return D(elem);
}
