import { Block } from '../Block';

const template = html`
  <d-elements
    value="{$$.htmlChildren}"
    parentScope="{this}"
    parentTemplate="{$$.parentTemplate}"
  />
`;

class DItem extends Block {
  static template = template;
}

export { DItem };
