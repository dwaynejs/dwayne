import { findInArray } from '../utils';
import { Block } from '../Block';
import { rootBlocks } from '../constants';

const watchArgs = js`[
  args.value,
  args.compareFn
]`;

rootBlocks['d-switch'] = class DSwitch extends Block {
  static template = html`
    <d-elements
      value="{elems}"
      parentScope="{$$.parentScope}"
      parentTemplate="{$$.parentTemplate}"
    />
  `;
  static defaultArgs = {
    compareFn(switchValue, caseValue) {
      return (
        switchValue === caseValue
        || (switchValue !== switchValue && caseValue !== caseValue)
      );
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
      args,
      args: { value }
    } = this;

    this.values = htmlChildren.map((child, i) => {
      const {
        name,
        attrs = {},
        children
      } = child;
      let val;

      if (name !== 'd-default') {
        val = parentScope.$$.evaluate(attrs.if, (newValue) => {
          this.values[i].value = newValue;

          if (i > this.index) {
            return;
          }

          const found = findInArray(this.values, ({ name, value }) => (
            name === 'd-default'
            || this.args.compareFn(args.value, value)
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
        name === 'd-default'
        || this.args.compareFn(value, val)
      )) {
        this.index = i;
        this.elems = children;
      }

      return {
        name,
        children,
        value: val
      };
    });
  }

  afterConstruct() {
    this.evaluate(watchArgs, () => {
      const {
        value: newValue,
        compareFn
      } = this.args;

      this.index = Infinity;

      this.values.some(({ name, value, children }, i) => {
        if (
          name === 'd-default'
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
};
