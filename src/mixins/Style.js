import {
  isString, iterateObject, keys,
  collectFromObject, collectFromArray
} from '../utils';
import { Mixin } from '../Mixin';

const CSS_STYLES_SEPARATOR_REGEX = /\s*;\s*/;
const CSS_STYLE_SEPARATOR_REGEX = /\s*:\s*/;

class Style extends Mixin {
  css = {};

  afterUpdate(newValue, oldValue) {
    const {
      elem,
      args,
      css
    } = this;

    if (args) {
      newValue = collectFromObject(args, (css, prop) => {
        css[prop] = newValue;
      });
    }

    if (isString(newValue)) {
      newValue = collectFromArray(
        newValue
          .split(CSS_STYLES_SEPARATOR_REGEX)
          .filter(Boolean)
          .map(constructStyleFromString),
        addCSSProp
      );
    }

    iterateObject(css, (value, prop) => {
      if (!newValue[prop]) {
        elem.removeCSS(prop);
      }
    });
    elem.css(newValue);

    this.css = newValue;
  }

  beforeRemove(isElementRemoved) {
    if (!isElementRemoved) {
      const {
        elem,
        css
      } = this;

      elem.removeCSS.apply(elem, keys(css));
    }
  }
}

function addCSSProp(css, item) {
  const [prop, value] = item;

  css[prop] = value;
}

function constructStyleFromString(style) {
  const split = style.split(CSS_STYLE_SEPARATOR_REGEX);

  return [
    split[0].trim(),
    split[1].trim()
  ];
}

export { Style };
