export function registerDOn(Mixin) {
  class DOn extends Mixin {
    static evaluate = false;

    constructor(opts) {
      super(opts);

      if (this.match) {
        const event = this.match.match(/^[^\-]*/)[0];

        this.off = this.elem.on(event, () => {
          this.evaluateOnce();
        });
      } else {
        console.error('Provide "d-on" mixin with an event name!');
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
