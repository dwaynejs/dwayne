import { iterateObject } from '../../utils';
import { rootBlocks, rootMixins } from '../../constants';
import { constructMixinRegex } from './constructMixinRegex';

iterateObject(rootBlocks, (Block) => {
  Block._vars = Block.template.vars;
  Block._html = Block.template.value;
});

iterateObject(rootMixins, (Mixin, name) => {
  Mixin._match = constructMixinRegex(name);
});
