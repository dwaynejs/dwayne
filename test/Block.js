import runPrimitiveTests from './Block/primitive';
import runVariablesTests from './Block/variables';

import runDBlockTests from './Block/d-block';
import runDEachTests from './Block/d-each';
import runDIfTests from './Block/d-if';

import runDAttrTests from './Block/d-attr';
import runDBindTests from './Block/d-bind';
import runDClassTests from './Block/d-class';
import runDElemTests from './Block/d-elem';
import runDHideTests from './Block/d-hide';
import runDNodeTests from './Block/d-node';
import runDOnTests from './Block/d-on';
import runDShowTests from './Block/d-show';
import runDStyleTests from './Block/d-style';
import runDValueTests from './Block/d-value';

describe('it should test Block', () => {
  runPrimitiveTests();
  runVariablesTests();

  runDBlockTests();
  runDEachTests();
  runDIfTests();

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
