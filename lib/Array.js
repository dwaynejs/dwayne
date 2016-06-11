/**
 * @module Arr
 * @private
 * @mixin
 * @description Exports Arr class.
 */

import Super from './Super';
import constructors from './constants/constructors';
import {
  isArrayLike, isNaN, isString,
	toArray, validate, iterate
} from './helpers';

/**
 * @typedef {Array|*} ArrayLike
 * @public
 * @description Array-like type.
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
		super(array);

    /**
     * @member {ArrayLike} Arr#$
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
   *
   * @example
   * new Arr([1, 2]).concat([3], 4, [[5]]).$; // [1, 2, 3, 4, [5]]
   */
	concat(...arrays) {
		const array = toArray(this.$);

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
   * 
   * @example
   * new Arr(['John', 'Mary', 'Robert']).join(' & '); // 'John & Mary & Robert'
   * new Arr([1, 2, 3]).join();                       // '1,2,3'
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
   *
   * @example
   * new Arr([]).length;        // 0
   * new Arr([1, 2, 3]).length; // 3
   */
	get length() {
		return this.$.length;
	}

  /**
   * @method Arr#pop
   * @public
   * @returns {Arr} Returns this.
   * @description Synonym for
   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/pop}
   * besides returning this.
   *
   * @example
   * new Arr([]).pop().$;        // []
   * new Arr([1, 2, 3]).pop().$; // [1, 2]
   */
	pop() {
		this.$.pop();

		return this;
	}

  /**
   * @method Arr#push
   * @public
   * @returns {Arr} Returns this.
   * @description Synonym for
   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/push}
   * besides returning this.
   *
   * @example
   * new Arr([]).push(1, 2).$;        // [1, 2]
   * new Arr([]).push(1, [2]).$;      // [1, [2]]
   */
	push() {
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
		const a = [];

    iterate(this.$, (value) => {
      a.unshift(value);
    });

		return new this.constructor(a);
	}
	shift() {
    this.$.shift();

		return this;
	}
	shuffle() {
		const array = toArray(this.$);
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
	slice() {
		return new this.constructor(this.$.slice.apply(this.$, arguments));
	}
	sort(f) {
		validate([f], ['function'], 'Arr#contains');
		
		return new this.constructor(toArray(this.$).sort(f));
	}
	sortAsc() {
		return new this.constructor(toArray(this.$).sort(asc));
	}
	sortDesc() {
		return new this.constructor(toArray(this.$).sort((y, x) => {
			return asc(x, y);
		}));
	}
	splice() {
    this.$.splice.apply(this.$, arguments);

		return this;
	}
	string() {
		return this.$.join('');
	}
	unshift() {
		Array.prototype.unshift.apply(this.$, arguments);

		return this;
	}
}

function asc(x, y) {
	x = Number(x);
	y = Number(y);
	
	if (x > y) {
		return 1;
	}
	
	if (x < y) {
		return -1;
	}
	
	if (isNaN(y) && !isNaN(x)) {
		return 1;
	}
	
	if (isNaN(x) && !isNaN(y)) {
		return -1;
	}
	
	return 0;
}

constructors[1].push({
	check: isArrayLike,
	cls: Arr
});

export function array(number, mapFn) {
  validate([number, mapFn], [['intLike', '>=0'], 'function||!']);

  const array = [];

  for (let i = 0; i < number; i++) {
    array.push(mapFn ? mapFn(i) : i);
  }

  return new Arr(array);
}

export default Arr;
