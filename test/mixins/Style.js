import { deepStrictEqual } from 'assert';
import {
  Block, doc, initApp, removeApp,
  Style, Style as Style1,
  Style as StyleRest, Rest
} from '../../src';

let app;
let block;
const container = doc.create('div');
const remove = () => {
  removeApp(container);

  app = null;
  block = null;
};

class StyleSimple extends Block {
  static html = html`
    <div Style="{styles}"/>
  `;

  styles = {
    width: '1px'
  };

  afterRender() {
    app = this;
  }
}

class StyleConflict extends Block {
  static html = html`
    <div
      Style="{stylesA}"
      Style1="{stylesB}"
      Rest="{rest}"
    />
  `;

  stylesA = {
    width: '1px'
  };
  stylesB = {
    height: '1px'
  };
  rest = { ...this.args };

  afterRender() {
    app = this;
  }
}

class StyleArgs extends Block {
  static html = html`
    <div Style(width,height)="{value}"/>
  `;

  value = '1px';

  afterRender() {
    app = this;
  }
}

class StyleString extends Block {
  static html = html`
    <div Style="{styles}"/>
  `;

  styles = 'width: 1px;';

  afterRender() {
    app = this;
  }
}

export default () => {
  describe('Style', () => {
    describe('simple test', () => {
      before(() => {
        initApp(StyleSimple, container);
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
        initApp(html`<StyleConflict StyleRest="{{ position: 'absolute' }}"/>`, container);
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
        initApp(StyleArgs, container);
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
        initApp(StyleString, container);
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
