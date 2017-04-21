import { strictEqual } from 'assert';
import { Block, Mixin } from '../../../src';
import { DBlock } from '../../../src/blocks/d-block';
import { DHide } from '../../../src/mixins/d-hide';

export default () => {
  describe('get()', () => {
    it('should return registered block in the namespace', () => {
      class MyBlock1 extends Block {}
      class MyBlock2 extends Block {}

      MyBlock1.block('MyBlock2', MyBlock2);
      Block.block('MyBlock1', MyBlock1);

      strictEqual(Block.get('d-block'), DBlock);
      strictEqual(Block.get('d-block2'), undefined);
      strictEqual(Block.get('MyBlock1'), MyBlock1);
      strictEqual(Block.get('MyBlock2'), undefined);
      strictEqual(MyBlock1.get('d-block'), DBlock);
      strictEqual(MyBlock1.get('MyBlock1'), MyBlock1);
      strictEqual(MyBlock1.get('MyBlock2'), MyBlock2);
      strictEqual(MyBlock1.get('MyBlock3'), undefined);
      strictEqual(MyBlock2.get('d-block'), DBlock);
      strictEqual(MyBlock2.get('d-block2'), undefined);
      strictEqual(MyBlock2.get('MyBlock1'), MyBlock1);
      strictEqual(MyBlock2.get('MyBlock2'), MyBlock2);
    });
  });
  describe('getMixin()', () => {
    it('should return registered mixin in the namespace', () => {
      class MyBlock extends Block {}
      class MyMixin1 extends Mixin {}
      class MyMixin2 extends Mixin {}

      Block.mixin('my-mixin1', MyMixin1);
      MyBlock.mixin('my-mixin2', MyMixin2);

      strictEqual(Block.getMixin('d-hide'), DHide);
      strictEqual(Block.getMixin('d-hide2'), undefined);
      strictEqual(Block.getMixin('my-mixin1'), MyMixin1);
      strictEqual(Block.getMixin('my-mixin2'), undefined);
      strictEqual(MyBlock.getMixin('d-hide'), DHide);
      strictEqual(MyBlock.getMixin('my-mixin1'), MyMixin1);
      strictEqual(MyBlock.getMixin('my-mixin2'), MyMixin2);
      strictEqual(MyBlock.getMixin('my-mixin3'), undefined);
      strictEqual(MyBlock.getMixin('d-hide'), DHide);
      strictEqual(MyBlock.getMixin('d-hide2'), undefined);
      strictEqual(MyBlock.getMixin('my-mixin1'), MyMixin1);
      strictEqual(MyBlock.getMixin('my-mixin2'), MyMixin2);
    });
  });
};
