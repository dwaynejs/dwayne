import { findInArray } from '../utils';

export function registerDIf(Block) {
  class DIf extends Block {
    static template = html`
      <d-elements
        value="{elems}"
        parentScope="{$$.parentScope}"
        parentTemplate="{$$.parentTemplate}"
      />
    `;

    constructor(opts) {
      super(opts);

      const {
        parentScope,
        argsChildren
      } = this.$$;
      let index = Infinity;
      const values = argsChildren.map((child, i) => {
        const {
          name,
          attrs = {},
          children
        } = child;
        let cond = attrs.if;

        if (name !== 'd-else' && cond) {
          cond = parentScope.$$.evaluate(cond, (newValue) => {
            if (!!newValue === values[i]) {
              return;
            }

            values[i] = !!newValue;

            if (i > index) {
              return;
            }

            if (i < index) {
              index = i;
              this.elems = children;

              return;
            }

            const found = findInArray(values, Boolean);

            if (found) {
              index = found.key;
              this.elems = argsChildren[found.key].children;
            } else {
              index = Infinity;
              this.elems = null;
            }
          }, this);
        } else {
          cond = true;
        }

        if (cond && index === Infinity) {
          index = i;
          this.elems = children;
        }

        return !!cond;
      });
    }
  }

  return {
    name: 'd-if',
    value: DIf
  };
}
