import { Block } from '../Block';
import { blocks } from '../constants';
import { Elements } from './Elements';

const watchArgs = js`args.type`;

class DynamicBlock extends Block {
  static html = html`
    <Elements
      value="{elems}"
      parentScope="{$$.parentScope}"
      parentTemplate="{$$.parentTemplate}"
    />
  `;

  afterConstruct() {
    this.construct(
      this.evaluate(watchArgs, this.construct)
    );
  }

  construct = (type) => {
    const {
      htmlChildren,
      DynamicBlockArgs
    } = this.$$;

    this.elems = [{
      type,
      args: DynamicBlockArgs,
      children: htmlChildren
    }];
  };
}

blocks.DynamicBlock = DynamicBlock;

export { DynamicBlock };
