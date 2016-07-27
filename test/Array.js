import * as assert from 'assert';
import Arr, { array } from '../lib/Array';
import { isNaN } from '../lib/helpers';

describe('it should test Arr#', () => {
  describe('concat()', () => {
    it('should return a wrap of a different array', () => {
      const a = [1, 2, 3, 4, 5];
      const wrap = new Arr(a);
      
      assert.notEqual(wrap.concat().$, a);
    });
    it('should work the same as Array.prototype.concat', () => {
      const a = [1, 2, 3];
      const wrap = new Arr(a);
      
      assert.deepEqual(wrap.concat(4).$, a.concat(4));
      assert.deepEqual(wrap.concat(4, [5]).$, a.concat(4, [5]));
      assert.deepEqual(wrap.concat(4, [5], [[6]]).$, a.concat(4, [5], [[6]]));
    });
  });
  describe('indexOf()', () => {
    it('should return -1 if not find', () => {
      const a = [0, 1, 2];
      const wrap = new Arr(a);

      assert.strictEqual(wrap.indexOf(3), -1);
    });
    it('should return index if find', () => {
      const a1 = [0, 1, 2];
      const a2 = [1, 2, 3];
      const wrap1 = new Arr(a1);
      const wrap2 = new Arr(a2);

      assert.strictEqual(wrap1.indexOf(2), 2);
      assert.strictEqual(wrap2.indexOf(2), 1);
    });
    it('should find NaN', () => {
      const a = [0, NaN, 2];
      const wrap = new Arr(a);

      assert.strictEqual(wrap.indexOf(NaN), 1);
    });
  });
  describe('indexOfStrict()', () => {
    it('should return -1 if not find', () => {
      const a = [0, 1, 2];
      const wrap = new Arr(a);

      assert.strictEqual(wrap.indexOfStrict(3), -1);
    });
    it('should return index if find', () => {
      const a1 = [0, 1, 2];
      const a2 = [1, '2', 2];
      const wrap1 = new Arr(a1);
      const wrap2 = new Arr(a2);

      assert.strictEqual(wrap1.indexOfStrict(2), 2);
      assert.strictEqual(wrap2.indexOfStrict(2), 2);
    });
    it('should find NaN', () => {
      const a = [0, NaN, 2];
      const wrap = new Arr(a);

      assert.strictEqual(wrap.indexOfStrict(NaN), 1);
    });
  });
  describe('join()', () => {
    it('should return a wrap of joined string', () => {
      const a = [1, 2, 3, 4, 5];
      const wrap = new Arr(a);

      assert.equal(wrap.join(), a.join());
      assert.equal(wrap.join('a'), a.join('a'));
    });
  });
  describe('get last', () => {
    it('should return last element of array', () => {
      const a = [1, 2, 3, 4, 5];
      const wrap = new Arr(a);

      assert.equal(wrap.last, a[a.length - 1]);
    });
  });
  describe('get length', () => {
    it('should return length of array', () => {
      const a = [1, 2, 3, 4, 5];
      const wrap = new Arr(a);

      assert.equal(wrap.length, a.length);
    });
  });
  describe('pop()', () => {
    it('should delete the last element and return it', () => {
      const a = [1, 2, 3];
      const wrap = new Arr(a);
      
      assert.strictEqual(wrap.pop(), 3);
      assert.deepEqual(a, [1, 2]);
    });
  });
  describe('push()', () => {
    it('should add elements from arguments to the end of context', () => {
      const a = [1, 2, 3];
      const wrap = new Arr(a);
      
      wrap.push(4, [5], [[6]]);
      
      assert.deepEqual(a, [1, 2, 3, 4, [5], [[6]]]);
    });
  });
  describe('reverse()', () => {
    it('should reverse original array', () => {
      const a = [1, 2, 3];
      const wrap = new Arr(a);
      
      assert.deepEqual(wrap.reverse().$, [3, 2, 1]);
    });
  });
  describe('shift()', () => {
    it('should delete the first element and return it', () => {
      const a = [1, 2, 3];
      const wrap = new Arr(a);
      
      assert.strictEqual(wrap.shift(), 1);
      assert.deepEqual(a, [2, 3]);
    });
  });
  describe('shuffle()', () => {
    it('should shuffle original array', () => {
      const a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      const copy = a.slice();
      const wrap = new Arr(a);

      wrap.shuffle();

      assert.notDeepEqual(a, copy);

      assert.strictEqual(wrap.length, 10);
      assert.notEqual(wrap.indexOfStrict(0), -1);
      assert.notEqual(wrap.indexOfStrict(1), -1);
      assert.notEqual(wrap.indexOfStrict(2), -1);
      assert.notEqual(wrap.indexOfStrict(3), -1);
      assert.notEqual(wrap.indexOfStrict(4), -1);
      assert.notEqual(wrap.indexOfStrict(5), -1);
      assert.notEqual(wrap.indexOfStrict(6), -1);
      assert.notEqual(wrap.indexOfStrict(7), -1);
      assert.notEqual(wrap.indexOfStrict(8), -1);
      assert.notEqual(wrap.indexOfStrict(9), -1);
    });
  });
  describe('slice()', () => {
    it('should return a wrap of a different array', () => {
      const a = [1, 2, 3, 4, 5];
      const wrap = new Arr(a);
      
      assert.notEqual(wrap.slice().$, a);
    });
    it('should work the same as Array.prototype.slice', () => {
      const a = [1, 2, 3, 4, 5];
      const wrap = new Arr(a);
      
      assert.deepEqual(wrap.slice().$, a.slice());
      assert.deepEqual(wrap.slice(3).$, a.slice(3));
      assert.deepEqual(wrap.slice(2, -1).$, a.slice(2, -1));
      assert.deepEqual(wrap.slice(2, 4).$, a.slice(2, 4));
    });
  });
  describe('sort()', () => {
    it('should use argument function for sorting values', () => {
      const a = [8, 13, 12, 0, 5, 9, -1, 6, 7, -2];
      const wrap = new Arr(a);
      
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
  describe('sortAsc()', () => {
    it('should do ascending sorting', () => {
      const a = [8, 5, 10, -1, 6];
      const wrap = new Arr(a);
      
      assert.deepEqual(wrap.sortAsc().$, [-1, 5, 6, 8, 10]);
    });
    it('should put NaNs to the beginning', () => {
      const a = [8, 5, NaN, 10, -1, NaN, 6];
      const wrap = new Arr(a);

      assert.strictEqual(isNaN(wrap.sortAsc().$[0]), true);
      assert.strictEqual(isNaN(wrap.sortAsc().$[1]), true);
    });
  });
  describe('sortDesc()', () => {
    it('should do descending sorting', () => {
      const a = [8, 5, 10, -1, 6];
      const wrap = new Arr(a);

      assert.deepEqual(wrap.sortDesc().$, [10, 8, 6, 5, -1]);
    });
    it('should put NaNs to the end', () => {
      const a = [8, 5, NaN, 10, -1, NaN, 6];
      const wrap = new Arr(a);

      assert.strictEqual(isNaN(wrap.sortDesc().$[a.length - 1]), true);
      assert.strictEqual(isNaN(wrap.sortDesc().$[a.length - 2]), true);
    });
  });
  describe('splice()', () => {
    it('should work the same as Array.prototype.splice', () => {
      let a;
      let wrap;

      a = [1, 2, 3, 4, 5];
      wrap = new Arr(a);
      assert.deepEqual(wrap.splice().$, []);
      assert.deepEqual(a, [1, 2, 3, 4, 5]);

      a = [1, 2, 3, 4, 5];
      wrap = new Arr(a);
      assert.deepEqual(wrap.splice(3).$, [4, 5]);
      assert.deepEqual(a, [1, 2, 3]);

      a = [1, 2, 3, 4, 5];
      wrap = new Arr(a);
      assert.deepEqual(wrap.splice(2, 2).$, [3, 4]);
      assert.deepEqual(a, [1, 2, 5]);

      a = [1, 2, 3, 4, 5];
      wrap = new Arr(a);
      assert.deepEqual(wrap.splice(1, 1, 7).$, [2]);
      assert.deepEqual(a, [1, 7, 3, 4, 5]);

      a = [1, 2, 3, 4, 5];
      wrap = new Arr(a);
      assert.deepEqual(wrap.splice(1, 1, 7, 9).$, [2]);
      assert.deepEqual(a, [1, 7, 9, 3, 4, 5]);
    });
  });
  describe('string()', () => {
    it('should return concatenated into string array', () => {
      const a = [1, 2, 3];
      const wrap = new Arr(a);
      
      assert.strictEqual(wrap.string(), '123');
    });
  });
  describe('unshift()', () => {
    it('should add elements from arguments to the start of context', () => {
      const a = [1, 2, 3];
      const wrap = new Arr(a);
      
      wrap.unshift([[-2]], [-1], 0);
      
      assert.deepEqual(a, [[[-2]], [-1], 0, 1, 2, 3]);
    });
  });
});

describe('it should test exported methods from Arr', () => {
  describe('array()', () => {
    it('should create wrap of an array with given length', () => {
      const length = 5;
      const wrap = array(length);

      assert.deepEqual(wrap.$, [0, 1, 2, 3, 4]);
    });
    it('should create wrap of an array with given length using mapFn', () => {
      const length = 5;
      const wrap = array(length, (value) => value*2);

      assert.deepEqual(wrap.$, [0, 2, 4, 6, 8]);
    });
  });
});
