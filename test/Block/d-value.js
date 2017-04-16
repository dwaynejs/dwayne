import { strictEqual, deepStrictEqual } from 'assert';
import { Block, doc, initApp, removeApp, Elem } from '../../src';

let app;
let block;
const container = doc.create('div');
const remove = () => {
  removeApp(container);

  app = null;
  block = null;
};

Elem.addMethods({
  getValues() {
    return new Elem(this.prop('selectedOptions')).map(({ value }) => value);
  }
});

class DValueSimple extends Block {
  static template = html`
    <input d-value="input"/>
    <input d-value="input"/>
    <input d-value="input2" value="456"/>
  `;

  input = '123';
  input2 = null;

  afterRender() {
    app = this;
  }
}

class DValueContentEditable extends Block {
  static template = html`
    <div contentEditable d-value="input"/>
    <div contentEditable d-value="input"/>
    <div contentEditable d-value="input2">456</div>
  `;

  input = '123';
  input2 = null;

  afterRender() {
    app = this;
  }
}

class DValueColor extends Block {
  static template = html`
    <input type="color" d-value="color"/>
    <input type="color" d-value="color"/>
    <input type="color" d-value="color2" value="#6576f3"/>
  `;

  color = '#f476f7';
  color2 = null;

  afterRender() {
    app = this;
  }
}

class DValueRadio extends Block {
  static template = html`
    <input type="radio" d-value="choice" value="a"/>
    <input type="radio" d-value="choice" value="b"/>
    <input type="radio" d-value="choice" value="c"/>
    <input type="radio" d-value="choice" value="a"/>
    <input type="radio" d-value="choice" value="b"/>
    <input type="radio" d-value="choice" value="c"/>
    <input type="radio" d-value="choice2" value="a"/>
    <input type="radio" d-value="choice2" value="b" checked/>
    <input type="radio" d-value="choice2" value="c"/>
  `;

  choice = 'a';
  choice2 = null;

  afterRender() {
    app = this;
  }
}

class DValueCheckbox extends Block {
  static template = html`
    <input type="checkbox" d-value="choice" value="a"/>
    <input type="checkbox" d-value="choice" value="b"/>
    <input type="checkbox" d-value="choice" value="c"/>
    <input type="checkbox" d-value="choice" value="a"/>
    <input type="checkbox" d-value="choice" value="b"/>
    <input type="checkbox" d-value="choice" value="c"/>
    <input type="checkbox" d-value="choice2" value="a" checked/>
    <input type="checkbox" d-value="choice2" value="b"/>
    <input type="checkbox" d-value="choice2" value="c" checked/>
  `;

  choice = ['a', 'b'];
  choice2 = null;

  afterRender() {
    app = this;
  }
}

class DValueSelect extends Block {
  static template = html`
    <select d-value="choice">
      <option value="a"/>
      <option value="b"/>
      <option value="c"/>
    </select>
    <select d-value="choice">
      <option value="a"/>
      <option value="b"/>
      <option value="c"/>
    </select>
    <select d-value="choice2">
      <option value="a"/>
      <option value="b" selected/>
      <option value="c"/>
    </select>
  `;

  choice = 'a';
  choice2 = null;

  afterRender() {
    app = this;
  }
}

class DValueSelectMultiple extends Block {
  static template = html`
    <select d-value="choice" multiple>
      <option value="a"/>
      <option value="b"/>
      <option value="c"/>
    </select>
    <select d-value="choice" multiple>
      <option value="a"/>
      <option value="b"/>
      <option value="c"/>
    </select>
    <select d-value="choice2" multiple>
      <option value="a" selected/>
      <option value="b"/>
      <option value="c" selected/>
    </select>
  `;

  choice = ['a', 'b'];
  choice2 = null;

  afterRender() {
    app = this;
  }
}

Block.block('DValueSimple', DValueSimple);
Block.block('DValueContentEditable', DValueContentEditable);
Block.block('DValueColor', DValueColor);
Block.block('DValueRadio', DValueRadio);
Block.block('DValueCheckbox', DValueCheckbox);
Block.block('DValueSelect', DValueSelect);
Block.block('DValueSelectMultiple', DValueSelectMultiple);

export default () => {
  describe('d-value', () => {
    describe('simple test', () => {
      before(() => {
        initApp(htmlScopeless`<DValueSimple/>`, container);
      });

      it('should set default values', () => {
        const children = container.children();

        strictEqual(children.elem(0).prop('value'), '123');
        strictEqual(children.elem(1).prop('value'), '123');
        strictEqual(app.input2, '456');
      });
      it('should react on variable change', () => {
        app.input = '456';

        const children = container.children();

        strictEqual(children.elem(0).prop('value'), '456');
        strictEqual(children.elem(1).prop('value'), '456');
      });
      it('should react on user interactions', (done) => {
        const children = container.children();

        children.elem(0)
          .prop('value', '789')
          .dispatch('input');

        setTimeout(() => {
          try {
            strictEqual(children.elem(0).prop('value'), '789');
            strictEqual(children.elem(1).prop('value'), '789');
            strictEqual(app.input, '789');

            done();
          } catch (err) {
            done(err);
          }
        }, 25);
      });

      after(remove);
    });
    describe('contentEditable test', () => {
      before(() => {
        initApp(htmlScopeless`<DValueContentEditable/>`, container);
      });

      it('should set default values', () => {
        const children = container.children();

        strictEqual(children.elem(0).text(), '123');
        strictEqual(children.elem(1).text(), '123');
        strictEqual(app.input2, '456');
      });
      it('should react on variable change', () => {
        app.input = '456';

        const children = container.children();

        strictEqual(children.elem(0).text(), '456');
        strictEqual(children.elem(1).text(), '456');
      });
      it('should react on user interactions', (done) => {
        const children = container.children();

        children.elem(0)
          .text('789')
          .dispatch('input');

        setTimeout(() => {
          try {
            strictEqual(children.elem(0).text(), '789');
            strictEqual(children.elem(1).text(), '789');
            strictEqual(app.input, '789');

            done();
          } catch (err) {
            done(err);
          }
        }, 25);
      });

      after(remove);
    });
    describe('color test', () => {
      before(() => {
        initApp(htmlScopeless`<DValueColor/>`, container);
      });

      it('should set default values', () => {
        const children = container.children();

        strictEqual(children.elem(0).prop('value'), app.color);
        strictEqual(children.elem(1).prop('value'), app.color);
        strictEqual(children.elem(2).prop('value'), app.color2);
      });
      it('should react on variable change', () => {
        const color = app.color = '#aa819d';

        const children = container.children();

        strictEqual(children.elem(0).prop('value'), color);
        strictEqual(children.elem(1).prop('value'), color);
      });
      it('should react on user interactions', (done) => {
        const children = container.children();
        const color = '#33e694';

        children.elem(0)
          .prop('value', color)
          .dispatch('change');

        setTimeout(() => {
          try {
            strictEqual(children.elem(0).prop('value'), color);
            strictEqual(children.elem(1).prop('value'), color);
            strictEqual(app.color, color);

            done();
          } catch (err) {
            done(err);
          }
        }, 25);
      });

      after(remove);
    });
    describe('radio test', () => {
      before(() => {
        initApp(htmlScopeless`<DValueRadio/>`, container);
      });

      it('should set default values', () => {
        const children = container.children();

        strictEqual(children.elem(0).prop('checked'), true);
        strictEqual(children.elem(1).prop('checked'), false);
        strictEqual(children.elem(2).prop('checked'), false);
        strictEqual(children.elem(3).prop('checked'), true);
        strictEqual(children.elem(4).prop('checked'), false);
        strictEqual(children.elem(5).prop('checked'), false);
        strictEqual(app.choice2, 'b');
      });
      it('should react on variable change', () => {
        app.choice = 'c';

        const children = container.children();

        strictEqual(children.elem(0).prop('checked'), false);
        strictEqual(children.elem(1).prop('checked'), false);
        strictEqual(children.elem(2).prop('checked'), true);
        strictEqual(children.elem(3).prop('checked'), false);
        strictEqual(children.elem(4).prop('checked'), false);
        strictEqual(children.elem(5).prop('checked'), true);
      });
      it('should react on user interactions', (done) => {
        const children = container.children();

        children.elem(1)
          .prop('checked', true)
          .dispatch('change');

        setTimeout(() => {
          try {
            strictEqual(children.elem(0).prop('checked'), false);
            strictEqual(children.elem(1).prop('checked'), true);
            strictEqual(children.elem(2).prop('checked'), false);
            strictEqual(children.elem(3).prop('checked'), false);
            strictEqual(children.elem(4).prop('checked'), true);
            strictEqual(children.elem(5).prop('checked'), false);
            strictEqual(app.choice, 'b');

            done();
          } catch (err) {
            done(err);
          }
        }, 25);
      });

      after(remove);
    });
    describe('checkbox test', () => {
      before(() => {
        initApp(htmlScopeless`<DValueCheckbox/>`, container);
      });

      it('should set default values', () => {
        const children = container.children();

        strictEqual(children.elem(0).prop('checked'), true);
        strictEqual(children.elem(1).prop('checked'), true);
        strictEqual(children.elem(2).prop('checked'), false);
        strictEqual(children.elem(3).prop('checked'), true);
        strictEqual(children.elem(4).prop('checked'), true);
        strictEqual(children.elem(5).prop('checked'), false);
        deepStrictEqual(app.choice2, ['a', 'c']);
      });
      it('should react on variable change', () => {
        app.choice = ['a', 'c'];

        const children = container.children();

        strictEqual(children.elem(0).prop('checked'), true);
        strictEqual(children.elem(1).prop('checked'), false);
        strictEqual(children.elem(2).prop('checked'), true);
        strictEqual(children.elem(3).prop('checked'), true);
        strictEqual(children.elem(4).prop('checked'), false);
        strictEqual(children.elem(5).prop('checked'), true);
      });
      it('should react on user interactions', (done) => {
        const children = container.children();

        children.elem(0)
          .prop('checked', false)
          .dispatch('change');

        setTimeout(() => {
          try {
            strictEqual(children.elem(0).prop('checked'), false);
            strictEqual(children.elem(1).prop('checked'), false);
            strictEqual(children.elem(2).prop('checked'), true);
            strictEqual(children.elem(3).prop('checked'), false);
            strictEqual(children.elem(4).prop('checked'), false);
            strictEqual(children.elem(5).prop('checked'), true);
            deepStrictEqual(app.choice, ['c']);

            done();
          } catch (err) {
            done(err);
          }
        }, 25);
      });

      after(remove);
    });
    describe('select test', () => {
      before(() => {
        initApp(htmlScopeless`<DValueSelect/>`, container);
      });

      it('should set default values', () => {
        const children = container.children();

        strictEqual(children.elem(0).prop('value'), 'a');
        strictEqual(children.elem(1).prop('value'), 'a');
        strictEqual(app.choice2, 'b');
      });
      it('should react on variable change', () => {
        app.choice = 'c';

        const children = container.children();

        strictEqual(children.elem(0).prop('value'), 'c');
        strictEqual(children.elem(1).prop('value'), 'c');
      });
      it('should react on user interactions', (done) => {
        const children = container.children();

        children.elem(0)
          .prop('value', 'b')
          .dispatch('change');

        setTimeout(() => {
          try {
            strictEqual(children.elem(0).prop('value'), 'b');
            strictEqual(children.elem(1).prop('value'), 'b');
            strictEqual(app.choice, 'b');

            done();
          } catch (err) {
            done(err);
          }
        }, 25);
      });

      after(remove);
    });
    describe('select multiple test', () => {
      before(() => {
        initApp(htmlScopeless`<DValueSelectMultiple/>`, container);
      });

      it('should set default values', () => {
        const children = container.children();

        deepStrictEqual(children.elem(0).getValues(), ['a', 'b']);
        deepStrictEqual(children.elem(1).getValues(), ['a', 'b']);
        deepStrictEqual(app.choice2, ['a', 'c']);
      });
      it('should react on variable change', () => {
        app.choice = ['a', 'c'];

        const children = container.children();

        deepStrictEqual(children.elem(0).getValues(), ['a', 'c']);
        deepStrictEqual(children.elem(1).getValues(), ['a', 'c']);
      });
      it('should react on user interactions', (done) => {
        const children = container.children();

        children.children()
          .elem(0)
          .prop('selected', false)
          .parent()
          .dispatch('change');

        setTimeout(() => {
          try {
            deepStrictEqual(children.elem(0).getValues(), ['c']);
            deepStrictEqual(children.elem(1).getValues(), ['c']);
            deepStrictEqual(app.choice, ['c']);

            done();
          } catch (err) {
            done(err);
          }
        }, 25);
      });

      after(remove);
    });
  });
};
