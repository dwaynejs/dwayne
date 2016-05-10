import D, * as statics from './domc';
import { assign } from './D/libs/assign';

assign(D, statics);

delete D.default;

global.D = D;
global.top.D = D;
