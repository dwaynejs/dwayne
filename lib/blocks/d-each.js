import { Arr, array } from '../Arr';
import { Super } from '../Super';
import {
  assign, iterate,
  isArray, isFunction, isNumber
} from '../helpers';

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
        uids: new Super({}),
        items: new Arr([]),
        UID: this.args.uid || undefined,
        itemName,
        indexName
      });
    }

    afterRender() {
      this.watch('args.set', 'args.sortBy', 'args.filterBy', () => {
        const {
          argsChildren,
          uids,
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
        const $uids = uids.$;
        const newKeys = {};
        const newUIDs = {};
        let {
          set,
          filterBy
        } = this.args;

        if (isNumber(set)) {
          set = array(set).$;
        }

        if (isArray(set) && isFunction(sortBy)) {
          set = new Arr(set)
            .slice()
            .sort(sortBy)
            .$;
        }

        if (isFunction(filterBy)) {
          filterBy = [filterBy];
        }

        if (isArray(filterBy)) {
          iterate(filterBy, (filter) => {
            set = new Super(set).filter(filter).$;
          });
        }

        new Super(set).forEach((item, index) => {
          scope[itemName] = item;
          scope[indexName] = index;

          const uid = parentScope.$$.evaluate(UID, null, null, false, false, this);

          newKeys[uid] = newKeys[uid] || {};
          newKeys[uid][index] = true;
          newUIDs[index] = uid;
        });

        scope[itemName] = null;
        scope[indexName] = null;

        uids.forEach((items, uid) => {
          if (!newKeys[uid]) {
            items.forEach((Item) => {
              Item.$$.remove();
            });

            return;
          }

          items.splice(Object.keys(newKeys[uid]).length).forEach((Item) => {
            Item.$$.remove();
          });
        });

        let prevBlock;

        new Super(set).forEach((item, index) => {
          const uid = newUIDs[index];
          let block;

          if ($uids[uid] && $uids[uid].length) {
            block = newKeys[uid][index] = uids.$[uid].shift();
            block.$$.scope[indexName] = index;
            block.$$.scope[itemName] = item;

            if (block.$$.prevBlock !== prevBlock && prevBlock) {
              prevBlock.$$.insertAfterIt(block.$$.content, true);
            }
          } else {
            block = newKeys[uid][index] = createBlock({
              node: {
                itemName,
                indexName,
                item,
                index,
                name: '#d-item',
                children: argsChildren
              },
              parent: this,
              parentElem,
              parentBlock: this,
              parentScope,
              parentTemplate,
              prevBlock
            });
          }

          block.$$.prevBlock = prevBlock;
          prevBlock = block;
        });

        this.$$.uids = new Super(newKeys).map((items) => (
          new Super(items).values()
        ));
      });
    }
  }

  return {
    name: 'd-each',
    value: DEach
  };
}
