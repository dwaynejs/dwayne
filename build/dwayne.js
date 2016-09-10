/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
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
	
	Object.keys(_lib).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _lib[key];
	    }
	  });
	});
	
	var statics = _interopRequireWildcard(_lib);
	
	var _assign = __webpack_require__(9);
	
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
	
	var _Arr = __webpack_require__(17);
	
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
	
	var _Elem = __webpack_require__(28);
	
	Object.keys(_Elem).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _Elem[key];
	    }
	  });
	});
	
	var _Fetch = __webpack_require__(29);
	
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
	
	var _Super = __webpack_require__(18);
	
	Object.keys(_Super).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _Super[key];
	    }
	  });
	});
	
	var _Switcher = __webpack_require__(19);
	
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
	exports.isPlainObject = isPlainObject;
	exports.isPrimitive = isPrimitive;
	exports.isRegExp = isRegExp;
	exports.isString = isString;
	exports.isSymbol = isSymbol;
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
	 * @function isSymbol
	 * @public
	 * @param {*} value - Value to check if it is a symbol.
	 * @returns {Boolean} If the argument is a symbol or not.
	 *
	 * @example
	 * isSymbol(Symbol('1')); // true
	 */
	function isSymbol(value) {
	  return (0, _toStringTag.toStringTag)(value) === 'Symbol';
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
	exports.Alphabet = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @module Alphabet
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @private
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @mixin
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @description Exports Alphabet class.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
	
	exports.alphabet = alphabet;
	
	var _helpers = __webpack_require__(8);
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
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
	
	var Alphabet = exports.Alphabet = function () {
	  function Alphabet() {
	    var alphabet = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	
	    _classCallCheck(this, Alphabet);
	
	    var a = {};
	
	    for (var i = 0, length = alphabet.length; i < length; i++) {
	      var char = alphabet[i];
	
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
	
	
	  _createClass(Alphabet, [{
	    key: 'add',
	    value: function add() {
	      for (var _len = arguments.length, chars = Array(_len), _key = 0; _key < _len; _key++) {
	        chars[_key] = arguments[_key];
	      }
	
	      for (var i = 0, length = chars.length; i < length; i++) {
	        var char = chars[i];
	
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
	
	  }, {
	    key: 'contains',
	    value: function contains(word) {
	      (0, _helpers.validate)([word], ['string'], 'Alphabet#contains');
	
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
	      (0, _helpers.validate)([length], [['intLike', '>0']], 'Alphabet#token');
	
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
	
	(0, _helpers.defineProperties)(Alphabet.prototype, _defineProperty({}, _helpers.Symbol.toStringTag, 'Alphabet'));
	
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
	
	var _assign = __webpack_require__(9);
	
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
	
	var _crossClassMethods = __webpack_require__(11);
	
	Object.keys(_crossClassMethods).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _crossClassMethods[key];
	    }
	  });
	});
	
	var _defineProperty = __webpack_require__(12);
	
	Object.keys(_defineProperty).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _defineProperty[key];
	    }
	  });
	});
	
	var _iterate = __webpack_require__(10);
	
	Object.keys(_iterate).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _iterate[key];
	    }
	  });
	});
	
	var _Symbol = __webpack_require__(13);
	
	Object.keys(_Symbol).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _Symbol[key];
	    }
	  });
	});
	
	var _toArray = __webpack_require__(14);
	
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
	
	var _validate = __webpack_require__(15);
	
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.assign = assign;
	
	var _iterate = __webpack_require__(10);
	
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.iterate = iterate;
	
	var _checkTypes = __webpack_require__(4);
	
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
/* 11 */
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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.dynamicDefineProperties = dynamicDefineProperties;
	exports.defineProperties = defineProperties;
	
	var _iterate = __webpack_require__(10);
	
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
	  (0, _iterate.iterate)(properties, function (name) {
	    Object.defineProperty(target, name, {
	      value: propertyGenerator(name),
	      writable: true,
	      enumerable: false,
	      configurable: true
	    });
	  });
	}
	
	/**
	 * @function defineProperties
	 * @param {Object} target - Target to define properties for.
	 * @param {Object} properties - Object with properties needed to be assign to the target.
	 * @returns {void}
	 * @description Function for defining properties of an object.
	 */
	/**
	 * @module helpers/defineProperty
	 * @private
	 * @description Exports defineProperty and dynamicDefineProperties methods.
	 */
	
	function defineProperties(target, properties) {
	  (0, _iterate.iterate)(properties, function (method, name) {
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

/***/ },
/* 13 */
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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.toArray = toArray;
	
	var _checkTypes = __webpack_require__(4);
	
	var _iterate = __webpack_require__(10);
	
	/**
	 * @function toArray
	 * @param {*} value - Any value.
	 * @param {Boolean} [createNewArray = false] - If it is needed to create new array.
	 * @returns {Array} Create array.
	 * @description Function for creating an array of any value.
	 */
	/**
	 * @module helpers/toArray
	 * @private
	 * @description Exports toArray method.
	 */
	
	function toArray(value, createNewArray) {
	  if ((0, _checkTypes.isArray)(value) && !createNewArray) {
	    return value;
	  }
	
	  var array = [];
	
	  if ((0, _checkTypes.isArrayLike)(value) && !(0, _checkTypes.isString)(value)) {
	    (0, _iterate.iterate)(value, function (value) {
	      array.push(value);
	    });
	  } else {
	    array.push(value);
	  }
	
	  return array;
	}

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.validate = validate;
	
	var _validateCheckExpressions = __webpack_require__(16);
	
	var _validateCheckExpressions2 = _interopRequireDefault(_validateCheckExpressions);
	
	var _iterate = __webpack_require__(10);
	
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
/* 16 */
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
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Arr = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.array = array;
	exports.iterate = iterate;
	
	var _Super2 = __webpack_require__(18);
	
	var _Super3 = _interopRequireDefault(_Super2);
	
	var _constructors = __webpack_require__(6);
	
	var _constructors2 = _interopRequireDefault(_constructors);
	
	var _helpers = __webpack_require__(8);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
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
	
	var Arr = exports.Arr = function (_Super) {
	  _inherits(Arr, _Super);
	
	  function Arr() {
	    var array = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	
	    _classCallCheck(this, Arr);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Arr).call(this, (0, _helpers.toArray)(array)));
	
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
	   * @param {...(Array|*)} values - Arrays or any other values to concat the array with.
	   * @returns {Arr} New instance of Arr.
	   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/concat
	   * @description Synonym for
	   * [Array#concat]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/concat}.
	   */
	
	
	  _createClass(Arr, [{
	    key: 'concat',
	    value: function concat() {
	      for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
	        values[_key] = arguments[_key];
	      }
	
	      var array = (0, _helpers.toArray)(this.$, true);
	
	      (0, _helpers.iterate)(arguments, function (value) {
	        value = new _Super3.default(value).$;
	
	        if ((0, _helpers.isArrayLike)(value) && !(0, _helpers.isString)(value)) {
	          (0, _helpers.iterate)(value, function (value) {
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
	      (0, _helpers.validate)([compareFunction], ['function||!'], 'Arr#sort');
	
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
	}(_Super3.default);
	
	(0, _helpers.defineProperties)(Arr.prototype, _defineProperty({}, _helpers.Symbol.toStringTag, 'Arr'));
	
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
	  (0, _helpers.validate)([number, callback], [['intLike', '>=0'], 'function||!'], 'array');
	
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
	function iterate(number, callback) {
	  (0, _helpers.validate)([number, callback], [['intLike', '>=0'], 'function'], 'iterate');
	
	  for (var i = 0; i < number; i++) {
	    callback(i);
	  }
	}
	
	exports.default = Arr;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Super = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @module Super
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @private
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @mixin
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @description Exports Super class.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
	
	var _D = __webpack_require__(3);
	
	var _D2 = _interopRequireDefault(_D);
	
	var _Switcher = __webpack_require__(19);
	
	var _constructors = __webpack_require__(6);
	
	var _constructors2 = _interopRequireDefault(_constructors);
	
	var _helpers = __webpack_require__(8);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
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
	
	var cloneSwitcher = (0, _Switcher.switcher)('call', function (object) {
	  return object;
	}).case(function (object) {
	  return new Super(object) === object;
	}, function (object) {
	  return new (object.proto().constructor(object))();
	}).case(_helpers.isElement, function (object, deep) {
	  return object.clone(deep);
	}).case(_helpers.isDate, function (object) {
	  return new Date(object);
	}).case(_helpers.isRegExp, function (object) {
	  return new RegExp(object.source, object.flags);
	}).case(_helpers.isArray, function () {
	  return [];
	}).case(_helpers.isPlainObject, function () {
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
	    _classCallCheck(this, Super);
	
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
	
	
	  _createClass(Super, [{
	    key: 'assign',
	
	
	    /**
	     * @method Super#assign
	     * @public
	     * @param {...*} objects - Objects to be assigned to the object.
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
	
	      (0, _helpers.iterate)(object && arguments, function (o) {
	        (0, _helpers.iterate)(new Super(o).$, function (value, key) {
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
	      var callback = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	
	      (0, _helpers.validate)([callback], ['function||!'], 'Super#average');
	
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
	      (0, _helpers.validate)([func], ['function'], 'Super#call');
	
	      return func.apply(this, [].slice.call(arguments, 1));
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
	        (0, _helpers.iterate)(object, function (value, key) {
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
	      return (0, _D2.default)((0, _helpers.isPrimitive)(this.$) ? undefined : Object.create(this.$, descriptors));
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
	      for (var _len2 = arguments.length, objects = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        objects[_key2] = arguments[_key2];
	      }
	
	      var object = this.$;
	
	      if ((0, _helpers.isPrimitive)(object)) {
	        return this;
	      }
	
	      (0, _helpers.iterate)(arguments, function (o) {
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
	      var object = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	
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
	      var n = arguments.length <= 1 || arguments[1] === undefined ? Infinity : arguments[1];
	
	      (0, _helpers.validate)([callback, n], ['function', ['numberLike', '>0']], 'Super#deepForEach');
	
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
	      var n = arguments.length <= 1 || arguments[1] === undefined ? Infinity : arguments[1];
	
	      (0, _helpers.validate)([callback, n], ['function', ['numberLike', '>0']], 'Super#deepMap');
	
	      n = Number(n);
	
	      return (0, _D2.default)(_deepMap(this.$, callback, n, [{ key: null, value: this.$ }]));
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
	      var object = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	
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
	        property = _defineProperty({}, property, descriptor);
	      }
	
	      property = new Super(property).$;
	
	      if ((0, _helpers.isObject)(this.$)) {
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
	
	      for (var _len3 = arguments.length, props = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	        props[_key3] = arguments[_key3];
	      }
	
	      (0, _helpers.iterate)(object && props, function (property) {
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
	      return o == object || (0, _helpers.isNaN)(o) && (0, _helpers.isNaN)(object);
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
	      var callback = arguments.length <= 0 || arguments[0] === undefined ? Boolean : arguments[0];
	
	      (0, _helpers.validate)([callback], ['function'], 'Super#every');
	
	      return (0, _helpers.iterate)(this.$, function (value, key, object) {
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
	      (0, _helpers.validate)([callback], ['function'], 'Super#find');
	
	      return (0, _helpers.iterate)(this.$, function (value, key, object) {
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
	      (0, _helpers.validate)([callback], ['function'], 'Super#forEach');
	
	      (0, _helpers.iterate)(this.$, function (value, key, object) {
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
	        property = _defineProperty({}, property, getter);
	      }
	
	      var object = this.$;
	
	      (0, _helpers.iterate)((0, _helpers.isObject)(object) && new Super(property).$, function (getter, property) {
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
	
	      if (!(0, _helpers.isObject)(object)) {
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
	
	      if (!(0, _helpers.isObject)(object)) {
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
	      if (arguments.length === 1 && !(0, _helpers.isFunction)(replacer) && !(0, _helpers.isArray)(replacer)) {
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
	      var key = (0, _helpers.iterate)(this.$, function (val, key) {
	        if (val == value || (0, _helpers.isNaN)(val) && (0, _helpers.isNaN)(value)) {
	          return key;
	        }
	      });
	
	      return (0, _helpers.isUndefined)(key) ? null : key;
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
	      var key = (0, _helpers.iterate)(this.$, function (val, key) {
	        if (val === value || (0, _helpers.isNaN)(val) && (0, _helpers.isNaN)(value)) {
	          return key;
	        }
	      });
	
	      return (0, _helpers.isUndefined)(key) ? null : key;
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
	
	      return (0, _D2.default)((0, _helpers.isObject)(object) ? Object.keys(object) : []);
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
	      (0, _helpers.validate)([callback], ['function'], 'Super#map');
	
	      var object = this.$;
	      var o = (0, _helpers.isArrayLike)(object) ? [] : (0, _helpers.isNull)(object) ? null : {};
	
	      (0, _helpers.iterate)(object, function (value, key) {
	        o[key] = callback(value, key, object);
	      });
	
	      return (0, _D2.default)(o);
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
	      var callback = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	
	      (0, _helpers.validate)([callback], ['function||!'], 'Super#max');
	
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
	      var callback = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	
	      (0, _helpers.validate)([callback], ['function||!'], 'Super#min');
	
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
	      var _object = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	      (0, _helpers.validate)([callback], ['function'], 'Super#object');
	
	      (0, _helpers.iterate)(this.$, function (value, key, obj) {
	        callback(_object, value, key, obj);
	      });
	
	      return (0, _D2.default)(_object);
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
	      if (arguments.length <= 1 && (0, _helpers.isString)(property)) {
	        return this.$ ? this.$[property] : undefined;
	      }
	
	      if (arguments.length >= 2) {
	        property = _defineProperty({}, property, value);
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
	
	      return (0, _helpers.isObject)(object) ? Object.getOwnPropertyDescriptor(object, property) : undefined;
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
	
	      return (0, _D2.default)((0, _helpers.isObject)(object) ? Object.getOwnPropertyNames(object) : []);
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
	
	      return (0, _D2.default)((0, _helpers.isObject)(object) ? Object.getOwnPropertySymbols(object) : []);
	    }
	
	    /**
	     * @method Super#proto
	     * @public
	     * @param {*} [proto] - If it's present it's set as a prototype to the object.
	     * @returns {DWrap|*} In getter mode returns prototype and in setter mode returns this.
	     * @description Synonym for both
	     * [Object.getPrototypeOf]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf}
	     * and
	     * [Object.setPrototypeOf]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf}.
	     */
	
	  }, {
	    key: 'proto',
	    value: function proto(_proto) {
	      var object = this.$;
	
	      if (arguments.length) {
	        if ((0, _helpers.isObject)(object)) {
	          Object.setPrototypeOf(object, _proto);
	        }
	
	        return this;
	      }
	
	      return (0, _helpers.isObject)(object) ? Object.getPrototypeOf(object) : undefined;
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
	        property = _defineProperty({}, property, setter);
	      }
	
	      var object = this.$;
	
	      (0, _helpers.iterate)((0, _helpers.isObject)(object) && new Super(property).$, function (setter, property) {
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
	      var callback = arguments.length <= 0 || arguments[0] === undefined ? Boolean : arguments[0];
	
	      (0, _helpers.validate)([callback], ['function'], 'Super#some');
	
	      return (0, _helpers.iterate)(this.$, function (value, key, object) {
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
	
	      return o === object || (0, _helpers.isNaN)(o) && (0, _helpers.isNaN)(object);
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
	      var callback = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	
	      (0, _helpers.validate)([callback], ['function||!'], 'Super#sum');
	
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
	        property = _defineProperty({}, property, _value);
	      }
	
	      var object = this.$;
	
	      (0, _helpers.iterate)((0, _helpers.isObject)(object) && new Super(property).$, function (value, property) {
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
	
	      (0, _helpers.iterate)(this.$, function (value) {
	        array.push(value);
	      });
	
	      return (0, _D2.default)(array);
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
	      var callback = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	
	      (0, _helpers.validate)([callback], ['function||!'], 'Super#word');
	
	      return this.reduce(function (word, value, key, object) {
	        return word + String(callback ? callback(value, key, object) : value);
	      }, '');
	    }
	  }, {
	    key: 'count',
	    get: function get() {
	      var object = this.$;
	
	      if (!(0, _helpers.isObject)(object)) {
	        return 0;
	      }
	
	      return (0, _helpers.isArrayLike)(object) ? object.length : Object.keys(object).length;
	    }
	  }, {
	    key: 'toStringTag',
	    get: function get() {
	      return (0, _helpers.toStringTag)(this.$);
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
	        property = _defineProperty({}, property, value);
	      }
	
	      (0, _helpers.defineProperties)(this, property);
	
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
	        property = _defineProperty({}, property, value);
	      }
	
	      (0, _helpers.defineProperties)(this.prototype, property);
	
	      return this;
	    }
	  }]);
	
	  return Super;
	}();
	
	exports.Super = Super;
	
	
	(0, _helpers.defineProperties)(Super.prototype, _defineProperty({}, _helpers.Symbol.toStringTag, 'Super'));
	
	/**
	 * @function deepAssign
	 * @private
	 * @param {*} target - Object to assign properties to.
	 * @param {*} object - Object to assign properties from.
	 * @returns {void}
	 */
	function _deepAssign(target, object) {
	  (0, _helpers.iterate)(object, function (value, key) {
	    if ((0, _helpers.isPrimitive)(value)) {
	      target[key] = value;
	
	      return;
	    }
	
	    var hasProperty = {}.hasOwnProperty.call(target, key);
	
	    if ((0, _helpers.isPrimitive)(target[key]) || !hasProperty) {
	      target[key] = _deepClone(value);
	
	      return;
	    }
	
	    _deepAssign(target[key], value);
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
	    (0, _helpers.iterate)(object, function (value, key) {
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
	
	  if (!(0, _helpers.isPlainObject)(o1) && !(0, _helpers.isArray)(o1) || !(0, _helpers.isPlainObject)(o2) && !(0, _helpers.isArray)(o2)) {
	    return false;
	  }
	
	  var p1 = Object.getPrototypeOf(o1);
	  var p2 = Object.getPrototypeOf(o1);
	
	  if (Object.keys(o1).length !== Object.keys(o2).length) {
	    return false;
	  }
	
	  if (p1 && p2 && (0, _helpers.toStringTag)(p1.constructor) !== (0, _helpers.toStringTag)(p2.constructor)) {
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
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Switcher = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.switcher = switcher;
	exports.when = when;
	
	var _helpers = __webpack_require__(8);
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
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
	  _inherits(Switcher, _Function);
	
	  function Switcher() {
	    var cases = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var mode = arguments.length <= 1 || arguments[1] === undefined ? 'equals' : arguments[1];
	
	    var _ret;
	
	    var defaultValue = arguments[2];
	
	    _classCallCheck(this, Switcher);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Switcher).call(this));
	
	    if ((0, _helpers.isString)(cases)) {
	      if (!(0, _helpers.isUndefined)(arguments[1])) {
	        defaultValue = mode;
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
	
	    return _ret = switcher, _possibleConstructorReturn(_this, _ret);
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
	
	
	  _createClass(Switcher, [{
	    key: 'case',
	    value: function _case(cases, value) {
	      var _this2 = this;
	
	      if (!(0, _helpers.isArray)(cases)) {
	        cases = [cases];
	      }
	
	      (0, _helpers.iterate)(cases, function (Case) {
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
	
	exports.Switcher = Switcher;
	
	
	(0, _helpers.defineProperties)(Switcher.prototype, _defineProperty({}, _helpers.Symbol.toStringTag, 'Switcher'));
	
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
	
	exports.default = Switcher;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.BlobObject = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.blob = blob;
	
	var _Super2 = __webpack_require__(18);
	
	var _Super3 = _interopRequireDefault(_Super2);
	
	var _Promise = __webpack_require__(21);
	
	var _Promise2 = _interopRequireDefault(_Promise);
	
	var _constructors = __webpack_require__(6);
	
	var _constructors2 = _interopRequireDefault(_constructors);
	
	var _helpers = __webpack_require__(8);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
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
	var URL = global.URL;
	
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
	
	var BlobObject = exports.BlobObject = function (_Super) {
	  _inherits(BlobObject, _Super);
	
	  function BlobObject() {
	    _classCallCheck(this, BlobObject);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(BlobObject).apply(this, arguments));
	  }
	
	  _createClass(BlobObject, [{
	    key: 'readAs',
	
	
	    /**
	     * @method BlobObject#readAs
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
	    value: function readAs(method, progress) {
	      var _this2 = this;
	
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
	
	        reader.onerror = function (_ref) {
	          var target = _ref.target;
	
	          if (reader) {
	            reject(target.error);
	          }
	        };
	
	        reader.onload = function (_ref2) {
	          var target = _ref2.target;
	
	          resolve(target.result);
	        };
	
	        reader['readAs' + methods[method]](_this2.$);
	      });
	
	      promise.abort = function abort() {
	        toReject(new Error('Reading was aborted'));
	
	        reader.abort();
	
	        reader = null;
	
	        return this;
	      };
	
	      return promise;
	    }
	
	    /**
	     * @method BlobObject#saveAs
	     * @public
	     * @param {String} [name] - Name that is used for saving file.
	     * @returns {BlobObject} Returns this.
	     * @description Method for saving blobs.
	     *
	     * @example
	     * new BlobObject(new Blob(['{"foo":"bar"}'], { type: 'application/json' }))
	     *   .saveAs('blob.json');
	     */
	
	  }, {
	    key: 'saveAs',
	    value: function saveAs() {
	      var name = arguments.length <= 0 || arguments[0] === undefined ? 'download' : arguments[0];
	
	      var anchor = document.createElement('a');
	
	      anchor.href = this.dataURL;
	      anchor.setAttribute('download', name);
	      anchor.click();
	
	      return this;
	    }
	  }, {
	    key: 'dataURL',
	
	    /**
	     * @member BlobObject#$
	     * @type {Blob}
	     * @public
	     * @description Original Blob.
	     */
	
	    /**
	     * @member {String} BlobObject#dataURL
	     * @type {String}
	     * @public
	     * @readonly
	     * @description Returns dataURL representation of the blob.
	     */
	    get: function get() {
	      return URL.createObjectURL(this.$);
	    }
	  }]);
	
	  return BlobObject;
	}(_Super3.default);
	
	(0, _helpers.defineProperties)(BlobObject.prototype, _defineProperty({}, _helpers.Symbol.toStringTag, 'BlobObject'));
	
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
	function blob(blobParts) {
	  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	  if (!(0, _helpers.isArray)(blobParts)) {
	    blobParts = [blobParts];
	  }
	
	  return new BlobObject(new Blob(blobParts, options));
	}
	
	exports.default = BlobObject;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Promise = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @module Promise
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @private
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @mixin
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @description Exports Promise class.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
	
	var _helpers = __webpack_require__(8);
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var secret = {};
	var iterator = _helpers.Symbol.iterator;
	
	var Promise = exports.Promise = function () {
	  function Promise(executor) {
	    _classCallCheck(this, Promise);
	
	    if (!(0, _helpers.isFunction)(executor)) {
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
	        if (value && (0, _helpers.isFunction)(value.then)) {
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
	
	  _createClass(Promise, [{
	    key: 'abort',
	    value: function abort() {}
	  }, {
	    key: 'catch',
	    value: function _catch(onRejected) {
	      return resolveOrReject(this.$$, null, onRejected);
	    }
	  }, {
	    key: 'then',
	    value: function then(onFulfilled, onRejected) {
	      return resolveOrReject(this.$$, onFulfilled, onRejected);
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
	    }
	  }, {
	    key: 'race',
	    value: function race(iterable) {
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
	      if (value && (0, _helpers.isFunction)(value.then)) {
	        return value;
	      }
	
	      return new Promise(function (resolve) {
	        resolve(value);
	      });
	    }
	  }]);
	
	  return Promise;
	}();
	
	(0, _helpers.defineProperties)(Promise.prototype, _defineProperty({}, _helpers.Symbol.toStringTag, 'Promise'));
	
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
	
	  if (promise.status === 'fulfilled') {
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
	exports.Dat = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.now = now;
	exports.date = date;
	
	var _Super2 = __webpack_require__(18);
	
	var _Super3 = _interopRequireDefault(_Super2);
	
	var _Num = __webpack_require__(23);
	
	var _Num2 = _interopRequireDefault(_Num);
	
	var _Str = __webpack_require__(25);
	
	var _Str2 = _interopRequireDefault(_Str);
	
	var _Switcher = __webpack_require__(19);
	
	var _constructors = __webpack_require__(6);
	
	var _constructors2 = _interopRequireDefault(_constructors);
	
	var _formats = __webpack_require__(27);
	
	var _formats2 = _interopRequireDefault(_formats);
	
	var _helpers = __webpack_require__(8);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
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
	
	var Dat = function (_Super) {
	  _inherits(Dat, _Super);
	
	  function Dat() {
	    var date = arguments.length <= 0 || arguments[0] === undefined ? new Date() : arguments[0];
	
	    _classCallCheck(this, Dat);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Dat).call(this, date));
	
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
	
	
	  _createClass(Dat, [{
	    key: 'add',
	    value: function add(what, number) {
	      if (arguments.length >= 2) {
	        what = _defineProperty({}, what, number);
	      }
	
	      return this.time(this.time() + new _Super3.default(what).sum(function (value, what) {
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
	
	      return new _Num2.default(this.$ - now()).timeout(value);
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
	
	      var prefix = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
	
	      string = new _Str2.default(new _Super3.default(string).$);
	      prefix = String(new _Super3.default(prefix).$);
	
	      (0, _helpers.iterate)(_formats2.default, function (format) {
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
	
	      var prefix = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
	
	      string = new _Str2.default(new _Super3.default(string).$);
	      prefix = String(new _Super3.default(prefix).$);
	
	      (0, _helpers.iterate)(_formats2.default, function (format) {
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
	      date = new Date(new _Super3.default(date).$);
	
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
	      date = new Date(new _Super3.default(date).$);
	
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
	
	      date1 = new Date(new _Super3.default(date1).$);
	      date2 = new Date(new _Super3.default(date2).$);
	
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
	
	      return (0, _helpers.iterate)(coeffs, function (coeff, w) {
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
	        what = _defineProperty({}, what, number);
	      }
	
	      what = new _Super3.default(what).$;
	
	      (0, _helpers.iterate)(what, function (value, what) {
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
	        what = _defineProperty({}, what, number);
	      }
	
	      what = new _Super3.default(what).$;
	
	      (0, _helpers.iterate)(what, function (value, what) {
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
	}(_Super3.default);
	
	exports.Dat = Dat;
	
	(0, _helpers.defineProperties)(Dat.prototype, _defineProperty({}, _helpers.Symbol.toStringTag, 'Dat'));
	
	_constructors2.default[1].push({
	  check: _helpers.isDate,
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
	    return new Dat(new Date());
	  }
	
	  date = new _Super3.default(date).$;
	
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
	exports.Num = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.rand = rand;
	exports.random = random;
	
	var _Super2 = __webpack_require__(18);
	
	var _Super3 = _interopRequireDefault(_Super2);
	
	var _Func = __webpack_require__(24);
	
	var _Func2 = _interopRequireDefault(_Func);
	
	var _Promise = __webpack_require__(21);
	
	var _Promise2 = _interopRequireDefault(_Promise);
	
	var _constructors = __webpack_require__(6);
	
	var _constructors2 = _interopRequireDefault(_constructors);
	
	var _helpers = __webpack_require__(8);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
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
	
	var Num = exports.Num = function (_Super) {
	  _inherits(Num, _Super);
	
	  function Num() {
	    var number = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	
	    _classCallCheck(this, Num);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Num).call(this, number));
	
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
	
	
	  _createClass(Num, [{
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
	      (0, _helpers.validate)([func], ['function'], 'Num#interval');
	
	      func = new _Func2.default(func).bindContext({ abort: abort });
	
	      var number = this.$;
	      var args = [].slice.call(arguments, 1);
	
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
	
	      var promise = new _Promise2.default(function (resolve, rej) {
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
	      var base = arguments.length <= 0 || arguments[0] === undefined ? 10 : arguments[0];
	
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
	
	      if (!(0, _helpers.isFinite)(number)) {
	        return this.sign;
	      }
	
	      var exp = Math.exp(2 * number);
	
	      return (exp - 1) / (exp + 1);
	    }
	  }]);
	
	  return Num;
	}(_Super3.default);
	
	(0, _helpers.defineProperties)(Num.prototype, _defineProperty({}, _helpers.Symbol.toStringTag, 'Num'));
	
	_constructors2.default[1].push({
	  check: _helpers.isNumber,
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
	  var start = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	  var end = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];
	
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
	  (0, _helpers.validate)([start, end], ['intLike', 'intLike'], 'random');
	
	  if (end <= start) {
	    throw new Error('The second argument must be greater than the first!', 'random');
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
	exports.Func = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.method = method;
	exports.noop = noop;
	exports.self = self;
	
	var _Super2 = __webpack_require__(18);
	
	var _Super3 = _interopRequireDefault(_Super2);
	
	var _Promise = __webpack_require__(21);
	
	var _Promise2 = _interopRequireDefault(_Promise);
	
	var _constructors = __webpack_require__(6);
	
	var _constructors2 = _interopRequireDefault(_constructors);
	
	var _helpers = __webpack_require__(8);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
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
	
	var Func = exports.Func = function (_Super) {
	  _inherits(Func, _Super);
	
	  function Func() {
	    var _ret2;
	
	    var func = arguments.length <= 0 || arguments[0] === undefined ? function () {} : arguments[0];
	
	    _classCallCheck(this, Func);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Func).call(this));
	
	    if (func instanceof Func) {
	      var _ret;
	
	      return _ret = func, _possibleConstructorReturn(_this, _ret);
	    }
	
	    function proxy() {
	      var _this2 = this,
	          _arguments = arguments;
	
	      if (++proxy.$$.called < proxy.$$.canBeCalled) {
	        var _ret3 = function () {
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
	              return middleware.call(context, (0, _helpers.toArray)(args), proxy);
	            });
	          });
	
	          promise = promise.then(function (args) {
	            return func.apply(context, (0, _helpers.toArray)(args));
	          });
	
	          (0, _helpers.iterate)(after, function (middleware) {
	            promise = promise.then(function (ret) {
	              return middleware.call(context, ret, proxy);
	            });
	          });
	
	          return {
	            v: promise
	          };
	        }();
	
	        if ((typeof _ret3 === 'undefined' ? 'undefined' : _typeof(_ret3)) === "object") return _ret3.v;
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
	
	    return _ret2 = proxy, _possibleConstructorReturn(_this, _ret2);
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
	
	
	  _createClass(Func, [{
	    key: 'after',
	    value: function after(middleware) {
	      var afterAll = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
	
	      (0, _helpers.validate)([middleware], ['function'], 'Func#after');
	
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
	      var condition = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
	
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
	      var beforeAll = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
	
	      (0, _helpers.validate)([middleware], ['function'], 'Func#before');
	
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
	
	      return this.bindContext(context).bindArgs((0, _helpers.toArray)(arguments).slice(1));
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
	
	      func.args = func.args.concat((0, _helpers.toArray)(args));
	
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
	
	      func.args = func.argsLocked = func.argsLocked.concat((0, _helpers.toArray)(args));
	
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
	}(_Super3.default);
	
	(0, _helpers.defineProperties)(Func.prototype, _defineProperty({}, _helpers.Symbol.toStringTag, 'Func'));
	
	_constructors2.default[1].push({
	  check: _helpers.isFunction,
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
	 * @public
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
	exports.Str = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.parseJSON = parseJSON;
	
	var _D = __webpack_require__(3);
	
	var _D2 = _interopRequireDefault(_D);
	
	var _Super2 = __webpack_require__(18);
	
	var _Super3 = _interopRequireDefault(_Super2);
	
	var _constructors = __webpack_require__(6);
	
	var _constructors2 = _interopRequireDefault(_constructors);
	
	var _regexpSpecialCharacters = __webpack_require__(26);
	
	var _regexpSpecialCharacters2 = _interopRequireDefault(_regexpSpecialCharacters);
	
	var _helpers = __webpack_require__(8);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
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
	var regexpSpecialsRegexp = new RegExp(new _Super3.default(_regexpSpecialCharacters2.default).word(function (x) {
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
	
	var Str = exports.Str = function (_Super) {
	  _inherits(Str, _Super);
	
	  function Str() {
	    var string = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	
	    _classCallCheck(this, Str);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Str).call(this, string));
	
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
	
	
	  _createClass(Str, [{
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
	
	      (0, _helpers.iterate)(htmlSpecials, function (escaped, symbol) {
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
	      if (!(0, _helpers.isObject)(object)) {
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
	      return (0, _D2.default)(this.$.match.apply(this.$, arguments));
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
	      (0, _helpers.validate)([times], [['intLike', '>=0']], 'Str#repeat');
	
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
	      var replacer = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
	
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
	      var replacer = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
	
	      string = new _Super3.default(string).$;
	
	      (0, _helpers.validate)([string], ['string'], 'Str#replaceString');
	
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
	      (0, _helpers.validate)([regexp], ['regexp']);
	
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
	      return (0, _D2.default)(this.$.split.apply(this.$, arguments));
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
	      var position = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	
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
	}(_Super3.default);
	
	(0, _helpers.defineProperties)(Str.prototype, _defineProperty({}, _helpers.Symbol.toStringTag, 'Str'));
	
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
	  var json = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	  var callback = arguments[2];
	
	  if (arguments.length <= 1) {
	    return (0, _D2.default)(JSON.parse(json));
	  }
	
	  if ((0, _helpers.isFunction)(options)) {
	    callback = options;
	    options = {};
	  }
	
	  var _options = options;
	  var numbers = _options.numbers;
	  var dates = _options.dates;
	
	  var parsed = JSON.parse(json, function (key, value) {
	    if (dates && /^\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d\.\d\d\dZ?$/.test(value)) {
	      value = new Date(value);
	    } else if (numbers && (0, _helpers.isNumberLike)(value) && (0, _helpers.isString)(value)) {
	      value = Number(value);
	    }
	
	    return callback ? callback.apply(this, arguments) : value;
	  });
	
	  return (0, _D2.default)(parsed);
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
	
	var _Super = __webpack_require__(18);
	
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
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.find = exports.head = exports.body = exports.html = exports.document = exports.window = exports.Elem = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	exports.parseHTML = parseHTML;
	exports.px = px;
	
	var _Super = __webpack_require__(18);
	
	var _Super2 = _interopRequireDefault(_Super);
	
	var _Arr2 = __webpack_require__(17);
	
	var _Arr3 = _interopRequireDefault(_Arr2);
	
	var _BlobObject = __webpack_require__(20);
	
	var _Fetch = __webpack_require__(29);
	
	var _Fetch2 = _interopRequireDefault(_Fetch);
	
	var _Promise = __webpack_require__(21);
	
	var _Promise2 = _interopRequireDefault(_Promise);
	
	var _Str = __webpack_require__(25);
	
	var _Str2 = _interopRequireDefault(_Str);
	
	var _Switcher = __webpack_require__(19);
	
	var _constructors = __webpack_require__(6);
	
	var _constructors2 = _interopRequireDefault(_constructors);
	
	var _appliedRegExps = __webpack_require__(33);
	
	var _appliedRegExps2 = _interopRequireDefault(_appliedRegExps);
	
	var _elements = __webpack_require__(34);
	
	var _elements2 = _interopRequireDefault(_elements);
	
	var _canvasMethods = __webpack_require__(35);
	
	var _helpers = __webpack_require__(8);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @module Elem
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @private
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @mixin
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @description Exports Elem class.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	/**
	 * @typedef {String} ElemEventString
	 * @public
	 * @description A string containing events separated by a comma with zero or more spaces or just spaces.
	 */
	
	/**
	 * @callback ElemValueCallback
	 * @public
	 * @param {String} value - Old value.
	 * @param {Elem} elem - Current element.
	 * @param {Number} index - Index in the set of the elements.
	 */
	
	/**
	 * @callback ElemSetOfCallback
	 * @public
	 * @param {Element} created - Created element.
	 * @param {*} value - Value of the iterated element in the object.
	 * @param {Key} key - Key of the iterated element in the object.
	 * @param {*} object - Object that is iterated over.
	 * @param {Element} elem - Current element.
	 * @param {Number} index - Index of the current element.
	 */
	
	/**
	 * @callback ValidateCallback
	 * @public
	 * @param {*} value - Element value.
	 * @param {Element} elem - Element to validate.
	 * @param {Number} index - Index of the element.
	 */
	
	/**
	 * @callback CtxCallback
	 * @public
	 * @param {CanvasRenderingContext2D} ctx - Canvas rendering context.
	 */
	
	/**
	 * @callback Listener
	 * @public
	 * @param {Event} e - Fired event.
	 * @param {Element} elem - Element on which the listener was called.
	 * @param {Number} index - Index of the element on which the listener was called.
	 */
	
	/**
	 * @callback ElemRemoveListeners
	 * @public
	 * @param {...ElemEventString} events - If at least one argument present only removes event listeners specified
	 * by the events in the arguments.
	 */
	
	var nativeDocument = global.document;
	var empty = nativeDocument.createElement('div');
	var eventSeparator = /, *| +/;
	var textProperty = new _Super2.default(Node.prototype).propertyDescriptor('textContent') ? 'textContent' : 'innerText';
	var classes = {};
	var attrs = {};
	var windowsDwayneData = new _Arr3.default();
	var inputElements = 'input, select, textarea, datalist, keygen, output';
	var dataURLFetch = new _Fetch2.default({ responseType: 'arraybuffer' });
	var refSwitcher = (0, _Switcher.switcher)('strictEquals', 'href').case(['img', 'script', 'iframe', 'audio', 'video'], 'src').case('form', 'action');
	var filterSwitcher = (0, _Switcher.switcher)('call', function (selector) {
	  return selector;
	}).case(_helpers.isString, function (selector) {
	  return function (elem) {
	    return new Elem(elem).is(selector);
	  };
	}).case([_helpers.isArray, isElem], function (elems) {
	  elems = new _Arr3.default(elems);
	
	  return function (elem) {
	    return elems.indexOf(elem) !== -1;
	  };
	});
	var formDataSwitcher = (0, _Switcher.switcher)('strictEquals', function (_ref) {
	  var value = _ref.value;
	  return value;
	}).case('file', function (_ref2) {
	  var files = _ref2.files;
	  return files;
	});
	var innerSwitcher = (0, _Switcher.switcher)('strictEquals', 0).case('padding-box', function (paddings) {
	  return paddings;
	}).case('border-box', function (paddings, borders) {
	  return paddings + borders;
	});
	var outerSwitcher = (0, _Switcher.switcher)('strictEquals', function (borders, paddings) {
	  return borders + paddings;
	}).case('padding-box', function (borders) {
	  return borders;
	}).case('border-box', 0);
	
	/**
	 * @class Elem
	 * @extends Arr
	 * @public
	 * @param {Element|Element[]} [elem = []] - An element or an array of elements to wrap.
	 * @returns {Elem} Instance of Elem.
	 * @description Wrap of an elements set. Also has all methods from from
	 * [CanvasRenderingContext2D]{@link https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D}.
	 * Getters methods return the same as methods from CanvasRenderingContext2D and the rest return this.
	 * Work for the first canvas element in the set.
	 *
	 * @example
	 * new Elem(document.body);
	 * new Elem(document.querySelectorAll('.cls'));
	 * new Elem(document.getElementsByClassName('cls'));
	 */
	
	var Elem = function (_Arr) {
	  _inherits(Elem, _Arr);
	
	  function Elem() {
	    var elem = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	
	    _classCallCheck(this, Elem);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Elem).call(this, function () {
	      var element = elem;
	
	      if ((0, _helpers.isArrayLike)(element) && (isWindow(element) || isHTMLDocument(element) || (0, _helpers.isElement)(element))) {
	        element = [element];
	      }
	
	      return new _Arr3.default((0, _helpers.toArray)(new _Super2.default(element).$, true)).object(function (elems, elem) {
	        if (((0, _helpers.isElement)(elem) || isWindow(elem) || isHTMLDocument(elem) || (0, _helpers.toStringTag)(elem) === 'CSSStyleRule') && elems.indexOf(elem) === -1) {
	          elems.push(elem);
	        }
	      }, []).$;
	    }()));
	
	    _this.$$ = elem;
	
	    _this.forEach(addDwayneData);
	
	    /**
	     * @member {Element[]} Elem#$
	     * @type {Element[]}
	     * @public
	     * @description Constructed element set.
	     */
	
	    /**
	     * @member {*} Elem#$$
	     * @type {*}
	     * @public
	     * @description Initial element set.
	     */
	    return _this;
	  }
	
	  /**
	   * @method Elem#add
	   * @public
	   * @param {...(String|Elem|Element|Element[])} elements - Each argument is a selector, or Elem, or Element, or array of Elements.
	   * @returns {Elem} Returns this.
	   * @description Method for adding new elements to the set.
	   *
	   * @example
	   *
	   */
	
	
	  _createClass(Elem, [{
	    key: 'add',
	    value: function add() {
	      var _this2 = this;
	
	      for (var _len = arguments.length, elements = Array(_len), _key = 0; _key < _len; _key++) {
	        elements[_key] = arguments[_key];
	      }
	
	      (0, _helpers.iterate)(arguments, function (elem) {
	        toFind(elem).forEach(function (elem) {
	          if (_this2.indexOf(elem) === -1) {
	            _this2.push(elem);
	          }
	        });
	      });
	
	      return this;
	    }
	
	    /**
	     * @method Elem#addClass
	     * @public
	     * @param {...String} classes - Classes to add.
	     * @returns {Elem} Returns this.
	     * @description Method for adding classes to the all the elements in the set.
	     *
	     * @example
	     * elem.addClass('red', 'round');
	     */
	
	  }, {
	    key: 'addClass',
	    value: function addClass() {
	      for (var _len2 = arguments.length, classes = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        classes[_key2] = arguments[_key2];
	      }
	
	      return this.forEach(function (elem) {
	        var list = elem.classList;
	
	        list.add.apply(list, classes);
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
	     * elem.addHTML('&lt;div&gt;1&lt;/div&gt;');
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
	     * Note: style element should be inside the document.
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
	        if (getName(elem) === 'style') {
	          var sheet = elem.sheet;
	          var length = sheet.cssRules.length;
	
	          var rules = new _Super2.default(style).word(function (value, property) {
	            return new _Str2.default(property).toHyphenCase() + ': ' + value + ';\n';
	          });
	
	          sheet.insertRule(selector + ' {' + (rules && '\n') + rules + '}', length);
	          sheet.cssRules[length].dwayneData = { name: name };
	
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
	     * //   .addClass('c1', 'c2')
	     * //   .border('1px solid black')
	     * //   .disabled()
	     * //   .attr('attr', 'some value')
	     * //   .text('Click me!');
	     * // There is a full list of possible types of syntax below...
	     *
	     * elem.apply('#id');                         // shorthand for elem.id('id');
	     * elem.apply('.c1 .c2');                     // shorthand for elem.addClass('c1', 'c2');
	     * elem.apply('-.c1 -.c2');                   // shorthand for elem.removeClass('c1', 'c2');
	     * elem.apply('-@float -@display');           // shorthand for elem.removeCSS('float', 'display');
	     * elem.apply('-$a1 -$a2');                   // shorthand for elem.removeAttr('a1', 'a2');
	     * elem.apply('*(some text)');                // shorthand for elem.text('set text');
	     * elem.apply('&(&lt;div&gt;1&lt;/div&gt;)'); // shorthand for elem.html('&lt;div&gt;1&lt;/div&gt;');
	     * elem.apply('@float(right)');               // shorthand for elem.css('float', 'right');
	     * elem.apply('@transform(scale(5px))');      // shorthand for elem.css('float', 'right');
	     * elem.apply('@margin(2px 2px)');            // shorthand for elem.css('margin', '2px 2px');
	     * elem.apply('@marginLeft(2px)');            // shorthand for elem.css('marginLeft', '2px 2px');
	     * elem.apply('@margin-left(2px)');           // shorthand for elem.css('margin-left', '2px 2px');
	     * elem.apply('$attr(some value)');           // shorthand for elem.attr('attr', 'some value');
	     * elem.apply('$attr');                       // shorthand for elem.attr('attr', '');
	     */
	
	  }, {
	    key: 'apply',
	    value: function apply() {
	      var _this3 = this;
	
	      for (var _len3 = arguments.length, strings = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	        strings[_key3] = arguments[_key3];
	      }
	
	      var applied = void 0;
	      var setApplied = void 0;
	      var callback = void 0;
	      var name = void 0;
	      var np1 = void 0;
	      var slice = void 0;
	
	      new _Str2.default(new _Arr3.default(arguments).join(' ')).split(/(\s+)/).forEach(function (string) {
	        if (!applied) {
	          np1 = string.slice(0, 1);
	          callback = _appliedRegExps2.default[np1];
	          slice = 1;
	
	          if (callback && !(0, _helpers.isFunction)(callback)) {
	            callback = callback[string.slice(1, 2)];
	            slice = 2;
	          }
	
	          if (/^\s+$/.test(string) || !callback) {
	            return;
	          }
	
	          name = string.slice(slice).match(/^[^()]+/);
	
	          if (!name && np1 !== '*' && np1 !== '&') {
	            return;
	          }
	
	          applied = {
	            name: name ? name[0] : '',
	            args: string.slice(slice + (name ? name[0] : '').length),
	            callback: callback
	          };
	
	          setApplied = true;
	        }
	
	        if (!setApplied) {
	          applied.args += string;
	        }
	
	        if (!applied.args || /^\([\s\S]+\)$/.test(applied.args)) {
	          applied.callback(_this3, applied.name, applied.args.replace(/^\(|\)$/g, ''));
	          applied = null;
	        }
	
	        setApplied = false;
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
	      var _this4 = this;
	
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
	        _this4.forEach(function (elem, index) {
	          elem.setAttribute(key, (0, _helpers.isFunction)(value) ? value(elem.getAttribute(key), elem, index) : value);
	        });
	      });
	
	      _helpers.crossClassMethods.transformAnchor(this);
	
	      return this;
	    }
	
	    /**
	     * @method Elem#blob
	     * @public
	     * @param {Object} [options = {}] - Options that are passed into {@link blob}.
	     * @returns {Promise.<BlobObject>} New instance of promise.
	     * @description Returns a {@link BlobObject} Promise. Works with image or canvas first element.
	     *
	     * @example
	     * image.blob().then((blob) => console.log(blob));  // BlobObject
	     * canvas.blob().then((blob) => console.log(blob)); // BlobObject
	     */
	
	  }, {
	    key: 'blob',
	    value: function blob() {
	      var _this5 = this;
	
	      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	      return new _Promise2.default(function (resolve, reject) {
	        var elem = _this5.first();
	        var name = elem.name;
	
	
	        if (name !== 'img' && name !== 'canvas') {
	          reject(new Error('First element in the set isn\'t an image or a canvas! (Elem#blob)'));
	        }
	
	        if (name === 'canvas') {
	          return resolve(elem);
	        }
	
	        elem.load().then(function () {
	          if (elem.isBroken()) {
	            return reject(new Error('The image is broken! (Elem#blob)'));
	          }
	
	          var canvas = new Elem(nativeDocument).canvas();
	          var width = elem.width();
	          var height = elem.height();
	
	          canvas.width(width).height(height).drawImage(elem.$[0], 0, 0);
	
	          resolve(canvas);
	        });
	      }).then(function (canvas) {
	        return dataURLFetch(canvas.dataURL());
	      }).then(function (_ref3) {
	        var ab = _ref3.data;
	        return (0, _BlobObject.blob)(ab, options);
	      });
	    }
	
	    /**
	     * @method Elem#blur
	     * @returns {Elem} Returns this.
	     * @see https://developer.mozilla.org/en/docs/Web/API/HTMLElement/blur
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
	     * @method Elem#calcCSS
	     * @param {String} [pseudo] - See the link.
	     * @returns {CSSStyleDeclaration} See the link.
	     * @see https://developer.mozilla.org/en/docs/Web/API/Window/getComputedStyle
	     * @description Synonym for
	     * [getComputedStyle]{@link https://developer.mozilla.org/en/docs/Web/API/Window/getComputedStyle}.
	     * Returns computed style for the first element in the set or undefined.
	     */
	
	  }, {
	    key: 'calcCSS',
	    value: function calcCSS() {
	      var pseudo = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	
	      return getComputedStyle(getElem(this), pseudo);
	    }
	
	    /**
	     * @method Elem#changeRule
	     * @public
	     * @param {String} name - Name of the rule.
	     * @param {Object.<String, String>} style - Style for the selector.
	     * @returns {Elem} Returns this.
	     * @description Method for changing css styles in the first style tag in the set.
	     * Note: style element should be inside the document.
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
	        if (getName(elem) === 'style') {
	          var _ref4 = new _Arr3.default(elem.sheet.cssRules).find(function (rule) {
	            return rule.dwayneData && rule.dwayneData.name === name;
	          }) || {};
	
	          var rule = _ref4.value;
	
	
	          if (rule) {
	            new Elem(rule).css(style);
	
	            return true;
	          }
	        }
	      });
	
	      return this;
	    }
	
	    /**
	     * @method Elem#child
	     * @public
	     * @param {Number|String|Elem|Element|Element[]} element - If the argument is a number a wrap of the set of the children
	     * of this index of each element in the set returned otherwise an element to put into this element, a collection
	     * or a selector of it.
	     * @returns {Elem} Returns a wrap of children or inserted elements.
	     * @description Method is similar to
	     * [Node#appendChild]{@link https://developer.mozilla.org/en/docs/Web/API/Node/appendChild}.
	     *
	     * @example
	     * const child = elem.child(1);
	     *
	     * elem.child(elem2);
	     * elem.child(document.getElementById('id'));
	     * elem.child('#id div.c1');
	     */
	
	  }, {
	    key: 'child',
	    value: function child(element) {
	      if ((0, _helpers.isInteger)(element) && element >= 0) {
	        return this.children().elem(element);
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
	      return new Elem(this.length ? this.$[0].children : []);
	    }
	
	    /**
	     * @method Elem#class
	     * @public
	     * @param {String} [cls] - If it's present it has to contain class attribute to set.
	     * @returns {Arr|Elem} If the argument is present this returned otherwise a wrap of the classes array returned.
	     * @description Method for getting/setting classes.
	     *
	     * @example
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
	     * @see https://developer.mozilla.org/en/docs/Web/API/HTMLElement/click
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
	     * @param {Boolean|*} [deep = false] - See thee link.
	     * @returns {Elem} New instance of Elem.
	     * @see https://developer.mozilla.org/en/docs/Web/API/Node/cloneNode
	     * @description Synonym for
	     * [Node#cloneNode]{@link https://developer.mozilla.org/en/docs/Web/API/Node/cloneNode}.
	     */
	
	  }, {
	    key: 'clone',
	    value: function clone() {
	      var deep = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
	
	      return this.object(function (elems, elem) {
	        elems.add(elem.cloneNode(!!deep));
	      }, new Elem());
	    }
	
	    /**
	     * @method Elem#closest
	     * @public
	     * @param {String} selector - See the link.
	     * @returns {Elem} Set of the closest elements.
	     * @description Synonym for
	     * [Element#closest]{@link https://developer.mozilla.org/en/docs/Web/API/Element/closest}.
	     */
	
	  }, {
	    key: 'closest',
	    value: function closest(selector) {
	      return this.object(function (elems, elem) {
	        while (elem) {
	          if (new Elem(elem).is(selector)) {
	            return elems.add(elem);
	          }
	
	          elem = elem.parentElement;
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
	      var _arguments = arguments;
	
	      for (var _len4 = arguments.length, appliedExpressions = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
	        appliedExpressions[_key4 - 1] = arguments[_key4];
	      }
	
	      return this.object(function (elems, elem) {
	        var element = new Elem(nativeDocument.createElement(type));
	
	        if (elem !== nativeDocument) {
	          element.into(elem);
	        }
	
	        elems.add(element.apply.apply(element, new _Arr3.default(_arguments).slice(1).$));
	      }, new Elem());
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
	     * elem.css('display', 'none'); // display set to 'none' and this returned
	     * elem.css('display');         // 'none'
	     * elem.css({
	     *   display: 'inline',         // display set to 'inline'
	     *   cursor: 'pointer'          // cursor set to 'pointer'
	     * });                          // this returned
	     * elem.css().$;                // { display: 'none', cursor: 'pointer' }
	     */
	
	  }, {
	    key: 'css',
	    value: function css(property, value) {
	      var style = getElem(this).style;
	
	      if (!arguments.length) {
	        return new _Str2.default(style.cssText).split(/; ?/).object(function (o, value) {
	          if (value) {
	            property = value.split(/: /);
	
	            o[new _Str2.default(property[0]).toCamelCase().$] = property[1];
	          }
	        });
	      }
	
	      if (arguments.length <= 1 && (0, _helpers.isString)(property)) {
	        property = new _Str2.default(property).toHyphenCase().$;
	
	        return style.getPropertyValue(property) + (style.getPropertyPriority(property) ? ' !important' : '');
	      }
	
	      if (arguments.length >= 2) {
	        property = _defineProperty({}, property, value);
	      }
	
	      return this.forEach(function (elem, index) {
	        new _Super2.default(property).forEach(function (value, property) {
	          property = new _Str2.default(property).toHyphenCase();
	
	          if ((0, _helpers.isFunction)(value)) {
	            value = value(new Elem(elem).css(property.$), elem, index);
	          }
	
	          elem.style.setProperty(property, value.replace(/!important$/, ''), /!important$/.test(value) ? 'important' : '');
	        });
	      });
	    }
	
	    /**
	     * @method Elem#ctx
	     * @public
	     * @param {String|Object|CtxCallback} [property] - If present and object
	     * it's assigned to the canvas rendering context, if function
	     * it's called with canvas rendering context argument, if string
	     * the value from the second argument is used for assigning
	     * this property to canvas rendering context and if not present
	     * canvas rendering context returned.
	     * @param {*} [value] - See the property argument.
	     * @returns {CanvasRenderingContext2D|Elem}
	     * @description Rendering context of the first canvas in the set.
	     *
	     * @example
	     * canvas.ctx; // CanvasRenderingContext2D
	     */
	
	  }, {
	    key: 'ctx',
	    value: function ctx(property, value) {
	      var ctx = void 0;
	
	      this.some(function (elem) {
	        if (getName(elem) === 'canvas') {
	          ctx = elem.dwayneData.ctx;
	
	          return true;
	        }
	      });
	
	      if (!arguments.length) {
	        return ctx;
	      }
	
	      if ((0, _helpers.isFunction)(property)) {
	        property(ctx);
	      } else {
	        if (arguments.length >= 2) {
	          property = _defineProperty({}, property, value);
	        }
	
	        (0, _helpers.assign)(ctx, property);
	      }
	
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
	      var _this6 = this;
	
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
	        _this6.forEach(function (elem, index) {
	          elem.dataset[key] = (0, _helpers.isFunction)(value) ? value(elem.dataset[key], elem, index) : value;
	        });
	      });
	
	      return this;
	    }
	
	    /**
	     * @method Elem#dataURL
	     * @param {String} [type = 'image/png'] - See the link
	     * @param {Number} [encoderOptions = 0.92] - See the link.
	     * @returns {String} Data URL for the first canvas element in the set.
	     * @see https://developer.mozilla.org/en/docs/Web/API/HTMLCanvasElement/toDataURL
	     * @description Synonym for
	     * [HTMLCanvasElement#toDataURL]{@link https://developer.mozilla.org/en/docs/Web/API/HTMLCanvasElement/toDataURL}.
	     *
	     * @example
	     * canvas.dataURL();
	     */
	
	  }, {
	    key: 'dataURL',
	    value: function dataURL(type, encoderOptions) {
	      var ctx = this.ctx();
	
	      if (!ctx) {
	        return '';
	      }
	
	      return ctx.canvas.toDataURL.apply(ctx.canvas, arguments);
	    }
	
	    /**
	     * @method Elem#deleteRule
	     * @public
	     * @param {String} name - Name of the rule.
	     * @returns {Elem} Returns this.
	     * @description Method for deleting css styles in a style tag.
	     * Note: style element should be inside the document.
	     *
	     * @example
	     * style.deleteRule('img-size');
	     */
	
	  }, {
	    key: 'deleteRule',
	    value: function deleteRule(name) {
	      this.some(function (elem) {
	        if (getName(elem) === 'style') {
	          var rule = new _Arr3.default(elem.sheet.cssRules).find(function (rule) {
	            return rule.dwayneData && rule.dwayneData.name === name;
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
	     * @method Elem#dispatch
	     * @public
	     * @param {String|Event} event - Event or a string (new Event(event) is created).
	     * @param {Object} [eventInit = {}] - See the link.
	     * @param {Boolean} [eventInit.bubbles = true] - See the link.
	     * @param {Boolean} [eventInit.cancelable = true] - See the link.
	     * @param {Object} [details = {}] - Object that is assigned to the event.
	     * @returns {Elem} Returns this.
	     * @see https://developer.mozilla.org/en/docs/Web/API/Event/Event
	     * @description Synonym for
	     * [EventTarget#dispatchEvent]{@link https://developer.mozilla.org/en/docs/Web/API/EventTarget/dispatchEvent}.
	     *
	     * @example
	     * elem.dispatch('click');
	     * elem.dispatch('click', { bubbles: false, cancellable: false });
	     * elem.dispatch(new CustomEvent('custom-event'));
	     */
	
	  }, {
	    key: 'dispatch',
	    value: function dispatch(event) {
	      var eventInit = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	      var details = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
	      var _ref5 = eventInit || {};
	
	      var _ref5$bubbles = _ref5.bubbles;
	      var bubbles = _ref5$bubbles === undefined ? true : _ref5$bubbles;
	      var _ref5$cancelable = _ref5.cancelable;
	      var cancelable = _ref5$cancelable === undefined ? true : _ref5$cancelable;
	
	      var finalEvent = event;
	
	      if (!/Event$/.test((0, _helpers.toStringTag)(finalEvent))) {
	        try {
	          finalEvent = new Event(finalEvent, eventInit);
	        } catch (err) {
	          finalEvent = nativeDocument.createEvent('Event');
	          finalEvent.initEvent(event, bubbles, cancelable);
	        }
	
	        (0, _helpers.assign)(finalEvent, details);
	      }
	
	      return this.forEach(function (elem) {
	        elem.dispatchEvent(finalEvent);
	      });
	    }
	
	    /**
	     * @method Elem#elem
	     * @public
	     * @param {Number} [index = 0] - Index of the element of the set to get. Negative index means elem.length + index.
	     * @returns {Elem} New instance of Elem.
	     *
	     * @example
	     * elem.elem(1); // a wrap of the element in the set that has index 1
	     * elem.elem();  // a wrap of the element in the set that has index 0
	     */
	
	  }, {
	    key: 'elem',
	    value: function elem() {
	      var index = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	
	      if (index < 0) {
	        index = this.length + index;
	      }
	
	      return new Elem(this.$[index]);
	    }
	
	    /**
	     * @method Elem#filter
	     * @public
	     * @param {String|Function|Element[]|Elem} [selector = Boolean] - If it's a string the method filters elements with the selector
	     * otherwise super.filter is called.
	     * @returns {Elem} New instance of Elem.
	     * @description Method for filtering elements.
	     *
	     * @example
	     * elem.filter((elem) => new Elem(elem).closest('.parent'));
	     * elem.filter(elemsInArray);
	     * elem.filter(elemsInElem);
	     * elem.filter('.child');
	     */
	
	  }, {
	    key: 'filter',
	    value: function filter() {
	      var selector = arguments.length <= 0 || arguments[0] === undefined ? Boolean : arguments[0];
	
	      return new Elem(_get(Object.getPrototypeOf(Elem.prototype), 'filter', this).call(this, filterSwitcher(selector)));
	    }
	
	    /**
	     * @method Elem#find
	     * @public
	     * @param {String|Function} selector - Selector to find.
	     * @returns {Elem|{ key: Key, value: * }|null} New instance of Elem if selector is a string
	     * otherwise super.find is called.
	     * @description Synonym for
	     * [Element#querySelectorAll]{@link https://developer.mozilla.org/en/docs/Web/API/Element/querySelectorAll}.
	     */
	
	  }, {
	    key: 'find',
	    value: function find(selector) {
	      if (!(0, _helpers.isString)(selector)) {
	        return _get(Object.getPrototypeOf(Elem.prototype), 'find', this).call(this, selector);
	      }
	
	      return this.object(function (elems, elem) {
	        elems.add(_find(selector, elem));
	      }, new Elem());
	    }
	
	    /**
	     * @method Elem#first
	     * @public
	     * @returns {Elem} New instance of Elem.
	     * @description Synonym for elem.elem(0).
	     */
	
	  }, {
	    key: 'first',
	    value: function first() {
	      return this.elem(0);
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
	    key: 'firstChild',
	    value: function firstChild() {
	      var selector = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	
	      return this.object(function (elems, elem) {
	        var _ref6 = new _Arr3.default(elem.children).find(function (elem) {
	          return new Elem(elem).is(selector);
	        }) || {};
	
	        var found = _ref6.value;
	
	
	        elems.add(found);
	      }, new Elem());
	    }
	
	    /**
	     * @method Elem#focus
	     * @returns {Elem} Returns this.
	     * @see https://developer.mozilla.org/en/docs/Web/API/HTMLElement/focus
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
	      return this.find(inputElements).object(function (data, input) {
	        data[input.name] = formDataSwitcher(input.type, [input]);
	      }, {}).$;
	    }
	
	    /**
	     * @method Elem#getRule
	     * @public
	     * @param {String} name - Name of the rule.
	     * @returns {{ selector: (String|void), rules: Object }} Set of the css rules.
	     * @description Method for getting set of the rules under the name.
	     * Note: style element should be inside the document.
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
	        if (getName(elem) === 'style') {
	          var _ref7 = new _Arr3.default(elem.sheet.cssRules).find(function (rule) {
	            return rule.dwayneData && rule.dwayneData.name === name;
	          }) || {};
	
	          var rule = _ref7.value;
	
	
	          if (rule) {
	            found = {
	              selector: rule.selectorText,
	              rules: new Elem(rule).css().$
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
	     * elem.addClass('cls').hasClass('cls');    // true
	     * elem.removeClass('cls').hasClass('cls'); // false
	     */
	
	  }, {
	    key: 'hasClass',
	    value: function hasClass(cls) {
	      return getElem(this).classList.contains(cls);
	    }
	
	    /**
	     * @method Elem#height
	     * @public
	     * @param {*|ElemValueCallback} [height] - Height to set.
	     * @returns {Elem|String} If no arguments passed height of the first element in the set returned.
	     * Otherwise all elements heights in the set are set to the height argument.
	     * @description Gets or sets height.
	     *
	     * @example
	     * elem.height(123);
	     * elem.height(); // 123
	     */
	
	  }, {
	    key: 'height',
	    value: function height(_height) {
	      return this.prop.apply(this, new _Arr3.default(arguments).unshift('height').$);
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
	      return this.forEach(function (elem) {
	        elem = new Elem(elem);
	
	        elem.prop('dwayneData').previousDisplay = elem.css('display');
	        elem.css('display', 'none !important');
	      });
	    }
	
	    /**
	     * @method Elem#html
	     * @public
	     * @param {String|ElemValueCallback|*} [html] - HTML to write instead of current HTML.
	     * @returns {Elem|String} If no arguments passed HTML of the first element in the set returned.
	     * Otherwise all elements HTML in the set are set to the html argument.
	     * @description Gets or sets HTML.
	     *
	     * @example
	     * elem.html('&lt;div&gt;1&lt;/div&gt;');
	     * elem.html(); // '&lt;div&gt;1&lt;/div&gt;'
	     */
	
	  }, {
	    key: 'html',
	    value: function html(_html) {
	      if (!arguments.length) {
	        return getElem(this).innerHTML;
	      }
	
	      return this.forEach(function (elem, index) {
	        elem.innerHTML = (0, _helpers.isFunction)(_html) ? _html(elem.innerHTML, elem, index) : _html;
	      });
	    }
	
	    /**
	     * @method Elem#id
	     * @public
	     * @param {String|*} [id] - Id to set.
	     * @returns {Elem|String} If no arguments passed id of the first element in the set returned.
	     * Otherwise all elements ids in the set are set to the id argument.
	     * @description Gets id or sets ids.
	     *
	     * @example
	     * elem.id('unique');
	     * elem.id(); // 'unique'
	     */
	
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
	
	    /**
	     * @member {Number} Elem#innerHeight
	     * @type {Number}
	     * @public
	     * @readonly
	     * @description Method for finding how much height content of the first element can be.
	     *
	     * @example
	     * elem.css({
	     *   boxSizing: 'border-box',
	     *   height: '200px',
	     *   paddingTop: '2px',
	     *   paddingBottom: '3px',
	     *   borderTop: '1px solid black',
	     *   borderBottom: '4px solid black'
	     * }).innerHeight; // 190
	     * elem
	     *   .css('box-sizing', 'content-box')
	     *   .innerHeight; // 200
	     * elem
	     *   .css('box-sizing', 'padding-box')
	     *   .innerHeight; // 195
	     */
	
	  }, {
	    key: 'into',
	
	
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
	    value: function into(element) {
	      element = toFind(element).$[0];
	
	      if (!element) {
	        return this;
	      }
	
	      return this.forEach(function (elem) {
	        element.appendChild(elem);
	      });
	    }
	
	    /**
	     * @method Elem#is
	     * @public
	     * @param {String} selector
	     * @returns {Boolean} If the first element in the set matches the selector.
	     * If the selector is undefined or null always returns true.
	     * @description Synonym for
	     * [Element#matches]{@link https://developer.mozilla.org/en/docs/Web/API/Element/matches}.
	     *
	     * @example
	     * elem.addClass('cls');
	     * elem.is('.cls');         // true
	     *
	     * elem.removeClass('cls');
	     * elem.is('.cls');         // false
	     */
	
	  }, {
	    key: 'is',
	    value: function is(selector) {
	      if ((0, _helpers.isNull)(selector)) {
	        return true;
	      }
	
	      var elem = getElem(this);
	      var matches = elem.matches || elem.matchesSelector || elem.webkitMatchesSelector || elem.mozMatchesSelector || elem.msMatchesSelector || elem.oMatchesSelector;
	
	      try {
	        return matches.call(elem, selector);
	      } catch (err) {
	        console.error('Selector \'' + selector + '\' is not a valid selector (Elem#is)');
	
	        return false;
	      }
	    }
	
	    /**
	     * @method Elem#isBroken
	     * @public
	     * @returns {Boolean} If the first image in the set is broken.
	     * @description Returns if the first element in the set is broken. Not image and not loaded image is considered proper.
	     *
	     * @example
	     * const img = elem.img().on({
	     *   'load': onload,
	     *   'error': onload
	     * });
	     *
	     * onload = () => {
	     *   console.log(img.isBroken()); // true
	     * };
	     *
	     * img.ref('/some/non-existent/site/not-found.png');
	     */
	
	  }, {
	    key: 'isBroken',
	    value: function isBroken() {
	      var isBroken = false;
	
	      this.some(function (elem) {
	        if (getName(elem) === 'img') {
	          isBroken = !!(elem.complete && (!elem.naturalWidth || !elem.naturalHeight));
	
	          return true;
	        }
	      });
	
	      return isBroken;
	    }
	
	    /**
	     * @method Elem#last
	     * @public
	     * @returns {Elem} New instance of Elem.
	     * @description Synonym for elem.elem(-1).
	     */
	
	  }, {
	    key: 'last',
	    value: function last() {
	      return this.elem(-1);
	    }
	
	    /**
	     * @method Elem#last
	     * @public
	     * @param {String} [selector = null] - If present, finds last child in every elem that matches the selector.
	     * If not, finds last child of each element in the set.
	     * @returns {Elem} New instance of Elem.
	     * @description Method for finding last children of each element in the set.
	     *
	     * @example
	     * elem.last();       // finds last child of each element in the elem set
	     * elem.last('.foo'); // find last child that has 'foo' class of each element in the set
	     */
	
	  }, {
	    key: 'lastChild',
	    value: function lastChild() {
	      var selector = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	
	      return this.object(function (elems, elem) {
	        var _ref8 = new _Arr3.default(elem.children).reverse().find(function (elem) {
	          return new Elem(elem).is(selector);
	        }) || {};
	
	        var found = _ref8.value;
	
	
	        elems.add(found);
	      }, new Elem());
	    }
	
	    /**
	     * @method Elem#load
	     * @public
	     * @returns {Promise.<{ proper: Elem, broken: Elem }>} Promise with broken and proper images.
	     * @description Loads each image in the set and puts it to the proper or broken array.
	     *
	     * @example
	     * images.load().then(({ broken }) => {
	     *   broken.filter('img').ref('/fallback.png');
	     * });
	     */
	
	  }, {
	    key: 'load',
	    value: function load() {
	      var images = {
	        proper: new Elem(),
	        broken: new Elem()
	      };
	
	      return _Promise2.default.all(this.filter(function (elem) {
	        return getName(elem) === 'img';
	      }).map(function (elem) {
	        var $elem = new Elem(elem);
	
	        if (elem.complete) {
	          images[$elem.isBroken() ? 'broken' : 'proper'].push(elem);
	
	          return;
	        }
	
	        return new _Promise2.default(function (resolve) {
	          var removeListeners = $elem.on({
	            load: function load() {
	              images.proper.add(elem);
	
	              removeListeners();
	              resolve();
	            },
	            error: function error() {
	              images.broken.add(elem);
	
	              removeListeners();
	              resolve();
	            }
	          });
	        });
	      }).$).then(function () {
	        return images;
	      });
	    }
	
	    /**
	     * @method Elem#moveAttr
	     * @public
	     * @param {String} attr - Attribute to move to the first element.
	     * @param {String} [value = ''] - Value to set for the attribute. If not set attribute of the previous element or '' used.
	     * @returns {Elem} Returns this.
	     * @description Method for moving an attribute from previous element to the next one (first element in this set).
	     *
	     * @example
	     * elem1.moveAttr('attr', 'value');     // attribute 'attr' set to 'value' on elem1
	     * elem2.moveAttr('attr');              // attribute 'attr' removed from elem1. set to 'value' on elem2
	     * elem3.moveAttr('attr', 'new value'); // attribute 'attr' removed from elem2. set to 'new value' on elem3
	     */
	
	  }, {
	    key: 'moveAttr',
	    value: function moveAttr(attr) {
	      var value = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
	
	      var prev = attrs[attr];
	      var elem = this.elem();
	
	      if (prev && elem.length) {
	        if (arguments.length < 2) {
	          value = prev.attr(attr);
	        }
	
	        prev.removeAttr(attr);
	      }
	
	      if (elem.length) {
	        attrs[attr] = elem.attr(attr, value);
	      }
	
	      return this;
	    }
	
	    /**
	     * @method Elem#moveClass
	     * @public
	     * @param {String} cls - Class to move to the first element.
	     * @returns {Elem} Returns this.
	     * @description Method for moving a class from previous element to the next one (first element in this set).
	     *
	     * @example
	     * elem1.moveClass('cls'); // class 'cls' added to elem1
	     * elem2.moveClass('cls'); // class 'cls' removed from elem1. added to elem1
	     */
	
	  }, {
	    key: 'moveClass',
	    value: function moveClass(cls) {
	      var prev = classes[cls];
	      var elem = this.elem();
	
	      if (prev && elem.length) {
	        prev.removeClass(cls);
	      }
	
	      if (elem.length) {
	        classes[cls] = elem.addClass(cls);
	      }
	
	      return this;
	    }
	
	    /**
	     * @member Elem#name
	     * @type {String}
	     * @public
	     * @readonly
	     * @description tagName (lowercased) of the first element in the set.
	     *
	     * @example
	     * const elem1 = elem.create('div');
	     * elem1.name // 'div'
	     */
	
	  }, {
	    key: 'next',
	
	
	    /**
	     * @method Elem#next
	     * @public
	     * @param {String} [selector = null] - If present, finds next element to every elem that matches the selector.
	     * If not, finds next element to each element in the set.
	     * @returns {Elem} New instance of Elem.
	     * @description Method for finding next element to each element in the set.
	     *
	     * @example
	     * elem.next();       // finds next element to each element in the set
	     * elem.next('.foo'); // finds next element to each element that has 'foo' class
	     */
	    value: function next() {
	      var selector = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	
	      return this.object(function (elems, elem) {
	        /* eslint no-cond-assign: 0 */
	        while (elem = elem.nextElementSibling) {
	          if (new Elem(elem).is(selector)) {
	            return elems.add(elem);
	          }
	        }
	      }, new Elem());
	    }
	
	    /**
	     * @method Elem#off
	     * @public
	     * @param {...ElemEventString} events - Events to remove.
	     * @returns {Elem} Returns this.
	     * @description Method that removes all the listeners from each element in the set specified by the events arguments.
	     *
	     * @example
	     * elem.off('click');
	     * elem.off('click, input');
	     * elem.off('click, input', 'focus');
	     */
	
	  }, {
	    key: 'off',
	    value: function off() {
	      var _arguments2 = arguments;
	
	      for (var _len5 = arguments.length, events = Array(_len5), _key6 = 0; _key6 < _len5; _key6++) {
	        events[_key6] = arguments[_key6];
	      }
	
	      return this.forEach(function (elem) {
	        var listeners = elem.dwayneData.listeners;
	
	
	        (0, _helpers.iterate)(_arguments2, function (event) {
	          (0, _helpers.iterate)(event.split(eventSeparator), function (event) {
	            (listeners[event] || new _Super2.default()).forEach(function (_ref9) {
	              var removeListener = _ref9.removeListener;
	              return removeListener();
	            });
	          });
	        });
	      });
	    }
	
	    /**
	     * @method Elem#on
	     * @public
	     * @param {ElemEventString|Object.<ElemEventString|Listener>} event - Either a {@link ElemEventString} string
	     * or an object with event keys (a key is also ElemEventString) and listeners values.
	     * @param {String} [selector = null] - Selector to filter event targets.
	     * @param {Listener} [listener] - If the first argument is a string it must be a listener function for
	     * specified event(s).
	     * @returns {ElemRemoveListeners} Function that takes optional event argument.
	     * @description Adds event listeners for all the elements in the set.
	     * For debugging: If you need to know what listeners are in work (and what selectors filter targets)
	     * you can look at the base property of the only dwayne listener that listens for the event
	     * and find all working listeners in listener.base.dwayneData.listeners[event].$.
	     *
	     * @example
	     * elem.on(
	     *   'change, input',
	     *   'input, select, textarea, datalist, keygen, output',
	     *   (e, elem, index) => console.log(elem.value)
	     * );
	     * elem.on(
	     *   'change, input',
	     *   (e, elem, index) => console.log(elem.value)
	     * );
	     * elem.on(
	     *   {
	     *     'change, input': (e, elem, index) => console.log(elem.value),
	     *     'blur': console.log('blur')
	     *   },
	     *   'input, select, textarea, datalist, keygen, output'
	     * );
	     *
	     * const removeListeners = elem.on({
	     *   'change, input': (e, elem, index) => console.log(elem.value),
	     *   'blur': console.log('blur')
	     * });
	     *
	     * removeListeners('click');
	     * removeListeners('blur, change');
	     * removeListeners('blur, change', 'input');
	     * removeListeners();
	     */
	
	  }, {
	    key: 'on',
	    value: function on(event) {
	      var selector = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	      var listener = arguments[2];
	
	      var allListeners = new _Super2.default({});
	
	      if ((0, _helpers.isFunction)(selector)) {
	        listener = selector;
	        selector = null;
	      }
	
	      if ((0, _helpers.isString)(event)) {
	        event = _defineProperty({}, event, listener);
	      }
	
	      event = new _Super2.default(event).object(function (listeners, listener, event) {
	        (0, _helpers.iterate)(event.split(eventSeparator), function (event) {
	          listeners[event] = listener;
	        });
	      });
	
	      this.forEach(function (elem) {
	        var _ref10 = elem.dwayneData || windowsDwayneData.find(function (_ref12) {
	          var element = _ref12.element;
	          return element === elem;
	        });
	
	        var listeners = _ref10.listeners;
	
	
	        event.forEach(function (listener, event) {
	          var removeEventListeners = listeners[event] = listeners[event] || new _Super2.default({}).define('index', {
	            value: 0,
	            configurable: true,
	            writable: true
	          });
	          var index = removeEventListeners.prop('index');
	
	          if (!removeEventListeners.has('listener')) {
	            var newListener = function newListener(e) {
	              removeEventListeners.forEach(function (_ref11) {
	                var selector = _ref11.selector;
	                var listener = _ref11.listener;
	
	                if (new Elem(e.target).is(selector)) {
	                  listener.call(elem, e, elem, index);
	                }
	              });
	            };
	
	            newListener.base = elem;
	
	            elem.addEventListener(event, newListener, false);
	            removeEventListeners.define('listener', {
	              value: newListener,
	              configurable: true,
	              writable: true
	            });
	          }
	
	          var removeListener = function removeListener() {
	            removeEventListeners.delete(index);
	
	            if (!removeEventListeners.count) {
	              elem.removeEventListener(event, removeEventListeners.prop('listener'), false);
	              removeEventListeners.delete('listener');
	            }
	          };
	
	          allListeners.prop(event, (allListeners.prop(event) || new _Arr3.default()).push(removeListener));
	
	          removeEventListeners.assign(_defineProperty({
	            index: index + 1
	          }, index, {
	            selector: selector,
	            listener: listener,
	            removeListener: removeListener
	          }));
	        });
	      });
	
	      return function removeEventListeners(event) {
	        if (arguments.length) {
	          (0, _helpers.iterate)(arguments, function (event) {
	            (0, _helpers.iterate)(event.split(eventSeparator), function (event) {
	              if (allListeners.has(event)) {
	                allListeners.prop(event).forEach(function (removeListener) {
	                  return removeListener();
	                });
	                allListeners.delete(event);
	              }
	            });
	          });
	
	          return;
	        }
	
	        allListeners.forEach(function (removeListeners) {
	          removeListeners.forEach(function (removeListener) {
	            return removeListener();
	          });
	        });
	      };
	    }
	
	    /**
	     * @member {Number} Elem#outerWidth
	     * @type {Number}
	     * @public
	     * @readonly
	     * @description Method for finding how much height the element actually is.
	     *
	     * @example
	     * elem.css({
	     *   boxSizing: 'border-box',
	     *   height: '200px',
	     *   paddingTop: '2px',
	     *   paddingBottom: '3px',
	     *   borderTop: '1px solid black',
	     *   borderBottom: '4px solid black'
	     *   marginTop: '0px',
	     *   marginBottom: '5px'
	     * }).outerHeight; // 205
	     * elem
	     *   .css('box-sizing', 'content-box')
	     *   .outerHeight; // 215
	     * elem
	     *   .css('box-sizing', 'padding-box')
	     *   .outerHeight; // 210
	     */
	
	  }, {
	    key: 'parent',
	
	
	    /**
	     * @method Elem#parent
	     * @public
	     * @returns {Elem} New instance of Elem.
	     * @description Method returns wrap of the set of the parent elements of each element in the set.
	     */
	    value: function parent() {
	      return this.object(function (elems, elem) {
	        return elems.add(elem.parentElement);
	      }, new Elem());
	    }
	
	    /**
	     * @method Elem#parentTree
	     * @public
	     * @returns {Elem} New instance of Elem.
	     * @description Returns wrap of all parents of each element in the set.
	     *
	     * @example
	     * elem.parentTree(); // Elem
	     */
	
	  }, {
	    key: 'parentTree',
	    value: function parentTree() {
	      return this.object(function (elems, elem) {
	        while (elem = elem.parentNode) {
	          elems.add(elem);
	        }
	      }, new Elem());
	    }
	
	    /**
	     * @method Elem#prev
	     * @public
	     * @param {String} [selector = null] - If present, finds previous element to every elem that matches the selector.
	     * If not, finds previous element to each element in the set.
	     * @returns {Elem} New instance of Elem.
	     * @description Method for finding previous element to each element in the set.
	     *
	     * @example
	     * elem.next();       // finds previous element to each element in the set
	     * elem.next('.foo'); // finds previous element to each element that has 'foo' class
	     */
	
	  }, {
	    key: 'prev',
	    value: function prev() {
	      var selector = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	
	      return this.object(function (elems, elem) {
	        /* eslint no-cond-assign: 0 */
	        while (elem = elem.previousElementSibling) {
	          if (new Elem(elem).is(selector)) {
	            return elems.add(elem);
	          }
	        }
	      }, new Elem());
	    }
	
	    /**
	     * @method Elem#prop
	     * @public
	     * @param {String|Object.<String, ElemValueCallback|*>} property - Either a string of a property or an assigned object.
	     * @param {ElemValueCallback|*} [value] - If a property parameter is a string
	     * this has to be an assigned value if it's present.
	     * @returns {Elem|*} Returns this if it's setter or a value if getter.
	     * @description Method that is either a property getter for the first element in the set
	     * or a setter for every element in the set.
	     *
	     * @example
	     * elem.prop('draggable', false);
	     * elem.prop('draggable'); // false
	     */
	
	  }, {
	    key: 'prop',
	    value: function prop(property, value) {
	      if (arguments.length <= 1 && (0, _helpers.isString)(property)) {
	        return this.$[0] ? this.$[0][property] : undefined;
	      }
	
	      if (arguments.length >= 2) {
	        property = _defineProperty({}, property, value);
	      }
	
	      return this.forEach(function (elem, index) {
	        (0, _helpers.iterate)(property, function (value, prop) {
	          elem[prop] = (0, _helpers.isFunction)(value) ? value(elem[prop], elem, index) : value;
	        });
	      });
	    }
	
	    /**
	     * @method Elem#ref
	     * @public
	     * @param {String|ElemValueCallback} [link] - If it's present link to a resource.
	     * @returns {Elem|String} If the link argument isn't present it's a getter of the 'src' attribute
	     * for the one of following elements: img, script, iframe, audio, video; of the 'action' attribute
	     * for a form element and of the 'href' attribute for the rest. If it's present it's a setter
	     * of the same attribute for all the element in the set.
	     * @description Method for getting resources links and setting them.
	     *
	     * @example
	     * elem.ref('/some/cool/image.png');
	     * elem.ref(); // '/some/cool/image.png'
	     */
	
	  }, {
	    key: 'ref',
	    value: function ref(link) {
	      if (!arguments.length) {
	        return this.attr(refSwitcher(this.name));
	      }
	
	      return this.forEach(function (elem) {
	        elem = new Elem(elem);
	
	        elem.attr(refSwitcher(elem.name), link);
	      });
	    }
	
	    /**
	     * @method Elem#remove
	     * @public
	     * @returns {Elem} Returns this.
	     * @description Removes all the elements from the set from the document.
	     * Note: it doesn't remove them from the set so watch out for the memory leaks.
	     *
	     * @example
	     * elem.remove();
	     */
	
	  }, {
	    key: 'remove',
	    value: function remove() {
	      return this.forEach(function (elem) {
	        elem.remove();
	      });
	    }
	
	    /**
	     * @method Elem@removeAttr
	     * @public
	     * @param {...String} attributes - Attributes to remove.
	     * @returns {Elem} Returns this.
	     * @description Removes all the attributes from arguments from all the elements in the set.
	     *
	     * @example
	     * elem.removeAttr('foo', 'bar', 'baz');
	     */
	
	  }, {
	    key: 'removeAttr',
	    value: function removeAttr() {
	      var _arguments3 = arguments;
	
	      for (var _len6 = arguments.length, attributes = Array(_len6), _key7 = 0; _key7 < _len6; _key7++) {
	        attributes[_key7] = arguments[_key7];
	      }
	
	      return this.forEach(function (elem) {
	        (0, _helpers.iterate)(_arguments3, function (attr) {
	          elem.removeAttribute(attr);
	        });
	      });
	    }
	
	    /**
	     * @method Elem#removeClass
	     * @public
	     * @param {...String} classes - Classes to remove.
	     * @returns {Elem} Returns this.
	     * @description Removes all the classes from arguments from all the elements in the set.
	     *
	     * @example
	     * elem.removeClass('foo', 'bar', 'baz');
	     */
	
	  }, {
	    key: 'removeClass',
	    value: function removeClass() {
	      var _arguments4 = arguments;
	
	      for (var _len7 = arguments.length, classes = Array(_len7), _key8 = 0; _key8 < _len7; _key8++) {
	        classes[_key8] = arguments[_key8];
	      }
	
	      return this.forEach(function (elem) {
	        var list = elem.classList;
	
	        list.remove.apply(list, _arguments4);
	      });
	    }
	
	    /**
	     * @method Elem#removeCSS
	     * @public
	     * @param {...String} props - CSS properties to remove.
	     * @returns {Elem} Returns this.
	     * @description Removes all the CSS properties from arguments from all the elements in the set.
	     *
	     * @example
	     * elem.removeCSS('display', 'position', 'margin');
	     */
	
	  }, {
	    key: 'removeCSS',
	    value: function removeCSS() {
	      var _arguments5 = arguments;
	
	      for (var _len8 = arguments.length, props = Array(_len8), _key9 = 0; _key9 < _len8; _key9++) {
	        props[_key9] = arguments[_key9];
	      }
	
	      return this.forEach(function (elem) {
	        (0, _helpers.iterate)(_arguments5, function (css) {
	          elem.style.removeProperty(css);
	        });
	      });
	    }
	
	    /**
	     * @method Elem#replace
	     * @public
	     * @param {String|Elem|Element} element - Element to replace the first element in the set with or a selector of it.
	     * @returns {Elem} Returns this.
	     * @description Method is similar to
	     * [Node#replaceChild]{@link https://developer.mozilla.org/en/docs/Web/API/Node/replaceChild}.
	     *
	     * @example
	     * elem.replace(elem2);
	     * elem.replace(document.getElementById('id'));
	     * elem.replace('#id div.c1');
	     */
	
	  }, {
	    key: 'replace',
	    value: function replace(element) {
	      var elem = getElem(this);
	      var parent = elem.parentElement;
	
	      if (!parent) {
	        return this;
	      }
	
	      element = toFind(element).$[0];
	
	      if (element) {
	        parent.replaceChild(element, elem);
	      }
	
	      return this;
	    }
	
	    /**
	     * @method Elem#setOf
	     * @public
	     * @param {String} type - HTML element type.
	     * @param {Number|Object|*[]} iterator - A number (how many elements to create inside each element),
	     * an object or an array to iterate over.
	     * @param {ElemSetOfCallback} callback
	     * @returns {Elem} New instance of Elem.
	     * @description Function for creating set of elements inside each element in the set based on an array or an object.
	     *
	     * @example
	     * table.setOf('tr', [[1, 2], [3, 4], [5, 6]], (row, array) => {
	     *   D(row).setOf('td', array, (col, number) => {
	     *     D(col).text(number);
	     *   });
	     * });
	     */
	
	  }, {
	    key: 'setOf',
	    value: function setOf(type, iterator, callback) {
	      (0, _helpers.validate)({ 2: callback }, { 2: ['function'] }, 'Elem#setOf');
	
	      iterator = new _Super2.default(iterator).$;
	
	      if ((0, _helpers.isNumber)(iterator)) {
	        try {
	          (0, _helpers.validate)({ 1: iterator }, { 1: ['intLike', '>=0'] }, 'Elem#setOf');
	        } catch (e) {
	          throw new Error('\n\t\t\t\t\t2nd argument must be either or non-negative integer, or object!\n\t\t\t\t');
	        }
	
	        iterator = (0, _Arr2.array)(iterator);
	      }
	
	      return this.object(function (elems, elem, index) {
	        (0, _helpers.iterate)(iterator, function (value, key) {
	          var created = new Elem(elem).create(type);
	
	          callback(created.$, value, key, iterator, elem, index);
	
	          elems.add(created);
	        });
	      }, new Elem());
	    }
	
	    /**
	     * @method Elem#show
	     * @public
	     * @returns {Elem} Returns this.
	     * @description Shows all elements in the set.
	     * If an element was hidden using {@link Elem#hide} previous display is set.
	     *
	     * @example
	     * elem.show();
	     */
	
	  }, {
	    key: 'show',
	    value: function show() {
	      return this.forEach(function (elem) {
	        var _elem = elem;
	        var dwayneData = _elem.dwayneData;
	
	
	        elem = new Elem(elem);
	
	        if (elem.css('display').indexOf('none') === 0) {
	          elem.css('display', dwayneData.previousDisplay);
	        }
	
	        dwayneData.previousDisplay = '';
	      });
	    }
	
	    /**
	     * @method Elem#text
	     * @public
	     * @param {String|ElemValueCallback|*} [text] - Text to write instead of current text.
	     * @returns {Elem|String} If no arguments passed text of the first element in the set returned.
	     * Otherwise all elements texts in the set are set to the text argument.
	     * @description Gets or sets text.
	     *
	     * @example
	     * elem.text('123');
	     * elem.text(); // '123'
	     */
	
	  }, {
	    key: 'text',
	    value: function text(_text) {
	      if (!arguments.length) {
	        return this.prop(textProperty);
	      }
	
	      return this.forEach(function (elem, index) {
	        new Elem(elem).html('').addText((0, _helpers.isFunction)(_text) ? _text(elem[textProperty], elem, index) : _text);
	      });
	    }
	
	    /**
	     * @method Elem#toggleAttr
	     * @public
	     * @param {String} attr - Attribute to toggle.
	     * @param {Boolean|*} [condition] - If present and the condition is truthy method adds the attribute
	     * with the '' value and if falsey method removes the attribute. If not present method adds
	     * the attribute if it doesn't exist and removes if it does.
	     * @returns {Elem} Returns this.
	     * @description Method for toggling attributes.
	     *
	     * @example
	     * elem.toggleAttr('attr');
	     * elem.toggleAttr('attr', someCondition);
	     */
	
	  }, {
	    key: 'toggleAttr',
	    value: function toggleAttr(attr, condition) {
	      var _arguments6 = arguments;
	
	      return this.forEach(function (elem) {
	        elem = new Elem(elem);
	
	        if (_arguments6.length < 2 ? !elem.hasAttr(attr) : condition) {
	          elem.attr(attr, '');
	        } else {
	          elem.removeAttr(attr);
	        }
	      });
	    }
	
	    /**
	     * @method Elem#toggleAttr
	     * @public
	     * @param {String} cls - Class to toggle.
	     * @param {Boolean|*} [condition] - If present and the condition is truthy method adds the class
	     * and if falsey method removes the class. If not present method adds
	     * the class if it doesn't exist and removes if it does.
	     * @returns {Elem} Returns this.
	     * @description Method for toggling classes.
	     *
	     * @example
	     * elem.toggleClass('cls');
	     * elem.toggleClass('cls', someCondition);
	     */
	
	  }, {
	    key: 'toggleClass',
	    value: function toggleClass(cls, condition) {
	      return (arguments.length < 2 ? !this.hasClass(cls) : condition) ? this.addClass(cls) : this.removeClass(cls);
	    }
	  }, {
	    key: 'up',
	
	
	    /**
	     * @method Elem#up
	     * @param {Integer} [level = 1] - What level up along the tree should be the parent.
	     * @returns {Elem} New instance of Elem.
	     * @description Creates a collection of parents of level &lt;level&gt;.
	     *
	     * @example
	     * elem.up();
	     * elem.up(2);
	     */
	    value: function up() {
	      var level = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
	
	      (0, _helpers.validate)([level], [['intLike', '>=0']], 'Elem#up');
	
	      level = Number(level);
	
	      return this.object(function (elems, elem) {
	        var n = level;
	
	        while (n-- && elem) {
	          elem = elem.parentElement;
	        }
	
	        elems.add(elem);
	      }, new Elem());
	    }
	
	    /**
	     * @method Elem#validate
	     * @public
	     * @param {ValidateCallback} [validator] - If present, function that validates inputs.
	     * @returns {Elem|Object.<String, Error|*>|{ form: Error?, inputs: <Object.<String, Error>>|null }|null}
	     * If a callback argument provided returns this. If no arguments provided returns either an object
	     * with input names keys and errors values or null if no errors found.
	     * @description If a callback argument provided adds it to the element validators list. If no arguments provided
	     * validates every input element in the set with its own functions. If an element is a form it validates all input elements inside it.
	     *
	     * @example
	     * form.on('input change', 'input', (value, input) => {
	     *   const $input = D(input);
	     *
	     *   if (Number(value) %3) {
	     *     $input.attr('invalid', '');
	     *
	     *     throw new Error('The value should be divided by 3!');
	     *   }
	     *
	     *   $input.removeAttr('invalid');
	     * });
	     */
	
	  }, {
	    key: 'validate',
	    value: function validate(validator) {
	      (0, _helpers.validate)([validator], ['function||!'], 'Elem#validate');
	
	      if (validator) {
	        return this.forEach(function (_ref13) {
	          var dwayneData = _ref13.dwayneData;
	
	          dwayneData.validators.push(validator);
	        });
	      }
	
	      var errors = null;
	
	      this.filter(inputElements + ', form').forEach(function (elem, index) {
	        if (getName(elem) === 'form') {
	          return new Elem(elem).find(inputElements).forEach(function (input, index) {
	            validatorWrap(input, index);
	          });
	        }
	
	        validatorWrap(elem, index);
	      });
	
	      function validatorWrap(input, index) {
	        try {
	          if (input.validity && !input.validity.valid) {
	            throw new Error(input.validationMessage);
	          }
	
	          input.dwayneData.validators.forEach(function (validator) {
	            validator(input.value, input, index);
	          });
	        } catch (err) {
	          (errors = errors || {})[input.name] = err;
	        }
	      }
	
	      return errors;
	    }
	
	    /**
	     * @method Elem#width
	     * @public
	     * @param {*|ElemValueCallback} [width] - Width to set.
	     * @returns {Elem|String} If no arguments passed width of the first element in the set returned.
	     * Otherwise all elements widths in the set are set to the width argument.
	     * @description Gets or sets width.
	     *
	     * @example
	     * elem.width(123);
	     * elem.width(); // 123
	     */
	
	  }, {
	    key: 'width',
	    value: function width(_width) {
	      return this.prop.apply(this, new _Arr3.default(arguments).unshift('width').$);
	    }
	  }, {
	    key: 'innerHeight',
	    get: function get() {
	      var elem = this.$[0];
	
	      if (!elem) {
	        return 0;
	      }
	
	      if (isWindow(elem)) {
	        return elem.innerHeight;
	      }
	
	      var _calcCSS = this.calcCSS();
	
	      var borderTopWidth = _calcCSS.borderTopWidth;
	      var borderBottomWidth = _calcCSS.borderBottomWidth;
	      var boxSizing = _calcCSS.boxSizing;
	      var height = _calcCSS.height;
	      var paddingTop = _calcCSS.paddingTop;
	      var paddingBottom = _calcCSS.paddingBottom;
	
	      var borders = px(borderTopWidth) + px(borderBottomWidth);
	      var paddings = px(paddingTop) + px(paddingBottom);
	
	      return px(height) - innerSwitcher(boxSizing, [paddings, borders]);
	    }
	
	    /**
	     * @member {Number} Elem#innerWidth
	     * @type {Number}
	     * @public
	     * @readonly
	     * @description Method for finding how much width content of the first element can be.
	     *
	     * @example
	     * elem.css({
	     *   boxSizing: 'border-box',
	     *   width: '200px',
	     *   paddingLeft: '2px',
	     *   paddingRight: '3px',
	     *   borderLeft: '1px solid black',
	     *   borderRight: '4px solid black'
	     * }).innerWidth; // 190
	     * elem
	     *   .css('box-sizing', 'content-box')
	     *   .innerWidth; // 200
	     * elem
	     *   .css('box-sizing', 'padding-box')
	     *   .innerWidth; // 195
	     */
	
	  }, {
	    key: 'innerWidth',
	    get: function get() {
	      var elem = this.$[0];
	
	      if (!elem) {
	        return 0;
	      }
	
	      if (isWindow(elem)) {
	        return elem.innerWidth;
	      }
	
	      var _calcCSS2 = this.calcCSS();
	
	      var borderLeftWidth = _calcCSS2.borderLeftWidth;
	      var borderRightWidth = _calcCSS2.borderRightWidth;
	      var boxSizing = _calcCSS2.boxSizing;
	      var paddingLeft = _calcCSS2.paddingLeft;
	      var paddingRight = _calcCSS2.paddingRight;
	      var width = _calcCSS2.width;
	
	      var borders = px(borderLeftWidth) + px(borderRightWidth);
	      var paddings = px(paddingLeft) + px(paddingRight);
	
	      return px(width) - innerSwitcher(boxSizing, [paddings, borders]);
	    }
	  }, {
	    key: 'name',
	    get: function get() {
	      return getName(this.$[0]);
	    }
	  }, {
	    key: 'outerHeight',
	    get: function get() {
	      var elem = this.$[0];
	
	      if (!elem) {
	        return 0;
	      }
	
	      if (isWindow(elem)) {
	        return elem.outerHeight;
	      }
	
	      var _calcCSS3 = this.calcCSS();
	
	      var borderTopWidth = _calcCSS3.borderTopWidth;
	      var borderBottomWidth = _calcCSS3.borderBottomWidth;
	      var boxSizing = _calcCSS3.boxSizing;
	      var height = _calcCSS3.height;
	      var marginTop = _calcCSS3.marginTop;
	      var marginBottom = _calcCSS3.marginBottom;
	      var paddingTop = _calcCSS3.paddingTop;
	      var paddingBottom = _calcCSS3.paddingBottom;
	
	      var borders = px(borderTopWidth) + px(borderBottomWidth);
	      var paddings = px(paddingTop) + px(paddingBottom);
	
	      return px(height) + px(marginTop) + px(marginBottom) + outerSwitcher(boxSizing, [borders, paddings]);
	    }
	
	    /**
	     * @member {Number} Elem#outerWidth
	     * @type {Number}
	     * @public
	     * @readonly
	     * @description Method for finding how much width the element actually is.
	     *
	     * @example
	     * elem.css({
	     *   boxSizing: 'border-box',
	     *   width: '200px',
	     *   paddingLeft: '2px',
	     *   paddingRight: '3px',
	     *   borderLeft: '1px solid black',
	     *   borderRight: '4px solid black'
	     *   marginLeft: '0px',
	     *   marginRight: '5px'
	     * }).outerWidth; // 205
	     * elem
	     *   .css('box-sizing', 'content-box')
	     *   .outerWidth; // 215
	     * elem
	     *   .css('box-sizing', 'padding-box')
	     *   .outerWidth; // 210
	     */
	
	  }, {
	    key: 'outerWidth',
	    get: function get() {
	      var elem = this.$[0];
	
	      if (!elem) {
	        return 0;
	      }
	
	      if (isWindow(elem)) {
	        return elem.outerWidth;
	      }
	
	      var _calcCSS4 = this.calcCSS();
	
	      var borderLeftWidth = _calcCSS4.borderLeftWidth;
	      var borderRightWidth = _calcCSS4.borderRightWidth;
	      var boxSizing = _calcCSS4.boxSizing;
	      var marginLeft = _calcCSS4.marginLeft;
	      var marginRight = _calcCSS4.marginRight;
	      var paddingLeft = _calcCSS4.paddingLeft;
	      var paddingRight = _calcCSS4.paddingRight;
	      var width = _calcCSS4.width;
	
	      var borders = px(borderLeftWidth) + px(borderRightWidth);
	      var paddings = px(paddingLeft) + px(paddingRight);
	
	      return px(width) + px(marginLeft) + px(marginRight) + outerSwitcher(boxSizing, [borders, paddings]);
	    }
	  }, {
	    key: 'toStringTag',
	    get: function get() {
	      return (0, _helpers.toStringTag)(this.$$);
	    }
	  }]);
	
	  return Elem;
	}(_Arr3.default);
	
	exports.Elem = Elem;
	
	
	(0, _helpers.defineProperties)(Elem.prototype, _defineProperty({}, _helpers.Symbol.toStringTag, 'Elem'));
	
	var window = exports.window = new Elem(global);
	var document = exports.document = new Elem(nativeDocument);
	var html = exports.html = new Elem(nativeDocument.documentElement);
	var body = exports.body = new Elem(nativeDocument.body);
	var head = exports.head = new Elem(nativeDocument.head);
	
	(0, _helpers.dynamicDefineProperties)(Elem.prototype, _elements2.default, function (elem) {
	  return function () {
	    return this.create.apply(this, new _Arr3.default(arguments).unshift(elem).$);
	  };
	});
	
	(0, _helpers.dynamicDefineProperties)(Elem.prototype, _canvasMethods.canvasGetMethods, function (method) {
	  return function () {
	    var ctx = this.ctx();
	
	    if (ctx) {
	      return ctx[method].apply(ctx, arguments);
	    }
	  };
	});
	
	(0, _helpers.dynamicDefineProperties)(Elem.prototype, _canvasMethods.canvasRestMethods, function (method) {
	  return function () {
	    var ctx = this.ctx();
	
	    if (ctx) {
	      ctx[method].apply(ctx, arguments);
	    }
	
	    return this;
	  };
	});
	
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
	
	  return new Elem(elem);
	}
	
	/**
	 * @function isElem
	 * @private
	 * @param {*} value - Value to check if it's Elem.
	 * @returns {Boolean} If the value is Elem.
	 * @description Returns if the value is Elem or not.
	 */
	function isElem(value) {
	  return value instanceof Elem;
	}
	
	/**
	 * @function isWindow
	 * @private
	 * @param {*} value - Value to check if it's Window.
	 * @returns {Boolean} If the value is Window.
	 * @description Returns if the value is Window or not.
	 */
	function isWindow(value) {
	  return (0, _helpers.toStringTag)(value) === 'Window';
	}
	
	/**
	 * @function isHTMLDocument
	 * @private
	 * @param {*} value - Value to check if it's HTMLDocument.
	 * @returns {Boolean} If the value is HTMLDocument.
	 * @description Returns if the value is HTMLDocument or not.
	 */
	function isHTMLDocument(value) {
	  return (0, _helpers.toStringTag)(value) === 'HTMLDocument';
	}
	
	/**
	 * @function getElem
	 * @private
	 * @param {Elem} elem - Element to check.
	 * @returns {Element} The argument or a fallback if needed.
	 */
	function getElem(elem) {
	  return elem.$[0] || empty;
	}
	
	/**
	 * @function getName
	 * @private
	 * @param {Element} [elem] - Element which name is needed to know.
	 * @returns {String} Elements name
	 */
	function getName(elem) {
	  return elem && elem.tagName && elem.tagName.toLowerCase() || '';
	}
	
	/**
	 * @function addDwayneData
	 * @private
	 * @param {Element} elem - Element to add dwayneData to.
	 * @returns {void}
	 */
	function addDwayneData(elem) {
	  if (!{}.hasOwnProperty.call(elem, 'dwayneData') && !isWindow(elem)) {
	    /**
	     * @member Element#dwayneData
	     * @type {Object}
	     * @protected
	     * @property {String} previousDisplay - Parameter used for hiding/showing elements.
	     * @property {Object.<String, Super>} removeListeners - Parameter used for remove event listeners.
	     * @property {CanvasRenderingContext2D} [ctx] - Canvas rendering context.
	     * @property {Arr} validators - Validators assigned to element.
	     * @description D data.
	     */
	    Object.defineProperty(elem, 'dwayneData', {
	      value: {
	        previousDisplay: '',
	        listeners: {},
	        ctx: getName(elem) === 'canvas' && elem.getContext('2d'),
	        validators: new _Arr3.default([])
	      }
	    });
	  } else if (!windowsDwayneData.some(function (_ref14) {
	    var element = _ref14.element;
	    return element === elem;
	  })) {
	    windowsDwayneData.push({
	      element: elem,
	      listeners: {}
	    });
	  }
	}
	
	_constructors2.default[2].push({
	  check: function check(elem) {
	    return (0, _helpers.isElement)(elem) || isWindow(elem) || isHTMLDocument(elem) || /^(HTMLCollection|NodeList)$/.test((0, _helpers.toStringTag)(elem));
	  },
	  cls: Elem
	});
	
	/**
	 * @function find
	 * @public
	 * @param {String} selector - Selector to find.
	 * @param {Element} [base = document] - Base to find in.
	 * @returns {Elem} New instance of Elem.
	 * @description Synonym for
	 * [Document#querySelectorAll]{@link https://developer.mozilla.org/en/docs/Web/API/Document/querySelectorAll}.
	 */
	function _find(selector) {
	  var base = arguments.length <= 1 || arguments[1] === undefined ? nativeDocument : arguments[1];
	
	  return new Elem(base.querySelectorAll(String(selector)));
	}
	
	/**
	 * @function parseHTML
	 * @public
	 * @param {String} html - HTML to parse.
	 * @returns {Elem} New instance of Elem.
	 * @description Parses HTML and returns the contents.
	 *
	 * @example
	 * parseHTML('&lt;div&gt;123&lt;/div&gt;'); // Elem
	 */
	exports.find = _find;
	function parseHTML(html) {
	  return document.div().html(html).children();
	}
	
	/**
	 * @function px
	 * @public
	 * @param {String|Number} size - String containing pixels value or a number.
	 * @returns {Number} Number of pixels.
	 * @description Function for parsing pixel strings.
	 *
	 * @example
	 * px('0px');  // 0
	 * px('42px'); // 42
	 */
	function px(size) {
	  return Number(String(size).replace(/px$/, ''));
	}
	
	exports.default = Elem;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.fetch = exports.Fetch = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Promise = __webpack_require__(21);
	
	var _Promise2 = _interopRequireDefault(_Promise);
	
	var _Super = __webpack_require__(18);
	
	var _Super2 = _interopRequireDefault(_Super);
	
	var _Arr = __webpack_require__(17);
	
	var _Arr2 = _interopRequireDefault(_Arr);
	
	var _Str = __webpack_require__(25);
	
	var _Str2 = _interopRequireDefault(_Str);
	
	var _helpers = __webpack_require__(8);
	
	var _constructURL = __webpack_require__(30);
	
	var _constructURL2 = _interopRequireDefault(_constructURL);
	
	var _parseHeaders = __webpack_require__(31);
	
	var _parseHeaders2 = _interopRequireDefault(_parseHeaders);
	
	var _transformData = __webpack_require__(32);
	
	var _transformData2 = _interopRequireDefault(_transformData);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
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
	 * @property {Array.<AfterMiddleware|FetchErrorAfterMiddleware>} [after]
	 * @property {Object} [auth]
	 * @property {String} [auth.username]
	 * @property {String} [auth.password]
	 * @property {String} [baseURL]
	 * @property {Array.<BeforeMiddleware|FetchErrorBeforeMiddleware>} [before]
	 * @property {*} [data]
	 * @property {Object.<String, String[]>} [headers]
	 * @property {FetchMethod} [method]
	 * @property {Object} [params]
	 * @property {Object} [query]
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
	 */
	
	/**
	 * @callback FetchErrorAfterMiddleware
	 * @public
	 * @param {Error|*} err - Thrown error.
	 * @param {FetchResponse} config - Fetch response.
	 */
	
	/**
	 * @callback FetchBeforeMiddleware
	 * @public
	 * @param {FetchConfig} config - Fetch config.
	 */
	
	/**
	 * @callback FetchErrorBeforeMiddleware
	 * @public
	 * @param {Error|*} err - Thrown error.
	 * @param {FetchConfig} config - Fetch config.
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
	  data: null,
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
	
	var Fetch = exports.Fetch = function (_Function) {
	  _inherits(Fetch, _Function);
	
	  function Fetch() {
	    var _ret;
	
	    var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    _classCallCheck(this, Fetch);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Fetch).call(this));
	
	    function fetch() {
	      return fetch.request.apply(fetch, arguments);
	    }
	
	    var conf = new _Super2.default({}).deepAssign(defaults, config).$;
	
	    conf.before.push(fetchBeforeMiddleware);
	
	    /**
	     * @member {FetchConfig} Fetch#$$
	     * @type {FetchConfig}
	     * @public
	     * @description Fetch config.
	     */
	    Object.defineProperty(fetch, '$$', { value: conf });
	    Object.setPrototypeOf(fetch, Fetch.prototype);
	
	    return _ret = fetch, _possibleConstructorReturn(_this, _ret);
	  }
	
	  /**
	   * @method Fetch#after
	   * @public
	   * @param {FetchAfterMiddleware|FetchErrorAfterMiddleware} middleware - Middleware to add.
	   * @param {Boolean|*} [afterAll = true] - Boolean parameter where to put the middleware.
	   * Truthy parameter stands for "to the end" and falsey for "to the beginning".
	   * @returns {Fetch} Returns this.
	   * @description Middleware that is called after the request.
	   * If the middleware has 2 or less arguments it's treated as success middleware otherwise as an error one.
	   * If the middleware returns a promise it becomes a part of the middleware chain.
	   *
	   * @example
	   * const fetch = new Fetch()
	   *   .after((err, res) => {
	   *     console.log(err);
	   *
	   *     throw err;
	   *   })
	   *   .after((res) => {
	   *     res.json = D(res.data).parseJSON():
	   *   });
	   */
	
	
	  _createClass(Fetch, [{
	    key: 'after',
	    value: function after(middleware) {
	      var afterAll = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
	
	      (0, _helpers.validate)([middleware], ['function'], 'Fetch#after');
	
	      var after = this.$$.after;
	
	
	      if (afterAll) {
	        after.push(middleware);
	      } else {
	        after.unshift(middleware);
	      }
	
	      return this;
	    }
	
	    /**
	     * @method Fetch#before
	     * @public
	     * @param {FetchBeforeMiddleware|FetchErrorBeforeMiddleware} middleware - Middleware to add.
	     * @param {Boolean|*} [beforeAll = true] - Boolean parameter where to put the middleware.
	     * Truthy parameter stands for "to the beginning" and falsey for "to the end".
	     * @returns {Fetch} Returns this.
	     * @description Middleware that is called before the request.
	     * If the middleware has 2 or less arguments it's treated as success middleware otherwise as an error one.
	     * If the middleware returns a promise it becomes a part of the middleware chain.
	     *
	     * @example
	     * const fetch = new Fetch()
	     *   .before((err, req) => {
	     *     console.log(err);
	     *
	     *     throw err;
	     *   })
	     *   .before((req) => {
	     *     if (req.url === '/veryLongRequest') {
	     *       req.timeout = 30000;
	     *     }
	     *   });
	     */
	
	  }, {
	    key: 'before',
	    value: function before(middleware) {
	      var beforeAll = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
	
	      (0, _helpers.validate)([middleware], ['function'], 'Fetch#before');
	
	      var before = this.$$.before;
	
	
	      if (beforeAll) {
	        before.unshift(middleware);
	      } else {
	        before.push(middleware);
	      }
	
	      return this;
	    }
	
	    /**
	     * @method Fetch#config
	     * @public
	     * @param {String|FetchConfig|FetchConfigFunction} [property] - If it's a function
	     * it's called with the fetch config argument, if it's a string the value argument
	     * is used for assigning this property to the fetch config
	     * otherwise it's assigned to the fetch config.
	     * @param {*} [value] - See the property argument.
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
	
	  }, {
	    key: 'config',
	    value: function config(property, value) {
	      var conf = this.$$;
	
	      if (!arguments.length) {
	        return conf;
	      }
	
	      if ((0, _helpers.isFunction)(property)) {
	        property(conf);
	      } else {
	        if (arguments.length >= 2) {
	          property = _defineProperty({}, property, value);
	        }
	
	        new _Super2.default(conf).deepAssign(property);
	      }
	
	      return this;
	    }
	
	    /**
	     * @method Fetch#delete
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
	
	  }, {
	    key: 'delete',
	    value: function _delete(url) {
	      var config = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	      if (!(0, _helpers.isString)(url)) {
	        config = url;
	        url = undefined;
	      }
	
	      return this.request(url, (0, _helpers.assign)({ method: 'delete' }, config));
	    }
	
	    /**
	     * @method Fetch#get
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
	
	  }, {
	    key: 'get',
	    value: function get(url) {
	      var config = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	      if (!(0, _helpers.isString)(url)) {
	        config = url;
	        url = undefined;
	      }
	
	      return this.request(url, (0, _helpers.assign)({ method: 'get' }, config));
	    }
	
	    /**
	     * @method Fetch#head
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
	
	  }, {
	    key: 'head',
	    value: function head(url) {
	      var config = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	      if (!(0, _helpers.isString)(url)) {
	        config = url;
	        url = undefined;
	      }
	
	      return this.request(url, (0, _helpers.assign)({ method: 'head' }, config));
	    }
	
	    /**
	     * @method Fetch#headers
	     * @public
	     * @param {String|Object.<String, String|String[]>} header - A header string or an object of the following format:
	     * { [header]: [value1, value2, ...] }.
	     * @param {String|String[]} [value] - Header value. If the first argument is a string
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
	
	  }, {
	    key: 'headers',
	    value: function headers(header, value) {
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
	    }
	
	    /**
	     * @method Fetch#instance
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
	
	  }, {
	    key: 'instance',
	    value: function instance() {
	      var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	      var dataConfig = new _Super2.default(config).hasOwn('data') ? { data: config.data } : {};
	
	      delete config.data;
	
	      var conf = new _Super2.default({}).deepAssign(this.$$, config).assign(dataConfig).$;
	
	      if (conf.before.indexOf(fetchBeforeMiddleware) === -1) {
	        conf.before.push(fetchBeforeMiddleware);
	      }
	
	      return new Fetch(conf);
	    }
	
	    /**
	     * @method Fetch#patch
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
	
	  }, {
	    key: 'patch',
	    value: function patch(url) {
	      var data = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	      var config = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
	      if (arguments.length && !(0, _helpers.isString)(url)) {
	        config = data;
	        data = url;
	        url = undefined;
	      }
	
	      return this.request(url, (0, _helpers.assign)({ method: 'patch', data: data }, config));
	    }
	
	    /**
	     * @method Fetch#post
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
	
	  }, {
	    key: 'post',
	    value: function post(url) {
	      var data = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	      var config = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
	      if (arguments.length && !(0, _helpers.isString)(url)) {
	        config = data;
	        data = url;
	        url = undefined;
	      }
	
	      return this.request(url, (0, _helpers.assign)({ method: 'post', data: data }, config));
	    }
	
	    /**
	     * @method Fetch#put
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
	
	  }, {
	    key: 'put',
	    value: function put(url) {
	      var data = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	      var config = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
	      if (arguments.length && !(0, _helpers.isString)(url)) {
	        config = data;
	        data = url;
	        url = undefined;
	      }
	
	      return this.request(url, (0, _helpers.assign)({ method: 'put', data: data }, config));
	    }
	
	    /**
	     * @method Fetch#request
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
	
	  }, {
	    key: 'request',
	    value: function request(url) {
	      var config = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	      if (arguments.length === 1 && !(0, _helpers.isString)(url)) {
	        config = url;
	      }
	
	      var dataConfig = new _Super2.default(config).hasOwn('data') ? { data: config.data } : {};
	      var urlConfig = (0, _helpers.isString)(url) ? { url: url } : {};
	
	      delete config.data;
	
	      var conf = new _Super2.default(this.$$).deepClone().deepAssign(urlConfig, config).assign(dataConfig).$;
	
	      var xhr = void 0;
	      var promise = _Promise2.default.resolve();
	
	      (0, _helpers.iterate)(conf.before, function (middleware) {
	        promise = promise.then(function () {
	          if (middleware.length >= 2) {
	            return _Promise2.default.resolve();
	          }
	
	          return new _Promise2.default(function (resolve) {
	            resolve(middleware(conf));
	          });
	        }, function (err) {
	          if (middleware.length < 2) {
	            return _Promise2.default.reject(err);
	          }
	
	          return new _Promise2.default(function (resolve) {
	            resolve(middleware(err, conf));
	          });
	        });
	      });
	
	      promise = promise.then(function () {
	        return new _Promise2.default(function (resolve, reject) {
	          var after = conf.after;
	          var _conf$auth = conf.auth;
	          var username = _conf$auth.username;
	          var password = _conf$auth.password;
	          var data = conf.data;
	          var headers = conf.headers;
	          var method = conf.method;
	          var onprogress = conf.onprogress;
	          var responseType = conf.responseType;
	          var timeout = conf.timeout;
	          var url = conf.url;
	          var withCredentials = conf.withCredentials;
	
	
	          xhr = new XMLHttpRequest();
	
	          xhr.open(method, url, true, username, password);
	
	          (0, _helpers.iterate)(headers, function (value, header) {
	            xhr.setRequestHeader(header, value);
	          });
	
	          if (onprogress) {
	            if (uploadMethods.indexOfStrict(method) === -1) {
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
	              data: !responseType || responseType === 'text' ? xhr.responseText : xhr.response,
	              headers: (0, _parseHeaders2.default)(xhr.getAllResponseHeaders()),
	              status: xhr.status === 1223 ? 204 : xhr.status,
	              statusText: xhr.status === 1223 ? 'No Content' : xhr.statusText,
	              xhr: xhr
	            };
	
	            var promise = _Promise2.default.resolve();
	
	            (0, _helpers.iterate)(after, function (middleware) {
	              promise = promise.then(function () {
	                if (middleware.length >= 2) {
	                  return _Promise2.default.resolve();
	                }
	
	                return new _Promise2.default(function (resolve) {
	                  resolve(middleware(response));
	                });
	              }, function (err) {
	                if (middleware.length < 2) {
	                  return _Promise2.default.reject(err);
	                }
	
	                return new _Promise2.default(function (resolve) {
	                  resolve(middleware(err, response));
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
	
	          xhr.send(data);
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
	  }]);
	
	  return Fetch;
	}(Function);
	
	(0, _helpers.defineProperties)(Fetch.prototype, _defineProperty({}, _helpers.Symbol.toStringTag, 'Fetch'));
	
	/**
	 * @function fetchBeforeMiddleware
	 * @private
	 * @param {FetchConfig} config
	 * @description Built-in before middleware for url, data, method, headers construction.
	 */
	function fetchBeforeMiddleware(config) {
	  var baseURL = config.baseURL;
	  var data = config.data;
	  var headers = config.headers;
	  var method = config.method;
	  var params = config.params;
	  var query = config.query;
	  var url = config.url;
	
	  var METHOD = method.toUpperCase();
	
	  config.method = METHOD;
	  config.url = (0, _constructURL2.default)(baseURL, url, params, query);
	  config.data = (0, _transformData2.default)(data, METHOD, headers);
	  config.headers = new _Super2.default(headers).object(function (headers, values, header) {
	    header = new _Str2.default(header).toCapitalCase().replace(/\s+/g, '-').$;
	
	    headers[header] = values.join(', ');
	  }).$;
	}
	
	/**
	 * @const {Fetch} fetch
	 * @public
	 * @description Empty instance of Fetch.
	 */
	var fetch = exports.fetch = new Fetch();
	
	exports.default = Fetch;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _Str = __webpack_require__(25);
	
	var _Str2 = _interopRequireDefault(_Str);
	
	var _checkTypes = __webpack_require__(4);
	
	var _iterate = __webpack_require__(10);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * @type {RegExp}
	 * @description Absolute URL pattern.
	 */
	var absoluteURLRegexp = /^(([a-z][a-z\d\+\-\.]*:)?\/\/|data:[a-z]+\/[a-z]+;base64,)/i;
	
	/**
	 * @function constructURL
	 * @param {String} baseURL - BaseURL of the output URL.
	 * @param {String} url - Main part of the output URL.
	 * @param {Object} params - Params to replace in the url expressions like ":param".
	 * @param {Object} query - Object with query params.
	 * @param {Object} [hash = ''] - URL hash.
	 * @returns {String} Constructed URL.
	 * @description Function for constructing URL from the base URL, URL, params and query params.
	 */
	/**
	 * @module helpers/constructURL
	 * @private
	 * @description Exports Object.assign-like method.
	 */
	
	exports.default = function (baseURL, url, params, query) {
	  var hash = arguments.length <= 4 || arguments[4] === undefined ? '' : arguments[4];
	
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
	
	  return '' + URL + (hash ? '#' + hash : '');
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
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _Str = __webpack_require__(25);
	
	var _Str2 = _interopRequireDefault(_Str);
	
	var _iterate = __webpack_require__(10);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * @function parseHeaders
	 * @param {String} rawHeaders - Raw headers.
	 * @returns {Object} Headers object
	 * @description Function for parsing raw headers.
	 */
	/**
	 * @module helpers/parseHeaders
	 * @private
	 * @description Exports parseHeaders method.
	 */
	
	exports.default = function (rawHeaders) {
	  var headers = {};
	
	  (0, _iterate.iterate)((rawHeaders || '').split('\n'), function (value) {
	    var index = value.indexOf(':');
	    var key = new _Str2.default(value.substring(0, index)).trim().toCamelCase().$;
	    var val = new _Str2.default(value.substring(index + 1)).trim().$;
	
	    if (key) {
	      headers[key] = (headers[key] ? headers[key] + ', ' : '') + val;
	    }
	  });
	
	  return headers;
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _Arr = __webpack_require__(17);
	
	var _Arr2 = _interopRequireDefault(_Arr);
	
	var _Super = __webpack_require__(18);
	
	var _Super2 = _interopRequireDefault(_Super);
	
	var _ = __webpack_require__(8);
	
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

/***/ },
/* 33 */
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
	    elem.addClass(cls);
	  },
	  $: function $(elem, attr, value) {
	    elem.attr(attr, value);
	  },
	  '@': function _(elem, prop, value) {
	    elem.css(prop, value);
	  },
	  '&': function _(elem, name, html) {
	    elem.html(html);
	  },
	  '*': function _(elem, name, text) {
	    elem.text(text);
	  },
	
	  '-': {
	    '.': function _(elem, cls) {
	      elem.removeClass(cls);
	    },
	    $: function $(elem, attr) {
	      elem.removeAttr(attr);
	    },
	    '@': function _(elem, prop) {
	      elem.removeCSS(prop);
	    }
	  }
	};

/***/ },
/* 34 */
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
	 * @type {String[]}
	 */
	exports.default = [
	/**
	 * @member {Function} Elem#a
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'a',
	
	/**
	 * @member {Function} Elem#abbr
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'abbr',
	
	/**
	 * @member {Function} Elem#address
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'address',
	
	/**
	 * @member {Function} Elem#area
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'area',
	
	/**
	 * @member {Function} Elem#article
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'article',
	
	/**
	 * @member {Function} Elem#audio
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'audio',
	
	/**
	 * @member {Function} Elem#b
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'b',
	
	/**
	 * @member {Function} Elem#base
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'base',
	
	/**
	 * @member {Function} Elem#bdi
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'bdi',
	
	/**
	 * @member {Function} Elem#bdo
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'bdo',
	
	/**
	 * @member {Function} Elem#blockquote
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'blockquote',
	
	/**
	 * @member {Function} Elem#body
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'body',
	
	/**
	 * @member {Function} Elem#br
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'br',
	
	/**
	 * @member {Function} Elem#button
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'button',
	
	/**
	 * @member {Function} Elem#canvas
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'canvas',
	
	/**
	 * @member {Function} Elem#caption
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'caption',
	
	/**
	 * @member {Function} Elem#cite
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'cite',
	
	/**
	 * @member {Function} Elem#code
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'code',
	
	/**
	 * @member {Function} Elem#col
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'col',
	
	/**
	 * @member {Function} Elem#colgroup
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'colgroup',
	
	/**
	 * @member {Function} Elem#content
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'content',
	
	/**
	 * @member {Function} Elem#datalist
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'datalist',
	
	/**
	 * @member {Function} Elem#dd
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'dd',
	
	/**
	 * @member {Function} Elem#del
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'del',
	
	/**
	 * @member {Function} Elem#details
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'details',
	
	/**
	 * @member {Function} Elem#dfn
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'dfn',
	
	/**
	 * @member {Function} Elem#dialog
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'dialog',
	
	/**
	 * @member {Function} Elem#div
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'div',
	
	/**
	 * @member {Function} Elem#dl
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'dl',
	
	/**
	 * @member {Function} Elem#dt
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'dt',
	
	/**
	 * @member {Function} Elem#element
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'element',
	
	/**
	 * @member {Function} Elem#em
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'em',
	
	/**
	 * @member {Function} Elem#embed
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'embed',
	
	/**
	 * @member {Function} Elem#fieldset
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'fieldset',
	
	/**
	 * @member {Function} Elem#figcaption
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'figcaption',
	
	/**
	 * @member {Function} Elem#figure
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'figure',
	
	/**
	 * @member {Function} Elem#footer
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'footer',
	
	/**
	 * @member {Function} Elem#form
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'form',
	
	/**
	 * @member {Function} Elem#h1
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'h1',
	
	/**
	 * @member {Function} Elem#h2
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'h2',
	
	/**
	 * @member {Function} Elem#h3
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'h3',
	
	/**
	 * @member {Function} Elem#h4
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'h4',
	
	/**
	 * @member {Function} Elem#h5
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'h5',
	
	/**
	 * @member {Function} Elem#h6
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'h6',
	
	/**
	 * @member {Function} Elem#head
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'head',
	
	/**
	 * @member {Function} Elem#header
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'header',
	
	/**
	 * @member {Function} Elem#hgroup
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'hgroup',
	
	/**
	 * @member {Function} Elem#hr
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'hr',
	
	/**
	 * @member {Function} Elem#i
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'i',
	
	/**
	 * @member {Function} Elem#iframe
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'iframe',
	
	/**
	 * @member {Function} Elem#img
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'img',
	
	/**
	 * @member {Function} Elem#input
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'input',
	
	/**
	 * @member {Function} Elem#ins
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'ins',
	
	/**
	 * @member {Function} Elem#kbd
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'kbd',
	
	/**
	 * @member {Function} Elem#label
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'label',
	
	/**
	 * @member {Function} Elem#legend
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'legend',
	
	/**
	 * @member {Function} Elem#li
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'li',
	
	/**
	 * @member {Function} Elem#link
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'link',
	
	/**
	 * @member {Function} Elem#main
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'main',
	
	/**
	 * @member {Function} Elem#mark
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'mark',
	
	/**
	 * @member {Function} Elem#menu
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'menu',
	
	/**
	 * @member {Function} Elem#menuitem
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'menuitem',
	
	/**
	 * @member {Function} Elem#meta
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'meta',
	
	/**
	 * @member {Function} Elem#meter
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'meter',
	
	/**
	 * @member {Function} Elem#nav
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'nav',
	
	/**
	 * @member {Function} Elem#noscript
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'noscript',
	
	/**
	 * @member {Function} Elem#null
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'null',
	
	/**
	 * @member {Function} Elem#ol
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'ol',
	
	/**
	 * @member {Function} Elem#optgroup
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'optgroup',
	
	/**
	 * @member {Function} Elem#option
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'option',
	
	/**
	 * @member {Function} Elem#output
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'output',
	
	/**
	 * @member {Function} Elem#p
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'p',
	
	/**
	 * @member {Function} Elem#param
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'param',
	
	/**
	 * @member {Function} Elem#pre
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'pre',
	
	/**
	 * @member {Function} Elem#progress
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'progress',
	
	/**
	 * @member {Function} Elem#q
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'q',
	
	/**
	 * @member {Function} Elem#rp
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'rp',
	
	/**
	 * @member {Function} Elem#rt
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'rt',
	
	/**
	 * @member {Function} Elem#rtc
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'rtc',
	
	/**
	 * @member {Function} Elem#ruby
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'ruby',
	
	/**
	 * @member {Function} Elem#s
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	's',
	
	/**
	 * @member {Function} Elem#samp
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'samp',
	
	/**
	 * @member {Function} Elem#script
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'script',
	
	/**
	 * @member {Function} Elem#section
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'section',
	
	/**
	 * @member {Function} Elem#select
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'select',
	
	/**
	 * @member {Function} Elem#shadow
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'shadow',
	
	/**
	 * @member {Function} Elem#small
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'small',
	
	/**
	 * @member {Function} Elem#source
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'source',
	
	/**
	 * @member {Function} Elem#span
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'span',
	
	/**
	 * @member {Function} Elem#strong
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'strong',
	
	/**
	 * @member {Function} Elem#style
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'style',
	
	/**
	 * @member {Function} Elem#sub
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'sub',
	
	/**
	 * @member {Function} Elem#summary
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'summary',
	
	/**
	 * @member {Function} Elem#sup
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'sup',
	
	/**
	 * @member {Function} Elem#table
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'table',
	
	/**
	 * @member {Function} Elem#tbody
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'tbody',
	
	/**
	 * @member {Function} Elem#td
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'td',
	
	/**
	 * @member {Function} Elem#template
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'template',
	
	/**
	 * @member {Function} Elem#textarea
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'textarea',
	
	/**
	 * @member {Function} Elem#tfoot
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'tfoot',
	
	/**
	 * @member {Function} Elem#th
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'th',
	
	/**
	 * @member {Function} Elem#thead
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'thead',
	
	/**
	 * @member {Function} Elem#time
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'time',
	
	/**
	 * @member {Function} Elem#title
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'title',
	
	/**
	 * @member {Function} Elem#tr
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'tr',
	
	/**
	 * @member {Function} Elem#track
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'track',
	
	/**
	 * @member {Function} Elem#u
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'u',
	
	/**
	 * @member {Function} Elem#ul
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'ul',
	
	/**
	 * @member {Function} Elem#var
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'var',
	
	/**
	 * @member {Function} Elem#video
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'video',
	
	/**
	 * @member {Function} Elem#wbr
	 * @type {Function}
	 * @param {...String} appliedExpressions
	 * @returns {Elem}
	 */
	'wbr'];

/***/ },
/* 35 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * @module constants/elements
	 * @private
	 * @description Exports different canvas methods for {@link Elem} for creating html-elements.
	 */
	
	/**
	 * @const
	 * @type {String[]}
	 */
	var canvasGetMethods = exports.canvasGetMethods = [
	/**
	 * @member {Function} Elem#createImageData
	 * @type {Function}
	 * @param {...*} args
	 * @returns {ImageData|void}
	 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/createImageData
	 */
	'createImageData',
	
	/**
	 * @member {Function} Elem#createLinearGradient
	 * @type {Function}
	 * @param {...*} args
	 * @returns {CanvasGradient|void}
	 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/createLinearGradient
	 */
	'createLinearGradient',
	
	/**
	 * @member {Function} Elem#createPattern
	 * @type {Function}
	 * @param {...*} args
	 * @returns {CanvasPattern|void}
	 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/createPattern
	 */
	'createPattern',
	
	/**
	 * @member {Function} Elem#createRadialGradient
	 * @type {Function}
	 * @param {...*} args
	 * @returns {CanvasGradient|void}
	 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/createRadialGradient
	 */
	'createRadialGradient',
	
	/**
	 * @member {Function} Elem#getImageData
	 * @type {Function}
	 * @param {...*} args
	 * @returns {ImageData|void}
	 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/getImageData
	 */
	'getImageData',
	
	/**
	 * @member {Function} Elem#getLineDash
	 * @type {Function}
	 * @param {...*} args
	 * @returns {Number[]|void}
	 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/getLineDash
	 */
	'getLineDash',
	
	/**
	 * @member {Function} Elem#isPointInPath
	 * @type {Function}
	 * @param {...*} args
	 * @returns {Boolean|void}
	 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/isPointInPath
	 */
	'isPointInPath',
	
	/**
	 * @member {Function} Elem#isPointInStroke
	 * @type {Function}
	 * @param {...*} args
	 * @returns {Boolean|void}
	 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/isPointInStroke
	 */
	'isPointInStroke',
	
	/**
	 * @member {Function} Elem#measureText
	 * @type {Function}
	 * @param {...*} args
	 * @returns {TextMetrics|void}
	 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/measureText
	 */
	'measureText'];
	
	var canvasRestMethods = exports.canvasRestMethods = [
	/**
	 * @member {Function} Elem#arc
	 * @type {Function}
	 * @param {...*} args
	 * @returns {Elem}
	 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/arc
	 */
	'arc',
	
	/**
	 * @member {Function} Elem#arcTo
	 * @type {Function}
	 * @param {...*} args
	 * @returns {Elem}
	 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/arcTo
	 */
	'arcTo',
	
	/**
	 * @member {Function} Elem#beginPath
	 * @type {Function}
	 * @param {...*} args
	 * @returns {Elem}
	 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/beginPath
	 */
	'beginPath',
	
	/**
	 * @member {Function} Elem#bezierCurveTo
	 * @type {Function}
	 * @param {...*} args
	 * @returns {Elem}
	 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/bezierCurveTo
	 */
	'bezierCurveTo',
	
	/**
	 * @member {Function} Elem#clearRect
	 * @type {Function}
	 * @param {...*} args
	 * @returns {Elem}
	 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/clearRect
	 */
	'clearRect',
	
	/**
	 * @member {Function} Elem#clip
	 * @type {Function}
	 * @param {...*} args
	 * @returns {Elem}
	 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/clip
	 */
	'clip',
	
	/**
	 * @member {Function} Elem#closePath
	 * @type {Function}
	 * @param {...*} args
	 * @returns {Elem}
	 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/closePath
	 */
	'closePath',
	
	/**
	 * @member {Function} Elem#drawFocusIfNeeded
	 * @type {Function}
	 * @param {...*} args
	 * @returns {Elem}
	 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/drawFocusIfNeeded
	 */
	'drawFocusIfNeeded',
	
	/**
	 * @member {Function} Elem#drawImage
	 * @type {Function}
	 * @param {...*} args
	 * @returns {Elem}
	 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/drawImage
	 */
	'drawImage',
	
	/**
	 * @member {Function} Elem#ellipse
	 * @type {Function}
	 * @param {...*} args
	 * @returns {Elem}
	 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/ellipse
	 */
	'ellipse',
	
	/**
	 * @member {Function} Elem#fill
	 * @type {Function}
	 * @param {...*} args
	 * @returns {Elem}
	 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/fill
	 */
	'fill',
	
	/**
	 * @member {Function} Elem#fillRect
	 * @type {Function}
	 * @param {...*} args
	 * @returns {Elem}
	 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/fillRect
	 */
	'fillRect',
	
	/**
	 * @member {Function} Elem#fillText
	 * @type {Function}
	 * @param {...*} args
	 * @returns {Elem}
	 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/fillText
	 */
	'fillText',
	
	/**
	 * @member {Function} Elem#lineTo
	 * @type {Function}
	 * @param {...*} args
	 * @returns {Elem}
	 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/lineTo
	 */
	'lineTo',
	
	/**
	 * @member {Function} Elem#moveTo
	 * @type {Function}
	 * @param {...*} args
	 * @returns {Elem}
	 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/moveTo
	 */
	'moveTo',
	
	/**
	 * @member {Function} Elem#putImageData
	 * @type {Function}
	 * @param {...*} args
	 * @returns {Elem}
	 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/putImageData
	 */
	'putImageData',
	
	/**
	 * @member {Function} Elem#quadraticCurveTo
	 * @type {Function}
	 * @param {...*} args
	 * @returns {Elem}
	 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/quadraticCurveTo
	 */
	'quadraticCurveTo',
	
	/**
	 * @member {Function} Elem#rect
	 * @type {Function}
	 * @param {...*} args
	 * @returns {Elem}
	 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/rect
	 */
	'rect',
	
	/**
	 * @member {Function} Elem#resetTransform
	 * @type {Function}
	 * @param {...*} args
	 * @returns {Elem}
	 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/resetTransform
	 */
	'resetTransform',
	
	/**
	 * @member {Function} Elem#restore
	 * @type {Function}
	 * @param {...*} args
	 * @returns {Elem}
	 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/restore
	 */
	'restore',
	
	/**
	 * @member {Function} Elem#rotate
	 * @type {Function}
	 * @param {...*} args
	 * @returns {Elem}
	 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/rotate
	 */
	'rotate',
	
	/**
	 * @member {Function} Elem#save
	 * @type {Function}
	 * @param {...*} args
	 * @returns {Elem}
	 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/save
	 */
	'save',
	
	/**
	 * @member {Function} Elem#scale
	 * @type {Function}
	 * @param {...*} args
	 * @returns {Elem}
	 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/scale
	 */
	'scale',
	
	/**
	 * @member {Function} Elem#setLineDash
	 * @type {Function}
	 * @param {...*} args
	 * @returns {Elem}
	 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/setLineDash
	 */
	'setLineDash',
	
	/**
	 * @member {Function} Elem#setTransform
	 * @type {Function}
	 * @param {...*} args
	 * @returns {Elem}
	 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/setTransform
	 */
	'setTransform',
	
	/**
	 * @member {Function} Elem#stroke
	 * @type {Function}
	 * @param {...*} args
	 * @returns {Elem}
	 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/stroke
	 */
	'stroke',
	
	/**
	 * @member {Function} Elem#strokeRect
	 * @type {Function}
	 * @param {...*} args
	 * @returns {Elem}
	 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/strokeRect
	 */
	'strokeRect',
	
	/**
	 * @member {Function} Elem#strokeText
	 * @type {Function}
	 * @param {...*} args
	 * @returns {Elem}
	 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/strokeText
	 */
	'strokeText',
	
	/**
	 * @member {Function} Elem#transform
	 * @type {Function}
	 * @param {...*} args
	 * @returns {Elem}
	 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/transform
	 */
	'transform',
	
	/**
	 * @member {Function} Elem#translate
	 * @type {Function}
	 * @param {...*} args
	 * @returns {Elem}
	 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/translate
	 */
	'translate'];

/***/ }
/******/ ]);
//# sourceMappingURL=dwayne.js.map