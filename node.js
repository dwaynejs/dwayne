import * as statics from './lib/node';
import { assign } from './lib/helpers/assign';

const { D } = statics;

assign(D, statics);

delete D.default;
delete D.D;

export default D;
