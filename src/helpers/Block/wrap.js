import { isInstanceOf } from './isInstanceOf';
import { Block } from '../../Block';
import { Mixin } from '../../Mixin';

export function wrapBlock(block, wrapper) {
  const newBlock = wrapper(block);

  return isInstanceOf(Block, newBlock)
    ? newBlock
    : block;
}

export function wrapMixin(mixin, wrapper) {
  const newMixin = wrapper(mixin);

  return isInstanceOf(Mixin, newMixin)
    ? newMixin
    : mixin;
}
