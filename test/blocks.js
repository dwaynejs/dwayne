import runChildrenTests from './blocks/Children';
import runDynamicBlockTests from './blocks/DynamicBlock';
import runEachTests from './blocks/Each';
import runElementsTests from './blocks/Elements';
import runIfTests from './blocks/If';
import runSwitchTests from './blocks/Switch';

describe('it should test built-in blocks', () => {
  runChildrenTests();
  runDynamicBlockTests();
  runEachTests();
  runElementsTests();
  runIfTests();
  runSwitchTests();
});
