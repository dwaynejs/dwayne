/**
 * @module Arr
 * @private
 * @mixin
 * @description Exports Arr class.
 */

import Super from './Super';
import constructors from './constants/constructors';
import {
  isArrayLike, isNaN, isNumber, isString,
  toArray, validate, iterate as iterator, Symbol, defineProperties
} from './helpers';

/**
 * @typedef {Array|*} ArrayLike
 * @public
 * @description Array-like type.
 */

/**
 * @callback ArrayCallback
 * @public
 * @param {Number} i - Iteration index.
 */

/**
 * @callback IterateCallback
 * @public
 * @param {Number} i - Iteration index.
 */

/**
 * @callback CompareFunction
 * @public
 * @param {*} x - First value to be compared.
 * @param {*} y - Second value to be compared.
 */

/**
 * @class Arr
 * @extends Super
 * @public
 * @param {Array} [array = []] - An array to wrap.
 * @returns {Arr} Instance of Arr.
 * @description Wrap of an array.
 *
 * @example
 * new Arr([1, 2]);
 */
export class Arr extends Super {
  constructor(array = []) {
    super(toArray(array instanceof Arr ? array.$ : array));

    /**
     * @member Arr#$
     * @type {Array}
     * @public
     * @description Made array.
     */
  }

  /**
   * @method Arr#concat
   * @public
   * @param {...(Array|Arr|*)} values - Arrays or any other values to concat the array with.
   * @returns {Arr} New instance of Arr.
   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/concat
   * @description Synonym for
   * [Array#concat]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/concat}.
   */
  concat(...values) {
    const array = toArray(this.$, true);

    iterator(arguments, (value) => {
      value = new Super(value).$;

      if (isArrayLike(value) && !isString(value)) {
        iterator(value, (value) => {
          array.push(value);
        });

        return;
      }

      array.push(value);
    });

    return new this.constructor(array);
  }

  /**
   * @member Arr#first
   * @type {*}
   * @public
   * @readonly
   * @description Returns the first element of the array.
   *
   * @example
   * new Arr([1, 2, 3]).first; // 1
   * new Arr([]).first;        // undefined
   */
  get first() {
    return this.$[0];
  }

  /**
   * @method Arr#indexOf
   * @public
   * @param {*} value - Value to search.
   * @returns {Number} Index of the argument.
   * @description Almost the same as {@link Super#keyOf}. The difference is that if the value is not found
   * -1 returned instead of null and if found Number(key) returned.
   *
   * @example
   * new Arr([1, 2, 3]).indexOf(1);       // 0
   * new Arr([1, 2, 3]).indexOf('1');     // 0
   * new Arr([1, 2, 3]).indexOf(3);       // -1
   * new Arr([1, 2, NaN]).indexOf(NaN);   // 2
   */
  indexOf(value) {
    const key = this.keyOf(value);

    return key === null ? -1 : Number(key);
  }

  /**
   * @method Arr#indexOfStrict
   * @public
   * @param {*} value - Value to search.
   * @returns {Number} Index of the argument.
   * @description Almost the same as {@link Super#keyOfStrict}. The difference is that if the value is not found
   * -1 returned instead of null and if found Number(key) returned.
   *
   * @example
   * new Arr([1, 2, 3]).indexOfStrict(1);       // 0
   * new Arr([1, 2, 3]).indexOfStrict('1');     // -1
   * new Arr([1, 2, 3]).indexOfStrict(3);       // -1
   * new Arr([1, 2, NaN]).indexOfStrict(NaN);   // 2
   */
  indexOfStrict(value) {
    const key = this.keyOfStrict(value);

    return key === null ? -1 : Number(key);
  }

  /**
   * @method Arr#join
   * @public
   * @param {String} [separator = ','] - See the link.
   * @returns {String} - String of joined array.
   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/join
   * @description Synonym for
   * [Array#join]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/join}.
   */
  join(separator) {
    return this.$.join.apply(this.$, arguments);
  }

  /**
   * @member Arr#last
   * @type {*}
   * @public
   * @readonly
   * @description The last element of the array.
   *
   * @example
   * new Arr([1, 2, 3]).last; // 3
   * new Arr([]).last;        // undefined
   */
  get last() {
    const array = this.$;

    return array[array.length - 1];
  }

  /**
   * @member Arr#length
   * @type {Number}
   * @public
   * @readonly
   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/length
   * @description Synonym for
   * [Array#length]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/length}.
   */
  get length() {
    return this.$.length;
  }

  /**
   * @method Arr#pop
   * @public
   * @returns {*} Returns deleted element.
   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/pop
   * @description Synonym for
   * [Array#pop]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/pop}.
   */
  pop() {
    return this.$.pop();
  }

  /**
   * @method Arr#push
   * @public
   * @param {...*} values See the link.
   * @this {Arr}
   * @returns {Arr} Returns this.
   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/push
   * @description Synonym for
   * [Array#push]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/push}
   * besides returning this.
   */
  push(...values) {
    this.$.push.apply(this.$, arguments);

    return this;
  }

  /**
   * @method Arr#reverse
   * @public
   * @returns {Arr} A wrap of the reversed array.
   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse
   * @description Synonym for
   * [Array#reverse]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse}.
   */
  reverse() {
    this.$.reverse();

    return this;
  }

  /**
   * @method Arr#shift
   * @public
   * @returns {*} Returns deleted element.
   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/shift
   * @description Synonym for
   * [Array#shift]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/shift}.
   */
  shift() {
    return this.$.shift();
  }

  /**
   * @method Arr#shuffle
   * @public
   * @returns {Arr} Returns this.
   * @description Method for shuffling.
   *
   * @example
   * new Arr([1, 2, 3, 4]).shuffle().$; // [4, 2, 3, 1]
   * new Arr([1, 2, 3, 4]).shuffle().$; // [1, 3, 4, 2]
   */
  shuffle() {
    const length = this.$.length;

    return this.forEach((value, index, array) => {
      const randomIndex = index + Math.floor((length - index) * Math.random());

      array[index] = array[randomIndex];
      array[randomIndex] = value;
    });
  }

  /**
   * @method Arr#slice
   * @public
   * @param {Number} [begin = 0] - See the link.
   * @param {Number} [end = array.length] - See the link.
   * @returns {Arr} A wrap of a sliced array.
   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
   * @description Synonym for
   * [Array#slice]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/slice}.
   */
  slice(begin, end) {
    return new this.constructor(this.$.slice.apply(this.$, arguments));
  }

  /**
   * @method Arr#sort
   * @public
   * @param {CompareFunction} [compareFunction] - See the link.
   * @returns {Arr} Returns this.
   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
   * @description Synonym for
   * [Array#sort]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/sort}.
   */
  sort(compareFunction) {
    validate([compareFunction], ['function||!'], 'Arr#sort');

    this.$.sort(compareFunction);

    return this;
  }

  /**
   * @method Arr#sortAsc
   * @public
   * @returns {Arr} Returns this.
   * @description Method for ascending sorting. Puts non-numbers first, then NaNs, then sorted values.
   *
   * @example
   * new Arr([NaN, 1, -7, '100', 5]).sortAsc().$; // ['100', NaN, -7, 1, 5]
   */
  sortAsc() {
    return this.sort(asc);
  }

  /**
   * @method Arr#sortDesc
   * @public
   * @returns {Arr} Returns this.
   * @description Method for descending sorting. Puts sorted values first, then NaNs, then non-numbers.
   *
   * @example
   * new Arr([NaN, 1, -7, '100', 5]).sortDesc().$; // [5, 1, -7, NaN, '100']
   */
  sortDesc() {
    return this.sort((y, x) => asc(x, y));
  }

  /**
   * @method Arr#splice
   * @public
   * @param {Number} [start] - See the link.
   * @param {Number} [deleteCount] - See the link.
   * @param {...*} [items] - See the link.
   * @returns {Arr} A wrap of return value of #splice call.
   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
   * @description Synonym for
   * [Array#splice]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/splice}.
   */
  splice(start, deleteCount, ...items) {
    return new Arr(this.$.splice.apply(this.$, arguments));
  }

  /**
   * @method Arr#string
   * @public
   * @returns {String} Concatenated array.
   * @description Synonym for array.join('').
   *
   * @example
   * new Arr([1, 2, 3]).string(); // '123'
   */
  string() {
    return this.join('');
  }

  /**
   * @method Arr#unshift
   * @public
   * @param {...*} [values] - See the link.
   * @returns {Arr} Returns this.
   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift
   * @description Synonym for
   * [Array#unshift]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift}
   * besides returning this.
   */
  unshift(...values) {
    this.$.unshift.apply(this.$, arguments);

    return this;
  }
}

defineProperties(Arr.prototype, {
  [Symbol.toStringTag]: 'Arr'
});

/**
 * @function asc
 * @private
 * @param {*} x - First value to be compared.
 * @param {*} y - Second value to be compared.
 * @returns {Number} Where to put the first element: before or after.
 */
function asc(x, y) {
  if (!isNumber(x) && !isNumber(y)) {
    return 0;
  }

  if (!isNumber(x)) {
    return -1;
  }

  if (!isNumber(y)) {
    return 1;
  }

  if (isNaN(x) && isNaN(y)) {
    return 0;
  }

  if (isNaN(x)) {
    return -1;
  }

  if (isNaN(y)) {
    return 1;
  }

  return x - y;
}

constructors[1].push({
  check: isArrayLike,
  cls: Arr
});

/**
 * @function array
 * @public
 * @param {Number} number - Length of the array.
 * @param {ArrayCallback} [callback] - If it's present it has to be a function
 * that returns the element that is pushed to the new array.
 * @returns {Arr} New instance of Arr.
 * @description Method for creating new array from the length using optional callback.
 *
 * @example
 * array(3).$;               // [0, 1, 2]
 * array(3, (i) => i * 2).$; // [0, 2, 4]
 */
export function array(number, callback) {
  validate([number, callback], [['intLike', '>=0'], 'function||!'], 'array');

  const array = [];

  for (let i = 0; i < number; i++) {
    array.push(callback ? callback(i) : i);
  }

  return new Arr(array);
}

/**
 * @function iterate
 * @public
 * @param {Number} number - Number of iterations.
 * @param {IterateCallback} callback - Callback that is called on each iteration with the iteration index.
 * @returns {void}
 * @description Method for replacing for (...) construction.
 *
 * @example
 * iterate();
 */
export function iterate(number, callback) {
  validate([number, callback], [['intLike', '>=0'], 'function'], 'iterate');

  for (let i = 0; i < number; i++) {
    callback(i);
  }
}

export default Arr;
