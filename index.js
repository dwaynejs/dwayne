import D, * as statics from './domc';
import { assign } from './D/libs/assign';

delete statics['transform'];
delete statics['htmlElement'];

assign(D, statics);

window.D = D;
