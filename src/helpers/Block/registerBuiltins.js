import { iterateObject } from '../../utils';
import { rootMixins } from '../../constants';
import { constructMixinRegex } from './constructMixinRegex';

iterateObject(rootMixins, (Mixin, name) => {
  Mixin._match = constructMixinRegex(name);
});
