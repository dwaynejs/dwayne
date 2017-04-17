import { collectFromArray, findInArray, iterateArray } from '../utils';

const watchArgs = js`args.value`;

export function registerDSwitch(Block) {
  class DSwitch extends Block {
    static template = html`
      <d-elements
        value="{elems}"
        parentScope="{$$.parentScope}"
        parentTemplate="{$$.parentTemplate}"
      />
    `;

    index = Infinity;

    constructor(opts) {
      super(opts);

      const {
        $$: {
          htmlChildren,
          parentScope
        },
        args,
        args: { value }
      } = this;
      let wasDefault;

      this.values = collectFromArray(htmlChildren, (values, child, i) => {
        const {
          name,
          attrs,
          children
        } = child;
        let val = attrs.if;

        if (wasDefault) {
          return;
        }

        if (name !== 'd-case' && name !== 'd-default') {
          return;
        }

        if (name === 'd-default') {
          wasDefault = true;
        }

        if (name === 'd-default') {
          val = value;
        } else if (val) {
          val = parentScope.$$.evaluate(val, (newValue) => {
            if (this.equals(this.values[i].value, newValue)) {
              return;
            }

            this.values[i].value = newValue;

            if (i > this.index) {
              return;
            }

            if (i < this.index) {
              this.index = i;
              this.elems = children;

              return;
            }

            const found = findInArray(this.values, ({ value }) => (
              this.equals(value, args.value)
            ));

            if (found) {
              this.index = found.key;
              this.elems = found.value.children;
            } else {
              this.index = Infinity;
              this.elems = null;
            }
          }, this);
        } else {
          val = undefined;
        }

        if (this.equals(val, value) && this.index === Infinity) {
          this.index = i;
          this.elems = children;
        }

        values.push({
          name,
          children,
          value: val
        });
      }, []);
    }

    afterConstruct() {
      this.evaluate(watchArgs, () => {
        const {
          value: newValue
        } = this.args;

        this.index = Infinity;

        iterateArray(this.values, ({ name, value, children }, i) => {
          const val = name === 'd-default'
            ? newValue
            : value;

          if (this.equals(val, newValue) && this.index === Infinity) {
            this.index = i;
            this.elems = children;
          }
        });

        if (this.index === Infinity) {
          this.elems = null;
        }
      });
    }

    equals(value1, value2) {
      return value1 === value2;
    }
  }

  return {
    name: 'd-switch',
    value: DSwitch
  };
}
