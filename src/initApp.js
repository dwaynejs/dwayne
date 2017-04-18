import { isArray } from './utils';
import { createBlock } from './helpers/Block';
import { Block } from './Block';
import { Elem } from './Elem';

export function initApp(html, container) {
  const parentElem = new Elem(container).elem(0);

  if (!parentElem.length) {
    throw new Error('No valid element to insert the app into was given! (initApp)');
  }

  if (parentElem.prop('DwayneRootBlock')) {
    throw new Error('There already exists a Dwayne app inside the given element! (initApp)');
  }

  if (isArray(html)) {
    html = {
      vars: [],
      value: html
    };
  }

  class RootBlock extends Block {
    static _vars = html.vars;
    static _html = html.value
  }

  const block = createBlock({
    node: {
      name: '#RootBlock'
    },
    Constructor: RootBlock,
    parent: parentElem,
    parentElem
  });

  parentElem
    .prop('DwayneRootBlock', block)
    .attr('dwayne-root', '');
}
