import { isString } from '../helpers';

export function registerDElem(Mixin) {
  class DElem extends Mixin {
    afterUpdate(newValue, oldValue) {
      const { parent } = this.$$;

      if (newValue !== oldValue && isString(oldValue)) {
        delete parent[oldValue];
      }

      if (isString(newValue)) {
        parent[newValue] = this.elem;
      }
    }
  }

  return {
    name: 'd-elem',
    value: DElem
  };
}
