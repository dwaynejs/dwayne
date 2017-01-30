/**
 * @module helpers/defineProperty
 * @private
 * @description Exports defineProperty and dynamicDefineProperties methods.
 */

import { iterate } from './iterate';

/**
 * @callback propertyGeneratorCallback
 * @param {String} name - Name of the property.
 * @param {Number} i - Index of the array.
 * @returns {*} Generated property.
 */

/**
 * @function dynamicDefineProperties
 * @param {Object} target - Object to define properties for.
 * @param {Array} properties - Object which keys are properties.
 * @param {propertyGeneratorCallback} propertyGenerator - Callback for every property.
 * @returns {void}
 * @description Function for dynamic creating properties based on name of the method.
 */
export function dynamicDefineProperties(target, properties, propertyGenerator) {
  iterate(properties, (name, i) => {
    Object.defineProperty(target, name, {
      value: propertyGenerator(name, i),
      writable: true,
      enumerable: false,
      configurable: true
    });
  });
}

/**
 * @function defineProperties
 * @param {Object} target - Target to define properties for.
 * @param {Object} properties - Object with properties needed to be assign to the target.
 * @returns {void}
 * @description Function for defining properties of an object.
 */
export function defineProperties(target, properties) {
  iterate(properties, (value, name) => {
    if (/^get /.test(name)) {
      Object.defineProperty(target, name.replace(/^get /, ''), {
        get: value,
        set: undefined,
        enumerable: false,
        configurable: true
      });

      return;
    }

    if (/^set /.test(name)) {
      Object.defineProperty(target, name.replace(/^set /, ''), {
        set: value,
        get: undefined,
        enumerable: false,
        configurable: true
      });

      return;
    }

    if (/^get\/set /.test(name)) {
      Object.defineProperty(target, name.replace(/^get\/set /, ''), {
        get: value.get,
        set: value.set,
        enumerable: false,
        configurable: true
      });

      return;
    }

    if (name !== 'Symbol.toStringTag') {
      Object.defineProperty(target, name, {
        value,
        writable: true,
        enumerable: false,
        configurable: true
      });
    }
  });
}

/**
 * @function defineUsualProperties
 * @param {Object} target - Target to define properties for.
 * @param {Object} properties - Object with properties needed to be assign to the target.
 * @returns {void}
 * @description Function for defining usual properties of an object.
 */
export function defineUsualProperties(target, properties) {
  iterate(properties, (value, name) => {
    Object.defineProperty(target, name, {
      value,
      writable: true,
      enumerable: true,
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
  iterate(properties, (value, name) => {
    Object.defineProperty(target, name, {
      value,
      writable: false,
      enumerable: false,
      configurable: false
    });
  });
}
