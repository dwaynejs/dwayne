export function registerDBlock(Block) {
  class DBlock extends Block {
    static template = '<d-elements value="{elems}" />';

    elems = null;

    afterConstruct() {
      const { children } = this.$$.parent;
      const { name } = this.args;
      let found;

      if (name) {
        found = children.find(({ name: nodeName }) => nodeName === `d-block-${ name }`);

        if (found && found.value.children.length) {
          this.elems = found.value.children;
        }
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
