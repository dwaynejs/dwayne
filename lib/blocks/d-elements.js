import { Arr } from '../Arr';
import { Elem } from '../Elem';

export function registerDElements(Block, createBlock) {
  class DElements extends Block {
    afterConstruct() {
      this.watchArgs('value', (value) => {
        const {
          children,
          mixins,
          watchersToRemove,
          elems: {
            start,
            content,
            parent
          }
        } = this.$$;
        let after = start;

        children.forEach((child) => {
          child.remove(true);
        });
        mixins.forEach((mixin) => {
          mixin.remove(true);
        });
        content.remove();

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

        const newContent = new Elem();

        new Arr(value || []).forEach((child) => {
          const block = createBlock({
            node: child,
            after,
            parent,
            parentBlock: this,
            parentScope: this
          });

          if (block instanceof Block) {
            const { elems } = block.$$;

            after = elems.end;

            newContent.add(elems.start, elems.content, elems.end);
          } else {
            after = block;

            newContent.add(block);
          }
        });

        this.$$.elems.content = newContent;
      });
    }
  }

  return {
    name: 'd-elements',
    value: DElements
  };
}
