import { isArray, isString } from './utils';
import { createBlock, isInstanceOf } from './helpers/Block';
import { Block } from './Block';
import { Elem } from './Elem';

/**
 * @function initApp
 * @public
 * @param {Template|ScopelessTemplate|String|typeof Block} block - Root template (may be scopeless),
 * string defining a name of the root block or a block subclass.
 * @param {Elem|Element} container - Container of the app.
 * @returns {void}
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
export function initApp(block, container) {
  const parentElem = new Elem(container).elem(0);

  if (!parentElem.length) {
    console.error('No valid element to insert the app into was given! (initApp)');

    return;
  }

  if (parentElem.prop('DwayneRootBlock')) {
    console.error('There already exists a Dwayne app inside the given element! (initApp)');

    return;
  }

  if (isString(block)) {
    block = {
      vars: [],
      value: [{
        name: block
      }]
    };
  }

  if (isArray(block)) {
    block = {
      vars: [],
      value: block
    };
  }

  let Constructor;

  if (isInstanceOf(Block, block)) {
    Constructor = block;
  } else {
    Constructor = class RootBlock extends Block {
      static template = block;
    };
  }

  const rootBlock = createBlock({
    node: {
      name: '#RootBlock',
      Constructor
    },
    parent: parentElem,
    parentElem
  });

  parentElem
    .prop('DwayneRootBlock', rootBlock)
    .attr('dwayne-root', '');
}
