import runStaticTests from './Block/api/static';
import runInstanceTests from './Block/api/instance';

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
