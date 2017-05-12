import { Block } from '../Block';
import { Elements } from './Elements';

const watchArgs = js`args.if`;

class If extends Block {
  static html = html`
    <Elements
      value="{elems}"
      parentScope="{$$.parentScope}"
      parentTemplate="{$$.parentTemplate}"
    />
  `;

  afterConstruct() {
    this.condition = false;
    this.constructElems(this.evaluate(watchArgs, this.constructElems));
  }

  constructElems = (condition) => {
    condition = !!condition;

    if (this.condition !== condition) {
      this.condition = condition;
      this.elems = condition
        ? this.$$.htmlChildren
        : null;
    }
  };
}

export { If };
