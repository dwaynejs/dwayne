import Switcher from './module';
import { isArray, isString, isNumber } from '../../libs';
import * as assert from 'assert';

describe('it should test new Switcher', () => {
  describe('constructor()', () => {
    it('should support no arguments syntax', () => {
      const switcher = new Switcher();

      assert.deepEqual(switcher.$, {
        cases: [],
        mode: 'strictEquals',
        default: undefined
      });
    });
    it('should support (cases) syntax', () => {
      const switcher = new Switcher({ foo: 'bar' });

      assert.deepEqual(switcher.$, {
        cases: [{ case: 'foo', value: 'bar' }],
        mode: 'strictEquals',
        default: undefined
      });
    });
    it('should support (mode) syntax', () => {
      const switcher = new Switcher('call');

      assert.deepEqual(switcher.$, {
        cases: [],
        mode: 'call',
        default: undefined
      });
    });
    it('should support (cases, mode) syntax', () => {
      const switcher = new Switcher({ foo: 'bar' }, 'call');

      assert.deepEqual(switcher.$, {
        cases: [{ case: 'foo', value: 'bar' }],
        mode: 'call',
        default: undefined
      });
    });
    it('should support (mode, default) syntax', () => {
      const switcher = new Switcher('call', 'foo');

      assert.deepEqual(switcher.$, {
        cases: [],
        mode: 'call',
        default: 'foo'
      });
    });
    it('should support (cases, mode, default) syntax', () => {
      const switcher = new Switcher({ foo: 'bar' }, 'call', 'foo');

      assert.deepEqual(switcher.$, {
        cases: [{ case: 'foo', value: 'bar' }],
        mode: 'call',
        default: 'foo'
      });
    });
    it('should return undefined if no option has matched and default isn\'t set', () => {
      const switcher = new Switcher();

      assert.strictEqual(switcher(true), undefined);
    });
    it('should return default if no option has matched', () => {
      const switcher = new Switcher();
      const unique = {};

      switcher.default(unique);

      assert.strictEqual(switcher(true), unique);
    });
    it('should return value of the first matched case', () => {
      const unique1 = {};
      const unique2 = {};
      const switcher = new Switcher()
        .case(1, unique1)
        .case(1, unique2);

      assert.strictEqual(switcher(1), unique1);
    });
    it('should return matched(value) of the first matched case if the match is a function', () => {
      const switcher = new Switcher({ foo: (value) => unique });
      const unique = {};

      assert.strictEqual(switcher('foo'), unique);
    });
    it('should support equals mode', () => {
      const unique1 = {};
      const unique2 = {};
      const unique3 = {};
      const switcher = new Switcher({
        foo: unique1,
        bar: unique2,
        baz: unique3
      });

      assert.strictEqual(switcher('foo'), unique1);
      assert.strictEqual(switcher('bar'), unique2);
      assert.strictEqual(switcher('baz'), unique3);
    });
    it('should support strictEquals mode', () => {
      const unique1 = {};
      const unique2 = {};
      const switcher = new Switcher('strictEquals')
        .case(1, unique1)
        .case('1', unique2);

      assert.strictEqual(switcher(1), unique1);
      assert.strictEqual(switcher('1'), unique2);
    });
    it('should support boolean mode', () => {
      const unique1 = {};
      const unique2 = {};
      const switcher = new Switcher('boolean')
        .case(false, unique1)
        .case(true, unique2);

      assert.strictEqual(switcher(false), unique2);
    });
    it('should support call mode', () => {
      const unique1 = {};
      const unique2 = {};
      const unique3 = {};
      const switcher = new Switcher('call')
        .case(isArray, unique1)
        .case(isString, unique2)
        .case(isNumber, unique3);

      assert.strictEqual(switcher([]), unique1);
      assert.strictEqual(switcher('1'), unique2);
      assert.strictEqual(switcher(1), unique3);
      assert.strictEqual(switcher({}), undefined);
    });
  });
});

describe('it should test Switcher::[methods]', () => {
  describe('case()', () => {
    it('should test that case is added', () => {
      const switcher = new Switcher();

      switcher.case('foo', 'bar');

      assert.deepEqual(switcher.$.cases, [{ case: 'foo', value: 'bar' }]);
    });
    it('should test that multiple cases is added', () => {
      const switcher = new Switcher();

      switcher.case(['foo', 'bar'], 'baz');

      assert.deepEqual(switcher.$.cases, [
        { case: 'foo', value: 'baz' },
        { case: 'bar', value: 'baz' }
      ]);
    });
  });
  describe('default()', () => {
    it('should test that default changes', () => {
      const switcher = new Switcher();

      switcher.default('foo');

      assert.strictEqual(switcher.$.default, 'foo');
    });
  });
  describe('mode()', () => {
    it('should test that mode changes', () => {
      const switcher = new Switcher();

      switcher.mode('strictEquals');

      assert.strictEqual(switcher.$.mode, 'strictEquals');
    });
  });
});
