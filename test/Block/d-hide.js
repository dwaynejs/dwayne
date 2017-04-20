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

class DHide extends Block {
  static template = html`
    <div d-hide="{hide}"/>
  `;

  hide = false;

  afterRender() {
    app = this;
  }
}

Block.block('DHide', DHide);

export default () => {
  describe('d-hide', () => {
    before(() => {
      initApp(htmlScopeless`<DHide/>`, container);
    });

    it('should not be hidden if the condition is falsy', () => {
      strictEqual(container.find('div').hasClass('__dwayne-hidden__'), false);
    });
    it('should be hidden if the condition is truthy', () => {
      app.hide = true;

      strictEqual(container.find('div').hasClass('__dwayne-hidden__'), true);
    });
    it('should not be hidden if the condition is falsy again', () => {
      app.hide = false;

      strictEqual(container.find('div').hasClass('__dwayne-hidden__'), false);
    });

    after(remove);
  });
};
