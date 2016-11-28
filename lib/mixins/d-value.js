import { Arr } from '../Arr';
import { switcher } from '../Switcher';
import { isArray, isNil } from '../helpers';

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
const setValueSwitcher = switcher('strictEquals', (value) => value)
  .case('input', (value, type, inputValue) => {
    if (type !== 'radio' && type !== 'checkbox') {
      return value;
    }

    if (type === 'radio') {
      return value === inputValue;
    }

    return value.indexOf(inputValue) !== -1;
  });
const getValueSwitcher = switcher('strictEquals', (value) => value)
  .case('input', (value, type, inputValue, values) => {
    if (type !== 'radio' && type !== 'checkbox') {
      return value;
    }

    if (type === 'radio') {
      return value
        ? inputValue
        : null;
    }

    if (value) {
      if (values) {
        return values.indexOf(inputValue) === -1
          ? new Arr(values).concat(inputValue).$
          : values;
      }

      return [inputValue];
    }

    if (!isArray(values)) {
      return [];
    }

    const index = values.indexOf(inputValue);

    if (index !== -1) {
      return [
        ...new Arr(values).slice(0, index).$,
        ...new Arr(values).slice(index + 1).$
      ];
    }

    return values;
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
      this.type = type;

      const initialScopeValue = parent.$$.evaluate(`{${ _value }}`, (newValue) => {
        this.setProp(newValue);
      }, this);
      const initialElemValue = this.getProp(initialScopeValue);

      if (isNil(initialScopeValue) || type === 'checkbox') {
        parent[_value] = initialElemValue;
      } else {
        this.setProp(initialScopeValue);
      }

      elem.on(listenerSwitcher(elem.name, [type]), (e) => {
        if (e.target === elem.$[0]) {
          parent[_value] = this.getProp(parent[_value]);
        }
      });
    }

    setProp(value) {
      const {
        elem,
        prop,
        type
      } = this;

      if (prop === 'text') {
        elem.text(value);
      } else {
        elem.prop(prop, setValueSwitcher(elem.name, [value, type, elem.$[0].value]));
      }
    }

    getProp(values) {
      const {
        elem,
        prop,
        type
      } = this;

      return prop === 'text'
        ? elem.text()
        : getValueSwitcher(elem.name, [elem.prop(prop), type, elem.$[0].value, values]);
    }
  }

  return {
    name: 'd-value',
    value: DValue
  };
}
