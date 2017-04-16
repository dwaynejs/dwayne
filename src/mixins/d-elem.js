import { isFunction, isString } from '../utils';

export function registerDElem(Mixin, createBlock, Block) {
  class DElem extends Mixin {
    static evaluate = false;

    constructor(opts) {
      super(opts);

      const {
        args,
        parentTemplate,
        elem
      } = this;
      let scope = parentTemplate;
      let value = this.evaluateOnce();

      if (args) {
        scope = value instanceof Block
          ? value
          : parentTemplate;
        value = args[0];
      }

      if (isFunction(value)) {
        value(elem);
      } else if (isString(value)) {
        scope[value] = elem;
      }
    }
  }

  return {
    name: 'd-elem',
    value: DElem
  };
}
