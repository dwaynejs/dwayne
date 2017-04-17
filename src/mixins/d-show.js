import { Mixin } from '../Mixin';
import { rootMixins } from '../constants';

rootMixins['d-show'] = class DShow extends Mixin {
  afterUpdate(value) {
    const { elem } = this;

    if (value) {
      elem.show();
    } else {
      elem.hide();
    }
  }

  beforeRemove() {
    this.elem.show();
  }
};
