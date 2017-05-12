import { strictEqual } from 'assert';
import { Block, doc, initApp, removeApp, Each } from '../../src';

let app;
let block;
const container = doc.create('div');
const remove = () => {
  removeApp(container);

  app = null;
  block = null;
};
const sameUID = (item) => item;

sameUID.toString = () => '(item) => item';

class EachSimple extends Block {
  static html = html`
    <Each set="{[2, 1, 0]}">
      <b id="{'item-' + $index}">
        {'' + $index + $item}
      </b>
    </Each>
  `;
}

class EachObject extends Block {
  static html = html`
    <div>
      <Each set="{{ a: 1, b: 2, c: 3 }}">
        <b id="{'item-' + $index}">
          {$index + $item}
        </b>
      </Each>
    </div>
  `;
}

class EachScope extends Block {
  static html = html`
    <Each set="{numbers}">
      <b id="{'item-' + $index}">
        {$item.number + is + $item.caption}
      </b>
    </Each>
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

class EachChangingSet extends Block {
  static html = html`
    <Each set="{people}">
      <b>{$item.name}</b>
    </Each>
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

class EachUID extends Block {
  static html = html`
    <Each set="{args.people}" uid="{(item) => item.id}">
      <b>{$item.name}</b>
    </Each>
  `;

  afterRender() {
    block = this;
  }
}

class EachUIDApp extends Block {
  static html = html`
    <i>People</i>
    <EachUID people="{people}"/>
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

class EachSameUID extends Block {
  static html = [{
    type: Each,
    args: {
      set: [2, 2, 3],
      uid: () => sameUID
    },
    children: [{
      type: 'b',
      children: [{
        type: '#text',
        value: ($) => $.$item
      }]
    }]
  }];
}

class EachArgs extends Block {
  static html = html`
    <i>People</i>
    <Each
      set="{people}"
      item="person"
      index="index"
      uid="{(person) => person.id}"
      filterBy="{({ age }) => age < 30}"
      sortBy="{({ age: age1 }, { age: age2 }) => age1 > age2 ? -1 : age1 < age2 ? 1 : 0}"
    >
      <b>{index + ': ' + person.name}</b>
    </Each>
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

class EachNested extends Block {
  static html = html`
    <table>
      <Each set="{table}" item="row" index="y">
        <tr>
          <Each set="{row}" item="col" index="x">
            <td>{y + ' * ' + x + ' = ' + y*x + ' = ' + col}</td>
          </Each>
        </tr>
      </Each>
    </table>
  `;

  table = [
    [0, 0, 0],
    [0, 1, 2],
    [0, 2, 4]
  ];
}

class EachDoubleNested extends Block {
  static html = html`
    <table>
      <Each set="{table}" item="row" index="a">
        <tr>
          <Each set="{row}" item="col" index="b">
            <td>
              <Each set="{col}" item="val" index="c">
                <span>{'' + a + b + c + val}</span>
              </Each>
            </td>
          </Each>
        </tr>
      </Each>
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

export default () => {
  describe('Each', () => {
    describe('simple test', () => {
      before(() => {
        initApp(EachSimple, container);
      });

      it('should render caption using variables from the Each scope', () => {
        strictEqual(container.html(), '<b id="item-0">02</b><b id="item-1">11</b><b id="item-2">20</b>');
      });

      after(remove);
    });
    describe('object test', () => {
      before(() => {
        initApp(EachObject, container);
      });

      it('should render caption using variables from the Each scope', () => {
        strictEqual(container.html(), '<div><b id="item-a">a1</b><b id="item-b">b2</b><b id="item-c">c3</b></div>');
      });

      after(remove);
    });
    describe('scope test', () => {
      before(() => {
        initApp(EachScope, container);
      });

      it('should render caption using variables from the Each scope and the parent scope', () => {
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
        initApp(EachChangingSet, container);
      });

      it('should render captions using variables from the Each scope', () => {
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
        initApp(EachUIDApp, container);
      });

      let john;
      let michael;

      it('should render captions using variables from the Each scope', () => {
        john = container.children()[2];
        michael = container.children()[3];

        strictEqual(container.html(), '<i>People</i><b>Bill</b><b>John</b><b>Michael</b>');
      });
      it('should not re-render captions which don\'t change when the set changes', () => {
        app.people = [
          app.people[2],
          app.people[1]
        ];

        strictEqual(container.html(), '<i>People</i><b>Michael</b><b>John</b>');
        strictEqual(container.children()[1], michael);
        strictEqual(container.children()[2], john);
      });

      after(remove);
    });
    describe('same uid test', () => {
      const oldConsoleError = console.error;

      it('should log an error when UIDs are same', (done) => {
        const container = doc.create('div');

        console.error = (message) => {
          try {
            strictEqual(message, `UIDs can't be same for multiple items! In UID function: "${ sameUID.toString() }"`);

            setTimeout(() => {
              try {
                strictEqual(container.html(), '<b>2</b><b>3</b>');

                done();
              } catch (err) {
                done(err);
              }
            }, 0);
          } catch (err) {
            done(err);
          }
        };

        initApp(EachSameUID, container);
      });

      after(() => {
        console.error = oldConsoleError;
      });
    });
    describe('args test', () => {
      let michael;
      let john;
      let mary;

      before(() => {
        initApp(EachArgs, container);
      });

      it('should render captions using redefined variables from the Each scope', () => {
        const children = container.children().slice(1);

        michael = children[0];
        john = children[1];
        mary = children[2];

        strictEqual(container.html(), '<i>People</i><b>0: Michael</b><b>1: John</b><b>2: Mary</b>');
        strictEqual(michael.outerHTML, '<b>0: Michael</b>');
        strictEqual(john.outerHTML, '<b>1: John</b>');
        strictEqual(mary.outerHTML, '<b>2: Mary</b>');
      });
      it('should move captions using redefined variables from the Each scope', () => {
        app.people[3] = {
          ...app.people[3],
          age: 29.5
        };
        app.people[1] = {
          ...app.people[1],
          age: 29.25
        };

        app.people = app.people.slice();

        const children = container.children().slice(1);

        strictEqual(container.html(), '<i>People</i><b>0: Mary</b><b>1: John</b><b>2: Michael</b>');
        strictEqual(children[0], mary);
        strictEqual(children[1], john);
        strictEqual(children[2], michael);
        strictEqual(michael.outerHTML, '<b>2: Michael</b>');
        strictEqual(john.outerHTML, '<b>1: John</b>');
        strictEqual(mary.outerHTML, '<b>0: Mary</b>');
      });
      it('should move captions again using redefined variables from the Each scope', () => {
        app.people[3] = {
          ...app.people[3],
          age: 21
        };

        app.people = app.people.slice();

        const children = container.children().slice(1);

        strictEqual(container.html(), '<i>People</i><b>0: John</b><b>1: Michael</b><b>2: Mary</b>');
        strictEqual(children[0], john);
        strictEqual(children[1], michael);
        strictEqual(children[2], mary);
        strictEqual(michael.outerHTML, '<b>1: Michael</b>');
        strictEqual(john.outerHTML, '<b>0: John</b>');
        strictEqual(mary.outerHTML, '<b>2: Mary</b>');
      });

      after(remove);
    });
    describe('nested test', () => {
      before(() => {
        initApp(EachNested, container);
      });

      it('should render captions using variables from both Each scopes', () => {
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
        initApp(EachDoubleNested, container);
      });

      it('should render captions using variables from all three Each scopes', () => {
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
