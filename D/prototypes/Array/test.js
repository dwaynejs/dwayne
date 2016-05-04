import Class from './module';
import '../String';
import { isNaN } from '../../libs';
const assert = require('assert');

describe('it should test D.Array.prototype.[methods]', () => {
  describe('concat()', () => {
    it('should return a wrap of a different array', () => {
      const o = [1, 2, 3, 4, 5],
        wrap = new Class(o);
      assert.notEqual(wrap.concat().$, o);
    });
    it('should work the same as Array.prototype.concat', () => {
      const o = [1, 2, 3],
        wrap = new Class(o);
      assert.deepEqual(wrap.concat(4).$, o.concat(4));
      assert.deepEqual(wrap.concat(4, [5]).$, o.concat(4, [5]));
      assert.deepEqual(wrap.concat(4, [5], [[6]]).$, o.concat(4, [5], [[6]]));
    });
  });
  describe('join()', () => {
    it('should return a wrap of joined string', () => {
      const a = [1, 2, 3, 4, 5];
      const wrap = new Class(a);

      assert.equal(wrap.join(), a.join());
      assert.equal(wrap.join('a'), a.join('a'));
    });
  });
  // TODO: get last
  // TODO: get length
  describe('pop()', () => {
    it('should delete last element', () => {
      const o = [1, 2, 3],
        wrap = new Class(o);
      wrap.pop();
      assert.deepEqual(o, [1, 2]);
    });
  });
  describe('push()', () => {
    it('should add elements from arguments to the end of context', () => {
      const o = [1, 2, 3],
        wrap = new Class(o);
      wrap.push(4, [5], [[6]]);
      assert.deepEqual(o, [1, 2, 3, 4, [5], [[6]]]);
    });
  });
  describe('reverse()', () => {
    it('should not modify original array', () => {
      const o = [1, 2, 3],
        wrap = new Class(o);
      wrap.reverse();
      assert.deepEqual(o, [1, 2, 3]);
    });
    it('should return wrap of reversed array', () => {
      const o = [1, 2, 3],
        wrap = new Class(o);
      assert.deepEqual(wrap.reverse().$, [3, 2, 1]);
    });
  });
  describe('shift()', () => {
    it('should delete first element', () => {
      const o = [1, 2, 3],
        wrap = new Class(o);
      wrap.shift();
      assert.deepEqual(o, [2, 3]);
    });
  });
  describe('shuffle()', () => {
    it('should not modify original array', () => {
      const o = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      const wrap = new Class(o);

      wrap.shuffle();
      assert.deepEqual(o, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });
    it('should return wrap of shuffled array', () => {
      const o = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        wrap = new Class(o),
        shuffled = wrap.shuffle().$;
      assert.notDeepEqual(shuffled, o);

      assert(shuffled.indexOf(0) !== -1);
      assert(shuffled.indexOf(1) !== -1);
      assert(shuffled.indexOf(2) !== -1);
      assert(shuffled.indexOf(3) !== -1);
      assert(shuffled.indexOf(4) !== -1);
      assert(shuffled.indexOf(5) !== -1);
      assert(shuffled.indexOf(6) !== -1);
      assert(shuffled.indexOf(7) !== -1);
      assert(shuffled.indexOf(8) !== -1);
      assert(shuffled.indexOf(9) !== -1);
    });
  });
  describe('slice()', () => {
    it('should return a wrap of a different array', () => {
      const o = [1, 2, 3, 4, 5],
        wrap = new Class(o);
      assert.notEqual(wrap.slice().$, o);
    });
    it('should work the same as Array.prototype.slice', () => {
      const o = [1, 2, 3, 4, 5],
        wrap = new Class(o);
      assert.deepEqual(wrap.slice().$, o.slice());
      assert.deepEqual(wrap.slice(3).$, o.slice(3));
      assert.deepEqual(wrap.slice(2, -1).$, o.slice(2, -1));
      assert.deepEqual(wrap.slice(2, 4).$, o.slice(2, 4));
    });
  });
  describe('sort()', () => {
    it('should use argument function for sorting values', () => {
      const o = [8, 13, 12, 0, 5, 9, -1, 6, 7, -2],
        wrap = new Class(o);
      assert.deepEqual(wrap.sort((x, y) => {
        if (y % 2 && !(x % 2)) {
          return 1;
        }

        if (x % 2 && !(y % 2)) {
          return -1;
        }

        return x > y ? 1 : x < y ? -1 : 0;
      }).$, [-1, 5, 7, 9, 13, -2, 0, 6, 8, 12]);
    });
  });
  // TODO: .sortAsc()
  /*
   it('should support "asc" argument', () => {
   const o = [8, 5, 10, -1, 6],
   wrap = new Class(o);
   assert.deepEqual(wrap.sort('asc').$, [-1, 5, 6, 8, 10]);
   });
   it('should support "asc" argument and put NaN to the beginning', () => {
   const o = [8, 5, 10, -1, NaN, 6],
   wrap = new Class(o);
   assert.strictEqual(isNaN(wrap.sort('asc').$[0]), true);
   });
  * */
  // TODO: .sortDesc()
  /*
   it('should support "desc" argument', () => {
   const o = [8, 5, 10, -1, 6],
   wrap = new Class(o);
   assert.deepEqual(wrap.sort('desc').$, [10, 8, 6, 5, -1]);
   });
   it('should support "desc" argument and put NaN to the end', () => {
   const o = [8, 5, 10, -1, NaN, 6],
   wrap = new Class(o),
   array = wrap.sort('desc').$;
   assert.strictEqual(isNaN(array[array.length - 1]), true);
   });
  * */
  describe('splice()', () => {
    it('should work the same as Array.prototype.splice', () => {
      let o = [1, 2, 3, 4, 5],
        wrap = new Class(o);
      assert.deepEqual(wrap.splice().$, [1, 2, 3, 4, 5]);

      o = [1, 2, 3, 4, 5];
      wrap = new Class(o);
      assert.deepEqual(wrap.splice(3).$, [1, 2, 3]);

      o = [1, 2, 3, 4, 5];
      wrap = new Class(o);
      assert.deepEqual(wrap.splice(2, 2).$, [1, 2, 5]);

      o = [1, 2, 3, 4, 5];
      wrap = new Class(o);
      assert.deepEqual(wrap.splice(1, 1, 5).$, [1, 5, 3, 4, 5]);

      o = [1, 2, 3, 4, 5];
      wrap = new Class(o);
      assert.deepEqual(wrap.splice(1, 1, 7, 9).$, [1, 7, 9, 3, 4, 5]);
    });
  });
  describe('string()', () => {
    it('should return concatenated into string array', () => {
      const o = [1, 2, 3],
        wrap = new Class(o);
      assert.strictEqual(wrap.string(), '123');
    });
  });
  describe('unshift()', () => {
    it('should add elements from arguments to the start of context', () => {
      const o = [1, 2, 3],
        wrap = new Class(o);
      wrap.unshift([[-2]], [-1], 0);
      assert.deepEqual(o, [[[-2]], [-1], 0, 1, 2, 3]);
    });
  });
});
