import { deepStrictEqual } from 'assert';
import { Block, Mixin, doc, initApp, removeApp } from '../../src';

let app;
let block;
const container = doc.create('div');
const remove = () => {
  removeApp(container);

  app = null;
  block = null;
};

class DRest extends Block {
  static template = html`
    <div
      attr="{attr}"
      rest-mixin="{mixinValue}"
      rest-mixin3="{mixinValue3}"
      d-on(click)="{onClick()}"
      d-rest="{rest}"
    />
  `;

  attr = 1;
  mixinValue = 2;
  mixinValue3 = 4;
  rest = {
    'rest-mixin3': 3,
    'd-on(click)': js`onClick()`
  };

  afterRender() {
    app = this;
  }
}

class MyMixin extends Mixin {
  afterUpdate(newValue) {
    this.elem.attr('rest-mixin-attr', newValue);
  }

  beforeRemove(isRemoved) {
    if (!isRemoved) {
      this.elem.removeAttr('rest-mixin-attr');
    }
  }
}

class MyMixin2 extends Mixin {
  afterUpdate(newValue) {
    this.elem.attr('rest-mixin-attr2', newValue);
  }

  beforeRemove(isRemoved) {
    if (!isRemoved) {
      this.elem.removeAttr('rest-mixin-attr2');
    }
  }
}

class MyMixin3 extends Mixin {
  afterUpdate(newValue) {
    this.elem.attr('rest-mixin-attr3', newValue);
  }

  beforeRemove(isRemoved) {
    if (!isRemoved) {
      this.elem.removeAttr('rest-mixin-attr3');
    }
  }
}

class MyMixin4 extends Mixin {
  afterUpdate(newValue) {
    this.elem.attr('rest-mixin-attr4', newValue);
  }

  beforeRemove(isRemoved) {
    if (!isRemoved) {
      this.elem.removeAttr('rest-mixin-attr4');
    }
  }
}

Block.mixin('rest-mixin', MyMixin);
Block.mixin('rest-mixin2', MyMixin2);
Block.mixin('rest-mixin3', MyMixin3);

export default () => {
  describe('d-rest', () => {
    before(() => {
      initApp(DRest, container);
    });

    it('should pass attrs using d-rest', () => {
      deepStrictEqual(container.find('div').attr(), {
        attr: '1',
        'rest-mixin-attr': '2',
        'rest-mixin-attr3': '3'
      });
    });
    it('should pass attrs using non-empty d-rest', () => {
      app.rest = {
        b: 2
      };

      deepStrictEqual(container.find('div').attr(), {
        attr: '1',
        'rest-mixin-attr': '2',
        'rest-mixin-attr3': '4',
        b: '2'
      });
    });
    it('should support nested d-rest', () => {
      app.rest = {
        'd-rest': {
          c: 3
        }
      };

      deepStrictEqual(container.find('div').attr(), {
        attr: '1',
        'rest-mixin-attr': '2',
        'rest-mixin-attr3': '4',
        c: '3'
      });
    });
    it('should add dynamic mixins', () => {
      app.rest = {
        'rest-mixin2': '3'
      };

      deepStrictEqual(container.find('div').attr(), {
        attr: '1',
        'rest-mixin-attr': '2',
        'rest-mixin-attr3': '4',
        'rest-mixin-attr2': '3'
      });
    });
    it('should shadow static mixins by dynamic ones', () => {
      app.rest = {
        'rest-mixin': '4'
      };
      app.mixinValue = 5;

      deepStrictEqual(container.find('div').attr(), {
        attr: '1',
        'rest-mixin-attr': '4',
        'rest-mixin-attr3': '4'
      });
    });
    it('should support dynamic added mixins', () => {
      Block.mixin('attr', MyMixin4);

      app.rest = {
        attr: '6'
      };

      deepStrictEqual(container.find('div').attr(), {
        'rest-mixin-attr4': '6',
        'rest-mixin-attr': '5',
        'rest-mixin-attr3': '4'
      });
    });
    it('should support dynamic removed mixins', () => {
      delete Block._mixins.attr;

      app.rest = {
        attr: 7
      };

      deepStrictEqual(container.find('div').attr(), {
        attr: '7',
        'rest-mixin-attr': '5',
        'rest-mixin-attr3': '4'
      });
    });

    after(remove);
  });
};
