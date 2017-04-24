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
    <DValueSimpleHelper/>
    <input d-value="{(value) => input5 = value}" value="258"/>
  `;

  input = '123';
  input2 = null;
  input3 = null;

  afterRender() {
    app = this;
  }
}

class DValueSimpleHelper extends Block {
  static template = html`
    <input d-value(input3)="{getParentTemplate()}" value="789"/>
    <input d-value(input4) value="159"/>
  `;

  input4 = null;

  afterRender() {
    block = this;
  }
}

class DValueTextArea extends Block {
  static template = html`
    <textarea d-value="input"/>
    <textarea d-value="input"/>
    <textarea d-value="input2">456</textarea>
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

class DValueFile extends Block {
  static template = html`
    <input type="file" d-value="file"/>
    <input type="file" d-value="file"/>
    <input type="file" d-value="file2" value="{defaultFiles}"/>
  `;

  file = doc.create('input').attr('type', 'file')[0].files;
  file2 = null;
  defaultFiles = doc.create('input').attr('type', 'file')[0].files;

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
    <input type="checkbox" d-value="choice3" value="a"/>
    <input type="checkbox" d-value="choice3" value="b"/>
    <input type="checkbox" d-value="choice3" value="c" checked/>
    <input type="checkbox" d-value="choice4" value="a" checked/>
    <input type="checkbox" d-value="choice4" value="b" checked/>
    <input type="checkbox" d-value="choice4" value="c"/>
  `;

  choice = ['a', 'b'];
  choice2 = null;
  choice3 = null;
  choice4 = null;

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

class DValueFormReset extends Block {
  static template = html`
    <form>
      <input d-value="input"/>
    </form>
  `;

  input = '123';

  afterRender() {
    app = this;
  }
}

Block.block('DValueSimple', DValueSimple);
Block.block('DValueSimpleHelper', DValueSimpleHelper);
Block.block('DValueTextArea', DValueTextArea);
Block.block('DValueContentEditable', DValueContentEditable);
Block.block('DValueColor', DValueColor);
Block.block('DValueFile', DValueFile);
Block.block('DValueRadio', DValueRadio);
Block.block('DValueCheckbox', DValueCheckbox);
Block.block('DValueSelect', DValueSelect);
Block.block('DValueSelectMultiple', DValueSelectMultiple);
Block.block('DValueFormReset', DValueFormReset);

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
        strictEqual(app.input3, '789');
        strictEqual(block.input4, '159');
        strictEqual(app.input5, '258');
      });
      it('should react on variable change', () => {
        app.input = '456';
        app.input3 = '159';
        block.input4 = '258';

        const children = container.children();

        strictEqual(children.elem(0).prop('value'), '456');
        strictEqual(children.elem(1).prop('value'), '456');
        strictEqual(children.elem(3).prop('value'), '159');
        strictEqual(children.elem(4).prop('value'), '258');
      });
      it('should react on user interactions', (done) => {
        const children = container.children();

        children.elem(0)
          .prop('value', '789')
          .dispatch('input');

        children.elem(3)
          .prop('value', '258')
          .dispatch('input');

        children.elem(4)
          .prop('value', '357')
          .dispatch('input');

        children.elem(5)
          .prop('value', '456')
          .dispatch('input');

        setTimeout(() => {
          try {
            strictEqual(children.elem(0).prop('value'), '789');
            strictEqual(children.elem(1).prop('value'), '789');
            strictEqual(app.input, '789');
            strictEqual(app.input3, '258');
            strictEqual(block.input4, '357');
            strictEqual(app.input5, '456');

            done();
          } catch (err) {
            done(err);
          }
        }, 25);
      });

      after(remove);
    });
    describe('textarea test', () => {
      before(() => {
        initApp(htmlScopeless`<DValueTextArea/>`, container);
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
    describe('file test', () => {
      before(() => {
        initApp(htmlScopeless`<DValueFile/>`, container);
      });

      it('should set default values', () => {
        const children = container.children();

        strictEqual(children.elem(0).prop('files'), app.file);
        strictEqual(children.elem(1).prop('files'), app.file);
        strictEqual(children.elem(2).prop('files'), app.file2);
      });
      it('should react on variable change', () => {
        const file = app.file = doc.create('input').attr('type', 'file')[0].files;

        const children = container.children();

        strictEqual(children.elem(0).prop('files'), file);
        strictEqual(children.elem(1).prop('files'), file);
      });
      it('should react on user interactions', (done) => {
        const children = container.children();
        const file = doc.create('input').attr('type', 'file')[0].files;

        children.elem(0)
          .prop('files', file)
          .dispatch('change');

        setTimeout(() => {
          try {
            strictEqual(children.elem(0).prop('files'), file);
            strictEqual(children.elem(1).prop('files'), file);
            strictEqual(app.file, file);

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
        deepStrictEqual(app.choice3, ['c']);
        deepStrictEqual(app.choice4, ['a', 'b']);
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

        app.choice3 = ['a', 'c'];
        app.choice4 = ['b'];

        children.elem(0)
          .prop('checked', false)
          .dispatch('change');

        children.elem(9)
          .prop('checked', true)
          .dispatch('change');

        children.elem(12)
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
            strictEqual(children.elem(9).prop('checked'), true);
            strictEqual(children.elem(10).prop('checked'), false);
            strictEqual(children.elem(11).prop('checked'), true);
            strictEqual(children.elem(12).prop('checked'), false);
            strictEqual(children.elem(13).prop('checked'), true);
            strictEqual(children.elem(14).prop('checked'), false);
            deepStrictEqual(app.choice, ['c']);
            deepStrictEqual(app.choice3, ['a', 'c']);
            deepStrictEqual(app.choice4, ['b']);

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
    describe('form reset test', () => {
      before(() => {
        initApp(htmlScopeless`<DValueFormReset/>`, container);
      });

      it('should set default values', () => {
        const children = container.children();

        strictEqual(children.find('input').prop('value'), '123');
      });
      it('should react on resetting the form', (done) => {
        const children = container.children();

        children.find('input').prop('value', '');
        children.elem(0).dispatch('reset');

        setTimeout(() => {
          try {
            strictEqual(app.input, '');

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
