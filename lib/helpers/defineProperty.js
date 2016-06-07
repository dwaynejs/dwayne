/**
 * @module helpers/defineProperty
 * @private
 * @description Exports defineProperty and dynamicDefineProperties methods.
 */

const getRegexp = /^get /;
const setRegexp = /^set /;
const getSetRegexp = /^get\/set /;

/**
 * @callback module:helpers/defineProperty~propertyGeneratorCallback
 * @param {String} name - Name of the property.
 * @returns {*} Generated property.
 */

/**
 * @function dynamicDefineProperties
 * @param {Object} target - Object to define properties for.
 * @param {Array} properties - Object which keys are properties.
 * @param {module:helpers/defineProperty~propertyGeneratorCallback} propertyGenerator - Callback for every property.
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
 * @description Function for defining properties of an object.
 */
export function defineProperties(target, properties) {
  for (const name in properties) {
    if (properties.hasOwnProperty(name)) {
      const method = properties[name];

      if (getRegexp.test(name)) {
        Object.defineProperty(target, name.replace(getRegexp, ''), {
          get: method,
          set: undefined,
          enumerable: false,
          configurable: true
        });
        continue;
      }

      if (setRegexp.test(name)) {
        Object.defineProperty(target, name.replace(setRegexp, ''), {
          set: method,
          get: undefined,
          enumerable: false,
          configurable: true
        });
        continue;
      }

      if (getSetRegexp.test(name)) {
        Object.defineProperty(target, name.replace(getSetRegexp, ''), {
          get: method.get,
          set: method.set,
          enumerable: false,
          configurable: true
        });
        continue;
      }

      Object.defineProperty(target, name, {
        value: method,
        writable: true,
        enumerable: false,
        configurable: true
      });
    }
  }
}
