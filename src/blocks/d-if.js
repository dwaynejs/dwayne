import { Block } from '../Block';
import { rootBlocks } from '../constants';

const watchArgs = js`args.if`;

rootBlocks['d-if'] = class DIf extends Block {
  static template = html`
    <d-elements
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
};
