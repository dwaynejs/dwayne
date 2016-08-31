/**
 * @module Alphabet
 * @private
 * @mixin
 * @description Exports Alphabet class.
 */

import { isString, validate, defineProperties, Symbol } from './helpers';

/**
 * @typedef {String} Char
 * @public
 * @description A string of one char.
 */

/**
 * @class Alphabet
 * @public
 * @param {ArrayLike} alphabet - Alphabet to wrap.
 * @returns {Alphabet} Instance of Alphabet.
 * @description Class for alphabet manipulations: add, delete symbols, generate a token from an alphabet,
 * check if an alphabet contains a word.
 *
 * @example
 * new Alphabet(['a', 'b', 'c']);
 */
export class Alphabet {
  constructor(alphabet = []) {
    const a = {};

    for (let i = 0, length = alphabet.length; i < length; i++) {
      const char = alphabet[i];

      if (!check(char)) {
        throw new Error('Each element of an array must be a single char! (in Alphabet)');
      }

      a[char] = char;
    }

    /**
     * @member {Object} Alphabet#$$
     * @public
     * @description The alphabet.
     */
    Object.defineProperty(this, '$$', { value: a });
  }

  /**
   * @method Alphabet#add
   * @public
   * @param {...Char} chars - Chars to add.
   * @returns {Alphabet} Returns this.
   * @description Method for adding new letters to the alphabet.
   *
   * @example
   * const alphabet = new Alphabet(['a', 'b', 'c']);
   *
   * alphabet.add('d', 'e');
   *
   * alphabet.get().$; // ['a', 'b', 'c', 'd', 'e']
   */
  add(...chars) {
    for (let i = 0, length = chars.length; i < length; i++) {
      const char = chars[i];

      if (!check(char)) {
        throw new Error('Each argument must be a single char! (in Alphabet#add)');
      }

      this.$$[char] = char;
    }

    return this;
  }

  /**
   * @method Alphabet#contains
   * @public
   * @param {String} word - Word to check if it is in the alphabet or not.
   * @returns {Boolean} If the word in the alphabet or not.
   * @description Method that returns if a word is in alphabet or not.
   *
   * @example
   * const alphabet = new Alphabet(['f', 'b', 'o', 'a', 'r']);
   *
   * alphabet.contains('foo'); // true
   * alphabet.contains('bar'); // true
   * alphabet.contains('baz'); // false
   */
  contains(word) {
    validate([word], ['string'], 'Alphabet#contains');

    const alphabet = this.$$;

    for (let i = 0, length = word.length; i < length; i++) {
      if (!alphabet[word[i]]) {
        return false;
      }
    }

    return true;
  }

  /**
   * @method Alphabet#delete
   * @public
   * @param {...Char} chars - Chars to delete.
   * @returns {Alphabet} Returns this.
   * @description Method for deleting letters from the alphabet.
   *
   * @example
   * const alphabet = new Alphabet(['a', 'b', 'c', 'd']);
   *
   * alphabet.delete('a');
   *
   * alphabet.get().$; // ['b', 'c', 'd']
   *
   * alphabet.delete('b', 'd');
   *
   * alphabet.get().$; // ['c']
   */
  delete(...chars) {
    for (let i = 0, length = chars.length; i < length; i++) {
      const char = chars[i];

      if (!check(char)) {
        throw new Error('Each argument must be a single char! (in Alphabet#delete)');
      }

      delete this.$$[char];
    }

    return this;
  }

  /**
   * @method Alphabet#get
   * @returns {Array} Wrap of an array of alphabet letters.
   * @description Method for getting array of alphabet letters.
   *
   * @example
   * new Alphabet(['a', 'b', 'c']).get().$; // ['a', 'b', 'c']
   */
  get() {
    return Object.keys(this.$$);
  }

  /**
   * @method Alphabet#token
   * @public
   * @param {Number} length - Token length.
   * @returns {String} Token.
   * @description Method for generating random token with given length.
   *
   * @example
   * new Alphabet(['a', 'b', 'c']).token(4); // 'abcb'
   */
  token(length) {
    validate([length], [['intLike', '>0']], 'Alphabet#token');

    const alphabet = Object.keys(this.$$);
    const len = alphabet.length;
    let token = '';

    for (let i = 0; i < length; i++) {
      token += alphabet[Math.floor(Math.random() * len)];
    }

    return token;
  }
}

defineProperties(Alphabet.prototype, {
  [Symbol.toStringTag]: 'Alphabet'
});

function check(char) {
  return isString(char) && char.length === 1;
}

/**
 * @function alphabet
 * @public
 * @param {String} string - String to generate an alphabet from.
 * @returns {Alphabet} New instance of Alphabet.
 * @description Function for creating an alphabet from a string that has format like this:
 * '&lt;char1&gt;-&lt;char2&gt; &lt;char3&gt;-&lt;char4&gt;'
 *
 * @example
 * const a1 = alphabet('a-c 1-3');
 * const a2 = alphabet('5-5f-g');
 *
 * a1.get().$; // ['1', '2', '3', 'a', 'b', 'c']
 * a2.get().$; // ['5', 'f', 'g']
 */
export function alphabet(string) {
  validate([string], ['string']);

  const ranges = string.split(/([\s\S]\-+[\s\S])?/g);
  const length = ranges.length;
  const alphabet = [];

  for (let i = 0; i < length; i++) {
    const range = ranges[i];

    if (!range || range === ' ') {
      continue;
    }

    if (/\-/.test(range) && !/[\s\S]\-+[\s\S]/.test(range)) {
      throw new Error(`Wrong part of the string (${ range })! (in alphabet)`);
    }

    if (/\-/.test(range)) {
      const start = range.charCodeAt(0);
      const end = range.charCodeAt(2);

      if (start > end) {
        throw new Error('Start of the range must be before its end! (in alphabet)');
      }

      for (let k = 0, len = end - start + 1; k < len; k++) {
        alphabet.push(String.fromCharCode(start + k));
      }

      continue;
    }

    if (range.length === 1) {
      alphabet.push(range);
    }
  }

  return new Alphabet(alphabet);
}

export default Alphabet;
