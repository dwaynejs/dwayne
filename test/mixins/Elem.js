import { strictEqual } from 'assert';
import { Block, doc, initApp, removeApp, ElemMixin as Elem } from '../../src';

let app;
let block;
const container = doc.create('div');
const remove = () => {
  removeApp(container);

  app = null;
  block = null;
};

class ElemHelper extends Block {
  static html = html`
    <div Elem(div)="{getParentTemplate()}"/>
    <b Elem(b)/>
  `;

  afterRender() {
    block = this;
  }
}

class ElemApp extends Block {
  static html = html`
    <span Elem="span"/>
    <input Elem="{setInput}"/>
    <i Elem/>
    <ElemHelper/>
  `;

  afterRender() {
    app = this;
  }

  setInput = (input) => {
    this.input = input;
  };
}

export default () => {
  describe('Elem', () => {
    before(() => {
      initApp(ElemApp, container);
    });

    it('should support string value and set the block property to the Elem', () => {
      strictEqual(container.find('span')[0], app.span[0]);
    });
    it('should support function value and call the function with the Elem argument', () => {
      strictEqual(container.find('input')[0], app.input[0]);
    });
    it('should support string argument with block value', () => {
      strictEqual(container.find('div')[0], app.div[0]);
    });
    it('should support string argument with no value', () => {
      strictEqual(container.find('b')[0], block.b[0]);
    });

    after(remove);
  });
};
