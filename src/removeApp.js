import { Block } from './Block';
import { Elem } from './Elem';

export function removeApp(node) {
  const elem = new Elem(node);

  if (!elem.length) {
    throw new Error('No valid element to remove the app from was given! (removeApp)');
  }

  node = elem[0];

  const { DwayneRootBlock } = node;

  if (!(DwayneRootBlock instanceof Block)) {
    throw new Error('No app registered inside the given element! (removeApp)');
  }

  DwayneRootBlock.$$.remove();
  elem.removeAttr('dwayne-root');

  delete node.DwayneRootBlock;
}
