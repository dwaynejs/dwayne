/**
 * @module helpers/crossClassMethods
 * @private
 * @description Exports crossClassMethods.
 */

import { toArray } from './toArray';

/**
 * @namespace
 * @private
 * @type {Object}
 */
export const crossClassMethods = {
  toHtmlCollection,
  transformAnchor
};

/**
 * @function toHtmlCollection
 * @abstract
 * @memberof module:helpers/crossClassMethods.crossClassMethods
 * @param {*} value - HTMLCollection or any other value to wrap.
 * @returns {Array} Collection in the form of an array.
 * @description Function to transform collection into a needed form for {@link HtmlCollection}.
 */
function toHtmlCollection(value) {
  return toArray(value);
}

/**
 * @function transformAnchor
 * @abstract
 * @memberof module:helpers/crossClassMethods.crossClassMethods
 * @param {HtmlElement} elem
 * @description Function for transformation html-anchors by {@link Router}.
 */
function transformAnchor(elem) {}
