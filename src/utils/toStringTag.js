import { definePrototypeProperties } from './defineProperty';
import { Symbol } from '../constants';

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

export function setToStringTag(klass, tag) {
  if (Symbol.toStringTag) {
    definePrototypeProperties(klass.prototype, {
      [Symbol.toStringTag]: tag
    });
  }
}
