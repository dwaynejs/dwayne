import { D, Block } from '../../lib/browser';
import template from './index.pug';

class App extends Block {
  static template = template();

  a = 1;

  constructor(opts) {
    super(opts);

    this.global.b = 1;
  }

  afterConstruct() {
    const clear = D(500).interval(() => {
      if (this.a > 5) {
        return clear();
      }

      this.a++;
      this.global.b++;
    });

    this.watch('a', 'global.b', () => {
      console.log(this.a, this.global.b);
    });
  }
}

Block.register('App', App);
