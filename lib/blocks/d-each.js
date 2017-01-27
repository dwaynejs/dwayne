import { Arr } from '../Arr';
import { Elem } from '../Elem';
import { Super } from '../Super';
import { assign } from '../helpers';

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
        UID: this.args.uid || 'undefined',
        itemName,
        indexName
      });
    }

    afterRender() {
      this.constructValues(this.args.set);
      this.watch('args.set', (set) => {
        this.constructValues(set);
      });
    }

    constructValues(set) {
      const {
        elems: {
          start,
          parent: parentElem
        },
        uids,
        parent,
        scope,
        itemName,
        indexName,
        UID
      } = this.$$;
      const { children } = this;
      const $uids = uids.$;
      const newKeys = {};
      const newUIDs = {};

      new Super(set).forEach((item, index) => {
        scope[itemName] = item;
        scope[indexName] = index;

        const uid = parent.$$.evaluate(UID, null, null, false, false, this);

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

      let after = start;

      new Super(set).forEach((item, index) => {
        const uid = newUIDs[index];
        let block;

        if ($uids[uid] && $uids[uid].length) {
          block = newKeys[uid][index] = uids.$[uid].shift();
          block.$$.scope[indexName] = index;
          block.$$.scope[itemName] = item;
        } else {
          block = newKeys[uid][index] = createBlock({
            node: {
              itemName,
              indexName,
              item,
              index,
              name: '#d-item',
              block: parent,
              children
            },
            after,
            parent: parentElem,
            parentBlock: this
          });
        }

        const {
          start,
          end
        } = block.$$.elems;

        if (start.prev().$[0] !== after.$[0]) {
          const { content } = block.$$.elems;

          new Elem([
            start,
            content,
            end
          ]).insertAfter(after);
        }

        after = end;
      });

      this.$$.uids = new Super(newKeys).map((items) => (
        new Super(items).values()
      ));
    }
  }

  return {
    name: 'd-each',
    value: DEach
  };
}
