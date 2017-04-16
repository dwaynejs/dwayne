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

class Primitive extends Block {
  static template = html`
    <span>Hello, world!</span>
  `;

  afterRender() {
    app = this;
  }
}

Block.block('Primitive', Primitive);

export default () => {
  describe('primitive', () => {
    before(() => {
      initApp(htmlScopeless`<Primitive/>`, container);
    });

    it('should render simple caption', () => {
      strictEqual(container.html(), '<span>Hello, world!</span>');
    });

    after(remove);
  });
};
