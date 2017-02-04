import { switcher } from '../Switcher';
import { isFunction } from '../helpers';

const listenerSwitcher = switcher('strictEquals', 'input')
  .case('form', 'input, change')
  .case('select', 'change')
  .case('input', (type) => (
    type === 'radio'
    || type === 'checkbox'
    || type === 'color'
    || type === 'file'
      ? 'change'
      : 'change input'
  ));

export function registerDValidate(Mixin) {
  class DValidate extends Mixin {
    static evaluate = false;

    constructor(opts) {
      super(opts);

      const { elem } = this;
      const validator = this.value = this.evaluateOnce();

      if (isFunction(validator)) {
        elem.validate(validator);
      } else if (validator === true) {
        this.off = elem.on(listenerSwitcher(elem.name, [elem.prop('type')]), () => {
          elem.validate();
        });
      }
    }

    beforeRemove() {
      const { value } = this;

      if (isFunction(value)) {
        const { validators } = this.node.dwayneData;
        const index = validators.indexOf(value);

        if (index !== -1) {
          validators.splice(index, 1);
        }
      } else if (value === true) {
        this.off();
      }
    }
  }

  return {
    name: 'd-validate',
    value: DValidate
  };
}
