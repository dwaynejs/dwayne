import runDAttrTests from './mixins/d-attr';
import runDBindTests from './mixins/d-bind';
import runDClassTests from './mixins/d-class';
import runDElemTests from './mixins/d-elem';
import runDHideTests from './mixins/d-hide';
import runDNodeTests from './mixins/d-node';
import runDOnTests from './mixins/d-on';
import runDShowTests from './mixins/d-show';
import runDStyleTests from './mixins/d-style';
import runDValueTests from './mixins/d-value';

describe('it should test built-in mixins', () => {
  runDAttrTests();
  runDBindTests();
  runDClassTests();
  runDElemTests();
  runDHideTests();
  runDNodeTests();
  runDOnTests();
  runDShowTests();
  runDStyleTests();
  runDValueTests();
});

