import { Elem } from '../Elem';
import { iterateArray, removeArrayElem } from '../utils';

const watchArgs = js`args.value`;

export function registerDElements(Block, createBlock) {
  class DElements extends Block {
    afterConstruct() {
      const { parentElem } = this.$$;
      const {
        parentScope,
        parentTemplate
      } = this.args;

      this.$$.evaluate(watchArgs, () => {
        const {
          children,
          mixins,
          parent,
          watchersToRemove,
          content
        } = this.$$;
        const { value } = this.args;

        iterateArray(children, removeWithParentSignal);
        iterateArray(mixins, removeWithParentSignal);
        content.remove();

        if (parent instanceof Block) {
          parent.$$.removeContent(content);
        }

        this.$$.children = [];
        this.$$.mixins = [];
        this.$$.watchersToRemove = watchersToRemove.filter(({ watchers, watcher, forDElements }) => {
          if (forDElements) {
            return true;
          }

          removeArrayElem(watchers, watcher);
        });
        this.$$.content = new Elem();

        let prevBlock;

        iterateArray(value || [], (child) => {
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
      }, this, true);
    }
  }

  return {
    name: 'd-elements',
    value: DElements
  };
}

function removeWithParentSignal(item) {
  item.$$.remove(true);
}
