export function createMixin({
  name, Mixin, dynamic,
  value, args, comment, elem,
  parentBlock, parentScope, parentTemplate
}) {
  const mixin = new Mixin({
    name,
    value,
    dynamic,
    args,
    comment,
    elem,
    parentBlock,
    parentScope,
    parentTemplate
  });

  if (Mixin.evaluate) {
    const value = mixin.value = mixin.evaluate((newValue, oldValue) => {
      mixin.value = newValue;

      try {
        mixin.afterUpdate(newValue, oldValue);
      } catch (err) {
        console.error(`Uncaught error in ${ name }#afterUpdate:`, err);
      }
    });

    mixin.afterUpdate(value);
  }

  return mixin;
}
