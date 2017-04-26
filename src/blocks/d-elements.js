import { iterateArray, removeArrayElem } from '../utils';
import { removeWithParentSignal, createBlock } from '../helpers/Block';
import { Block } from '../Block';
import { Elem } from '../Elem';
import { rootBlocks } from '../constants';

const watchArgs = js`args.value`;

rootBlocks['d-elements'] = class DElements extends Block {
  afterConstruct() {
    const { parentElem } = this.$$;
    const {
      parentScope,
      parentTemplate
    } = this.args;

    this.$$.evaluate(watchArgs, (value) => {
      const {
        children,
        mixins,
        parent,
        watchersToRemove,
        content
      } = this.$$;

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
};
