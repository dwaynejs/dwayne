import { strictEqual, throws } from 'assert';
import { Block, Elem, initApp, doc, removeApp } from '../src';

class MyBlock extends Block {
  static template = html`
    <span>Hello, world!</span>
  `;
}

Block.block('MyBlock', MyBlock);

describe('removeApp()', () => {
  it('should remove existing app from the element', () => {
    const container = doc.create('div');

    initApp(htmlScopeless`<MyBlock/>`, container);

    strictEqual(container.html(), '<span>Hello, world!</span>');

    removeApp(container);

    strictEqual(container.html(), '');
  });
  it('should throw an error if the container is empty', () => {
    const container = new Elem();

    throws(() => {
      removeApp(container);
    }, 'No valid element to remove the app from was given! (removeApp)');
  });
  it('should throw an error if the container doesn\'t contain a Dwayne app', () => {
    const container = doc.create('div');

    throws(() => {
      removeApp(container);
    }, 'No valid element to remove the app from was given! (removeApp)');
  });
});

