import { createHideStyleNode } from './createHideStyleNode';
import { HIDE_CLASS } from '../../constants';
import { Elem } from '../../Elem';

export function hide(elem) {
  createHideStyleNode(new Elem(elem.ownerDocument.head));
  new Elem(elem).addClass(HIDE_CLASS);
}
