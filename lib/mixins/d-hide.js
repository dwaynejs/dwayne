export function registerDHide(Mixin) {
  class DHide extends Mixin {
    afterUpdate(value) {
      const { elem } = this;

      if (value) {
        elem.hide();
      } else {
        elem.show();
      }
    }
  }

  return {
    name: 'd-hide',
    value: DHide
  };
}
