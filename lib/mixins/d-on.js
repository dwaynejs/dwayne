export function registerDOn(Mixin) {
  class DOn extends Mixin {
    static evaluate = false;

    constructor(opts) {
      super(opts);

      this.off = this.elem.on(this.match, () => {
        this.evaluateOnce();
      });
    }

    beforeRemove() {
      this.off();
    }
  }

  return {
    name: 'd-on',
    value: DOn
  };
}
