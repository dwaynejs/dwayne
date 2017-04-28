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
    <i d-elem/>
    <DElemHelper/>
  `;

  afterRender() {
    app = this;
  }

  setInput = (input) => {
    this.input = input;
  };
}

class DElemHelper extends Block {
  static template = html`
    <div d-elem(div)="{getTopBlock()}"/>
    <b d-elem(b)/>
  `;

  afterRender() {
    block = this;
  }
}

Block.block('DElem', DElem);
Block.block('DElemHelper', DElemHelper);

export default () => {
  describe('d-elem', () => {
    before(() => {
      initApp(htmlScopeless`<DElem/>`, container);
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
