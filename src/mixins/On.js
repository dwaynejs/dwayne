import { noop } from '../utils';
import { Mixin } from '../Mixin';

class On extends Mixin {
  static evaluate = false;

  constructor(opts) {
    super(opts);

    if (this.args) {
      this.off = this.elem.on(this.args.join(','), () => {
        this.evaluate();
      });
    } else {
      this.off = noop;

      console.error('Provide "On" mixin with event name args (like "On(click)" or "On(keyup, keypress)")!');
    }
  }

  beforeRemove(isElementRemoved) {
    if (!isElementRemoved) {
      this.off();
    }
  }
}

export { On };
