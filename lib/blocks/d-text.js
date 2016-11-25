export function registerDText(Block) {
  class DText extends Block {
    static template = '<d-elements value="{[{ name: \'#text\', value: args.value}]}"/>';
  }

  return {
    name: 'd-text',
    value: DText
  };
}
