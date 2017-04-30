import { deepStrictEqual } from 'assert';
import { Block, doc, initApp, removeApp } from '../../src';

let app;
let block;
const container = doc.create('div');
const remove = () => {
  removeApp(container);

  app = null;
  block = null;
};

class DStyleSimple extends Block {
  static template = html`
    <div d-style="{styles}"/>
  `;

  styles = {
    width: '1px'
  };

  afterRender() {
    app = this;
  }
}

class DStyleConflict extends Block {
  static template = html`
    <div
      d-style#a="{stylesA}"
      d-style#b="{stylesB}"
      d-rest="{rest}"
    />
  `;

  stylesA = {
    width: '1px'
  };
  stylesB = {
    height: '1px'
  };
  rest = {
    'd-style#rest': {
      position: 'absolute'
    }
  };

  afterRender() {
    app = this;
  }
}

class DStyleArgs extends Block {
  static template = html`
    <div d-style(width,height)="{value}"/>
  `;

  value = '1px';

  afterRender() {
    app = this;
  }
}

class DStyleString extends Block {
  static template = html`
    <div d-style="{styles}"/>
  `;

  styles = 'width: 1px;';

  afterRender() {
    app = this;
  }
}

Block.block('DStyleSimple', DStyleSimple);
Block.block('DStyleConflict', DStyleConflict);
Block.block('DStyleArgs', DStyleArgs);
Block.block('DStyleString', DStyleString);

export default () => {
  describe('d-style', () => {
    describe('simple test', () => {
      before(() => {
        initApp(htmlScopeless`<DStyleSimple/>`, container);
      });

      it('should set styles from the mixin', () => {
        deepStrictEqual(container.find('div').css(), {
          width: '1px'
        });
      });
      it('should change styles on value change', () => {
        app.styles = {
          height: '2px'
        };

        deepStrictEqual(container.find('div').css(), {
          height: '2px'
        });
      });
      it('should ignore (delete previous) null and undefined values', () => {
        app.styles = {
          width: null,
          height: undefined,
          zIndex: '1'
        };

        deepStrictEqual(container.find('div').css(), {
          zIndex: '1'
        });
      });

      after(remove);
    });
    describe('conflict test', () => {
      before(() => {
        initApp(htmlScopeless`<DStyleConflict/>`, container);
      });

      it('should set styles from variables', () => {
        deepStrictEqual(container.find('div').css(), {
          width: '1px',
          height: '1px',
          position: 'absolute'
        });
      });
      it('should set styles right if they don\'t conflict', () => {
        app.stylesA = {
          width: '2px',
          zIndex: '3'
        };

        deepStrictEqual(container.find('div').css(), {
          width: '2px',
          height: '1px',
          zIndex: '3',
          position: 'absolute'
        });
      });
      it('should set styles right again if they don\'t conflict', () => {
        app.stylesB = {
          height: '2px',
          lineHeight: '3px'
        };

        deepStrictEqual(container.find('div').css(), {
          width: '2px',
          height: '2px',
          zIndex: '3',
          lineHeight: '3px',
          position: 'absolute'
        });
      });
      it('should do the cleaning', () => {
        app.rest = {};

        deepStrictEqual(container.find('div').css(), {
          width: '2px',
          height: '2px',
          zIndex: '3',
          lineHeight: '3px'
        });
      });

      after(remove);
    });
    describe('args test', () => {
      before(() => {
        initApp(htmlScopeless`<DStyleArgs/>`, container);
      });

      it('should set styles from the args', () => {
        deepStrictEqual(container.find('div').css(), {
          width: '1px',
          height: '1px'
        });
      });
      it('should change styles after a change', () => {
        app.value = '2px';

        deepStrictEqual(container.find('div').css(), {
          width: '2px',
          height: '2px'
        });
      });

      after(remove);
    });
    describe('string test', () => {
      before(() => {
        initApp(htmlScopeless`<DStyleString/>`, container);
      });

      it('should set styles from the mixin', () => {
        deepStrictEqual(container.find('div').css(), {
          width: '1px'
        });
      });
      it('should change styles on value change', () => {
        app.styles = 'height: 2px;';

        deepStrictEqual(container.find('div').css(), {
          height: '2px'
        });
      });
      it('should ignore (delete previous) null and undefined values', () => {
        app.styles = {
          width: null,
          height: undefined,
          zIndex: '1'
        };
        app.styles = 'z-index: 1;';

        deepStrictEqual(container.find('div').css(), {
          zIndex: '1'
        });
      });

      after(remove);
    });
  });
};
