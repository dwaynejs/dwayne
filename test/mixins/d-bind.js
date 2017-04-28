import { strictEqual } from 'assert';
import { Block, doc, initApp, removeApp } from '../../src';

let app;
let block;
const container = doc.create('div');
const remove = () => {
  removeApp(container);

  app = null;
  block = null;
};

class DBind extends Block {
  static template = html`
    <div d-bind(click)="{onClick}"/>
    <div d-bind(keydown)="{onKeydown}"/>
  `;

  afterRender() {
    app = this;
  }
}

class DBindNoArgs extends Block {
  static template = html`
    <div d-bind="{() => {}}"/>
  `;
}

Block.block('DBind', DBind);
Block.block('DBindNoArgs', DBindNoArgs);

export default () => {
  describe('d-bind', () => {
    const oldConsoleError = console.error;

    before(() => {
      initApp(htmlScopeless`<DBind/>`, container);
    });
    afterEach(() => {
      console.error = oldConsoleError;
    });

    it('should bind event listeners', (done) => {
      app.onClick = (e) => {
        try {
          strictEqual(e.type, 'click');

          done();
        } catch (err) {
          done(err);
        }
      };

      container
        .find('div')
        .dispatch('click');
    });
    it('should log an error with no args', (done) => {
      console.error = (message) => {
        try {
          strictEqual(message, 'Provide "d-bind" mixin with an event names (like "d-bind(click)" or "d-bind(keyup, keypress)")!');

          done();
        } catch (err) {
          done(err);
        }
      };

      initApp(htmlScopeless`<DBindNoArgs/>`, doc.create('div'));
    });

    after(remove);
  });
};
