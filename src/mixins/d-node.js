import { isFunction, isString } from '../utils';
import { Block } from '../Block';
import { Mixin } from '../Mixin';
import { rootMixins } from '../constants';

rootMixins['d-node'] = class DNode extends Mixin {
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
};
