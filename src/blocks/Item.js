import { Block } from '../Block';
import { Elements } from './Elements';
import { blocks } from '../constants';

class Item extends Block {
  static html = html`
    <Elements
      value="{$$.htmlChildren}"
      parentScope="{this}"
      parentTemplate="{$$.parentTemplate}"
    />
  `;
}

blocks.Item = Item;

export default Item;
