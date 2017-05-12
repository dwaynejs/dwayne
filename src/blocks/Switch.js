import { findInArray } from '../utils';
import { Block } from '../Block';
import { Elements } from './Elements';
import { Case } from './Case';

const watchArgs = js`[
  args.value,
  args.compareFn
]`;

class Switch extends Block {
  static html = html`
    <Elements
      value="{elems}"
      parentScope="{$$.parentScope}"
      parentTemplate="{$$.parentTemplate}"
    />
  `;
  static args = {
    default: {
      default: false
    },
    compareFn: {
      default(switchValue, caseValue) {
        return (
          switchValue === caseValue
          || (switchValue !== switchValue && caseValue !== caseValue)
        );
      }
    }
  };

  index = Infinity;

  constructor(opts) {
    super(opts);

    const {
      $$: {
        htmlChildren,
        parentScope
      },
      args: switchArgs,
      args: { value }
    } = this;
    let wasDefault = false;

    this.values = htmlChildren
      .filter(({ type, args }) => {
        if (type !== Case) {
          return;
        }

        if (wasDefault) {
          return;
        }

        if (args && args.default) {
          wasDefault = true;
        }

        return true;
      })
      .map((child, i) => {
        const {
          args = {},
          children
        } = child;
        let val;

        if (!args.default) {
          val = parentScope.$$.evaluate(args.when, (newValue) => {
            this.values[i].value = newValue;

            if (i > this.index) {
              return;
            }

            const found = findInArray(this.values, ({ args, value }) => (
              args.default
              || this.args.compareFn(switchArgs.value, value)
            ));

            this.index = found
              ? found.key
              : Infinity;
            this.elems = found
              ? found.value.children
              : null;
          }, this);
        }

        if (this.index === Infinity && (
          args.default
          || this.args.compareFn(value, val)
        )) {
          this.index = i;
          this.elems = children;
        }

        return {
          args,
          children,
          value: val
        };
      });
  }

  afterConstruct() {
    this.evaluate(watchArgs, (args) => {
      const newValue = args[0];
      const compareFn = args[1];

      this.index = Infinity;

      this.values.some(({ args, value, children }, i) => {
        if (
          args.default
          || compareFn(newValue, value)
        ) {
          this.index = i;
          this.elems = children;

          return true;
        }
      });

      if (this.index === Infinity) {
        this.elems = null;
      }
    });
  }
}

export { Switch };
