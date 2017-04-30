import { strictEqual } from 'assert';
import { Block, doc, body, initApp, removeApp, Elem } from '../../src';

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
}

class Blocks extends Block {
  static template = html`
    <span>Hello, world!</span>
    <BlocksHelper/>
    <span>Goodbye, world!</span>
    <div>
      <i>123</i>
      <BlocksHelper/>
    </div>
    <BlocksHelper2/>
  `;
}

class BlocksHelper extends Block {
  static template = html`
    <span>Hello, world, again!</span>
  `;
}

class BlocksHelper2 extends Block {
  static template = html`
    <BlocksHelper/>
  `;
}

class EmptyBlocks extends Block {
  static template = html`
    <div>
      <EmptyBlock/>
      <span>Hello, world!</span>
      <EmptyBlock/>
      <span>Goodbye, world!</span>
    </div>
  `;
}

class EmptyBlock extends Block {}

class Elements extends Block {
  static template = html`
    <svg>
      <circle r="10" cx="10" cy="10"/>
    </svg>
    <template>
      <div>123</div>
    </template>
    <!-- comment -->
    <iframe src="/index.html">
      <div/>
    </iframe>
    <iframe>
      <html>
        <head></head>
        <body>
          <span>456</span>
        </body>
      </html>
    </iframe>
  `;
}

Block.block('BlocksHelper', BlocksHelper);
Block.block('BlocksHelper2', BlocksHelper2);
Block.block('EmptyBlock', EmptyBlock);

export default () => {
  describe('primitive', () => {
    before(() => {
      initApp(Primitive, container);
    });

    it('should render simple caption', () => {
      strictEqual(container.html(), '<span>Hello, world!</span>');
    });

    after(remove);
  });
  describe('blocks', () => {
    before(() => {
      initApp(Blocks, container);
    });

    it('should render blocks and elements', () => {
      strictEqual(container.html(), ''
        + '<span>Hello, world!</span>'
        + '<span>Hello, world, again!</span>'
        + '<span>Goodbye, world!</span>'
        + '<div>'
          + '<i>123</i>'
          + '<span>Hello, world, again!</span>'
        + '</div>'
        + '<span>Hello, world, again!</span>'
      );
    });

    after(remove);
  });
  describe('empty blocks', () => {
    before(() => {
      initApp(EmptyBlocks, container);
    });

    it('should render empty blocks and elements', () => {
      strictEqual(container.html(), '<div><span>Hello, world!</span><span>Goodbye, world!</span></div>');
    });

    after(remove);
  });
  describe('support svg, template, iframe and comments', () => {
    before(() => {
      container.into(body);
    });
    before(() => {
      initApp(Elements, container);
    });

    it('should render empty blocks and elements', () => {
      strictEqual(container.html(), ''
        + '<svg>'
          + '<circle r="10" cx="10" cy="10"></circle>'
        + '</svg>'
        + '<template>'
          + '<div>123</div>'
        + '</template>'
        + '<!-- comment -->'
        + '<iframe src="/index.html"></iframe>'
        + '<iframe></iframe>'
      );
      strictEqual(new Elem(container.children()[4].contentDocument.documentElement).prop('outerHTML'), ''
        + '<html>'
          + '<head></head>'
          + '<body>'
            + '<span>456</span>'
          + '</body>'
        + '</html>'
      );
    });

    after(() => {
      container.remove();
    });
    after(remove);
  });
};
