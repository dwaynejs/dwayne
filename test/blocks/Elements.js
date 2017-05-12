import { strictEqual } from 'assert';
import { Block, doc, initApp, removeApp, Elements } from '../../src';

let app;
let block;
const container = doc.create('div');
const remove = () => {
  removeApp(container);

  app = null;
  block = null;
};

class ElementsBlock extends Block {
  static html = html`
    <div>
      <Elements
        value="{elems}"
        parentScope="{this}"
        parentTemplate="{this}"
      />
    </div>
  `;

  elems = html`
    <span>Hello, world!</span>
  `;

  afterRender() {
    app = this;
  }
}

class ElementsHelper extends Block {
  static html = html`
    <i>Goodbye, world!</i>
  `;
}

export default () => {
  describe('Elements', () => {
    let span;

    before(() => {
      initApp(ElementsBlock, container);
    });

    it('should do initial rendering', () => {
      strictEqual(container.html(), '<div><span>Hello, world!</span></div>');
    });
    it('should re-render elements after the value has been changed', () => {
      app.elems = html`
        <ElementsHelper/>
      `;

      strictEqual(container.html(), '<div><i>Goodbye, world!</i></div>');
    });
    it('should re-render elements again after the value has been changed', () => {
      app.elems = null;

      strictEqual(container.html(), '<div></div>');
    });

    after(remove);
  });
};
