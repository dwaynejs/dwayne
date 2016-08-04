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
  validate, Symbol, defineProperties,
  inherits, checkClassInstance, possibleSuperClassReturn
} from './helpers';

const htmlSpecials = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;'
};
const regexpSpecialsRegexp = new RegExp(
  new Super(regexpSpecialCharacters)
    .word((x) => `\\${ x }|`)
    .replace(/\|$/, ''),
  'g'
);

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
export function Str(string = '') {
  checkClassInstance(this, Str, 'Str');

  return possibleSuperClassReturn(this, Super, [String(string)]);

  /**
   * @member {String} Str#$
   * @public
   * @description Original string.
   */
}

inherits(Str, Super);

defineProperties(Str.prototype, {
  /**
   * @member {Function} Str#capitalizeFirst
   * @public
   * @returns {Str} Capitalized string.
   * @description Method capitalizing the first symbol.
   *
   * @example
   * new Str('foo').capitalizeFirst().$; // 'Foo'
   */
  capitalizeFirst() {
    const string = this.$;

    return new Str(string.slice(0, 1).toUpperCase() + string.slice(1));
  },

  /**
   * @member {Function} Str#endsWith
   * @public
   * @param {String} searchString - See
   * [String#endsWith]
   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith}.
   * @param {Number} [position = string.length] - See
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

    return this
      .slice(0, position)
      .revert()
      .startsWith(new Str(searchString).revert().$);
  },

  /**
   * @member {Function} Str#escapeHTML
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
  },

  /**
   * @member {Function} Str#escapeRegExp
   * @public
   * @returns {Str} New instance of Str.
   * @description Method escaping RegExp special characters.
   *
   * @example
   * new Str('(213.98 - [] {})').escapeRegExp().$; // '\(213\.98 \- \[\] \{\}\)'
   */
  escapeRegExp() {
    return this.replace(regexpSpecialsRegexp, '\\$&');
  },

  /**
   * @member {Function} Str#in
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
  },

  /**
   * @member {Function} Str#indexOf
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
  indexOf(searchValue, fromIndex) {
    return this.$.indexOf(searchValue, fromIndex);
  },

  /**
   * @member {Function} Str#lastIndexOf
   * @public
   * @param {String} searchValue - See
   * [String#lastIndexOf]
   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/lastIndexOf}.
   * @param {Number} [fromIndex = string.length] - See
   * [String#lastIndexOf]
   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/lastIndexOf}.
   * @returns {Number} Found index or -1.
   * @description Synonym for
   * [String#lastIndexOf]
   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/lastIndexOf}.
   */
  lastIndexOf(searchValue, fromIndex) {
    return this.$.lastIndexOf(searchValue, fromIndex);
  },

  /**
   * @member {Number} Str#length
   * @public
   * @readonly
   * @returns {Number} String length.
   * @description Synonym for
   * [String#length]
   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/length}.
   */
  'get length'() {
    return this.$.length;
  },

  /**
   * @member {Function} Str#match
   * @public
   * @returns {Arr|Super} D-Wrap of found match.
   * @description Synonym for
   * [String#match]
   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/match}.
   */
  match() {
    const match = this.$.match.apply(this.$, arguments);

    return D(match);
  },

  /**
   * @member {Function} Str#parseJSON
   * @public
   * @param {Object} options - Options.
   * @param {Boolean|*} [options.numbers] - If it is needed to parse number-like strings as numbers.
   * @param {Boolean|*} [options.dates] - If it is needed to parse.
   * @param {JSONCallback} [callback] - Callback that called on every iteration.
   * @returns {DWrap} D-Wrap of found match.
   * @description Method for parsing json.
   *
   * @example
   * new Str('{ "a": 1 }').parseJSON().$;                                         // { a: 1 }
   * new Str('{ "a": "1" }').parseJSON({ numbers: true }).$;                      // { numbers: true }
   * new Str('{ "a": "1999-12-31T23:59:59.999Z" }').parseJSON({ dates: true }).$; // { a: Date {...} }
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
  },

  /**
   * @member {Function} Str#repeat
   * @public
   * @param {Integer} times - Times to repeat the string.
   * @returns {Str} New instance of Str.
   * @description Synonym for
   * [String#repeat]
   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/repeat}.
   *
   * @example
   * new Str('123').repeat(2).$; // '123123'
   * new Str('123').repeat(0).$; // ''
   */
  repeat(times) {
    validate([times], [['intLike', '>=0']], 'Str#repeat');

    times = +times;

    const string = this.$;

    let s = '';

    for (let i = 0; i < times; i++) {
      s += string;
    }

    return new Str(s);
  },

  /**
   * @member {Function} Str#replace
   * @public
   * @param {RegExp|String} regexp - See
   * [String#replace]
   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/replace}.
   * @param {String|Function} [replacer = ''] - See
   * [String#replace]
   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/replace}.
   * @returns {Str} New instance of Str.
   * @description Synonym for
   * [String#replace]
   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/replace}
   * besides that replacer has a default value of ''.
   */
  replace(regexp, replacer = '') {
    return new Str(this.$.replace(regexp, replacer));
  },

  /**
   * @member {Function} Str#replaceString
   * @public
   * @param {String} string - String to replace.
   * @param {String} [replacer = ''] - String to replace with.
   * @returns {Str} New instance of Str.
   * @description Method for global string replaceing.
   *
   * @example
   * new Str('123123').replaceString('1', '4').$; // '423423'
   * new Str('123123').replaceString('1').$;      // '2323'
   */
  replaceString(string, replacer = '') {
    string = new Super(string).$;

    validate([string], ['string'], 'Str#replaceString');

    return new Str(this.$.split(string).join(replacer));
  },

  /**
   * @member {Function} Str#revert
   * @public
   * @returns {Str} New instance of string.
   * @description Method for reverting a string.
   *
   * @example
   * new Str('1234').revert().$; // '4321'
   */
  revert() {
    const string = this.$;
    let str = '';

    for (let i = string.length - 1; i >= 0; i--) {
      str += string[i];
    }

    return new Str(str);
  },

  /**
   * @member {Function} Str#search
   * @public
   * @param {RegExp} regexp - See
   * [String#search]
   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/search}.
   * @returns {Number} Index of the first match, if found, and -1 if not.
   * @description Synonym for
   * [String#search]
   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/search}.
   */
  search(regexp) {
    validate([regexp], ['regexp']);

    return this.$.search(regexp);
  },

  /**
   * @member {Function} Str#slice
   * @public
   * @param {Number} [beginSlice = 0] - See
   * [String#slice]
   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/slice}.
   * @param {Number} [endSlice = string.length] - See
   * [String#slice]
   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/slice}.
   * @returns {Str} New instance of Str.
   * @description Synonym for
   * [String#slice]
   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/slice}.
   */
  slice(beginSlice, endSlice) {
    return new Str(this.$.slice(beginSlice, endSlice));
  },

  /**
   * @member {Function} Str#split
   * @public
   * @param {RegExp|String} [separator] - See
   * [String#split]
   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/split}.
   * @returns {Arr|Super} D-Wrap of the array.
   * @description Synonym for
   * [String#split]
   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/split}.
   */
  split(separator) {
    return D(this.$.split(separator));
  },

  /**
   * @member {Function} Str#startsWith
   * @public
   * @param {String} searchString - See
   * [String#startsWith]
   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith}.
   * @param {Number} [position = 0] - See
   * [String#startsWith]
   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith}.
   * @returns {Boolean} If the string ends with the argument string.
   * @description Synonym for
   * [String#startsWith]
   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith}.
   */
  startsWith(searchString, position = 0) {
    return this.$.indexOf(searchString, position) === position;
  },

  /**
   * @member {Function} Str#substr
   * @public
   * @param {Number} [start = 0] - See
   * [String#substr]
   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/substr}.
   * @param {Number} [length = string.length] - See
   * [String#substr]
   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/substr}.
   * @returns {Str} New instance of Str.
   * @description Synonym for
   * [String#substr]
   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/substr}.
   */
  substr(start, length) {
    return new Str(this.$.substr(start, length));
  },

  /**
   * @member {Function} Str#substring
   * @public
   * @param {Number} [indexStart = 0] - See
   * [String#substring]
   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/substring}.
   * @param {Number} [indexEnd = string.length] - See
   * [String#substring]
   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/substring}.
   * @returns {Str} New instance of Str.
   * @description Synonym for
   * [String#substring]
   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/substring}.
   */
  substring(indexStart, indexEnd) {
    return new Str(this.$.substring(indexStart, indexEnd));
  },

  /**
   * @member {Function} Str#toCamelCase
   * @public
   * @returns {Str} New instance of Str.
   * @description Removes following regexp /\s\-_\./ making the string camel cased.
   *
   * @example
   * new Str('spinal-case').toCamelCase().$;  // 'spinalCase'
   * new Str('_snake_case_').toCamelCase().$; // 'snakeCase'
   */
  toCamelCase() {
    return new Str(trim(this.$)
      .replace(/[\s\-_\.]+/g, '-')
      .replace(/\-[^\-]/g, (match) => match[1].toUpperCase())
      .replace(/^[\S]/, (match) => match.toLowerCase())
    );
  },

  /**
   * @member {Function} Str#toCapitalCase
   * @public
   * @returns {Str} New instance of Str.
   * @description Removes following regexp /\-_\./ making the string capital letter cased.
   *
   * @example
   * new Str('spinal-case').toCapitalCase().$;  // 'Spinal Case'
   * new Str('_snake_case_').toCapitalCase().$; // 'Snake Case'
   */
  toCapitalCase() {
    return new Str(trim(this.$)
      .replace(/[\s\-_\.]+/g, ' ')
      .replace(/[\S]/g, (match) => (
        match.toLowerCase() === match ? match : ` ${ match }`
      ))
      .replace(/\s[\S]/g, (match) => match.toUpperCase())
      .replace(/\s+/g, ' ')
      .replace(/^\s/, '')
      .replace(/^[\S]/, (match) => match.toUpperCase())
    );
  },

  /**
   * @member {Function} Str#toDotCase
   * @public
   * @returns {Str} New instance of Str.
   * @description Removes following regexp /\-_\./ making the string dot cased.
   *
   * @example
   * new Str('spinal-case').toDotCase().$;  // 'spinal.case'
   * new Str('_snake_case_').toDotCase().$; // 'snake.case'
   */
  toDotCase() {
    return new Str(trim(this.$)
      .replace(/[\s\-_\.]+/g, '.')
      .replace(/[^\.]/g, (match) => (
        match.toLowerCase() === match ? match : `.${ match }`
      ))
      .replace(/\.+/g, '.')
      .replace(/^\./, '')
      .toLowerCase()
    );
  },

  /**
   * @member {Function} Str#toLowerCase
   * @public
   * @returns {Str} New instance of Str.
   * @description Synonym for
   * [String#toLowerCase]
   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase}.
   *
   * @example
   * new Str('UPPER-CASE').toLowerCase().$;  // 'upper-case'
   */
  toLowerCase() {
    return new Str(this.$.toLowerCase());
  },

  /**
   * @member {Function} Str#toSnakeCase
   * @public
   * @returns {Str} New instance of Str.
   * @description Removes following regexp /\s\-\./ making the string spinal cased.
   *
   * @example
   * new Str('spinal-case').toSnakeCase().$; // 'spinal_case'
   * new Str('camelCase').toSnakeCase().$;   // 'camel_case'
   */
  toSnakeCase() {
    return new Str(trim(this.$)
      .replace(/[\s\-_\.]+/g, '_')
      .replace(/[^_]/g, (match) => (
        match.toLowerCase() === match ? match : `_${ match }`
      ))
      .replace(/_+/g, '_')
      .replace(/^_/, '')
      .toLowerCase()
    );
  },

  /**
   * @member {Function} Str#toSpaceCase
   * @public
   * @returns {Str} New instance of Str.
   * @description Removes following regexp /\-_\./ making the string space cased.
   *
   * @example
   * new Str('spinal-case').toSpaceCase().$;  // 'spinal case'
   * new Str('_snake_case_').toSpaceCase().$; // 'snake case'
   */
  toSpaceCase() {
    return new Str(trim(this.$)
      .replace(/[\s\-_\.]+/g, ' ')
      .replace(/[\S]/g, (match) => (
        match.toLowerCase() === match ? match : ` ${ match }`
      ))
      .replace(/\s+/g, ' ')
      .replace(/^\s/, '')
      .toLowerCase()
    );
  },

  /**
   * @member {Function} Str#toSpinalCase
   * @public
   * @returns {Str} New instance of Str.
   * @description Removes following regexp /\s\-_\./ making the string camel cased.
   *
   * @example
   * new Str('camelCase').toSpinalCase().$;    // 'camel-case'
   * new Str('_snake_case_').toSpinalCase().$; // 'snake-case'
   */
  toSpinalCase() {
    return new Str(trim(this.$)
      .replace(/[\s\-_\.]+/g, '-')
      .replace(/[^\-]/g, (match) => (
        match.toLowerCase() === match ? match : `-${ match }`
      ))
      .replace(/\-+/g, '-')
      .replace(/^\-/, '')
      .toLowerCase()
    );
  },

  toString() {
    return this.$;
  },

  /**
   * @member {Function} Str#toUpperCase
   * @public
   * @returns {Str} New instance of Str.
   * @description Synonym for
   * [String#toUpperCase]
   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase}.
   *
   * @example
   * new Str('lower-case').toUpperCase().$;  // 'LOWER-CASE'
   */
  toUpperCase() {
    return new Str(this.$.toUpperCase());
  },

  /**
   * @member {Function} Str#trim
   * @public
   * @returns {Str} New instance of Str.
   * @description Synonym for
   * [String#trim]
   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/trim}.
   */
  trim() {
    return new Str(this.$.replace(/^[\s\ufeff\u00a0]+|[\s\ufeff\u00a0]+$/g, ''));
  },

  /**
   * @member {Function} Str#trimLeft
   * @public
   * @returns {Str} New instance of Str.
   * @description Synonym for
   * [String#trimLeft]
   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/trimLeft}.
   */
  trimLeft() {
    return new Str(this.$.replace(/^[\s\ufeff\u00a0]+/, ''));
  },

  /**
   * @member {Function} Str#trimRight
   * @public
   * @returns {Str} New instance of Str.
   * @description Synonym for
   * [String#trimRight]
   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/trimRight}.
   */
  trimRight() {
    return new Str(this.$.replace(/[\s\ufeff\u00a0]+$/, ''));
  },

  [Symbol.toStringTag]: 'Str'
});

function trim(string) {
  return string.replace(/^[\s\-_\.]+|[\s\-_\.]+$/g, '');
}

constructors[2].push({
  check: isString,
  cls: Str
});

export default Str;
