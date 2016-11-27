export function registerDItem(Block) {
  class DItem extends Block {
    static template = '<d-elements value="{children}"/>';
  }

  return {
    name: '#d-item',
    value: DItem
  };
}
