import { deepStrictEqual } from 'assert';
import { Block, Mixin, doc, initApp, removeApp, Rest } from '../../src';

let app;
let block;
const container = doc.create('div');
const remove = () => {
  removeApp(container);

  app = null;
  block = null;
};

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
  static evaluate = false;

  constructor(opts) {
    super(opts);

    this.elem.attr('rest-mixin-attr3', this.evaluate());
  }

  beforeRemove(isRemoved) {
    if (!isRemoved) {
      this.elem.removeAttr('rest-mixin-attr3');
    }
  }
}

class RestApp extends Block {
  static html = html`
    <div
      attr="{attr}"
      MyMixin="{mixinValue}"
      MyMixin3="3"
      Rest="{rest}"
    />
  `;

  attr = 1;
  mixinValue = 2;
  passedArgs = { ...this.args };
  rest = {};

  afterRender() {
    app = this;
  }
}

export default () => {
  describe('Rest', () => {
    before(() => {
      initApp(html`
        <RestApp
          attr="123"
          attr2="234"
          MyMixin="345"
          MyMixin2="456"
          MyMixin3="4"
        />
      `, container);
    });

    it('should pass attrs using Rest', () => {
      deepStrictEqual(container.find('div').attr(), {
        attr: '1',
        'rest-mixin-attr': '2',
        'rest-mixin-attr3': '3'
      });
    });
    it('should pass attrs and mixins using non-empty Rest', () => {
      app.rest = app.passedArgs;

      deepStrictEqual(container.find('div').attr(), {
        attr: '123',
        attr2: '234',
        'rest-mixin-attr': '345',
        'rest-mixin-attr2': '456',
        'rest-mixin-attr3': '3'
      });
    });
    it('should do nothing if shadowed values are changed', () => {
      app.attr = 3;
      app.mixinValue = 4;

      deepStrictEqual(container.find('div').attr(), {
        attr: '123',
        attr2: '234',
        'rest-mixin-attr': '345',
        'rest-mixin-attr2': '456',
        'rest-mixin-attr3': '3'
      });
    });
    it('should return previous attrs and mixins with renewed values and properly remove non-existent attrs and mixins', () => {
      app.rest = {};

      deepStrictEqual(container.find('div').attr(), {
        attr: '3',
        'rest-mixin-attr': '4',
        'rest-mixin-attr3': '3'
      });
    });

    after(remove);
  });
};
