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

class DIf extends Block {
  static template = html`
    <d-if if="{condition}">
      <span>
        {caption}
      </span>
    </d-if>
  `;

  condition = false;
  caption = '';

  afterRender() {
    app = this;
  }
}

export default () => {
  describe('d-if', () => {
    let span;

    before(() => {
      initApp(DIf, container);
    });

    it('should not render anything if the condition is false', () => {
      strictEqual(container.html(), '');
    });
    it('should re-render caption after the condition has been changed', () => {
      app.condition = true;
      app.caption = 'Hello, world!';
      span = container.find('span')[0];

      strictEqual(container.html(), '<span>Hello, world!</span>');
    });
    it('should not re-render caption after the condition has been changed to same in terms of boolean', () => {
      app.condition = 1;

      strictEqual(container.html(), '<span>Hello, world!</span>');
      strictEqual(container.find('span')[0], span);
    });
    it('should re-render caption again after the condition has been changed', () => {
      app.condition = false;

      strictEqual(container.html(), '');
    });

    after(remove);
  });
};
