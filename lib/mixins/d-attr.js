import { Super } from '../Super';

export function registerDAttr(Mixin) {
  class DAttr extends Mixin {
    afterUpdate(newValue, oldValue) {
      const { elem } = this;

      newValue = new Super(newValue).$;

      new Super(oldValue).forEach((value, prop) => {
        if (!newValue[prop]) {
          elem.removeAttr(prop);
        }
      });
      elem.attr(newValue);
    }
  }

  return {
    name: 'd-attr',
    value: DAttr
  };
}

