import { toStringTag } from '../../utils';

const ELEMENT_REGEX = /Element$/;

export function isValidNode(value) {
  const tag = toStringTag(value);

  return (
    ELEMENT_REGEX.test(tag)
    || tag === 'HTMLDocument'
    || tag === 'Text'
    || tag === 'DocumentFragment'
    || tag === 'Comment'
  );
}
