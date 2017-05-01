export const {
  create,
  keys,
  getPrototypeOf: getProto
} = Object;

export const setProto = Object.setPrototypeOf || ((target, proto) => {
  /* eslint-disable no-proto */
  target.__proto__ = proto;
  /* eslint-enable no-proto */
});
