import { strictEqual } from 'assert';
import { Block, doc, initApp, removeApp, Hide, Rest } from '../../src';

let app;
let block;
const container = doc.create('div');
const remove = () => {
  removeApp(container);

  app = null;
  block = null;
};

class HideApp extends Block {
  static html = html`
    <div Hide="{hide}" class="hidden"/>
    <div Rest="{rest}" class="rest"/>
  `;

  hide = false;
  rest = { ...this.args };

  afterRender() {
    app = this;
  }
}

export default () => {
  describe('Hide', () => {
    before(() => {
      initApp(html`<HideApp Hide/>`, container);
    });

    it('should not be hidden if the condition is falsy', () => {
      strictEqual(container.find('div.hidden').hasClass('__dwayne-hidden__'), false);
    });
    it('should be hidden if the condition is truthy', () => {
      app.hide = true;

      strictEqual(container.find('div.hidden').hasClass('__dwayne-hidden__'), true);
      strictEqual(container.find('div.rest').hasClass('__dwayne-hidden__'), true);
    });
    it('should not be hidden if the condition is falsy again', () => {
      app.hide = false;

      strictEqual(container.find('div.hidden').hasClass('__dwayne-hidden__'), false);
    });
    it('should do the cleaning', () => {
      app.rest = {};

      strictEqual(container.find('div.rest').hasClass('__dwayne-hidden__'), false);
    });

    after(remove);
  });
};
