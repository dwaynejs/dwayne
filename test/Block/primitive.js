import { strictEqual, deepStrictEqual } from 'assert';
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
  static html = html`
    <span>Hello, world!</span>
  `;
}

class BlocksHelper extends Block {
  static html = html`
    <span>Hello, world, again!</span>
  `;
}

class BlocksHelper2 extends Block {
  static html = html`
    <BlocksHelper/>
  `;
}

const BlocksHelper3 = html`
  <i>Goodbye, world, again!</i>
`;

class EmptyBlock extends Block {}

class Blocks extends Block {
  static html = html`
    <span>Hello, world!</span>
    <BlocksHelper/>
    <span>Goodbye, world!</span>
    <div>
      <i>123</i>
      <BlocksHelper/>
    </div>
    <BlocksHelper2/>
    <BlocksHelper3/>
  `;
}

class EmptySibling extends Block {
  static html = html`
    <EmptyBlock/>
    <i/>
  `;
}

class EmptyBlocks extends Block {
  static html = html`
    <div>
      <EmptyBlock/>
      <span>Hello, world!</span>
      <EmptyBlock/>
      <EmptyBlock/>
      <span>Goodbye, world!</span>
      <EmptySibling/>
    </div>
  `;
}

class Elements extends Block {
  static html = html`
    <svg>
      <circle r="10" cx="10" cy="10"/>
    </svg>
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
    <iframe>
      <BlocksHelper/>
    </iframe>
  `;
}

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
        + '<i>Goodbye, world, again!</i>'
      );
    });

    after(remove);
  });
  describe('empty blocks', () => {
    before(() => {
      initApp(EmptyBlocks, container);
    });

    it('should render empty blocks and elements', () => {
      strictEqual(container.html(), '<div><span>Hello, world!</span><span>Goodbye, world!</span><i></i></div>');
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
      const children = container.children();
      const svgChildren = children.elem(0).children();

      strictEqual(children.length, 5);
      strictEqual(children.elem(0).name(), 'svg');
      strictEqual(svgChildren.length, 1);
      deepStrictEqual(svgChildren.elem(0).attr(), {
        r: '10',
        cx: '10',
        cy: '10'
      });
      strictEqual(children.elem(1).name(), '#comment');
      strictEqual(children.elem(1).text(), ' comment ');
      strictEqual(children.elem(2).prop('outerHTML'), '<iframe src="/index.html"></iframe>');
      strictEqual(children.elem(3).prop('outerHTML'), '<iframe></iframe>');
      strictEqual(new Elem(children[3].contentDocument.documentElement).prop('outerHTML'), ''
        + '<html>'
          + '<head></head>'
          + '<body>'
            + '<span>456</span>'
          + '</body>'
        + '</html>'
      );
      strictEqual(
        new Elem(children[4].contentDocument.documentElement).prop('outerHTML'),
        '<span>Hello, world, again!</span>'
      );
    });

    after(() => {
      container.remove();
    });
    after(remove);
  });
  describe('invalid blocks and elements', () => {
    it('should throw an error when invalid block constructor given', (done) => {
      const Block = 1;

      try {
        initApp(html`<Block/>`, doc.create('div'));
      } catch (error) {
        try {
          strictEqual(error.message, 'Wrong block type given: 1');

          done();
        } catch (err) {
          done(err);
        }
      }
    });
  });
};
