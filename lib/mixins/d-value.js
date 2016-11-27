import { switcher } from '../Switcher';
import { isNil } from '../helpers';

const propSwitcher = switcher('strictEquals', (type, elem) => (
  elem.hasAttr('contenteditable') || elem.hasAttr('contentEditable')
    ? 'text'
    : 'value'
))
  .case('input', (type) => {
    if (type === 'file') {
      return 'files';
    }

    return type === 'radio' || type === 'checkbox'
      ? 'checked'
      : 'value';
  });
const listenerSwitcher = switcher('strictEquals', 'input')
  .case('select', 'change')
  .case('input', (type) => (
    type === 'radio'
    || type === 'checkbox'
    || type === 'color'
    || type === 'file'
      ? 'change'
      : 'input'
  ));

export function registerDValue(Mixin) {
  class DValue extends Mixin {
    static evaluate = false;

    constructor(opts) {
      super(opts);

      const {
        $$: {
          _value,
          parent
        },
        elem
      } = this;
      const type = elem.prop('type');

      this.prop = propSwitcher(elem.name, [type, elem]);

      const initialScopeValue = parent.$$.evaluate(`{${ _value }}`, (newValue) => {
        this.setProp(newValue);
      }, this);
      const initialElemValue = this.getProp();

      if (isNil(initialScopeValue)) {
        parent[_value] = initialElemValue;
      } else {
        this.setProp(initialScopeValue);
      }

      elem.on(listenerSwitcher(elem.name, [type]), (e) => {
        if (e.target === elem.$[0]) {
          parent[_value] = this.getProp();
        }
      });
    }

    setProp(value) {
      const {
        elem,
        prop
      } = this;

      if (prop === 'text') {
        elem.text(value);
      } else {
        elem.prop(prop, value);
      }
    }

    getProp() {
      const {
        elem,
        prop
      } = this;

      return prop === 'text'
        ? elem.text()
        : elem.prop(prop);
    }
  }

  return {
    name: 'd-value',
    value: DValue
  };
}
