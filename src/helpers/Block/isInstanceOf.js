const { isPrototypeOf } = {};

export function isInstanceOf(Class, Subclass) {
  return Class::isPrototypeOf(Subclass) && Class.prototype::isPrototypeOf(Subclass.prototype);
}
