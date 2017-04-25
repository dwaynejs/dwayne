import { toStringTag, isArray } from '../../utils';
import { Elem } from '../../Elem';

const HTML_COLLECTION_REGEX = /^(HTMLCollection|NodeList)$/;
const DOCUMENT_REGEX = /Document$/;
const ELEMENT_REGEX = /Element$/;

export function isDocument(value) {
  return DOCUMENT_REGEX.test(toStringTag(value));
}

export function isElem(value) {
  return value instanceof Elem;
}

export function isElementsCollection(value) {
  return (
    HTML_COLLECTION_REGEX.test(toStringTag(value))
    || isElem(value)
    || isArray(value)
  );
}

export function isValidNode(value) {
  const tag = toStringTag(value);

  return (
    ELEMENT_REGEX.test(tag)
    || DOCUMENT_REGEX.test(tag)
    || tag === 'Text'
    || tag === 'DocumentFragment'
    || tag === 'Comment'
  );
}
