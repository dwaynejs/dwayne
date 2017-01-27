export function registerDBlock(Block) {
  class DBlock extends Block {
    static template = '<d-elements value="{elems}" />';

    afterConstruct() {
      const { children } = this.$$.parent;
      const {
        name,
        value: ownChildren
      } = this.args;
      const eventualChildren = ownChildren || children;
      let found;

      if (name) {
        found = eventualChildren.find(({ name: nodeName }) => nodeName === `d-block-${ name }`);

        if (found && found.value.children.length) {
          this.elems = found.value.children;
        }
      } else {
        this.elems = eventualChildren;
      }
    }
  }

  return {
    name: 'd-block',
    value: DBlock
  };
}
