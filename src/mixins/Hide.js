import { Mixin } from '../Mixin';

class Hide extends Mixin {
  afterUpdate(value) {
    const { elem } = this;

    if (value) {
      elem.hide();
    } else {
      elem.show();
    }
  }

  beforeRemove(isElementRemoved) {
    if (!isElementRemoved) {
      this.elem.show();
    }
  }
}

export { Hide };
