import { strictEqual, deepStrictEqual } from 'assert';
import { Block, doc, initApp, removeApp, DynamicBlock } from '../../src';

let app;
let block;
const container = doc.create('div');
const remove = () => {
  removeApp(container);

  app = null;
  block = null;
};

class DynamicBlockApp extends Block {
  static html = html`
    <DynamicBlock
      type="{type}"
      contentEditable="true"
      caption="{caption}"
      who="{caption}"
    />
  `;

  type = 'div';
  caption = 'caption';

  afterRender() {
    app = this;
  }
}

class DynamicHelper extends Block {
  static html = html`
    <span>Hello, {args.who}!</span>
  `;

  afterRender() {
    block = this;
  }
}

export default () => {
  describe('DynamicBlock', () => {
    describe('args type test', () => {
      before(() => {
        initApp(DynamicBlockApp, container);
      });

      it('should render the block using the type arg', () => {
        const children = container.children();

        strictEqual(children.length, 1);
        strictEqual(children.elem(0).name(), 'div');
        deepStrictEqual(children.elem(0).attr(), {
          contenteditable: 'true',
          caption: 'caption',
          who: 'caption'
        });
      });
      it('should re-render the block after the type has been changed', () => {
        app.type = DynamicHelper;
        app.caption = 'world';

        strictEqual(block.args.contentEditable, 'true');
        strictEqual(block.args.caption, 'world');
        strictEqual(container.html(), '<span>Hello, world!</span>');
      });

      after(remove);
    });
  });
};
