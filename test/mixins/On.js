import { strictEqual } from 'assert';
import { Block, doc, initApp, removeApp, On, Rest } from '../../src';

let app;
let block;
let onRightClick;
const container = doc.create('div');
const remove = () => {
  removeApp(container);

  app = null;
  block = null;
};

class OnApp extends Block {
  static html = html`
    <div On(click)="{onClick()}"/>
    <div Rest="{rest}" class="Rest"/>
  `;

  rest = { ...this.args };

  afterRender() {
    app = this;
  }
}

class OnNoArgs extends Block {
  static html = html`
    <div On="{onClick()}"/>
  `;
}

export default () => {
  describe('On', () => {
    const oldConsoleError = console.error;

    before(() => {
      initApp(htmlScopeless`<OnApp On(contextmenu)="{onRightClick()}"/>`, container);
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
          strictEqual(message, 'Provide "On" mixin with event name args (like "On(click)" or "On(keyup, keypress)")!');

          done();
        } catch (err) {
          done(err);
        }
      };

      initApp(OnNoArgs, doc.create('div'));
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
