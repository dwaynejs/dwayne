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

class DBlockSimpleApp extends Block {
  static template = html`
    <DBlockSimple>
      <span>{caption}</span>
    </DBlockSimple>
  `;

  caption = 'Hello, world!';

  afterRender() {
    app = this;
  }
}

class DBlockSimple extends Block {
  static template = html`
    <div>
      <d-block/>
    </div>
  `;
}

class DBlockNamedApp extends Block {
  static template = html`
    <DBlockNamed>
      <d-block:a>
        {captionA}
      </d-block:a>
      <d-block:b>
        {captionB}
      </d-block:b>
    </DBlockNamed>
  `;

  captionA = 'Hello!';
  captionB = 'Goodbye!';

  afterRender() {
    app = this;
  }
}

class DBlockNamed extends Block {
  static template = html`
    <a id="a1">
      <d-block:a/>
    </a>
    <b id="b">
      <d-block:b/>
    </b>
    <i id="a2">
      <d-block:a/>
    </i>
  `;
}

class DBlockNestedApp extends Block {
  static template = html`
    <DBlockNested>
      <d-block:a>
        {captionA}
      </d-block:a>
      <d-block:b>
        {captionB}
      </d-block:b>
    </DBlockNested>
  `;

  captionA = 'Hello!';
  captionB = 'Goodbye!';

  afterRender() {
    app = this;
  }
}

class DBlockNested extends Block {
  static template = html`
    <DBlockNestedTestHelper>
      <d-block:a>
        <d-block:b/>
      </d-block:a>
      <d-block:b>
        <d-block:a/>
      </d-block:b>
    </DBlockNestedTestHelper>
  `;
}

class DBlockNestedTestHelper extends Block {
  static template = html`
    <a id="a">
      <d-block:a/>
    </a>
    <b id="b">
      <d-block:b/>
    </b>
  `;
}

Block.block('DBlockSimpleApp', DBlockSimpleApp);
Block.block('DBlockSimple', DBlockSimple);
Block.block('DBlockNamedApp', DBlockNamedApp);
Block.block('DBlockNamed', DBlockNamed);
Block.block('DBlockNestedApp', DBlockNestedApp);
Block.block('DBlockNested', DBlockNested);
Block.block('DBlockNestedTestHelper', DBlockNestedTestHelper);

export default () => {
  describe('d-block', () => {
    describe('simple test', () => {
      before(() => {
        initApp(htmlScopeless`<DBlockSimpleApp/>`, container);
      });

      it('should render caption using variables from the current scope', () => {
        strictEqual(container.html(), '<div><span>Hello, world!</span></div>');
      });
      it('should re-render caption after the variable has been changed', () => {
        app.caption = 'Hello, world, again!';

        strictEqual(container.html(), '<div><span>Hello, world, again!</span></div>');
      });

      after(remove);
    });
    describe('named test', () => {
      before(() => {
        initApp(htmlScopeless`<DBlockNamedApp/>`, container);
      });

      it('should render caption using variables from the current scope', () => {
        strictEqual(container.html(), '<a id="a1">Hello!</a><b id="b">Goodbye!</b><i id="a2">Hello!</i>');
      });
      it('should re-render caption after the variables have been changed', () => {
        app.captionA = 'Goodbye!';
        app.captionB = 'Hello!';

        strictEqual(container.html(), '<a id="a1">Goodbye!</a><b id="b">Hello!</b><i id="a2">Goodbye!</i>');
      });

      after(remove);
    });
    describe('nested test', () => {
      before(() => {
        initApp(htmlScopeless`<DBlockNestedApp/>`, container);
      });

      it('should render caption using variables from the current scope', () => {
        strictEqual(container.html(), '<a id="a">Goodbye!</a><b id="b">Hello!</b>');
      });
      it('should re-render caption after the variables have been changed', () => {
        app.captionA = 'Goodbye!';
        app.captionB = 'Hello!';

        strictEqual(container.html(), '<a id="a">Hello!</a><b id="b">Goodbye!</b>');
      });

      after(remove);
    });
  });
};