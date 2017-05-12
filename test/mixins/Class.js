import { strictEqual } from 'assert';
import {
  Block, doc, initApp, removeApp,
  Class, Class as Class1, Class as Class2,
  Class as ClassRest, Rest
} from '../../src';

let app;
let block;
const container = doc.create('div');
const remove = () => {
  removeApp(container);

  app = null;
  block = null;
};

class ClassSimple extends Block {
  static html = html`
    <div Class="{classes}"/>
  `;

  classes = 'a';

  afterRender() {
    app = this;
  }
}

class ClassConflict extends Block {
  static html = html`
    <div
      Class="{stringClasses}"
      Class1="{arrayClasses}"
      Class2="{objectClasses}"
      Rest="{rest}"
    />
  `;

  stringClasses = 'a b';
  arrayClasses = ['c', 'd', false];
  objectClasses = {
    e: true,
    f: true,
    g: false
  };
  rest = { ...this.args };

  afterRender() {
    app = this;
  }
}

class ClassArgs extends Block {
  static html = html`
    <div Class(a,b)="{bool}" Class()="{bool}" class="c"/>
  `;

  bool = true;

  afterRender() {
    app = this;
  }
}

export default () => {
  describe('Class', () => {
    describe('simple test', () => {
      before(() => {
        initApp(ClassSimple, container);
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
        initApp(htmlScopeless`<ClassConflict ClassRest="rest"/>`, container);
      });

      it('should set classes from mixins', () => {
        strictEqual(container.html(), '<div class="a b c d e f rest"></div>');
      });
      it('should set classes right if they don\'t conflict', () => {
        app.stringClasses = 'a h i';

        strictEqual(container.html(), '<div class="a c d e f rest h i"></div>');
      });
      it('should set classes right again if they don\'t conflict', () => {
        app.arrayClasses = [
          'd',
          'j',
          true,
          'k'
        ];

        strictEqual(container.html(), '<div class="a d e f rest h i j k"></div>');
      });
      it('should set classes right again if they don\'t conflict', () => {
        app.objectClasses = {
          e: true,
          g: true,
          l: true
        };

        strictEqual(container.html(), '<div class="a d e rest h i j k g l"></div>');
      });
      it('should do the cleaning', () => {
        app.rest = {};

        strictEqual(container.html(), '<div class="a d e h i j k g l"></div>');
      });

      after(remove);
    });
    describe('args test', () => {
      before(() => {
        initApp(ClassArgs, container);
      });

      it('should set classes from the args if the value is truthy', () => {
        strictEqual(container.html(), '<div class="c a b"></div>');
      });
      it('should remove classes from the args if the value is falsy', () => {
        app.bool = false;

        strictEqual(container.html(), '<div class="c"></div>');
      });

      after(remove);
    });
  });
};
