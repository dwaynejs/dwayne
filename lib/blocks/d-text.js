import { isNil } from '../helpers';

export function registerDText(Block) {
  class DText extends Block {
    static template = '<d-elements value="{[{ name: \'#text\', value: text }]}"/>';

    text = '';

    afterConstruct() {
      this.text = isNil(this.args.value) ? '' : this.args.value;

      this.watchArgs('value', (newValue) => {
        this.text = isNil(newValue) ? '' : newValue;
      });
    }
  }

  return {
    name: 'd-text',
    value: DText
  };
}
