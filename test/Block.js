import { deepStrictEqual, strictEqual } from 'assert';
import { Block, initApp } from '../lib/Block';
import { Elem, find } from '../lib/Elem';
import './blocks';
import AppTemplate from './blocks/App/index.pug';

let app;
let currentBlock;
let appRendered;
let appElem;

Elem.addInstanceProperties('exceptComments', function () {
  return this.filter((elem) => new Elem(elem).name !== '#comment');
});

class App extends Block {
  static template = AppTemplate();

  test = null;
  argForChangingArgsVariablesTest = null;
  argForChangingMultipleVariablesTest = ', ';
  forDBlockTest = 'for d-block simple test';

  constructor(opts) {
    super(opts);

    app = this;

    this.global.forChangingGlobalsTest = null;
    this.global.forChangingMultipleVariablesTest = 'Hello';
  }

  afterRender() {
    appElem = this.elem;

    appRendered();
  }
}

class PrimitiveTest extends Block {
  static template = `
    <div id="primitive-test">
      <span>Hello, world!</span>
    </div>
  `;
}

class VariablesTest extends Block {
  static template = '<div id="variables-test">{caption}</div>';

  caption = 'Hello, world!';
}

class ChangingVariablesTest extends Block {
  static template = '<div id="changing-variables-test">{caption}</div>';

  caption = null;

  constructor(opts) {
    super(opts);

    currentBlock = this;
  }
}

class ChangingArgsVariablesTest extends Block {
  static template = '<div id="changing-args-variables-test">{args.caption}</div>';
}

class ChangingGlobalsTest extends Block {
  static template = '<div id="changing-globals-test">{global.forChangingGlobalsTest}</div>';
}

class ChangingMultipleVariablesTest extends Block {
  static template = `
    <div id="changing-multiple-variables-test">
      {global.forChangingMultipleVariablesTest + args.caption + caption}
    </div>
  `;

  caption = 'world!';

  constructor(opts) {
    super(opts);

    currentBlock = this;
  }
}

class DBlockSimpleTest extends Block {
  static template = `
    <div id="d-block-simple-test">
      <d-block/>
    </div>
  `;

  caption = 'world!';

  constructor(opts) {
    super(opts);

    currentBlock = this;
  }
}

Block.register('App', App);
Block.register('PrimitiveTest', PrimitiveTest);
Block.register('VariablesTest', VariablesTest);
Block.register('ChangingVariablesTest', ChangingVariablesTest);
Block.register('ChangingArgsVariablesTest', ChangingArgsVariablesTest);
Block.register('ChangingGlobalsTest', ChangingGlobalsTest);
Block.register('ChangingMultipleVariablesTest', ChangingMultipleVariablesTest);
Block.register('DBlockSimpleTest', DBlockSimpleTest);

before((done) => {
  let isDone = 0;

  appRendered = () => {
    doneAll();
  };

  initApp('App', find('.root'));

  setTimeout(doneAll, 0);

  function doneAll() {
    if (++isDone === 2) {
      done();
    }
  }
});

describe('it should test Block', () => {
  describe('primitive test', () => {
    before((done) => {
      app.test = 'primitive';

      setTimeout(done, 0);
    });

    it('should render simple caption', () => {
      const children = appElem.children().exceptComments();

      strictEqual(children.length, 1);
      strictEqual(children.elem(0).id(), 'primitive-test');
      strictEqual(children.elem(0).html(), '<span>Hello, world!</span>');
    });
  });
  describe('variables test', () => {
    before((done) => {
      app.test = 'variables';

      setTimeout(done, 0);
    });

    it('should render caption using local variable from the block', () => {
      const children = appElem.children().exceptComments();

      strictEqual(children.length, 1);
      strictEqual(children.elem(0).id(), 'variables-test');
      strictEqual(children.elem(0).text(), 'Hello, world!');
    });
  });
  describe('changing variables test', () => {
    before((done) => {
      app.test = 'changing-variables';

      setTimeout(done, 0);
    });

    it('should render caption using local variable from the block', () => {
      const children = appElem.children().exceptComments();

      strictEqual(children.length, 1);
      strictEqual(children.elem(0).id(), 'changing-variables-test');
      strictEqual(children.elem(0).text(), '');
    });
    it('should re-render caption after it\'s been changed', (done) => {
      const caption = currentBlock.caption = 'Hello, world!';

      setTimeout(() => {
        const children = appElem.children().exceptComments();

        try {
          strictEqual(children.elem(0).text(), caption);

          done();
        } catch (err) {
          done(err);
        }
      }, 0);
    });
    it('should re-render caption again after it\'s been changed', (done) => {
      const caption = currentBlock.caption = 'Hello, world, again!';

      setTimeout(() => {
        const children = appElem.children().exceptComments();

        try {
          strictEqual(children.elem(0).text(), caption);

          done();
        } catch (err) {
          done(err);
        }
      }, 0);
    });
  });
  describe('changing args variables test', () => {
    before((done) => {
      app.test = 'changing-args-variables';

      setTimeout(done, 0);
    });

    it('should render caption using args variable from the block', () => {
      const children = appElem.children().exceptComments();

      strictEqual(children.length, 1);
      strictEqual(children.elem(0).id(), 'changing-args-variables-test');
      strictEqual(children.elem(0).text(), '');
    });
    it('should re-render caption after the arg has been changed', (done) => {
      const caption = app.argForChangingArgsVariablesTest = 'Hello, world!';

      setTimeout(() => {
        const children = appElem.children().exceptComments();

        try {
          strictEqual(children.elem(0).text(), caption);

          done();
        } catch (err) {
          done(err);
        }
      }, 0);
    });
    it('should re-render caption again after the arg been changed', (done) => {
      const caption = app.argForChangingArgsVariablesTest = 'Hello, world, again!';

      setTimeout(() => {
        const children = appElem.children().exceptComments();

        try {
          strictEqual(children.elem(0).text(), caption);

          done();
        } catch (err) {
          done(err);
        }
      }, 0);
    });
  });
  describe('changing globals test', () => {
    before((done) => {
      app.test = 'changing-globals';

      setTimeout(done, 0);
    });

    it('should render caption using global variable', () => {
      const children = appElem.children().exceptComments();

      strictEqual(children.length, 1);
      strictEqual(children.elem(0).id(), 'changing-globals-test');
      strictEqual(children.elem(0).text(), '');
    });
    it('should re-render caption after the global has been changed', (done) => {
      const caption = app.global.forChangingGlobalsTest = 'Hello, world!';

      setTimeout(() => {
        const children = appElem.children().exceptComments();

        try {
          strictEqual(children.elem(0).text(), caption);

          done();
        } catch (err) {
          done(err);
        }
      }, 0);
    });
    it('should re-render caption again after the global been changed', (done) => {
      const caption = app.global.forChangingGlobalsTest = 'Hello, world, again!';

      setTimeout(() => {
        const children = appElem.children().exceptComments();

        try {
          strictEqual(children.elem(0).text(), caption);

          done();
        } catch (err) {
          done(err);
        }
      }, 0);
    });
  });
  describe('changing multiple variables test', () => {
    before((done) => {
      app.test = 'changing-multiple-variables';

      setTimeout(done, 0);
    });

    it('should render caption using variables', () => {
      const children = appElem.children().exceptComments();

      strictEqual(children.length, 1);
      strictEqual(children.elem(0).id(), 'changing-multiple-variables-test');
      strictEqual(children.elem(0).text(), 'Hello, world!');
    });
    it('should re-render caption after one variable has been changed', (done) => {
      app.global.forChangingMultipleVariablesTest = 'Goodbye';

      setTimeout(() => {
        const children = appElem.children().exceptComments();

        try {
          strictEqual(children.elem(0).text(), 'Goodbye, world!');

          done();
        } catch (err) {
          done(err);
        }
      }, 0);
    });
    it('should re-render caption after all variables has been changed', (done) => {
      app.global.forChangingMultipleVariablesTest = 'To be';
      app.argForChangingMultipleVariablesTest = ' or ';
      currentBlock.caption = 'not to be?';

      setTimeout(() => {
        const children = appElem.children().exceptComments();

        try {
          strictEqual(children.elem(0).text(), 'To be or not to be?');

          done();
        } catch (err) {
          done(err);
        }
      }, 0);
    });
  });
  describe('d-block test', () => {
    before((done) => {
      app.test = 'd-block-simple';

      setTimeout(done, 0);
    });

    it('should render caption using variables from the current scope', () => {
      const children = appElem.children().exceptComments();

      strictEqual(children.length, 1);
      strictEqual(children.elem(0).id(), 'd-block-simple-test');
      strictEqual(children.elem(0).text(), 'for d-block simple test');
    });
    it('should re-render caption after the variable has been changed', (done) => {
      const caption = app.forDBlockTest = 'for d-block simple test as well';

      setTimeout(() => {
        const children = appElem.children().exceptComments();

        try {
          strictEqual(children.elem(0).text(), caption);

          done();
        } catch (err) {
          done(err);
        }
      }, 0);
    });
  });
});
