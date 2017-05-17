import { setProto, getProto } from '../../utils';
import { isInstanceOf } from './isInstanceOf';
import { Block } from '../../Block';

export function extendBlock(block, newBlock) {
  if (isInstanceOf(Block, newBlock)) {
    if (isInstanceOf(block, newBlock)) {
      let currentBlock = newBlock;
      let proto;

      while ((proto = getProto(currentBlock)) !== block) {
        currentBlock = proto;
      }

      extend(currentBlock, getProto(block));
    }

    extend(block, newBlock);
  }

  return block;
}

function extend(Block, BaseBlock) {
  setProto(Block, BaseBlock);
  setProto(Block.prototype, BaseBlock.prototype);
}
