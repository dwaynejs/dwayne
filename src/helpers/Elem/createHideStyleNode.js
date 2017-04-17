import { HIDE_CLASS } from '../../constants';

export function createHideStyleNode(head) {
  const style = head.find(`style#${ HIDE_CLASS }`);

  if (style.length) {
    return;
  }

  head
    .create('style')
    .prop('id', HIDE_CLASS)
    .text(`.${ HIDE_CLASS }{display:none !important;}`);
}
