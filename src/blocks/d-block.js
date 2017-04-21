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
      dBlockName
    } = this.$$;
    let found;

    if (ownChildren.length) {
      return;
    }

    this.ParentScope = parentParentScope;
    this.ParentTemplate = parentParentTemplate;

    if (dBlockName) {
      found = findInArray(children, ({ name: nodeName }) => nodeName === `d-block:${ dBlockName }`);

      if (!found) {
        let parent = this;

        /* eslint no-empty: 0 */
        while (
        (parent = parent.$$.parentScope)
        && !(found = findInArray(parent.$$.dBlocks, ({ $$: { dBlockName: DBlockName } }) => DBlockName === dBlockName))
        && parent.$$.parentScope.$$.name === '#d-item'
          ) {}

        if (found) {
          this.ParentScope = parent;
          this.ParentTemplate = parentTemplate;
          found.value = {
            children: found.value.$$.htmlChildren
          };
        }
      }

      this.elems = found && found.value.children.length
        ? found.value.children
        : null;
    } else {
      this.elems = children;
    }
  }
}

rootBlocks['d-block'] = DBlock;

export { DBlock };
