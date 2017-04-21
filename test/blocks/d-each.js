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

class DEachSimple extends Block {
  static template = html`
    <d-each set="{[2, 1, 0]}">
      <b id="{'item-' + $index}">
        {'' + $index + $item}
      </b>
    </d-each>
  `;
}

class DEachScope extends Block {
  static template = html`
    <d-each set="{numbers}">
      <b id="{'item-' + $index}">
        {$item.number + is + $item.caption}
      </b>
    </d-each>
  `;

  is = ' is ';
  numbers = [
    {
      number: 2,
      caption: 'two'
    },
    {
      number: 1,
      caption: 'one'
    },
    {
      number: 0,
      caption: 'zero'
    }
  ];

  afterRender() {
    app = this;
  }
}

class DEachChangingSet extends Block {
  static template = html`
    <d-each set="{people}">
      <b>{$item.name}</b>
    </d-each>
  `;

  people = [
    {
      id: 1,
      name: 'Bill'
    },
    {
      id: 2,
      name: 'John'
    },
    {
      id: 3,
      name: 'Michael'
    }
  ];

  afterRender() {
    app = this;
  }
}

class DEachUID extends Block {
  static template = html`
    <d-each set="{people}" uid="{$item.id}">
      <b>{$item.name}</b>
    </d-each>
  `;

  people = [
    {
      id: 1,
      name: 'Bill'
    },
    {
      id: 2,
      name: 'John'
    },
    {
      id: 3,
      name: 'Michael'
    }
  ];

  afterRender() {
    app = this;
  }
}

class DEachArgs extends Block {
  static template = html`
    <d-each
      set="{people}"
      item="person"
      index="index"
      uid="{person.id}"
      filterBy="{({ age }) => age < 30}"
      sortBy="{({ age: age1 }, { age: age2 }) => age1 > age2 ? -1 : age1 < age2 ? 1 : 0}"
    >
      <b>{index + ': ' + person.name}</b>
    </d-each>
  `;

  people = [
    {
      id: 1,
      name: 'Bill',
      age: 30
    },
    {
      id: 2,
      name: 'John',
      age: 25
    },
    {
      id: 3,
      name: 'Michael',
      age: 29
    },
    {
      id: 4,
      name: 'Mary',
      age: 21
    },
    {
      id: 5,
      name: 'Kate',
      age: 42
    }
  ];

  afterRender() {
    app = this;
  }
}

class DEachNested extends Block {
  static template = html`
    <table>
      <d-each set="{table}" item="row" index="y">
        <tr>
          <d-each set="{row}" item="col" index="x">
            <td>{y + ' * ' + x + ' = ' + y*x + ' = ' + col}</td>
          </d-each>
        </tr>
      </d-each>
    </table>
  `;

  table = [
    [0, 0, 0],
    [0, 1, 2],
    [0, 2, 4]
  ];
}

class DEachDoubleNested extends Block {
  static template = html`
    <table>
      <d-each set="{table}" item="row" index="a">
        <tr>
          <d-each set="{row}" item="col" index="b">
            <td>
              <d-each set="{col}" item="val" index="c">
                <span>{'' + a + b + c + val}</span>
              </d-each>
            </td>
          </d-each>
        </tr>
      </d-each>
    </table>
  `;

  table = [
    [
      [0, 1],
      [2, 3]
    ],
    [
      [4, 5],
      [6, 7]
    ]
  ];
}

Block.block('DEachSimple', DEachSimple);
Block.block('DEachScope', DEachScope);
Block.block('DEachChangingSet', DEachChangingSet);
Block.block('DEachUID', DEachUID);
Block.block('DEachArgs', DEachArgs);
Block.block('DEachNested', DEachNested);
Block.block('DEachDoubleNested', DEachDoubleNested);

export default () => {
  describe('d-each', () => {
    describe('simple test', () => {
      before(() => {
        initApp(htmlScopeless`<DEachSimple/>`, container);
      });

      it('should render caption using variables from the d-each scope', () => {
        strictEqual(container.html(), '<b id="item-0">02</b><b id="item-1">11</b><b id="item-2">20</b>');
      });

      after(remove);
    });
    describe('scope test', () => {
      before(() => {
        initApp(htmlScopeless`<DEachScope/>`, container);
      });

      it('should render caption using variables from the d-each scope and the parent scope', () => {
        strictEqual(container.html(), '<b id="item-0">2 is two</b><b id="item-1">1 is one</b><b id="item-2">0 is zero</b>');
      });
      it('should re-render caption using variables from the parent scope', () => {
        app.is = ': ';

        strictEqual(container.html(), '<b id="item-0">2: two</b><b id="item-1">1: one</b><b id="item-2">0: zero</b>');
      });
      it('should re-render caption using variables from both scopes', () => {
        app.is = ' is not ';
        app.numbers = app.numbers.map((item) => ({
          ...item,
          number: item.number + 1
        }));

        strictEqual(container.html(), '<b id="item-0">3 is not two</b><b id="item-1">2 is not one</b><b id="item-2">1 is not zero</b>');
      });

      after(remove);
    });
    describe('changing set test', () => {
      before(() => {
        initApp(htmlScopeless`<DEachChangingSet/>`, container);
      });

      it('should render captions using variables from the d-each scope', () => {
        strictEqual(container.html(), '<b>Bill</b><b>John</b><b>Michael</b>');
      });
      it('should re-render captions when the set changes', () => {
        app.people = app.people.slice(1);

        strictEqual(container.html(), '<b>John</b><b>Michael</b>');
      });

      after(remove);
    });
    describe('uid test', () => {
      before(() => {
        initApp(htmlScopeless`<DEachUID/>`, container);
      });

      let john;
      let michael;

      it('should render captions using variables from the d-each scope', () => {
        john = container.children()[1];
        michael = container.children()[2];

        strictEqual(container.html(), '<b>Bill</b><b>John</b><b>Michael</b>');
      });
      it('should not re-render captions which don\'t change when the set changes', () => {
        app.people = app.people.slice(1);

        strictEqual(container.html(), '<b>John</b><b>Michael</b>');
        strictEqual(container.children()[0], john);
        strictEqual(container.children()[1], michael);
      });

      after(remove);
    });
    describe('args test', () => {
      before(() => {
        initApp(htmlScopeless`<DEachArgs/>`, container);
      });

      it('should render captions using redefined variables from the d-each scope', () => {
        strictEqual(container.html(), '<b>0: Michael</b><b>1: John</b><b>2: Mary</b>');
      });

      after(remove);
    });
    describe('nested test', () => {
      before(() => {
        initApp(htmlScopeless`<DEachNested/>`, container);
      });

      it('should render captions using variables from both d-each scopes', () => {
        strictEqual(
          container.html(),
          '<table>'
          + '<tr>'
          + '<td>0 * 0 = 0 = 0</td>'
          + '<td>0 * 1 = 0 = 0</td>'
          + '<td>0 * 2 = 0 = 0</td>'
          + '</tr>'
          + '<tr>'
          + '<td>1 * 0 = 0 = 0</td>'
          + '<td>1 * 1 = 1 = 1</td>'
          + '<td>1 * 2 = 2 = 2</td>'
          + '</tr>'
          + '<tr>'
          + '<td>2 * 0 = 0 = 0</td>'
          + '<td>2 * 1 = 2 = 2</td>'
          + '<td>2 * 2 = 4 = 4</td>'
          + '</tr>'
          + '</table>'
        );
      });

      after(remove);
    });
    describe('double-nested test', () => {
      before(() => {
        initApp(htmlScopeless`<DEachDoubleNested/>`, container);
      });

      it('should render captions using variables from all three d-each scopes', () => {
        strictEqual(
          container.html(),
          '<table>'
          + '<tr>'
          + '<td>'
          + '<span>0000</span>'
          + '<span>0011</span>'
          + '</td>'
          + '<td>'
          + '<span>0102</span>'
          + '<span>0113</span>'
          + '</td>'
          + '</tr>'
          + '<tr>'
          + '<td>'
          + '<span>1004</span>'
          + '<span>1015</span>'
          + '</td>'
          + '<td>'
          + '<span>1106</span>'
          + '<span>1117</span>'
          + '</td>'
          + '</tr>'
          + '</table>'
        );
      });

      after(remove);
    });
  });
};
