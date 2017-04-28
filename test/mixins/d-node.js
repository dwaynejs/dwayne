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

class DNode extends Block {
  static template = html`
    <span d-node="span"/>
    <input d-node="{setInput}"/>
    <i d-node/>
    <DNodeHelper/>
  `;

  afterRender() {
    app = this;
  }

  setInput = (input) => {
    this.input = input;
  };
}

class DNodeHelper extends Block {
  static template = html`
    <div d-node(div)="{getTopBlock()}"/>
    <b d-node(b)/>
  `;

  afterRender() {
    block = this;
  }
}

Block.block('DNode', DNode);
Block.block('DNodeHelper', DNodeHelper);

export default () => {
  describe('d-node', () => {
    before(() => {
      initApp(htmlScopeless`<DNode/>`, container);
    });

    it('should support string value and set the block property to the Elem', () => {
      strictEqual(container.find('span')[0], app.span);
    });
    it('should support function value and call the function with the Elem argument', () => {
      strictEqual(container.find('input')[0], app.input);
    });
    it('should support string argument with block value', () => {
      strictEqual(container.find('div')[0], app.div);
    });
    it('should support string argument with no value', () => {
      strictEqual(container.find('b')[0], block.b);
    });

    after(remove);
  });
};
