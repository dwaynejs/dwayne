import { strictEqual } from 'assert';
import { Block, doc, initApp, removeApp, If } from '../../src';

let app;
let block;
const container = doc.create('div');
const remove = () => {
  removeApp(container);

  app = null;
  block = null;
};

class IfApp extends Block {
  static html = html`
    <If if="{condition}">
      <span>
        {caption}
      </span>
    </If>
  `;

  condition = false;
  caption = '';

  afterRender() {
    app = this;
  }
}

export default () => {
  describe('If', () => {
    let span;

    before(() => {
      initApp(IfApp, container);
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
