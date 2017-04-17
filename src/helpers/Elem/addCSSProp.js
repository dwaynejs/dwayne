import { toCamelCase } from '../../utils';

const CSS_PROP_VALUE_SEPARATOR_REGEX = /: /;

export function addCSSProp(css, value) {
  if (value) {
    const property = value.split(CSS_PROP_VALUE_SEPARATOR_REGEX);

    css[toCamelCase(property[0])] = property[1];
  }
}
