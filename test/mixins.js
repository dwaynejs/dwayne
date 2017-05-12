import runBindTests from './mixins/Bind';
import runClassTests from './mixins/Class';
import runElemTests from './mixins/Elem';
import runHideTests from './mixins/Hide';
import runNodeTests from './mixins/Node';
import runOnTests from './mixins/On';
import runRestTests from './mixins/Rest';
import runShowTests from './mixins/Show';
import runStyleTests from './mixins/Style';
import runValueTests from './mixins/Value';

describe('it should test built-in mixins', () => {
  runBindTests();
  runClassTests();
  runElemTests();
  runHideTests();
  runNodeTests();
  runOnTests();
  runRestTests();
  runShowTests();
  runStyleTests();
  runValueTests();
});
