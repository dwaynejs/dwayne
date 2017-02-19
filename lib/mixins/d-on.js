export function registerDOn(Mixin) {
  class DOn extends Mixin {
    static evaluate = false;

    constructor(opts) {
      super(opts);

      if (this.arg) {
        this.off = this.elem.on(this.arg, () => {
          this.evaluateOnce();
        });
      } else {
        console.error('Provide "d-on" mixin with an event name (like "d-on:click")!');
      }
    }

    beforeRemove() {
      const { off } = this;

      if (off) {
        off();
      }
    }
  }

  return {
    name: 'd-on',
    value: DOn
  };
}
