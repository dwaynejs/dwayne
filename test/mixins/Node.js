import { strictEqual } from 'assert';
import { Block, doc, initApp, removeApp, NodeMixin as Node } from '../../src';

let app;
let block;
const container = doc.create('div');
const remove = () => {
  removeApp(container);

  app = null;
  block = null;
};

class NodeHelper extends Block {
  static html = html`
    <div Node(div)="{getParentTemplate()}"/>
    <b Node(b)/>
  `;

  afterRender() {
    block = this;
  }
}

class NodeApp extends Block {
  static html = html`
    <span Node="span"/>
    <input Node="{setInput}"/>
    <i Node/>
    <NodeHelper/>
  `;

  afterRender() {
    app = this;
  }

  setInput = (input) => {
    this.input = input;
  };
}

export default () => {
  describe('Node', () => {
    before(() => {
      initApp(NodeApp, container);
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
