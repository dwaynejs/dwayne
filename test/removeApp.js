import { strictEqual } from 'assert';
import { Block, Elem, initApp, doc, removeApp } from '../src';

class RemoveAppBlock extends Block {
  static html = html`
    <span>Hello, world!</span>
  `;
}

describe('removeApp()', () => {
  it('should remove existing app from the element', () => {
    const container = doc.create('div');

    initApp(html`<RemoveAppBlock/>`, container);

    strictEqual(container.html(), '<span>Hello, world!</span>');

    removeApp(container);

    strictEqual(container.html(), '');
  });
  it('should log an error if the container is empty', (done) => {
    console.error = (message) => {
      try {
        strictEqual(message, 'No valid element to remove the app from was given! (removeApp)');

        done();
      } catch (err) {
        done(err);
      }
    };

    removeApp(new Elem());
  });
  it('should log an error if the container doesn\'t contain a Dwayne app', (done) => {
    console.error = (message) => {
      try {
        strictEqual(message, 'No app registered inside the given element! (removeApp)');

        done();
      } catch (err) {
        done(err);
      }
    };

    removeApp(doc.create('div'));
  });
});

