import { isFunction, isString } from '../helpers';

export function registerDElem(Mixin) {
  class DElem extends Mixin {
    static evaluate = false;

    constructor(opts) {
      super(opts);

      const { parent } = this.$$;
      const value = this.evaluateOnce();

      if (isFunction(value)) {
        value(this.elem);
      } else if (isString(value)) {
        parent[value] = this.elem;
      }
    }
  }

  return {
    name: 'd-elem',
    value: DElem
  };
}
