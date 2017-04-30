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

class DElements extends Block {
  static template = html`
    <div>
      <d-elements
        value="{elems}"
        parentScope="{this}"
        parentTemplate="{this}"
      />
    </div>
  `;

  elems = htmlScopeless`
    <span>Hello, world!</span>
  `;

  afterRender() {
    app = this;
  }
}

class DElementsHelper extends Block {
  static template = html`
    <i>Goodbye, world!</i>
  `;
}

Block.block('DElementsHelper', DElementsHelper);

export default () => {
  describe('d-elements', () => {
    let span;

    before(() => {
      console.dir(DElements);
      initApp(DElements, container);
    });

    it('should do initial rendering', () => {
      strictEqual(container.html(), '<div><span>Hello, world!</span></div>');
    });
    it('should re-render elements after the value has been changed', () => {
      app.elems = htmlScopeless`
        <DElementsHelper/>
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
