import { Super } from '../Super';
import { isArray, isString, iterate } from '../helpers';

export function registerDClass(Mixin) {
  class DClass extends Mixin {
    classes = [];

    afterUpdate(newValue) {
      const {
        elem,
        args,
        classes
      } = this;
      const newClasses = [];

      newValue = new Super(newValue).$;

      if (args) {
        newValue = newValue
          ? args
          : [];
      }

      if (isString(newValue)) {
        newValue = newValue.split(/\s+/);
      }

      if (isArray(newValue)) {
        iterate(classes, (cls) => {
          if (newValue.indexOf(cls) === -1) {
            elem.removeClass(cls);
          }
        });
        iterate(newValue, (cls) => {
          if (isString(cls)) {
            newClasses.push(cls);
            elem.addClass(cls);
          }
        });
      } else {
        iterate(classes, (cls) => {
          if (!newValue || !newValue[cls]) {
            elem.removeClass(cls);
          }
        });
        iterate(newValue, (val, cls) => {
          if (val) {
            newClasses.push(cls);
            elem.addClass(cls);
          }
        });
      }

      this.classes = newClasses;
    }

    beforeRemove() {
      const { elem } = this;

      elem.removeClass.apply(elem, new Super(this.value).keys().$);
    }
  }

  return {
    name: 'd-class',
    value: DClass
  };
}
