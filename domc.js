import D, * as statics from './domc';
import { assign } from './lib/helpers/assign';

assign(D, statics);

delete D.default;

export * from './lib/D';
export * from './lib/Alphabet';
export * from './lib/Array';
export * from './lib/Blob';
export * from './lib/Date';
export * from './lib/Fetch';
export * from './lib/Function';
export * from './lib/HtmlCollection';
export * from './lib/HtmlElement';
export * from './lib/Number';
export * from './lib/Promise';
export * from './lib/String';
export * from './lib/Super';
export * from './lib/Switcher';

export default D;
