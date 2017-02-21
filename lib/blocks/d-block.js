export function registerDBlock(Block) {
  class DBlock extends Block {
    static template = '<d-elements value="{elems}" parentScope="{ParentScope}" />';

    afterConstruct() {
      this.watch('args.children', () => {
        const {
          parentScope,
          parentScope: { children },
          dBlockName
        } = this.$$;
        const {
          parentScope: argsParentScope,
          children: argsChildren
        } = this.args;
        const {
          children: ownChildren
        } = this;
        const eventualChildren = argsChildren || children;
        let found;

        if (ownChildren.length) {
          return;
        }

        this.ParentScope = argsParentScope || parentScope.$$.parentScope;

        if (dBlockName) {
          found = children.find(({ name: nodeName }) => nodeName === `d-block:${ dBlockName }`);

          if (!found) {
            let parent = this;

            while (
              !found
              && (parent = parent.$$.parentScope)
              && (!parent.$$.parentScope || parent.$$.parentScope.$$.name !== '#d-item')
            ) {
              found = parent.$$.dBlocks.find(({ $$: { dBlockName: DBlockName } }) => DBlockName === dBlockName);
            }

            if (found) {
              this.ParentScope = parent;
            }
          }

          this.elems = found && found.value.children.length
            ? found.value.children
            : null;
        } else {
          this.elems = eventualChildren;
        }
      });
    }
  }

  return {
    name: 'd-block',
    value: DBlock
  };
}
