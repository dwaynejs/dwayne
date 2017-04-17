import { Elem } from './Elem';

const {
  document = {}
} = global;

/**
 * @function find
 * @public
 * @param {String} selector - Selector to find.
 * @param {Element|Node} [base = document] - Base to find in.
 * @returns {Elem} New instance of Elem.
 * @description Synonym for
 * [Document#querySelectorAll]{@link https://developer.mozilla.org/en/docs/Web/API/Document/querySelectorAll}.
 */
export function find(selector, base = document) {
  return new Elem(base.querySelectorAll(String(selector)));
}
