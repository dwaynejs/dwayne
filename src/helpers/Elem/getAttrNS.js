import { Elem } from '../../Elem';

const X_LINK_ATTR_REGEX = /^xlink:\w/;
const XML_NS = 'http://www.w3.org/2000/xmlns/';
const X_LINK_NS = 'http://www.w3.org/1999/xlink';

export function getAttrNS(attr, elem) {
  if (attr === 'xmlns' || attr === 'xmlns:xlink') {
    return elem.nodeName === 'SVG'
      ? XML_NS
      : null;
  }

  if (X_LINK_ATTR_REGEX.test(attr)) {
    return new Elem(elem).closest('svg').length
      ? X_LINK_NS
      : null;
  }
}
