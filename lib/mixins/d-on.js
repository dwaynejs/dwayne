export function registerDOn(Mixin) {
  class DOn extends Mixin {
    static evaluate = false;

    constructor(opts) {
      super(opts);

      this.elem.on(this.match[0], () => {
        this.evaluateOnce();
      });
    }
  }

  return {
    name: 'd-on',
    value: DOn
  };
}
