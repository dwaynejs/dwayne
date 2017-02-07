export function registerDIf(Block) {
  class DIf extends Block {
    static template = '<d-elements value="{elems}" parentScope="{$$.parentScope}" />';

    constructor(opts) {
      super(opts);

      const { parentScope } = this.$$;
      let index = Infinity;
      const values = this.children.map((child, i) => {
        const {
          name,
          attrs,
          children
        } = child;
        let cond = attrs.if;

        if (name !== 'd-else' && cond) {
          cond = parentScope.$$.evaluate(cond, (newValue) => {
            if (!!newValue === values.$[i]) {
              return;
            }

            values.$[i] = !!newValue;

            if (i > index) {
              return;
            }

            if (i < index) {
              index = i;
              this.elems = children;

              return;
            }

            const found = values.find(Boolean);

            if (found) {
              index = found.key;
              this.elems = this.children.$[found.key].children;
            } else {
              index = Infinity;
              this.elems = null;
            }
          }, this);
        } else {
          cond = true;
        }

        if (cond && index === Infinity) {
          index = i;
          this.elems = children;
        }

        return !!cond;
      });
    }
  }

  return {
    name: 'd-if',
    value: DIf
  };
}
