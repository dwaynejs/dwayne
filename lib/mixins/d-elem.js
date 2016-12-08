import { isFunction, isString } from '../helpers';

export function registerDElem(Mixin) {
  class DElem extends Mixin {
    static evaluate = false;

    constructor(opts) {
      super(opts);

      const {
        block,
        elem
      } = this;
      const value = this.evaluateOnce();

      if (isFunction(value)) {
        value(elem);
      } else if (isString(value)) {
        block[value] = elem;
      }
    }
  }

  return {
    name: 'd-elem',
    value: DElem
  };
}
