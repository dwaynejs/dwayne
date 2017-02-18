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

      if (this.match) {
        const event = this.match.match(/^[^\-]*/)[0];

        this.off = this.elem.on(event, value);
      } else {
        console.error('Provide "d-bind" mixin with an event name!');
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
