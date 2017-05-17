import { strictEqual, deepStrictEqual } from 'assert';
import { Block, initApp, doc, insertHtml } from '../../src';

const error = new Error();
const errorFunc = () => null.a;

errorFunc.toString = () => '() => null.a';

class ErrorBlock extends Block {
  static html = [{
    type: '#text',
    value: errorFunc
  }];
}

class OwnOnEvalErrorBlock extends Block {
  static html = [{
    type: '#text',
    value: errorFunc
  }];
}

class MuteEvalErrorBlock extends Block {
  static html = html`{null.a}`;
  static onEvalError = null;
}

class ErrorEvalErrorBlock extends Block {
  static html = [{
    type: '#text',
    value: errorFunc
  }];
}

class Test extends Block {
  static html = html`
    <div>Hello, world!</div>
  `;
}

const wrapper = (Block) => {
  if (Block.wrapped) {
    return;
  }

  return class extends Block {
    static html = insertHtml(html`
      <span><!-- block --></span>
    `, {
      block: Block.html
    });
    static wrapped = true;
  };
};

export default () => {
  describe('defaultLocals', () => {
    it('should use static defaultLocals property', () => {
      let app;

      class DefaultLocals extends Block {
        static defaultLocals = {
          a: 1,
          b: 2
        };

        afterRender() {
          app = this;
        }
      }

      initApp(DefaultLocals, doc.create('div'));

      strictEqual(app.a, 1);
      strictEqual(app.b, 2);
    });
  });
  describe('extend()', () => {
    it('should return the same block but extended', () => {
      class MyBlock extends Block {
        static html = html`<span>Hello, {who}!</span>`;
      }

      class ExtendBlock extends Block {
        _afterConstruct() {
          this.who = 'world';
        }
      }

      MyBlock.extend(ExtendBlock);

      const container = doc.create('div');

      initApp(MyBlock, container);

      strictEqual(container.html(), '<span>Hello, world!</span>');
    });
    it('should do nothing if the extend block is not a Block', () => {
      class MyBlock extends Block {
        static html = html`<span>Hello, {who}!</span>`;
      }

      class ExtendBlock {
        _afterConstruct() {
          this.who = 'world';
        }
      }

      MyBlock.extend(ExtendBlock);

      const container = doc.create('div');

      initApp(MyBlock, container);

      strictEqual(container.html(), '<span>Hello, !</span>');
    });
    it('should resolve cyclic inheritance', () => {
      class MyBlock extends Block {
        static html = html`<span>Hello, {who}!</span>`;
      }

      class InTheMiddleBlock extends MyBlock {}

      class ExtendBlock extends InTheMiddleBlock {
        _afterConstruct() {
          this.who = 'world';
        }
      }

      MyBlock.extend(ExtendBlock);

      const container = doc.create('div');

      initApp(MyBlock, container);

      strictEqual(container.html(), '<span>Hello, world!</span>');
    });
  });
  describe('onEvalError()', () => {
    const oldConsoleError = console.error;

    it('should use default handler and original code', (done) => {
      const func = () => null.a;

      console.error = (message, error) => {
        try {
          strictEqual(message, 'Eval error (evaluating "null.a" in context of RootBlock):');
          strictEqual(error.original, 'null.a');
          strictEqual(error.func, func);
          strictEqual(error.block.getName(), 'RootBlock');

          done();
        } catch (err) {
          done(err);
        }
      };

      func.original = 'null.a';

      initApp([{
        type: '#text',
        value: func
      }], doc.create('div'));
    });
    it('should use default handler and compiled code', (done) => {
      console.error = (message, error) => {
        try {
          strictEqual(message, 'Eval error (evaluating "() => null.a" in context of ErrorBlock):');
          strictEqual(error.original, undefined);
          strictEqual(error.func, errorFunc);
          strictEqual(error.block instanceof ErrorBlock, true);

          done();
        } catch (err) {
          done(err);
        }
      };

      initApp(ErrorBlock, doc.create('div'));
    });
    it('should use own handler', (done) => {
      OwnOnEvalErrorBlock.onEvalError = (error) => {
        try {
          strictEqual(error.original, undefined);
          strictEqual(error.func, errorFunc);
          strictEqual(error.block instanceof OwnOnEvalErrorBlock, true);

          done();
        } catch (err) {
          done(err);
        }
      };

      initApp(html`
        <OwnOnEvalErrorBlock/>
        <MuteEvalErrorBlock/>
      `, doc.create('div'));
    });
    it('should handle error onEvalError handlers', (done) => {
      ErrorEvalErrorBlock.onEvalError = () => {
        throw error;
      };

      console.error = (message, e) => {
        try {
          strictEqual(message, 'Uncaught error in ErrorEvalErrorBlock.onEvalError:');
          strictEqual(e, error);

          done();
        } catch (err) {
          done(err);
        }
      };

      initApp(ErrorEvalErrorBlock, doc.create('div'));
    });

    after(() => {
      console.error = oldConsoleError;
    });
  });
  describe('wrap()', () => {
    it('should return new block', () => {
      const wrapped = Test.wrap(wrapper);

      deepStrictEqual(wrapped.html, html`
        <span>
          <div>Hello, world!</div>
        </span>
      `);
    });
    it('should return initial block if return value is not a block', () => {
      const wrapped = Test.wrap(wrapper, wrapper);

      deepStrictEqual(wrapped.html, html`
        <span>
          <div>Hello, world!</div>
        </span>
      `);
    });
  });
};
