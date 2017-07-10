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

      if (this.args) {
        this.off = this.elem.on(this.args.join(','), value);
      } else {
        console.error('Provide "d-bind" mixin with an event names (like "d-bind(click)" or "d-bind(keyup, keypress)")!');
      }
    }

    beforeRemove() {
      const { off } = this;

      if (off) {
        off();
      }
    }
  }

  return {
    name: 'd-bind',
    value: DBind
  };
}