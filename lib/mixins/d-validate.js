import { isFunction } from '../helpers';

export function registerDValidate(Mixin) {
  class DValidate extends Mixin {
    static evaluate = false;

    constructor(opts) {
      super(opts);

      const { elem } = this;
      const validator = this.evaluateOnce();

      if (isFunction(validator)) {
        elem.validate(validator);
      }
    }
  }

  return {
    name: 'd-validate',
    value: DValidate
  };
}
