import { Arr } from '../Arr';
import { Super } from '../Super';

export function registerDSwitch(Block) {
  class DSwitch extends Block {
    static template = '<d-elements value="{elems}"/>';

    index = Infinity;
    elems = null;

    constructor(opts) {
      super(opts);

      const {
        args,
        args: { value }
      } = this;
      let wasDefault;

      this.values = this.children.object((values, child, i) => {
        const {
          name,
          attrs,
          children
        } = child;

        if (wasDefault) {
          return;
        }

        if (name !== 'd-case' && name !== 'd-default') {
          return;
        }

        if (name === 'd-default') {
          wasDefault = true;
        }

        let val;

        if (name === 'd-default') {
          val = args.value;
        } else {
          val = this.evaluateAndWatch(attrs.if || '{undefined}', (newValue) => {
            if (this.equals(this.values.$[i].value, newValue)) {
              return;
            }

            this.values.$[i].value = newValue;

            if (i > this.index) {
              return;
            }

            if (i < this.index) {
              this.index = i;
              this.elems = children;

              return;
            }

            const found = this.values.find(({ value }) => (
              this.equals(value, args.value)
            ));

            if (found) {
              this.index = found.key;
              this.elems = found.value.children;
            } else {
              this.index = Infinity;
              this.elems = null;
            }
          });
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
      }, new Arr([]));
    }

    afterConstruct() {
      this.watchArgs('value', (newValue) => {
        this.index = Infinity;
        this.values.forEach(({ name, value, children }, i) => {
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
      return new Super(value1).equals(value2);
    }
  }

  return {
    name: 'd-switch',
    value: DSwitch
  };
}
