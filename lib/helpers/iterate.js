import { isArrayLike, isUndefined } from './checkTypes';

export function iterate(object, mapFn) {
  const array = isArrayLike(object);

  let iterated = 0;

  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      if (array && iterated++ >= object.length) {
        break;
      }

      const value = mapFn(object[key], array ? Number(key) : key, object);

      if (!isUndefined(value)) {
        return value;
      }
    }
  }
}
