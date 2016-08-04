/**
 * @module helpers/toStringTag
 * @private
 * @description Exports toStringTag method.
 */

/**
 * @function toStringTag
 * @param {*} object - Object to get toStringTag of.
 * @returns {String} Cut string.
 * @description Cut "Type" string from "[object Type]" string that gotten from {}.toString,call(object).
 */
export function toStringTag(object) {
  return Object.prototype.toString.call(object).replace(/^\[object |]$/g, '');
}
