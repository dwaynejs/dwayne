import { definePrototypeProperties } from './defineProperty';

const { Symbol } = global;
const { toString } = {};

/**
 * @function toStringTag
 * @param {*} object - Object to get toStringTag of.
 * @returns {String} Cut string.
 * @description Cut "Type" string from "[object Type]" string that gotten from {}.toString,call(object).
 */
export function toStringTag(object) {
  return object::toString().slice(8, -1);
}

export function setToStringTag(object, tag) {
  if (Symbol && Symbol.toStringTag) {
    definePrototypeProperties(object.prototype, {
      [Symbol.toStringTag]: tag
    });
  }
}
