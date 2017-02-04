import { isFunction } from '../helpers';

export function registerDBind(Mixin) {
  class DBind extends Mixin {
    afterUpdate(value) {
      if (this.off) {
        this.off();
      }

      if (!isFunction(value)) {
        return;
      }

      this.off = this.elem.on(this.match, value);
    }

    beforeRemove() {
      const { off } = this;

      if (isFunction(off)) {
        off();
      }
    }
  }

  return {
    name: 'd-bind',
    value: DBind
  };
}
