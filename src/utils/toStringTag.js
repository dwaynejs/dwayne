import { definePrototypeProperties } from './defineProperty';
import { Symbol } from '../constants';

const { toString } = {};

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
