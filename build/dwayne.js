(function (exports) {
'use strict';

/* eslint-disable no-nested-ternary */
/* eslint-disable no-negated-condition */
var global$1 = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};
/* eslint-enable no-nested-ternary */
/* eslint-enable no-negated-condition */

var HIDE_CLASS = '__dwayne-hidden__';
var SVG_NS = 'http://www.w3.org/2000/svg';

var blocks = {};
var mixins = {};
var _global = global$1;
var _global$document = _global.document;
var document = _global$document === undefined ? {} : _global$document;
var _global$Symbol = _global.Symbol;

var _Symbol = _global$Symbol === undefined ? {} : _global$Symbol;

var version = '4.0.0';

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

var isArray = Array.isArray;
function isFunction(value) {
  return typeof value === 'function';
}

function isNil(value) {
  /* eslint-disable eqeqeq */
  return value == null;
  /* eslint-enable eqeqeq */
}

function isString(value) {
  return typeof value === 'string';
}

var _ref = {};
var has = _ref.hasOwnProperty;
var slice = [].slice;


function assign(target) {
  for (var i = 1, length = arguments.length; i < length; i++) {
    iterateObject(arguments[i], function (value, key) {
      target[key] = value;
    });
  }

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

function noop() {}

var create = Object.create;
var keys = Object.keys;
var getProto = Object.getPrototypeOf;
var setProto = Object.setPrototypeOf || function (target, proto) {
  /* eslint-disable no-proto */
  target.__proto__ = proto;
  /* eslint-enable no-proto */
};

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

function setSymbolSpecies(klass, species) {
  if (_Symbol.species) {
    defineProperties(klass, defineProperty({}, _Symbol.species, {
      get: function get$$1() {
        return species;
      }
    }));
  }
}

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

var _ref$1 = {};
var toString = _ref$1.toString;


function toStringTag$1(object) {
  return toString.call(object).slice(8, -1);
}

function setToStringTag(klass, tag) {
  if (_Symbol.toStringTag) {
    definePrototypeProperties(klass.prototype, defineProperty({}, _Symbol.toStringTag, tag));
  }
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

function createHideStyleNode(head) {
  var style = head.find('style#' + HIDE_CLASS);

  if (style.length) {
    return;
  }

  head.create('style').prop('id', HIDE_CLASS).text('.' + HIDE_CLASS + '{display:none !important;}');
}

var X_LINK_ATTR_FIND_REGEX = /^xlink:\w/;
var X_LINK_ATTR_REPLACE_REGEX = /^xlink:/;
var XML_NS = 'http://www.w3.org/2000/xmlns/';
var X_LINK_NS = 'http://www.w3.org/1999/xlink';
var Null = {
  ns: null
};

function getAttrNS(attr, elem) {
  var isXmlNs = attr === 'xmlns';

  if (isXmlNs || attr === 'xmlns:xlink') {
    if (elem.nodeName !== 'SVG') {
      return Null;
    }

    return {
      ns: XML_NS,
      name: isXmlNs ? 'xmlns' : 'xlink'
    };
  }

  if (X_LINK_ATTR_FIND_REGEX.test(attr)) {
    if (!new Elem(elem).closest('svg').length) {
      return Null;
    }

    return {
      ns: X_LINK_NS,
      name: attr.replace(X_LINK_ATTR_REPLACE_REGEX, '')
    };
  }

  return Null;
}

var HTML_COLLECTION_REGEX = /^(HTMLCollection|NodeList)$/;
var DOCUMENT_REGEX = /Document$/;
var ELEMENT_REGEX = /Element$/;

function isDocument(value) {
  return DOCUMENT_REGEX.test(toStringTag$1(value));
}

function isElem(value) {
  return value instanceof Elem;
}

function isElementsCollection(value) {
  return HTML_COLLECTION_REGEX.test(toStringTag$1(value)) || isElem(value) || isArray(value);
}

function isValidNode(value) {
  var tag = toStringTag$1(value);

  return ELEMENT_REGEX.test(tag) || DOCUMENT_REGEX.test(tag) || tag === 'Text' || tag === 'DocumentFragment' || tag === 'Comment';
}

var EVENT_REGEX = /Event$/;

function getEvent(event, bubbles, cancelable, realDetails, elem) {
  var finalEvent = event;

  if (!EVENT_REGEX.test(toStringTag$1(finalEvent))) {
    try {
      finalEvent = new Event(finalEvent, { bubbles: bubbles, cancelable: cancelable });
      assign(finalEvent, realDetails);
    } catch (err) {
      var document = isDocument(elem) ? elem : elem.ownerDocument;

      finalEvent = document.createEvent('Event');
      finalEvent.initEvent(event, bubbles, cancelable);

      assign(finalEvent, realDetails);
    }
  }

  return finalEvent;
}

function hide(elem) {
  createHideStyleNode(new Elem(elem.ownerDocument.head));
  new Elem(elem).addClass(HIDE_CLASS);
}

var indexOf = [].indexOf;


function getMatchesFunction(elem) {
  return elem.matches || elem.matchesSelector || elem.webkitMatchesSelector || elem.mozMatchesSelector || elem.msMatchesSelector || elem.oMatchesSelector || matches;
}

function matches(selector) {
  var _context;

  var document = isDocument(this) ? this : this.ownerDocument;

  return (_context = document.querySelectorAll(selector), indexOf).call(_context, this) !== -1;
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

/**
 * @callback CollectCallback
 * @public
 * @param {AddCallback} add - Add element to the eventual set function.
 * @param {Element|Node} node - Iteration element.
 * @param {Number} index - Iteration index.
 * @param {Elem} elem - Initial set.
 */

/**
 * @callback AddCallback
 * @public
 * @param {...(Element|Node|elem)} elem - Element to add.
 */

/**
 * @callback ElemMethod
 * @public
 * @this Elem
 */

var EVENT_SEPARATOR_REGEX = /[,| ] */;
var CSS_STYLES_SEPARATOR_REGEX = /; ?/;
var CSS_IMPORTANT_REGEX = / ?!important$/;
var emptyCollection = [];

/**
 * @class Elem
 * @extends Array.<Element|Node>
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

    /**
     * @method Elem.addMethods
     * @public
     * @param {String|Object.<String, ElemMethod>} methodName - Name of the method or object of
     * method names and methods.
     * @param {ElemMethod} [method] - If the first argument is a string this should be the method itself.
     * @returns {typeof Elem}
     */
    value: function addMethods(methodName, method) {
      if (arguments.length >= 2) {
        methodName = defineProperty({}, methodName, method);
      }

      definePrototypeProperties(this.prototype, methodName);

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

      for (var _len = arguments.length, elements = Array(_len), _key = 0; _key < _len; _key++) {
        elements[_key] = arguments[_key];
      }

      iterateArray(elements, function (elem) {
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
      for (var _len2 = arguments.length, classes = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        classes[_key2] = arguments[_key2];
      }

      return this.forEach(function (elem) {
        var list = elem.classList;

        iterateArray(classes, function (cls) {
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
     * @returns {Object|String|Elem} If no arguments passed, object of attributes of the first element in the set
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

        return collectFromArray(elem.attributes, addAttr);
      }

      if (arguments.length <= 1 && isString(_attr)) {
        if (!elem) {
          return null;
        }

        var _getAttrNS = getAttrNS(_attr, elem),
            ns = _getAttrNS.ns,
            name = _getAttrNS.name;

        return ns ? elem.getAttributeNS(ns, name) : elem.getAttribute(_attr);
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

          var _getAttrNS2 = getAttrNS(key, elem),
              ns = _getAttrNS2.ns;

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
     * @returns {Elem} Set of the children of the first element in the set.
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

    /**
     * @method Elem#collect
     * @public
     * @param {CollectCallback} callback - Called on each iteration.
     * @returns {Elem} Returns eventual set.
     * @description Method for collecting elements into a new set.
     *
     * @example
     * const parents = elem.collect((add, elem) => {
     *   add(elem.parentNode);
     * });
     */

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
        var document$$1 = isDocument(elem) ? elem : elem.ownerDocument;

        if (isText || type === '#comment') {
          el = isText ? document$$1.createTextNode('') : document$$1.createComment('');
        } else {
          el = type === 'svg' ? document$$1.createElementNS(SVG_NS, type) : document$$1.createElement(type);
        }

        if (!isDocument(elem)) {
          new Elem(el).into(elem);
        }

        add(el);
      });
    }

    /**
     * @method Elem#css
     * @public
     * @param {String|Object.<String, String>} [property] - Name of the property to get or
     * an object of the format { [property]: value, ... } to set styles.
     * @param {String} [value] - If the first argument is a string it should be a value to set for that property.
     * @returns {Object|String|Elem} If no arguments passed, object of css styles of the element returned,
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
     * @returns {Object|String|Elem} If no arguments passed, object of dataset of the element returned,
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
      var _details$bubbles = details.bubbles,
          bubbles = _details$bubbles === undefined ? true : _details$bubbles,
          _details$cancelable = details.cancelable,
          cancelable = _details$cancelable === undefined ? true : _details$cancelable,
          realDetails = objectWithoutProperties(details, ['bubbles', 'cancelable']);


      return this.forEach(function (elem) {
        elem.dispatchEvent(getEvent(event, bubbles, cancelable, realDetails, elem));
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
     * @param {IterationCallback|String} filter - Filter function or a selector.
     * @returns {Elem} New instance of Elem.
     * @description Method for filtering elements.
     *
     * @example
     * elem.filter((elem) => new Elem(elem).closest('.parent'));
     */

  }, {
    key: 'filter',
    value: function filter(_filter) {
      var _this3 = this;

      if (isString(_filter)) {
        var selector = _filter;

        _filter = function _filter(elem) {
          return new Elem(elem).is(selector);
        };
      }

      return this.collect(function (add, elem, index) {
        if (_filter(elem, index, _this3)) {
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

      var _getAttrNS3 = getAttrNS(attr, elem),
          ns = _getAttrNS3.ns;

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

    /**
     * @method Elem#includes
     * @public
     * @param {Element|node} elem - Element to search.
     * @return {Boolean} If the element is in the set.
     * @description The same as Array#includes.
     */

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

      if (!element) {
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
      var matches = getMatchesFunction(elem);

      return matches.call(elem, selector);
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

      return elem ? elem.nodeName.toLowerCase() : undefined;
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
     *   (e, elem, index) => console.log(elem.value)
     * );
     * elem.on(
     *   'change, input',
     *   (e, elem, index) => console.log(elem.value)
     * );
     * elem.on({
     *   'change, input': (e, elem, index) => console.log(elem.value),
     *   'blur': () => console.log('blur')
     * });
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
      for (var _len3 = arguments.length, attributes = Array(_len3), _key4 = 0; _key4 < _len3; _key4++) {
        attributes[_key4] = arguments[_key4];
      }

      return this.forEach(function (elem) {
        iterateArray(attributes, function (attr) {
          var _getAttrNS4 = getAttrNS(attr, elem),
              ns = _getAttrNS4.ns;

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
      for (var _len4 = arguments.length, classes = Array(_len4), _key5 = 0; _key5 < _len4; _key5++) {
        classes[_key5] = arguments[_key5];
      }

      return this.forEach(function (elem) {
        var list = elem.classList;

        iterateArray(classes, function (cls) {
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
      for (var _len5 = arguments.length, props = Array(_len5), _key6 = 0; _key6 < _len5; _key6++) {
        props[_key6] = arguments[_key6];
      }

      return this.forEach(function (elem) {
        iterateArray(props, function (css) {
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

    /**
     * @method Elem#slice
     * @public
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
     * @returns {Elem}
     * @description The same as Array#slice but for Elem.
     */

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
      var _arguments = arguments;

      return this.forEach(function (elem) {
        elem = new Elem(elem);

        if (_arguments.length < 2 ? !elem.hasAttr(attr) : condition) {
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
      var _arguments2 = arguments;

      return this.forEach(function (elem) {
        var _elem = elem,
            classList = _elem.classList;


        elem = new Elem(elem);

        if (_arguments2.length < 2 ? !classList.contains(cls) : condition) {
          elem.addClass(cls);
        } else {
          elem.removeClass(cls);
        }
      });
    }
  }]);
  return Elem;
}(Array);

setToStringTag(Elem, 'Elem');
setSymbolSpecies(Elem, Array);

var InternalMixin = function InternalMixin(opts) {
  classCallCheck(this, InternalMixin);

  assign(this, opts);
};

function calculateArgs(normalizedArgs, args, argsObject) {
  iterateArray(keys(argsObject), function (arg) {
    if (!(arg in args)) {
      argsObject[arg] = undefined;
    }
  });

  iterateObject(normalizedArgs, function (value, arg) {
    argsObject[arg] = value;
  });
}

function cleanProperty(value, arg, object) {
  delete object[arg];
}

function executeMixinWatchers(mixin, value) {
  var oldValue = mixin.$$.value;

  mixin.$$.value = value;

  iterateArray(mixin.$$.watchers, function (watcher) {
    watcher(value, oldValue);
  });
}

function calculateAttrs(_ref) {
  var newAttrs = _ref.newAttrs,
      currentAttrs = _ref.currentAttrs,
      currentMixins = _ref.currentMixins,
      elem = _ref.elem,
      parentBlock = _ref.parentBlock,
      firstTime = _ref.firstTime;

  iterateObject(currentAttrs, function (value, attr) {
    if (!hasOwnProperty(newAttrs, attr)) {
      if (value instanceof InternalMixin) {
        currentMixins[attr].$$.remove();
        delete currentMixins[attr];
      } else {
        elem.removeAttr(attr);
      }

      delete currentAttrs[attr];
    }
  });

  var mixins = [];

  iterateObject(newAttrs, function (value, attr) {
    var prevValue = currentAttrs[attr];

    if (prevValue === value) {
      return;
    }

    if (value instanceof InternalMixin) {
      var parentScope = value.parentScope,
          Mixin = value.Mixin,
          evalFn = value.value;


      if (prevValue) {
        var mixin = currentMixins[attr];
        var $$ = mixin.$$;

        var newValue = void 0;

        $$.internal = value;

        if ($$.internals.indexOf(value) === -1) {
          $$.internals.push(value);

          if (Mixin.evaluate) {
            newValue = parentScope.$$.evaluate(evalFn, constructMixinWatcher(mixin, value), mixin);
          }
        } else if (Mixin.evaluate) {
          newValue = parentScope.$$.evaluate(evalFn);
        }

        if (Mixin.evaluate) {
          executeMixinWatchers(mixin, newValue);
        }
      } else {
        var _buildMixin = function _buildMixin() {
          var mixin = new Mixin(_extends({}, value, {
            parentBlock: parentBlock,
            elem: elem,
            internal: value
          }));
          var $$ = mixin.$$;


          $$.internal = value;
          $$.internals = [value];
          currentMixins[attr] = mixin;

          if (Mixin.evaluate) {
            var afterUpdate = function afterUpdate(newValue, oldValue) {
              try {
                mixin.afterUpdate(newValue, oldValue);
              } catch (err) {
                console.error('Uncaught error in ' + $$.name + '#afterUpdate:', err);
              }
            };

            $$.value = parentScope.$$.evaluate(evalFn, constructMixinWatcher(mixin, value), mixin);
            afterUpdate($$.evaluate(afterUpdate));
          }
        };

        if (firstTime) {
          mixins.push(_buildMixin);
        } else {
          _buildMixin();
        }
      }
    } else {
      elem.attr(attr, value);
    }

    currentAttrs[attr] = value;
  });

  if (firstTime) {
    return function () {
      iterateArray(mixins, buildMixin);
    };
  }
}

function constructMixinWatcher(mixin, internalMixin) {
  return function (newValue) {
    if (mixin.$$.internal === internalMixin) {
      executeMixinWatchers(mixin, newValue);
    }
  };
}

function buildMixin(builder) {
  builder();
}

function normalizeArgs(argsChain) {
  var newArgs = {};

  iterateArray(argsChain, function (args) {
    iterateObject(args, function (value, arg) {
      newArgs[arg] = value;
    });
  });

  return newArgs;
}

function constructPrivateScope(object, type, parentScope) {
  var scope = {};

  if (type === 'globals') {
    scope = create(parentScope ? parentScope.$$.globals : null);
  }

  return collectFromObject(object, function (scope, value, key) {
    scope[key] = {
      value: value,
      watchers: []
    };
  }, scope);
}

function removeTempWatcher(watcher) {
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

function constructPublicScope(scope, scopeValues, privateScope) {
  defineProperties(scope, mapObject(scopeValues, function (value, key) {
    var scope = privateScope[key];

    return {
      configurable: false,
      enumerable: true,
      get: function get() {
        if (evalMode) {
          if (gettingVars.indexOf(scope.watchers) === -1) {
            gettingVars.push(scope.watchers);
          }
        }

        return scope.value;
      },
      set: function set(value) {
        if (value === scope.value) {
          return;
        }

        var oldTempWatchers = scope.watchers.slice();

        scope.watchers = [];
        scope.value = value;

        iterateArray(oldTempWatchers, removeTempWatcher);
      }
    };
  }));
}

var _ref$2 = {};
var isPrototypeOf = _ref$2.isPrototypeOf;


function isInstanceOf(Class, Subclass) {
  var _context;

  return isPrototypeOf.call(Class, Subclass) && (_context = Class.prototype, isPrototypeOf).call(_context, Subclass.prototype);
}

var toStringTag$2 = '[object Mixin]';

/**
 * @class Mixin
 * @public
 * @param {Object} opts - Mixin options.
 * @returns {Mixin} Instance of Mixin.
 */

var Mixin = function () {
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
    /**
     * @member {Boolean} [Mixin.evaluate = true]
     * @type {Boolean}
     * @public
     * @description If the mixin value should be evaluated and watched or not.
     */

  }]);

  function Mixin(opts) {
    var _this = this;

    classCallCheck(this, Mixin);
    var internal = opts.internal,
        elem = opts.elem,
        args = opts.args,
        parentBlock = opts.parentBlock,
        parentScope = opts.parentScope,
        parentTemplate = opts.parentTemplate;

    var watchersToRemove = [];
    var watchers = [];

    var _getProto = getProto(this),
        constructor = _getProto.constructor;

    var name = constructor.displayName || constructor.name;

    defineFrozenProperties(this, {
      /**
       * @member {Object} Mixin#$$
       * @type {Object}
       * @protected
       * @property {Function} Mixin#$$.evaluate - Evaluate function.
       * @property {Boolean} Mixin#$$.isRemoved - If the block is removed.
       * @property {InternalMixin} Mixin#$$.internal - Current internal mixin instance.
       * @property {InternalMixin[]} Mixin#$$.internals - Array of internal mixins bound to the the mixin.
       * @property {String} Mixin#$$.name - Mixin name.
       * @property {Block|void} Mixin#$$.parentBlock - Parent block.
       * @property {Block|void} Mixin#$$.parentScope - Parent scope.
       * @property {Block|void} Mixin#$$.parentTemplate - Parent template.
       * @property {*} Mixin#$$.value - Current value.
       * @property {Watcher[]} Block#$$.watchers - Temporary vars watchers.
       * @property {Object[]} Block#$$.watchersToRemove - Watchers to remove before removing mixin.
       */
      $$: {
        name: name,
        internal: internal,
        parentScope: parentScope,
        parentBlock: parentBlock,
        parentTemplate: parentTemplate,
        watchers: watchers,
        watchersToRemove: watchersToRemove,
        isRemoved: false,
        evaluate: function evaluate(watcher) {
          var _$$ = _this.$$,
              value = _$$.value,
              internal = _$$.internal;

          var currentValue = constructor.evaluate ? value : parentScope.$$.evaluate(internal.value);

          if (watcher) {
            watchers.push(watcher);
          }

          return currentValue;
        },
        remove: function remove$$1(isParentSignal) {
          isParentSignal = !!isParentSignal;
          _this.$$.isRemoved = true;

          removeWatchers(watchersToRemove);

          try {
            _this.beforeRemove(isParentSignal);
          } catch (err) {
            console.error('Uncaught error in ' + name + '#beforeRemove:', err);
          }

          if (!isParentSignal) {
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

    /**
     * @member {String} [Mixin#name]
     * @type {String}
     * @public
     */
    this.name = name;

    parentBlock.$$.mixins.push(this);
  }

  createClass(Mixin, [{
    key: 'afterUpdate',
    value: function afterUpdate() {}

    /**
     * @method Mixin#beforeRemove
     * @public
     * @param {Boolean} isElementRemoved - If element removed as well.
     * @description Is called before the mixin removal.
     */

  }, {
    key: 'beforeRemove',
    value: function beforeRemove(isElementRemoved) {}

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
  }, {
    key: 'toString',
    value: function toString() {
      return toStringTag$2;
    }
  }]);
  return Mixin;
}();

Mixin.evaluate = true;


setToStringTag(Mixin, 'Mixin');

var emptyArray = [];

function createBlock(_ref) {
  var node = _ref.node,
      parent = _ref.parent,
      parentElem = _ref.parentElem,
      parentBlock = _ref.parentBlock,
      parentScope = _ref.parentScope,
      parentTemplate = _ref.parentTemplate,
      prevBlock = _ref.prevBlock;

  var doc = isDocument(parentElem[0]) ? parentElem : new Elem(parentElem[0].ownerDocument);
  var args = node.args || {};
  var type = node.type;

  var isElements = type === blocks.Elements;
  var children = node.children;

  var _constructor = !isString(type) && type;
  var DynamicBlockArgs = void 0;

  if (type === blocks.DynamicBlock) {
    DynamicBlockArgs = except(args, 'type');
  }

  if (isArray(_constructor)) {
    var _class, _temp;

    _constructor = (_temp = _class = function (_Block) {
      inherits(constructor, _Block);

      function constructor() {
        classCallCheck(this, constructor);
        return possibleConstructorReturn(this, (constructor.__proto__ || Object.getPrototypeOf(constructor)).apply(this, arguments));
      }

      return constructor;
    }(Block), _class.html = _constructor, _temp);
  }

  if (!isInstanceOf(Block, _constructor) && !isString(type)) {
    throw new Error('Wrong block type given: ' + type);
  }

  if (!_constructor) {
    var value = node.value;

    var elem = (parentElem[0].namespaceURI === SVG_NS ? doc.create('svg') : doc).create(type);
    var currentAttrs = create(null);
    var currentMixins = create(null);
    var attrs = create(null);
    var wasRest = void 0;
    var attrsChain = [attrs];

    iterateObject(args, function (value, attr) {
      var isRest = value.mixin === mixins.Rest;
      var localAttrs = isRest || wasRest ? create(attrs) : attrs;

      if (attrs !== localAttrs) {
        attrsChain.push(localAttrs);
      }

      attrs = localAttrs;

      if (isRest) {
        var restAttrs = parentScope.$$.evaluate(value, function (value) {
          iterateObject(localAttrs, cleanProperty);
          assign(localAttrs, value);
          calculateAttrs({
            newAttrs: normalizeArgs(attrsChain),
            currentAttrs: currentAttrs,
            currentMixins: currentMixins,
            elem: elem,
            parentBlock: parentBlock,
            firstTime: false
          });
        }, parentBlock);

        wasRest = true;

        return assign(localAttrs, restAttrs);
      }

      wasRest = false;

      if (isInstanceOf(Mixin, value.mixin)) {
        localAttrs[attr] = new InternalMixin({
          Mixin: value.mixin,
          args: value.args,
          parentScope: parentScope,
          parentTemplate: parentTemplate,
          value: value
        });

        return;
      }

      localAttrs[attr] = parentScope.$$.evaluate(value, function (value) {
        localAttrs[attr] = value;
        calculateAttrs({
          newAttrs: normalizeArgs(attrsChain),
          currentAttrs: currentAttrs,
          currentMixins: currentMixins,
          elem: elem,
          parentBlock: parentBlock,
          firstTime: false
        });
      }, parentBlock);
    });

    parentBlock.$$.mixinsToBuild.push(calculateAttrs({
      newAttrs: normalizeArgs(attrsChain),
      currentAttrs: currentAttrs,
      currentMixins: currentMixins,
      elem: elem,
      parentBlock: parentBlock,
      firstTime: true
    }));

    if (type === '#comment') {
      elem.text(value);
    }

    if (type === '#text') {
      var text = parentScope.$$.evaluate(value, function (value) {
        if (isNil(value)) {
          value = '';
        }

        elem.text('' + value);
      }, parentBlock);

      if (isNil(text)) {
        text = '';
      }

      elem.text('' + text);
    }

    var isParentBlock = parent instanceof Block;
    var childBlocks = [];

    /* istanbul ignore if */
    if (type === 'iframe' && !('src' in attrs)) {
      elem.on('load', function () {
        var document$$1 = elem[0].contentDocument;
        var doc = new Elem(document$$1);

        new Elem(document$$1.documentElement).remove();
        iterateChildren(childBlocks, true);

        function iterateChildren(children, isRoot) {
          iterateArray(children, function (child) {
            if (child instanceof Block) {
              if (isRoot) {
                child.$$.parentElem = doc;
                child.$$.parent = doc;
                child.$$.content.into(doc);
              }

              iterateChildren(child.$$.children, false);
            } else {
              child.into(doc);
            }
          });
        }
      });
    }

    if (prevBlock instanceof Block) {
      prevBlock.$$.insertAfterIt(elem, false);
    } else if (prevBlock) {
      elem.insertAfter(prevBlock);

      if (isParentBlock) {
        parent.$$.addContent(elem);
      }
    } else if (isParentBlock) {
      parent.$$.insertInStartOfIt(elem, false);
    } else {
      elem.into(parentElem, false);
    }

    if (children) {
      var _prevBlock = void 0;
      var _parentElem = elem;

      /* istanbul ignore if */
      if (type === 'template') {
        _parentElem = new Elem(elem[0].content = elem[0].content || doc[0].createDocumentFragment());
      } else if (type === 'iframe') {
        if ('src' in attrs) {
          children = emptyArray;
        } else {
          var document$$1 = elem[0].contentDocument;

          new Elem(document$$1.documentElement).remove();

          _parentElem = new Elem(document$$1);
        }
      }

      iterateArray(children, function (child) {
        _prevBlock = createBlock({
          node: child,
          parent: _parentElem,
          parentElem: _parentElem,
          parentBlock: parentBlock,
          parentScope: parentScope,
          parentTemplate: parentTemplate,
          prevBlock: _prevBlock
        });
        childBlocks.push(_prevBlock);
      });
    }

    return elem;
  }

  var blockInstance = new _constructor({
    args: args,
    DynamicBlockArgs: DynamicBlockArgs,
    children: children,
    parent: parent,
    parentElem: parentElem,
    parentBlock: parentBlock,
    parentScope: parentScope,
    parentTemplate: parentTemplate,
    prevBlock: prevBlock
  });
  var $$ = blockInstance.$$,
      name = blockInstance.$$.name,
      Args = blockInstance.args,
      globals = blockInstance.globals,
      locals = objectWithoutProperties(blockInstance, ['$$', '$$', 'args', 'globals']);


  var html = isElements ? Args.value || [] : _constructor.html;

  $$.args = constructPrivateScope(Args);
  $$.locals = constructPrivateScope(locals);
  $$.globals = constructPrivateScope(globals, 'globals', parentScope);

  if (type === blocks.Item) {
    var _scopeValues;

    var scopeValues = (_scopeValues = {}, defineProperty(_scopeValues, node.itemName, node.item), defineProperty(_scopeValues, node.indexName, node.index), _scopeValues);
    var scope = parentScope.$$.Constructor === blocks.Item ? parentScope.$$.scope : parentScope;

    $$.privateScope = constructPrivateScope(scopeValues);
    constructPublicScope($$.scope = create(scope), scopeValues, $$.privateScope);
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
  parentScope = isElements ? Args.parentScope : blockInstance;
  parentTemplate = isElements ? Args.parentTemplate : blockInstance;

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

  iterateArray(blockInstance.$$.mixinsToBuild, function (executeBuilders) {
    executeBuilders();
  });
  blockInstance.$$.mixinsToBuild = [];

  try {
    blockInstance.afterRender();
  } catch (err) {
    console.error('Uncaught error in ' + name + '#afterRender:', err);
  }

  return blockInstance;
}

function getDefaultArgs(argsDescriptions) {
  var newArgs = create(null);

  iterateObject(argsDescriptions, function (_ref, arg) {
    var def = _ref.default;

    newArgs[arg] = def;
  });

  return newArgs;
}

function removeWithParentSignal(child) {
  child.$$.remove(true);
}

function remove$1(child) {
  child.$$.remove();
}

function wrapBlock(block, wrapper) {
  var returnValue = wrapper(block);

  return isInstanceOf(Block, returnValue) ? returnValue : block;
}

function wrapMixin(mixin, wrapper) {
  var returnValue = wrapper(mixin);

  return isInstanceOf(Mixin, returnValue) ? returnValue : mixin;
}

/**
 * @typedef {BlockNode[]} Template
 * @public
 * @property {String[]} vars - Template used vars.
 */

/**
 * @typedef {Object} BlockNode
 * @public
 * @property {String|typeof Block} type - Block type.
 * @property {Object} [args] - Block args.
 * @property {BlockNode[]} children - Block children.
 * @property {*} value - Text or comment node value.
 */

/**
 * @typedef {Error} EvaluationError
 * @public
 * @property {Function} func - Function which caused eval error.
 * @property {String} original - Evaluated expression original js.
 * @property {Block} block - Block in context of which the expression has been evaluated with the error.
 */

/**
 * @callback Watcher
 * @public
 * @param {*} newValue - New value.
 * @param {*} oldValue - Old value.
 */

/**
 * @callback Wrapper
 * @public
 * @param {typeof Block|typeof Mixin} Block class to wrap.
 * @returns {typeof Block} New Block class.
 */

var toStringTag$$1 = '[object Block]';
var afterElem = new Elem();
var emptyObject = {};
var evalMode = false;
var gettingVars = [];

/**
 * @class Block
 * @extends null
 * @public
 * @param {Object} opts - Block options.
 * @returns {Block} Instance of Block.
 *
 * @example
 * import { Block, initApp } from 'dwayne';
 *
 * class App extends Block {
 *   static html = html`<Hello text="{text}"/> ({ this.times })`;
 *
 *   constructor(opts) {
 *     super(opts);
 *
 *     this.text = 'world';
 *     this.times = 0;
 *
 *     this.setInterval();
 *   }
 *
 *   setInterval() {
 *     this.interval = setInterval(() => {
 *       this.times++;
 *     });
 *   }
 *
 *   beforeRemove() {
 *     clearInterval(this.interval);
 *   }
 * }
 *
 * Block.block('App', App);
 * Block.block('Hello', html`Hello, {args.text}!`);
 *
 * initApp('App', document.getElementById('root'));
 */

var Block = function () {
  createClass(Block, null, [{
    key: 'onEvalError',


    /**
     * @method Block.onEvalError
     * @public
     * @param {EvaluationError} err - The method is called when an evaluation error occurs.
     */


    /**
     * @member {String} [Block.displayName = null]
     * @type {String}
     * @public
     * @description Block display name.
     */

    /**
     * @member {Object} [Block.args = null]
     * @type {Object}
     * @public
     * @description Block args description.
     */
    value: function onEvalError(err) {
      console.error('Eval error (evaluating "' + (err.original || err.func) + '" in context of ' + err.block.$$.name + '):', err);
    }

    /**
     * @method Block.wrap
     * @public
     * @param {...Wrapper} wrappers - Functions that return wrapped block.
     * @returns {typeof Block} New block.
     * @description Method for wrapping blocks into another blocks.
     * It is considered best practice to just extends the old block with a new one.
     */


    /**
     * @member {Template} [Block.html = []]
     * @type {Template}
     * @public
     * @description Block template.
     */


    /**
     * @member {Object} [Block.defaultLocals = null]
     * @type {Object}
     * @public
     * @description Block default locals.
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
    var _this = this;

    classCallCheck(this, Block);
    var originalArgs = opts.args,
        DynamicBlockArgs = opts.DynamicBlockArgs,
        children = opts.children,
        parent = opts.parent,
        parentElem = opts.parentElem,
        parentBlock = opts.parentBlock,
        parentScope = opts.parentScope,
        parentTemplate = opts.parentTemplate,
        prevBlock = opts.prevBlock;

    var watchersToRemove = [];

    var _getProto = getProto(this),
        constructor = _getProto.constructor;

    var name = constructor.displayName || constructor.name;
    var childrenBlocks = [];
    var childrenMixins = [];
    var isParentBlock = parent instanceof Block;
    var isElements = constructor === blocks.Elements;

    defineFrozenProperties(this, {
      /**
       * @member {Object} Block#$$
       * @type {Object}
       * @protected
       * @property {Object} Block#$$.args - Private args scope.
       * @property {Block[]} Block#$$.children - Child blocks.
       * @property {Elem} Block#$$.content - Content elements.
       * @property {Object|void} Block#$$.DynamicBlockArgs - DynamicBlock args.
       * @property {Function} Block#$$.evaluate - Evaluate function.
       * @property {Object} Block#$$.globals - Private globals scope.
       * @property {Object[]} Block#$$.htmlChildren - Block html children.
       * @property {Boolean} Block#$$.isRemoved - If the block is removed.
       * @property {Boolean} Block#$$.isRendered - If the block is rendered.
       * @property {Object} Block#$$.locals - Private locals scope.
       * @property {Mixin[]} Block#$$.mixins - Child mixins.
       * @property {Function[]} Block#$$.mixinsToBuild - Pending mixins builders.
       * @property {String} Block#$$.name - Block name.
       * @property {typeof Block} Block#$$.Constructor - Block constructor.
       * @property {Block|Elem|void} Block#$$.parent - Parent block or elem.
       * @property {Block|void} Block#$$.parentBlock - Parent block.
       * @property {Elem} parentElem - Parent element.
       * @property {Block|void} Block#$$.parentScope - Parent scope.
       * @property {Block|void} Block#$$.parentTemplate - Parent template.
       * @property {Block|Elem|void} Block#$$.prevBlock - Parent template.
       * @property {Watcher[]} Block#$$.watchers - Temporary vars watchers.
       * @property {Object[]} Block#$$.watchersToRemove - Watchers to remove before removing the block.
       */
      $$: {
        name: name,
        DynamicBlockArgs: DynamicBlockArgs,
        parent: parent,
        parentElem: parentElem,
        parentScope: parentScope,
        parentBlock: parentBlock,
        parentTemplate: parentTemplate,
        content: new Elem(),
        Constructor: constructor,
        htmlChildren: children || [],
        children: childrenBlocks,
        mixins: childrenMixins,
        mixinsToBuild: [],
        prevBlock: prevBlock,
        watchersToRemove: watchersToRemove,
        isRemoved: false,
        isRendered: false,
        evaluate: function evaluate(func, onChange, targetBlock, forElements, forItem) {
          if (!isFunction(func)) {
            return func;
          }

          forElements = !!forElements;

          var scope = constructor === blocks.Item && !forItem ? _this.$$.scope : _this;

          var _ref = targetBlock ? targetBlock.$$ : emptyObject,
              watchersToRemove = _ref.watchersToRemove;

          var onChangeFlag = !!onChange;

          var evaluate = function evaluate() {
            var result = void 0;

            if (onChangeFlag) {
              evalMode = true;
              gettingVars = [];
            }

            try {
              result = func(scope);
            } catch (err) {
              err.func = func;
              err.original = func.original;
              err.block = _this;

              if (isFunction(constructor.onEvalError)) {
                try {
                  constructor.onEvalError(err);
                } catch (e) {
                  console.error('Uncaught error in ' + name + '.onEvalError:', e);
                }
              }
            }

            if (onChangeFlag) {
              var localWatchers = [];

              iterateArray(gettingVars, function (watchers) {
                var watcher = function watcher() {
                  iterateArray(localWatchers, function (watcherBlock) {
                    var watcher = watcherBlock.watcher,
                        watchers = watcherBlock.watchers;


                    removeArrayElem(watchersToRemove, watcherBlock);
                    removeArrayElem(watchers, watcher);
                  });

                  var newResult = evaluate();

                  if (newResult !== result && !targetBlock.$$.isRemoved && !_this.$$.isRemoved) {
                    onChange(newResult, result);
                  }
                };
                var watcherBlock = {
                  forElements: forElements,
                  watcher: watcher,
                  watchers: watchers
                };

                localWatchers.push(watcherBlock);
                watchersToRemove.push(watcherBlock);
                watchers.push(watcher);
              });

              evalMode = false;
              gettingVars = [];
            }

            return result;
          };

          return evaluate();
        },
        remove: function remove$$1(isParentSignal) {
          _this.$$.isRemoved = true;

          removeWatchers(watchersToRemove);

          iterateArray(childrenBlocks, removeWithParentSignal);
          iterateArray(childrenMixins, removeWithParentSignal);

          try {
            _this.beforeRemove();
          } catch (err) {
            console.error('Uncaught error in ' + name + '#beforeRemove:', err);
          }

          if (!isParentSignal && isParentBlock) {
            parent.$$.removeContent(_this.$$.content);
          }

          if (!isParentSignal && parentBlock) {
            removeArrayElem(parentBlock.$$.children, _this);
          }

          _this.$$.content.remove();
        },
        changeContent: function changeContent(newContent) {
          _this.$$.content = newContent;

          if (_this.$$.isRendered && !_this.$$.isRemoved) {
            try {
              _this.afterDOMChange();
            } catch (err) {
              console.error('Uncaught error in ' + name + '#afterDOMChange:', err);
            }
          }
        },
        addContent: function addContent(contentToAdd, notRecursive) {
          var oldContent = _this.$$.content;
          var index = oldContent.indexOf(contentToAdd[0].previousSibling) + 1;
          var newContent = void 0;

          if (index === 0) {
            newContent = contentToAdd.add(oldContent);
          } else {
            newContent = oldContent.slice(0, index).add(contentToAdd, oldContent.slice(index));
          }

          _this.$$.changeContent(newContent);

          if (isParentBlock && !notRecursive) {
            parent.$$.addContent(contentToAdd, notRecursive);
          }
        },
        moveContent: function moveContent(contentToMove, after) {
          var oldContent = _this.$$.content;
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

          _this.$$.changeContent(newContent);

          if (isParentBlock && indexToPut) {
            parent.$$.moveContent(contentToMove, after);
          }
        },
        removeContent: function removeContent(contentToRemove) {
          _this.$$.changeContent(_this.$$.content.filter(function (elem) {
            return contentToRemove.indexOf(elem) === -1;
          }));

          if (isParentBlock) {
            parent.$$.removeContent(contentToRemove);
          }
        },
        insertInStartOfIt: function insertInStartOfIt(contentToInsert, moveFlag) {
          var prevBlock = _this.$$.prevBlock;

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
            _this.$$.moveContent(contentToInsert, after);
          } else {
            _this.$$.addContent(contentToInsert, true);
          }

          return after;
        },
        insertAfterIt: function insertAfterIt(contentToInsert, moveFlag) {
          var prevBlock = _this.$$.prevBlock;

          var after = afterElem;
          var tryToAddOrMove = void 0;

          if (_this.$$.content.length) {
            after = _this.$$.content.elem(-1);
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
      _this[variable] = value;
    });
    iterateArray(constructor.html.vars || [], function (variable) {
      _this[variable] = _this[variable];
    });

    var argsObject = create(null);
    var argsDescriptions = constructor.args;

    var defaultArgs = getDefaultArgs(argsDescriptions);
    var args = create(defaultArgs);
    var wasRest = void 0;
    var argsChain = [defaultArgs, args];

    iterateObject(originalArgs, function (value, arg) {
      var isRest = value.mixin === mixins.Rest;
      var localArgs = isRest || wasRest ? create(args) : args;

      if (args !== localArgs) {
        argsChain.push(localArgs);
      }

      args = localArgs;

      if (isRest) {
        var restArgs = parentScope.$$.evaluate(value, function (value) {
          iterateObject(localArgs, cleanProperty);
          assign(localArgs, value);
          calculateArgs(normalizeArgs(argsChain), args, argsObject);
        }, _this);

        wasRest = true;

        return assign(localArgs, restArgs);
      }

      wasRest = false;

      if (isInstanceOf(Mixin, value.mixin)) {
        localArgs[arg] = new InternalMixin({
          Mixin: value.mixin,
          args: value.args,
          value: value,
          parentScope: parentScope,
          parentTemplate: parentTemplate
        });

        return;
      }

      var forElements = isElements && arg === 'value';

      localArgs[arg] = parentScope.$$.evaluate(value, function (value) {
        localArgs[arg] = value;
        calculateArgs(normalizeArgs(argsChain), args, argsObject);
      }, _this, forElements, isElements && parentBlock.$$.Constructor === blocks.Item);
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

    calculateArgs(normalizeArgs(argsChain), args, argsObject);

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
     * @description Is called after block DOM structure has changed. Note that
     * it's important not to modify the DOM structure within the block. You can only insert
     * elements to empty elements (which Dwayne considers empty) and remove ones from them.
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
     * @method Block#getName
     * @public
     * @returns {String}
     * @description Returns Block name.
     */

  }, {
    key: 'getName',
    value: function getName() {
      return this.$$.name;
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
     * @description Returns block in which template the block is located in.
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
     * @description Returns block in which template the block is located in.
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
  }, {
    key: 'toString',
    value: function toString() {
      return toStringTag$$1;
    }
  }]);
  return Block;
}();

Block.args = null;
Block.defaultLocals = null;
Block.displayName = null;
Block.html = [];


setToStringTag(Block, 'Block');
setProto(Block.prototype, null);

var Case = function (_Block) {
  inherits(Case, _Block);

  function Case() {
    classCallCheck(this, Case);
    return possibleConstructorReturn(this, (Case.__proto__ || Object.getPrototypeOf(Case)).apply(this, arguments));
  }

  return Case;
}(Block);

var watchArgs = function watchArgs(_$) {
  return _$.args.value;
};

var Elements = function (_Block) {
  inherits(Elements, _Block);

  function Elements() {
    classCallCheck(this, Elements);
    return possibleConstructorReturn(this, (Elements.__proto__ || Object.getPrototypeOf(Elements)).apply(this, arguments));
  }

  createClass(Elements, [{
    key: 'afterConstruct',
    value: function afterConstruct() {
      var _this2 = this;

      var parentElem = this.$$.parentElem;
      var _args = this.args,
          parentScope = _args.parentScope,
          parentTemplate = _args.parentTemplate;


      this.$$.evaluate(watchArgs, function (value) {
        var _$$ = _this2.$$,
            children = _$$.children,
            mixins$$1 = _$$.mixins,
            parent = _$$.parent,
            watchersToRemove = _$$.watchersToRemove,
            content = _$$.content;


        iterateArray(children, removeWithParentSignal);
        iterateArray(mixins$$1, removeWithParentSignal);
        content.remove();

        if (parent instanceof Block) {
          parent.$$.removeContent(content);
        }

        _this2.$$.children = [];
        _this2.$$.mixins = [];
        _this2.$$.watchersToRemove = watchersToRemove.filter(function (_ref) {
          var watchers = _ref.watchers,
              watcher = _ref.watcher,
              forElements = _ref.forElements;

          if (forElements) {
            return true;
          }

          removeArrayElem(watchers, watcher);
        });
        _this2.$$.content = new Elem();

        var prevBlock = void 0;

        iterateArray(value || [], function (child) {
          prevBlock = createBlock({
            node: child,
            parent: _this2,
            parentElem: parentElem,
            parentBlock: _this2,
            parentScope: parentScope,
            parentTemplate: parentTemplate,
            prevBlock: prevBlock
          });
        });
        iterateArray(_this2.$$.mixinsToBuild, function (executeBuilders) {
          executeBuilders();
        });
        _this2.$$.mixinsToBuild = [];
      }, this, true);
    }
  }]);
  return Elements;
}(Block);

blocks.Elements = Elements;

var _tmpl;

var Children = function (_Block) {
  inherits(Children, _Block);

  function Children(opts) {
    classCallCheck(this, Children);

    var _this = possibleConstructorReturn(this, (Children.__proto__ || Object.getPrototypeOf(Children)).call(this, opts));

    var htmlChildren = _this.$$.parentTemplate.$$.htmlChildren;
    var name = _this.args.name;

    var found = void 0;

    if (name) {
      found = findInArray(htmlChildren, function (_ref) {
        var type = _ref.type,
            args = _ref.args;
        return type === Children && args && args.name === name;
      });

      _this.elems = found ? found.value.children : null;
    } else {
      _this.elems = htmlChildren;
    }
    return _this;
  }

  return Children;
}(Block);

Children.html = (_tmpl = [{
  "type": Elements,
  "args": {
    "value": function value(_$) {
      return _$.elems;
    },
    "parentScope": function parentScope(_$) {
      return _$.$$.parentTemplate.$$.parentScope;
    },
    "parentTemplate": function parentTemplate(_$) {
      return _$.$$.parentTemplate.$$.parentTemplate;
    }
  }
}], _tmpl.vars = ["elems"], _tmpl);

var _tmpl$1;

var watchArgs$1 = function watchArgs(_$) {
  return _$.args.type;
};

var DynamicBlock = function (_Block) {
  inherits(DynamicBlock, _Block);

  function DynamicBlock() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, DynamicBlock);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = DynamicBlock.__proto__ || Object.getPrototypeOf(DynamicBlock)).call.apply(_ref, [this].concat(args))), _this), _this.construct = function (type) {
      var _this$$$ = _this.$$,
          htmlChildren = _this$$$.htmlChildren,
          DynamicBlockArgs = _this$$$.DynamicBlockArgs;


      _this.elems = [{
        type: type,
        args: DynamicBlockArgs,
        children: htmlChildren
      }];
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(DynamicBlock, [{
    key: 'afterConstruct',
    value: function afterConstruct() {
      this.construct(this.evaluate(watchArgs$1, this.construct));
    }
  }]);
  return DynamicBlock;
}(Block);

DynamicBlock.html = (_tmpl$1 = [{
  "type": Elements,
  "args": {
    "value": function value(_$) {
      return _$.elems;
    },
    "parentScope": function parentScope(_$) {
      return _$.$$.parentScope;
    },
    "parentTemplate": function parentTemplate(_$) {
      return _$.$$.parentTemplate;
    }
  }
}], _tmpl$1.vars = ["elems"], _tmpl$1);


blocks.DynamicBlock = DynamicBlock;

var _tmpl$2;

var Item = function (_Block) {
  inherits(Item, _Block);

  function Item() {
    classCallCheck(this, Item);
    return possibleConstructorReturn(this, (Item.__proto__ || Object.getPrototypeOf(Item)).apply(this, arguments));
  }

  return Item;
}(Block);

Item.html = (_tmpl$2 = [{
  "type": Elements,
  "args": {
    "value": function value(_$) {
      return _$.$$.htmlChildren;
    },
    "parentScope": function parentScope(_$) {
      return _$;
    },
    "parentTemplate": function parentTemplate(_$) {
      return _$.$$.parentTemplate;
    }
  }
}], _tmpl$2.vars = [], _tmpl$2);


blocks.Item = Item;

var watchArgs$2 = function watchArgs(_$) {
  return [_$.args.set, _$.args.filterBy, _$.args.sortBy];
};

var Each = function (_Block) {
  inherits(Each, _Block);

  function Each(opts) {
    classCallCheck(this, Each);

    var _this = possibleConstructorReturn(this, (Each.__proto__ || Object.getPrototypeOf(Each)).call(this, opts));

    _initialiseProps.call(_this);

    var _this$args = _this.args,
        _this$args$item = _this$args.item,
        item = _this$args$item === undefined ? '$item' : _this$args$item,
        _this$args$index = _this$args.index,
        index = _this$args$index === undefined ? '$index' : _this$args$index;


    _this.itemName = item;
    _this.indexName = index;
    _this.itemsByUIDs = create(null);
    return _this;
  }

  createClass(Each, [{
    key: 'afterConstruct',
    value: function afterConstruct() {
      this.renderSet(this.evaluate(watchArgs$2, this.renderSet));
    }
  }]);
  return Each;
}(Block);

Each.args = {
  uid: {
    default: function _default(item, index) {
      return index;
    }
  }
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.renderSet = function (args) {
    var set$$1 = args[0];
    var filterBy = args[1];
    var sortBy = args[2];

    var _$$ = _this2.$$,
        htmlChildren = _$$.htmlChildren,
        parentScope = _$$.parentScope,
        parentElem = _$$.parentElem,
        parentTemplate = _$$.parentTemplate;
    var UID = _this2.args.uid,
        itemsByUIDs = _this2.itemsByUIDs,
        itemName = _this2.itemName,
        indexName = _this2.indexName;

    var newItemsByUIDs = create(null);
    var newUIDsByIndexes = create(null);
    var newUIDs = create(null);
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
      var uid = UID(item, index, set$$1, parentScope);

      if (uid in newUIDsByIndexes) {
        console.error('UIDs can\'t be same for multiple items! In UID function: "' + (UID.original || UID) + '"');
      }

      newUIDsByIndexes[uid] = index;
      newUIDs[index] = uid;
    });

    iterateObject(itemsByUIDs, function (block, uid) {
      if (!(uid in newUIDsByIndexes)) {
        remove$1(block);
      }
    });

    var prevBlock = void 0;

    iterate(set$$1, function (item, index) {
      var uid = newUIDs[index];
      var block = void 0;

      if (newUIDsByIndexes[uid] !== index) {
        return;
      }

      var prevUIDBlock = itemsByUIDs[uid];

      if (prevUIDBlock) {
        block = prevUIDBlock;
        block.$$.scope[indexName] = index;
        block.$$.scope[itemName] = item;

        if (block.$$.prevBlock !== prevBlock) {
          var content = block.$$.content;


          if (prevBlock) {
            prevBlock.$$.insertAfterIt(content, true);
          } else {
            _this2.$$.insertInStartOfIt(content, true);
          }
        }
      } else {
        block = createBlock({
          node: {
            type: Item,
            itemName: itemName,
            indexName: indexName,
            item: item,
            index: index,
            children: htmlChildren
          },
          parent: _this2,
          parentElem: parentElem,
          parentBlock: _this2,
          parentScope: parentScope,
          parentTemplate: parentTemplate,
          prevBlock: prevBlock
        });
      }

      newItemsByUIDs[uid] = block;
      block.$$.prevBlock = prevBlock;
      prevBlock = block;
    });

    _this2.itemsByUIDs = newItemsByUIDs;
  };
};

var _tmpl$3;

var watchArgs$3 = function watchArgs(_$) {
  return _$.args.if;
};

var If = function (_Block) {
  inherits(If, _Block);

  function If() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, If);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = If.__proto__ || Object.getPrototypeOf(If)).call.apply(_ref, [this].concat(args))), _this), _this.constructElems = function (condition) {
      condition = !!condition;

      if (_this.condition !== condition) {
        _this.condition = condition;
        _this.elems = condition ? _this.$$.htmlChildren : null;
      }
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(If, [{
    key: 'afterConstruct',
    value: function afterConstruct() {
      this.condition = false;
      this.constructElems(this.evaluate(watchArgs$3, this.constructElems));
    }
  }]);
  return If;
}(Block);

If.html = (_tmpl$3 = [{
  "type": Elements,
  "args": {
    "value": function value(_$) {
      return _$.elems;
    },
    "parentScope": function parentScope(_$) {
      return _$.$$.parentScope;
    },
    "parentTemplate": function parentTemplate(_$) {
      return _$.$$.parentTemplate;
    }
  }
}], _tmpl$3.vars = ["elems"], _tmpl$3);

var _tmpl$4;

var watchArgs$4 = function watchArgs(_$) {
  return [_$.args.value, _$.args.compareFn];
};

var Switch = function (_Block) {
  inherits(Switch, _Block);

  function Switch(opts) {
    classCallCheck(this, Switch);

    var _this = possibleConstructorReturn(this, (Switch.__proto__ || Object.getPrototypeOf(Switch)).call(this, opts));

    _this.index = Infinity;
    var _this$$$ = _this.$$,
        htmlChildren = _this$$$.htmlChildren,
        parentScope = _this$$$.parentScope,
        switchArgs = _this.args,
        value = _this.args.value;

    var wasDefault = false;

    _this.values = htmlChildren.filter(function (_ref) {
      var type = _ref.type,
          args = _ref.args;

      if (type !== Case) {
        return;
      }

      if (wasDefault) {
        return;
      }

      if (args && args.default) {
        wasDefault = true;
      }

      return true;
    }).map(function (child, i) {
      var _child$args = child.args,
          args = _child$args === undefined ? {} : _child$args,
          children = child.children;

      var val = void 0;

      if (!args.default) {
        val = parentScope.$$.evaluate(args.when, function (newValue) {
          _this.values[i].value = newValue;

          if (i > _this.index) {
            return;
          }

          var found = findInArray(_this.values, function (_ref2) {
            var args = _ref2.args,
                value = _ref2.value;
            return args.default || _this.args.compareFn(switchArgs.value, value);
          });

          _this.index = found ? found.key : Infinity;
          _this.elems = found ? found.value.children : null;
        }, _this);
      }

      if (_this.index === Infinity && (args.default || _this.args.compareFn(value, val))) {
        _this.index = i;
        _this.elems = children;
      }

      return {
        args: args,
        children: children,
        value: val
      };
    });
    return _this;
  }

  createClass(Switch, [{
    key: 'afterConstruct',
    value: function afterConstruct() {
      var _this2 = this;

      this.evaluate(watchArgs$4, function (args) {
        var newValue = args[0];
        var compareFn = args[1];

        _this2.index = Infinity;

        _this2.values.some(function (_ref3, i) {
          var args = _ref3.args,
              value = _ref3.value,
              children = _ref3.children;

          if (args.default || compareFn(newValue, value)) {
            _this2.index = i;
            _this2.elems = children;

            return true;
          }
        });

        if (_this2.index === Infinity) {
          _this2.elems = null;
        }
      });
    }
  }]);
  return Switch;
}(Block);

Switch.html = (_tmpl$4 = [{
  "type": Elements,
  "args": {
    "value": function value(_$) {
      return _$.elems;
    },
    "parentScope": function parentScope(_$) {
      return _$.$$.parentScope;
    },
    "parentTemplate": function parentTemplate(_$) {
      return _$.$$.parentTemplate;
    }
  }
}], _tmpl$4.vars = ["elems"], _tmpl$4);
Switch.args = {
  default: {
    default: false
  },
  compareFn: {
    default: function _default(switchValue, caseValue) {
      return switchValue === caseValue || switchValue !== switchValue && caseValue !== caseValue;
    }
  }
};

var Bind = function (_Mixin) {
  inherits(Bind, _Mixin);

  function Bind() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, Bind);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = Bind.__proto__ || Object.getPrototypeOf(Bind)).call.apply(_ref, [this].concat(args))), _this), _this.off = noop, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(Bind, [{
    key: 'afterUpdate',
    value: function afterUpdate(value) {
      this.off();

      if (!isFunction(value)) {
        return;
      }

      if (this.args) {
        this.off = this.elem.on(this.args.join(','), value);
      } else {
        this.off = noop;

        console.error('Provide "Bind" mixin with event name args (like "Bind(click)" or "Bind(keyup, keypress)")!');
      }
    }
  }, {
    key: 'beforeRemove',
    value: function beforeRemove(isElementRemoved) {
      if (!isElementRemoved) {
        this.off();
      }
    }
  }]);
  return Bind;
}(Mixin);

var EMPTY_SPACE_REGEX = /\s+/;

var Class = function (_Mixin) {
  inherits(Class, _Mixin);

  function Class() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, Class);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = Class.__proto__ || Object.getPrototypeOf(Class)).call.apply(_ref, [this].concat(args))), _this), _this.classes = [], _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(Class, [{
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
    value: function beforeRemove(isElementRemoved) {
      if (!isElementRemoved) {
        var elem = this.elem,
            classes = this.classes;


        elem.removeClass.apply(elem, classes);
      }
    }
  }]);
  return Class;
}(Mixin);

var Elem$1 = function (_Mixin) {
  inherits(Elem, _Mixin);

  function Elem(opts) {
    classCallCheck(this, Elem);

    var _this = possibleConstructorReturn(this, (Elem.__proto__ || Object.getPrototypeOf(Elem)).call(this, opts));

    var args = _this.args,
        parentTemplate = _this.parentTemplate,
        elem = _this.elem;

    var scope = parentTemplate;
    var value = _this.evaluate();

    if (args) {
      scope = value instanceof Block ? value : parentTemplate;
      value = args[0];
    }

    if (isFunction(value)) {
      value(elem);
    } else if (isString(value)) {
      scope[value] = elem;
    }
    return _this;
  }

  return Elem;
}(Mixin);

Elem$1.evaluate = false;

var Hide = function (_Mixin) {
  inherits(Hide, _Mixin);

  function Hide() {
    classCallCheck(this, Hide);
    return possibleConstructorReturn(this, (Hide.__proto__ || Object.getPrototypeOf(Hide)).apply(this, arguments));
  }

  createClass(Hide, [{
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
    value: function beforeRemove(isElementRemoved) {
      if (!isElementRemoved) {
        this.elem.show();
      }
    }
  }]);
  return Hide;
}(Mixin);

var Node = function (_Mixin) {
  inherits(Node, _Mixin);

  function Node(opts) {
    classCallCheck(this, Node);

    var _this = possibleConstructorReturn(this, (Node.__proto__ || Object.getPrototypeOf(Node)).call(this, opts));

    var args = _this.args,
        parentTemplate = _this.parentTemplate,
        node = _this.node;

    var scope = parentTemplate;
    var value = _this.evaluate();

    if (args) {
      scope = value instanceof Block ? value : parentTemplate;
      value = args[0];
    }

    if (isFunction(value)) {
      value(node);
    } else if (isString(value)) {
      scope[value] = node;
    }
    return _this;
  }

  return Node;
}(Mixin);

Node.evaluate = false;

var On = function (_Mixin) {
  inherits(On, _Mixin);

  function On(opts) {
    classCallCheck(this, On);

    var _this = possibleConstructorReturn(this, (On.__proto__ || Object.getPrototypeOf(On)).call(this, opts));

    if (_this.args) {
      _this.off = _this.elem.on(_this.args.join(','), function () {
        _this.evaluate();
      });
    } else {
      _this.off = noop;

      console.error('Provide "On" mixin with event name args (like "On(click)" or "On(keyup, keypress)")!');
    }
    return _this;
  }

  createClass(On, [{
    key: 'beforeRemove',
    value: function beforeRemove(isElementRemoved) {
      if (!isElementRemoved) {
        this.off();
      }
    }
  }]);
  return On;
}(Mixin);

On.evaluate = false;

var Rest = function (_Mixin) {
  inherits(Rest, _Mixin);

  function Rest() {
    classCallCheck(this, Rest);
    return possibleConstructorReturn(this, (Rest.__proto__ || Object.getPrototypeOf(Rest)).apply(this, arguments));
  }

  return Rest;
}(Mixin);

mixins.Rest = Rest;

var Show = function (_Mixin) {
  inherits(Show, _Mixin);

  function Show() {
    classCallCheck(this, Show);
    return possibleConstructorReturn(this, (Show.__proto__ || Object.getPrototypeOf(Show)).apply(this, arguments));
  }

  createClass(Show, [{
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
    value: function beforeRemove(isElementRemoved) {
      if (!isElementRemoved) {
        this.elem.show();
      }
    }
  }]);
  return Show;
}(Mixin);

var CSS_STYLES_SEPARATOR_REGEX$1 = /\s*;\s*/;
var CSS_STYLE_SEPARATOR_REGEX = /\s*:\s*/;

var Style = function (_Mixin) {
  inherits(Style, _Mixin);

  function Style() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, Style);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = Style.__proto__ || Object.getPrototypeOf(Style)).call.apply(_ref, [this].concat(args))), _this), _this.css = {}, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(Style, [{
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
        newValue = collectFromArray(newValue.split(CSS_STYLES_SEPARATOR_REGEX$1).filter(Boolean).map(constructStyleFromString), addCSSProp$1);
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
    value: function beforeRemove(isElementRemoved) {
      if (!isElementRemoved) {
        var elem = this.elem,
            css = this.css;


        elem.removeCSS.apply(elem, keys(css));
      }
    }
  }]);
  return Style;
}(Mixin);

function addCSSProp$1(css, item) {
  var _item = slicedToArray(item, 2),
      prop = _item[0],
      value = _item[1];

  css[prop] = value;
}

function constructStyleFromString(style) {
  var split = style.split(CSS_STYLE_SEPARATOR_REGEX);

  return [split[0].trim(), split[1].trim()];
}

var Value = function (_Mixin) {
  inherits(Value, _Mixin);

  function Value(opts) {
    classCallCheck(this, Value);

    var _this = possibleConstructorReturn(this, (Value.__proto__ || Object.getPrototypeOf(Value)).call(this, opts));

    var args = _this.args,
        parentTemplate = _this.parentTemplate,
        elem = _this.elem;

    var name = elem.name();
    var type = elem.prop('type');
    var value = _this.evaluate();
    var initialScopeValue = null;

    _this.prop = getProp(name, type, elem);
    _this.name = name;
    _this.type = type;
    _this.value = value;
    _this.options = elem.children().filter('option');
    _this.scope = parentTemplate;

    if (args) {
      _this.scope = value instanceof Block ? value : parentTemplate;
      _this.value = args[0];
    }

    if (!isFunction(_this.value)) {
      initialScopeValue = _this.scope.$$.evaluate(function (scope) {
        return scope[_this.value];
      }, function (newValue) {
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
      _this.currentValue = _this.getProp(_this.currentValue, false);
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

    _this.offElemListener = elem.on(getListenerName(name, type), changeScope);
    _this.offFormListener = elem.closest('form').on('reset', function () {
      setTimeout(changeScope, 0);
    });
    return _this;
  }

  createClass(Value, [{
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
    value: function beforeRemove(isElementRemoved) {
      if (!isElementRemoved) {
        this.offElemListener();
      }

      this.offFormListener();
    }
  }]);
  return Value;
}(Mixin);

Value.evaluate = false;


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

        values = values || [];

        if (!value && init) {
          return values;
        }

        if (value) {
          return values.indexOf(inputValue) === -1 ? values.concat(inputValue) : values;
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

function addValue(values, _ref) {
  var selected = _ref.selected,
      value = _ref.value;

  if (selected && values.indexOf(value) === -1) {
    values.push(value);
  }
}

/**
 * @const {Elem} doc
 * @type {Elem}
 * @public
 * @description Elem instance of document.
 */
var doc = new Elem(document);

/**
 * @const {Elem} html
 * @type {Elem}
 * @public
 * @description Elem instance of document.documentElement.
 */
var html = new Elem(document.documentElement);

/**
 * @const {Elem} body
 * @type {Elem}
 * @public
 * @description Elem instance of document.body.
 */
var body = new Elem(document.body);

/**
 * @const {Elem} head
 * @type {Elem}
 * @public
 * @description Elem instance of document.head.
 */
var head = new Elem(document.head);

createHideStyleNode(head);

function insertHtml(html, templates) {
  var _html$vars = html.vars,
      vars = _html$vars === undefined ? [] : _html$vars;

  var newTemplates = create(null);
  var newVars = toObjectKeys(vars);

  assign(newTemplates, templates);

  (function iterateAndChangeChildren() {
    var nodes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    for (var i = 0; i < nodes.length; i++) {
      var _nodes$i = nodes[i],
          type = _nodes$i.type,
          value = _nodes$i.value,
          children = _nodes$i.children;


      if (type === '#comment') {
        var trimmed = value.trim();

        if (newTemplates[trimmed]) {
          var newTemplate = newTemplates[trimmed];

          nodes.splice.apply(nodes, [i, 1].concat(toConsumableArray(newTemplate)));
          assign(newVars, toObjectKeys(newTemplates[trimmed].vars));

          i += newTemplate.length - 1;
        }
      } else {
        iterateAndChangeChildren(children);
      }
    }
  })(html);

  html.vars = keys(newVars);

  return html;
}

/**
 * @function initApp
 * @public
 * @param {Template|typeof Block} html - Root template or root block constructor.
 * @param {Elem|Element} container - Container of the app.
 * @returns {Block|void} Root block if the app has been registered and undefined if not.
 * @description Method for initializing app.
 *
 * @example
 * import { initApp, doc } from 'dwayne';
 *
 * initApp(html`<App/>`, doc.create('div'));
 * initApp(htmlScopeless`<App/>`, doc.create('div'));
 * initApp('App', doc.create('div'));
 * initApp(App, doc.create('div'));
 */
function initApp(html, container) {
  var parentElem = new Elem(container).elem(0);

  if (!parentElem.length) {
    console.error('No valid element to insert the app into was given! (initApp)');

    return;
  }

  if (parentElem.prop('DwayneRootBlock')) {
    console.error('There already exists a Dwayne app inside the given element! (initApp)');

    return;
  }

  var RootBlock = html;

  if (isArray(html)) {
    var _class, _temp;

    RootBlock = (_temp = _class = function (_Block) {
      inherits(RootBlock, _Block);

      function RootBlock() {
        classCallCheck(this, RootBlock);
        return possibleConstructorReturn(this, (RootBlock.__proto__ || Object.getPrototypeOf(RootBlock)).apply(this, arguments));
      }

      return RootBlock;
    }(Block), _class.html = html, _temp);
  }

  if (!isInstanceOf(Block, RootBlock)) {
    console.error('No valid root block was given! (initApp)');

    return;
  }

  var rootBlock = createBlock({
    node: {
      type: RootBlock
    },
    parent: parentElem,
    parentElem: parentElem
  });

  parentElem.prop('DwayneRootBlock', rootBlock).attr('dwayne-root', '');

  return rootBlock;
}

/**
 * @function removeApp
 * @public
 * @param {Elem|Element} container - Container of the app.
 * @returns {void}
 * @description Method for removing app.
 *
 * @example
 * import { removeApp, find } from 'dwayne';
 *
 * removeApp(find('.root'));
 */
function removeApp(container) {
  var elem = new Elem(container).elem(0);

  if (!elem.length) {
    console.error('No valid element to remove the app from was given! (removeApp)');

    return;
  }

  container = elem[0];

  var _container = container,
      DwayneRootBlock = _container.DwayneRootBlock;


  if (!(DwayneRootBlock instanceof Block)) {
    console.error('No app registered inside the given element! (removeApp)');

    return;
  }

  DwayneRootBlock.$$.remove();
  elem.removeAttr('dwayne-root');

  delete container.DwayneRootBlock;
}

exports.version = version;
exports.Block = Block;
exports.Elem = Elem;
exports.Mixin = Mixin;
exports.Case = Case;
exports.Children = Children;
exports.DynamicBlock = DynamicBlock;
exports.Each = Each;
exports.Elements = Elements;
exports.If = If;
exports.Switch = Switch;
exports.Bind = Bind;
exports.Class = Class;
exports.ElemMixin = Elem$1;
exports.Hide = Hide;
exports.NodeMixin = Node;
exports.On = On;
exports.Rest = Rest;
exports.Show = Show;
exports.Style = Style;
exports.Value = Value;
exports.doc = doc;
exports.html = html;
exports.body = body;
exports.head = head;
exports.find = find;
exports.insertHtml = insertHtml;
exports.initApp = initApp;
exports.removeApp = removeApp;

}((this.Dwayne = this.Dwayne || {})));
//# sourceMappingURL=dwayne.js.map
