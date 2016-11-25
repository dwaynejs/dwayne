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

      this.off = this.elem.on(this.match[0], value);
    }
  }

  return {
    name: 'd-bind',
    value: DBind
  };
}
