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

class DIfSimple extends Block {
  static template = html`
    <d-if if="{condition}">
      <span>
        {caption}
      </span>
    </d-if>
  `;

  condition = false;
  caption = '';

  afterRender() {
    app = this;
  }
}

class DIfElseIf extends Block {
  static template = html`
    <d-if if="{variable === 'if'}">
      {captionA}
    </d-if>
    <d-else-if if="{variable === 'else-if'}">
      {captionB}
    </d-else-if>
  `;

  variable = null;
  captionA = '';
  captionB = '';

  afterRender() {
    app = this;
  }
}

class DIfElseIfElse extends Block {
  static template = html`
    <d-if if="{variable === 'if'}">
      {captionA}
    </d-if>
    <d-else-if if="{variable === 'else-if'}">
      {captionB}
    </d-else-if>
    <d-else>
      {captionC}
    </d-else>
  `;

  variable = null;
  captionA = '';
  captionB = '';
  captionC = 'default';

  afterRender() {
    app = this;
  }
}

Block.block('DIfSimple', DIfSimple);
Block.block('DIfElseIf', DIfElseIf);
Block.block('DIfElseIfElse', DIfElseIfElse);

export default () => {
  describe('d-if', () => {
    describe('simple test', () => {
      let span;

      before(() => {
        initApp(htmlScopeless`<DIfSimple/>`, container);
      });

      it('should not render anything if the condition is false', () => {
        strictEqual(container.html(), '');
      });
      it('should re-render caption after the condition has been changed', () => {
        app.condition = true;
        app.caption = 'Hello, world!';
        span = container.find('span')[0];

        strictEqual(container.html(), '<span>Hello, world!</span>');
      });
      it('should not re-render caption after the condition has been changed to same in terms of boolean', () => {
        app.condition = 1;

        strictEqual(container.html(), '<span>Hello, world!</span>');
        strictEqual(container.find('span')[0], span);
      });
      it('should re-render caption again after the condition has been changed', () => {
        app.condition = false;

        strictEqual(container.html(), '');
      });

      after(remove);
    });
    describe('else-if test', () => {
      before(() => {
        initApp(htmlScopeless`<DIfElseIf/>`, container);
      });

      it('should not render anything if no condition is true', () => {
        strictEqual(container.html(), '');
      });
      it('should render caption after some condition has been changed to true', () => {
        app.variable = 'if';
        app.captionA = 'IF';

        strictEqual(container.html(), 'IF');
      });
      it('should re-render caption after some important condition has been changed', () => {
        app.variable = 'else-if';
        app.captionB = 'ELSE_IF';

        strictEqual(container.html(), 'ELSE_IF');
      });
      it('should re-render caption after some condition has been changed again', () => {
        app.variable = 'if';
        app.captionA = 'IF_AGAIN';

        strictEqual(container.html(), 'IF_AGAIN');
      });
      it('should render nothing again after all conditions are false again', () => {
        app.variable = 'else';

        strictEqual(container.html(), '');
      });

      after(remove);
    });
    describe('else-if-else test', () => {
      before(() => {
        initApp(htmlScopeless`<DIfElseIfElse/>`, container);
      });

      it('should render else condition if no condition is true', () => {
        strictEqual(container.html(), 'default');
      });
      it('should render caption after some condition has been changed to true', () => {
        app.variable = 'if';
        app.captionA = 'IF';

        strictEqual(container.html(), 'IF');
      });
      it('should re-render caption after some important condition has been changed', () => {
        app.variable = 'else-if';
        app.captionB = 'ELSE_IF';

        strictEqual(container.html(), 'ELSE_IF');
      });
      it('should re-render caption using else if all conditions are false', () => {
        app.variable = 'else';
        app.captionC = 'ELSE';

        strictEqual(container.html(), 'ELSE');
      });
      it('should re-render caption after some condition has been changed again', () => {
        app.variable = 'else-if';
        app.captionB = 'ELSE_IF_AGAIN';

        strictEqual(container.html(), 'ELSE_IF_AGAIN');
      });
      it('should re-render caption using else if all conditions are false again', () => {
        app.variable = 'else';
        app.captionC = 'ELSE_AGAIN';

        strictEqual(container.html(), 'ELSE_AGAIN');
      });

      after(remove);
    });
  });
};
