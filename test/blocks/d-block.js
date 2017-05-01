import { strictEqual, deepStrictEqual } from 'assert';
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

class DBlockTemplateApp extends Block {
  static template = html`
    <DBlockTemplate>
      <d-block:a>
        Hello, world!
      </d-block:a>
    </DBlockTemplate>
  `;

  afterRender() {
    app = this;
  }
}

class DBlockTemplate extends Block {
  static template = html`
    <d-block:a>
      Hello!
    </d-block:a>
    <d-block:b>
      Goodbye!
    </d-block:b>

    <i><d-block:a/></i>
    <b><d-block:b/></b>
    <a><d-block:c/></a>
  `;

  afterRender() {
    block = this;
  }
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
    <DBlockNestedHelper>
      <d-block:a>
        <d-block:b/>
      </d-block:a>
      <d-block:b>
        <d-block:a/>
      </d-block:b>
    </DBlockNestedHelper>
  `;
}

class DBlockNestedHelper extends Block {
  static template = html`
    <a id="a">
      <d-block:a/>
    </a>
    <b id="b">
      <d-block:b/>
    </b>
  `;
}

class DBlockArgsNameApp extends Block {
  static template = html`
    <d-block name="{name}" contentEditable="true" caption="{caption}"/>
  `;

  name = 'div';
  caption = 'caption';

  afterRender() {
    app = this;
  }
}

class DBlockArgsName extends Block {
  static template = html`
    <span>{args.caption}</span>
  `;

  afterRender() {
    block = this;
  }
}

class DBlockArgsConstructorApp extends Block {
  static template = html`
    <d-block Constructor="{Constructor}" who="{who}"/>
    <d-block Constructor="Constructor" who="{who}"/>
  `;

  Constructor = DBlockArgsConstructorHelper1;
  who = 'world';

  afterRender() {
    app = this;
  }
}

class DBlockArgsConstructorHelper1 extends Block {
  static template = html`
    <span>Hello, {args.who}!</span>
  `;
}

class DBlockArgsConstructorHelper2 extends Block {
  static template = html`
    <span>Goodbye, {args.who}!</span>
  `;
}

Block.block('DBlockSimpleApp', DBlockSimpleApp);
Block.block('DBlockSimple', DBlockSimple);
Block.block('DBlockNamedApp', DBlockNamedApp);
Block.block('DBlockNamed', DBlockNamed);
Block.block('DBlockTemplateApp', DBlockTemplateApp);
Block.block('DBlockTemplate', DBlockTemplate);
Block.block('DBlockNestedApp', DBlockNestedApp);
Block.block('DBlockNested', DBlockNested);
Block.block('DBlockNestedHelper', DBlockNestedHelper);
Block.block('DBlockArgsNameApp', DBlockArgsNameApp);
Block.block('DBlockArgsName', DBlockArgsName);
Block.block('DBlockArgsConstructorApp', DBlockArgsConstructorApp);

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
    describe('template test', () => {
      before(() => {
        initApp(htmlScopeless`<DBlockTemplateApp/>`, container);
      });

      it('should render block from the children and templates ignoring non-existing blocks', () => {
        strictEqual(container.html(), '<i>Hello, world!</i><b>Goodbye!</b><a></a>');
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
    describe('args name test', () => {
      before(() => {
        initApp(htmlScopeless`<DBlockArgsNameApp/>`, container);
      });

      it('should render the block using the name arg', () => {
        const children = container.children();

        strictEqual(children.length, 1);
        strictEqual(children.elem(0).name(), 'div');
        deepStrictEqual(children.elem(0).attr(), {
          contenteditable: 'true',
          caption: 'caption'
        });
      });
      it('should re-render the block after the name have been changed', () => {
        app.name = 'DBlockArgsName';
        app.caption = 'Hello, world!';

        strictEqual(block.args.contentEditable, 'true');
        strictEqual(container.html(), '<span>Hello, world!</span>');
      });

      after(remove);
    });
    describe('args constructor test', () => {
      before(() => {
        initApp(htmlScopeless`<DBlockArgsConstructorApp/>`, container);
      });

      it('should render the block using the Constructor arg', () => {
        strictEqual(container.html(), '<span>Hello, world!</span>');
      });
      it('should re-render the block after the Constructor have been changed', () => {
        app.Constructor = DBlockArgsConstructorHelper2;
        app.who = 'human';

        strictEqual(container.html(), '<span>Goodbye, human!</span>');
      });

      after(remove);
    });
  });
};
