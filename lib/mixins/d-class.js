import { Super } from '../Super';
import { isArray, isString, iterate } from '../helpers';

export function registerDClass(Mixin) {
  class DClass extends Mixin {
    classes = [];

    afterUpdate(newValue) {
      const {
        elem,
        classes
      } = this;
      const newClasses = [];

      newValue = new Super(newValue).$;

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
          if (!newValue[cls]) {
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
  }

  return {
    name: 'd-class',
    value: DClass
  };
}
