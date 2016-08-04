/**
 * @module helpers/defineProperty
 * @private
 * @description Exports defineProperty and dynamicDefineProperties methods.
 */

/**
 * @callback propertyGeneratorCallback
 * @param {String} name - Name of the property.
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
  for (let i = 0, length = properties.length; i < length; i++) {
    const name = properties[i];

    Object.defineProperty(target, name, {
      value: propertyGenerator(name),
      writable: true,
      enumerable: false,
      configurable: true
    });
  }
}

/**
 * @function defineProperties
 * @param {Object} target - Target to define properties for.
 * @param {Object} properties - Object with properties needed to be assign to the target.
 * @returns {void}
 * @description Function for defining properties of an object.
 */
export function defineProperties(target, properties) {
  for (const name in properties) {
    if (properties.hasOwnProperty(name)) {
      const method = properties[name];

      if (/^get /.test(name)) {
        Object.defineProperty(target, name.replace(/^get /, ''), {
          get: method,
          set: undefined,
          enumerable: false,
          configurable: true
        });
        continue;
      }

      if (/^set /.test(name)) {
        Object.defineProperty(target, name.replace(/^set /, ''), {
          set: method,
          get: undefined,
          enumerable: false,
          configurable: true
        });
        continue;
      }

      if (/^get\/set /.test(name)) {
        Object.defineProperty(target, name.replace(/^get\/set /, ''), {
          get: method.get,
          set: method.set,
          enumerable: false,
          configurable: true
        });
        continue;
      }

      if (name !== 'Symbol.toStringTag') {
        Object.defineProperty(target, name, {
          value: method,
          writable: true,
          enumerable: false,
          configurable: true
        });
      }
    }
  }
}
