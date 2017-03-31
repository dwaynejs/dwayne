export function registerDBlock(Block) {
  class DBlock extends Block {
    static template = ''
      + '<d-elements'
      + '  value="{elems}"'
      + '  parentScope="{ParentScope}"'
      + '  parentTemplate="{ParentTemplate}"'
      + '/>';

    afterConstruct() {
      const {
        parentScope: {
          $$: {
            parentScope: parentParentScope,
            parentTemplate: parentParentTemplate,
            argsChildren: children
          }
        },
        argsChildren: ownChildren,
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
        found = children.find(({ name: nodeName }) => nodeName === `d-block:${ dBlockName }`);

        if (!found) {
          let parent = this;

          /* eslint no-empty: 0 */
          while (
            (parent = parent.$$.parentScope)
            && !(found = parent.$$.dBlocks.find(({ $$: { dBlockName: DBlockName } }) => DBlockName === dBlockName))
            && parent.$$.parentScope.$$.name === '#d-item'
          ) {}

          if (found) {
            this.ParentScope = parent;
            this.ParentTemplate = parentTemplate;
            found.value = {
              children: found.value.$$.argsChildren
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

  return {
    name: 'd-block',
    value: DBlock
  };
}
