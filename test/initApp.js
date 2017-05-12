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
  static html = html`
    <span>Hello, world!</span>
  `;
}

describe('initApp()', () => {
  const oldConsoleError = console.error;

  beforeEach(() => {
    noApp = false;
  });
  afterEach(remove);
  afterEach(() => {
    console.error = oldConsoleError;
  });

  it('should test initializing app using a template', () => {
    initApp(html`<InitAppBlock/>`, container);

    strictEqual(container.html(), '<span>Hello, world!</span>');
  });
  it('should log an error if a container is empty', (done) => {
    noApp = true;

    console.error = (message) => {
      try {
        strictEqual(message, 'No valid element to insert the app into was given! (initApp)');

        done();
      } catch (err) {
        done(err);
      }
    };

    initApp(InitAppBlock, new Elem());
  });
  it('should log an error if no proper block was given', (done) => {
    noApp = true;

    console.error = (message) => {
      try {
        strictEqual(message, 'No valid root block was given! (initApp)');

        done();
      } catch (err) {
        done(err);
      }
    };

    initApp(null, doc.create('div'));
  });
  it('should log an error if there is already a Dwayne app in the container', (done) => {
    noApp = true;

    console.error = (message) => {
      try {
        strictEqual(message, 'There already exists a Dwayne app inside the given element! (initApp)');

        done();
      } catch (err) {
        done(err);
      }
    };

    initApp(InitAppBlock, container);
    initApp(InitAppBlock, container);
  });
});
