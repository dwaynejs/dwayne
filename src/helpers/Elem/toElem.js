import { isElem } from './isElem';
import { Elem } from '../../Elem';

export function toElem(elem) {
  return isElem(elem)
    ? elem
    : new Elem(elem);
}
