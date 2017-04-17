import {
  isString, iterateObject, keys,
  collectFromObject, collectFromArray
} from '../utils';
import { Mixin } from '../Mixin';
import { rootMixins } from '../constants';

const CSS_STYLES_SEPARATOR_REGEX = /; ?/;

rootMixins['d-style'] = class DStyle extends Mixin {
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
          .filter(Boolean),
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

  beforeRemove() {
    const {
      elem,
      css
    } = this;

    elem.removeCSS.apply(elem, keys(css));
  }
};

function addCSSProp(css, item) {
  const [prop, value] = item;

  css[prop] = value;
}
