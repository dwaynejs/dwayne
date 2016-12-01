import { Super } from '../Super';
import { isArray, isObject, isString, iterate } from '../helpers';

export function registerDClass(Mixin) {
  class DClass extends Mixin {
    afterUpdate(newValue, oldValue) {
      const { elem } = this;

      newValue = new Super(newValue).$;
      oldValue = new Super(oldValue).$;

      if (isArray(newValue)) {
        iterate(oldValue, (cls) => {
          if (isString(cls) && !newValue[cls]) {
            elem.removeClass(cls);
          }
        });
        iterate(newValue, (cls) => {
          if (isString(cls)) {
            elem.addClass(cls);
          }
        });
      } else if (isString(newValue)) {
        if (isString(oldValue)) {
          elem.removeClass(oldValue);
        }

        elem.addClass(newValue);
      } else if (isObject(newValue)) {
        iterate(oldValue, (val, cls) => {
          if (val && !newValue[cls]) {
            elem.removeClass(cls);
          }
        });
        iterate(newValue, (val, cls) => {
          if (val) {
            elem.addClass(cls);
          }
        });
      } else if (isString(oldValue)) {
        elem.removeClass(oldValue);
      } else if (isArray(oldValue)) {
        iterate(oldValue, (cls) => {
          if (isString(cls)) {
            elem.removeClass(cls);
          }
        });
      } else if (isObject(oldValue)) {
        iterate(oldValue, (val, cls) => {
          if (val) {
            elem.removeClass(cls);
          }
        });
      }
    }
  }

  return {
    name: 'd-class',
    value: DClass
  };
}
