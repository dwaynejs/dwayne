import {
  assign, iterateArray, iterateObject,
  isArray, isFunction
} from '../utils';

const watchArgs = js`[
  args.set,
  args.filterBy,
  args.sortBy
]`;

export function registerDEach(Block, createBlock) {
  class DEach extends Block {
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
        UID: this.args.uid || undefined,
        itemName,
        indexName
      });
    }

    afterRender() {
      this.evaluateAndWatch(watchArgs, this.renderSet);
      this.renderSet();
    }

    renderSet = () => {
      const {
        htmlChildren,
        itemsByUIDs,
        parentScope,
        parentElem,
        parentTemplate,
        scope,
        itemName,
        indexName,
        UID
      } = this.$$;
      const {
        args: { sortBy }
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
        scope[itemName] = item;
        scope[indexName] = index;

        const uid = parentScope.$$.evaluate(UID, null, null, false, false, this);

        newUIDsCounter[uid] = (newUIDsCounter[uid] || 0) + 1;
        newUIDs[index] = uid;
      });

      scope[itemName] = null;
      scope[indexName] = null;

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

          if (block.$$.prevBlock !== prevBlock && prevBlock) {
            prevBlock.$$.insertAfterIt(block.$$.content, true);
          }
        } else {
          block = createBlock({
            node: {
              itemName,
              indexName,
              item,
              index,
              name: '#d-item',
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
  }

  return {
    name: 'd-each',
    value: DEach
  };
}

function remove(item) {
  item.$$.remove();
}
