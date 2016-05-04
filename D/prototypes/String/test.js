import Class from './module';
const assert = require('assert');

export default () => {
	describe('it should test D.String.prototype.[methods]', () => {
		describe('alphabet()', () => {
			it('should return alphabet from context', () => {
				const s = 'a-b0-2';
				const wrap = new Class(s);

				assert.deepEqual(wrap.alphabet().$, { a: 'a', b: 'b', 0: '0', 1: '1', 2: '2' });
			});
		});
		describe('endsWith()', () => {
			it('should return true with empty string argument', () => {
				const s = '';
				const wrap = new Class(s);

				assert.strictEqual(wrap.endsWith(''), true);
			});
			it('should return true with any string, that context ends with', () => {
				const s = 'foo';
				const wrap = new Class(s);

				assert.strictEqual(wrap.endsWith('o'), true);
				assert.strictEqual(wrap.endsWith('oo'), true);
				assert.strictEqual(wrap.endsWith('foo'), true);
			});
		});
		describe('escapeHtml()', () => {
			it('should return escaped string for html code', () => {
				const s = '<div>&</div>';
				const wrap = new Class(s);

				assert.strictEqual(wrap.escapeHtml().$, '&lt;div&gt;&amp;&lt;/div&gt;');
			});
		});
		describe('escapeRegExp()', () => {
			it('should return escaped string for regexp', () => {
				const s = '.+*?(a)[]{b}<>^$!=:-|,\\n';
				const wrap = new Class(s);

				assert.strictEqual(
					wrap.escapeRegExp().$,
					'\\.\\+\\*\\?\\(a\\)\\[\\]\\{b\\}\\<\\>\\^\\$\\!\\=\\:\\-\\|\\,\\\\n'
				);
			});
		});
		// TODO: .find()
		// TODO: .findAll()
		// TODO: .in()
		describe('indexOf()', () => {
			it('should work the same as String.prototype.indexOf', () => {
				const s = 'foobar';
				const wrap = new Class(s);

				assert.strictEqual(wrap.indexOf('f'), 0);
				assert.strictEqual(wrap.indexOf('o'), 1);
				assert.strictEqual(wrap.indexOf('s'), -1);
			});
		});
		describe('match()', () => {
			it('should work the same as String.prototype.match', () => {
				const s = 'foobar';
				const wrap = new Class(s);

				assert.deepEqual(wrap.match(/o/).$, { 0: 'o', index: 1, input: s });
				assert.deepEqual(wrap.match(/o/g).$, ['o', 'o']);
			});
		});
		// TODO: .parseHTML()
		// TODO: .parseJSON()
		// TODO: .parseNumber()
		describe('repeat()', () => {
			it('should return empty string with 0 argument', () => {
				const s = 'foobar';
				const wrap = new Class(s);

				assert.strictEqual(wrap.repeat(0).$, '');
			});
			it('should return string repeated n times (n from argument)', () => {
				const s = 'foobar';
				const wrap = new Class(s);

				assert.strictEqual(wrap.repeat(1).$, 'foobar');
				assert.strictEqual(wrap.repeat(2).$, 'foobarfoobar');
				assert.strictEqual(wrap.repeat(4).$, 'foobarfoobarfoobarfoobar');
			});
		});
		describe('replace()', () => {
			it('should use empty string as replacer without second argument', () => {
				const s = 'foobar';
				const wrap = new Class(s);

				assert.strictEqual(wrap.replace(/o/g).$, 'fbar');
			});
			it('should work the same as String.prototype.replace', () => {
				const s = 'foobar';
				const wrap = new Class(s);

				assert.strictEqual(wrap.replace(/o/g, '12').$, 'f1212bar');
				assert.strictEqual(wrap.replace(/s/g, '12').$, 'foobar');
			});
		});
		describe('replaceString()', () => {
			it('should use empty string as replacer without second argument', () => {
				const s = 'foobar';
				const wrap = new Class(s);

				assert.strictEqual(wrap.replaceString('o').$, 'fbar');
			});
			it('should replace every match with second argument given', () => {
				const s = 'foobar';
				const wrap = new Class(s);

				assert.strictEqual(wrap.replaceString('f', '12').$, '12oobar');
				assert.strictEqual(wrap.replaceString('o', '12').$, 'f1212bar');
			});
			it('should return wrap of the same string if didn\'t match', () => {
				const s = 'foobar';
				const wrap = new Class(s);

				assert.strictEqual(wrap.replaceString('s', '12').$, 'foobar');
			});
		});
		describe('revert()', () => {
			it('should revert string', () => {
				const s = 'fooBar';
				const wrap = new Class(s);

				assert.strictEqual(wrap.revert().$, 'raBoof');
			});
		});
		describe('split()', () => {
			it('should work the same as String.prototype.split', () => {
				const s = 'foobar';
				const wrap = new Class(s);

				assert.deepEqual(wrap.split(/o/).$, ['f', '', 'bar']);
				assert.deepEqual(wrap.split('').$, ['f', 'o', 'o', 'b', 'a', 'r']);
				assert.deepEqual(wrap.split().$, ['foobar']);
			});
		});
		describe('toCamelCase()', () => {
			it('should return a wrap of string with CamelCase letters', () => {
				const s = '-_ . foo . Bar -- _.baz .__ ';
				const wrap = new Class(s);

				assert.strictEqual(wrap.toCamelCase().$, 'fooBarBaz');
			});
		});
		describe('toCapitalCase()', () => {
			it('should return a wrap of string with Capital Case letters', () => {
				const s = '-_ . foo . Bar -- _.baz .__ ';
				const wrap = new Class(s);

				assert.strictEqual(wrap.toCapitalCase().$, 'Foo Bar Baz');
			});
		});
		describe('toDotCase()', () => {
			it('should return a wrap of string with dot.case letters', () => {
				const s = '-_ . foo . Bar -- _.baz .__ ';
				const wrap = new Class(s);

				assert.strictEqual(wrap.toDotCase().$, 'foo.bar.baz');
			});
		});
		describe('toLowerCase()', () => {
			it('should return a wrap of string with lowercase letters', () => {
				const s = 'Foo Bar';
				const wrap = new Class(s);

				assert.strictEqual(wrap.toLowerCase().$, 'foo bar');
			});
		});
		describe('toSnakeCase()', () => {
			it('should return a wrap of string with snake_case letters', () => {
				const s = '-_ . foo . Bar -- _.baz .__ ';
				const wrap = new Class(s);

				assert.strictEqual(wrap.toSnakeCase().$, 'foo_bar_baz');
			});
		});
		describe('toSpaceCase()', () => {
			it('should return a wrap of string with space case letters', () => {
				const s = '-_ . foo . Bar -- _.baz .__ ';
				const wrap = new Class(s);

				assert.strictEqual(wrap.toSpaceCase().$, 'foo bar baz');
			});
		});
		describe('toSpinalCase()', () => {
			it('should return a wrap of string with spinal-case letters', () => {
				const s = '-_ . foo . Bar -- _.baz .__ ';
				const wrap = new Class(s);

				assert.strictEqual(wrap.toSpinalCase().$, 'foo-bar-baz');
			});
		});
		describe('startsWith()', () => {
			it('should return true with empty string argument', () => {
				const s = '';
				const wrap = new Class(s);

				assert.strictEqual(wrap.startsWith(''), true);
			});
			it('should return true with any string, that context ends with', () => {
				const s = 'foo';
				const wrap = new Class(s);

				assert.strictEqual(wrap.startsWith('f'), true);
				assert.strictEqual(wrap.startsWith('fo'), true);
				assert.strictEqual(wrap.startsWith('foo'), true);
			});
		});
		// TODO: .substring()
		// TODO: .substr()
		describe('toString()', () => {
			it('should return context', () => {
				const s = 'foobar';
				const wrap = new Class(s);

				assert.strictEqual('' + wrap, 'foobar');
			});
		});
		describe('toUpperCase()', () => {
			it('should return a wrap of string with UPPERCASE letters', () => {
				const s = 'Foo Bar';
				const wrap = new Class(s);

				assert.strictEqual(wrap.toUpperCase().$, 'FOO BAR');
			});
		});
		describe('trim()', () => {
			it('should return a wrap of both-sides-trimmed string', () => {
				const s = '   foobar   ';
				const wrap = new Class(s);

				assert.strictEqual(wrap.trim().$, 'foobar');
			});
		});
		describe('trimLeft()', () => {
			it('should return a wrap of left-trimmed string', () => {
				const s = '   foobar   ';
				const wrap = new Class(s);

				assert.strictEqual(wrap.trimLeft().$, 'foobar   ');
			});
		});
		describe('trimRight()', () => {
			it('should return a wrap of right-trimmed string', () => {
				const s = '   foobar   ';
				const wrap = new Class(s);

				assert.strictEqual(wrap.trimRight().$, '   foobar');
			});
		});
	});
};