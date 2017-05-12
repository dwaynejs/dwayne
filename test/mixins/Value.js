import { strictEqual, deepStrictEqual } from 'assert';
import { Block, doc, initApp, removeApp, Elem, Value, Rest } from '../../src';

let app;
let block;
let onChange = () => {};
const container = doc.create('div');
const remove = () => {
  removeApp(container);

  app = null;
  block = null;
};

Elem.addMethods({
  getValues() {
    return new Elem(this.find('option'))
      .filter((option) => option.selected)
      .map(({ value }) => value);
  }
});

class ValueSimpleHelper extends Block {
  static html = html`
    <input Value(input3)="{getParentTemplate()}" value="789"/>
    <input Value(input4) value="159"/>
  `;

  input4 = null;

  afterRender() {
    block = this;
  }
}

class ValueSimple extends Block {
  static html = html`
    <input Value="input"/>
    <input Value="input"/>
    <input Value="input2" value="456"/>
    <ValueSimpleHelper/>
    <input Value="{(value) => input5 = value}" value="258"/>
    <input Rest="{rest}" class="Rest"/>
  `;

  input = '123';
  input2 = null;
  input3 = null;
  rest = { ...this.args };

  afterRender() {
    app = this;
  }
}

class ValueTextArea extends Block {
  static html = html`
    <textarea Value="input"/>
    <textarea Value="input"/>
    <textarea Value="input2">456</textarea>
  `;

  input = '123';
  input2 = null;

  afterRender() {
    app = this;
  }
}

class ValueContentEditable extends Block {
  static html = html`
    <div contentEditable Value="input"/>
    <div contentEditable Value="input"/>
    <div contentEditable Value="input2">456</div>
  `;

  input = '123';
  input2 = null;

  afterRender() {
    app = this;
  }
}

class ValueColor extends Block {
  static html = html`
    <input type="color" Value="color"/>
    <input type="color" Value="color"/>
    <input type="color" Value="color2" value="#6576f3"/>
  `;

  color = '#f476f7';
  color2 = null;

  afterRender() {
    app = this;
  }
}

class ValueFile extends Block {
  static html = html`
    <input type="file" Value="file"/>
  `;

  file = null;

  afterRender() {
    app = this;
  }
}

class ValueRadio extends Block {
  static html = html`
    <input type="radio" Value="choice" value="a"/>
    <input type="radio" Value="choice" value="b"/>
    <input type="radio" Value="choice" value="c"/>
    <input type="radio" Value="choice" value="a"/>
    <input type="radio" Value="choice" value="b"/>
    <input type="radio" Value="choice" value="c"/>
    <input type="radio" Value="choice2" value="a"/>
    <input type="radio" Value="choice2" value="b" checked/>
    <input type="radio" Value="choice2" value="c"/>
  `;

  choice = 'a';
  choice2 = null;

  afterRender() {
    app = this;
  }
}

class ValueCheckbox extends Block {
  static html = html`
    <input type="checkbox" Value="choice" value="a"/>
    <input type="checkbox" Value="choice" value="b"/>
    <input type="checkbox" Value="choice" value="c"/>
    <input type="checkbox" Value="choice" value="a"/>
    <input type="checkbox" Value="choice" value="b"/>
    <input type="checkbox" Value="choice" value="c"/>
    <input type="checkbox" Value="choice2" value="a" checked/>
    <input type="checkbox" Value="choice2" value="b"/>
    <input type="checkbox" Value="choice2" value="c" checked/>
    <input type="checkbox" Value="choice3" value="a"/>
    <input type="checkbox" Value="choice3" value="b"/>
    <input type="checkbox" Value="choice3" value="c" checked/>
    <input type="checkbox" Value="choice4" value="a" checked/>
    <input type="checkbox" Value="choice4" value="b" checked/>
    <input type="checkbox" Value="choice4" value="c"/>
  `;

  choice = ['a', 'b'];
  choice2 = null;
  choice3 = null;
  choice4 = null;

  afterRender() {
    app = this;
  }
}

class ValueSelect extends Block {
  static html = html`
    <select Value="choice">
      <option value="a"/>
      <option value="b"/>
      <option value="c"/>
    </select>
    <select Value="choice">
      <option value="a"/>
      <option value="b"/>
      <option value="c"/>
    </select>
    <select Value="choice2">
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

class ValueSelectMultiple extends Block {
  static html = html`
    <select Value="choice" multiple>
      <option value="a"/>
      <option value="b"/>
      <option value="c"/>
    </select>
    <select Value="choice" multiple>
      <option value="a"/>
      <option value="b"/>
      <option value="c"/>
    </select>
    <select Value="choice2" multiple>
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

class ValueFormReset extends Block {
  static html = html`
    <form>
      <input Value="input"/>
    </form>
  `;

  input = '123';

  afterRender() {
    app = this;
  }
}

export default () => {
  describe('Value', () => {
    describe('simple test', () => {
      before(() => {
        initApp(htmlScopeless`<ValueSimple Value="{(value) => onChange(value)}"/>`, container);
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
      it('should do the cleaning', (done) => {
        onChange = () => {
          done(new Error('Shouldn\'t have been called'));
        };
        app.rest = {};

        container
          .find('input.Rest')
          .dispatch('input');

        setTimeout(done, 25);
      });

      after(remove);
    });
    describe('textarea test', () => {
      before(() => {
        initApp(ValueTextArea, container);
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
        initApp(ValueContentEditable, container);
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
        initApp(ValueColor, container);
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
        initApp(ValueFile, container);
      });

      it('should set default values', () => {
        const children = container.children();

        strictEqual(children.elem(0).prop('files'), app.file);
      });

      after(remove);
    });
    describe('radio test', () => {
      before(() => {
        initApp(ValueRadio, container);
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
        initApp(ValueCheckbox, container);
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
        initApp(ValueSelect, container);
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
        initApp(ValueSelectMultiple, container);
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
        initApp(ValueFormReset, container);
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
