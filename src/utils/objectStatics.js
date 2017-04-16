export const {
  create,
  keys,
  getPrototypeOf: getProto
} = Object;

export const setProto = Object.setPrototypeOf || ((target, proto) => {
  /* eslint no-proto: 0 */
  target.__proto__ = proto;
});
