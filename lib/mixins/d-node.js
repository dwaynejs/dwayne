import { isFunction, isString } from '../helpers';

export function registerDNode(Mixin) {
  class DNode extends Mixin {
    static evaluate = false;

    constructor(opts) {
      super(opts);

      const {
        parentScope,
        node
      } = this;
      const value = this.evaluateOnce();

      if (isFunction(value)) {
        value(node);
      } else if (isString(value)) {
        parentScope[value] = node;
      }
    }
  }

  return {
    name: 'd-node',
    value: DNode
  };
}
