import * as assert from 'assert';
import Super from '../lib/Super';

describe('it should test Super#', () => {
  describe('assign()', () => {
    it('should rewrite original values', () => {
      const o = { a: 1, b: 2, c: 3 };
      const wrap = new Super(o);

      assert.deepEqual(wrap.assign({ a: 5, b: 4 }).$, { a: 5, b: 4, c: 3 });
    });
    it('should rewrite rewritten values from left to right', () => {
      const o = { a: 1, b: 2, c: 3, d: 4 };
      const re1 = { a: 5, b: 4, c: 8 };
      const re2 = { b: 7, c: 9 };
      const re3 = { a: -1, b: -2 };
      const wrap = new Super(o);

      assert.deepEqual(wrap.assign(re1, re2, re3).$, { a: -1, b: -2, c: 9, d: 4 });
    });
  });
  describe('average()', () => {
    it('should return average value of values with no arguments', () => {
      const o = { a: 1, b: 2, c: 3 };
      const wrap = new Super(o);

      assert.strictEqual(wrap.average(), 2);
    });
    it('should return average value of calculated expressions with function argument', () => {
      const o = { a: 1, b: 2, c: 3 };
      const wrap = new Super(o);

      assert.strictEqual(wrap.average((value) => value * 2), 4);
    });
  });
  describe('call()', () => {
    it('should call function with context as context', () => {
      const random = Math.random();
      const o = { [random]: 1 };
      const f = function (...args) {
        return this.$[random] + new Super(args).sum();
      };
      const wrap = new Super(o);

      assert.strictEqual(wrap.call(f, 2, 3, 4), 10);
    });
  });
  describe('get count', () => {
    it('should return count of own properties context', () => {
      const o = { a: 1, b: 2, c: 3 };
      const wrap = new Super(o);

      assert.strictEqual(wrap.count, 3);
    });
  });
  describe('create()', () => {
    it('should return instance of context', () => {
      const o = {};
      const wrap = new Super(o);
      const instance = wrap.create().$;

      assert.strictEqual(Object.getPrototypeOf(instance), o);
    });
    it('should also support argument descriptors', () => {
      const o = {};
      const wrap = new Super(o);
      const descriptor = {
        value: 1,
        enumerable: true,
        configurable: false,
        writable: true
      };
      const instance = wrap.create({
        foo: descriptor
      }).$;

      assert.deepEqual(Object.getOwnPropertyDescriptor(instance, 'foo'), descriptor);
    });
  });
  describe('deepEquals()', () => {
    it('should return true with argument, which nested values are equal to context\'s', () => {
      const o = { a: { a: 1 } };
      const copy = { a: { a: '1' } };
      const wrap = new Super(o);

      assert.strictEqual(wrap.deepEquals(copy), true);
    });
    it('should return false with argument, which keys are not equal to context\'s, but values are', () => {
      const o = { a: undefined };
      const copy = { b: undefined };
      const wrap = new Super(o);

      assert.strictEqual(wrap.deepEquals(copy), false);
    });
    it('should return false with instance of initial non-empty object', () => {
      const o = { a: 1 };
      const copy = Object.create(o);
      const wrap = new Super(o);

      assert.strictEqual(wrap.deepEquals(copy), false);
    });
  });
  describe('deepEvery()', () => {
    it('should return true with nested empty objects only', () => {
      const o = { a: {}, b: {} };
      const wrap = new Super(o);

      assert.strictEqual(wrap.deepEvery(() => false, 2), true);
    });
    it('should use default Infinity parameter if the depth parameter isn\'t present', () => {
      const o = {
        a: 1,
        b: { c: 2, d: 3 }
      };
      const wrap = new Super(o);

      assert.strictEqual(wrap.deepEvery((value) => value < 4), true);
      assert.strictEqual(wrap.deepEvery((value) => value < 3), false);
    });
    it('should use Boolean function for checking for falsey values', () => {
      const o1 = {
        a: { a: 0, b: 1 },
        b: { a: 2, b: 3 }
      };
      const o2 = {
        a: { a: 1, b: 2 },
        b: { a: 3, b: 4 }
      };
      const wrap1 = new Super(o1);
      const wrap2 = new Super(o2);

      assert.strictEqual(wrap1.deepEvery(2), false);
      assert.strictEqual(wrap2.deepEvery(2), true);
    });
    it('should use argument function for checking for falsey values', () => {
      const o1 = {
        a: { a: 0, b: 1 },
        b: { a: 2, b: 3 }
      };
      const o2 = {
        a: { a: 1, b: 2 },
        b: { a: 3, b: 4 }
      };
      const wrap1 = new Super(o1);
      const wrap2 = new Super(o2);

      assert.strictEqual(wrap1.deepEvery((value) => value < 4, 2), true);
      assert.strictEqual(wrap2.deepEvery((value) => value < 4, 2), false);
    });
    it('should not iterate after getting false', () => {
      const o = {
        a: { a: 0, b: 1 },
        b: { a: 2, b: 3 }
      };
      const wrap = new Super(o);

      assert.strictEqual(wrap.deepEvery((value) => {
        if (!value) {
          return false;
        }

        throw new Error();
      }, 2), false);
    });
    it('should support 4th "tree" argument', () => {
      const o1 = {
        0: { 0: 0, 1: 1 },
        1: { 2: 2, 3: 3 }
      };
      const o2 = {
        0: { 1: 1, 2: 2 },
        1: { 3: 3, 4: 4 }
      };
      const wrap1 = new Super(o1);
      const wrap2 = new Super(o2);

      assert.strictEqual(wrap1.deepEvery((value, key, object, tree) => {
        let sum = 0;

        for (let i = 0; i < tree.length; i++) {
          const k = tree[i].key;

          sum += Number(k);
        }

        return sum < 5;
      }, 2), true);
      assert.strictEqual(wrap2.deepEvery((value, key, object, tree) => {
        let sum = 0;

        for (let i = 0; i < tree.length; i++) {
          const k = tree[i].key;

          sum += Number(k);
        }

        return sum < 5;
      }, 2), false);
    });
  });
  describe('deepFilter()', () => {
    it('should return a wrap of a different object', () => {
      const o = {};
      const wrap = new Super(o);

      assert.notEqual(wrap.deepFilter(2).$, o);
    });
    it('should return a wrap of an object also with different objects inside it', () => {
      const o = { a: { a: 1 } };
      const wrap = new Super(o);
      const newO = wrap.deepFilter(2).$;

      assert.deepEqual(newO.a, { a: 1 });
      assert.notEqual(newO, o.a);
    });
    it('should use default Infinity parameter if the depth parameter isn\'t present', () => {
      const o = {
        a: 1,
        b: { c: 2, d: 3 },
        c: { e: { f: 4, g: 5, h: 6 } }
      };
      const wrap = new Super(o);

      assert.deepEqual(wrap.deepFilter((value) => value % 2).$, {
        a: 1,
        b: { d: 3 },
        c: { e: { g: 5 } }
      });
      assert.deepEqual(wrap.deepFilter((value) => !(value % 2)).$, {
        b: { c: 2 },
        c: { e: { f: 4, h: 6 } }
      });
    });
    it('should use Boolean function for filtering values', () => {
      const o1 = { a: { a: 0, b: 1 } };
      const o2 = { a: { a: 1, b: 2 } };
      const wrap1 = new Super(o1);
      const wrap2 = new Super(o2);

      assert.deepEqual(wrap1.deepFilter(2).$, { a: { b: 1 } });
      assert.deepEqual(wrap2.deepFilter(2).$, { a: { a: 1, b: 2 } });
    });
    it('should use argument function for filtering values', () => {
      const o1 = { a: { a: 0, b: 1 } };
      const o2 = { a: { a: 1, b: 2 } };
      const wrap1 = new Super(o1);
      const wrap2 = new Super(o2);

      assert.deepEqual(wrap1.deepFilter((value) => value < 2, 2).$, { a: { a: 0, b: 1 } });
      assert.deepEqual(wrap2.deepFilter((value) => value < 2, 2).$, { a: { a: 1 } });
    });
    it('should support 4th "tree" argument', () => {
      const o1 = { 0: { 0: 0, 1: 1, 2: 2 } };
      const o2 = { 0: { 1: 1, 2: 2, 3: 3 } };
      const wrap1 = new Super(o1);
      const wrap2 = new Super(o2);

      assert.deepEqual(wrap1.deepFilter((value, key, object, tree) => {
        let sum = 0;

        for (let i = 0; i < tree.length; i++) {
          const k = tree[i].key;

          sum += Number(k);
        }

        return sum !== 1;
      }, 2).$, { 0: { 0: 0, 2: 2 } });
      assert.deepEqual(wrap2.deepFilter((value, key, object, tree) => {
        let sum = 0;

        for (let i = 0; i < tree.length; i++) {
          const k = tree[i].key;

          sum += Number(k);
        }

        return sum !== 1;
      }, 2).$, { 0: { 2: 2, 3: 3 } });
    });
  });
  describe('deepFind()', () => {
    it('should return null if not find', () => {
      const o = { a: {}, b: {} };
      const wrap = new Super(o);

      assert.strictEqual(wrap.deepFind(() => true, 2), null);
    });
    it('should use default Infinity parameter if the depth parameter isn\'t present', () => {
      const o = {
        a: 1,
        b: { c: 2, d: 3 },
        c: { e: { f: 4, g: 5, h: 6 } }
      };
      const wrap = new Super(o);

      assert.deepEqual(wrap.deepFind((value) => value === 5), [
        { key: 'g', value: 5 },
        { key: 'e', value: o.c.e },
        { key: 'c', value: o.c },
        { key: null, value: o }
      ]);
    });
    it('should return tree if find', () => {
      const o1 = {
        a: { a: 0, b: 1 },
        b: { a: 2, b: 3 }
      };
      const o2 = {
        a: { a: 1, b: 2 },
        b: { a: 3, b: 4 }
      };
      const wrap1 = new Super(o1);
      const wrap2 = new Super(o2);

      assert.deepEqual(wrap1.deepFind((value) => value > 1, 2), [
        { key: 'a', value: 2 },
        { key: 'b', value: o1.b },
        { key: null, value: o1 }
      ]);
      assert.deepEqual(wrap2.deepFind((value) => value > 1, 2), [
        { key: 'b', value: 2 },
        { key: 'a', value: o2.a },
        { key: null, value: o2 }
      ]);
    });
  });
  describe('deepForEach()', () => {
    it('should use default Infinity parameter if the depth parameter isn\'t present', () => {
      const o = {
        a: 1,
        b: { c: 2, d: 3 },
        c: { e: { f: 4, g: 5, h: 6 } }
      };
      const wrap = new Super(o);

      wrap.deepForEach((value, key, object) => (object[key] = value * value));

      assert.deepEqual(o, {
        a: 1,
        b: { c: 4, d: 9 },
        c: { e: { f: 16, g: 25, h: 36 } }
      });
    });
    it('should support 4th "tree" argument', () => {
      const o = {
        a: 1,
        b: { c: 2, d: 3 },
        c: { e: { f: 4, g: 5, h: 6 } }
      };
      const wrap = new Super(o);

      wrap.deepForEach((value, key, object, tree) => {
        let string = '';

        for (let i = tree.length - 2; i >= 0; i--) {
          string += tree[i].key;
        }

        object[key] = string;
      });

      assert.deepEqual(o, {
        a: 'a',
        b: { c: 'bc', d: 'bd' },
        c: { e: { f: 'cef', g: 'ceg', h: 'ceh' } }
      });
    });
  });
  describe('deepFreeze()', () => {
    it('should freeze context', () => {
      const o = {};
      const wrap = new Super(o);

      wrap.deepFreeze();

      assert.strictEqual(Object.isFrozen(o), true);
    });
    it('should freeze all inner objects', () => {
      const a = {};
      const b = { a };
      const o = { b };
      const wrap = new Super(o);

      wrap.deepFreeze();

      assert.strictEqual(Object.isFrozen(a), true);
      assert.strictEqual(Object.isFrozen(b), true);
      assert.strictEqual(Object.isFrozen(o), true);
    });
  });
  describe('deepMap()', () => {
    it('should return a wrap of a different object', () => {
      const o = {};
      const wrap = new Super(o);

      assert.notEqual(wrap.deepMap(() => {}).$, o);
    });
    it('should return a wrap of an object also with different objects inside it', () => {
      const o = { a: { a: 1 } };
      const wrap = new Super(o);
      const newO = wrap.deepMap((value) => value, 2).$;

      assert.deepEqual(newO.a, { a: 1 });
      assert.notEqual(newO, o.a);
    });
    it('should use default Infinity parameter if the depth parameter isn\'t present', () => {
      const o = {
        a: 1,
        b: { c: 2, d: 3 },
        c: { e: { f: 4, g: 5, h: 6 } }
      };
      const wrap = new Super(o);

      assert.deepEqual(wrap.deepMap((value) => value * value).$, {
        a: 1,
        b: { c: 4, d: 9 },
        c: { e: { f: 16, g: 25, h: 36 } }
      });
    });
    it('should set values', () => {
      const o = {
        a: { a: 1, b: 2 },
        b: { a: 3, b: 4 }
      };
      const sq = {
        a: { a: 1, b: 4 },
        b: { a: 9, b: 16 }
      };
      const wrap = new Super(o);

      assert.deepEqual(wrap.deepMap((value) => value * value, 2).$, sq);
    });
    it('should support 4th "tree" argument', () => {
      const o = {
        a: { a: 1, b: 2 },
        b: { a: 3, b: 4 }
      };
      const concat = {
        a: { a: 'aa1', b: 'ba2' },
        b: { a: 'ab3', b: 'bb4' }
      };
      const wrap = new Super(o);

      assert.deepEqual(wrap.deepMap((value, key, object, tree) => {
        let string = '';

        for (let i = 0; i < tree.length; i++) {
          const k = tree[i].key;

          string += k === null ? '' : k;
        }

        return string + value;
      }, 2).$, concat);
    });
  });
  describe('deepReduce()', () => {
    it('should return initial value after deep actions', () => {
      const o = {
        a: { a: 1, b: 2 },
        b: { a: 3, b: 4 }
      };
      const wrap = new Super(o);

      assert.strictEqual(wrap.deepReduce((sum, value) => sum + value, 2), 10);
    });
    it('should handle Infinity parameter', () => {
      const o = {
        a: 1,
        b: { c: 2, d: 3 },
        c: { e: { f: 4, g: 5, h: 6 } }
      };
      const wrap = new Super(o);

      assert.strictEqual(wrap.deepReduce((sum, value) => sum + value, Infinity, 0), 21);
    });
    it('should support 5th "tree" argument', () => {
      const o = {
        a: { a: 1, b: 2 },
        b: { a: 3, b: 4 }
      };
      const wrap = new Super(o);

      assert.strictEqual(wrap.deepReduce((IV, value, key, object, tree) => {
        for (let i = 0; i < tree.length; i++) {
          const k = tree[i].key;

          IV += k === null ? '' : k;
        }

        return IV + value;
      }, 2, ''), 'aa1ba2ab3bb4');
    });
  });
  describe('deepSome()', () => {
    it('should return false with nested empty objects only', () => {
      const o = { a: {}, b: {} };
      const wrap = new Super(o);

      assert.strictEqual(wrap.deepSome(() => true, 2), false);
    });
    it('should use default Infinity parameter if the depth parameter isn\'t present', () => {
      const o = {
        a: 1,
        b: { c: 2, d: 3 }
      };
      const wrap = new Super(o);

      assert.strictEqual(wrap.deepSome((value) => value > 3), false);
      assert.strictEqual(wrap.deepSome((value) => value > 2), true);
    });
    it('should use Boolean function for checking for false alike values', () => {
      const o1 = { a: { a: 0 } };
      const o2 = { a: { a: 1 } };
      const wrap1 = new Super(o1);
      const wrap2 = new Super(o2);

      assert.strictEqual(wrap1.deepSome(2), false);
      assert.strictEqual(wrap2.deepSome(2), true);
    });
    it('should use argument function for checking for false alike values', () => {
      const o1 = {
        a: { a: 0, b: 1 },
        b: { a: 2, b: 3 }
      };
      const o2 = {
        a: { a: 1, b: 2 },
        b: { a: 3, b: 4 }
      };
      const wrap1 = new Super(o1);
      const wrap2 = new Super(o2);

      assert.strictEqual(wrap1.deepSome((value) => value < 1, 2), true);
      assert.strictEqual(wrap2.deepSome((value) => value < 1, 2), false);
    });
    it('should not iterate after getting false', () => {
      const o = {
        a: { a: 0, b: 1 },
        b: { a: 2, b: 3 }
      };
      const wrap = new Super(o);

      assert.strictEqual(wrap.deepSome((value) => {
        if (!value) {
          return true;
        }

        throw new Error();
      }, 2), true);
    });
    it('should support 4th "tree" argument', () => {
      const o1 = {
        0: { 0: 0, 1: 1 },
        1: { 2: 2, 3: 3 }
      };
      const o2 = {
        0: { 1: 1, 2: 2 },
        1: { 3: 3, 4: 4 }
      };
      const wrap1 = new Super(o1);
      const wrap2 = new Super(o2);

      assert.strictEqual(wrap1.deepSome((value, key, object, tree) => {
        let sum = 0;

        for (let i = 0; i < tree.length; i++) {
          const k = tree[i].key;

          sum += Number(k);
        }

        return !sum;
      }, 2), true);
      assert.strictEqual(wrap2.deepSome((value, key, object, tree) => {
        let sum = 0;

        for (let i = 0; i < tree.length; i++) {
          const k = tree[i].key;

          sum += Number(k);
        }

        return !sum;
      }, 2), false);
    });
  });
  describe('deepStrictEquals()', () => {
    it('should return true with argument, which nested values are strict equal to context\'s', () => {
      const o = { a: { a: 1 } };
      const copy = { a: { a: 1 } };
      const wrap = new Super(o);

      assert.strictEqual(wrap.deepStrictEquals(copy), true);
    });
    it('should return false with argument, which nested values are not strict equal to context\'s', () => {
      const o = { a: { a: 1 } };
      const copy = { a: { a: '1' } };
      const wrap = new Super(o);

      assert.strictEqual(wrap.deepStrictEquals(copy), false);
    });
  });
  describe('define()', () => {
    it('should support (property, descriptor) syntax', () => {
      const o = {};
      const descriptor = { value: 1 };
      const wrap = new Super(o);

      wrap.define('key', descriptor);

      assert.deepEqual(Object.getOwnPropertyDescriptor(o, 'key'), {
        value: 1,
        writable: false,
        enumerable: false,
        configurable: false
      });
    });
    it('should support object argument syntax', () => {
      const o = {};
      const descriptor1 = { value: 1 };
      const getter = () => 2;
      const descriptor2 = { get: getter };
      const wrap = new Super(o);

      wrap.define({ key1: descriptor1, key2: descriptor2 });

      assert.deepEqual(Object.getOwnPropertyDescriptor(o, 'key1'), {
        value: 1,
        writable: false,
        enumerable: false,
        configurable: false
      });
      assert.deepEqual(Object.getOwnPropertyDescriptor(o, 'key2'), {
        get: getter,
        set: undefined,
        enumerable: false,
        configurable: false
      });
    });
  });
  describe('delete()', () => {
    it('should delete multiple properties from arguments', () => {
      const o = { a: 1, b: 2, c: 3 };
      const wrap = new Super(o);

      wrap.delete('c', 'a');

      assert.deepEqual(o, { b: 2 });
    });
  });
  describe('equals()', () => {
    it('should return true with equal argument', () => {
      const o = {};
      const wrap = new Super(o);

      assert.strictEqual(wrap.equals(o), true);
    });
  });
  describe('every()', () => {
    it('should return true with empty object', () => {
      const o = {};
      const wrap = new Super(o);

      assert.strictEqual(wrap.every(() => false), true);
    });
    it('should use Boolean function for checking for false alike values with no argument', () => {
      const o1 = { a: 0, b: 1 };
      const o2 = { a: 1, b: 2 };
      const wrap1 = new Super(o1);
      const wrap2 = new Super(o2);

      assert.strictEqual(wrap1.every(), false);
      assert.strictEqual(wrap2.every(), true);
    });
    it('should use argument function for checking for values', () => {
      const o1 = { a: 0, b: 1 };
      const o2 = { a: 1, b: 2 };
      const wrap1 = new Super(o1);
      const wrap2 = new Super(o2);

      assert.strictEqual(wrap1.every((value) => value < 2), true);
      assert.strictEqual(wrap2.every((value) => value < 2), false);
    });
    it('should check that every() does not iterate after getting false', () => {
      const o = { a: 0, b: 1 };
      const wrap = new Super(o);

      assert.strictEqual(wrap.every((value) => {
        if (!value) {
          return false;
        }

        throw new Error();
      }), false);
    });
  });
  describe('get()', () => {
    it('should support (property, getter) syntax', () => {
      const o = {};
      const getter = () => 1;
      const wrap = new Super(o);

      wrap.get('key', getter);

      assert.deepEqual(Object.getOwnPropertyDescriptor(o, 'key'), {
        get: getter,
        set: undefined,
        enumerable: false,
        configurable: false
      });
    });
    it('should support object argument syntax', () => {
      const o = {};
      const getter1 = () => 1;
      const getter2 = () => 2;
      const wrap = new Super(o);

      wrap.get({ key1: getter1, key2: getter2 });

      assert.deepEqual(Object.getOwnPropertyDescriptor(o, 'key1'), {
        get: getter1,
        set: undefined,
        enumerable: false,
        configurable: false
      });
      assert.deepEqual(Object.getOwnPropertyDescriptor(o, 'key2'), {
        get: getter2,
        set: undefined,
        enumerable: false,
        configurable: false
      });
    });
  });
  describe('filter()', () => {
    it('should return a wrap of a different object', () => {
      const o = {};
      const wrap = new Super(o);

      assert.notEqual(wrap.filter().$, o);
    });
    it('should use Boolean function for filtering values with no argument', () => {
      const o1 = { a: 0, b: 1 };
      const o2 = { a: 1, b: 2 };
      const wrap1 = new Super(o1);
      const wrap2 = new Super(o2);

      assert.deepEqual(wrap1.filter().$, { b: 1 });
      assert.deepEqual(wrap2.filter().$, { a: 1, b: 2 });
    });
    it('should use argument function for filtering values', () => {
      const o1 = { a: 0, b: 1 };
      const o2 = { a: 1, b: 2 };
      const wrap1 = new Super(o1);
      const wrap2 = new Super(o2);

      assert.deepEqual(wrap1.filter((value) => value < 2).$, { a: 0, b: 1 });
      assert.deepEqual(wrap2.filter((value) => value < 2).$, { a: 1 });
    });
  });
  describe('find()', () => {
    it('should return null if not find', () => {
      const o = { a: 0, b: 1, c: 2 };
      const wrap = new Super(o);

      assert.strictEqual(wrap.find((value) => value > 2), null);
    });
    it('should return { key, value } if find', () => {
      const o1 = { a: 0, b: 1, c: 2 };
      const o2 = { a: 1, b: 2, c: 3 };
      const wrap1 = new Super(o1);
      const wrap2 = new Super(o2);

      assert.deepEqual(wrap1.find((value) => value > 1), { key: 'c', value: 2 });
      assert.deepEqual(wrap2.find((value) => value > 1), { key: 'b', value: 2 });
    });
    it('should check that find() does not iterate after finding value', () => {
      const o = { a: 0, b: 1 };
      const wrap = new Super(o);

      assert.deepEqual(wrap.find((value) => {
        if (!value) {
          return true;
        }

        throw new Error();
      }), { key: 'a', value: 0 });
    });
  });
  describe('forEach()', () => {
    it('should call function on each iteration', () => {
      const o = { a: { a: 1 }, b: { a: 2 } };
      const wrap = new Super(o);

      assert.deepEqual(wrap.forEach((value) => value.a++).$, { a: { a: 2 }, b: { a: 3 } });
    });
  });
  describe('freeze()', () => {
    it('should freeze context', () => {
      const o = {};
      const wrap = new Super(o);

      wrap.freeze();

      assert.strictEqual(Object.isFrozen(o), true);
    });
  });
  describe('has()', () => {
    it('should return true with argument in context as property', () => {
      const o = { a: 1 };
      const wrap = new Super(o);

      assert.strictEqual(wrap.has('a'), true);
    });
    it('should return true with argument in context as property, but not own property', () => {
      const o = Object.create({ a: 1 });
      const wrap = new Super(o);

      assert.strictEqual(wrap.has('a'), true);
    });
    it('should return false with argument not in context as property', () => {
      const o = { a: 1 };
      const wrap = new Super(o);

      assert.strictEqual(wrap.has('b'), false);
    });
  });
  describe('hasOwn()', () => {
    it('should return true with argument in context as own property', () => {
      const o = { a: 1 };
      const wrap = new Super(o);

      assert.strictEqual(wrap.hasOwn('a'), true);
    });
    it('should return false with argument not in context as own property', () => {
      const o = Object.create({ a: 1 });
      const wrap = new Super(o);

      assert.strictEqual(wrap.hasOwn('a'), false);
    });
  });
  describe('instanceof()', () => {
    it('should return "<context> instanceof <argument>"', () => {
      const o = { a: 1 };
      const wrap = new Super(o);

      assert.strictEqual(wrap.instanceof(Object), true);
      assert.strictEqual(wrap.instanceof(Date), false);
    });
  });
  describe('isFrozen()', () => {
    it('should detect freezing', () => {
      const o = {};
      const wrap = new Super(o);

      Object.freeze(o);

      assert.strictEqual(wrap.isFrozen(), Object.isFrozen(o));
    });
  });
  describe('json()', () => {
    it('should support function argument', () => {
      const o = { a: 1 };
      const wrap = new Super(o);

      assert.strictEqual(wrap.json((key, value) => {
        if (Number(value) || Number(value) === 0) {
          return value + 1;
        }

        return value;
      }), '{"a":2}');
    });
    it('should support indent argument', () => {
      const o = { a: 1 };
      const wrap = new Super(o);

      assert.strictEqual(wrap.json(null, '\t'), '{\n\t"a": 1\n}');
    });
    it('should support indent argument only', () => {
      const o = { a: 1 };
      const wrap = new Super(o);

      assert.strictEqual(wrap.json('\t'), '{\n\t"a": 1\n}');
    });
  });
  describe('keyOf()', () => {
    it('should return null if not find', () => {
      const o = { a: 0, b: 1, c: 2 };
      const wrap = new Super(o);

      assert.strictEqual(wrap.keyOf(3), null);
    });
    it('should return key if find', () => {
      const o1 = { a: 0, b: 1, c: 2 };
      const o2 = { a: 1, b: 2, c: 3 };
      const wrap1 = new Super(o1);
      const wrap2 = new Super(o2);

      assert.strictEqual(wrap1.keyOf(2), 'c');
      assert.strictEqual(wrap2.keyOf(2), 'b');
    });
  });
  describe('keyOfStrict()', () => {
    it('should return null if not find', () => {
      const o = { a: 0, b: 1, c: 2 };
      const wrap = new Super(o);

      assert.strictEqual(wrap.keyOfStrict('0'), null);
    });
    it('should return key if find', () => {
      const o1 = { a: 0, b: 1, c: '1' };
      const o2 = { a: 1, b: '1', c: 3 };
      const wrap1 = new Super(o1);
      const wrap2 = new Super(o2);

      assert.strictEqual(wrap1.keyOfStrict('1'), 'c');
      assert.strictEqual(wrap2.keyOfStrict('1'), 'b');
    });
  });
  describe('keys()', () => {
    it('should return a wrap of an array of keys of context', () => {
      const o = { a: 1 };
      const wrap = new Super(o);

      assert.deepEqual(wrap.keys().$, Object.keys(o));
    });
  });
  describe('map()', () => {
    it('should return a wrap of a different object', () => {
      const o = {};
      const wrap = new Super(o);

      assert.notEqual(wrap.map(() => {}).$, o);
    });
    it('should set values', () => {
      const o = { a: 1, b: 2, c: 3 };
      const sq = { a: 1, b: 4, c: 9 };
      const wrap = new Super(o);

      assert.deepEqual(wrap.map((value) => value * value).$, sq);
    });
  });
  describe('max()', () => {
    it('should return { key: null, value: -Infinity }, if no value > -Infinity found', () => {
      const o = { a: 'a' };
      const wrap = new Super(o);

      assert.deepEqual(wrap.max(), { key: null, value: -Infinity });
    });
    it('should return { key, value: max }, where max is first maximum value of context', () => {
      const o = { a: 1, b: 2, c: 3 };
      const wrap = new Super(o);

      assert.deepEqual(wrap.max(), { key: 'c', value: 3 });
    });
    it('should return { key, value: max } using mapFn', () => {
      const o = { a: 1, b: 2, c: 3 };
      const wrap = new Super(o);
      const max = wrap.max((value) => 4 - value);

      assert.deepEqual(max, { key: 'a', value: 3 });
    });
  });
  describe('min()', () => {
    it('should return { key: null, value: Infinity }, if no value < Infinity found', () => {
      const o = { a: 'a' };
      const wrap = new Super(o);

      assert.deepEqual(wrap.min(), { key: null, value: Infinity });
    });
    it('should return { key, value: min }, where min is first maximum value of context', () => {
      const o = { a: 1, b: 2, c: 3 };
      const wrap = new Super(o);

      assert.deepEqual(wrap.min(), { key: 'a', value: 1 });
    });
    it('should return { key, value: min } using mapFn', () => {
      const o = { a: 1, b: 2, c: 3 };
      const wrap = new Super(o);
      const min = wrap.min((value) => 4 - value);

      assert.deepEqual(min, { key: 'c', value: 1 });
    });
  });
  describe('object()', () => {
    it('should return wrap of an object using mapFn', () => {
      const o = { a: 1, b: 2, c: 3 };
      const wrap = new Super(o);

      assert.deepEqual(
        wrap.object((object, value, key) => (object[value] = key + value)).$,
        { 1: 'a1', 2: 'b2', 3: 'c3' }
      );
    });
    // TODO: test for the second argument
  });
  describe('prop()', () => {
    it('should get object[property] with one string argument', () => {
      const o = { a: 1, b: 2, c: 3 };
      const wrap = new Super(o);

      assert.strictEqual(wrap.prop('a'), 1);
    });
    it('should support (property, value) setter syntax', () => {
      const o = { a: 1, b: 2, c: 3 };
      const wrap = new Super(o);

      wrap.prop('a', 4);

      assert.deepEqual(o, { a: 4, b: 2, c: 3 });
    });
    it('should support { [property]: value, ... } setter syntax', () => {
      const o = { a: 1, b: 2, c: 3 };
      const wrap = new Super(o);

      wrap.prop({
        a: 4,
        b: 5,
        d: 6
      });

      assert.deepEqual(o, { a: 4, b: 5, c: 3, d: 6 });
    });
  });
  describe('propertyDescriptor()', () => {
    it('should return property descriptor', () => {
      const o = { a: 1 };
      const wrap = new Super(o);

      assert.deepEqual(wrap.propertyDescriptor('a'), Object.getOwnPropertyDescriptor(o, 'a'));
    });
  });
  describe('propertyNames()', () => {
    it('should return property names', () => {
      const o = { a: 1, b: 1 };
      const wrap = new Super(o);

      assert.deepEqual(wrap.propertyNames().$, ['a', 'b']);
    });
  });
  describe('propertySymbols()', () => {
    it('should return property symbols if Symbol is supported', () => {
      if (Symbol && Symbol.for) {
        const symbol = Symbol('D');
        const symbolFor = Symbol.for('D');
        const o = { [symbol]: 1, [symbolFor]: 2 };
        const wrap = new Super(o);

        assert.deepEqual(wrap.propertySymbols().$, [symbol, symbolFor]);
      }
    });
  });
  describe('proto()', () => {
    it('should return prototype of context with no arguments', () => {
      const proto = {};
      const o = Object.create(proto);
      const wrap = new Super(o);

      assert.strictEqual(wrap.proto(), Object.getPrototypeOf(o));
    });
    it('should set prototype of context to argument, if its present', () => {
      const o = {};
      const proto = {};
      const wrap = new Super(o);

      wrap.proto(proto);

      assert.strictEqual(Object.getPrototypeOf(o), proto);
    });
  });
  describe('reduce()', () => {
    it('should support call without second argument', () => {
      const o = { a: 1, b: 2, c: 3 };
      const wrap = new Super(o);

      assert.strictEqual(wrap.reduce((sum, value) => sum + value), 6);
    });
    it('should return initial value after actions', () => {
      const o = { a: 1, b: 2, c: 3 };
      const wrap = new Super(o);

      assert.strictEqual(wrap.reduce((sum, value) => sum + value, ''), '123');
    });
  });
  describe('set()', () => {
    it('should support (property, setter) syntax', () => {
      const o = {};
      const setter = () => 1;
      const wrap = new Super(o);

      wrap.set('key', setter);

      assert.deepEqual(Object.getOwnPropertyDescriptor(o, 'key'), {
        get: undefined,
        set: setter,
        enumerable: false,
        configurable: false
      });
    });
    it('should support object argument syntax', () => {
      const o = {};
      const setter1 = () => 1;
      const setter2 = () => 2;
      const wrap = new Super(o);

      wrap.set({ key1: setter1, key2: setter2 });

      assert.deepEqual(Object.getOwnPropertyDescriptor(o, 'key1'), {
        get: undefined,
        set: setter1,
        enumerable: false,
        configurable: false
      });
      assert.deepEqual(Object.getOwnPropertyDescriptor(o, 'key2'), {
        get: undefined,
        set: setter2,
        enumerable: false,
        configurable: false
      });
    });
  });
  describe('some()', () => {
    it('should return false with empty object', () => {
      const o = {};
      const wrap = new Super(o);

      assert.strictEqual(wrap.some(() => true), false);
    });
    it('should use Boolean function for checking for false alike values with no argument', () => {
      const o1 = { a: 0 };
      const o2 = { a: 1 };
      const wrap1 = new Super(o1);
      const wrap2 = new Super(o2);

      assert.strictEqual(wrap1.some(), false);
      assert.strictEqual(wrap2.some(), true);
    });
    it('should use argument function for checking for values', () => {
      const o1 = { a: 0, b: 1 };
      const o2 = { a: 1, b: 2 };
      const wrap1 = new Super(o1);
      const wrap2 = new Super(o2);

      assert.strictEqual(wrap1.some((value) => value < 1), true);
      assert.strictEqual(wrap2.some((value) => value < 1), false);
    });
    it('should check that some() does not iterate after getting false', () => {
      const o = { a: 0, b: 1 };
      const wrap = new Super(o);

      assert.strictEqual(wrap.some((value) => {
        if (!value) {
          return true;
        }

        throw new Error();
      }), true);
    });
  });
  describe('strictEquals()', () => {
    it('should return true with strict equal argument', () => {
      const o = 1;
      const wrap = new Super(o);

      assert.strictEqual(wrap.strictEquals(1), true);
    });
    it('should return false with equal, but not strict equal argument', () => {
      const o = 1;
      const wrap = new Super(o);

      assert.strictEqual(wrap.strictEquals('1'), false);
    });
  });
  describe('sum()', () => {
    it('should return sum of values with no arguments', () => {
      const o = { a: 1, b: 2, c: 3 };
      const wrap = new Super(o);

      assert.strictEqual(wrap.sum(), 6);
    });
    it('should return sum of calculated expressions with function argument', () => {
      const o = { a: 1, b: 2, c: 3 };
      const wrap = new Super(o);

      assert.strictEqual(wrap.sum((value) => value * 2), 12);
    });
  });
  describe('toJSON()', () => {
    it('should return json without D wraps', () => {
      const o = { a: new Super({ a: 1 }) };
      const wrap = new Super(o);

      assert.strictEqual(wrap.json(), '{"a":{"a":1}}');
    });
  });
  describe('get toStringTag', () => {
    it('should return Object.prototype.toString.call(<context>)', () => {
      const o1 = { a: 1 };
      const o2 = () => {};
      const o3 = 1;
      const o4 = '1';
      const o5 = true;
      const wrap1 = new Super(o1);
      const wrap2 = new Super(o2);
      const wrap3 = new Super(o3);
      const wrap4 = new Super(o4);
      const wrap5 = new Super(o5);

      assert.strictEqual(wrap1.toStringTag, 'Object');
      assert.strictEqual(wrap2.toStringTag, 'Function');
      assert.strictEqual(wrap3.toStringTag, 'Number');
      assert.strictEqual(wrap4.toStringTag, 'String');
      assert.strictEqual(wrap5.toStringTag, 'Boolean');
    });
  });
  describe('get type', () => {
    it('should return "typeof <context>"', () => {
      const o1 = { a: 1 };
      const o2 = () => {};
      const o3 = 1;
      const o4 = '1';
      const o5 = true;
      const wrap1 = new Super(o1);
      const wrap2 = new Super(o2);
      const wrap3 = new Super(o3);
      const wrap4 = new Super(o4);
      const wrap5 = new Super(o5);

      assert.strictEqual(wrap1.type, 'object');
      assert.strictEqual(wrap2.type, 'function');
      assert.strictEqual(wrap3.type, 'number');
      assert.strictEqual(wrap4.type, 'string');
      assert.strictEqual(wrap5.type, 'boolean');
    });
  });
  describe('value()', () => {
    it('should support (property, value) syntax', () => {
      const o = {};
      const wrap = new Super(o);

      wrap.value('key', 1);

      assert.deepEqual(Object.getOwnPropertyDescriptor(o, 'key'), {
        value: 1,
        writable: false,
        enumerable: false,
        configurable: false
      });
    });
    it('should support object argument syntax', () => {
      const o = {};
      const wrap = new Super(o);

      wrap.value({ key1: 1, key2: 2 });

      assert.deepEqual(Object.getOwnPropertyDescriptor(o, 'key1'), {
        value: 1,
        writable: false,
        enumerable: false,
        configurable: false
      });
      assert.deepEqual(Object.getOwnPropertyDescriptor(o, 'key2'), {
        value: 2,
        writable: false,
        enumerable: false,
        configurable: false
      });
    });
  });
  describe('values()', () => {
    it('should return a wrap of an array of values of context', () => {
      const o = { a: 1, b: 2, c: 3 };
      const wrap = new Super(o);

      assert.deepEqual(wrap.values().$, [1, 2, 3]);
    });
  });
  describe('word()', () => {
    it('should return concatenation of values with no arguments', () => {
      const o = { a: 1, b: 2, c: 3 };
      const wrap = new Super(o);

      assert.strictEqual(wrap.word(), '123');
    });
    it('should return sum of calculated expressions with function argument', () => {
      const o = { a: 1, b: 2, c: 3 };
      const wrap = new Super(o);

      assert.strictEqual(wrap.word((value) => String(value) + value), '112233');
    });
  });
});
