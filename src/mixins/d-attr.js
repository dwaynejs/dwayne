import { collectFromObject, iterateObject, keys } from '../utils';

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
        newValue = collectFromObject(args, (attrs, attr) => {
          attrs[attr] = newValue;
        });
      }

      iterateObject(attrs, (value, prop) => {
        if (!(prop in newValue)) {
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

      elem.removeAttr.apply(elem, keys(attrs));
    }
  }

  return {
    name: 'd-attr',
    value: DAttr
  };
}

