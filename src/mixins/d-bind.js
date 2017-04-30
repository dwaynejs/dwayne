import { isFunction, noop } from '../utils';
import { Mixin } from '../Mixin';
import { rootMixins } from '../constants';

rootMixins['d-bind'] = class DBind extends Mixin {
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

      console.error('Provide "d-bind" mixin with an event names (like "d-bind(click)" or "d-bind(keyup, keypress)")!');
    }
  }

  beforeRemove(isElementRemoved) {
    if (!isElementRemoved) {
      this.off();
    }
  }
};
