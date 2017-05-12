import { isArray } from './utils';
import { createBlock, isInstanceOf } from './helpers/Block';
import { Block } from './Block';
import { Elem } from './Elem';

/**
 * @function initApp
 * @public
 * @param {Template|typeof Block} html - Root template or root block constructor.
 * @param {Elem|Element} container - Container of the app.
 * @returns {Block|void} Root block if the app has been registered and undefined if not.
 * @description Method for initializing app.
 *
 * @example
 * import { initApp, doc } from 'dwayne';
 *
 * initApp(html`<App/>`, doc.create('div'));
 * initApp(htmlScopeless`<App/>`, doc.create('div'));
 * initApp('App', doc.create('div'));
 * initApp(App, doc.create('div'));
 */
export function initApp(html, container) {
  const parentElem = new Elem(container).elem(0);

  if (!parentElem.length) {
    console.error('No valid element to insert the app into was given! (initApp)');

    return;
  }

  if (parentElem.prop('DwayneRootBlock')) {
    console.error('There already exists a Dwayne app inside the given element! (initApp)');

    return;
  }

  let RootBlock = html;

  if (isArray(html)) {
    RootBlock = class RootBlock extends Block {
      static html = html;
    };
  }

  if (!isInstanceOf(Block, RootBlock)) {
    console.error('No valid root block was given! (initApp)');

    return;
  }

  const rootBlock = createBlock({
    node: {
      type: RootBlock
    },
    parent: parentElem,
    parentElem
  });

  parentElem
    .prop('DwayneRootBlock', rootBlock)
    .attr('dwayne-root', '');

  return rootBlock;
}
