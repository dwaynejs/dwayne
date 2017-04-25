import { strictEqual } from 'assert';
import { Block, doc, initApp, removeApp } from '../../src';
import { isArray, isString } from '../../src/utils';

let app;
let block;
const container = doc.create('div');
const remove = () => {
  removeApp(container);

  app = null;
  block = null;
};

class DSwitchSimple extends Block {
  static template = html`
    <d-switch value="{value}">
      <d-case if="{caseValue}">
        <span>
          {caption}
        </span>
      </d-case>
    </d-switch>
  `;

  value = null;
  caseValue = 1;
  caption = '';

  afterRender() {
    app = this;
  }
}

class DSwitchMultipleCase extends Block {
  static template = html`
    <d-switch value="{value}">
      <d-case if="{1}">
        {captionA}
      </d-case>
      <d-case if="{2}">
        {captionB}
      </d-case>
    </d-switch>
  `;

  value = null;
  captionA = '';
  captionB = '';

  afterRender() {
    app = this;
  }
}

class DSwitchDynamicCases extends Block {
  static template = html`
    <d-switch value="{1}">
      <d-case if="{caseA}">
        {captionA}
      </d-case>
      <d-case if="{caseB}">
        {captionB}
      </d-case>
    </d-switch>
  `;

  caseA = 0;
  caseB = 0;
  captionA = '';
  captionB = '';

  afterRender() {
    app = this;
  }
}

class DSwitchDefault extends Block {
  static template = html`
    <d-switch value="{value}">
      <d-case if="{1}">
        {captionA}
      </d-case>
      <d-case if="{2}">
        {captionB}
      </d-case>
      <d-default>
        {captionC}
      </d-default>
    </d-switch>
  `;

  value = null;
  captionA = '';
  captionB = '';
  captionC = 'default';

  afterRender() {
    app = this;
  }
}

class DSwitchCompareFn extends Block {
  static template = html`
    <d-switch
      value="{value}"
      compareFn="{(switchValue, caseValue) => caseValue(switchValue)}"
    >
      <d-case if="{isArray}">
        array
      </d-case>
      <d-case if="{isString}">
        string
      </d-case>
      <d-default>
        rest
      </d-default>
    </d-switch>
  `;

  isArray = isArray;
  isString = isString;
  value = '';

  afterRender() {
    app = this;
  }
}

Block.block('DSwitchSimple', DSwitchSimple);
Block.block('DSwitchMultipleCase', DSwitchMultipleCase);
Block.block('DSwitchDynamicCases', DSwitchDynamicCases);
Block.block('DSwitchDefault', DSwitchDefault);
Block.block('DSwitchCompareFn', DSwitchCompareFn);

export default () => {
  describe('d-switch', () => {
    describe('simple test', () => {
      before(() => {
        initApp(htmlScopeless`<DSwitchSimple/>`, container);
      });

      it('should not render anything if no condition matches', () => {
        strictEqual(container.html(), '');
      });
      it('should re-render caption after the value has been changed', () => {
        app.value = 1;
        app.caption = 'Hello, world!';

        strictEqual(container.html(), '<span>Hello, world!</span>');
      });
      it('should re-render caption after the case value has been changed', () => {
        app.caseValue = 2;

        strictEqual(container.html(), '');
      });
      it('should re-render caption again after the value has been changed', () => {
        app.value = 2;
        app.caption = 'Hello, world, again!';

        strictEqual(container.html(), '<span>Hello, world, again!</span>');
      });
      it('should not render caption again after no condition matches again', () => {
        app.value = NaN;

        strictEqual(container.html(), '');
      });
      it('should consider NaN equal to NaN', () => {
        app.caseValue = NaN;

        strictEqual(container.html(), '<span>Hello, world, again!</span>');
      });

      after(remove);
    });
    describe('multiple cases test', () => {
      before(() => {
        initApp(htmlScopeless`<DSwitchMultipleCase/>`, container);
      });

      it('should not render anything if no condition matches', () => {
        strictEqual(container.html(), '');
      });
      it('should render caption after some condition matches the value', () => {
        app.value = 1;
        app.captionA = 'FIRST';

        strictEqual(container.html(), 'FIRST');
      });
      it('should re-render caption after some important condition has been changed', () => {
        app.value = 2;
        app.captionB = 'SECOND';

        strictEqual(container.html(), 'SECOND');
      });
      it('should re-render caption after some condition has been changed again', () => {
        app.value = 1;
        app.captionA = 'FIRST_AGAIN';

        strictEqual(container.html(), 'FIRST_AGAIN');
      });
      it('should render nothing again after all conditions are false again', () => {
        app.value = 3;

        strictEqual(container.html(), '');
      });

      after(remove);
    });
    describe('dynamic cases test', () => {
      before(() => {
        initApp(htmlScopeless`<DSwitchDynamicCases/>`, container);
      });

      it('should not render anything if no condition matches', () => {
        strictEqual(container.html(), '');
      });
      it('should render caption after some condition matches the value', () => {
        app.caseA = 1;
        app.captionA = 'FIRST';

        strictEqual(container.html(), 'FIRST');
      });
      it('should not re-render caption after some not important condition has been changed', () => {
        app.caseB = 1;
        app.captionB = 'SECOND';

        strictEqual(container.html(), 'FIRST');
      });
      it('should re-render caption after some condition has been changed again', () => {
        app.caseA = 0;
        app.captionA = 'FIRST_AGAIN';

        strictEqual(container.html(), 'SECOND');
      });
      it('should render nothing again after all conditions are false again', () => {
        app.caseB = 0;

        strictEqual(container.html(), '');
      });

      after(remove);
    });
    describe('default test', () => {
      before(() => {
        initApp(htmlScopeless`<DSwitchDefault/>`, container);
      });

      it('should render default case if no condition is true', () => {
        strictEqual(container.html(), 'default');
      });
      it('should render caption after some condition matches the value', () => {
        app.value = 1;
        app.captionA = 'FIRST';

        strictEqual(container.html(), 'FIRST');
      });
      it('should re-render caption after some important condition has been changed', () => {
        app.value = 2;
        app.captionB = 'SECOND';

        strictEqual(container.html(), 'SECOND');
      });
      it('should re-render caption using default if all conditions are false', () => {
        app.value = 3;
        app.captionC = 'DEFAULT';

        strictEqual(container.html(), 'DEFAULT');
      });
      it('should re-render caption after some condition has been changed again', () => {
        app.value = 2;
        app.captionB = 'SECOND_AGAIN';

        strictEqual(container.html(), 'SECOND_AGAIN');
      });
      it('should re-render caption using else if all conditions are false again', () => {
        app.value = 3;
        app.captionC = 'DEFAULT_AGAIN';

        strictEqual(container.html(), 'DEFAULT_AGAIN');
      });

      after(remove);
    });
    describe('compareFn test', () => {
      before(() => {
        initApp(htmlScopeless`<DSwitchCompareFn/>`, container);
      });

      it('should render caption according to the case', () => {
        strictEqual(container.html(), 'string');
      });
      it('should re-render caption after the value has been changed', () => {
        app.value = [];

        strictEqual(container.html(), 'array');
      });
      it('should re-render caption after the value has been changed', () => {
        app.value = 1;

        strictEqual(container.html(), 'rest');
      });
      it('should re-render caption again after the value has been changed', () => {
        app.value = '';

        strictEqual(container.html(), 'string');
      });
      it('should not render caption again after no condition matches again', () => {
        app.value = 1;

        strictEqual(container.html(), 'rest');
      });
      it('should re-render caption again after the value has been changed again', () => {
        app.value = [];

        strictEqual(container.html(), 'array');
      });

      after(remove);
    });
  });
};

