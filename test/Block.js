import { deepStrictEqual, strictEqual } from 'assert';
import { Block, initApp } from '../lib/Block';
import { Arr } from '../lib/Arr';
import { Elem, find } from '../lib/Elem';
import AppTemplate from './blocks/App/index.pug';

let app;
let currentBlock;
let appRendered;
let appElem;

Elem.prototype.exceptComments = function () {
  return this.filter((elem) => new Elem(elem).name !== '#comment');
};

class App extends Block {
  static template = AppTemplate();

  test = null;
  argForChangingArgsVariablesTest = null;
  argForChangingMultipleVariablesTest = ', ';
  forDBlockTest = 'for d-block simple test';
  forDBlockNamedA = 'for d-block-named a';
  forDBlockNamedB = 'for d-block-named b';
  forDBlockNestedA = 'for d-block-nested a';
  forDBlockNestedB = 'for d-block-nested b';

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
}

class DBlockNamedTest extends Block {
  static template = `
    <div id="d-block-named-test">
      <div id="d-block-a-1">
        <d-block-a/>
      </div>
      <div id="d-block-b">
        <d-block-b/>
      </div> 
      <div id="d-block-a-2">
        <d-block-a/>
      </div>
    </div>
  `;
}

class DBlockNestedTest extends Block {
  static template = `
    <div id="d-block-nested-test">
      <DBlockNestedTestHelper>
        <d-block-a>
          <d-block-b/>
        </d-block-a>
        <d-block-b>
          <d-block-a/>
        </d-block-b>
      </DBlockNestedTestHelper>
    </div>
  `;
}

class DBlockNestedTestHelper extends Block {
  static template = `
    <div id="d-block-a">
      <d-block-a/>
    </div>
    <div id="d-block-b">
      <d-block-b/>
    </div>
  `;
}

class DEachSimpleTest extends Block {
  static template = `
    <div id="d-each-simple-test">
      <d-each set="{[2, 1, 0]}">
        <span id="{'item-' + $index}">
          {'' + $index + $item}
        </span>
      </d-each>
    </div>
  `;
}

class DEachScopeTest extends Block {
  static template = `
    <div id="d-each-scope-test">
      <d-each set="{numbers}">
        <span id="{'item-' + $index}">
          {$item.number + is + $item.caption}
        </span>
      </d-each>
    </div>
  `;

  is = ' is ';
  numbers = [
    {
      number: 2,
      caption: 'two'
    },
    {
      number: 1,
      caption: 'one'
    },
    {
      number: 0,
      caption: 'zero'
    }
  ];

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
Block.register('DBlockNamedTest', DBlockNamedTest);
Block.register('DBlockNestedTest', DBlockNestedTest);
Block.register('DBlockNestedTestHelper', DBlockNestedTestHelper);
Block.register('DEachSimpleTest', DEachSimpleTest);
Block.register('DEachScopeTest', DEachScopeTest);

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
    it('should re-render caption after all variables have been changed', (done) => {
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
  describe('d-block', () => {
    describe('d-block simple test', () => {
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
    describe('d-block named test', () => {
      before((done) => {
        app.test = 'd-block-named';

        setTimeout(done, 0);
      });

      it('should render caption using variables from the current scope', () => {
        const children = appElem.children().exceptComments();

        /* eslint newline-per-chained-call: 0 */
        strictEqual(children.length, 1);
        strictEqual(children.elem(0).id(), 'd-block-named-test');
        strictEqual(children.elem(0).children().length, 3);
        strictEqual(children.elem(0).child(0).id(), 'd-block-a-1');
        strictEqual(children.elem(0).child(0).text(), 'for d-block-named a');
        strictEqual(children.elem(0).child(1).id(), 'd-block-b');
        strictEqual(children.elem(0).child(1).text(), 'for d-block-named b');
        strictEqual(children.elem(0).child(2).id(), 'd-block-a-2');
        strictEqual(children.elem(0).child(2).text(), 'for d-block-named a');
      });
      it('should re-render caption after the variables have been changed', (done) => {
        const caption1 = app.forDBlockNamedA = 'for d-block-named a as well';
        const caption2 = app.forDBlockNamedB = 'for d-block-named b as well';

        setTimeout(() => {
          const children = appElem.children().exceptComments();

          try {
            strictEqual(children.elem(0).child(0).id(), 'd-block-a-1');
            strictEqual(children.elem(0).child(0).text(), caption1);
            strictEqual(children.elem(0).child(1).id(), 'd-block-b');
            strictEqual(children.elem(0).child(1).text(), caption2);
            strictEqual(children.elem(0).child(2).id(), 'd-block-a-2');
            strictEqual(children.elem(0).child(2).text(), caption1);

            done();
          } catch (err) {
            done(err);
          }
        }, 0);
      });
    });
    describe('d-block nested test', () => {
      before((done) => {
        app.test = 'd-block-nested';

        setTimeout(done, 0);
      });

      it('should render caption using variables from the current scope', () => {
        const children = appElem.children().exceptComments();
        const nestedChildren = children.elem(0).children().exceptComments();

        /* eslint newline-per-chained-call: 0 */
        strictEqual(children.length, 1);
        strictEqual(children.elem(0).id(), 'd-block-nested-test');
        strictEqual(nestedChildren.length, 2);
        strictEqual(nestedChildren.elem(0).id(), 'd-block-a');
        strictEqual(nestedChildren.elem(0).text(), 'for d-block-nested b');
        strictEqual(nestedChildren.elem(1).id(), 'd-block-b');
        strictEqual(nestedChildren.elem(1).text(), 'for d-block-nested a');
      });
      it('should re-render caption after the variables have been changed', (done) => {
        const caption1 = app.forDBlockNestedA = 'for d-block-nested a as well';
        const caption2 = app.forDBlockNestedB = 'for d-block-nested b as well';

        setTimeout(() => {
          const children = appElem.children().exceptComments();
          const nestedChildren = children.elem(0).children().exceptComments();

          try {
            strictEqual(nestedChildren.elem(0).id(), 'd-block-a');
            strictEqual(nestedChildren.elem(0).text(), caption2);
            strictEqual(nestedChildren.elem(1).id(), 'd-block-b');
            strictEqual(nestedChildren.elem(1).text(), caption1);

            done();
          } catch (err) {
            done(err);
          }
        }, 0);
      });
    });
  });
  describe('d-each', () => {
    describe('d-each simple test', () => {
      before((done) => {
        app.test = 'd-each-simple';

        setTimeout(done, 0);
      });

      it('should render caption using variables from the d-each scope', () => {
        const children = appElem.children().exceptComments();
        const nestedChildren = children.elem(0).children().exceptComments();

        strictEqual(children.length, 1);
        strictEqual(children.elem(0).id(), 'd-each-simple-test');
        strictEqual(nestedChildren.length, 3);
        strictEqual(nestedChildren.elem(0).id(), 'item-0');
        strictEqual(nestedChildren.elem(0).text(), '02');
        strictEqual(nestedChildren.elem(1).id(), 'item-1');
        strictEqual(nestedChildren.elem(1).text(), '11');
        strictEqual(nestedChildren.elem(2).id(), 'item-2');
        strictEqual(nestedChildren.elem(2).text(), '20');
      });
    });
    describe('d-each scope test', () => {
      before((done) => {
        app.test = 'd-each-scope';

        setTimeout(done, 0);
      });

      it('should render caption using variables from the d-each scope and the parent scope', () => {
        const children = appElem.children().exceptComments();
        const nestedChildren = children.elem(0).children().exceptComments();

        strictEqual(children.length, 1);
        strictEqual(children.elem(0).id(), 'd-each-scope-test');
        strictEqual(nestedChildren.length, 3);
        strictEqual(nestedChildren.elem(0).id(), 'item-0');
        strictEqual(nestedChildren.elem(0).text(), '2 is two');
        strictEqual(nestedChildren.elem(1).id(), 'item-1');
        strictEqual(nestedChildren.elem(1).text(), '1 is one');
        strictEqual(nestedChildren.elem(2).id(), 'item-2');
        strictEqual(nestedChildren.elem(2).text(), '0 is zero');
      });
      it('should re-render caption using variables from the parent scope', (done) => {
        currentBlock.is = ': ';

        setTimeout(() => {
          const children = appElem.children().exceptComments();
          const nestedChildren = children.elem(0).children().exceptComments();

          try {
            strictEqual(nestedChildren.elem(0).id(), 'item-0');
            strictEqual(nestedChildren.elem(0).text(), '2: two');
            strictEqual(nestedChildren.elem(1).id(), 'item-1');
            strictEqual(nestedChildren.elem(1).text(), '1: one');
            strictEqual(nestedChildren.elem(2).id(), 'item-2');
            strictEqual(nestedChildren.elem(2).text(), '0: zero');

            done();
          } catch (err) {
            done(err);
          }
        }, 0);
      });
      it('should re-render caption using variables from both scopes', (done) => {
        currentBlock.is = ' is not ';
        currentBlock.numbers = new Arr(currentBlock.numbers)
          .map((item) => ({
            ...item,
            number: item.number + 1
          }))
          .$;

        setTimeout(() => {
          const children = appElem.children().exceptComments();
          const nestedChildren = children.elem(0).children().exceptComments();

          try {
            strictEqual(nestedChildren.elem(0).id(), 'item-0');
            strictEqual(nestedChildren.elem(0).text(), '3 is not two');
            strictEqual(nestedChildren.elem(1).id(), 'item-1');
            strictEqual(nestedChildren.elem(1).text(), '2 is not one');
            strictEqual(nestedChildren.elem(2).id(), 'item-2');
            strictEqual(nestedChildren.elem(2).text(), '1 is not zero');

            done();
          } catch (err) {
            done(err);
          }
        }, 0);
      });
    });
  });
});
