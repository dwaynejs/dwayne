import { isFunction, isString } from '../helpers';

export function registerDNode(Mixin, createBlock, Block) {
  class DNode extends Mixin {
    static evaluate = false;

    constructor(opts) {
      super(opts);

      const {
        args,
        parentTemplate,
        node
      } = this;
      let scope = parentTemplate;
      let value = this.evaluateOnce();

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

  return {
    name: 'd-node',
    value: DNode
  };
}
