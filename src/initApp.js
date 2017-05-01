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
 * @returns {Block|void} Root block if the app has benn registered and undefined if not.
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
  let Constructor = block;

  if (!parentElem.length) {
    console.error('No valid element to insert the app into was given! (initApp)');

    return;
  }

  if (parentElem.prop('DwayneRootBlock')) {
    console.error('There already exists a Dwayne app inside the given element! (initApp)');

    return;
  }

  if (isString(block)) {
    Constructor = class RootBlock extends Block {
      static template = {
        vars: [],
        value: [{
          name: block
        }]
      };
    };
  }

  if (isArray(block)) {
    Constructor = class RootBlock extends Block {
      static template = {
        vars: [],
        value: block
      };
    };
  }

  if (block && !isInstanceOf(Block, block) && isArray(block.vars) && isArray(block.value)) {
    Constructor = class RootBlock extends Block {
      static template = block;
    };
  }

  if (!isInstanceOf(Block, Constructor)) {
    console.error('No valid root block to insert the app into was given! (initApp)');

    return;
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

  return rootBlock;
}
