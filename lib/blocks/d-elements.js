import { Arr } from '../Arr';
import { Elem } from '../Elem';

export function registerDElements(Block, createBlock) {
  class DElements extends Block {
    afterConstruct() {
      const { parentElem } = this.$$;
      const {
        parentScope,
        parentTemplate
      } = this.args;
      let firstTime = true;

      this.watch('args.value', () => {
        if (firstTime) {
          firstTime = false;

          return;
        }

        const {
          children,
          mixins,
          parent,
          watchersToRemove,
          content
        } = this.$$;
        const { value } = this.args;

        children.forEach((child) => {
          child.$$.remove(true);
        });
        mixins.forEach((mixin) => {
          mixin.$$.remove(true);
        });
        content.remove();

        if (parent instanceof Block) {
          parent.$$.removeContent(content);
        }

        this.$$.children = new Arr([]);
        this.$$.mixins = new Arr([]);
        this.$$.watchersToRemove = watchersToRemove.filter(({ watchers, watcher, forDElements }) => {
          if (forDElements) {
            return true;
          }

          const index = watchers.indexOf(watcher);

          if (index !== -1) {
            watchers.splice(index, 1);
          }
        });
        this.$$.content = new Elem();

        let prevBlock;

        new Arr(value || []).forEach((child) => {
          prevBlock = createBlock({
            node: child,
            parent: this,
            parentElem,
            parentBlock: this,
            parentScope,
            parentTemplate,
            prevBlock
          });
        });
      });
    }
  }

  return {
    name: 'd-elements',
    value: DElements
  };
}
