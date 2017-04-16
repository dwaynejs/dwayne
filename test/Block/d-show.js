import assert from 'assert';
import { Block, doc, initApp, removeApp } from '../../src';

let app;
let block;
const container = doc.create('div');
const remove = () => {
  removeApp(container);

  app = null;
  block = null;
};

class DShow extends Block {
  static template = html`
    <div d-show="{show}"/>
  `;

  show = true;

  afterRender() {
    app = this;
  }
}

Block.block('DShow', DShow);

export default () => {
  describe('d-show', () => {
    before(() => {
      initApp(htmlScopeless`<DShow/>`, container);
    });

    it('should not be hidden if the condition is truthy', () => {
      assert(!container.find('div').hasClass('__dwayne-hidden__'));
    });
    it('should be hidden if the condition is falsy', () => {
      app.show = false;

      assert(container.find('div').hasClass('__dwayne-hidden__'));
    });
    it('should not be hidden if the condition is truthy again', () => {
      app.show = true;

      assert(!container.find('div').hasClass('__dwayne-hidden__'));
    });

    after(remove);
  });
};
