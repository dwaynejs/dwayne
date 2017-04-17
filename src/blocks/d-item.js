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
  static _vars = template.vars;
  static _html = template.value;
}

export { DItem };
