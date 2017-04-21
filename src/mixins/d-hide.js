import { Mixin } from '../Mixin';
import { rootMixins } from '../constants';

class DHide extends Mixin {
  afterUpdate(value) {
    const { elem } = this;

    if (value) {
      elem.hide();
    } else {
      elem.show();
    }
  }

  beforeRemove() {
    this.elem.show();
  }
}

rootMixins['d-hide'] = DHide;

export { DHide };
