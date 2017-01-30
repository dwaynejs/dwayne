/**
 * @module helpers/toJSON
 * @private
 * @description Exports toJSON method.
 */

export function toJSON(what) {
  return JSON.stringify(what);
}

export function parseJSON(what) {
  return JSON.parse(what);
}
