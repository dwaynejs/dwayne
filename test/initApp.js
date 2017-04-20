import { strictEqual, throws } from 'assert';
import { Block, Elem, initApp, doc } from '../src';

class MyBlock extends Block {
  static template = html`
    <span>Hello, world!</span>
  `;
}

Block.block('MyBlock', MyBlock);

describe('initApp()', () => {
  it('should test initializing app using an array', () => {
    const container = doc.create('div');

    initApp(htmlScopeless`<MyBlock/>`, container);

    strictEqual(container.html(), '<span>Hello, world!</span>');
  });
  it('should test initializing app using a template object', () => {
    const container = doc.create('div');

    initApp(html`<MyBlock/>`, container);

    strictEqual(container.html(), '<span>Hello, world!</span>');
  });
  it('should test initializing app using a string', () => {
    const container = doc.create('div');

    initApp('MyBlock', container);

    strictEqual(container.html(), '<span>Hello, world!</span>');
  });
  it('should throw an error if a container is empty', () => {
    const container = new Elem();

    throws(() => {
      initApp('MyBlock', container);
    }, 'No valid element to insert the app into was given! (initApp)');
  });
  it('should throw an error if there is already a Dwayne app in the container', () => {
    const container = doc.create('div');

    initApp('MyBlock', container);

    throws(() => {
      initApp('MyBlock', container);
    }, 'There already exists a Dwayne app inside the given element! (initApp)');
  });
});
