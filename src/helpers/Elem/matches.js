import { isDocument } from './is';

const { indexOf } = [];

export function getMatchesFunction(elem) {
  return (
    elem.matches
    || elem.matchesSelector
    || elem.webkitMatchesSelector
    || elem.mozMatchesSelector
    || elem.msMatchesSelector
    || elem.oMatchesSelector
    || matches
  );
}

function matches(selector) {
  const document = isDocument(this)
    ? this
    : this.ownerDocument;

  return document.querySelectorAll(selector)::indexOf(this) !== -1;
}
