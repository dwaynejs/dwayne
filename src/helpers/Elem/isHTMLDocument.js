import { toStringTag } from '../../utils';

export function isHTMLDocument(value) {
  return toStringTag(value) === 'HTMLDocument';
}
