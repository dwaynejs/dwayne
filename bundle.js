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

	'use strict';
	
	var _domc = __webpack_require__(1);
	
	var _domc2 = _interopRequireDefault(_domc);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	window.top.D = _domc2.default;
	//console.dir(D);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _D = __webpack_require__(2);
	
	var _D2 = _interopRequireDefault(_D);
	
	__webpack_require__(10);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _D2.default;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _libs = __webpack_require__(3);
	
	var _methods = __webpack_require__(9);
	
	var _methods2 = _interopRequireDefault(_methods);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function D() {
		console.log(123);
	}
	
	exports.default = (0, _libs.assign)(D, { constructors: [] }, _methods2.default);

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _assign = __webpack_require__(4);
	
	Object.keys(_assign).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _assign[key];
	    }
	  });
	});
	
	var _defineProperty = __webpack_require__(5);
	
	Object.keys(_defineProperty).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _defineProperty[key];
	    }
	  });
	});
	
	var _toArray = __webpack_require__(6);
	
	Object.keys(_toArray).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _toArray[key];
	    }
	  });
	});
	
	var _validate = __webpack_require__(8);
	
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
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var assign = exports.assign = Object.assign || function (target) {
		for (var _len = arguments.length, objects = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			objects[_key - 1] = arguments[_key];
		}
	
		for (var i = 0; i < objects.length; i++) {
			var source = objects[i];
			for (var key in source) {
				if (source.hasOwnProperty(key)) {
					target[key] = source[key];
				}
			}
		}
		return target;
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.dynamicDefineProperties = dynamicDefineProperties;
	exports.defineProperties = defineProperties;
	var getRegexp = /^get /,
	    setRegexp = /^set /,
	    getSetRegexp = /^get\/set /;
	
	function dynamicDefineProperties(object, methods, descriptorGenerator) {
		for (var i = 0, length = methods.length; i < length; i++) {
			var name = methods[i];
			Object.defineProperty(object, name, { value: descriptorGenerator(name) });
		}
	}
	
	function defineProperties(object, methods) {
		for (var name in methods) {
			if (methods.hasOwnProperty(name)) {
				var method = methods[name];
	
				if (getRegexp.test(name)) {
					Object.defineProperty(object, name.replace(getRegexp, ''), { get: method });
					continue;
				}
	
				if (setRegexp.test(name)) {
					Object.defineProperty(object, name.replace(setRegexp, ''), { set: method });
					continue;
				}
	
				if (getSetRegexp.test(name)) {
					Object.defineProperty(object, name.replace(getSetRegexp, ''), { get: method.get, set: method.set });
					continue;
				}
	
				Object.defineProperty(object, name, { value: method });
			}
		}
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.toArray = toArray;
	
	var _checkTypeMethods = __webpack_require__(7);
	
	var _checkTypeMethods2 = _interopRequireDefault(_checkTypeMethods);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function toArray(array) {
		var a = [];
	
		if (methods.isArrayAlike(array)) {
			for (var i = 0, length = array.length; i < length; i++) {
				a.push(array[i]);
			}
		} else {
			a.push(array);
		}
	
		return a;
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _assign = __webpack_require__(4);
	
	var methods = {
		isArray: function isArray(array) {
			return Object.prototype.toString.call(array) === '[object Array]';
		},
		isBoolean: function isBoolean(boolean) {
			return Object.prototype.toString.call(boolean) === '[object Boolean]';
		},
		isDate: function isDate(date) {
			return Object.prototype.toString.call(date) === '[object Date]';
		},
		isFunction: function isFunction(func) {
			return typeof func === 'function';
		},
		isNaN: function isNaN(nan) {
			return nan !== nan;
		},
		isNumber: function isNumber(number) {
			return Object.prototype.toString.call(number) === '[object Number]';
		},
		isNull: function isNull(nul) {
			return nul === null;
		},
		isNullOrUndefined: function isNullOrUndefined(nul) {
			return nul === null || typeof nul === 'undefined';
		},
		isObject: function isObject(object) {
			return !!object && ((typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' || Object.prototype.toString.call(object) === '[object Object]');
		},
		isRegexp: function isRegexp(regexp) {
			return regexp instanceof RegExp;
		},
		isString: function isString(string) {
			return Object.prototype.toString.call(string) === '[object String]';
		},
		isUndefined: function isUndefined(undef) {
			return typeof undef === 'undefined';
		}
	};
	
	methods.isNaN = Number.isNaN || methods.isNaN;
	methods.isArray = Array.isArray || methods.isArray;
	
	(0, _assign.assign)(methods, {
		isDateAlike: function isDateAlike(date) {
			date = new Date(date);
			return !methods.isNaN(date.getTime());
		},
		isFinite: function isFinite(number) {
			return methods.isNumber(number) && !methods.isNaN(number) && number !== Infinity && number !== -Infinity;
		},
		isInteger: function isInteger(integer) {
			return methods.isNumber(integer) && integer % 1 === 0;
		},
		isNumberAlike: function isNumberAlike(number) {
			if (methods.isNaN(number) || number === 'NaN') {
				return true;
			}
	
			number = Number(number);
	
			return !!(number || number === 0);
		}
	});
	
	methods.isInteger = Number.isInteger || methods.isInteger;
	methods.isFinite = Number.isFinite || methods.isFinite;
	
	(0, _assign.assign)(methods, {
		isArrayAlike: function isArrayAlike(array) {
			if (!array || methods.isFunction(array)) {
				return false;
			}
	
			var length = array.length;
	
			return methods.isInteger(length) && length >= 0;
		},
		isIntegerAlike: function isIntegerAlike(integer) {
			integer = parseInt(Number(integer));
			return !!(integer || integer === 0);
		}
	});
	
	exports.default = methods;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.validate = validate;
	
	var _checkTypeMethods = __webpack_require__(7);
	
	var _checkTypeMethods2 = _interopRequireDefault(_checkTypeMethods);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var numbers = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th'];
	
	var check = {
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
			check: function check(n) {
				return n != null;
			},
			text: '$n argument must be not null or undefined!',
			error: TypeError
		},
		'array': {
			check: _checkTypeMethods2.default.isArray,
			text: '$n argument must be an array!',
			error: TypeError
		},
		'array||!': {
			check: function check(n) {
				return _checkTypeMethods2.default.isArray(n) || _checkTypeMethods2.default.isUndefined(n) || _checkTypeMethods2.default.isNull(n);
			},
			text: '$n argument must be an array, or undefined, or null!',
			error: TypeError
		},
		'arrayAlike': {
			check: _checkTypeMethods2.default.isArrayAlike,
			text: '$n argument must be array alike!',
			error: TypeError
		},
		'arrayAlike||!': {
			check: function check(n) {
				return _checkTypeMethods2.default.isArrayAlike(n) || _checkTypeMethods2.default.isUndefined(n) || _checkTypeMethods2.default.isNull(n);
			},
			text: '$n argument must be array alike, or undefined, or null!',
			error: TypeError
		},
		'date': {
			check: _checkTypeMethods2.default.isDate,
			text: '$n argument must be a date!',
			error: TypeError
		},
		'date||!': {
			check: function check(n) {
				return _checkTypeMethods2.default.isDate(n) || _checkTypeMethods2.default.isUndefined(n) || _checkTypeMethods2.default.isNull(n);
			},
			text: '$n argument must be a date, or undefined, or null!',
			error: TypeError
		},
		'dateAlike': {
			check: _checkTypeMethods2.default.isDateAlike,
			text: '$n argument must be date alike!',
			error: TypeError
		},
		'dateAlike||!': {
			check: function check(n) {
				return _checkTypeMethods2.default.isDateAlike(n) || _checkTypeMethods2.default.isUndefined(n) || _checkTypeMethods2.default.isNull(n);
			},
			text: '$n argument must be date alike, or undefined, or null!',
			error: TypeError
		},
		'function': {
			check: _checkTypeMethods2.default.isFunction,
			text: '$n argument must be a function!',
			error: TypeError
		},
		'function||!': {
			check: function check(n) {
				return _checkTypeMethods2.default.isFunction(n) || _checkTypeMethods2.default.isUndefined(n) || _checkTypeMethods2.default.isNull(n);
			},
			text: '$n argument must be a function, or undefined, or null!',
			error: TypeError
		},
		'int': {
			check: _checkTypeMethods2.default.isInteger,
			text: '$n argument must be an integer!',
			error: TypeError
		},
		'int||!': {
			check: function check(n) {
				return _checkTypeMethods2.default.isInteger(n) || _checkTypeMethods2.default.isUndefined(n) || _checkTypeMethods2.default.isNull(n);
			},
			text: '$n argument must be an integer, or undefined, or null!',
			error: TypeError
		},
		'intAlike': {
			check: _checkTypeMethods2.default.isIntegerAlike,
			text: '$n argument must be integer alike!',
			error: TypeError
		},
		'intAlike||!': {
			check: function check(n) {
				return _checkTypeMethods2.default.isIntegerAlike(n) || _checkTypeMethods2.default.isUndefined(n) || _checkTypeMethods2.default.isNull(n);
			},
			text: '$n argument must be integer alike, or undefined, or null!',
			error: TypeError
		},
		'number': {
			check: _checkTypeMethods2.default.isNumber,
			text: '$n argument must be a number!',
			error: TypeError
		},
		'number||!': {
			check: function check(n) {
				return _checkTypeMethods2.default.isNumber(n) || _checkTypeMethods2.default.isUndefined(n) || _checkTypeMethods2.default.isNull(n);
			},
			text: '$n argument must be a number, or undefined, or null!',
			error: TypeError
		},
		'numberAlike': {
			check: _checkTypeMethods2.default.isNumberAlike,
			text: '$n argument must be number alike!',
			error: TypeError
		},
		'numberAlike||!': {
			check: function check(n) {
				return _checkTypeMethods2.default.isNumberAlike(n) || _checkTypeMethods2.default.isUndefined(n) || _checkTypeMethods2.default.isNull(n);
			},
			text: '$n argument must be number alike, or undefined, or null!',
			error: TypeError
		},
		'object': {
			check: _checkTypeMethods2.default.isObject,
			text: '$n argument must be an object!',
			error: TypeError
		},
		'object||!': {
			check: function check(n) {
				return _checkTypeMethods2.default.isObject(n) || _checkTypeMethods2.default.isUndefined(n) || _checkTypeMethods2.default.isNull(n);
			},
			text: '$n argument must be an object, or undefined, or null!',
			error: TypeError
		},
		'regexp': {
			check: _checkTypeMethods2.default.isRegexp,
			text: '$n argument must be a regular expression!',
			error: TypeError
		},
		'regexp||!': {
			check: function check(n) {
				return _checkTypeMethods2.default.isRegexp(n) || _checkTypeMethods2.default.isUndefined(n) || _checkTypeMethods2.default.isNull(n);
			},
			text: '$n argument must be a regular expression, or undefined, or null!',
			error: TypeError
		},
		'string': {
			check: _checkTypeMethods2.default.isString,
			text: '$n argument must be a string!',
			error: TypeError
		},
		'string||!': {
			check: function check(n) {
				return _checkTypeMethods2.default.isString(n) || _checkTypeMethods2.default.isUndefined(n) || _checkTypeMethods2.default.isNull(n);
			},
			text: '$n argument must be a string, or undefined, or null!',
			error: TypeError
		}
	};
	
	function validate(args, options) {
		for (var number in options) {
			if (options.hasOwnProperty(number)) {
				var array = options[number];
				if (!_checkTypeMethods2.default.isArray(array)) {
					array = [array];
				}
				for (var i = 0; i < array.length; i++) {
					var checker = check[array[i]];
					if (!checker.check(args[number])) {
						throw new checker.error(checker.text.replace('$n', numbers[number]));
					}
				}
			}
		}
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _assign = __webpack_require__(4);
	
	var _checkTypeMethods = __webpack_require__(7);
	
	var _checkTypeMethods2 = _interopRequireDefault(_checkTypeMethods);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = (0, _assign.assign)({}, _checkTypeMethods2.default);

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _ = __webpack_require__(11);
	
	var _2 = _interopRequireDefault(_);
	
	__webpack_require__(12);
	
	__webpack_require__(16);
	
	__webpack_require__(18);
	
	__webpack_require__(22);
	
	__webpack_require__(24);
	
	__webpack_require__(26);
	
	__webpack_require__(31);
	
	__webpack_require__(32);
	
	__webpack_require__(33);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _2.default;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.transform = transform;
	
	var _ = __webpack_require__(2);
	
	var _2 = _interopRequireDefault(_);
	
	var _methods = __webpack_require__(9);
	
	var _methods2 = _interopRequireDefault(_methods);
	
	var _libs = __webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var NativeObject = Object;
	
	var cls = function () {
		function Object() {
			var object = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
			_classCallCheck(this, Object);
	
			(0, _libs.defineProperties)(this, { $: object });
		}
	
		_createClass(Object, [{
			key: 'array',
			value: function array(mapFn) {
				(0, _libs.validate)([mapFn], ['function']);
	
				var object = this.$;
				var array = _methods2.default.isArrayAlike(object);
				var a = [];
	
				for (var key in object) {
					if (object.hasOwnProperty(key)) {
						var value = object[key];
	
						mapFn(a, value, array ? Number(key) : key, object);
					}
				}
	
				return new _2.default.Array(a);
			}
		}, {
			key: 'assign',
			value: function assign() {
				var object = this.$,
				    length = arguments.length;
	
				for (var i = 0; i < length; i++) {
					var o = transform(arguments[i]);
	
					for (var key in o) {
						if (o.hasOwnProperty(key)) {
							object[key] = o[key];
						}
					}
				}
	
				return this;
			}
		}, {
			key: 'average',
			value: function average() {
				var mapFn = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	
				return this.sum(mapFn) / this.count;
			}
		}, {
			key: 'call',
			value: function call(f) {
				(0, _libs.validate)([f], ['function']);
	
				var g = f;
				Array.prototype.shift.call(arguments);
	
				return g.apply(this, arguments);
			}
			// TODO: .copy()
	
		}, {
			key: 'deepEquals',
	
			// TODO: .deepAssign()
			// TODO: .deepCopy()
			value: function deepEquals() {
				var o = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	
				return deepEqual(this.$, o);
			}
		}, {
			key: 'deepEvery',
			value: function deepEvery(mapFn, n) {
				if (arguments.length === 1 && !_methods2.default.isFunction(mapFn)) {
					n = mapFn;
					mapFn = Boolean;
				} else if (arguments.length === 1) {
					n = 1;
				} else if (!arguments.length) {
					n = 1;
					mapFn = Boolean;
				}
	
				(0, _libs.validate)([mapFn, n], ['function', ['intAlike', '>0']]);
	
				n = Number(n);
	
				return _deepEvery(this.$, mapFn, n, [{ key: null, value: this.$ }]);
			}
		}, {
			key: 'deepFilter',
			value: function deepFilter(mapFn, n) {
				if (arguments.length === 1 && !_methods2.default.isFunction(mapFn)) {
					n = mapFn;
					mapFn = Boolean;
				} else if (arguments.length === 1) {
					n = 1;
				} else if (!arguments.length) {
					n = 1;
					mapFn = Boolean;
				}
	
				(0, _libs.validate)([mapFn, n], ['function', ['intAlike', '>0']]);
	
				var filtered = _deepFilter(this.$, mapFn, n, [{ key: null, value: this.$ }]);
	
				return _methods2.default.isArrayAlike(filtered) ? new _2.default.Array(filtered) : new Object(filtered);
			}
		}, {
			key: 'deepFind',
			value: function deepFind(mapFn, n) {
				if (arguments.length === 1 && !_methods2.default.isFunction(mapFn)) {
					n = mapFn;
					mapFn = Boolean;
				} else if (arguments.length === 1) {
					n = 1;
				} else if (!arguments.length) {
					n = 1;
					mapFn = Boolean;
				}
	
				(0, _libs.validate)([mapFn, n], ['function', ['intAlike', '>0']]);
	
				return _deepFind(this.$, mapFn, n, [{ key: null, value: this.$ }]);
			}
		}, {
			key: 'deepFreeze',
			value: function deepFreeze() {
				_deepFreeze(this.$);
	
				return this;
			}
		}, {
			key: 'deepMap',
			value: function deepMap(mapFn) {
				var n = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];
	
				(0, _libs.validate)([mapFn, n], ['function', ['intAlike', '>0']]);
	
				n = Number(n);
	
				var map = _deepMap(this.$, mapFn, n, [{ key: null, value: this.$ }]);
	
				return _methods2.default.isArrayAlike(map) ? new _2.default.Array(map) : new Object(map);
			}
		}, {
			key: 'deepReduce',
			value: function deepReduce(mapFn) {
				var n = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];
				var IV = arguments[2];
	
				(0, _libs.validate)([mapFn, n], ['function', ['intAlike', '>0']]);
	
				n = Number(n);
	
				return _deepReduce(this.$, mapFn, n, false, IV, [{ key: null, value: this.$ }]);
			}
		}, {
			key: 'deepSome',
			value: function deepSome(mapFn, n) {
				if (arguments.length === 1 && !_methods2.default.isFunction(mapFn)) {
					n = mapFn;
					mapFn = Boolean;
				} else if (arguments.length === 1) {
					n = 1;
				} else if (!arguments.length) {
					n = 1;
					mapFn = Boolean;
				}
	
				(0, _libs.validate)([mapFn, n], ['function', ['intAlike', '>0']]);
	
				n = Number(n);
	
				return _deepSome(this.$, mapFn, n, [{ key: null, value: this.$ }]);
			}
		}, {
			key: 'deepStrictEquals',
			value: function deepStrictEquals() {
				var o = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	
				return deepStrictEqual(this.$, o);
			}
		}, {
			key: 'define',
			value: function define(property, descriptor) {
				if (arguments.length >= 2) {
					property = _defineProperty({}, property, descriptor);
				}
	
				property = transform(property);
	
				if (_methods2.default.isObject(this.$)) {
					NativeObject.defineProperties(this.$, property);
				}
	
				return this;
			}
		}, {
			key: 'delete',
			value: function _delete() {
				var object = this.$;
	
				if (object) {
					for (var i = 0, length = arguments.length; i < length; i++) {
						delete object[arguments[i]];
					}
				}
	
				return this;
			}
		}, {
			key: 'equals',
			value: function equals(o) {
				o = transform(o);
	
				return this.$ == o;
			}
		}, {
			key: 'every',
			value: function every() {
				var mapFn = arguments.length <= 0 || arguments[0] === undefined ? Boolean : arguments[0];
	
				(0, _libs.validate)([mapFn], ['function']);
	
				var object = this.$;
				var array = _methods2.default.isArrayAlike(object);
	
				var iterated = 0;
	
				for (var key in object) {
					if (object.hasOwnProperty(key)) {
						if (array && iterated === object.length) {
							break;
						}
	
						iterated++;
	
						if (!mapFn(object[key], array ? Number(key) : key, object)) {
							return false;
						}
					}
				}
	
				return true;
			}
		}, {
			key: 'filter',
			value: function filter() {
				var mapFn = arguments.length <= 0 || arguments[0] === undefined ? Boolean : arguments[0];
	
				(0, _libs.validate)([mapFn], ['function']);
	
				var object = this.$;
				var array = _methods2.default.isArrayAlike(object);
				var nul = _methods2.default.isNull(this.$);
				var o = array ? [] : nul ? null : {};
	
				var iterated = 0;
	
				for (var key in object) {
					if (object.hasOwnProperty(key)) {
						if (array && iterated === object.length) {
							break;
						}
	
						iterated++;
	
						var value = object[key];
	
						if (mapFn(value, array ? Number(key) : key, object)) {
							o[key] = value;
						}
					}
				}
	
				return array ? new _2.default.Array(o) : new Object(o);
			}
		}, {
			key: 'find',
			value: function find(mapFn) {
				(0, _libs.validate)([mapFn], ['function']);
	
				var object = this.$;
				var array = _methods2.default.isArrayAlike(object);
	
				var iterated = 0;
	
				for (var key in object) {
					if (object.hasOwnProperty(key)) {
						if (array && iterated === object.length) {
							break;
						}
	
						iterated++;
	
						var value = object[key];
	
						if (mapFn(value, array ? Number(key) : key, object)) {
							return { key: key, value: value };
						}
					}
				}
	
				return null;
			}
		}, {
			key: 'forEach',
			value: function forEach() {
				var mapFn = arguments.length <= 0 || arguments[0] === undefined ? Boolean : arguments[0];
	
				(0, _libs.validate)([mapFn], ['function']);
	
				var object = this.$;
				var array = _methods2.default.isArrayAlike(object);
	
				var iterated = 0;
	
				for (var key in object) {
					if (object.hasOwnProperty(key)) {
						if (array && iterated === object.length) {
							break;
						}
	
						iterated++;
	
						mapFn(object[key], array ? Number(key) : key, object);
					}
				}
	
				return this;
			}
		}, {
			key: 'freeze',
			value: function freeze() {
				NativeObject.freeze(this.$);
	
				return this;
			}
		}, {
			key: 'get',
			value: function get(property, getter) {
				if (arguments.length >= 2) {
					property = _defineProperty({}, property, getter);
				}
	
				var object = this.$;
	
				property = transform(property);
	
				if (_methods2.default.isObject(object)) {
					for (var key in property) {
						if (property.hasOwnProperty(key)) {
							NativeObject.defineProperty(object, key, { get: property[key] });
						}
					}
				}
	
				return this;
			}
		}, {
			key: 'has',
			value: function has(key) {
				var object = this.$;
	
				if (!_methods2.default.isObject(object)) {
					return false;
				}
	
				return key in object;
			}
		}, {
			key: 'hasOwn',
			value: function hasOwn(key) {
				var object = this.$;
	
				if (!_methods2.default.isObject(object)) {
					return false;
				}
	
				return object.hasOwnProperty(key);
			}
			// TODO: .instanceof()
	
		}, {
			key: 'isFrozen',
			value: function isFrozen() {
				return NativeObject.isFrozen(this.$);
			}
		}, {
			key: 'json',
			value: function json(f, indent) {
				if (arguments.length === 1 && !_methods2.default.isFunction(f)) {
					indent = f;
					f = null;
				} else if (!arguments.length) {
					f = null;
				}
	
				(0, _libs.validate)([f], ['function||!']);
	
				return JSON.stringify(this.$, function (key, value) {
					value = transform(value);
	
					return f ? f.apply(null, arguments) : value;
				}, indent);
			}
		}, {
			key: 'keyOf',
			value: function keyOf(value) {
				var object = this.$;
	
				for (var key in object) {
					if (object.hasOwnProperty(key)) {
						var val = object[key];
	
						if (val == value || _methods2.default.isNaN(val) && _methods2.default.isNaN(value)) {
							return key;
						}
					}
				}
	
				return null;
			}
		}, {
			key: 'keyOfStrict',
			value: function keyOfStrict(value) {
				var object = this.$;
	
				for (var key in object) {
					if (object.hasOwnProperty(key)) {
						if (object[key] === value) {
							return key;
						}
					}
				}
	
				return null;
			}
		}, {
			key: 'keys',
			value: function keys() {
				var object = this.$;
	
				if (!_methods2.default.isObject(object)) {
					return new _2.default.Array();
				}
	
				return new _2.default.Array(NativeObject.keys(object));
			}
		}, {
			key: 'log',
			value: function log() {
				var method = arguments.length <= 0 || arguments[0] === undefined ? 'log' : arguments[0];
	
				console[method](this);
	
				return this;
			}
		}, {
			key: 'map',
			value: function map(mapFn) {
				(0, _libs.validate)([mapFn], ['function']);
	
				var object = this.$;
				var array = _methods2.default.isArrayAlike(object);
				var nul = _methods2.default.isNull(object);
				var o = array ? [] : nul ? null : {};
	
				var iterated = 0;
	
				for (var key in object) {
					if (object.hasOwnProperty(key)) {
						if (array && iterated === object.length) {
							break;
						}
	
						iterated++;
	
						o[key] = mapFn(object[key], key, object);
					}
				}
	
				return array ? new _2.default.Array(o) : new Object(o);
			}
		}, {
			key: 'max',
			value: function max() {
				var mapFn = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	
				(0, _libs.validate)([mapFn], ['function||!']);
	
				var object = this.$;
				var array = _methods2.default.isArrayAlike(object);
	
				var max = { key: null, value: -Infinity };
				var iterated = 0;
	
				for (var key in object) {
					if (object.hasOwnProperty(key)) {
						if (array && iterated === object.length) {
							break;
						}
	
						iterated++;
	
						var value = object[key],
						    val = mapFn ? mapFn(value, array ? Number(key) : key, object) : value;
	
						if (val > max.value) {
							max = { key: key, value: value };
						}
					}
				}
	
				return max;
			}
		}, {
			key: 'min',
			value: function min() {
				var mapFn = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	
				(0, _libs.validate)([mapFn], ['function||!']);
	
				var object = this.$;
				var array = _methods2.default.isArrayAlike(object);
	
				var min = { key: null, value: Infinity };
				var iterated = 0;
	
				for (var key in object) {
					if (object.hasOwnProperty(key)) {
						if (array && iterated === object.length) {
							break;
						}
	
						iterated++;
	
						var value = object[key],
						    val = mapFn ? mapFn(value, array ? Number(key) : key, object) : value;
	
						if (val < min.value) {
							min = { key: key, value: value };
						}
					}
				}
	
				return min;
			}
		}, {
			key: 'object',
			value: function object(mapFn) {
				(0, _libs.validate)([mapFn], ['function']);
	
				var object = this.$;
				var array = _methods2.default.isArrayAlike(object);
				var o = {};
	
				var iterated = 0;
	
				for (var key in object) {
					if (object.hasOwnProperty(key)) {
						if (array && iterated === object.length) {
							break;
						}
	
						iterated++;
	
						mapFn(o, object[key], array ? Number(key) : key, object);
					}
				}
	
				return new Object(o);
			}
		}, {
			key: 'propertyDescriptor',
			value: function propertyDescriptor(key) {
				var object = this.$;
	
				if (!_methods2.default.isObject(object)) {
					return;
				}
	
				return NativeObject.getOwnPropertyDescriptor(object, key);
			}
		}, {
			key: 'propertyNames',
			value: function propertyNames() {
				var object = this.$;
	
				if (!_methods2.default.isObject(object)) {
					return new _2.default.Array();
				}
	
				return new _2.default.Array(NativeObject.getOwnPropertyNames(object));
			}
		}, {
			key: 'propertySymbols',
			value: function propertySymbols() {
				var object = this.$;
	
				if (!_methods2.default.isObject(object)) {
					return new _2.default.Array();
				}
	
				return new _2.default.Array(NativeObject.getOwnPropertySymbols(object));
			}
		}, {
			key: 'proto',
			value: function proto(_proto) {
				var object = this.$;
	
				if (arguments.length) {
					if (_methods2.default.isObject(object)) {
						NativeObject.setPrototypeOf(object, _proto);
					}
					return this;
				}
	
				if (!_methods2.default.isObject(object)) {
					return;
				}
	
				return NativeObject.getPrototypeOf(object);
			}
		}, {
			key: 'reduce',
			value: function reduce(mapFn, IV) {
				(0, _libs.validate)([mapFn], ['function']);
	
				var object = this.$;
				var array = _methods2.default.isArrayAlike(object);
	
				var startKey = void 0;
				var iterated = 0;
	
				if (IV == null) {
					for (var key in object) {
						if (object.hasOwnProperty(key)) {
							startKey = key;
							iterated = 1;
							IV = object[key];
							break;
						}
					}
				}
	
				for (var _key in object) {
					if (object.hasOwnProperty(_key) && _key != startKey) {
						if (array && iterated === object.length) {
							break;
						}
	
						iterated++;
	
						IV = mapFn(IV, object[_key], array ? Number(_key) : _key, object);
					}
				}
	
				return IV;
			}
		}, {
			key: 'set',
			value: function set(property, setter) {
				if (arguments.length >= 2) {
					property = _defineProperty({}, property, setter);
				}
	
				property = transform(property);
	
				var object = this.$;
	
				if (_methods2.default.isObject(object)) {
					for (var key in property) {
						if (property.hasOwnProperty(key)) {
							NativeObject.defineProperty(object, key, { set: property[key] });
						}
					}
				}
	
				return this;
			}
		}, {
			key: 'some',
			value: function some() {
				var mapFn = arguments.length <= 0 || arguments[0] === undefined ? Boolean : arguments[0];
	
				(0, _libs.validate)([mapFn], ['function']);
	
				var object = this.$;
				var array = _methods2.default.isArrayAlike(object);
	
				var iterated = 0;
	
				for (var key in object) {
					if (object.hasOwnProperty(key)) {
						if (array && iterated === object.length) {
							break;
						}
	
						iterated++;
	
						if (mapFn(object[key], array ? Number(key) : key, object)) {
							return true;
						}
					}
				}
	
				return false;
			}
		}, {
			key: 'strictEquals',
			value: function strictEquals(o) {
				o = transform(o);
	
				return this.$ === o;
			}
		}, {
			key: 'sum',
			value: function sum() {
				var mapFn = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	
				(0, _libs.validate)([mapFn], ['function||!']);
	
				var object = this.$;
				var array = _methods2.default.isArrayAlike(object);
	
				var sum = 0;
				var iterated = 0;
	
				for (var key in object) {
					if (object.hasOwnProperty(key)) {
						if (array && iterated === object.length) {
							break;
						}
	
						iterated++;
	
						var value = object[key];
	
						sum += Number(mapFn ? mapFn(value, array ? Number(key) : key, object) : value);
					}
				}
	
				return sum;
			}
			// TODO: .typeof()
	
		}, {
			key: 'values',
			value: function values() {
				var object = this.$;
				var array = [];
	
				for (var key in object) {
					if (object.hasOwnProperty(key)) {
						array.push(object[key]);
					}
				}
	
				return new _2.default.Array(array);
			}
		}, {
			key: 'word',
			value: function word() {
				var mapFn = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	
				(0, _libs.validate)([mapFn], ['function||!']);
	
				var object = this.$;
				var array = _methods2.default.isArrayAlike(object);
	
				var word = '';
				var iterated = 0;
	
				for (var key in object) {
					if (object.hasOwnProperty(key)) {
						if (array && iterated === object.length) {
							break;
						}
	
						iterated++;
	
						var value = object[key];
	
						word += String(mapFn ? mapFn(value, array ? Number(key) : key, object) : value);
					}
				}
	
				return word;
			}
		}, {
			key: 'count',
			get: function get() {
				var object = this.$;
	
				if (!_methods2.default.isObject(object)) {
					return 0;
				}
	
				return NativeObject.keys(object).length;
			}
		}]);
	
		return Object;
	}();
	
	function deepEqual(o1, o2) {
		o1 = transform(o1);
		o2 = transform(o2);
	
		if (_methods2.default.isNull(o1) && _methods2.default.isNull(o2)) {
			return true;
		}
	
		if (_methods2.default.isNull(o1) || _methods2.default.isNull(o2)) {
			return false;
		}
	
		if (o1 != o2 && (!_methods2.default.isNaN(o1) || !_methods2.default.isNaN(o2)) && NativeObject.keys(o1).length !== NativeObject.keys(o2).length) {
			return false;
		}
	
		for (var key in o1) {
			if (o1.hasOwnProperty(key)) {
				if (!(key in o2) || !deepEqual(o1[key], o2[key])) {
					return false;
				}
			}
		}
	
		return true;
	}
	function _deepEvery() {
		var object = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
		var mapFn = arguments[1];
		var n = arguments[2];
		var tree = arguments[3];
	
		object = transform(object);
	
		var array = _methods2.default.isArrayAlike(object);
		var end = n === 1;
	
		var iterated = 0;
	
		for (var key in object) {
			if (object.hasOwnProperty(key)) {
				if (array && iterated === object.length) {
					break;
				}
	
				iterated++;
	
				var value = object[key];
				var newTree = [{ key: key, value: value }].concat(tree);
	
				if (end ? !mapFn(value, array ? Number(key) : key, object, newTree) : !_deepEvery(value, mapFn, n - 1, newTree)) {
					return false;
				}
			}
		}
	
		return true;
	}
	function _deepFilter() {
		var object = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
		var mapFn = arguments[1];
		var n = arguments[2];
		var tree = arguments[3];
	
		object = transform(object);
	
		var array = _methods2.default.isArrayAlike(object);
		var nul = _methods2.default.isNull(object);
		var o = array ? [] : nul ? null : {};
		var end = n === 1;
	
		var iterated = 0;
	
		for (var key in object) {
			if (object.hasOwnProperty(key)) {
				if (array && iterated === object.length) {
					break;
				}
	
				iterated++;
	
				var value = object[key];
				var newTree = [{ key: key, value: value }].concat(tree);
	
				if (end && mapFn(value, key, object, newTree)) {
					if (array) {
						o.push(value);
						continue;
					}
	
					o[key] = value;
					continue;
				}
	
				if (!end) {
					var filtered = _deepFilter(value, mapFn, n - 1, newTree);
	
					if (array) {
						o.push(filtered);
						continue;
					}
	
					o[key] = filtered;
				}
			}
		}
	
		return o;
	}
	function _deepFind() {
		var object = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
		var mapFn = arguments[1];
		var n = arguments[2];
		var tree = arguments[3];
	
		object = transform(object);
	
		var array = _methods2.default.isArrayAlike(object);
		var end = n === 1;
	
		var iterated = 0;
	
		for (var key in object) {
			if (object.hasOwnProperty(key)) {
				if (array && iterated === object.length) {
					break;
				}
	
				iterated++;
	
				var value = object[key];
				var newTree = [{ key: key, value: value }].concat(tree);
	
				if (end) {
					if (mapFn(value, array ? Number(key) : key, object, newTree)) {
						return newTree;
					}
	
					continue;
				}
	
				var result = _deepFind(value, mapFn, n - 1, newTree);
	
				if (result) {
					return result;
				}
			}
		}
	
		return null;
	}
	function _deepFreeze() {
		var object = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
		NativeObject.freeze(object);
		for (var key in object) {
			if (object.hasOwnProperty(key)) {
				_deepFreeze(object[key]);
			}
		}
	}
	function _deepMap() {
		var object = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
		var mapFn = arguments[1];
		var n = arguments[2];
		var tree = arguments[3];
	
		object = transform(object);
	
		var array = _methods2.default.isArrayAlike(object);
		var nul = _methods2.default.isNull(object);
		var o = array ? [] : nul ? null : {};
		var end = n === 1;
	
		var iterated = 0;
	
		for (var key in object) {
			if (object.hasOwnProperty(key)) {
				if (array && iterated === object.length) {
					break;
				}
	
				iterated++;
	
				var value = object[key];
				var newTree = [{ key: key, value: value }].concat(tree);
	
				o[key] = end ? mapFn(value, array ? Number(key) : key, object, newTree) : _deepMap(value, mapFn, n - 1, newTree);
			}
		}
	
		return o;
	}
	function _deepReduce() {
		var object = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
		var mapFn = arguments[1];
		var n = arguments[2];
		var start = arguments[3];
		var IV = arguments[4];
		var tree = arguments[5];
	
		object = transform(object);
	
		var array = _methods2.default.isArrayAlike(object);
		var end = n === 1;
	
		var startKey = void 0;
		var iterated = 0;
	
		if (IV == null && end && !start) {
			for (var key in object) {
				if (object.hasOwnProperty(key)) {
					start = true;
					startKey = key;
					iterated = 1;
					IV = object[key];
					break;
				}
			}
		}
	
		for (var _key2 in object) {
			if (object.hasOwnProperty(_key2) && _key2 !== startKey) {
				if (array && iterated === object.length) {
					break;
				}
	
				iterated++;
	
				var value = object[_key2];
				var newTree = [{ key: _key2, value: value }].concat(tree);
	
				IV = end ? mapFn(IV, value, array ? Number(_key2) : _key2, object, newTree) : _deepReduce(value, mapFn, n - 1, start, IV, newTree);
			}
		}
	
		return IV;
	}
	function _deepSome() {
		var object = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
		var mapFn = arguments[1];
		var n = arguments[2];
		var tree = arguments[3];
	
		object = transform(object);
	
		var array = _methods2.default.isArrayAlike(object);
		var end = n === 1;
	
		var iterated = 0;
	
		for (var key in object) {
			if (object.hasOwnProperty(key)) {
				if (array && iterated === object.length) {
					break;
				}
	
				iterated++;
	
				var value = object[key];
				var newTree = [{ key: key, value: value }].concat(tree);
	
				if (end ? mapFn(value, array ? Number(key) : key, object, newTree) : _deepSome(value, mapFn, n - 1, newTree)) {
					return true;
				}
			}
		}
	
		return false;
	}
	function deepStrictEqual(o1, o2) {
		o1 = transform(o1);
		o2 = transform(o2);
	
		if (_methods2.default.isNull(o1) && _methods2.default.isNull(o2)) {
			return true;
		}
	
		if (_methods2.default.isNull(o1) || _methods2.default.isNull(o2)) {
			return false;
		}
	
		if (o1 !== o2 && (!_methods2.default.isNaN(o1) || !_methods2.default.isNaN(o2)) && NativeObject.keys(o1).length !== NativeObject.keys(o2).length) {
			return false;
		}
	
		for (var key in o1) {
			if (o1.hasOwnProperty(key)) {
				if (!(key in o2) || !deepStrictEqual(o1[key], o2[key])) {
					return false;
				}
			}
		}
	
		return true;
	}
	
	_2.default.Object = cls;
	_2.default.constructors.unshift({
		check: _2.default.isObject,
		cls: cls
	});
	
	function transform(object) {
		while (object instanceof cls) {
			object = object.$;
		}
	
		return object;
	}
	
	exports.default = cls;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _ = __webpack_require__(13);
	
	var _2 = _interopRequireDefault(_);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _2.default;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _ = __webpack_require__(2);
	
	var _2 = _interopRequireDefault(_);
	
	var _methods = __webpack_require__(9);
	
	var _methods2 = _interopRequireDefault(_methods);
	
	var _index = __webpack_require__(11);
	
	var _index2 = _interopRequireDefault(_index);
	
	var _String = __webpack_require__(14);
	
	var _String2 = _interopRequireDefault(_String);
	
	var _libs = __webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var cls = function (_parent) {
		_inherits(Alphabet, _parent);
	
		function Alphabet() {
			var alphabet = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	
			_classCallCheck(this, Alphabet);
	
			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Alphabet).call(this, {}));
	
			var a = _this.$;
	
			alphabet = (0, _index.transform)(alphabet);
	
			for (var i = 0, length = alphabet.length; i < length; i++) {
				var char = alphabet[i];
	
				if (!check(char)) {
					throw new Error('Each element of an array must be a single char!');
				}
	
				a[char] = char;
			}
			return _this;
		}
	
		_createClass(Alphabet, [{
			key: 'add',
			value: function add() {
				for (var i = 0, length = arguments.length; i < length; i++) {
					var char = arguments[i];
	
					if (!check(char)) {
						throw new Error('Each argument must be a single char!');
					}
	
					this.$[char] = char;
				}
	
				return this;
			}
		}, {
			key: 'alphabet',
			value: function alphabet() {
				return new _String2.default(Object.keys(this.$));
			}
		}, {
			key: 'contains',
			value: function contains(word) {
				word = (0, _index.transform)(word);
	
				(0, _libs.validate)([word], ['string']);
	
				for (var i = 0, length = word.length; i < length; i++) {
					if (!this.$[word[i]]) {
						return false;
					}
				}
	
				return true;
			}
		}, {
			key: 'delete',
			value: function _delete() {
				for (var i = 0, length = arguments.length; i < length; i++) {
					var char = arguments[i];
	
					if (!check(char)) {
						throw new Error('Each argument must be a single char!');
					}
	
					delete this.$[char];
				}
	
				return this;
			}
		}, {
			key: 'token',
			value: function token(length) {
				(0, _libs.validate)([length], [['intAlike', '>0']]);
	
				var alphabet = Object.keys(this.$),
				    len = alphabet.length;
				var token = '';
	
				for (var i = 0; i < length; i++) {
					token += alphabet[Math.floor(Math.random() * len)];
				}
	
				return token;
			}
		}]);
	
		return Alphabet;
	}(_index2.default);
	
	_2.default.Alphabet = cls;
	
	function check(char) {
		return _methods2.default.isString(char) && char.length === 1;
	}
	
	exports.default = cls;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _ = __webpack_require__(2);
	
	var _2 = _interopRequireDefault(_);
	
	var _methods = __webpack_require__(9);
	
	var _methods2 = _interopRequireDefault(_methods);
	
	var _Object = __webpack_require__(11);
	
	var _Object2 = _interopRequireDefault(_Object);
	
	var _Alphabet = __webpack_require__(13);
	
	var _Alphabet2 = _interopRequireDefault(_Alphabet);
	
	var _Array = __webpack_require__(15);
	
	var _Array2 = _interopRequireDefault(_Array);
	
	var _libs = __webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var NativeString = String;
	var Obj = _Object2.default;
	
	var cls = function (_parent) {
		_inherits(String, _parent);
	
		function String() {
			var string = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	
			_classCallCheck(this, String);
	
			return _possibleConstructorReturn(this, Object.getPrototypeOf(String).call(this, function () {
				if (_methods2.default.isString(string)) {
					return string;
				}
	
				return NativeString(string);
			}()));
		}
	
		_createClass(String, [{
			key: 'alphabet',
			value: function alphabet() {
				var ranges = this.$.match(/[\s\S]-[\s\S]/g) || [],
				    length = ranges.length,
				    alphabet = [];
	
				for (var i = 0; i < length; i++) {
					var range = ranges[i],
					    start = range.charCodeAt(0),
					    end = range.charCodeAt(2);
	
					if (start > end) {
						throw new Error('Start of the range must be before its end!');
					}
	
					for (var k = 0, len = end - start + 1; k < len; k++) {
						alphabet.push(NativeString.fromCharCode(start + k));
					}
				}
	
				return new _Alphabet2.default(alphabet);
			}
		}, {
			key: 'capitalizeFirst',
			value: function capitalizeFirst() {
				var string = NativeString(this.$);
				var S = String;
	
				return new S(string[0] + string.substring(1));
			}
			// TODO: .endsWith()
	
		}, {
			key: 'find',
			value: function find() {
				if (!arguments.length) {
					var S = String,
					    found = document.querySelector(this.$),
					    name = found ? found.tagName.toLowerCase() : 'null',
					    _constructor = _2.default['Html' + new S(name).toCapitalCase() + 'Element'];
	
					if (_constructor) {
						return new _constructor(found);
					}
	
					return new _Alphabet2.default(found);
				}
	
				return Object.getPrototypeOf(String.prototype).find.apply(this, arguments);
			}
			// TODO: .in()
	
		}, {
			key: 'indexOf',
			value: function indexOf() {
				return this.$.indexOf.apply(this.$, arguments);
			}
		}, {
			key: 'match',
			value: function match() {
				var match = this.$.match.apply(this.$, arguments);
	
				if (_methods2.default.isArray(match)) {
					return new _Array2.default(match);
				}
	
				return new Obj(match);
			}
			// TODO: .parse(string('json' | 'html' | 'xml'?))
	
		}, {
			key: 'repeat',
			value: function repeat(n) {
				(0, _libs.validate)([n], [['intAlike', '>=0']]);
	
				n = Number(n);
	
				var S = String;
				var string = this.$,
				    s = '';
	
				for (var i = 0; i < n; i++) {
					s += string;
				}
	
				return new S(s);
			}
		}, {
			key: 'replace',
			value: function replace(regexp) {
				var replacer = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
	
				var S = String;
	
				return new S(this.$.replace(regexp, replacer));
			}
		}, {
			key: 'replaceString',
			value: function replaceString(string) {
				var replacer = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
	
				string = (0, _Object.transform)(string);
	
				(0, _libs.validate)([string], ['string']);
	
				var S = String;
	
				return new S(this.$.split(string).join(replacer));
			}
		}, {
			key: 'split',
			value: function split(delimiter) {
				return new _Array2.default(this.$.split(delimiter));
			}
			// TODO: .startsWith()
			// TODO: .substring()
			// TODO: .substr()
	
		}, {
			key: 'toCamelCase',
			value: function toCamelCase() {
				var S = String;
	
				return new S(trim(this.$).replace(/[\s\-_\.]+/g, '-').replace(/\-[^\-]/g, function (match) {
					return match[1].toUpperCase();
				}));
			}
		}, {
			key: 'toCapitalCase',
			value: function toCapitalCase() {
				var S = String;
	
				return new S(trim(this.$).replace(/[\s\-_\.]+/g, ' ').replace(/[\S]+/g, function (match) {
					return match[0].toUpperCase() + match.substring(1);
				}));
			}
		}, {
			key: 'toDotCase',
			value: function toDotCase() {
				var S = String;
	
				return new S(trim(this.$).replace(/[\s\-_\.]+/g, '.').toLowerCase());
			}
		}, {
			key: 'toLowerCase',
			value: function toLowerCase() {
				var S = String;
	
				return new S(this.$.toLowerCase());
			}
		}, {
			key: 'toSnakeCase',
			value: function toSnakeCase() {
				var S = String;
	
				return new S(trim(this.$).replace(/[\s\-_\.]+/g, '_').toLowerCase());
			}
		}, {
			key: 'toSpaceCase',
			value: function toSpaceCase() {
				var S = String;
	
				return new S(trim(this.$).replace(/[\s\-_\.]+/g, ' ').toLowerCase());
			}
		}, {
			key: 'toSpinalCase',
			value: function toSpinalCase() {
				var S = String;
	
				return new S(trim(this.$).replace(/[\s\-_\.]+/g, '-').toLowerCase());
			}
		}, {
			key: 'toString',
			value: function toString() {
				return this.$;
			}
		}, {
			key: 'toUpperCase',
			value: function toUpperCase() {
				var S = String;
	
				return new S(this.$.toUpperCase());
			}
		}, {
			key: 'trim',
			value: function trim(side) {
				var S = String;
	
				if (side === 'left') {
					return new S(this.$.replace(/^\s+/, ''));
				}
	
				if (side === 'right') {
					return new S(this.$.replace(/\s+$/, ''));
				}
	
				return new S(this.$.replace(/^\s+|\s+$/g, ''));
			}
		}]);
	
		return String;
	}(_Object2.default);
	
	function trim(string) {
		return string.replace(/^[\s\-_\.]+|[\s\-_\.]+$/g, '');
	}
	
	_2.default.String = cls;
	_2.default.constructors.unshift({
		check: _methods2.default.isString,
		cls: cls
	});
	
	exports.default = cls;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _ = __webpack_require__(2);
	
	var _2 = _interopRequireDefault(_);
	
	var _methods = __webpack_require__(9);
	
	var _methods2 = _interopRequireDefault(_methods);
	
	var _Object = __webpack_require__(11);
	
	var _Object2 = _interopRequireDefault(_Object);
	
	var _libs = __webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var NativeArray = Array;
	
	var sortMethods = {
		asc: function asc(x, y) {
			x = Number(x);
			y = Number(y);
	
			if (x > y) {
				return 1;
			}
	
			if (x < y) {
				return -1;
			}
	
			if (_methods2.default.isNaN(y) && !_methods2.default.isNaN(x)) {
				return 1;
			}
	
			if (_methods2.default.isNaN(x) && !_methods2.default.isNaN(y)) {
				return -1;
			}
	
			return 0;
		}
	};
	
	(0, _libs.assign)(sortMethods, {
		desc: function desc(x, y) {
			return sortMethods.asc(y, x);
		}
	});
	
	var cls = function (_parent) {
		_inherits(Array, _parent);
	
		function Array() {
			var array = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	
			_classCallCheck(this, Array);
	
			return _possibleConstructorReturn(this, Object.getPrototypeOf(Array).call(this, array));
		}
	
		_createClass(Array, [{
			key: 'concat',
			value: function concat() {
				var array = from(this.$),
				    length = arguments.length;
	
				for (var i = 0; i < length; i++) {
					var value = arguments[i],
					    transformed = (0, _Object.transform)(value);
	
					if (_methods2.default.isArrayAlike(transformed) && !_methods2.default.isString(transformed)) {
						for (var k = 0, len = transformed.length; k < len; k++) {
							array.push(transformed[k]);
						}
	
						continue;
					}
	
					array.push(value);
				}
	
				return new Array(array);
			}
		}, {
			key: 'join',
			value: function join() {
				return NativeArray.prototype.join.apply(this.$, arguments);
			}
		}, {
			key: 'pop',
			value: function pop() {
				NativeArray.prototype.pop.call(this.$);
	
				return this;
			}
		}, {
			key: 'push',
			value: function push() {
				NativeArray.prototype.push.apply(this.$, arguments);
	
				return this;
			}
		}, {
			key: 'reverse',
			value: function reverse() {
				var array = this.$,
				    length = array.length,
				    a = [];
	
				for (var i = length - 1; i >= 0; i--) {
					a.push(array[i]);
				}
	
				return new Array(a);
			}
		}, {
			key: 'shift',
			value: function shift() {
				NativeArray.prototype.shift.call(this.$);
	
				return this;
			}
		}, {
			key: 'shuffle',
			value: function shuffle() {
				var array = from(this.$),
				    length = array.length,
				    a = [];
	
				for (var i = 0; i < length; i++) {
					var k = i + Math.floor((length - i) * Math.random()),
					    change = array[i];
	
					a.push(array[k]);
					array[i] = array[k];
					array[k] = change;
				}
	
				return new Array(a);
			}
		}, {
			key: 'slice',
			value: function slice() {
				return new Array(NativeArray.prototype.slice.apply(this.$, arguments));
			}
		}, {
			key: 'sort',
			value: function sort(f) {
				try {
					(0, _libs.validate)([f], ['function']);
				} catch (e) {
					if (!(f in sortMethods)) {
						throw new TypeError('1st argument must either or function, or method from [' + Object.keys(sortMethods).join(', ') + ']!');
					}
	
					f = sortMethods[f];
				}
	
				return new Array(from(this.$).sort(f));
			}
		}, {
			key: 'splice',
			value: function splice() {
				NativeArray.prototype.splice.apply(this.$, arguments);
	
				return this;
			}
		}, {
			key: 'string',
			value: function string() {
				return NativeArray.prototype.join.call(this.$, '');
			}
		}, {
			key: 'unshift',
			value: function unshift() {
				NativeArray.prototype.unshift.apply(this.$, arguments);
	
				return this;
			}
		}, {
			key: 'last',
			get: function get() {
				var array = this.$;
	
				return array[array.length - 1];
			}
		}, {
			key: 'length',
			get: function get() {
				return this.$.length;
			}
		}], [{
			key: 'from',
			value: function from(array) {
				return new this((0, _libs.toArray)(array));
			}
		}]);
	
		return Array;
	}(_Object2.default);
	
	_2.default.Array = cls;
	_2.default.constructors.unshift({
		check: function check(value) {
			return _methods2.default.isArrayAlike(value) && !_methods2.default.isString(value);
		},
		cls: cls
	});
	
	exports.default = cls;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _ = __webpack_require__(15);
	
	var _2 = _interopRequireDefault(_);
	
	__webpack_require__(17);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _2.default;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _ = __webpack_require__(2);
	
	var _2 = _interopRequireDefault(_);
	
	var _Array = __webpack_require__(15);
	
	var _Array2 = _interopRequireDefault(_Array);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var cls = function (_parent) {
		_inherits(HtmlCollection, _parent);
	
		function HtmlCollection() {
			_classCallCheck(this, HtmlCollection);
	
			return _possibleConstructorReturn(this, Object.getPrototypeOf(HtmlCollection).apply(this, arguments));
		}
	
		return HtmlCollection;
	}(_Array2.default);
	
	_2.default.HtmlCollection = cls;
	_2.default.constructors.unshift({
		check: function check(collection) {
			return collection instanceof HTMLCollection || collection instanceof NodeList;
		},
		cls: cls
	});
	
	exports.default = cls;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _ = __webpack_require__(19);
	
	var _2 = _interopRequireDefault(_);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _2.default;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _ = __webpack_require__(2);
	
	var _2 = _interopRequireDefault(_);
	
	var _methods = __webpack_require__(9);
	
	var _methods2 = _interopRequireDefault(_methods);
	
	var _Object = __webpack_require__(11);
	
	var _Object2 = _interopRequireDefault(_Object);
	
	var _Number = __webpack_require__(20);
	
	var _Number2 = _interopRequireDefault(_Number);
	
	var _String = __webpack_require__(14);
	
	var _String2 = _interopRequireDefault(_String);
	
	var _libs = __webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var NativeDate = Date;
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
	var formats = {
		ccc: function ccc(date) {
			return round(date.get('c'), 3);
		},
		cc: function cc(date) {
			return cut(date.get('c'), 3, 2).replace(/^0\./, '');
		},
		c: function c(date) {
			return cut(date.get('c'), 3, 1).replace(/^0\./, '');
		},
		ss: function ss(date) {
			return round(date.get('s'), 2);
		},
		s: function s(date) {
			return String(date.get('s'));
		},
		mm: function mm(date) {
			return round(date.get('m'), 2);
		},
		m: function m(date) {
			return String(date.get('m'));
		},
		hh: function hh(date) {
			return round(date.get('h'), 2);
		},
		h: function h(date) {
			return String(date.get('h'));
		},
		DDD: function DDD(date) {
			return date.get('dwa');
		},
		dd: function dd(date) {
			return round(date.get('d'), 2);
		},
		d: function d(date) {
			return String(date.get('d'));
		},
		D: function D(date) {
			return date.get('dwn');
		},
		MMMM: function MMMM(date) {
			return date.get('Mn');
		},
		MMM: function MMM(date) {
			return date.get('Ma');
		},
		MM: function MM(date) {
			return round(date.get('M'), 2);
		},
		M: function M(date) {
			return String(date.get('M'));
		},
		yyyy: function yyyy(date) {
			return round(date.get('y'), 4);
		},
		yy: function yy(date) {
			return String(date.get('y')).substring(2);
		},
		y: function y(date) {
			return date.get('y');
		}
	};
	var daysOfTheWeekNames = {
		0: 'Sunday',
		1: 'Monday',
		2: 'Tuesday',
		3: 'Wednesday',
		4: 'Thursday',
		5: 'Friday',
		6: 'Saturday'
	};
	var daysOfTheWeekAliases = {
		0: 'Sun',
		1: 'Mon',
		2: 'Tue',
		3: 'Wed',
		4: 'Thu',
		5: 'Fri',
		6: 'Sat'
	};
	var monthsNames = {
		0: 'January',
		1: 'February',
		2: 'March',
		3: 'April',
		4: 'May',
		5: 'June',
		6: 'Jule',
		7: 'August',
		8: 'September',
		9: 'October',
		10: 'November',
		11: 'December'
	};
	var monthsAliases = {
		0: 'Jan',
		1: 'Feb',
		2: 'Mar',
		3: 'Apr',
		4: 'May',
		5: 'Jun',
		6: 'Jul',
		7: 'Aug',
		8: 'Sep',
		9: 'Oct',
		10: 'Nov',
		11: 'Dec'
	};
	var zero = new _2.default.String('0');
	
	var cls = function (_parent) {
		_inherits(Date, _parent);
	
		function Date() {
			var date = arguments.length <= 0 || arguments[0] === undefined ? new NativeDate() : arguments[0];
	
			_classCallCheck(this, Date);
	
			return _possibleConstructorReturn(this, Object.getPrototypeOf(Date).call(this, new NativeDate(date)));
		}
	
		_createClass(Date, [{
			key: 'add',
			value: function add(what, number) {
				var date = this.$;
	
				if (_isInvalid(date)) {
					return invalidDate();
				}
	
				if (arguments.length >= 2) {
					what = _defineProperty({}, what, number);
				}
	
				what = (0, _Object.transform)(what);
	
				var increment = 0;
	
				for (var key in what) {
					if (what.hasOwnProperty(key)) {
						var coeff = coeffs[key];
	
						if (!coeff) {
							return invalidDate();
						}
	
						increment += coeff * what[key];
					}
				}
	
				return new Date(date.getTime() + increment);
			}
		}, {
			key: 'between',
			value: function between(date) {
				date = new NativeDate((0, _Object.transform)(date));
	
				return this.$.getTime() > date.getTime();
			}
		}, {
			key: 'expires',
			value: function expires(value) {
				return new _Number2.default(this.$ - now()).timeout(value);
			}
		}, {
			key: 'format',
			value: function format(string) {
				var prefix = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
	
				string = new _String2.default((0, _Object.transform)(string));
				prefix = String((0, _Object.transform)(prefix));
	
				for (var f in formats) {
					if (formats.hasOwnProperty(f)) {
						string = string.replaceString(prefix + f, formats[f](this));
					}
				}
	
				return string.$;
			}
		}, {
			key: 'get',
			value: function get(what) {
				var date = this.$;
	
				switch (what) {
					case 'c':
						return date.getMilliseconds();
					case 's':
						return date.getSeconds();
					case 'm':
						return date.getMinutes();
					case 'h':
						return date.getHours();
					case 'd':
						return date.getDate();
					case 'dw':
						return date.getDay();
					case 'dwa':
						return daysOfTheWeekAliases[date.getDay()];
					case 'dwn':
						return daysOfTheWeekNames[date.getDay()];
					case 'M':
						return date.getMonth() + 1;
					case 'Ma':
						return monthsAliases[date.getMonth()];
					case 'Mn':
						return monthsNames[date.getMonth()];
					case 'y':
						return date.getFullYear();
				}
			}
			// TODO: .isInRange(range) -> Boolean
	
		}, {
			key: 'isAfter',
			value: function isAfter(date) {
				date = new NativeDate((0, _Object.transform)(date));
	
				return date.getTime() > this.$.getTime();
			}
		}, {
			key: 'isBefore',
			value: function isBefore(date) {
				date = new NativeDate((0, _Object.transform)(date));
	
				return date.getTime() > this.$.getTime();
			}
		}, {
			key: 'isInvalid',
			value: function isInvalid() {
				return _isInvalid(this.$);
			}
		}, {
			key: 'isPassed',
			value: function isPassed() {
				return Date.now() > this.$.getTime();
			}
		}, {
			key: 'ofOne',
			value: function ofOne(what, secondDate) {
				secondDate = new Date((0, _Object.transform)(secondDate));
				var date = this.$;
				var diff = Math.abs(date.getTime() - secondDate.getTime());
	
				if (what in coeffs) {
					return this.get(what) === secondDate.get(what) && diff < coeffs[what];
				}
	
				// TODO: add "of one week"
	
				return false;
			}
		}, {
			key: 'set',
			value: function set(what, number) {
				var date = this.$;
	
				if (_isInvalid(date)) {
					return this;
				}
	
				if (arguments.length >= 2) {
					what = _defineProperty({}, what, number);
				}
	
				what = (0, _Object.transform)(what);
	
				for (var key in what) {
					if (what.hasOwnProperty(key)) {
						var value = what[key];
	
						switch (key) {
							case 'c':
								date.setMilliseconds(value);
								continue;
							case 's':
								date.setSeconds(value);
								continue;
							case 'm':
								date.setMinutes(value);
								continue;
							case 'h':
								date.setHours(value);
								continue;
							case 'd':
								date.setDate(value);
								continue;
							case 'M':
								date.setMonth(value);
								continue;
							case 'y':
								date.setFullYear(value);
						}
					}
				}
	
				return this;
			}
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
	
		return Date;
	}(_Object2.default);
	
	function invalidDate() {
		return new cls('a');
	}
	
	function _isInvalid(date) {
		return date.toString() === 'Invalid Date';
	}
	
	function now() {
		return Date.now();
	}
	
	function round(number, digits) {
		var string = String(number);
		var zeroes = digits - string.length;
		zeroes = zeroes < 0 ? 0 : zeroes;
	
		return zero.repeat(zeroes).$ + string;
	}
	
	function cut(number, max, digits) {
		return (number / Math.pow(10, max)).toFixed(digits);
	}
	
	_2.default.Date = cls;
	_2.default.constructors.unshift({
		check: _methods2.default.isDate,
		cls: cls
	});
	
	exports.default = cls;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _ = __webpack_require__(2);
	
	var _2 = _interopRequireDefault(_);
	
	var _methods = __webpack_require__(9);
	
	var _methods2 = _interopRequireDefault(_methods);
	
	var _Object = __webpack_require__(11);
	
	var _Object2 = _interopRequireDefault(_Object);
	
	var _Array = __webpack_require__(15);
	
	var _Array2 = _interopRequireDefault(_Array);
	
	var _Promise = __webpack_require__(21);
	
	var _Promise2 = _interopRequireDefault(_Promise);
	
	var _libs = __webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var NativeNumber = Number,
	
	//toAngle = 180 / Math.PI,
	toRadian = Math.PI / 180;
	
	var cls = function (_parent) {
		_inherits(Number, _parent);
	
		function Number() {
			var number = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	
			_classCallCheck(this, Number);
	
			return _possibleConstructorReturn(this, Object.getPrototypeOf(Number).call(this, function () {
				if (_methods2.default.isNumber(number)) {
					return number;
				}
	
				return NativeNumber(number);
			}()));
		}
	
		_createClass(Number, [{
			key: 'array',
			value: function array(mapFn) {
				var array = [];
	
				for (var i = 0, length = this.$; i < length; i++) {
					array.push(mapFn ? mapFn(i) : i);
				}
	
				return new _Array2.default(array);
			}
		}, {
			key: 'cos',
			value: function cos(cond) {
				return Math.cos((cond ? toRadian : 1) * this.$);
			}
		}, {
			key: 'interval',
			value: function interval(f) {
				f = (0, _Object.transform)(f);
	
				(0, _libs.validate)([f], ['function']);
	
				f = f.bind({ clear: clear });
	
				var number = this.$;
				var args = Array.prototype.slice.call(arguments, 1);
	
				var timeout = void 0;
	
				(function interval() {
					f.apply(null, args);
					timeout = setTimeout(interval, number);
				})();
	
				function clear() {
					return clearTimeout(timeout);
				}
	
				return clear;
			}
		}, {
			key: 'pow',
			value: function pow(power) {
				return Math.pow(this.$, power);
			}
		}, {
			key: 'root',
			value: function root(power) {
				return Math.pow(this.$, 1 / power);
			}
		}, {
			key: 'sin',
			value: function sin(cond) {
				return Math.sin((cond ? toRadian : 1) * this.$);
			}
		}, {
			key: 'tan',
			value: function tan(cond) {
				return Math.tan((cond ? toRadian : 1) * this.$);
			}
		}, {
			key: 'timeout',
			value: function timeout(value) {
				var _this2 = this;
	
				var timeout = void 0;
	
				var promise = new _Promise2.default(function (resolve) {
					timeout = setTimeout(resolve, _this2.$, value);
				});
	
				promise.clear = function clear() {
					clearTimeout(timeout);
	
					return this;
				};
	
				return promise;
			}
		}, {
			key: 'toExponential',
			value: function toExponential() {
				return this.$.toExponential.apply(this.$, arguments);
			}
		}, {
			key: 'toFixed',
			value: function toFixed() {
				return this.$.toFixed.apply(this.$, arguments);
			}
		}, {
			key: 'toPrecision',
			value: function toPrecision() {
				return this.$.toPrecision.apply(this.$, arguments);
			}
		}, {
			key: 'valueOf',
			value: function valueOf() {
				return NativeNumber(this.$);
			}
		}, {
			key: 'abs',
			get: function get() {
				return Math.abs(this.$);
			}
		}, {
			key: 'acos',
			get: function get() {
				return Math.acos(this.$);
			}
		}, {
			key: 'acosh',
			get: function get() {
				return Math.acosh(this.$);
			}
		}, {
			key: 'asin',
			get: function get() {
				return Math.asin(this.$);
			}
		}, {
			key: 'asinh',
			get: function get() {
				return Math.asinh(this.$);
			}
		}, {
			key: 'atan',
			get: function get() {
				return Math.atan(this.$);
			}
		}, {
			key: 'atanh',
			get: function get() {
				return Math.atanh(this.$);
			}
		}, {
			key: 'ceil',
			get: function get() {
				return Math.ceil(this.$);
			}
		}, {
			key: 'cosh',
			get: function get() {
				return Math.cosh(this.$);
			}
		}, {
			key: 'cube',
			get: function get() {
				return this.$ * this.$ * this.$;
			}
		}, {
			key: 'exp',
			get: function get() {
				return Math.exp(this.$);
			}
		}, {
			key: 'floor',
			get: function get() {
				return Math.floor(this.$);
			}
		}, {
			key: 'log',
			get: function get() {
				return Math.log(this.$);
			}
		}, {
			key: 'log2',
			get: function get() {
				return Math.log2(this.$);
			}
		}, {
			key: 'log10',
			get: function get() {
				return Math.log10(this.$);
			}
		}, {
			key: 'round',
			get: function get() {
				return Math.round(this.$);
			}
		}, {
			key: 'sinh',
			get: function get() {
				return Math.sinh(this.$);
			}
		}, {
			key: 'sqrt',
			get: function get() {
				return Math.sqrt(this.$);
			}
		}, {
			key: 'square',
			get: function get() {
				return this.$ * this.$;
			}
		}, {
			key: 'tanh',
			get: function get() {
				return Math.tanh(this.$);
			}
		}]);
	
		return Number;
	}(_Object2.default);
	
	(0, _libs.defineProperties)(cls.prototype, {
		'get cbrt': function () {
			if (Math.cbrt) {
				return function () {
					return Math.cbrt(this.$);
				};
			}
	
			return function () {
				var y = Math.pow(Math.abs(this.$), 1 / 3);
	
				return x > 0 ? y : -y;
			};
		}(),
		'get sign': function () {
			if (Math.sign) {
				return function () {
					return Math.sign(this.$);
				};
			}
	
			return function () {
				var number = this.$;
	
				if (!number) {
					return number;
				}
	
				return number > 0 ? 1 : -1;
			};
		}()
	});
	
	_2.default.Number = cls;
	_2.default.constructors.unshift({
		check: _methods2.default.isNumber,
		cls: cls
	});
	
	exports.default = cls;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _ = __webpack_require__(2);
	
	var _2 = _interopRequireDefault(_);
	
	var _methods = __webpack_require__(9);
	
	var _methods2 = _interopRequireDefault(_methods);
	
	var _Object = __webpack_require__(11);
	
	var _Object2 = _interopRequireDefault(_Object);
	
	var _String = __webpack_require__(14);
	
	var _String2 = _interopRequireDefault(_String);
	
	var _libs = __webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var secret = {};
	
	var cls = /*typeof Promise !== 'undefined' ? Promise : */function () {
		function Promise(func) {
			_classCallCheck(this, Promise);
	
			(0, _libs.validate)([func], ['function']);
	
			var hiddenPromise = {
				handled: false,
				status: 'pending'
			};
			var onResolve = [];
			var onReject = [];
	
			(0, _libs.defineProperties)(this, {
				'get/set handled': {
					get: function get() {
						return hiddenPromise.handled;
					},
					set: function set(_ref) {
						var key = _ref.secret;
	
						if (key === secret) {
							hiddenPromise.handled = true;
						}
					}
				},
				$$handle: function $$handle(status, f, resolve, reject, key) {
					if (key === secret) {
						var proxy = _methods2.default.isFunction(f) ? function (value) {
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
	
			try {
				func(resolve, reject);
			} catch (err) {
				reject(err);
			}
	
			function reject(err) {
				if (hiddenPromise.status === 'pending') {
					if (err instanceof Promise) {
						return err.then(function (value) {
							resolve(value);
						}, function (err) {
							reject(err);
						});
					}
	
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
					if (value instanceof Promise) {
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
	
		_createClass(Promise, [{
			key: 'catch',
			value: function _catch(onReject) {
				return resolveOrReject(this, null, onReject);
			}
		}, {
			key: 'then',
			value: function then(onResolve, onReject) {
				return resolveOrReject(this, onResolve, onReject);
			}
		}], [{
			key: 'all',
			value: function all(array) {
				(0, _libs.validate)([array], ['array']);
	
				var length = array.length,
				    toResolve = length;
	
				if (!length) {
					return Promise.resolve([]);
				}
	
				return new Promise(function (resolve, reject) {
					var _loop = function _loop(i) {
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
						_loop(i);
					}
				});
			}
		}, {
			key: 'race',
			value: function race(array) {
				(0, _libs.validate)([array], ['array']);
	
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
				if (value instanceof Promise) {
					return value;
				}
	
				return new Promise(function (resolve) {
					resolve(value);
				});
			}
		}]);
	
		return Promise;
	}();
	
	function resolveOrReject(promise, onResolve, onReject) {
		if (promise.status === 'pending') {
			return new cls(function (resolve, reject) {
				promise.$$handle('reject', onReject, resolve, reject, secret);
				promise.$$handle('resolve', onResolve, resolve, reject, secret);
			});
		}
	
		promise.handled = { secret: secret };
	
		var value = promise.value;
	
	
		var method = void 0;
		var handler = void 0;
	
		if (promise.status === 'resolved') {
			method = 'resolve';
			handler = onResolve;
		} else {
			method = 'reject';
			handler = onReject;
		}
	
		if (!_methods2.default.isFunction(handler)) {
			return cls[method](value);
		}
	
		try {
			return cls.resolve(handler(value));
		} catch (err) {
			return cls.reject(err);
		}
	}
	
	_2.default.Promise = cls;
	
	exports.default = cls;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _ = __webpack_require__(23);
	
	var _2 = _interopRequireDefault(_);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _2.default;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _ = __webpack_require__(2);
	
	var _2 = _interopRequireDefault(_);
	
	var _methods = __webpack_require__(9);
	
	var _methods2 = _interopRequireDefault(_methods);
	
	var _Object = __webpack_require__(11);
	
	var _Object2 = _interopRequireDefault(_Object);
	
	var _Number = __webpack_require__(20);
	
	var _Number2 = _interopRequireDefault(_Number);
	
	var _libs = __webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var cls = function (_parent) {
		_inherits(Fetch, _parent);
	
		function Fetch() {
			_classCallCheck(this, Fetch);
	
			return _possibleConstructorReturn(this, Object.getPrototypeOf(Fetch).call(this, {
				after: {},
				before: {},
				timeout: 0
			}));
		}
	
		return Fetch;
	}(_Object2.default);
	
	_2.default.Fetch = cls;
	_2.default.fetch = new cls();
	
	exports.default = cls;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _ = __webpack_require__(25);
	
	var _2 = _interopRequireDefault(_);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _2.default;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _ = __webpack_require__(2);
	
	var _2 = _interopRequireDefault(_);
	
	var _methods = __webpack_require__(9);
	
	var _methods2 = _interopRequireDefault(_methods);
	
	var _Object = __webpack_require__(11);
	
	var _Object2 = _interopRequireDefault(_Object);
	
	var _Promise = __webpack_require__(21);
	
	var _Promise2 = _interopRequireDefault(_Promise);
	
	var _Array = __webpack_require__(15);
	
	var _Array2 = _interopRequireDefault(_Array);
	
	var _libs = __webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var cls = function (_parent) {
		_inherits(Function, _parent);
	
		function Function() {
			var func = arguments.length <= 0 || arguments[0] === undefined ? function () {} : arguments[0];
	
			_classCallCheck(this, Function);
	
			return _possibleConstructorReturn(this, Object.getPrototypeOf(Function).call(this, function () {
				(0, _libs.validate)([func], ['function']);
	
				function proxy() {
					var _this2 = this,
					    _arguments = arguments;
	
					if (proxy.called < proxy.canBeCalled) {
						var _ret = function () {
							proxy.called++;
	
							var before = proxy.before;
							var after = proxy.after;
							var original = proxy.original;
							var context = proxy.context;
							var args = proxy.args;
							var sync = proxy.sync;
							var contextLocked = proxy.contextLocked;
	
							var ret = void 0;
	
							context = contextLocked ? context : _this2;
							args = args.concat((0, _libs.toArray)(_arguments));
	
							if (sync) {
								for (var i = 0; i < before.length; i++) {
									args = before[i].apply(null, (0, _libs.toArray)(args));
								}
	
								ret = original.apply(context, (0, _libs.toArray)(args));
	
								for (var _i = 0; _i < after.length; _i++) {
									ret = after[_i](ret);
								}
	
								return {
									v: ret
								};
							}
	
							var promise = _Promise2.default.resolve(args);
	
							var _loop = function _loop(_i2) {
								promise = promise.then(function (args) {
									return before[_i2].apply(null, (0, _libs.toArray)(args));
								});
							};
	
							for (var _i2 = 0; _i2 < before.length; _i2++) {
								_loop(_i2);
							}
	
							promise = promise.then(function (args) {
								return original.apply(_this2, (0, _libs.toArray)(args));
							});
	
							var _loop2 = function _loop2(_i3) {
								promise = promise.then(function (ret) {
									return after[_i3](ret);
								});
							};
	
							for (var _i3 = 0; _i3 < after.length; _i3++) {
								_loop2(_i3);
							}
	
							return {
								v: promise
							};
						}();
	
						if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
					}
				}
	
				(0, _libs.assign)(proxy, {
					after: [],
					args: [],
					argsLocked: [],
					before: [],
					called: 0,
					canBeCalled: Infinity,
					context: null,
					contextLocked: false,
					original: func,
					sync: true
				});
	
				return proxy;
			}()));
		}
	
		_createClass(Function, [{
			key: 'after',
			value: function after(f) {
				var where = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];
	
				f = (0, _Object.transform)(f);
	
				(0, _libs.validate)([f], ['function']);
	
				var func = this.$;
	
				if (where < 0) {
					func.after.unshift(f);
				} else {
					func.after.push(f);
				}
	
				return this;
			}
		}, {
			key: 'apply',
			value: function apply(context, args) {
				return this.$.function.apply(context, args);
			}
		}, {
			key: 'async',
			value: function async() {
				var cond = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
	
				this.$.sync = !cond;
			}
		}, {
			key: 'before',
			value: function before(f) {
				var where = arguments.length <= 1 || arguments[1] === undefined ? -1 : arguments[1];
	
				f = (0, _Object.transform)(f);
	
				(0, _libs.validate)([f], ['function']);
	
				var func = this.$;
	
				if (where > 0) {
					func.before.push(f);
				} else {
					func.before.unshift(f);
				}
	
				return this;
			}
		}, {
			key: 'bind',
			value: function bind(context, args) {
				this.bindContext(context);
				this.bindArgs(args);
	
				return this;
			}
		}, {
			key: 'bindArgs',
			value: function bindArgs(args) {
				var func = this.$;
	
				func.args = func.args.concat(_Array2.default.from(args).$);
	
				return this;
			}
		}, {
			key: 'bindContext',
			value: function bindContext(context) {
				var func = this.$;
	
				if (!func.contextLocked) {
					func.context = context;
				}
	
				return this;
			}
		}, {
			key: 'call',
			value: function call(context) {
				return this.$.function.apply(context, Array.prototype.slice.call(arguments, 1));
			}
		}, {
			key: 'canBeCalled',
			value: function canBeCalled(n) {
				this.$.canBeCalled = n;
	
				return this;
			}
		}, {
			key: 'interval',
			value: function interval(number) {
				var _this3 = this;
	
				var f = this.$.function.bind({ clear: clear });
	
				var timeout = void 0,
				    args = Array.prototype.slice.call(arguments, 1);
	
				(function () {
					f.apply(null, args);
					timeout = setTimeout.apply(null, [f, _this3.$].concat(args));
				})();
	
				function clear() {
					return clearTimeout(timeout);
				}
	
				return clear;
			}
		}, {
			key: 'lock',
			value: function lock(context, args) {
				this.lockContext(context);
				this.lockArgs(args);
	
				return this;
			}
		}, {
			key: 'lockArgs',
			value: function lockArgs(args) {
				var func = this.$;
	
				func.args = func.argsLocked = func.argsLocked.concat(Array.from(args).$);
	
				return this;
			}
		}, {
			key: 'lockContext',
			value: function lockContext(context) {
				var func = this.$;
	
				if (!func.contextLocked) {
					func.context = context;
					func.contextLocked = true;
				}
	
				return this;
			}
		}, {
			key: 'timing',
			value: function timing(mark) {
				mark = !arguments.length ? this.$.original.name || 'anonymous' : String(mark);
	
				this.before(function () {
					console.time(mark);
	
					return arguments;
				}, 1);
	
				this.after(function (ret) {
					console.timeEnd(mark);
	
					return ret;
				}, -1);
	
				return this;
			}
		}, {
			key: 'unbind',
			value: function unbind() {
				this.unbindContext();
				this.unbindArgs();
	
				return this;
			}
		}, {
			key: 'unbindArgs',
			value: function unbindArgs() {
				var func = this.$;
	
				func.args = func.argsLocked;
	
				return this;
			}
		}, {
			key: 'unbindContext',
			value: function unbindContext() {
				var func = this.$;
	
				if (!func.contextLocked) {
					func.context = null;
				}
	
				return this;
			}
		}]);
	
		return Function;
	}(_Object2.default);
	
	_2.default.Function = cls;
	_2.default.constructors.unshift({
		check: _methods2.default.isFunction,
		cls: cls
	});
	
	exports.default = cls;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _ = __webpack_require__(27);
	
	var _2 = _interopRequireDefault(_);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _2.default;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _ = __webpack_require__(2);
	
	var _2 = _interopRequireDefault(_);
	
	var _methods = __webpack_require__(9);
	
	var _methods2 = _interopRequireDefault(_methods);
	
	var _css2 = __webpack_require__(28);
	
	var _css3 = _interopRequireDefault(_css2);
	
	var _elements = __webpack_require__(29);
	
	var _elements2 = _interopRequireDefault(_elements);
	
	var _children = __webpack_require__(30);
	
	var _children2 = _interopRequireDefault(_children);
	
	var _Object = __webpack_require__(11);
	
	var _Object2 = _interopRequireDefault(_Object);
	
	var _Array = __webpack_require__(15);
	
	var _Array2 = _interopRequireDefault(_Array);
	
	var _Number = __webpack_require__(20);
	
	var _Number2 = _interopRequireDefault(_Number);
	
	var _libs = __webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Obj = _Object2.default;
	
	var cls = function (_parent) {
		_inherits(HtmlElement, _parent);
	
		function HtmlElement(elem) {
			_classCallCheck(this, HtmlElement);
	
			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(HtmlElement).call(this, elem));
	
			if (_this.$) {
				_this.$.domcData = {};
				//defineProperties(this.$, { domcData: {} });
			}
			return _this;
		}
	
		_createClass(HtmlElement, [{
			key: 'absolute',
			value: function absolute() {
				this.$.style.position = 'absolute';
	
				return this;
			}
		}, {
			key: 'addClasses',
			value: function addClasses() {
				var list = this.$.classList;
	
				list.add.apply(list, arguments);
	
				return this;
			}
		}, {
			key: 'addHtml',
			value: function addHtml(html) {
				this.$.innerHTML += html;
	
				return this;
			}
		}, {
			key: 'addText',
			value: function addText(text) {
				new HtmlElement(document.createTextNode(text)).into(this);
	
				return this;
			}
		}, {
			key: 'apply',
			value: function apply() {
				for (var i = 0, length = arguments.length; i < length; i++) {
					if (!arguments[i]) {
						continue;
					}
	
					var split = String(arguments[i]).split(/(\s+)/),
					    len = split.length;
	
					var applied = void 0;
	
					top: for (var k = 0; k < len; k++) {
						var string = split[k];
	
						var cas = void 0;
	
						if (!applied) {
							if (/^\s+$/.test(string)) {
								continue;
							}
	
							for (var m = 0, l = applyRegexps.length; m < l; m++) {
								cas = applyRegexps[m];
	
								if (cas.test && cas.test.test(string)) {
									applied = { text: '', cas: cas };
									break;
								} else if (!cas.test && cas.regexp.test(string)) {
									cas.match(this, string);
									continue top;
								}
							}
						}
	
						if (!applied) {
							this.attr(string, '');
							continue;
						}
	
						var text = applied.text = applied.text + string;
	
						cas = applied.cas;
	
						if (cas.regexp.test(text)) {
							cas.match(this, text);
							applied = null;
						}
					}
				}
	
				return this;
			}
		}, {
			key: 'attr',
			value: function attr(_attr, value) {
				var elem = this.$;
	
				if (!arguments.length) {
					var _attrs = elem.attributes,
					    length = _attrs.length,
					    o = {};
	
					for (var i = 0; i < length; i++) {
						_attr = _attrs[i];
	
						o[_attr.name] = _attr.value;
					}
	
					return new Obj(o);
				}
	
				if (arguments.length <= 1 && _methods2.default.isString(_attr)) {
					return elem.getAttribute(_attr);
				}
	
				if (arguments.length >= 2) {
					_attr = _defineProperty({}, _attr, value);
				}
	
				_attr = (0, _Object.transform)(_attr);
	
				for (var key in _attr) {
					if (_attr.hasOwnProperty(key)) {
						elem.setAttribute(key, _attr[key]);
					}
				}
	
				return this;
			}
		}, {
			key: 'block',
			value: function block() {
				this.$.style.display = 'block';
	
				return this;
			}
		}, {
			key: 'blur',
			value: function blur() {
				this.$.blur();
				return this;
			}
		}, {
			key: 'bold',
			value: function bold() {
				this.$.style.fontWeight = 'bold';
	
				return this;
			}
		}, {
			key: 'centerText',
			value: function centerText() {
				this.$.style.textAlign = 'center';
	
				return this;
			}
		}, {
			key: 'child',
			value: function child(element) {
				return new HtmlElement(find(element)).into(this);
			}
		}, {
			key: 'children',
			value: function children() {
				return new _2.default.HtmlCollection(this.$.childNodes);
			}
		}, {
			key: 'class',
			value: function _class(cls) {
				var elem = this.$;
	
				if (!arguments.length) {
					return new _Array2.default(elem.className.split(' '));
				}
	
				elem.className = cls;
	
				return this;
			}
		}, {
			key: 'click',
			value: function click() {
				this.$.click();
				return this;
			}
		}, {
			key: 'clone',
			value: function clone() {
				var elem = this.$;
	
				return new this.constructor(elem.cloneNode(false));
			}
		}, {
			key: 'contains',
			value: function contains(element) {
				element = find(element);
	
				return this.$.contains(element);
			}
		}, {
			key: 'create',
			value: function create(type, strings) {
				var elem = this.$,
				    element = htmlElement(document.createElement(type));
	
				if (elem !== document) {
					element.into(this);
				}
	
				return element.apply.apply(element, Array.prototype.slice.call(arguments, 1));
			}
		}, {
			key: 'css',
			value: function css(property, value) {
				var elem = this.$;
	
				if (!arguments.length) {
					var _css = this.$.style.cssText.split(/; ?/),
					    length = _css.length,
					    o = {};
	
					for (var i = 0; i < length; i++) {
						if (!_css[i]) {
							continue;
						}
	
						property = _css[i].split(/: /);
	
						o[new _2.default.String(property[0]).toCamelCase()] = property[1];
					}
	
					return new Obj(o);
				}
	
				if (arguments.length <= 1 && _methods2.default.isString(property)) {
					return elem.style[property];
				}
	
				if (arguments.length >= 2) {
					property = _defineProperty({}, property, value);
				}
	
				property = (0, _Object.transform)(property);
	
				(0, _libs.assign)(elem.style, property);
	
				return this;
			}
		}, {
			key: 'dataset',
			value: function dataset() {
				return new Obj(this.$.dataset);
			}
		}, {
			key: 'deepClone',
			value: function deepClone() {
				var elem = this.$;
	
				return new this.constructor(elem.cloneNode(true));
			}
		}, {
			key: 'defaultValue',
			value: function defaultValue(value) {
				var elem = this.$;
	
				if (arguments.length) {
					elem.defaultValue = value;
					return this;
				}
	
				return elem.defaultValue;
			}
		}, {
			key: 'disabled',
			value: function disabled() {
				var cond = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
	
				if (cond) {
					return this.attr('disabled', '');
				}
	
				return this.removeAttr('disabled');
			}
		}, {
			key: 'draggable',
			value: function draggable() {
				var cond = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
	
				this.$.draggable = Boolean(cond);
	
				return this;
			}
		}, {
			key: 'editable',
			value: function editable() {
				var cond = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
	
				if (cond) {
					return this.attr('contentEditable', '');
				}
	
				return this.removeAttr('contentEditable');
			}
		}, {
			key: 'find',
			value: function find(selector) {
				return htmlElement(this.$.querySelector(selector));
			}
		}, {
			key: 'findAll',
			value: function findAll(selector) {
				return new _2.default.HtmlCollection(this.$.querySelectorAll(selector));
			}
		}, {
			key: 'firstChild',
			value: function firstChild() {
				return htmlElement(this.$.firstElementChild);
			}
		}, {
			key: 'fixed',
			value: function fixed() {
				this.$.style.position = 'fixed';
	
				return this;
			}
		}, {
			key: 'focus',
			value: function focus() {
				this.$.focus();
				return this;
			}
		}, {
			key: 'hasAttr',
			value: function hasAttr(attr) {
				return this.$.hasAttribute(attr);
			}
		}, {
			key: 'hasClass',
			value: function hasClass(css) {
				return this.$.classList.contains(css);
			}
		}, {
			key: 'hide',
			value: function hide() {
				var elem = this.$;
	
				elem.domcData.previousDisplay = elem.style.display;
				elem.style.display = 'none';
				return this;
			}
		}, {
			key: 'html',
			value: function html(_html) {
				var elem = this.$;
	
				if (arguments.length) {
					elem.innerHTML = _html;
					return this;
				}
	
				return elem.innerHTML;
			}
		}, {
			key: 'id',
			value: function id(_id) {
				var elem = this.$;
	
				if (arguments.length) {
					elem.id = _id;
					return this;
				}
	
				return elem.id;
			}
			// TODO: .insertAfter()
			// TODO: .insertBefore()
	
		}, {
			key: 'inline',
			value: function inline() {
				this.$.style.display = 'inline';
	
				return this;
			}
		}, {
			key: 'inlineBlock',
			value: function inlineBlock() {
				this.$.style.display = 'inline-block';
	
				return this;
			}
		}, {
			key: 'into',
			value: function into(element) {
				find(element).appendChild(this.$);
	
				return this;
			}
		}, {
			key: 'italic',
			value: function italic() {
				this.$.style.fontStyle = 'italic';
	
				return this;
			}
		}, {
			key: 'lastChild',
			value: function lastChild() {
				return htmlElement(this.$.lastElementChild);
			}
		}, {
			key: 'lineThrough',
			value: function lineThrough() {
				this.$.style.textDecorationLine = 'line-through';
	
				return this;
			}
		}, {
			key: 'matches',
			value: function matches(selector) {
				return this.$.matches(selector);
			}
		}, {
			key: 'moveAttr',
			value: function moveAttr(attr) {
				var value = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
	
				var prev = attrs[attr];
	
				if (prev) {
					if (arguments.length < 2) {
						value = prev.attr(attr);
					}
	
					prev.removeAttr(attr);
				}
	
				this.attr(attr, value);
				attrs[attr] = this;
	
				return this;
			}
		}, {
			key: 'moveClass',
			value: function moveClass(cls) {
				var elem = this.$,
				    prev = classes[cls];
	
				if (prev) {
					prev.classList.remove(cls);
				}
	
				elem.classList.add(cls);
				classes[cls] = elem;
	
				return this;
			}
		}, {
			key: 'next',
			value: function next() {
				return htmlElement(this.$.nextElementSibling);
			}
		}, {
			key: 'overline',
			value: function overline() {
				this.$.style.textDecorationLine = 'overline';
	
				return this;
			}
		}, {
			key: 'parent',
			value: function parent() {
				return htmlElement(this.$.parentElement);
			}
		}, {
			key: 'parentTree',
			value: function parentTree() {
				var collection = [];
				var elem = this.$.parentElement;
	
				while (elem) {
					collection.push(elem);
					elem = elem.parentElement;
				}
	
				return new _2.default.HtmlCollection(collection);
			}
		}, {
			key: 'pointer',
			value: function pointer() {
				this.$.style.cursor = 'pointer';
	
				return this;
			}
		}, {
			key: 'prev',
			value: function prev() {
				return htmlElement(this.$.previousElementSibling);
			}
			// TODO: .putAfter()
			// TODO: .putBefore()
	
		}, {
			key: 'ref',
			value: function ref(_ref) {
				var attr = void 0;
	
				switch (this.name) {
					case 'img':
					case 'script':
					case 'iframe':
					case 'audio':
					case 'video':
						attr = 'src';
						break;
					case 'form':
						attr = 'action';
						break;
					default:
						attr = 'href';
				}
	
				if (arguments.length) {
					this.attr(attr, _ref);
	
					return this;
				}
	
				return this.attr(attr);
			}
		}, {
			key: 'relative',
			value: function relative() {
				this.$.style.position = 'relative';
	
				return this;
			}
		}, {
			key: 'remove',
			value: function remove() {
				this.$.remove();
	
				return this;
			}
		}, {
			key: 'removeAttr',
			value: function removeAttr() {
				for (var i = 0, length = arguments.length; i < length; i++) {
					this.$.removeAttribute(arguments[i]);
				}
	
				return this;
			}
		}, {
			key: 'removeClasses',
			value: function removeClasses() {
				var list = this.$.classList;
	
				list.remove.apply(list, arguments);
	
				return this;
			}
		}, {
			key: 'removeCss',
			value: function removeCss() {
				var elem = this.$,
				    length = arguments.length;
	
				for (var i = 0; i < length; i++) {
					elem.style[arguments[i]] = '';
				}
	
				return this;
			}
		}, {
			key: 'replace',
			value: function replace(element) {
				var elem = this.$;
	
				element = find((0, _Object.transform)(element));
				elem.parentElement.replaceChild(elem, element);
	
				return this;
			}
		}, {
			key: 'setOf',
			value: function setOf(type, iterator, applied, mapFn) {
				iterator = (0, _Object.transform)(iterator);
	
				if (_methods2.default.isNumber(iterator)) {
					try {
						(0, _libs.validate)([null, iterator], { 1: ['int', '>=0'] });
					} catch (e) {
						throw new Error('\n\t\t\t\t\t2nd argument must be either or non-negative integer, or object!\n\t\t\t\t');
					}
	
					iterator = new _Number2.default(iterator).array();
				}
	
				if (arguments.length < 3) {
					throw new Error('No applied expression or map function is present!');
				}
	
				if (arguments.length < 4 && _methods2.default.isFunction(applied)) {
					mapFn = applied;
					applied = '';
				}
	
				var elem = this.$;
	
				for (var key in iterator) {
					if (iterator.hasOwnProperty(key)) {
						var value = iterator[key],
						    created = elem.new(type, applied.replace(/%key%/g, key).replace(/%value%/g, value)),
						    array = _methods2.default.isArrayAlike(iterator);
	
						if (mapFn) {
							mapFn(created, value, array ? Number(key) : key, iterator);
						}
					}
				}
			}
		}, {
			key: 'show',
			value: function show() {
				var elem = this.$;
	
				if (elem.style.display === 'none') {
					elem.style.display = elem.domcData.previousDisplay || '';
				}
	
				delete elem.domcData.previousDisplay;
	
				return this;
			}
		}, {
			key: 'text',
			value: function text(_text) {
				var elem = this.$;
	
				if (arguments.length) {
					elem.innerHTML = '';
					new HtmlElement(document.createTextNode(_text)).into(this);
	
					return this;
				}
	
				if (Object.getOwnPropertyDescriptor(Node.prototype, 'textContent')) {
					return elem.textContent;
				}
	
				return elem.innerText;
			}
		}, {
			key: 'toggleAttr',
			value: function toggleAttr(attr, condition) {
				var elem = this.$,
				    cond = arguments.length < 2 ? !elem.hasAttribute(attr) : condition;
	
				if (cond) {
					return this.attr(attr, '');
				}
	
				return this.removeAttr(attr);
			}
		}, {
			key: 'toggleAttrNS',
			value: function toggleAttrNS(ns, attr, condition) {
				var elem = this.$,
				    cond = arguments.length < 2 ? elem.hasAttributeNS(ns, attr) : condition;
	
				if (cond) {
					elem.setAttributeNS(ns, attr, '');
				} else {
					elem.removeAttributeNS(ns, attr);
				}
	
				return this;
			}
		}, {
			key: 'toggleClass',
			value: function toggleClass() {
				var list = this.$.classList;
	
				list.toggle.apply(list, arguments);
	
				return this;
			}
		}, {
			key: 'type',
			value: function type(_type) {
				var elem = this.$;
	
				if (arguments.length) {
					elem.type = _type;
					return this;
				}
	
				return elem.type;
			}
		}, {
			key: 'underline',
			value: function underline() {
				this.$.style.textDecorationLine = 'underline';
	
				return this;
			}
		}, {
			key: 'up',
			value: function up() {
				var n = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
	
				(0, _libs.validate)([n], [['intAlike', '>=0']]);
	
				n = Number(n);
	
				var elem = this.$;
	
				while (n--) {
					if (!elem) {
						return htmlElement(null);
					}
	
					elem = elem.parentElement;
				}
	
				return htmlElement(elem);
			}
		}, {
			key: 'value',
			value: function value(_value) {
				var elem = this.$;
	
				if (arguments.length) {
					elem.value = _value;
					return this;
				}
	
				return elem.value;
			}
		}, {
			key: 'clientHeight',
			get: function get() {
				return this.$.clientHeight;
			}
		}, {
			key: 'clientLeft',
			get: function get() {
				return this.$.clientLeft;
			}
		}, {
			key: 'clientTop',
			get: function get() {
				return this.$.clientTop;
			}
		}, {
			key: 'clientWidth',
			get: function get() {
				return this.$.clientWidth;
			}
		}, {
			key: 'name',
			get: function get() {
				return (this.$.tagName || '').toLowerCase();
			}
		}, {
			key: 'offsetHeight',
			get: function get() {
				return this.$.offsetHeight;
			}
		}, {
			key: 'offsetLeft',
			get: function get() {
				return this.$.offsetLeft;
			}
		}, {
			key: 'offsetTop',
			get: function get() {
				return this.$.offsetTop;
			}
		}, {
			key: 'offsetWidth',
			get: function get() {
				return this.$.offsetWidth;
			}
		}, {
			key: 'outerHtml',
			get: function get() {
				return this.$.outerHTML;
			}
		}, {
			key: 'scrollHeight',
			get: function get() {
				return this.$.scrollHeight;
			}
		}, {
			key: 'scrollLeft',
			get: function get() {
				return this.$.scrollLeft;
			}
		}, {
			key: 'scrollTop',
			get: function get() {
				return this.$.scrollTop;
			}
		}, {
			key: 'scrollWidth',
			get: function get() {
				return this.$.scrollWidth;
			}
		}, {
			key: 'valid',
			get: function get() {
				var elem = this.$;
	
				return elem.validity ? elem.validity.valid : true;
			}
		}]);
	
		return HtmlElement;
	}(_Object2.default);
	
	(0, _libs.dynamicDefineProperties)(cls.prototype, _css3.default, function (prop) {
		return function (value) {
			if (arguments.length) {
				this.$.style[prop] = value;
				return this;
			}
	
			return this.$.style[prop];
		};
	});
	
	(0, _libs.dynamicDefineProperties)(cls.prototype, _elements2.default.filter(function (elem) {
		return elem !== 'html';
	}), function (elem) {
		return function () {
			Array.prototype.unshift.call(arguments, elem);
	
			return this.create.apply(this, arguments);
		};
	});
	
	(0, _libs.defineProperties)(cls.prototype, {
		closest: function () {
			if (Element.prototype.closest) {
				return function closest(selector) {
					return htmlElement(this.$.closest(selector));
				};
			}
	
			return function closest(selector) {
				var elem = this.$;
	
				while (elem) {
					if (elem.matches(selector)) {
						return htmlElement(elem);
					}
	
					elem = elem.parentElement;
				}
	
				return htmlElement(null);
			};
		}()
	});
	
	var children = (0, _children2.default)(cls),
	    classes = {},
	    attrs = {},
	    applyRegexps = [{
		test: /^#(\(|"|'|`)/,
		regexp: /^#(\([\s\S]+\)|"[\s\S]+"|'[\s\S]+'|`[\s\S]+`)$/,
		match: function match(wrap, string) {
			wrap.id(String(string).substring(2, string.length - 1));
		}
	}, {
		regexp: /^#/,
		match: function match(wrap, string) {
			wrap.id(String(string).substring(1));
		}
	}, {
		regexp: /^\./,
		match: function match(wrap, string) {
			wrap.addClasses(String(string).substring(1));
		}
	}, {
		regexp: /^<\-\-$/,
		match: function match(wrap) {
			wrap.float('left');
		}
	}, {
		regexp: /^\-\->$/,
		match: function match(wrap) {
			wrap.float('right');
		}
	}, {
		regexp: /^\->/,
		match: function match(wrap, string) {
			wrap.ref(String(string).substring(2));
		}
	}, {
		regexp: /^\-\./,
		match: function match(wrap, string) {
			wrap.removeClasses(String(string).substring(2));
		}
	}, {
		regexp: /^\-@/,
		match: function match(wrap, string) {
			wrap.removeCss(String(string).substring(2));
		}
	}, {
		regexp: /^\-/,
		match: function match(wrap, string) {
			wrap.removeAttr(String(string).substring(1));
		}
	}, {
		test: /^=>(\(|"|'|`)/,
		regexp: /^=>(\([\s\S]+\)|"[\s\S]+"|'[\s\S]+'|`[\s\S]+`)$/,
		match: function match(wrap, string) {
			wrap.into(String(string).substring(3, string.length - 1));
		}
	}, {
		regexp: /^=>\./,
		match: function match(wrap, string) {
			wrap.moveClass(String(string).substring(3));
		}
	}, {
		regexp: /^=>/,
		match: function match(wrap, string) {
			wrap.moveAttr(String(string).substring(2));
		}
	}, {
		regexp: /^~\./,
		match: function match(wrap, string) {
			wrap.toggleClass(String(string).substring(2));
		}
	}, {
		regexp: /^~/,
		match: function match(wrap, string) {
			wrap.toggleAttr(String(string).substring(1));
		}
	}, {
		test: /^\*/,
		regexp: /^\*[\s\S]+\*$/,
		match: function match(wrap, string) {
			wrap.text(String(string).substring(1, string.length - 1));
		}
	}, {
		test: /^\+\*/,
		regexp: /^\+\*[\s\S]+\*$/,
		match: function match(wrap, string) {
			wrap.addText(String(string).substring(2, string.length - 1));
		}
	}, {
		test: /^>(\(|"|'|`)/,
		regexp: /^>(\([\s\S]+\)|"[\s\S]+"|'[\s\S]+'|`[\s\S]+`)<$/,
		match: function match(wrap, string) {
			wrap.html(String(string).substring(2, string.length - 2));
		}
	}, {
		test: /^\+>(\(|"|'|`)/,
		regexp: /^\+>(\([\s\S]+\)|"[\s\S]+"|'[\s\S]+'|`[\s\S]+`)<$/,
		match: function match(wrap, string) {
			wrap.addHtml(String(string).substring(3, string.length - 2));
		}
	}, {
		regexp: /^\$/,
		match: function match(wrap, string) {
			switch (String(string).substring(1)) {
				case 'a':
					return wrap.absolute();
				case 'b':
					return wrap.bold();
				case 'c':
					return wrap.centerText();
				case 'f':
					return wrap.fixed();
				case 'h':
					return wrap.hide();
				case 'i':
					return wrap.italic();
				case 'r':
					return wrap.relative();
				case 's':
					return wrap.show();
				case 't':
					return wrap.opacity(0);
				case 'u':
					return wrap.underline();
			}
		}
	}, {
		test: /^[^:]+:(\(|"|'|`)/,
		regexp: /^[^:]+:(\([\s\S]+\)|"[\s\S]+"|'[\s\S]+'|`[\s\S]+`)$/,
		match: function match(wrap, string) {
			var match = string.match(/^[^:]+/)[0],
			    prop = new _2.default.String(match).toCamelCase().$;
	
			wrap.css(prop, String(string).substring(match.length + 2, string.length - 1));
		}
	}, {
		regexp: /^[^:]+:[\s\S]+$/,
		match: function match(wrap, string) {
			var match = string.match(/^[^:]+/)[0],
			    prop = new _2.default.String(match).toCamelCase().$;
	
			wrap.css(prop, String(string).substring(match.length + 1));
		}
	}, {
		test: /^[^=]+=(\(|"|'|`)/,
		regexp: /^[^=]+=(\([\s\S]+\)|"[\s\S]+"|'[\s\S]+'|`[\s\S]+`)$/,
		match: function match(wrap, string) {
			var attr = string.match(/^[^=]+/)[0];
	
			wrap.attr(attr, String(string).substring(attr.length + 2, string.length - 1));
		}
	}, {
		regexp: /^[^=]+=[\s\S]+$/,
		match: function match(wrap, string) {
			var attr = string.match(/^[^=]+/)[0];
	
			wrap.attr(attr, String(string).substring(attr.length + 1));
		}
	}];
	
	var elementToCheck = void 0;
	
	for (var name in children) {
		if (children.hasOwnProperty(name)) {
			_2.default['Html' + (name[0].toUpperCase() + name.substring(1)) + 'Element'] = children[name];
		}
	}
	
	function htmlElement(elem) {
		if (!elem) {
			return new children.null(elem);
		}
	
		var constructor = children[String(elem.tagName || '').toLowerCase()] || cls;
	
		return new constructor(elem);
	}
	
	function find(element) {
		element = (0, _Object.transform)(element);
	
		if (_methods2.default.isString(element)) {
			element = document.querySelector(element);
		}
	
		return element;
	}
	
	_2.default.HtmlElement = cls;
	_2.default.constructors.unshift({
		check: function check(elem) {
			if (!(elem instanceof HTMLElement)) {
				return false;
			}
	
			elementToCheck = elem;
	
			return true;
		},
		get cls() {
			return children[String(elementToCheck.tagName || '').toLowerCase()] || cls;
		}
	});
	
	exports.default = cls;

/***/ },
/* 28 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = ['alignContent', 'alignItems', 'alignSelf', 'animation', 'animationDelay', 'animationDirection', 'animationDuration', 'animationFillMode', 'animationIterationCount', 'animationName', 'animationPlayState', 'animationTimingFunction', 'backfaceVisibility', 'background', 'backgroundAttachment', 'backgroundBlendMode', 'backgroundClip', 'backgroundColor', 'backgroundImage', 'backgroundOrigin', 'backgroundPosition', 'backgroundRepeat', 'backgroundSize', 'border', 'borderBottom', 'borderBottomColor', 'borderBottomLeftRadius', 'borderBottomRightRadius', 'borderBottomStyle', 'borderBottomWidth', 'borderCollapse', 'borderColor', 'borderImage', 'borderImageOutSet', 'borderImageRepeat', 'borderImageSlice', 'borderImageSource', 'borderImageWidth', 'borderLeft', 'borderLeftColor', 'borderLeftStyle', 'borderLeftWidth', 'borderRadius', 'borderRight', 'borderRightColor', 'borderRightStyle', 'borderRightWidth', 'borderSpacing', 'borderStyle', 'borderTop', 'borderTopColor', 'borderTopLeftRadius', 'borderTopRightRadius', 'borderTopStyle', 'borderTopWidth', 'borderWidth', 'bottom', 'boxDecorationBreak', 'boxShadow', 'boxSizing', 'breakAfter', 'breakBefore', 'breakInside', 'captionSide', 'clear', 'clip', 'color', 'columnCount', 'columnFill', 'columnGap', 'columnRule', 'columnRuleColor', 'columnRuleStyle', 'columnRuleWidth', 'columnSpan', 'columnWidth', 'columns', 'counterIncrement', 'counterReset', 'cursor', 'direction', 'display', 'emptyCells', 'filter', 'flex', 'flexBasis', 'flexDirection', 'flexFlow', 'flexGrow', 'flexShrink', 'flexWrap', 'float', 'font', 'fontFamily', 'fontFeatureSettings', 'fontKerning', 'fontLanguageOverride', 'fontSize', 'fontSizeAdjust', 'fontStretch', 'fontStyle', 'fontSynthesis', 'fontVariant', 'fontVariantAlternates', 'fontVariantCaps', 'fontVariantEastAsian', 'fontVariantLigatures', 'fontVariantNumeric', 'fontVariantPosition', 'fontWeight', 'hangingPunctuation', 'height', 'hyphens', 'imageOrientation', 'imageRendering', 'imageResolution', 'imeMode', 'justifyContent', 'left', 'letterSpacing', 'lineBreak', 'lineHeight', 'listStyle', 'listStyleImage', 'listStylePosition', 'listStyleType', 'margin', 'marginBottom', 'marginLeft', 'marginRight', 'marginTop', 'markAfter', 'markBefore', 'marks', 'marqueeDirection', 'marqueePlayCount', 'marqueeSpeed', 'marqueeStyle', 'mask', 'maskType', 'maxHeight', 'maxWidth', 'minHeight', 'minWidth', 'navDown', 'navIndex', 'navLeft', 'navRight', 'navUp', 'objectFit', 'objectPosition', 'opacity', 'order', 'orphans', 'outline', 'outlineColor', 'outlineOffset', 'outlineStyle', 'outlineWidth', 'overflow', 'overflowWrap', 'overflowX', 'overflowY', 'padding', 'paddingBottom', 'paddingLeft', 'paddingRight', 'paddingTop', 'pageBreakAfter', 'pageBreakBefore', 'pageBreakInside', 'perspective', 'perspectiveOrigin', 'phonemes', 'position', 'quotes', 'resize', 'rest', 'restAfter', 'restBefore', 'right', 'tabSize', 'tableLayout', 'textAlign', 'textAlignLast', 'textCombineUpright', 'textDecoration', 'textDecorationColor', 'textDecorationLine', 'textDecorationStyle', 'textIndent', 'textJustify', 'textOrientation', 'textOverflow', 'textShadow', 'textTransform', 'textUnderlinePosition', 'top', 'transform', 'transformOrigin', 'transformStyle', 'transition', 'transitionDelay', 'transitionDuration', 'transitionProperty', 'transitionTimingFunction', 'unicodeBidi', 'verticalAlign', 'visibility', 'voiceBalance', 'voiceDuration', 'voicePitch', 'voicePitchRange', 'voiceRate', 'voiceStress', 'voiceVolume', 'whiteSpace', 'widows', 'width', 'wordBreak', 'wordSpacing', 'wordWrap', 'writingMode', 'zIndex'];

/***/ },
/* 29 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = ['a', 'abbr', 'address', 'area', 'article', 'audio', 'b', 'base', 'bdi', 'bdo', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'content', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'element', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'menu', 'menuitem', 'meta', 'meter', 'nav', 'noscript', 'null', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'pre', 'progress', 'q', 'rp', 'rt', 'rtc', 'ruby', 's', 'samp', 'script', 'section', 'select', 'shadow', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr'];

/***/ },
/* 30 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	exports.default = function (cls) {
		return {
			a: function (_cls) {
				_inherits(A, _cls);
	
				function A() {
					_classCallCheck(this, A);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(A).apply(this, arguments));
				}
	
				return A;
			}(cls),
			abbr: function (_cls2) {
				_inherits(Abbr, _cls2);
	
				function Abbr() {
					_classCallCheck(this, Abbr);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Abbr).apply(this, arguments));
				}
	
				return Abbr;
			}(cls),
			address: function (_cls3) {
				_inherits(Address, _cls3);
	
				function Address() {
					_classCallCheck(this, Address);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Address).apply(this, arguments));
				}
	
				return Address;
			}(cls),
			area: function (_cls4) {
				_inherits(Area, _cls4);
	
				function Area() {
					_classCallCheck(this, Area);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Area).apply(this, arguments));
				}
	
				return Area;
			}(cls),
			article: function (_cls5) {
				_inherits(Article, _cls5);
	
				function Article() {
					_classCallCheck(this, Article);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Article).apply(this, arguments));
				}
	
				return Article;
			}(cls),
			audio: function (_cls6) {
				_inherits(Audio, _cls6);
	
				function Audio() {
					_classCallCheck(this, Audio);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Audio).apply(this, arguments));
				}
	
				return Audio;
			}(cls),
			b: function (_cls7) {
				_inherits(B, _cls7);
	
				function B() {
					_classCallCheck(this, B);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(B).apply(this, arguments));
				}
	
				return B;
			}(cls),
			base: function (_cls8) {
				_inherits(Base, _cls8);
	
				function Base() {
					_classCallCheck(this, Base);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Base).apply(this, arguments));
				}
	
				return Base;
			}(cls),
			bdi: function (_cls9) {
				_inherits(Bdi, _cls9);
	
				function Bdi() {
					_classCallCheck(this, Bdi);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Bdi).apply(this, arguments));
				}
	
				return Bdi;
			}(cls),
			bdo: function (_cls10) {
				_inherits(Bdo, _cls10);
	
				function Bdo() {
					_classCallCheck(this, Bdo);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Bdo).apply(this, arguments));
				}
	
				return Bdo;
			}(cls),
			blockquote: function (_cls11) {
				_inherits(BlockQuote, _cls11);
	
				function BlockQuote() {
					_classCallCheck(this, BlockQuote);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(BlockQuote).apply(this, arguments));
				}
	
				return BlockQuote;
			}(cls),
			body: function (_cls12) {
				_inherits(Body, _cls12);
	
				function Body() {
					_classCallCheck(this, Body);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Body).apply(this, arguments));
				}
	
				return Body;
			}(cls),
			br: function (_cls13) {
				_inherits(Br, _cls13);
	
				function Br() {
					_classCallCheck(this, Br);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Br).apply(this, arguments));
				}
	
				return Br;
			}(cls),
			button: function (_cls14) {
				_inherits(Button, _cls14);
	
				function Button() {
					_classCallCheck(this, Button);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Button).apply(this, arguments));
				}
	
				return Button;
			}(cls),
			canvas: function (_cls15) {
				_inherits(Canvas, _cls15);
	
				function Canvas() {
					_classCallCheck(this, Canvas);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Canvas).apply(this, arguments));
				}
	
				return Canvas;
			}(cls),
			caption: function (_cls16) {
				_inherits(Caption, _cls16);
	
				function Caption() {
					_classCallCheck(this, Caption);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Caption).apply(this, arguments));
				}
	
				return Caption;
			}(cls),
			cite: function (_cls17) {
				_inherits(Cite, _cls17);
	
				function Cite() {
					_classCallCheck(this, Cite);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Cite).apply(this, arguments));
				}
	
				return Cite;
			}(cls),
			code: function (_cls18) {
				_inherits(Code, _cls18);
	
				function Code() {
					_classCallCheck(this, Code);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Code).apply(this, arguments));
				}
	
				return Code;
			}(cls),
			col: function (_cls19) {
				_inherits(Col, _cls19);
	
				function Col() {
					_classCallCheck(this, Col);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Col).apply(this, arguments));
				}
	
				return Col;
			}(cls),
			colgroup: function (_cls20) {
				_inherits(ColGroup, _cls20);
	
				function ColGroup() {
					_classCallCheck(this, ColGroup);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(ColGroup).apply(this, arguments));
				}
	
				return ColGroup;
			}(cls),
			content: function (_cls21) {
				_inherits(Content, _cls21);
	
				function Content() {
					_classCallCheck(this, Content);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Content).apply(this, arguments));
				}
	
				return Content;
			}(cls),
			data: function (_cls22) {
				_inherits(Data, _cls22);
	
				function Data() {
					_classCallCheck(this, Data);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Data).apply(this, arguments));
				}
	
				return Data;
			}(cls),
			datalist: function (_cls23) {
				_inherits(DataList, _cls23);
	
				function DataList() {
					_classCallCheck(this, DataList);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(DataList).apply(this, arguments));
				}
	
				return DataList;
			}(cls),
			dd: function (_cls24) {
				_inherits(Dd, _cls24);
	
				function Dd() {
					_classCallCheck(this, Dd);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Dd).apply(this, arguments));
				}
	
				return Dd;
			}(cls),
			del: function (_cls25) {
				_inherits(Del, _cls25);
	
				function Del() {
					_classCallCheck(this, Del);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Del).apply(this, arguments));
				}
	
				return Del;
			}(cls),
			details: function (_cls26) {
				_inherits(Details, _cls26);
	
				function Details() {
					_classCallCheck(this, Details);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Details).apply(this, arguments));
				}
	
				return Details;
			}(cls),
			dfn: function (_cls27) {
				_inherits(Dfn, _cls27);
	
				function Dfn() {
					_classCallCheck(this, Dfn);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Dfn).apply(this, arguments));
				}
	
				return Dfn;
			}(cls),
			dialog: function (_cls28) {
				_inherits(Dialog, _cls28);
	
				function Dialog() {
					_classCallCheck(this, Dialog);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Dialog).apply(this, arguments));
				}
	
				return Dialog;
			}(cls),
			div: function (_cls29) {
				_inherits(Div, _cls29);
	
				function Div() {
					_classCallCheck(this, Div);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Div).apply(this, arguments));
				}
	
				return Div;
			}(cls),
			dl: function (_cls30) {
				_inherits(Dl, _cls30);
	
				function Dl() {
					_classCallCheck(this, Dl);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Dl).apply(this, arguments));
				}
	
				return Dl;
			}(cls),
			dt: function (_cls31) {
				_inherits(Dt, _cls31);
	
				function Dt() {
					_classCallCheck(this, Dt);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Dt).apply(this, arguments));
				}
	
				return Dt;
			}(cls),
			element: function (_cls32) {
				_inherits(Element, _cls32);
	
				function Element() {
					_classCallCheck(this, Element);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Element).apply(this, arguments));
				}
	
				return Element;
			}(cls),
			em: function (_cls33) {
				_inherits(Em, _cls33);
	
				function Em() {
					_classCallCheck(this, Em);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Em).apply(this, arguments));
				}
	
				return Em;
			}(cls),
			embed: function (_cls34) {
				_inherits(Embed, _cls34);
	
				function Embed() {
					_classCallCheck(this, Embed);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Embed).apply(this, arguments));
				}
	
				return Embed;
			}(cls),
			fieldset: function (_cls35) {
				_inherits(FieldSet, _cls35);
	
				function FieldSet() {
					_classCallCheck(this, FieldSet);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(FieldSet).apply(this, arguments));
				}
	
				return FieldSet;
			}(cls),
			figcaption: function (_cls36) {
				_inherits(FigCaption, _cls36);
	
				function FigCaption() {
					_classCallCheck(this, FigCaption);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(FigCaption).apply(this, arguments));
				}
	
				return FigCaption;
			}(cls),
			figure: function (_cls37) {
				_inherits(Figure, _cls37);
	
				function Figure() {
					_classCallCheck(this, Figure);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Figure).apply(this, arguments));
				}
	
				return Figure;
			}(cls),
			footer: function (_cls38) {
				_inherits(Footer, _cls38);
	
				function Footer() {
					_classCallCheck(this, Footer);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Footer).apply(this, arguments));
				}
	
				return Footer;
			}(cls),
			form: function (_cls39) {
				_inherits(Form, _cls39);
	
				function Form() {
					_classCallCheck(this, Form);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Form).apply(this, arguments));
				}
	
				return Form;
			}(cls),
			h1: function (_cls40) {
				_inherits(H1, _cls40);
	
				function H1() {
					_classCallCheck(this, H1);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(H1).apply(this, arguments));
				}
	
				return H1;
			}(cls),
			h2: function (_cls41) {
				_inherits(H2, _cls41);
	
				function H2() {
					_classCallCheck(this, H2);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(H2).apply(this, arguments));
				}
	
				return H2;
			}(cls),
			h3: function (_cls42) {
				_inherits(H3, _cls42);
	
				function H3() {
					_classCallCheck(this, H3);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(H3).apply(this, arguments));
				}
	
				return H3;
			}(cls),
			h4: function (_cls43) {
				_inherits(H4, _cls43);
	
				function H4() {
					_classCallCheck(this, H4);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(H4).apply(this, arguments));
				}
	
				return H4;
			}(cls),
			h5: function (_cls44) {
				_inherits(H5, _cls44);
	
				function H5() {
					_classCallCheck(this, H5);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(H5).apply(this, arguments));
				}
	
				return H5;
			}(cls),
			h6: function (_cls45) {
				_inherits(H6, _cls45);
	
				function H6() {
					_classCallCheck(this, H6);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(H6).apply(this, arguments));
				}
	
				return H6;
			}(cls),
			head: function (_cls46) {
				_inherits(Head, _cls46);
	
				function Head() {
					_classCallCheck(this, Head);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Head).apply(this, arguments));
				}
	
				return Head;
			}(cls),
			header: function (_cls47) {
				_inherits(Header, _cls47);
	
				function Header() {
					_classCallCheck(this, Header);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Header).apply(this, arguments));
				}
	
				return Header;
			}(cls),
			hgroup: function (_cls48) {
				_inherits(Hgroup, _cls48);
	
				function Hgroup() {
					_classCallCheck(this, Hgroup);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Hgroup).apply(this, arguments));
				}
	
				return Hgroup;
			}(cls),
			hr: function (_cls49) {
				_inherits(Hr, _cls49);
	
				function Hr() {
					_classCallCheck(this, Hr);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Hr).apply(this, arguments));
				}
	
				return Hr;
			}(cls),
			html: function (_cls50) {
				_inherits(HTML, _cls50);
	
				function HTML() {
					_classCallCheck(this, HTML);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(HTML).apply(this, arguments));
				}
	
				return HTML;
			}(cls),
			i: function (_cls51) {
				_inherits(I, _cls51);
	
				function I() {
					_classCallCheck(this, I);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(I).apply(this, arguments));
				}
	
				return I;
			}(cls),
			iframe: function (_cls52) {
				_inherits(IFrame, _cls52);
	
				function IFrame() {
					_classCallCheck(this, IFrame);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(IFrame).apply(this, arguments));
				}
	
				return IFrame;
			}(cls),
			img: function (_cls53) {
				_inherits(Image, _cls53);
	
				function Image() {
					_classCallCheck(this, Image);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Image).apply(this, arguments));
				}
	
				return Image;
			}(cls),
			input: function (_cls54) {
				_inherits(Input, _cls54);
	
				function Input() {
					_classCallCheck(this, Input);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Input).apply(this, arguments));
				}
	
				return Input;
			}(cls),
			ins: function (_cls55) {
				_inherits(Ins, _cls55);
	
				function Ins() {
					_classCallCheck(this, Ins);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Ins).apply(this, arguments));
				}
	
				return Ins;
			}(cls),
			kbd: function (_cls56) {
				_inherits(Kbd, _cls56);
	
				function Kbd() {
					_classCallCheck(this, Kbd);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Kbd).apply(this, arguments));
				}
	
				return Kbd;
			}(cls),
			label: function (_cls57) {
				_inherits(Label, _cls57);
	
				function Label() {
					_classCallCheck(this, Label);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Label).apply(this, arguments));
				}
	
				return Label;
			}(cls),
			legend: function (_cls58) {
				_inherits(Legend, _cls58);
	
				function Legend() {
					_classCallCheck(this, Legend);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Legend).apply(this, arguments));
				}
	
				return Legend;
			}(cls),
			li: function (_cls59) {
				_inherits(Li, _cls59);
	
				function Li() {
					_classCallCheck(this, Li);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Li).apply(this, arguments));
				}
	
				return Li;
			}(cls),
			link: function (_cls60) {
				_inherits(Link, _cls60);
	
				function Link() {
					_classCallCheck(this, Link);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Link).apply(this, arguments));
				}
	
				return Link;
			}(cls),
			main: function (_cls61) {
				_inherits(Main, _cls61);
	
				function Main() {
					_classCallCheck(this, Main);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Main).apply(this, arguments));
				}
	
				return Main;
			}(cls),
			map: function (_cls62) {
				_inherits(Map, _cls62);
	
				function Map() {
					_classCallCheck(this, Map);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Map).apply(this, arguments));
				}
	
				return Map;
			}(cls),
			mark: function (_cls63) {
				_inherits(Mark, _cls63);
	
				function Mark() {
					_classCallCheck(this, Mark);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Mark).apply(this, arguments));
				}
	
				return Mark;
			}(cls),
			menu: function (_cls64) {
				_inherits(Menu, _cls64);
	
				function Menu() {
					_classCallCheck(this, Menu);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Menu).apply(this, arguments));
				}
	
				return Menu;
			}(cls),
			menuitem: function (_cls65) {
				_inherits(MenuItem, _cls65);
	
				function MenuItem() {
					_classCallCheck(this, MenuItem);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(MenuItem).apply(this, arguments));
				}
	
				return MenuItem;
			}(cls),
			meta: function (_cls66) {
				_inherits(Meta, _cls66);
	
				function Meta() {
					_classCallCheck(this, Meta);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Meta).apply(this, arguments));
				}
	
				return Meta;
			}(cls),
			meter: function (_cls67) {
				_inherits(Meter, _cls67);
	
				function Meter() {
					_classCallCheck(this, Meter);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Meter).apply(this, arguments));
				}
	
				return Meter;
			}(cls),
			nav: function (_cls68) {
				_inherits(Nav, _cls68);
	
				function Nav() {
					_classCallCheck(this, Nav);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Nav).apply(this, arguments));
				}
	
				return Nav;
			}(cls),
			noscript: function (_cls69) {
				_inherits(NoScript, _cls69);
	
				function NoScript() {
					_classCallCheck(this, NoScript);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(NoScript).apply(this, arguments));
				}
	
				return NoScript;
			}(cls),
			null: function (_cls70) {
				_inherits(Null, _cls70);
	
				function Null() {
					_classCallCheck(this, Null);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Null).apply(this, arguments));
				}
	
				return Null;
			}(cls),
			object: function (_cls71) {
				_inherits(Object, _cls71);
	
				function Object() {
					_classCallCheck(this, Object);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Object).apply(this, arguments));
				}
	
				return Object;
			}(cls),
			ol: function (_cls72) {
				_inherits(Ol, _cls72);
	
				function Ol() {
					_classCallCheck(this, Ol);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Ol).apply(this, arguments));
				}
	
				return Ol;
			}(cls),
			optgroup: function (_cls73) {
				_inherits(OptGroup, _cls73);
	
				function OptGroup() {
					_classCallCheck(this, OptGroup);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(OptGroup).apply(this, arguments));
				}
	
				return OptGroup;
			}(cls),
			option: function (_cls74) {
				_inherits(Option, _cls74);
	
				function Option() {
					_classCallCheck(this, Option);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Option).apply(this, arguments));
				}
	
				return Option;
			}(cls),
			output: function (_cls75) {
				_inherits(Output, _cls75);
	
				function Output() {
					_classCallCheck(this, Output);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Output).apply(this, arguments));
				}
	
				return Output;
			}(cls),
			p: function (_cls76) {
				_inherits(P, _cls76);
	
				function P() {
					_classCallCheck(this, P);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(P).apply(this, arguments));
				}
	
				return P;
			}(cls),
			param: function (_cls77) {
				_inherits(Param, _cls77);
	
				function Param() {
					_classCallCheck(this, Param);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Param).apply(this, arguments));
				}
	
				return Param;
			}(cls),
			pre: function (_cls78) {
				_inherits(Pre, _cls78);
	
				function Pre() {
					_classCallCheck(this, Pre);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Pre).apply(this, arguments));
				}
	
				return Pre;
			}(cls),
			progress: function (_cls79) {
				_inherits(Progress, _cls79);
	
				function Progress() {
					_classCallCheck(this, Progress);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Progress).apply(this, arguments));
				}
	
				return Progress;
			}(cls),
			q: function (_cls80) {
				_inherits(Quote, _cls80);
	
				function Quote() {
					_classCallCheck(this, Quote);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Quote).apply(this, arguments));
				}
	
				return Quote;
			}(cls),
			rp: function (_cls81) {
				_inherits(Rp, _cls81);
	
				function Rp() {
					_classCallCheck(this, Rp);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Rp).apply(this, arguments));
				}
	
				return Rp;
			}(cls),
			rt: function (_cls82) {
				_inherits(Rt, _cls82);
	
				function Rt() {
					_classCallCheck(this, Rt);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Rt).apply(this, arguments));
				}
	
				return Rt;
			}(cls),
			rtc: function (_cls83) {
				_inherits(Rtc, _cls83);
	
				function Rtc() {
					_classCallCheck(this, Rtc);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Rtc).apply(this, arguments));
				}
	
				return Rtc;
			}(cls),
			ruby: function (_cls84) {
				_inherits(Ruby, _cls84);
	
				function Ruby() {
					_classCallCheck(this, Ruby);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Ruby).apply(this, arguments));
				}
	
				return Ruby;
			}(cls),
			s: function (_cls85) {
				_inherits(S, _cls85);
	
				function S() {
					_classCallCheck(this, S);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(S).apply(this, arguments));
				}
	
				return S;
			}(cls),
			samp: function (_cls86) {
				_inherits(Samp, _cls86);
	
				function Samp() {
					_classCallCheck(this, Samp);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Samp).apply(this, arguments));
				}
	
				return Samp;
			}(cls),
			script: function (_cls87) {
				_inherits(Script, _cls87);
	
				function Script() {
					_classCallCheck(this, Script);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Script).apply(this, arguments));
				}
	
				return Script;
			}(cls),
			section: function (_cls88) {
				_inherits(Section, _cls88);
	
				function Section() {
					_classCallCheck(this, Section);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Section).apply(this, arguments));
				}
	
				return Section;
			}(cls),
			select: function (_cls89) {
				_inherits(Select, _cls89);
	
				function Select() {
					_classCallCheck(this, Select);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Select).apply(this, arguments));
				}
	
				return Select;
			}(cls),
			shadow: function (_cls90) {
				_inherits(Shadow, _cls90);
	
				function Shadow() {
					_classCallCheck(this, Shadow);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Shadow).apply(this, arguments));
				}
	
				return Shadow;
			}(cls),
			small: function (_cls91) {
				_inherits(Small, _cls91);
	
				function Small() {
					_classCallCheck(this, Small);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Small).apply(this, arguments));
				}
	
				return Small;
			}(cls),
			source: function (_cls92) {
				_inherits(Source, _cls92);
	
				function Source() {
					_classCallCheck(this, Source);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Source).apply(this, arguments));
				}
	
				return Source;
			}(cls),
			span: function (_cls93) {
				_inherits(Span, _cls93);
	
				function Span() {
					_classCallCheck(this, Span);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Span).apply(this, arguments));
				}
	
				return Span;
			}(cls),
			strong: function (_cls94) {
				_inherits(Strong, _cls94);
	
				function Strong() {
					_classCallCheck(this, Strong);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Strong).apply(this, arguments));
				}
	
				return Strong;
			}(cls),
			style: function (_cls95) {
				_inherits(Style, _cls95);
	
				function Style() {
					_classCallCheck(this, Style);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Style).apply(this, arguments));
				}
	
				return Style;
			}(cls),
			sub: function (_cls96) {
				_inherits(Sub, _cls96);
	
				function Sub() {
					_classCallCheck(this, Sub);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Sub).apply(this, arguments));
				}
	
				return Sub;
			}(cls),
			summary: function (_cls97) {
				_inherits(Summary, _cls97);
	
				function Summary() {
					_classCallCheck(this, Summary);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Summary).apply(this, arguments));
				}
	
				return Summary;
			}(cls),
			sup: function (_cls98) {
				_inherits(Sup, _cls98);
	
				function Sup() {
					_classCallCheck(this, Sup);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Sup).apply(this, arguments));
				}
	
				return Sup;
			}(cls),
			table: function (_cls99) {
				_inherits(Table, _cls99);
	
				function Table() {
					_classCallCheck(this, Table);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Table).apply(this, arguments));
				}
	
				return Table;
			}(cls),
			tbody: function (_cls100) {
				_inherits(TBody, _cls100);
	
				function TBody() {
					_classCallCheck(this, TBody);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(TBody).apply(this, arguments));
				}
	
				return TBody;
			}(cls),
			td: function (_cls101) {
				_inherits(Td, _cls101);
	
				function Td() {
					_classCallCheck(this, Td);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Td).apply(this, arguments));
				}
	
				return Td;
			}(cls),
			template: function (_cls102) {
				_inherits(Template, _cls102);
	
				function Template() {
					_classCallCheck(this, Template);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Template).apply(this, arguments));
				}
	
				return Template;
			}(cls),
			textarea: function (_cls103) {
				_inherits(TextArea, _cls103);
	
				function TextArea() {
					_classCallCheck(this, TextArea);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(TextArea).apply(this, arguments));
				}
	
				return TextArea;
			}(cls),
			tfoot: function (_cls104) {
				_inherits(TFoot, _cls104);
	
				function TFoot() {
					_classCallCheck(this, TFoot);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(TFoot).apply(this, arguments));
				}
	
				return TFoot;
			}(cls),
			th: function (_cls105) {
				_inherits(Th, _cls105);
	
				function Th() {
					_classCallCheck(this, Th);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Th).apply(this, arguments));
				}
	
				return Th;
			}(cls),
			thead: function (_cls106) {
				_inherits(THead, _cls106);
	
				function THead() {
					_classCallCheck(this, THead);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(THead).apply(this, arguments));
				}
	
				return THead;
			}(cls),
			time: function (_cls107) {
				_inherits(Time, _cls107);
	
				function Time() {
					_classCallCheck(this, Time);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Time).apply(this, arguments));
				}
	
				return Time;
			}(cls),
			title: function (_cls108) {
				_inherits(Title, _cls108);
	
				function Title() {
					_classCallCheck(this, Title);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Title).apply(this, arguments));
				}
	
				return Title;
			}(cls),
			tr: function (_cls109) {
				_inherits(Tr, _cls109);
	
				function Tr() {
					_classCallCheck(this, Tr);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Tr).apply(this, arguments));
				}
	
				return Tr;
			}(cls),
			track: function (_cls110) {
				_inherits(Track, _cls110);
	
				function Track() {
					_classCallCheck(this, Track);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Track).apply(this, arguments));
				}
	
				return Track;
			}(cls),
			u: function (_cls111) {
				_inherits(U, _cls111);
	
				function U() {
					_classCallCheck(this, U);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(U).apply(this, arguments));
				}
	
				return U;
			}(cls),
			ul: function (_cls112) {
				_inherits(Ul, _cls112);
	
				function Ul() {
					_classCallCheck(this, Ul);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Ul).apply(this, arguments));
				}
	
				return Ul;
			}(cls),
			var: function (_cls113) {
				_inherits(Var, _cls113);
	
				function Var() {
					_classCallCheck(this, Var);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Var).apply(this, arguments));
				}
	
				return Var;
			}(cls),
			video: function (_cls114) {
				_inherits(Video, _cls114);
	
				function Video() {
					_classCallCheck(this, Video);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Video).apply(this, arguments));
				}
	
				return Video;
			}(cls),
			wbr: function (_cls115) {
				_inherits(Wbr, _cls115);
	
				function Wbr() {
					_classCallCheck(this, Wbr);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Wbr).apply(this, arguments));
				}
	
				return Wbr;
			}(cls)
		};
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _ = __webpack_require__(20);
	
	var _2 = _interopRequireDefault(_);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _2.default;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _ = __webpack_require__(21);
	
	var _2 = _interopRequireDefault(_);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _2.default;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _ = __webpack_require__(14);
	
	var _2 = _interopRequireDefault(_);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _2.default;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map