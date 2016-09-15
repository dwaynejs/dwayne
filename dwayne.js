import D, * as statics from './lib';
import { assign } from './lib/helpers/assign';

assign(D, statics);

delete D.default;
delete D.D;

export * from './lib';
export default D;
