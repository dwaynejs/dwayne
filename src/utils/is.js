export const { isArray } = Array;

export function isFunction(value) {
  return typeof value === 'function';
}

export function isNil(value) {
  /* eslint eqeqeq: 0 */
  return value == null;
}

export function isString(value) {
  return typeof value === 'string';
}
