export function registerDBlock(Block) {
  class DBlock extends Block {
    static template = '<d-elements value="{elems}" />';

    afterConstruct() {
      this.watch('args.children', () => {
        const {
          parentScope: { children },
          dBlockName
        } = this.$$;
        const {
          children: argsChildren
        } = this.args;
        const eventualChildren = argsChildren || children;
        let found;

        if (dBlockName) {
          found = children.find(({ name: nodeName }) => nodeName === `d-block-${ dBlockName }`);

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
