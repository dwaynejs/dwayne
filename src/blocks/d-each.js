import {
  assign, iterateArray, iterateObject,
  isArray, isFunction
} from '../utils';
import { remove, createBlock } from '../helpers/Block';
import { Block } from '../Block';
import { rootBlocks } from '../constants';
import { DItem } from './d-item';

const watchArgs = js`[
  args.set,
  args.filterBy,
  args.sortBy
]`;

rootBlocks['d-each'] = class DEach extends Block {
  static defaultArgs = {
    uid(item, index) {
      return index;
    }
  };

  constructor(opts) {
    super(opts);

    const {
      args: {
        item: itemName = '$item',
        index: indexName = '$index'
      }
    } = this;

    assign(this.$$, {
      itemsByUIDs: {},
      itemName,
      indexName
    });
  }

  afterConstruct() {
    this.evaluate(watchArgs, this.renderSet);
    this.renderSet();
  }

  renderSet = () => {
    const {
      htmlChildren,
      itemsByUIDs,
      parentScope,
      parentElem,
      parentTemplate,
      itemName,
      indexName
    } = this.$$;
    const {
      args: {
        sortBy,
        uid: UID
      }
    } = this;
    const newItemsByUIDs = {};
    const newUIDsCounter = {};
    const newUIDs = {};
    let {
      set,
      filterBy
    } = this.args;
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

      newUIDsCounter[uid] = (newUIDsCounter[uid] || 0) + 1;
      newUIDs[index] = uid;
    });

    iterateObject(itemsByUIDs, (items, uid) => {
      if (!newUIDsCounter[uid]) {
        iterateArray(items, remove);

        return;
      }

      iterateArray(items.splice(newUIDsCounter[uid]), remove);
    });

    let prevBlock;

    iterate(set, (item, index) => {
      const uid = newUIDs[index];
      let block;

      if (itemsByUIDs[uid] && itemsByUIDs[uid].length) {
        block = itemsByUIDs[uid].shift();
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
            itemName,
            indexName,
            item,
            index,
            name: '#d-item',
            Constructor: DItem,
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

      (newItemsByUIDs[uid] = newItemsByUIDs[uid] || []).push(block);
      block.$$.prevBlock = prevBlock;
      prevBlock = block;
    });

    this.$$.itemsByUIDs = newItemsByUIDs;
  };
};
