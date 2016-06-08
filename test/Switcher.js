import * as assert from 'assert';
import { switcher } from '../lib/Switcher';
import { isArray, isString, isNumber } from '../lib/helpers';

describe('it should test switcher', () => {
  describe('[[Call]]', () => {
    it('should support no arguments syntax', () => {
      const sw = switcher();

      assert.deepEqual(sw.$$, {
        cases: [],
        mode: 'equals',
        default: undefined
      });
    });
    it('should support (cases) syntax', () => {
      const sw = switcher({ foo: 'bar' });

      assert.deepEqual(sw.$$, {
        cases: [{ case: 'foo', value: 'bar' }],
        mode: 'equals',
        default: undefined
      });
    });
    it('should support (mode) syntax', () => {
      const sw = switcher('call');

      assert.deepEqual(sw.$$, {
        cases: [],
        mode: 'call',
        default: undefined
      });
    });
    it('should support (cases, mode) syntax', () => {
      const sw = switcher({ foo: 'bar' }, 'call');

      assert.deepEqual(sw.$$, {
        cases: [{ case: 'foo', value: 'bar' }],
        mode: 'call',
        default: undefined
      });
    });
    it('should support (mode, default) syntax', () => {
      const sw = switcher('call', 'foo');

      assert.deepEqual(sw.$$, {
        cases: [],
        mode: 'call',
        default: 'foo'
      });
    });
    it('should support (cases, mode, default) syntax', () => {
      const sw = switcher({ foo: 'bar' }, 'call', 'foo');

      assert.deepEqual(sw.$$, {
        cases: [{ case: 'foo', value: 'bar' }],
        mode: 'call',
        default: 'foo'
      });
    });
    it('should return undefined if no option has matched and default isn\'t set', () => {
      const sw = switcher();

      assert.strictEqual(sw(true), undefined);
    });
    it('should return default if no option has matched', () => {
      const sw = switcher();
      const unique = {};

      sw.default(unique);

      assert.strictEqual(sw(true), unique);
    });
    it('should return value of the first matched case', () => {
      const unique1 = {};
      const unique2 = {};
      const sw = switcher()
        .case(1, unique1)
        .case(1, unique2);

      assert.strictEqual(sw(1), unique1);
    });
    it('should return matched(value) of the first matched case if the match is a function', () => {
      const sw = switcher({ foo: (value) => unique });
      const unique = {};

      assert.strictEqual(sw('foo'), unique);
    });
    it('should support equals mode', () => {
      const unique1 = {};
      const unique2 = {};
      const unique3 = {};
      const sw = switcher({
        foo: unique1,
        bar: unique2,
        baz: unique3
      });

      assert.strictEqual(sw('foo'), unique1);
      assert.strictEqual(sw('bar'), unique2);
      assert.strictEqual(sw('baz'), unique3);
    });
    it('should support strictEquals mode', () => {
      const unique1 = {};
      const unique2 = {};
      const sw = switcher('strictEquals')
        .case(1, unique1)
        .case('1', unique2);

      assert.strictEqual(sw(1), unique1);
      assert.strictEqual(sw('1'), unique2);
    });
    it('should support boolean mode', () => {
      const unique1 = {};
      const unique2 = {};
      const sw = switcher('boolean')
        .case(false, unique1)
        .case(true, unique2);

      assert.strictEqual(sw(false), unique2);
    });
    it('should support call mode', () => {
      const unique1 = {};
      const unique2 = {};
      const unique3 = {};
      const sw = switcher('call')
        .case(isArray, unique1)
        .case(isString, unique2)
        .case(isNumber, unique3);

      assert.strictEqual(sw([]), unique1);
      assert.strictEqual(sw('1'), unique2);
      assert.strictEqual(sw(1), unique3);
      assert.strictEqual(sw({}), undefined);
    });
  });
});

describe('it should test Switcher#', () => {
  describe('case()', () => {
    it('should test that case is added', () => {
      const sw = switcher();

      sw.case('foo', 'bar');

      assert.deepEqual(sw.$$.cases, [{ case: 'foo', value: 'bar' }]);
    });
    it('should test that multiple cases is added', () => {
      const sw = switcher();

      sw.case(['foo', 'bar'], 'baz');

      assert.deepEqual(sw.$$.cases, [
        { case: 'foo', value: 'baz' },
        { case: 'bar', value: 'baz' }
      ]);
    });
  });
  describe('default()', () => {
    it('should test that default changes', () => {
      const sw = switcher();

      sw.default('foo');

      assert.strictEqual(sw.$$.default, 'foo');
    });
  });
  describe('mode()', () => {
    it('should test that mode changes', () => {
      const sw = switcher();

      sw.mode('call');

      assert.strictEqual(sw.$$.mode, 'call');
    });
  });
});
