import { isFunction, isString } from '../utils';
import { Block } from '../Block';
import { Mixin } from '../Mixin';

class Node extends Mixin {
  static evaluate = false;

  constructor(opts) {
    super(opts);

    const {
      args,
      parentTemplate,
      node
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
      value(node);
    } else if (isString(value)) {
      scope[value] = node;
    }
  }
}

export { Node as NodeMixin };
