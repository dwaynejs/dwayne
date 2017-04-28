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

class DOn extends Block {
  static template = html`
    <div d-on(click)="{onClick()}"/>
  `;

  afterRender() {
    app = this;
  }
}

class DOnNoArgs extends Block {
  static template = html`
    <div d-on="{onClick()}"/>
  `;
}

Block.block('DOn', DOn);
Block.block('DOnNoArgs', DOnNoArgs);

export default () => {
  describe('d-on', () => {
    const oldConsoleError = console.error;

    before(() => {
      initApp(htmlScopeless`<DOn/>`, container);
    });
    afterEach(() => {
      console.error = oldConsoleError;
    });

    it('should call the expression every time the event is dispatched', (done) => {
      app.onClick = () => {
        done();
      };

      container
        .find('div')
        .dispatch('click');
    });
    it('should log an error with no args', (done) => {
      console.error = (message) => {
        try {
          strictEqual(message, 'Provide "d-on" mixin with an event names (like "d-on(click)" or "d-on(keyup, keypress)")!');

          done();
        } catch (err) {
          done(err);
        }
      };

      initApp(htmlScopeless`<DOnNoArgs/>`, doc.create('div'));
    });

    after(remove);
  });
};
