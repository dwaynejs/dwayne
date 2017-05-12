import { findInArray } from '../utils';
import { Block } from '../Block';
import { Elements } from './Elements';

class Children extends Block {
  static html = html`
    <Elements
      value="{elems}"
      parentScope="{$$.parentTemplate.$$.parentScope}"
      parentTemplate="{$$.parentTemplate.$$.parentTemplate}"
    />
  `;

  constructor(opts) {
    super(opts);

    const {
      parentTemplate: {
        $$: { htmlChildren }
      }
    } = this.$$;
    const { name } = this.args;
    let found;

    if (name) {
      found = findInArray(htmlChildren, ({ type, args }) => (
        type === Children
        && args
        && args.name === name
      ));

      this.elems = found
        ? found.value.children
        : null;
    } else {
      this.elems = htmlChildren;
    }
  }
}

export { Children };

