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

class DElem extends Block {
  static template = html`
    <span d-elem="span"/>
    <input d-elem="{setInput}"/>
  `;

  afterRender() {
    app = this;
  }

  setInput = (input) => {
    this.input = input;
  };
}

Block.block('DElem', DElem);

export default () => {
  describe('d-elem', () => {
    before(() => {
      initApp(htmlScopeless`<DElem/>`, container);
    });

    it('should support string argument and set the block property to the Elem', () => {
      strictEqual(container.find('span')[0], app.span[0]);
    });
    it('should support function argument and call the function with the Elem argument', () => {
      strictEqual(container.find('input')[0], app.input[0]);
    });

    after(remove);
  });
};
