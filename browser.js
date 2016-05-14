import D, * as statics from './domc';
import { assign } from './lib/helpers/assign';

assign(D, statics);

delete D.default;

global.D = D;
global.top.D = D;
