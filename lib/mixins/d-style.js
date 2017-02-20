import { Arr } from '../Arr';
import { Super } from '../Super';
import { isString } from '../helpers';

export function registerDStyle(Mixin) {
  class DStyle extends Mixin {
    css = {};

    afterUpdate(newValue, oldValue) {
      const {
        elem,
        args,
        css
      } = this;

      if (args) {
        newValue = new Super(args).object((css, prop) => {
          css[prop] = newValue;
        });
      }

      if (isString(newValue)) {
        newValue = new Arr(newValue.split(/; ?/))
          .filter()
          .object((css, item) => {
            const [prop, value] = item;

            css[prop] = value;
          });
      }

      newValue = new Super(newValue || {}).$;

      new Super(css).forEach((value, prop) => {
        if (!newValue[prop]) {
          elem.removeCSS(prop);
        }
      });
      elem.css(newValue);

      this.css = newValue;
    }

    beforeRemove() {
      const {
        elem,
        css
      } = this;

      elem.removeCSS.apply(elem, new Super(css).keys().$);
    }
  }

  return {
    name: 'd-style',
    value: DStyle
  };
}
