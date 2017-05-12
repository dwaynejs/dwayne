import { strictEqual } from 'assert';
import { Block, doc, initApp, removeApp, Show, Rest } from '../../src';

let app;
let block;
const container = doc.create('div');
const remove = () => {
  removeApp(container);

  app = null;
  block = null;
};

class ShowApp extends Block {
  static html = html`
    <div Show="{show}" class="hidden"/>
    <div Rest="{rest}" class="rest"/>
  `;

  show = true;
  rest = { ...this.args };

  afterRender() {
    app = this;
  }
}

export default () => {
  describe('Show', () => {
    before(() => {
      initApp(html`<ShowApp Show="{false}"/>`, container);
    });

    it('should not be hidden if the condition is truthy', () => {
      strictEqual(container.find('div.hidden').hasClass('__dwayne-hidden__'), false);
    });
    it('should be hidden if the condition is falsy', () => {
      app.show = false;

      strictEqual(container.find('div.hidden').hasClass('__dwayne-hidden__'), true);
    });
    it('should not be hidden if the condition is truthy again', () => {
      app.show = true;

      strictEqual(container.find('div.hidden').hasClass('__dwayne-hidden__'), false);
    });
    it('should do the cleaning', () => {
      app.rest = {};

      strictEqual(container.find('div.rest').hasClass('__dwayne-hidden__'), false);
    });

    after(remove);
  });
};
