import { findInArray } from '../utils';
import { Block } from '../Block';
import { rootBlocks } from '../constants';

class DBlock extends Block {
  static template = html`
    <d-elements
      value="{elems}"
      parentScope="{ParentScope}"
      parentTemplate="{ParentTemplate}"
    />
  `;

  afterConstruct() {
    const {
      parentScope: {
        $$: {
          parentScope: parentParentScope,
          parentTemplate: parentParentTemplate,
          htmlChildren: children
        }
      },
      htmlChildren: ownChildren,
      parentTemplate,
      dBlockName: DBlockName
    } = this.$$;
    let found;

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
}

rootBlocks['d-block'] = DBlock;

export { DBlock };
