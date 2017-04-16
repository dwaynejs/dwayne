import { iterateObject } from './object';

/**
 * @function defineProperties
 * @param {Object} target - Target to define properties for.
 * @param {Object} properties - Object with properties needed to be assign to the target.
 * @returns {void}
 * @description Function for defining properties of an object.
 */
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

/**
 * @function defineFrozenProperties
 * @param {Object} target - Target to define properties for.
 * @param {Object} properties - Object with properties needed to be assign to the target.
 * @returns {void}
 * @description Function for defining frozen properties of an object.
 */
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
