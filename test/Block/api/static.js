import { strictEqual } from 'assert';
import { Block, Mixin, initApp, doc, insertTemplates } from '../../../src';
import { DBlock } from '../../../src/blocks/d-block';
import { DHide } from '../../../src/mixins/d-hide';

const template = html`
  <div>
    Hello, {who}!
  </div>
`;
const error = new Error();

export default () => {
  describe('block()', () => {
    const oldConsoleWarn = console.warn;
    const oldConsoleError = console.error;
    let removeHook;

    before(() => {
      removeHook = Block.beforeRegisterBlock((Block) => {
        if (Block.forHooks) {
          Block.template = insertTemplates(html`
            <span><!-- block --></span>
          `, {
            block: Block.template
          });
        }

        if (Block.noReturn) {
          return;
        }

        if (Block.returnArray) {
          Block.template = Block.template.value;
        }

        if (Block.forErrorHooks) {
          throw error;
        }

        return Block;
      });
    });
    after(() => {
      console.warn = oldConsoleWarn;
      console.error = oldConsoleError;
      removeHook();
    });

    it('should register block which does not extend Block', () => {
      function MyBlock() {
        this.who = 'world';
      }

      MyBlock.template = template;

      Block.block('MyBlock', MyBlock);

      const container = doc.create('div');

      initApp('MyBlock', container);

      strictEqual(container.html(), '<div>Hello, world!</div>');
    });
    it('should register block with array template value', () => {
      const who = 'world';

      Block.block('MyBlock', htmlScopeless`
        <div>
          Hello, {who}!
        </div>
      `);

      const container = doc.create('div');

      initApp('MyBlock', container);

      strictEqual(container.html(), '<div>Hello, world!</div>');
    });
    it('should register block with template value', () => {
      Block.block('MyBlock', html`
        <div>
          Hello, world!
        </div>
      `);

      const container = doc.create('div');

      initApp('MyBlock', container);

      strictEqual(container.html(), '<div>Hello, world!</div>');
    });
    it('should not register block with any other value', (done) => {
      console.warn = (message) => {
        try {
          strictEqual(message, 'Block must be a template (array or an object from an html loader), a function or a class that extends Block class (name: "MyBlock") (Block.block)');

          done();
        } catch (err) {
          done(err);
        }
      };

      Block.block('MyBlock', {});
    });
    it('should not register block with a built-in name', (done) => {
      console.warn = (message) => {
        try {
          strictEqual(message, 'The "d-block" block is a built-in block so the block will not be registered (Block.block)');

          done();
        } catch (err) {
          done(err);
        }
      };

      Block.block('d-block', template);
    });
    it('should not register block with invalid name', (done) => {
      console.warn = (message) => {
        try {
          strictEqual(message, 'Name "#block" is not allowed for blocks so the block will not be registered (Block.block)');

          done();
        } catch (err) {
          done(err);
        }
      };

      Block.block('#block', template);
    });
    it('should test hooks', () => {
      class MyBlock extends Block {
        static template = template;
        static forHooks = true;

        who = 'world';
      }

      Block.block('MyBlock', MyBlock);

      const container = doc.create('div');

      initApp('MyBlock', container);

      strictEqual(container.html(), '<span><div>Hello, world!</div></span>');
    });
    it('should test hooks which return undefined', () => {
      class MyBlock extends Block {
        static template = template;
        static noReturn = true;

        who = 'world';
      }

      Block.block('MyBlock', MyBlock);

      const container = doc.create('div');

      initApp('MyBlock', container);

      strictEqual(container.html(), '<div>Hello, world!</div>');
    });
    it('should test hooks with errors', (done) => {
      console.error = (message, e) => {
        try {
          strictEqual(message, 'Uncaught error in "beforeRegisterBlock" hook:');
          strictEqual(e, error);

          done();
        } catch (err) {
          done(err);
        }
      };

      class MyBlock extends Block {
        static template = template;
        static forErrorHooks = true;

        who = 'world';
      }

      Block.block('MyBlock', MyBlock);

      const container = doc.create('div');

      initApp('MyBlock', container);

      strictEqual(container.html(), '<div>Hello, world!</div>');
    });
    it('should test hooks which set template to an array', () => {
      class MyBlock extends Block {
        static template = template;
        static returnArray = true;

        who = 'world';
      }

      Block.block('MyBlock', MyBlock);

      const container = doc.create('div');

      initApp('MyBlock', container);

      strictEqual(container.html(), '<div>Hello, world!</div>');
    });
  });
  describe('get()', () => {
    it('should return registered block in the namespace', () => {
      class MyBlock1 extends Block {}
      class MyBlock2 extends Block {}

      MyBlock1.block('MyBlock2', MyBlock2);
      Block.block('MyBlock1', MyBlock1);

      strictEqual(Block.get('d-block'), DBlock);
      strictEqual(Block.get('d-block2'), undefined);
      strictEqual(Block.get('MyBlock1'), MyBlock1);
      strictEqual(Block.get('MyBlock2'), undefined);
      strictEqual(MyBlock1.get('d-block'), DBlock);
      strictEqual(MyBlock1.get('MyBlock1'), MyBlock1);
      strictEqual(MyBlock1.get('MyBlock2'), MyBlock2);
      strictEqual(MyBlock1.get('MyBlock3'), undefined);
      strictEqual(MyBlock2.get('d-block'), DBlock);
      strictEqual(MyBlock2.get('d-block2'), undefined);
      strictEqual(MyBlock2.get('MyBlock1'), MyBlock1);
      strictEqual(MyBlock2.get('MyBlock2'), MyBlock2);
    });
  });
  describe('getMixin()', () => {
    it('should return registered mixin in the namespace', () => {
      class MyBlock extends Block {}
      class MyMixin1 extends Mixin {}
      class MyMixin2 extends Mixin {}

      MyBlock.mixin('my-mixin2', MyMixin2);
      Block.mixin('my-mixin1', MyMixin1);
      Block.block('MyBlock', MyBlock);

      strictEqual(Block.getMixin('d-hide'), DHide);
      strictEqual(Block.getMixin('d-hide2'), undefined);
      strictEqual(Block.getMixin('my-mixin1'), MyMixin1);
      strictEqual(Block.getMixin('my-mixin2'), undefined);
      strictEqual(MyBlock.getMixin('d-hide'), DHide);
      strictEqual(MyBlock.getMixin('my-mixin1'), MyMixin1);
      strictEqual(MyBlock.getMixin('my-mixin2'), MyMixin2);
      strictEqual(MyBlock.getMixin('my-mixin3'), undefined);
      strictEqual(MyBlock.getMixin('d-hide'), DHide);
      strictEqual(MyBlock.getMixin('d-hide2'), undefined);
      strictEqual(MyBlock.getMixin('my-mixin1'), MyMixin1);
      strictEqual(MyBlock.getMixin('my-mixin2'), MyMixin2);
    });
  });
  describe('mixin()', () => {
    const oldConsoleWarn = console.warn;
    const oldConsoleError = console.error;
    let removeHook;

    before(() => {
      removeHook = Block.beforeRegisterMixin((Mixin) => {
        if (Mixin.forHooks) {
          const { afterUpdate } = Mixin.prototype;

          Mixin.prototype.afterUpdate = function (newValue, oldValue) {
            this::afterUpdate(+newValue, +oldValue);
          };
        }

        if (Mixin.noReturn) {
          return;
        }

        if (Mixin.forErrorHooks) {
          throw error;
        }

        return Mixin;
      });
    });
    after(() => {
      console.warn = oldConsoleWarn;
      console.error = oldConsoleError;
      removeHook();
    });

    it('should register mixin with afterUpdate function', () => {
      Block.mixin('mixin', (newValue, oldValue, mixin) => {
        mixin.elem.text(newValue);
      });

      const container = doc.create('div');

      initApp(html`<div mixin="text"/>`, container);

      strictEqual(container.html(), '<div>text</div>');
    });
    it('should not register mixin with any other value', (done) => {
      console.warn = (message) => {
        try {
          strictEqual(message, 'The "mixin" class does not extend Mixin or is not an afterUpdate function, so it will not be registered (Block.mixin)');

          done();
        } catch (err) {
          done(err);
        }
      };

      Block.mixin('mixin', {});
    });
    it('should not register mixin with a built-in name', (done) => {
      console.warn = (message) => {
        try {
          strictEqual(message, 'The "d-bind" mixin is a built-in mixin so the mixin will not be registered (Block.mixin)');

          done();
        } catch (err) {
          done(err);
        }
      };

      Block.mixin('d-bind', () => {});
    });
    it('should not register mixin with invalid name', (done) => {
      console.warn = (message) => {
        try {
          strictEqual(message, 'Name "=mixin" is not allowed for mixins so the mixin will not be registered (Block.mixin)');

          done();
        } catch (err) {
          done(err);
        }
      };

      Block.mixin('=mixin', () => {});
    });
    it('should test hooks', () => {
      class MyMixin extends Mixin {
        static forHooks = true;

        afterUpdate(newValue) {
          this.elem.text(1 + newValue);
        }
      }

      Block.mixin('mixin', MyMixin);

      const container = doc.create('div');

      initApp(html`<div mixin="1"/>`, container);

      strictEqual(container.html(), '<div>2</div>');
    });
    it('should test hooks which return undefined', () => {
      class MyMixin extends Mixin {
        static noReturn = true;

        afterUpdate(newValue) {
          this.elem.text(newValue);
        }
      }

      Block.mixin('mixin', MyMixin);

      const container = doc.create('div');

      initApp(html`<div mixin="1"/>`, container);

      strictEqual(container.html(), '<div>1</div>');
    });
    it('should test hooks with errors', (done) => {
      console.error = (message, e) => {
        try {
          strictEqual(message, 'Uncaught error in "beforeRegisterMixin" hook:');
          strictEqual(e, error);

          done();
        } catch (err) {
          done(err);
        }
      };

      class MyMixin extends Mixin {
        static forErrorHooks = true;

        afterUpdate(newValue) {
          this.elem.text(newValue);
        }
      }

      Block.mixin('mixin', MyMixin);

      const container = doc.create('div');

      initApp(html`<div mixin="1"/>`, container);

      strictEqual(container.html(), '<div>1</div>');
    });
  });
};
