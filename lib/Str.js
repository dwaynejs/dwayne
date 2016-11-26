/**
 * @module Str
 * @private
 * @mixin
 * @description Exports Str class.
 */

import { D } from './D';
import { Super } from './Super';
import { constructors, regexpSpecialCharacters } from './constants';
import {
  isFunction, isNumberLike, isObject, isString,
  validate, Symbol, defineProperties, iterate
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
class Str extends Super {
  constructor(string = '') {
    super(string);

    /**
     * @member Str#$
     * @type {String}
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

    return new Str(string.slice(0, 1).toUpperCase() + string.slice(1));
  }

  /**
   * @method Str#endsWith
   * @public
   * @param {String} searchString - See the link.
   * @param {Number} [position = string.length] - See the link.
   * @returns {Boolean} If the string ends with the argument string.
   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
   * @description Synonym for
   * [String#endsWith]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith}.
   */
  endsWith(searchString, position) {
    if (arguments.length < 2) {
      position = this.$.length;
    }

    return this
      .slice(0, position)
      .revert()
      .startsWith(new Str(searchString).revert().$);
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

    iterate(htmlSpecials, (escaped, symbol) => {
      string = string.replace(new RegExp(symbol, 'g'), escaped);
    });

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
   * @param {String} searchValue - See the link.
   * @param {Number} [fromIndex = 0] - See the link.
   * @returns {Number} Found index or -1.
   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf
   * @description Synonym for
   * [String#indexOf]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf}.
   */
  indexOf(searchValue, fromIndex) {
    return this.$.indexOf.apply(this.$, arguments);
  }

  /**
   * @method Str#lastIndexOf
   * @public
   * @param {String} searchValue - See the link.
   * @param {Number} [fromIndex = string.length] - See the link.
   * @returns {Number} Found index or -1.
   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/lastIndexOf
   * @description Synonym for
   * [String#lastIndexOf]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/lastIndexOf}.
   */
  lastIndexOf(searchValue, fromIndex) {
    return this.$.lastIndexOf.apply(this.$, arguments);
  }

  /**
   * @member Str#length
   * @type {Number}
   * @public
   * @readonly
   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/length
   * @description Synonym for
   * [String#length]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/length}.
   */
  get length() {
    return this.$.length;
  }

  /**
   * @method Str#match
   * @public
   * @returns {Arr|Super} D-Wrap of found match.
   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/match
   * @description Synonym for
   * [String#match]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/match}.
   */
  match(regexp) {
    return D(this.$.match.apply(this.$, arguments));
  }

  /**
   * @method Str#repeat
   * @public
   * @param {Integer} times - Times to repeat the string.
   * @returns {Str} New instance of Str.
   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/repeat
   * @description Synonym for
   * [String#repeat]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/repeat}.
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
  }

  /**
   * @method Str#replace
   * @public
   * @param {RegExp|String} regexp - See the link.
   * @param {String|Function} [replacer = ''] - See the link.
   * @returns {Str} New instance of Str.
   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/replace
   * @description Synonym for
   * [String#replace]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/replace}
   * besides that replacer has a default value of ''.
   */
  replace(regexp, replacer = '') {
    return new Str(this.$.replace(regexp, replacer));
  }

  /**
   * @method Str#replaceString
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
  }

  /**
   * @method Str#revert
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
  }

  /**
   * @method Str#search
   * @public
   * @param {RegExp} regexp - See the link.
   * @returns {Number} Index of the first match, if found, and -1 if not.
   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/search
   * @description Synonym for
   * [String#search]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/search}.
   */
  search(regexp) {
    validate([regexp], ['regexp']);

    return this.$.search.apply(this.$, arguments);
  }

  /**
   * @method Str#slice
   * @public
   * @param {Number} [beginSlice = 0] - See the link.
   * @param {Number} [endSlice = string.length] - See the link.
   * @returns {Str} New instance of Str.
   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/slice
   * @description Synonym for
   * [String#slice]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/slice}.
   */
  slice(beginSlice, endSlice) {
    return new Str(this.$.slice.apply(this.$, arguments));
  }

  /**
   * @method Str#split
   * @public
   * @param {RegExp|String} [separator] - See the link.
   * @returns {Arr|Super} D-Wrap of the array.
   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/split
   * @description Synonym for
   * [String#split]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/split}.
   */
  split(separator) {
    return D(this.$.split.apply(this.$, arguments));
  }

  /**
   * @method Str#startsWith
   * @public
   * @param {String} searchString - See the link.
   * @param {Number} [position = 0] - See the link.
   * @returns {Boolean} If the string ends with the argument string.
   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith
   * @description Synonym for
   * [String#startsWith]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith}.
   */
  startsWith(searchString, position = 0) {
    return this.$.indexOf.apply(this.$, arguments) === position;
  }

  /**
   * @method Str#substr
   * @public
   * @param {Number} [start = 0] - See the link.
   * @param {Number} [length = string.length] - See the link.
   * @returns {Str} New instance of Str.
   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/substr
   * @description Synonym for
   * [String#substr]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/substr}.
   */
  substr(start, length) {
    return new Str(this.$.substr.apply(this.$, arguments));
  }

  /**
   * @method Str#substring
   * @public
   * @param {Number} [indexStart = 0] - See the link.
   * @param {Number} [indexEnd = string.length] - See the link.
   * @returns {Str} New instance of Str.
   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/substring
   * @description Synonym for
   * [String#substring]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/substring}.
   */
  substring(indexStart, indexEnd) {
    return new Str(this.$.substring.apply(this.$, arguments));
  }

  /**
   * @method Str#toCamelCase
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
      .replace(/[\s\-_.]+/g, '-')
      .replace(/-[^-]/g, (match) => match[1].toUpperCase())
      .replace(/^[\S]/, (match) => match.toLowerCase())
    );
  }

  /**
   * @method Str#toCapitalCase
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
      .replace(/[\s\-_.]+/g, ' ')
      .replace(/[\S]/g, (match) => (
        match.toLowerCase() === match ? match : ` ${ match }`
      ))
      .replace(/\s[\S]/g, (match) => match.toUpperCase())
      .replace(/\s+/g, ' ')
      .replace(/^\s/, '')
      .replace(/^[\S]/, (match) => match.toUpperCase())
    );
  }

  /**
   * @method Str#toDotCase
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
      .replace(/[\s\-_.]+/g, '.')
      .replace(/[^.]/g, (match) => (
        match.toLowerCase() === match ? match : `.${ match }`
      ))
      .replace(/\.+/g, '.')
      .replace(/^\./, '')
      .toLowerCase()
    );
  }

  /**
   * @method Str#toHyphenCase
   * @public
   * @returns {Str} New instance of Str.
   * @description Removes following regexp /\s\-_\./ making the string camel cased.
   *
   * @example
   * new Str('camelCase').toSpinalCase().$;    // 'camel-case'
   * new Str('_snake_case_').toSpinalCase().$; // 'snake-case'
   */
  toHyphenCase() {
    return new Str(trim(this.$)
      .replace(/[\s\-_.]+/g, '-')
      .replace(/[^-]/g, (match) => (
        match.toLowerCase() === match ? match : `-${ match }`
      ))
      .replace(/-+/g, '-')
      .replace(/^-/, '')
      .toLowerCase()
    );
  }

  /**
   * @method Str#toLowerCase
   * @public
   * @returns {Str} New instance of Str.
   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase
   * @description Synonym for
   * [String#toLowerCase]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase}.
   *
   * @example
   * new Str('UPPER-CASE').toLowerCase().$;  // 'upper-case'
   */
  toLowerCase() {
    return new Str(this.$.toLowerCase());
  }

  /**
   * @method Str#toSnakeCase
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
      .replace(/[\s\-_.]+/g, '_')
      .replace(/[^_]/g, (match) => (
        match.toLowerCase() === match ? match : `_${ match }`
      ))
      .replace(/_+/g, '_')
      .replace(/^_/, '')
      .toLowerCase()
    );
  }

  /**
   * @method Str#toSpaceCase
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
      .replace(/[\s\-_.]+/g, ' ')
      .replace(/[\S]/g, (match) => (
        match.toLowerCase() === match ? match : ` ${ match }`
      ))
      .replace(/\s+/g, ' ')
      .replace(/^\s/, '')
      .toLowerCase()
    );
  }

  toString() {
    return this.$;
  }

  /**
   * @method Str#toUpperCase
   * @public
   * @returns {Str} New instance of Str.
   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase
   * @description Synonym for
   * [String#toUpperCase]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase}.
   *
   * @example
   * new Str('lower-case').toUpperCase().$;  // 'LOWER-CASE'
   */
  toUpperCase() {
    return new Str(this.$.toUpperCase());
  }

  /**
   * @method Str#trim
   * @public
   * @returns {Str} New instance of Str.
   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/trim
   * @description Synonym for
   * [String#trim]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/trim}.
   */
  trim() {
    return new Str(this.$.replace(/^[\s\ufeff\u00a0]+|[\s\ufeff\u00a0]+$/g, ''));
  }

  /**
   * @method Str#trimLeft
   * @public
   * @returns {Str} New instance of Str.
   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/trimLeft
   * @description Synonym for
   * [String#trimLeft]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/trimLeft}.
   */
  trimLeft() {
    return new Str(this.$.replace(/^[\s\ufeff\u00a0]+/, ''));
  }

  /**
   * @method Str#trimRight
   * @public
   * @returns {Str} New instance of Str.
   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/trimRight
   * @description Synonym for
   * [String#trimRight]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/trimRight}.
   */
  trimRight() {
    return new Str(this.$.replace(/[\s\ufeff\u00a0]+$/, ''));
  }
}

defineProperties(Str.prototype, {
  [Symbol.toStringTag]: 'Str'
});

constructors[2].push({
  check: isString,
  cls: Str
});

function trim(string) {
  return string.replace(/^[\s\-_.]+|[\s\-_.]+$/g, '');
}

/**
 * @function parseJSON
 * @public
 * @param {String} [json = null] - String to parse.
 * @param {Object} [options] - Options.
 * @param {Boolean|*} [options.numbers] - If it is needed to parse number-like strings as numbers.
 * @param {Boolean|*} [options.dates] - If it is needed to parse date-like string as dates.
 * Date-like string is considered to match ^\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d\.\d\d\dZ?$
 * @param {JSONCallback} [callback] - Callback that called on every iteration.
 * @returns {DWrap} D-Wrap of found match.
 * @description Method for parsing json.
 *
 * @example
 * parseJSON('{ "a": 1 }').$;                                           // { a: 1 }
 * parseJSON('{ "a": "1" }', { numbers: true }).$;                      // { numbers: true }
 * parseJSON('{ "a": "1999-12-31T23:59:59.999Z" }', { dates: true }).$; // { a: Date {...} }
 */
function parseJSON(json = null, options = {}, callback) {
  if (arguments.length <= 1) {
    return D(JSON.parse(json));
  }

  if (isFunction(options)) {
    callback = options;
    options = {};
  }

  const { numbers, dates } = options;
  const parsed = JSON.parse(json, function (key, value) {
    if (dates && /^\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d\.\d\d\dZ?$/.test(value)) {
      value = new Date(value);
    } else if (numbers && isNumberLike(value) && isString(value)) {
      value = Number(value);
    }

    return callback ? callback.apply(this, arguments) : value;
  });

  return D(parsed);
}

export { Str, parseJSON };
