import { HIDE_CLASS } from '../../constants';
import { Elem } from '../../Elem';

export function show(elem) {
  new Elem(elem).removeClass(HIDE_CLASS);
}
