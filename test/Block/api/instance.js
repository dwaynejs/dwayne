import { strictEqual } from 'assert';
import { Block, initApp, removeApp, doc } from '../../../src';

let app;
let block;
const error = new Error();
const container = doc.create('div');
const remove = () => {
  removeApp(container);

  app = null;
  block = null;
};

class DOMChange extends Block {
  static template = html`
    <d-if if="{value}">
      <span>123</span>
    </d-if>
  `;

  afterRender() {
    app = this;
  }
}

class BeforeRemove extends Block {}

class GetDOMApp extends Block {
  static template = html`
    <div>123</div>
    <span>456</span>
  `;

  afterRender() {
    app = this;
  }
}

class GetParentElemApp extends Block {
  afterRender() {
    app = this;
  }
}

class GetTopBlockApp extends Block {
  static template = html`
    <GetTopBlock/>
  `;

  afterRender() {
    app = this;
  }
}

class GetTopBlock extends Block {
  afterRender() {
    block = this;
  }
}

class NameApp extends Block {
  afterRender() {
    app = this;
  }
}

Block.block('GetTopBlock', GetTopBlock);
Block.block('NameApp', NameApp);

export default () => {
  const oldConsoleError = console.error;

  after(() => {
    console.error = oldConsoleError;
  });

  describe('afterDOMChange()', () => {
    before(() => {
      initApp(DOMChange, container);
    });

    it('should call afterDOMChange after DOM change', (done) => {
      DOMChange.prototype.afterDOMChange = () => {
        done();
      };

      app.value = 1;
    });
    it('should log errors in afterDOMChange function', (done) => {
      DOMChange.prototype.afterDOMChange = () => {
        throw error;
      };
      console.error = (message, e) => {
        try {
          strictEqual(message, 'Uncaught error in #RootBlock#afterDOMChange:');
          strictEqual(e, error);

          done();
        } catch (err) {
          done(err);
        }
      };

      app.value = null;
    });

    after(remove);
  });
  describe('beforeRemove()', () => {
    it('should call beforeRemove before removing', (done) => {
      const container = doc.create('div');

      BeforeRemove.prototype.beforeRemove = () => {
        done();
      };

      initApp(BeforeRemove, container);
      removeApp(container);
    });
    it('should log errors in beforeRemove function', (done) => {
      const container = doc.create('div');

      BeforeRemove.prototype.beforeRemove = () => {
        throw error;
      };
      console.error = (message, e) => {
        try {
          strictEqual(message, 'Uncaught error in #RootBlock#beforeRemove:');
          strictEqual(e, error);

          done();
        } catch (err) {
          done(err);
        }
      };

      initApp(BeforeRemove, container);
      removeApp(container);
    });
  });
  describe('getDOM()', () => {
    before(() => {
      initApp(GetDOMApp, container);
    });

    it('should return block DOM content', () => {
      const children = container.children();
      const DOM = app.getDOM();

      strictEqual(DOM.length, 2);
      strictEqual(children[0], DOM[0]);
      strictEqual(children[1], DOM[1]);
    });

    after(remove);
  });
  describe('getName()', () => {
    before(() => {
      initApp(html`<NameApp/>`, container);
    });

    it('should return block name', () => {
      strictEqual(app.getName(), 'NameApp');
    });

    after(remove);
  });
  describe('getParentElem()', () => {
    before(() => {
      initApp(GetParentElemApp, container);
    });

    it('should return block parent elem', () => {
      const parentElem = app.getParentElem();

      strictEqual(parentElem.length, 1);
      strictEqual(parentElem[0], container[0]);
    });

    after(remove);
  });
  describe('getTopBlock()', () => {
    before(() => {
      initApp(GetTopBlockApp, container);
    });

    it('should return block top block', () => {
      const topBlock = block.getTopBlock();

      strictEqual(topBlock, app);
    });

    after(remove);
  });
  describe('toString()', () => {
    before(() => {
      initApp(NameApp, container);
    });

    it('should return block top block', () => {
      strictEqual(app.toString(), '[object Block]');
    });

    after(remove);
  });
};
