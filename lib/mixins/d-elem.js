import { isFunction, isString } from '../helpers';

export function registerDElem(Mixin) {
  class DElem extends Mixin {
    static evaluate = false;

    constructor(opts) {
      super(opts);

      const {
        args,
        parentScope,
        elem
      } = this;
      const value = args
        ? args[0]
        : this.evaluateOnce();

      if (isFunction(value)) {
        value(elem);
      } else if (isString(value)) {
        parentScope[value] = elem;
      }
    }
  }

  return {
    name: 'd-elem',
    value: DElem
  };
}
