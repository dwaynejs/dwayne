export function registerDItem(Block) {
  class DItem extends Block {
    static template = ''
      + '<d-elements'
      + '  value="{$$.argsChildren}"'
      + '  parentScope="{this}"'
      + '  parentTemplate="{$$.parentTemplate}"'
      + '/>';
  }

  return {
    name: '#d-item',
    value: DItem
  };
}
