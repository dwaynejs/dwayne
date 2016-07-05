/**
 * @module helpers/crossClassMethods
 * @private
 * @description Exports crossClassMethods.
 */

/**
 * @namespace
 * @private
 * @type {Object}
 */
export const crossClassMethods = {
  transformAnchor
};

/**
 * @function transformAnchor
 * @abstract
 * @memberof module:helpers/crossClassMethods.crossClassMethods
 * @param {HtmlElement} elem
 * @description Function for transformation html-anchors by {@link Router}.
 */
function transformAnchor(elem) {}
