import Class from './';
import '../Array';
const assert = require('assert');

describe('it should test D.Object.prototype.[methods]', () => {
  // TODO: .array()
  describe('assign()', () => {
    it('should rewrite original values', () => {
      const o = { a: 1, b: 2, c: 3 },
        wrap = new Class(o);
      assert.deepEqual(wrap.assign({ a: 5, b: 4 }).$, { a: 5, b: 4, c: 3 });
    });
    it('should rewrite rewritten values from left to right', () => {
      const o = { a: 1, b: 2, c: 3, d: 4 },
        re1 = { a: 5, b: 4, c: 8 },
        re2 = { b: 7, c: 9 },
        re3 = { a: -1, b: -2 },
        wrap = new Class(o);
      assert.deepEqual(wrap.assign(re1, re2, re3).$, { a: -1, b: -2, c: 9, d: 4 });
    });
  });
  describe('average()', () => {
    it('should return average value of values with no arguments', () => {
      const o = { a: 1, b: 2, c: 3 },
        wrap = new Class(o);
      assert.strictEqual(wrap.average(), 2);
    });
    it('should return average value of calculated expressions with function argument', () => {
      const o = { a: 1, b: 2, c: 3 },
        wrap = new Class(o);
      assert.strictEqual(wrap.average((value) => value * 2), 4);
    });
  });
  describe('call()', () => {
    it('should call function with context as context', () => {
      const random = Math.random(),
        o = { [random]: 1 },
        f = function (...args) {
          return this.$[random] + new Class(args).sum();
        },
        wrap = new Class(o);
      assert.strictEqual(wrap.call(f, 2, 3, 4), 10);
    });
  });
  // TODO: .clone()
  describe('get count', () => {
    it('should return count of own properties context', () => {
      const o = { a: 1, b: 2, c: 3 },
        wrap = new Class(o);
      assert.strictEqual(wrap.count, 3);
    });
  });
  // TODO: .deepAssign()
  // TODO: .deepClone()
  describe('deepEquals()', () => {
    it('should return true with argument, which nested values are equal to context\'s', () => {
      const o = { a: { a: 1 } },
        copy = { a: { a: '1' } },
        wrap = new Class(o);
      assert.strictEqual(wrap.deepEquals(copy), true);
    });
    it('should return false with argument, which keys are not equal to context\'s, but values are', () => {
      const o = { a: undefined },
        copy = { b: undefined },
        wrap = new Class(o);
      assert.strictEqual(wrap.deepEquals(copy), false);
    });
    it('should return false with instance of initial non-empty object', () => {
      const o = { a: 1 },
        copy = Object.create(o),
        wrap = new Class(o);
      assert.strictEqual(wrap.deepEquals(copy), false);
    });
  });
  describe('deepEvery()', () => {
    it('should return true with nested empty objects only', () => {
      const o = { a: {}, b: {} },
        wrap = new Class(o);
      assert.strictEqual(wrap.deepEvery(() => false, 2), true);
    });
    it('should use Boolean function for checking for falsey values', () => {
      const o1 = {
          a: { a: 0, b: 1 },
          b: { a: 2, b: 3 }
        },
        o2 = {
          a: { a: 1, b: 2 },
          b: { a: 3, b: 4 }
        },
        wrap1 = new Class(o1),
        wrap2 = new Class(o2);
      assert.strictEqual(wrap1.deepEvery(2), false);
      assert.strictEqual(wrap2.deepEvery(2), true);
    });
    it('should use argument function for checking for falsey values', () => {
      const o1 = {
          a: { a: 0, b: 1 },
          b: { a: 2, b: 3 }
        },
        o2 = {
          a: { a: 1, b: 2 },
          b: { a: 3, b: 4 }
        },
        wrap1 = new Class(o1),
        wrap2 = new Class(o2);
      assert.strictEqual(wrap1.deepEvery((value) => value < 4, 2), true);
      assert.strictEqual(wrap2.deepEvery((value) => value < 4, 2), false);
    });
    it('should check that deepEvery() does not iterate after getting false', () => {
      const o = {
          a: { a: 0, b: 1 },
          b: { a: 2, b: 3 }
        },
        wrap = new Class(o);
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
        },
        o2 = {
          0: { 1: 1, 2: 2 },
          1: { 3: 3, 4: 4 }
        },
        wrap1 = new Class(o1),
        wrap2 = new Class(o2);
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
      const o = {},
        wrap = new Class(o);
      assert.notEqual(wrap.deepFilter(2).$, o);
    });
    it('should return a wrap of an object also with different objects inside it', () => {
      const o = { a: { a: 1 } },
        wrap = new Class(o),
        newO = wrap.deepFilter(2).$;
      assert.deepEqual(newO.a, { a: 1 });
      assert.notEqual(newO, o.a);
    });
    it('should use Boolean function for filtering values', () => {
      const o1 = { a: { a: 0, b: 1 } },
        o2 = { a: { a: 1, b: 2 } },
        wrap1 = new Class(o1),
        wrap2 = new Class(o2);
      assert.deepEqual(wrap1.deepFilter(2).$, { a: { b: 1 } });
      assert.deepEqual(wrap2.deepFilter(2).$, { a: { a: 1, b: 2 } });
    });
    it('should use argument function for filtering values', () => {
      const o1 = { a: { a: 0, b: 1 } },
        o2 = { a: { a: 1, b: 2 } },
        wrap1 = new Class(o1),
        wrap2 = new Class(o2);
      assert.deepEqual(wrap1.deepFilter((value) => value < 2, 2).$, { a: { a: 0, b: 1 } });
      assert.deepEqual(wrap2.deepFilter((value) => value < 2, 2).$, { a: { a: 1 } });
    });
    it('should support 4th "tree" argument', () => {
      const o1 = { 0: { 0: 0, 1: 1, 2: 2 } },
        o2 = { 0: { 1: 1, 2: 2, 3: 3 } },
        wrap1 = new Class(o1),
        wrap2 = new Class(o2);
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
      const o = { a: {}, b: {} },
        wrap = new Class(o);
      assert.strictEqual(wrap.deepFind(() => true, 2), null);
    });
    it('should return tree if find', () => {
      const o1 = {
          a: { a: 0, b: 1 },
          b: { a: 2, b: 3 }
        },
        o2 = {
          a: { a: 1, b: 2 },
          b: { a: 3, b: 4 }
        },
        wrap1 = new Class(o1),
        wrap2 = new Class(o2);
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
  describe('deepFreeze()', () => {
    it('should freeze context', () => {
      const o = {},
        wrap = new Class(o);
      wrap.deepFreeze();
      assert.strictEqual(Object.isFrozen(o), true);
    });
    it('should freeze all inner objects', () => {
      const a = {},
        b = { a },
        o = { b },
        wrap = new Class(o);
      wrap.deepFreeze();
      assert.strictEqual(Object.isFrozen(a), true);
      assert.strictEqual(Object.isFrozen(b), true);
    });
  });
  describe('deepMap()', () => {
    it('should return a wrap of a different object', () => {
      const o = {},
        wrap = new Class(o);
      assert.notEqual(wrap.deepMap(() => {}).$, o);
    });
    it('should return a wrap of an object also with different objects inside it', () => {
      const o = { a: { a: 1 } },
        wrap = new Class(o),
        newO = wrap.deepMap((value) => value, 2).$;
      assert.deepEqual(newO.a, { a: 1 });
      assert.notEqual(newO, o.a);
    });
    it('should set values', () => {
      const o = {
          a: { a: 1, b: 2 },
          b: { a: 3, b: 4 }
        },
        sq = {
          a: { a: 1, b: 4 },
          b: { a: 9, b: 16 }
        },
        wrap = new Class(o);
      assert.deepEqual(wrap.deepMap((value) => value * value, 2).$, sq);
    });
    it('should support 4th "tree" argument', () => {
      const o = {
          a: { a: 1, b: 2 },
          b: { a: 3, b: 4 }
        },
        concat = {
          a: { a: 'aa1', b: 'ba2' },
          b: { a: 'ab3', b: 'bb4' }
        },
        wrap = new Class(o);
      assert.deepEqual(wrap.deepMap((value, key, object, tree) => {
        let string = '';
        for (let i = 0; i < tree.length; i++) {
          const k = tree[i].key;
          string += k !== null ? k : '';
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
        },
        wrap = new Class(o);
      assert.strictEqual(wrap.deepReduce((sum, value) => sum + value, 2), 10);
    });
    it('should support 5th "tree" argument', () => {
      const o = {
          a: { a: 1, b: 2 },
          b: { a: 3, b: 4 }
        },
        wrap = new Class(o);
      assert.strictEqual(wrap.deepReduce((IV, value, key, object, tree) => {
        for (let i = 0; i < tree.length; i++) {
          const k = tree[i].key;
          IV += k !== null ? k : '';
        }
        return IV + value;
      }, 2, ''), 'aa1ba2ab3bb4');
    });
  });
  describe('deepSome()', () => {
    it('should return false with nested empty objects only', () => {
      const o = { a: {}, b: {} },
        wrap = new Class(o);
      assert.strictEqual(wrap.deepSome(() => true, 2), false);
    });
    it('should use Boolean function for checking for false alike values', () => {
      const o1 = { a: { a: 0 } },
        o2 = { a: { a: 1 } },
        wrap1 = new Class(o1),
        wrap2 = new Class(o2);
      assert.strictEqual(wrap1.deepSome(2), false);
      assert.strictEqual(wrap2.deepSome(2), true);
    });
    it('should use argument function for checking for false alike values', () => {
      const o1 = {
          a: { a: 0, b: 1 },
          b: { a: 2, b: 3 }
        },
        o2 = {
          a: { a: 1, b: 2 },
          b: { a: 3, b: 4 }
        },
        wrap1 = new Class(o1),
        wrap2 = new Class(o2);
      assert.strictEqual(wrap1.deepSome((value) => value < 1, 2), true);
      assert.strictEqual(wrap2.deepSome((value) => value < 1, 2), false);
    });
    it('should check that deepEvery() does not iterate after getting false', () => {
      const o = {
          a: { a: 0, b: 1 },
          b: { a: 2, b: 3 }
        },
        wrap = new Class(o);
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
        },
        o2 = {
          0: { 1: 1, 2: 2 },
          1: { 3: 3, 4: 4 }
        },
        wrap1 = new Class(o1),
        wrap2 = new Class(o2);
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
      const o = { a: { a: 1 } },
        copy = { a: { a: 1 } },
        wrap = new Class(o);
      assert.strictEqual(wrap.deepStrictEquals(copy), true);
    });
    it('should return false with argument, which nested values are not strict equal to context\'s', () => {
      const o = { a: { a: 1 } },
        copy = { a: { a: '1' } },
        wrap = new Class(o);
      assert.strictEqual(wrap.deepStrictEquals(copy), false);
    });
  });
  describe('define()', () => {
    it('should support (property, descriptor) syntax', () => {
      const o = {},
        descriptor = { value: 1 },
        wrap = new Class(o);
      wrap.define('key', descriptor);
      assert.deepEqual(Object.getOwnPropertyDescriptor(o, 'key'), {
        value: 1,
        writable: false,
        enumerable: false,
        configurable: false
      });
    });
    it('should support object argument syntax', () => {
      const o = {},
        descriptor1 = { value: 1 },
        getter = () => 2,
        descriptor2 = { get: getter },
        wrap = new Class(o);
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
    it('should delete property', () => {
      const o = { a: 1 },
        wrap = new Class(o);
      wrap.delete('a');
      assert.strictEqual('a' in o, false);
    });
    // TODO: test for deleting multiple keys
  });
  describe('equals()', () => {
    it('should return true with equal argument', () => {
      const o = {},
        wrap = new Class(o);
      assert.strictEqual(wrap.equals(o), true);
    });
  });
  describe('every()', () => {
    it('should return true with empty object', () => {
      const o = {},
        wrap = new Class(o);
      assert.strictEqual(wrap.every(() => false), true);
    });
    it('should use Boolean function for checking for false alike values with no argument', () => {
      const o1 = { a: 0, b: 1 },
        o2 = { a: 1, b: 2 },
        wrap1 = new Class(o1),
        wrap2 = new Class(o2);
      assert.strictEqual(wrap1.every(), false);
      assert.strictEqual(wrap2.every(), true);
    });
    it('should use argument function for checking for values', () => {
      const o1 = { a: 0, b: 1 },
        o2 = { a: 1, b: 2 },
        wrap1 = new Class(o1),
        wrap2 = new Class(o2);
      assert.strictEqual(wrap1.every((value) => value < 2), true);
      assert.strictEqual(wrap2.every((value) => value < 2), false);
    });
    it('should check that every() does not iterate after getting false', () => {
      const o = { a: 0, b: 1 },
        wrap = new Class(o);
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
      const o = {},
        getter = () => 1,
        wrap = new Class(o);
      wrap.get('key', getter);
      assert.deepEqual(Object.getOwnPropertyDescriptor(o, 'key'), {
        get: getter,
        set: undefined,
        enumerable: false,
        configurable: false
      });
    });
    it('should support object argument syntax', () => {
      const o = {},
        getter1 = () => 1,
        getter2 = () => 2,
        wrap = new Class(o);
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
      const o = {},
        wrap = new Class(o);
      assert.notEqual(wrap.filter().$, o);
    });
    it('should use Boolean function for filtering values with no argument', () => {
      const o1 = { a: 0, b: 1 },
        o2 = { a: 1, b: 2 },
        wrap1 = new Class(o1),
        wrap2 = new Class(o2);
      assert.deepEqual(wrap1.filter().$, { b: 1 });
      assert.deepEqual(wrap2.filter().$, { a: 1, b: 2 });
    });
    it('should use argument function for filtering values', () => {
      const o1 = { a: 0, b: 1 },
        o2 = { a: 1, b: 2 },
        wrap1 = new Class(o1),
        wrap2 = new Class(o2);
      assert.deepEqual(wrap1.filter((value) => value < 2).$, { a: 0, b: 1 });
      assert.deepEqual(wrap2.filter((value) => value < 2).$, { a: 1 });
    });
  });
  describe('find()', () => {
    it('should return null if not find', () => {
      const o = { a: 0, b: 1, c: 2 },
        wrap = new Class(o);
      assert.strictEqual(wrap.find((value) => value > 2), null);
    });
    it('should return { key, value } if find', () => {
      const o1 = { a: 0, b: 1, c: 2 },
        o2 = { a: 1, b: 2, c: 3 },
        wrap1 = new Class(o1),
        wrap2 = new Class(o2);
      assert.deepEqual(wrap1.find((value) => value > 1), { key: 'c', value: 2 });
      assert.deepEqual(wrap2.find((value) => value > 1), { key: 'b', value: 2 });
    });
    it('should check that find() does not iterate after finding value', () => {
      const o = { a: 0, b: 1 },
        wrap = new Class(o);
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
      const o = { a: { a: 1 }, b: { a: 2 } },
        wrap = new Class(o);
      assert.deepEqual(wrap.forEach((value) => value.a++).$, { a: { a: 2 }, b: { a: 3 } });
    });
  });
  describe('freeze()', () => {
    it('should freeze context', () => {
      const o = {},
        wrap = new Class(o);
      wrap.freeze();
      assert.strictEqual(Object.isFrozen(o), true);
    });
  });
  describe('has()', () => {
    it('should return true with argument in context as property', () => {
      const wrap = new Class({ a: 1 });
      assert.strictEqual(wrap.has('a'), true);
    });
    it('should return true with argument in context as property, but not own property', () => {
      const wrap = new Class(Object.create({ a: 1 }));
      assert.strictEqual(wrap.has('a'), true);
    });
    it('should return false with argument not in context as property', () => {
      const wrap = new Class({ a: 1 });
      assert.strictEqual(wrap.has('b'), false);
    });
  });
  describe('hasOwn()', () => {
    it('should return true with argument in context as own property', () => {
      const wrap = new Class({ a: 1 });
      assert.strictEqual(wrap.hasOwn('a'), true);
    });
    it('should return false with argument not in context as own property', () => {
      const wrap = new Class(Object.create({ a: 1 }));
      assert.strictEqual(wrap.hasOwn('a'), false);
    });
  });
  // TODO: .instanceof()
  describe('isFrozen()', () => {
    it('should detect freezing', () => {
      const o = {},
        wrap = new Class(o);
      Object.freeze(o);
      assert.strictEqual(wrap.isFrozen(), Object.isFrozen(o));
    });
  });
  describe('json()', () => {
    it('should support function argument', () => {
      const wrap = new Class({ a: 1 });
      assert.strictEqual(wrap.json((key, value) => {
        if (Number(value) || Number(value) === 0) {
          return value + 1;
        }

        return value;
      }), '{"a":2}');
    });
    it('should support indent argument', () => {
      const wrap = new Class({ a: 1 });
      assert.strictEqual(wrap.json(null, '\t'), '{\n\t"a": 1\n}');
    });
    it('should support indent argument only', () => {
      const wrap = new Class({ a: 1 });
      assert.strictEqual(wrap.json('\t'), '{\n\t"a": 1\n}');
    });
    it('should return json without D wraps', () => {
      const wrap = new Class({ a: new Class({ a: 1 }) });
      assert.strictEqual(wrap.json(), '{"a":{"a":1}}');
    });
  });
  describe('keyOf()', () => {
    it('should return null if not find', () => {
      const o = { a: 0, b: 1, c: 2 },
        wrap = new Class(o);
      assert.strictEqual(wrap.keyOf(3), null);
    });
    it('should return key if find', () => {
      const o1 = { a: 0, b: 1, c: 2 },
        o2 = { a: 1, b: 2, c: 3 },
        wrap1 = new Class(o1),
        wrap2 = new Class(o2);
      assert.strictEqual(wrap1.keyOf(2), 'c');
      assert.strictEqual(wrap2.keyOf(2), 'b');
    });
  });
  describe('keyOfStrict()', () => {
    it('should return null if not find', () => {
      const o = { a: 0, b: 1, c: 2 },
        wrap = new Class(o);
      assert.strictEqual(wrap.keyOfStrict('0'), null);
    });
    it('should return key if find', () => {
      const o1 = { a: 0, b: 1, c: '1' },
        o2 = { a: 1, b: '1', c: 3 },
        wrap1 = new Class(o1),
        wrap2 = new Class(o2);
      assert.strictEqual(wrap1.keyOfStrict('1'), 'c');
      assert.strictEqual(wrap2.keyOfStrict('1'), 'b');
    });
  });
  describe('keys()', () => {
    it('should return a wrap of an array of keys of context', () => {
      const o = { a: 1 },
        wrap = new Class(o);
      assert.deepEqual(wrap.keys().$, Object.keys(o));
    });
  });
  describe('map()', () => {
    it('should return a wrap of a different object', () => {
      const o = {},
        wrap = new Class(o);
      assert.notEqual(wrap.map(() => {}).$, o);
    });
    it('should set values', () => {
      const o = { a: 1, b: 2, c: 3 },
        sq = { a: 1, b: 4, c: 9 },
        wrap = new Class(o);
      assert.deepEqual(wrap.map((value) => value * value).$, sq);
    });
  });
  // TODO: .max()
  // TODO: .min()
  // TODO: .object()
  describe('propertyDescriptor()', () => {
    it('should return property descriptor', () => {
      const o = { a: 1 },
        wrap = new Class(o);
      assert.deepEqual(wrap.propertyDescriptor('a'), Object.getOwnPropertyDescriptor(o, 'a'));
    });
  });
  describe('propertyNames()', () => {
    it('should return property names', () => {
      const o = { a: 1, b: 1 },
        wrap = new Class(o);
      assert.deepEqual(wrap.propertyNames().$, ['a', 'b']);
    });
  });
  describe('propertySymbols()', () => {
    it('should return property symbols', () => {
      if (Symbol && Symbol.for) {
        const symbol = Symbol('D'),
          symbolFor = Symbol.for('D'),
          o = { [symbol]: 1, [symbolFor]: 2 },
          wrap = new Class(o);
        assert.deepEqual(wrap.propertySymbols().$, [symbol, symbolFor]);
      }
    });
  });
  describe('proto()', () => {
    it('should return prototype of context with no arguments', () => {
      const proto = {},
        o = Object.create(proto),
        wrap = new Class(o);
      assert.strictEqual(wrap.proto(), Object.getPrototypeOf(o));
    });
    it('should set prototype of context to argument, if its present', () => {
      const o = {},
        proto = {},
        wrap = new Class(o);
      wrap.proto(proto);
      assert.strictEqual(Object.getPrototypeOf(o), proto);
    });
  });
  describe('reduce()', () => {
    it('should support call without second argument', () => {
      const wrap = new Class({ a: 1, b: 2, c: 3 });
      assert.strictEqual(wrap.reduce((sum, value) => sum + value), 6);
    });
    it('should return initial value after actions', () => {
      const wrap = new Class({ a: 1, b: 2, c: 3 });
      assert.strictEqual(wrap.reduce((sum, value) => sum + value, ''), '123');
    });
  });
  describe('set()', () => {
    it('should support (property, setter) syntax', () => {
      const o = {},
        setter = () => 1,
        wrap = new Class(o);
      wrap.set('key', setter);
      assert.deepEqual(Object.getOwnPropertyDescriptor(o, 'key'), {
        get: undefined,
        set: setter,
        enumerable: false,
        configurable: false
      });
    });
    it('should support object argument syntax', () => {
      const o = {},
        setter1 = () => 1,
        setter2 = () => 2,
        wrap = new Class(o);
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
      const o = {},
        wrap = new Class(o);
      assert.strictEqual(wrap.some(() => true), false);
    });
    it('should use Boolean function for checking for false alike values with no argument', () => {
      const o1 = { a: 0 },
        o2 = { a: 1 },
        wrap1 = new Class(o1),
        wrap2 = new Class(o2);
      assert.strictEqual(wrap1.some(), false);
      assert.strictEqual(wrap2.some(), true);
    });
    it('should use argument function for checking for values', () => {
      const o1 = { a: 0, b: 1 },
        o2 = { a: 1, b: 2 },
        wrap1 = new Class(o1),
        wrap2 = new Class(o2);
      assert.strictEqual(wrap1.some((value) => value < 1), true);
      assert.strictEqual(wrap2.some((value) => value < 1), false);
    });
    it('should check that some() does not iterate after getting false', () => {
      const o = { a: 0, b: 1 },
        wrap = new Class(o);
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
      const o = 1,
        wrap = new Class(o);
      assert.strictEqual(wrap.strictEquals(1), true);
    });
    it('should return false with equal, but not strict equal argument', () => {
      const o = 1,
        wrap = new Class(o);
      assert.strictEqual(wrap.strictEquals('1'), false);
    });
  });
  describe('sum()', () => {
    it('should return sum of values with no arguments', () => {
      const o = { a: 1, b: 2, c: 3 },
        wrap = new Class(o);
      assert.strictEqual(wrap.sum(), 6);
    });
    it('should return sum of calculated expressions with function argument', () => {
      const o = { a: 1, b: 2, c: 3 },
        wrap = new Class(o);
      assert.strictEqual(wrap.sum((value) => value * 2), 12);
    });
  });
  // TODO: .typeof()
  describe('values()', () => {
    it('should return a wrap of an array of values of context', () => {
      const o = { a: 1, b: 2, c: 3 },
        wrap = new Class(o);
      assert.deepEqual(wrap.values().$, [1, 2, 3]);
    });
  });
  describe('word()', () => {
    it('should return concatenation of values with no arguments', () => {
      const o = { a: 1, b: 2, c: 3 },
        wrap = new Class(o);
      assert.strictEqual(wrap.word(), '123');
    });
    it('should return sum of calculated expressions with function argument', () => {
      const o = { a: 1, b: 2, c: 3 },
        wrap = new Class(o);
      assert.strictEqual(wrap.word((value) => String(value) + value), '112233');
    });
  });
});
