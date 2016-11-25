import { isNil } from '../helpers';

export function registerDText(Mixin) {
  class DText extends Mixin {
    afterUpdate(value) {
      this.elem.text(
        isNil(value)
          ? ''
          : `${ value }`
      );
    }
  }

  return {
    name: 'd-text',
    value: DText
  };
}
