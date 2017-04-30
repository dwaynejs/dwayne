import runStaticTests from './Block/static';
import runInstanceTests from './Block/instance';

import runPrimitiveTests from './Block/primitive';
import runVariablesTests from './Block/variables';

describe('Block.', () => {
  runStaticTests();
});

describe('Block#', () => {
  runInstanceTests();
});

describe('it should test Block environment', () => {
  runPrimitiveTests();
  runVariablesTests();
});
