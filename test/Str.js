import { deepEqual, deepStrictEqual, strictEqual } from 'assert';
import Str, { parseJSON } from '../lib/Str';
import { isDate, isString } from '../lib/helpers';

describe('it should test Str#', () => {
  describe('capitalizeFirst()', () => {
    it('should return string with first capital symbol', () => {
      const s = 'fooBar';
      const wrap = new Str(s);

      strictEqual(wrap.capitalizeFirst().$, 'FooBar');
    });
  });
  describe('endsWith()', () => {
    it('should work the same as String#endsWith', () => {
      const s = 'foobar';
      const wrap = new Str(s);

      strictEqual(wrap.endsWith(''), true);
      strictEqual(wrap.endsWith('r'), true);
      strictEqual(wrap.endsWith('bar'), true);
      strictEqual(wrap.endsWith('foo', 3), true);
    });
  });
  describe('escapeHtml()', () => {
    it('should return escaped string for html code', () => {
      const s = '<div>&</div>';
      const wrap = new Str(s);

      strictEqual(wrap.escapeHTML().$, '&lt;div&gt;&amp;&lt;/div&gt;');
    });
  });
  describe('escapeRegExp()', () => {
    it('should return escaped string for regexp', () => {
      const s = '.+*?(a)[]{b}<>^$!=:-|,\\n';
      const wrap = new Str(s);

      strictEqual(
        wrap.escapeRegExp().$,
        '\\.\\+\\*\\?\\(a\\)\\[\\]\\{b\\}\\<\\>\\^\\$\\!\\=\\:\\-\\|\\,\\\\n'
      );
    });
  });
  describe('in()', () => {
    it('should return true with context in argument as property', () => {
      const s = 'a';
      const wrap = new Str(s);

      strictEqual(wrap.in({ a: 1 }), true);
    });
    it('should return false with context not in argument as property', () => {
      const s = 'a';
      const wrap = new Str(s);

      strictEqual(wrap.in({ b: 1 }), false);
    });
  });
  describe('indexOf()', () => {
    it('should work the same as String#indexOf', () => {
      const s = 'foobar';
      const wrap = new Str(s);

      strictEqual(wrap.indexOf('f'), 0);
      strictEqual(wrap.indexOf('o'), 1);
      strictEqual(wrap.indexOf('o', 2), 2);
      strictEqual(wrap.indexOf('s'), -1);
    });
  });
  describe('lastIndexOf()', () => {
    it('should work the same as String#lastIndexOf', () => {
      const s = 'foobar';
      const wrap = new Str(s);

      strictEqual(wrap.lastIndexOf('f'), 0);
      strictEqual(wrap.lastIndexOf('o'), 2);
      strictEqual(wrap.lastIndexOf('o', 1), 1);
      strictEqual(wrap.lastIndexOf('s'), -1);
    });
  });
  describe('length', () => {
    it('should return length of the context', () => {
      const s1 = 'foobar';
      const s2 = 'foo';
      const s3 = '';
      const wrap1 = new Str(s1);
      const wrap2 = new Str(s2);
      const wrap3 = new Str(s3);

      strictEqual(wrap1.length, 6);
      strictEqual(wrap2.length, 3);
      strictEqual(wrap3.length, 0);
    });
  });
  describe('match()', () => {
    it('should work the same as String#match', () => {
      const s = 'foobar';
      const wrap = new Str(s);

      deepEqual(wrap.match(/o/).$, { 0: 'o', index: 1, input: s });
      deepStrictEqual(wrap.match(/o/g).$, ['o', 'o']);
    });
  });
  describe('repeat()', () => {
    it('should return empty string with 0 argument', () => {
      const s = 'foobar';
      const wrap = new Str(s);

      strictEqual(wrap.repeat(0).$, '');
    });
    it('should return string repeated n times (n from argument)', () => {
      const s = 'foobar';
      const wrap = new Str(s);

      strictEqual(wrap.repeat(1).$, 'foobar');
      strictEqual(wrap.repeat(2).$, 'foobarfoobar');
      strictEqual(wrap.repeat(4).$, 'foobarfoobarfoobarfoobar');
    });
  });
  describe('replace()', () => {
    it('should use empty string as replacer without second argument', () => {
      const s = 'foobar';
      const wrap = new Str(s);

      strictEqual(wrap.replace(/o/g).$, 'fbar');
    });
    it('should work the same as String#replace', () => {
      const s = 'foobar';
      const wrap = new Str(s);

      strictEqual(wrap.replace(/o/g, '12').$, 'f1212bar');
      strictEqual(wrap.replace(/s/g, '12').$, 'foobar');
    });
  });
  describe('replaceString()', () => {
    it('should use empty string as replacer without second argument', () => {
      const s = 'foobar';
      const wrap = new Str(s);

      strictEqual(wrap.replaceString('o').$, 'fbar');
    });
    it('should replace every match with second argument given', () => {
      const s = 'foobar';
      const wrap = new Str(s);

      strictEqual(wrap.replaceString('f', '12').$, '12oobar');
      strictEqual(wrap.replaceString('o', '12').$, 'f1212bar');
    });
    it('should return wrap of the same string if didn\'t match', () => {
      const s = 'foobar';
      const wrap = new Str(s);

      strictEqual(wrap.replaceString('s', '12').$, 'foobar');
    });
  });
  describe('revert()', () => {
    it('should revert string', () => {
      const s = 'fooBar';
      const wrap = new Str(s);

      strictEqual(wrap.revert().$, 'raBoof');
    });
  });
  describe('search()', () => {
    it('should work the same as String#search', () => {
      const s = 'foobar';
      const wrap = new Str(s);

      strictEqual(wrap.search(/o/), 1);
      strictEqual(wrap.search(/s/), -1);
    });
  });
  describe('slice()', () => {
    it('work the same as String#slice', () => {
      const s = 'foobar';
      const wrap = new Str(s);

      strictEqual(wrap.slice(1).$, s.slice(1));
      strictEqual(wrap.slice(1, 5).$, s.slice(1, 5));
      strictEqual(wrap.slice(3, -1).$, s.slice(3, -1));
      strictEqual(wrap.slice(-1).$, s.slice(-1));
    });
  });
  describe('split()', () => {
    it('should work the same as String#split', () => {
      const s = 'foobar';
      const wrap = new Str(s);

      deepStrictEqual(wrap.split(/o/).$, ['f', '', 'bar']);
      deepStrictEqual(wrap.split('').$, ['f', 'o', 'o', 'b', 'a', 'r']);
      deepStrictEqual(wrap.split().$, ['foobar']);
    });
  });
  describe('startsWith()', () => {
    it('should work the same as String#endsWith', () => {
      const s = 'foobar';
      const wrap = new Str(s);

      strictEqual(wrap.startsWith(''), true);
      strictEqual(wrap.startsWith('f'), true);
      strictEqual(wrap.startsWith('foo'), true);
      strictEqual(wrap.startsWith('bar', 3), true);
    });
  });
  describe('substring()', () => {
    it('work the same as String#substring', () => {
      const s = 'foobar';
      const wrap = new Str(s);

      strictEqual(wrap.substring(1).$, s.substring(1));
      strictEqual(wrap.substring(1, 5).$, s.substring(1, 5));
      strictEqual(wrap.substring(3, -1).$, s.substring(3, -1));
      strictEqual(wrap.substring(-1).$, s.substring(-1));
    });
  });
  describe('substr()', () => {
    it('work the same as String#substr', () => {
      const s = 'foobar';
      const wrap = new Str(s);

      strictEqual(wrap.substr(1).$, s.substr(1));
      strictEqual(wrap.substr(1, 5).$, s.substr(1, 5));
      strictEqual(wrap.substr(3, -1).$, s.substr(3, -1));
      strictEqual(wrap.substr(-1).$, s.substr(-1));
    });
  });
  describe('toCamelCase()', () => {
    it('should return a wrap of string with CamelCase letters', () => {
      const s = '-_ . foo . Bar -- _.baz .__ ';
      const wrap = new Str(s);

      strictEqual(wrap.toCamelCase().$, 'fooBarBaz');
    });
  });
  describe('toCapitalCase()', () => {
    it('should return a wrap of string with Capital Case letters', () => {
      const s = '-_ . foo . Bar -- _.baz .__ ';
      const wrap = new Str(s);

      strictEqual(wrap.toCapitalCase().$, 'Foo Bar Baz');
    });
  });
  describe('toDotCase()', () => {
    it('should return a wrap of string with dot.case letters', () => {
      const s = '-_ . foo . Bar -- _.baz .__ ';
      const wrap = new Str(s);

      strictEqual(wrap.toDotCase().$, 'foo.bar.baz');
    });
  });
  describe('toHyphenCase()', () => {
    it('should return a wrap of string with spinal-case letters', () => {
      const s = '-_ . foo . Bar -- _.baz .__ ';
      const wrap = new Str(s);

      strictEqual(wrap.toHyphenCase().$, 'foo-bar-baz');
    });
  });
  describe('toLowerCase()', () => {
    it('should return a wrap of string with lowercase letters', () => {
      const s = 'Foo Bar';
      const wrap = new Str(s);

      strictEqual(wrap.toLowerCase().$, 'foo bar');
    });
  });
  describe('toSnakeCase()', () => {
    it('should return a wrap of string with snake_case letters', () => {
      const s = '-_ . foo . Bar -- _.baz .__ ';
      const wrap = new Str(s);

      strictEqual(wrap.toSnakeCase().$, 'foo_bar_baz');
    });
  });
  describe('toSpaceCase()', () => {
    it('should return a wrap of string with space case letters', () => {
      const s = '-_ . foo . Bar -- _.baz .__ ';
      const wrap = new Str(s);

      strictEqual(wrap.toSpaceCase().$, 'foo bar baz');
    });
  });
  describe('toString()', () => {
    it('should return context', () => {
      const s = 'foobar';
      const wrap = new Str(s);

      strictEqual(String(wrap), 'foobar');
    });
  });
  describe('toUpperCase()', () => {
    it('should return a wrap of string with UPPERCASE letters', () => {
      const s = 'Foo Bar';
      const wrap = new Str(s);

      strictEqual(wrap.toUpperCase().$, 'FOO BAR');
    });
  });
  describe('trim()', () => {
    it('should return a wrap of both-sides-trimmed string', () => {
      const s = '   foobar   ';
      const wrap = new Str(s);

      strictEqual(wrap.trim().$, 'foobar');
    });
  });
  describe('trimLeft()', () => {
    it('should return a wrap of left-trimmed string', () => {
      const s = '   foobar   ';
      const wrap = new Str(s);

      strictEqual(wrap.trimLeft().$, 'foobar   ');
    });
  });
  describe('trimRight()', () => {
    it('should return a wrap of right-trimmed string', () => {
      const s = '   foobar   ';
      const wrap = new Str(s);

      strictEqual(wrap.trimRight().$, '   foobar');
    });
  });
});

describe('it should test exported methods from Str', () => {
  describe('parseJSON()', () => {
    it('should parse string as json', () => {
      const s1 = '{ "foo": "bar" }';
      const s2 = '["foo", "bar"]';
      const s3 = 'null';
      const s4 = '1';
      const s5 = '"1"';

      deepStrictEqual(parseJSON(s1).$, { foo: 'bar' });
      deepStrictEqual(parseJSON(s2).$, ['foo', 'bar']);
      strictEqual(parseJSON(s3).$, null);
      strictEqual(parseJSON(s4).$, 1);
      strictEqual(parseJSON(s5).$, '1');
    });
    it('should use callback for parsing if present', () => {
      const s = '{ "foo": "bar", "bar": { "baz": "baz" } }';
      const parsed = parseJSON(s, (key, value) => {
        if (isString(value)) {
          return `concat: ${ value }`;
        }

        return value;
      });

      deepStrictEqual(parsed.$, {
        foo: 'concat: bar',
        bar: {
          baz: 'concat: baz'
        }
      });
    });
    it('should parse dates and numbers if it\'s in options parameter', () => {
      const s = '{ "foo": "1999-12-31T23:59:59.999Z", "bar": "1" }';

      const parsed = parseJSON(s, { dates: true, numbers: true });

      strictEqual(isDate(parsed.$.foo), true);
      strictEqual(parsed.$.bar, 1);
    });
  });
});
