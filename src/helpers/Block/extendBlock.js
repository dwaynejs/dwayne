import { setProto } from '../../utils';
import { Block } from '../../Block';

export function extendBlock(cls) {
  setProto(cls, Block);
  setProto(cls.prototype, Block.prototype);
}
