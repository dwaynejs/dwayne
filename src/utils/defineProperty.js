import { iterateObject } from './object';

export const { defineProperties } = Object;

export function definePrototypeProperties(target, properties) {
  iterateObject(properties, (value, name) => {
    Object.defineProperty(target, name, {
      value,
      writable: true,
      enumerable: false,
      configurable: true
    });
  });
}

export function defineFrozenProperties(target, properties) {
  iterateObject(properties, (value, name) => {
    Object.defineProperty(target, name, {
      value,
      writable: false,
      enumerable: false,
      configurable: false
    });
  });
}
