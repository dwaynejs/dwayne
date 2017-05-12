import { strictEqual } from 'assert';
import { Block, doc, initApp, removeApp, Bind, Rest } from '../../src';

let app;
let block;
let onRightClick;
const container = doc.create('div');
const remove = () => {
  removeApp(container);

  app = null;
  block = null;
};

class BindApp extends Block {
  static html = html`
    <div Bind(click)="{onClick}"/>
    <div Bind(keydown)="{onKeydown}"/>
    <div Rest="{rest}" class="Rest"/>
  `;

  rest = { ...this.args };

  afterRender() {
    app = this;
  }
}

class BindNoArgs extends Block {
  static html = html`
    <div Bind="{() => {}}"/>
  `;
}

export default () => {
  describe('Bind', () => {
    const oldConsoleError = console.error;

    before(() => {
      initApp(htmlScopeless`<BindApp Bind(contextmenu)="{(e) => onRightClick(e)}"/>`, container);
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
          strictEqual(message, 'Provide "Bind" mixin with event name args (like "Bind(click)" or "Bind(keyup, keypress)")!');

          done();
        } catch (err) {
          done(err);
        }
      };

      initApp(BindNoArgs, doc.create('div'));
    });
    it('should do the cleaning', (done) => {
      onRightClick = () => {
        done(new Error('Shouldn\'t have been called'));
      };
      app.rest = {};

      container
        .find('div.Rest')
        .dispatch('contextmenu');

      setTimeout(done, 25);
    });

    after(remove);
  });
};
