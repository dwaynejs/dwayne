export function registerDItem(Block) {
  class DItem extends Block {
    static template = html`
      <d-elements
        value="{$$.htmlChildren}"
        parentScope="{this}"
        parentTemplate="{$$.parentTemplate}"
      />
    `;
  }

  return {
    name: '#d-item',
    value: DItem
  };
}
