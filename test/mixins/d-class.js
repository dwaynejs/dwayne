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

class DClassSimple extends Block {
  static template = html`
    <div d-class="{classes}"/>
  `;

  classes = 'a';

  afterRender() {
    app = this;
  }
}

class DClassConflict extends Block {
  static template = html`
    <div
      d-class#string="{stringClasses}"
      d-class#array="{arrayClasses}"
      d-class#object="{objectClasses}"
    />`;

  stringClasses = 'a b';
  arrayClasses = ['c', 'd', false];
  objectClasses = {
    e: true,
    f: true,
    g: false
  };

  afterRender() {
    app = this;
  }
}

class DClassArgs extends Block {
  static template = html`
    <div d-class(a,b)="{bool}"/>
  `;

  bool = true;

  afterRender() {
    app = this;
  }
}

Block.block('DClassSimple', DClassSimple);
Block.block('DClassConflict', DClassConflict);
Block.block('DClassArgs', DClassArgs);

export default () => {
  describe('d-class', () => {
    describe('simple test', () => {
      before(() => {
        initApp(htmlScopeless`<DClassSimple/>`, container);
      });

      it('should set classes from the mixin', () => {
        strictEqual(container.html(), '<div class="a"></div>');
      });
      it('should change classes on value change', () => {
        app.classes = 'b';

        strictEqual(container.html(), '<div class="b"></div>');
      });
      it('should ignore non-string values in array value', () => {
        app.classes = [
          /1/,
          false,
          'c',
          null,
          undefined,
          'd'
        ];

        strictEqual(container.html(), '<div class="c d"></div>');
      });
      it('should support string value', () => {
        app.classes = 'e f g';

        strictEqual(container.html(), '<div class="e f g"></div>');
      });
      it('should support object value', () => {
        app.classes = {
          f: true,
          h: false,
          i: true
        };

        strictEqual(container.html(), '<div class="f i"></div>');
      });

      after(remove);
    });
    describe('conflict test', () => {
      before(() => {
        initApp(htmlScopeless`<DClassConflict/>`, container);
      });

      it('should set classes from mixins', () => {
        strictEqual(container.html(), '<div class="a b c d e f"></div>');
      });
      it('should set classes right if they don\'t conflict', () => {
        app.stringClasses = 'a h i';

        strictEqual(container.html(), '<div class="a c d e f h i"></div>');
      });
      it('should set classes right again if they don\'t conflict', () => {
        app.arrayClasses = [
          'd',
          'j',
          true,
          'k'
        ];

        strictEqual(container.html(), '<div class="a d e f h i j k"></div>');
      });
      it('should set classes right again if they don\'t conflict', () => {
        app.objectClasses = {
          e: true,
          g: true,
          l: true
        };

        strictEqual(container.html(), '<div class="a d e h i j k g l"></div>');
      });

      after(remove);
    });
    describe('args test', () => {
      before(() => {
        initApp(htmlScopeless`<DClassArgs/>`, container);
      });

      it('should set classes from the args if the value is truthy', () => {
        strictEqual(container.html(), '<div class="a b"></div>');
      });
      it('should remove classes from the args if the value is falsy', () => {
        app.bool = false;

        strictEqual(container.html(), '<div class=""></div>');
      });

      after(remove);
    });
  });
};
