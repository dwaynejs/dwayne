import { strictEqual } from 'assert';
import { Block, initApp, removeApp, doc, If } from '../../src';

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
  static html = html`
    <If if="{value}">
      <span>123</span>
    </If>
  `;

  afterRender() {
    app = this;
  }
}

class AfterConstruct extends Block {}

class AfterRender extends Block {}

class BeforeRemove extends Block {}

class GetDOMApp extends Block {
  static html = html`
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

class GetParentTemplate extends Block {
  afterRender() {
    block = this;
  }
}

class GetParentTemplateApp extends Block {
  static html = html`
    <GetParentTemplate/>
  `;

  afterRender() {
    app = this;
  }
}

class NameApp extends Block {
  afterRender() {
    app = this;
  }
}

export default () => {
  const oldConsoleError = console.error;

  afterEach(() => {
    console.error = oldConsoleError;
  });

  describe('afterConstruct()', () => {
    it('should call afterConstruct after constructing', (done) => {
      const container = doc.create('div');

      AfterConstruct.prototype.afterConstruct = () => {
        done();
      };

      initApp(AfterConstruct, container);
    });
    it('should log errors in afterConstruct function', (done) => {
      const container = doc.create('div');

      AfterConstruct.prototype.afterConstruct = () => {
        throw error;
      };
      console.error = (message, e) => {
        try {
          strictEqual(message, 'Uncaught error in AfterConstruct#afterConstruct:');
          strictEqual(e, error);

          done();
        } catch (err) {
          done(err);
        }
      };

      initApp(AfterConstruct, container);
      removeApp(container);
    });
  });
  describe('afterRender()', () => {
    it('should call afterRender after rendering', (done) => {
      const container = doc.create('div');

      AfterRender.prototype.afterRender = () => {
        done();
      };

      initApp(AfterRender, container);
    });
    it('should log errors in afterRender function', (done) => {
      const container = doc.create('div');

      AfterRender.prototype.afterRender = () => {
        throw error;
      };
      console.error = (message, e) => {
        try {
          strictEqual(message, 'Uncaught error in AfterRender#afterRender:');
          strictEqual(e, error);

          done();
        } catch (err) {
          done(err);
        }
      };

      initApp(AfterRender, container);
      removeApp(container);
    });
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
          strictEqual(message, 'Uncaught error in DOMChange#afterDOMChange:');
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
          strictEqual(message, 'Uncaught error in BeforeRemove#beforeRemove:');
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
  describe('getConstructor()', () => {
    before(() => {
      initApp(NameApp, container);
    });

    it('should return block name', () => {
      strictEqual(app.getConstructor(), NameApp);
    });

    after(remove);
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
      initApp(NameApp, container);
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
  describe('getParentScope()', () => {
    before(() => {
      initApp(GetParentTemplateApp, container);
    });

    it('should return block top block', () => {
      const parentScope = block.getParentScope();

      strictEqual(parentScope, app);
    });

    after(remove);
  });
  describe('getParentTemplate()', () => {
    before(() => {
      initApp(GetParentTemplateApp, container);
    });

    it('should return block top block', () => {
      const parentTemplate = block.getParentTemplate();

      strictEqual(parentTemplate, app);
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
