(function (exports) {
'use strict';

/* eslint no-nested-ternary: 0 */
/* eslint no-negated-condition: 0 */
var global$1 = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function collectFromArray(array, callback) {
  var initialValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  iterateArray(array, function (value, index) {
    callback(initialValue, value, index, array);
  });

  return initialValue;
}

function findInArray(array, callback) {
  for (var i = 0, length = array.length; i < length; i++) {
    var value = array[i];

    if (callback(value, i, array)) {
      return {
        key: i,
        value: value
      };
    }
  }
}

function iterateArray(array, callback) {
  for (var i = 0, length = array.length; i < length; i++) {
    callback(array[i], i, array);
  }
}

function removeArrayElem(array, elem) {
  var index = array.indexOf(elem);

  if (index !== -1) {
    array.splice(index, 1);
  }
}

function toObjectKeys(array) {
  return collectFromArray(array, addKey);
}

function addKey(vars, variable) {
  vars[variable] = true;
}

var _ref$1 = {};
var has = _ref$1.hasOwnProperty;
var slice = [].slice;


function assign(target) {
  iterateArray(arguments, function (source, index) {
    if (index) {
      iterateObject(source, function (value, key) {
        target[key] = value;
      });
    }
  });

  return target;
}

function collectFromObject(object, callback) {
  var initialValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  iterateObject(object, function (value, key) {
    callback(initialValue, value, key, object);
  });

  return initialValue;
}

function except(object) {
  var newObject = {};
  var paths = slice.call(arguments, 1);

  iterateObject(object, function (value, key) {
    if (paths.indexOf(key) === -1) {
      newObject[key] = value;
    }
  });

  return newObject;
}

function hasOwnProperty(object, key) {
  return has.call(object, key);
}

function iterateObject(object, callback) {
  for (var key in object) {
    if (hasOwnProperty(object, key)) {
      callback(object[key], key, object);
    }
  }
}

function mapObject(object, callback) {
  var newObject = {};

  iterateObject(object, function (value, key) {
    newObject[key] = callback(value, key, object);
  });

  return newObject;
}

/**
 * @function defineProperties
 * @param {Object} target - Target to define properties for.
 * @param {Object} properties - Object with properties needed to be assign to the target.
 * @returns {void}
 * @description Function for defining properties of an object.
 */
var defineProperties = Object.defineProperties;
function definePrototypeProperties(target, properties) {
  iterateObject(properties, function (value, name) {
    Object.defineProperty(target, name, {
      value: value,
      writable: true,
      enumerable: false,
      configurable: true
    });
  });
}

/**
 * @function defineFrozenProperties
 * @param {Object} target - Target to define properties for.
 * @param {Object} properties - Object with properties needed to be assign to the target.
 * @returns {void}
 * @description Function for defining frozen properties of an object.
 */
function defineFrozenProperties(target, properties) {
  iterateObject(properties, function (value, name) {
    Object.defineProperty(target, name, {
      value: value,
      writable: false,
      enumerable: false,
      configurable: false
    });
  });
}

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

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
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









var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};





var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();













var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var _global$1 = global$1;
var _Symbol$1 = _global$1.Symbol;
var _ref = {};
var toString = _ref.toString;

/**
 * @function toStringTag
 * @param {*} object - Object to get toStringTag of.
 * @returns {String} Cut string.
 * @description Cut "Type" string from "[object Type]" string that gotten from {}.toString,call(object).
 */

function toStringTag(object) {
  return toString.call(object).slice(8, -1);
}

function setToStringTag(object, tag) {
  if (_Symbol$1 && _Symbol$1.toStringTag) {
    definePrototypeProperties(object.prototype, defineProperty({}, _Symbol$1.toStringTag, tag));
  }
}

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
var isArray = Array.isArray;

function isFunction(value) {
  return toStringTag(value) === 'Function' || typeof value === 'function';
}

/**
 * @function isNil
 * @public
 * @param {*} value - Value to check if it is null or undefined.
 * @returns {Boolean} If the argument is null or undefined or not.
 *
 * @example
 * isNil(null);      // true
 * isNil(undefined); // true
 * isNil(false);     // false
 */
function isNil(value) {
  /* eslint eqeqeq: 0 */
  return value == null;
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

var regexpSpecialCharacters = ['.', '+', '*', '?', '(', ')', '[', ']', '{', '}', '<', '>', '^', '$', '!', '=', ':', '-', '|', ',', '\\'];
var regexpSpecialsRegexp = new RegExp(regexpSpecialCharacters.map(function (s) {
  return '\\' + s;
}).join('|'), 'g');

function escapeRegex(string) {
  return string.replace(regexpSpecialsRegexp, '\\$&');
}

var create = Object.create;
var keys = Object.keys;
var getProto = Object.getPrototypeOf;
var setProto = Object.setPrototypeOf || function (target, proto) {
  /* eslint no-proto: 0 */
  target.__proto__ = proto;
};

var DASHED_SYMBOL_REGEX = /-[a-z]/g;
var UPPERCASED_SYMBOL_REGEX = /[A-Z]/g;

function toCamelCase(value) {
  return value.replace(DASHED_SYMBOL_REGEX, capitalize);
}

function toHyphenCase(value) {
  return value.replace(UPPERCASED_SYMBOL_REGEX, hyphenize);
}

function capitalize(match) {
  return match[1].toUpperCase();
}

function hyphenize(match) {
  return "-" + match[0].toLowerCase();
}

function addAttr(attrs, attr) {
  attrs[attr.name] = attr.value;
}

var CSS_PROP_VALUE_SEPARATOR_REGEX = /: /;

function addCSSProp(css, value) {
  if (value) {
    var property = value.split(CSS_PROP_VALUE_SEPARATOR_REGEX);

    css[toCamelCase(property[0])] = property[1];
  }
}

function addDataAttr(data, value, key) {
  data[key] = value;
}

function addNext(add, elem) {
  add(elem.nextSibling);
}

function addParent(add, elem) {
  add(elem.parentNode);
}

function addPrev(add, elem) {
  add(elem.previousSibling);
}

var HIDE_CLASS = '__dwayne-hidden__';
var SVG_NS = 'http://www.w3.org/2000/svg';
var D_REST_REGEX = /^d-rest(?:#|$)/;

var rootBlocks = create(null);
var rootMixins = create(null);
var Scope = {
  evalMode: false,
  gettingVars: []
};

function createHideStyleNode(head) {
  var style = head.find('style#' + HIDE_CLASS);

  if (style.length) {
    return;
  }

  head.create('style').prop('id', HIDE_CLASS).text('.' + HIDE_CLASS + '{display:none !important;}');
}

var X_LINK_ATTR_REGEX = /^xlink:\w/;
var XML_NS = 'http://www.w3.org/2000/xmlns/';
var X_LINK_NS = 'http://www.w3.org/1999/xlink';

function getAttrNS(attr, elem) {
  if (attr === 'xmlns' || attr === 'xmlns:xlink') {
    return elem.nodeName === 'SVG' ? XML_NS : null;
  }

  if (X_LINK_ATTR_REGEX.test(attr)) {
    return new Elem(elem).closest('svg').length ? X_LINK_NS : null;
  }
}

function hide(elem) {
  createHideStyleNode(new Elem(elem.ownerDocument.head));
  new Elem(elem).addClass(HIDE_CLASS);
}

function isElem(value) {
  return value instanceof Elem;
}

var HTML_COLLECTION_REGEX = /^(HTMLCollection|NodeList)$/;

function isElementsCollection(value) {
  return HTML_COLLECTION_REGEX.test(toStringTag(value)) || isElem(value) || isArray(value);
}

function isHTMLDocument(value) {
  return toStringTag(value) === 'HTMLDocument';
}

var ELEMENT_REGEX = /Element$/;

function isValidNode(value) {
  var tag = toStringTag(value);

  return ELEMENT_REGEX.test(tag) || tag === 'HTMLDocument' || tag === 'Text' || tag === 'DocumentFragment' || tag === 'Comment';
}

function remove(elem) {
  var parent = elem.parentNode;

  if (parent) {
    parent.removeChild(elem);
  }
}

function show(elem) {
  new Elem(elem).removeClass(HIDE_CLASS);
}

function toElem(elem) {
  return isElem(elem) ? elem : new Elem(elem);
}

var _global$2 = global$1;
var _global$document = _global$2.document;
var document = _global$document === undefined ? {} : _global$document;

/**
 * @function find
 * @public
 * @param {String} selector - Selector to find.
 * @param {Element|Node} [base = document] - Base to find in.
 * @returns {Elem} New instance of Elem.
 * @description Synonym for
 * [Document#querySelectorAll]{@link https://developer.mozilla.org/en/docs/Web/API/Document/querySelectorAll}.
 */

function find(selector) {
  var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

  return new Elem(base.querySelectorAll(String(selector)));
}

/**
 * @typedef {String} ElemEventString
 * @public
 * @description A string containing events separated by a comma with zero or more spaces or just spaces.
 */

/**
 * @callback ElemListener
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

/**
 * @callback IterationCallback
 * @public
 * @param {Element|Node} node - Iteration element.
 * @param {Number} index - Iteration index.
 * @param {Elem} elem - Initial set.
 */

var _global = global$1;
var _Symbol = _global.Symbol;

var EVENT_SEPARATOR_REGEX = /(?:,| ) */;
var CSS_STYLES_SEPARATOR_REGEX = /; ?/;
var CSS_IMPORTANT_REGEX = / ?!important$/;
var EVENT_REGEX = /Event$/;
var XHTML_NS = 'http://www.w3.org/1999/xhtml';
var emptyCollection = [];

/**
 * @class Elem
 * @extends Array
 * @public
 * @param {Element|Element[]} [elem = []] - An element or an array of elements to wrap.
 * @returns {Elem} Instance of Elem.
 * @description Wrap of an elements set.
 *
 * @example
 * new Elem(document.body);
 * new Elem(document.querySelectorAll('.cls'));
 * new Elem(document.getElementsByClassName('cls'));
 */

var Elem = function (_Array) {
  inherits(Elem, _Array);
  createClass(Elem, null, [{
    key: 'addMethods',
    value: function addMethods(property, value) {
      if (arguments.length >= 2) {
        property = defineProperty({}, property, value);
      }

      definePrototypeProperties(this.prototype, property);

      return this;
    }
  }]);

  function Elem() {
    var elem = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : emptyCollection;
    classCallCheck(this, Elem);

    var _this = possibleConstructorReturn(this, (Elem.__proto__ || Object.getPrototypeOf(Elem)).call(this));

    if (!isElementsCollection(elem)) {
      elem = [elem];
    }

    setProto(_this, Elem.prototype);

    iterateArray(elem, function (elem) {
      if (!isElementsCollection(elem)) {
        elem = [elem];
      }

      iterateArray(elem, function (elem) {
        if (!_this.includes(elem) && isValidNode(elem)) {
          _this.push(elem);
        }
      });
    });
    return _this;
  }

  /**
   * @method Elem#add
   * @public
   * @param {...(Elem|Element|Element[])} elements - Each argument is a Elem, or Element, or array of Elements.
   * @returns {Elem} Returns this.
   * @description Method for adding new elements to the set.
   *
   * @example
   * elem1.find('.cls1')
   *   .add(elem2.find('.cls2'))
   *   .hide();
   */


  createClass(Elem, [{
    key: 'add',
    value: function add() {
      var elems = this.slice();

      iterateArray(arguments, function (elem) {
        if (!isElementsCollection(elem)) {
          elem = [elem];
        }

        iterateArray(elem, function (elem) {
          if (!elems.includes(elem) && isValidNode(elem)) {
            elems.push(elem);
          }
        });
      });

      return elems;
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
      var _arguments = arguments;

      return this.forEach(function (elem) {
        var list = elem.classList;

        iterateArray(_arguments, function (cls) {
          return list.add(cls);
        });
      });
    }

    /**
     * @method Elem#attr
     * @public
     * @param {String|Object.<String, String>} [attr] - Name of the attribute to get or
     * an object of the format { [attrName]: value, ... } to set attributes.
     * @param {String} [value] - If the first argument is a string
     * it should be a value to set for that attribute.
     * @returns {Object|String|Elem} If no arguments passed, D-Wrap of attributes of the first element in the set
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
     * elem.attr();                  // { attr1: 'value3', attr2: 'value2' }
     */

  }, {
    key: 'attr',
    value: function attr(_attr, value) {
      var elem = this[0];

      if (!arguments.length) {
        if (!elem) {
          return {};
        }

        return collectFromObject(elem.attributes, addAttr);
      }

      if (arguments.length <= 1 && isString(_attr)) {
        if (!elem) {
          return null;
        }

        var ns = getAttrNS(_attr, elem);

        return ns ? elem.getAttributeNS(ns, _attr) : elem.getAttribute(_attr);
      }

      if (arguments.length >= 2) {
        _attr = defineProperty({}, _attr, value);
      }

      return this.forEach(function (elem) {
        iterateObject(_attr, function (value, key) {
          if (isNil(value) || value === false) {
            return new Elem(elem).removeAttr(key);
          }

          value = value === true ? '' : value;

          var ns = getAttrNS(key, elem);

          if (ns) {
            elem.setAttributeNS(ns, key, value);
          } else {
            elem.setAttribute(key, value);
          }
        });
      });
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
      return new Elem(this.length ? this[0].childNodes : []);
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
      return this.collect(function (add, elem) {
        while (elem) {
          if (new Elem(elem).is(selector)) {
            return add(elem);
          }

          elem = elem.parentNode;
        }
      });
    }
  }, {
    key: 'collect',
    value: function collect(callback) {
      var _this2 = this;

      var elements = [];
      var cb = elements.push.bind(elements);

      this.forEach(function (elem, index) {
        callback(cb, elem, index, _this2);
      });

      return new Elem(elements);
    }

    /**
     * @method Elem#contains
     * @public
     * @param {Elem|Element} element - Element to find out if it's within the first element in the set.
     * @returns {Boolean} Returns if the argument within this element.
     * @description Method is extension for
     * [Node#contains]{@link https://developer.mozilla.org/en/docs/Web/API/Node/contains}.
     *
     * @example
     * elem.contains(elem2);   // true|false
     */

  }, {
    key: 'contains',
    value: function contains(element) {
      var parent = this[0];
      var child = toElem(element)[0];

      return !parent || !child ? false : parent.contains(child);
    }

    /**
     * @method Elem#create
     * @public
     * @param {String} type - Type of created element. If type is "#text" a text node is created.
     * If type is "#comment" a comment node is created.
     * @returns {Elem} New instance of Elem - wrap of the created elements.
     * @description Method for creating elements inside this element.
     * If this element is not an Element the element is just created.
     *
     * @example
     * elem.create('div');
     */

  }, {
    key: 'create',
    value: function create$$1(type) {
      return this.collect(function (add, elem) {
        var el = null;
        var isText = type === '#text';
        var document = isHTMLDocument(elem) ? elem : elem.ownerDocument;

        if (isText || type === '#comment') {
          el = isText ? document.createTextNode('') : document.createComment('');
        } else {
          var ns = type === 'svg' ? SVG_NS : elem.namespaceURI || document.documentElement.namespaceURI || XHTML_NS;

          el = document.createElementNS(ns, type);
        }

        add(new Elem(el).into(elem));
      });
    }

    /**
     * @method Elem#createComment
     * @public
     * @param {String} text - Text of the comment.
     * @returns {Elem} New instance of Elem - wrap of the created comments.
     * @description Method for creating comments inside this element.
     * If this element is not an Element the comment is just created.
     *
     * @example
     * elem.createComment('comment');
     */

  }, {
    key: 'createComment',
    value: function createComment(text) {
      return this.create('#comment').text(text);
    }

    /**
     * @method Elem#createText
     * @public
     * @param {String} text - Text.
     * @returns {Elem} New instance of Elem - wrap of the created text nodes.
     * @description Method for creating text nodes inside this element.
     * If this element is not an Element the text node is just created.
     *
     * @example
     * elem.createText('text');
     */

  }, {
    key: 'createText',
    value: function createText(text) {
      return this.create('#text').text(text);
    }

    /**
     * @method Elem#css
     * @public
     * @param {String|Object.<String, String>} [property] - Name of the property to get or
     * an object of the format { [property]: value, ... } to set styles.
     * @param {String} [value] - If the first argument is a string it should be a value to set for that property.
     * @returns {Object|String|Elem} If no arguments passed, D-Wrap of css styles of the element returned,
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
     * elem.css();                  // { display: 'none', cursor: 'pointer' }
     */

  }, {
    key: 'css',
    value: function css(property, value) {
      var _ref = this[0] || {},
          style = _ref.style;

      if (!arguments.length) {
        if (!style) {
          return {};
        }

        return collectFromArray(style.cssText.split(CSS_STYLES_SEPARATOR_REGEX), addCSSProp);
      }

      if (arguments.length <= 1 && isString(property)) {
        if (!style) {
          return '';
        }

        property = toHyphenCase(property);

        return style.getPropertyValue(property) + (style.getPropertyPriority(property) ? ' !important' : '');
      }

      if (arguments.length >= 2) {
        property = defineProperty({}, property, value);
      }

      return this.forEach(function (elem) {
        iterateObject(property, function (value, property) {
          property = toHyphenCase(property);

          if (isNil(value) || value === false) {
            return new Elem(elem).removeCSS(property);
          }

          elem.style.removeProperty(property);
          elem.style.setProperty(property, value.replace(CSS_IMPORTANT_REGEX, ''), CSS_IMPORTANT_REGEX.test(value) ? 'important' : '');
        });
      });
    }

    /**
     * @method Elem#data
     * @public
     * @param {String|Object.<String, String>} [key] - Name of the data attribute (without data- prefix)
     * to get or an object of the format { [attrName]: value, ... } to set attributes.
     * @param {String} [value] - If the first argument is a string it should be a value to set for that attribute.
     * @returns {Object|String|Elem} If no arguments passed, D-Wrap of dataset of the element returned,
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
     * elem.data();                    // { someKey1: 'value3', someKey2: 'value2' }
     */

  }, {
    key: 'data',
    value: function data(key, value) {
      var _ref2 = this[0] || {},
          dataset = _ref2.dataset;

      if (!arguments.length) {
        if (!dataset) {
          return {};
        }

        return collectFromObject(dataset, addDataAttr);
      }

      if (arguments.length === 1 && isString(key)) {
        if (!dataset) {
          return;
        }

        return dataset[key];
      }

      if (arguments.length >= 2) {
        key = defineProperty({}, key, value);
      }

      return this.forEach(function (elem) {
        iterateObject(key, function (value, key) {
          elem.dataset[key] = value;
        });
      });
    }

    /**
     * @method Elem#dispatch
     * @public
     * @param {String|Event} event - Event or a string (new Event(event) is created).
     * @param {Object} [details = {}] - Object that is assigned to the event.
     * @returns {Elem} Returns this.
     * @see https://developer.mozilla.org/en/docs/Web/API/Event/Event
     * @description Synonym for
     * [EventTarget#dispatchEvent]{@link https://developer.mozilla.org/en/docs/Web/API/EventTarget/dispatchEvent}.
     *
     * @example
     * elem.dispatch('click');
     * elem.dispatch('click', { bubbles: false, cancellable: false, data: 1 });
     * elem.dispatch(new CustomEvent('custom-event'));
     */

  }, {
    key: 'dispatch',
    value: function dispatch(event) {
      var details = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var _ref3 = details || {},
          _ref3$bubbles = _ref3.bubbles,
          bubbles = _ref3$bubbles === undefined ? true : _ref3$bubbles,
          _ref3$cancelable = _ref3.cancelable,
          cancelable = _ref3$cancelable === undefined ? true : _ref3$cancelable,
          realDetails = objectWithoutProperties(_ref3, ['bubbles', 'cancelable']);

      var finalEvent = event;

      if (!EVENT_REGEX.test(toStringTag(finalEvent))) {
        try {
          finalEvent = new Event(finalEvent, { bubbles: bubbles, cancelable: cancelable });
          assign(finalEvent, realDetails);
        } catch (err) {}
      }

      return this.forEach(function (elem) {
        if (!EVENT_REGEX.test(toStringTag(finalEvent))) {
          var document = isHTMLDocument(elem) ? elem : elem.ownerDocument;

          finalEvent = document.createEvent('Event');
          finalEvent.initEvent(event, bubbles, cancelable);

          assign(finalEvent, realDetails);
        }

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
      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      if (index < 0) {
        index = this.length + index;
      }

      return new Elem(this[index]);
    }

    /**
     * @method Elem#filter
     * @public
     * @param {IterationCallback} [filterFn = Boolean] - Filter function
     * @returns {Elem} New instance of Elem.
     * @description Method for filtering elements.
     *
     * @example
     * elem.filter((elem) => new Elem(elem).closest('.parent'));
     */

  }, {
    key: 'filter',
    value: function filter() {
      var _this3 = this;

      var filterFn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Boolean;

      return this.collect(function (add, elem, index) {
        if (filterFn(elem, index, _this3)) {
          add(elem);
        }
      });
    }

    /**
     * @method Elem#find
     * @public
     * @param {String} selector - Selector to find.
     * @returns {Elem} New instance of Elem.
     * @description Synonym for
     * [Element#querySelectorAll]{@link https://developer.mozilla.org/en/docs/Web/API/Element/querySelectorAll}.
     */

  }, {
    key: 'find',
    value: function find$$1(selector) {
      return this.collect(function (add, elem) {
        add(find(selector, elem));
      });
    }

    /**
     * @method Elem#forEach
     * @public
     * @param {IterationCallback} callback - Called on each iteration.
     * @returns {Elem} Returns this.
     * @description Method for iterating over the set.
     *
     * @example
     * find('.cls').forEach((element, index, set) => {
     *   // do something
     * });
     */

  }, {
    key: 'forEach',
    value: function forEach(callback) {
      var _this4 = this;

      iterateArray(this, function (value, key) {
        callback(value, key, _this4);
      });

      return this;
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
      var elem = this[0];

      if (!elem) {
        return false;
      }

      var ns = getAttrNS(attr, elem);

      return ns ? elem.hasAttributeNS(ns, attr) : elem.hasAttribute(attr);
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
      var elem = this[0];

      return elem ? elem.classList.contains(cls) : false;
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
    value: function hide$$1() {
      return this.forEach(hide);
    }

    /**
     * @method Elem#html
     * @public
     * @param {String|*} [html] - HTML to write instead of current HTML.
     * @returns {Elem|String} If no arguments passed HTML of the first element in the set returned.
     * Otherwise all elements HTML in the set are set to the html argument.
     * @description Gets or sets HTML.
     *
     * @example
     * elem.html('<div>1</div>');
     * elem.html(); // '<div>1</div>'
     */

  }, {
    key: 'html',
    value: function html(_html) {
      if (!arguments.length) {
        var elem = this[0];

        return elem ? elem.innerHTML : '';
      }

      return this.forEach(function (elem) {
        elem.innerHTML = _html;
      });
    }
  }, {
    key: 'includes',
    value: function includes(elem) {
      return this.indexOf(elem) !== -1;
    }

    /**
     * @method Elem#insertAfter
     * @public
     * @param {Elem|Element} element - Element to insert this element after.
     * @returns {Elem} Returns this.
     * @description Puts the elements from the set after the element specified by the argument.
     * The elements remain in the same order.
     *
     * @example
     * elem.insertAfter(elem2);
     * elem.insertAfter(document.getElementById('id'));
     * elem.insertAfter('#id div.c1');
     */

  }, {
    key: 'insertAfter',
    value: function insertAfter(element) {
      element = toElem(element).elem(0);

      var parent = element.parent();

      if (!parent.length) {
        return this;
      }

      element = element.next()[0];
      parent = parent[0];

      return this.forEach(function (elem) {
        if (elem === element) {
          element = element.nextSibling;

          return;
        }

        if (element) {
          parent.insertBefore(elem, element);
        } else {
          parent.appendChild(elem);
        }
      });
    }

    /**
     * @method Elem#insertBefore
     * @public
     * @param {Elem|Element} element - Element to insert this element before.
     * @returns {Elem} Returns this.
     * @description Puts the elements from the set before the element specified by the argument.
     * The elements remain in the same order.
     *
     * @example
     * elem.insertBefore(elem2);
     * elem.insertBefore(document.getElementById('id'));
     * elem.insertBefore('#id div.c1');
     */

  }, {
    key: 'insertBefore',
    value: function insertBefore(element) {
      element = toElem(element).elem(0);

      var parent = element.parent();

      if (!parent.length) {
        return this;
      }

      element = element[0];
      parent = parent[0];

      return this.forEach(function (elem) {
        parent.insertBefore(elem, element);
      });
    }

    /**
     * @method Elem#into
     * @public
     * @param {Elem|Element} element - Element to put this elements into.
     * @param {Boolean} end - If the elements should be inserted to the end. If false they are inserted to the start.
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
      var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      element = toElem(element)[0];

      if (!element || isHTMLDocument(element)) {
        return this;
      }

      if (!end && element.firstChild) {
        for (var i = this.length - 1; i >= 0; i--) {
          element.insertBefore(this[i], element.firstChild);
        }

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
      if (!this.length) {
        return false;
      }

      var elem = this[0];
      var matches = elem.matches || elem.matchesSelector || elem.webkitMatchesSelector || elem.mozMatchesSelector || elem.msMatchesSelector || elem.oMatchesSelector;

      try {
        return matches.call(elem, selector);
      } catch (err) {
        console.error('Selector \'' + selector + '\' is not a valid selector (Elem#is)');

        return false;
      }
    }

    /**
     * @method Elem#name
     * @public
     * @returns {String|void} nodeName (lowercased) of the first element in the set.
     * @description Method for getting name of the first element in the set.
     *
     * @example
     * elem.create('div').name() // 'div'
     */

  }, {
    key: 'name',
    value: function name() {
      var elem = this[0];

      return elem && elem.nodeName ? elem.nodeName.toLowerCase() : undefined;
    }

    /**
     * @method Elem#next
     * @public
     * @returns {Elem} New instance of Elem.
     * @description Method for finding next element to each element in the set.
     *
     * @example
     * elem.next(); // finds next element to each element in the set
     */

  }, {
    key: 'next',
    value: function next() {
      return this.collect(addNext);
    }

    /**
     * @method Elem#on
     * @public
     * @param {ElemEventString|Object.<ElemEventString|ElemListener>} event - Either a {@link ElemEventString} string
     * or an object with event keys (a key is also ElemEventString) and listeners values.
     * @param {ElemListener} [listener] - If the first argument is a string it must be a listener function for
     * specified event(s).
     * @returns {ElemRemoveListeners} Function that takes optional event argument.
     * @description Adds event listeners for all the elements in the set.
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
     *     'blur': () => console.log('blur')
     *   },
     *   'input, select, textarea, datalist, keygen, output'
     * );
     *
     * const removeListeners = elem.on({
     *   'change, input': (e, elem, index) => console.log(elem.value),
     *   'blur': () => console.log('blur')
     * });
     *
     * removeListeners('click');
     * removeListeners('blur, change');
     * removeListeners('blur, change', 'input');
     * removeListeners();
     */

  }, {
    key: 'on',
    value: function on(event, listener) {
      if (isString(event)) {
        event = defineProperty({}, event, listener);
      }

      var newEvents = {};
      var allListeners = {};

      iterateObject(event, function (listener, event) {
        iterateArray(event.split(EVENT_SEPARATOR_REGEX), function (event) {
          (newEvents[event] = newEvents[event] || []).push(listener);
        });
      });

      this.forEach(function (elem) {
        iterateObject(newEvents, function (listeners, event) {
          iterateArray(listeners, function (listener) {
            elem.addEventListener(event, listener, false);
            (allListeners[event] = allListeners[event] || []).push(function () {
              elem.removeEventListener(event, listener);
            });
          });
        });
      });

      return function removeEventListeners(event) {
        if (arguments.length) {
          iterateArray(arguments, function (event) {
            iterateArray(event.split(EVENT_SEPARATOR_REGEX), function (event) {
              var removeListeners = allListeners[event];

              if (removeListeners) {
                iterateArray(removeListeners, function (removeListener) {
                  return removeListener();
                });

                delete allListeners[event];
              }
            });
          });
        } else {
          iterateObject(allListeners, function (removeListeners, event) {
            iterateArray(removeListeners, function (removeListener) {
              return removeListener();
            });

            delete allListeners[event];
          });
        }
      };
    }

    /**
     * @method Elem#parent
     * @public
     * @returns {Elem} New instance of Elem.
     * @description Method returns wrap of the set of the parent elements of each element in the set.
     */

  }, {
    key: 'parent',
    value: function parent() {
      return this.collect(addParent);
    }

    /**
     * @method Elem#prev
     * @public
     * @returns {Elem} New instance of Elem.
     * @description Method for finding previous element to each element in the set.
     *
     * @example
     * elem.prev(); // finds previous element to each element in the set
     */

  }, {
    key: 'prev',
    value: function prev() {
      return this.collect(addPrev);
    }

    /**
     * @method Elem#prop
     * @public
     * @param {String|Object.<String, *>} property - Either a string of a property or an assigned object.
     * @param {*} [value] - If a property parameter is a string
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
      if (arguments.length <= 1 && isString(property)) {
        return this[0] ? this[0][property] : undefined;
      }

      if (arguments.length >= 2) {
        property = defineProperty({}, property, value);
      }

      return this.forEach(function (elem) {
        iterateObject(property, function (value, prop) {
          elem[prop] = value;
        });
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
    value: function remove$$1() {
      return this.forEach(remove);
    }

    /**
     * @method Elem#removeAttr
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
      var _arguments2 = arguments;

      return this.forEach(function (elem) {
        iterateArray(_arguments2, function (attr) {
          var ns = getAttrNS(attr, elem);

          if (ns) {
            elem.removeAttributeNS(ns, attr);
          } else {
            elem.removeAttribute(attr);
          }
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
      var _arguments3 = arguments;

      return this.forEach(function (elem) {
        var list = elem.classList;

        iterateArray(_arguments3, function (cls) {
          return list.remove(cls);
        });
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
      var _arguments4 = arguments;

      return this.forEach(function (elem) {
        iterateArray(_arguments4, function (css) {
          elem.style.removeProperty(toHyphenCase(css));
        });
      });
    }

    /**
     * @method Elem#replace
     * @public
     * @param {Elem|Element} element - Element to replace the first element in the set
     * with a set of elements specified by the argument (Element or Elem).
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
      element = toElem(element);

      var first = this.elem(0);
      var parent = first.parent();

      if (!parent.length) {
        return this;
      }

      var elem = parent;
      var method = 'into';
      var next = first.next()[0];
      var prev = first.prev()[0];

      if (next) {
        elem = next;
        method = 'insertBefore';
      } else if (prev) {
        elem = prev;
        method = 'insertAfter';
      }

      first.remove();

      element[method](elem);
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
    value: function show$$1() {
      return this.forEach(show);
    }
  }, {
    key: 'slice',
    value: function slice() {
      return new Elem(get(Elem.prototype.__proto__ || Object.getPrototypeOf(Elem.prototype), 'slice', this).apply(this, arguments));
    }

    /**
     * @method Elem#text
     * @public
     * @param {String|*} [text] - Text to write instead of current text.
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
        return this.prop('textContent');
      }

      return this.forEach(function (elem) {
        elem.textContent = _text;
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
      var _arguments5 = arguments;

      return this.forEach(function (elem) {
        elem = new Elem(elem);

        if (_arguments5.length < 2 ? !elem.hasAttr(attr) : condition) {
          elem.attr(attr, '');
        } else {
          elem.removeAttr(attr);
        }
      });
    }

    /**
     * @method Elem#toggleClass
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
      var _arguments6 = arguments;

      return this.forEach(function (elem) {
        var classList = elem.classList;


        classList.toggle(cls, _arguments6.length < 2 ? !classList.contains(cls) : condition);
      });
    }
  }]);
  return Elem;
}(Array);

setToStringTag(Elem, 'Elem');

if (_Symbol && _Symbol.species) {
  defineProperties(Elem, defineProperty({}, _Symbol.species, {
    get: function get$$1() {
      return Array;
    }
  }));
}

function calculateArgs(args, argsObject) {
  iterateArray(keys(argsObject), function (arg) {
    if (!(arg in args)) {
      argsObject[arg] = undefined;
    }
  });

  /* eslint guard-for-in: 0 */
  for (var arg in args) {
    argsObject[arg] = args[arg];
  }
}

function cleanProperty(value, arg, object) {
  delete object[arg];
}

function constructMixinRegex(name) {
  return new RegExp('^' + escapeRegex(name) + '(?:\\(([^\\)]*)\\))?(?:#([\\s\\S]*))?$');
}

var COMMA_REGEX = /,/;

function mixinMatch(mixins, attr) {
  var match = void 0;

  /* eslint guard-for-in: 0 */
  for (var name in mixins) {
    var Mixin = mixins[name];
    var localMatch = attr.match(Mixin._match);

    if (localMatch) {
      var argsMatch = localMatch[1];
      var args = void 0;

      if (argsMatch === '') {
        args = [];
      } else if (argsMatch) {
        args = argsMatch.split(COMMA_REGEX);
      }

      match = {
        args: args,
        comment: localMatch[2],
        Mixin: Mixin,
        name: name
      };

      break;
    }
  }

  return match;
}

function transformRestAttrs(attrs, mixins, mixinDefaultOpts) {
  return collectFromObject(attrs, function (eventualAttrs, value, attr) {
    if (D_REST_REGEX.test(attr)) {
      return assign(eventualAttrs, transformRestAttrs(value, mixins, mixinDefaultOpts));
    }

    var match = mixinMatch(mixins, attr);

    if (match) {
      eventualAttrs[attr] = {
        type: 'mixin',
        dynamic: true,
        opts: _extends({
          value: value
        }, match, mixinDefaultOpts),
        value: value
      };

      return;
    }

    eventualAttrs[attr] = {
      type: 'attr',
      value: value
    };
  });
}

function transformRestArgs(args) {
  return collectFromObject(args, addArgs);
}

function addArgs(args, value, arg) {
  if (D_REST_REGEX.test(arg)) {
    assign(args, transformRestArgs(value));
  } else {
    args[arg] = value;
  }
}

function executeMixinWatchers(mixin, value) {
  var oldValue = mixin.$$.value;

  mixin.$$.value = value;

  iterateArray(mixin.$$.watchers, function (watcher) {
    watcher(value, oldValue);
  });
}

function createMixin(_ref) {
  var name = _ref.name,
      Mixin = _ref.Mixin,
      dynamic = _ref.dynamic,
      value = _ref.value,
      args = _ref.args,
      comment = _ref.comment,
      elem = _ref.elem,
      parentBlock = _ref.parentBlock,
      parentScope = _ref.parentScope,
      parentTemplate = _ref.parentTemplate;

  var mixin = new Mixin({
    name: name,
    value: value,
    dynamic: dynamic,
    args: args,
    comment: comment,
    elem: elem,
    parentBlock: parentBlock,
    parentScope: parentScope,
    parentTemplate: parentTemplate
  });

  if (Mixin.evaluate) {
    var _value = mixin.value = mixin.evaluate(function (newValue, oldValue) {
      mixin.value = newValue;

      try {
        mixin.afterUpdate(newValue, oldValue);
      } catch (err) {
        console.error("Uncaught error in " + name + "#afterUpdate:", err);
      }
    });

    mixin.afterUpdate(_value);
  }

  return mixin;
}

function calculateAttrs(attrs, attrsObject, elem, firstTime) {
  iterateObject(attrsObject, function (_ref, attr) {
    var type = _ref.type,
        value = _ref.value;

    if (!attrs[attr]) {
      if (type === 'attr') {
        elem.removeAttr(attr);
      } else {
        value.$$.remove();
      }

      delete attrsObject[attr];
    }
  });

  var mixins = [];

  /* eslint guard-for-in: 0 */

  var _loop = function _loop(attr) {
    var _attrs$attr = attrs[attr],
        type = _attrs$attr.type,
        dynamic = _attrs$attr.dynamic,
        value = _attrs$attr.value,
        opts = _attrs$attr.opts;

    var nextType = void 0;
    var nextDynamic = void 0;
    var nextValue = void 0;

    if (attrsObject[attr]) {
      var _attrsObject$attr = attrsObject[attr],
          prevType = _attrsObject$attr.type,
          prevValue = _attrsObject$attr.value;


      if (type === 'attr') {
        if (prevType === 'mixin') {
          prevValue.$$.remove();
        }

        if (prevValue !== value) {
          elem.attr(attr, value);
        }

        nextValue = value;
      } else {
        var mixin = prevValue;

        if (prevType === 'attr') {
          elem.removeAttr(attr);
        }

        mixin.$$.isDynamic = dynamic;

        if (dynamic) {
          executeMixinWatchers(mixin, value);
        } else if (!mixin.$$.evaluated && opts.Mixin.evaluate) {
          var newValue = mixin.$$.parentScope.$$.evaluate(value, function (newValue) {
            var _attrs$attr2 = attrs[attr],
                type = _attrs$attr2.type,
                dynamic = _attrs$attr2.dynamic;


            if (type === 'mixin' && !dynamic) {
              executeMixinWatchers(mixin, newValue);
            }
          }, mixin);

          mixin.$$.evaluated = true;

          executeMixinWatchers(mixin, newValue);
        }

        nextValue = mixin;
      }

      nextType = type;
      nextDynamic = dynamic;
    } else {
      if (type === 'attr') {
        elem.attr(attr, value);

        nextValue = value;
      } else {
        var buildMixin = function buildMixin() {
          opts.dynamic = dynamic;

          var mixin = createMixin(opts);

          if (!dynamic && opts.Mixin.evaluate) {
            var parentScope = opts.parentScope,
                _value = opts.value;

            var firstValue = parentScope.$$.evaluate(_value, function (newValue) {
              var _attrs$attr3 = attrs[attr],
                  type = _attrs$attr3.type,
                  dynamic = _attrs$attr3.dynamic;


              if (type === 'mixin' && !dynamic) {
                executeMixinWatchers(mixin, newValue);
              }
            }, mixin);

            mixin.$$.evaluated = true;
            mixin.$$.value = firstValue;
          }

          nextValue = mixin;

          return {
            attr: attr,
            opts: {
              type: type,
              dynamic: dynamic,
              value: mixin
            }
          };
        };

        if (firstTime) {
          mixins.push(buildMixin);
        } else {
          buildMixin();
        }
      }

      nextType = type;
      nextDynamic = dynamic;
    }

    attrsObject[attr] = {
      type: nextType,
      dynamic: nextDynamic,
      value: nextValue
    };
  };

  for (var attr in attrs) {
    _loop(attr);
  }

  if (firstTime) {
    return function () {
      iterateArray(mixins, function (buildMixin) {
        var _buildMixin = buildMixin(),
            attr = _buildMixin.attr,
            opts = _buildMixin.opts;

        attrsObject[attr] = opts;
      });
    };
  }
}

function constructPrivateScope(object, type, parentScope) {
  var scope = {};

  if (type === 'globals') {
    scope = create(parentScope ? parentScope.$$.globals : null);
  }

  return collectFromObject(object, function (scope, value, key) {
    scope[key] = {
      value: value,
      watchers: {
        temp: [],
        perm: []
      }
    };
  }, scope);
}

function removeTempWatcher(watcher) {
  watcher.onRemove();
  watcher();
}

function removeWatchers(watchersToRemove) {
  iterateArray(watchersToRemove, removeWatcher);
}

function removeWatcher(_ref) {
  var watcher = _ref.watcher,
      watchers = _ref.watchers;

  removeArrayElem(watchers, watcher);
}

var changed = void 0;

function constructPublicScope(scope, scopeValues, privateScope) {
  defineProperties(scope, mapObject(scopeValues, function (value, key) {
    var scope = privateScope[key];
    var watchers = scope.watchers;


    return {
      configurable: false,
      enumerable: true,
      get: function get() {
        if (Scope.evalMode) {
          if (Scope.gettingVars.indexOf(watchers.temp) === -1) {
            Scope.gettingVars.push(watchers.temp);
          }
        }

        return scope.value;
      },
      set: function set(value) {
        if (value === scope.value) {
          return;
        }

        if (!changed) {
          changed = [];
        }

        var oldTempWatchers = watchers.temp.slice();
        var oldValue = scope.value;

        watchers.temp = [];
        scope.value = value;

        iterateArray(oldTempWatchers, removeTempWatcher);
        changed.push({
          scope: scope,
          oldValue: oldValue,
          value: value
        });

        setTimeout(function () {
          if (!changed) {
            return;
          }

          var was = [];
          var values = [];

          var _loop = function _loop(i) {
            var _changed$i = changed[i],
                scope = _changed$i.scope,
                value = _changed$i.value,
                oldValue = _changed$i.oldValue;


            iterateArray(scope.watchers.perm, function (watcher) {
              var index = was.indexOf(watcher);

              if (index === -1) {
                was.push(watcher);
                values.push({
                  value: value,
                  oldValue: oldValue
                });
              } else {
                values[index].oldValue = oldValue;
              }
            });

            changed.splice(i, 1);
          };

          for (var i = changed.length - 1; i >= 0; i--) {
            _loop(i);
          }

          changed = null;

          iterateArray(was, function (watcher, i) {
            var _values$i = values[i],
                value = _values$i.value,
                oldValue = _values$i.oldValue;


            watcher(value, oldValue);
          });
        }, 0);
      }
    };
  }));
}

var NAMED_D_BLOCK_REGEX = /^d-block:([\s\S]+)$/;

function createBlock(_ref) {
  var node = _ref.node,
      Constructor = _ref.Constructor,
      parent = _ref.parent,
      parentElem = _ref.parentElem,
      parentBlock = _ref.parentBlock,
      parentScope = _ref.parentScope,
      parentTemplate = _ref.parentTemplate,
      prevBlock = _ref.prevBlock;

  var doc = new Elem(parentElem[0].ownerDocument);
  var elem = parentElem[0].namespaceURI === SVG_NS ? doc.create('svg') : doc;
  var localBlocks = parentTemplate ? parentTemplate.$$.ns._blocks : Block$1._blocks;
  var localMixins = parentTemplate ? parentTemplate.$$.ns._mixins : Block$1._mixins;
  var children = node.children = node.children || [];
  var args = node.attrs = node.attrs || {};
  var name = node.name || 'UnknownBlock';
  var constructor = Constructor || node.name && localBlocks[node.name];
  var dBlockMatch = void 0;
  var dBlockName = void 0;
  var dBlockArgs = void 0;
  var dBlockChildren = void 0;
  var dElementsName = void 0;
  var dElementsConstructor = void 0;

  if (name === 'd-block' && args.name) {
    name = 'd-elements';
    constructor = localBlocks[name];
    dElementsName = args.name;
    dBlockArgs = except(args, 'name');
    dBlockChildren = children;
    children = [];
    args = {};
  } else if (name === 'd-block' && args.Constructor) {
    name = 'UnknownBlock';
    constructor = localBlocks[name];
    dElementsConstructor = args.Constructor;
    dBlockArgs = except(args, 'Constructor');
    dBlockChildren = children;
    children = [];
    args = {};
  } else if ((dBlockMatch = name.match(NAMED_D_BLOCK_REGEX)) || name === 'd-block') {
    constructor = Block$1._blocks['d-block'];
    dBlockName = dBlockMatch ? dBlockMatch[1] : null;
  }

  var blockInstance = void 0;

  if (constructor) {
    try {
      blockInstance = new constructor({
        name: name,
        args: args,
        dBlockName: dBlockName,
        children: children,
        parent: parent,
        parentElem: parentElem,
        parentBlock: parentBlock,
        parentScope: parentScope,
        parentTemplate: parentTemplate,
        prevBlock: prevBlock
      });
    } catch (err) {
      console.error('Uncaught error in new ' + name + ':', err);
      constructor = null;
    }
  }

  if (!constructor) {
    var _node = node,
        value = _node.value,
        _children = _node.children;


    var element = elem.create(name);
    var currentAttrs = create(null);
    var attrs = create(null);
    var wasDRest = void 0;
    var mixinDefaultOpts = {
      elem: element,
      parentBlock: parentBlock,
      parentScope: parentScope,
      parentTemplate: parentTemplate
    };

    iterateObject(args, function (value, attr) {
      var isDRest = D_REST_REGEX.test(attr);
      var localAttrs = isDRest || wasDRest ? create(attrs) : attrs;

      attrs = localAttrs;

      if (isDRest) {
        var restAttrs = parentScope.$$.evaluate(value, function (value) {
          setTimeout(function () {
            iterateObject(localAttrs, cleanProperty);
            assign(localAttrs, transformRestAttrs(value, localMixins, mixinDefaultOpts));
            calculateAttrs(attrs, currentAttrs, element, false);
          }, 0);
        }, parentBlock);

        wasDRest = true;

        return assign(localAttrs, transformRestAttrs(restAttrs, localMixins, mixinDefaultOpts));
      }

      var match = mixinMatch(localMixins, attr);

      wasDRest = false;

      if (match) {
        if (value === true) {
          value = 'true';
        }

        localAttrs[attr] = {
          type: 'mixin',
          dynamic: false,
          opts: _extends({
            value: value
          }, match, mixinDefaultOpts),
          value: value
        };

        return;
      }

      localAttrs[attr] = {
        type: 'attr',
        value: parentScope.$$.evaluate(value, function (value) {
          localAttrs[attr] = {
            type: 'attr',
            value: value
          };
          calculateAttrs(attrs, currentAttrs, element, false);
        }, parentBlock)
      };
    });

    var createMixins = calculateAttrs(attrs, currentAttrs, element, true);

    if (name === '#comment') {
      element.text(value);
    }

    if (name === '#text') {
      var text = parentScope.$$.evaluate(value, function (value) {
        if (isNil(value)) {
          value = '';
        }

        element.text('' + value);
      }, parentBlock);

      if (isNil(text)) {
        text = '';
      }

      element.text('' + text);
    }

    if (_children) {
      var _parentElem = name === 'template' ? new Elem(element[0].content) : element;
      var _prevBlock = void 0;

      iterateArray(_children, function (child) {
        _prevBlock = createBlock({
          node: child,
          parent: _parentElem,
          parentElem: _parentElem,
          parentBlock: parentBlock,
          parentScope: parentScope,
          parentTemplate: parentTemplate,
          prevBlock: _prevBlock
        });
      });
    }

    var isParentBlock = parent instanceof Block$1;

    if (prevBlock instanceof Block$1) {
      prevBlock.$$.insertAfterIt(element, false);
    } else if (prevBlock) {
      element.insertAfter(prevBlock);

      if (isParentBlock) {
        parent.$$.addContent(element);
      }
    } else if (isParentBlock) {
      parent.$$.insertInStartOfIt(element, false);
    } else {
      element.into(parentElem, false);
    }

    createMixins();

    return element;
  }

  var _blockInstance = blockInstance,
      $$ = _blockInstance.$$,
      Args = _blockInstance.args,
      globals = _blockInstance.globals,
      locals = objectWithoutProperties(_blockInstance, ['$$', 'args', 'globals']);


  if (dElementsName) {
    node = {
      attrs: dBlockArgs,
      children: dBlockChildren
    };
    node.name = parentScope.$$.evaluate(dElementsName, function (newName) {
      node.name = newName;

      Args.value = [node];
    }, blockInstance, true);

    Args.value = [node];
    Args.parentScope = parentScope;
    Args.parentTemplate = parentTemplate;
  }

  if (dElementsConstructor) {
    node = {
      name: name,
      attrs: dBlockArgs,
      children: dBlockChildren
    };

    Args.Constructor = parentScope.$$.evaluate(dElementsConstructor, function (newConstructor) {
      Args.Constructor = newConstructor;
      Args.value = [node];
    }, blockInstance, true);
    Args.value = [node];
    Args.parentScope = parentScope;
    Args.parentTemplate = parentTemplate;
  }

  var html = name === 'd-elements' ? Args.value || [] : constructor._html;

  $$.args = constructPrivateScope(Args);
  $$.locals = constructPrivateScope(locals);
  $$.globals = constructPrivateScope(globals, 'globals', parentScope);

  if (name === '#d-item') {
    var _scopeValues;

    var scopeValues = (_scopeValues = {}, defineProperty(_scopeValues, node.itemName, node.item), defineProperty(_scopeValues, node.indexName, node.index), _scopeValues);
    var scope = parentScope.$$.name === '#d-item' ? parentScope.$$.scope : parentScope;

    $$.ns = parentScope.$$.ns;
    $$.privateScope = constructPrivateScope(scopeValues);
    constructPublicScope($$.scope = create(scope), scopeValues, $$.privateScope);
  }

  if (name === 'd-each') {
    var _create;

    $$.scope = create(parentScope.$$.name === '#d-item' ? parentScope.$$.scope : parentScope, (_create = {}, defineProperty(_create, Args.item || '$item', {
      value: null,
      writable: true
    }), defineProperty(_create, Args.index || '$index', {
      value: null,
      writable: true
    }), _create));
  }

  constructPublicScope(Args, Args, $$.args);
  constructPublicScope(globals, globals, $$.globals);
  constructPublicScope(blockInstance, locals, $$.locals);

  try {
    blockInstance.afterConstruct();
  } catch (err) {
    console.error('Uncaught error in ' + name + '#afterConstruct:', err);
  }

  prevBlock = undefined;
  parentScope = name === 'd-elements' ? Args.parentScope : blockInstance;
  parentTemplate = name === 'd-elements' ? Args.parentTemplate : blockInstance;

  iterateArray(html, function (child) {
    prevBlock = createBlock({
      node: child,
      parent: blockInstance,
      parentElem: parentElem,
      parentBlock: blockInstance,
      parentScope: parentScope,
      parentTemplate: parentTemplate,
      prevBlock: prevBlock
    });
  });

  blockInstance.$$.isRendered = true;

  try {
    blockInstance.afterRender();
  } catch (err) {
    console.error('Uncaught error in ' + name + '#afterRender:', err);
  }

  return blockInstance;
}

function extendBlock(cls) {
  setProto(cls, Block$1);
  setProto(cls.prototype, Block$1.prototype);
}

var _ref$2 = {};
var isPrototypeOf = _ref$2.isPrototypeOf;


function isInstanceOf(Class, Subclass) {
  var _context;

  return isPrototypeOf.call(Class, Subclass) && (_context = Class.prototype, isPrototypeOf).call(_context, Subclass.prototype);
}

function removeWithParentSignal(child) {
  child.$$.remove(true);
}

function remove$1(child) {
  child.$$.remove();
}

function watchForAllLocals(block, watcher) {
  iterateObject(block.$$.locals, function (_ref) {
    var watchers = _ref.watchers;

    watchers.perm.push(watcher);
  });
}

function watchForAllGlobals(block, watcher) {
  var _block$$$ = block.$$,
      globals = _block$$$.globals,
      watchersToRemove = _block$$$.watchersToRemove;


  for (var glob in globals) {
    /* eslint guard-for-in: 0 */
    var watchers = globals[glob].watchers.perm;

    watchers.push(watcher);
    watchersToRemove.push({
      watcher: watcher,
      watchers: watchers
    });
  }
}

function watchForAllArgs(block, watcher) {
  iterateObject(block.$$.args, function (_ref2) {
    var watchers = _ref2.watchers;

    watchers.perm.push(watcher);
  });
}

var Mixin$1 = function () {
  createClass(Mixin, null, [{
    key: 'wrap',


    /**
     * @method Mixin.wrap
     * @public
     * @param {...Wrapper} wrappers - Functions that return wrapped mixin.
     * @returns {typeof Mixin} New mixin.
     * @description Method for wrapping mixins.
     * It is considered best practice to just extends the old mixin with a new one.
     */
    value: function wrap() {
      for (var _len = arguments.length, wrappers = Array(_len), _key = 0; _key < _len; _key++) {
        wrappers[_key] = arguments[_key];
      }

      return wrappers.reduce(wrapMixin, this);
    }
  }]);

  function Mixin(opts) {
    var _this = this;

    classCallCheck(this, Mixin);
    var name = opts.name,
        value = opts.value,
        dynamic = opts.dynamic,
        elem = opts.elem,
        args = opts.args,
        comment = opts.comment,
        parentBlock = opts.parentBlock,
        parentScope = opts.parentScope,
        parentTemplate = opts.parentTemplate;

    var watchersToRemove = [];
    var watchers = [];

    defineFrozenProperties(this, {
      $$: {
        name: name,
        _value: value,
        value: value,
        isDynamic: dynamic,
        parentScope: parentScope,
        parentBlock: parentBlock,
        parentTemplate: parentTemplate,
        watchers: watchers,
        watchersToRemove: watchersToRemove,
        isRemoved: false,
        evaluate: function evaluate(watcher) {
          var _$$ = _this.$$,
              isDynamic = _$$.isDynamic,
              value = _$$.value,
              _value = _$$._value;

          var currentValue = isDynamic ? value : parentScope.$$.evaluate(_value);

          if (watcher) {
            watchers.push(watcher);
          }

          return currentValue;
        },
        remove: function remove$$1(isParentSignal) {
          _this.$$.isRemoved = true;

          removeWatchers(watchersToRemove);

          try {
            _this.beforeRemove();
          } catch (err) {
            console.error('Uncaught error in ' + name + '#beforeRemove:', err);
          }

          if (!isParentSignal && parentBlock) {
            removeArrayElem(parentBlock.$$.mixins, _this);
          }
        }
      }
    });

    /**
     * @member {String[]} [Mixin#args]
     * @type {String[]}
     * @public
     */
    this.args = args;

    /**
     * @member {String} [Mixin#comment]
     * @type {String}
     * @public
     */
    this.comment = comment;

    /**
     * @member {Block} [Mixin#parentBlock]
     * @type {Block}
     * @public
     */
    this.parentBlock = parentBlock;

    /**
     * @member {Block} [Mixin#parentScope]
     * @type {Block}
     * @public
     */
    this.parentScope = parentScope;

    /**
     * @member {Block} [Mixin#parentTemplate]
     * @type {Block}
     * @public
     */
    this.parentTemplate = parentTemplate;

    /**
     * @member {Elem} Mixin#elem
     * @type {Elem}
     * @public
     */
    this.elem = elem;

    /**
     * @member {Element} Mixin#node
     * @type {Element}
     * @public
     */
    this.node = elem[0];

    if (parentBlock) {
      parentBlock.$$.mixins.push(this);
    }
  }

  createClass(Mixin, [{
    key: 'afterUpdate',
    value: function afterUpdate() {}
  }, {
    key: 'beforeRemove',
    value: function beforeRemove() {}

    /**
     * @method Block#evaluate
     * @public
     * @param {Watcher} [callback] - If present, callback which is called when the mixin value is changed.
     * @returns {*} Evaluation result.
     * @description Method for evaluating the mixin value and watching for the changes.
     */

  }, {
    key: 'evaluate',
    value: function evaluate(callback) {
      return this.$$.evaluate(callback);
    }
  }]);
  return Mixin;
}();

Mixin$1.evaluate = true;


setToStringTag(Mixin$1, 'Mixin');

function wrapBlock(block, wrapper) {
  var returnValue = wrapper(block);

  return isInstanceOf(Block$1, returnValue) ? returnValue : block;
}

function wrapMixin(mixin, wrapper) {
  var returnValue = wrapper(mixin);

  return isInstanceOf(Mixin$1, returnValue) ? returnValue : mixin;
}

/**
 * @typedef {Error} EvaluationError
 * @public
 * @property {String} expression - Expression which has been evaluated with the error.
 * @property {Block} block - Block in context of which the expression has been evaluated with the error.
 */

/**
 * @callback Watcher
 * @public
 * @param {*} newValue - New value.
 * @param {*} oldValue - Old value.
 */

/**
 * @callback VarsWatcher
 * @public
 */

/**
 * @callback Wrapper
 * @public
 * @param {typeof Block|typeof Mixin} Block class to wrap.
 * @returns {typeof Block} New Block class.
 */

/**
 * @callback AfterUpdate
 * @public
 * @param {*} newValue - New value.
 * @param {*} oldValue - Old value.
 * @param {*} mixin - Mixin instance.
 */

/**
 * @callback BlockRegisterHook
 * @public
 * @param {Block} Block - Registering block.
 * @param {String} name - Block name.
 * @returns Return value is used for registering the block.
 * If Block subclass returned it's registered instead of the initial block, otherwise
 * the initial block is used.
 */

/**
 * @callback MixinRegisterHook
 * @public
 * @param {Block} Mixin - Registering mixin.
 * @param {String} name - Mixin name.
 * @returns Return value is used for registering the mixin.
 * If Mixin subclass returned it's registered instead of the initial mixin, otherwise
 * the initial mixin is used.
 */

var blockHooks = [];
var mixinHooks = [];
var TAG_NAME_REGEX = /^[a-z][a-z\d\-_.:!@#$%^&*()[\]{}='"\\]*$/i;
var ATTR_NAME_REGEX = /^[\u0000-\u0020\s'">/=]+$/;
var WATCHED_ARG_PREFIX_REGEX = /^args\./;
var WATCHED_GLOBAL_PREFIX_REGEX = /^globals\./;
var afterElem = new Elem();

/**
 * @class Block
 * @extends null
 * @public
 * @param {Object} opts - Element options.
 * @returns {Block} Instance of Block.
 * @description Class for dynamic templating.
 *
 * @example
 * import { D, Block, initApp } from 'dwayne';
 *
 * class App extends Block {
 *   static template = '<Hello text="{text}"/>';
 *
 *   constructor(opts) {
 *     super(opts);
 *
 *     this.text = 'world (0)';
 *     this.times = 0;
 *
 *     this.setInterval();
 *   }
 *
 *   setInterval() {
 *     D(1000).interval(() => {
 *       this.text = `world (${ ++this.times })`;
 *     });
 *   }
 * }
 *
 * Block.block('App', App);
 * Block.block('Hello', 'Hello, {args.text}!');
 *
 * initApp(html`<App/>`, document.getElementById('root'));
 */

var Block$1 = function () {
  createClass(Block, null, [{
    key: 'onEvalError',


    /**
     * @method Block.onEvalError
     * @public
     * @param {EvaluationError} err - The method is called when an evaluation error occurs.
     */


    /**
     * @member {Object} [Block.defaultLocals = null]
     * @type {Object}
     * @public
     * @description Block default locals.
     */
    value: function onEvalError(err) {
      console.error('Eval error (evaluating "' + err.expression + '" in context of block "' + err.block.$$.name + '"):', err);
    }

    /**
     * @method Block.beforeRegisterBlock
     * @public
     * @param {BlockRegisterHook} hook - Block register hook.
     */


    /**
     * @member {Object} [Block.template = { vars: [], value: [] }]
     * @type {Object}
     * @public
     * @description Block template.
     */


    /**
     * @member {Object} [Block.defaultArgs = null]
     * @type {Object}
     * @public
     * @description Block default args.
     */

  }, {
    key: 'beforeRegisterBlock',
    value: function beforeRegisterBlock(hook) {
      blockHooks.push(hook);

      return function () {
        removeArrayElem(blockHooks, hook);
      };
    }

    /**
     * @method Block.beforeRegisterMixin
     * @public
     * @param {MixinRegisterHook} hook - Mixin register hook.
     */

  }, {
    key: 'beforeRegisterMixin',
    value: function beforeRegisterMixin(hook) {
      mixinHooks.push(hook);

      return function () {
        removeArrayElem(mixinHooks, hook);
      };
    }

    /**
     * @method Block.block
     * @public
     * @param {String} name - Block or mixin name.
     * @param {Template|typeof Block} Subclass - Subclass of Block or template string of it.
     * @returns {typeof Block|undefined} Returns registered Block or undefined if the block hasn't been registered.
     * @description Register block in the namespace of this.
     */

  }, {
    key: 'block',
    value: function block(name, _Subclass2) {
      var _this4 = this;

      if (isFunction(_Subclass2) && !isInstanceOf(Block, _Subclass2)) {
        var _constructor = _Subclass2;

        _Subclass2 = function (_Block) {
          inherits(Subclass, _Block);

          function Subclass(opts) {
            classCallCheck(this, Subclass);

            var _this = possibleConstructorReturn(this, (Subclass.__proto__ || Object.getPrototypeOf(Subclass)).call(this, opts));

            _constructor.call(_this, opts);
            return _this;
          }

          return Subclass;
        }(Block);
      }

      if (!isFunction(_Subclass2) && isArray(_Subclass2)) {
        var _class, _temp;

        _Subclass2 = (_temp = _class = function (_Block2) {
          inherits(Subclass, _Block2);

          function Subclass() {
            classCallCheck(this, Subclass);
            return possibleConstructorReturn(this, (Subclass.__proto__ || Object.getPrototypeOf(Subclass)).apply(this, arguments));
          }

          return Subclass;
        }(Block), _class.template = {
          vars: [],
          value: _Subclass2
        }, _temp);
      }

      if (!isFunction(_Subclass2) && _Subclass2.vars && _Subclass2.value) {
        var _class2, _temp2;

        _Subclass2 = (_temp2 = _class2 = function (_Block3) {
          inherits(_Subclass, _Block3);

          function _Subclass() {
            classCallCheck(this, _Subclass);
            return possibleConstructorReturn(this, (_Subclass.__proto__ || Object.getPrototypeOf(_Subclass)).apply(this, arguments));
          }

          return _Subclass;
        }(Block), _class2.template = _Subclass2, _temp2);
      }

      if (!isFunction(_Subclass2)) {
        console.warn('Block must be a string (representing a block template), a function or a class that extends Block class (name: "' + name + '") (Block.block)');

        return;
      }

      if (!isInstanceOf(Block, _Subclass2)) {
        extendBlock(_Subclass2);
      }

      if (rootBlocks[name]) {
        console.warn('The "' + name + '" block is a built-in block so the block will not be registered (Block.block)');

        return;
      }

      if (!TAG_NAME_REGEX.test(name)) {
        console.warn('Name "' + name + '" is not allowed for blocks so the block will not be registered (Block.block)');

        return;
      }

      if (!hasOwnProperty(this, '_blocks')) {
        this._blocks = create(getProto(this)._blocks);
      }

      if (!hasOwnProperty(this, 'defaultLocals')) {
        this.defaultLocals = {};
      }

      if (!hasOwnProperty(this, 'defaultArgs')) {
        this.defaultArgs = create(null);
      }

      try {
        _Subclass2 = blockHooks.reduce(function (returnValue, hook) {
          var currentReturnValue = hook(returnValue, name, _this4);

          return isInstanceOf(Block, currentReturnValue) ? currentReturnValue : returnValue;
        }, _Subclass2);
      } catch (err) {
        console.error('Uncaught error in "beforeRegisterBlock" hook:', err);
      }

      var _Subclass2$template = _Subclass2.template,
          vars = _Subclass2$template.vars,
          value = _Subclass2$template.value;


      _Subclass2._html = value;
      _Subclass2._vars = vars;

      if (hasOwnProperty(_Subclass2, 'defaultArgs')) {
        setProto(_Subclass2.defaultArgs, null);
      }

      this._blocks[name] = _Subclass2;

      return _Subclass2;
    }

    /**
     * @method Block.mixin
     * @public
     * @param {String} name - Block or mixin name.
     * @param {typeof Mixin|AfterUpdate} Subclass - Subclass of Mixin or AfterUpdate callback.
     * @returns {typeof Mixin|undefined} Returns registered Block or undefined if the block hasn't been registered.
     * @description Register mixin in the namespace of this.
     */

  }, {
    key: 'mixin',
    value: function mixin(name, Subclass) {
      var _this6 = this;

      if (isFunction(Subclass) && !isInstanceOf(Mixin, Subclass)) {
        var _afterUpdate = Subclass;

        Subclass = function (_Mixin) {
          inherits(Subclass, _Mixin);

          function Subclass() {
            classCallCheck(this, Subclass);
            return possibleConstructorReturn(this, (Subclass.__proto__ || Object.getPrototypeOf(Subclass)).apply(this, arguments));
          }

          createClass(Subclass, [{
            key: 'afterUpdate',
            value: function afterUpdate(newValue, oldValue) {
              _afterUpdate.call(this, newValue, oldValue, this);
            }
          }]);
          return Subclass;
        }(Mixin);
      }

      if (!isInstanceOf(Mixin, Subclass)) {
        console.warn('The "' + name + '" class does not extend Mixin and will not be registered (Block.mixin)');

        return;
      }

      if (rootMixins[name]) {
        console.warn('The "' + name + '" mixin is a built-in mixin so the mixin will not be registered (Block.mixin)');

        return;
      }

      if (!ATTR_NAME_REGEX.test(name)) {
        console.warn('Name "' + name + '" is not allowed for mixins so the mixin will not be registered (Block.mixin)');

        return;
      }

      if (!hasOwnProperty(this, '_mixins')) {
        this._mixins = create(getProto(this)._mixins);
      }

      try {
        Subclass = mixinHooks.reduce(function (returnValue, hook) {
          var currentReturnValue = hook(returnValue, name, _this6);

          return isInstanceOf(Mixin, currentReturnValue) ? currentReturnValue : returnValue;
        }, Subclass);
      } catch (err) {
        console.error('Uncaught error in "beforeRegisterMixin" hook:', err);
      }

      Subclass._match = constructMixinRegex(name);

      this._mixins[name] = Subclass;

      return Subclass;
    }

    /**
     * @method Block.wrap
     * @public
     * @param {...Wrapper} wrappers - Functions that return wrapped block.
     * @returns {typeof Block} New block.
     * @description Method for wrapping blocks into another blocks.
     * It is considered best practice to just extends the old block with a new one.
     *
     * @example
     * class MyBlock extends Block {
     *   static template = '<div>123</div>';
     * }
     *
     * MyBlock.wrap((Block) => {
     *   return class extends Block {
     *     static template = `<section class="wrapper">${ Block.template }</section>`;
     *
     *     constructor(opts) {
     *       super(opts);
     *
     *       this.additionalVar = 'additional';
     *     }
     *   };
     * });
     */

  }, {
    key: 'wrap',
    value: function wrap() {
      for (var _len = arguments.length, wrappers = Array(_len), _key = 0; _key < _len; _key++) {
        wrappers[_key] = arguments[_key];
      }

      return wrappers.reduce(wrapBlock, this);
    }
  }]);

  function Block(opts) {
    var _this7 = this;

    classCallCheck(this, Block);
    var name = opts.name,
        originalArgs = opts.args,
        dBlockName = opts.dBlockName,
        children = opts.children,
        parent = opts.parent,
        parentElem = opts.parentElem,
        parentBlock = opts.parentBlock,
        parentScope = opts.parentScope,
        parentTemplate = opts.parentTemplate,
        prevBlock = opts.prevBlock;

    var watchersToRemove = [];
    var constructor = getProto(this).constructor;
    var childrenBlocks = [];
    var mixins = [];
    var isParentBlock = parent instanceof Block;

    defineFrozenProperties(this, {
      /**
       * @member {Block} Block#$
       * @type {Block}
       * @public
       * @description This.
       */
      $: this,

      /**
       * @member {Object} Block#$$
       * @type {Object}
       * @protected
       * @property {Object} args - Private args scope.
       * @property {Object[]} htmlChildren - Block html children.
       * @property {Block[]} children - Child blocks.
       * @property {Mixin[]} mixins - Child mixins.
       * @property {Elem} parentElem - Parent element.
       * @property {Elem} content - Content elements.
       * @property {Function} evaluate - Evaluate function.
       * @property {Object} globals - Private globals scope.
       * @property {Object} locals - Private locals scope.
       * @property {Object[]} watchersToRemove - Watchers to remove before removing element.
       */
      $$: {
        name: name,
        dBlockName: dBlockName,
        dBlocks: [],
        parent: parent,
        parentElem: parentElem,
        parentScope: parentScope,
        parentBlock: parentBlock,
        parentTemplate: parentTemplate,
        content: new Elem(),
        ns: constructor,
        htmlChildren: children,
        children: childrenBlocks,
        mixins: mixins,
        prevBlock: prevBlock,
        watchersToRemove: watchersToRemove,
        isRemoved: false,
        isRendered: false,
        evaluate: function evaluate(func, onChange, targetBlock, forDElements, forDItem, forDEach) {
          if (!isFunction(func)) {
            return func;
          }

          forDElements = !!forDElements;
          forDItem = !!forDItem;

          var scope = name === '#d-item' && !forDItem || forDEach ? (forDEach || _this7).$$.scope : _this7;

          var _ref = targetBlock ? targetBlock.$$ : {},
              watchersToRemove = _ref.watchersToRemove;

          var onChangeFlag = !!onChange;

          var evaluate = function evaluate() {
            var result = void 0;

            if (onChangeFlag) {
              Scope.evalMode = true;
              Scope.gettingVars = [];
            }

            try {
              result = func(scope);
            } catch (err) {
              err.expression = func.expression;
              err.original = func.original;
              err.block = _this7;

              if (isFunction(constructor.onEvalError)) {
                try {
                  constructor.onEvalError(err);
                } catch (e) {
                  console.error('Uncaught error in onEvalError:', e);
                }
              }
            }

            if (onChangeFlag) {
              var localWatchers = [];

              iterateArray(Scope.gettingVars, function (watchers) {
                var watcher = function watcher() {
                  var newResult = evaluate();

                  if (newResult !== result && !targetBlock.$$.isRemoved) {
                    onChange(newResult, result);
                  }
                };
                var watcherBlock = {
                  forDElements: forDElements,
                  watcher: watcher,
                  watchers: watchers
                };

                watcher.onRemove = function () {
                  iterateArray(localWatchers, function (watcherBlock) {
                    var watcher = watcherBlock.watcher,
                        watchers = watcherBlock.watchers;


                    removeArrayElem(watchersToRemove, watcherBlock);
                    removeArrayElem(watchers, watcher);
                  });
                };

                localWatchers.push(watcherBlock);
                watchersToRemove.push(watcherBlock);
                watchers.push(watcher);
              });

              Scope.evalMode = false;
              Scope.gettingVars = [];
            }

            return result;
          };

          return evaluate();
        },
        remove: function remove$$1(isParentSignal) {
          _this7.$$.isRemoved = true;

          removeWatchers(watchersToRemove);

          iterateArray(childrenBlocks, removeWithParentSignal);
          iterateArray(mixins, removeWithParentSignal);

          try {
            _this7.beforeRemove();
          } catch (err) {
            console.error('Uncaught error in ' + name + '#beforeRemove:', err);
          }

          if (!isParentSignal && isParentBlock) {
            parent.$$.removeContent(_this7.$$.content);
          }

          if (!isParentSignal && parentBlock) {
            removeArrayElem(parentBlock.$$.children, _this7);
          }

          _this7.$$.content.remove();
        },
        changeContent: function changeContent(newContent) {
          _this7.$$.content = newContent;

          if (_this7.$$.isRendered) {
            try {
              _this7.afterDOMChange();
            } catch (err) {
              console.error('Uncaught error in ' + name + '#afterContentChange:', err);
            }
          }
        },
        addContent: function addContent(contentToAdd, notRecursive) {
          var oldContent = _this7.$$.content;
          var index = oldContent.indexOf(contentToAdd[0].previousSibling) + 1;
          var newContent = void 0;

          if (index === 0) {
            newContent = contentToAdd.add(oldContent);
          } else {
            newContent = oldContent.slice(0, index).add(contentToAdd, oldContent.slice(index));
          }

          _this7.$$.changeContent(newContent);

          if (isParentBlock && !notRecursive) {
            parent.$$.addContent(contentToAdd, notRecursive);
          }
        },
        moveContent: function moveContent(contentToMove, after) {
          var oldContent = _this7.$$.content;
          var index = oldContent.indexOf(contentToMove[0]);
          var indexToPut = oldContent.indexOf(after[0]) + 1;
          var newContent = void 0;

          if (indexToPut === 0) {
            newContent = contentToMove.add(oldContent.slice(indexToPut, index), oldContent.slice(index + contentToMove.length));
          } else if (index > indexToPut) {
            newContent = oldContent.slice(0, indexToPut).add(contentToMove, oldContent.slice(indexToPut, index), oldContent.slice(index + contentToMove.length));
          } else {
            newContent = oldContent.slice(0, index).add(oldContent.slice(index + contentToMove.length, indexToPut), contentToMove, oldContent.slice(indexToPut));
          }

          _this7.$$.changeContent(newContent);

          if (isParentBlock && indexToPut) {
            parent.$$.moveContent(contentToMove, after);
          }
        },
        removeContent: function removeContent(contentToRemove) {
          _this7.$$.changeContent(_this7.$$.content.filter(function (elem) {
            return contentToRemove.indexOf(elem) === -1;
          }));

          if (isParentBlock) {
            parent.$$.removeContent(contentToRemove);
          }
        },
        insertInStartOfIt: function insertInStartOfIt(contentToInsert, moveFlag) {
          var prevBlock = _this7.$$.prevBlock;

          var after = afterElem;

          if (prevBlock instanceof Block) {
            after = prevBlock.$$.insertAfterIt(contentToInsert, moveFlag);
          } else if (prevBlock) {
            after = prevBlock;
            contentToInsert.insertAfter(prevBlock);

            if (isParentBlock) {
              if (moveFlag) {
                parent.$$.moveContent(contentToInsert, after);
              } else {
                parent.$$.addContent(contentToInsert, true);
              }
            }
          } else if (isParentBlock) {
            var _prevBlock = parent.$$.prevBlock;


            if (_prevBlock) {
              var notRecursive = void 0;

              if (_prevBlock instanceof Block) {
                after = _prevBlock.$$.insertAfterIt(contentToInsert, moveFlag);
                notRecursive = true;
              } else {
                after = _prevBlock;
                notRecursive = false;
                contentToInsert.insertAfter(_prevBlock);
              }

              if (moveFlag) {
                parent.$$.moveContent(contentToInsert, after);
              } else {
                parent.$$.addContent(contentToInsert, notRecursive);
              }
            } else {
              after = parent.$$.insertInStartOfIt(contentToInsert, moveFlag);
            }
          } else {
            contentToInsert.into(parentElem, false);
          }

          if (moveFlag) {
            _this7.$$.moveContent(contentToInsert, after);
          } else {
            _this7.$$.addContent(contentToInsert, true);
          }

          return after;
        },
        insertAfterIt: function insertAfterIt(contentToInsert, moveFlag) {
          var prevBlock = _this7.$$.prevBlock;

          var after = afterElem;
          var tryToAddOrMove = void 0;

          if (_this7.$$.content.length) {
            after = _this7.$$.content.elem(-1);
            tryToAddOrMove = true;
            contentToInsert.insertAfter(after);
          } else if (prevBlock instanceof Block) {
            after = prevBlock.$$.insertAfterIt(contentToInsert, moveFlag);
          } else if (prevBlock) {
            after = prevBlock;
            tryToAddOrMove = true;
            contentToInsert.insertAfter(prevBlock);
          } else if (isParentBlock) {
            after = parent.$$.insertInStartOfIt(contentToInsert, moveFlag);
          } else {
            contentToInsert.into(parentElem, false);
          }

          if (isParentBlock && tryToAddOrMove) {
            if (moveFlag) {
              parent.$$.moveContent(contentToInsert, after);
            } else {
              parent.$$.addContent(contentToInsert);
            }
          }

          return after;
        }
      }
    });

    iterateObject(constructor.defaultLocals, function (value, variable) {
      _this7[variable] = value;
    });
    iterateArray(constructor._vars, function (variable) {
      _this7[variable] = _this7[variable];
    });

    var argsObject = create(null);
    var args = create(constructor.defaultArgs || null);
    var wasDRest = void 0;

    iterateObject(originalArgs, function (value, arg) {
      var isDRest = D_REST_REGEX.test(arg);
      var localArgs = isDRest || wasDRest ? create(args) : args;

      args = localArgs;

      if (isDRest) {
        var restArgs = parentScope.$$.evaluate(value, function (value) {
          iterateObject(localArgs, cleanProperty);
          assign(localArgs, transformRestArgs(value));
          calculateArgs(args, argsObject);
        }, _this7);

        wasDRest = true;

        return assign(localArgs, transformRestArgs(restArgs));
      }

      var isDElements = name === 'd-elements';
      var forDElements = isDElements && arg === 'value';

      wasDRest = false;

      if (name !== 'd-each' || arg !== 'uid') {
        value = parentScope.$$.evaluate(value, function (value) {
          localArgs[arg] = value;
          calculateArgs(args, argsObject);
        }, _this7, forDElements, isDElements && parentBlock.$$.name === '#d-item');
      }

      localArgs[arg] = value;
    });

    defineFrozenProperties(this, {
      /**
       * @member {Object} Block#args
       * @type {Object}
       * @public
       */
      args: argsObject,

      /**
       * @member {Object} Block#globals
       * @type {Object}
       * @public
       */
      globals: create(parentScope ? parentScope.globals : null)
    });

    calculateArgs(args, argsObject);

    if (parentBlock) {
      parentBlock.$$.children.push(this);
    }
  }

  /**
   * @method Block#afterConstruct
   * @public
   * @description Is called after block construction (including all scopes)
   * but before rendering the block and its children.
   */


  createClass(Block, [{
    key: 'afterConstruct',
    value: function afterConstruct() {}

    /**
     * @method Block#afterDOMChange
     * @public
     * @description Is called after block DOM structure has changed.
     */

  }, {
    key: 'afterDOMChange',
    value: function afterDOMChange() {}

    /**
     * @method Block#afterRender
     * @public
     * @description Is called after block has been rendered.
     */

  }, {
    key: 'afterRender',
    value: function afterRender() {}

    /**
     * @method Block#beforeRemove
     * @public
     * @description Is called before the block removal.
     */

  }, {
    key: 'beforeRemove',
    value: function beforeRemove() {}

    /**
     * @method Block#getChildBlocks
     * @public
     * @returns {Block[]}
     * @description Returns child blocks.
     */

  }, {
    key: 'getChildBlocks',
    value: function getChildBlocks() {
      return this.$$.blocks.slice();
    }

    /**
     * @method Block#getChildBlocks
     * @public
     * @returns {Mixin[]}
     * @description Returns child mixins.
     */

  }, {
    key: 'getChildMixins',
    value: function getChildMixins() {
      return this.$$.mixins.slice();
    }

    /**
     * @method Block#getChildren
     * @public
     * @returns {Object[]}
     * @description Returns Block HTML children.
     */

  }, {
    key: 'getChildren',
    value: function getChildren() {
      return this.$$.htmlChildren;
    }

    /**
     * @method Block#getDOM
     * @public
     * @returns {Elem}
     * @description Returns DOM contents of the block.
     */

  }, {
    key: 'getDOM',
    value: function getDOM() {
      return this.$$.content.slice();
    }

    /**
     * @method Block#getParentBlock
     * @public
     * @returns {Block|void}
     * @description Returns parent block.
     */

  }, {
    key: 'getParentBlock',
    value: function getParentBlock() {
      return this.$$.parentBlock;
    }

    /**
     * @method Block#getParentElem
     * @public
     * @returns {Elem|void}
     * @description Returns parent Elem.
     */

  }, {
    key: 'getParentElem',
    value: function getParentElem() {
      return this.$$.parentElem.slice();
    }

    /**
     * @method Block#getParentScope
     * @public
     * @returns {Block|void}
     * @description Returns parent scope.
     */

  }, {
    key: 'getParentScope',
    value: function getParentScope() {
      return this.$$.parentScope;
    }

    /**
     * @method Block#getParentTemplate
     * @public
     * @returns {Block|void}
     * @description Returns parent template.
     */

  }, {
    key: 'getParentTemplate',
    value: function getParentTemplate() {
      return this.$$.parentTemplate;
    }

    /**
     * @method Block#evaluate
     * @public
     * @param {Function} func - Function to evaluate.
     * @param {Watcher} [callback] - If present, callback which is called when the expression value is changed.
     * @param {Block|Mixin} [target = this] - What block or mixin requests the value.
     * @returns {*} Evaluation result.
     * @description Method for evaluating an expression in context of the block and watching for the changes.
     */

  }, {
    key: 'evaluate',
    value: function evaluate(func, callback) {
      var target = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this;

      return this.$$.evaluate(func, callback, target);
    }

    /**
     * @method Block#watch
     * @public
     * @param {...('args'|'globals'|String)} [vars] - Vars to watch (args, globals or locals).
     * If no specified all locals, args and globals are to be watched.
     * If the 'args' string all args are to be watched.
     * If the 'globals' string all globals are to be watched.
     * @param {VarsWatcher} watcher - Called when watched vars are changed.
     * @description Method for watching for vars. If no vars passed in arguments
     * all vars are to be watched. If the 'args' string is in the arguments all args are to be watched.
     * If the 'globals' string is in the arguments all globals are to be watched.
     * Otherwise specified vars will be watched.
     * Watchers should not be put inside the constructor. It is considered best
     * practice to do it inside the {@link Block#afterConstruct} method.
     * Note that these expressions (vars, i.e. "args.arg") are not to be
     * evaluated so you cannot put there things like "a[b]" or any js code,
     * only expressions like "a", "b", "args.a", "args.b" and "globals.a", "globals.b".
     * Also note that if there are more than one var that are changed at once (synchronously)
     * the watcher is called only once.
     * Note that the watcher is executed right away because in most cases
     * this behaviour is very convenient.
     *
     * @example
     * class MyBlock extends Block {
     *   static template = '<div />';
     *
     *   afterConstruct() {
     *     this.watch('a', () => {});
     *     this.watch('args.a', 'globals.r', () => {});
     *     this.watch(() => {});
     *   }
     * }
     */

  }, {
    key: 'watch',
    value: function watch() {
      var _this8 = this;

      for (var _len2 = arguments.length, vars = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        vars[_key2] = arguments[_key2];
      }

      var oldWatcher = arguments[arguments.length - 1];

      if (!isFunction(oldWatcher)) {
        console.warn('The last argument (watcher) wasn\'t specified (' + this.$$.name + '#watch)');

        return;
      }

      var watcher = function watcher() {
        oldWatcher();
      };

      if (arguments.length === 1) {
        watchForAllLocals(this, watcher);
        watchForAllArgs(this, watcher);
        watchForAllGlobals(this, watcher);

        oldWatcher();

        return;
      }

      iterateArray(arguments, function (variable) {
        if (variable === oldWatcher) {
          return;
        }

        variable = '' + variable;

        if (variable === '$') {
          return watchForAllLocals(_this8, watcher);
        }

        if (variable === 'args') {
          return watchForAllArgs(_this8, watcher);
        }

        if (variable === 'globals') {
          return watchForAllGlobals(_this8, watcher);
        }

        if (WATCHED_ARG_PREFIX_REGEX.test(variable)) {
          variable = variable.replace(WATCHED_ARG_PREFIX_REGEX, '');

          if (!_this8.$$.args[variable]) {
            return;
          }

          _this8.$$.args[variable].watchers.perm.push(watcher);

          return;
        }

        if (WATCHED_GLOBAL_PREFIX_REGEX.test(variable)) {
          variable = variable.replace(WATCHED_GLOBAL_PREFIX_REGEX, '');

          if (!_this8.$$.globals[variable]) {
            return;
          }

          var watchers = _this8.$$.globals[variable].watchers;


          watchers.perm.push(watcher);
          _this8.$$.watchersToRemove.push({
            watcher: watcher,
            watchers: watchers
          });

          return;
        }

        if (!_this8.$$.locals[variable]) {
          return;
        }

        _this8.$$.locals[variable].watchers.perm.push(watcher);
      });

      oldWatcher();
    }
  }]);
  return Block;
}();

Block$1._blocks = create(rootBlocks);
Block$1._mixins = create(rootMixins);
Block$1.defaultArgs = null;
Block$1.defaultLocals = null;
Block$1.template = {
  vars: [],
  value: []
};


setToStringTag(Block$1, 'Block');
setProto(Block$1.prototype, null);

var _class;
var _temp;

rootBlocks['d-block'] = (_temp = _class = function (_Block) {
  inherits(DBlock, _Block);

  function DBlock() {
    classCallCheck(this, DBlock);
    return possibleConstructorReturn(this, (DBlock.__proto__ || Object.getPrototypeOf(DBlock)).apply(this, arguments));
  }

  createClass(DBlock, [{
    key: 'afterConstruct',
    value: function afterConstruct() {
      var _$$ = this.$$,
          _$$$parentScope$$$ = _$$.parentScope.$$,
          parentParentScope = _$$$parentScope$$$.parentScope,
          parentParentTemplate = _$$$parentScope$$$.parentTemplate,
          children = _$$$parentScope$$$.htmlChildren,
          ownChildren = _$$.htmlChildren,
          parentTemplate = _$$.parentTemplate,
          dBlockName = _$$.dBlockName;

      var found = void 0;

      if (ownChildren.length) {
        return;
      }

      this.ParentScope = parentParentScope;
      this.ParentTemplate = parentParentTemplate;

      if (dBlockName) {
        found = findInArray(children, function (_ref) {
          var nodeName = _ref.name;
          return nodeName === 'd-block:' + dBlockName;
        });

        if (!found) {
          var parent = this;

          /* eslint no-empty: 0 */
          while ((parent = parent.$$.parentScope) && !(found = findInArray(parent.$$.dBlocks, function (_ref2) {
            var DBlockName = _ref2.$$.dBlockName;
            return DBlockName === dBlockName;
          })) && parent.$$.parentScope.$$.name === '#d-item') {}

          if (found) {
            this.ParentScope = parent;
            this.ParentTemplate = parentTemplate;
            found.value = {
              children: found.value.$$.htmlChildren
            };
          }
        }

        this.elems = found && found.value.children.length ? found.value.children : null;
      } else {
        this.elems = children;
      }
    }
  }]);
  return DBlock;
}(Block$1), _class.template = {
  "vars": ["elems", "ParentScope", "ParentTemplate"],
  "value": [{
    "name": "d-elements",
    "attrs": {
      "value": function _(_$) {
        return _$.elems;
      },
      "parentScope": function _(_$) {
        return _$.ParentScope;
      },
      "parentTemplate": function _(_$) {
        return _$.ParentTemplate;
      }
    }
  }]
}, _temp);

var template = {
  "vars": [],
  "value": [{
    "name": "d-elements",
    "attrs": {
      "value": function _(_$) {
        return _$.$$.htmlChildren;
      },
      "parentScope": function _(_$) {
        return _$;
      },
      "parentTemplate": function _(_$) {
        return _$.$$.parentTemplate;
      }
    }
  }]
};

var DItem = function (_Block) {
  inherits(DItem, _Block);

  function DItem() {
    classCallCheck(this, DItem);
    return possibleConstructorReturn(this, (DItem.__proto__ || Object.getPrototypeOf(DItem)).apply(this, arguments));
  }

  return DItem;
}(Block$1);

DItem.template = template;
DItem._vars = template.vars;
DItem._html = template.value;

var _class$1;
var _temp$1;
var _initialiseProps;

var watchArgs = function _(_$) {
  var _func;

  return [_$.args.set, _$.args.filterBy, _$.args.sortBy];
};

rootBlocks['d-each'] = (_temp$1 = _class$1 = function (_Block) {
  inherits(DEach, _Block);

  function DEach(opts) {
    classCallCheck(this, DEach);

    var _this = possibleConstructorReturn(this, (DEach.__proto__ || Object.getPrototypeOf(DEach)).call(this, opts));

    _initialiseProps.call(_this);

    var _this$args = _this.args,
        _this$args$item = _this$args.item,
        itemName = _this$args$item === undefined ? '$item' : _this$args$item,
        _this$args$index = _this$args.index,
        indexName = _this$args$index === undefined ? '$index' : _this$args$index;


    assign(_this.$$, {
      itemsByUIDs: {},
      UID: _this.args.uid || undefined,
      itemName: itemName,
      indexName: indexName
    });
    return _this;
  }

  createClass(DEach, [{
    key: 'afterRender',
    value: function afterRender() {
      this.evaluate(watchArgs, this.renderSet);
      this.renderSet();
    }
  }]);
  return DEach;
}(Block$1), _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.renderSet = function () {
    var _$$ = _this2.$$,
        htmlChildren = _$$.htmlChildren,
        itemsByUIDs = _$$.itemsByUIDs,
        parentScope = _$$.parentScope,
        parentElem = _$$.parentElem,
        parentTemplate = _$$.parentTemplate,
        scope = _$$.scope,
        itemName = _$$.itemName,
        indexName = _$$.indexName,
        UID = _$$.UID;
    var sortBy = _this2.args.sortBy;

    var newItemsByUIDs = {};
    var newUIDsCounter = {};
    var newUIDs = {};
    var _args = _this2.args,
        set$$1 = _args.set,
        filterBy = _args.filterBy;

    var isArr = isArray(set$$1);
    var iterate = isArr ? iterateArray : iterateObject;

    if (isArr && isFunction(sortBy)) {
      set$$1 = set$$1.slice().sort(sortBy);
    }

    if (isFunction(filterBy)) {
      filterBy = [filterBy];
    }

    if (isArray(filterBy)) {
      iterateArray(filterBy, function (filter) {
        set$$1 = set$$1.filter(filter);
      });
    }

    iterate(set$$1, function (item, index) {
      scope[itemName] = item;
      scope[indexName] = index;

      var uid = parentScope.$$.evaluate(UID, null, null, false, false, _this2);

      newUIDsCounter[uid] = (newUIDsCounter[uid] || 0) + 1;
      newUIDs[index] = uid;
    });

    scope[itemName] = null;
    scope[indexName] = null;

    iterateObject(itemsByUIDs, function (items, uid) {
      if (!newUIDsCounter[uid]) {
        iterateArray(items, remove$1);

        return;
      }

      iterateArray(items.splice(newUIDsCounter[uid]), remove$1);
    });

    var prevBlock = void 0;

    iterate(set$$1, function (item, index) {
      var uid = newUIDs[index];
      var block = void 0;

      if (itemsByUIDs[uid] && itemsByUIDs[uid].length) {
        block = itemsByUIDs[uid].shift();
        block.$$.scope[indexName] = index;
        block.$$.scope[itemName] = item;

        if (block.$$.prevBlock !== prevBlock && prevBlock) {
          prevBlock.$$.insertAfterIt(block.$$.content, true);
        }
      } else {
        block = createBlock({
          node: {
            itemName: itemName,
            indexName: indexName,
            item: item,
            index: index,
            name: '#d-item',
            children: htmlChildren
          },
          Constructor: DItem,
          parent: _this2,
          parentElem: parentElem,
          parentBlock: _this2,
          parentScope: parentScope,
          parentTemplate: parentTemplate,
          prevBlock: prevBlock
        });
      }

      (newItemsByUIDs[uid] = newItemsByUIDs[uid] || []).push(block);
      block.$$.prevBlock = prevBlock;
      prevBlock = block;
    });

    _this2.$$.itemsByUIDs = newItemsByUIDs;
  };
}, _temp$1);

var watchArgs$1 = function _(_$) {
  var _func;

  return _$.args.value;
};

rootBlocks['d-elements'] = function (_Block) {
  inherits(DElements, _Block);

  function DElements() {
    classCallCheck(this, DElements);
    return possibleConstructorReturn(this, (DElements.__proto__ || Object.getPrototypeOf(DElements)).apply(this, arguments));
  }

  createClass(DElements, [{
    key: 'afterConstruct',
    value: function afterConstruct() {
      var _this2 = this;

      var parentElem = this.$$.parentElem;
      var _args = this.args,
          Constructor = _args.Constructor,
          parentScope = _args.parentScope,
          parentTemplate = _args.parentTemplate;


      this.$$.evaluate(watchArgs$1, function () {
        var _$$ = _this2.$$,
            children = _$$.children,
            mixins = _$$.mixins,
            parent = _$$.parent,
            watchersToRemove = _$$.watchersToRemove,
            content = _$$.content;
        var value = _this2.args.value;


        iterateArray(children, removeWithParentSignal);
        iterateArray(mixins, removeWithParentSignal);
        content.remove();

        if (parent instanceof Block$1) {
          parent.$$.removeContent(content);
        }

        _this2.$$.children = [];
        _this2.$$.mixins = [];
        _this2.$$.watchersToRemove = watchersToRemove.filter(function (_ref) {
          var watchers = _ref.watchers,
              watcher = _ref.watcher,
              forDElements = _ref.forDElements;

          if (forDElements) {
            return true;
          }

          removeArrayElem(watchers, watcher);
        });
        _this2.$$.content = new Elem();

        var prevBlock = void 0;

        iterateArray(value || [], function (child) {
          prevBlock = createBlock({
            node: child,
            Constructor: Constructor,
            parent: _this2,
            parentElem: parentElem,
            parentBlock: _this2,
            parentScope: parentScope,
            parentTemplate: parentTemplate,
            prevBlock: prevBlock
          });
        });
      }, this, true);
    }
  }]);
  return DElements;
}(Block$1);

var _class$2;
var _temp$2;

rootBlocks['d-if'] = (_temp$2 = _class$2 = function (_Block) {
  inherits(DIf, _Block);

  function DIf(opts) {
    classCallCheck(this, DIf);

    var _this = possibleConstructorReturn(this, (DIf.__proto__ || Object.getPrototypeOf(DIf)).call(this, opts));

    var _this$$$ = _this.$$,
        parentScope = _this$$$.parentScope,
        htmlChildren = _this$$$.htmlChildren;

    var index = Infinity;
    var values = htmlChildren.map(function (child, i) {
      var name = child.name,
          _child$attrs = child.attrs,
          attrs = _child$attrs === undefined ? {} : _child$attrs,
          children = child.children;

      var cond = attrs.if;

      if (name !== 'd-else' && cond) {
        cond = parentScope.$$.evaluate(cond, function (newValue) {
          if (!!newValue === values[i]) {
            return;
          }

          values[i] = !!newValue;

          if (i > index) {
            return;
          }

          if (i < index) {
            index = i;
            _this.elems = children;

            return;
          }

          var found = findInArray(values, Boolean);

          if (found) {
            index = found.key;
            _this.elems = htmlChildren[found.key].children;
          } else {
            index = Infinity;
            _this.elems = null;
          }
        }, _this);
      } else {
        cond = true;
      }

      if (cond && index === Infinity) {
        index = i;
        _this.elems = children;
      }

      return !!cond;
    });
    return _this;
  }

  return DIf;
}(Block$1), _class$2.template = {
  "vars": ["elems"],
  "value": [{
    "name": "d-elements",
    "attrs": {
      "value": function _(_$) {
        return _$.elems;
      },
      "parentScope": function _(_$) {
        return _$.$$.parentScope;
      },
      "parentTemplate": function _(_$) {
        return _$.$$.parentTemplate;
      }
    }
  }]
}, _temp$2);

var _class$3;
var _temp$3;

var watchArgs$2 = function _(_$) {
  var _func;

  return _$.args.value;
};

rootBlocks['d-switch'] = (_temp$3 = _class$3 = function (_Block) {
  inherits(DSwitch, _Block);

  function DSwitch(opts) {
    classCallCheck(this, DSwitch);

    var _this = possibleConstructorReturn(this, (DSwitch.__proto__ || Object.getPrototypeOf(DSwitch)).call(this, opts));

    _this.index = Infinity;
    var _this$$$ = _this.$$,
        htmlChildren = _this$$$.htmlChildren,
        parentScope = _this$$$.parentScope,
        args = _this.args,
        value = _this.args.value;

    var wasDefault = void 0;

    _this.values = collectFromArray(htmlChildren, function (values, child, i) {
      var name = child.name,
          attrs = child.attrs,
          children = child.children;

      var val = attrs.if;

      if (wasDefault) {
        return;
      }

      if (name !== 'd-case' && name !== 'd-default') {
        return;
      }

      if (name === 'd-default') {
        wasDefault = true;
      }

      if (name === 'd-default') {
        val = value;
      } else if (val) {
        val = parentScope.$$.evaluate(val, function (newValue) {
          if (equals(_this.values[i].value, newValue)) {
            return;
          }

          _this.values[i].value = newValue;

          if (i > _this.index) {
            return;
          }

          if (i < _this.index) {
            _this.index = i;
            _this.elems = children;

            return;
          }

          var found = findInArray(_this.values, function (_ref) {
            var value = _ref.value;
            return equals(value, args.value);
          });

          if (found) {
            _this.index = found.key;
            _this.elems = found.value.children;
          } else {
            _this.index = Infinity;
            _this.elems = null;
          }
        }, _this);
      } else {
        val = undefined;
      }

      if (equals(val, value) && _this.index === Infinity) {
        _this.index = i;
        _this.elems = children;
      }

      values.push({
        name: name,
        children: children,
        value: val
      });
    }, []);
    return _this;
  }

  createClass(DSwitch, [{
    key: 'afterConstruct',
    value: function afterConstruct() {
      var _this2 = this;

      this.evaluate(watchArgs$2, function () {
        var newValue = _this2.args.value;


        _this2.index = Infinity;

        iterateArray(_this2.values, function (_ref2, i) {
          var name = _ref2.name,
              value = _ref2.value,
              children = _ref2.children;

          var val = name === 'd-default' ? newValue : value;

          if (equals(val, newValue) && _this2.index === Infinity) {
            _this2.index = i;
            _this2.elems = children;
          }
        });

        if (_this2.index === Infinity) {
          _this2.elems = null;
        }
      });
    }
  }]);
  return DSwitch;
}(Block$1), _class$3.template = {
  "vars": ["elems"],
  "value": [{
    "name": "d-elements",
    "attrs": {
      "value": function _(_$) {
        return _$.elems;
      },
      "parentScope": function _(_$) {
        return _$.$$.parentScope;
      },
      "parentTemplate": function _(_$) {
        return _$.$$.parentTemplate;
      }
    }
  }]
}, _temp$3);

function equals(value1, value2) {
  return value1 === value2;
}

rootMixins['d-attr'] = function (_Mixin) {
  inherits(DAttr, _Mixin);

  function DAttr() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, DAttr);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = DAttr.__proto__ || Object.getPrototypeOf(DAttr)).call.apply(_ref, [this].concat(args))), _this), _this.attrs = {}, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(DAttr, [{
    key: 'afterUpdate',
    value: function afterUpdate(newValue) {
      var elem = this.elem,
          args = this.args,
          attrs = this.attrs;


      if (args) {
        newValue = collectFromObject(args, function (attrs, attr) {
          attrs[attr] = newValue;
        });
      }

      iterateObject(attrs, function (value, prop) {
        if (!(prop in newValue)) {
          elem.removeAttr(prop);
        }
      });
      elem.attr(newValue);

      this.attrs = newValue;
    }
  }, {
    key: 'beforeRemove',
    value: function beforeRemove() {
      var elem = this.elem,
          attrs = this.attrs;


      elem.removeAttr.apply(elem, keys(attrs));
    }
  }]);
  return DAttr;
}(Mixin$1);

rootMixins['d-bind'] = function (_Mixin) {
  inherits(DBind, _Mixin);

  function DBind() {
    classCallCheck(this, DBind);
    return possibleConstructorReturn(this, (DBind.__proto__ || Object.getPrototypeOf(DBind)).apply(this, arguments));
  }

  createClass(DBind, [{
    key: 'afterUpdate',
    value: function afterUpdate(value) {
      if (this.off) {
        this.off();
      }

      if (!isFunction(value)) {
        return;
      }

      if (this.args) {
        this.off = this.elem.on(this.args.join(','), value);
      } else {
        console.error('Provide "d-bind" mixin with an event names (like "d-bind(click)" or "d-bind(keyup, keypress)")!');
      }
    }
  }, {
    key: 'beforeRemove',
    value: function beforeRemove() {
      var off = this.off;


      if (off) {
        off();
      }
    }
  }]);
  return DBind;
}(Mixin$1);

var EMPTY_SPACE_REGEX = /\s+/;

rootMixins['d-class'] = function (_Mixin) {
  inherits(DClass, _Mixin);

  function DClass() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, DClass);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = DClass.__proto__ || Object.getPrototypeOf(DClass)).call.apply(_ref, [this].concat(args))), _this), _this.classes = [], _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(DClass, [{
    key: 'afterUpdate',
    value: function afterUpdate(newValue) {
      var elem = this.elem,
          args = this.args,
          classes = this.classes;

      var newClasses = [];

      if (args) {
        newValue = newValue ? args : [];
      }

      if (isString(newValue)) {
        newValue = newValue.split(EMPTY_SPACE_REGEX);
      }

      if (isArray(newValue)) {
        iterateArray(classes, function (cls) {
          if (newValue.indexOf(cls) === -1) {
            elem.removeClass(cls);
          }
        });
        iterateArray(newValue, function (cls) {
          if (isString(cls)) {
            newClasses.push(cls);
            elem.addClass(cls);
          }
        });
      } else {
        iterateArray(classes, function (cls) {
          if (!newValue || !newValue[cls]) {
            elem.removeClass(cls);
          }
        });
        iterateObject(newValue, function (val, cls) {
          if (val) {
            newClasses.push(cls);
            elem.addClass(cls);
          }
        });
      }

      this.classes = newClasses;
    }
  }, {
    key: 'beforeRemove',
    value: function beforeRemove() {
      var elem = this.elem,
          classes = this.classes;


      elem.removeClass.apply(elem, classes);
    }
  }]);
  return DClass;
}(Mixin$1);

var _class$4;
var _temp$4;

rootMixins['d-elem'] = (_temp$4 = _class$4 = function (_Mixin) {
  inherits(DElem, _Mixin);

  function DElem(opts) {
    classCallCheck(this, DElem);

    var _this = possibleConstructorReturn(this, (DElem.__proto__ || Object.getPrototypeOf(DElem)).call(this, opts));

    var args = _this.args,
        parentTemplate = _this.parentTemplate,
        elem = _this.elem;

    var scope = parentTemplate;
    var value = _this.evaluate();

    if (args) {
      scope = value instanceof Block$1 ? value : parentTemplate;
      value = args[0];
    }

    if (isFunction(value)) {
      value(elem);
    } else if (isString(value)) {
      scope[value] = elem;
    }
    return _this;
  }

  return DElem;
}(Mixin$1), _class$4.evaluate = false, _temp$4);

rootMixins['d-hide'] = function (_Mixin) {
  inherits(DHide, _Mixin);

  function DHide() {
    classCallCheck(this, DHide);
    return possibleConstructorReturn(this, (DHide.__proto__ || Object.getPrototypeOf(DHide)).apply(this, arguments));
  }

  createClass(DHide, [{
    key: 'afterUpdate',
    value: function afterUpdate(value) {
      var elem = this.elem;


      if (value) {
        elem.hide();
      } else {
        elem.show();
      }
    }
  }, {
    key: 'beforeRemove',
    value: function beforeRemove() {
      this.elem.show();
    }
  }]);
  return DHide;
}(Mixin$1);

var _class$5;
var _temp$5;

rootMixins['d-node'] = (_temp$5 = _class$5 = function (_Mixin) {
  inherits(DNode, _Mixin);

  function DNode(opts) {
    classCallCheck(this, DNode);

    var _this = possibleConstructorReturn(this, (DNode.__proto__ || Object.getPrototypeOf(DNode)).call(this, opts));

    var args = _this.args,
        parentTemplate = _this.parentTemplate,
        node = _this.node;

    var scope = parentTemplate;
    var value = _this.evaluate();

    if (args) {
      scope = value instanceof Block$1 ? value : parentTemplate;
      value = args[0];
    }

    if (isFunction(value)) {
      value(node);
    } else if (isString(value)) {
      scope[value] = node;
    }
    return _this;
  }

  return DNode;
}(Mixin$1), _class$5.evaluate = false, _temp$5);

var _class$6;
var _temp$6;

rootMixins['d-on'] = (_temp$6 = _class$6 = function (_Mixin) {
  inherits(DOn, _Mixin);

  function DOn(opts) {
    classCallCheck(this, DOn);

    var _this = possibleConstructorReturn(this, (DOn.__proto__ || Object.getPrototypeOf(DOn)).call(this, opts));

    if (_this.args) {
      _this.off = _this.elem.on(_this.args.join(','), function () {
        _this.evaluate();
      });
    } else {
      console.error('Provide "d-on" mixin with an event names (like "d-on(click)" or "d-on(keyup, keypress)")!');
    }
    return _this;
  }

  createClass(DOn, [{
    key: 'beforeRemove',
    value: function beforeRemove() {
      var off = this.off;


      if (off) {
        off();
      }
    }
  }]);
  return DOn;
}(Mixin$1), _class$6.evaluate = false, _temp$6);

rootMixins['d-show'] = function (_Mixin) {
  inherits(DShow, _Mixin);

  function DShow() {
    classCallCheck(this, DShow);
    return possibleConstructorReturn(this, (DShow.__proto__ || Object.getPrototypeOf(DShow)).apply(this, arguments));
  }

  createClass(DShow, [{
    key: 'afterUpdate',
    value: function afterUpdate(value) {
      var elem = this.elem;


      if (value) {
        elem.show();
      } else {
        elem.hide();
      }
    }
  }, {
    key: 'beforeRemove',
    value: function beforeRemove() {
      this.elem.show();
    }
  }]);
  return DShow;
}(Mixin$1);

var CSS_STYLES_SEPARATOR_REGEX$1 = /; ?/;

rootMixins['d-style'] = function (_Mixin) {
  inherits(DStyle, _Mixin);

  function DStyle() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, DStyle);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = DStyle.__proto__ || Object.getPrototypeOf(DStyle)).call.apply(_ref, [this].concat(args))), _this), _this.css = {}, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(DStyle, [{
    key: 'afterUpdate',
    value: function afterUpdate(newValue, oldValue) {
      var elem = this.elem,
          args = this.args,
          css = this.css;


      if (args) {
        newValue = collectFromObject(args, function (css, prop) {
          css[prop] = newValue;
        });
      }

      if (isString(newValue)) {
        newValue = collectFromArray(newValue.split(CSS_STYLES_SEPARATOR_REGEX$1).filter(Boolean), addCSSProp$1);
      }

      iterateObject(css, function (value, prop) {
        if (!newValue[prop]) {
          elem.removeCSS(prop);
        }
      });
      elem.css(newValue);

      this.css = newValue;
    }
  }, {
    key: 'beforeRemove',
    value: function beforeRemove() {
      var elem = this.elem,
          css = this.css;


      elem.removeCSS.apply(elem, keys(css));
    }
  }]);
  return DStyle;
}(Mixin$1);

function addCSSProp$1(css, item) {
  var _item = slicedToArray(item, 2),
      prop = _item[0],
      value = _item[1];

  css[prop] = value;
}

var _class$7;
var _temp$7;

rootMixins['d-value'] = (_temp$7 = _class$7 = function (_Mixin) {
  inherits(DValue, _Mixin);

  function DValue(opts) {
    classCallCheck(this, DValue);

    var _this = possibleConstructorReturn(this, (DValue.__proto__ || Object.getPrototypeOf(DValue)).call(this, opts));

    var args = _this.args,
        parentTemplate = _this.parentTemplate,
        elem = _this.elem,
        node = _this.node;

    var name = elem.name();
    var type = elem.prop('type');
    var value = _this.evaluate();
    var initialScopeValue = null;

    _this.prop = getProp(name, type, elem);
    _this.name = name;
    _this.type = type;
    _this.value = value;
    _this.options = elem.find('option');
    _this.scope = parentTemplate;

    if (args) {
      _this.name = args[0];
      _this.scope = value instanceof Block ? value : parentTemplate;
    }

    if (!isFunction(value)) {
      initialScopeValue = _this.scope.$$.evaluate(getEvalFunction(value), function (newValue) {
        if (_this.currentValue !== newValue) {
          _this.currentValue = newValue;
          _this.setProp(newValue);
        }
      }, _this);
    }

    var initialElemValue = _this.getProp(initialScopeValue, true);
    var isInitialScopeValueNull = isNil(initialScopeValue);
    var isCheckbox = type === 'checkbox';
    var changeScope = function changeScope() {
      _this.currentValue = _this.getProp(_this.currentValue);
      _this.changeScope();
    };

    if (isInitialScopeValueNull || isCheckbox) {
      _this.currentValue = initialElemValue;
      _this.changeScope();

      if (!isInitialScopeValueNull && isCheckbox) {
        _this.setProp(initialScopeValue);
      }
    } else {
      _this.currentValue = initialScopeValue;
      _this.setProp(initialScopeValue);
    }

    _this.offElemListener = elem.on(getListenerName(name, type), function (e) {
      if (e.target === node) {
        changeScope();
      }
    });
    _this.offFormListener = elem.closest('form').on('reset', function () {
      setTimeout(changeScope, 0);
    });
    return _this;
  }

  createClass(DValue, [{
    key: 'changeScope',
    value: function changeScope() {
      var scope = this.scope,
          value = this.value,
          currentValue = this.currentValue;


      if (isFunction(value)) {
        value(currentValue);
      } else {
        scope[value] = currentValue;
      }
    }
  }, {
    key: 'setProp',
    value: function setProp(value) {
      var elem = this.elem,
          name = this.name,
          prop = this.prop,
          type = this.type,
          node = this.node,
          options = this.options;


      if (prop === 'text') {
        elem.text(value);
      } else if (prop === 'multiple-select') {
        options.forEach(function (option) {
          option.selected = value.indexOf(option.value) !== -1;
        });
      } else {
        elem.prop(prop, getValueForSetting(name, value, type, node.value));
      }
    }
  }, {
    key: 'getProp',
    value: function getProp(values, init) {
      var elem = this.elem,
          name = this.name,
          prop = this.prop,
          type = this.type,
          node = this.node,
          options = this.options;


      return prop === 'text' ? elem.text() : getValueForGetting(name, elem.prop(prop), type, node.value, values, options, init, prop === 'multiple-select');
    }
  }, {
    key: 'beforeRemove',
    value: function beforeRemove() {
      this.offElemListener();
      this.offFormListener();
    }
  }]);
  return DValue;
}(Mixin$1), _class$7.evaluate = false, _temp$7);

function getProp(name, type, elem) {
  switch (name) {
    case 'select':
      {
        return elem.hasAttr('multiple') ? 'multiple-select' : 'value';
      }

    case 'input':
      {
        if (type === 'file') {
          return 'files';
        }

        return type === 'radio' || type === 'checkbox' ? 'checked' : 'value';
      }

    default:
      {
        return elem.hasAttr('contentEditable') ? 'text' : 'value';
      }
  }
}

function getValueForSetting(name, value, type, inputValue) {
  if (name !== 'input') {
    return value;
  }

  var isRadio = type === 'radio';

  if (!isRadio && type !== 'checkbox') {
    return value;
  }

  return isRadio ? value === inputValue : value.indexOf(inputValue) !== -1;
}

function getValueForGetting(name, value, type, inputValue, values, options, init, isMultiple) {
  switch (name) {
    case 'select':
      {
        if (!isMultiple) {
          return value;
        }

        return collectFromArray(options, addValue, []);
      }

    case 'input':
      {
        if (type !== 'radio' && type !== 'checkbox') {
          return value;
        }

        if (type === 'radio') {
          return value ? inputValue : null;
        }

        if (!value && init) {
          return values;
        }

        if (value) {
          if (values) {
            return values.indexOf(inputValue) === -1 ? values.concat(inputValue) : values;
          }

          return [inputValue];
        }

        if (!isArray(values)) {
          return [];
        }

        var index = values.indexOf(inputValue);

        if (index !== -1) {
          return [].concat(toConsumableArray(values.slice(0, index)), toConsumableArray(values.slice(index + 1)));
        }

        return values;
      }

    default:
      {
        return value;
      }
  }
}

function getListenerName(name, type) {
  switch (name) {
    case 'select':
      {
        return 'change';
      }

    case 'input':
      {
        return type === 'radio' || type === 'checkbox' || type === 'color' || type === 'file' ? 'change' : 'change input';
      }

    default:
      {
        return 'input';
      }
  }
}

function getEvalFunction(value) {
  return function (scope) {
    return scope[value];
  };
}

function addValue(values, _ref) {
  var selected = _ref.selected,
      value = _ref.value;

  if (selected && values.indexOf(value) === -1) {
    values.push(value);
  }
}

iterateObject(rootBlocks, function (Block) {
  Block._vars = Block.template.vars;
  Block._html = Block.template.value;
});

iterateObject(rootMixins, function (Mixin, name) {
  Mixin._match = constructMixinRegex(name);
});

var _global$3 = global$1;
var _global$document$1 = _global$3.document;
var document$1 = _global$document$1 === undefined ? {} : _global$document$1;

/**
 * @const {Elem} doc
 * @type {Elem}
 * @public
 * @description Elem instance of document.
 */

var doc = new Elem(document$1);

/**
 * @const {Elem} html
 * @type {Elem}
 * @public
 * @description Elem instance of document.documentElement.
 */
var html = new Elem(document$1.documentElement);

/**
 * @const {Elem} body
 * @type {Elem}
 * @public
 * @description Elem instance of document.body.
 */
var body = new Elem(document$1.body);

/**
 * @const {Elem} head
 * @type {Elem}
 * @public
 * @description Elem instance of document.head.
 */
var head = new Elem(document$1.head);

createHideStyleNode(head);

function insertTemplates(template, templates) {
  var vars = template.vars,
      value = template.value;

  var newTemplates = create(null);
  var newVars = toObjectKeys(vars);

  assign(newTemplates, templates);
  iterateArray(value, forEachNode);

  function forEachNode(_ref, index, tree) {
    var type = _ref.type,
        value = _ref.value,
        children = _ref.children;

    if (type === '#comment') {
      value = value.trim();

      if (newTemplates[value]) {
        tree[index] = newTemplates[value].value;
        assign(newVars, toObjectKeys(newTemplates[value].vars));
      }
    } else {
      iterateArray(children, forEachNode);
    }
  }

  vars.length = 0;
  vars.push.apply(vars, toConsumableArray(keys(newVars)));

  return template;
}

function initApp(html, node) {
  var parentElem = new Elem(node).elem(0);

  if (!parentElem.length) {
    throw new Error('No valid element to insert the app into was given! (initApp)');
  }

  if (parentElem.prop('DwayneRootBlock')) {
    throw new Error('There already exists a Dwayne app inside the given element! (initApp)');
  }

  if (isArray(html)) {
    html = {
      vars: [],
      value: html
    };
  }

  var RootBlock = function (_Block) {
    inherits(RootBlock, _Block);

    function RootBlock() {
      classCallCheck(this, RootBlock);
      return possibleConstructorReturn(this, (RootBlock.__proto__ || Object.getPrototypeOf(RootBlock)).apply(this, arguments));
    }

    return RootBlock;
  }(Block$1);

  RootBlock._vars = html.vars;
  RootBlock._html = html.value;


  var block = createBlock({
    node: {
      name: '#RootBlock'
    },
    Constructor: RootBlock,
    parent: parentElem,
    parentElem: parentElem
  });

  parentElem.prop('DwayneRootBlock', block).attr('dwayne-root', '');
}

function removeApp(node) {
  var elem = new Elem(node);

  if (!elem.length) {
    throw new Error('No valid element to remove the app from was given! (removeApp)');
  }

  node = elem[0];

  var _node = node,
      DwayneRootBlock = _node.DwayneRootBlock;


  if (!(DwayneRootBlock instanceof Block$1)) {
    throw new Error('No app registered inside the given element! (removeApp)');
  }

  DwayneRootBlock.$$.remove();
  elem.removeAttr('dwayne-root');

  delete node.DwayneRootBlock;
}

exports.Block = Block$1;
exports.Elem = Elem;
exports.Mixin = Mixin$1;
exports.doc = doc;
exports.html = html;
exports.body = body;
exports.head = head;
exports.find = find;
exports.insertTemplates = insertTemplates;
exports.initApp = initApp;
exports.removeApp = removeApp;

}((this.Dwayne = this.Dwayne || {})));
//# sourceMappingURL=dwayne.js.map
