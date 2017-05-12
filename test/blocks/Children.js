import { strictEqual } from 'assert';
import { Block, doc, initApp, removeApp, Children } from '../../src';

let app;
let block;
const container = doc.create('div');
const remove = () => {
  removeApp(container);

  app = null;
  block = null;
};

class ChildrenSimple extends Block {
  static html = html`
    <div>
      <Children/>
    </div>
  `;
}

class ChildrenSimpleApp extends Block {
  static html = html`
    <ChildrenSimple>
      <span>{caption}</span>
    </ChildrenSimple>
  `;

  caption = 'Hello, world!';

  afterRender() {
    app = this;
  }
}

class ChildrenNamed extends Block {
  static html = html`
    <a id="a1">
      <Children name="a"/>
    </a>
    <b id="b">
      <Children name="b"/>
    </b>
    <i id="a2">
      <Children name="a"/>
    </i>
    <q id="c">
      <Children name="c"/>
    </q>
  `;
}

class ChildrenNamedApp extends Block {
  static html = html`
    <ChildrenNamed>
      <Children name="a">
        {captionA}
      </Children>
      <Children name="b">
        {captionB}
      </Children>
    </ChildrenNamed>
  `;

  captionA = 'Hello!';
  captionB = 'Goodbye!';

  afterRender() {
    app = this;
  }
}

class ChildrenNestedHelper extends Block {
  static html = html`
    <a id="a">
      <Children name="a"/>
    </a>
    <b id="b">
      <Children name="b"/>
    </b>
  `;
}

class ChildrenNested extends Block {
  static html = html`
    <ChildrenNestedHelper>
      <Children name="a">
        <Children name="b"/>
      </Children>
      <Children name="b">
        <Children name="a"/>
      </Children>
    </ChildrenNestedHelper>
  `;
}

class ChildrenNestedApp extends Block {
  static html = html`
    <ChildrenNested>
      <Children name="a">
        {captionA}
      </Children>
      <Children name="b">
        {captionB}
      </Children>
    </ChildrenNested>
  `;

  captionA = 'Hello!';
  captionB = 'Goodbye!';

  afterRender() {
    app = this;
  }
}

export default () => {
  describe('Children', () => {
    describe('simple test', () => {
      before(() => {
        initApp(ChildrenSimpleApp, container);
      });

      it('should render caption using variables from the current scope', () => {
        strictEqual(container.html(), '<div><span>Hello, world!</span></div>');
      });
      it('should re-render caption after the variable has been changed', () => {
        app.caption = 'Hello, world, again!';

        strictEqual(container.html(), '<div><span>Hello, world, again!</span></div>');
      });

      after(remove);
    });
    describe('named test', () => {
      before(() => {
        initApp(ChildrenNamedApp, container);
      });

      it('should render caption using variables from the current scope', () => {
        strictEqual(container.html(), '<a id="a1">Hello!</a><b id="b">Goodbye!</b><i id="a2">Hello!</i><q id="c"></q>');
      });
      it('should re-render caption after the variables have been changed', () => {
        app.captionA = 'Goodbye!';
        app.captionB = 'Hello!';

        strictEqual(container.html(), '<a id="a1">Goodbye!</a><b id="b">Hello!</b><i id="a2">Goodbye!</i><q id="c"></q>');
      });

      after(remove);
    });
    describe('nested test', () => {
      before(() => {
        initApp(ChildrenNestedApp, container);
      });

      it('should render caption using variables from the current scope', () => {
        strictEqual(container.html(), '<a id="a">Goodbye!</a><b id="b">Hello!</b>');
      });
      it('should re-render caption after the variables have been changed', () => {
        app.captionA = 'Goodbye!';
        app.captionB = 'Hello!';

        strictEqual(container.html(), '<a id="a">Hello!</a><b id="b">Goodbye!</b>');
      });

      after(remove);
    });
  });
};
