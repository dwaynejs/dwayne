import { Mixin } from '../Mixin';

class Show extends Mixin {
  afterUpdate(value) {
    const { elem } = this;

    if (value) {
      elem.show();
    } else {
      elem.hide();
    }
  }

  beforeRemove(isElementRemoved) {
    if (!isElementRemoved) {
      this.elem.show();
    }
  }
}

export { Show };
