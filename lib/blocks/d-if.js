export function registerDIf(Block) {
  class DIf extends Block {
    static template = '<d-elements value="{elems}"/>';

    index = Infinity;
    elems = null;
    values = this.children.map((child, i) => {
      const {
        name,
        attrs,
        children
      } = child;
      const cond = this.evaluateAndWatch(name === 'd-else' ? '{true}' : attrs.if || '{true}', (newValue) => {
        if (!!newValue === this.values.$[i]) {
          return;
        }

        this.values.$[i] = !!newValue;

        if (i > this.index) {
          return;
        }

        if (i < this.index) {
          this.index = i;
          this.elems = children;

          return;
        }

        const found = this.values.find(Boolean);

        if (found) {
          this.index = found.key;
          this.elems = this.children.$[found.key].children;
        } else {
          this.index = Infinity;
          this.elems = null;
        }
      });

      if (cond && this.index === Infinity) {
        this.index = i;
        this.elems = children;
      }

      return cond;
    });
  }

  return {
    name: 'd-if',
    value: DIf
  };
}
