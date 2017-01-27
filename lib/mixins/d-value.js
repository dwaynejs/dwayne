import { Arr } from '../Arr';
import { switcher } from '../Switcher';
import { isArray, isFunction, isNil } from '../helpers';

const propSwitcher = switcher('strictEquals', (type, elem) => (
  elem.hasAttr('contenteditable') || elem.hasAttr('contentEditable')
    ? 'text'
    : 'value'
))
  .case('select', (type, elem) => (
    elem.hasAttr('multiple')
      ? 'multiple-select'
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
  .case('select', (value, type, inputValue, values, elem, options) => {
    if (!elem.hasAttr('multiple')) {
      return value;
    }

    return options
      .object((values, { selected, value }) => {
        if (selected && values.indexOf(value) === -1) {
          values.push(value);
        }
      }, [])
      .$;
  })
  .case('input', (value, type, inputValue, values, elem, options, init) => {
    if (type !== 'radio' && type !== 'checkbox') {
      return value;
    }

    if (type === 'radio') {
      return value
        ? inputValue
        : null;
    }

    if (!value && init) {
      return values;
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
      : 'change input'
  ));

export function registerDValue(Mixin) {
  class DValue extends Mixin {
    static evaluate = false;

    constructor(opts) {
      super(opts);

      const {
        block,
        elem,
        node
      } = this;
      const name = elem.name;
      const type = elem.prop('type');
      const value = this.evaluateOnce();
      let initialScopeValue = null;

      this.prop = propSwitcher(name, [type, elem]);
      this.name = name;
      this.type = type;
      this.value = value;
      this.options = elem.find('option');

      if (!isFunction(value)) {
        initialScopeValue = block.$$.evaluate(`$.${ value }`, (newValue) => {
          if (this.currentValue !== newValue) {
            this.currentValue = newValue;
            this.setProp(newValue);
          }
        }, this);
      }

      const initialElemValue = this.getProp(initialScopeValue, true);
      const isInitialScopeValueNull = isNil(initialScopeValue);
      const isCheckbox = type === 'checkbox';
      const changeScope = () => {
        this.currentValue = this.getProp(this.currentValue);
        this.changeScope();
      };

      if (isInitialScopeValueNull || isCheckbox) {
        this.currentValue = initialElemValue;
        this.changeScope();

        if (!isInitialScopeValueNull && isCheckbox) {
          this.setProp(initialScopeValue);
        }
      } else {
        this.currentValue = initialScopeValue;
        this.setProp(initialScopeValue);
      }

      elem.on(listenerSwitcher(name, [type]), (e) => {
        if (e.target === node) {
          changeScope();
        }
      });
      elem.closest('form').on('reset', () => {
        setTimeout(changeScope, 0);
      });
    }

    changeScope() {
      const {
        block,
        value,
        currentValue
      } = this;

      if (isFunction(value)) {
        value(currentValue);
      } else {
        block[value] = currentValue;
      }
    }

    setProp(value) {
      const {
        elem,
        name,
        prop,
        type,
        node,
        options
      } = this;

      if (prop === 'text') {
        elem.text(value);
      } else if (prop === 'multiple-select') {
        options.forEach((option) => {
          option.selected = value.indexOf(option.value) !== -1;
        });
      } else {
        elem.prop(prop, setValueSwitcher(name, [value, type, node.value]));
      }
    }

    getProp(values, init) {
      const {
        elem,
        name,
        prop,
        type,
        node,
        options
      } = this;

      return prop === 'text'
        ? elem.text()
        : getValueSwitcher(name, [elem.prop(prop), type, node.value, values, elem, options, init]);
    }
  }

  return {
    name: 'd-value',
    value: DValue
  };
}
