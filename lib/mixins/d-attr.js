import { Super } from '../Super';

export function registerDAttr(Mixin) {
  class DAttr extends Mixin {
    attrs = {};

    afterUpdate(newValue) {
      const {
        elem,
        args,
        attrs
      } = this;

      if (args) {
        newValue = new Super(args).object((attrs, attr) => {
          attrs[attr] = newValue;
        });
      }

      newValue = new Super(newValue || {}).$;

      new Super(attrs).forEach((value, prop) => {
        if (!newValue[prop]) {
          elem.removeAttr(prop);
        }
      });
      elem.attr(newValue);

      this.attrs = newValue;
    }

    beforeRemove() {
      const {
        elem,
        attrs
      } = this;

      elem.removeAttr.apply(elem, new Super(attrs).keys().$);
    }
  }

  return {
    name: 'd-attr',
    value: DAttr
  };
}

