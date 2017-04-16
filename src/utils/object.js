import { iterateArray } from './array';

const {
  hasOwnProperty: has
} = {};

/**
 * @const
 * @function assign
 * @param {Object} target - Object to assign rest of arguments to.
 * @param {...Object} objects - Objects that are assigned to the target.
 * @returns {Object} Target.
 */
export function assign(target, ...objects) {
  iterateArray(arguments, (source, index) => {
    if (index) {
      iterateObject(source, (value, key) => {
        target[key] = value;
      });
    }
  });

  return target;
}

export function collectFromObject(object, callback, initialValue = {}) {
  iterateObject(object, (value, key) => {
    callback(initialValue, value, key, object);
  });

  return initialValue;
}

export function hasOwnProperty(object, key) {
  return object::has(key);
}

export function iterateObject(object, callback) {
  for (const key in object) {
    if (hasOwnProperty(object, key)) {
      callback(object[key], key, object);
    }
  }
}

export function mapObject(object, callback) {
  const newObject = {};

  iterateObject(object, (value, key) => {
    newObject[key] = callback(value, key, object);
  });

  return newObject;
}
