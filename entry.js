import { Block, initApp, find, isNil } from './dwayne';
import AppTemplate from './templates/App.pug';
import Block1Template from './templates/Block1.pug';
import Block2Template from './templates/Block2.pug';

class Block1 extends Block {
  static template = Block1Template();
  static defaultArgs = {
    value: 'no caption'
  };
}

let id = 0;

console.cond = (cond, ...args) => {
  if (cond) {
    console.log(...args);
  }
};

class App extends Block {
  static template = AppTemplate();

  newTodo = null;
  todos = [];

  addTodo() {
    this.todos = [
      ...this.todos,
      {
        id: ++id,
        finished: false,
        message: this.newTodo
      }
    ];
    this.newTodo = '';
  }

  findIndexByID(id) {
    return this.todos.findIndex(({ id: ID }) => id === ID);
  }

  toggleTodo(id) {
    const index = this.findIndexByID(id);

    this.todos = [
      ...this.todos.slice(0, index),
      {
        ...this.todos[index],
        finished: !this.todos[index].finished
      },
      ...this.todos.slice(index + 1)
    ];
  }

  removeTodo(id) {
    const index = this.findIndexByID(id);

    this.todos = [
      ...this.todos.slice(0, index),
      ...this.todos.slice(index + 1)
    ];
  }

  sortUp() {
    this.sortFunction = ({ message: m1 }, { message: m2 }) => (
      /* eslint no-nested-ternary: 0 */
      m1 > m2
        ? 1
        : m2 > m1
          ? -1
          : 0
    );
  }

  sortDown() {
    this.sortFunction = ({ message: m1 }, { message: m2 }) => (
      m2 > m1
        ? 1
        : m1 > m2
          ? -1
          : 0
    );
  }
}

class Link extends Block {
  static template = '<a href="{route}" d-class#inherited="{cls}" d-class(active)="{active}" d-rest="{rest}"><d-block/></a>';

  afterConstruct() {
    this.watch('args', () => {
      const {
        class: cls,
        route,
        active,
        ...rest
      } = this.args;

      this.cls = cls;
      this.route = route;
      this.active = active;
      this.rest = rest;
    });
  }
}

Block.block('App', App);
Block.block('Block1', Block1);
Block.block('Block2', Block2Template());
Block.block('Link', Link);
Block.mixin('html', (newValue, oldValue, mixin) => {
  mixin.elem.html(isNil(newValue) ? '' : `${ newValue }`);
});
initApp('App', find('.root'));
