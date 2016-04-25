import Class from './module';
const assert = require('assert');

export default () => {
	describe('it should test D.String.prototype.[methods]', () => {
		describe('alphabet()', () => {
			it('should return alphabet from context', () => {
				const o = 'a-b 0-2',
					wrap = new Class(o);
				assert.deepEqual(wrap.alphabet().$, { a: 'a', b: 'b', 0: '0', 1: '1', 2: '2' });
			});
		});
		// TODO: .endsWith()
		// TODO: .find()
		// TODO: .in()
		describe('indexOf()', () => {
			it('should work the same as String.prototype.indexOf', () => {
				const o = 'foobar',
					wrap = new Class(o);
				assert.strictEqual(wrap.indexOf('f'), 0);
				assert.strictEqual(wrap.indexOf('o'), 1);
				assert.strictEqual(wrap.indexOf('s'), -1);
			});
		});
		describe('match()', () => {
			it('should work the same as String.prototype.match', () => {
				const o = 'foobar',
					wrap = new Class(o);
				assert.deepEqual(wrap.match(/o/).$, { 0: 'o', index: 1, input: o });
				assert.deepEqual(wrap.match(/o/g).$, ['o', 'o']);
			});
		});
		// TODO: .parse(string('json' | 'html' | 'xml'?))
		describe('repeat()', () => {
			it('should return empty string with 0 argument', () => {
				const o = 'foobar',
					wrap = new Class(o);
				assert.strictEqual(wrap.repeat(0).$, '');
			});
			it('should return string repeated n times (n from argument)', () => {
				const o = 'foobar',
					wrap = new Class(o);
				assert.strictEqual(wrap.repeat(1).$, 'foobar');
				assert.strictEqual(wrap.repeat(2).$, 'foobarfoobar');
				assert.strictEqual(wrap.repeat(4).$, 'foobarfoobarfoobarfoobar');
			});
		});
		describe('replace()', () => {
			it('should use empty string as replacer without second argument', () => {
				const o = 'foobar',
					wrap = new Class(o);
				assert.strictEqual(wrap.replace(/o/g).$, 'fbar');
			});
			it('should work the same as String.prototype.replace', () => {
				const o = 'foobar',
					wrap = new Class(o);
				assert.strictEqual(wrap.replace(/o/g, '12').$, 'f1212bar');
				assert.strictEqual(wrap.replace(/s/g, '12').$, 'foobar');
			});
		});
		describe('replaceString()', () => {
			it('should use empty string as replacer without second argument', () => {
				const o = 'foobar',
					wrap = new Class(o);
				assert.strictEqual(wrap.replaceString('o').$, 'fbar');
			});
			it('should replace every match with second argument given', () => {
				const o = 'foobar',
					wrap = new Class(o);
				assert.strictEqual(wrap.replaceString('f', '12').$, '12oobar');
				assert.strictEqual(wrap.replaceString('o', '12').$, 'f1212bar');
			});
			it('should return wrap of the same string if didn\'t match', () => {
				const o = 'foobar',
					wrap = new Class(o);
				assert.strictEqual(wrap.replaceString('s', '12').$, 'foobar');
			});
		});
		describe('split()', () => {
			it('should work the same as String.prototype.split', () => {
				const o = 'foobar',
					wrap = new Class(o);
				assert.deepEqual(wrap.split(/o/).$, ['f', '', 'bar']);
				assert.deepEqual(wrap.split('').$, ['f', 'o', 'o', 'b', 'a', 'r']);
				assert.deepEqual(wrap.split().$, ['foobar']);
			});
		});
		describe('toCamelCase()', () => {
			it('should return a wrap of string with CamelCase letters', () => {
				const o = '-_ . foo . Bar -- _.baz .__ ',
					wrap = new Class(o);
				assert.strictEqual(wrap.toCamelCase().$, 'fooBarBaz');
			});
		});
		describe('toCapitalCase()', () => {
			it('should return a wrap of string with Capital Case letters', () => {
				const o = '-_ . foo . Bar -- _.baz .__ ',
					wrap = new Class(o);
				assert.strictEqual(wrap.toCapitalCase().$, 'Foo Bar Baz');
			});
		});
		describe('toDotCase()', () => {
			it('should return a wrap of string with dot.case letters', () => {
				const o = '-_ . foo . Bar -- _.baz .__ ',
					wrap = new Class(o);
				assert.strictEqual(wrap.toDotCase().$, 'foo.bar.baz');
			});
		});
		describe('toLowerCase()', () => {
			it('should return a wrap of string with lowercase letters', () => {
				const o = 'Foo Bar',
					wrap = new Class(o);
				assert.strictEqual(wrap.toLowerCase().$, 'foo bar');
			});
		});
		describe('toSnakeCase()', () => {
			it('should return a wrap of string with snake_case letters', () => {
				const o = '-_ . foo . Bar -- _.baz .__ ',
					wrap = new Class(o);
				assert.strictEqual(wrap.toSnakeCase().$, 'foo_bar_baz');
			});
		});
		describe('toSpaceCase()', () => {
			it('should return a wrap of string with space case letters', () => {
				const o = '-_ . foo . Bar -- _.baz .__ ',
					wrap = new Class(o);
				assert.strictEqual(wrap.toSpaceCase().$, 'foo bar baz');
			});
		});
		describe('toSpinalCase()', () => {
			it('should return a wrap of string with spinal-case letters', () => {
				const o = '-_ . foo . Bar -- _.baz .__ ',
					wrap = new Class(o);
				assert.strictEqual(wrap.toSpinalCase().$, 'foo-bar-baz');
			});
		});
		// TODO: .startsWith()
		// TODO: .substring()
		// TODO: .substr()
		describe('toString()', () => {
			it('should return context', () => {
				const o = 'foobar',
					wrap = new Class(o);
				assert.strictEqual(wrap.toString(), 'foobar');
			});
		});
		describe('toUpperCase()', () => {
			it('should return a wrap of string with UPPERCASE letters', () => {
				const o = 'Foo Bar',
					wrap = new Class(o);
				assert.strictEqual(wrap.toUpperCase().$, 'FOO BAR');
			});
		});
		describe('trim()', () => {
			it('should return a wrap of left-trimmed string with the "left" argument specified', () => {
				const o = '   foobar   ',
					wrap = new Class(o);
				assert.strictEqual(wrap.trim('left').$, 'foobar   ');
			});
			it('should return a wrap of right-trimmed string with the "right" argument specified', () => {
				const o = '   foobar   ',
					wrap = new Class(o);
				assert.strictEqual(wrap.trim('right').$, '   foobar');
			});
			it('should return a wrap of both-sides-trimmed string with any other argument including no arguments', () => {
				const o = '   foobar   ',
					wrap = new Class(o);
				assert.strictEqual(wrap.trim().$, 'foobar');
				assert.strictEqual(wrap.trim(null).$, 'foobar');
				assert.strictEqual(wrap.trim('foo').$, 'foobar');
			});
		});
	});
};