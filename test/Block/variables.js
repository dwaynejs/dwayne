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

class Variables extends Block {
  static template = html`
    <span>Hello, {caption}!</span>
  `;

  caption = 'world';
}

class ChangingVariables extends Block {
  static template = html`
    <span caption="{caption}">Hello, {caption}!</span>
  `;

  caption = null;

  afterRender() {
    app = this;
  }
}

class ChangingArgsApp extends Block {
  static template = html`<ChangingArgs caption="{caption}"/>`;

  afterRender() {
    app = this;
  }
}

class ChangingArgs extends Block {
  static template = html`
    <span>{args.caption}</span>
  `;
}

class ChangingGlobalsApp extends Block {
  static template = html`<ChangingGlobals/>`;

  constructor(opts) {
    super(opts);

    this.globals.caption = null;
    app = this;
  }
}

class ChangingGlobals extends Block {
  static template = html`
    <span>{globals.caption}</span>
  `;
}

class ChangingMultipleVariablesApp extends Block {
  static template = html`<ChangingMultipleVariables caption="{caption}"/>`;

  caption = ', wonderful';

  constructor(opts) {
    super(opts);

    this.globals.caption = 'Hello';
    app = this;
  }
}

class ChangingMultipleVariables extends Block {
  static template = html`
    <span>
      {globals.caption + args.caption + caption}
    </span>
  `;

  caption = ' world!';

  afterRender() {
    block = this;
  }
}

Block.block('Variables', Variables);
Block.block('ChangingVariables', ChangingVariables);
Block.block('ChangingArgsApp', ChangingArgsApp);
Block.block('ChangingArgs', ChangingArgs);
Block.block('ChangingGlobalsApp', ChangingGlobalsApp);
Block.block('ChangingGlobals', ChangingGlobals);
Block.block('ChangingMultipleVariablesApp', ChangingMultipleVariablesApp);
Block.block('ChangingMultipleVariables', ChangingMultipleVariables);

export default () => {
  describe('variables', () => {
    describe('variables test', () => {
      before(() => {
        initApp(htmlScopeless`<Variables/>`, container);
      });

      it('should render caption using local variable from the block', () => {
        strictEqual(container.html(), '<span>Hello, world!</span>');
      });

      after(remove);
    });
    describe('changing variables test', () => {
      before(() => {
        initApp(htmlScopeless`<ChangingVariables/>`, container);
      });

      it('should render caption using local variable from the block', () => {
        strictEqual(container.html(), '<span>Hello, !</span>');
      });
      it('should re-render caption after it\'s been changed', () => {
        app.caption = 'world';

        strictEqual(container.html(), '<span caption="world">Hello, world!</span>');
      });
      it('should re-render caption again after it\'s been changed', () => {
        app.caption = 'dwayne';

        strictEqual(container.html(), '<span caption="dwayne">Hello, dwayne!</span>');
      });
      it('should re-render caption again after it\'s been changed', () => {
        app.caption = null;

        strictEqual(container.html(), '<span>Hello, !</span>');
      });

      after(remove);
    });
    describe('changing args variables test', () => {
      before(() => {
        initApp(htmlScopeless`<ChangingArgsApp/>`, container);
      });

      it('should render caption using args variable from the block', () => {
        strictEqual(container.html(), '<span></span>');
      });
      it('should re-render caption after the arg has been changed', () => {
        app.caption = 'Hello, world!';

        strictEqual(container.html(), '<span>Hello, world!</span>');
      });
      it('should re-render caption again after the arg been changed', () => {
        app.caption = 'Hello, world, again!';

        strictEqual(container.html(), '<span>Hello, world, again!</span>');
      });

      after(remove);
    });
    describe('changing globals test', () => {
      before(() => {
        initApp(htmlScopeless`<ChangingGlobalsApp/>`, container);
      });

      it('should render caption using global variable', () => {
        strictEqual(container.html(), '<span></span>');
      });
      it('should re-render caption after the global has been changed', () => {
        app.globals.caption = 'Hello, world!';

        strictEqual(container.html(), '<span>Hello, world!</span>');
      });
      it('should re-render caption again after the global been changed', () => {
        app.globals.caption = 'Hello, world, again!';

        strictEqual(container.html(), '<span>Hello, world, again!</span>');
      });

      after(remove);
    });
    describe('changing multiple variables test', () => {
      before(() => {
        initApp(htmlScopeless`<ChangingMultipleVariablesApp/>`, container);
      });

      it('should render caption using variables', () => {
        strictEqual(container.html(), '<span>Hello, wonderful world!</span>');
      });
      it('should re-render caption after one variable has been changed', () => {
        app.globals.caption = 'Goodbye';

        strictEqual(container.html(), '<span>Goodbye, wonderful world!</span>');
      });
      it('should re-render caption after all variables have been changed', () => {
        app.globals.caption = 'To be';
        app.caption = ' or ';
        block.caption = 'not to be?';

        strictEqual(container.html(), '<span>To be or not to be?</span>');
      });

      after(remove);
    });
  });
};
