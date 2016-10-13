'use strict';

/**
 * @module constants/constructors
 * @private
 * @description Exports constructors levels.
 */

/**
 * @const
 * @type {Array[]}
 */
var constructors = [[], [], []];

/**
 * @module helpers/toStringTag
 * @private
 * @description Exports toStringTag method.
 */

/**
 * @function toStringTag
 * @param {*} object - Object to get toStringTag of.
 * @returns {String} Cut string.
 * @description Cut "Type" string from "[object Type]" string that gotten from {}.toString,call(object).
 */
function toStringTag(object) {
  return {}.toString.call(object).replace(/^\[object |]$/g, '');
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var get$1 = function get$1(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get$1(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};



var set$1 = function set$1(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set$1(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

/**
 * @module helpers/checkTypes
 * @private
 * @mixin
 * @description Exports is<Type> methods.
 */

/**
 * @function isArray
 * @public
 * @param {*} value - Value to check if it is an array.
 * @returns {Boolean} If the argument is an array or not.
 * 
 * @example
 * isArray([]);                             // true
 * isArray(0);                              // true
 * isArray(document.querySelectorAll('*')); // false
 */
function isArray(value) {
  return toStringTag(value) === 'Array';
}

/**
 * @function isArrayLike
 * @public
 * @param {*} value - Value to check if it is array-like.
 * @returns {Boolean} If the argument is array-like or not.
 * @description Basically returns if the argument has non-negative integer "length" property and isn't a function.
 * 
 * @example
 * isArrayLike([]);                             // true
 * isArrayLike('');                             // true
 * isArrayLike(() => {});                       // false
 * isArrayLike(document.querySelectorAll('*')); // true
 */
function isArrayLike(value) {
  if (!value || isFunction(value)) {
    return false;
  }

  var length = value.length;

  return isInteger(length) && length >= 0;
}

/**
 * @function isBoolean
 * @public
 * @param {*} value - Value to check if it is a boolean.
 * @returns {Boolean} If the argument is a boolean or not.
 * 
 * @example
 * isBoolean(true);               // true
 * isBoolean(new Boolean(false)); // true
 * isBoolean(null);               // false
 */
function isBoolean(value) {
  return toStringTag(value) === 'Boolean';
}

/**
 * @function isDate
 * @public
 * @param {*} value - Value to check if it is a date.
 * @returns {Boolean} If the argument is a date or not.
 * 
 * @example
 * isDate(new Date());                 // true
 * isDate('1999-12-31T23:59:59.999Z'); // false
 */
function isDate(value) {
  return toStringTag(value) === 'Date';
}

/**
 * @function isDateLike
 * @public
 * @param {*} value - Value to check if it is date-like.
 * @returns {Boolean} If the argument is date-like or not.
 * @description Basically returns if new Date(argument) is not invalid date.
 * 
 * @example
 * isDateLike(new Date());                 // true
 * isDateLike('1999-12-31T23:59:59.999Z'); // true
 * isDateLike(0);                          // true
 */
function isDateLike(value) {
  value = new Date(value);

  return !isNaN(value.getTime());
}

/**
 * @function isElement
 * @public
 * @param {*} value - Value to check if it is an element.
 * @returns {Boolean} If the argument is element or not.
 *
 * @example
 * isElement(document.querySelector('html')); // true
 */
function isElement(value) {
  return (/Element$/.test(toStringTag(value))
  );
}

/**
 * @function isFinite
 * @public
 * @param {*} value - Value to check if it is finite.
 * @returns {Boolean} If the argument is finite or not.
 * 
 * @example
 * isFinite(0);        // true
 * isFinite('0');      // false
 * isFinite(Infinity); // false
 * isFinite(NaN);      // false
 */
function isFinite(value) {
  if (!isNumber(value)) {
    return false;
  }

  value = Number(value);

  return !isNaN(value) && value !== Infinity && value !== -Infinity;
}

/**
 * @function isFunction
 * @public
 * @param {*} value - Value to check if it is a function.
 * @returns {Boolean} If the argument is a function or not.
 * 
 * @example
 * isFunction(() => {});            // true
 * 
 * const func = () => {};
 * Object.setPrototypeOf(func, {});
 * isFunction(func);                // true
 */
function isFunction(value) {
  return toStringTag(value) === 'Function' || typeof value === 'function';
}

/**
 * @function isInteger
 * @public
 * @param {*} value - Value to check if it is an integer.
 * @returns {Boolean} If the argument is an integer or not.
 *
 * @example
 * isInteger(0);             // true
 * isInteger(0.1);           // false
 * isInteger(new Number(0)); // true
 * isInteger('0');           // false
 * isInteger(Infinity);      // false
 * isInteger(NaN);           // false
 */
function isInteger(value) {
  return isNumber(value) && value % 1 === 0;
}

/**
 * @function isIntegerLike
 * @public
 * @param {*} value - Value to check if it is integer-like.
 * @returns {Boolean} If the argument is integer-like or not.
 *
 * @example
 * isIntegerLike(0);             // true
 * isIntegerLike(new Number(0)); // true
 * isIntegerLike(0.1);           // false
 * isIntegerLike('0');           // true
 */
function isIntegerLike(value) {
  value = parseInt(Number(value));

  return !!(value || value === 0);
}

/**
 * @function isNaN
 * @public
 * @param {*} value - Value to check if it is NaN.
 * @returns {Boolean} If the argument is NaN or not.
 *
 * @example
 * isNaN(0);               // false
 * isNaN('NaN');           // false
 * isNaN(NaN);             // true
 * isNaN(new Number(NaN)); // true
 */
function isNaN(value) {
  if (!isNumber(value)) {
    return false;
  }

  value = Number(value);

  return value !== value;
}

/**
 * @function isNull
 * @public
 * @param {*} value - Value to check if it is null.
 * @returns {Boolean} If the argument is null or not.
 *
 * @example
 * isNull(null);      // true
 * isNull(undefined); // false
 */
function isNull(value) {
  return value === null;
}

/**
 * @function isNullOrUndefined
 * @public
 * @param {*} value - Value to check if it is null or undefined.
 * @returns {Boolean} If the argument is null or undefined or not.
 *
 * @example
 * isNullOrUndefined(null);      // true
 * isNullOrUndefined(undefined); // true
 * isNullOrUndefined(false);     // false
 */
function isNullOrUndefined(value) {
  return value === null || typeof value === 'undefined';
}

/**
 * @function isNumber
 * @public
 * @param {*} value - Value to check if it is a number.
 * @returns {Boolean} If the argument is a number or not.
 *
 * @example
 * isNumber(0);             // true
 * isNumber(new Number(0)); // true
 * isNumber(NaN);           // true
 * isNumber('0');           // false
 */
function isNumber(value) {
  return toStringTag(value) === 'Number';
}

/**
 * @function isNumberLike
 * @public
 * @param {*} value - Value to check if it is number-like.
 * @returns {Boolean} If the argument is number-like or not.
 *
 * @example
 * isNumberLike(0);          // true
 * isNumberLike('0');        // true
 * isNumberLike('Infinity'); // true
 * isNumberLike('NaN');      // true
 * isNumberLike(NaN);        // true
 */
function isNumberLike(value) {
  if (isNaN(value) || value === 'NaN') {
    return true;
  }

  value = Number(value);

  return !!(value || value === 0);
}

/**
 * @function isObject
 * @public
 * @param {*} value - Value to check if it is an object.
 * @returns {Boolean} If the argument is an object or not.
 *
 * @example
 * isObject({});   // true
 * isObject(1);    // false
 * isObject(null); // false
 */
function isObject(value) {
  return !!value && (toStringTag(value) === 'Object' || (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' || value instanceof Object);
}

/**
 * @function isPlainObject
 * @public
 * @param {*} value - Value to check if it is a plain object.
 * @returns {Boolean} If the argument is a plain object or not.
 *
 * @example
 * const obj = {};
 *
 * ifPlainObject(obj); // true
 *
 * Object.setPrototypeOf(object, null);
 *
 * ifPlainObject(obj); // true
 *
 * Object.setPrototypeOf(object, {});
 *
 * ifPlainObject(obj); // false
 */
function isPlainObject(value) {
  if (isPrimitive(value)) {
    return false;
  }

  var proto = Object.getPrototypeOf(value);

  if (isNull(proto)) {
    return true;
  }

  var constructor = proto.constructor;

  return isFunction(constructor) && constructor instanceof constructor && isNull(Object.getPrototypeOf(proto));
}

/**
 * @function isPrimitive
 * @public
 * @param {*} value - Value to check if it is primitive.
 * @returns {Boolean} If the argument is primitive or not.
 *
 * @example
 * isPrimitive(1);             // true
 * isPrimitive({});            // false
 * isPrimitive('');            // true
 * isPrimitive(new Number(0)); // false
 * isPrimitive(true);          // true
 * isPrimitive(Symbol('foo')); // true
 * isPrimitive(null);          // true
 * isPrimitive(undefined);     // true
 */
function isPrimitive(value) {
  return isNull(value) || /^(number|string|boolean|symbol|undefined)$/.test(typeof value === 'undefined' ? 'undefined' : _typeof(value));
}

/**
 * @function isRegExp
 * @public
 * @param {*} value - Value to check if it is a regular expression.
 * @returns {Boolean} If the argument is a regular expression or not.
 *
 * @example
 * isRegExp(/foo/);             // true
 * isRegExp('/foo/');           // false
 * isRegExp(new RegExp('foo')); // true
 */
function isRegExp(value) {
  return toStringTag(value) === 'RegExp';
}

/**
 * @function isString
 * @public
 * @param {*} value - Value to check if it is a string.
 * @returns {Boolean} If the argument is a string or not.
 *
 * @example
 * isString('0');             // true
 * isString(new String('0')); // true
 */
function isString(value) {
  return toStringTag(value) === 'String';
}

/**
 * @function isSymbol
 * @public
 * @param {*} value - Value to check if it is a symbol.
 * @returns {Boolean} If the argument is a symbol or not.
 *
 * @example
 * isSymbol(Symbol('1')); // true
 */
function isSymbol(value) {
  return toStringTag(value) === 'Symbol';
}

/**
 * @function isUndefined
 * @public
 * @param {*} value - Value to check if it is undefined.
 * @returns {Boolean} If the argument is undefined or not.
 *
 * @example
 * isUndefined(null);      // false
 * isUndefined(undefined); // true
 */
function isUndefined(value) {
  return typeof value === 'undefined';
}

/**
 * @module D
 * @private
 * @description Exports D function.
 */

/**
 * @function D
 * @public
 * @param {*} [value] - Any value.
 * @returns {DWrap} Wrap of the argument.
 * @description Function for creating a D-wrap of an object.
 *
 * @example
 * D({});            // Super
 * D(() => {});      // Func
 * D([]);            // Arr
 * D(1);             // Num
 * D('1');           // Str
 * D(new Date());    // Dat
 * D(document.body); // Elem
 */
function D$2(value) {
  for (var i = constructors.length - 1; i >= 0; i--) {
    var levelConstructors = constructors[i];

    for (var k = 0, len = levelConstructors.length; k < len; k++) {
      var _constructor = levelConstructors[k];

      if (value instanceof _constructor.cls) {
        return value;
      }

      if (_constructor.check(value)) {
        return new _constructor.cls(value);
      }
    }
  }
}

/**
 * @module helpers/iterate
 * @private
 * @description Exports iterate method.
 */

/**
 * @callback IterationCallback
 * @param {*} value - Iteration value.
 * @param {String|Number} key - Iteration key.
 * @param {*} object - Initial iterable object.
 */

/**
 * @function iterate
 * @param {(Object|Array|null|undefined)} object - Value to iterate over.
 * @param {IterationCallback} callback - Callback that is called on every iteration.
 * @returns {*} If callback returns not undefined then iterate returns this value.
 * @description Function for iterating over all types of values.
 */
function iterate(object, callback) {
  var array = isArrayLike(object);
  var iteratedKeys = {};

  var iterated = 0;

  for (var key in object) {
    if ({}.hasOwnProperty.call(iteratedKeys, key)) {
      continue;
    }

    iteratedKeys[key] = true;

    if ({}.hasOwnProperty.call(object, key)) {
      if (array && iterated++ >= object.length) {
        break;
      }

      var value = callback(object[key], array ? Number(key) : key, object);

      if (!isUndefined(value)) {
        return value;
      }
    }
  }
}

/**
 * @module helpers/assign
 * @private
 * @description Exports Object.assign-like method.
 */

/**
 * @const
 * @function assign
 * @param {Object} target - Object to assign rest of arguments to.
 * @param {...Object} objects - Objects that are assigned to the target.
 * @returns {Object} Target.
 */
function assign$1(target) {
  iterate(arguments, function (source, index) {
    if (index) {
      iterate(source, function (value, key) {
        target[key] = value;
      });
    }
  });

  return target;
}

/**
 * @module helpers/defineProperty
 * @private
 * @description Exports defineProperty and dynamicDefineProperties methods.
 */

/**
 * @callback propertyGeneratorCallback
 * @param {String} name - Name of the property.
 * @returns {*} Generated property.
 */

/**
 * @function dynamicDefineProperties
 * @param {Object} target - Object to define properties for.
 * @param {Array} properties - Object which keys are properties.
 * @param {propertyGeneratorCallback} propertyGenerator - Callback for every property.
 * @returns {void}
 * @description Function for dynamic creating properties based on name of the method.
 */


/**
 * @function defineProperties
 * @param {Object} target - Target to define properties for.
 * @param {Object} properties - Object with properties needed to be assign to the target.
 * @returns {void}
 * @description Function for defining properties of an object.
 */
function defineProperties(target, properties) {
  iterate(properties, function (method, name) {
    if (/^get /.test(name)) {
      Object.defineProperty(target, name.replace(/^get /, ''), {
        get: method,
        set: undefined,
        enumerable: false,
        configurable: true
      });

      return;
    }

    if (/^set /.test(name)) {
      Object.defineProperty(target, name.replace(/^set /, ''), {
        set: method,
        get: undefined,
        enumerable: false,
        configurable: true
      });

      return;
    }

    if (/^get\/set /.test(name)) {
      Object.defineProperty(target, name.replace(/^get\/set /, ''), {
        get: method.get,
        set: method.set,
        enumerable: false,
        configurable: true
      });

      return;
    }

    if (name !== 'Symbol.toStringTag') {
      Object.defineProperty(target, name, {
        value: method,
        writable: true,
        enumerable: false,
        configurable: true
      });
    }
  });
}

/* eslint no-nested-ternary: 0 */
/* eslint no-negated-condition: 0 */
var global$1 = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

/**
 * @module helpers/Symbol
 * @private
 * @description Exports Symbol class.
 */

var _Symbol = global$1.Symbol || {
  toStringTag: 'Symbol.toStringTag',
  iterator: Math.random().toString(36)
};

/**
 * @module helpers/toArray
 * @private
 * @description Exports toArray method.
 */

/**
 * @function toArray
 * @param {*} value - Any value.
 * @param {Boolean} [createNewArray = false] - If it is needed to create new array.
 * @returns {Array} Create array.
 * @description Function for creating an array of any value.
 */
function toArray$1(value, createNewArray) {
  if (isArray(value) && !createNewArray) {
    return value;
  }

  var array = [];

  if (isArrayLike(value) && !isString(value)) {
    iterate(value, function (value) {
      array.push(value);
    });
  } else {
    array.push(value);
  }

  return array;
}

/**
 * @module constants/validateCheckExpressions
 * @private
 * @description Exports different types of validate expressions for {@link module:helpers/validate}.
 */

/**
 * @callback checkValidityCallback
 * @private
 * @param {*} value - Value to check.
 */

/**
 * @typedef {Object} validateExpr
 * @private
 * @property {String} text - Text of the thrown error.
 * @property {Error} error - Type of the thrown error.
 * @property {checkValidityCallback} check - Callback for checking value.
 */

/**
 * @type {validateExpr[]}
 * @private
 * @description Object of different types of validation.
 */
var checkExpressions = {
  '>0': {
    check: function check(n) {
      return n > 0;
    },
    text: '$n argument must be positive!',
    error: RangeError
  },
  '>=0': {
    check: function check(n) {
      return n >= 0;
    },
    text: '$n argument must be non-negative!',
    error: RangeError
  },
  '<0': {
    check: function check(n) {
      return n < 0;
    },
    text: '$n argument must be negative!',
    error: RangeError
  },
  '<=0': {
    check: function check(n) {
      return n <= 0;
    },
    text: '$n argument must be non-positive!',
    error: RangeError
  },
  '!!': {
    check: isNullOrUndefined,
    text: '$n argument must be not null or undefined!',
    error: TypeError
  },
  array: {
    check: isArray,
    text: '$n argument must be an array!',
    error: TypeError
  },
  'array||!': {
    check: function check(a) {
      return isArray(a) || isNullOrUndefined(a);
    },
    text: '$n argument must be an array, or undefined, or null!',
    error: TypeError
  },
  arrayLike: {
    check: isArrayLike,
    text: '$n argument must be array-like!',
    error: TypeError
  },
  'arrayLike||!': {
    check: function check(a) {
      return isArrayLike(a) || isNullOrUndefined(a);
    },
    text: '$n argument must be array-like, or undefined, or null!',
    error: TypeError
  },
  date: {
    check: isDate,
    text: '$n argument must be a date!',
    error: TypeError
  },
  'date||!': {
    check: function check(d) {
      return isDate(d) || isNullOrUndefined(d);
    },
    text: '$n argument must be a date, or undefined, or null!',
    error: TypeError
  },
  dateLike: {
    check: isDateLike,
    text: '$n argument must be date-like!',
    error: TypeError
  },
  'dateLike||!': {
    check: function check(d) {
      return isDateLike(d) || isNullOrUndefined(d);
    },
    text: '$n argument must be date-like, or undefined, or null!',
    error: TypeError
  },
  function: {
    check: isFunction,
    text: '$n argument must be a function!',
    error: TypeError
  },
  'function||!': {
    check: function check(f) {
      return isFunction(f) || isNullOrUndefined(f);
    },
    text: '$n argument must be a function, or undefined, or null!',
    error: TypeError
  },
  int: {
    check: isInteger,
    text: '$n argument must be an integer!',
    error: TypeError
  },
  'int||!': {
    check: function check(i) {
      return isInteger(i) || isNullOrUndefined(i);
    },
    text: '$n argument must be an integer, or undefined, or null!',
    error: TypeError
  },
  intLike: {
    check: isIntegerLike,
    text: '$n argument must be integer-like!',
    error: TypeError
  },
  'intLike||!': {
    check: function check(i) {
      return isIntegerLike(i) || isNullOrUndefined(i);
    },
    text: '$n argument must be integer-like, or undefined, or null!',
    error: TypeError
  },
  number: {
    check: isNumber,
    text: '$n argument must be a number!',
    error: TypeError
  },
  'number||!': {
    check: function check(n) {
      return isNumber(n) || isNullOrUndefined(n);
    },
    text: '$n argument must be a number, or undefined, or null!',
    error: TypeError
  },
  numberLike: {
    check: isNumberLike,
    text: '$n argument must be number-like!',
    error: TypeError
  },
  'numberLike||!': {
    check: function check(n) {
      return isNumberLike(n) || isNullOrUndefined(n);
    },
    text: '$n argument must be number-like, or undefined, or null!',
    error: TypeError
  },
  object: {
    check: isObject,
    text: '$n argument must be an object!',
    error: TypeError
  },
  'object||!': {
    check: function check(o) {
      return isObject(o) || isNullOrUndefined(o);
    },
    text: '$n argument must be an object, or undefined, or null!',
    error: TypeError
  },
  regexp: {
    check: isRegExp,
    text: '$n argument must be a regular expression!',
    error: TypeError
  },
  'regexp||!': {
    check: function check(r) {
      return isRegExp(r) || isNullOrUndefined(r);
    },
    text: '$n argument must be a regular expression, or undefined, or null!',
    error: TypeError
  },
  string: {
    check: isString,
    text: '$n argument must be a string!',
    error: TypeError
  },
  'string||!': {
    check: function check(s) {
      return isString(s) || isNullOrUndefined(s);
    },
    text: '$n argument must be a string, or undefined, or null!',
    error: TypeError
  }
};

/**
 * @module helpers/validate
 * @private
 * @description Exports validate method.
 */

var numbers = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th'];

/**
 * @function validate
 * @private
 * @param {Object} args - Arguments of function.
 * @param {Object} options - Object with validate parameters.
 * @param {String} [name] - Name of the function what called validate.
 * @returns {void}
 * @description Function for checking arguments of other functions.
 */
function validate(args, options, name) {
  iterate(options, function (array, number) {
    if (!isArray(array)) {
      array = [array];
    }

    iterate(array, function (checker) {
      checker = checkExpressions[checker];

      if (!checker.check(args[number])) {
        throw new checker.error(checker.text.replace('$n', numbers[number]) + (name ? ' (at ' + name + ')' : ''));
      }
    });
  });
}

/**
 * @module Alphabet
 * @private
 * @mixin
 * @description Exports Alphabet class.
 */

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
var Alphabet = function () {
  function Alphabet() {
    var alphabet = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    classCallCheck(this, Alphabet);

    var a = {};

    for (var i = 0, length = alphabet.length; i < length; i++) {
      var char = alphabet[i];

      if (!check$1(char)) {
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


  createClass(Alphabet, [{
    key: 'add',
    value: function add() {
      for (var _len = arguments.length, chars = Array(_len), _key = 0; _key < _len; _key++) {
        chars[_key] = arguments[_key];
      }

      for (var i = 0, length = chars.length; i < length; i++) {
        var char = chars[i];

        if (!check$1(char)) {
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

  }, {
    key: 'contains',
    value: function contains(word) {
      validate([word], ['string'], 'Alphabet#contains');

      var alphabet = this.$$;

      for (var i = 0, length = word.length; i < length; i++) {
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

  }, {
    key: 'delete',
    value: function _delete() {
      for (var _len2 = arguments.length, chars = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        chars[_key2] = arguments[_key2];
      }

      for (var i = 0, length = chars.length; i < length; i++) {
        var char = chars[i];

        if (!check$1(char)) {
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

  }, {
    key: 'get',
    value: function get() {
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

  }, {
    key: 'token',
    value: function token(length) {
      validate([length], [['intLike', '>0']], 'Alphabet#token');

      var alphabet = Object.keys(this.$$);
      var len = alphabet.length;
      var token = '';

      for (var i = 0; i < length; i++) {
        token += alphabet[Math.floor(Math.random() * len)];
      }

      return token;
    }
  }]);
  return Alphabet;
}();

defineProperties(Alphabet.prototype, defineProperty({}, _Symbol.toStringTag, 'Alphabet'));

function check$1(char) {
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
function alphabet(string) {
  validate([string], ['string']);

  var ranges = string.split(/([\s\S]\-+[\s\S])?/g);
  var length = ranges.length;
  var alphabet = [];

  for (var i = 0; i < length; i++) {
    var range = ranges[i];

    if (!range || range === ' ') {
      continue;
    }

    if (/\-/.test(range) && !/[\s\S]\-+[\s\S]/.test(range)) {
      throw new Error('Wrong part of the string (' + range + ')! (in alphabet)');
    }

    if (/\-/.test(range)) {
      var start = range.charCodeAt(0);
      var end = range.charCodeAt(2);

      if (start > end) {
        throw new Error('Start of the range must be before its end! (in alphabet)');
      }

      for (var k = 0, len = end - start + 1; k < len; k++) {
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

/**
 * @module Switcher
 * @private
 * @mixin
 * @description Exports Switcher class.
 */

/**
 * @typedef {'boolean'|'equals'|'strictEquals'|'call'} SwitcherMode
 * @public
 * @description Enum type of switcher modes.
 */

/**
 * @callback SwitcherCallCallback
 * @public
 * @param {*} value - Switcher value.
 * @returns {Boolean|*} On what the callback returns depends if the case is a match (truthy for the match).
 */

/**
 * @callback SwitcherMatchCallback
 * @public
 * @param {...*} args - Arguments from the second argument that switcher was called with.
 * @param {*} value - Switcher value.
 * @param {*} matched - Switcher matched case.
 */

/**
 * @class Switcher
 * @public
 * @param {Object} [cases = {}] - Object of cases.
 * @param {SwitcherMode} [mode = 'equals'] - Switcher mode.
 * @param {*} [defaultValue] - Switcher default value.
 * @returns {Switcher} - Instance of Switcher.
 * @description Switcher class for creating functions working similar to switch (value) {} construction,
 * but with the value assignment. Switcher instance is a function that accepts a value argument and an optional
 * args argument. Args with additional switcher value and matched case
 * are passed into the function of the matched case (if it is a function).
 *
 * @example
 * const switcher = new Switcher();
 * const switcher = new Switcher({
 *   case1: 'value1',
 *   case2: 'value2'
 * });
 * const switcher = new Switcher('strictEquals');
 * const switcher = new Switcher({
 *   case1: 'value1',
 *   case2: 'value2'
 * }, 'strictEquals');
 * const switcher = new Switcher('strictEquals', 'defaultValue');
 * const switcher = new Switcher({
 *   case1: 'value1',
 *   case2: 'value2'
 * }, 'strictEquals', 'defaultValue');
 *
 * // See [switcher]{@link switcher} examples for more information.
 */

var Switcher = function (_Function) {
  inherits(Switcher, _Function);

  function Switcher() {
    var cases = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'equals';

    var _ret;

    var defaultValue = arguments[2];
    classCallCheck(this, Switcher);

    var _this = possibleConstructorReturn(this, (Switcher.__proto__ || Object.getPrototypeOf(Switcher)).call(this));

    if (isString(cases)) {
      if (!isUndefined(arguments[1])) {
        defaultValue = mode;
      }

      mode = cases;
      cases = {};
    }

    var eventualCases = [];

    iterate(cases, function (value, Case) {
      eventualCases.push({ case: Case, value: value });
    });

    function switcher(value) {
      var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var _switcher$$$ = switcher.$$;
      var mode = _switcher$$$.mode;
      var def = _switcher$$$.default;
      var cases = _switcher$$$.cases;


      var ret = iterate(cases, function (_ref) {
        var val = _ref.value;
        var Case = _ref.case;

        if (mode === 'boolean' && Case ||
        /* eslint eqeqeq: 0 */
        mode === 'equals' && Case == value || mode === 'strictEquals' && Case === value || mode === 'call' && Case(value)) {
          return { case: Case, value: val };
        }
      });

      if (isUndefined(ret)) {
        ret = { value: def };
      }

      if (!isFunction(ret.value)) {
        return ret.value;
      }

      args = toArray$1(args, true);
      args.push(value, ret.case);

      return ret.value.apply(null, args);
    }

    /**
     * @member Switcher#$$
     * @type {Object}
     * @protected
     * @property {Array} cases - Array of cases.
     * @property {SwitcherMode} mode - Switcher mode.
     * @property {*} default - Switcher default value.
     * @description Config parameters.
     */
    Object.defineProperty(switcher, '$$', {
      value: {
        cases: eventualCases,
        mode: mode,
        default: defaultValue
      }
    });
    Object.setPrototypeOf(switcher, Switcher.prototype);

    return _ret = switcher, possibleConstructorReturn(_this, _ret);
  }

  /**
   * @method Switcher#case
   * @public
   * @param {*|SwitcherCallCallback|Array.<*|SwitcherCallCallback>} cases - Case or an array of cases.
   * @param {*|SwitcherMatchCallback} value - Value that has to be assigned or a function
   * that is called with switcher value, if it's the case.
   * @returns {Switcher} Returns this.
   * @description Method for defining new cases.
   *
   * @example
   * const sw = new Switcher()
   *   .case(1, 'one')
   *   .case(2, 'two');
   *
   * sw(1); // 'one'
   * sw(2); // 'two'
   */


  createClass(Switcher, [{
    key: 'case',
    value: function _case(cases, value) {
      var _this2 = this;

      if (!isArray(cases)) {
        cases = [cases];
      }

      iterate(cases, function (Case) {
        _this2.$$.cases.push({ case: Case, value: value });
      });

      return this;
    }

    /**
     * @method Switcher#default
     * @public
     * @param {*} def - New default value.
     * @returns {Switcher} Returns this.
     * @description Method for redefining default switcher value.
     *
     * @example
     * const sw = new Switcher()
     *   .case(1, 'one')
     *   .default('three');
     *
     * sw(1); // 'one'
     * sw(2); // 'three'
     */

  }, {
    key: 'default',
    value: function _default(def) {
      this.$$.default = def;

      return this;
    }

    /**
     * @method Switcher#mode
     * @public
     * @param {SwitcherMode} mode - New switcher mode.
     * @returns {Switcher} Returns this.
     * @description Method for redefining switcher mode.
     *
     * @example
     * const sw = new Switcher()
     *   .mode('strictEquals')
     *   .case(1, 'number')
     *   .case('1', 'string');
     *
     * sw(1);   // 'number'
     * sw('1'); // 'string'
     */

  }, {
    key: 'mode',
    value: function mode(_mode) {
      this.$$.mode = _mode;

      return this;
    }
  }]);
  return Switcher;
}(Function);

defineProperties(Switcher.prototype, defineProperty({}, _Symbol.toStringTag, 'Switcher'));

/**
 * @function switcher
 * @public
 * @param {Object} [cases = {}] - Object of cases.
 * @param {SwitcherMode} [mode = 'equals'] - Switcher mode.
 * @param {*} [defaultValue] - Switcher default value.
 * @returns {Switcher} New instance of Switcher.
 * @description Simple wrap of [new Switcher(...)]{@link Switcher}.
 * 
 * @example
 * const sw = switcher({
 *   1: 'foo',
 *   2: 'bar'
 * });
 * sw(1); // 'foo'
 * sw(2); // 'bar'
 * sw(3); // undefined
 * 
 * @example
 * const sw = switcher()
 *   .case([1, 2], 'foo')
 *   .case(3, 'bar');
 *   
 * sw(1); // 'foo'
 * sw(2); // 'foo'
 * sw(3); // 'bar'
 * 
 * @example
 * const sw = switcher('call')
 *   .case(isArray, 'array')
 *   .case(isString, 'string')
 *   .case(isNumber, 'number')
 *   .default('rest');
 *   
 * sw([]);    // 'array'
 * sw('foo'); // 'string'
 * sw(123);   // 'number'
 * sw({});    // 'rest'
 * 
 * @example
 * const sw = switcher({
 *   1: (value) => {
 *     console.log(value + 1);
 *   },
 *   2: () => {
 *     console.log(value - 1);
 *   }
 * });
 * 
 * sw(1); // 2
 * sw(2); // 1
 * 
 * @example
 * const sw = switcher({
 *   first: (array) => array[0],
 *   last: (array) => array[array.length - 1]
 * }, 'equals', (array, index) => array[index]);
 * const array = [1, 2, 3, 4];
 * 
 * sw('first', [array]); // 1
 * sw('last', [array]);  // 4
 * sw(1, [array]);       // 2
 * sw(2, [array]);       // 3
 */
function switcher(cases, mode, defaultValue) {
  return new (Function.prototype.bind.apply(Switcher, [null].concat(Array.prototype.slice.call(arguments))))();
}

/**
 * @function when
 * @public
 * @param {Boolean|*} condition - Condition used for returning the proper value.
 * @param {*} value1 - Value if the condition is truthy.
 * @param {*} value2 - Value if the condition is falsey.
 * @returns {*} value1 or value2.
 * @description Synonym for
 * [ternary operator]{@link https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Operators/Conditional_Operator}.
 * 
 * @example
 * when(true, 'true', 'false'); // 'true'
 */
function when(condition, value1, value2) {
  return condition ? value1 : value2;
}

/**
 * @module Super
 * @private
 * @mixin
 * @description Exports Super class.
 */

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

var cloneSwitcher = switcher('call', function (object) {
  return object;
}).case(function (object) {
  return new Super(object) === object;
}, function (object) {
  return new (object.proto().$.constructor)(object);
}).case(isElement, function (object, deep) {
  return object.clone(deep);
}).case(isDate, function (object) {
  return new Date(object);
}).case(isRegExp, function (object) {
  return new RegExp(object.source, object.toString().match(/[gimuy]*$/)[0]);
}).case(isArray, function () {
  return [];
}).case(isPlainObject, function () {
  return {};
});

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

var Super = function () {
  function Super(object) {
    classCallCheck(this, Super);

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


  createClass(Super, [{
    key: 'assign',


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
    value: function assign() {
      for (var _len = arguments.length, objects = Array(_len), _key = 0; _key < _len; _key++) {
        objects[_key] = arguments[_key];
      }

      var object = this.$;

      iterate(object && arguments, function (o) {
        iterate(new Super(o).$, function (value, key) {
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

  }, {
    key: 'average',
    value: function average() {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

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

  }, {
    key: 'call',
    value: function call(func) {
      validate([func], ['function'], 'Super#call');

      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

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

  }, {
    key: 'clone',
    value: function clone() {
      var object = this.$;
      var clone = cloneSwitcher(object, [object, false]);

      if (clone !== object) {
        iterate(object, function (value, key) {
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

  }, {
    key: 'create',


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
    value: function create(descriptors) {
      return D$2(isPrimitive(this.$) ? undefined : Object.create(this.$, descriptors));
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

  }, {
    key: 'deepAssign',
    value: function deepAssign() {
      for (var _len3 = arguments.length, objects = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        objects[_key3] = arguments[_key3];
      }

      var object = this.$;

      if (isPrimitive(object)) {
        return this;
      }

      iterate(arguments, function (o) {
        _deepAssign(object, o);
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

  }, {
    key: 'deepClone',
    value: function deepClone() {
      return new this.constructor(_deepClone(this.$));
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

  }, {
    key: 'deepEquals',
    value: function deepEquals() {
      var object = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

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

  }, {
    key: 'deepEvery',
    value: function deepEvery(callback, n) {
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

      return _deepEvery(this.$, callback, n, [{ key: null, value: this.$ }]);
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

  }, {
    key: 'deepFilter',
    value: function deepFilter(callback, n) {
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

      var filtered = _deepFilter(this.$, callback, n, [{ key: null, value: this.$ }]);

      return D$2(isNullOrUndefined(filtered) ? filtered : filtered || {});
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

  }, {
    key: 'deepFind',
    value: function deepFind(callback, n) {
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

      return _deepFind(this.$, callback, n, [{ key: null, value: this.$ }]);
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

  }, {
    key: 'deepForEach',
    value: function deepForEach(callback) {
      var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Infinity;

      validate([callback, n], ['function', ['numberLike', '>0']], 'Super#deepForEach');

      n = Number(n);

      _deepForEach(this.$, callback, n, [{ key: null, value: this.$ }]);

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

  }, {
    key: 'deepFreeze',
    value: function deepFreeze() {
      _deepFreeze(this.$);

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

  }, {
    key: 'deepMap',
    value: function deepMap(callback) {
      var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Infinity;

      validate([callback, n], ['function', ['numberLike', '>0']], 'Super#deepMap');

      n = Number(n);

      return D$2(_deepMap(this.$, callback, n, [{ key: null, value: this.$ }]));
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

  }, {
    key: 'deepReduce',
    value: function deepReduce(callback) {
      var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Infinity;
      var IV = arguments[2];

      validate([callback, n], ['function', ['numberLike', '>0']], 'Super#deepReduce');

      n = Number(n);

      var object = this.$;
      var tree = [{ key: null, value: this.$ }];

      if (arguments.length < 3) {
        return _deepReduce(object, callback, n, false, undefined, tree).IV;
      }

      return _deepReduce(object, callback, n, false, { IV: IV }, tree).IV;
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

  }, {
    key: 'deepSome',
    value: function deepSome(callback, n) {
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

      return _deepSome(this.$, callback, n, [{ key: null, value: this.$ }]);
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

  }, {
    key: 'deepStrictEquals',
    value: function deepStrictEquals() {
      var object = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

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

  }, {
    key: 'define',
    value: function define(property, descriptor) {
      if (arguments.length >= 2) {
        property = defineProperty({}, property, descriptor);
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

  }, {
    key: 'delete',
    value: function _delete() {
      var object = this.$;

      for (var _len4 = arguments.length, props = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        props[_key4] = arguments[_key4];
      }

      iterate(object && props, function (property) {
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

  }, {
    key: 'equals',
    value: function equals(object) {
      var o = this.$;

      object = new Super(object).$;

      /* eslint eqeqeq: 0 */
      return o == object || isNaN(o) && isNaN(object);
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

  }, {
    key: 'every',
    value: function every() {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Boolean;

      validate([callback], ['function'], 'Super#every');

      return iterate(this.$, function (value, key, object) {
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

  }, {
    key: 'filter',
    value: function filter() {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Boolean;

      validate([callback], ['function'], 'Super#filter');

      var object = this.$;
      var array = isArrayLike(object);

      /* eslint no-nested-ternary: 0 */
      var o = array ? [] : isNullOrUndefined(object) ? object : {};

      iterate(object, function (value, key) {
        if (callback(value, key, object)) {
          if (array) {
            o.push(value);
          } else {
            o[key] = value;
          }
        }
      });

      return D$2(o);
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

  }, {
    key: 'find',
    value: function find(callback) {
      validate([callback], ['function'], 'Super#find');

      return iterate(this.$, function (value, key, object) {
        if (callback(value, key, object)) {
          return { key: key, value: value };
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

  }, {
    key: 'forEach',
    value: function forEach(callback) {
      validate([callback], ['function'], 'Super#forEach');

      iterate(this.$, function (value, key, object) {
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

  }, {
    key: 'freeze',
    value: function freeze() {
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

  }, {
    key: 'get',
    value: function get(property, getter) {
      if (arguments.length >= 2) {
        property = defineProperty({}, property, getter);
      }

      var object = this.$;

      iterate(isObject(object) && new Super(property).$, function (getter, property) {
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

  }, {
    key: 'has',
    value: function has(key) {
      var object = this.$;

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

  }, {
    key: 'hasOwn',
    value: function hasOwn(key) {
      var object = this.$;

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

  }, {
    key: 'instanceof',
    value: function _instanceof(constructor) {
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

  }, {
    key: 'isFrozen',
    value: function isFrozen() {
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

  }, {
    key: 'json',
    value: function json(replacer, space) {
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

  }, {
    key: 'keyOf',
    value: function keyOf(value) {
      var key = iterate(this.$, function (val, key) {
        if (val == value || isNaN(val) && isNaN(value)) {
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

  }, {
    key: 'keyOfStrict',
    value: function keyOfStrict(value) {
      var key = iterate(this.$, function (val, key) {
        if (val === value || isNaN(val) && isNaN(value)) {
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

  }, {
    key: 'keys',
    value: function keys() {
      var object = this.$;

      return D$2(isObject(object) ? Object.keys(object) : []);
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

  }, {
    key: 'map',
    value: function map(callback) {
      validate([callback], ['function'], 'Super#map');

      var object = this.$;
      var o = isArrayLike(object) ? [] : isNull(object) ? null : {};

      iterate(object, function (value, key) {
        o[key] = callback(value, key, object);
      });

      return D$2(o);
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

  }, {
    key: 'max',
    value: function max() {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      validate([callback], ['function||!'], 'Super#max');

      return this.object(function (max, value, key, object) {
        var val = Number(callback ? callback(value, key, object) : value);

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

  }, {
    key: 'min',
    value: function min() {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      validate([callback], ['function||!'], 'Super#min');

      return this.object(function (min, value, key, object) {
        var val = Number(callback ? callback(value, key, object) : value);

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

  }, {
    key: 'object',
    value: function object(callback) {
      var _object = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      validate([callback], ['function'], 'Super#object');

      iterate(this.$, function (value, key, obj) {
        callback(_object, value, key, obj);
      });

      return D$2(_object);
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

  }, {
    key: 'prop',
    value: function prop(property, value) {
      if (arguments.length <= 1 && isString(property)) {
        return this.$ ? this.$[property] : undefined;
      }

      if (arguments.length >= 2) {
        property = defineProperty({}, property, value);
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

  }, {
    key: 'propertyDescriptor',
    value: function propertyDescriptor(property) {
      var object = this.$;

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

  }, {
    key: 'propertyNames',
    value: function propertyNames() {
      var object = this.$;

      return D$2(isObject(object) ? Object.getOwnPropertyNames(object) : []);
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

  }, {
    key: 'propertySymbols',
    value: function propertySymbols() {
      var object = this.$;

      return D$2(isObject(object) ? Object.getOwnPropertySymbols(object) : []);
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

  }, {
    key: 'proto',
    value: function proto(_proto) {
      var object = this.$;
      var isContextObject = !isNullOrUndefined(object);

      if (arguments.length) {
        if (isContextObject && (isObject(_proto) || isNull(_proto))) {
          Object.setPrototypeOf(object, _proto);
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

  }, {
    key: 'reduce',
    value: function reduce(callback, IV) {
      validate([callback], ['function'], 'Super#reduce');

      var object = this.$;

      var startKey = void 0;

      if (arguments.length === 1) {
        iterate(object, function (value, key) {
          startKey = key;
          IV = value;

          return true;
        });
      }

      iterate(object, function (value, key) {
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

  }, {
    key: 'set',
    value: function set(property, setter) {
      if (arguments.length >= 2) {
        property = defineProperty({}, property, setter);
      }

      var object = this.$;

      iterate(isObject(object) && new Super(property).$, function (setter, property) {
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

  }, {
    key: 'some',
    value: function some() {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Boolean;

      validate([callback], ['function'], 'Super#some');

      return iterate(this.$, function (value, key, object) {
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

  }, {
    key: 'strictEquals',
    value: function strictEquals(object) {
      var o = this.$;

      object = new Super(object).$;

      return o === object || isNaN(o) && isNaN(object);
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

  }, {
    key: 'sum',
    value: function sum() {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      validate([callback], ['function||!'], 'Super#sum');

      return this.reduce(function (sum, value, key, object) {
        return sum + Number(callback ? callback(value, key, object) : value);
      }, 0);
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
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

  }, {
    key: 'value',


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
    value: function value(property, _value) {
      if (arguments.length >= 2) {
        property = defineProperty({}, property, _value);
      }

      var object = this.$;

      iterate(isObject(object) && new Super(property).$, function (value, property) {
        Object.defineProperty(object, property, { value: value });
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

  }, {
    key: 'values',
    value: function values() {
      var array = [];

      iterate(this.$, function (value) {
        array.push(value);
      });

      return D$2(array);
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

  }, {
    key: 'word',
    value: function word() {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      validate([callback], ['function||!'], 'Super#word');

      return this.reduce(function (word, value, key, object) {
        return word + String(callback ? callback(value, key, object) : value);
      }, '');
    }
  }, {
    key: 'count',
    get: function get() {
      var object = this.$;

      if (!isObject(object)) {
        return 0;
      }

      return isArrayLike(object) ? object.length : Object.keys(object).length;
    }
  }, {
    key: 'toStringTag',
    get: function get() {
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

  }, {
    key: 'type',
    get: function get() {
      return _typeof(this.$);
    }
  }], [{
    key: 'addStaticProperties',
    value: function addStaticProperties(property, value) {
      if (arguments.length >= 2) {
        property = defineProperty({}, property, value);
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

  }, {
    key: 'addInstanceProperties',
    value: function addInstanceProperties(property, value) {
      if (arguments.length >= 2) {
        property = defineProperty({}, property, value);
      }

      defineProperties(this.prototype, property);

      return this;
    }
  }]);
  return Super;
}();

defineProperties(Super.prototype, defineProperty({}, _Symbol.toStringTag, 'Super'));

/**
 * @function deepAssign
 * @private
 * @param {*} target - Object to assign properties to.
 * @param {*} object - Object to assign properties from.
 * @returns {void}
 */
function _deepAssign(target, object) {
  iterate(object, function (value, key) {
    if (isPrimitive(target[key]) || !{}.hasOwnProperty.call(target, key)) {
      target[key] = _deepClone(value);

      return;
    }

    if (!isPrimitive(target[key])) {
      _deepAssign(target[key], value);
    }
  });
}

/**
 * @function deepClone
 * @private
 * @param {*} object - Object to clone.
 * @description Does the deep cloning.
 */
function _deepClone(object) {
  var clone = cloneSwitcher(object, [object, true]);

  if (clone !== object) {
    iterate(object, function (value, key) {
      clone[key] = _deepClone(value);
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
    return o1.source === o2.source && o1.toString().match(/[gimuy]*$/)[0] === o2.toString().match(/[gimuy]*$/)[0] && o1.lastIndex === o2.lastIndex;
  }

  if (isRegExp(o1) || isRegExp(o2)) {
    return false;
  }

  if (!isPlainObject(o1) && !isArray(o1) || !isPlainObject(o2) && !isArray(o2)) {
    return false;
  }

  var p1 = Object.getPrototypeOf(o1);
  var p2 = Object.getPrototypeOf(o1);

  if (Object.keys(o1).length !== Object.keys(o2).length) {
    return false;
  }

  if (p1 && p2 && toStringTag(p1.constructor) !== toStringTag(p2.constructor)) {
    return false;
  }

  return iterate(o1, function (value, key) {
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
function _deepEvery(object, callback, n, tree) {
  var end = n === 1;

  return iterate(object, function (value, key, object) {
    var newTree = [{ key: key, value: value }].concat(tree);

    if (end || isPrimitive(value) ? !callback(value, key, object, newTree) : !_deepEvery(value, callback, n - 1, newTree)) {
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
function _deepFilter(object, callback, n, tree) {
  var array = isArrayLike(object);
  var nul = isNullOrUndefined(object);
  var o = array ? [] : nul ? object : {};
  var end = n === 1;

  iterate(object, function (value, key, object) {
    var newTree = [{ key: key, value: value }].concat(tree);

    if ((end || isPrimitive(value)) && callback(value, key, object, newTree)) {
      if (array) {
        o.push(value);
      } else {
        o[key] = value;
      }

      return;
    }

    if (!end) {
      var filtered = _deepFilter(value, callback, n - 1, newTree);

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
function _deepFind(object, callback, n, tree) {
  var end = n === 1;

  return iterate(object, function (value, key, object) {
    var newTree = [{ key: key, value: value }].concat(tree);

    if (end || isPrimitive(value)) {
      if (callback(value, key, object, newTree)) {
        return newTree;
      }

      return;
    }

    var result = _deepFind(value, callback, n - 1, newTree);

    if (result) {
      return result;
    }
  }) || null;
}

/**
 * @function deepFreeze
 * @private
 * @param {*} object - Object to freeze.
 * @returns {void}
 */
function _deepFreeze(object) {
  Object.freeze(object);
  iterate(object, _deepFreeze);
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
function _deepForEach(object, callback, n, tree) {
  var end = n === 1;

  iterate(object, function (value, key, object) {
    var newTree = [{ key: key, value: value }].concat(tree);

    if (end || isPrimitive(value)) {
      callback(value, key, object, newTree);
    } else {
      _deepForEach(value, callback, n - 1, newTree);
    }
  });
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
function _deepMap(object, callback, n, tree) {
  var o = isArrayLike(object) ? [] : isNullOrUndefined(object) ? object : {};
  var end = n === 1;

  iterate(object, function (value, key, object) {
    var newTree = [{ key: key, value: value }].concat(tree);

    o[key] = end || isPrimitive(value) ? callback(value, key, object, newTree) : _deepMap(value, callback, n - 1, newTree);
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
function _deepReduce(object, callback, n, start, IV, tree) {
  var end = n === 1;

  iterate(object, function (value, key, object) {
    if (!IV && (end || isPrimitive(value)) && !start) {
      IV = { IV: value };
      start = true;

      return;
    }

    var newTree = [{ key: key, value: value }].concat(tree);

    IV = end || isPrimitive(value) ? { IV: callback(IV.IV, value, key, object, newTree) } : _deepReduce(value, callback, n - 1, start, IV, newTree);
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
function _deepSome(object, callback, n, tree) {
  var end = n === 1;

  return iterate(object, function (value, key, object) {
    var newTree = [{ key: key, value: value }].concat(tree);

    if (end || isPrimitive(value) ? callback(value, key, object, newTree) : _deepSome(value, callback, n - 1, newTree)) {
      return true;
    }
  }) || false;
}

constructors[0].push({
  check: function check() {
    return true;
  },
  cls: Super
});

/**
 * @module Arr
 * @private
 * @mixin
 * @description Exports Arr class.
 */

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
var Arr = function (_Super) {
  inherits(Arr, _Super);

  function Arr() {
    var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    classCallCheck(this, Arr);
    return possibleConstructorReturn(this, (Arr.__proto__ || Object.getPrototypeOf(Arr)).call(this, toArray$1(array instanceof Arr ? array.$ : array)));

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


  createClass(Arr, [{
    key: 'concat',
    value: function concat() {
      for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
        values[_key] = arguments[_key];
      }

      var array = toArray$1(this.$, true);

      iterate(arguments, function (value) {
        value = new Super(value).$;

        if (isArrayLike(value) && !isString(value)) {
          iterate(value, function (value) {
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

  }, {
    key: 'indexOf',


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
    value: function indexOf(value) {
      var key = this.keyOf(value);

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

  }, {
    key: 'indexOfStrict',
    value: function indexOfStrict(value) {
      var key = this.keyOfStrict(value);

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

  }, {
    key: 'join',
    value: function join(separator) {
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

  }, {
    key: 'pop',


    /**
     * @method Arr#pop
     * @public
     * @returns {*} Returns deleted element.
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/pop
     * @description Synonym for
     * [Array#pop]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/pop}.
     */
    value: function pop() {
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

  }, {
    key: 'push',
    value: function push() {
      for (var _len2 = arguments.length, values = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        values[_key2] = arguments[_key2];
      }

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

  }, {
    key: 'reverse',
    value: function reverse() {
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

  }, {
    key: 'shift',
    value: function shift() {
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

  }, {
    key: 'shuffle',
    value: function shuffle() {
      var length = this.$.length;

      return this.forEach(function (value, index, array) {
        var randomIndex = index + Math.floor((length - index) * Math.random());

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

  }, {
    key: 'slice',
    value: function slice(begin, end) {
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

  }, {
    key: 'sort',
    value: function sort(compareFunction) {
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

  }, {
    key: 'sortAsc',
    value: function sortAsc() {
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

  }, {
    key: 'sortDesc',
    value: function sortDesc() {
      return this.sort(function (y, x) {
        return asc(x, y);
      });
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

  }, {
    key: 'splice',
    value: function splice(start, deleteCount) {
      for (var _len3 = arguments.length, items = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
        items[_key3 - 2] = arguments[_key3];
      }

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

  }, {
    key: 'string',
    value: function string() {
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

  }, {
    key: 'unshift',
    value: function unshift() {
      for (var _len4 = arguments.length, values = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        values[_key4] = arguments[_key4];
      }

      this.$.unshift.apply(this.$, arguments);

      return this;
    }
  }, {
    key: 'first',
    get: function get() {
      return this.$[0];
    }
  }, {
    key: 'last',
    get: function get() {
      var array = this.$;

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

  }, {
    key: 'length',
    get: function get() {
      return this.$.length;
    }
  }]);
  return Arr;
}(Super);

defineProperties(Arr.prototype, defineProperty({}, _Symbol.toStringTag, 'Arr'));

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
function array(number, callback) {
  validate([number, callback], [['intLike', '>=0'], 'function||!'], 'array');

  var array = [];

  for (var i = 0; i < number; i++) {
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
function iterate$1(number, callback) {
  validate([number, callback], [['intLike', '>=0'], 'function'], 'iterate');

  for (var i = 0; i < number; i++) {
    callback(i);
  }
}

/**
 * @module Promise
 * @private
 * @mixin
 * @description Exports Promise class.
 */

var secret = {};
var iterator = _Symbol.iterator;

var Promise$1 = function () {
  function Promise(executor) {
    classCallCheck(this, Promise);

    if (!isFunction(executor)) {
      throw new TypeError('Promise resolver ' + {}.toString.call(executor) + ' is not a function');
    }

    var hiddenStatus = void 0;
    var hiddenValue = void 0;

    var onFulfill = [];
    var onReject = [];
    var realPromise = this;
    var hiddenPromise = {
      handled: false,
      get status() {
        return hiddenStatus;
      },
      set status(value) {
        hiddenStatus = value;
        realPromise.status = value;
      },
      get value() {
        return hiddenValue;
      },
      set value(val) {
        hiddenValue = val;
        realPromise.value = val;
      }
    };

    hiddenPromise.status = 'pending';
    hiddenPromise.value = undefined;

    /**
     * @typedef {Object} hiddenPromise
     * @private
     * @property {Boolean|Object} handled - If the promise is handled or not.
     * @property {'pending'|'fulfilled'|'rejected'} status - Status of the promise.
     * @property {*} value - Value of the promise.
     */

    /**
     * @member {Function} hiddenPromise#handle
     * @private
     * @param {('reject'|'resolve')} event - Type of the event to handle.
     * @param {Function} handler - Handler itself.
     * @param {Function} resolve - Resolve function.
     * @param {Function} reject - Reject function.
     * @param {Object} secret - Secret.
     * @description Private method for handling promises.
     */

    /**
     * @member {hiddenPromise} Promise#$$
     * @protected
     */
    defineProperties(this.$$ = {}, {
      'get/set handled': {
        get: function get() {
          return hiddenPromise.handled;
        },
        set: function set(key) {
          if (key === secret) {
            hiddenPromise.handled = true;
          }
        }
      },
      handle: function handle(status, f, resolve, reject, key) {
        if (key === secret) {
          var proxy = isFunction(f) ? function (value) {
            try {
              resolve(f(value));
            } catch (err) {
              return reject(err);
            }
          } : null;

          if (status === 'resolve') {
            onFulfill.push(proxy || function (value) {
              return resolve(value);
            });
          } else if (status === 'reject') {
            onReject.push(proxy || function (err) {
              return reject(err);
            });
          }
        }
      },
      'get status': function getStatus() {
        return hiddenPromise.status;
      },
      'get value': function getValue() {
        return hiddenPromise.value;
      }
    });

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }

    function reject(err) {
      if (hiddenPromise.status === 'pending') {
        hiddenPromise.status = 'rejected';
        hiddenPromise.value = err;

        for (var i = 0, length = onReject.length; i < length; i++) {
          hiddenPromise.handled = true;

          onReject[i](err);
        }

        setTimeout(function () {
          if (!hiddenPromise.handled) {
            console.error('%s %o', 'Uncaught (in promise)', err);
          }
        }, 1);
      }
    }

    function resolve(value) {
      if (hiddenPromise.status === 'pending') {
        if (value && isFunction(value.then)) {
          return value.then(function (value) {
            resolve(value);
          }, function (err) {
            reject(err);
          });
        }

        hiddenPromise.status = 'fulfilled';
        hiddenPromise.value = value;

        for (var i = 0, length = onFulfill.length; i < length; i++) {
          hiddenPromise.handled = true;

          onFulfill[i](value);
        }
      }
    }
  }

  createClass(Promise, [{
    key: 'abort',
    value: function abort() {}
  }, {
    key: 'catch',
    value: function _catch(onRejected) {
      return this.then(null, onRejected);
    }
  }, {
    key: 'then',
    value: function then(onFulfilled, onRejected) {
      var promise = this.$$;

      if (promise.status === 'pending') {
        return new Promise(function (resolve, reject) {
          promise.handle('reject', onRejected, resolve, reject, secret);
          promise.handle('resolve', onFulfilled, resolve, reject, secret);
        });
      }

      promise.handled = secret;

      var value = promise.value;


      var method = void 0;
      var handler = void 0;

      if (promise.status === 'fulfilled') {
        method = 'resolve';
        handler = onFulfilled;
      } else {
        method = 'reject';
        handler = onRejected;
      }

      if (!isFunction(handler)) {
        return Promise[method](value);
      }

      try {
        return Promise.resolve(handler(value));
      } catch (err) {
        return Promise.reject(err);
      }
    }
  }], [{
    key: 'all',
    value: function all(iterable) {
      var array = [];

      var toResolve = 0;

      if (iterable[iterator]) {
        iterable = iterable[iterator]();

        return new Promise(function (resolve, reject) {
          var next = void 0;
          var i = 0;

          var _loop = function _loop() {
            var promise = Promise.resolve(next.value);

            toResolve++;

            (function (i) {
              promise.then(function (value) {
                toResolve--;
                array[i] = value;

                setTimeout(function () {
                  if (next.done && !toResolve) {
                    resolve(array);
                  }
                }, 1);
              }, reject);
            })(i++);
          };

          while (!(next = iterable.next()).done) {
            _loop();
          }

          if (!i) {
            return Promise.resolve([]);
          }
        });
      }

      var length = iterable.length;

      if (!length) {
        return Promise.resolve([]);
      }

      toResolve = length;

      return new Promise(function (resolve, reject) {
        var _loop2 = function _loop2(i) {
          var promise = Promise.resolve(iterable[i]);

          promise.then(function (value) {
            toResolve--;
            array[i] = value;

            if (!toResolve) {
              resolve(array);
            }
          }, reject);
        };

        for (var i = 0; i < length; i++) {
          _loop2(i);
        }
      });
    }
  }, {
    key: 'race',
    value: function race(iterable) {
      if (iterable[iterator]) {
        iterable = iterable[iterator]();

        return new Promise(function (resolve, reject) {
          var next = void 0;

          while (!(next = iterable.next()).done) {
            next.value.then(resolve, reject);
          }
        });
      }

      return new Promise(function (resolve, reject) {
        for (var i = 0, length = iterable.length; i < length; i++) {
          iterable[i].then(resolve, reject);
        }
      });
    }
  }, {
    key: 'reject',
    value: function reject(value) {
      return new Promise(function (resolve, reject) {
        reject(value);
      });
    }
  }, {
    key: 'resolve',
    value: function resolve(value) {
      if (value && isFunction(value.then)) {
        return value;
      }

      return new Promise(function (resolve) {
        resolve(value);
      });
    }
  }]);
  return Promise;
}();

defineProperties(Promise$1.prototype, defineProperty({}, _Symbol.toStringTag, 'Promise'));

/**
 * @module Func
 * @private
 * @mixin
 * @description Exports Func class.
 */

/**
 * @callback BeforeMiddleware
 * @param {Array} args - Previous arguments.
 * @param {Func} func - This function.
 * @returns {Array} - New arguments.
 */

/**
 * @callback AfterMiddleware
 * @param {*} returnValue - Previous return value.
 * @param {Func} func - This function.
 * @returns {*} - New return value.
 */

/**
 * @class Func
 * @extends Super
 * @public
 * @param {Function} [func = function () {}] - Function to wrap.
 * @returns {Func} Instance of Func.
 * @description A wrap of a function.
 *
 * @example
 * const func = new Func(Math.max);
 *
 * func(1, 4, -2, 5); // 5
 */
var Func = function (_Super) {
  inherits(Func, _Super);

  function Func() {
    var _ret;

    var func = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
    classCallCheck(this, Func);

    var _this = possibleConstructorReturn(this, (Func.__proto__ || Object.getPrototypeOf(Func)).call(this));

    function proxy() {
      var _this2 = this,
          _arguments = arguments;

      if (++proxy.$$.called < proxy.$$.canBeCalled) {
        var _ret2 = function () {
          var _proxy$$$ = proxy.$$;
          var before = _proxy$$$.before;
          var after = _proxy$$$.after;
          var sync = _proxy$$$.sync;
          var contextLocked = _proxy$$$.contextLocked;
          var _proxy$$$2 = proxy.$$;
          var context = _proxy$$$2.context;
          var args = _proxy$$$2.args;

          var ret = void 0;

          context = contextLocked ? context : context || _this2;
          args = args.concat(toArray$1(_arguments));

          if (sync) {
            iterate(before, function (middleware) {
              args = middleware.call(context, toArray$1(args), proxy);
            });

            ret = func.apply(context, toArray$1(args));

            iterate(after, function (middleware) {
              ret = middleware.call(context, ret, proxy);
            });

            return {
              v: ret
            };
          }

          var promise = Promise$1.resolve(args);

          iterate(before, function (middleware) {
            promise = promise.then(function (args) {
              return middleware.call(context, toArray$1(args), proxy);
            });
          });

          promise = promise.then(function (args) {
            return func.apply(context, toArray$1(args));
          });

          iterate(after, function (middleware) {
            promise = promise.then(function (ret) {
              return middleware.call(context, ret, proxy);
            });
          });

          return {
            v: promise
          };
        }();

        if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
      }
    }

    /**
     * @member {Object} Func#$$
     * @type {Object}
     * @protected
     * @property {Array} after - After middleware array.
     * @property {Array} args - Locked and bound arguments.
     * @property {Array} argsLocked - Locked arguments.
     * @property {Array} before - Before middleware array.
     * @property {Number} called - How many times the function was called.
     * @property {Number} canBeCalled - How many times the function can be actually called.
     * @property {*} context - Locked or bound context.
     * @property {Boolean} contextLocked - Is context locked or not.
     * @property {Boolean} sync - Is function synchronous or not.
     * @description Config parameters.
     */
    Object.defineProperty(proxy, '$$', {
      value: {
        after: [],
        args: [],
        argsLocked: [],
        before: [],
        called: 0,
        canBeCalled: Infinity,
        context: null,
        contextLocked: false,
        sync: true
      }
    });

    /**
     * @member {Function} Func#$
     * @type {Function}
     * @public
     * @description Original function.
     */
    Object.defineProperty(proxy, '$', { value: func });
    Object.setPrototypeOf(proxy, Func.prototype);

    return _ret = proxy, possibleConstructorReturn(_this, _ret);
  }

  /**
   * @method Func#after
   * @public
   * @param {AfterMiddleware} middleware - After middleware.
   * @param {Boolean|*} [afterAll = true] - Boolean parameter where to put middleware.
   * Truthy parameter stands for "to the end" and falsey for "to the beginning".
   * @returns {Func} Returns this.
   * @description Adds after middleware.
   *
   * @example
   * const func = new Func((a) => a + 1)
   *   .after((result) => result * result);
   *
   * func(4);  // 25
   * func(-4); // 9
   */


  createClass(Func, [{
    key: 'after',
    value: function after(middleware) {
      var afterAll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      validate([middleware], ['function'], 'Func#after');

      var after = this.$$.after;


      if (afterAll) {
        after.push(middleware);
      } else {
        after.unshift(middleware);
      }

      return this;
    }

    /**
     * @method Func#apply
     * @public
     * @param {*} [context] - Context to call with.
     * @param {(Array|Arguments)} [args] - Arguments to call with.
     * @returns {*} Return of function call.
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Function/apply
     * @description Synonym for
     * [Function#apply]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Function/apply}.
     */

  }, {
    key: 'apply',
    value: function apply(context, args) {
      return function () {}.apply.apply(this, arguments);
    }

    /**
     * @method Func#async
     * @public
     * @param {Boolean|*} [condition] - If the function should be synchronous or not.
     * @returns {Func} Returns this.
     * @description If the function should be synchronous or not.
     *
     * @example
     * const func = new Func((a) => a + 1).async();
     *
     * func(4).then((result) => {
     *   console.log(result); // 5
     * });
     */

  }, {
    key: 'async',
    value: function async() {
      var condition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      this.$$.sync = !condition;

      return this;
    }

    /**
     * @method Func#before
     * @public
     * @param {BeforeMiddleware} middleware - Before middleware.
     * @param {Boolean|*} [beforeAll = true] - Boolean parameter where to put middleware.
     * Truthy parameter stands for "to the beginning" and falsey for "to the end".
     * @returns {Func} Returns this.
     * @description Adds before middleware.
     *
     * @example
     * const func = new Func((a) => a + 1)
     *   .before(([arg]) => [arg * arg]);
     *
     * func(4); // 17
     * func(3); // 10
     */

  }, {
    key: 'before',
    value: function before(middleware) {
      var beforeAll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      validate([middleware], ['function'], 'Func#before');

      var before = this.$$.before;


      if (beforeAll) {
        before.unshift(middleware);
      } else {
        before.push(middleware);
      }

      return this;
    }

    /**
     * @method Func#bind
     * @public
     * @param {*} context - Context to bind.
     * @param {...(Array|Arguments|*)} args - Arguments to bind.
     * @returns {Func} Returns this.
     * @description Composition of {@link Func#bindContext} and {@link Func#bindArgs}.
     *
     * @example
     * const func = new Func(function (a, b) {
     *   return this.a + a + b;
     * }).bind({ a: 2 }, 1);
     *
     * func(1); // 4
     * func(3); // 6
     */

  }, {
    key: 'bind',
    value: function bind(context) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return this.bindContext(context).bindArgs(args);
    }

    /**
     * @method Func#bindArgs
     * @public
     * @param {(Array|Arguments)} args - Arguments to bind.
     * @returns {Func} Returns this.
     * @description Binds arguments in addition to already locked and bound ones.
     *
     * @example
     * const func = new Func((...args) => {
     *   let sum = 0;
     *
     *   for (let i = 0; i < args.length; i++) {
     *     sum += args[i];
     *   }
     *
     *   return sum;
     * });
     *
     * func(1, 2, 3); // 6
     *
     * func.bindArgs([4]);
     *
     * func(1, 2, 3); // 10
     *
     * func.bindArgs([5]);
     *
     * func(1, 2, 3); // 15
     */

  }, {
    key: 'bindArgs',
    value: function bindArgs(args) {
      var func = this.$$;

      func.args = func.args.concat(toArray$1(args));

      return this;
    }

    /**
     * @method Func#bindContext
     * @public
     * @param {*} context - Context to bind.
     * @returns {Func} Returns this.
     * @description Bind new context if it's not already locked.
     *
     * @example
     * const func = new Func(function () {
     *   return this.a;
     * }).bindContext({ a: 1 });
     *
     * func(); // 1
     *
     * func.bindContext({ a: 2 });
     *
     * func(); // 2
     */

  }, {
    key: 'bindContext',
    value: function bindContext(context) {
      var func = this.$$;

      if (!func.contextLocked) {
        func.context = context;
      }

      return this;
    }

    /**
     * @method Func#call
     * @public
     * @param {*} [context] - Context to call with.
     * @param {...*} [args] - Arguments to call with.
     * @returns {*} Return of function call.
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Function/call
     * @description Synonym for
     * [Function#call]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Function/call}.
     */

  }, {
    key: 'call',
    value: function call(context) {
      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      return function () {}.call.apply(this, arguments);
    }

    /**
     * @member {Number} Func#called
     * @public
     * @readonly
     * @description Returns how many times the function was called.
     *
     * @example
     * const func = new Func((a) => a + 1);
     *
     * func();
     * func();
     *
     * func.called // 2
     */

  }, {
    key: 'canBeCalled',


    /**
     * @method Func#canBeCalled
     * @public
     * @param {Number} times - Number of maximum times the function is called (middlewares are also taken for a count).
     * @returns {Func} Returns this.
     * @description Method for limiting call times of function.
     *
     * @example
     * const func = new Func((a) => a + 1)
     *   .canBeCalled(1);
     *
     * func(1); // 2
     * func(1); // undefined
     */
    value: function canBeCalled(times) {
      this.$$.canBeCalled = times;

      return this;
    }

    /**
     * @method Func#limitArgsTo
     * @public
     * @param {Number} number - Number of arguments to limit to.
     * @returns {Func} Returns this.
     * @description Built-in before middleware for limiting number of arguments
     * that is put to the end of before middlewares.
     *
     * @example
     * const func = new Func((a, b) => [a, b]);
     *
     * func(1, 2); // [1, 2]
     *
     * func.limitArgsTo(1);
     *
     * func(1, 2); // [1, undefined]
     */

  }, {
    key: 'limitArgsTo',
    value: function limitArgsTo(number) {
      return this.before(function (args) {
        return args.slice(0, number);
      }, false);
    }

    /**
     * @method Func#lock
     * @public
     * @param {*} context - Context to lock.
     * @param {(Array|Arguments|*)} args - Arguments to lock.
     * @returns {Func} Returns this.
     * @description Composition of {@link Func#lockContext} and {@link Func#lockArgs}.
     *
     * @example
     * const func = new Func(function (a, b) {
     *   return this.a + a + b;
     * }).lock({ a: 2 }, [1]);
     *
     * func(1); // 4
     * func(3); // 6
     */

  }, {
    key: 'lock',
    value: function lock(context, args) {
      return this.lockContext(context).lockArgs(args);
    }

    /**
     * @method Func#lockArgs
     * @public
     * @param {(Array|Arguments|*)} args - Arguments to lock.
     * @returns {Func} Returns this.
     * @description Erases bound arguments and adds new arguments to already locked ones.
     *
     * @example
     * const func = new Func((...args) => {
     *   let sum = 0;
     *
     *   for (let i = 0; i < args.length; i++) {
     *     sum += args[i];
     *   }
     *
     *   return sum;
     * });
     *
     * func(1, 2, 3); // 6
     *
     * func.lockArgs([4]);
     *
     * func(1, 2, 3); // 10
     *
     * func.bindArgs([6, 7]);
     * func.lockArgs([5]);
     *
     * func(1, 2, 3); // 15
     */

  }, {
    key: 'lockArgs',
    value: function lockArgs(args) {
      var func = this.$$;

      func.args = func.argsLocked = func.argsLocked.concat(toArray$1(args));

      return this;
    }

    /**
     * @method Func#lockContext
     * @public
     * @param {*} context - Context to lock.
     * @returns {Func} Returns this.
     * @description Locks context if it's not already locked.
     *
     * @example
     * const func = new Func(function () {
     *   return this.a;
     * }).lockContext({ a: 1 });
     *
     * func(); // 1
     *
     * func.lockContext({ a: 2 });
     *
     * func(); // 1
     */

  }, {
    key: 'lockContext',
    value: function lockContext(context) {
      var func = this.$$;

      if (!func.contextLocked) {
        func.context = context;
        func.contextLocked = true;
      }

      return this;
    }

    /**
     * @method Func#timing
     * @public
     * @param {String} mark - Argument that is passed to console.time() and console.timeEnd().
     * By default name of the original function, or if it's not present, 'anonymous' is used.
     * @returns {Func} Returns this.
     * @description Built-in before and after middlewares for noting calling time.
     * In case of asynchronous functions it notes time between calling function and resolving or rejecting the result.
     *
     * @example
     * const func = new Func((a) => a + 1)
     *   .timing('plus 1');
     *
     * func(2); // plus 1: 0.010ms
     *
     * const async = new Func(() => new Promise(() => {
     *     setTimeout(resolve, 1000);
     *   }))
     *   .async()
     *   .timing();
     *
     * async();
     * // After 1 second...
     * // anonymous: 1000.010ms
     */

  }, {
    key: 'timing',
    value: function timing(mark) {
      mark = arguments.length ? String(mark) : this.$.name || 'anonymous';

      this.before(function (args) {
        console.time(mark);

        return args;
      }, false);

      this.after(function (ret) {
        console.timeEnd(mark);

        return ret;
      }, false);

      return this;
    }
  }, {
    key: 'toString',
    value: function toString() {
      return function () {}.toString.call(this.$);
    }

    /**
     * @method Func#unbind
     * @public
     * @returns {Func} Returns this.
     * @description Composition of {@link Func#unbindContext} and {@link Func#unbindArgs}.
     *
     * @example
     * const func = new Func(function (a) {
     *   return this.foo + ' & ' +  a;
     * }).bind({ foo: 2 }, 1);
     *
     * func(); // '2 & 1'
     *
     * func.unbind();
     *
     * func(); // 'undefined & undefined'
     */

  }, {
    key: 'unbind',
    value: function unbind() {
      return this.unbindContext().unbindArgs();
    }

    /**
     * @method Func#unbindArgs
     * @public
     * @returns {Func} Returns this.
     * @description Erases all bound arguments.
     *
     * @example
     * const func = new Func((...args) => {
     *   let sum = 0;
     *
     *   for (let i = 0; i < args.length; i++) {
     *     sum += args[i];
     *   }
     *
     *   return sum;
     * }).bindArgs([4, 5]);
     *
     * func(1, 2, 3); // 15
     *
     * func.unbindArgs();
     *
     * func(1, 2, 3); // 6
     */

  }, {
    key: 'unbindArgs',
    value: function unbindArgs() {
      var func = this.$$;

      func.args = func.argsLocked;

      return this;
    }

    /**
     * @method Func#unbindContext
     * @public
     * @returns {Func} Returns this.
     * @description Erases context if it's not locked.
     *
     * @example
     * const func = new Func(function () {
     *   return this.foo;
     * }).bindContext({ foo: 1 });
     *
     * func(); // 1
     *
     * func.unbindArgs();
     *
     * func(); // undefined
     */

  }, {
    key: 'unbindContext',
    value: function unbindContext() {
      var func = this.$$;

      if (!func.contextLocked) {
        func.context = null;
      }

      return this;
    }
  }, {
    key: 'called',
    get: function get() {
      return this.$$.called;
    }
  }]);
  return Func;
}(Super);

defineProperties(Func.prototype, defineProperty({}, _Symbol.toStringTag, 'Func'));

constructors[1].push({
  check: isFunction,
  cls: Func
});

/**
 * @function method
 * @public
 * @param {String} method - Method to call.
 * @param {(Array|Arguments|*)} args - Arguments to call the method with.
 * @returns {Function} Function that calls stated method with given arguments.
 * @description Function that returns the function
 * that calls stated method of its first argument with given arguments.
 *
 * @example
 * [1.2345, 2.789, 3.14].map(method('toFixed', [2])); // ['1.23', '2.79', '3.14']
 */
function method(method) {
  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  return function (x) {
    return x[method].apply(x, toArray$1(args));
  };
}

/**
 * @function noop
 * @public
 * @returns {void}
 * @description Empty function.
 */
function noop() {}

/**
 * @function prop
 * @public
 * @param {String} prop - Property to return.
 * @returns {Function} Function that returns given property of its first argument.
 * @description Function that return the function that returns given property of its first argument.
 *
 * @example
 * ['foo', '12', '7890'].map(prop('length')); // [3, 2, 4]
 */
function prop$1(prop) {
  return function (_ref) {
    var value = _ref[prop];
    return value;
  };
}

/**
 * @function self
 * @public
 * @returns {*} First argument itself.
 * @description Function that returns the first argument.
 *
 * @example
 * [1, 2].map(self);                     // [1, 2]
 * [1, 3, NaN, 0, 7, null].filter(self); // [1, 3, 7]
 */
function self$1() {
  return arguments[0];
}

/**
 * @module Num
 * @private
 * @mixin
 * @description Exports Num class.
 */

var toRadian = Math.PI / 180;
var toDegree = 180 / Math.PI;
var ln2 = Math.LN2;
var ln10 = Math.LN10;

/**
 * @class Num
 * @extends Super
 * @public
 * @param {Number} [number = 0] - A number to wrap.
 * @returns {Num} Instance of Num.
 * @description Wrap of a number.
 *
 * @example
 * const num = new Num(1);
 */
var Num = function (_Super) {
  inherits(Num, _Super);

  function Num() {
    var number = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    classCallCheck(this, Num);
    return possibleConstructorReturn(this, (Num.__proto__ || Object.getPrototypeOf(Num)).call(this, number));

    /**
     * @member Num#$
     * @type {Number}
     * @public
     * @description Original number.
     */
  }

  /**
   * @member Num#abs
   * @type {Number}
   * @public
   * @readonly
   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/abs
   * @description Synonym for
   * [Math.abs]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/abs}.
   *
   * @example
   * new Num(1).abs;  // 1
   * new Num(-1).abs; // 1
   */


  createClass(Num, [{
    key: 'acos',


    /**
     * @method Num#acos
     * @public
     * @param {Boolean|*} [toDegrees = false] If it is truthy the return value is transformed into degrees.
     * @returns {Number} Arccosine of the number.
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/acos
     * @description Synonym for
     * [Math.acos]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/acos}.
     */
    value: function acos(toDegrees) {
      return (toDegrees ? toDegree : 1) * Math.acos(this.$);
    }

    /**
     * @member Num#acosh
     * @type {Number}
     * @public
     * @readonly
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/acosh
     * @description Synonym for
     * [Math.acosh]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/acosh}.
     */

  }, {
    key: 'asin',


    /**
     * @method Num#asin
     * @public
     * @param {Boolean|*} [toDegrees = false] If it is truthy the return value is transformed into degrees.
     * @returns {Number} Arcsine of the number.
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/asin
     * @description Synonym for
     * [Math.asin]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/asin}.
     */
    value: function asin(toDegrees) {
      return (toDegrees ? toDegree : 1) * Math.asin(this.$);
    }

    /**
     * @method Num#atan
     * @public
     * @param {Boolean|*} [toDegrees = false] If it is truthy the return value is transformed into degrees.
     * @returns {Number} Arcsine of the number.
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/atan
     * @description Synonym for
     * [Math.atan]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/atan}.
     */

  }, {
    key: 'atan',
    value: function atan(toDegrees) {
      return (toDegrees ? toDegree : 1) * Math.atan(this.$);
    }

    /**
     * @member Num#atanh
     * @type {Number}
     * @public
     * @readonly
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/atanh
     * @description Synonym for
     * [Math.atanh]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/atanh}.
     */

  }, {
    key: 'cos',


    /**
     * @method Num#cos
     * @public
     * @param {Boolean|*} [asDegrees = false] If it is truthy the number is treated as a degree value.
     * @returns {Number} Cosine of the number.
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/cos
     * @description Synonym for
     * [Math.cos]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/cos}.
     */
    value: function cos(asDegrees) {
      return Math.cos((asDegrees ? toRadian : 1) * this.$);
    }

    /**
     * @member Num#cosh
     * @type {Number}
     * @public
     * @readonly
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/cosh
     * @description Synonym for
     * [Math.cosh]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/cosh}.
     */

  }, {
    key: 'interval',


    /**
     * @method Num#interval
     * @public
     * @param {Function} func - Function that is called every <number> milliseconds.
     * @param {Array} [args] - Arguments passed to the function.
     * @returns {Function} Function that aborts the interval. The context of the function (if it's not already bound)
     * is the object with the abort method.
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/setInterval
     * @description Analogue of the
     * [setInterval]{@link https://developer.mozilla.org/en/docs/Web/API/WindowTimers/setInterval}.
     *
     * @example
     * const times = 0;
     * new Num(50).interval(function () {
     *   if (++times === 10) {
     *     this.abort();
     *   }
     * });
     */
    value: function interval(func) {
      var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      validate([func], ['function'], 'Num#interval');

      func = new Func(func).bindContext({ abort: abort });
      args = toArray$1(args);

      var number = this.$;

      var timeout = void 0;
      var aborted = void 0;

      setTimeout(function interval() {
        func.apply(null, args);

        if (!aborted) {
          timeout = setTimeout(interval, number);
        }
      }, 0);

      return abort;

      function abort() {
        aborted = true;

        return clearTimeout(timeout);
      }
    }

    /**
     * @member Num#ln
     * @type {Number}
     * @public
     * @readonly
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/log
     * @description Synonym for
     * [Math.log]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/log}.
     */

  }, {
    key: 'log',


    /**
     * @method Num#log
     * @public
     * @param {Number} number - Number to get logarithm of.
     * @returns {Number} Logarithm of the argument number to the number base.
     * @description Returns the logarithm of the argument number to the number base.
     *
     * @example
     * new Num(2).log(16);  // 4
     * new Num(3).log(243); // 5
     */
    value: function log(number) {
      return Math.log(number) / Math.log(this.$);
    }

    /**
     * @member Num#log2
     * @type {Number}
     * @public
     * @readonly
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/log2
     * @description Synonym for
     * [Math.log2]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/log2}.
     */

  }, {
    key: 'pow',


    /**
     * @method Num#pow
     * @public
     * @param {Number} power - Power the number should be raised to.
     * @returns {Number} The number to the <power> power.
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/pow
     * @description Synonym for
     * [Math.pow]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/pow}.
     *
     * @example
     * new Num(4).pow(.5); // 2
     * new Num(3).pow(2);  // 9
     */
    value: function pow(power) {
      return Math.pow(this.$, power);
    }

    /**
     * @method Num#root
     * @public
     * @param {Number} power - Power the number should be raised to.
     * @returns {Number} The <power> root of the number.
     * @description Synonym for number.pow(1 / power);
     *
     * @example
     * new Num(4).root(2);   // 0.5
     * new Num(243).root(5); // 3
     */

  }, {
    key: 'root',
    value: function root(power) {
      return Math.pow(this.$, 1 / power);
    }

    /**
     * @member Num#round
     * @type {Number}
     * @public
     * @readonly
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/round
     * @description Synonym for
     * [Math.round]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/round}.
     *
     * @example
     * new Num(1.1).floor;  // 1
     * new Num(-1.1).floor; // -1
     * new Num(1.5).floor;  // 2
     */

  }, {
    key: 'sin',


    /**
     * @method Num#sin
     * @public
     * @param {Boolean|*} [asDegrees = false] If it is truthy the number is treated as a degree value.
     * @returns {Number} Sine of the number.
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/sin
     * @description Synonym for
     * [Math.sin]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/sin}.
     */
    value: function sin(asDegrees) {
      return Math.sin((asDegrees ? toRadian : 1) * this.$);
    }

    /**
     * @member Num#sinh
     * @type {Number}
     * @public
     * @readonly
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/sinh
     * @description Synonym for
     * [Math.sinh]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/sinh}.
     */

  }, {
    key: 'tan',


    /**
     * @method Num#tan
     * @public
     * @param {Boolean|*} [asDegrees = false] If it is truthy the number is treated as a degree value.
     * @returns {Number} Tangent of the number.
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/tan
     * @description Synonym for
     * [Math.tan]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/tan}.
     */
    value: function tan(asDegrees) {
      return Math.tan((asDegrees ? toRadian : 1) * this.$);
    }

    /**
     * @member Num#tanh
     * @type {Number}
     * @public
     * @readonly
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/tanh
     * @description Synonym for
     * [Math.tanh]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/tanh}.
     */

  }, {
    key: 'timeout',


    /**
     * @method Num#timeout
     * @public
     * @param {*} [value] - Value to be resolved by the promise.
     * @returns {Promise} Promise that could be aborted.
     * @see https://developer.mozilla.org/en/docs/Web/API/WindowTimers/setTimeout
     * @description Promise-based analogue of
     * [setTimeout]{@link https://developer.mozilla.org/en/docs/Web/API/WindowTimers/setTimeout}.
     *
     * @example
     * new Num(50).timeout('resolved').then((value) => {
     *   console.log(value); // 'resolved'
     * });
     *
     * const promise = new Num(50).timeout();
     * promise.abort();
     */
    value: function timeout(value) {
      var _this2 = this;

      var timeout = void 0;
      var reject = void 0;

      var promise = new Promise$1(function (resolve, rej) {
        reject = rej;
        timeout = setTimeout(resolve, _this2.$, value);
      });

      promise.abort = function abort() {
        clearTimeout(timeout);

        reject(new Error('Timeout was aborted'));

        return this;
      };

      return promise;
    }

    /**
     * @method Num#toBase
     * @public
     * @param {Number} [base = 10] - Base that the number should inverted to.
     * @returns {String} A string representation of the number in <base> base.
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Number/toString
     * @description Synonym for
     * [Number#toString]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Number/toString}.
     *
     * @example
     * new Num(4).toBase(2); // 100
     * new Num(3).toBase();  // 3
     */

  }, {
    key: 'toBase',
    value: function toBase() {
      var base = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;

      return this.$.toString(base);
    }

    /**
     * @method Num#toExponential
     * @public
     * @param {Number} [fractionDigits] - See the link.
     * @returns {String} A string representation of the number in the exponential format.
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Number/toExponential
     * @description Synonym for
     * [Number#toExponential]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Number/toExponential}.
     */

  }, {
    key: 'toExponential',
    value: function toExponential(fractionDigits) {
      return this.$.toExponential(fractionDigits);
    }

    /**
     * @method Num#toFixed
     * @public
     * @param {Number} [digits = 0] - See the link.
     * @returns {String} Fixed-point formatted number.
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed
     * @description Synonym for
     * [Number#toFixed]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed}.
     */

  }, {
    key: 'toFixed',
    value: function toFixed(digits) {
      return this.$.toFixed(digits);
    }

    /**
     * @method Num#toPrecision
     * @public
     * @param {Number} [precision] - See the link.
     * @returns {String} A string representation of the number to the specified precision.
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Number/toPrecision
     * @description Synonym for
     * [Number#toPrecision]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Number/toPrecision}.
     */

  }, {
    key: 'toPrecision',
    value: function toPrecision(precision) {
      return this.$.toPrecision(precision);
    }
  }, {
    key: 'valueOf',
    value: function valueOf() {
      return Number(this.$);
    }
  }, {
    key: 'abs',
    get: function get() {
      return Math.abs(this.$);
    }
  }, {
    key: 'acosh',
    get: function get() {
      var number = this.$;

      return Math.log(number + Math.sqrt(number * number - 1));
    }

    /**
     * @member Num#asinh
     * @type {Number}
     * @public
     * @readonly
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/asinh
     * @description Synonym for
     * [Math.asinh]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/asinh}.
     */

  }, {
    key: 'asinh',
    get: function get() {
      var number = this.$;

      return Math.log(number + Math.sqrt(number * number + 1));
    }
  }, {
    key: 'atanh',
    get: function get() {
      var number = this.$;

      return Math.log((1 + number) / (1 - number)) / 2;
    }

    /**
     * @member Num#cbrt
     * @type {Number}
     * @public
     * @readonly
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/cbrt
     * @description Synonym for
     * [Math.cbrt]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/cbrt}.
     */

  }, {
    key: 'cbrt',
    get: function get() {
      var cbrt = Math.pow(Math.abs(this.$), 1 / 3);

      return this.$ > 0 ? cbrt : -cbrt;
    }

    /**
     * @member Num#ceil
     * @type {Number}
     * @public
     * @readonly
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil
     * @description Synonym for
     * [Math.ceil]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil}.
     *
     * @example
     * new Num(1.1).ceil;  // 2
     * new Num(-1.1).ceil; // -1
     */

  }, {
    key: 'ceil',
    get: function get() {
      return Math.ceil(this.$);
    }
  }, {
    key: 'cosh',
    get: function get() {
      var exp = this.exp;

      return (exp + 1 / exp) / 2;
    }

    /**
     * @member Num#cube
     * @type {Number}
     * @public
     * @readonly
     * @description Cube of the number.
     *
     * @example
     * new Num(2).cube;  // 8
     * new Num(-3).ceil; // -27
     */

  }, {
    key: 'cube',
    get: function get() {
      return this.$ * this.$ * this.$;
    }

    /**
     * @member Num#exp
     * @type {Number}
     * @public
     * @readonly
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/exp
     * @description Synonym for
     * [Math.exp]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/exp}.
     */

  }, {
    key: 'exp',
    get: function get() {
      return Math.exp(this.$);
    }

    /**
     * @member Num#floor
     * @type {Number}
     * @public
     * @readonly
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/floor
     * @description Synonym for
     * [Math.floor]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/floor}.
     *
     * @example
     * new Num(1.1).floor;  // 1
     * new Num(-1.1).floor; // -2
     */

  }, {
    key: 'floor',
    get: function get() {
      return Math.floor(this.$);
    }
  }, {
    key: 'ln',
    get: function get() {
      return Math.log(this.$);
    }
  }, {
    key: 'log2',
    get: function get() {
      return this.ln / ln2;
    }

    /**
     * @member Num#log10
     * @type {Number}
     * @public
     * @readonly
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/log10
     * @description Synonym for
     * [Math.log10]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/log10}.
     */

  }, {
    key: 'log10',
    get: function get() {
      return this.ln / ln10;
    }
  }, {
    key: 'round',
    get: function get() {
      return Math.round(this.$);
    }

    /**
     * @member Num#sign
     * @type {Number}
     * @public
     * @readonly
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/sign
     * @description Synonym for
     * [Math.sign]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/sign}.
     */

  }, {
    key: 'sign',
    get: function get() {
      var number = this.$;

      if (!number) {
        return number;
      }

      return number > 0 ? 1 : -1;
    }
  }, {
    key: 'sinh',
    get: function get() {
      var exp = this.exp;

      return (exp - 1 / exp) / 2;
    }

    /**
     * @member Num#sq
     * @type {Number}
     * @public
     * @readonly
     * @description The square of the number.
     *
     * @example
     * new Num(2).sq;  // 4
     * new Num(-3).sq; // 9
     */

  }, {
    key: 'sq',
    get: function get() {
      return this.$ * this.$;
    }

    /**
     * @member Num#sqrt
     * @type {Number}
     * @public
     * @readonly
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/sqrt
     * @description Synonym for
     * [Math.sqrt]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/sqrt}.
     */

  }, {
    key: 'sqrt',
    get: function get() {
      return Math.sqrt(this.$);
    }
  }, {
    key: 'tanh',
    get: function get() {
      var number = this.$;

      if (!isFinite(number)) {
        return this.sign;
      }

      var exp = Math.exp(2 * number);

      return (exp - 1) / (exp + 1);
    }
  }]);
  return Num;
}(Super);

defineProperties(Num.prototype, defineProperty({}, _Symbol.toStringTag, 'Num'));

constructors[1].push({
  check: isNumber,
  cls: Num
});

/**
 * @function rand
 * @public
 * @param {Number} [start = 0] - Start of the range.
 * @param {Number} [end = 1] - End of the range.
 * @returns {Number} Random number.
 * @description Returns a random number in the range specified by the arguments.
 *
 * @example
 * rand(1, 5); // 2.315
 * rand(1, 5); // 4.356763
 */
function rand() {
  var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  return start + (end - start) * Math.random();
}

/**
 * @function random
 * @public
 * @param {Integer} start - Start of the range.
 * @param {Integer} end - End of the range.
 * @returns {Number} Random integer.
 * @description Returns a random integer number in the range specified by the arguments.
 *
 * @example
 * random(1, 5); // 3
 * random(1, 5); // 1
 */
function random(start, end) {
  validate([start, end], ['intLike', 'intLike'], 'random');

  if (end <= start) {
    throw new Error('The second argument must be greater than the first!', 'random');
  }

  return Math.floor(rand(start, end + 1));
}

/**
 * @module constants/regexpSpecialCharacters
 * @private
 * @description Exports special characters for RegExp.
 */

/**
 * @const
 * @name module:constants/regexpSpecialCharacters~regexpSpecialCharacters
 * @type {String[]}
 */
var regexpSpecialCharacters = ['.', '+', '*', '?', '(', ')', '[', ']', '{', '}', '<', '>', '^', '$', '!', '=', ':', '-', '|', ',', '\\'];

/**
 * @module Str
 * @private
 * @mixin
 * @description Exports Str class.
 */

var htmlSpecials = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;'
};
var regexpSpecialsRegexp = new RegExp(new Super(regexpSpecialCharacters).word(function (x) {
  return '\\' + x + '|';
}).replace(/\|$/, ''), 'g');

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
var Str = function (_Super) {
  inherits(Str, _Super);

  function Str() {
    var string = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    classCallCheck(this, Str);
    return possibleConstructorReturn(this, (Str.__proto__ || Object.getPrototypeOf(Str)).call(this, string));

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


  createClass(Str, [{
    key: 'capitalizeFirst',
    value: function capitalizeFirst() {
      var string = this.$;

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

  }, {
    key: 'endsWith',
    value: function endsWith(searchString, position) {
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

  }, {
    key: 'escapeHTML',
    value: function escapeHTML() {
      var string = this.$;

      iterate(htmlSpecials, function (escaped, symbol) {
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

  }, {
    key: 'escapeRegExp',
    value: function escapeRegExp() {
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

  }, {
    key: 'in',
    value: function _in(object) {
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

  }, {
    key: 'indexOf',
    value: function indexOf(searchValue, fromIndex) {
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

  }, {
    key: 'lastIndexOf',
    value: function lastIndexOf(searchValue, fromIndex) {
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

  }, {
    key: 'match',


    /**
     * @method Str#match
     * @public
     * @returns {Arr|Super} D-Wrap of found match.
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/match
     * @description Synonym for
     * [String#match]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/match}.
     */
    value: function match(regexp) {
      return D$2(this.$.match.apply(this.$, arguments));
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

  }, {
    key: 'repeat',
    value: function repeat(times) {
      validate([times], [['intLike', '>=0']], 'Str#repeat');

      times = +times;

      var string = this.$;

      var s = '';

      for (var i = 0; i < times; i++) {
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

  }, {
    key: 'replace',
    value: function replace(regexp) {
      var replacer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

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

  }, {
    key: 'replaceString',
    value: function replaceString(string) {
      var replacer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

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

  }, {
    key: 'revert',
    value: function revert() {
      var string = this.$;
      var str = '';

      for (var i = string.length - 1; i >= 0; i--) {
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

  }, {
    key: 'search',
    value: function search(regexp) {
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

  }, {
    key: 'slice',
    value: function slice(beginSlice, endSlice) {
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

  }, {
    key: 'split',
    value: function split(separator) {
      return D$2(this.$.split.apply(this.$, arguments));
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

  }, {
    key: 'startsWith',
    value: function startsWith(searchString) {
      var position = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

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

  }, {
    key: 'substr',
    value: function substr(start, length) {
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

  }, {
    key: 'substring',
    value: function substring(indexStart, indexEnd) {
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

  }, {
    key: 'toCamelCase',
    value: function toCamelCase() {
      return new Str(trim(this.$).replace(/[\s\-_\.]+/g, '-').replace(/\-[^\-]/g, function (match) {
        return match[1].toUpperCase();
      }).replace(/^[\S]/, function (match) {
        return match.toLowerCase();
      }));
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

  }, {
    key: 'toCapitalCase',
    value: function toCapitalCase() {
      return new Str(trim(this.$).replace(/[\s\-_\.]+/g, ' ').replace(/[\S]/g, function (match) {
        return match.toLowerCase() === match ? match : ' ' + match;
      }).replace(/\s[\S]/g, function (match) {
        return match.toUpperCase();
      }).replace(/\s+/g, ' ').replace(/^\s/, '').replace(/^[\S]/, function (match) {
        return match.toUpperCase();
      }));
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

  }, {
    key: 'toDotCase',
    value: function toDotCase() {
      return new Str(trim(this.$).replace(/[\s\-_\.]+/g, '.').replace(/[^\.]/g, function (match) {
        return match.toLowerCase() === match ? match : '.' + match;
      }).replace(/\.+/g, '.').replace(/^\./, '').toLowerCase());
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

  }, {
    key: 'toHyphenCase',
    value: function toHyphenCase() {
      return new Str(trim(this.$).replace(/[\s\-_\.]+/g, '-').replace(/[^\-]/g, function (match) {
        return match.toLowerCase() === match ? match : '-' + match;
      }).replace(/\-+/g, '-').replace(/^\-/, '').toLowerCase());
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

  }, {
    key: 'toLowerCase',
    value: function toLowerCase() {
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

  }, {
    key: 'toSnakeCase',
    value: function toSnakeCase() {
      return new Str(trim(this.$).replace(/[\s\-_\.]+/g, '_').replace(/[^_]/g, function (match) {
        return match.toLowerCase() === match ? match : '_' + match;
      }).replace(/_+/g, '_').replace(/^_/, '').toLowerCase());
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

  }, {
    key: 'toSpaceCase',
    value: function toSpaceCase() {
      return new Str(trim(this.$).replace(/[\s\-_\.]+/g, ' ').replace(/[\S]/g, function (match) {
        return match.toLowerCase() === match ? match : ' ' + match;
      }).replace(/\s+/g, ' ').replace(/^\s/, '').toLowerCase());
    }
  }, {
    key: 'toString',
    value: function toString() {
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

  }, {
    key: 'toUpperCase',
    value: function toUpperCase() {
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

  }, {
    key: 'trim',
    value: function trim() {
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

  }, {
    key: 'trimLeft',
    value: function trimLeft() {
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

  }, {
    key: 'trimRight',
    value: function trimRight() {
      return new Str(this.$.replace(/[\s\ufeff\u00a0]+$/, ''));
    }
  }, {
    key: 'length',
    get: function get() {
      return this.$.length;
    }
  }]);
  return Str;
}(Super);

defineProperties(Str.prototype, defineProperty({}, _Symbol.toStringTag, 'Str'));

function trim(string) {
  return string.replace(/^[\s\-_\.]+|[\s\-_\.]+$/g, '');
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
function parseJSON() {
  var json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var callback = arguments[2];

  if (arguments.length <= 1) {
    return D$2(JSON.parse(json));
  }

  if (isFunction(options)) {
    callback = options;
    options = {};
  }

  var _options = options;
  var numbers = _options.numbers;
  var dates = _options.dates;

  var parsed = JSON.parse(json, function (key, value) {
    if (dates && /^\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d\.\d\d\dZ?$/.test(value)) {
      value = new Date(value);
    } else if (numbers && isNumberLike(value) && isString(value)) {
      value = Number(value);
    }

    return callback ? callback.apply(this, arguments) : value;
  });

  return D$2(parsed);
}

constructors[2].push({
  check: isString,
  cls: Str
});

/**
 * @module constants/formats
 * @private
 * @description Exports different types of formatting for {@link Date#format}.
 */

var zero = new Str('0');
var daysOfTheWeekNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var daysOfTheWeekAliases = new Super(daysOfTheWeekNames).map(function (value) {
  return value.slice(0, 3);
}).$;
var monthsNames = ['January', 'February', 'March', 'April', 'May', 'June', 'Jule', 'August', 'September', 'October', 'November', 'December'];
var monthsAliases = new Super(monthsNames).map(function (value) {
  return value.slice(0, 3);
}).$;

/**
 * @callback module:constants/formats~matchCallback
 * @param {Dat} date - D-wrap of a date to apply format to.
 * @param {String} string - Matched applied expression.
 */

/**
 * @typedef {Object} module:constants/formats~formatExpr
 * @property {String} format - Matched format.
 * @property {module:constants/formats~matchCallback} match - Callback if there was a match.
 */

/**
 * @type {module:constants/formats~formatExpr[]}
 * @description Array of different formats.
 */
var formats = [{
  format: 'ccc',
  match: function match(date, utc) {
    return round(date[utc]('c'), 3);
  }
}, {
  format: 'c',
  match: function match(date, utc) {
    return date[utc]('c');
  }
}, {
  format: 'ss',
  match: function match(date, utc) {
    return round(date[utc]('s'), 2);
  }
}, {
  format: 's',
  match: function match(date, utc) {
    return date[utc]('s');
  }
}, {
  format: 'mm',
  match: function match(date, utc) {
    return round(date[utc]('m'), 2);
  }
}, {
  format: 'm',
  match: function match(date, utc) {
    return date[utc]('m');
  }
}, {
  format: 'hh',
  match: function match(date, utc) {
    return round(date[utc]('h'), 2);
  }
}, {
  format: 'h',
  match: function match(date, utc) {
    return date[utc]('h');
  }
}, {
  format: 'dddd',
  match: function match(date, utc) {
    return daysOfTheWeekNames[date[utc]('dw')];
  }
}, {
  format: 'ddd',
  match: function match(date, utc) {
    return daysOfTheWeekAliases[date[utc]('dw')];
  }
}, {
  format: 'dd',
  match: function match(date, utc) {
    return round(date[utc]('d'), 2);
  }
}, {
  format: 'd',
  match: function match(date, utc) {
    return date[utc]('d');
  }
}, {
  format: 'MMMM',
  match: function match(date, utc) {
    return monthsNames[date[utc]('M') - 1];
  }
}, {
  format: 'MMM',
  match: function match(date, utc) {
    return monthsAliases[date[utc]('M') - 1];
  }
}, {
  format: 'MM',
  match: function match(date, utc) {
    return round(date[utc]('M'), 2);
  }
}, {
  format: 'M',
  match: function match(date, utc) {
    return date[utc]('M');
  }
}, {
  format: 'yyyy',
  match: function match(date, utc) {
    return round(date[utc]('y'), 4);
  }
}, {
  format: 'yy',
  match: function match(date, utc) {
    return String(date[utc]('y')).slice(-2);
  }
}, {
  format: 'y',
  match: function match(date, utc) {
    return date[utc]('y');
  }
}];

/**
 * @function round
 * @private
 * @param {Number} number - Number to round.
 * @param {Number} digits - Number of the digits of the output.
 * @returns {String} String with necessary additional starting zeroes.
 */
function round(number, digits) {
  var string = String(number);
  var zeroes = digits - string.length;

  zeroes = zeroes < 0 ? 0 : zeroes;

  return zero.repeat(zeroes).$ + string;
}

/**
 * @module Dat
 * @private
 * @mixin
 * @description Exports Dat class.
 */

/**
 * @typedef {*} DateLike
 * @public
 */

/**
 * @typedef {'c'|'s'|'m'|'h'|'d'|'w'|'M'|'y'} AddPeriod
 * @public
 */

/**
 * @typedef {'c'|'s'|'m'|'h'|'d'|'dw'|'M'|'y'} GetPeriod
 * @public
 */

/**
 * @typedef {'c'|'s'|'m'|'h'|'d'|'M'|'y'} OfOnePeriod
 * @public
 */

/**
 * @typedef {'c'|'s'|'m'|'h'|'d'|'M'|'y'} SetPeriod
 * @public
 */

/**
 * @typedef {'ccc'|'c'|'ss'|'s'|'mm'|'m'|'hh'|'h'|'dddd'|'ddd'|'dd'|'d'|'MMMM'|'MMM'|'MM'|'M'|'yyyy'|'yy'|'y'} Format
 * @public
 */

var coeffs = {
  c: 1,
  s: 1000,
  m: 60000,
  h: 3600000,
  d: 86400000,
  w: 604800000,
  M: 2592000000,
  y: 31536000000
};

var getSwitcher = switcher({
  c: function c(date, utc) {
    return date[utc + 'Milliseconds']();
  },
  s: function s(date, utc) {
    return date[utc + 'Seconds']();
  },
  m: function m(date, utc) {
    return date[utc + 'Minutes']();
  },
  h: function h(date, utc) {
    return date[utc + 'Hours']();
  },
  d: function d(date, utc) {
    return date[utc + 'Date']();
  },
  dw: function dw(date, utc) {
    return date[utc + 'Day']();
  },
  M: function M(date, utc) {
    return date[utc + 'Month']() + 1;
  },
  y: function y(date, utc) {
    return date[utc + 'FullYear']();
  }
}, 'equals', NaN);
var setSwitcher = switcher({
  c: function c(date, value, utc) {
    return date[utc + 'Milliseconds'](value);
  },
  s: function s(date, value, utc) {
    return date[utc + 'Seconds'](value);
  },
  m: function m(date, value, utc) {
    return date[utc + 'Minutes'](value);
  },
  h: function h(date, value, utc) {
    return date[utc + 'Hours'](value);
  },
  d: function d(date, value, utc) {
    return date[utc + 'Date'](value);
  },
  M: function M(date, value, utc) {
    return date[utc + 'Month'](value - 1);
  },
  y: function y(date, value, utc) {
    return date[utc + 'FullYear'](value);
  }
});

/**
 * @class Dat
 * @extends Super
 * @public
 * @param {Date} [date = new Date()] - A date to wrap.
 * @returns {Dat} Instance of Dat.
 * @description Wrap of a date.
 *
 * @example
 * const date = new Dat(new Date());
 */

var Dat = function (_Super) {
  inherits(Dat, _Super);

  function Dat() {
    var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
    classCallCheck(this, Dat);
    return possibleConstructorReturn(this, (Dat.__proto__ || Object.getPrototypeOf(Dat)).call(this, date));

    /**
     * @member Dat#$
     * @type {Date}
     * @public
     * @description Original date.
     */
  }

  /**
   * @method Dat#add
   * @public
   * @param {AddPeriod|Object.<AddPeriod, Number>} what - What to add.
   * @param {Number} [number] - Number of what to add if the first argument is a period string.
   * @returns {Dat} Returns this.
   * @description Method for adding amounts of time to the date. Returns new instance of Dat.
   *
   * @example
   * new Dat(new Date('1999-12-31T23:59:59.999Z')).add('c', 2).toISOString();         // '2000-01-01T00:00:00.001Z'
   * new Dat(new Date('1999-12-31T23:59:59.999Z')).add({ c: 2, d: 5 }).toISOString(); // '2000-01-06T00:00:00.001Z'
   */


  createClass(Dat, [{
    key: 'add',
    value: function add(what, number) {
      if (arguments.length >= 2) {
        what = defineProperty({}, what, number);
      }

      return this.time(this.time() + new Super(what).sum(function (value, what) {
        return coeffs[what] * value;
      }));
    }

    /**
     * @method Dat#expires
     * @public
     * @param {*} [value = this] - Value to resolve after the date expires.
     * @returns {Promise} New instance of Promise.
     * @description Method for defining when the date expires.
     *
     * @example
     * new Dat().add('c', 500).expires('Expired').then((value) => {
     *   // After 500 milliseconds
     *   console.log(value); // 'Expired'
     * });
     */

  }, {
    key: 'expires',
    value: function expires(value) {
      if (!arguments.length) {
        value = this;
      }

      return new Num(this.$ - now()).timeout(value);
    }

    /**
     * @method Dat#format
     * @public
     * @param {String} string - Template for the output.
     * @param {String} [prefix = ''] - If needed [all special strings]{@link Format}
     * are treated as they should be prefix with prefix.
     * @returns {String} Formatted string.
     * @description Method for creating formatted output based on a string.
     *
     * @example
     * new Dat('1999-12-31T23:59:59.999Z').format('Seconds: $ss, milliseconds: $ccc.', '$');
     * // 'Seconds: 59, milliseconds: 999.'
     */

  }, {
    key: 'format',
    value: function format(string) {
      var _this2 = this;

      var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      string = new Str(new Super(string).$);
      prefix = String(new Super(prefix).$);

      iterate(formats, function (format) {
        string = string.replaceString(prefix + format.format, format.match(_this2, 'get'));
      });

      return string.$;
    }

    /**
     * @method Dat#formatUTC
     * @public
     * @param {String} string - See {@link Dat#format}.
     * @param {String} [prefix = ''] - See {@link Dat#format}.
     * @returns {String} Formatted string.
     * @description UTC version of {@link Dat#format}.
     *
     * @example
     * new Dat('1999-07-07T03:09:09.099Z').formatUTC(
     *   `
     *     Milliseconds: $ccc|$c.
     *     Seconds:      $ss|$s.
     *     Minutes:      $mm|$m.
     *     Hours:        $hh|$h.
     *     Day:          $dddd|$ddd|$dd|$d.
     *     Month:        $MMMM|$MMM|$MM|$M.
     *     Year:         $yyyy|$yy|$y.
     *   `,
     *   '$'
     * );
     * // Milliseconds: 099|99.
     * // Seconds:      09|9.
     * // Minutes:      09|9.
     * // Hours:        03|3.
     * // Day:          Friday|Fri|07|7.
     * // Month:        July|Jul|07|7.
     * // Year:         1999|99|1999.
     */

  }, {
    key: 'formatUTC',
    value: function formatUTC(string) {
      var _this3 = this;

      var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      string = new Str(new Super(string).$);
      prefix = String(new Super(prefix).$);

      iterate(formats, function (format) {
        string = string.replaceString(prefix + format.format, format.match(_this3, 'getUTC'));
      });

      return string.$;
    }

    /**
     * @method Dat#get
     * @public
     * @param {GetPeriod} what - What to get.
     * @returns {Number} Number of what to get.
     * @description Method for getting values such as seconds or minutes.
     *
     * @example
     * new Dat(new Date('1999-12-31T23:59:59.999Z')).get('s'); // 59
     */

  }, {
    key: 'get',
    value: function get(what) {
      return getSwitcher(what, [this.$, 'get']);
    }

    /**
     * @method Dat#getUTC
     * @public
     * @param {GetPeriod} what - See {@link Dat#get}.
     * @returns {Number} Number of what to get.
     * @description UTC version of {@link Dat#get}.
     *
     * @example
     * const date = new Dat(new Date('1999-12-31T23:59:59.999Z'));
     *
     * date.getUTC('c');  // 999
     * date.getUTC('s');  // 59
     * date.getUTC('m');  // 59
     * date.getUTC('h');  // 23
     * date.getUTC('d');  // 31
     * date.getUTC('dw'); // 5
     * date.getUTC('M');  // 12
     * date.getUTC('y');  // 1999
     */

  }, {
    key: 'getUTC',
    value: function getUTC(what) {
      return getSwitcher(what, [this.$, 'getUTC']);
    }

    /**
     * @method Dat#isAfter
     * @public
     * @param {DateLike} date - Date to be compared to this date.
     * @returns {Boolean} If this date is after the argument one.
     * @description Finds out if this date is after the argument one.
     *
     * @example
     * new Dat(new Date(333)).isAfter(new Date(334)); // false
     * new Dat(new Date(333)).isAfter(new Date(332)); // true
     */

  }, {
    key: 'isAfter',
    value: function isAfter(date) {
      date = new Date(new Super(date).$);

      return date.getTime() < this.$.getTime();
    }

    /**
     * @method Dat#isBefore
     * @public
     * @param {DateLike} date - Date to be compared to this date.
     * @returns {Boolean} If this date is before the argument one.
     * @description Finds out if this date is before the argument one.
     *
     * @example
     * new Dat(new Date(333)).isBefore(new Date(334)); // true
     * new Dat(new Date(333)).isBefore(new Date(332)); // false
     */

  }, {
    key: 'isBefore',
    value: function isBefore(date) {
      date = new Date(new Super(date).$);

      return date.getTime() > this.$.getTime();
    }

    /**
     * @method Dat#isBetween
     * @public
     * @param {DateLike} date1 - Start of the range.
     * @param {DateLike} date2 - End of the range.
     * @returns {Boolean} If this date is after date1 and before date2.
     * @description Finds out if this date is after date1 and before date2.
     *
     * @example
     * new Dat(new Date(333)).isBetween(new Date(332), new Date(334)); // true
     * new Dat(new Date(333)).isBetween(new Date(334), new Date(332)); // false
     */

  }, {
    key: 'isBetween',
    value: function isBetween(date1, date2) {
      var time = this.$.getTime();

      date1 = new Date(new Super(date1).$);
      date2 = new Date(new Super(date2).$);

      return time > date1.getTime() && time < date2.getTime();
    }

    /**
     * @method Dat#isInvalid
     * @public
     * @returns {Boolean} If the date is invalid.
     * @description Returns if the date is invalid.
     *
     * @example
     * new Dat(new Date('a')).isInvalid(); // true
     * new Dat(new Date(1)).isInvalid();   // false
     */

  }, {
    key: 'isInvalid',
    value: function isInvalid() {
      return this.$.toString() === 'Invalid Date';
    }

    /**
     * @method Dat#isPassed
     * @public
     * @returns {Boolean} If the date is passed.
     * @description Returns if the date is passed.
     *
     * @example
     * new Dat(new Date(1)).isPassed(); // true
     */

  }, {
    key: 'isPassed',
    value: function isPassed() {
      return this.isBefore(now());
    }

    /**
     * @method Dat#ofOne
     * @public
     * @param {OfOnePeriod} what - Period to check.
     * @param {DateLike} date - Date to check.
     * @returns {Boolean} If two dates are of one second, minute or something else.
     * @description Returns if two dates are of one second, minute or something else.
     *
     * @example
     * new Dat(new Date('1999-12-31T23:59:59.000Z')).ofOne('s', new Date(1999-12-31T23:59:59.333Z')); // true
     * new Dat(new Date('1999-12-31T23:59:59.000Z')).ofOne('s', new Date(1999-12-31T23:59:58.999Z')); // false
     */

  }, {
    key: 'ofOne',
    value: function ofOne(what, date) {
      var _this4 = this;

      if (!(what in coeffs) || what === 'w') {
        return false;
      }

      date = new Dat(new Date(date));

      var started = void 0;

      return iterate(coeffs, function (coeff, w) {
        if (w === what) {
          started = true;
        }

        if (!started || w === 'w') {
          return;
        }

        if (started && _this4.get(w) !== date.get(w)) {
          return false;
        }
      }) !== false;
    }

    /**
     * @method Dat#set
     * @public
     * @param {SetPeriod|Object.<SetPeriod, Number>} what - What to add.
     * @param {Number} [number] - Number of what to set if the first argument is a period string.
     * @returns {Dat} Returns this.
     * @description Method for setting values such as seconds or minutes.
     *
     * @example
     * new Dat(new Date('1999-12-31T23:59:59.999Z')).set('s', 58).get('s');           // 58
     * new Dat(new Date('1999-12-31T23:59:59.999Z')).set({ c: 998, s: 58 }).get('c'); // 998
     */

  }, {
    key: 'set',
    value: function set(what, number) {
      var date = this.$;

      if (arguments.length >= 2) {
        what = defineProperty({}, what, number);
      }

      what = new Super(what).$;

      iterate(what, function (value, what) {
        setSwitcher(what, [date, value, 'set']);
      });

      return this;
    }

    /**
     * @method Dat#setUTC
     * @public
     * @param {SetPeriod|Object.<SetPeriod, Number>} what - See {@link Dat#set}.
     * @param {Number} [number] - See {@link Dat#set}.
     * @returns {Dat} Returns this.
     * @description UTC version of {@link Dat#set}.
     *
     * @example
     * const date = new Dat(new Date('1999-12-31T23:59:59.999Z'));
     *
     * date.setUTC('ccc', 998).getUTC('ccc'); // 998
     * date.setUTC({
     *   s: 58,
     *   m: 58,
     *   h: 22
     * });
     *
     * date.getUTC('s'); // 58
     * date.getUTC('m'); // 58
     * date.getUTC('h'); // 23
     */

  }, {
    key: 'setUTC',
    value: function setUTC(what, number) {
      var date = this.$;

      if (arguments.length >= 2) {
        what = defineProperty({}, what, number);
      }

      what = new Super(what).$;

      iterate(what, function (value, what) {
        setSwitcher(what, [date, value, 'setUTC']);
      });

      return this;
    }

    /**
     * @method Dat#setUTC
     * @public
     * @param {Number} [time] - Time to set.
     * @returns {Dat|Number} - If the time argument is present this is returned otherwise the time is returned.
     * @description Synonym for both
     * [Date#getTime]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime} and
     * [Date#setTime]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date/setTime}.
     */

  }, {
    key: 'time',
    value: function time(_time) {
      var date = this.$;

      if (arguments.length) {
        date.setTime(_time);
      }

      return date.getTime();
    }
  }, {
    key: 'toISOString',
    value: function toISOString() {
      return this.$.toISOString();
    }
  }, {
    key: 'toLocaleString',
    value: function toLocaleString() {
      return this.$.toLocaleString();
    }
  }, {
    key: 'toString',
    value: function toString() {
      return this.$.toString();
    }
  }, {
    key: 'valueOf',
    value: function valueOf() {
      return this.$.valueOf();
    }
  }]);
  return Dat;
}(Super);

defineProperties(Dat.prototype, defineProperty({}, _Symbol.toStringTag, 'Dat'));

constructors[1].push({
  check: isDate,
  cls: Dat
});

/**
 * @function now
 * @public
 * @returns {Number} Number of milliseconds.
 * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date/now
 * @description Synonym for
 * [Date.now]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date/now}.
 */
function now() {
  return Date.now();
}

/**
 * @function date
 * @public
 * @param {DateLike} [date = new Date()] - Date-like value that is passed to the Date constructor.
 * @returns {Dat} New instance of Dat.
 * @description Synonym for new Dat(new Date(date));
 */
function date(date) {
  if (!arguments.length) {
    return new Dat(new Date(now()));
  }

  date = new Super(date).$;

  return new Dat(new Date(date));
}



var statics = Object.freeze({
	D: D$2,
	isArray: isArray,
	isArrayLike: isArrayLike,
	isBoolean: isBoolean,
	isDate: isDate,
	isDateLike: isDateLike,
	isElement: isElement,
	isFinite: isFinite,
	isFunction: isFunction,
	isInteger: isInteger,
	isIntegerLike: isIntegerLike,
	isNaN: isNaN,
	isNull: isNull,
	isNullOrUndefined: isNullOrUndefined,
	isNumber: isNumber,
	isNumberLike: isNumberLike,
	isObject: isObject,
	isPlainObject: isPlainObject,
	isPrimitive: isPrimitive,
	isRegExp: isRegExp,
	isString: isString,
	isSymbol: isSymbol,
	isUndefined: isUndefined,
	Alphabet: Alphabet,
	alphabet: alphabet,
	Arr: Arr,
	array: array,
	iterate: iterate$1,
	Dat: Dat,
	now: now,
	date: date,
	Func: Func,
	method: method,
	noop: noop,
	prop: prop$1,
	self: self$1,
	Num: Num,
	rand: rand,
	random: random,
	Promise: Promise$1,
	Str: Str,
	parseJSON: parseJSON,
	Super: Super,
	Switcher: Switcher,
	switcher: switcher,
	when: when
});

var D$$1 = D$2;


assign$1(D$$1, statics);

delete D$$1.default;
delete D$$1.D;

module.exports = D$$1;
