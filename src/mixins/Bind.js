import { isFunction, noop } from '../utils';
import { Mixin } from '../Mixin';

class Bind extends Mixin {
  off = noop;

  afterUpdate(value) {
    this.off();

    if (!isFunction(value)) {
      return;
    }

    if (this.args) {
      this.off = this.elem.on(this.args.join(','), value);
    } else {
      this.off = noop;

      console.error('Provide "Bind" mixin with event name args (like "Bind(click)" or "Bind(keyup, keypress)")!');
    }
  }

  beforeRemove(isElementRemoved) {
    if (!isElementRemoved) {
      this.off();
    }
  }
}

export { Bind };
