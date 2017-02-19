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

      if (this.arg) {
        this.off = this.elem.on(this.arg, value);
      } else {
        console.error('Provide "d-bind" mixin with an event name (like "d-bind:click")!');
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
