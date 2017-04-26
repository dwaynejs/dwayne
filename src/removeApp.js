import { Block } from './Block';
import { Elem } from './Elem';

/**
 * @function removeApp
 * @public
 * @param {Elem|Element} container - Container of the app.
 * @returns {void}
 * @description Method for removing app.
 *
 * @example
 * import { removeApp, find } from 'dwayne';
 *
 * removeApp(find('.root'));
 */
export function removeApp(container) {
  const elem = new Elem(container).elem(0);

  if (!elem.length) {
    throw new Error('No valid element to remove the app from was given! (removeApp)');
  }

  container = elem[0];

  const { DwayneRootBlock } = container;

  if (!(DwayneRootBlock instanceof Block)) {
    throw new Error('No app registered inside the given element! (removeApp)');
  }

  DwayneRootBlock.$$.remove();
  elem.removeAttr('dwayne-root');

  delete container.DwayneRootBlock;
}
