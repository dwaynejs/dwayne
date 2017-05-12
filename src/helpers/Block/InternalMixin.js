import { assign } from '../../utils';

class InternalMixin {
  constructor(opts) {
    assign(this, opts);
  }
}

export { InternalMixin };
