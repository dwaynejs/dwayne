import {
  isFunction, isNil,
  collectFromArray
} from '../utils';
import { Block } from '../Block';
import { Mixin } from '../Mixin';
import { rootMixins } from '../constants';

rootMixins['d-value'] = class DValue extends Mixin {
  static evaluate = false;

  constructor(opts) {
    super(opts);

    const {
      args,
      parentTemplate,
      elem
    } = this;
    const name = elem.name();
    const type = elem.prop('type');
    const value = this.evaluate();
    let initialScopeValue = null;

    this.prop = getProp(name, type, elem);
    this.name = name;
    this.type = type;
    this.value = value;
    this.options = elem.find('option');
    this.scope = parentTemplate;

    if (args) {
      this.scope = value instanceof Block
        ? value
        : parentTemplate;
      this.value = args[0];
    }

    if (!isFunction(this.value)) {
      initialScopeValue = this.scope.$$.evaluate((scope) => scope[this.value], (newValue) => {
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
      this.currentValue = this.getProp(this.currentValue, false);
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

    this.offElemListener = elem.on(getListenerName(name, type), changeScope);
    this.offFormListener = elem.closest('form').on('reset', () => {
      setTimeout(changeScope, 0);
    });
  }

  changeScope() {
    const {
      scope,
      value,
      currentValue
    } = this;

    if (isFunction(value)) {
      value(currentValue);
    } else {
      scope[value] = currentValue;
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
      elem.prop(prop, getValueForSetting(name, value, type, node.value));
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
      : getValueForGetting(name, elem.prop(prop), type, node.value, values, options, init, prop === 'multiple-select');
  }

  beforeRemove() {
    this.offElemListener();
    this.offFormListener();
  }
};

function getProp(name, type, elem) {
  switch (name) {
    case 'select': {
      return elem.hasAttr('multiple')
        ? 'multiple-select'
        : 'value';
    }

    case 'input': {
      if (type === 'file') {
        return 'files';
      }

      return type === 'radio' || type === 'checkbox'
        ? 'checked'
        : 'value';
    }

    default: {
      return elem.hasAttr('contentEditable')
        ? 'text'
        : 'value';
    }
  }
}

function getValueForSetting(name, value, type, inputValue) {
  if (name !== 'input') {
    return value;
  }

  const isRadio = type === 'radio';

  if (!isRadio && type !== 'checkbox') {
    return value;
  }

  return isRadio
    ? value === inputValue
    : value.indexOf(inputValue) !== -1;
}

function getValueForGetting(name, value, type, inputValue, values, options, init, isMultiple) {
  switch (name) {
    case 'select': {
      if (!isMultiple) {
        return value;
      }

      return collectFromArray(options, addValue, []);
    }

    case 'input': {
      if (type !== 'radio' && type !== 'checkbox') {
        return value;
      }

      if (type === 'radio') {
        return value
          ? inputValue
          : null;
      }

      values = values || [];

      if (!value && init) {
        return values;
      }

      if (value) {
        return values.indexOf(inputValue) === -1
          ? values.concat(inputValue)
          : values;
      }

      const index = values.indexOf(inputValue);

      if (index !== -1) {
        return [
          ...values.slice(0, index),
          ...values.slice(index + 1)
        ];
      }

      return values;
    }

    default: {
      return value;
    }
  }
}

function getListenerName(name, type) {
  switch (name) {
    case 'select': {
      return 'change';
    }

    case 'input': {
      return (
        type === 'radio'
        || type === 'checkbox'
        || type === 'color'
        || type === 'file'
      )
        ? 'change'
        : 'change input';
    }

    default: {
      return 'input';
    }
  }
}

function addValue(values, { selected, value }) {
  if (selected && values.indexOf(value) === -1) {
    values.push(value);
  }
}
