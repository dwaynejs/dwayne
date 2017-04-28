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
    console.error('No valid element to remove the app from was given! (removeApp)');

    return;
  }

  container = elem[0];

  const { DwayneRootBlock } = container;

  if (!(DwayneRootBlock instanceof Block)) {
    console.error('No app registered inside the given element! (removeApp)');

    return;
  }

  DwayneRootBlock.$$.remove();
  elem.removeAttr('dwayne-root');

  delete container.DwayneRootBlock;
}
