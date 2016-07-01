/**
 * @module Str
 * @private
 * @mixin
 * @description Exports Str class.
 */

import D from './D';
import Super from './Super';
import constructors from './constants/constructors';
import regexpSpecialCharacters from './constants/regexpSpecialCharacters';
import {
	isDateLike, isFunction, isNumberLike, isObject, isString,
	validate
} from './helpers';

const htmlSpecials = {
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;'
};
const regexpSpecialsRegexp = new RegExp(
  new Super(regexpSpecialCharacters)
    .word((x) => '\\' + x + '|')
    .replace(/\|$/, ''),
  'g'
);

export class Str extends Super {
  /**
   * @class Str
   * @extends Super
   * @public
   * @param {String} [string = ''] - A string to wrap.
   * @returns {Str} Instance of Str.
   * @description Wrap of a string.
   *
   * @example
   * const s = new Num('1');
   */
	constructor(string = '') {
		super(string);

    /**
     * @member {String} Str#$
     * @public
     * @description Original string.
     */
	}

  /**
   * @method Str#capitalizeFirst
   * @public
   * @returns {Str} Capitalized string.
   * @description Method capitalizing the first symbol.
   *
   * @example
   * new Str('foo').capitalizeFirst().$; // 'Foo'
   */
	capitalizeFirst() {
		const string = this.$;

		return new Str(string[0].toUpperCase() + string.slice(1));
	}

  /**
   * @method Str#endsWith
   * @public
   * @param {String} searchString - See
   * [String#endsWith]
   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith}.
   * @param {Number} [position = length] - See
   * [String#endsWith]
   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith}.
   * @returns {Boolean} If the string ends with the argument string.
   * @description Synonym for
   * [String#endsWith]
   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith}.
   */
	endsWith(searchString, position) {
    if (arguments.length < 2) {
      position = this.$.length;
    }

		return this.slice(0, position).revert().startsWith(new Str(searchString).revert().$);
	}

  /**
   * @method Str#escapeHTML
   * @public
   * @returns {Str} New instance of Str.
   * @description Methods escaping "&", "<" and ">" symbols.
   *
   * @example
   * new Str('"1 < 2" & "7 > 4" are true expressions.').escapeHTML().$;
   * // '"1 &lt; 2" &amp "7 &gt; 2" are true expressions.'
   */
	escapeHTML() {
		let string = this.$;

		for (const symbol in htmlSpecials) {
			if (htmlSpecials.hasOwnProperty(symbol)) {
				string = string.replace(new RegExp(symbol, 'g'), htmlSpecials[symbol]);
			}
		}

		return new Str(string);
	}

  /**
   * @method Str#escapeRegExp
   * @public
   * @returns {Str} New instance of Str.
   * @description Method escaping RegExp special characters.
   *
   * @example
   * new Str('(213.98 - [] {})').escapeRegExp().$; // '\(213\.98 \- \[\] \{\}\)'
   */
	escapeRegExp() {
		return this.replace(regexpSpecialsRegexp, '\\$&');
	}

  /**
   * @method Str#in
   * @public
   * @param {*} object - Object to check the string as a property in.
   * @returns {Boolean} If it is in the object or not.
   * @description Returns string in object.
   *
   * @example
   * new Str('a').in({ a: 1 }); // true
   * new Str('toFixed').in(1);  // false
   * new Str('a').in(null);     // false
   */
	in(object) {
		if (!isObject(object)) {
			return false;
		}

		return this.$ in object;
	}

  /**
   * @method Str#indexOf
   * @public
   * @param {String} searchValue - See
   * [String#indexOf]
   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf}.
   * @param {Number} [fromIndex = 0] - See
   * [String#indexOf]
   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf}.
   * @returns {Number} Found index or -1.
   * @description Synonym for
   * [String#indexOf]
   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf}.
   */
  indexOf(searchValue, fromIndex = 0) {
		return this.$.indexOf(searchValue, fromIndex);
	}

  /**
   * @member {Number} Str#length
   * @public
   * @readonly
   * @description Synonym for
   * [String#length]
   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/length}.
   */
  get length() {
    return this.$.length;
  }

  /**
   * @method Str#match
   * @public
   * @returns {DWrap} D-Wrap of found match.
   * @description Synonym for
   * [String#match]
   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/match}.
   */
	match() {
		const match = this.$.match.apply(this.$, arguments);
    
    return D(match);
	}

  /**
   * @method Str#parseJSON
   * @public
   * @param {{ numbers: Boolean|*, dates: Boolean|* }} options - Object with following properties:
   * numbers - if it is needed to parse number-like strings as numbers;
   * dates - if it is needed to parse
   * @param {JSONCallback} callback
   * @returns {DWrap} D-Wrap of found match.
   * @description Method for parsing json.
   *
   * @example
   * new Str('{ "a": 1 }').parseJSON().$;                                        // { a: 1 }
   * new Str('{ "a": "1" }').parseJSON({ numbers: true }).$;                     // { numbers: true }
   * new Str('{ "a": "1999-31-12T23:59:59.999" }').parseJSON({ dates: true }).$; // { a: Date {...} }
   */
  parseJSON(options = {}, callback) {
    if (!arguments.length) {
      return D(JSON.parse(this.$));
    }

    if (isFunction(options)) {
      callback = options;
      options = {};
    }

    const { numbers, dates } = options;
    const parsed = JSON.parse(this.$, function (key, value) {
      if (dates && isString(value) && isDateLike(value) && !isNumberLike(value)) {
        value = new Date(value);
      } else if (numbers && isNumberLike(value) && isString(value)) {
        value = Number(value);
      }

      return callback ? callback.apply(this, arguments) : value;
    });

    return D(parsed);
  }
	repeat(n) {
		validate([n], [['intLike', '>=0']], 'Str#repeat');

		n = +n;

		const string = this.$;

    let s = '';

		for (let i = 0; i < n; i++) {
			s += string;
		}

		return new Str(s);
	}
	replace(regexp, replacer = '') {
		return new Str(this.$.replace(regexp, replacer));
	}
	replaceString(string, replacer = '') {
		string = new Super(string).$;

		validate([string], ['string'], 'Str#replaceString');

		return new Str(this.$.split(string).join(replacer));
	}
	revert() {
		const string = this.$;
		let str = '';

		for (let i = string.length - 1; i >= 0; i--) {
			str += string[i];
		}

		return new Str(str);
	}
  search(regexp) {
    validate([regexp], ['regexp']);

    return this.$.search(regexp);
  }
  slice() {
    const string = this.$;

    return new Str(string.slice.apply(string, arguments));
  }
	split(delimiter) {
		return D(this.$.split(delimiter));
	}
	startsWith(string) {
		return this.$.indexOf(string) === 0;
	}
	substr() {
		const string = this.$;

		return new Str(string.substr.apply(string, arguments));
	}
  substring() {
    const string = this.$;

    return new Str(string.substring.apply(string, arguments));
  }
  toCamelCase() {
		return new Str(trim(this.$)
			.replace(/[\s\-_\.]+/g, '-')
			.replace(/\-[^\-]/g, (match) => {
				return match[1].toUpperCase();
			})
			.replace(/^[\S]/, (match) => {
				return match.toLowerCase();
			})
		);
	}
	toCapitalCase() {
		return new Str(trim(this.$)
			.replace(/[\s\-_\.]+/g, ' ')
			.replace(/[\S]/g, (match) => {
				if (match.toLowerCase() !== match) {
					return ' ' + match;
				}

				return match;
			})
			.replace(/\s[\S]/g, (match) => {
				return match.toUpperCase();
			})
			.replace(/\s+/g, ' ')
			.replace(/^\s/, '')
			.replace(/^[\S]/, (match) => {
				return match.toUpperCase();
			})
		);
	}
	toDotCase() {
		return new Str(trim(this.$)
			.replace(/[\s\-_\.]+/g, '.')
			.replace(/[^\.]/g, (match) => {
				if (match.toLowerCase() !== match) {
					return '.' + match;
				}

				return match;
			})
			.replace(/\.+/g, '.')
			.replace(/^\./, '')
			.toLowerCase()
		);
	}
	toLowerCase() {
		return new Str(this.$.toLowerCase());
	}
	toSnakeCase() {
		return new Str(trim(this.$)
			.replace(/[\s\-_\.]+/g, '_')
			.replace(/[^_]/g, (match) => {
				if (match.toLowerCase() !== match) {
					return '_' + match;
				}

				return match;
			})
			.replace(/_+/g, '_')
			.replace(/^_/, '')
			.toLowerCase()
		);
	}
	toSpaceCase() {
		return new Str(trim(this.$)
			.replace(/[\s\-_\.]+/g, ' ')
			.replace(/[\S]/g, (match) => {
				if (match.toLowerCase() !== match) {
					return ' ' + match;
				}

				return match;
			})
			.replace(/\s+/g, ' ')
			.replace(/^\s/, '')
			.toLowerCase()
		);
	}
	toSpinalCase() {
		return new Str(trim(this.$)
			.replace(/[\s\-_\.]+/g, '-')
			.replace(/[^\-]/g, (match) => {
				if (match.toLowerCase() !== match) {
					return '-' + match;
				}

				return match;
			})
			.replace(/\-+/g, '-')
			.replace(/^\-/, '')
			.toLowerCase()
		);
	}
	toString() {
		return this.$;
	}
	toUpperCase() {
		return new Str(this.$.toUpperCase());
	}
	trim() {
		return new Str(this.$.replace(/^\s+|\s+$/g, ''));
	}
	trimLeft() {
		return new Str(this.$.replace(/^\s+/, ''));
	}
	trimRight() {
		return new Str(this.$.replace(/\s+$/, ''));
	}
}

function trim(string) {
	return string.replace(/^[\s\-_\.]+|[\s\-_\.]+$/g, '');
}

constructors[2].push({
	check: isString,
	cls: String
});

export default String;
