import {
  isArray, isString,
  iterateArray, iterateObject
} from '../utils';
import { Mixin } from '../Mixin';

const EMPTY_SPACE_REGEX = /\s+/;

class Class extends Mixin {
  classes = [];

  afterUpdate(newValue) {
    const {
      elem,
      args,
      classes
    } = this;
    const newClasses = [];

    if (args) {
      newValue = newValue
        ? args
        : [];
    }

    if (isString(newValue)) {
      newValue = newValue.split(EMPTY_SPACE_REGEX);
    }

    if (isArray(newValue)) {
      iterateArray(classes, (cls) => {
        if (newValue.indexOf(cls) === -1) {
          elem.removeClass(cls);
        }
      });
      iterateArray(newValue, (cls) => {
        if (isString(cls)) {
          newClasses.push(cls);
          elem.addClass(cls);
        }
      });
    } else {
      iterateArray(classes, (cls) => {
        if (!newValue || !newValue[cls]) {
          elem.removeClass(cls);
        }
      });
      iterateObject(newValue, (val, cls) => {
        if (val) {
          newClasses.push(cls);
          elem.addClass(cls);
        }
      });
    }

    this.classes = newClasses;
  }

  beforeRemove(isElementRemoved) {
    if (!isElementRemoved) {
      const {
        elem,
        classes
      } = this;

      elem.removeClass.apply(elem, classes);
    }
  }
}

export { Class };
