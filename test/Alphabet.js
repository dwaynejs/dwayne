import * as assert from 'assert';
import Alphabet, { alphabet } from '../lib/Alphabet';

describe('it should test Alphabet::[methods]', () => {
  describe('add()', () => {
    it('should add new chars from arguments to alphabet', () => {
      const o = ['s', '2'];
      const wrap = new Alphabet(o);
      
      wrap.add('6', '7');
      
      assert.deepEqual(wrap.$, { s: 's', 2: '2', 6: '6', 7: '7' });
    });
  });
  describe('get()', () => {
    it('should return an array of chars of alphabet', () => {
      const o = ['1', '2', '3', '4', '5'];
      const wrap = new Alphabet(o);
      
      assert.deepEqual(wrap.get().$, ['1', '2', '3', '4', '5']);
    });
  });
  describe('contains()', () => {
    it('should return true with words in alphabet', () => {
      const o = ['1', 'a', '8', 'l'];
      const wrap = new Alphabet(o);
      
      assert.strictEqual(wrap.contains(''), true);
      assert.strictEqual(wrap.contains('8a8l'), true);
      assert.strictEqual(wrap.contains('lal'), true);
      assert.strictEqual(wrap.contains('81la18al'), true);
    });
    it('should return false with words not in alphabet', () => {
      const o = ['1', 'a', '8', 'l'];
      const wrap = new Alphabet(o);
      
      assert.strictEqual(wrap.contains('12'), false);
      assert.strictEqual(wrap.contains('abl'), false);
      assert.strictEqual(wrap.contains('1al80'), false);
    });
  });
  describe('delete()', () => {
    it('should delete arguments chars from alphabet', () => {
      const o = ['1', '2', 's', '4', '5'];
      const wrap = new Alphabet(o);
      
      wrap.delete('2', '5');
      
      assert.deepEqual(wrap.$, { 1: '1', s: 's', 4: '4' });
    });
  });
  describe('token()', () => {
    it('should return token out of alphabet with given length', () => {
      const o = ['1', '2', '3', '4', '5'];
      const wrap = new Alphabet(o);
      
      assert.strictEqual(/^[1-5]+$/.test(wrap.token(10)), true);
    });
  });
});

describe('it should test exported methods from Alphabet', () => {
  describe('alphabet()', () => {
    it('should return right alphabet with ranges argument', () => {
      const s = 'a-b0-2';
      const wrap = alphabet(s);

      assert.deepEqual(wrap.$, { a: 'a', b: 'b', 0: '0', 1: '1', 2: '2' });
    });
    it('should return right alphabet', () => {
      const s = '123 a-b _?()';
      const wrap = alphabet(s);

      assert.deepEqual(wrap.$, { 1: 1, 2: 2, 3: 3, a: 'a', b: 'b', _: '_', '?': '?', '(': '(', ')': ')' });
    });
  });
});
