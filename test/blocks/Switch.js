import { strictEqual } from 'assert';
import { Block, doc, initApp, removeApp, Switch, Case } from '../../src';
import { isArray, isString } from '../../src/utils';

let app;
let block;
const container = doc.create('div');
const remove = () => {
  removeApp(container);

  app = null;
  block = null;
};

class SwitchSimple extends Block {
  static html = html`
    <Switch value="{value}">
      <Case when="{caseValue}">
        <span>
          {caption}
        </span>
      </Case>
    </Switch>
  `;

  value = null;
  caseValue = 1;
  caption = '';

  afterRender() {
    app = this;
  }
}

class SwitchMultipleCase extends Block {
  static html = html`
    <Switch value="{value}">
      <Case when="{1}">
        {captionA}
      </Case>
      <Case when="{2}">
        {captionB}
      </Case>
    </Switch>
  `;

  value = null;
  captionA = '';
  captionB = '';

  afterRender() {
    app = this;
  }
}

class SwitchDynamicCases extends Block {
  static html = html`
    <Switch value="{1}">
      <Case when="{caseA}">
        {captionA}
      </Case>
      <Case when="{caseB}">
        {captionB}
      </Case>
    </Switch>
  `;

  caseA = 0;
  caseB = 0;
  captionA = '';
  captionB = '';

  afterRender() {
    app = this;
  }
}

class SwitchDefault extends Block {
  static html = html`
    <Switch value="{value}">
      <Case when="{1}">
        {captionA}
      </Case>
      <Case when="{2}">
        {captionB}
      </Case>
      <div>not rendered</div>
      <Case>
        not rendered
      </Case>
      <Case default>
        {captionC}
      </Case>
      <Case default>
        not rendered
      </Case>
    </Switch>
  `;

  value = null;
  captionA = '';
  captionB = '';
  captionC = 'default';

  afterRender() {
    app = this;
  }
}

class SwitchCompareFn extends Block {
  static html = html`
    <Switch
      value="{value}"
      compareFn="{(switchValue, caseValue) => caseValue(switchValue)}"
    >
      <Case when="{isArray}">
        array
      </Case>
      <Case when="{isString}">
        string
      </Case>
      <Case default>
        rest
      </Case>
    </Switch>
  `;

  isArray = isArray;
  isString = isString;
  value = '';

  afterRender() {
    app = this;
  }
}

export default () => {
  describe('Switch', () => {
    describe('simple test', () => {
      before(() => {
        initApp(SwitchSimple, container);
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
        initApp(SwitchMultipleCase, container);
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
        initApp(SwitchDynamicCases, container);
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
        initApp(SwitchDefault, container);
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
        initApp(SwitchCompareFn, container);
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

