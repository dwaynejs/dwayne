import { isInstanceOf } from './isInstanceOf';
import { Block } from '../../Block';
import { Mixin } from '../../Mixin';

export function wrapBlock(block, wrapper) {
  const returnValue = wrapper(block);

  return isInstanceOf(Block, returnValue)
    ? returnValue
    : block;
}

export function wrapMixin(mixin, wrapper) {
  const returnValue = wrapper(mixin);

  return isInstanceOf(Mixin, returnValue)
    ? returnValue
    : mixin;
}
