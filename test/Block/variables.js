import { strictEqual, deepStrictEqual } from 'assert';
import { Block, doc, initApp, removeApp, Rest } from '../../src';

let app;
let block;
const container = doc.create('div');
const remove = () => {
  removeApp(container);

  app = null;
  block = null;
};

class Variables extends Block {
  static html = html`
    <span>Hello, {caption}!</span>
  `;

  caption = 'world';
}

class ChangingVariables extends Block {
  static html = html`
    <span caption="{caption}">Hello, {caption}!</span>
  `;

  caption = null;

  afterRender() {
    app = this;
  }
}

class ChangingArgs extends Block {
  static html = html`
    <span>{args.caption}</span>
  `;
}

class ChangingArgsApp extends Block {
  static html = html`<ChangingArgs caption="{caption}"/>`;

  afterRender() {
    app = this;
  }
}

class ChangingGlobals extends Block {
  static html = html`
    <span>{globals.caption}</span>
  `;
}

class ChangingGlobalsApp extends Block {
  static html = html`<ChangingGlobals/>`;

  constructor(opts) {
    super(opts);

    this.globals.caption = null;
    app = this;
  }
}

class ChangingMultipleVariables extends Block {
  static html = html`
    <span>
      {globals.caption + args.caption + caption}
    </span>
  `;

  caption = ' world!';

  afterRender() {
    block = this;
  }
}

class ChangingMultipleVariablesApp extends Block {
  static html = html`<ChangingMultipleVariables caption="{caption}"/>`;

  caption = ', wonderful';

  constructor(opts) {
    super(opts);

    this.globals.caption = 'Hello';
    app = this;
  }
}

class BlockRest extends Block {
  static args = {
    a: {
      default: 1
    },
    b: {
      default: 2
    }
  };

  afterRender() {
    block = this;
  }
}

class BlockRestApp extends Block {
  static html = html`
    <BlockRest
      arg="{arg}"
      Rest="{rest}"
    />
  `;

  arg = null;
  rest = {
    c: 3
  };

  afterRender() {
    app = this;
  }
}

export default () => {
  describe('variables', () => {
    describe('variables test', () => {
      before(() => {
        initApp(Variables, container);
      });

      it('should render caption using local variable from the block', () => {
        strictEqual(container.html(), '<span>Hello, world!</span>');
      });

      after(remove);
    });
    describe('changing variables test', () => {
      before(() => {
        initApp(ChangingVariables, container);
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
      it('should re-render caption again after it\'s been changed again', () => {
        app.caption = null;

        strictEqual(container.html(), '<span>Hello, !</span>');
      });

      after(remove);
    });
    describe('changing args variables test', () => {
      before(() => {
        initApp(ChangingArgsApp, container);
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
        initApp(ChangingGlobalsApp, container);
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
        initApp(ChangingMultipleVariablesApp, container);
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
    describe('Rest test', () => {
      before(() => {
        initApp(BlockRestApp, container);
      });

      it('should pass args using Block.args', () => {
        deepStrictEqual({ ...block.args }, {
          arg: null,
          a: 1,
          b: 2,
          c: 3
        });
      });
      it('should change the args rewriting default args', () => {
        app.arg = 'a';
        app.rest = {
          a: 7
        };

        deepStrictEqual({ ...block.args }, {
          arg: 'a',
          a: 7,
          b: 2,
          c: undefined
        });
      });

      after(remove);
    });
  });
};
