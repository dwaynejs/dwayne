import { iterateArray } from './array';

const {
  hasOwnProperty: has
} = {};
const { slice } = [];

export function assign(target) {
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

export function except(object) {
  const newObject = {};
  const paths = arguments::slice(1);

  iterateObject(object, (value, key) => {
    if (paths.indexOf(key) === -1) {
      newObject[key] = value;
    }
  });

  return newObject;
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
