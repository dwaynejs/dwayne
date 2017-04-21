import { Elem } from '../../Elem';

const X_LINK_ATTR_FIND_REGEX = /^xlink:\w/;
const X_LINK_ATTR_REPLACE_REGEX = /^xlink:/;
const XML_NS = 'http://www.w3.org/2000/xmlns/';
const X_LINK_NS = 'http://www.w3.org/1999/xlink';
const Null = {
  ns: null
};

export function getAttrNS(attr, elem) {
  const isXmlNs = attr === 'xmlns';

  if (isXmlNs || attr === 'xmlns:xlink') {
    if (elem.nodeName !== 'SVG') {
      return Null;
    }

    return {
      ns: XML_NS,
      name: isXmlNs
        ? 'xmlns'
        : 'xlink'
    };
  }

  if (X_LINK_ATTR_FIND_REGEX.test(attr)) {
    if (!new Elem(elem).closest('svg').length) {
      return Null;
    }

    return {
      ns: X_LINK_NS,
      name: attr.replace(X_LINK_ATTR_REPLACE_REGEX, '')
    };
  }

  return Null;
}
