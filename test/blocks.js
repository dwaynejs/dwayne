import runDBlockTests from './blocks/d-block';
import runDEachTests from './blocks/d-each';
import runDElementsTests from './blocks/d-elements';
import runDIfTests from './blocks/d-if';
import runDSwitchTests from './blocks/d-switch';

describe('it should test built-in blocks', () => {
  runDBlockTests();
  runDEachTests();
  runDElementsTests();
  runDIfTests();
  runDSwitchTests();
});
