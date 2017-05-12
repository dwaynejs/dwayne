import { isFunction, isString } from '../utils';
import { Block } from '../Block';
import { Mixin } from '../Mixin';

class Elem extends Mixin {
  static evaluate = false;

  constructor(opts) {
    super(opts);

    const {
      args,
      parentTemplate,
      elem
    } = this;
    let scope = parentTemplate;
    let value = this.evaluate();

    if (args) {
      scope = value instanceof Block
        ? value
        : parentTemplate;
      value = args[0];
    }

    if (isFunction(value)) {
      value(elem);
    } else if (isString(value)) {
      scope[value] = elem;
    }
  }
}

export { Elem as ElemMixin };
