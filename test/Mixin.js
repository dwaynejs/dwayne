import runStaticTests from './Mixin/static';
import runInstanceTests from './Mixin/instance';

describe('Mixin.', () => {
  runStaticTests();
});

describe('Mixin#', () => {
  runInstanceTests();
});
