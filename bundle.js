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
	
	window.D = _domc2.default;
	console.dir(_domc2.default);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _D = __webpack_require__(2);
	
	var _D2 = _interopRequireDefault(_D);
	
	var _module = __webpack_require__(9);
	
	var _module2 = _interopRequireDefault(_module);

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
	
	var _methods = __webpack_require__(8);
	
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
	
	var _validate = __webpack_require__(6);
	
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

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.dynamicDefineProperties = dynamicDefineProperties;
	exports.defineProperties = defineProperties;
	function dynamicDefineProperties(object, methods, descriptorGenerator) {
		for (var i = 0, length = methods.length; i < length; i++) {
			var name = methods[i];
			Object.defineProperty(object, name, { value: descriptorGenerator(name) });
		}
	}
	
	function defineProperties(object, methods) {
		for (var name in methods) {
			if (methods.hasOwnProperty(name)) {
				Object.defineProperty(object, name, { value: methods[name] });
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
			return Array.isArray(array);
		},
		isBoolean: function isBoolean(boolean) {
			return typeof boolean === 'boolean' || boolean instanceof Boolean;
		},
		isDate: function isDate(date) {
			return date instanceof Date;
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
			return !!object && ((typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' || object instanceof Object);
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
	
	(0, _assign.assign)(methods, {
		isDateAlike: function isDateAlike(date) {
			date = new Date(date);
			return date.toString() !== 'Invalid Date';
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
	
	var _assign = __webpack_require__(4);
	
	var _checkTypeMethods = __webpack_require__(7);
	
	var _checkTypeMethods2 = _interopRequireDefault(_checkTypeMethods);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = (0, _assign.assign)({}, _checkTypeMethods2.default, {
		self: function self(x) {
			return x;
		}
	});

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _ = __webpack_require__(10);
	
	var _2 = _interopRequireDefault(_);
	
	__webpack_require__(11);
	
	__webpack_require__(13);
	
	__webpack_require__(16);
	
	__webpack_require__(18);
	
	__webpack_require__(23);
	
	__webpack_require__(25);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _2.default;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.transform = transform;
	
	var _ = __webpack_require__(2);
	
	var _2 = _interopRequireDefault(_);
	
	var _methods = __webpack_require__(8);
	
	var _methods2 = _interopRequireDefault(_methods);
	
	var _libs = __webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	// FIXME: !!! iterate over arrays using for (;;)!!! not for ( in )!!!
	
	var NativeObject = Object;
	
	var cls = function () {
		function Object() {
			var object = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
			_classCallCheck(this, Object);
	
			(0, _libs.defineProperties)(this, { $: object });
		}
	
		_createClass(Object, [{
			key: 'array',
			value: function array(f) {
				(0, _libs.validate)([f], { 0: 'function' });
	
				var object = this.$ || {},
				    array = _methods2.default.isArrayAlike(object),
				    a = [];
	
				for (var key in object) {
					if (object.hasOwnProperty(key)) {
						var value = object[key];
	
						f(a, value, array ? Number(key) : key, object);
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
					var _o = transform(arguments[i]);
	
					for (var key in _o) {
						if (_o.hasOwnProperty(key)) {
							object[key] = _o[key];
						}
					}
				}
	
				return this;
			}
		}, {
			key: 'average',
			value: function average() {
				var f = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	
				return this.sum(f) / this.count;
			}
		}, {
			key: 'call',
			value: function call(f) {
				(0, _libs.validate)([f], { 0: 'function' });
	
				var g = f;
				Array.prototype.shift.call(arguments);
	
				return g.apply(this, arguments);
			}
			// TODO: .clone()
	
		}, {
			key: 'deepEquals',
	
			// TODO: .deepAssign()
			// TODO: .deepClone()
			value: function deepEquals(o) {
				(0, _libs.validate)(arguments, { 0: '!!' });
	
				return deepEqual(this.$, o);
	
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
			}
		}, {
			key: 'deepEvery',
			value: function deepEvery(f, n) {
				if (arguments.length === 1 && !_methods2.default.isFunction(f)) {
					n = f;
					f = Boolean;
				} else if (arguments.length === 1) {
					n = 1;
				} else if (!arguments.length) {
					n = 1;
					f = Boolean;
				}
	
				(0, _libs.validate)([f, n], { 0: 'function', 1: ['intAlike', '>0'] });
	
				n = Number(n);
	
				return every(this.$, n, [{ key: null, value: this.$ }]);
	
				function every() {
					var object = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
					var n = arguments[1];
					var tree = arguments[2];
	
					object = transform(object);
	
					var array = _methods2.default.isArrayAlike(object),
					    end = n === 1;
	
					for (var key in object) {
						if (object.hasOwnProperty(key)) {
							var value = object[key],
							    newTree = [{ key: key, value: value }].concat(tree);
	
							if (end ? !f(value, array ? Number(key) : key, object, newTree) : !every(value, n - 1, newTree)) {
								return false;
							}
						}
					}
	
					return true;
				}
			}
		}, {
			key: 'deepFilter',
			value: function deepFilter(f, n) {
				if (arguments.length === 1 && !_methods2.default.isFunction(f)) {
					n = f;
					f = Boolean;
				} else if (arguments.length === 1) {
					n = 1;
				} else if (!arguments.length) {
					n = 1;
					f = Boolean;
				}
	
				(0, _libs.validate)([f, n], { 0: 'function', 1: ['intAlike', '>0'] });
	
				// FIXME: return respective wrap (not D(o)!!!)
				return new Object(filter(this.$, n, [{ key: null, value: this.$ }]));
	
				function filter() {
					var object = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
					var n = arguments[1];
					var tree = arguments[2];
	
					object = transform(object);
	
					var array = _methods2.default.isArrayAlike(object),
					    nul = _methods2.default.isNull(object),
					    o = array ? [] : nul ? null : {},
					    end = n === 1;
	
					for (var key in object) {
						if (object.hasOwnProperty(key)) {
							var value = object[key],
							    newTree = [{ key: key, value: value }].concat(tree);
	
							if (end && f(value, key, object, newTree)) {
								if (array) {
									o.push(value);
									continue;
								}
	
								o[key] = value;
								continue;
							}
	
							if (!end) {
								var filtered = filter(value, n - 1, newTree);
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
			}
		}, {
			key: 'deepFind',
			value: function deepFind(f, n) {
				if (arguments.length === 1 && !_methods2.default.isFunction(f)) {
					n = f;
					f = Boolean;
				} else if (arguments.length === 1) {
					n = 1;
				} else if (!arguments.length) {
					n = 1;
					f = Boolean;
				}
	
				(0, _libs.validate)([f, n], { 0: 'function', 1: ['intAlike', '>0'] });
	
				return find(this.$, n, [{ key: null, value: this.$ }]);
	
				function find() {
					var object = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
					var n = arguments[1];
					var tree = arguments[2];
	
					object = transform(object);
	
					var array = _methods2.default.isArrayAlike(object),
					    end = n === 1;
	
					for (var key in object) {
						if (object.hasOwnProperty(key)) {
							var value = object[key],
							    newTree = [{ key: key, value: value }].concat(tree);
	
							if (end) {
								if (f(value, array ? Number(key) : key, object, newTree)) {
									return newTree;
								}
	
								continue;
							}
	
							var result = find(value, n - 1, newTree);
	
							if (result) {
								return result;
							}
						}
					}
	
					return null;
				}
			}
		}, {
			key: 'deepFreeze',
			value: function deepFreeze() {
				deepFreeze(this.$);
				return this;
	
				function deepFreeze() {
					var object = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
					NativeObject.freeze(object);
					for (var key in object) {
						if (object.hasOwnProperty(key)) {
							deepFreeze(object[key]);
						}
					}
				}
			}
		}, {
			key: 'deepMap',
			value: function deepMap(f) {
				var n = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];
	
				(0, _libs.validate)([f, n], { 0: 'function', 1: ['intAlike', '>0'] });
	
				n = Number(n);
	
				// FIXME: return respective wrap (not D(o)!!!)
				return new Object(iterate(this.$, n, [{ key: null, value: this.$ }]));
	
				function iterate() {
					var object = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
					var n = arguments[1];
					var tree = arguments[2];
	
					object = transform(object);
	
					var array = _methods2.default.isArrayAlike(object),
					    nul = _methods2.default.isNull(object),
					    o = array ? [] : nul ? null : {},
					    end = n === 1;
	
					for (var key in object) {
						if (object.hasOwnProperty(key)) {
							var value = object[key],
							    newTree = [{ key: key, value: value }].concat(tree);
	
							o[key] = end ? f(value, array ? Number(key) : key, object, newTree) : iterate(value, n - 1, newTree);
						}
					}
	
					return o;
				}
			}
		}, {
			key: 'deepReduce',
			value: function deepReduce(f) {
				var n = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];
				var IV = arguments[2];
	
				(0, _libs.validate)([f, n], { 0: 'function', 1: ['intAlike', '>0'] });
	
				n = Number(n);
	
				var start = void 0;
	
				return reduce(this.$, n, [{ key: null, value: this.$ }]);
	
				function reduce() {
					var object = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
					var n = arguments[1];
					var tree = arguments[2];
	
					object = transform(object);
	
					var array = _methods2.default.isArrayAlike(object),
					    end = n === 1;
	
					var startKey = void 0;
	
					if (IV == null && end && !start) {
						for (var key in object) {
							if (object.hasOwnProperty(key)) {
								start = true;
								startKey = key;
								IV = object[key];
								break;
							}
						}
					}
	
					for (var _key in object) {
						if (object.hasOwnProperty(_key) && _key != startKey) {
							var value = object[_key],
							    newTree = [{ key: _key, value: value }].concat(tree);
	
							IV = end ? f(IV, value, array ? Number(_key) : _key, object, newTree) : reduce(value, n - 1, newTree);
						}
					}
	
					return IV;
				}
			}
		}, {
			key: 'deepSome',
			value: function deepSome(f, n) {
				if (arguments.length === 1 && !_methods2.default.isFunction(f)) {
					n = f;
					f = Boolean;
				} else if (arguments.length === 1) {
					n = 1;
				} else if (!arguments.length) {
					n = 1;
					f = Boolean;
				}
	
				(0, _libs.validate)([f, n], { 0: 'function', 1: ['intAlike', '>0'] });
	
				n = Number(n);
	
				return some(this.$, n, [{ key: null, value: this.$ }]);
	
				function some() {
					var object = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
					var n = arguments[1];
					var tree = arguments[2];
	
					object = transform(object);
	
					var array = _methods2.default.isArrayAlike(object),
					    end = n === 1;
	
					for (var key in object) {
						if (object.hasOwnProperty(key)) {
							var value = object[key],
							    newTree = [{ key: key, value: value }].concat(tree);
	
							if (end ? f(value, array ? Number(key) : key, object, newTree) : some(value, n - 1, newTree)) {
								return true;
							}
						}
					}
	
					return false;
				}
			}
		}, {
			key: 'deepStrictEquals',
			value: function deepStrictEquals(o) {
				(0, _libs.validate)(arguments, { 0: '!!' });
	
				return deepStrictEqual(this.$, o);
	
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
			}
		}, {
			key: 'define',
			value: function define(property, descriptor) {
				if (arguments.length >= 2) {
					property = _defineProperty({}, property, descriptor);
				}
	
				property = transform(property);
	
				(0, _libs.validate)([property], { 0: 'object' });
	
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
				(0, _libs.validate)(arguments, { 0: '!!' });
	
				o = transform(o);
	
				return this.$ == o;
			}
		}, {
			key: 'every',
			value: function every() {
				var f = arguments.length <= 0 || arguments[0] === undefined ? Boolean : arguments[0];
	
				(0, _libs.validate)([f], { 0: 'function' });
	
				var object = this.$ || {},
				    array = _methods2.default.isArrayAlike(object);
	
				for (var key in object) {
					if (object.hasOwnProperty(key)) {
						if (!f(object[key], array ? Number(key) : key, object)) {
							return false;
						}
					}
				}
	
				return true;
			}
		}, {
			key: 'filter',
			value: function filter() {
				var f = arguments.length <= 0 || arguments[0] === undefined ? Boolean : arguments[0];
	
				(0, _libs.validate)([f], { 0: 'function' });
	
				var object = this.$ || {},
				    array = _methods2.default.isArrayAlike(object),
				    nul = _methods2.default.isNull(this.$),
				    o = array ? [] : nul ? null : {};
	
				for (var key in object) {
					if (object.hasOwnProperty(key)) {
						var value = object[key];
						if (f(value, array ? Number(key) : key, object)) {
							o[key] = value;
						}
					}
				}
	
				// FIXME: return respective wrap (not D(o)!!!)
				return new Object(o);
			}
		}, {
			key: 'find',
			value: function find(f) {
				(0, _libs.validate)([f], { 0: 'function' });
	
				var object = this.$ || {},
				    array = _methods2.default.isArrayAlike(object);
	
				for (var key in object) {
					if (object.hasOwnProperty(key)) {
						var value = object[key];
						if (f(value, array ? Number(key) : key, object)) {
							return { key: key, value: value };
						}
					}
				}
	
				return null;
			}
		}, {
			key: 'forEach',
			value: function forEach() {
				var f = arguments.length <= 0 || arguments[0] === undefined ? Boolean : arguments[0];
	
				(0, _libs.validate)([f], { 0: 'function' });
	
				var object = this.$ || {},
				    array = _methods2.default.isArrayAlike(object);
	
				for (var key in object) {
					if (object.hasOwnProperty(key)) {
						f(object[key], array ? Number(key) : key, object);
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
	
				(0, _libs.validate)([property], { 0: 'object' });
	
				var object = this.$;
	
				property = transform(property);
	
				if (_methods2.default.isObject(this.$)) {
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
				if (!_methods2.default.isObject(this.$)) {
					return false;
				}
	
				return key in this.$;
			}
		}, {
			key: 'hasOwn',
			value: function hasOwn(key) {
				if (!_methods2.default.isObject(this.$)) {
					return false;
				}
	
				return this.$.hasOwnProperty(key);
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
	
				(0, _libs.validate)([f], { 0: 'function||!' });
	
				return JSON.stringify(this.$, function (key, value) {
					value = transform(value);
	
					return f ? f.apply(null, arguments) : value;
				}, indent);
			}
		}, {
			key: 'keyOf',
			value: function keyOf(value) {
				var object = this.$ || {};
	
				for (var key in object) {
					if (object.hasOwnProperty(key)) {
						if (object[key] == value || _methods2.default.isNaN(object[key]) && _methods2.default.isNaN(o[key])) {
							return key;
						}
					}
				}
	
				return null;
			}
		}, {
			key: 'keyOfStrict',
			value: function keyOfStrict(value) {
				var object = this.$ || {};
	
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
				if (!_methods2.default.isObject(this.$)) {
					return new _2.default.Array();
				}
	
				return new _2.default.Array(NativeObject.keys(this.$));
			}
		}, {
			key: 'log',
			value: function log() {
				var method = arguments.length <= 0 || arguments[0] === undefined ? 'log' : arguments[0];
	
				console[method](this.$);
				return this;
			}
		}, {
			key: 'map',
			value: function map(f) {
				(0, _libs.validate)([f], { 0: 'function' });
	
				var object = this.$ || {},
				    array = _methods2.default.isArrayAlike(object),
				    nul = _methods2.default.isNull(this.$),
				    o = array ? [] : nul ? null : {};
	
				for (var key in object) {
					if (object.hasOwnProperty(key)) {
						o[key] = f(object[key], key, object);
					}
				}
	
				// FIXME: return respective wrap (not D(o)!!!)
				return new Object(o);
			}
		}, {
			key: 'max',
			value: function max() {
				var f = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	
				(0, _libs.validate)([f], { 0: 'function||!' });
	
				var object = this.$ || {},
				    array = _methods2.default.isArrayAlike(object);
	
				var max = { key: null, value: -Infinity };
	
				for (var key in object) {
					if (object.hasOwnProperty(key)) {
						var value = object[key],
						    val = f ? f(value, array ? Number(key) : key, object) : value;
	
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
				var f = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	
				(0, _libs.validate)([f], { 0: 'function||!' });
	
				var object = this.$ || {},
				    array = _methods2.default.isArrayAlike(object);
	
				var min = { key: null, value: Infinity };
	
				for (var key in object) {
					if (object.hasOwnProperty(key)) {
						var value = object[key],
						    val = f ? f(value, array ? Number(key) : key, object) : value;
	
						if (val < min.value) {
							min = { key: key, value: value };
						}
					}
				}
	
				return min;
			}
		}, {
			key: 'object',
			value: function object(f) {
				(0, _libs.validate)([f], { 0: 'function' });
	
				var object = this.$ || {},
				    array = _methods2.default.isArrayAlike(object),
				    o = {};
	
				for (var key in object) {
					if (object.hasOwnProperty(key)) {
						var value = object[key];
	
						f(o, value, array ? Number(key) : key, object);
					}
				}
	
				return new Object(o);
			}
		}, {
			key: 'propertyDescriptor',
			value: function propertyDescriptor(key) {
				if (!_methods2.default.isObject(this.$)) {
					return;
				}
	
				return NativeObject.getOwnPropertyDescriptor(this.$, key);
			}
		}, {
			key: 'propertyNames',
			value: function propertyNames() {
				if (!_methods2.default.isObject(this.$)) {
					return new _2.default.Array();
				}
	
				return new _2.default.Array(NativeObject.getOwnPropertyNames(this.$));
			}
		}, {
			key: 'propertySymbols',
			value: function propertySymbols() {
				if (!_methods2.default.isObject(this.$)) {
					return new _2.default.Array();
				}
	
				return new _2.default.Array(NativeObject.getOwnPropertySymbols(this.$));
			}
		}, {
			key: 'proto',
			value: function proto(_proto) {
				if (arguments.length) {
					if (_methods2.default.isObject(this.$)) {
						NativeObject.setPrototypeOf(this.$, _proto);
					}
					return this;
				}
	
				if (!_methods2.default.isObject(this.$)) {
					return;
				}
	
				return NativeObject.getPrototypeOf(this.$);
			}
		}, {
			key: 'reduce',
			value: function reduce(f, IV) {
				(0, _libs.validate)([f], { 0: 'function' });
	
				var object = this.$ || {},
				    array = _methods2.default.isArrayAlike(object);
	
				var startKey = void 0;
	
				if (IV == null) {
					for (var key in object) {
						if (object.hasOwnProperty(key)) {
							startKey = key;
							IV = object[key];
							break;
						}
					}
				}
	
				for (var _key2 in object) {
					if (object.hasOwnProperty(_key2) && _key2 != startKey) {
						IV = f(IV, object[_key2], array ? Number(_key2) : _key2, object);
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
	
				(0, _libs.validate)([property], { 0: 'object' });
	
				property = transform(property);
	
				var object = this.$;
	
				if (_methods2.default.isObject(this.$)) {
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
				var f = arguments.length <= 0 || arguments[0] === undefined ? Boolean : arguments[0];
	
				(0, _libs.validate)([f], { 0: 'function' });
	
				var object = this.$ || {},
				    array = _methods2.default.isArrayAlike(object);
	
				for (var key in object) {
					if (object.hasOwnProperty(key)) {
						if (f(object[key], array ? Number(key) : key, object)) {
							return true;
						}
					}
				}
	
				return false;
			}
		}, {
			key: 'strictEquals',
			value: function strictEquals(o) {
				(0, _libs.validate)(arguments, { 0: '!!' });
	
				o = transform(o);
	
				return this.$ === o;
			}
		}, {
			key: 'sum',
			value: function sum() {
				var f = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	
				(0, _libs.validate)([f], { 0: 'function||!' });
	
				var object = this.$ || {},
				    array = _methods2.default.isArrayAlike(object);
	
				var sum = 0;
	
				for (var key in object) {
					if (object.hasOwnProperty(key)) {
						var value = object[key];
	
						sum += Number(f ? f(value, array ? Number(key) : key, object) : value);
					}
				}
	
				return sum;
			}
			// TODO: .typeof()
	
		}, {
			key: 'values',
			value: function values() {
				var object = this.$ || {},
				    array = [];
	
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
				var f = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	
				(0, _libs.validate)([f], { 0: 'function||!' });
	
				var object = this.$ || {},
				    array = _methods2.default.isArrayAlike(object);
	
				var word = '';
	
				for (var key in object) {
					if (object.hasOwnProperty(key)) {
						var value = object[key];
	
						word += String(f ? f(value, array ? Number(key) : key, object) : value);
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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _ = __webpack_require__(12);
	
	var _2 = _interopRequireDefault(_);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _2.default;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _ = __webpack_require__(2);
	
	var _2 = _interopRequireDefault(_);
	
	var _methods = __webpack_require__(8);
	
	var _methods2 = _interopRequireDefault(_methods);
	
	var _index = __webpack_require__(10);
	
	var _index2 = _interopRequireDefault(_index);
	
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
	
				_this.$[char] = char;
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
				return new _2.default.Array(Object.keys(this.$));
			}
		}, {
			key: 'contains',
			value: function contains(word) {
				word = (0, _index.transform)(word);
	
				(0, _libs.validate)([word], { 0: 'string' });
	
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
				(0, _libs.validate)([length], { 0: ['intAlike', '>0'] });
	
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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _ = __webpack_require__(14);
	
	var _2 = _interopRequireDefault(_);
	
	__webpack_require__(15);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _2.default;

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
	
	var _methods = __webpack_require__(8);
	
	var _methods2 = _interopRequireDefault(_methods);
	
	var _Object = __webpack_require__(10);
	
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
				return new _2.default.String(NativeArray.prototype.join.apply(this.$, arguments));
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
					(0, _libs.validate)([f], { 0: 'function' });
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
	
	function from(array) {
		var a = [];
		for (var i = 0, length = array.length; i < length; i++) {
			a.push(array[i]);
		}
	
		return a;
	}
	
	exports.default = cls;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _ = __webpack_require__(2);
	
	var _2 = _interopRequireDefault(_);
	
	var _methods = __webpack_require__(8);
	
	var _methods2 = _interopRequireDefault(_methods);
	
	var _Array = __webpack_require__(14);
	
	var _Array2 = _interopRequireDefault(_Array);
	
	var _libs = __webpack_require__(3);
	
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
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _ = __webpack_require__(17);
	
	var _2 = _interopRequireDefault(_);

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
	
	var _Object = __webpack_require__(10);
	
	var _Object2 = _interopRequireDefault(_Object);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var cls = function (_parent) {
		_inherits(Function, _parent);
	
		function Function() {
			var func = arguments.length <= 0 || arguments[0] === undefined ? function () {} : arguments[0];
	
			_classCallCheck(this, Function);
	
			return _possibleConstructorReturn(this, Object.getPrototypeOf(Function).call(this, func));
		}
	
		return Function;
	}(_Object2.default);
	
	_2.default.Function = cls;
	_2.default.constructors.unshift({
		check: _2.default.isFunction,
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
	
	var _methods = __webpack_require__(8);
	
	var _methods2 = _interopRequireDefault(_methods);
	
	var _css2 = __webpack_require__(20);
	
	var _css3 = _interopRequireDefault(_css2);
	
	var _elements = __webpack_require__(21);
	
	var _elements2 = _interopRequireDefault(_elements);
	
	var _children = __webpack_require__(22);
	
	var _children2 = _interopRequireDefault(_children);
	
	var _Object = __webpack_require__(10);
	
	var _Object2 = _interopRequireDefault(_Object);
	
	var _libs = __webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var cls = function (_parent) {
		_inherits(HtmlElement, _parent);
	
		function HtmlElement(elem) {
			_classCallCheck(this, HtmlElement);
	
			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(HtmlElement).call(this, elem));
	
			(0, _libs.defineProperties)(_this.$, { domcData: {} });
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
				this.$.appendChild(document.createTextNode(text));
	
				return this;
			}
		}, {
			key: 'apply',
			value: function apply() {
				var elem = this.$;
	
				for (var i = 0, length = arguments.length; i < length; i++) {
					if (!arguments[i]) {
						continue;
					}
	
					var split = arguments[i].split(/(\s+)/),
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
									cas.match(string, this, elem);
									continue top;
								}
							}
						}
	
						if (!applied) {
							elem.setAttribute(string, '');
							continue;
						}
	
						var text = applied.text = applied.text + string;
	
						cas = applied.cas;
	
						if (cas.regexp.test(text)) {
							cas.match(text, this, elem);
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
	
					return new _2.default.Object(o);
				}
	
				if (arguments.length <= 1 && _methods2.default.isString(_attr)) {
					return elem.getAttribute(_attr);
				}
	
				if (arguments.length >= 2) {
					_attr = _defineProperty({}, _attr, value);
				}
	
				_attr = (0, _Object.transform)(_attr);
	
				(0, _libs.validate)([_attr], { 0: 'object' });
	
				for (var key in _attr) {
					if (_attr.hasOwnProperty(key)) {
						elem.setAttribute(key, _attr[key]);
					}
				}
	
				return this;
			}
		}, {
			key: 'attrNS',
			value: function attrNS(ns, attr, value) {
				var elem = this.$;
	
				if (arguments.length <= 2 && _methods2.default.isString(attr)) {
					return elem.getAttributeNS(ns, attr);
				}
	
				if (arguments.length >= 3) {
					attr = _defineProperty({}, attr, value);
				}
	
				(0, _libs.validate)([attr], { 0: 'object' });
	
				attr = (0, _Object.transform)(attr);
	
				for (var key in attr) {
					if (attr.hasOwnProperty(key)) {
						elem.setAttributeNS(ns, key, attr[key]);
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
				element = find(element);
				this.$.appendChild(element);
	
				return htmlElement(element);
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
					return new _2.default.Array(elem.className.split(' '));
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
				console.log(type);
				var elem = this.$,
				    element = htmlElement(document.createElement(type));
	
				if (elem !== document) {
					elem.appendChild(element.$);
				}
	
				return element.apply.apply(strings);
			}
		}, {
			key: 'createNS',
			value: function createNS(ns, type) {
				var elem = this.$,
				    element = htmlElement(document.createElementNS(ns, type));
	
				if (elem !== document) {
					elem.appendChild(element.$);
				}
	
				for (var _len = arguments.length, strings = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
					strings[_key - 2] = arguments[_key];
				}
	
				return element.apply.apply(element, strings);
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
	
					return new _2.default.Object(o);
				}
	
				if (arguments.length <= 1 && _methods2.default.isString(property)) {
					return elem.style[property];
				}
	
				if (arguments.length >= 2) {
					property = _defineProperty({}, property, value);
				}
	
				property = (0, _Object.transform)(property);
	
				(0, _libs.validate)([property], { 0: 'object' });
	
				(0, _libs.assign)(elem.style, property);
	
				return this;
			}
		}, {
			key: 'dataset',
			value: function dataset() {
				return new _2.default.Object(this.$.dataset);
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
					this.$.setAttribute('disabled', '');
				} else {
					this.$.removeAttribute('disabled');
				}
	
				return this;
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
					this.$.setAttribute('contentEditable', '');
				} else {
					this.$.removeAttribute('contentEditable');
				}
	
				return this;
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
			key: 'hasAttrNS',
			value: function hasAttrNS(ns, attr) {
				return this.$.hasAttributeNS(ns, attr);
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
				this.$.style.textDecorationLine = 'text-through';
	
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
	
				var elem = this.$,
				    prev = attrs[attr];
	
				if (prev) {
					value = prev.getAttribute(attr);
					prev.removeAttribute(attr);
				}
	
				elem.setAttribute(attr, value);
				attrs[attr] = elem;
	
				return this;
			}
		}, {
			key: 'moveAttrNS',
			value: function moveAttrNS(ns, attr) {
				var value = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];
	
				var elem = this.$,
				    prev = attrs[attr];
	
				if (prev) {
					value = prev.getAttributeNS(ns, attr);
					prev.removeAttributeNS(ns, attr);
				}
	
				elem.setAttributeNS(ns, attr, value);
				attrs[attr] = elem;
	
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
			key: 'previous',
			value: function previous() {
				return htmlElement(this.$.previousElementSibling);
			}
			// TODO: .putAfter()
			// TODO: .putBefore()
	
		}, {
			key: 'ref',
			value: function ref(_ref) {
				var elem = this.$;
				var attr = void 0;
	
				switch (elem.tagName.toLowerCase()) {
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
					elem[attr] = _ref;
	
					return this;
				}
	
				return elem[_ref];
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
			key: 'removeAttrs',
			value: function removeAttrs() {
				for (var i = 0, length = arguments.length; i < length; i++) {
					this.$.removeAttribute(arguments[i]);
				}
	
				return this;
			}
		}, {
			key: 'removeAttrsNS',
			value: function removeAttrsNS(ns, attr) {
				for (var i = 0, length = arguments.length; i < length; i++) {
					this.$.removeAttributeNS(ns, arguments[i]);
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
			key: 'replace',
			value: function replace(element) {
				var elem = this.$;
	
				element = find((0, _Object.transform)(element));
				elem.parentElement.replaceChild(elem, element);
	
				return this;
			}
		}, {
			key: 'show',
			value: function show() {
				var elem = this.$;
	
				if (elem.style.display === 'hide') {
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
					_text = elem.appendChild(document.createTextNode(_text));
					elem.appendChild(_text);
	
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
				    cond = arguments.length < 2 ? elem.hasAttribute(attr) : condition;
	
				if (cond) {
					elem.setAttribute(attr, '');
				} else {
					elem.removeAttribute(attr);
				}
	
				return this;
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
			key: 'underline',
			value: function underline() {
				this.$.style.textDecorationLine = 'underline';
	
				return this;
			}
		}, {
			key: 'up',
			value: function up() {
				var n = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
	
				(0, _libs.validate)([n], { 0: ['intAlike', '>=0'] });
	
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
				return this.$.tagName.toLowerCase().toString();
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
			key: 'outerText',
			get: function get() {
				return this.$.outerText;
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
				return function (selector) {
					return htmlElement(this.$.closest(selector));
				};
			}
	
			return function (selector) {
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
		match: function match(string, wrap, elem) {
			elem.id = string.substring(2, string.length - 2);
		}
	}, {
		regexp: /^#/,
		match: function match(string, wrap, elem) {
			elem.id = string.substring(1);
		}
	}, {
		regexp: /^\./,
		match: function match(string, wrap, elem) {
			elem.classList.add(string.substring(1));
		}
	}, {
		regexp: /^<\-\-$/,
		match: function match(string, wrap, elem) {
			elem.style.float = 'left';
		}
	}, {
		regexp: /^\-\->$/,
		match: function match(string, wrap, elem) {
			elem.style.float = 'right';
		}
	}, {
		regexp: /^\->/,
		match: function match(string, wrap) {
			wrap.ref(string.substring(2));
		}
	}, {
		regexp: /^\-\./,
		match: function match(string, wrap, elem) {
			elem.classList.remove(string.substring(2));
		}
	}, {
		regexp: /^\-@/,
		match: function match(string, wrap, elem) {
			elem.style[string.substring(2)] = '';
		}
	}, {
		regexp: /^\-/,
		match: function match(string, wrap, elem) {
			elem.removeAttribute(string.substring(1));
		}
	}, {
		test: /^=>(\(|"|'|`)/,
		regexp: /^=>(\([\s\S]+\)|"[\s\S]+"|'[\s\S]+'|`[\s\S]+`)$/,
		match: function match(string, wrap) {
			wrap.into(string.substring(3, string.length - 2));
		}
	}, {
		regexp: /^=>\./,
		match: function match(string, wrap) {
			wrap.moveClass(string.substring(3));
		}
	}, {
		regexp: /^=>/,
		match: function match(string, wrap) {
			wrap.moveAttr(string.substring(2));
		}
	}, {
		regexp: /^~\./,
		match: function match(string, wrap) {
			wrap.toggleClass(string.substring(2));
		}
	}, {
		regexp: /^~/,
		match: function match(string, wrap) {
			wrap.toggleAttr(string.substring(1));
		}
	}, {
		test: /^\*(\(|"|'|`)/,
		regexp: /^\*(\([\s\S]+\)|"[\s\S]+"|'[\s\S]+'|`[\s\S]+`)\*$/,
		match: function match(string, wrap) {
			wrap.text(string.substring(2, string.length - 2));
		}
	}, {
		test: /^\+\*(\(|"|'|`)/,
		regexp: /^\+\*(\([\s\S]+\)|"[\s\S]+"|'[\s\S]+'|`[\s\S]+`)\*$/,
		match: function match(string, wrap) {
			wrap.addText(string.substring(3, string.length - 2));
		}
	}, {
		regexp: /^\+\*[\s\S]+\*$/,
		match: function match(string, wrap) {
			wrap.addText(string.substring(2, string.length - 1));
		}
	}, {
		regexp: /^\*[\s\S]+\*$/,
		match: function match(string, wrap) {
			wrap.text(string.substring(1, string.length - 1));
		}
	}, {
		test: /^>(\(|"|'|`)/,
		regexp: /^>(\([\s\S]+\)|"[\s\S]+"|'[\s\S]+'|`[\s\S]+`)<$/,
		match: function match(string, wrap) {
			wrap.html(string.substring(2, string.length - 2));
		}
	}, {
		test: /^\+>(\(|"|'|`)/,
		regexp: /^\+>(\([\s\S]+\)|"[\s\S]+"|'[\s\S]+'|`[\s\S]+`)<$/,
		match: function match(string, wrap) {
			wrap.addHtml(string.substring(3, string.length - 2));
		}
	}, {
		regexp: /^\+>[\s\S]+<$/,
		match: function match(string, wrap) {
			wrap.addHtml(string.substring(2, string.length - 1));
		}
	}, {
		regexp: /^>[\s\S]+<$/,
		match: function match(string, wrap) {
			wrap.html(string.substring(1, string.length - 1));
		}
	}, {
		regexp: /^\$/,
		match: function match(string, wrap, elem) {
			switch (string.substring(1)) {
				case 'a':
					return elem.style.position = 'absolute';
				case 'b':
					return elem.style.fontWeight = 'bold';
				case 'c':
					return elem.style.textAlign = 'center';
				case 'f':
					return elem.style.position = 'fixed';
				case 'h':
					return wrap.hide();
				case 'i':
					return elem.style.fontStyle = 'italic';
				case 'r':
					return elem.style.position = 'relative';
				case 's':
					return wrap.show();
				case 't':
					return elem.style.opacity = 0;
				case 'u':
					return elem.style.textDecorationLine = 'underline';
			}
		}
	}, {
		test: /^[^:]+:(\(|"|'|`)/,
		regexp: /^[^:]+:(\([\s\S]+\)|"[\s\S]+"|'[\s\S]+'|`[\s\S]+`)$/,
		match: function match(string, wrap) {
			var prop = new _2.default.String(string.match(/^[^:]+/)[0]).toCamelCase().$;
	
			wrap.css(prop, string.substring(prop.length + 2, string.length - 1));
		}
	}, {
		regexp: /^[^:]+:[\s\S]+$/,
		match: function match(string, wrap, elem) {
			var prop = new _2.default.String(string.match(/^[^:]+/)[0]).toCamelCase().$;
	
			wrap.css(prop, string.substring(prop.length + 1));
		}
	}, {
		test: /^[^=]+=(\(|"|'|`)/,
		regexp: /^[^=]+=(\([\s\S]+\)|"[\s\S]+"|'[\s\S]+'|`[\s\S]+`)$/,
		match: function match(string, wrap, elem) {
			var attr = string.match(/^[^=]+/)[0];
	
			elem.setAttribute(attr, string.substring(attr.length + 2, string.length - 1));
		}
	}, {
		regexp: /^[^=]+=[\s\S]+$/,
		match: function match(string, wrap, elem) {
			var attr = string.match(/^[^=]+/)[0];
	
			elem.setAttribute(attr, string.substring(attr.length + 1));
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
	
		return new children[elem.tagName.toLowerCase()]();
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
			return children[elementToCheck.tagName.toLowerCase()] || cls;
		}
	});
	
	exports.default = cls;

/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = ['alignContent', 'alignItems', 'alignSelf', 'animation', 'animationDelay', 'animationDirection', 'animationDuration', 'animationFillMode', 'animationIterationCount', 'animationName', 'animationPlayState', 'animationTimingFunction', 'backfaceVisibility', 'background', 'backgroundAttachment', 'backgroundBlendMode', 'backgroundClip', 'backgroundColor', 'backgroundImage', 'backgroundOrigin', 'backgroundPosition', 'backgroundRepeat', 'backgroundSize', 'border', 'borderBottom', 'borderBottomColor', 'borderBottomLeftRadius', 'borderBottomRightRadius', 'borderBottomStyle', 'borderBottomWidth', 'borderCollapse', 'borderColor', 'borderImage', 'borderImageOutSet', 'borderImageRepeat', 'borderImageSlice', 'borderImageSource', 'borderImageWidth', 'borderLeft', 'borderLeftColor', 'borderLeftStyle', 'borderLeftWidth', 'borderRadius', 'borderRight', 'borderRightColor', 'borderRightStyle', 'borderRightWidth', 'borderSpacing', 'borderStyle', 'borderTop', 'borderTopColor', 'borderTopLeftRadius', 'borderTopRightRadius', 'borderTopStyle', 'borderTopWidth', 'borderWidth', 'bottom', 'boxDecorationBreak', 'boxShadow', 'boxSizing', 'breakAfter', 'breakBefore', 'breakInside', 'captionSide', 'clear', 'clip', 'color', 'columnCount', 'columnFill', 'columnGap', 'columnRule', 'columnRuleColor', 'columnRuleStyle', 'columnRuleWidth', 'columnSpan', 'columnWidth', 'columns', 'counterIncrement', 'counterReset', 'cursor', 'direction', 'display', 'emptyCells', 'filter', 'flex', 'flexBasis', 'flexDirection', 'flexFlow', 'flexGrow', 'flexShrink', 'flexWrap', 'float', 'font', 'fontFamily', 'fontFeatureSettings', 'fontKerning', 'fontLanguageOverride', 'fontSize', 'fontSizeAdjust', 'fontStretch', 'fontStyle', 'fontSynthesis', 'fontVariant', 'fontVariantAlternates', 'fontVariantCaps', 'fontVariantEastAsian', 'fontVariantLigatures', 'fontVariantNumeric', 'fontVariantPosition', 'fontWeight', 'hangingPunctuation', 'height', 'hyphens', 'imageOrientation', 'imageRendering', 'imageResolution', 'imeMode', 'justifyContent', 'left', 'letterSpacing', 'lineBreak', 'lineHeight', 'listStyle', 'listStyleImage', 'listStylePosition', 'listStyleType', 'margin', 'marginBottom', 'marginLeft', 'marginRight', 'marginTop', 'markAfter', 'markBefore', 'marks', 'marqueeDirection', 'marqueePlayCount', 'marqueeSpeed', 'marqueeStyle', 'mask', 'maskType', 'maxHeight', 'maxWidth', 'minHeight', 'minWidth', 'navDown', 'navIndex', 'navLeft', 'navRight', 'navUp', 'objectFit', 'objectPosition', 'opacity', 'order', 'orphans', 'outline', 'outlineColor', 'outlineOffset', 'outlineStyle', 'outlineWidth', 'overflow', 'overflowWrap', 'overflowX', 'overflowY', 'padding', 'paddingBottom', 'paddingLeft', 'paddingRight', 'paddingTop', 'pageBreakAfter', 'pageBreakBefore', 'pageBreakInside', 'perspective', 'perspectiveOrigin', 'phonemes', 'position', 'quotes', 'resize', 'rest', 'restAfter', 'restBefore', 'right', 'tabSize', 'tableLayout', 'textAlign', 'textAlignLast', 'textCombineUpright', 'textDecoration', 'textDecorationColor', 'textDecorationLine', 'textDecorationStyle', 'textIndent', 'textJustify', 'textOrientation', 'textOverflow', 'textShadow', 'textTransform', 'textUnderlinePosition', 'top', 'transform', 'transformOrigin', 'transformStyle', 'transition', 'transitionDelay', 'transitionDuration', 'transitionProperty', 'transitionTimingFunction', 'unicodeBidi', 'verticalAlign', 'visibility', 'voiceBalance', 'voiceDuration', 'voicePitch', 'voicePitchRange', 'voiceRate', 'voiceStress', 'voiceVolume', 'whiteSpace', 'widows', 'width', 'wordBreak', 'wordSpacing', 'wordWrap', 'writingMode', 'zIndex'];

/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = ['a', 'abbr', 'address', 'area', 'article', 'audio', 'b', 'base', 'bdi', 'bdo', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'content', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'element', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'input', 'ins', 'kbd', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'menu', 'menuitem', 'meta', 'meter', 'nav', 'noscript', 'null', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'pre', 'progress', 'q', 'rp', 'rt', 'rtc', 'ruby', 's', 'samp', 'script', 'section', 'select', 'shadow', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr'];

/***/ },
/* 22 */
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
			input: function (_cls53) {
				_inherits(Input, _cls53);
	
				function Input() {
					_classCallCheck(this, Input);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Input).apply(this, arguments));
				}
	
				return Input;
			}(cls),
			ins: function (_cls54) {
				_inherits(Ins, _cls54);
	
				function Ins() {
					_classCallCheck(this, Ins);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Ins).apply(this, arguments));
				}
	
				return Ins;
			}(cls),
			kbd: function (_cls55) {
				_inherits(Kbd, _cls55);
	
				function Kbd() {
					_classCallCheck(this, Kbd);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Kbd).apply(this, arguments));
				}
	
				return Kbd;
			}(cls),
			label: function (_cls56) {
				_inherits(Label, _cls56);
	
				function Label() {
					_classCallCheck(this, Label);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Label).apply(this, arguments));
				}
	
				return Label;
			}(cls),
			legend: function (_cls57) {
				_inherits(Legend, _cls57);
	
				function Legend() {
					_classCallCheck(this, Legend);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Legend).apply(this, arguments));
				}
	
				return Legend;
			}(cls),
			li: function (_cls58) {
				_inherits(Li, _cls58);
	
				function Li() {
					_classCallCheck(this, Li);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Li).apply(this, arguments));
				}
	
				return Li;
			}(cls),
			link: function (_cls59) {
				_inherits(Link, _cls59);
	
				function Link() {
					_classCallCheck(this, Link);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Link).apply(this, arguments));
				}
	
				return Link;
			}(cls),
			main: function (_cls60) {
				_inherits(Main, _cls60);
	
				function Main() {
					_classCallCheck(this, Main);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Main).apply(this, arguments));
				}
	
				return Main;
			}(cls),
			map: function (_cls61) {
				_inherits(Map, _cls61);
	
				function Map() {
					_classCallCheck(this, Map);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Map).apply(this, arguments));
				}
	
				return Map;
			}(cls),
			mark: function (_cls62) {
				_inherits(Mark, _cls62);
	
				function Mark() {
					_classCallCheck(this, Mark);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Mark).apply(this, arguments));
				}
	
				return Mark;
			}(cls),
			menu: function (_cls63) {
				_inherits(Menu, _cls63);
	
				function Menu() {
					_classCallCheck(this, Menu);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Menu).apply(this, arguments));
				}
	
				return Menu;
			}(cls),
			menuitem: function (_cls64) {
				_inherits(MenuItem, _cls64);
	
				function MenuItem() {
					_classCallCheck(this, MenuItem);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(MenuItem).apply(this, arguments));
				}
	
				return MenuItem;
			}(cls),
			meta: function (_cls65) {
				_inherits(Meta, _cls65);
	
				function Meta() {
					_classCallCheck(this, Meta);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Meta).apply(this, arguments));
				}
	
				return Meta;
			}(cls),
			meter: function (_cls66) {
				_inherits(Meter, _cls66);
	
				function Meter() {
					_classCallCheck(this, Meter);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Meter).apply(this, arguments));
				}
	
				return Meter;
			}(cls),
			nav: function (_cls67) {
				_inherits(Nav, _cls67);
	
				function Nav() {
					_classCallCheck(this, Nav);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Nav).apply(this, arguments));
				}
	
				return Nav;
			}(cls),
			noscript: function (_cls68) {
				_inherits(NoScript, _cls68);
	
				function NoScript() {
					_classCallCheck(this, NoScript);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(NoScript).apply(this, arguments));
				}
	
				return NoScript;
			}(cls),
			null: function (_cls69) {
				_inherits(Null, _cls69);
	
				function Null() {
					_classCallCheck(this, Null);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Null).apply(this, arguments));
				}
	
				return Null;
			}(cls),
			object: function (_cls70) {
				_inherits(Object, _cls70);
	
				function Object() {
					_classCallCheck(this, Object);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Object).apply(this, arguments));
				}
	
				return Object;
			}(cls),
			ol: function (_cls71) {
				_inherits(Ol, _cls71);
	
				function Ol() {
					_classCallCheck(this, Ol);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Ol).apply(this, arguments));
				}
	
				return Ol;
			}(cls),
			optgroup: function (_cls72) {
				_inherits(OptGroup, _cls72);
	
				function OptGroup() {
					_classCallCheck(this, OptGroup);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(OptGroup).apply(this, arguments));
				}
	
				return OptGroup;
			}(cls),
			option: function (_cls73) {
				_inherits(Option, _cls73);
	
				function Option() {
					_classCallCheck(this, Option);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Option).apply(this, arguments));
				}
	
				return Option;
			}(cls),
			output: function (_cls74) {
				_inherits(Output, _cls74);
	
				function Output() {
					_classCallCheck(this, Output);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Output).apply(this, arguments));
				}
	
				return Output;
			}(cls),
			p: function (_cls75) {
				_inherits(P, _cls75);
	
				function P() {
					_classCallCheck(this, P);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(P).apply(this, arguments));
				}
	
				return P;
			}(cls),
			param: function (_cls76) {
				_inherits(Param, _cls76);
	
				function Param() {
					_classCallCheck(this, Param);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Param).apply(this, arguments));
				}
	
				return Param;
			}(cls),
			pre: function (_cls77) {
				_inherits(Pre, _cls77);
	
				function Pre() {
					_classCallCheck(this, Pre);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Pre).apply(this, arguments));
				}
	
				return Pre;
			}(cls),
			progress: function (_cls78) {
				_inherits(Progress, _cls78);
	
				function Progress() {
					_classCallCheck(this, Progress);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Progress).apply(this, arguments));
				}
	
				return Progress;
			}(cls),
			q: function (_cls79) {
				_inherits(Quote, _cls79);
	
				function Quote() {
					_classCallCheck(this, Quote);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Quote).apply(this, arguments));
				}
	
				return Quote;
			}(cls),
			rp: function (_cls80) {
				_inherits(Rp, _cls80);
	
				function Rp() {
					_classCallCheck(this, Rp);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Rp).apply(this, arguments));
				}
	
				return Rp;
			}(cls),
			rt: function (_cls81) {
				_inherits(Rt, _cls81);
	
				function Rt() {
					_classCallCheck(this, Rt);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Rt).apply(this, arguments));
				}
	
				return Rt;
			}(cls),
			rtc: function (_cls82) {
				_inherits(Rtc, _cls82);
	
				function Rtc() {
					_classCallCheck(this, Rtc);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Rtc).apply(this, arguments));
				}
	
				return Rtc;
			}(cls),
			ruby: function (_cls83) {
				_inherits(Ruby, _cls83);
	
				function Ruby() {
					_classCallCheck(this, Ruby);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Ruby).apply(this, arguments));
				}
	
				return Ruby;
			}(cls),
			s: function (_cls84) {
				_inherits(S, _cls84);
	
				function S() {
					_classCallCheck(this, S);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(S).apply(this, arguments));
				}
	
				return S;
			}(cls),
			samp: function (_cls85) {
				_inherits(Samp, _cls85);
	
				function Samp() {
					_classCallCheck(this, Samp);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Samp).apply(this, arguments));
				}
	
				return Samp;
			}(cls),
			script: function (_cls86) {
				_inherits(Script, _cls86);
	
				function Script() {
					_classCallCheck(this, Script);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Script).apply(this, arguments));
				}
	
				return Script;
			}(cls),
			section: function (_cls87) {
				_inherits(Section, _cls87);
	
				function Section() {
					_classCallCheck(this, Section);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Section).apply(this, arguments));
				}
	
				return Section;
			}(cls),
			select: function (_cls88) {
				_inherits(Select, _cls88);
	
				function Select() {
					_classCallCheck(this, Select);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Select).apply(this, arguments));
				}
	
				return Select;
			}(cls),
			shadow: function (_cls89) {
				_inherits(Shadow, _cls89);
	
				function Shadow() {
					_classCallCheck(this, Shadow);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Shadow).apply(this, arguments));
				}
	
				return Shadow;
			}(cls),
			small: function (_cls90) {
				_inherits(Small, _cls90);
	
				function Small() {
					_classCallCheck(this, Small);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Small).apply(this, arguments));
				}
	
				return Small;
			}(cls),
			source: function (_cls91) {
				_inherits(Source, _cls91);
	
				function Source() {
					_classCallCheck(this, Source);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Source).apply(this, arguments));
				}
	
				return Source;
			}(cls),
			span: function (_cls92) {
				_inherits(Span, _cls92);
	
				function Span() {
					_classCallCheck(this, Span);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Span).apply(this, arguments));
				}
	
				return Span;
			}(cls),
			strong: function (_cls93) {
				_inherits(Strong, _cls93);
	
				function Strong() {
					_classCallCheck(this, Strong);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Strong).apply(this, arguments));
				}
	
				return Strong;
			}(cls),
			style: function (_cls94) {
				_inherits(Style, _cls94);
	
				function Style() {
					_classCallCheck(this, Style);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Style).apply(this, arguments));
				}
	
				return Style;
			}(cls),
			sub: function (_cls95) {
				_inherits(Sub, _cls95);
	
				function Sub() {
					_classCallCheck(this, Sub);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Sub).apply(this, arguments));
				}
	
				return Sub;
			}(cls),
			summary: function (_cls96) {
				_inherits(Summary, _cls96);
	
				function Summary() {
					_classCallCheck(this, Summary);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Summary).apply(this, arguments));
				}
	
				return Summary;
			}(cls),
			sup: function (_cls97) {
				_inherits(Sup, _cls97);
	
				function Sup() {
					_classCallCheck(this, Sup);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Sup).apply(this, arguments));
				}
	
				return Sup;
			}(cls),
			table: function (_cls98) {
				_inherits(Table, _cls98);
	
				function Table() {
					_classCallCheck(this, Table);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Table).apply(this, arguments));
				}
	
				return Table;
			}(cls),
			tbody: function (_cls99) {
				_inherits(TBody, _cls99);
	
				function TBody() {
					_classCallCheck(this, TBody);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(TBody).apply(this, arguments));
				}
	
				return TBody;
			}(cls),
			td: function (_cls100) {
				_inherits(Td, _cls100);
	
				function Td() {
					_classCallCheck(this, Td);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Td).apply(this, arguments));
				}
	
				return Td;
			}(cls),
			template: function (_cls101) {
				_inherits(Template, _cls101);
	
				function Template() {
					_classCallCheck(this, Template);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Template).apply(this, arguments));
				}
	
				return Template;
			}(cls),
			textarea: function (_cls102) {
				_inherits(TextArea, _cls102);
	
				function TextArea() {
					_classCallCheck(this, TextArea);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(TextArea).apply(this, arguments));
				}
	
				return TextArea;
			}(cls),
			tfoot: function (_cls103) {
				_inherits(TFoot, _cls103);
	
				function TFoot() {
					_classCallCheck(this, TFoot);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(TFoot).apply(this, arguments));
				}
	
				return TFoot;
			}(cls),
			th: function (_cls104) {
				_inherits(Th, _cls104);
	
				function Th() {
					_classCallCheck(this, Th);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Th).apply(this, arguments));
				}
	
				return Th;
			}(cls),
			thead: function (_cls105) {
				_inherits(THead, _cls105);
	
				function THead() {
					_classCallCheck(this, THead);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(THead).apply(this, arguments));
				}
	
				return THead;
			}(cls),
			time: function (_cls106) {
				_inherits(Time, _cls106);
	
				function Time() {
					_classCallCheck(this, Time);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Time).apply(this, arguments));
				}
	
				return Time;
			}(cls),
			title: function (_cls107) {
				_inherits(Title, _cls107);
	
				function Title() {
					_classCallCheck(this, Title);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Title).apply(this, arguments));
				}
	
				return Title;
			}(cls),
			tr: function (_cls108) {
				_inherits(Tr, _cls108);
	
				function Tr() {
					_classCallCheck(this, Tr);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Tr).apply(this, arguments));
				}
	
				return Tr;
			}(cls),
			track: function (_cls109) {
				_inherits(Track, _cls109);
	
				function Track() {
					_classCallCheck(this, Track);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Track).apply(this, arguments));
				}
	
				return Track;
			}(cls),
			u: function (_cls110) {
				_inherits(U, _cls110);
	
				function U() {
					_classCallCheck(this, U);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(U).apply(this, arguments));
				}
	
				return U;
			}(cls),
			ul: function (_cls111) {
				_inherits(Ul, _cls111);
	
				function Ul() {
					_classCallCheck(this, Ul);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Ul).apply(this, arguments));
				}
	
				return Ul;
			}(cls),
			var: function (_cls112) {
				_inherits(Var, _cls112);
	
				function Var() {
					_classCallCheck(this, Var);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Var).apply(this, arguments));
				}
	
				return Var;
			}(cls),
			video: function (_cls113) {
				_inherits(Video, _cls113);
	
				function Video() {
					_classCallCheck(this, Video);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Video).apply(this, arguments));
				}
	
				return Video;
			}(cls),
			wbr: function (_cls114) {
				_inherits(Wbr, _cls114);
	
				function Wbr() {
					_classCallCheck(this, Wbr);
	
					return _possibleConstructorReturn(this, Object.getPrototypeOf(Wbr).apply(this, arguments));
				}
	
				return Wbr;
			}(cls)
		};
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _ = __webpack_require__(24);
	
	var _2 = _interopRequireDefault(_);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _2.default;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _ = __webpack_require__(2);
	
	var _2 = _interopRequireDefault(_);
	
	var _Object = __webpack_require__(10);
	
	var _Object2 = _interopRequireDefault(_Object);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var NativeNumber = Number;
	
	var cls = function (_parent) {
		_inherits(Number, _parent);
	
		function Number() {
			var number = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	
			_classCallCheck(this, Number);
	
			return _possibleConstructorReturn(this, Object.getPrototypeOf(Number).call(this, NativeNumber(number)));
		}
	
		// TODO: .array()
	
		// TODO: .cube()
	
		// TODO: .isFinite()
	
		// TODO: .isInteger()
	
		// TODO: .isNaN()
	
		// TODO: .interval()
	
		// TODO: .square()
	
		// TODO: .timeout()
	
		// TODO: .toDate()
	
		// TODO: Number.prototype.[methods]
	
		// TODO: Math.[methods]
	
	
		return Number;
	}(_Object2.default);
	
	_2.default.Number = cls;
	_2.default.constructors.unshift({
		check: _2.default.isNumber,
		cls: cls
	});
	
	exports.default = cls;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _ = __webpack_require__(26);
	
	var _2 = _interopRequireDefault(_);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _2.default;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _ = __webpack_require__(2);
	
	var _2 = _interopRequireDefault(_);
	
	var _methods = __webpack_require__(8);
	
	var _methods2 = _interopRequireDefault(_methods);
	
	var _Object = __webpack_require__(10);
	
	var _Object2 = _interopRequireDefault(_Object);
	
	var _libs = __webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var NativeString = String;
	
	var cls = function (_parent) {
		_inherits(String, _parent);
	
		function String() {
			var string = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	
			_classCallCheck(this, String);
	
			return _possibleConstructorReturn(this, Object.getPrototypeOf(String).call(this, NativeString(string)));
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
	
				return new _2.default.Alphabet(alphabet);
			}
			// TODO: .endsWith()
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
					return new _2.default.Array(match);
				}
	
				return new _2.default.Object(match);
			}
			// TODO: .parse(string('json' | 'html' | 'xml'?))
	
		}, {
			key: 'repeat',
			value: function repeat(n) {
				(0, _libs.validate)([n], { 0: ['intAlike', '>=0'] });
	
				n = Number(n);
	
				var string = this.$,
				    s = '';
	
				for (var i = 0; i < n; i++) {
					s += string;
				}
	
				return new String(s);
			}
		}, {
			key: 'replace',
			value: function replace(regexp) {
				var replacer = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
	
				return new String(this.$.replace(regexp, replacer));
			}
		}, {
			key: 'replaceString',
			value: function replaceString(string) {
				var replacer = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
	
				(0, _libs.validate)([string], { 0: 'string' });
	
				return new String(this.$.split(string).join(replacer));
			}
		}, {
			key: 'split',
			value: function split(delimiter) {
				return new _2.default.Array(this.$.split(delimiter));
			}
			// TODO: .startsWith()
			// TODO: .substring()
			// TODO: .substr()
	
		}, {
			key: 'toCamelCase',
			value: function toCamelCase() {
				return new String(this.$.replace(/( |-|_|\.)[^ \-_\.]/g, function (match) {
					return match[1].toUpperCase();
				}).replace(/\s+/g, ''));
			}
		}, {
			key: 'toDotCase',
			value: function toDotCase() {
				return new String(this.$.replace(/( |-|_)[^ \-_]/g, function (match) {
					return '.' + match[1].toLowerCase();
				}).replace(/\s+/g, '').replace(/^[\s\S]/, function (match) {
					return match.toLowerCase();
				}).replace(/[\s\S]/g, function (match) {
					if (match.toLowerCase() !== match) {
						return '.' + match.toLowerCase();
					}
	
					return match;
				}));
			}
		}, {
			key: 'toLowerCase',
			value: function toLowerCase() {
				return new String(this.$.toLowerCase());
			}
		}, {
			key: 'toSnakeCase',
			value: function toSnakeCase() {
				return new String(this.$.replace(/( |-|\.)[^ \-\.]/g, function (match) {
					return '_' + match[1].toLowerCase();
				}).replace(/\s+/g, '').replace(/^[\s\S]/, function (match) {
					return match.toLowerCase();
				}).replace(/[\s\S]/g, function (match) {
					if (match.toLowerCase() !== match) {
						return '_' + match.toLowerCase();
					}
	
					return match;
				}));
			}
		}, {
			key: 'toSpaceCase',
			value: function toSpaceCase() {
				return new String(this.$.replace(/^\s+/, '').replace(/\s+[\S]/g, function (match) {
					if (match.toLowerCase() !== match) {
						return match.substr(-1);
					}
	
					return match.substr(-2);
				}).replace(/(-|_|\.)[^\-_\.]/g, function (match) {
					return ' ' + match[1].toLowerCase();
				}).replace(/^[\s\S]/, function (match) {
					return match.toLowerCase();
				}).replace(/[\s\S]/g, function (match) {
					if (match.toLowerCase() !== match) {
						return ' ' + match.toLowerCase();
					}
	
					return match;
				}));
			}
		}, {
			key: 'toSpinalCase',
			value: function toSpinalCase() {
				return new String(this.$.replace(/( |_|\.)[^ \-_]/g, function (match) {
					return '-' + match[1].toLowerCase();
				}).replace(/\s+/g, '').replace(/^[\s\S]/, function (match) {
					return match.toLowerCase();
				}).replace(/[\s\S]/g, function (match) {
					if (match.toLowerCase() !== match) {
						return '-' + match.toLowerCase();
					}
	
					return match;
				}));
			}
		}, {
			key: 'toString',
			value: function toString() {
				return NativeString(this.$);
			}
		}, {
			key: 'toUpperCase',
			value: function toUpperCase() {
				return new String(this.$.toUpperCase());
			}
		}, {
			key: 'trim',
			value: function trim(side) {
				if (side === 'left') {
					return new String(this.$.replace(/^\s+/, ''));
				}
	
				if (side === 'right') {
					return new String(this.$.replace(/\s+$/, ''));
				}
	
				return new String(this.$.replace(/^\s+|\s+$/g, ''));
			}
		}]);
	
		return String;
	}(_Object2.default);
	
	_2.default.String = cls;
	_2.default.constructors.unshift({
		check: _methods2.default.isString,
		cls: cls
	});
	
	exports.default = cls;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map