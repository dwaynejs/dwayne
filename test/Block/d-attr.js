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

class DAttrSimple extends Block {
  static template = html`
    <div d-attr="{attrs}"/>
  `;

  attrs = {
    a: '1'
  };

  afterRender() {
    app = this;
  }
}

class DAttrConflict extends Block {
  static template = html`
    <div
      d-attr#a="{attrsA}"
      d-attr#b="{attrsB}"
    />
  `;

  attrsA = {
    a: '1'
  };
  attrsB = {
    b: '1'
  };

  afterRender() {
    app = this;
  }
}

class DAttrArgs extends Block {
  static template = html`
    <div d-attr(a,b)="{value}"/>
  `;

  value = '1';

  afterRender() {
    app = this;
  }
}

Block.block('DAttrSimple', DAttrSimple);
Block.block('DAttrConflict', DAttrConflict);
Block.block('DAttrArgs', DAttrArgs);

export default () => {
  describe('d-attr', () => {
    describe('simple test', () => {
      before(() => {
        initApp(htmlScopeless`<DAttrSimple/>`, container);
      });

      it('should set attributes from the mixin', () => {
        deepStrictEqual(container.find('div').attr(), {
          a: '1'
        });
      });
      it('should change attributes on value change', () => {
        app.attrs = {
          b: '2'
        };

        deepStrictEqual(container.find('div').attr(), {
          b: '2'
        });
      });
      it('should ignore (delete previous) null and undefined values', () => {
        app.attrs = {
          b: null,
          a: undefined,
          c: '3'
        };

        deepStrictEqual(container.find('div').attr(), {
          c: '3'
        });
      });

      after(remove);
    });
    describe('conflict test', () => {
      before(() => {
        initApp(htmlScopeless`<DAttrConflict/>`, container);
      });

      it('should set attributes from variables', () => {
        deepStrictEqual(container.find('div').attr(), {
          a: '1',
          b: '1'
        });
      });
      it('should set attributes right if they don\'t conflict', () => {
        app.attrsA = {
          a: '2',
          c: '3'
        };

        deepStrictEqual(container.find('div').attr(), {
          a: '2',
          b: '1',
          c: '3'
        });
      });
      it('should set attributes right again if they don\'t conflict', () => {
        app.attrsB = {
          b: '2',
          d: '3'
        };

        deepStrictEqual(container.find('div').attr(), {
          a: '2',
          b: '2',
          c: '3',
          d: '3'
        });
      });

      after(remove);
    });
    describe('args test', () => {
      before(() => {
        initApp(htmlScopeless`<DAttrArgs/>`, container);
      });

      it('should set attributes from the args', () => {
        deepStrictEqual(container.find('div').attr(), {
          a: '1',
          b: '1'
        });
      });
      it('should change attributes after a change', () => {
        app.value = '2';

        deepStrictEqual(container.find('div').attr(), {
          a: '2',
          b: '2'
        });
      });

      after(remove);
    });
  });
};
