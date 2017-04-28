import { strictEqual } from 'assert';
import { Block, Elem, initApp, doc, removeApp } from '../src';

let noApp;
const container = doc.create('div');
const remove = () => {
  if (!noApp) {
    removeApp(container);
  }
};

class InitAppBlock extends Block {
  static template = html`
    <span>Hello, world!</span>
  `;
}

Block.block('InitAppBlock', InitAppBlock);

describe('initApp()', () => {
  const oldConsoleError = console.error;

  beforeEach(() => {
    noApp = false;
  });
  afterEach(remove);
  after(() => {
    console.error = oldConsoleError;
  });

  it('should test initializing app using an array', () => {
    initApp(htmlScopeless`<InitAppBlock/>`, container);

    strictEqual(container.html(), '<span>Hello, world!</span>');
  });
  it('should test initializing app using a template object', () => {
    initApp(html`<InitAppBlock/>`, container);

    strictEqual(container.html(), '<span>Hello, world!</span>');
  });
  it('should test initializing app using a string', () => {
    initApp('InitAppBlock', container);

    strictEqual(container.html(), '<span>Hello, world!</span>');
  });
  it('should throw an error if a container is empty', (done) => {
    noApp = true;

    console.error = (message) => {
      try {
        strictEqual(message, 'No valid element to insert the app into was given! (initApp)');

        done();
      } catch (err) {
        done(err);
      }
    };

    initApp('InitAppBlock', new Elem());
  });
  it('should throw an error if there is already a Dwayne app in the container', (done) => {
    console.error = (message) => {
      try {
        strictEqual(message, 'There already exists a Dwayne app inside the given element! (initApp)');

        done();
      } catch (err) {
        done(err);
      }
    };

    initApp('InitAppBlock', container);
    initApp('InitAppBlock', container);
  });
});
