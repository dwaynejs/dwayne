import {
  isNil, isString, assign,
  definePrototypeProperties, defineProperties,
  collectFromArray, collectFromObject,
  iterateArray, iterateObject,
  toHyphenCase, toStringTag,
  setToStringTag, setProto
} from './utils';
import {
  isHTMLDocument, isValidNode,
  addAttr, addCSSProp, addDataAttr,
  addNext, addParent, addPrev,
  toElem, isElementsCollection,
  getAttrNS, hide, show, remove
} from './helpers/Elem';
import { SVG_NS } from './constants';
import { find } from './find';

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
 * @callback ElemMethod
 * @public
 * @this Elem
 */

const { Symbol } = global;
const EVENT_SEPARATOR_REGEX = /(?:,| ) */;
const CSS_STYLES_SEPARATOR_REGEX = /; ?/;
const CSS_IMPORTANT_REGEX = / ?!important$/;
const EVENT_REGEX = /Event$/;
const XHTML_NS = 'http://www.w3.org/1999/xhtml';
const emptyCollection = [];

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
class Elem extends Array {
  /**
   * @method Elem.addMethods
   * @public
   * @param {String|Object.<String, ElemMethod>} methodName - Name of the method or object of
   * method names and methods.
   * @param {ElemMethod} [method] - If the first argument is a string this should be the method itself.
   * @returns {typeof Elem}
   */
  static addMethods(methodName, method) {
    if (arguments.length >= 2) {
      methodName = { [methodName]: method };
    }

    definePrototypeProperties(this.prototype, methodName);

    return this;
  }

  constructor(elem = emptyCollection) {
    super();

    if (!isElementsCollection(elem)) {
      elem = [elem];
    }

    setProto(this, Elem.prototype);

    iterateArray(elem, (elem) => {
      if (!isElementsCollection(elem)) {
        elem = [elem];
      }

      iterateArray(elem, (elem) => {
        if (!this.includes(elem) && isValidNode(elem)) {
          this.push(elem);
        }
      });
    });
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
  add() {
    const elems = this.slice();

    iterateArray(arguments, (elem) => {
      if (!isElementsCollection(elem)) {
        elem = [elem];
      }

      iterateArray(elem, (elem) => {
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
  addClass() {
    return this.forEach((elem) => {
      const list = elem.classList;

      iterateArray(arguments, (cls) => list.add(cls));
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
  attr(attr, value) {
    const elem = this[0];

    if (!arguments.length) {
      if (!elem) {
        return {};
      }

      return collectFromArray(elem.attributes, addAttr);
    }

    if (arguments.length <= 1 && isString(attr)) {
      if (!elem) {
        return null;
      }

      const {
        ns,
        name
      } = getAttrNS(attr, elem);

      return ns
        ? elem.getAttributeNS(ns, name)
        : elem.getAttribute(attr);
    }

    if (arguments.length >= 2) {
      attr = { [attr]: value };
    }

    return this.forEach((elem) => {
      iterateObject(attr, (value, key) => {
        if (isNil(value) || value === false) {
          return new Elem(elem).removeAttr(key);
        }

        value = value === true ? '' : value;

        const { ns } = getAttrNS(key, elem);

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
  children() {
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
  closest(selector) {
    return this.collect((add, elem) => {
      while (elem) {
        if (new Elem(elem).is(selector)) {
          return add(elem);
        }

        elem = elem.parentNode;
      }
    });
  }

  collect(callback) {
    const elements = [];
    const cb = ::elements.push;

    this.forEach((elem, index) => {
      callback(cb, elem, index, this);
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
  contains(element) {
    const parent = this[0];
    const child = toElem(element)[0];

    return !parent || !child
      ? false
      : parent.contains(child);
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
  create(type) {
    return this.collect((add, elem) => {
      let el = null;
      const isText = type === '#text';
      const document = isHTMLDocument(elem)
        ? elem
        : elem.ownerDocument;

      if (isText || type === '#comment') {
        el = isText
          ? document.createTextNode('')
          : document.createComment('');
      } else {
        const ns = type === 'svg'
          ? SVG_NS
          : elem.namespaceURI || document.documentElement.namespaceURI || XHTML_NS;

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
  createComment(text) {
    return this
      .create('#comment')
      .text(text);
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
  createText(text) {
    return this
      .create('#text')
      .text(text);
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
  css(property, value) {
    const { style } = this[0] || {};

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
      property = { [property]: value };
    }

    return this.forEach((elem) => {
      iterateObject(property, (value, property) => {
        property = toHyphenCase(property);

        if (isNil(value) || value === false) {
          return new Elem(elem).removeCSS(property);
        }

        elem.style.removeProperty(property);
        elem.style.setProperty(
          property,
          value.replace(CSS_IMPORTANT_REGEX, ''),
          CSS_IMPORTANT_REGEX.test(value) ? 'important' : ''
        );
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
  data(key, value) {
    const { dataset } = this[0] || {};

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
      key = { [key]: value };
    }

    return this.forEach((elem) => {
      iterateObject(key, (value, key) => {
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
  dispatch(event, details = {}) {
    const {
      bubbles = true,
      cancelable = true,
      ...realDetails
    } = details;
    let finalEvent = event;

    if (!EVENT_REGEX.test(toStringTag(finalEvent))) {
      try {
        finalEvent = new Event(finalEvent, { bubbles, cancelable });
        assign(finalEvent, realDetails);
      } catch (err) {}
    }

    return this.forEach((elem) => {
      if (!EVENT_REGEX.test(toStringTag(finalEvent))) {
        const document = isHTMLDocument(elem)
          ? elem
          : elem.ownerDocument;

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
  elem(index = 0) {
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
  filter(filterFn = Boolean) {
    return this.collect((add, elem, index) => {
      if (filterFn(elem, index, this)) {
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
  find(selector) {
    return this.collect((add, elem) => {
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
  forEach(callback) {
    iterateArray(this, (value, key) => {
      callback(value, key, this);
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
  hasAttr(attr) {
    const elem = this[0];

    if (!elem) {
      return false;
    }

    const { ns } = getAttrNS(attr, elem);

    return ns
      ? elem.hasAttributeNS(ns, attr)
      : elem.hasAttribute(attr);
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
  hasClass(cls) {
    const elem = this[0];

    return elem
      ? elem.classList.contains(cls)
      : false;
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
  hide() {
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
  html(html) {
    if (!arguments.length) {
      const elem = this[0];

      return elem
        ? elem.innerHTML
        : '';
    }

    return this.forEach((elem) => {
      elem.innerHTML = html;
    });
  }

  includes(elem) {
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
  insertAfter(element) {
    element = toElem(element).elem(0);

    let parent = element.parent();

    if (!parent.length) {
      return this;
    }

    element = element.next()[0];
    parent = parent[0];

    return this.forEach((elem) => {
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
  insertBefore(element) {
    element = toElem(element).elem(0);

    let parent = element.parent();

    if (!parent.length) {
      return this;
    }

    element = element[0];
    parent = parent[0];

    return this.forEach((elem) => {
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
  into(element, end = true) {
    element = toElem(element)[0];

    if (
      !element
      || isHTMLDocument(element)
    ) {
      return this;
    }

    if (!end && element.firstChild) {
      for (let i = this.length - 1; i >= 0; i--) {
        element.insertBefore(this[i], element.firstChild);
      }

      return this;
    }

    return this.forEach((elem) => {
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
  is(selector) {
    if (!this.length) {
      return false;
    }

    const elem = this[0];
    const matches = (
      elem.matches
      || elem.matchesSelector
      || elem.webkitMatchesSelector
      || elem.mozMatchesSelector
      || elem.msMatchesSelector
      || elem.oMatchesSelector
    );

    return elem::matches(selector);
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
  name() {
    const elem = this[0];

    return elem
      ? elem.nodeName.toLowerCase()
      : undefined;
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
  next() {
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
  on(event, listener) {
    if (isString(event)) {
      event = { [event]: listener };
    }

    const newEvents = {};
    const allListeners = {};

    iterateObject(event, (listener, event) => {
      iterateArray(event.split(EVENT_SEPARATOR_REGEX), (event) => {
        (newEvents[event] = newEvents[event] || []).push(listener);
      });
    });

    this.forEach((elem) => {
      iterateObject(newEvents, (listeners, event) => {
        iterateArray(listeners, (listener) => {
          elem.addEventListener(event, listener, false);
          (allListeners[event] = allListeners[event] || []).push(() => {
            elem.removeEventListener(event, listener);
          });
        });
      });
    });

    return function removeEventListeners(event) {
      if (arguments.length) {
        iterateArray(arguments, (event) => {
          iterateArray(event.split(EVENT_SEPARATOR_REGEX), (event) => {
            const removeListeners = allListeners[event];

            if (removeListeners) {
              iterateArray(removeListeners, (removeListener) => removeListener());

              delete allListeners[event];
            }
          });
        });
      } else {
        iterateObject(allListeners, (removeListeners, event) => {
          iterateArray(removeListeners, (removeListener) => removeListener());

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
  parent() {
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
  prev() {
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
  prop(property, value) {
    if (arguments.length <= 1 && isString(property)) {
      return this[0] ? this[0][property] : undefined;
    }

    if (arguments.length >= 2) {
      property = { [property]: value };
    }

    return this.forEach((elem) => {
      iterateObject(property, (value, prop) => {
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
  remove() {
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
  removeAttr() {
    return this.forEach((elem) => {
      iterateArray(arguments, (attr) => {
        const { ns } = getAttrNS(attr, elem);

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
  removeClass() {
    return this.forEach((elem) => {
      const list = elem.classList;

      iterateArray(arguments, (cls) => list.remove(cls));
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
  removeCSS() {
    return this.forEach((elem) => {
      iterateArray(arguments, (css) => {
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
  replace(element) {
    element = toElem(element);

    const first = this.elem(0);
    const parent = first.parent();

    if (!parent.length) {
      return this;
    }

    let elem = parent;
    let method = 'into';
    const next = first.next()[0];
    const prev = first.prev()[0];

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
  show() {
    return this.forEach(show);
  }

  slice() {
    return new Elem(super.slice.apply(this, arguments));
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
  text(text) {
    if (!arguments.length) {
      return this.prop('textContent');
    }

    return this.forEach((elem) => {
      elem.textContent = text;
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
  toggleAttr(attr, condition) {
    return this.forEach((elem) => {
      elem = new Elem(elem);

      if (arguments.length < 2 ? !elem.hasAttr(attr) : condition) {
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
  toggleClass(cls, condition) {
    return this.forEach((elem) => {
      const { classList } = elem;

      classList.toggle(cls, arguments.length < 2 ? !classList.contains(cls) : condition);
    });
  }
}

setToStringTag(Elem, 'Elem');

if (Symbol && Symbol.species) {
  defineProperties(Elem, {
    [Symbol.species]: {
      get() {
        return Array;
      }
    }
  });
}

export { Elem };
