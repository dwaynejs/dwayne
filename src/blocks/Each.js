import {
  iterateArray, iterateObject,
  isArray, isFunction, create
} from '../utils';
import { remove, createBlock } from '../helpers/Block';
import { Block } from '../Block';
import Item from './Item';

const watchArgs = js`[
  args.set,
  args.filterBy,
  args.sortBy
]`;

class Each extends Block {
  static args = {
    uid: {
      default(item, index) {
        return index;
      }
    }
  };

  constructor(opts) {
    super(opts);

    const {
      args: {
        item = '$item',
        index = '$index'
      }
    } = this;

    this.itemName = item;
    this.indexName = index;
    this.itemsByUIDs = create(null);
  }

  afterConstruct() {
    this.renderSet(
      this.evaluate(watchArgs, this.renderSet)
    );
  }

  renderSet = (args) => {
    let set = args[0];
    let filterBy = args[1];
    const sortBy = args[2];

    const {
      htmlChildren,
      parentScope,
      parentElem,
      parentTemplate
    } = this.$$;
    const {
      args: {
        uid: UID
      },
      itemsByUIDs,
      itemName,
      indexName
    } = this;
    const newItemsByUIDs = create(null);
    const newUIDsByIndexes = create(null);
    const newUIDs = create(null);
    const isArr = isArray(set);
    const iterate = isArr
      ? iterateArray
      : iterateObject;

    if (isArr && isFunction(sortBy)) {
      set = set
        .slice()
        .sort(sortBy);
    }

    if (isFunction(filterBy)) {
      filterBy = [filterBy];
    }

    if (isArray(filterBy)) {
      iterateArray(filterBy, (filter) => {
        set = set.filter(filter);
      });
    }

    iterate(set, (item, index) => {
      const uid = UID(item, index, set, parentScope);

      if (uid in newUIDsByIndexes) {
        console.error(`UIDs can't be same for multiple items! In UID function: "${ UID.original || UID }"`);
      }

      newUIDsByIndexes[uid] = index;
      newUIDs[index] = uid;
    });

    iterateObject(itemsByUIDs, (block, uid) => {
      if (!(uid in newUIDsByIndexes)) {
        remove(block);
      }
    });

    let prevBlock;

    iterate(set, (item, index) => {
      const uid = newUIDs[index];
      let block;

      if (newUIDsByIndexes[uid] !== index) {
        return;
      }

      const prevUIDBlock = itemsByUIDs[uid];

      if (prevUIDBlock) {
        block = prevUIDBlock;
        block.$$.scope[indexName] = index;
        block.$$.scope[itemName] = item;

        if (block.$$.prevBlock !== prevBlock) {
          const { content } = block.$$;

          if (prevBlock) {
            prevBlock.$$.insertAfterIt(content, true);
          } else {
            this.$$.insertInStartOfIt(content, true);
          }
        }
      } else {
        block = createBlock({
          node: {
            type: Item,
            itemName,
            indexName,
            item,
            index,
            children: htmlChildren
          },
          parent: this,
          parentElem,
          parentBlock: this,
          parentScope,
          parentTemplate,
          prevBlock
        });
      }

      newItemsByUIDs[uid] = block;
      block.$$.prevBlock = prevBlock;
      prevBlock = block;
    });

    this.itemsByUIDs = newItemsByUIDs;
  };
}

export { Each };
