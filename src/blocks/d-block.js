import { findInArray, isFunction } from '../utils';
import { Block } from '../Block';
import { rootBlocks } from '../constants';

const watchNameArgs = js`args.name`;
const watchConstructorArgs = js`args.Constructor`;

class DBlock extends Block {
  static template = html`
    <d-elements
      value="{elems}"
      parentScope="{ParentScope}"
      parentTemplate="{ParentTemplate}"
    />
  `;

  afterConstruct(opts) {
    const {
      parentScope: {
        $$: {
          parentScope: parentParentScope,
          parentTemplate: parentParentTemplate,
          htmlChildren: children
        }
      },
      htmlChildren: ownChildren,
      parentScope,
      parentTemplate,
      dBlockName: DBlockName
    } = this.$$;
    const {
      name,
      Constructor
    } = this.args;
    let found;

    this.ParentScope = parentScope;
    this.ParentTemplate = parentTemplate;

    if (name) {
      this.constructDynamicNameBlock(
        this.evaluate(watchNameArgs, this.constructDynamicNameBlock)
      );

      return;
    }

    if (Constructor) {
      this.constructDynamicConstructorBlock(
        this.evaluate(watchConstructorArgs, this.constructDynamicConstructorBlock)
      );

      return;
    }

    if (ownChildren.length) {
      parentTemplate.$$.dBlocks.push(this);

      return;
    }

    this.ParentScope = parentParentScope;
    this.ParentTemplate = parentParentTemplate;

    if (DBlockName) {
      found = findInArray(children, ({ name: nodeName }) => nodeName === `d-block:${ DBlockName }`);

      if (!found) {
        found = findInArray(parentTemplate.$$.dBlocks, ({ $$: { dBlockName } }) => dBlockName === DBlockName);

        if (found) {
          this.ParentScope = parentTemplate;
          this.ParentTemplate = parentTemplate;
          found.value = {
            children: found.value.$$.htmlChildren
          };
        }
      }

      this.elems = found
        ? found.value.children
        : null;
    } else {
      this.elems = children;
    }
  }

  constructDynamicNameBlock = (name) => {
    const {
      htmlChildren,
      dBlockArgs
    } = this.$$;

    this.elems = [{
      name,
      attrs: dBlockArgs,
      children: htmlChildren
    }];
  };

  constructDynamicConstructorBlock = (Constructor) => {
    if (!isFunction(Constructor)) {
      this.elems = null;

      return;
    }

    const {
      htmlChildren,
      dBlockArgs
    } = this.$$;

    this.elems = [{
      Constructor,
      attrs: dBlockArgs,
      children: htmlChildren
    }];
  };
}

rootBlocks['d-block'] = DBlock;

export { DBlock };
