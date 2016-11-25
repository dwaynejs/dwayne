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
  }

  return {
    name: 'd-show',
    value: DShow
  };
}
