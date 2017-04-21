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
  `;

  afterRender() {
    app = this;
  }

  setInput = (input) => {
    this.input = input;
  };
}

Block.block('DNode', DNode);

export default () => {
  describe('d-node', () => {
    before(() => {
      initApp(htmlScopeless`<DNode/>`, container);
    });

    it('should support string argument and set the block property to the Elem', () => {
      strictEqual(container.find('span')[0], app.span);
    });
    it('should support function argument and call the function with the Elem argument', () => {
      strictEqual(container.find('input')[0], app.input);
    });

    after(remove);
  });
};
