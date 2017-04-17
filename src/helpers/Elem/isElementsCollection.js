import { toStringTag, isArray } from '../../utils';
import { isElem } from './isElem';

const HTML_COLLECTION_REGEX = /^(HTMLCollection|NodeList)$/;

export function isElementsCollection(value) {
  return (
    HTML_COLLECTION_REGEX.test(toStringTag(value))
    || isElem(value)
    || isArray(value)
  );
}
