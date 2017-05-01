export const { isArray } = Array;

export function isFunction(value) {
  return typeof value === 'function';
}

export function isNil(value) {
  /* eslint-disable eqeqeq */
  return value == null;
  /* eslint-enable eqeqeq */
}

export function isString(value) {
  return typeof value === 'string';
}
