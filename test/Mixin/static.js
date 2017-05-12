import { strictEqual } from 'assert';
import { Block, Mixin, initApp, doc } from '../../src';

class Test extends Mixin {
  afterUpdate(value) {
    this.elem.text(value);
  }
}

const wrapper = (Mixin) => {
  if (Mixin.wrapped) {
    return;
  }

  return class extends Mixin {
    static wrapped = true;

    afterUpdate(newValue, oldValue) {
      super.afterUpdate(`x${ newValue }x`, oldValue);
    }
  };
};

export default () => {
  describe('wrap()', () => {
    it('should return new mixin', () => {
      const container = doc.create('div');
      const WrappedMixin = Test.wrap(wrapper);

      initApp(html`<div WrappedMixin="123"/>`, container);

      strictEqual(container.html(), '<div>x123x</div>');
    });
    it('should return initial mixin if return value is not a mixin', () => {
      const container = doc.create('div');
      const DoubleWrappedMixin = Test.wrap(wrapper, wrapper);

      initApp(html`<div DoubleWrappedMixin="123"/>`, container);

      strictEqual(container.html(), '<div>x123x</div>');
    });
  });
};
