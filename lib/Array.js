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
	toArray, validate, iterate, supportSymbol, defineProperties
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
 * @callback CompareFunction
 * @public
 * @param {*} x - First value to be compared.
 * @param {*} y - Second value to be compared.
 */

export class Arr extends Super {
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
	constructor(array = []) {
		super(toArray(array));

    Object.defineProperty(this, '$$', { value: array });

    /**
     * @member {Array} Arr#$
     * @public
     * @description Made array.
     */

    /**
     * @member {ArrayLike} Arr#$$
     * @public
     * @description Original array.
     */
  }

  /**
   * @method Arr#concat
   * @public
   * @param {...(Array|*)} arrays - Arrays or any other values to concat the array with.
   * @returns {Arr} New instance of Arr.
   * @description Synonym for
   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/concat}.
   */
	concat(...arrays) {
		const array = toArray(this.$, true);

    iterate(arguments, (value) => {
      value = new Super(value).$;

      if (isArrayLike(value) && !isString(value)) {
        iterate(value, (value) => {
          array.push(value);
        });

        return;
      }

      array.push(value);
    });

		return new this.constructor(array);
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
   * @param {String} [separator = ','] - String that is passed to Array#concat.
   * @returns {String} - String of joined array.
   * @description Synonym for
   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/join}.
   */
	join(separator) {
		return this.$.join.apply(this.$, arguments);
	}

  /**
   * @member {*} Arr#last
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
   * @member {Number} Arr#length
   * @public
   * @readonly
   * @description Synonym for
   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/length}.
   */
	get length() {
		return this.$.length;
	}

  /**
   * @method Arr#pop
   * @public
   * @returns {*} Returns deleted element.
   * @description Synonym for
   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/pop}.
   */
	pop() {
    return this.$.pop();
	}

  /**
   * @method Arr#push
   * @public
   * @param {...*} values - See
   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/push}.
   * @returns {Arr} Returns this.
   * @description Synonym for
   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/push}
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
   * @description Reverse the array.
   *
   * @example
   * new Arr([1, 2, 3]).reverse().$; // [3, 2, 1]
   * new Arr([]).reverse().$;        // []
   */
	reverse() {
		const array = this.$;
		const a = [];

    for (let i = array.length - 1; i >= 0; i--) {
      a.push(array[i]);
    }

		return new this.constructor(a);
	}

  /**
   * @method Arr#shift
   * @public
   * @returns {*} Returns deleted element.
   * @description Synonym for
   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/shift}.
   */
  shift() {
    return this.$.shift();
	}

  /**
   * @method Arr#shuffle
   * @public
   * @returns {Arr} A wrap of a shuffled array.
   * @description Method for shuffling.
   *
   * @example
   * new Arr([1, 2, 3, 4]).shuffle().$; // [4, 2, 3, 1]
   */
	shuffle() {
		const array = toArray(this.$, true);
		const length = array.length;
		const a = [];

    iterate(array, (value, index) => {
      const k = index + Math.floor((length - index) * Math.random());
      const change = value;

      a.push(array[k]);
      array[index] = array[k];
      array[k] = change;
    });

		return new this.constructor(a);
	}

  /**
   * @method Arr#slice
   * @param {Number} [begin = 0] - See
   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/slice}.
   * @param {Number} [end = array.length] - See
   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/slice}.
   * @returns {Arr} A wrap of a sliced array.
   * @description Synonym for
   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/slice}.
   */
	slice(begin, end) {
		return new this.constructor(this.$.slice.apply(this.$, arguments));
	}

  /**
   * @method Arr#sort
   * @public
   * @param {CompareFunction} [compareFunction] - See
   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/sort}.
   * @returns {Arr} Returns this.
   * @description Synonym for
   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/sort}.
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
		return this.sort((y, x) => {
			return asc(x, y);
		});
	}

  /**
   * @method Arr#splice
   * @public
   * @param {Number} [start] - See
   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/splice}.
   * @param {Number} [deleteCount] - See
   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/splice}.
   * @param {...*} [items] - See
   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/splice}.
   * @returns {Arr} A wrap of return value of #splice call.
   * @description Synonym for
   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/splice}.
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
   * @returns {*} Returns deleted element.
   * @description Synonym for
   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift}.
   */
  unshift() {
		return this.$.unshift.apply(this.$, arguments);
	}
}

if (supportSymbol) {
  defineProperties(Arr.prototype, {
    [Symbol.toStringTag]: 'Arr'
  });
}

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
 * @param {Number} number
 * @param {?ArrayCallback} [callback] - If it's present it has to a function
 * that returns the element that is pushed to the new array.
 * @returns {Arr} New instance of Arr.
 * @description Method for creating new array from the length using optional callback.
 *
 * @example
 * array(3).$;               // [0, 1, 2]
 * array(3, (i) => i * 2).$; // [0, 2, 4]
 */
export function array(number, callback) {
  validate([number, callback], [['intLike', '>=0'], 'function||!']);

  const array = [];

  for (let i = 0; i < number; i++) {
    array.push(callback ? callback(i) : i);
  }

  return new Arr(array);
}

export default Arr;
