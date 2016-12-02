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
      : 'input'
  ));

export function registerDValidate(Mixin) {
  class DValidate extends Mixin {
    static evaluate = false;

    constructor(opts) {
      super(opts);

      const {
        elem,
        match
      } = this;
      const validator = this.evaluateOnce();

      if (isFunction(validator)) {
        elem.validate(validator);
      }

      if (validator === true && match === 'on-change' && elem.$$.dwayneData.validators.length === 1) {
        elem.on(listenerSwitcher(elem.name, [elem.prop('type')]), () => {
          elem.validate();
        });
      }
    }
  }

  return {
    name: 'd-validate',
    value: DValidate
  };
}
