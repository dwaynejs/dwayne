import Class from './module';
import '../Array';
const assert = require('assert');

export default () => {
	describe('it should test D.Alphabet.prototype.[methods]', () => {
		describe('add()', () => {
			it('should add new chars from arguments to alphabet', () => {
				const o = ['s', '2'],
					wrap = new Class(o);
				wrap.add('6', '7');
				assert.deepEqual(wrap.$, { s: 's', 2: '2', 6: '6', 7: '7' });
			});
		});
		describe('alphabet()', () => {
			it('should return an array of chars of alphabet', () => {
				const o = ['1', '2', '3', '4', '5'],
					wrap = new Class(o);
				assert.deepEqual(wrap.alphabet().$, ['1', '2', '3', '4', '5']);
			});
		});
		describe('contains()', () => {
			it('should return true with words in alphabet', () => {
				const o = ['1', 'a', '8', 'l'],
					wrap = new Class(o);
				assert.strictEqual(wrap.contains(''), true);
				assert.strictEqual(wrap.contains('8a8l'), true);
				assert.strictEqual(wrap.contains('lal'), true);
				assert.strictEqual(wrap.contains('81la18al'), true);
			});
			it('should return false with words not in alphabet', () => {
				const o = ['1', 'a', '8', 'l'],
					wrap = new Class(o);
				assert.strictEqual(wrap.contains('12'), false);
				assert.strictEqual(wrap.contains('abl'), false);
				assert.strictEqual(wrap.contains('1al80'), false);
			});
		});
		describe('delete()', () => {
			it('should delete arguments chars from alphabet', () => {
				const o = ['1', '2', 's', '4', '5'],
					wrap = new Class(o);
				wrap.delete('2', '5');
				assert.deepEqual(wrap.$, { 1: '1', s: 's', 4: '4' });
			});
		});
		describe('token()', () => {
			it('should return token out of alphabet with given length', () => {
				const o = ['1', '2', '3', '4', '5'],
					wrap = new Class(o);
				assert.strictEqual(/^[1-5]+$/.test(wrap.token(10)), true);
			});
		});
	});
};