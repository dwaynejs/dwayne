import * as statics from './lib/browser';
import { assign } from './lib/helpers/assign';

const { D } = statics;

assign(D, statics);

delete D.default;
delete D.D;

global.D = D;
