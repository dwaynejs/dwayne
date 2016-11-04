/**
 * @module Super
 * @private
 * @mixin
 * @description Exports Super class.
 */

import { D } from './D';
import { switcher } from './Switcher';
import { constructors } from './constants/constructors';
import {
  isArray, isArrayLike, isDate, isElement, isFunction, isNil, isNaN, isNull,
  isObject, isPlainObject, isPrimitive, isRegExp, isString, isUndefined,
  validate, toStringTag, iterate, Symbol, defineProperties
} from './helpers';

/**
 * @typedef {Super|Arr|Func|Elem|Str|Num|Dat|BlobObject} DWrap
 * @public
 * @description Any kind of D-Wrap.
 */

/**
 * @typedef {String|Number|null} Key
 * @public
 * @description Key type used in many methods.
 */

/**
 * @typedef {TreeElement[]} Tree
 * @public
 */

/**
 * @typedef {Object} TreeElement
 * @public
 * @property {Key} key - Tree element key.
 * @property {*} value - Tree element value.
 * @description {@link Tree} element.
 */

/**
 * @callback DeepIterationCallback
 * @public
 * @param {*} value - Current iteration value.
 * @param {String|Number} key - Current iteration key/index.
 * @param {*} object - Iteration object.
 * @param {Tree} tree - Tree of { key, value } elements.
 */

/**
 * @callback DeepReduceCallback
 * @public
 * @param {*} previousValue - Previous value.
 * @param {*} value - Current iteration value.
 * @param {String|Number} key - Current iteration key/index.
 * @param {*} object - Iteration object.
 * @param {Tree} tree - Tree of { key, value } elements.
 */

/**
 * @callback IterationCallback
 * @public
 * @param {*} value - Current iteration value.
 * @param {String|Number} key - Current iteration key/index.
 * @param {*} object - Iteration object.
 */

/**
 * @callback JSONCallback
 * @public
 * @param {String|null} key - Current value.
 * @param {*} value - Current key.
 * @param {Object} object - Iteration object.
 */

/**
 * @callback ObjectCallback
 * @public
 * @param {Object} newObject - The new object.
 * @param {*} value - Current iteration value.
 * @param {String|Number} key - Current iteration key/index.
 * @param {*} object - Iteration object.
 */

/**
 * @callback ReduceCallback
 * @public
 * @param {*} previousValue - Previous value.
 * @param {*} value - Current iteration value.
 * @param {String|Number} key - Current iteration key/index.
 * @param {*} object - Iteration object.
 */

/**
 * @callback SuperMethod
 * @public
 * @this {DWrap}
 */

const cloneSwitcher = switcher('call', (object) => object)
  .case(
    (object) => new Super(object) === object,
    (object) => new (object.proto().$.constructor)(object)
  )
  .case(isElement, (object, deep) => object.clone(deep))
  .case(isDate, (object) => new Date(object))
  .case(isRegExp, (object) => new RegExp(object.source, object.toString().match(/[gimuy]*$/)[0]))
  .case(isArray, () => [])
  .case(isPlainObject, () => ({}));

/**
 * @class Super
 * @public
 * @param {*} [object] - An object to wrap.
 * @returns {DWrap} Instance of Super.
 * @description Wrap of any value. And there is no way to create a nested wrap.
 *
 * @example
 * new Super({}); // Super
 */
class Super {
  constructor(object) {
    if (object instanceof Super) {
      return object;
    }

    /**
     * @member Super#$
     * @type {*}
     * @public
     * @description Wrapped object.
     */
    Object.defineProperty(this, '$', { value: object });
  }

  /**
   * @method Super.addStaticProperties
   * @public
   * @param {String|Object} property - Either a string of a property or an object
   * with properties keys and values values.
   * @param {Object} [value] - If a property parameter is a string this has to be a property value.
   * @returns {this} Returns this.
   * @description Sets static properties for DWrap constructors.
   *
   * @example
   * Super.addStaticProperties('cool', 42);
   * Super.addStaticProperties('superCool', 42*42);
   */
  static addStaticProperties(property, value) {
    if (arguments.length >= 2) {
      property = { [property]: value };
    }

    defineProperties(this, property);

    return this;
  }

  /**
   * @method Super.addInstanceProperties
   * @public
   * @param {String|Object} property - Either a string of a property or an object
   * with properties keys and values values.
   * @param {Object} [value] - If a property parameter is a string this has to be a property value.
   * @returns {this} Returns this.
   * @description Sets static properties for DWrap prototypes.
   *
   * @example
   * Super.addInstanceProperties('cool', 42);
   * Super.addInstanceProperties('superCool', 42*42);
   */
  static addInstanceProperties(property, value) {
    if (arguments.length >= 2) {
      property = { [property]: value };
    }

    defineProperties(this.prototype, property);

    return this;
  }

  /**
   * @method Super#assign
   * @public
   * @param {...(Object|Super|*)} objects - Objects to be assigned to the object.
   * @returns {DWrap} Returns this.
   * @description Synonym for
   * [Object.assign]
   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign}.
   *
   * @example
   * new Super({ a: 1, b: 2 }).assign({ a: 3 }, { c: 3, d: 4 }, { d: 5 }).$; // { a: 3, b: 2, c: 3, d: 5 }
   */
  assign(...objects) {
    const object = this.$;

    iterate(object && arguments, (o) => {
      iterate(new Super(o).$, (value, key) => {
        object[key] = value;
      });
    });

    return this;
  }

  /**
   * @method Super#average
   * @public
   * @param {IterationCallback} [callback = null] - Callback that is passed to {@link Super#sum}.
   * @returns {Number} Average value.
   * @description Synonym for object.sum(callback) / object.count.
   *
   * @example
   * new Super({ a: 1, b: 2, c: 3 }).average();                         // 2
   * new Super({ a: 1, b: 2, c: 5 }).average((value) => value * value); // 10
   */
  average(callback = null) {
    validate([callback], ['function||!'], 'Super#average');

    return this.sum(callback) / this.count;
  }

  /**
   * @method Super#call
   * @public
   * @param {SuperMethod} func - Function to be called with this context.
   * @param {...*} args - Arguments to be called with.
   * @returns {*} Return of function call.
   * @description Synonym for func.call(DObject, ...args);
   *
   * @example
   * new Super({ a: 1 }).call(function (b, c) {
   *   return this.a + b + c;
   * }, 2, 3); // 6
   */
  call(func, ...args) {
    validate([func], ['function'], 'Super#call');

    return func.apply(this, args);
  }

  /**
   * @method Super#clone
   * @returns {DWrap} New object.
   * @description Method assigns properties of the object to an empty one and returns the new one.
   *
   * @example
   * new Super({ a: 1, b: { c: 2 } }).clone().$; // { a: 1, b: { c: 2 } }
   */
  clone() {
    const object = this.$;
    const clone = cloneSwitcher(object, [object, false]);

    if (clone !== object) {
      iterate(object, (value, key) => {
        clone[key] = value;
      });
    }

    return new this.constructor(clone);
  }

  /**
   * @member Super#count
   * @type {Number}
   * @public
   * @readonly
   * @description Returns number of own enumerable keys of the object.
   *
   * @example
   * new Super({ a: 1, b: 2 }).count; // 2
   */
  get count() {
    const object = this.$;

    if (!isObject(object)) {
      return 0;
    }

    return isArrayLike(object) ? object.length : Object.keys(object).length;
  }

  /**
   * @method Super#create
   * @public
   * @param {Object} [descriptors] - Descriptors passed to Object.create.
   * @returns {DWrap} New instance of D-Wrap.
   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/create
   * @description Synonym for
   * [Object.create]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/create}.
   *
   * @example
   * new Super({}).create({
   *   a: {
   *     value: 1,
   *     enumerable: false,
   *     writable: true,
   *     configurable: false
   *   }
   * }).$; // { a: 1 }
   */
  create(descriptors) {
    return D(isPrimitive(this.$) ? undefined : Object.create(this.$, descriptors));
  }

  /**
   * @method Super#deepAssign
   * @public
   * @param {...*} objects - Objects to be assigned to the object.
   * @returns {DWrap} Returns this.
   * @description Deep analogue of {@link Super#assign}.
   *
   * @example
   * new Super({ a: 1 }).deepAssign(
   *   {
   *     b: {
   *       c: 2
   *     }
   *   },
   *   {
   *     a: {
   *       b: 1
   *     }
   *   },
   *   {
   *     a: {
   *       c: {
   *         d: 1
   *       }
   *     },
   *     b: 2
   *   },
   *   null
   * });
   * // {
   * //   a: {
   * //     b: 1,
   * //     c: {
   * //       d: 1
   * //     }
   * //   },
   * //   b: 2,
   * // }
   */
  deepAssign(...objects) {
    const object = this.$;

    if (isPrimitive(object)) {
      return this;
    }

    iterate(arguments, (o) => {
      deepAssign(object, o);
    });

    return this;
  }

  /**
   * @method Super#deepClone
   * @public
   * @returns {DWrap} New instance of DWrap.
   * @description Deep cloning method. Clones plain objects, arrays, regular expressions and elements, the rest stays the same.
   *
   * @example
   * new Super({ a: 1, b: [2, 3], c: { d: 4 } }).deepClone().$;
   * // {
   * //   a: 1,
   * //   b: [2, 3],
   * //   c: { d: 4 }
   * // }
   */
  deepClone() {
    return new this.constructor(deepClone(this.$));
  }

  /**
   * @method Super#deepEquals
   * @public
   * @param {*} [object] - Object to compare to.
   * @returns {Boolean} - If the objects are deep equal or not.
   * @description Method for deep comparison of two objects.
   *
   * @example
   * new Super({ a: 1 }).deepEquals({ a: '1' }); // true
   * new Super(/1/).deepEquals(/1/);             // true
   */
  deepEquals(object = null) {
    return deepEqual(this.$, object, false);
  }

  /**
   * @method Super#deepEvery
   * @public
   * @param {DeepIterationCallback} [callback = Boolean] - Called on each iteration.
   * If returns truthy iteration goes on and if falsey it stops.
   * @param {Number} [n = Infinity] - Iteration depth.
   * @returns {Boolean} If all the callback calls returned truthy value.
   * @description Returns boolean if all the callback calls returned truthy value.
   * Otherwise false. Deep analogue of {@link Super#every}.
   *
   * @example
   * new Super({ a: 1, b: { c: 2, d: 3 } }).deepEvery((value) => value < 4); // true
   * new Super({ a: {}, b: {}, c: {} }).deepEvery(() => false);              // true
   */
  deepEvery(callback, n) {
    if (arguments.length === 1 && !isFunction(callback)) {
      n = callback;
      callback = Boolean;
    } else if (arguments.length === 1) {
      n = Infinity;
    } else if (!arguments.length) {
      n = Infinity;
      callback = Boolean;
    }

    validate([callback, n], ['function', ['numberLike', '>0']], 'Super#deepEvery');

    n = Number(n);

    return deepEvery(this.$, callback, n, [{ key: null, value: this.$ }]);
  }

  /**
   * @method Super#deepFilter
   * @public
   * @param {DeepIterationCallback} [callback = Boolean] - Called on each iteration.
   * If returns truthy the element is included and if falsey it's excluded.
   * @param {Number} [n = Infinity] - Iteration depth.
   * @returns {DWrap} New D-Wrap of filtered object.
   * @description Returns filtered by the callback object. Deep analogue of {@link Super#filter}.
   *
   * @example
   * new Super({ a: 1, b: { c: 2, d: 3 } }).deepFilter((value) => value%2).$;     // { a: 1, b: { d: 3 } }
   * new Super({ a: 1, b: { c: 2, d: 3 } }).deepFilter((value) => value === 1).$; // { a: 1 }
   * new Super({ a: 1, b: { c: 2, d: 3 } }).deepFilter((value) => value > 3).$;   // {}
   */
  deepFilter(callback, n) {
    if (arguments.length === 1 && !isFunction(callback)) {
      n = callback;
      callback = Boolean;
    } else if (arguments.length === 1) {
      n = Infinity;
    } else if (!arguments.length) {
      n = Infinity;
      callback = Boolean;
    }

    validate([callback, n], ['function', ['numberLike', '>0']], 'Super#deepFilter');

    const filtered = deepFilter(this.$, callback, n, [{ key: null, value: this.$ }]);

    return D(isNil(filtered) ? filtered : filtered || {});
  }

  /**
   * @method Super#deepFind
   * @public
   * @param {DeepIterationCallback} [callback = Boolean] - Called on each iteration.
   * If returns truthy iteration stops and if falsey it continues.
   * @param {Number} [n = Infinity] - Iteration depth.
   * @returns {Tree|null} Tree of { key, value } if something found and null if not.
   * @description Returns tree of the elements if something found and null if nothing found.
   * Deep analogue of {@link Super#find}.
   *
   * @example
   * new Super({ a: 1, b: { c: 2, d: 3 } }).deepFind((value) => value === 2);
   * // [
   * //   { key: 'c', value: 2 },
   * //   { key: 'b', value: { c: 2, d: 3 } },
   * //   { key: null, value: <initial object> }
   * // ]
   */
  deepFind(callback, n) {
    if (arguments.length === 1 && !isFunction(callback)) {
      n = callback;
      callback = Boolean;
    } else if (arguments.length === 1) {
      n = Infinity;
    } else if (!arguments.length) {
      n = Infinity;
      callback = Boolean;
    }

    validate([callback, n], ['function', ['numberLike', '>0']], 'Super#deepFind');

    return deepFind(this.$, callback, n, [{ key: null, value: this.$ }]);
  }

  /**
   * @method Super#deepForEach
   * @public
   * @param {DeepIterationCallback} callback - Called on each iteration.
   * @param {Number} [n = Infinity] - Iteration depth.
   * @returns {DWrap} Returns this.
   * @description Method for iterating over any object. Deep analogue of {@link Super#forEach}.
   *
   * @example
   * new Super({ a: 1, b: { c: 2, d: 3 } }).deepForEach((value, key, object) => object[key] = value * value).$;
   * // { a: 1, b: { c: 4, d: 9 } }
   */
  deepForEach(callback, n = Infinity) {
    validate([callback, n], ['function', ['numberLike', '>0']], 'Super#deepForEach');

    n = Number(n);

    deepForEach(this.$, callback, n, [{ key: null, value: this.$ }]);

    return this;
  }

  /**
   * @method Super#deepForEach
   * @public
   * @param {DeepIterationCallback} callback - Called on each iteration.
   * @param {Number} [n = Infinity] - Iteration depth.
   * @returns {DWrap} Returns this.
   * @description Method for iterating over any object. Deep analogue of {@link Super#forEach}.
   * Unlike {@link Super#deepForEach} the callback is called on every value of every object inside
   *
   * @example
   * new Super({ a: 1, b: { c: 2, d: 3 } }).deepForEach((value, key, object) => object[key] = value * value).$;
   * // { a: 1, b: { c: 4, d: 9 } }
   */
  deepForEachEntry(callback, n = Infinity) {
    validate([callback, n], ['function', ['numberLike', '>0']], 'Super#deepForEach');

    n = Number(n);

    deepForEachEntry(this.$, callback, n, [{ key: null, value: this.$ }]);

    return this;
  }

  /**
   * @method Super#deepFreeze
   * @public
   * @returns {DWrap} Returns this.
   * @description Deep analogue of {@link Super#freeze}.
   *
   * @example
   * new Super({ a: 1, b: { c: 2, d: 3 } }).deepFreeze(); // Super
   */
  deepFreeze() {
    deepFreeze(this.$);

    return this;
  }

  /**
   * @method Super#deepMap
   * @public
   * @param {DeepIterationCallback} callback - Called on each iteration.
   * Return value is used for creating a new object.
   * @param {Number} [n = Infinity] - Iteration depth.
   * @returns {DWrap} D-Wrap of the new object.
   * @description Returns a wrap of a new object using the callback. Deep analogue of {@link Super#map}.
   *
   * @example
   * new Super({ a: 1, b: { c: 2, d: 3 } }).deepMap((value) => value * value).$;
   * // { a: 1, b: { c: 4, d: 9 } }
   */
  deepMap(callback, n = Infinity) {
    validate([callback, n], ['function', ['numberLike', '>0']], 'Super#deepMap');

    n = Number(n);

    return D(deepMap(this.$, callback, n, [{ key: null, value: this.$ }]));
  }

  /**
   * @method Super#deepReduce
   * @public
   * @param {DeepReduceCallback} callback - Called on each iteration.
   * Return value is passed to the next callback call.
   * @param {Number} [n = Infinity] - Iteration depth.
   * @param {*} [IV = <first value>|undefined] - Initial value.
   * @returns {*} Modified IV.
   * @description Returns modified IV. Deep analogue of {@link Super#reduce}.
   *
   * @example
   * new Super({ a: 1, b: { c: 2, d: 3 } }).deepReduce((sum, value) => sum + value * value, Infinity, 0); // 14
   */
  deepReduce(callback, n = Infinity, IV) {
    validate([callback, n], ['function', ['numberLike', '>0']], 'Super#deepReduce');

    n = Number(n);

    const object = this.$;
    const tree = [{ key: null, value: this.$ }];

    if (arguments.length < 3) {
      return deepReduce(object, callback, n, false, undefined, tree).IV;
    }

    return deepReduce(object, callback, n, false, { IV }, tree).IV;
  }

  /**
   * @method Super#deepSome
   * @public
   * @param {DeepIterationCallback} [callback = Boolean] - Called on each iteration.
   * If returns truthy iteration stops and if falsey it continues.
   * @param {Number} [n = Infinity] - Iteration depth.
   * @returns {Boolean} If all the callback calls returned truthy value.
   * @description Returns true if some of the callback calls returned truthy value.
   * Otherwise false. Deep analogue of {@link Super#some}.
   *
   * @example
   * new Super({ a: 1, b: { c: 2, d: 3 } }).deepSome((value) => value > 4); // false
   * new Super({ a: {}, b: {}, c: {} }).deepSome(() => true);               // false
   */
  deepSome(callback, n) {
    if (arguments.length === 1 && !isFunction(callback)) {
      n = callback;
      callback = Boolean;
    } else if (arguments.length === 1) {
      n = Infinity;
    } else if (!arguments.length) {
      n = Infinity;
      callback = Boolean;
    }

    validate([callback, n], ['function', ['numberLike', '>0']], 'Super#deepSome');

    n = Number(n);

    return deepSome(this.$, callback, n, [{ key: null, value: this.$ }]);
  }

  /**
   * @method Super#deepStrictEquals
   * @public
   * @param {*} [object] - Object to compare to.
   * @returns {Boolean} - If the objects are deep strict equal or not.
   * @description Method for deep strict comparison of two objects.
   *
   * @example
   * new Super({ a: 1 }).deepStrictEquals({ a: '1' }); // false
   * new Super(/1/).deepStrictEquals(/1/);             // true
   */
  deepStrictEquals(object = null) {
    return deepEqual(this.$, object, true);
  }

  /**
   * @method Super#define
   * @param {String|Object} property - Either a string of a property or a descriptors object.
   * @param {Object} [descriptor] - If a property parameter is a string this has to be a property descriptor.
   * @returns {DWrap} Returns this.
   * @description Synonym for both
   * [Object.defineProperty]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty}
   * and
   * [Object.defineProperties]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties}.
   *
   * @example
   * new Super({}).define('a', {
   *   value: 1,
   *   enumerable: false,
   *   writable: true,
   *   configurable: false
   * }).$; // { a: 1 }
   * new Super({}).define({
   *   a: {
   *     value: 1,
   *     enumerable: false,
   *     writable: true,
   *     configurable: false
   *   }
   * }).$; // { a: 1 }
   */
  define(property, descriptor) {
    if (arguments.length >= 2) {
      property = { [property]: descriptor };
    }

    property = new Super(property).$;

    if (isObject(this.$)) {
      Object.defineProperties(this.$, property);
    }

    return this;
  }

  /**
   * @method Super#delete
   * @public
   * @param {...String} props - List of properties to delete.
   * @returns {DWrap} Returns this.
   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/delete
   * @description Synonym for multiple
   * ["delete" operator]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/delete}.
   *
   * @example
   * new Super({ a: 1, b: 2, c: 3 }).delete('c', 'a').$; // { b: 2 }
   */
  delete(...props) {
    const object = this.$;

    iterate(object && props, (property) => {
      delete object[property];
    });

    return this;
  }

  /**
   * @method Super#equals
   * @public
   * @param {*} [object] - Object to compare.
   * @returns {Boolean} If the objects are equal or not.
   * @description Returns true if objects are equal using '==' operator and false if not. NaNs are considered to be equal.
   *
   * @example
   * new Super(3).equals('3');   // true
   * new Super(NaN).equals(NaN); // true
   */
  equals(object) {
    const o = this.$;

    object = new Super(object).$;

    /* eslint eqeqeq: 0 */
    return o == object || (isNaN(o) && isNaN(object));
  }

  /**
   * @method Super#every
   * @public
   * @param {IterationCallback} [callback = Boolean] - Called on each iteration.
   * If returns truthy iteration goes on and if falsey it stops.
   * @returns {Boolean} If all the callback calls returned truthy value.
   * @description Returns boolean if all the callback calls returned truthy value.
   *
   * @example
   * new Super({ a: 1, b: 2, c: 3 }).every((value) => value < 4); // true
   * new Super({}).every(() => false);                            // true
   */
  every(callback = Boolean) {
    validate([callback], ['function'], 'Super#every');

    return iterate(this.$, (value, key, object) => {
      if (!callback(value, key, object)) {
        return false;
      }
    }) !== false;
  }

  /**
   * @method Super#filter
   * @public
   * @param {IterationCallback} [callback = Boolean] - Called on each iteration.
   * If returns truthy the element is included and if falsey it's excluded.
   * @returns {DWrap} New D-Wrap of filtered object.
   * @description Returns filtered by the callback object.
   *
   * @example
   * new Super({ a: 1, b: 2, c: 3 }).filter((value) => value%2).$; // { a: 1, c: 3 }
   * new Super(null).filter((value) => value%2).$;                 // null
   */
  filter(callback = Boolean) {
    validate([callback], ['function'], 'Super#filter');

    const object = this.$;
    const array = isArrayLike(object);

    /* eslint no-nested-ternary: 0 */
    const o = array ? [] : isNil(object) ? object : {};

    iterate(object, (value, key) => {
      if (callback(value, key, object)) {
        if (array) {
          o.push(value);
        } else {
          o[key] = value;
        }
      }
    });

    return D(o);
  }

  /**
   * @method Super#find
   * @public
   * @param {IterationCallback} [callback = Boolean] - Called on each iteration.
   * If returns truthy iteration stops and if falsey it continues.
   * @returns {{ key: Key, value: * }|null} { key, value } if found and null if not.
   * @description Returns found { key, value } if something found and null if nothing found.
   *
   * @example
   * new Super({ a: 1, b: 2, c: 3 }).find((value) => value === 2); // { key: 'b', value: 2 }
   * new Super([1, 2, 3]).find((value) => value === 2);            // { key: 1, value: 2 }
   */
  find(callback) {
    validate([callback], ['function'], 'Super#find');

    return iterate(this.$, (value, key, object) => {
      if (callback(value, key, object)) {
        return { key, value };
      }
    }) || null;
  }

  /**
   * @method Super#forEach
   * @public
   * @param {IterationCallback} callback - Called on each iteration.
   * @returns {DWrap} Returns this.
   * @description Method for iterating over any object.
   *
   * @example
   * new Super({ a: 1, b: 2, c: 3 }).forEach((value, key, object) => {
   *   object[key] = value * value;
   * }).$; // { a: 1, b: { c: 4, d: 5 } }
   */
  forEach(callback) {
    validate([callback], ['function'], 'Super#forEach');

    iterate(this.$, (value, key, object) => {
      callback(value, key, object);
    });

    return this;
  }

  /**
   * @method Super#freeze
   * @public
   * @returns {DWrap} Returns this.
   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
   * @description Synonym for
   * [Object.freeze]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze}.
   *
   * @example
   * new Super({ a: 1, b: 2, c: 3 }).freeze(); // Super
   */
  freeze() {
    Object.freeze(this.$);

    return this;
  }

  /**
   * @method Super#get
   * @public
   * @param {String|Object.<String, Function>} property - Either a string of a property or a getters object.
   * @param {Function} [getter] - If a property parameter is a string this has to be a getter function.
   * @returns {DWrap} Returns this.
   * @description Method for defining getters.
   *
   * @example
   * const object1 = new Super({}).get('a', () => 1).$;
   * object1.a; // 1
   *
   * const object2 = new Super({}).get({
   *   a: () => 2
   * }).$;
   * object2.a; // 2
   */
  get(property, getter) {
    if (arguments.length >= 2) {
      property = { [property]: getter };
    }

    const object = this.$;

    iterate(isObject(object) && new Super(property).$, (getter, property) => {
      Object.defineProperty(object, property, { get: getter });
    });

    return this;
  }

  /**
   * @method Super#has
   * @public
   * @param {String|*} key - Property to check.
   * @returns {Boolean} Returns true if the object has the key and false if not.
   * @see https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/in
   * @description Synonym for
   * ["in" operator]{@link https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/in}.
   *
   * @example
   * new Super({ a: 1, b: 2, c: 3 }).has('b'); // true
   */
  has(key) {
    const object = this.$;

    if (!isObject(object)) {
      return false;
    }

    return key in object;
  }

  /**
   * @method Super#hasOwn
   * @public
   * @param {String|*} key - Property to check.
   * @returns {Boolean} Returns true if the object has its own key and false if not.
   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty
   * @description Synonym for
   * [Object#hasOwnProperty]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty}.
   *
   * @example
   * new Super({ a: 1, b: 2, c: 3 }).hasOwn('b');              // true
   * new Super({ a: 1, b: 2, c: 3 }).hasOwn('hasOwnProperty'); // false
   */
  hasOwn(key) {
    const object = this.$;

    if (!isObject(object)) {
      return false;
    }

    return {}.hasOwnProperty.call(object, key);
  }

  /**
   * @method Super#instanceof
   * @public
   * @param {Function} constructor - Constructor to check.
   * @returns {Boolean} If the object is an instance of constructor.
   * @see https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/instanceof
   * @description Synonym for
   * ["instanceof" operator]{@link https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/instanceof}.
   */
  instanceof(constructor) {
    return this.$ instanceof constructor;
  }

  /**
   * @method Super#isFrozen
   * @public
   * @returns {Boolean} If the object is frozen.
   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/isFrozen
   * @description Synonym for
   * [Object.isFrozen]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/isFrozen}.
   *
   * @example
   * new Super({}).freeze().isFrozen(); // true
   */
  isFrozen() {
    return Object.isFrozen(this.$);
  }

  /**
   * @method Super#json
   * @public
   * @param {JSONCallback|String[]} [replacer] - See the link.
   * @param {String|Number} [space] - See the link.
   * @returns {String} JSON string.
   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
   * @description Synonym for
   * [JSON.stringify]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify}.
   *
   * @example
   * new Super({ a: 1, b: 2, c: 3 }).json(); // '{"a":1,"b":2,"c":3}'
   * new Super({ a: 1, b: 2, c: 3 }).json('    ');
   * // {
   * //     "a": 1,
   * //     "b": 2,
   * //     "c": 3
   * // }
   * new Super({ a: 1, b: 2, c: 3 }).json((key, value) => {
   *   if (typeof value === 'number') {
   *     return value%2 ? key + value0 : undefined;
   *   }
   *
   *   return value;
   * }, 2);
   * // {
   * //   "a": "a1",
   * //   "c": "c3"
   * // }
   */
  json(replacer, space) {
    if (arguments.length === 1 && !isFunction(replacer) && !isArray(replacer)) {
      [].unshift.call(arguments, null);
    }

    [].unshift.call(arguments, this.$);

    return JSON.stringify.apply(JSON, arguments);
  }

  /**
   * @method Super#keyOf
   * @public
   * @param {*} value - Value to find.
   * @returns {String|Number|null} A key or an index if found and null if not.
   * @description Method for finding equal to the argument value in the object. NaNs are considered to be equal.
   *
   * @example
   * new Super({ a: 1, b: 2, c: 3 }).keyOf(2);   // 'b'
   * new Super({ a: 1, b: 2, c: 3 }).keyOf('2'); // 'b'
   */
  keyOf(value) {
    const key = iterate(this.$, (val, key) => {
      if (val == value || (isNaN(val) && isNaN(value))) {
        return key;
      }
    });

    return isUndefined(key) ? null : key;
  }

  /**
   * @method Super#keyOfStrict
   * @public
   * @param {*} value - Value to find.
   * @returns {String|Number|null} A key or an index if found and null if not.
   * @description Method for finding strict equal to the argument value in the object. NaNs are considered to be equal.
   *
   * @example
   * new Super({ a: 1, b: 2, c: 3 }).keyOfStrict(2);   // 'b'
   * new Super({ a: 1, b: 2, c: 3 }).keyOfStrict('2'); // 'b'
   */
  keyOfStrict(value) {
    const key = iterate(this.$, (val, key) => {
      if (val === value || (isNaN(val) && isNaN(value))) {
        return key;
      }
    });

    return isUndefined(key) ? null : key;
  }

  /**
   * @method Super#keys
   * @public
   * @returns {DWrap} A wrap of the keys array.
   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
   * @description Synonym for
   * [Object.keys]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/keys}.
   *
   * @example
   * new Super({ a: 1, b: 2, c: 3 }).keys().$; // ['a', 'b', 'c']
   * new Super(null).keys().$;                 // []
   */
  keys() {
    const object = this.$;

    return D(isObject(object) ? Object.keys(object) : []);
  }

  /**
   * @method Super#map
   * @public
   * @param {IterationCallback} callback - Called on each iteration.
   * Return value is used for creating a new object.
   * @returns {DWrap} D-Wrap of the new object.
   * @description Returns a wrap of a new object using the callback.
   *
   * @example
   * new Super({ a: 1, b: 2, c: 3 }).map((value) => value * 2).$; // { a: 2, b: 4, c: 6 }
   * new Super(null).map((value) => value * 2).$;                 // null
   */
  map(callback) {
    validate([callback], ['function'], 'Super#map');

    const object = this.$;
    const o = isArrayLike(object) ? [] : isNull(object) ? null : {};

    iterate(object, (value, key) => {
      o[key] = callback(value, key, object);
    });

    return D(o);
  }

  /**
   * @method Super#max
   * @public
   * @param {IterationCallback} callback - Called on each iteration.
   * Return value is used for comparison with the previous max value.
   * @returns {{key: Key, value: Number}} Object with max value and key of the max value.
   * @description Method for finding max value in the object.
   * If no callback is present comparison is between values of the object.
   *
   * @example
   * new Super({ a: 1, b: 2, c: 3 }).max();                     // { key: 'c', value: 3 }
   * new Super({ a: 1, b: 2, c: 3 }).max((value) => 4 - value); // { key: 'a', value: 3 }
   * new Super({ a: 'a', b: 'b', c: 'c' }).max();               // { key: null, value: -Infinity }
   */
  max(callback = null) {
    validate([callback], ['function||!'], 'Super#max');

    return this.object((max, value, key, object) => {
      const val = Number(callback ? callback(value, key, object) : value);

      if (val > max.value) {
        max.key = key;
        max.value = val;
      }
    }, { key: null, value: -Infinity }).$;
  }

  /**
   * @method Super#min
   * @public
   * @param {IterationCallback} callback - Called on each iteration.
   * Return value is used for comparison with the previous min value.
   * @returns {{key: Key, value: Number}} Object with min value and key of the min value.
   * @description Method for finding min value in the object.
   * If no callback is present comparison is between values of the object.
   *
   * @example
   * new Super({ a: 1, b: 2, c: 3 }).min();                     // { key: 'a', value: 1 }
   * new Super({ a: 1, b: 2, c: 3 }).min((value) => 4 - value); // { key: 'c', value: 1 }
   * new Super({ a: 'a', b: 'b', c: 'c' }).min();               // { key: null, value: Infinity }
   */
  min(callback = null) {
    validate([callback], ['function||!'], 'Super#min');

    return this.object((min, value, key, object) => {
      const val = Number(callback ? callback(value, key, object) : value);

      if (val < min.value) {
        min.key = key;
        min.value = val;
      }
    }, { key: null, value: Infinity }).$;
  }

  /**
   * @method Super#object
   * @public
   * @param {ObjectCallback} callback - Called on each iteration.
   * @param {Object|*} [object = {}] - Object that is passed to the callback.
   * @returns {DWrap} Wrap of the new object.
   * @description Type of {@link Super#reduce}.
   * The object is passed as an argument into the callback. The output is this object.
   *
   * @example
   * new Super({ a: 1, b: 2 }).object((object, value, key) => {
   *   object[key] = value;
   *   object[key + key] = value * 2;
   * }).$; // { a: 1, aa: 2, b: 2, bb: 4 }
   */
  object(callback, object = {}) {
    validate([callback], ['function'], 'Super#object');

    iterate(this.$, (value, key, obj) => {
      callback(object, value, key, obj);
    });

    return D(object);
  }

  /**
   * @method Super#prop
   * @public
   * @param {String|Object.<String, *>} property - Either a string of a property or an assigned object.
   * @param {*} [value] - If a property parameter is a string
   * this has to be an assigned value if it's present.
   * @returns {DWrap|*} Returns this if it's a setter or a value if getter.
   * @description Method for getting and setting properties.
   *
   * @example
   * new Super({ a: 1, b: 2, c: 3 }).prop('a');              // 1
   * new Super({ a: 1, b: 2, c: 3 }).prop('a', 7).$;         // { a: 7, b: 2, c: 3 }
   * new Super({ a: 1, b: 2, c: 3 }).prop({ a: 7, b: 8 }).$; // { a: 7, b: 8, c: 3 }
   */
  prop(property, value) {
    if (arguments.length <= 1 && isString(property)) {
      return this.$ ? this.$[property] : undefined;
    }

    if (arguments.length >= 2) {
      property = { [property]: value };
    }

    return this.assign(property);
  }

  /**
   * @method Super#propertyDescriptor
   * @public
   * @param {String} property - Property of the object.
   * @returns {Object|undefined} Property descriptor.
   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor
   * @descriptor Synonym for
   * [Object.getOwnPropertyDescriptor]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor}.
   *
   * @example
   * new Super({ a: 1 }).propertyDescriptor('a');
   * // {
   * //   value: 1,
   * //   enumerable: true,
   * //   writable: true,
   * //   configurable: true
   * // }
   */
  propertyDescriptor(property) {
    const object = this.$;

    return isObject(object) ? Object.getOwnPropertyDescriptor(object, property) : undefined;
  }

  /**
   * @method Super#propertyNames
   * @public
   * @returns {DWrap} D-Wrap of the names array.
   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames
   * @descriptor Synonym for
   * [Object.getOwnPropertyNames]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames}.
   *
   * @example
   * new Super({ a: 1, b: 2 }).define('c', { value: 3 }).$; // ['a', 'b', 'c']
   */
  propertyNames() {
    const object = this.$;

    return D(isObject(object) ? Object.getOwnPropertyNames(object) : []);
  }

  /**
   * @method Super#propertySymbols
   * @public
   * @returns {DWrap} D-Wrap of the names array.
   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols
   * @descriptor Synonym for
   * [Object.getOwnPropertySymbols]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols}.
   *
   * @example
   * new Super({ [Symbol('foo')]: 1 }).define(Symbol('bar'), { value: 2 }).$; // [Symbol('foo'), Symbol('bar')]
   */
  propertySymbols() {
    const object = this.$;

    return D(isObject(object) ? Object.getOwnPropertySymbols(object) : []);
  }

  /**
   * @method Super#proto
   * @public
   * @param {*} [proto] - If it's present it's set as a prototype to the object.
   * @returns {DWrap} In getter mode returns wrap of the prototype and in setter mode returns this.
   * @description Synonym for both
   * [Object.getPrototypeOf]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf}
   * and
   * [Object.setPrototypeOf]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf}.
   */
  proto(proto) {
    const object = this.$;
    const isContextObject = !isNil(object);

    if (arguments.length) {
      if (isContextObject && (isObject(proto) || isNull(proto))) {
        Object.setPrototypeOf(object, proto);
      }

      return this;
    }

    return isContextObject ? new Super(Object.getPrototypeOf(object)) : new Super();
  }

  /**
   * @method Super#reduce
   * @public
   * @param {ReduceCallback} callback - Called on each iteration.
   * Return value is passed to the next callback call.
   * @param {*} [IV = <first value>|undefined] - Initial value.
   * @returns {*} Modified IV.
   * @description Returns modified IV. If the second argument is not present first value in the object is taken
   *
   * @example
   * new Super({ a: 1, b: 2, c: 3 }).reduce((sum, value) => sum + value * value, 0); // 14
   */
  reduce(callback, IV) {
    validate([callback], ['function'], 'Super#reduce');

    const object = this.$;

    let startKey;

    if (arguments.length === 1) {
      iterate(object, (value, key) => {
        startKey = key;
        IV = value;

        return true;
      });
    }

    iterate(object, (value, key) => {
      if (key !== startKey) {
        IV = callback(IV, value, key, object);
      }
    });

    return IV;
  }

  /**
   * @method Super#set
   * @public
   * @param {String|Object.<String, Function>} property - Either a string of a property or a setters object.
   * @param {Function} [setter] - If a property parameter is a string this has to be a setter function.
   * @returns {DWrap} Returns this.
   * @description Method for defining setters.
   *
   * @example
   * const object = new Super({})
   *   .get('public', function () {
   *     return this._private;
   *   })
   *   .set('public', function (value) {
   *     if (typeof value === 'number') {
   *       this._private = value;
   *     }
   *   });
   * object.prop('public', '1').$; // { public: undefined }
   * object.prop('public', 1).$;   // { public: 1, _private: 1 }
   *
   * new Super({}).set({
   *   public(value) {
   *     if (typeof value === 'number') {
   *       this._private = value;
   *     }
   *   }
   * });
   */
  set(property, setter) {
    if (arguments.length >= 2) {
      property = { [property]: setter };
    }

    const object = this.$;

    iterate(isObject(object) && new Super(property).$, (setter, property) => {
      Object.defineProperty(object, property, { set: setter });
    });

    return this;
  }

  /**
   * @method Super#some
   * @public
   * @param {IterationCallback} [callback = Boolean] - Called on each iteration.
   * If returns truthy iteration stops and if falsey it continues.
   * @returns {Boolean} If all the callback calls returned truthy value.
   * @description Returns true if some of the callback calls returned truthy value. Otherwise false.
   *
   * @example
   * new Super({ a: 1, b: 2, c: 3 }).some((value) => value > 4); // false
   * new Super({}).some(() => true);                             // false
   */
  some(callback = Boolean) {
    validate([callback], ['function'], 'Super#some');

    return iterate(this.$, (value, key, object) => {
      if (callback(value, key, object)) {
        return true;
      }
    }) || false;
  }

  /**
   * @method Super#strictEquals
   * @public
   * @param {*} [object] - Object to compare.
   * @returns {Boolean} If the objects are equal or not.
   * @description Returns true if objects are equal using '===' operator and false if not.
   * NaNs are considered to be strict equal.
   *
   * @example
   * new Super(3).strictEquals('3');   // false
   * new Super(NaN).strictEquals(NaN); // true
   */
  strictEquals(object) {
    const o = this.$;

    object = new Super(object).$;

    return o === object || (isNaN(o) && isNaN(object));
  }

  /**
   * @method Super#sum
   * @public
   * @param {IterationCallback} [callback = null] - Called on each iteration.
   * @returns {Number} Sum.
   * @description Type of {@link Super#reduce}.
   * If the callback is present it's used for summing. If not the value is used.
   *
   * @example
   * new Super({ a: 1, b: 2, c: 3 }).sum();                         // 6
   * new Super({ a: 1, b: 2, c: 3 }).sum((value) => value * value); // 14
   */
  sum(callback = null) {
    validate([callback], ['function||!'], 'Super#sum');

    return this.reduce((sum, value, key, object) => (
      sum + Number(callback ? callback(value, key, object) : value)
    ), 0);
  }

  toJSON() {
    return this.$;
  }

  /**
   * @member Super#toStringTag
   * @type {String}
   * @public
   * @readonly
   * @description Returns toString tag of the object.
   *
   * @example
   * new Super({}).toStringTag; // 'Object'
   * new Super([]).toStringTag; // 'Array'
   * new Super(1).toStringTag;  // 'Number'
   */
  get toStringTag() {
    return toStringTag(this.$);
  }

  /**
   * @member Super#type
   * @type {String}
   * @public
   * @readonly
   * @description Synonym for
   * ["typeof" operator]{@link https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/instanceof}..
   *
   * @example
   * new Super({}).type;   // 'object'
   * new Super(1).type;    // 'number'
   * new Super('1').type;  // 'string'
   * new Super(true).type; // 'boolean'
   */
  get type() {
    return typeof this.$;
  }

  /**
   * @method Super#value
   * @public
   * @param {String|Object.<String, *>} property - Either a string of a property or a values object.
   * @param {Object.<String, *>} [value] - If a property parameter is a string this has to be a value to be set.
   * @returns {DWrap} Returns this.
   * @description Method for defining non-enumerable, non-writable, non-configurable values.
   * Synonym for object.define(property, { value: value }).
   *
   * @example
   * new Super({}).value('a', 1).$; // { a: 1 }
   * new Super({}).value({
   *   a: 1
   * }).$;                          // { a: 1 }
   */
  value(property, value) {
    if (arguments.length >= 2) {
      property = { [property]: value };
    }

    const object = this.$;

    iterate(isObject(object) && new Super(property).$, (value, property) => {
      Object.defineProperty(object, property, { value });
    });

    return this;
  }

  /**
   * @method Super#values
   * @public
   * @returns {DWrap} A wrap of the values array.
   * @description Returns D-Wrap of the values array.
   *
   * @example
   * new Super({ a: 1, b: 2, c: 3 }).values().$; // [1, 2, 3]
   * new Super(null).values().$;                 // []
   */
  values() {
    const array = [];

    iterate(this.$, (value) => {
      array.push(value);
    });

    return D(array);
  }

  /**
   * @method Super#word
   * @public
   * @param {IterationCallback} callback - Called on each iteration.
   * @returns {String} Concatenated string.
   * @description Type of {@link Super#reduce}.
   * If the callback is present it's used for concatenating. If not the value is used.
   *
   * @example
   * new Super({ a: 1, b: 2, c: 3 }).word();                         // '123'
   * new Super({ a: 1, b: 2, c: 3 }).word((value) => value + value); // '112233'
   */
  word(callback = null) {
    validate([callback], ['function||!'], 'Super#word');

    return this.reduce((word, value, key, object) => (
      word + String(callback ? callback(value, key, object) : value)
    ), '');
  }
}

defineProperties(Super.prototype, {
  [Symbol.toStringTag]: 'Super'
});

/**
 * @function deepAssign
 * @private
 * @param {*} target - Object to assign properties to.
 * @param {*} object - Object to assign properties from.
 * @returns {void}
 */
function deepAssign(target, object) {
  iterate(object, (value, key) => {
    if (isPrimitive(target[key]) || !{}.hasOwnProperty.call(target, key)) {
      target[key] = deepClone(value);

      return;
    }

    if (!isPrimitive(target[key])) {
      deepAssign(target[key], value);
    }
  });
}

/**
 * @function deepClone
 * @private
 * @param {*} object - Object to clone.
 * @description Does the deep cloning.
 */
function deepClone(object) {
  const clone = cloneSwitcher(object, [object, true]);

  if (clone !== object) {
    iterate(object, (value, key) => {
      clone[key] = deepClone(value);
    });
  }

  return clone;
}

/**
 * @function deepEqual
 * @private
 * @param {*} o1 - First object to compare.
 * @param {*} o2 - Second object to compare.
 * @param {Boolean} strict - If comparison should be strict or not.
 * @returns {Boolean} - If the object are deep equal or not.
 */
function deepEqual(o1, o2, strict) {
  if (o1 === o2) {
    return true;
  }

  if (isNaN(o1) && isNaN(o2) && isPrimitive(o1) && isPrimitive(o2)) {
    return true;
  }

  if (isNaN(o1) || isNaN(o2)) {
    return false;
  }

  if (isPrimitive(o1) || isPrimitive(o2)) {
    return strict ? o1 === o2 : o1 == o2;
  }

  if (isDate(o1) && isDate(o2)) {
    return o1.getTime() === o2.getTime();
  }

  if (isDate(o1) || isDate(o2)) {
    return false;
  }

  if (isRegExp(o1) && isRegExp(o2)) {
    return o1.source === o2.source &&
      o1.toString().match(/[gimuy]*$/)[0] === o2.toString().match(/[gimuy]*$/)[0] &&
      o1.lastIndex === o2.lastIndex;
  }

  if (isRegExp(o1) || isRegExp(o2)) {
    return false;
  }

  if ((!isPlainObject(o1) && !isArray(o1)) || (!isPlainObject(o2) && !isArray(o2))) {
    return false;
  }

  const p1 = Object.getPrototypeOf(o1);
  const p2 = Object.getPrototypeOf(o1);

  if (Object.keys(o1).length !== Object.keys(o2).length) {
    return false;
  }

  if (p1 && p2 && (toStringTag(p1.constructor) !== toStringTag(p2.constructor))) {
    return false;
  }

  return iterate(o1, (value, key) => {
    if (!(key in o2) || !deepEqual(value, o2[key], strict)) {
      return false;
    }
  }) !== false;
}

/**
 * @function deepEvery
 * @private
 * @param {*} object - Object to iterate over.
 * @param {DeepIterationCallback} callback - Callback that is called on every element.
 * If returns truthy the iteration goes on and if not it stops.
 * @param {Number} n - Depth of iteration.
 * @param {Tree} tree - Tree of { key, value } objects of iteration.
 * @returns {Boolean} - If all the callback calls returned truthy value.
 */
function deepEvery(object, callback, n, tree) {
  const end = n === 1;

  return iterate(object, (value, key, object) => {
    const newTree = [{ key, value }].concat(tree);

    if (
      end || isPrimitive(value)
        ? !callback(value, key, object, newTree)
        : !deepEvery(value, callback, n - 1, newTree)
    ) {
      return false;
    }
  }) !== false;
}

/**
 * @function deepFilter
 * @private
 * @param {*} object - Object to iterate over.
 * @param {DeepIterationCallback} callback - Callback that is called on every element.
 * If returns truthy the element is included in the output and if not it's excluded.
 * @param {Number} n - Depth of iteration.
 * @param {Tree} tree - Tree of { key, value } objects of iteration.
 * @returns {*} Filtered object.
 */
function deepFilter(object, callback, n, tree) {
  const array = isArrayLike(object);
  const nul = isNil(object);
  const o = array ? [] : nul ? object : {};
  const end = n === 1;

  iterate(object, (value, key, object) => {
    const newTree = [{ key, value }].concat(tree);

    if ((end || isPrimitive(value)) && callback(value, key, object, newTree)) {
      if (array) {
        o.push(value);
      } else {
        o[key] = value;
      }

      return;
    }

    if (!end) {
      const filtered = deepFilter(value, callback, n - 1, newTree);

      if (filtered) {
        if (array) {
          o.push(filtered);
        } else {
          o[key] = filtered;
        }
      }
    }
  });

  if (array) {
    return o.length ? o : undefined;
  }

  if (!nul) {
    return Object.keys(o).length ? o : undefined;
  }

  return o;
}

/**
 * @function deepFind
 * @private
 * @param {*} object - Object to iterate over.
 * @param {DeepIterationCallback} callback - Callback that is called on every element.
 * If returns truthy the iteration stops and if not it continues.
 * @param {Number} n - Depth of iteration.
 * @param {Tree} tree - Tree of { key, value } objects of iteration.
 * @returns {Tree|null} - If found the whole tree is returned and if not it's null what's returned.
 */
function deepFind(object, callback, n, tree) {
  const end = n === 1;

  return iterate(object, (value, key, object) => {
    const newTree = [{ key, value }].concat(tree);

    if (end || isPrimitive(value)) {
      if (callback(value, key, object, newTree)) {
        return newTree;
      }

      return;
    }

    const result = deepFind(value, callback, n - 1, newTree);

    if (result) {
      return result;
    }
  }) || null;
}

/**
 * @function deepForEach
 * @private
 * @param {*} object - Object to iterate over.
 * @param {DeepIterationCallback} callback - Callback that is called on every element.
 * @param {Number} n - Depth of iteration.
 * @param {Tree} tree - Tree of { key, value } objects of iteration.
 * @returns {void}
 */
function deepForEach(object, callback, n, tree) {
  const end = n === 1;

  iterate(object, (value, key, object) => {
    const newTree = [{ key, value }].concat(tree);

    if (end || isPrimitive(value)) {
      callback(value, key, object, newTree);
    } else {
      deepForEach(value, callback, n - 1, newTree);
    }
  });
}

/**
 * @function deepForEachEntry
 * @private
 * @param {*} object - Object to iterate over.
 * @param {DeepIterationCallback} callback - Callback that is called on every element.
 * @param {Number} n - Depth of iteration.
 * @param {Tree} tree - Tree of { key, value } objects of iteration.
 * @returns {void}
 */
function deepForEachEntry(object, callback, n, tree) {
  const end = n === 1;

  iterate(object, (value, key, object) => {
    const newTree = [{ key, value }].concat(tree);

    callback(value, key, object, newTree);

    if (!end && !isPrimitive(value)) {
      deepForEachEntry(value, callback, n - 1, newTree);
    }
  });
}

/**
 * @function deepFreeze
 * @private
 * @param {*} object - Object to freeze.
 * @returns {void}
 */
function deepFreeze(object) {
  Object.freeze(object);
  iterate(object, deepFreeze);
}

/**
 * @function deepMap
 * @private
 * @param {*} object - Object to iterate over.
 * @param {DeepIterationCallback} callback - Callback that is called on every element.
 * Returned value is used to create to new object.
 * @param {Number} n - Depth of iteration.
 * @param {Tree} tree - Tree of { key, value } objects of iteration.
 * @returns {*} New object.
 */
function deepMap(object, callback, n, tree) {
  const o = isArrayLike(object) ? [] : isNil(object) ? object : {};
  const end = n === 1;

  iterate(object, (value, key, object) => {
    const newTree = [{ key, value }].concat(tree);

    o[key] = end || isPrimitive(value)
      ? callback(value, key, object, newTree)
      : deepMap(value, callback, n - 1, newTree);
  });

  return o;
}

/**
 * @function deepReduce
 * @private
 * @param {*} object - Object to iterate over.
 * @param {DeepReduceCallback} callback - Callback that is called on every element.
 * Returned value is used to create to new object.
 * @param {Number} n - Depth of iteration.
 * @param {Boolean} start - If callback was called already or not.
 * @param {{ IV: * }|undefined} IV - If callback was called already or not.
 * @param {Tree} tree - Tree of { key, value } objects of iteration.
 * @returns {{ IV: * }} Transformed IV.
 */
function deepReduce(object, callback, n, start, IV, tree) {
  const end = n === 1;

  iterate(object, (value, key, object) => {
    if (!IV && (end || isPrimitive(value)) && !start) {
      IV = { IV: value };
      start = true;

      return;
    }

    const newTree = [{ key, value }].concat(tree);

    IV = end || isPrimitive(value)
      ? { IV: callback(IV.IV, value, key, object, newTree) }
      : deepReduce(value, callback, n - 1, start, IV, newTree);
  });

  return IV;
}

/**
 * @function deepSome
 * @private
 * @param {*} object - Object to iterate over.
 * @param {DeepIterationCallback} callback - Callback that is called on every element.
 * If returns truthy the iteration stops and if not it continues.
 * @param {Number} n - Depth of iteration.
 * @param {Tree} tree - Tree of { key, value } objects of iteration.
 * @returns {Boolean} - If some of the callback calls returned truthy value.
 */
function deepSome(object, callback, n, tree) {
  const end = n === 1;

  return iterate(object, (value, key, object) => {
    const newTree = [{ key, value }].concat(tree);

    if (
      end || isPrimitive(value)
        ? callback(value, key, object, newTree)
        : deepSome(value, callback, n - 1, newTree)
    ) {
      return true;
    }
  }) || false;
}

constructors[0].push({
  check: () => true,
  cls: Super
});

export { Super };
