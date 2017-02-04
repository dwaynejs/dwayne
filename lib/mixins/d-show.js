export function registerDShow(Mixin) {
  class DShow extends Mixin {
    afterUpdate(value) {
      const { elem } = this;

      if (value) {
        elem.show();
      } else {
        elem.hide();
      }
    }

    beforeRemove() {
      this.elem.show();
    }
  }

  return {
    name: 'd-show',
    value: DShow
  };
}
