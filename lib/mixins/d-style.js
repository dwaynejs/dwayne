import { Arr } from '../Arr';
import { Super } from '../Super';
import { isString } from '../helpers';

export function registerDStyle(Mixin) {
  class DStyle extends Mixin {
    afterUpdate(newValue, oldValue) {
      const { elem } = this;

      if (isString(newValue)) {
        newValue = new Arr(newValue.split(/; ?/))
          .filter()
          .object((css, item) => {
            const [prop, value] = item;

            css[prop] = value;
          });
      }

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
