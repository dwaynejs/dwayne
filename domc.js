/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	var _D = __webpack_require__(1);

	var _D2 = _interopRequireDefault(_D);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	global.D = _D2.default;
	global.top.D = _D2.default;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _lib = __webpack_require__(2);

	var statics = _interopRequireWildcard(_lib);

	var _assign = __webpack_require__(10);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	(0, _assign.assign)(statics.default, statics);

	delete statics.default.default;

	exports.default = statics.default;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _D = __webpack_require__(3);

	Object.keys(_D).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _D[key];
	    }
	  });
	});

	var _Alphabet = __webpack_require__(7);

	Object.keys(_Alphabet).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _Alphabet[key];
	    }
	  });
	});

	var _Arr = __webpack_require__(19);

	Object.keys(_Arr).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _Arr[key];
	    }
	  });
	});

	var _BlobObject = __webpack_require__(20);

	Object.keys(_BlobObject).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _BlobObject[key];
	    }
	  });
	});

	var _Dat = __webpack_require__(22);

	Object.keys(_Dat).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _Dat[key];
	    }
	  });
	});

	var _Elem = __webpack_require__(29);

	Object.keys(_Elem).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _Elem[key];
	    }
	  });
	});

	var _Fetch = __webpack_require__(33);

	Object.keys(_Fetch).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _Fetch[key];
	    }
	  });
	});

	var _Func = __webpack_require__(24);

	Object.keys(_Func).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _Func[key];
	    }
	  });
	});

	var _Num = __webpack_require__(23);

	Object.keys(_Num).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _Num[key];
	    }
	  });
	});

	var _Promise = __webpack_require__(21);

	Object.keys(_Promise).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _Promise[key];
	    }
	  });
	});

	var _Str = __webpack_require__(25);

	Object.keys(_Str).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _Str[key];
	    }
	  });
	});

	var _Super = __webpack_require__(8);

	Object.keys(_Super).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _Super[key];
	    }
	  });
	});

	var _Switcher = __webpack_require__(27);

	Object.keys(_Switcher).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _Switcher[key];
	    }
	  });
	});

	var _D2 = _interopRequireDefault(_D);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _D2.default;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _checkTypes = __webpack_require__(4);

	Object.keys(_checkTypes).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _checkTypes[key];
	    }
	  });
	});
	exports.D = D;

	var _constructors = __webpack_require__(6);

	var _constructors2 = _interopRequireDefault(_constructors);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
	/**
	 * @module D
	 * @private
	 * @description Exports D function.
	 */

	function D(value) {
	  for (var i = _constructors2.default.length - 1; i >= 0; i--) {
	    var levelConstructors = _constructors2.default[i];

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

	exports.default = D;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; /**
	                                                                                                                                                                                                                                                   * @module helpers/checkTypes
	                                                                                                                                                                                                                                                   * @private
	                                                                                                                                                                                                                                                   * @mixin
	                                                                                                                                                                                                                                                   * @description Exports is<Type> methods.
	                                                                                                                                                                                                                                                   */

	exports.isArray = isArray;
	exports.isArrayLike = isArrayLike;
	exports.isBoolean = isBoolean;
	exports.isDate = isDate;
	exports.isDateLike = isDateLike;
	exports.isElement = isElement;
	exports.isFinite = isFinite;
	exports.isFunction = isFunction;
	exports.isInteger = isInteger;
	exports.isIntegerLike = isIntegerLike;
	exports.isNaN = isNaN;
	exports.isNull = isNull;
	exports.isNullOrUndefined = isNullOrUndefined;
	exports.isNumber = isNumber;
	exports.isNumberLike = isNumberLike;
	exports.isObject = isObject;
	exports.isPrimitive = isPrimitive;
	exports.isRegExp = isRegExp;
	exports.isString = isString;
	exports.isUndefined = isUndefined;

	var _toStringTag = __webpack_require__(5);

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
	  return (0, _toStringTag.toStringTag)(value) === 'Array';
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
	  return (0, _toStringTag.toStringTag)(value) === 'Boolean';
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
	  return (0, _toStringTag.toStringTag)(value) === 'Date';
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
	  return (/Element$/.test((0, _toStringTag.toStringTag)(value))
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
	  return (0, _toStringTag.toStringTag)(value) === 'Function' || typeof value === 'function';
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
	  return (0, _toStringTag.toStringTag)(value) === 'Number';
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
	  return !!value && ((0, _toStringTag.toStringTag)(value) === 'Object' || (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' || value instanceof Object);
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
	  return (0, _toStringTag.toStringTag)(value) === 'RegExp';
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
	  return (0, _toStringTag.toStringTag)(value) === 'String';
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

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.toStringTag = toStringTag;
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

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * @module constants/constructors
	 * @private
	 * @description Exports constructors levels.
	 */

	/**
	 * @const
	 * @type {Array[]}
	 */
	exports.default = [[], [], []];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Alphabet = Alphabet;
	exports.alphabet = alphabet;

	var _Super = __webpack_require__(8);

	var _Super2 = _interopRequireDefault(_Super);

	var _helpers = __webpack_require__(9);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /**
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
	function Alphabet() {
	  var alphabet = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

	  (0, _helpers.checkClassInstance)(this, Alphabet, 'Alphabet');

	  var a = new _Super2.default(alphabet).object(function (a, char) {
	    if (!check(char)) {
	      throw new Error('Each element of an array must be a single char! (in Alphabet)');
	    }

	    a[char] = char;
	  }).$;

	  /**
	   * @member {Object} Alphabet#$$
	   * @public
	   * @description The alphabet.
	   */
	  Object.defineProperty(this, '$$', { value: a });
	}

	(0, _helpers.defineProperties)(Alphabet.prototype, _defineProperty({
	  /**
	   * @member {Function} Alphabet#add
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

	  add: function add() {
	    for (var i = 0, length = arguments.length; i < length; i++) {
	      var char = arguments[i];

	      if (!check(char)) {
	        throw new Error('Each argument must be a single char! (in Alphabet#add)');
	      }

	      this.$$[char] = char;
	    }

	    return this;
	  },


	  /**
	   * @member {Function} Alphabet#contains
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
	  contains: function contains(word) {
	    word = new _Super2.default(word).$;

	    (0, _helpers.validate)([word], ['string'], 'Alphabet#contains');

	    var alphabet = this.$$;

	    for (var i = 0, length = word.length; i < length; i++) {
	      if (!alphabet[word[i]]) {
	        return false;
	      }
	    }

	    return true;
	  },


	  /**
	   * @member {Function} Alphabet#delete
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
	  delete: function _delete() {
	    for (var i = 0, length = arguments.length; i < length; i++) {
	      var char = arguments[i];

	      if (!check(char)) {
	        throw new Error('Each argument must be a single char! (in Alphabet#delete)');
	      }

	      delete this.$$[char];
	    }

	    return this;
	  },


	  /**
	   * @member {Function} Alphabet#get
	   * @returns {Arr|Super} Wrap of an array of alphabet letters.
	   * @description Method for getting array of alphabet letters.
	   *
	   * @example
	   * new Alphabet(['a', 'b', 'c']).get().$; // ['a', 'b', 'c']
	   */
	  get: function get() {
	    return new _Super2.default(this.$$).keys();
	  },


	  /**
	   * @member {Function} Alphabet#token
	   * @public
	   * @param {Number} length - Token length.
	   * @returns {String} Token.
	   * @description Method for generating random token with given length.
	   *
	   * @example
	   * new Alphabet(['a', 'b', 'c']).token(4); // 'abcb'
	   */
	  token: function token(length) {
	    (0, _helpers.validate)([length], [['intLike', '>0']], 'Alphabet#token');

	    var alphabet = Object.keys(this.$$);
	    var len = alphabet.length;
	    var token = '';

	    for (var i = 0; i < length; i++) {
	      token += alphabet[Math.floor(Math.random() * len)];
	    }

	    return token;
	  }
	}, _helpers.Symbol.toStringTag, 'Alphabet'));

	function check(char) {
	  return (0, _helpers.isString)(char) && char.length === 1;
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
	  string = new _Super2.default(string).$;

	  (0, _helpers.validate)([string], ['string']);

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

	exports.default = Alphabet;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.Super = Super;

	var _D = __webpack_require__(3);

	var _D2 = _interopRequireDefault(_D);

	var _constructors = __webpack_require__(6);

	var _constructors2 = _interopRequireDefault(_constructors);

	var _helpers = __webpack_require__(9);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /**
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

	/**
	 * @class Super
	 * @public
	 * @param {*} [object] - An object to wrap.
	 * @returns {Super} Instance of Super.
	 * @description Wrap of any value. And there is no way to create a nested wrap.
	 *
	 * @example
	 * new Super({}); // Super
	 */
	function Super(object) {
	  (0, _helpers.checkClassInstance)(this, Super, 'Super');

	  if (object instanceof Super) {
	    return object;
	  }

	  /**
	   * @member {*} Super#$
	   * @public
	   * @description Wrapped object.
	   */
	  Object.defineProperty(this, '$', { value: object });
	}

	(0, _helpers.defineProperties)(Super.prototype, _defineProperty({
	  /**
	   * @member {Function} Super#assign
	   * @public
	   * @param {...*} objects - Object to be assigned to the object.
	   * @returns {DWrap} Returns this.
	   * @description Synonym for
	   * [Object.assign]
	   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign}.
	   *
	   * @example
	   * new Super({ a: 1, b: 2 }).assign({ a: 3 }, { c: 3, d: 4 }, { d: 5 }).$; // { a: 3, b: 2, c: 3, d: 5 }
	   */

	  assign: function assign() {
	    var object = this.$;

	    (0, _helpers.iterate)(object && arguments, function (o) {
	      (0, _helpers.iterate)(new Super(o).$, function (value, key) {
	        object[key] = value;
	      });
	    });

	    return this;
	  },


	  /**
	   * @member {Function} Super#average
	   * @public
	   * @param {IterationCallback} [callback = null] - Callback that is passed to {@link Super#sum}.
	   * @returns {Number} Average value.
	   * @description Synonym for object.sum(callback) / object.count.
	   *
	   * @example
	   * new Super({ a: 1, b: 2, c: 3 }).average();                         // 2
	   * new Super({ a: 1, b: 2, c: 5 }).average((value) => value * value); // 10
	   */
	  average: function average() {
	    var callback = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

	    (0, _helpers.validate)([callback], ['function||!'], 'Super#average');

	    return this.sum(callback) / this.count;
	  },


	  /**
	   * @member {Function} Super#call
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
	  call: function call(func) {
	    (0, _helpers.validate)([func], ['function'], 'Super#call');

	    return func.apply(this, [].slice.call(arguments, 1));
	  },


	  // TODO: #clone()

	  /**
	   * @member {Number} Super#count
	   * @public
	   * @readonly
	   * @returns {Number} Keys count.
	   * @description Returns number of own enumerable keys of the object.
	   *
	   * @example
	   * new Super({ a: 1, b: 2 }).count; // 2
	   */
	  'get count': function getCount() {
	    var object = this.$;

	    if (!(0, _helpers.isObject)(object)) {
	      return 0;
	    }

	    return (0, _helpers.isArrayLike)(object) ? object.length : Object.keys(object).length;
	  },


	  /**
	   * @member {Function} Super#create
	   * @public
	   * @param {Object} [descriptors] - Descriptors passed to Object.create.
	   * @returns {DWrap} New instance of D-Wrap.
	   * @description Synonym for
	   * [Object.create]
	   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/create}.
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
	  create: function create(descriptors) {
	    return (0, _D2.default)((0, _helpers.isPrimitive)(this.$) ? undefined : Object.create(this.$, descriptors));
	  },


	  // TODO: #deepAssign()

	  // TODO: #deepClone()

	  /**
	   * @member {Function} Super#deepEquals
	   * @public
	   * @param {*} [object] - Object to compare to.
	   * @returns {Boolean} - If the objects are deep equal or not.
	   * @description Method for deep comparison of two objects.
	   *
	   * @example
	   * new Super({ a: 1 }).deepEquals({ a: '1' }); // true
	   * new Super(/1/).deepEquals(/1/);             // true
	   */
	  deepEquals: function deepEquals() {
	    var object = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

	    return deepEqual(this.$, object, false);
	  },


	  /**
	   * @member {Function} Super#deepEvery
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
	  deepEvery: function deepEvery(callback, n) {
	    if (arguments.length === 1 && !(0, _helpers.isFunction)(callback)) {
	      n = callback;
	      callback = Boolean;
	    } else if (arguments.length === 1) {
	      n = Infinity;
	    } else if (!arguments.length) {
	      n = Infinity;
	      callback = Boolean;
	    }

	    (0, _helpers.validate)([callback, n], ['function', ['numberLike', '>0']], 'Super#deepEvery');

	    n = Number(n);

	    return _deepEvery(this.$, callback, n, [{ key: null, value: this.$ }]);
	  },


	  /**
	   * @member {Function} Super#deepFilter
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
	  deepFilter: function deepFilter(callback, n) {
	    if (arguments.length === 1 && !(0, _helpers.isFunction)(callback)) {
	      n = callback;
	      callback = Boolean;
	    } else if (arguments.length === 1) {
	      n = Infinity;
	    } else if (!arguments.length) {
	      n = Infinity;
	      callback = Boolean;
	    }

	    (0, _helpers.validate)([callback, n], ['function', ['numberLike', '>0']], 'Super#deepFilter');

	    var filtered = _deepFilter(this.$, callback, n, [{ key: null, value: this.$ }]);

	    return (0, _D2.default)((0, _helpers.isNullOrUndefined)(filtered) ? filtered : filtered || {});
	  },


	  /**
	   * @member {Function} Super#deepFind
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
	  deepFind: function deepFind(callback, n) {
	    if (arguments.length === 1 && !(0, _helpers.isFunction)(callback)) {
	      n = callback;
	      callback = Boolean;
	    } else if (arguments.length === 1) {
	      n = Infinity;
	    } else if (!arguments.length) {
	      n = Infinity;
	      callback = Boolean;
	    }

	    (0, _helpers.validate)([callback, n], ['function', ['numberLike', '>0']], 'Super#deepFind');

	    return _deepFind(this.$, callback, n, [{ key: null, value: this.$ }]);
	  },


	  /**
	   * @member {Function} Super#deepForEach
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
	  deepForEach: function deepForEach(callback) {
	    var n = arguments.length <= 1 || arguments[1] === undefined ? Infinity : arguments[1];

	    (0, _helpers.validate)([callback, n], ['function', ['numberLike', '>0']], 'Super#deepForEach');

	    n = Number(n);

	    _deepForEach(this.$, callback, n, [{ key: null, value: this.$ }]);

	    return this;
	  },


	  /**
	   * @member {Function} Super#deepFreeze
	   * @public
	   * @returns {DWrap} Returns this.
	   * @description Deep analogue of {@link Super#freeze}.
	   *
	   * @example
	   * new Super({ a: 1, b: { c: 2, d: 3 } }).deepFreeze(); // Super
	   */
	  deepFreeze: function deepFreeze() {
	    _deepFreeze(this.$);

	    return this;
	  },


	  /**
	   * @member {Function} Super#deepMap
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
	  deepMap: function deepMap(callback) {
	    var n = arguments.length <= 1 || arguments[1] === undefined ? Infinity : arguments[1];

	    (0, _helpers.validate)([callback, n], ['function', ['numberLike', '>0']], 'Super#deepMap');

	    n = Number(n);

	    return (0, _D2.default)(_deepMap(this.$, callback, n, [{ key: null, value: this.$ }]));
	  },


	  /**
	   * @member {Function} Super#deepReduce
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
	  deepReduce: function deepReduce(callback) {
	    var n = arguments.length <= 1 || arguments[1] === undefined ? Infinity : arguments[1];
	    var IV = arguments[2];

	    (0, _helpers.validate)([callback, n], ['function', ['numberLike', '>0']], 'Super#deepReduce');

	    n = Number(n);

	    var object = this.$;
	    var tree = [{ key: null, value: this.$ }];

	    if (arguments.length < 3) {
	      return _deepReduce(object, callback, n, false, undefined, tree).IV;
	    }

	    return _deepReduce(object, callback, n, false, { IV: IV }, tree).IV;
	  },


	  /**
	   * @member {Function} Super#deepSome
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
	  deepSome: function deepSome(callback, n) {
	    if (arguments.length === 1 && !(0, _helpers.isFunction)(callback)) {
	      n = callback;
	      callback = Boolean;
	    } else if (arguments.length === 1) {
	      n = Infinity;
	    } else if (!arguments.length) {
	      n = Infinity;
	      callback = Boolean;
	    }

	    (0, _helpers.validate)([callback, n], ['function', ['numberLike', '>0']], 'Super#deepSome');

	    n = Number(n);

	    return _deepSome(this.$, callback, n, [{ key: null, value: this.$ }]);
	  },


	  /**
	   * @member {Function} Super#deepStrictEquals
	   * @public
	   * @param {*} [object] - Object to compare to.
	   * @returns {Boolean} - If the objects are deep strict equal or not.
	   * @description Method for deep strict comparison of two objects.
	   *
	   * @example
	   * new Super({ a: 1 }).deepStrictEquals({ a: '1' }); // false
	   * new Super(/1/).deepStrictEquals(/1/);             // true
	   */
	  deepStrictEquals: function deepStrictEquals() {
	    var object = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

	    return deepEqual(this.$, object, true);
	  },


	  /**
	   * @member {Function} Super#define
	   * @param {String|Object} property - Either a string of a property or a descriptors object.
	   * @param {Object} [descriptor] - If a property parameter is a string this has to be a property descriptor.
	   * @returns {DWrap} Returns this.
	   * @description Synonym for both
	   * [Object.defineProperty]
	   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty} and
	   * [Object.defineProperties]
	   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties}.
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
	  define: function define(property, descriptor) {
	    if (arguments.length >= 2) {
	      property = _defineProperty({}, property, descriptor);
	    }

	    property = new Super(property).$;

	    if ((0, _helpers.isObject)(this.$)) {
	      Object.defineProperties(this.$, property);
	    }

	    return this;
	  },


	  /**
	   * @member {Function} Super#delete
	   * @public
	   * @param {...String} properties - List of properties to delete.
	   * @returns {Super} Returns this.
	   * @description Synonym for multiple
	   * [delete operator]
	   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/delete}.
	   *
	   * @example
	   * new Super({ a: 1, b: 2, c: 3 }).delete('c', 'a').$; // { b: 2 }
	   */
	  delete: function _delete() {
	    var object = this.$;

	    (0, _helpers.iterate)(object && arguments, function (property) {
	      delete object[property];
	    });

	    return this;
	  },


	  /**
	   * @member {Function} Super#equals
	   * @public
	   * @param {*} [object] - Object to compare.
	   * @returns {Boolean} If the objects are equal or not.
	   * @description Returns true if objects are equal using '==' operator and false if not. NaNs are considered to be equal.
	   *
	   * @example
	   * new Super(3).equals('3');   // true
	   * new Super(NaN).equals(NaN); // true
	   */
	  equals: function equals(object) {
	    var o = this.$;

	    object = new Super(object).$;

	    /* eslint eqeqeq: 0 */
	    return o == object || (0, _helpers.isNaN)(o) && (0, _helpers.isNaN)(object);
	  },


	  /**
	   * @member {Function} Super#every
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
	  every: function every() {
	    var callback = arguments.length <= 0 || arguments[0] === undefined ? Boolean : arguments[0];

	    (0, _helpers.validate)([callback], ['function'], 'Super#every');

	    return (0, _helpers.iterate)(this.$, function (value, key, object) {
	      if (!callback(value, key, object)) {
	        return false;
	      }
	    }) !== false;
	  },


	  /**
	   * @member {Function} Super#filter
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
	  filter: function filter() {
	    var callback = arguments.length <= 0 || arguments[0] === undefined ? Boolean : arguments[0];

	    (0, _helpers.validate)([callback], ['function'], 'Super#filter');

	    var object = this.$;
	    var array = (0, _helpers.isArrayLike)(object);

	    /* eslint no-nested-ternary: 0 */
	    var o = array ? [] : (0, _helpers.isNullOrUndefined)(object) ? object : {};

	    (0, _helpers.iterate)(object, function (value, key) {
	      if (callback(value, key, object)) {
	        if (array) {
	          o.push(value);
	        } else {
	          o[key] = value;
	        }
	      }
	    });

	    return (0, _D2.default)(o);
	  },


	  /**
	   * @member {Function} Super#find
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
	  find: function find(callback) {
	    (0, _helpers.validate)([callback], ['function'], 'Super#find');

	    return (0, _helpers.iterate)(this.$, function (value, key, object) {
	      if (callback(value, key, object)) {
	        return { key: key, value: value };
	      }
	    }) || null;
	  },


	  /**
	   * @member {Function} Super#forEach
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
	  forEach: function forEach(callback) {
	    (0, _helpers.validate)([callback], ['function'], 'Super#forEach');

	    (0, _helpers.iterate)(this.$, function (value, key, object) {
	      callback(value, key, object);
	    });

	    return this;
	  },


	  /**
	   * @member {Function} Super#freeze
	   * @public
	   * @returns {DWrap} Returns this.
	   * @description Synonym for
	   * [Object.freeze]
	   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze}.
	   *
	   * @example
	   * new Super({ a: 1, b: 2, c: 3 }).freeze(); // Super
	   */
	  freeze: function freeze() {
	    Object.freeze(this.$);

	    return this;
	  },


	  /**
	   * @member {Function} Super#get
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
	  get: function get(property, getter) {
	    if (arguments.length >= 2) {
	      property = _defineProperty({}, property, getter);
	    }

	    var object = this.$;

	    (0, _helpers.iterate)((0, _helpers.isObject)(object) && new Super(property).$, function (getter, property) {
	      Object.defineProperty(object, property, { get: getter });
	    });

	    return this;
	  },


	  /**
	   * @member {Function} Super#has
	   * @public
	   * @param {String|*} key - Property to check.
	   * @returns {Boolean} Returns true if the object has the key and false if not.
	   * @description Synonym for
	   * [in operator]
	   * {@link https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/in}.
	   *
	   * @example
	   * new Super({ a: 1, b: 2, c: 3 }).has('b'); // true
	   */
	  has: function has(key) {
	    var object = this.$;

	    if (!(0, _helpers.isObject)(object)) {
	      return false;
	    }

	    return key in object;
	  },


	  /**
	   * @member {Function} Super#hasOwn
	   * @public
	   * @param {String|*} key - Property to check.
	   * @returns {Boolean} Returns true if the object has its own key and false if not.
	   * @description Synonym for
	   * [Object#hasOwnProperty]
	   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty}.
	   *
	   * @example
	   * new Super({ a: 1, b: 2, c: 3 }).hasOwn('b');              // true
	   * new Super({ a: 1, b: 2, c: 3 }).hasOwn('hasOwnProperty'); // false
	   */
	  hasOwn: function hasOwn(key) {
	    var object = this.$;

	    if (!(0, _helpers.isObject)(object)) {
	      return false;
	    }

	    return object.hasOwnProperty(key);
	  },


	  /**
	   * @member {Function} Super#instanceof
	   * @public
	   * @param {Function} constructor - Constructor to check.
	   * @returns {Boolean} If the object is an instance of constructor.
	   * @description Synonym for
	   * [instanceof operator]
	   * {@link https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/instanceof}.
	   */
	  instanceof: function _instanceof(constructor) {
	    return this.$ instanceof constructor;
	  },


	  /**
	   * @member {Function} Super#isFrozen
	   * @public
	   * @returns {Boolean} If the object is frozen.
	   * @description Synonym for
	   * [Object.isFrozen]
	   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/isFrozen}.
	   *
	   * @example
	   * new Super({}).freeze().isFrozen(); // true
	   */
	  isFrozen: function isFrozen() {
	    return Object.isFrozen(this.$);
	  },


	  /**
	   * @member {Function} Super#json
	   * @public
	   * @param {JSONCallback|String[]} [replacer] - A replacer function or an array of properties.
	   * @param {String|Number} [space] - Space for the output.
	   * @returns {String} JSON string.
	   * @description Synonym for
	   * [JSON.stringify]
	   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify}.
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
	  json: function json(replacer) {
	    if (arguments.length === 1 && !(0, _helpers.isFunction)(replacer) && !(0, _helpers.isArray)(replacer)) {
	      [].unshift.call(arguments, null);
	    }

	    [].unshift.call(arguments, this.$);

	    return JSON.stringify.apply(JSON, arguments);
	  },


	  /**
	   * @member {Function} Super#keyOf
	   * @public
	   * @param {*} value - Value to find.
	   * @returns {String|Number|null} A key or an index if found and null if not.
	   * @description Method for finding equal to the argument value in the object. NaNs are considered to be equal.
	   *
	   * @example
	   * new Super({ a: 1, b: 2, c: 3 }).keyOf(2);   // 'b'
	   * new Super({ a: 1, b: 2, c: 3 }).keyOf('2'); // 'b'
	   */
	  keyOf: function keyOf(value) {
	    var key = (0, _helpers.iterate)(this.$, function (val, key) {
	      if (val == value || (0, _helpers.isNaN)(val) && (0, _helpers.isNaN)(value)) {
	        return key;
	      }
	    });

	    return (0, _helpers.isUndefined)(key) ? null : key;
	  },


	  /**
	   * @member {Function} Super#keyOfStrict
	   * @public
	   * @param {*} value - Value to find.
	   * @returns {String|Number|null} A key or an index if found and null if not.
	   * @description Method for finding strict equal to the argument value in the object. NaNs are considered to be equal.
	   *
	   * @example
	   * new Super({ a: 1, b: 2, c: 3 }).keyOfStrict(2);   // 'b'
	   * new Super({ a: 1, b: 2, c: 3 }).keyOfStrict('2'); // 'b'
	   */
	  keyOfStrict: function keyOfStrict(value) {
	    var key = (0, _helpers.iterate)(this.$, function (val, key) {
	      if (val === value || (0, _helpers.isNaN)(val) && (0, _helpers.isNaN)(value)) {
	        return key;
	      }
	    });

	    return (0, _helpers.isUndefined)(key) ? null : key;
	  },


	  /**
	   * @member {Function} Super#keys
	   * @public
	   * @returns {DWrap} A wrap of the keys array.
	   * @description Synonym for
	   * [Object.keys]
	   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/keys}.
	   *
	   * @example
	   * new Super({ a: 1, b: 2, c: 3 }).keys().$; // ['a', 'b', 'c']
	   * new Super(null).keys().$;                 // []
	   */
	  keys: function keys() {
	    var object = this.$;

	    return (0, _D2.default)((0, _helpers.isObject)(object) ? Object.keys(object) : []);
	  },


	  /**
	   * @member {Function} Super#map
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
	  map: function map(callback) {
	    (0, _helpers.validate)([callback], ['function'], 'Super#map');

	    var object = this.$;
	    var o = (0, _helpers.isArrayLike)(object) ? [] : (0, _helpers.isNull)(object) ? null : {};

	    (0, _helpers.iterate)(object, function (value, key) {
	      o[key] = callback(value, key, object);
	    });

	    return (0, _D2.default)(o);
	  },


	  /**
	   * @member {Function} Super#max
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
	  max: function max() {
	    var callback = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

	    (0, _helpers.validate)([callback], ['function||!'], 'Super#max');

	    return this.object(function (max, value, key, object) {
	      var val = Number(callback ? callback(value, key, object) : value);

	      if (val > max.value) {
	        max.key = key;
	        max.value = val;
	      }
	    }, { key: null, value: -Infinity }).$;
	  },


	  /**
	   * @member {Function} Super#min
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
	  min: function min() {
	    var callback = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

	    (0, _helpers.validate)([callback], ['function||!'], 'Super#min');

	    return this.object(function (min, value, key, object) {
	      var val = Number(callback ? callback(value, key, object) : value);

	      if (val < min.value) {
	        min.key = key;
	        min.value = val;
	      }
	    }, { key: null, value: Infinity }).$;
	  },


	  /**
	   * @member {Function} Super#object
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
	  object: function object(callback) {
	    var _object = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    (0, _helpers.validate)([callback], ['function'], 'Super#object');

	    (0, _helpers.iterate)(this.$, function (value, key, obj) {
	      callback(_object, value, key, obj);
	    });

	    return (0, _D2.default)(_object);
	  },


	  /**
	   * @member {Function} Super#prop
	   * @public
	   * @param {String|Object.<String, *>} property - Either a string of a property or an assigned object.
	   * @param {*} [value] - If a property parameter is a string
	   * this has to be an assigned value if it's present.
	   * @returns {DWrap|*} Returns this.
	   * @description Method for get and set properties.
	   *
	   * @example
	   * new Super({ a: 1, b: 2, c: 3 }).prop('a');              // 1
	   * new Super({ a: 1, b: 2, c: 3 }).prop('a', 7).$;         // { a: 7, b: 2, c: 3 }
	   * new Super({ a: 1, b: 2, c: 3 }).prop({ a: 7, b: 8 }).$; // { a: 7, b: 8, c: 3 }
	   */
	  prop: function prop(property, value) {
	    if (arguments.length <= 1 && (0, _helpers.isString)(property)) {
	      return this.$ ? this.$[property] : undefined;
	    }

	    if (arguments.length >= 2) {
	      property = _defineProperty({}, property, value);
	    }

	    return this.assign(property);
	  },


	  /**
	   * @member {Function} Super#propertyDescriptor
	   * @public
	   * @param {String} property - Property of the object.
	   * @returns {Object|undefined} Property descriptor.
	   * @descriptor Synonym for
	   * [Object.getOwnPropertyDescriptor]
	   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor}.
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
	  propertyDescriptor: function propertyDescriptor(property) {
	    var object = this.$;

	    return (0, _helpers.isObject)(object) ? Object.getOwnPropertyDescriptor(object, property) : undefined;
	  },


	  /**
	   * @member {Function} Super#propertyNames
	   * @public
	   * @returns {DWrap} D-Wrap of the names array.
	   * @descriptor Synonym for
	   * [Object.getOwnPropertyNames]
	   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames}.
	   *
	   * @example
	   * new Super({ a: 1, b: 2 }).define('c', { value: 3 }).$; // ['a', 'b', 'c']
	   */
	  propertyNames: function propertyNames() {
	    var object = this.$;

	    return (0, _D2.default)((0, _helpers.isObject)(object) ? Object.getOwnPropertyNames(object) : []);
	  },


	  /**
	   * @member {Function} Super#propertySymbols
	   * @public
	   * @returns {DWrap} D-Wrap of the names array.
	   * @descriptor Synonym for
	   * [Object.getOwnPropertySymbols]
	   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols}.
	   *
	   * @example
	   * new Super({ [Symbol('foo')]: 1 }).define(Symbol('bar'), { value: 2 }).$; // [Symbol('foo'), Symbol('bar')]
	   */
	  propertySymbols: function propertySymbols() {
	    var object = this.$;

	    return (0, _D2.default)((0, _helpers.isObject)(object) ? Object.getOwnPropertySymbols(object) : []);
	  },


	  /**
	   * @member {Function} Super#proto
	   * @public
	   * @param {*} [proto] - If it's present it's set as a prototype to the object.
	   * @returns {DWrap|*} In getter mode returns prototype and in setter mode returns this.
	   * @description Synonym for both
	   * [Object.getPrototypeOf]
	   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf} and
	   * [Object.setPrototypeOf]
	   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf}.
	   */
	  proto: function proto(_proto) {
	    var object = this.$;

	    if (arguments.length) {
	      if ((0, _helpers.isObject)(object)) {
	        Object.setPrototypeOf(object, _proto);
	      }

	      return this;
	    }

	    return (0, _helpers.isObject)(object) ? Object.getPrototypeOf(object) : undefined;
	  },


	  /**
	   * @member {Function} Super#reduce
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
	  reduce: function reduce(callback, IV) {
	    (0, _helpers.validate)([callback], ['function'], 'Super#reduce');

	    var object = this.$;

	    var startKey = void 0;

	    if (arguments.length === 1) {
	      (0, _helpers.iterate)(object, function (value, key) {
	        startKey = key;
	        IV = value;

	        return true;
	      });
	    }

	    (0, _helpers.iterate)(object, function (value, key) {
	      if (key !== startKey) {
	        IV = callback(IV, value, key, object);
	      }
	    });

	    return IV;
	  },


	  /**
	   * @member {Function} Super#set
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
	  set: function set(property, setter) {
	    if (arguments.length >= 2) {
	      property = _defineProperty({}, property, setter);
	    }

	    var object = this.$;

	    (0, _helpers.iterate)((0, _helpers.isObject)(object) && new Super(property).$, function (setter, property) {
	      Object.defineProperty(object, property, { set: setter });
	    });

	    return this;
	  },


	  /**
	   * @member {Function} Super#some
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
	  some: function some() {
	    var callback = arguments.length <= 0 || arguments[0] === undefined ? Boolean : arguments[0];

	    (0, _helpers.validate)([callback], ['function'], 'Super#some');

	    return (0, _helpers.iterate)(this.$, function (value, key, object) {
	      if (callback(value, key, object)) {
	        return true;
	      }
	    }) || false;
	  },


	  /**
	   * @member {Function} Super#strictEquals
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
	  strictEquals: function strictEquals(object) {
	    var o = this.$;

	    object = new Super(object).$;

	    return o === object || (0, _helpers.isNaN)(o) && (0, _helpers.isNaN)(object);
	  },


	  /**
	   * @member {Function} Super#sum
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
	  sum: function sum() {
	    var callback = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

	    (0, _helpers.validate)([callback], ['function||!'], 'Super#sum');

	    return this.reduce(function (sum, value, key, object) {
	      return sum + Number(callback ? callback(value, key, object) : value);
	    }, 0);
	  },
	  toJSON: function toJSON() {
	    return this.$;
	  },


	  /**
	   * @member {String} Super#toStringTag
	   * @public
	   * @readonly
	   * @returns {String} toStringTag of the object.
	   * @description Returns toString tag of the object.
	   *
	   * @example
	   * new Super({}).toStringTag; // 'Object'
	   * new Super([]).toStringTag; // 'Array'
	   * new Super(1).toStringTag;  // 'Number'
	   */
	  'get toStringTag': function getToStringTag() {
	    return (0, _helpers.toStringTag)(this.$);
	  },


	  /**
	   * @member {String} Super#type
	   * @public
	   * @readonly
	   * @returns {String} typeof the object.
	   * @description Returns typeof object.
	   *
	   * @example
	   * new Super({}).type;   // 'object'
	   * new Super(1).type;    // 'number'
	   * new Super('1').type;  // 'string'
	   * new Super(true).type; // 'boolean'
	   */
	  'get type': function getType() {
	    return _typeof(this.$);
	  },


	  /**
	   * @member {Function} Super#value
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
	      property = _defineProperty({}, property, _value);
	    }

	    var object = this.$;

	    (0, _helpers.iterate)((0, _helpers.isObject)(object) && new Super(property).$, function (value, property) {
	      Object.defineProperty(object, property, { value: value });
	    });

	    return this;
	  },


	  /**
	   * @member {Function} Super#values
	   * @public
	   * @returns {DWrap} A wrap of the values array.
	   * @description Returns D-Wrap of the values array.
	   *
	   * @example
	   * new Super({ a: 1, b: 2, c: 3 }).values().$; // [1, 2, 3]
	   * new Super(null).values().$;                 // []
	   */
	  values: function values() {
	    var array = [];

	    (0, _helpers.iterate)(this.$, function (value) {
	      array.push(value);
	    });

	    return (0, _D2.default)(array);
	  },


	  /**
	   * @member {Function} Super#word
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
	  word: function word() {
	    var callback = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

	    (0, _helpers.validate)([callback], ['function||!'], 'Super#word');

	    return this.reduce(function (word, value, key, object) {
	      return word + String(callback ? callback(value, key, object) : value);
	    }, '');
	  }
	}, _helpers.Symbol.toStringTag, 'Super'));

	/**
	 * @function deepEqual
	 * @private
	 * @param {*} o1 - First object to compare.
	 * @param {*} o2 - Second object to compare.
	 * @param {Boolean} strict - If comparison should be strict or not.
	 * @returns {Boolean} - If the object are deep equal or not.
	 */
	function deepEqual(o1, o2, strict) {
	  o1 = new Super(o1).$;
	  o2 = new Super(o2).$;

	  if (o1 === o2) {
	    return true;
	  }

	  if ((0, _helpers.isNaN)(o1) && (0, _helpers.isNaN)(o2) && (0, _helpers.isPrimitive)(o1) && (0, _helpers.isPrimitive)(o2)) {
	    return true;
	  }

	  if ((0, _helpers.isNaN)(o1) || (0, _helpers.isNaN)(o2)) {
	    return false;
	  }

	  if ((0, _helpers.isPrimitive)(o1) || (0, _helpers.isPrimitive)(o2)) {
	    return strict ? o1 === o2 : o1 == o2;
	  }

	  if ((0, _helpers.isDate)(o1) && (0, _helpers.isDate)(o2)) {
	    return o1.getTime() === o2.getTime();
	  }

	  if ((0, _helpers.isDate)(o1) || (0, _helpers.isDate)(o2)) {
	    return false;
	  }

	  if ((0, _helpers.isRegExp)(o1) && (0, _helpers.isRegExp)(o2)) {
	    return o1.source === o2.source && o1.global === o2.global && o1.ignoreCase === o2.ignoreCase && o1.multiline === o2.multiline && o1.sticky === o2.sticky && o1.unicode === o2.unicode && o1.lastIndex === o2.lastIndex;
	  }

	  if ((0, _helpers.isRegExp)(o1) || (0, _helpers.isRegExp)(o2)) {
	    return false;
	  }

	  if ((0, _helpers.isFunction)(o1) || (0, _helpers.isFunction)(o2)) {
	    return false;
	  }

	  if (Object.keys(o1).length !== Object.keys(o2).length) {
	    return false;
	  }

	  return (0, _helpers.iterate)(o1, function (value, key) {
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
	  object = new Super(object).$;

	  var end = n === 1;

	  return (0, _helpers.iterate)(object, function (value, key, object) {
	    var newTree = [{ key: key, value: value }].concat(tree);

	    if (end || (0, _helpers.isPrimitive)(value) ? !callback(value, key, object, newTree) : !_deepEvery(value, callback, n - 1, newTree)) {
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
	  object = new Super(object).$;

	  var array = (0, _helpers.isArrayLike)(object);
	  var nul = (0, _helpers.isNullOrUndefined)(object);
	  var o = array ? [] : nul ? object : {};
	  var end = n === 1;

	  (0, _helpers.iterate)(object, function (value, key, object) {
	    var newTree = [{ key: key, value: value }].concat(tree);

	    if ((end || (0, _helpers.isPrimitive)(value)) && callback(value, key, object, newTree)) {
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
	  object = new Super(object).$;

	  var end = n === 1;

	  return (0, _helpers.iterate)(object, function (value, key, object) {
	    var newTree = [{ key: key, value: value }].concat(tree);

	    if (end || (0, _helpers.isPrimitive)(value)) {
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
	  (0, _helpers.iterate)(object, _deepFreeze);
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
	  object = new Super(object).$;

	  var end = n === 1;

	  (0, _helpers.iterate)(object, function (value, key, object) {
	    var newTree = [{ key: key, value: value }].concat(tree);

	    if (end || (0, _helpers.isPrimitive)(value)) {
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
	  object = new Super(object).$;

	  var o = (0, _helpers.isArrayLike)(object) ? [] : (0, _helpers.isNullOrUndefined)(object) ? object : {};
	  var end = n === 1;

	  (0, _helpers.iterate)(object, function (value, key, object) {
	    var newTree = [{ key: key, value: value }].concat(tree);

	    o[key] = end || (0, _helpers.isPrimitive)(value) ? callback(value, key, object, newTree) : _deepMap(value, callback, n - 1, newTree);
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
	  object = new Super(object).$;

	  var end = n === 1;

	  (0, _helpers.iterate)(object, function (value, key, object) {
	    if (!IV && (end || (0, _helpers.isPrimitive)(value)) && !start) {
	      IV = { IV: value };
	      start = true;

	      return;
	    }

	    var newTree = [{ key: key, value: value }].concat(tree);

	    IV = end || (0, _helpers.isPrimitive)(value) ? { IV: callback(IV.IV, value, key, object, newTree) } : _deepReduce(value, callback, n - 1, start, IV, newTree);
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
	  object = new Super(object).$;

	  var end = n === 1;

	  return (0, _helpers.iterate)(object, function (value, key, object) {
	    var newTree = [{ key: key, value: value }].concat(tree);

	    if (end || (0, _helpers.isPrimitive)(value) ? callback(value, key, object, newTree) : _deepSome(value, callback, n - 1, newTree)) {
	      return true;
	    }
	  }) || false;
	}

	_constructors2.default[0].push({
	  check: function check() {
	    return true;
	  },
	  cls: Super
	});

	exports.default = Super;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _assign = __webpack_require__(10);

	Object.keys(_assign).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _assign[key];
	    }
	  });
	});

	var _checkTypes = __webpack_require__(4);

	Object.keys(_checkTypes).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _checkTypes[key];
	    }
	  });
	});

	var _class = __webpack_require__(12);

	Object.keys(_class).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _class[key];
	    }
	  });
	});

	var _crossClassMethods = __webpack_require__(14);

	Object.keys(_crossClassMethods).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _crossClassMethods[key];
	    }
	  });
	});

	var _defineProperty = __webpack_require__(13);

	Object.keys(_defineProperty).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _defineProperty[key];
	    }
	  });
	});

	var _iterate = __webpack_require__(11);

	Object.keys(_iterate).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _iterate[key];
	    }
	  });
	});

	var _Symbol = __webpack_require__(15);

	Object.keys(_Symbol).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _Symbol[key];
	    }
	  });
	});

	var _toArray = __webpack_require__(16);

	Object.keys(_toArray).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _toArray[key];
	    }
	  });
	});

	var _toStringTag = __webpack_require__(5);

	Object.keys(_toStringTag).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _toStringTag[key];
	    }
	  });
	});

	var _validate = __webpack_require__(17);

	Object.keys(_validate).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _validate[key];
	    }
	  });
	});

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.assign = assign;

	var _iterate = __webpack_require__(11);

	/**
	 * @const
	 * @function assign
	 * @param {Object} target - Object to assign rest of arguments to.
	 * @param {...Object} objects - Objects that are assigned to the target.
	 * @returns {Object} Target.
	 */
	function assign(target) {
	  (0, _iterate.iterate)(arguments, function (source, index) {
	    if (index) {
	      (0, _iterate.iterate)(source, function (value, key) {
	        target[key] = value;
	      });
	    }
	  });

	  return target;
	} /**
	   * @module helpers/assign
	   * @private
	   * @description Exports Object.assign-like method.
	   */

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.iterate = iterate;

	var _checkTypes = __webpack_require__(4);

	/**
	 * @callback IterateCallback
	 * @param {*} value - Iteration value.
	 * @param {String|Number} key - Iteration key.
	 * @param {*} object - Initial iterable object.
	 */

	/**
	 * @function iterate
	 * @param {(Object|Array|null|undefined)} object - Value to iterate over.
	 * @param {IterateCallback} callback - Callback that is called on every iteration.
	 * @returns {*} If callback returns not undefined then iterate returns this value.
	 * @description Function for iterating over all types of values.
	 */
	function iterate(object, callback) {
	  var array = (0, _checkTypes.isArrayLike)(object);

	  var iterated = 0;

	  for (var key in object) {
	    if ({}.hasOwnProperty.call(object, key)) {
	      if (array && iterated++ >= object.length) {
	        break;
	      }

	      var value = callback(object[key], array ? Number(key) : key, object);

	      if (!(0, _checkTypes.isUndefined)(value)) {
	        return value;
	      }
	    }
	  }
	} /**
	   * @module helpers/iterate
	   * @private
	   * @description Exports iterate method.
	   */

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.inherits = inherits;
	exports.checkClassInstance = checkClassInstance;
	exports.possibleSuperClassReturn = possibleSuperClassReturn;

	var _defineProperty = __webpack_require__(13);

	var _checkTypes = __webpack_require__(4);

	/**
	 * @function inherits
	 * @param {Function} subClass - Sub class to be inherited from superClass.
	 * @param {Function} superClass - Super class that sub class inherits from.
	 * @description Function for setting classes inheritance.
	 * @returns {void}
	 */
	/**
	 * @module helpers/class
	 * @private
	 * @description Exports class-creating helpers.
	 */

	function inherits(subClass, superClass) {
	  Object.setPrototypeOf(subClass.prototype, superClass.prototype);
	  Object.setPrototypeOf(subClass, superClass);

	  (0, _defineProperty.defineProperties)(subClass.prototype, {
	    constructor: subClass
	  });
	}

	/**
	 * @function checkClassInstance
	 * @param {*} instance - Instance to check.
	 * @param {Function} cls - Class to check if the instance is an instance of it.
	 * @param {String} name - Name of the class.
	 * @returns {void}
	 */
	function checkClassInstance(instance, cls, name) {
	  if (!(instance instanceof cls)) {
	    throw new Error('Class constructor ' + name + ' cannot be invoked without \'new\'');
	  }
	}

	/**
	 * @function possibleSuperClassReturn
	 * @param {*} instance - Instance to call super class with.
	 * @param {Function} superClass - Super class to call.
	 * @param {Array} [args] - Arguments to call the super class with.
	 * @returns {*} What super class call returns or the instance itself.
	 */
	function possibleSuperClassReturn(instance, superClass) {
	  var args = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

	  var returned = superClass.apply(instance, args);

	  return (0, _checkTypes.isPrimitive)(returned) ? instance : returned;
	}

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.dynamicDefineProperties = dynamicDefineProperties;
	exports.defineProperties = defineProperties;
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
	function dynamicDefineProperties(target, properties, propertyGenerator) {
	  for (var i = 0, length = properties.length; i < length; i++) {
	    var name = properties[i];

	    Object.defineProperty(target, name, {
	      value: propertyGenerator(name),
	      writable: true,
	      enumerable: false,
	      configurable: true
	    });
	  }
	}

	/**
	 * @function defineProperties
	 * @param {Object} target - Target to define properties for.
	 * @param {Object} properties - Object with properties needed to be assign to the target.
	 * @returns {void}
	 * @description Function for defining properties of an object.
	 */
	function defineProperties(target, properties) {
	  for (var name in properties) {
	    if (properties.hasOwnProperty(name)) {
	      var method = properties[name];

	      if (/^get /.test(name)) {
	        Object.defineProperty(target, name.replace(/^get /, ''), {
	          get: method,
	          set: undefined,
	          enumerable: false,
	          configurable: true
	        });
	        continue;
	      }

	      if (/^set /.test(name)) {
	        Object.defineProperty(target, name.replace(/^set /, ''), {
	          set: method,
	          get: undefined,
	          enumerable: false,
	          configurable: true
	        });
	        continue;
	      }

	      if (/^get\/set /.test(name)) {
	        Object.defineProperty(target, name.replace(/^get\/set /, ''), {
	          get: method.get,
	          set: method.set,
	          enumerable: false,
	          configurable: true
	        });
	        continue;
	      }

	      if (name !== 'Symbol.toStringTag') {
	        Object.defineProperty(target, name, {
	          value: method,
	          writable: true,
	          enumerable: false,
	          configurable: true
	        });
	      }
	    }
	  }
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.crossClassMethods = undefined;

	var _D = __webpack_require__(3);

	var _D2 = _interopRequireDefault(_D);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @namespace
	 * @private
	 * @type {Object}
	 */
	var crossClassMethods = exports.crossClassMethods = {
	  transformAnchor: transformAnchor,
	  htmlElement: htmlElement
	};

	/**
	 * @function transformAnchor
	 * @abstract
	 * @memberof module:helpers/crossClassMethods.crossClassMethods
	 * @param {Elem} elem - Elem to transform.
	 * @returns {void}
	 * @description Function for transformation html-anchors by {@link Router}.
	 */
	/**
	 * @module helpers/crossClassMethods
	 * @private
	 * @description Exports crossClassMethods.
	 */

	function transformAnchor() {}

	/**
	 * @function htmlElement
	 * @abstract
	 * @memberof module:helpers/crossClassMethods.crossClassMethods
	 * @param {Element} elem - Elem to wrap.
	 * @returns {Elem} Instance of Elem or an Elem subclass.
	 * @description Function for wrapping elements.
	 */
	function htmlElement(elem) {
	  return (0, _D2.default)(elem);
	}

/***/ },
/* 15 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * @module helpers/Symbol
	 * @private
	 * @description Exports Symbol class.
	 */

	var _Symbol = global.Symbol || {
	  toStringTag: 'Symbol.toStringTag',
	  iterator: Math.random().toString(36)
	};
	exports.Symbol = _Symbol;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.toArray = toArray;

	var _checkTypes = __webpack_require__(4);

	/**
	 * @function toArray
	 * @param {*} value - Any value.
	 * @param {Boolean} [createNewArray = false] - If it is needed to create new array.
	 * @returns {Array} Create array.
	 * @description Function for creating an array of any value.
	 */
	function toArray(value, createNewArray) {
	  if ((0, _checkTypes.isArray)(value) && !createNewArray) {
	    return value;
	  }

	  var array = [];

	  if ((0, _checkTypes.isArrayLike)(value) && !(0, _checkTypes.isString)(value)) {
	    for (var i = 0, length = value.length; i < length; i++) {
	      array.push(value[i]);
	    }
	  } else {
	    array.push(value);
	  }

	  return array;
	} /**
	   * @module helpers/toArray
	   * @private
	   * @description Exports toArray method.
	   */

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.validate = validate;

	var _validateCheckExpressions = __webpack_require__(18);

	var _validateCheckExpressions2 = _interopRequireDefault(_validateCheckExpressions);

	var _iterate = __webpack_require__(11);

	var _checkTypes = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
	/**
	 * @module helpers/validate
	 * @private
	 * @description Exports validate method.
	 */

	function validate(args, options, name) {
	  (0, _iterate.iterate)(options, function (array, number) {
	    if (!(0, _checkTypes.isArray)(array)) {
	      array = [array];
	    }

	    (0, _iterate.iterate)(array, function (checker) {
	      checker = _validateCheckExpressions2.default[checker];

	      if (!checker.check(args[number])) {
	        throw new checker.error(checker.text.replace('$n', numbers[number]) + (name ? ' (in ' + name + ')' : ''));
	      }
	    });
	  });
	}

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _checkTypes = __webpack_require__(4);

	var methods = _interopRequireWildcard(_checkTypes);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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
	exports.default = {
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
	    check: methods.isNullOrUndefined,
	    text: '$n argument must be not null or undefined!',
	    error: TypeError
	  },
	  array: {
	    check: methods.isArray,
	    text: '$n argument must be an array!',
	    error: TypeError
	  },
	  'array||!': {
	    check: function check(a) {
	      return methods.isArray(a) || methods.isNullOrUndefined(a);
	    },
	    text: '$n argument must be an array, or undefined, or null!',
	    error: TypeError
	  },
	  arrayLike: {
	    check: methods.isArrayLike,
	    text: '$n argument must be array-like!',
	    error: TypeError
	  },
	  'arrayLike||!': {
	    check: function check(a) {
	      return methods.isArrayLike(a) || methods.isNullOrUndefined(a);
	    },
	    text: '$n argument must be array-like, or undefined, or null!',
	    error: TypeError
	  },
	  date: {
	    check: methods.isDate,
	    text: '$n argument must be a date!',
	    error: TypeError
	  },
	  'date||!': {
	    check: function check(d) {
	      return methods.isDate(d) || methods.isNullOrUndefined(d);
	    },
	    text: '$n argument must be a date, or undefined, or null!',
	    error: TypeError
	  },
	  dateLike: {
	    check: methods.isDateLike,
	    text: '$n argument must be date-like!',
	    error: TypeError
	  },
	  'dateLike||!': {
	    check: function check(d) {
	      return methods.isDateLike(d) || methods.isNullOrUndefined(d);
	    },
	    text: '$n argument must be date-like, or undefined, or null!',
	    error: TypeError
	  },
	  function: {
	    check: methods.isFunction,
	    text: '$n argument must be a function!',
	    error: TypeError
	  },
	  'function||!': {
	    check: function check(f) {
	      return methods.isFunction(f) || methods.isNullOrUndefined(f);
	    },
	    text: '$n argument must be a function, or undefined, or null!',
	    error: TypeError
	  },
	  int: {
	    check: methods.isInteger,
	    text: '$n argument must be an integer!',
	    error: TypeError
	  },
	  'int||!': {
	    check: function check(i) {
	      return methods.isInteger(i) || methods.isNullOrUndefined(i);
	    },
	    text: '$n argument must be an integer, or undefined, or null!',
	    error: TypeError
	  },
	  intLike: {
	    check: methods.isIntegerLike,
	    text: '$n argument must be integer-like!',
	    error: TypeError
	  },
	  'intLike||!': {
	    check: function check(i) {
	      return methods.isIntegerLike(i) || methods.isNullOrUndefined(i);
	    },
	    text: '$n argument must be integer-like, or undefined, or null!',
	    error: TypeError
	  },
	  number: {
	    check: methods.isNumber,
	    text: '$n argument must be a number!',
	    error: TypeError
	  },
	  'number||!': {
	    check: function check(n) {
	      return methods.isNumber(n) || methods.isNullOrUndefined(n);
	    },
	    text: '$n argument must be a number, or undefined, or null!',
	    error: TypeError
	  },
	  numberLike: {
	    check: methods.isNumberLike,
	    text: '$n argument must be number-like!',
	    error: TypeError
	  },
	  'numberLike||!': {
	    check: function check(n) {
	      return methods.isNumberLike(n) || methods.isNullOrUndefined(n);
	    },
	    text: '$n argument must be number-like, or undefined, or null!',
	    error: TypeError
	  },
	  object: {
	    check: methods.isObject,
	    text: '$n argument must be an object!',
	    error: TypeError
	  },
	  'object||!': {
	    check: function check(o) {
	      return methods.isObject(o) || methods.isNullOrUndefined(o);
	    },
	    text: '$n argument must be an object, or undefined, or null!',
	    error: TypeError
	  },
	  regexp: {
	    check: methods.isRegExp,
	    text: '$n argument must be a regular expression!',
	    error: TypeError
	  },
	  'regexp||!': {
	    check: function check(r) {
	      return methods.isRegExp(r) || methods.isNullOrUndefined(r);
	    },
	    text: '$n argument must be a regular expression, or undefined, or null!',
	    error: TypeError
	  },
	  string: {
	    check: methods.isString,
	    text: '$n argument must be a string!',
	    error: TypeError
	  },
	  'string||!': {
	    check: function check(s) {
	      return methods.isString(s) || methods.isNullOrUndefined(s);
	    },
	    text: '$n argument must be a string, or undefined, or null!',
	    error: TypeError
	  }
	}; /**
	    * @module constants/validateCheckExpressions
	    * @private
	    * @description Exports different types of validate expressions for {@link module:helpers/validate}.
	    */

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Arr = Arr;
	exports.array = array;

	var _Super = __webpack_require__(8);

	var _Super2 = _interopRequireDefault(_Super);

	var _constructors = __webpack_require__(6);

	var _constructors2 = _interopRequireDefault(_constructors);

	var _helpers = __webpack_require__(9);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /**
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
	function Arr() {
	  var array = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

	  (0, _helpers.checkClassInstance)(this, Arr, 'Arr');

	  var $this = (0, _helpers.possibleSuperClassReturn)(this, _Super2.default, [(0, _helpers.toArray)(array)]);

	  Object.defineProperty($this, '$$', { value: array });

	  return $this;

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

	(0, _helpers.inherits)(Arr, _Super2.default);

	(0, _helpers.defineProperties)(Arr.prototype, _defineProperty({
	  /**
	   * @member {Function} Arr#concat
	   * @public
	   * @param {...(Array|*)} arrays - Arrays or any other values to concat the array with.
	   * @returns {Arr} New instance of Arr.
	   * @description Synonym for
	   * [Array#concat]
	   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/concat}.
	   */

	  concat: function concat() {
	    var array = (0, _helpers.toArray)(this.$, true);

	    (0, _helpers.iterate)(arguments, function (value) {
	      value = new _Super2.default(value).$;

	      if ((0, _helpers.isArrayLike)(value) && !(0, _helpers.isString)(value)) {
	        (0, _helpers.iterate)(value, function (value) {
	          array.push(value);
	        });

	        return;
	      }

	      array.push(value);
	    });

	    return new this.constructor(array);
	  },


	  /**
	   * @member {Function} Arr#indexOf
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
	  indexOf: function indexOf(value) {
	    var key = this.keyOf(value);

	    return key === null ? -1 : Number(key);
	  },


	  /**
	   * @member {Function} Arr#indexOfStrict
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
	  indexOfStrict: function indexOfStrict(value) {
	    var key = this.keyOfStrict(value);

	    return key === null ? -1 : Number(key);
	  },


	  /**
	   * @member {Function} Arr#join
	   * @public
	   * @param {String} [separator = ','] - String that is passed to Array#concat.
	   * @returns {String} - String of joined array.
	   * @description Synonym for
	   * [Array#join]
	   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/join}.
	   */
	  join: function join() {
	    return this.$.join.apply(this.$, arguments);
	  },


	  /**
	   * @member {*} Arr#last
	   * @public
	   * @readonly
	   * @returns {*} Last array element.
	   * @description The last element of the array.
	   *
	   * @example
	   * new Arr([1, 2, 3]).last; // 3
	   * new Arr([]).last;        // undefined
	   */
	  'get last': function getLast() {
	    var array = this.$;

	    return array[array.length - 1];
	  },


	  /**
	   * @member {Number} Arr#length
	   * @public
	   * @readonly
	   * @returns {Number} Array length.
	   * @description Synonym for
	   * [Array#length]
	   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/length}.
	   */
	  'get length': function getLength() {
	    return this.$.length;
	  },


	  /**
	   * @member {Function} Arr#pop
	   * @public
	   * @returns {*} Returns deleted element.
	   * @description Synonym for
	   * [Array#pop]
	   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/pop}.
	   */
	  pop: function pop() {
	    return this.$.pop();
	  },


	  /**
	   * @member {Function} Arr#push
	   * @public
	   * @param {...*} values - See
	   * [Array#push]
	   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/push}.
	   * @returns {Arr} Returns this.
	   * @description Synonym for
	   * [Array#push]
	   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/push}
	   * besides returning this.
	   */
	  push: function push() {
	    this.$.push.apply(this.$, arguments);

	    return this;
	  },


	  /**
	   * @member {Function} Arr#reverse
	   * @public
	   * @returns {Arr} A wrap of the reversed array.
	   * @description Reverse the array.
	   *
	   * @example
	   * new Arr([1, 2, 3]).reverse().$; // [3, 2, 1]
	   * new Arr([]).reverse().$;        // []
	   */
	  reverse: function reverse() {
	    this.$.reverse();

	    return this;
	  },


	  /**
	   * @member {Function} Arr#shift
	   * @public
	   * @returns {*} Returns deleted element.
	   * @description Synonym for
	   * [Array#shift]
	   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/shift}.
	   */
	  shift: function shift() {
	    return this.$.shift();
	  },


	  /**
	   * @member {Function} Arr#shuffle
	   * @public
	   * @returns {Arr} A wrap of a shuffled array.
	   * @description Method for shuffling.
	   *
	   * @example
	   * new Arr([1, 2, 3, 4]).shuffle().$; // [4, 2, 3, 1]
	   */
	  shuffle: function shuffle() {
	    var length = this.$.length;

	    return this.forEach(function (value, index, array) {
	      var randomIndex = index + Math.floor((length - index) * Math.random());

	      array[index] = array[randomIndex];
	      array[randomIndex] = value;
	    });
	  },


	  /**
	   * @member {Function} Arr#slice
	   * @param {Number} [begin = 0] - See
	   * [Array#slice]
	   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/slice}.
	   * @param {Number} [end = array.length] - See
	   * [Array#slice]
	   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/slice}.
	   * @returns {Arr} A wrap of a sliced array.
	   * @description Synonym for
	   * [Array#slice]
	   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/slice}.
	   */
	  slice: function slice() {
	    return new this.constructor(this.$.slice.apply(this.$, arguments));
	  },


	  /**
	   * @member {Function} Arr#sort
	   * @public
	   * @param {CompareFunction} [compareFunction] - See
	   * [Array#sort]
	   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/sort}.
	   * @returns {Arr} Returns this.
	   * @description Synonym for
	   * [Array#sort]
	   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/sort}.
	   */
	  sort: function sort(compareFunction) {
	    (0, _helpers.validate)([compareFunction], ['function||!'], 'Arr#sort');

	    this.$.sort(compareFunction);

	    return this;
	  },


	  /**
	   * @member {Function} Arr#sortAsc
	   * @public
	   * @returns {Arr} Returns this.
	   * @description Method for ascending sorting. Puts non-numbers first, then NaNs, then sorted values.
	   *
	   * @example
	   * new Arr([NaN, 1, -7, '100', 5]).sortAsc().$; // ['100', NaN, -7, 1, 5]
	   */
	  sortAsc: function sortAsc() {
	    return this.sort(asc);
	  },


	  /**
	   * @member {Function} Arr#sortDesc
	   * @public
	   * @returns {Arr} Returns this.
	   * @description Method for descending sorting. Puts sorted values first, then NaNs, then non-numbers.
	   *
	   * @example
	   * new Arr([NaN, 1, -7, '100', 5]).sortDesc().$; // [5, 1, -7, NaN, '100']
	   */
	  sortDesc: function sortDesc() {
	    return this.sort(function (y, x) {
	      return asc(x, y);
	    });
	  },


	  /**
	   * @member {Function} Arr#splice
	   * @public
	   * @param {Number} [start] - See
	   * [Array#splice]
	   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/splice}.
	   * @param {Number} [deleteCount] - See
	   * [Array#splice]
	   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/splice}.
	   * @param {...*} [items] - See
	   * [Array#splice]
	   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/splice}.
	   * @returns {Arr} A wrap of return value of #splice call.
	   * @description Synonym for
	   * [Array#splice]
	   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/splice}.
	   */
	  splice: function splice() {
	    return new Arr(this.$.splice.apply(this.$, arguments));
	  },


	  /**
	   * @member {Function} Arr#string
	   * @public
	   * @returns {String} Concatenated array.
	   * @description Synonym for array.join('').
	   *
	   * @example
	   * new Arr([1, 2, 3]).string(); // '123'
	   */
	  string: function string() {
	    return this.join('');
	  },


	  /**
	   * @member {Function} Arr#unshift
	   * @public
	   * @param {...*} values - See
	   * [Array#unshift]
	   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift}.
	   * @returns {Arr} Returns this.
	   * @description Synonym for
	   * [Array#unshift]
	   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift}
	   * besides returning this.
	   */
	  unshift: function unshift() {
	    this.$.unshift.apply(this.$, arguments);

	    return this;
	  }
	}, _helpers.Symbol.toStringTag, 'Arr'));

	/**
	 * @function asc
	 * @private
	 * @param {*} x - First value to be compared.
	 * @param {*} y - Second value to be compared.
	 * @returns {Number} Where to put the first element: before or after.
	 */
	function asc(x, y) {
	  if (!(0, _helpers.isNumber)(x) && !(0, _helpers.isNumber)(y)) {
	    return 0;
	  }

	  if (!(0, _helpers.isNumber)(x)) {
	    return -1;
	  }

	  if (!(0, _helpers.isNumber)(y)) {
	    return 1;
	  }

	  if ((0, _helpers.isNaN)(x) && (0, _helpers.isNaN)(y)) {
	    return 0;
	  }

	  if ((0, _helpers.isNaN)(x)) {
	    return -1;
	  }

	  if ((0, _helpers.isNaN)(y)) {
	    return 1;
	  }

	  return x - y;
	}

	_constructors2.default[1].push({
	  check: _helpers.isArrayLike,
	  cls: Arr
	});

	/**
	 * @function array
	 * @public
	 * @param {Number} number - Length of the array.
	 * @param {ArrayCallback} [callback] - If it's present it has to a function
	 * that returns the element that is pushed to the new array.
	 * @returns {Arr} New instance of Arr.
	 * @description Method for creating new array from the length using optional callback.
	 *
	 * @example
	 * array(3).$;               // [0, 1, 2]
	 * array(3, (i) => i * 2).$; // [0, 2, 4]
	 */
	function array(number, callback) {
	  (0, _helpers.validate)([number, callback], [['intLike', '>=0'], 'function||!']);

	  var array = [];

	  for (var i = 0; i < number; i++) {
	    array.push(callback ? callback(i) : i);
	  }

	  return new Arr(array);
	}

	exports.default = Arr;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.BlobObject = BlobObject;
	exports.blob = blob;

	var _Super = __webpack_require__(8);

	var _Super2 = _interopRequireDefault(_Super);

	var _Promise = __webpack_require__(21);

	var _Promise2 = _interopRequireDefault(_Promise);

	var _constructors = __webpack_require__(6);

	var _constructors2 = _interopRequireDefault(_constructors);

	var _helpers = __webpack_require__(9);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /**
	                                                                                                                                                                                                                   * @module BlobObject
	                                                                                                                                                                                                                   * @private
	                                                                                                                                                                                                                   * @mixin
	                                                                                                                                                                                                                   * @description Exports BlobObject class.
	                                                                                                                                                                                                                   */

	/**
	 * @typedef {{ buffer: String, binary: String, dataURL: String, text: String }} methods
	 * @private
	 * @description List of read blob methods.
	 */
	var methods = {
	  buffer: 'ArrayBuffer',
	  binary: 'BinaryString',
	  dataURL: 'DataURL',
	  text: 'Text'
	};

	/**
	 * @typedef {('buffer'|'binary'|'dataURL'|'text')} ReadBlobMethod
	 * @public
	 * @description Enum type of read blob methods.
	 */

	/**
	 * @typedef {ArrayBuffer|ArrayBufferView|Blob|String} BlobParts
	 * @public
	 * @description Allowed blob parts.
	 */

	/**
	 * @callback ReaderEventListener
	 * @public
	 * @param {Event} e - Fired event.
	 * @param {FileReader} reader - FileReader.
	 */

	/**
	 * @class BlobObject
	 * @extends Super
	 * @public
	 * @param {Blob} blob - Blob to wrap.
	 * @returns {BlobObject} Instance of BlobObject.
	 * @description Wrap of a blob.
	 *
	 * @example
	 * new BlobObject(new Blob(['{"foo":"bar"}'], { type: 'application/json' }));
	 */
	function BlobObject(blob) {
	  (0, _helpers.checkClassInstance)(this, BlobObject, 'BlobObject');

	  return (0, _helpers.possibleSuperClassReturn)(this, _Super2.default, [blob]);
	}

	(0, _helpers.inherits)(BlobObject, _Super2.default);

	(0, _helpers.defineProperties)(BlobObject.prototype, _defineProperty({
	  /**
	   * @member {Function} BlobObject#readAs
	   * @public
	   * @param {ReadBlobMethod} method - Method that is used for reading from blob.
	   * @param {ReaderEventListener} [progress] - Progress listener.
	   * @returns {Promise} Promise that could be aborted.
	   * @description Method for reading from blobs.
	   *
	   * @example
	   * new BlobObject(new Blob(['{"foo":"bar"}'], { type: 'application/json' }))
	   *   .readAs('text')
	   *   .then((value) => {
	   *     console.log(value); // '{"foo":"bar"}'
	   *   });
	   */

	  readAs: function readAs(method, progress) {
	    var _this = this;

	    if (!methods[method]) {
	      throw new Error('1st argument must be one of following values: buffer, binary, dataURL, text');
	    }

	    var reader = new FileReader();
	    var toReject = void 0;

	    if ((0, _helpers.isFunction)(progress)) {
	      reader.onprogress = function (e) {
	        progress(e, this);
	      };
	    }

	    var promise = new _Promise2.default(function (resolve, reject) {
	      toReject = reject;

	      reader.onerror = function () {
	        if (reader) {
	          reject(new Error('Reading error'));
	        }
	      };

	      reader.onload = function () {
	        resolve(reader.result);
	      };

	      reader['readAs' + methods[method]](_this.$);
	    });

	    promise.abort = function abort() {
	      toReject(new Error('Reading was aborted'));

	      reader.abort();

	      reader = null;

	      return this;
	    };

	    return promise;
	  },


	  /**
	   * @member {Function} BlobObject#saveAs
	   * @public
	   * @param {String} [name] - Name that is used for saving file.
	   * @returns {BlobObject} Returns this.
	   * @description Method for saving blobs.
	   *
	   * @example
	   * new BlobObject(new Blob(['{"foo":"bar"}'], { type: 'application/json' }))
	   *   .saveAs('blob.json');
	   */
	  saveAs: function saveAs() {
	    var name = arguments.length <= 0 || arguments[0] === undefined ? 'download' : arguments[0];

	    var anchor = document.createElement('a');

	    anchor.href = URL.createObjectURL(this.$);
	    anchor.setAttribute('download', name);
	    anchor.click();

	    return this;
	  }
	}, _helpers.Symbol.toStringTag, 'BlobObject'));

	_constructors2.default[1].push({
	  check: function check(blob) {
	    return (/^(Blob|File)$/.test((0, _helpers.toStringTag)(blob))
	    );
	  },
	  cls: BlobObject
	});

	/**
	 * @function blob
	 * @public
	 * @param {(BlobParts[]|BlobParts)} blobParts - Blob parts that are passed to
	 * [Blob]{@link https://developer.mozilla.org/en-US/docs/Web/API/Blob/Blob} constructor.
	 * @param {Object} [options] - Options that are passed to
	 * [Blob]{@link https://developer.mozilla.org/en-US/docs/Web/API/Blob/Blob} constructor.
	 * @returns {BlobObject} New instance of BlobObject.
	 * @description Function for creating blobs not involving BlobObject and Blob constructors.
	 */
	function blob(blobParts, options) {
	  if (!(0, _helpers.isArray)(blobParts)) {
	    blobParts = [blobParts];
	  }

	  return new BlobObject(new Blob(blobParts, options));
	}

	exports.default = BlobObject;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Promise = Promise;

	var _helpers = __webpack_require__(9);

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /**
	                                                                                                                                                                                                                   * @module Promise
	                                                                                                                                                                                                                   * @private
	                                                                                                                                                                                                                   * @mixin
	                                                                                                                                                                                                                   * @description Exports Promise class.
	                                                                                                                                                                                                                   */

	var secret = {};

	var iterator = _helpers.Symbol.iterator;

	function Promise(resolver) {
	  (0, _helpers.checkClassInstance)(this, Promise, 'Promise');

	  if (!(0, _helpers.isFunction)(resolver)) {
	    throw new TypeError('Promise resolver ' + {}.toString.call(resolver) + ' is not a function');
	  }

	  var hiddenStatus = void 0;
	  var hiddenValue = void 0;

	  var onResolve = [];
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
	   * @property {'pending'|'resolved'|'rejected'} status - Status of the promise.
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
	  (0, _helpers.defineProperties)(this.$$ = {}, {
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
	        var proxy = (0, _helpers.isFunction)(f) ? function (value) {
	          try {
	            resolve(f(value));
	          } catch (err) {
	            return reject(err);
	          }
	        } : null;

	        if (status === 'resolve') {
	          onResolve.push(proxy || function (value) {
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

	  setTimeout(function () {
	    try {
	      resolver(resolve, reject);
	    } catch (err) {
	      reject(err);
	    }
	  }, 1);

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
	      if (value && (0, _helpers.isFunction)(value.then)) {
	        return value.then(function (value) {
	          resolve(value);
	        }, function (err) {
	          reject(err);
	        });
	      }

	      hiddenPromise.status = 'resolved';
	      hiddenPromise.value = value;

	      for (var i = 0, length = onResolve.length; i < length; i++) {
	        hiddenPromise.handled = true;

	        onResolve[i](value);
	      }
	    }
	  }
	}

	(0, _helpers.defineProperties)(Promise, {
	  all: function all(iterable) {
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
	        var promise = Promise.resolve(array[i]);

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
	  },
	  race: function race(iterable) {
	    var array = [];

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
	      for (var i = 0, length = array.length; i < length; i++) {
	        array[i].then(resolve, reject);
	      }
	    });
	  },
	  reject: function reject(value) {
	    return new Promise(function (resolve, reject) {
	      reject(value);
	    });
	  },
	  resolve: function resolve(value) {
	    if (value && (0, _helpers.isFunction)(value.then)) {
	      return value;
	    }

	    return new Promise(function (resolve) {
	      resolve(value);
	    });
	  }
	});

	(0, _helpers.defineProperties)(Promise.prototype, _defineProperty({
	  abort: function abort() {},
	  catch: function _catch(onRejected) {
	    return resolveOrReject(this.$$, null, onRejected);
	  },
	  then: function then(onResolved, onRejected) {
	    return resolveOrReject(this.$$, onResolved, onRejected);
	  }
	}, _helpers.Symbol.toStringTag, 'Promise'));

	/**
	 * @function resolveOrReject
	 * @private
	 * @param {hiddenPromise} promise - Promise to resolve or reject.
	 * @param {Function} [onResolved] - Resolve function.
	 * @param {Function} [onRejected] - Reject function.
	 * @returns {Promise} New instance of Promise.
	 */
	function resolveOrReject(promise, onResolved, onRejected) {
	  if (promise.status === 'pending') {
	    return new Promise(function (resolve, reject) {
	      promise.handle('reject', onRejected, resolve, reject, secret);
	      promise.handle('resolve', onResolved, resolve, reject, secret);
	    });
	  }

	  promise.handled = secret;

	  var value = promise.value;


	  var method = void 0;
	  var handler = void 0;

	  if (promise.status === 'resolved') {
	    method = 'resolve';
	    handler = onResolved;
	  } else {
	    method = 'reject';
	    handler = onRejected;
	  }

	  if (!(0, _helpers.isFunction)(handler)) {
	    return Promise[method](value);
	  }

	  try {
	    return Promise.resolve(handler(value));
	  } catch (err) {
	    return Promise.reject(err);
	  }
	}

	exports.default = Promise;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Dat = Dat;
	exports.now = now;
	exports.date = date;

	var _Super = __webpack_require__(8);

	var _Super2 = _interopRequireDefault(_Super);

	var _Num = __webpack_require__(23);

	var _Num2 = _interopRequireDefault(_Num);

	var _Str = __webpack_require__(25);

	var _Str2 = _interopRequireDefault(_Str);

	var _Switcher = __webpack_require__(27);

	var _constructors = __webpack_require__(6);

	var _constructors2 = _interopRequireDefault(_constructors);

	var _formats = __webpack_require__(28);

	var _formats2 = _interopRequireDefault(_formats);

	var _helpers = __webpack_require__(9);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /**
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

	var getSwitcher = (0, _Switcher.switcher)({
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
	var setSwitcher = (0, _Switcher.switcher)({
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
	function Dat() {
	  var date = arguments.length <= 0 || arguments[0] === undefined ? new Date() : arguments[0];

	  (0, _helpers.checkClassInstance)(this, Dat, 'Dat');

	  return (0, _helpers.possibleSuperClassReturn)(this, _Super2.default, [date]);

	  /**
	   * @member {Date} Dat#$
	   * @public
	   * @description Original date.
	   */
	}

	(0, _helpers.inherits)(Dat, _Super2.default);

	(0, _helpers.defineProperties)(Dat.prototype, _defineProperty({
	  /**
	   * @member {Function} Dat#add
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

	  add: function add(what, number) {
	    if (arguments.length >= 2) {
	      what = _defineProperty({}, what, number);
	    }

	    return this.time(this.time() + new _Super2.default(what).sum(function (value, what) {
	      return coeffs[what] * value;
	    }));
	  },


	  /**
	   * @member {Function} Dat#expires
	   * @public
	   * @param {*} value - Value to resolve after the date expires.
	   * @returns {Promise} New instance of Promise.
	   * @description Method for defining when the date expires.
	   *
	   * @example
	   * new Dat().add('c', 500).expires('Expired').then((value) => {
	   *   // After 500 milliseconds
	   *   console.log(value); // 'Expired'
	   * });
	   */
	  expires: function expires(value) {
	    return new _Num2.default(this.$ - now()).timeout(value);
	  },


	  /**
	   * @member {Function} Dat#format
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
	  format: function format(string) {
	    var _this = this;

	    var prefix = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

	    string = new _Str2.default(new _Super2.default(string).$);
	    prefix = String(new _Super2.default(prefix).$);

	    (0, _helpers.iterate)(_formats2.default, function (format) {
	      string = string.replaceString(prefix + format.format, format.match(_this, 'get'));
	    });

	    return string.$;
	  },


	  /**
	   * @member {Function} Dat#formatUTC
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
	  formatUTC: function formatUTC(string) {
	    var _this2 = this;

	    var prefix = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

	    string = new _Str2.default(new _Super2.default(string).$);
	    prefix = String(new _Super2.default(prefix).$);

	    (0, _helpers.iterate)(_formats2.default, function (format) {
	      string = string.replaceString(prefix + format.format, format.match(_this2, 'getUTC'));
	    });

	    return string.$;
	  },


	  /**
	   * @member {Function} Dat#get
	   * @public
	   * @param {GetPeriod} what - What to get.
	   * @returns {Number} Number of what to get.
	   * @description Method for getting values such as seconds or minutes.
	   *
	   * @example
	   * new Dat(new Date('1999-12-31T23:59:59.999Z')).get('s'); // 59
	   */
	  get: function get(what) {
	    return getSwitcher(what, [this.$, 'get']);
	  },


	  /**
	   * @member {Function} Dat#getUTC
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
	  getUTC: function getUTC(what) {
	    return getSwitcher(what, [this.$, 'getUTC']);
	  },


	  /**
	   * @member {Function} Dat#isAfter
	   * @public
	   * @param {DateLike} date - Date to be compared to this date.
	   * @returns {Boolean} If this date is after the argument one.
	   * @description Finds out if this date is after the argument one.
	   *
	   * @example
	   * new Dat(new Date(333)).isAfter(new Date(334)); // false
	   * new Dat(new Date(333)).isAfter(new Date(332)); // true
	   */
	  isAfter: function isAfter(date) {
	    date = new Date(new _Super2.default(date).$);

	    return date.getTime() < this.$.getTime();
	  },


	  /**
	   * @member {Function} Dat#isBefore
	   * @public
	   * @param {DateLike} date - Date to be compared to this date.
	   * @returns {Boolean} If this date is before the argument one.
	   * @description Finds out if this date is before the argument one.
	   *
	   * @example
	   * new Dat(new Date(333)).isBefore(new Date(334)); // true
	   * new Dat(new Date(333)).isBefore(new Date(332)); // false
	   */
	  isBefore: function isBefore(date) {
	    date = new Date(new _Super2.default(date).$);

	    return date.getTime() > this.$.getTime();
	  },


	  /**
	   * @member {Function} Dat#isBetween
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
	  isBetween: function isBetween(date1, date2) {
	    var time = this.$.getTime();

	    date1 = new Date(new _Super2.default(date1).$);
	    date2 = new Date(new _Super2.default(date2).$);

	    return time > date1.getTime() && time < date2.getTime();
	  },


	  /**
	   * @member {Function} Dat#isInvalid
	   * @public
	   * @returns {Boolean} If the date is invalid.
	   * @description Returns if the date is invalid.
	   *
	   * @example
	   * new Dat(new Date('a')).isInvalid(); // true
	   * new Dat(new Date(1)).isInvalid();   // false
	   */
	  isInvalid: function isInvalid() {
	    return this.$.toString() === 'Invalid Date';
	  },


	  /**
	   * @member {Function} Dat#isPassed
	   * @public
	   * @returns {Boolean} If the date is passed.
	   * @description Returns if the date is passed.
	   *
	   * @example
	   * new Dat(new Date(1)).isPassed(); // true
	   */
	  isPassed: function isPassed() {
	    return this.isBefore(now());
	  },


	  /**
	   * @member {Function} Dat#ofOne
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
	  ofOne: function ofOne(what, date) {
	    var _this3 = this;

	    if (!(what in coeffs) || what === 'w') {
	      return false;
	    }

	    date = new Dat(new Date(date));

	    var started = void 0;

	    return (0, _helpers.iterate)(coeffs, function (coeff, w) {
	      if (w === what) {
	        started = true;
	      }

	      if (!started || w === 'w') {
	        return;
	      }

	      if (started && _this3.get(w) !== date.get(w)) {
	        return false;
	      }
	    }) !== false;
	  },


	  /**
	   * @member {Function} Dat#set
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
	  set: function set(what, number) {
	    var date = this.$;

	    if (arguments.length >= 2) {
	      what = _defineProperty({}, what, number);
	    }

	    what = new _Super2.default(what).$;

	    (0, _helpers.iterate)(what, function (value, what) {
	      setSwitcher(what, [date, value, 'set']);
	    });

	    return this;
	  },


	  /**
	   * @member {Function} Dat#setUTC
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
	  setUTC: function setUTC(what, number) {
	    var date = this.$;

	    if (arguments.length >= 2) {
	      what = _defineProperty({}, what, number);
	    }

	    what = new _Super2.default(what).$;

	    (0, _helpers.iterate)(what, function (value, what) {
	      setSwitcher(what, [date, value, 'setUTC']);
	    });

	    return this;
	  },


	  /**
	   * @member {Function} Dat#setUTC
	   * @public
	   * @param {Number} [time] - Time to set.
	   * @returns {Dat|Number} - If the time argument is present this is returned otherwise the time is returned.
	   * @description Synonym for both
	   * [Date#getTime]
	   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime} and
	   * [Date#setTime]
	   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date/setTime}.
	   */
	  time: function time(_time) {
	    var date = this.$;

	    if (arguments.length) {
	      date.setTime(_time);
	    }

	    return date.getTime();
	  },
	  toISOString: function toISOString() {
	    return this.$.toISOString();
	  },
	  toLocaleString: function toLocaleString() {
	    return this.$.toLocaleString();
	  },
	  toString: function toString() {
	    return this.$.toString();
	  },
	  valueOf: function valueOf() {
	    return this.$.valueOf();
	  }
	}, _helpers.Symbol.toStringTag, 'Dat'));

	_constructors2.default[1].push({
	  check: _helpers.isDate,
	  cls: Dat
	});

	/**
	 * @function now
	 * @public
	 * @returns {Number} Number of milliseconds.
	 * @description Synonym for
	 * [Date.now]
	 * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date/now}.
	 */
	function now() {
	  return Date.now();
	}

	/**
	 * @function date
	 * @public
	 * @param {DateLike} [date] - Date-like value.
	 * @returns {Dat} New instance of Dat.
	 * @description Synonym for new Dat(new Date(date));
	 */
	function date(date) {
	  if (!arguments.length) {
	    return new Dat(new Date());
	  }

	  date = new _Super2.default(date).$;

	  return new Dat(new Date(date));
	}

	exports.default = Dat;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Num = Num;
	exports.rand = rand;
	exports.random = random;

	var _Super = __webpack_require__(8);

	var _Super2 = _interopRequireDefault(_Super);

	var _Func = __webpack_require__(24);

	var _Func2 = _interopRequireDefault(_Func);

	var _Promise = __webpack_require__(21);

	var _Promise2 = _interopRequireDefault(_Promise);

	var _constructors = __webpack_require__(6);

	var _constructors2 = _interopRequireDefault(_constructors);

	var _helpers = __webpack_require__(9);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /**
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
	function Num() {
	  var number = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

	  (0, _helpers.checkClassInstance)(this, Num, 'Num');

	  return (0, _helpers.possibleSuperClassReturn)(this, _Super2.default, [Number(number)]);

	  /**
	   * @member {Number} Num#$
	   * @public
	   * @description Original number.
	   */
	}

	(0, _helpers.inherits)(Num, _Super2.default);

	(0, _helpers.defineProperties)(Num.prototype, _defineProperty({
	  /**
	   * @member {Number} Num#abs
	   * @public
	   * @readonly
	   * @returns {Number} Absolute value.
	   * @description Synonym for
	   * [Math.abs]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/abs}.
	   *
	   * @example
	   * new Num(1).abs;  // 1
	   * new Num(-1).abs; // 1
	   */

	  'get abs': function getAbs() {
	    return Math.abs(this.$);
	  },


	  /**
	   * @member {Function} Num#acos
	   * @public
	   * @param {Boolean|*} [toDegrees = false] If it is truthy the return value is transformed into degrees.
	   * @returns {Number} Arccosine of the number.
	   * @description Synonym for
	   * [Math.acos]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/acos}.
	   */
	  acos: function acos(toDegrees) {
	    return (toDegrees ? toDegree : 1) * Math.acos(this.$);
	  },


	  /**
	   * @member {Number} Num#acosh
	   * @public
	   * @readonly
	   * @returns {Number} Hyperbolic arccosine.
	   * @description Synonym for
	   * [Math.acosh]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/acosh}.
	   */
	  'get acosh': function getAcosh() {
	    var number = this.$;

	    return Math.log(number + Math.sqrt(number * number - 1));
	  },


	  /**
	   * @member {Number} Num#asinh
	   * @public
	   * @readonly
	   * @returns {Number} Hyperbolic arcsine.
	   * @description Synonym for
	   * [Math.asinh]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/asinh}.
	   */
	  'get asinh': function getAsinh() {
	    var number = this.$;

	    return Math.log(number + Math.sqrt(number * number + 1));
	  },


	  /**
	   * @member {Function} Num#asin
	   * @public
	   * @param {Boolean|*} [toDegrees = false] If it is truthy the return value is transformed into degrees.
	   * @returns {Number} Arcsine of the number.
	   * @description Synonym for
	   * [Math.asin]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/asin}.
	   */
	  asin: function asin(toDegrees) {
	    return (toDegrees ? toDegree : 1) * Math.asin(this.$);
	  },


	  /**
	   * @member {Function} Num#atan
	   * @public
	   * @param {Boolean|*} [toDegrees = false] If it is truthy the return value is transformed into degrees.
	   * @returns {Number} Arcsine of the number.
	   * @description Synonym for
	   * [Math.atan]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/atan}.
	   */
	  atan: function atan(toDegrees) {
	    return (toDegrees ? toDegree : 1) * Math.atan(this.$);
	  },


	  /**
	   * @member {Number} Num#atanh
	   * @public
	   * @readonly
	   * @returns {Number} Hyperbolic arctangent.
	   * @description Synonym for
	   * [Math.atanh]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/atanh}.
	   */
	  'get atanh': function getAtanh() {
	    var number = this.$;

	    return Math.log((1 + number) / (1 - number)) / 2;
	  },


	  /**
	   * @member {Number} Num#cbrt
	   * @public
	   * @readonly
	   * @returns {Number} Cube root.
	   * @description Synonym for
	   * [Math.cbrt]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/cbrt}.
	   */
	  'get cbrt': function getCbrt() {
	    var cbrt = Math.pow(Math.abs(this.$), 1 / 3);

	    return this.$ > 0 ? cbrt : -cbrt;
	  },


	  /**
	   * @member {Number} Num#ceil
	   * @public
	   * @readonly
	   * @returns {Number} Ceil.
	   * @description Synonym for
	   * [Math.ceil]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil}.
	   *
	   * @example
	   * new Num(1.1).ceil;  // 2
	   * new Num(-1.1).ceil; // -1
	   */
	  'get ceil': function getCeil() {
	    return Math.ceil(this.$);
	  },


	  /**
	   * @member {Function} Num#cos
	   * @public
	   * @param {Boolean|*} [asDegrees = false] If it is truthy the number is treated as a degree value.
	   * @returns {Number} Cosine of the number.
	   * @description Synonym for
	   * [Math.cos]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/cos}.
	   */
	  cos: function cos(asDegrees) {
	    return Math.cos((asDegrees ? toRadian : 1) * this.$);
	  },


	  /**
	   * @member {Number} Num#cosh
	   * @public
	   * @readonly
	   * @returns {Number} Hyperbolic cosine.
	   * @description Synonym for
	   * [Math.cosh]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/cosh}.
	   */
	  'get cosh': function getCosh() {
	    var exp = this.exp;

	    return (exp + 1 / exp) / 2;
	  },


	  /**
	   * @member {Number} Num#cube
	   * @public
	   * @readonly
	   * @returns {Number} Cube of the number.
	   * @description Cube of the number.
	   *
	   * @example
	   * new Num(2).cube;  // 8
	   * new Num(-3).ceil; // -27
	   */
	  'get cube': function getCube() {
	    return this.$ * this.$ * this.$;
	  },


	  /**
	   * @member {Number} Num#exp
	   * @public
	   * @readonly
	   * @returns {Number} Exponent.
	   * @description Synonym for
	   * [Math.exp]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/exp}.
	   */
	  'get exp': function getExp() {
	    return Math.exp(this.$);
	  },


	  /**
	   * @member {Number} Num#floor
	   * @public
	   * @readonly
	   * @returns {Number} Floor.
	   * @description Synonym for
	   * [Math.floor]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/floor}.
	   *
	   * @example
	   * new Num(1.1).floor;  // 1
	   * new Num(-1.1).floor; // -2
	   */
	  'get floor': function getFloor() {
	    return Math.floor(this.$);
	  },


	  /**
	   * @member {Function} Num#interval
	   * @public
	   * @param {Function} func - Function that is called every <number> milliseconds.
	   * @returns {Function} Function that aborts the interval. The context of the function (if it's not already bound)
	   * is the object with tha abort method.
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
	  interval: function interval(func) {
	    (0, _helpers.validate)([func], ['function'], 'Num#interval');

	    func = new _Func2.default(func).bindContext({ abort: abort });

	    var number = this.$;
	    var args = [].slice.call(arguments, 1);

	    var timeout = void 0;
	    var aborted = void 0;

	    (function interval() {
	      func.apply(null, args);

	      if (!aborted) {
	        timeout = setTimeout(interval, number);
	      }
	    })();

	    return abort;

	    function abort() {
	      aborted = true;

	      return clearTimeout(timeout);
	    }
	  },


	  /**
	   * @member {Number} Num#ln
	   * @public
	   * @readonly
	   * @returns {Number} Natural logarithm.
	   * @description Synonym for
	   * [Math.log]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/log}.
	   */
	  'get ln': function getLn() {
	    return Math.log(this.$);
	  },


	  /**
	   * @member {Function} Num#log
	   * @public
	   * @param {Number} number - Number to get logarithm of.
	   * @returns {Number} Logarithm of the argument number to the number base.
	   * @description Returns the logarithm of the argument number to the number base.
	   *
	   * @example
	   * new Num(2).log(16);  // 4
	   * new Num(3).log(243); // 5
	   */
	  log: function log(number) {
	    return Math.log(number) / Math.log(this.$);
	  },


	  /**
	   * @member {Number} Num#log2
	   * @public
	   * @readonly
	   * @returns {Number} Base 2 logarithm.
	   * @description Synonym for
	   * [Math.log2]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/log2}.
	   */
	  'get log2': function getLog2() {
	    return this.ln / ln2;
	  },


	  /**
	   * @member {Number} Num#log10
	   * @public
	   * @readonly
	   * @returns {Number} Base 10 logarithm.
	   * @description Synonym for
	   * [Math.log10]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/log10}.
	   */
	  'get log10': function getLog10() {
	    return this.ln / ln10;
	  },


	  /**
	   * @member {Function} Num#pow
	   * @public
	   * @param {Number} power - Power the number should be raised to.
	   * @returns {Number} The number to the <power> power.
	   * @description Synonym for
	   * [Math.pow]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/pow}.
	   *
	   * @example
	   * new Num(4).pow(.5); // 2
	   * new Num(3).pow(2);  // 9
	   */
	  pow: function pow(power) {
	    return Math.pow(this.$, power);
	  },


	  /**
	   * @member {Function} Num#root
	   * @public
	   * @param {Number} power - Power the number should be raised to.
	   * @returns {Number} The <power> root of the number.
	   * @description Synonym for number.pow(1 / power);
	   *
	   * @example
	   * new Num(4).root(2);   // 0.5
	   * new Num(243).root(5); // 3
	   */
	  root: function root(power) {
	    return Math.pow(this.$, 1 / power);
	  },


	  /**
	   * @member {Number} Num#round
	   * @public
	   * @readonly
	   * @returns {Number} Rounded number.
	   * @description Synonym for
	   * [Math.round]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/round}.
	   *
	   * @example
	   * new Num(1.1).floor;  // 1
	   * new Num(-1.1).floor; // -1
	   * new Num(1.5).floor;  // 2
	   */
	  'get round': function getRound() {
	    return Math.round(this.$);
	  },


	  /**
	   * @member {Number} Num#sign
	   * @public
	   * @readonly
	   * @returns {Number} Number sign.
	   * @description Synonym for
	   * [Math.sign]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/sign}.
	   */
	  'get sign': function getSign() {
	    var number = this.$;

	    if (!number) {
	      return number;
	    }

	    return number > 0 ? 1 : -1;
	  },


	  /**
	   * @member {Function} Num#sin
	   * @public
	   * @param {Boolean|*} [asDegrees = false] If it is truthy the number is treated as a degree value.
	   * @returns {Number} Sine of the number.
	   * @description Synonym for
	   * [Math.sin]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/sin}.
	   */
	  sin: function sin(asDegrees) {
	    return Math.sin((asDegrees ? toRadian : 1) * this.$);
	  },


	  /**
	   * @member {Number} Num#sinh
	   * @public
	   * @readonly
	   * @returns {Number} Hyperbolic sine.
	   * @description Synonym for
	   * [Math.sinh]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/sinh}.
	   */
	  'get sinh': function getSinh() {
	    var exp = this.exp;

	    return (exp - 1 / exp) / 2;
	  },


	  /**
	   * @member {Number} Num#sq
	   * @public
	   * @readonly
	   * @returns {Number} Squared number.
	   * @description The square of the number.
	   *
	   * @example
	   * new Num(2).sq;  // 4
	   * new Num(-3).sq; // 9
	   */
	  'get sq': function getSq() {
	    return this.$ * this.$;
	  },


	  /**
	   * @member {Number} Num#sqrt
	   * @public
	   * @readonly
	   * @returns {Number} Square root.
	   * @description Synonym for
	   * [Math.sqrt]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/sqrt}.
	   */
	  'get sqrt': function getSqrt() {
	    return Math.sqrt(this.$);
	  },


	  /**
	   * @member {Function} Num#tan
	   * @public
	   * @param {Boolean|*} [asDegrees = false] If it is truthy the number is treated as a degree value.
	   * @returns {Number} Tangent of the number.
	   * @description Synonym for
	   * [Math.tan]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/tan}.
	   */
	  tan: function tan(asDegrees) {
	    return Math.tan((asDegrees ? toRadian : 1) * this.$);
	  },


	  /**
	   * @member {Number} Num#tanh
	   * @public
	   * @readonly
	   * @returns {Number} Hyperbolic tangent.
	   * @description Synonym for
	   * [Math.tanh]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/tanh}.
	   */
	  'get tanh': function getTanh() {
	    var number = this.$;

	    if (!(0, _helpers.isFinite)(number)) {
	      return this.sign;
	    }

	    var exp = Math.exp(2 * number);

	    return (exp - 1) / (exp + 1);
	  },


	  /**
	   * @member {Function} Num#timeout
	   * @public
	   * @param {*} [value] - Value to be resolved by the promise.
	   * @returns {Promise} Promise that could be aborted.
	   * @description Promise-based analogue of
	   * {@link https://developer.mozilla.org/en/docs/Web/API/WindowTimers/setTimeout}.
	   *
	   * @example
	   * new Num(50).timeout('resolved').then((value) => {
	   *   console.log(value); // 'resolved'
	   * });
	   *
	   * const promise = new Num(50).timeout();
	   * promise.abort();
	   */
	  timeout: function timeout(value) {
	    var _this = this;

	    var timeout = void 0;
	    var reject = void 0;

	    var promise = new _Promise2.default(function (resolve, rej) {
	      reject = rej;
	      timeout = setTimeout(resolve, _this.$, value);
	    });

	    promise.abort = function abort() {
	      clearTimeout(timeout);

	      reject(new Error('Timeout was aborted'));

	      return this;
	    };

	    return promise;
	  },


	  /**
	   * @member {Function} Num#toBase
	   * @public
	   * @param {Number} [base = 10] - Base that the number should inverted to.
	   * @returns {String} A string representation of the number in <base> base.
	   * @description Synonym for
	   * [Number#toString]
	   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Number/toString}.
	   *
	   * @example
	   * new Num(4).toBase(2); // 100
	   * new Num(3).toBase();  // 3
	   */
	  toBase: function toBase() {
	    var base = arguments.length <= 0 || arguments[0] === undefined ? 10 : arguments[0];

	    return this.$.toString(base);
	  },


	  /**
	   * @member {Function} Num#toExponential
	   * @public
	   * @param {Number} [fractionDigits] - See
	   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Number/toExponential}.
	   * @returns {String} A string representation of the number in the exponential format.
	   * @description Synonym for
	   * [Number#toExponential]
	   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Number/toExponential}.
	   */
	  toExponential: function toExponential(fractionDigits) {
	    return this.$.toExponential(fractionDigits);
	  },


	  /**
	   * @member {Function} Num#toFixed
	   * @public
	   * @param {Number} [digits] - See
	   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed}.
	   * @returns {String} Fixed-point formatted number.
	   * @description Synonym for
	   * [Number#toFixed]
	   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed}.
	   */
	  toFixed: function toFixed(digits) {
	    return this.$.toFixed(digits);
	  },


	  /**
	   * @member {Function} Num#toPrecision
	   * @public
	   * @param {Number} [precision] - See
	   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Number/toPrecision}.
	   * @returns {String} A string representation of the number to the specified precision.
	   * @description Synonym for
	   * [Number#toPrecision]
	   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Number/toPrecision}.
	   */
	  toPrecision: function toPrecision(precision) {
	    return this.$.toPrecision(precision);
	  },
	  valueOf: function valueOf() {
	    return Number(this.$);
	  }
	}, _helpers.Symbol.toStringTag, 'Num'));

	_constructors2.default[1].push({
	  check: _helpers.isNumber,
	  cls: Num
	});

	/**
	 * @function rand
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
	  var start = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	  var end = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

	  return start + (end - start) * Math.random();
	}

	/**
	 * @function random
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
	  (0, _helpers.validate)([start, end], ['intLike', 'intLike'], 'random');

	  if (end <= start) {
	    throw new Error('The second argument must be greater than the first!');
	  }

	  return Math.floor(rand(start, end + 1));
	}

	exports.default = Num;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; /**
	                                                                                                                                                                                                                                                   * @module Func
	                                                                                                                                                                                                                                                   * @private
	                                                                                                                                                                                                                                                   * @mixin
	                                                                                                                                                                                                                                                   * @description Exports Func class.
	                                                                                                                                                                                                                                                   */

	exports.Func = Func;
	exports.method = method;
	exports.noop = noop;
	exports.self = self;

	var _Super = __webpack_require__(8);

	var _Super2 = _interopRequireDefault(_Super);

	var _Promise = __webpack_require__(21);

	var _Promise2 = _interopRequireDefault(_Promise);

	var _constructors = __webpack_require__(6);

	var _constructors2 = _interopRequireDefault(_constructors);

	var _helpers = __webpack_require__(9);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
	function Func() {
	  var func = arguments.length <= 0 || arguments[0] === undefined ? function () {} : arguments[0];

	  (0, _helpers.checkClassInstance)(this, Func, 'Func');

	  if (func instanceof Func) {
	    return func;
	  }

	  function proxy() {
	    var _this = this,
	        _arguments = arguments;

	    if (++proxy.$$.called < proxy.$$.canBeCalled) {
	      var _ret = function () {
	        var _proxy$$$ = proxy.$$;
	        var before = _proxy$$$.before;
	        var after = _proxy$$$.after;
	        var sync = _proxy$$$.sync;
	        var contextLocked = _proxy$$$.contextLocked;
	        var _proxy$$$2 = proxy.$$;
	        var context = _proxy$$$2.context;
	        var args = _proxy$$$2.args;

	        var ret = void 0;

	        context = contextLocked ? context : context || _this;
	        args = args.concat((0, _helpers.toArray)(_arguments));

	        if (sync) {
	          (0, _helpers.iterate)(before, function (middleware) {
	            args = middleware.call(context, (0, _helpers.toArray)(args), proxy);
	          });

	          ret = func.apply(context, (0, _helpers.toArray)(args));

	          (0, _helpers.iterate)(after, function (middleware) {
	            ret = middleware.call(context, ret, proxy);
	          });

	          return {
	            v: ret
	          };
	        }

	        var promise = _Promise2.default.resolve(args);

	        (0, _helpers.iterate)(before, function (middleware) {
	          promise = promise.then(function (args) {
	            return middleware.apply(null, (0, _helpers.toArray)(args));
	          });
	        });

	        promise = promise.then(function (args) {
	          return func.apply(context, (0, _helpers.toArray)(args));
	        });

	        (0, _helpers.iterate)(after, function (middleware) {
	          promise = promise.then(function (ret) {
	            return middleware(ret);
	          });
	        });

	        return {
	          v: promise
	        };
	      }();

	      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	    }
	  }

	  /**
	   * @member {Object} Func#$$
	   * @protected
	   * @property {Array} after - After middleware array.
	   * @property {Array} args - Locked and bound arguments.
	   * @property {Array} argsLocked - Locked arguments.
	   * @property {Array} before - Before middleware array.
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
	   * @public
	   * @description Original function.
	   */
	  Object.defineProperty(proxy, '$', { value: func });
	  Object.setPrototypeOf(proxy, Func.prototype);

	  return proxy;
	}

	(0, _helpers.inherits)(Func, _Super2.default);

	(0, _helpers.defineProperties)(Func.prototype, _defineProperty({
	  /**
	   * @member {Function} Func#after
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

	  after: function after(middleware) {
	    var afterAll = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

	    (0, _helpers.validate)([middleware], ['function'], 'Func#after');

	    var func = this.$$;

	    if (afterAll) {
	      func.after.push(middleware);
	    } else {
	      func.after.unshift(middleware);
	    }

	    return this;
	  },


	  /**
	   * @member {Function} Func#apply
	   * @public
	   * @param {*} [context] - Context to call with.
	   * @param {(Array|Arguments)} args - Arguments to call with.
	   * @returns {*} Return of function call.
	   * @description Synonym for
	   * [Function#apply]
	   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Function/apply}.
	   */
	  apply: function apply() {
	    return function () {}.apply.apply(this, arguments);
	  },


	  /**
	   * @member {Function} Func#async
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
	  async: function async() {
	    var condition = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

	    this.$$.sync = !condition;

	    return this;
	  },


	  /**
	   * @member {Function} Func#before
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
	  before: function before(middleware) {
	    var beforeAll = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

	    (0, _helpers.validate)([middleware], ['function'], 'Func#before');

	    var func = this.$$;

	    if (beforeAll) {
	      func.before.unshift(middleware);
	    } else {
	      func.before.push(middleware);
	    }

	    return this;
	  },


	  /**
	   * @member {Function} Func#bind
	   * @public
	   * @param {*} context - Context to bind.
	   * @param {(Array|Arguments|*)} args - Arguments to bind.
	   * @returns {Func} Returns this.
	   * @description Composition of {@link Func#bindContext} and {@link Func#bindArgs}.
	   *
	   * @example
	   * const func = new Func(function (a, b) {
	   *   return this.a + a + b;
	   * }).bind({ a: 2 }, [1]);
	   *
	   * func(1); // 4
	   * func(3); // 6
	   */
	  bind: function bind(context, args) {
	    return this.bindContext(context).bindArgs(args);
	  },


	  /**
	   * @member {Function} Func#bindArgs
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
	  bindArgs: function bindArgs(args) {
	    var func = this.$$;

	    func.args = func.args.concat((0, _helpers.toArray)(args));

	    return this;
	  },


	  /**
	   * @member {Function} Func#bindContext
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
	  bindContext: function bindContext(context) {
	    var func = this.$$;

	    if (!func.contextLocked) {
	      func.context = context;
	    }

	    return this;
	  },


	  /**
	   * @member {Function} Func#call
	   * @public
	   * @param {*} [context] - Context to call with.
	   * @param {...*} args - Arguments to call with.
	   * @returns {*} Return of function call.
	   * @description Synonym for
	   * [Function#call]
	   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Function/call}.
	   */
	  call: function call() {
	    return function () {}.call.apply(this, arguments);
	  },


	  /**
	   * @member Func#called
	   * @public
	   * @returns {Number} How many times the function was called.
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
	  'get called': function getCalled() {
	    return this.$$.called;
	  },


	  /**
	   * @member {Function} Func#canBeCalled
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
	  canBeCalled: function canBeCalled(times) {
	    this.$$.canBeCalled = times;

	    return this;
	  },


	  /**
	   * @member {Function} Func#limitArgsTo
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
	  limitArgsTo: function limitArgsTo(number) {
	    return this.before(function (args) {
	      return args.slice(0, number);
	    }, false);
	  },


	  /**
	   * @member {Function} Func#lock
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
	  lock: function lock(context, args) {
	    return this.lockContext(context).lockArgs(args);
	  },


	  /**
	   * @member {Function} Func#lockArgs
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
	  lockArgs: function lockArgs(args) {
	    var func = this.$$;

	    func.args = func.argsLocked = func.argsLocked.concat((0, _helpers.toArray)(args));

	    return this;
	  },


	  /**
	   * @member {Function} Func#lockContext
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
	  lockContext: function lockContext(context) {
	    var func = this.$$;

	    if (!func.contextLocked) {
	      func.context = context;
	      func.contextLocked = true;
	    }

	    return this;
	  },


	  /**
	   * @member {Function} Func#timing
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
	  timing: function timing(mark) {
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
	  },
	  toString: function toString() {
	    return function () {}.toString.call(this.$);
	  },


	  /**
	   * @member {Function} Func#unbind
	   * @public
	   * @returns {Func} Returns this.
	   * @description Composition of {@link Func#unbindContext} and {@link Func#unbindArgs}.
	   *
	   * @example
	   * const func = new Func(function (a) {
	   *   return this.foo + ' & ' +  a;
	   * }).bind({ foo: 2 }, [1]);
	   *
	   * func(); // 2 & 1
	   *
	   * func.unbind();
	   *
	   * func(); // 'undefined & undefined'
	   */
	  unbind: function unbind() {
	    return this.unbindContext().unbindArgs();
	  },


	  /**
	   * @member {Function} Func#unbindArgs
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
	  unbindArgs: function unbindArgs() {
	    var func = this.$$;

	    func.args = func.argsLocked;

	    return this;
	  },


	  /**
	   * @member {Function} Func#unbindContext
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
	  unbindContext: function unbindContext() {
	    var func = this.$$;

	    if (!func.contextLocked) {
	      func.context = null;
	    }

	    return this;
	  }
	}, _helpers.Symbol.toStringTag, 'Func'));

	_constructors2.default[1].push({
	  check: _helpers.isFunction,
	  cls: Func
	});

	/**
	 * @function method
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
	  var args = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

	  return function (x) {
	    return x[method].apply(x, (0, _helpers.toArray)(args));
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
	 * @function self
	 * @returns {*} First argument itself.
	 * @description Function that returns the first argument.
	 *
	 * @example
	 * [1, 2].map(self);                     // [1, 2]
	 * [1, 3, NaN, 0, 7, null].filter(self); // [1, 3, 7]
	 */
	function self() {
	  return arguments[0];
	}

	exports.default = Func;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Str = Str;

	var _D = __webpack_require__(3);

	var _D2 = _interopRequireDefault(_D);

	var _Super = __webpack_require__(8);

	var _Super2 = _interopRequireDefault(_Super);

	var _constructors = __webpack_require__(6);

	var _constructors2 = _interopRequireDefault(_constructors);

	var _regexpSpecialCharacters = __webpack_require__(26);

	var _regexpSpecialCharacters2 = _interopRequireDefault(_regexpSpecialCharacters);

	var _helpers = __webpack_require__(9);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /**
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
	var regexpSpecialsRegexp = new RegExp(new _Super2.default(_regexpSpecialCharacters2.default).word(function (x) {
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
	function Str() {
	  var string = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

	  (0, _helpers.checkClassInstance)(this, Str, 'Str');

	  return (0, _helpers.possibleSuperClassReturn)(this, _Super2.default, [String(string)]);

	  /**
	   * @member {String} Str#$
	   * @public
	   * @description Original string.
	   */
	}

	(0, _helpers.inherits)(Str, _Super2.default);

	(0, _helpers.defineProperties)(Str.prototype, _defineProperty({
	  /**
	   * @member {Function} Str#capitalizeFirst
	   * @public
	   * @returns {Str} Capitalized string.
	   * @description Method capitalizing the first symbol.
	   *
	   * @example
	   * new Str('foo').capitalizeFirst().$; // 'Foo'
	   */

	  capitalizeFirst: function capitalizeFirst() {
	    var string = this.$;

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
	  endsWith: function endsWith(searchString, position) {
	    if (arguments.length < 2) {
	      position = this.$.length;
	    }

	    return this.slice(0, position).revert().startsWith(new Str(searchString).revert().$);
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
	  escapeHTML: function escapeHTML() {
	    var string = this.$;

	    for (var symbol in htmlSpecials) {
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
	  escapeRegExp: function escapeRegExp() {
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
	  in: function _in(object) {
	    if (!(0, _helpers.isObject)(object)) {
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
	  indexOf: function indexOf(searchValue, fromIndex) {
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
	  lastIndexOf: function lastIndexOf(searchValue, fromIndex) {
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
	  'get length': function getLength() {
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
	  match: function match() {
	    var match = this.$.match.apply(this.$, arguments);

	    return (0, _D2.default)(match);
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
	  parseJSON: function parseJSON() {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var callback = arguments[1];

	    if (!arguments.length) {
	      return (0, _D2.default)(JSON.parse(this.$));
	    }

	    if ((0, _helpers.isFunction)(options)) {
	      callback = options;
	      options = {};
	    }

	    var _options = options;
	    var numbers = _options.numbers;
	    var dates = _options.dates;

	    var parsed = JSON.parse(this.$, function (key, value) {
	      if (dates && (0, _helpers.isString)(value) && (0, _helpers.isDateLike)(value) && !(0, _helpers.isNumberLike)(value)) {
	        value = new Date(value);
	      } else if (numbers && (0, _helpers.isNumberLike)(value) && (0, _helpers.isString)(value)) {
	        value = Number(value);
	      }

	      return callback ? callback.apply(this, arguments) : value;
	    });

	    return (0, _D2.default)(parsed);
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
	  repeat: function repeat(times) {
	    (0, _helpers.validate)([times], [['intLike', '>=0']], 'Str#repeat');

	    times = +times;

	    var string = this.$;

	    var s = '';

	    for (var i = 0; i < times; i++) {
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
	  replace: function replace(regexp) {
	    var replacer = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

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
	  replaceString: function replaceString(string) {
	    var replacer = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

	    string = new _Super2.default(string).$;

	    (0, _helpers.validate)([string], ['string'], 'Str#replaceString');

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
	  revert: function revert() {
	    var string = this.$;
	    var str = '';

	    for (var i = string.length - 1; i >= 0; i--) {
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
	  search: function search(regexp) {
	    (0, _helpers.validate)([regexp], ['regexp']);

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
	  slice: function slice(beginSlice, endSlice) {
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
	  split: function split(separator) {
	    return (0, _D2.default)(this.$.split(separator));
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
	  startsWith: function startsWith(searchString) {
	    var position = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

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
	  substr: function substr(start, length) {
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
	  substring: function substring(indexStart, indexEnd) {
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
	  toCamelCase: function toCamelCase() {
	    return new Str(trim(this.$).replace(/[\s\-_\.]+/g, '-').replace(/\-[^\-]/g, function (match) {
	      return match[1].toUpperCase();
	    }).replace(/^[\S]/, function (match) {
	      return match.toLowerCase();
	    }));
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
	  toCapitalCase: function toCapitalCase() {
	    return new Str(trim(this.$).replace(/[\s\-_\.]+/g, ' ').replace(/[\S]/g, function (match) {
	      return match.toLowerCase() === match ? match : ' ' + match;
	    }).replace(/\s[\S]/g, function (match) {
	      return match.toUpperCase();
	    }).replace(/\s+/g, ' ').replace(/^\s/, '').replace(/^[\S]/, function (match) {
	      return match.toUpperCase();
	    }));
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
	  toDotCase: function toDotCase() {
	    return new Str(trim(this.$).replace(/[\s\-_\.]+/g, '.').replace(/[^\.]/g, function (match) {
	      return match.toLowerCase() === match ? match : '.' + match;
	    }).replace(/\.+/g, '.').replace(/^\./, '').toLowerCase());
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
	  toLowerCase: function toLowerCase() {
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
	  toSnakeCase: function toSnakeCase() {
	    return new Str(trim(this.$).replace(/[\s\-_\.]+/g, '_').replace(/[^_]/g, function (match) {
	      return match.toLowerCase() === match ? match : '_' + match;
	    }).replace(/_+/g, '_').replace(/^_/, '').toLowerCase());
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
	  toSpaceCase: function toSpaceCase() {
	    return new Str(trim(this.$).replace(/[\s\-_\.]+/g, ' ').replace(/[\S]/g, function (match) {
	      return match.toLowerCase() === match ? match : ' ' + match;
	    }).replace(/\s+/g, ' ').replace(/^\s/, '').toLowerCase());
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
	  toSpinalCase: function toSpinalCase() {
	    return new Str(trim(this.$).replace(/[\s\-_\.]+/g, '-').replace(/[^\-]/g, function (match) {
	      return match.toLowerCase() === match ? match : '-' + match;
	    }).replace(/\-+/g, '-').replace(/^\-/, '').toLowerCase());
	  },
	  toString: function toString() {
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
	  toUpperCase: function toUpperCase() {
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
	  trim: function trim() {
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
	  trimLeft: function trimLeft() {
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
	  trimRight: function trimRight() {
	    return new Str(this.$.replace(/[\s\ufeff\u00a0]+$/, ''));
	  }
	}, _helpers.Symbol.toStringTag, 'Str'));

	function trim(string) {
	  return string.replace(/^[\s\-_\.]+|[\s\-_\.]+$/g, '');
	}

	_constructors2.default[2].push({
	  check: _helpers.isString,
	  cls: Str
	});

	exports.default = Str;

/***/ },
/* 26 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
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
	exports.default = ['.', '+', '*', '?', '(', ')', '[', ']', '{', '}', '<', '>', '^', '$', '!', '=', ':', '-', '|', ',', '\\'];

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Switcher = Switcher;
	exports.switcher = switcher;
	exports.when = when;

	var _helpers = __webpack_require__(9);

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /**
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
	 * @class Switcher
	 * @public
	 * @param {Object} [cases = {}] - Object of cases.
	 * @param {SwitcherMode} [mode = 'equals'] - Switcher mode.
	 * @param {*} [def] - Switcher default value.
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
	 * // See {@link switcher} examples for more information.
	 */
	function Switcher() {
	  var cases = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	  var mode = arguments.length <= 1 || arguments[1] === undefined ? 'equals' : arguments[1];
	  var def = arguments[2];

	  (0, _helpers.checkClassInstance)(this, Switcher, 'Switcher');

	  if (arguments.length && !(0, _helpers.isObject)(cases)) {
	    if (arguments.length !== 1) {
	      def = mode;
	    }

	    mode = cases;
	    cases = {};
	  }

	  var eventualCases = [];

	  (0, _helpers.iterate)(cases, function (value, Case) {
	    eventualCases.push({ case: Case, value: value });
	  });

	  function switcher(value) {
	    var args = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
	    var _switcher$$$ = switcher.$$;
	    var mode = _switcher$$$.mode;
	    var def = _switcher$$$.default;
	    var cases = _switcher$$$.cases;


	    var ret = (0, _helpers.iterate)(cases, function (_ref) {
	      var val = _ref.value;
	      var Case = _ref.case;

	      if (mode === 'boolean' && Case ||
	      /* eslint eqeqeq: 0 */
	      mode === 'equals' && Case == value || mode === 'strictEquals' && Case === value || mode === 'call' && Case(value)) {
	        return { case: Case, value: val };
	      }
	    });

	    if ((0, _helpers.isUndefined)(ret)) {
	      ret = { value: def };
	    }

	    if (!(0, _helpers.isFunction)(ret.value)) {
	      return ret.value;
	    }

	    args = (0, _helpers.toArray)(args, true);
	    args.push(value, ret.case);

	    return ret.value.apply(null, (0, _helpers.toArray)(args));
	  }

	  /**
	   * @member {Object} Switcher#$$
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
	      default: def
	    }
	  });
	  Object.setPrototypeOf(switcher, Switcher.prototype);

	  return switcher;
	}

	(0, _helpers.inherits)(Switcher, Function);

	(0, _helpers.defineProperties)(Switcher.prototype, _defineProperty({
	  /**
	   * @member {Function} Switcher#case
	   * @public
	   * @param {(*|Array)} cases - Case or an array of cases.
	   * @param {(*|Function)} value - Value that has to be assigned or a function
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

	  case: function _case(cases, value) {
	    var _this = this;

	    if (!(0, _helpers.isArray)(cases)) {
	      cases = [cases];
	    }

	    (0, _helpers.iterate)(cases, function (Case) {
	      _this.$$.cases.push({ case: Case, value: value });
	    });

	    return this;
	  },


	  /**
	   * @member {Function} Switcher#default
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
	  default: function _default(def) {
	    this.$$.default = def;

	    return this;
	  },


	  /**
	   * @member {Function} Switcher#mode
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
	  mode: function mode(_mode) {
	    this.$$.mode = _mode;

	    return this;
	  }
	}, _helpers.Symbol.toStringTag, 'Switcher'));

	/**
	 * @function switcher
	 * @public
	 * @param {...*} args - Arguments that are passed to a Switcher constructor.
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
	 * }, 'equals', (array, value) => array[value]);
	 * const array = [1, 2, 3, 4];
	 * 
	 * sw('first', [array]); // 1
	 * sw('last', [array]);  // 4
	 * sw(1, [array]);       // 2
	 * sw(2, [array]);       // 3
	 */
	function switcher() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  return new (Function.prototype.bind.apply(Switcher, [null].concat(args)))();
	}

	/**
	 * @function when
	 * @public
	 * @param {Boolean|*} condition - Condition used for returning the proper value.
	 * @param {*} value1 - Value if the condition is truthy.
	 * @param {*} value2 - Value if the condition is falsey.
	 * @returns {*} value1 or value2.
	 * @description Synonym for
	 * [ternary operator]
	 * {@link https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Operators/Conditional_Operator}.
	 * 
	 * @example
	 * when(true, 'true', 'false'); // 'true'
	 */
	function when(condition, value1, value2) {
	  return condition ? value1 : value2;
	}

	exports.default = Switcher;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Super = __webpack_require__(8);

	var _Super2 = _interopRequireDefault(_Super);

	var _Str = __webpack_require__(25);

	var _Str2 = _interopRequireDefault(_Str);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @module constants/formats
	 * @private
	 * @description Exports different types of formatting for {@link Date#format}.
	 */

	var zero = new _Str2.default('0');
	var daysOfTheWeekNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	var daysOfTheWeekAliases = new _Super2.default(daysOfTheWeekNames).map(function (value) {
	  return value.slice(0, 3);
	}).$;
	var monthsNames = ['January', 'February', 'March', 'April', 'May', 'June', 'Jule', 'August', 'September', 'October', 'November', 'December'];
	var monthsAliases = new _Super2.default(monthsNames).map(function (value) {
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
	exports.default = [{
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

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.find = exports.head = exports.body = exports.html = exports.document = exports.window = exports.Elem = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } }; /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             * @module Elem
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             * @private
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             * @mixin
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             * @description Exports Elem class.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             */

	exports.loadImages = loadImages;
	exports.parseHTML = parseHTML;
	exports.px = px;

	var _Super = __webpack_require__(8);

	var _Super2 = _interopRequireDefault(_Super);

	var _Arr2 = __webpack_require__(19);

	var _Arr3 = _interopRequireDefault(_Arr2);

	var _Func = __webpack_require__(24);

	var _Func2 = _interopRequireDefault(_Func);

	var _Promise = __webpack_require__(21);

	var _Promise2 = _interopRequireDefault(_Promise);

	var _Str = __webpack_require__(25);

	var _Str2 = _interopRequireDefault(_Str);

	var _Switcher = __webpack_require__(27);

	var _constructors = __webpack_require__(6);

	var _constructors2 = _interopRequireDefault(_constructors);

	var _appliedRegExps = __webpack_require__(30);

	var _appliedRegExps2 = _interopRequireDefault(_appliedRegExps);

	var _css = __webpack_require__(31);

	var _css2 = _interopRequireDefault(_css);

	var _elements = __webpack_require__(32);

	var _elements2 = _interopRequireDefault(_elements);

	var _helpers = __webpack_require__(9);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * @callback ElemValueCallback
	 * @public
	 * @param {String} value - Old value.
	 * @param {Number} index - Index in the set of the elements.
	 * @param {Elem} elem - Current element.
	 */

	var nativeDocument = global.document;
	var empty = nativeDocument.createElement('div');
	var node = htmlElement(Node.prototype);
	var element = htmlElement(Element.prototype);
	var classes = {};
	var attrs = {};
	var refSwitcher = (0, _Switcher.switcher)('strictEquals', 'href').case(['img', 'script', 'iframe', 'audio', 'video'], 'src').case(['form'], 'action');

	var Elem = function (_Arr) {
	  _inherits(Elem, _Arr);

	  /**
	   * @class Elem
	   * @extends Super
	   * @public
	   * @param {Element|Element[]} [elem = []] - An element or elements to wrap.
	   * @returns {Elem} Instance of Elem.
	   * @description Wrap of an element or elements.
	   *
	   * @example
	   * const elem = new Elem(document.getElementById('id'));
	   */

	  function Elem() {
	    var elem = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

	    _classCallCheck(this, Elem);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Elem).call(this, function () {
	      elem = new _Super2.default(elem).$;

	      if (!elem) {
	        elem = [];
	      } else if ((0, _helpers.isElement)(elem)) {
	        elem = [elem];
	      }

	      return (0, _helpers.toArray)(elem, true);
	    }()));

	    _this.forEach(function (elem) {
	      if (!elem.hasOwnProperty('domcData')) {
	        /**
	         * @member Node#domcData
	         * @protected
	         * @property {String} previousDisplay - Parameter used for hiding/showing elements.
	         * @property {Object.<String, Super>} removeListeners - Parameter used for remove event listeners.
	         * @property {Super|undefined} rules - Parameter used for css styles.
	         * @description D data.
	         */
	        _get(Object.getPrototypeOf(Elem.prototype), 'value', _this).call(_this, 'domcData', {
	          previousDisplay: '',
	          removeListeners: {},
	          rules: _this.name === 'style' && new _Super2.default(_this.prop('sheet').cssRules)
	        });
	      }
	    });

	    /**
	     * @member {Element[]} Elem#$
	     * @public
	     * @description Initial element set.
	     */
	    return _this;
	  }

	  /**
	   * @method Elem#absolute
	   * @public
	   * @returns {Elem} Returns this.
	   * @description Shorthand for elem.position('absolute').
	   *
	   * @example
	   * elem.absolute();
	   */


	  _createClass(Elem, [{
	    key: 'absolute',
	    value: function absolute() {
	      return this.position('absolute');
	    }

	    /**
	     * @method Elem#addClasses
	     * @public
	     * @param {...String} classes - Classes to add.
	     * @returns {Elem} Returns this.
	     * @description Method for adding classes to the all the elements in the set.
	     *
	     * @example
	     * elem.addClasses('red', 'round');
	     */

	  }, {
	    key: 'addClasses',
	    value: function addClasses() {
	      var _arguments = arguments;

	      return this.forEach(function (elem) {
	        var list = elem.classList;

	        list.add.apply(list, _arguments);
	      });
	    }

	    /**
	     * @method Elem#addHTML
	     * @public
	     * @param {String} html - HTML to add.
	     * @returns {Elem} Returns this.
	     * @description Method for adding HTML to the all elements in the set.
	     *
	     * @example
	     * elem.addHTML('<div>1</div>');
	     */

	  }, {
	    key: 'addHTML',
	    value: function addHTML(html) {
	      return this.forEach(function (elem) {
	        elem.innerHTML += html;
	      });
	    }

	    /**
	     * @method Elem#addRule
	     * @public
	     * @param {String} name - Name of the rule.
	     * @param {String} selector - Selector for the rule
	     * @param {Object.<String, String>} style - Style for the selector.
	     * @returns {Elem} Returns this.
	     * @description Method for adding css styles into the first style tag in the set.
	     *
	     * @example
	     * style.addRule('img-size', 'img.square', {
	     *   width: '40px !important',
	     *   height: '40px !important'
	     * });
	     */

	  }, {
	    key: 'addRule',
	    value: function addRule(name, selector, style) {
	      this.some(function (elem) {
	        if (htmlElement(elem).name === 'style') {
	          var sheet = elem.sheet;
	          var length = sheet.cssRules.length;


	          sheet.insertRule(selector + ' {\n' + new _Super2.default(style).word(function (value, property) {
	            return property + ': ' + value + ';\n';
	          }) + '}', length);
	          sheet.cssRules[length].domcData = { name: name };

	          return true;
	        }
	      });

	      return this;
	    }

	    /**
	     * @method Elem#addText
	     * @public
	     * @param {String} text - Text to add.
	     * @returns {Elem} Returns this.
	     * @description Method for adding text to the all elements in the set.
	     *
	     * @example
	     * elem.addText('123');
	     */

	  }, {
	    key: 'addText',
	    value: function addText(text) {
	      return this.forEach(function (elem) {
	        elem.appendChild(nativeDocument.createTextNode(text));
	      });
	    }

	    /**
	     * @method Elem#apply
	     * @public
	     * @param {...String} strings - Strings to apply.
	     * @returns {Elem} Returns this.
	     * @description Method that is a shorthand for many other methods.
	     * All shorthands can be separated with space and written within one string.
	     *
	     * @example
	     * elem.apply(
	     *   '#id .c1 .c2 @border(1px solid black) $disabled $attr(some value) *(Click me!)'
	     * );
	     * // shorthand for
	     * // elem
	     * //   .id('id')
	     * //   .addClasses('c1', 'c2')
	     * //   .border('1px solid black')
	     * //   .disabled()
	     * //   .attr('attr', 'some value')
	     * //   .text('Click me!');
	     * // There is a full list of possible types of syntax below...
	     *
	     * elem.apply('#id');                    // shorthand for elem.id('id');
	     * elem.apply('.c1 .c2');                // shorthand for elem.addClasses('c1', 'c2');
	     * elem.apply('-.c1 -.c2');              // shorthand for elem.removeClasses('c1', 'c2');
	     * elem.apply('-@float -@display');      // shorthand for elem.removeCSS('float', 'display');
	     * elem.apply('-$a1 -$a2');              // shorthand for elem.removeAttr('a1', 'a2');
	     * elem.apply('*(some text)');           // shorthand for elem.text('set text');
	     * elem.apply('&(<div>1</div>)');        // shorthand for elem.html('<div>1</div>');
	     * elem.apply('-a');                     // shorthand for elem.absolute();
	     * elem.apply('-b');                     // shorthand for elem.bold();
	     * elem.apply('-c');                     // shorthand for elem.centerText();
	     * elem.apply('-f');                     // shorthand for elem.fixed();
	     * elem.apply('-h');                     // shorthand for elem.hide();
	     * elem.apply('-i');                     // shorthand for elem.italic();
	     * elem.apply('-r');                     // shorthand for elem.relative();
	     * elem.apply('-s');                     // shorthand for elem.show();
	     * elem.apply('-t');                     // shorthand for elem.opacity(0);
	     * elem.apply('-u');                     // shorthand for elem.underline();
	     * elem.apply('@float(right)');          // shorthand for elem.css('float', 'right');
	     * elem.apply('@transform(scale(5px))'); // shorthand for elem.css('float', 'right');
	     * elem.apply('@margin(2px 2px)');       // shorthand for elem.css('margin', '2px 2px');
	     * elem.apply('@marginLeft(2px)');       // shorthand for elem.css('marginLeft', '2px 2px');
	     * elem.apply('@margin-left(2px)');      // shorthand for elem.css('margin-left', '2px 2px');
	     * elem.apply('$attr(some value)');      // shorthand for elem.attr('attr', 'some value');
	     * elem.apply('$attr');                  // shorthand for elem.attr('attr', '');
	     */

	  }, {
	    key: 'apply',
	    value: function apply() {
	      var _this2 = this;

	      var applied = void 0;
	      var np = void 0;
	      var value = void 0;
	      var slice = void 0;

	      (0, _helpers.iterate)(String(new _Arr3.default(arguments).join(' ')).split(/(\s+)/), function (string) {
	        if (!applied) {
	          np = _appliedRegExps2.default[string.slice(0, 1)];
	          slice = 1;

	          if (np && !(0, _helpers.isFunction)(np)) {
	            np = np[string.slice(1, 1)];
	            slice = 2;
	          }

	          if (/^\s+$/.test(string) || !np) {
	            return;
	          }

	          value = string.slice(slice).match(/^[\(\)]+/);

	          if (!value) {
	            return;
	          }

	          applied = { name: value[0], args: string.slice(slice + value[0].length), np: np };
	        }

	        if (/^\s+$/.test(string)) {
	          applied.args += string;
	        }

	        if (!applied.args || /^\([\s\S]+]\)$/.test(applied.args)) {
	          applied.np(_this2, applied.name, applied.args.replace(/^\(|\)$/g, ''));
	          applied = null;
	        }
	      });

	      return this;
	    }

	    /**
	     * @method Elem#attr
	     * @public
	     * @param {String|Object.<String, String|ElemValueCallback>} [attr] - Name of the attribute to get or
	     * an object of the format { [attrName]: value, ... } to set attributes.
	     * @param {String|ElemValueCallback} [value] - If the first argument is a string
	     * it should be a value to set for that attribute.
	     * @returns {Super|String|Elem} If no arguments passed, D-Wrap of attributes of the first element in the set
	     * returned, if 1 string argument is passed the value of the attribute of the first element in the set
	     * returned otherwise returns this.
	     * @description Method for getting/setting attributes.
	     *
	     * @example
	     * const elem = new Elem(document.querySelector('.cls'));
	     *
	     * elem.attr('attr1', 'value1'); // attribute attr1 set to 'value1' and this returned
	     * elem.attr('attr1');           // 'value1'
	     * elem.attr({
	     *   attr1: 'value3',            // attribute attr1 set to 'value3'
	     *   attr2: 'value2'             // attribute attr2 set to 'value2'
	     * });                           // this returned
	     * elem.attr().$;                // { attr1: 'value3', attr2: 'value2' }
	     */

	  }, {
	    key: 'attr',
	    value: function attr(_attr, value) {
	      var _this3 = this;

	      var elem = getElem(this);

	      if (!arguments.length) {
	        return new _Super2.default(elem.attributes).object(function (o, attr) {
	          o[attr.name] = attr.value;
	        });
	      }

	      if (arguments.length <= 1 && (0, _helpers.isString)(_attr)) {
	        return elem.getAttribute(_attr);
	      }

	      if (arguments.length >= 2) {
	        _attr = _defineProperty({}, _attr, value);
	      }

	      new _Super2.default(_attr).forEach(function (value, key) {
	        _this3.forEach(function (elem, index) {
	          elem.setAttribute(key, (0, _helpers.isFunction)(value) ? value(elem.getAttribute(key), index, elem) : value);
	        });
	      });

	      _helpers.crossClassMethods.transformAnchor(this);

	      return this;
	    }

	    /**
	     * @method Elem#block
	     * @public
	     * @returns {Elem} Returns this.
	     * @description Shorthand for elem.display('block').
	     *
	     * @example
	     * elem.block();
	     */

	  }, {
	    key: 'block',
	    value: function block() {
	      return this.display('block');
	    }

	    /**
	     * @method Elem#blur
	     * @returns {Elem} Returns this.
	     * @description Synonym for
	     * [HTMLElement#blur]{@link https://developer.mozilla.org/en/docs/Web/API/HTMLElement/blur}.
	     */

	  }, {
	    key: 'blur',
	    value: function blur() {
	      return this.forEach(function (elem) {
	        elem.blur();
	      });
	    }

	    /**
	     * @method Elem#bold
	     * @public
	     * @returns {Elem} Returns this.
	     * @description Shorthand for elem.fontWeight('bold').
	     */

	  }, {
	    key: 'bold',
	    value: function bold() {
	      return this.fontWeight('bold');
	    }

	    /**
	     * @method Elem#calcCSS
	     * @param {String} [pseudo] - See
	     * [getComputedStyle]{@link https://developer.mozilla.org/en/docs/Web/API/Window/getComputedStyle}.
	     * @returns {CSSStyleDeclaration} See
	     * [getComputedStyle]{@link https://developer.mozilla.org/en/docs/Web/API/Window/getComputedStyle}.
	     * @description Synonym for
	     * [getComputedStyle]{@link https://developer.mozilla.org/en/docs/Web/API/Window/getComputedStyle}.
	     * Returns computed style for the first element in the set or undefined.
	     */

	  }, {
	    key: 'calcCSS',
	    value: function calcCSS() {
	      var pseudo = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

	      var elem = this.$[0];

	      return elem && getComputedStyle(elem, pseudo);
	    }

	    /**
	     * @method Elem#centerText
	     * @public
	     * @returns {Elem} Returns this.
	     * @description Shorthand for elem.textAlign('center').
	     */

	  }, {
	    key: 'centerText',
	    value: function centerText() {
	      return this.textAlign('center');
	    }

	    /**
	     * @method Elem#changeRule
	     * @public
	     * @param {String} name - Name of the rule.
	     * @param {Object.<String, String>} style - Style for the selector.
	     * @returns {Elem} Returns this.
	     * @description Method for changing css styles in the first style tag in the set.
	     *
	     * @example
	     * style.changeRule('img-size', {
	     *   width: '50px !important',
	     *   height: '50px !important'
	     * });
	     */

	  }, {
	    key: 'changeRule',
	    value: function changeRule(name, style) {
	      this.some(function (elem) {
	        if (htmlElement(elem).name === 'style') {
	          var rule = elem.domcData.rules.find(function (rule) {
	            return rule.domcData && rule.domcData.name === name;
	          });

	          if (rule) {
	            new Elem(rule.value).css(style);

	            return true;
	          }
	        }
	      });

	      return this;
	    }

	    /**
	     * @method Elem#child
	     * @public
	     * @param {Number|String|Elem|Element} element - If the argument is a number a wrap of the set of the children
	     * of this index of each element in the set returned otherwise an element to put into this element, a collection
	     * or a selector of it.
	     * @returns {Elem} Returns a wrap of children or inserted elements.
	     * @description Method is similar to
	     * [Node#appendChild]{@link https://developer.mozilla.org/en/docs/Web/API/Node/appendChild}.
	     *
	     * @example
	     * const children = elem.child(1);
	     *
	     * elem.child(elem2);
	     * elem.child(document.getElementById('id'));
	     * elem.child('#id div.c1');
	     */

	  }, {
	    key: 'child',
	    value: function child(element) {
	      if ((0, _helpers.isInteger)(element) && element >= 0) {
	        return htmlElement(getElem(this).children[element]);
	      }

	      return toFind(element).into(this);
	    }

	    /**
	     * @method Elem#children
	     * @public
	     * @returns {Elem} D-Wrap of the children of the first element in the set.
	     * @description Method for getting element's children.
	     *
	     * @example
	     * const children = elem.children();
	     */

	  }, {
	    key: 'children',
	    value: function children() {
	      return new Elem(getElem(this).children);
	    }

	    /**
	     * @method Elem#class
	     * @public
	     * @param {String} [cls] - If it's present it has to contain class attribute to set.
	     * @returns {Arr|Elem} If the argument is present this returned otherwise a wrap of the classes array returned.
	     * @description Method for getting/setting classes.
	     *
	     * @example
	     * const elem = new Elem(document.createElement('div'));
	     *
	     * elem.class('c1 c2'); // class set to 'c1 c2'
	     * elem.class().$;      // ['c1', 'c2']
	     */

	  }, {
	    key: 'class',
	    value: function _class(cls) {
	      if (!arguments.length) {
	        return new _Arr3.default(getElem(this).className.split(' '));
	      }

	      return this.forEach(function (elem) {
	        elem.className = cls;
	      });
	    }

	    /**
	     * @method Elem#click
	     * @returns {Elem} Returns this.
	     * @description Synonym for
	     * [HTMLElement#click]{@link https://developer.mozilla.org/en/docs/Web/API/HTMLElement/click}.
	     */

	  }, {
	    key: 'click',
	    value: function click() {
	      return this.forEach(function (elem) {
	        elem.click();
	      });
	    }

	    /**
	     * @method Elem#clone
	     * @public
	     * @param {Boolean|*} deep - See
	     * [Node#cloneNode]{@link https://developer.mozilla.org/en/docs/Web/API/Node/cloneNode}.
	     * @returns {Elem} New instance of Elem.
	     * @description Synonym for
	     * [Node#cloneNode]{@link https://developer.mozilla.org/en/docs/Web/API/Node/cloneNode}.
	     */

	  }, {
	    key: 'clone',
	    value: function clone(deep) {
	      return this.map(function (elem) {
	        return htmlElement(elem.cloneNode(deep));
	      });
	    }

	    /**
	     * @method Elem#closest
	     * @public
	     * @param {String} selector - See
	     * [Element#closest]{@link https://developer.mozilla.org/en/docs/Web/API/Element/closest}.
	     * @returns {Elem} Set of the closest elements.
	     * @description Synonym for
	     * [Element#closest]{@link https://developer.mozilla.org/en/docs/Web/API/Element/closest}.
	     */

	  }, {
	    key: 'closest',
	    value: function closest(selector) {
	      if (element.propertyDescriptor('closest')) {
	        return this.object(function (array, elem) {
	          var closest = elem.closest(selector);

	          if (closest) {
	            array.push(closest);
	          }
	        }, new Elem());
	      }

	      return this.object(function (array, elem) {
	        while (elem) {
	          if (elem.matches(selector)) {
	            return htmlElement(elem);
	          }

	          elem = elem.parentNode;
	        }

	        if (elem) {
	          array.push(elem);
	        }
	      }, new Elem());
	    }

	    /**
	     * @method Elem#contains
	     * @public
	     * @param {String|Elem|Element} element - Element to find out if it's within the first element
	     * in the set or a selector of it.
	     * @returns {Boolean} Returns if the argument within this element.
	     * @description Method is extension for
	     * [Node#contains]{@link https://developer.mozilla.org/en/docs/Web/API/Node/contains}.
	     *
	     * @example
	     * elem1.contains(elem2);   // true|false
	     * elem.contains(selector); // true|false
	     */

	  }, {
	    key: 'contains',
	    value: function contains(element) {
	      element = toFind(element);

	      return getElem(this).contains(getElem(element));
	    }

	    /**
	     * @method Elem#create
	     * @public
	     * @param {String} type - Type of created element.
	     * @param {...String} appliedExpressions - Strings that are passed into {@link Elem#apply}.
	     * @returns {Elem} New instance of Elem - wrap of the created element.
	     * @description Method for creating elements inside this element. If this element is a document it's just created.
	     *
	     * @example
	     * elem.create('div', '#id .c1 .c2 *Some text*');
	     *
	     * // also there are shorthands for almost every HTML-element
	     * elem.div();
	     * elem.input('$type(checkbox) $name(country)');
	     */

	  }, {
	    key: 'create',
	    value: function create(type) {
	      var elem = this.$[0];
	      var element = htmlElement(nativeDocument.createElement(type));

	      if (elem && elem !== nativeDocument) {
	        element.into(this);
	      }

	      return element.apply.apply(element, new _Arr3.default(arguments).slice(1).$);
	    }

	    /**
	     * @method Elem#css
	     * @public
	     * @param {String|Object.<String, String|ElemValueCallback>} [property] - Name of the property to get or
	     * an object of the format { [property]: value, ... } to set styles.
	     * @param {String|ElemValueCallback} [value] - If the first argument is a string it should be a value to set for that property.
	     * @returns {Super|String|Elem} If no arguments passed, D-Wrap of css styles of the element returned,
	     * if 1 string argument is passed the value of the property returned otherwise returns this.
	     * @description Method for getting/setting styles. Supports !important.
	     *
	     * @example
	     * const elem = new Elem(document.createElement('div'));
	     *
	     * elem.css('display', 'none'); // display set to 'none' and this returned
	     * elem.css('display');         // 'none'
	     * elem.css({
	     *   display: 'inline',         // display set to 'inline'
	     *   cursor: 'pointer'          // cursor set to 'pointer'
	     * });                          // this returned
	     * elem.css().$;                // { display: 'none', cursor: 'pointer' }
	     *
	     * // also there are shorthands for almost every css property
	     * elem.position('absolute');
	     * elem.marginLeft('3px');
	     * elem.position(); // 'absolute'
	     */

	  }, {
	    key: 'css',
	    value: function css(property, value) {
	      var _this4 = this;

	      var elem = getElem(this);

	      if (!arguments.length) {
	        return new _Str2.default(this.$[0].style.cssText).split(/; ?/).object(function (o, value) {
	          if (value) {
	            property = value.split(/: /);

	            o[new _Str2.default(property[0]).toCamelCase().$] = property[1];
	          }
	        });
	      }

	      if (arguments.length <= 1 && (0, _helpers.isString)(property)) {
	        return elem.style[property];
	      }

	      if (arguments.length >= 2) {
	        property = _defineProperty({}, property, value);
	      }

	      property = new _Super2.default(property).$;

	      (0, _helpers.iterate)(property, function (value, property) {
	        property = new _Str2.default(property).toCamelCase().$;

	        _this4.forEach(function (elem, index) {
	          if ((0, _helpers.isFunction)(value)) {
	            value = value(elem.style[property], index, elem);
	          }

	          if (/!important$/.test(value)) {
	            elem.style.setProperty(property.replace(/!important$/, ''), value, 'important');
	          } else {
	            elem.style[property] = value;
	          }
	        });
	      });

	      return this;
	    }

	    /**
	     * @method Elem#data
	     * @public
	     * @param {String|Object.<String, String|ElemValueCallback>} [key] - Name of the data attribute (without data- prefix)
	     * to get or an object of the format { [attrName]: value, ... } to set attributes.
	     * @param {String|ElemValueCallback} [value] - If the first argument is a string it should be a value to set for that attribute.
	     * @returns {Super|String|Elem} If no arguments passed, D-Wrap of dataset of the element returned,
	     * if 1 string argument is passed the value of the data attribute returned otherwise returns this.
	     * @description Method for getting/setting data attributes. See
	     * [HTMLElement#dataset]{@link https://developer.mozilla.org/en/docs/Web/API/HTMLElement/dataset}.
	     *
	     * @example
	     * const elem = new Elem(document.createElement('div'));
	     *
	     * elem.data('someKey1', 'value'); // attribute data-some-key1 set to 'value1' and this returned
	     * elem.data('someKey1');          // 'value1'
	     * elem.data({
	     *   someKey1: 'value3',           // attribute data-some-key1 set to 'value3'
	     *   someKey2: 'value2'            // attribute data-some-key2 set to 'value2'
	     * });                             // this returned
	     * elem.data().$;                  // { someKey1: 'value3', someKey2: 'value2' }
	     */

	  }, {
	    key: 'data',
	    value: function data(key, value) {
	      var _this5 = this;

	      var dataset = getElem(this).dataset;

	      if (!arguments.length) {
	        return new _Super2.default(dataset).object(function (o, value, key) {
	          o[key] = value;
	        });
	      }

	      if (arguments.length === 1 && (0, _helpers.isString)(key)) {
	        return dataset[key];
	      }

	      if (arguments.length >= 2) {
	        key = _defineProperty({}, key, value);
	      }

	      (0, _helpers.iterate)(key, function (value, key) {
	        _this5.forEach(function (elem, index) {
	          elem.dataset[key] = (0, _helpers.isFunction)(value) ? value(elem.dataset[key], index, elem) : value;
	        });
	      });

	      return this;
	    }

	    /**
	     * @method Elem#defaultValue
	     * @public
	     * @param {*} [value] - If it's present it's used for default value of the element.
	     * @returns {Elem|*} If the argument is present this returned otherwise
	     * default value of the first element in the set.
	     * @description Method for getting/setting default value.
	     *
	     * @example
	     * elem.defaultValue('default'); // default value is set to 'default'
	     * elem.defaultValue();          // 'default'
	     */

	  }, {
	    key: 'defaultValue',
	    value: function defaultValue(value) {
	      if (!arguments.length) {
	        return getElem(this).defaultValue;
	      }

	      return this.forEach(function (elem) {
	        elem.defaultValue = value;
	      });
	    }

	    /**
	     * @method Elem#deleteRule
	     * @public
	     * @param {String} name - Name of the rule.
	     * @returns {Elem} Returns this.
	     * @description Method for deleting css styles in a style tag.
	     *
	     * @example
	     * style.deleteRule('img-size');
	     */

	  }, {
	    key: 'deleteRule',
	    value: function deleteRule(name) {
	      this.some(function (elem) {
	        if (htmlElement(elem).name === 'style') {
	          var rule = elem.domcData.rules.find(function (rule) {
	            return rule.domcData && rule.domcData.name === name;
	          });

	          if (rule) {
	            elem.sheet.deleteRule(rule.key);

	            return true;
	          }
	        }
	      });

	      return this;
	    }

	    /**
	     * @method Elem#disabled
	     * @public
	     * @param {Boolean|*} [disabled = true] - If all the elements in the set should be disabled or enabled.
	     * @returns {Elem} Returns this.
	     * @description Method for disabling or enabling elements in the set.
	     *
	     * @example
	     * elem.disabled();      // all elements are now disabled
	     * elem.disabled(true);  // the same
	     * elem.disabled(false); // all elements are now enabled
	     */

	  }, {
	    key: 'disabled',
	    value: function disabled() {
	      var _disabled = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

	      return this.toggleAttr('disabled', _disabled);
	    }

	    // TODO: move to EventTarget class

	  }, {
	    key: 'dispatch',
	    value: function dispatch(event) {
	      var details = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	      if (!/Event$/.test((0, _helpers.toStringTag)(event))) {
	        try {
	          event = new Event(event);
	        } catch (err) {
	          event = nativeDocument.createEvent('Event');
	        } finally {
	          (0, _helpers.assign)(event, details);
	        }
	      }

	      return this.forEach(function (elem) {
	        elem.dispatchEvent(event);
	      });
	    }

	    /**
	     * @method Elem#draggable
	     * @public
	     * @param {Boolean|*} [draggable = true] - If all the elements in the set should be draggable or not.
	     * @returns {Elem} Returns this.
	     * @description Method for making elements in the set draggable.
	     *
	     * @example
	     * elem.draggable();      // all elements are now draggable
	     * elem.draggable(true);  // the same
	     * elem.draggable(false); // all elements are now non-draggable
	     */

	  }, {
	    key: 'draggable',
	    value: function draggable() {
	      var _draggable = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

	      return this.forEach(function (elem) {
	        new _Super2.default(elem).prop('draggable', !!_draggable);
	      });
	    }

	    /**
	     * @method Elem#draggable
	     * @public
	     * @param {Boolean|*} [editable = true] - If all the elements in the set should be editable or not.
	     * @returns {Elem} Returns this.
	     * @description Method for making elements in the set editable.
	     *
	     * @example
	     * elem.draggable();      // all elements are now editable
	     * elem.draggable(true);  // the same
	     * elem.draggable(false); // all elements are now non-editable
	     */

	  }, {
	    key: 'editable',
	    value: function editable() {
	      var _editable = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

	      return this.toggleAttr('contentEditable', _editable);
	    }

	    /**
	     * @method Elem#elem
	     * @public
	     * @param {Number} [index = 0] - Index of the element of the set to get.
	     * @returns {Elem} New instance of Elem.
	     *
	     * @example
	     * elem.elem(1); // a wrap of the element in the set that has 1 index
	     * elem.elem();  // a wrap of the element in the set that has 0 index
	     */

	  }, {
	    key: 'elem',
	    value: function elem() {
	      var index = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

	      return new Elem(this.prop(index));
	    }

	    // TODO: write after writing selectors API

	  }, {
	    key: 'find',
	    value: function find(selector) {
	      return _find(selector, this.$);
	    }

	    /**
	     * @method Elem#first
	     * @public
	     * @param {String} [selector = null] - If present, finds first child in every elem that matches the selector.
	     * If not, finds first child of each element in the set.
	     * @returns {Elem} New instance of Elem.
	     * @description Method for finding first children of each element in the set.
	     *
	     * @example
	     * elem.first();       // finds first child of each element in the elem set
	     * elem.first('.foo'); // find first child that has foo class of each element in the set
	     */

	  }, {
	    key: 'first',
	    value: function first() {
	      var selector = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

	      return this.object(function (elems, elem) {
	        var found = new _Super2.default(elem.children).find(function (elem) {
	          return new Elem(elem).is(selector);
	        });

	        if (found) {
	          elems.push(found.value);
	        }
	      }, new Elem());
	    }

	    /**
	     * @method Elem#fixed
	     * @public
	     * @returns {Elem} Returns this.
	     * @description Shorthand for elem.position('fixed').
	     *
	     * @example
	     * elem.fixed();
	     */

	  }, {
	    key: 'fixed',
	    value: function fixed() {
	      return this.position('fixed');
	    }

	    /**
	     * @method Elem#focus
	     * @returns {Elem} Returns this.
	     * @description Synonym for
	     * [HTMLElement#focus]{@link https://developer.mozilla.org/en/docs/Web/API/HTMLElement/focus}.
	     */

	  }, {
	    key: 'focus',
	    value: function focus() {
	      return this.forEach(function (elem) {
	        elem.focus();
	      });
	    }

	    /**
	     * @method Elem#getFormData
	     * @public
	     * @returns {Object} Form data object.
	     * @description Method allows you to get form data from the form.
	     */

	  }, {
	    key: 'getFormData',
	    value: function getFormData() {
	      return this.find('input, select, textarea, datalist, keygen, output').object(function (data, input) {
	        data[input.name] = input.value;
	      }, []).$;
	    }

	    /**
	     * @method Elem#getRule
	     * @public
	     * @param {String} name - Name of the rule.
	     * @returns {{ selector: (String|void), rules: Object }} Set of the css rules.
	     * @description Method for getting set of the rules under the name.
	     *
	     * @example
	     * style.addRule('img-size', 'img.square', {
	     *   width: '40px',
	     *   height: '40px'
	     * });
	     * style.getRule('img-size');
	     * // {
	     * //   selector: 'img.square',
	     * //   rules: {
	     * //     width: '40px',
	     * //     height: '40px'
	     * //   }
	     * // }
	     */

	  }, {
	    key: 'getRule',
	    value: function getRule(name) {
	      var found = {
	        selector: undefined,
	        rules: {}
	      };

	      this.some(function (elem) {
	        if (htmlElement(elem).name === 'style') {
	          var rule = elem.domcData.rules.find(function (rule) {
	            return rule.domcData && rule.domcData.name === name;
	          });

	          if (rule) {
	            found = {
	              selector: rule.value.selectorText,
	              rules: new Elem(rule.value).css().$
	            };

	            return true;
	          }
	        }
	      });

	      return found;
	    }

	    /**
	     * @method Elem#hasAttr
	     * @public
	     * @param {String} attr - Name of the attribute.
	     * @returns {Boolean} If the first element in the set has the attribute.
	     * @description Method that returns if the first element in the set has the attribute or not.
	     *
	     * @example
	     * elem.attr('attr', 'value').hasAttr('attr'); // true
	     * elem.removeAttr('attr').hasAttr('attr');    // false
	     */

	  }, {
	    key: 'hasAttr',
	    value: function hasAttr(attr) {
	      return getElem(this).hasAttribute(attr);
	    }

	    /**
	     * @method Elem#hasClass
	     * @public
	     * @param {String} cls - Name of the class.
	     * @returns {Boolean} If the first element in the set has the class.
	     * @description Method that returns if the first element in the set has the class or not.
	     *
	     * @example
	     * elem.addClasses('cls').hasClass('cls');    // true
	     * elem.removeClasses('cls').hasClass('cls'); // false
	     */

	  }, {
	    key: 'hasClass',
	    value: function hasClass(cls) {
	      return getElem(this).classList.contains(cls);
	    }

	    /**
	     * @method Elem#hide
	     * @public
	     * @returns {Elem} Returns this.
	     * @description Hides all elements in the set.
	     *
	     * @example
	     * elem.hide();
	     */

	  }, {
	    key: 'hide',
	    value: function hide() {
	      var elem = this.$;

	      if (elem) {
	        elem.domcData.previousDisplay = elem.style.display;
	      }

	      return this.display('none !important');
	    }
	  }, {
	    key: 'html',
	    value: function html(_html) {
	      if (!arguments.length) {
	        return getElem(this).innerHTML;
	      }

	      return this.forEach(function (elem) {
	        elem.innerHTML = _html;
	      });
	    }
	  }, {
	    key: 'id',
	    value: function id(_id) {
	      if (!arguments.length) {
	        return getElem(this).id;
	      }

	      return this.forEach(function (elem) {
	        elem.id = _id;
	      });
	    }

	    // TODO: add null check

	  }, {
	    key: 'insertAfter',
	    value: function insertAfter(element) {
	      element = toFind(element);

	      var parent = element.parentNode;

	      if (parent.lastChild === element) {
	        parent.appendChild(this.$);
	      } else {
	        parent.insertBefore(this.$, element.nextSibling);
	      }

	      return this;
	    }

	    // TODO: add null check

	  }, {
	    key: 'insertBefore',
	    value: function insertBefore(element) {
	      element = toFind(element);

	      element.parentNode.insertBefore(this.$, element);

	      return this;
	    }
	  }, {
	    key: 'inline',
	    value: function inline() {
	      return this.display('inline');
	    }
	  }, {
	    key: 'inlineBlock',
	    value: function inlineBlock() {
	      return this.display('inline-block');
	    }

	    // TODO: innerWidth/innerHeight

	    /**
	     * @method Elem#into
	     * @public
	     * @param {String|Elem|Element} element - Element to put this element into or a selector of it.
	     * @returns {Elem} Returns this.
	     * @description Method is similar to
	     * [Node#appendChild]{@link https://developer.mozilla.org/en/docs/Web/API/Node/appendChild}.
	     *
	     * @example
	     * elem.into(elem2);
	     * elem.into(document.getElementById('id'));
	     * elem.into('#id div.c1');
	     */

	  }, {
	    key: 'into',
	    value: function into(element) {
	      element = toFind(element);

	      if (element && this.$) {
	        element.appendChild(this.$);
	      }

	      return this;
	    }
	  }, {
	    key: 'is',
	    value: function is(selector) {
	      return this.$ ? this.$.matches(selector) : false;
	    }
	  }, {
	    key: 'isBroken',
	    value: function isBroken() {
	      var elem = this.$;

	      return elem ? elem.complete && (!elem.naturalWidth || elem.naturalHeight) : false;
	    }
	  }, {
	    key: 'italic',
	    value: function italic() {
	      return this.fontStyle('italic');
	    }

	    // TODO: add #last(selector) and #last(selector, elementBool) syntax
	    // TODO: add null check

	  }, {
	    key: 'last',
	    value: function last(bool) {
	      return htmlElement(bool ? this.$.lastElementChild : this.$.lastChild);
	    }
	  }, {
	    key: 'lineThrough',
	    value: function lineThrough() {
	      return this.textDecorationLine('line-through');
	    }
	  }, {
	    key: 'load',
	    value: function load() {
	      var _this6 = this;

	      var elem = this.$;

	      if (!elem || elem.complete) {
	        return this.isBroken() ? _Promise2.default.reject(this) : _Promise2.default.resolve(this);
	      }

	      return new _Promise2.default(function (resolve, reject) {
	        var removeListeners = _this6.on({
	          load: function load() {
	            removeListeners();
	            resolve(this);
	          },
	          error: function error(err) {
	            removeListeners();
	            reject(err);
	          }
	        });
	      });
	    }
	    // TODO: #matches() -> #is()

	  }, {
	    key: 'moveAttr',
	    value: function moveAttr(attr) {
	      var value = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

	      var prev = attrs[attr];

	      if (prev && this.$) {
	        if (arguments.length < 2) {
	          value = prev.attr(attr);
	        }

	        prev.removeAttr(attr);
	      }

	      if (this.$) {
	        attrs[attr] = this;
	      }

	      return this.attr(attr, value);
	    }
	  }, {
	    key: 'moveClass',
	    value: function moveClass(cls) {
	      var prev = classes[cls];

	      if (prev && this.$) {
	        prev.removeClasses(cls);
	      }

	      if (this.$) {
	        classes[cls] = this;
	      }

	      return this.addClasses(cls);
	    }
	  }, {
	    key: 'next',


	    // TODO: add #next(selector) and #next(selector, elementBool) syntax
	    // TODO: add null check
	    value: function next(bool) {
	      return htmlElement(bool ? this.$.nextElementSibling : this.$.nextSibling);
	    }

	    // TODO: add null check

	  }, {
	    key: 'off',
	    value: function off() {
	      var removeListeners = this.$.domcData.removeListeners;


	      (0, _helpers.iterate)(arguments, function (event) {
	        var listeners = removeListeners[event];

	        if (isObject(listeners)) {
	          listeners.forEach(function (_ref) {
	            var removeListener = _ref.removeListener;
	            return removeListener();
	          });
	        }
	      });

	      return this;
	    }

	    // TODO: add null check

	  }, {
	    key: 'on',
	    value: function on(event, selector, listener) {
	      var _this7 = this;

	      var elem = this.$;
	      var removeListeners = elem.domcData.removeListeners;


	      if ((0, _helpers.isFunction)(selector)) {
	        listener = selector;
	        selector = null;
	      }

	      if ((0, _helpers.isString)(event)) {
	        event = _defineProperty({}, event, listener);
	      }

	      var listeners = new _Super2.default({});

	      new _Super2.default(event).forEach(function (listener, event) {
	        var removeEventListeners = removeListeners[event] = removeListeners[event] || new _Super2.default({}).value('index', 0);
	        var index = removeEventListeners.prop('index');

	        if (!removeEventListeners.has('listener')) {
	          var newListener = function newListener(e) {
	            removeEventListeners.forEach(function (_ref2) {
	              var selector = _ref2.selector;
	              var listener = _ref2.listener;

	              if (!selector || htmlElement(e.target).matches(selector)) {
	                listener.call(elem, e, _this7);
	              }
	            });
	          };

	          elem.addEventListener(event, newListener, false);
	          removeEventListeners.value('listener', newListener);
	        }

	        var removeListener = function removeListener() {
	          removeEventListeners.delete(index);

	          if (!removeEventListeners.count) {
	            elem.removeEventListener(event, removeEventListeners.prop('listener'), false);
	            removeEventListeners.delete('listener');
	          }
	        };

	        listeners.prop(event, removeListener);

	        removeEventListeners.assign(_defineProperty({
	          index: index + 1
	        }, index, {
	          selector: selector,
	          listener: listener,
	          removeListener: removeListener
	        }));
	      });

	      return function removeEventListeners(event) {
	        if (arguments.length) {
	          if (listeners.has(event)) {
	            listeners.prop(event)();
	          }

	          return listeners.delete(event);
	        }

	        listeners.forEach(function (removeListener) {
	          return removeListener();
	        });
	      };
	    }
	  }, {
	    key: 'overline',


	    // TODO: outerWidth/outerHeight

	    value: function overline() {
	      return this.textDecorationLine('overline');
	    }
	  }, {
	    key: 'parent',
	    value: function parent() {
	      return htmlElement(this.$ ? this.$.parentNode : null);
	    }
	  }, {
	    key: 'parentTree',
	    value: function parentTree() {
	      var collection = [];
	      var elem = this.parent();

	      while (elem.$) {
	        collection.push(elem);
	        elem = elem.parent();
	      }

	      return new Elem(collection);
	    }
	  }, {
	    key: 'pointer',
	    value: function pointer() {
	      return this.cursor('pointer');
	    }

	    // TODO: add #prev(selector) and #prev(selector, elementBool) syntax
	    // TODO: add null check

	  }, {
	    key: 'prev',
	    value: function prev(bool) {
	      return htmlElement(bool ? this.$.previousElementSibling : this.$.previousSibling);
	    }
	    // TODO: add #putBefore(): parent.putAfter(element, childNumber)
	    // TODO: add #putBefore(): parent.putBefore(element, childNumber)

	  }, {
	    key: 'ref',
	    value: function ref() {
	      return this.attr.apply(this, new _Arr3.default(arguments).unshift(refSwitcher(this.name)).$);
	    }
	  }, {
	    key: 'relative',
	    value: function relative() {
	      return this.position('relative');
	    }
	  }, {
	    key: 'remove',
	    value: function remove() {
	      if (this.$) {
	        this.$.remove();
	      }

	      return this;
	    }
	  }, {
	    key: 'removeAttr',
	    value: function removeAttr() {
	      var elem = this.$;

	      (0, _helpers.iterate)(elem && arguments, function (attr) {
	        elem.removeAttribute(attr);
	      });

	      return this;
	    }
	  }, {
	    key: 'removeClasses',
	    value: function removeClasses() {
	      if (!this.$) {
	        return this;
	      }

	      var list = this.$.classList;

	      list.remove.apply(list, arguments);

	      return this;
	    }
	  }, {
	    key: 'removeCSS',
	    value: function removeCSS() {
	      var _this8 = this;

	      (0, _helpers.iterate)(arguments, function (css) {
	        _this8.css(css, '');
	      });

	      return this;
	    }

	    // TODO: add null check

	  }, {
	    key: 'replace',
	    value: function replace(element) {
	      var elem = this.$;

	      element = toFind(element);
	      elem.parentNode.replaceChild(elem, element);

	      return this;
	    }
	  }, {
	    key: 'setOf',
	    value: function setOf(type, iterator, callback) {
	      var _this9 = this;

	      if (!this.$) {
	        return this;
	      }

	      iterator = new _Super2.default(iterator).$;

	      if ((0, _helpers.isNumber)(iterator)) {
	        try {
	          (0, _helpers.validate)([null, iterator], { 1: ['intLike', '>=0'] }, 'Elem#setOf');
	        } catch (e) {
	          throw new Error('\n\t\t\t\t\t2nd argument must be either or non-negative integer, or object!\n\t\t\t\t');
	        }

	        iterator = (0, _Arr2.array)(iterator);
	      }

	      new _Super2.default(iterator).forEach(function (value, key) {
	        var created = _this9.create(type);

	        if (callback) {
	          callback(created, value, key, iterator);
	        }
	      });

	      return this;
	    }
	  }, {
	    key: 'show',
	    value: function show() {
	      var elem = this.$;

	      if (!elem) {
	        return this;
	      }

	      var domcData = elem.domcData;


	      if (elem.style.display === 'none') {
	        elem.style.display = domcData.previousDisplay;
	        domcData.previousDisplay = '';
	      }

	      return this;
	    }
	  }, {
	    key: 'text',
	    value: function text(_text) {
	      return arguments.length ? this.html('').addText(_text) : this.prop(node.propertyDescriptor('textContent') ? 'textContent' : 'innerText');
	    }
	  }, {
	    key: 'toggleAttr',
	    value: function toggleAttr(attr, condition) {
	      return (arguments.length < 2 ? !this.hasAttr(attr) : condition) ? this.attr(attr, '') : this.removeAttr(attr);
	    }
	  }, {
	    key: 'toggleClass',
	    value: function toggleClass(cls, condition) {
	      return (arguments.length < 2 ? !this.hasClass(cls) : condition) ? this.addClasses(cls) : this.removeClasses(cls);
	    }
	  }, {
	    key: 'type',
	    value: function type() {
	      return this.prop.apply(this, new _Arr3.default(arguments).unshift('type').$);
	    }
	  }, {
	    key: 'underline',
	    value: function underline() {
	      return this.textDecorationLine('underline');
	    }
	  }, {
	    key: 'up',
	    value: function up() {
	      var n = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

	      (0, _helpers.validate)([n], [['intLike', '>=0']], 'Elem#up');

	      n = Number(n);

	      var elem = this.$;

	      while (n-- && elem) {
	        elem = elem.parentNode;
	      }

	      return htmlElement(elem);
	    }
	  }, {
	    key: 'value',
	    value: function value() {
	      return this.prop.apply(this, new _Arr3.default(arguments).unshift('value').$);
	    }
	  }, {
	    key: 'name',
	    get: function get() {
	      return this.$ && this.$.tagName ? this.$.tagName.toLowerCase() : undefined;
	    }
	  }, {
	    key: 'outerHTML',
	    get: function get() {
	      return this.$ ? this.$.outerHTML || '' : '';
	    }
	  }, {
	    key: 'valid',
	    get: function get() {
	      var elem = this.$;

	      return elem && elem.validity ? elem.validity.valid : true;
	    }
	  }]);

	  return Elem;
	}(_Arr3.default);

	exports.Elem = Elem;


	(0, _helpers.defineProperties)(Elem.prototype, _defineProperty({}, _helpers.Symbol.toStringTag, 'Elem'));

	var window = exports.window = htmlElement(global);
	var document = exports.document = htmlElement(nativeDocument);
	var html = exports.html = htmlElement(nativeDocument.documentElement);
	var body = exports.body = htmlElement(nativeDocument.body);
	var head = exports.head = htmlElement(nativeDocument.head);

	(0, _helpers.dynamicDefineProperties)(Elem.prototype, _css2.default, function (prop) {
	  return function () {
	    return this.css.apply(this, new _Arr3.default(arguments).unshift(prop).$);
	  };
	});

	(0, _helpers.dynamicDefineProperties)(Elem.prototype, _elements2.default, function (elem) {
	  return function () {
	    return this.create.apply(this, new _Arr3.default(arguments).unshift(elem).$);
	  };
	});

	_helpers.crossClassMethods.htmlElement = htmlElement;

	/**
	 * @function toFind
	 * @private
	 * @param {Element|Elem|String} elem - Element, selector of Elements or Elem.
	 * @returns {Elem} Instance of Elem.
	 */
	function toFind(elem) {
	  if ((0, _helpers.isString)(elem)) {
	    elem = _find(elem);
	  }

	  return htmlElement(elem);
	}

	/**
	 * @function htmlElement
	 * @private
	 * @param {*} [elem] - Element to wrap.
	 * @returns {Elem} New instance of Elem.
	 */
	function htmlElement(elem) {
	  return elem instanceof Elem ? elem : new Elem(elem);
	}

	/**
	 * @function getElem
	 * @private
	 * @param {Elem} elem - Element to check.
	 * @returns {Element} The argument or a fallback if needed.
	 */
	function getElem(elem) {
	  return elem.$[0] && empty;
	}

	_constructors2.default[1].push({
	  check: function check(elem) {
	    return (0, _helpers.isElement)(elem) || /^(HTMLCollection|NodeList)$/.test((0, _helpers.toStringTag)(elem));
	  },
	  cls: Elem
	});

	// TODO: add watch parameter
	function _find(selector) {
	  var found = nativeDocument.querySelectorAll(selector);

	  return htmlElement(found);
	}
	exports.find = _find;
	function loadImages(images) {
	  var promises = [];

	  images = new _Super2.default(images).$;

	  (0, _helpers.iterate)(images, function (image) {
	    image = new _Super2.default(image).$;

	    if (!(0, _helpers.isString)(image) && image.complete) {
	      promises.push(htmlElement(image));

	      return;
	    }

	    promises.push(new _Promise2.default(function (resolve) {
	      var img = (0, _helpers.isString)(image) ? document.img() : image;

	      resolve = new _Func2.default(resolve).bindArgs([img]);

	      img.on({
	        load: resolve,
	        error: resolve
	      });

	      if ((0, _helpers.isString)(image)) {
	        img.ref(image);
	      }
	    }));
	  });

	  return _Promise2.default.all(promises).then(function (images) {
	    return new Elem(images);
	  });
	}
	function parseHTML(html) {
	  return document.div().html(html).children();
	}
	function px(size) {
	  return Number(size.replace(/px$/, ''));
	}

	exports.default = Elem;

	// TODO: add selectors
	// TODO: :elem(num), :not(selector) :is(selector), :hidden, :visible, :parent, :lt(num), :gt(num)
	// TODO: :after(selector, immediate = false), :before(selector, immediate = false), :css(prop, value)
	// TODO: < selector, :broken, :prop(key, value), :has(selector), :within(selector), :closest(selector)
	// TODO: :child-of(selector)
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 30 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * @module constants/appliedRegExps
	 * @private
	 * @description Exports different types of syntax for {@link Elem#apply}.
	 */

	/**
	 * @callback matchAppliedExprCallback
	 * @param {Elem} elem - D-elem of an element to apply expression to.
	 * @param {String} string - Matched applied name.
	 * @param {String} arg - Argument within the parentheses.
	 */

	/**
	 * @type {Object.<String, matchAppliedExprCallback|Object.<String, matchAppliedExprCallback>>}
	 * @description Object of different types of syntax.
	 */

	exports.default = {
	  '#': function _(elem, id) {
	    elem.id(id);
	  },
	  '.': function _(elem, cls) {
	    elem.addClasses(cls);
	  },
	  $: function $(elem, attr, arg) {
	    elem.attr(attr, arg);
	  },
	  '@': function _(elem, prop, arg) {
	    elem.css(prop, arg);
	  },
	  '&': function _(elem, html) {
	    elem.html(html);
	  },
	  '*': function _(elem, text) {
	    elem.text(text);
	  },

	  '-': {
	    '.': function _(elem, value) {
	      elem.removeClasses(value.slice(1));
	    },
	    $: function $(elem, value) {
	      elem.removeAttr(value.slice(1));
	    },
	    '@': function _(elem, value) {
	      elem.removeCSS(value.slice(1));
	    },
	    a: function a(elem) {
	      elem.absolute();
	    },
	    b: function b(elem) {
	      elem.bold();
	    },
	    c: function c(elem) {
	      elem.centerText();
	    },
	    f: function f(elem) {
	      elem.fixed();
	    },
	    h: function h(elem) {
	      elem.hide();
	    },
	    i: function i(elem) {
	      elem.italic();
	    },
	    r: function r(elem) {
	      elem.relative();
	    },
	    s: function s(elem) {
	      elem.show();
	    },
	    t: function t(elem) {
	      elem.opacity(0);
	    },
	    u: function u(elem) {
	      elem.underline();
	    }
	  }
	};

/***/ },
/* 31 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * @module constants/css
	 * @private
	 * @description Exports methods for {@link Elem} for css-properties.
	 */

	/**
	 * @const
	 * @type {Array.<String>}
	 */
	exports.default = [
	/**
	 * @member {Function} Elem#alignContent
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'alignContent',

	/**
	 * @member {Function} Elem#alignItems
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'alignItems',

	/**
	 * @member {Function} Elem#alignSelf
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'alignSelf',

	/**
	 * @member {Function} Elem#animation
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'animation',

	/**
	 * @member {Function} Elem#animationDelay
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'animationDelay',

	/**
	 * @member {Function} Elem#animationDirection
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'animationDirection',

	/**
	 * @member {Function} Elem#animationDuration
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'animationDuration',

	/**
	 * @member {Function} Elem#animationFillMode
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'animationFillMode',

	/**
	 * @member {Function} Elem#animationIterationCount
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'animationIterationCount',

	/**
	 * @member {Function} Elem#animationName
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'animationName',

	/**
	 * @member {Function} Elem#animationPlayState
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'animationPlayState',

	/**
	 * @member {Function} Elem#animationTimingFunction
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'animationTimingFunction',

	/**
	 * @member {Function} Elem#backfaceVisibility
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'backfaceVisibility',

	/**
	 * @member {Function} Elem#background
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'background',

	/**
	 * @member {Function} Elem#backgroundAttachment
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'backgroundAttachment',

	/**
	 * @member {Function} Elem#backgroundBlendMode
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'backgroundBlendMode',

	/**
	 * @member {Function} Elem#backgroundClip
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'backgroundClip',

	/**
	 * @member {Function} Elem#backgroundColor
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'backgroundColor',

	/**
	 * @member {Function} Elem#backgroundImage
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'backgroundImage',

	/**
	 * @member {Function} Elem#backgroundOrigin
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'backgroundOrigin',

	/**
	 * @member {Function} Elem#backgroundPosition
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'backgroundPosition',

	/**
	 * @member {Function} Elem#backgroundRepeat
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'backgroundRepeat',

	/**
	 * @member {Function} Elem#backgroundSize
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'backgroundSize',

	/**
	 * @member {Function} Elem#border
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'border',

	/**
	 * @member {Function} Elem#borderBottom
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'borderBottom',

	/**
	 * @member {Function} Elem#borderBottomColor
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'borderBottomColor',

	/**
	 * @member {Function} Elem#borderBottomLeftRadius
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'borderBottomLeftRadius',

	/**
	 * @member {Function} Elem#borderBottomRightRadius
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'borderBottomRightRadius',

	/**
	 * @member {Function} Elem#borderBottomStyle
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'borderBottomStyle',

	/**
	 * @member {Function} Elem#borderBottomWidth
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'borderBottomWidth',

	/**
	 * @member {Function} Elem#borderCollapse
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'borderCollapse',

	/**
	 * @member {Function} Elem#borderColor
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'borderColor',

	/**
	 * @member {Function} Elem#borderImage
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'borderImage',

	/**
	 * @member {Function} Elem#borderImageOutSet
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'borderImageOutSet',

	/**
	 * @member {Function} Elem#borderImageRepeat
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'borderImageRepeat',

	/**
	 * @member {Function} Elem#borderImageSlice
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'borderImageSlice',

	/**
	 * @member {Function} Elem#borderImageSource
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'borderImageSource',

	/**
	 * @member {Function} Elem#borderImageWidth
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'borderImageWidth',

	/**
	 * @member {Function} Elem#borderLeft
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'borderLeft',

	/**
	 * @member {Function} Elem#borderLeftColor
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'borderLeftColor',

	/**
	 * @member {Function} Elem#borderLeftStyle
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'borderLeftStyle',

	/**
	 * @member {Function} Elem#borderLeftWidth
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'borderLeftWidth',

	/**
	 * @member {Function} Elem#borderRadius
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'borderRadius',

	/**
	 * @member {Function} Elem#borderRight
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'borderRight',

	/**
	 * @member {Function} Elem#borderRightColor
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'borderRightColor',

	/**
	 * @member {Function} Elem#borderRightStyle
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'borderRightStyle',

	/**
	 * @member {Function} Elem#borderRightWidth
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'borderRightWidth',

	/**
	 * @member {Function} Elem#borderSpacing
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'borderSpacing',

	/**
	 * @member {Function} Elem#borderStyle
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'borderStyle',

	/**
	 * @member {Function} Elem#borderTop
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'borderTop',

	/**
	 * @member {Function} Elem#borderTopColor
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'borderTopColor',

	/**
	 * @member {Function} Elem#borderTopLeftRadius
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'borderTopLeftRadius',

	/**
	 * @member {Function} Elem#borderTopRightRadius
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'borderTopRightRadius',

	/**
	 * @member {Function} Elem#borderTopStyle
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'borderTopStyle',

	/**
	 * @member {Function} Elem#borderTopWidth
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'borderTopWidth',

	/**
	 * @member {Function} Elem#borderWidth
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'borderWidth',

	/**
	 * @member {Function} Elem#bottom
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'bottom',

	/**
	 * @member {Function} Elem#boxDecorationBreak
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'boxDecorationBreak',

	/**
	 * @member {Function} Elem#boxShadow
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'boxShadow',

	/**
	 * @member {Function} Elem#boxSizing
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'boxSizing',

	/**
	 * @member {Function} Elem#breakAfter
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'breakAfter',

	/**
	 * @member {Function} Elem#breakBefore
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'breakBefore',

	/**
	 * @member {Function} Elem#breakInside
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'breakInside',

	/**
	 * @member {Function} Elem#captionSide
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'captionSide',

	/**
	 * @member {Function} Elem#clear
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'clear',

	/**
	 * @member {Function} Elem#clip
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'clip',

	/**
	 * @member {Function} Elem#color
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'color',

	/**
	 * @member {Function} Elem#columnCount
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'columnCount',

	/**
	 * @member {Function} Elem#columnFill
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'columnFill',

	/**
	 * @member {Function} Elem#columnGap
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'columnGap',

	/**
	 * @member {Function} Elem#columnRule
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'columnRule',

	/**
	 * @member {Function} Elem#columnRuleColor
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'columnRuleColor',

	/**
	 * @member {Function} Elem#columnRuleStyle
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'columnRuleStyle',

	/**
	 * @member {Function} Elem#columnRuleWidth
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'columnRuleWidth',

	/**
	 * @member {Function} Elem#columnSpan
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'columnSpan',

	/**
	 * @member {Function} Elem#columnWidth
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'columnWidth',

	/**
	 * @member {Function} Elem#columns
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'columns',

	/**
	 * @member {Function} Elem#counterIncrement
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'counterIncrement',

	/**
	 * @member {Function} Elem#counterReset
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'counterReset',

	/**
	 * @member {Function} Elem#cursor
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'cursor',

	/**
	 * @member {Function} Elem#direction
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'direction',

	/**
	 * @member {Function} Elem#display
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'display',

	/**
	 * @member {Function} Elem#emptyCells
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'emptyCells',

	/**
	 * @member {Function} Elem#filter
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'filter',

	/**
	 * @member {Function} Elem#flex
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'flex',

	/**
	 * @member {Function} Elem#flexBasis
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'flexBasis',

	/**
	 * @member {Function} Elem#flexDirection
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'flexDirection',

	/**
	 * @member {Function} Elem#flexFlow
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'flexFlow',

	/**
	 * @member {Function} Elem#flexGrow
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'flexGrow',

	/**
	 * @member {Function} Elem#flexShrink
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'flexShrink',

	/**
	 * @member {Function} Elem#flexWrap
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'flexWrap',

	/**
	 * @member {Function} Elem#float
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'float',

	/**
	 * @member {Function} Elem#font
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'font',

	/**
	 * @member {Function} Elem#fontFamily
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'fontFamily',

	/**
	 * @member {Function} Elem#fontFeatureSettings
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'fontFeatureSettings',

	/**
	 * @member {Function} Elem#fontKerning
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'fontKerning',

	/**
	 * @member {Function} Elem#fontLanguageOverride
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'fontLanguageOverride',

	/**
	 * @member {Function} Elem#fontSize
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'fontSize',

	/**
	 * @member {Function} Elem#fontSizeAdjust
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'fontSizeAdjust',

	/**
	 * @member {Function} Elem#fontStretch
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'fontStretch',

	/**
	 * @member {Function} Elem#fontStyle
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'fontStyle',

	/**
	 * @member {Function} Elem#fontSynthesis
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'fontSynthesis',

	/**
	 * @member {Function} Elem#fontVariant
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'fontVariant',

	/**
	 * @member {Function} Elem#fontVariantAlternates
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'fontVariantAlternates',

	/**
	 * @member {Function} Elem#fontVariantCaps
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'fontVariantCaps',

	/**
	 * @member {Function} Elem#fontVariantEastAsian
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'fontVariantEastAsian',

	/**
	 * @member {Function} Elem#fontVariantLigatures
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'fontVariantLigatures',

	/**
	 * @member {Function} Elem#fontVariantNumeric
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'fontVariantNumeric',

	/**
	 * @member {Function} Elem#fontVariantPosition
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'fontVariantPosition',

	/**
	 * @member {Function} Elem#fontWeight
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'fontWeight',

	/**
	 * @member {Function} Elem#hangingPunctuation
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'hangingPunctuation',

	/**
	 * @member {Function} Elem#height
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'height',

	/**
	 * @member {Function} Elem#hyphens
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'hyphens',

	/**
	 * @member {Function} Elem#imageOrientation
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'imageOrientation',

	/**
	 * @member {Function} Elem#imageRendering
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'imageRendering',

	/**
	 * @member {Function} Elem#imageResolution
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'imageResolution',

	/**
	 * @member {Function} Elem#imeMode
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'imeMode',

	/**
	 * @member {Function} Elem#justifyContent
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'justifyContent',

	/**
	 * @member {Function} Elem#left
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'left',

	/**
	 * @member {Function} Elem#letterSpacing
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'letterSpacing',

	/**
	 * @member {Function} Elem#lineBreak
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'lineBreak',

	/**
	 * @member {Function} Elem#lineHeight
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'lineHeight',

	/**
	 * @member {Function} Elem#listStyle
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'listStyle',

	/**
	 * @member {Function} Elem#listStyleImage
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'listStyleImage',

	/**
	 * @member {Function} Elem#listStylePosition
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'listStylePosition',

	/**
	 * @member {Function} Elem#listStyleType
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'listStyleType',

	/**
	 * @member {Function} Elem#margin
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'margin',

	/**
	 * @member {Function} Elem#marginBottom
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'marginBottom',

	/**
	 * @member {Function} Elem#marginLeft
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'marginLeft',

	/**
	 * @member {Function} Elem#marginRight
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'marginRight',

	/**
	 * @member {Function} Elem#marginTop
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'marginTop',

	/**
	 * @member {Function} Elem#markAfter
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'markAfter',

	/**
	 * @member {Function} Elem#markBefore
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'markBefore',

	/**
	 * @member {Function} Elem#marks
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'marks',

	/**
	 * @member {Function} Elem#marqueeDirection
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'marqueeDirection',

	/**
	 * @member {Function} Elem#marqueePlayCount
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'marqueePlayCount',

	/**
	 * @member {Function} Elem#marqueeSpeed
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'marqueeSpeed',

	/**
	 * @member {Function} Elem#marqueeStyle
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'marqueeStyle',

	/**
	 * @member {Function} Elem#mask
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'mask',

	/**
	 * @member {Function} Elem#maskType
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'maskType',

	/**
	 * @member {Function} Elem#maxHeight
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'maxHeight',

	/**
	 * @member {Function} Elem#maxWidth
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'maxWidth',

	/**
	 * @member {Function} Elem#minHeight
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'minHeight',

	/**
	 * @member {Function} Elem#minWidth
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'minWidth',

	/**
	 * @member {Function} Elem#navDown
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'navDown',

	/**
	 * @member {Function} Elem#navIndex
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'navIndex',

	/**
	 * @member {Function} Elem#navLeft
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'navLeft',

	/**
	 * @member {Function} Elem#navRight
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'navRight',

	/**
	 * @member {Function} Elem#navUp
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'navUp',

	/**
	 * @member {Function} Elem#objectFit
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'objectFit',

	/**
	 * @member {Function} Elem#objectPosition
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'objectPosition',

	/**
	 * @member {Function} Elem#opacity
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'opacity',

	/**
	 * @member {Function} Elem#order
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'order',

	/**
	 * @member {Function} Elem#orphans
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'orphans',

	/**
	 * @member {Function} Elem#outline
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'outline',

	/**
	 * @member {Function} Elem#outlineColor
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'outlineColor',

	/**
	 * @member {Function} Elem#outlineOffset
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'outlineOffset',

	/**
	 * @member {Function} Elem#outlineStyle
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'outlineStyle',

	/**
	 * @member {Function} Elem#outlineWidth
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'outlineWidth',

	/**
	 * @member {Function} Elem#overflow
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'overflow',

	/**
	 * @member {Function} Elem#overflowWrap
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'overflowWrap',

	/**
	 * @member {Function} Elem#overflowX
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'overflowX',

	/**
	 * @member {Function} Elem#overflowY
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'overflowY',

	/**
	 * @member {Function} Elem#padding
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'padding',

	/**
	 * @member {Function} Elem#paddingBottom
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'paddingBottom',

	/**
	 * @member {Function} Elem#paddingLeft
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'paddingLeft',

	/**
	 * @member {Function} Elem#paddingRight
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'paddingRight',

	/**
	 * @member {Function} Elem#paddingTop
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'paddingTop',

	/**
	 * @member {Function} Elem#pageBreakAfter
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'pageBreakAfter',

	/**
	 * @member {Function} Elem#pageBreakBefore
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'pageBreakBefore',

	/**
	 * @member {Function} Elem#pageBreakInside
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'pageBreakInside',

	/**
	 * @member {Function} Elem#perspective
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'perspective',

	/**
	 * @member {Function} Elem#perspectiveOrigin
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'perspectiveOrigin',

	/**
	 * @member {Function} Elem#phonemes
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'phonemes',

	/**
	 * @member {Function} Elem#position
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'position',

	/**
	 * @member {Function} Elem#quotes
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'quotes',

	/**
	 * @member {Function} Elem#resize
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'resize',

	/**
	 * @member {Function} Elem#rest
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'rest',

	/**
	 * @member {Function} Elem#restAfter
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'restAfter',

	/**
	 * @member {Function} Elem#restBefore
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'restBefore',

	/**
	 * @member {Function} Elem#right
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'right',

	/**
	 * @member {Function} Elem#tabSize
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'tabSize',

	/**
	 * @member {Function} Elem#tableLayout
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'tableLayout',

	/**
	 * @member {Function} Elem#textAlign
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'textAlign',

	/**
	 * @member {Function} Elem#textAlignLast
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'textAlignLast',

	/**
	 * @member {Function} Elem#textCombineUpright
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'textCombineUpright',

	/**
	 * @member {Function} Elem#textDecoration
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'textDecoration',

	/**
	 * @member {Function} Elem#textDecorationColor
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'textDecorationColor',

	/**
	 * @member {Function} Elem#textDecorationLine
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'textDecorationLine',

	/**
	 * @member {Function} Elem#textDecorationStyle
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'textDecorationStyle',

	/**
	 * @member {Function} Elem#textIndent
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'textIndent',

	/**
	 * @member {Function} Elem#textJustify
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'textJustify',

	/**
	 * @member {Function} Elem#textOrientation
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'textOrientation',

	/**
	 * @member {Function} Elem#textOverflow
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'textOverflow',

	/**
	 * @member {Function} Elem#textShadow
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'textShadow',

	/**
	 * @member {Function} Elem#textTransform
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'textTransform',

	/**
	 * @member {Function} Elem#textUnderlinePosition
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'textUnderlinePosition',

	/**
	 * @member {Function} Elem#top
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'top',

	/**
	 * @member {Function} Elem#transform
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'transform',

	/**
	 * @member {Function} Elem#transformOrigin
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'transformOrigin',

	/**
	 * @member {Function} Elem#transformStyle
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'transformStyle',

	/**
	 * @member {Function} Elem#transition
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'transition',

	/**
	 * @member {Function} Elem#transitionDelay
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'transitionDelay',

	/**
	 * @member {Function} Elem#transitionDuration
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'transitionDuration',

	/**
	 * @member {Function} Elem#transitionProperty
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'transitionProperty',

	/**
	 * @member {Function} Elem#transitionTimingFunction
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'transitionTimingFunction',

	/**
	 * @member {Function} Elem#unicodeBidi
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'unicodeBidi',

	/**
	 * @member {Function} Elem#verticalAlign
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'verticalAlign',

	/**
	 * @member {Function} Elem#visibility
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'visibility',

	/**
	 * @member {Function} Elem#voiceBalance
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'voiceBalance',

	/**
	 * @member {Function} Elem#voiceDuration
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'voiceDuration',

	/**
	 * @member {Function} Elem#voicePitch
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'voicePitch',

	/**
	 * @member {Function} Elem#voicePitchRange
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'voicePitchRange',

	/**
	 * @member {Function} Elem#voiceRate
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'voiceRate',

	/**
	 * @member {Function} Elem#voiceStress
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'voiceStress',

	/**
	 * @member {Function} Elem#voiceVolume
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'voiceVolume',

	/**
	 * @member {Function} Elem#whiteSpace
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'whiteSpace',

	/**
	 * @member {Function} Elem#widows
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'widows',

	/**
	 * @member {Function} Elem#width
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'width',

	/**
	 * @member {Function} Elem#wordBreak
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'wordBreak',

	/**
	 * @member {Function} Elem#wordSpacing
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'wordSpacing',

	/**
	 * @member {Function} Elem#wordWrap
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'wordWrap',

	/**
	 * @member {Function} Elem#writingMode
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'writingMode',

	/**
	 * @member {Function} Elem#zIndex
	 * @public
	 * @param {String} [value]
	 * @returns {Elem|String}
	 */
	'zIndex'];

/***/ },
/* 32 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * @module constants/elements
	 * @private
	 * @description Exports methods for {@link Elem} for creating html-elements.
	 */

	/**
	 * @const
	 * @type {Array.<String>}
	 */
	exports.default = [
	/**
	 * @member {Function} Elem#a
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'a',

	/**
	 * @member {Function} Elem#abbr
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'abbr',

	/**
	 * @member {Function} Elem#address
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'address',

	/**
	 * @member {Function} Elem#area
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'area',

	/**
	 * @member {Function} Elem#article
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'article',

	/**
	 * @member {Function} Elem#audio
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'audio',

	/**
	 * @member {Function} Elem#b
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'b',

	/**
	 * @member {Function} Elem#base
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'base',

	/**
	 * @member {Function} Elem#bdi
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'bdi',

	/**
	 * @member {Function} Elem#bdo
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'bdo',

	/**
	 * @member {Function} Elem#blockquote
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'blockquote',

	/**
	 * @member {Function} Elem#body
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'body',

	/**
	 * @member {Function} Elem#br
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'br',

	/**
	 * @member {Function} Elem#button
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'button',

	/**
	 * @member {Function} Elem#canvas
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'canvas',

	/**
	 * @member {Function} Elem#caption
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'caption',

	/**
	 * @member {Function} Elem#cite
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'cite',

	/**
	 * @member {Function} Elem#code
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'code',

	/**
	 * @member {Function} Elem#col
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'col',

	/**
	 * @member {Function} Elem#colgroup
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'colgroup',

	/**
	 * @member {Function} Elem#content
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'content',

	/**
	 * @member {Function} Elem#datalist
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'datalist',

	/**
	 * @member {Function} Elem#dd
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'dd',

	/**
	 * @member {Function} Elem#del
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'del',

	/**
	 * @member {Function} Elem#details
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'details',

	/**
	 * @member {Function} Elem#dfn
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'dfn',

	/**
	 * @member {Function} Elem#dialog
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'dialog',

	/**
	 * @member {Function} Elem#div
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'div',

	/**
	 * @member {Function} Elem#dl
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'dl',

	/**
	 * @member {Function} Elem#dt
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'dt',

	/**
	 * @member {Function} Elem#element
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'element',

	/**
	 * @member {Function} Elem#em
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'em',

	/**
	 * @member {Function} Elem#embed
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'embed',

	/**
	 * @member {Function} Elem#fieldset
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'fieldset',

	/**
	 * @member {Function} Elem#figcaption
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'figcaption',

	/**
	 * @member {Function} Elem#figure
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'figure',

	/**
	 * @member {Function} Elem#footer
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'footer',

	/**
	 * @member {Function} Elem#form
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'form',

	/**
	 * @member {Function} Elem#h1
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'h1',

	/**
	 * @member {Function} Elem#h2
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'h2',

	/**
	 * @member {Function} Elem#h3
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'h3',

	/**
	 * @member {Function} Elem#h4
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'h4',

	/**
	 * @member {Function} Elem#h5
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'h5',

	/**
	 * @member {Function} Elem#h6
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'h6',

	/**
	 * @member {Function} Elem#head
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'head',

	/**
	 * @member {Function} Elem#header
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'header',

	/**
	 * @member {Function} Elem#hgroup
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'hgroup',

	/**
	 * @member {Function} Elem#hr
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'hr',

	/**
	 * @member {Function} Elem#i
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'i',

	/**
	 * @member {Function} Elem#iframe
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'iframe',

	/**
	 * @member {Function} Elem#img
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'img',

	/**
	 * @member {Function} Elem#input
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'input',

	/**
	 * @member {Function} Elem#ins
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'ins',

	/**
	 * @member {Function} Elem#kbd
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'kbd',

	/**
	 * @member {Function} Elem#label
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'label',

	/**
	 * @member {Function} Elem#legend
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'legend',

	/**
	 * @member {Function} Elem#li
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'li',

	/**
	 * @member {Function} Elem#link
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'link',

	/**
	 * @member {Function} Elem#main
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'main',

	/**
	 * @member {Function} Elem#mark
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'mark',

	/**
	 * @member {Function} Elem#menu
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'menu',

	/**
	 * @member {Function} Elem#menuitem
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'menuitem',

	/**
	 * @member {Function} Elem#meta
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'meta',

	/**
	 * @member {Function} Elem#meter
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'meter',

	/**
	 * @member {Function} Elem#nav
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'nav',

	/**
	 * @member {Function} Elem#noscript
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'noscript',

	/**
	 * @member {Function} Elem#null
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'null',

	/**
	 * @member {Function} Elem#ol
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'ol',

	/**
	 * @member {Function} Elem#optgroup
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'optgroup',

	/**
	 * @member {Function} Elem#option
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'option',

	/**
	 * @member {Function} Elem#output
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'output',

	/**
	 * @member {Function} Elem#p
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'p',

	/**
	 * @member {Function} Elem#param
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'param',

	/**
	 * @member {Function} Elem#pre
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'pre',

	/**
	 * @member {Function} Elem#progress
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'progress',

	/**
	 * @member {Function} Elem#q
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'q',

	/**
	 * @member {Function} Elem#rp
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'rp',

	/**
	 * @member {Function} Elem#rt
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'rt',

	/**
	 * @member {Function} Elem#rtc
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'rtc',

	/**
	 * @member {Function} Elem#ruby
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'ruby',

	/**
	 * @member {Function} Elem#s
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	's',

	/**
	 * @member {Function} Elem#samp
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'samp',

	/**
	 * @member {Function} Elem#script
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'script',

	/**
	 * @member {Function} Elem#section
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'section',

	/**
	 * @member {Function} Elem#select
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'select',

	/**
	 * @member {Function} Elem#shadow
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'shadow',

	/**
	 * @member {Function} Elem#small
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'small',

	/**
	 * @member {Function} Elem#source
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'source',

	/**
	 * @member {Function} Elem#span
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'span',

	/**
	 * @member {Function} Elem#strong
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'strong',

	/**
	 * @member {Function} Elem#style
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'style',

	/**
	 * @member {Function} Elem#sub
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'sub',

	/**
	 * @member {Function} Elem#summary
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'summary',

	/**
	 * @member {Function} Elem#sup
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'sup',

	/**
	 * @member {Function} Elem#table
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'table',

	/**
	 * @member {Function} Elem#tbody
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'tbody',

	/**
	 * @member {Function} Elem#td
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'td',

	/**
	 * @member {Function} Elem#template
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'template',

	/**
	 * @member {Function} Elem#textarea
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'textarea',

	/**
	 * @member {Function} Elem#tfoot
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'tfoot',

	/**
	 * @member {Function} Elem#th
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'th',

	/**
	 * @member {Function} Elem#thead
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'thead',

	/**
	 * @member {Function} Elem#time
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'time',

	/**
	 * @member {Function} Elem#title
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'title',

	/**
	 * @member {Function} Elem#tr
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'tr',

	/**
	 * @member {Function} Elem#track
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'track',

	/**
	 * @member {Function} Elem#u
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'u',

	/**
	 * @member {Function} Elem#ul
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'ul',

	/**
	 * @member {Function} Elem#var
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'var',

	/**
	 * @member {Function} Elem#video
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'video',

	/**
	 * @member {Function} Elem#wbr
	 * @public
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'wbr'];

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.fetch = undefined;
	exports.Fetch = Fetch;

	var _Promise = __webpack_require__(21);

	var _Promise2 = _interopRequireDefault(_Promise);

	var _Arr = __webpack_require__(19);

	var _Arr2 = _interopRequireDefault(_Arr);

	var _Str = __webpack_require__(25);

	var _Str2 = _interopRequireDefault(_Str);

	var _helpers = __webpack_require__(9);

	var _constructURL = __webpack_require__(34);

	var _constructURL2 = _interopRequireDefault(_constructURL);

	var _parseHeaders = __webpack_require__(35);

	var _parseHeaders2 = _interopRequireDefault(_parseHeaders);

	var _transformData = __webpack_require__(36);

	var _transformData2 = _interopRequireDefault(_transformData);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /**
	                                                                                                                                                                                                                   * @module Fetch
	                                                                                                                                                                                                                   * @private
	                                                                                                                                                                                                                   * @mixin
	                                                                                                                                                                                                                   * @description Exports Fetch class.
	                                                                                                                                                                                                                   */

	/**
	 * @typedef {'get'|'post'|'delete'|'head'|'put'|'patch'} FetchMethod
	 * @public
	 */

	/**
	 * @typedef {Object} FetchConfig
	 * @public
	 * @property {Array.<AfterMiddleware|ErrorAfterMiddleware>} [after]
	 * @property {{ username: String, password: String }} [auth]
	 * @property {String} [baseURL]
	 * @property {Array.<BeforeMiddleware|ErrorBeforeMiddleware>} [before]
	 * @property {Object.<String, Array>} [headers]
	 * @property {FetchMethod} [method]
	 * @property {Object} [params]
	 * @property {String} [responseType]
	 * @property {Number} [timeout]
	 * @property {String} [url]
	 * @property {Boolean} [withCredentials]
	 */

	/**
	 * @typedef {Object} FetchResponse
	 * @public
	 * @property {FetchConfig} config
	 * @property {*} data
	 * @property {Object.<String, String>} headers
	 * @property {Number} status
	 * @property {String} statusText
	 * @property {XMLHttpRequest} xhr
	 */

	/**
	 * @callback FetchAfterMiddleware
	 * @public
	 * @param {FetchResponse} config - Fetch response.
	 * @param {Function} next - If there shouldn't be an error it's needed to be called without arguments
	 * otherwise pass an error argument into it.
	 */

	/**
	 * @callback FetchErrorAfterMiddleware
	 * @public
	 * @param {Error|*} err - Thrown error.
	 * @param {FetchResponse} config - Fetch response.
	 * @param {Function} next - If there shouldn't be an error it's needed to be called without arguments
	 * otherwise pass an error argument into it.
	 */

	/**
	 * @callback FetchBeforeMiddleware
	 * @public
	 * @param {FetchConfig} config - Fetch config.
	 * @param {Function} next - If there shouldn't be an error it's needed to be called without arguments
	 * otherwise pass an error argument into it.
	 */

	/**
	 * @callback FetchErrorBeforeMiddleware
	 * @public
	 * @param {Error|*} err - Thrown error.
	 * @param {FetchConfig} config - Fetch config.
	 * @param {Function} next - If there shouldn't be an error it's needed to be called without arguments
	 * otherwise pass an error argument into it.
	 */

	/**
	 * @callback FetchConfigFunction
	 * @public
	 * @param {FetchConfig} config
	 */

	var defaults = {
	  after: [],
	  auth: {
	    username: '',
	    password: ''
	  },
	  baseURL: global.location.origin,
	  before: [],
	  headers: {},
	  method: 'get',
	  params: {},
	  query: {},
	  responseType: '',
	  timeout: 0,
	  url: '',
	  withCredentials: false
	};
	var uploadMethods = new _Arr2.default(['post', 'put']);

	/**
	 * @class Fetch
	 * @extends Function
	 * @public
	 * @param {FetchConfig} [config = {}] - A number to wrap.
	 * @returns {Fetch} Instance of Fetch.
	 * An instance of Fetch is a function that simply calls #request with the same arguments.
	 * @description Class for fetching data.
	 *
	 * @example
	 * const fetch = new Fetch();
	 *
	 * fetch('/data').then((res) => {
	   *   console.log(res);
	   * });
	 */
	function Fetch() {
	  var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  (0, _helpers.checkClassInstance)(this, Fetch, 'Fetch');

	  function fetch() {
	    return fetch.request.apply(fetch, arguments);
	  }

	  var conf = (0, _helpers.assign)({}, defaults, config);
	  var headers = conf.headers = (0, _helpers.assign)({}, conf.headers);

	  conf.after = [];
	  conf.auth = (0, _helpers.assign)({}, defaults.auth, conf.auth);
	  conf.before = [];
	  conf.params = (0, _helpers.assign)({}, conf.params);
	  conf.query = (0, _helpers.assign)({}, conf.query);

	  (0, _helpers.iterate)(headers, function (array, header) {
	    headers[header] = (0, _helpers.toArray)(array, true);
	  });

	  /**
	   * @member {FetchConfig} Fetch#$$
	   * @public
	   * @description Fetch config.
	   */
	  Object.defineProperty(fetch, '$$', { value: conf });
	  Object.setPrototypeOf(fetch, Fetch.prototype);

	  return fetch;
	}

	(0, _helpers.inherits)(Fetch, Function);

	(0, _helpers.defineProperties)(Fetch.prototype, _defineProperty({
	  /**
	   * @member {Function} Fetch#after
	   * @public
	   * @param {FetchAfterMiddleware|FetchErrorAfterMiddleware} middleware - Middleware to add.
	   * @returns {Fetch} Returns this.
	   * @description Middleware that is called after the request.
	   * If the middleware has 2 or less arguments it's treated as success middleware otherwise as an error one.
	   *
	   * @example
	   * const fetch = new Fetch()
	   *   .after((err, res, next) => {
	   *     console.log(err);
	   *
	   *     next(err);
	   *   })
	   *   .after((res, next) => {
	   *     res.json = D(res.data).parseJSON():
	   *
	   *     next();
	   *   });
	   */

	  after: function after(middleware) {
	    (0, _helpers.validate)([middleware], ['function'], 'Fetch#after');

	    this.$$.after.push(middleware);

	    return this;
	  },


	  /**
	   * @member {Function} Fetch#before
	   * @public
	   * @param {FetchBeforeMiddleware|FetchErrorBeforeMiddleware} middleware - Middleware to add.
	   * @returns {Fetch} Returns this.
	   * @description Middleware that is called before the request.
	   * If the middleware has 2 or less arguments it's treated as success middleware otherwise as an error one.
	   *
	   * @example
	   * const fetch = new Fetch()
	   *   .before((err, req, next) => {
	   *     console.log(err);
	   *
	   *     next(err);
	   *   })
	   *   .before((req, next) => {
	   *     if (req.url === '/veryLongRequest') {
	   *       req.timeout = 30000;
	   *     }
	   *
	   *     next();
	   *   });
	   */
	  before: function before(middleware) {
	    (0, _helpers.validate)([middleware], ['function'], 'Fetch#before');

	    this.$$.before.push(middleware);

	    return this;
	  },


	  /**
	   * @member {Function} Fetch#config
	   * @public
	   * @param {FetchConfig|FetchConfigFunction} [config] - If it's a function it's called with th fetch config argument
	   * otherwise it's assigned to the fetch config.
	   * @returns {Fetch|FetchConfig} If the argument is present this is returned otherwise the fetch config is returned.
	   * @description Method for getting and setting config.
	   *
	   * @example
	   * const fetch = new Fetch();
	   *
	   * fetch.config({ baseURL: 5000 });
	   * fetch.config().timeout; // 5000
	   *
	   * fetch.config((config) => {
	   *   config.baseURL += '/api';
	   * });
	   */
	  config: function config(_config) {
	    var conf = this.$$;

	    if (!arguments.length) {
	      return conf;
	    }

	    if ((0, _helpers.isFunction)(_config)) {
	      _config(conf);
	    } else {
	      (0, _helpers.assign)(conf, _config);
	    }

	    return this;
	  },


	  /**
	   * @member {Function} Fetch#delete
	   * @public
	   * @param {String} [url] - See {@link Fetch#request}.
	   * @param {FetchConfig} [config] - See {@link Fetch#request}.
	   * @returns {Promise.<FetchResponse, Error>} See {@link Fetch#request}.
	   * @description Shorthand for #request for delete requests.
	   *
	   * @example
	   * new Fetch().delete('/data').then((res) => {
	   *   console.log(res);
	   * });
	   */
	  delete: function _delete(url) {
	    var config = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    if (!(0, _helpers.isString)(url)) {
	      config = url;
	      url = undefined;
	    }

	    return this.request(url, (0, _helpers.assign)({ method: 'delete' }, config));
	  },


	  /**
	   * @member {Function} Fetch#get
	   * @public
	   * @param {String} [url] - See {@link Fetch#request}.
	   * @param {FetchConfig} [config] - See {@link Fetch#request}.
	   * @returns {Promise.<FetchResponse, Error>} See {@link Fetch#request}.
	   * @description Shorthand for #request for get requests.
	   *
	   * @example
	   * new Fetch().get('/data').then((res) => {
	   *   console.log(res);
	   * });
	   */
	  get: function get(url) {
	    var config = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    if (!(0, _helpers.isString)(url)) {
	      config = url;
	      url = undefined;
	    }

	    return this.request(url, (0, _helpers.assign)({ method: 'get' }, config));
	  },


	  /**
	   * @member {Function} Fetch#head
	   * @public
	   * @param {String} [url] - See {@link Fetch#request}.
	   * @param {FetchConfig} [config] - See {@link Fetch#request}.
	   * @returns {Promise.<FetchResponse, Error>} See {@link Fetch#request}.
	   * @description Shorthand for #request for head requests.
	   *
	   * @example
	   * new Fetch().head('/data').then((res) => {
	   *   console.log(res);
	   * });
	   */
	  head: function head(url) {
	    var config = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    if (!(0, _helpers.isString)(url)) {
	      config = url;
	      url = undefined;
	    }

	    return this.request(url, (0, _helpers.assign)({ method: 'head' }, config));
	  },


	  /**
	   * @member {Function} Fetch#headers
	   * @public
	   * @param {String|Object.<String, Array>} header - A header string or an object of the following format:
	   * { [header]: [value1, value2, ...] }.
	   * @param {String|Array.<String>} [value] - Header value. If the first argument is a string
	   * this has to be a header value or an array of header values.
	   * @returns {Fetch} Returns this.
	   * @description Method for setting request headers.
	   *
	   * @example
	   * const fetch = new Fetch()
	   *   .headers('Header1', 'Value')
	   *   .headers('Header2', ['Value1', 'Value2'])
	   *   .headers({
	   *     Header3: ['Value1', 'Value2']
	   *   });
	   */
	  headers: function headers(header, value) {
	    var headers = this.$$.headers;


	    if (arguments.length >= 2) {
	      header = _defineProperty({}, header, value);
	    }

	    (0, _helpers.iterate)(header, function (value, header) {
	      var array = headers[header] || [];
	      var toPush = (0, _helpers.isArray)(value) ? value : [value];

	      (headers[header] = array).push.apply(array, toPush);
	    });

	    return this;
	  },


	  /**
	   * @member {Function} Fetch#instance
	   * @public
	   * @param {FetchConfig} [config] - New config if needed.
	   * @returns {Fetch} New instance of Fetch.
	   * @description Method for creating new fetch instances based on already existent.
	   *
	   * @example
	   * const mainFetch = new Fetch({
	   *   baseURL: '//other.domain.com/api',
	   *   withCredentials: true
	   * });
	   *
	   * const longFetch = mainFetch.instance({
	   *   timeout: 10000
	   * });
	   */
	  instance: function instance() {
	    var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    var old = this.$$;
	    var conf = (0, _helpers.assign)({}, old, config);
	    var headers = conf.headers = (0, _helpers.assign)({}, old.headers, conf.headers);

	    conf.after = (0, _helpers.assign)([], old.after);
	    conf.auth = (0, _helpers.assign)({}, old.auth, conf.auth);
	    conf.before = (0, _helpers.assign)([], old.before);
	    conf.params = (0, _helpers.assign)({}, old.params, conf.params);
	    conf.query = (0, _helpers.assign)({}, old.params, conf.query);

	    (0, _helpers.iterate)(headers, function (array, header) {
	      headers[header] = (0, _helpers.toArray)(array, true);
	    });

	    return new Fetch(conf);
	  },


	  /**
	   * @member {Function} Fetch#patch
	   * @public
	   * @param {String} [url] - See {@link Fetch#request}.
	   * @param {*} [data] - Additional parameter for uploading data.
	   * @param {FetchConfig} [config] - See {@link Fetch#request}.
	   * @returns {Promise.<FetchResponse, Error>} See {@link Fetch#request}.
	   * @description Shorthand for #request for head requests.
	   *
	   * @example
	   * new Fetch().patch('/data', { user: 'John' }).then((res) => {
	   *   console.log(res);
	   * });
	   */
	  patch: function patch(url) {
	    var data = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	    var config = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	    if (arguments.length && !(0, _helpers.isString)(url)) {
	      config = data;
	      data = url;
	      url = undefined;
	    }

	    return this.request(url, (0, _helpers.assign)({ method: 'patch', data: data }, config));
	  },


	  /**
	   * @member {Function} Fetch#post
	   * @public
	   * @param {String} [url] - See {@link Fetch#request}.
	   * @param {*} [data] - Additional parameter for uploading data.
	   * @param {FetchConfig} [config] - See {@link Fetch#request}.
	   * @returns {Promise.<FetchResponse, Error>} See {@link Fetch#request}.
	   * @description Shorthand for #request for head requests.
	   *
	   * @example
	   * new Fetch().post('/data', { user: 'John' }).then((res) => {
	   *   console.log(res);
	   * });
	   */
	  post: function post(url) {
	    var data = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	    var config = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	    if (arguments.length && !(0, _helpers.isString)(url)) {
	      config = data;
	      data = url;
	      url = undefined;
	    }

	    return this.request(url, (0, _helpers.assign)({ method: 'post', data: data }, config));
	  },


	  /**
	   * @member {Function} Fetch#put
	   * @public
	   * @param {String} [url] - See {@link Fetch#request}.
	   * @param {*} [data] - Additional parameter for uploading data.
	   * @param {FetchConfig} [config] - See {@link Fetch#request}.
	   * @returns {Promise.<FetchResponse, Error>} See {@link Fetch#request}.
	   * @description Shorthand for #request for head requests.
	   *
	   * @example
	   * new Fetch().put('/data', { user: 'John' }).then((res) => {
	   *   console.log(res);
	   * });
	   */
	  put: function put(url) {
	    var data = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	    var config = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	    if (arguments.length && !(0, _helpers.isString)(url)) {
	      config = data;
	      data = url;
	      url = undefined;
	    }

	    return this.request(url, (0, _helpers.assign)({ method: 'put', data: data }, config));
	  },


	  /**
	   * @member {Function} Fetch#request
	   * @public
	   * @param {String} [url] - URL for the request.
	   * @param {FetchConfig} [config] - Additional config for this particular request.
	   * @returns {Promise.<FetchResponse, Error>} Promise that is resolved with the request response.
	   * @description Main function for making requests. All request methods call this method
	   * including the fetch instance itself.
	   *
	   * @example
	   * const fetch = new Fetch();
	   *
	   * fetch.request('/data', { timeout: 1000 }).then((res) => {
	   *   console.log(res);
	   * });
	   *
	   * fetch.request({ timeout: 1000 }).then((res) => {
	   *   console.log(res);
	   * });
	   *
	   * fetch.request().then((res) => {
	   *   console.log(res);
	   * });
	   */
	  request: function request(url) {
	    var config = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    if (arguments.length === 1 && !(0, _helpers.isString)(url)) {
	      config = url;
	    }

	    var urlConf = (0, _helpers.isString)(url) ? { url: url } : {};
	    var conf = (0, _helpers.assign)({}, this.$$, urlConf, config);

	    var xhr = void 0;
	    var promise = _Promise2.default.resolve();

	    (0, _helpers.iterate)(conf.before, function (middleware) {
	      promise = promise.then(function () {
	        if (middleware.length >= 3) {
	          return _Promise2.default.resolve();
	        }

	        return new _Promise2.default(function (resolve, reject) {
	          middleware(conf, function (err) {
	            if (arguments.length) {
	              return reject(err);
	            }

	            resolve();
	          });
	        });
	      }, function (err) {
	        if (middleware.length < 3) {
	          return _Promise2.default.reject(err);
	        }

	        return new _Promise2.default(function (resolve, reject) {
	          middleware(err, conf, function (err) {
	            if (arguments.length) {
	              return reject(err);
	            }

	            resolve();
	          });
	        });
	      });
	    });

	    promise = promise.then(function () {
	      return new _Promise2.default(function (resolve, reject) {
	        var after = conf.after;
	        var baseURL = conf.baseURL;
	        var _conf$auth = conf.auth;
	        var username = _conf$auth.username;
	        var password = _conf$auth.password;
	        var data = conf.data;
	        var headers = conf.headers;
	        var method = conf.method;
	        var onprogress = conf.onprogress;
	        var params = conf.params;
	        var query = conf.query;
	        var responseType = conf.responseType;
	        var timeout = conf.timeout;
	        var url = conf.url;
	        var withCredentials = conf.withCredentials;


	        xhr = new XMLHttpRequest();

	        var METHOD = method.toUpperCase();
	        var URL = conf.constructedUrl = (0, _constructURL2.default)(baseURL, url, params, query);
	        var constructedData = conf.constructedData = (0, _transformData2.default)(data, METHOD, headers);

	        xhr.open(METHOD, URL, true, username, password);

	        (0, _helpers.iterate)(headers, function (value, header) {
	          xhr.setRequestHeader(new _Str2.default(header).toCapitalCase().replace(/\s+/g, '-').$, value.join(', '));
	        });

	        if (onprogress) {
	          if (uploadMethods.indexOfStrict(METHOD) === -1) {
	            xhr.onprogress = onprogress;
	          } else {
	            xhr.upload.onprogress = onprogress;
	          }
	        }

	        xhr.onabort = function () {
	          reject(new Error('Request was aborted'));

	          xhr = null;
	        };

	        xhr.onerror = function () {
	          reject(new Error('Network error'));

	          xhr = null;
	        };

	        xhr.ontimeout = function () {
	          reject(new Error('Request time exceeded'));

	          xhr = null;
	        };

	        xhr.onreadystatechange = function () {
	          if (!xhr || !xhr.status || xhr.readyState !== 4) {
	            return;
	          }

	          var response = {
	            config: conf,
	            data: !config.responseType || config.responseType === 'text' ? xhr.responseText : xhr.response,
	            headers: (0, _parseHeaders2.default)(xhr.getAllResponseHeaders()),
	            status: xhr.status === 1223 ? 204 : xhr.status,
	            statusText: xhr.status === 1223 ? 'No Content' : xhr.statusText,
	            xhr: xhr
	          };

	          var promise = _Promise2.default.resolve();

	          (0, _helpers.iterate)(after, function (middleware) {
	            promise = promise.then(function () {
	              if (middleware.length >= 3) {
	                return _Promise2.default.resolve();
	              }

	              return new _Promise2.default(function (resolve, reject) {
	                middleware(response, function (err) {
	                  if (arguments.length) {
	                    return reject(err);
	                  }

	                  resolve(response);
	                });
	              });
	            }, function (err) {
	              if (middleware.length < 3) {
	                return _Promise2.default.reject(err);
	              }

	              return new _Promise2.default(function (resolve, reject) {
	                middleware(err, response, function (err) {
	                  if (arguments.length) {
	                    return reject(err);
	                  }

	                  resolve(response);
	                });
	              });
	            });
	          });

	          resolve(promise.then(function () {
	            return response;
	          }).catch(function (err) {
	            try {
	              err.response = response;
	            } catch (e) {
	              throw err;
	            }

	            throw err;
	          }));
	        };

	        xhr.responseType = responseType;
	        xhr.timeout = Number(timeout) || 0;
	        xhr.withCredentials = !!withCredentials;

	        xhr.send(constructedData);
	      });
	    });

	    promise.abort = function abort() {
	      if (xhr) {
	        xhr.abort();
	      }

	      return this;
	    };

	    return promise;
	  }
	}, _helpers.Symbol.toStringTag, 'Fetch'));

	var fetch = exports.fetch = new Fetch();

	exports.default = Fetch;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Str = __webpack_require__(25);

	var _Str2 = _interopRequireDefault(_Str);

	var _checkTypes = __webpack_require__(4);

	var _iterate = __webpack_require__(11);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @type {RegExp}
	 * @description Absolute URL pattern.
	 */
	var absoluteURLRegexp = /^([a-z][a-z\d\+\-\.]*:)?\/\//i;

	/**
	 * @function constructURL
	 * @param {String} baseURL - BaseURL of the output URL.
	 * @param {String} url - Main part of the output URL.
	 * @param {Object} params - Params to replace in the url expressions like ":param".
	 * @param {Object} query - Object with query params.
	 * @returns {String} Constructed URL.
	 * @description Function for constructing URL from the base URL, URL, params and query params.
	 */
	/**
	 * @module helpers/constructURL
	 * @private
	 * @description Exports Object.assign-like method.
	 */

	exports.default = function (baseURL, url, params, query) {
	  var URL = isAbsolute(url) ? url : String(baseURL).replace(/\/+$/, '') + '/' + String(url).replace(/^\/+/, '');

	  (0, _iterate.iterate)(params, function (value, param) {
	    URL = new _Str2.default(URL).replaceString(':' + param, value).$;
	  });

	  var queryParams = [];

	  (0, _iterate.iterate)(query, function (value, param) {
	    if ((0, _checkTypes.isArray)(value)) {
	      param += '[]';
	    } else {
	      value = [value];
	    }

	    (0, _iterate.iterate)(value, function (value) {
	      if ((0, _checkTypes.isObject)(value)) {
	        value = JSON.stringify(value);
	      } else {
	        value = String(value);
	      }

	      queryParams.push(encode(param) + '=' + encode(value));
	    });
	  });

	  if (queryParams.length) {
	    URL += (URL.indexOf('?') === -1 ? '?' : '&') + queryParams.join('&');
	  }

	  return URL;
	};

	/**
	 * @function isAbsolute
	 * @param {String} url - URL to check if it is absolute or not.
	 * @returns {Boolean} If the argument URL is absolute or not.
	 */


	function isAbsolute(url) {
	  return absoluteURLRegexp.test(url);
	}

	/**
	 * @function encode
	 * @param {String} string - String to encode using encodeURIComponent
	 * @returns {String} Encoded string.
	 */
	function encode(string) {
	  return encodeURIComponent(string);
	}

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Str = __webpack_require__(25);

	var _Str2 = _interopRequireDefault(_Str);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @function parseHeaders
	 * @param {String} rawHeaders - Raw headers.
	 * @returns {Object} Headers object
	 * @description Function for parsing raw headers.
	 */

	exports.default = function (rawHeaders) {
	  var headers = {};
	  var split = (rawHeaders || '').split('\n');

	  for (var i = 0, length = split.length; i < length; i++) {
	    var value = split[i];
	    var index = value.indexOf(':');
	    var key = new _Str2.default(value.substring(0, index)).trim().toCamelCase().$;
	    var val = new _Str2.default(value.substring(index + 1)).trim().$;

	    if (key) {
	      headers[key] = (headers[key] ? headers[key] + ', ' : '') + val;
	    }
	  }

	  return headers;
	}; /**
	    * @module helpers/parseHeaders
	    * @private
	    * @description Exports parseHeaders method.
	    */

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Arr = __webpack_require__(19);

	var _Arr2 = _interopRequireDefault(_Arr);

	var _Super = __webpack_require__(8);

	var _Super2 = _interopRequireDefault(_Super);

	var _ = __webpack_require__(9);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var notToTransform = new _Arr2.default(['FormData', 'File', 'Blob', 'ArrayBuffer', 'String', 'Number']); /**
	                                                                                                          * @module helpers/transformData
	                                                                                                          * @private
	                                                                                                          * @description Exports parseHeaders method.
	                                                                                                          */

	var withoutBody = new _Arr2.default(['DELETE', 'GET', 'HEAD']);

	/**
	 * @function transformData
	 * @param {*} data - Data to transform
	 * @param {String} method - HTTP method.
	 * @param {Object} headers - Object with headers.
	 * @returns {*} - Transformed data.
	 */

	exports.default = function (data, method, headers) {
	  data = new _Super2.default(data).$;

	  if (withoutBody.indexOfStrict(method) !== -1) {
	    return null;
	  }

	  if ((0, _.isObject)(data) && notToTransform.keyOfStrict((0, _.toStringTag)(data)) !== -1) {
	    if (!headers.contentType) {
	      headers.contentType = ['application/json;charset=utf-8'];
	    }

	    return new _Super2.default(data).json();
	  }

	  return data;
	};

/***/ }
/******/ ]);