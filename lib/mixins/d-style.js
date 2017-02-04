import { Super } from '../Super';

export function registerDStyle(Mixin) {
  class DStyle extends Mixin {
    afterUpdate(newValue, oldValue) {
      const { elem } = this;

      newValue = new Super(newValue || {}).$;

      new Super(oldValue).forEach((value, prop) => {
        if (!newValue[prop]) {
          elem.removeCSS(prop);
        }
      });
      elem.css(newValue);
    }

    beforeRemove() {
      const { elem } = this;

      elem.removeCSS.apply(elem, new Super(this.value).keys().$);
    }
  }

  return {
    name: 'd-style',
    value: DStyle
  };
}
