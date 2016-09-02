/**
 * @module Elem
 * @private
 * @mixin
 * @description Exports Elem class.
 */

import Super from './Super';
import Arr, { array } from './Arr';
import Promise from './Promise';
import Str from './Str';
import { switcher } from './Switcher';
import constructors from './constants/constructors';
import appliedRegExps from './constants/appliedRegExps';
import elements from './constants/elements';
import {
  isArray, isElement, isFunction, isInteger, isNumber, isNull, isObject, isString,
  assign, dynamicDefineProperties, defineProperties, toArray,
  validate, toStringTag, iterate, crossClassMethods, Symbol
} from './helpers';

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

const nativeDocument = global.document;
const empty = nativeDocument.createElement('div');
const node = new Super(Node.prototype);
const classes = {};
const attrs = {};
const refSwitcher = switcher('strictEquals', 'href')
  .case(
    ['img', 'script', 'iframe', 'audio', 'video'],
    'src'
  )
  .case(
    'form',
    'action'
  );
const filterSwitcher = switcher('call', (selector) => selector)
  .case(
    isString,
    (selector) =>
      (elem) => htmlElement(elem).is(selector)
  )
  .case(
    [isArray, isElem],
    (elems) => {
      elems = new Arr(elems);

      return (elem) => elems.indexOf(elem) !== -1;
    }
  );

/**
 * @class Elem
 * @extends Arr
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
export class Elem extends Arr {
  constructor(elem = []) {
    super(new Arr(toArray(new Super(elem).$, true)).object((elems, elem) => {
      if (isElement(elem) && elems.indexOf(elem) === -1) {
        elems.push(elem);
      }
    }, []).$);

    this.forEach(addDomcData);
    /**
     * @member Elem#$
     * @type {Element[]}
     * @public
     * @description Initial element set.
     */

    /**
     * @member Elem#base
     * @type {Element|undefined}
     * @public
     * @readonly
     * @description If Elem was constructed through {@link find} or {@link Elem#find}
     * it's a base in which the elements were found.
     */

    /**
     * @member Elem#selector
     * @type {String|undefined}
     * @public
     * @readonly
     * @description If Elem was constructed through {@link find} or {@link Elem#find}
     * it's a selector from the argument.
     */
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
  add() {
    iterate(arguments, (elem) => {
      toFind(elem).forEach((elem) => {
        if (this.indexOf(elem) === -1) {
          this.push(elem);
        }
      });
    });

    return this;
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
  addClass(...classes) {
    return this.forEach((elem) => {
      const list = elem.classList;

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
  addHTML(html) {
    return this.forEach((elem) => {
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
  addRule(name, selector, style) {
    this.some((elem) => {
      if (new Elem(elem).name === 'style') {
        const { sheet } = elem;
        const { length } = sheet.cssRules;

        sheet.insertRule(
          `${ selector } {\n${ new Super(style).word((value, property) => `${ property }: ${ value };\n`) }}`,
          length
        );
        sheet.cssRules[length].domcData = { name };

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
  addText(text) {
    return this.forEach((elem) => {
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
   * elem.apply('#id');                         // shorthand for elem.id('id');
   * elem.apply('.c1 .c2');                     // shorthand for elem.addClasses('c1', 'c2');
   * elem.apply('-.c1 -.c2');                   // shorthand for elem.removeClasses('c1', 'c2');
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
  apply(...strings) {
    let applied;
    let np;
    let value;
    let slice;

    iterate(String(new Arr(strings).join(' ')).split(/(\s+)/), (string) => {
      if (!applied) {
        np = appliedRegExps[string.slice(0, 1)];
        slice = 1;

        if (np && !isFunction(np)) {
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

        applied = { name: value[0], args: string.slice(slice + value[0].length), np };
      }

      if (/^\s+$/.test(string)) {
        applied.args += string;
      }

      if (!applied.args || /^\([\s\S]+]\)$/.test(applied.args)) {
        applied.np(this, applied.name, applied.args.replace(/^\(|\)$/g, ''));
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
   * elem.attr('attr1', 'value1'); // attribute attr1 set to 'value1' and this returned
   * elem.attr('attr1');           // 'value1'
   * elem.attr({
   *   attr1: 'value3',            // attribute attr1 set to 'value3'
   *   attr2: 'value2'             // attribute attr2 set to 'value2'
   * });                           // this returned
   * elem.attr().$;                // { attr1: 'value3', attr2: 'value2' }
   */
  attr(attr, value) {
    const elem = getElem(this);

    if (!arguments.length) {
      return new Super(elem.attributes).object((o, attr) => {
        o[attr.name] = attr.value;
      });
    }

    if (arguments.length <= 1 && isString(attr)) {
      return elem.getAttribute(attr);
    }

    if (arguments.length >= 2) {
      attr = { [attr]: value };
    }

    new Super(attr).forEach((value, key) => {
      this.forEach((elem, index) => {
        elem.setAttribute(key, isFunction(value) ? value(elem.getAttribute(key), elem, index) : value);
      });
    });

    crossClassMethods.transformAnchor(this);

    return this;
  }

  /**
   * @method Elem#blur
   * @returns {Elem} Returns this.
   * @see https://developer.mozilla.org/en/docs/Web/API/HTMLElement/blur
   * @description Synonym for
   * [HTMLElement#blur]{@link https://developer.mozilla.org/en/docs/Web/API/HTMLElement/blur}.
   */
  blur() {
    return this.forEach((elem) => {
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
  calcCSS(pseudo = null) {
    return getComputedStyle(getElem(this), pseudo);
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
  changeRule(name, style) {
    this.some((elem) => {
      if (new Elem(elem).name === 'style') {
        const rule = elem.domcData.rules.find((rule) => rule.domcData && rule.domcData.name === name);

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
  child(element) {
    if (isInteger(element) && element >= 0) {
      return new Elem(this.children.$[element]);
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
  children() {
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
  class(cls) {
    if (!arguments.length) {
      return new Arr(getElem(this).className.split(' '));
    }

    return this.forEach((elem) => {
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
  click() {
    return this.forEach((elem) => {
      elem.click();
    });
  }

  /**
   * @method Elem#clone
   * @public
   * @param {Boolean|*} deep - See thee link.
   * @returns {Elem} New instance of Elem.
   * @see https://developer.mozilla.org/en/docs/Web/API/Node/cloneNode
   * @description Synonym for
   * [Node#cloneNode]{@link https://developer.mozilla.org/en/docs/Web/API/Node/cloneNode}.
   */
  clone(deep) {
    return this.object((elems, elem) => {
      elems.add(elem.cloneNode(true));
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
  closest(selector) {
    return this.object((elems, elem) => {
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
  contains(element) {
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
  create(type) {
    return this.object((elems, elem) => {
      const element = new Elem(nativeDocument.createElement(type));

      if (elem !== nativeDocument) {
        element
          .into(elem)
          .apply.apply(element, new Arr(arguments).slice(1).$);

        elems.add(element);
      }
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
   *
   * // also there are shorthands for almost every css property
   * elem.position('absolute');
   * elem.marginLeft('3px');
   * elem.position(); // 'absolute'
   */
  css(property, value) {
    const elem = getElem(this);

    if (!arguments.length) {
      return new Str(this.$[0].style.cssText)
        .split(/; ?/)
        .object((o, value) => {
          if (value) {
            property = value.split(/: /);

            o[new Str(property[0]).toCamelCase().$] = property[1];
          }
        });
    }

    if (arguments.length <= 1 && isString(property)) {
      return elem.style[property];
    }

    if (arguments.length >= 2) {
      property = { [property]: value };
    }

    property = new Super(property).$;

    iterate(property, (value, property) => {
      property = new Str(property).toCamelCase().$;

      this.forEach((elem, index) => {
        if (isFunction(value)) {
          value = value(elem.style[property], elem, index);
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
   * elem.data('someKey1', 'value'); // attribute data-some-key1 set to 'value1' and this returned
   * elem.data('someKey1');          // 'value1'
   * elem.data({
   *   someKey1: 'value3',           // attribute data-some-key1 set to 'value3'
   *   someKey2: 'value2'            // attribute data-some-key2 set to 'value2'
   * });                             // this returned
   * elem.data().$;                  // { someKey1: 'value3', someKey2: 'value2' }
   */
  data(key, value) {
    const dataset = getElem(this).dataset;

    if (!arguments.length) {
      return new Super(dataset).object((o, value, key) => {
        o[key] = value;
      });
    }

    if (arguments.length === 1 && isString(key)) {
      return dataset[key];
    }

    if (arguments.length >= 2) {
      key = { [key]: value };
    }

    iterate(key, (value, key) => {
      this.forEach((elem, index) => {
        elem.dataset[key] = isFunction(value) ? value(elem.dataset[key], elem, index) : value;
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
  defaultValue(value) {
    return this.prop.apply(new Arr(arguments).unshift('defaultValue'));
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
  deleteRule(name) {
    this.some((elem) => {
      if (new Elem(elem).name === 'style') {
        const rule = elem.domcData.rules.find((rule) => rule.domcData && rule.domcData.name === name);

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
  disabled(disabled = true) {
    return this.toggleAttr('disabled', disabled);
  }

  // TODO: move to EventTarget class
  dispatch(event, details = {}) {
    if (!/Event$/.test(toStringTag(event))) {
      try {
        event = new Event(event);
      } catch (err) {
        event = nativeDocument.createEvent('Event');
      } finally {
        assign(event, details);
      }
    }

    return this.forEach((elem) => {
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
  draggable(draggable = true) {
    return this.prop('draggable', !!draggable);
  }

  /**
   * @method Elem#editable
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
  editable(editable = true) {
    return this.toggleAttr('contentEditable', editable);
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
  filter(selector = Boolean) {
    return new Elem(super.filter(filterSwitcher(selector)));
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
  find(selector) {
    return isString(selector)
      ? find(selector, this.$)
      : super.find(selector);
  }

  /**
   * @method Elem#first
   * @public
   * @returns {Elem} New instance of Elem.
   * @description Synonym for elem.elem(0).
   */
  first() {
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
  firstChild(selector = null) {
    return this.object((elems, elem) => {
      const { value: found } = new Arr(elem.children).find((elem) => new Elem(elem).is(selector)) || {};

      elem.add(found);
    }, new Elem());
  }

  /**
   * @method Elem#focus
   * @returns {Elem} Returns this.
   * @see https://developer.mozilla.org/en/docs/Web/API/HTMLElement/focus
   * @description Synonym for
   * [HTMLElement#focus]{@link https://developer.mozilla.org/en/docs/Web/API/HTMLElement/focus}.
   */
  focus() {
    return this.forEach((elem) => {
      elem.focus();
    });
  }

  /**
   * @method Elem#getFormData
   * @public
   * @returns {Object} Form data object.
   * @description Method allows you to get form data from the form.
   */
  getFormData() {
    return this
      .find('input, select, textarea, datalist, keygen, output')
      .object((data, input) => {
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
  getRule(name) {
    let found = {
      selector: undefined,
      rules: {}
    };

    this.some((elem) => {
      if (new Elem(elem).name === 'style') {
        const rule = elem.domcData.rules.find((rule) => rule.domcData && rule.domcData.name === name);

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
  hasAttr(attr) {
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
  hasClass(cls) {
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
  hide() {
    const elem = this.$;

    if (elem) {
      elem.domcData.previousDisplay = elem.style.display;
    }

    return this.display('none !important');
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
  html(html) {
    if (!arguments.length) {
      return getElem(this).innerHTML;
    }

    return this.forEach((elem, index) => {
      elem.innerHTML = isFunction(html) ? html(elem.innerHTML, elem, index) : html;
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
  id(id) {
    if (!arguments.length) {
      return getElem(this).id;
    }

    return this.forEach((elem) => {
      elem.id = id;
    });
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
  into(element) {
    element = toFind(element);

    const elem = element.$[0];

    if (elem) {
      elem.appendChild(this.$);
    }

    return this;
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
  is(selector) {
    if (isNull(selector)) {
      return true;
    }

    const elem = getElem(this);
    const matches = elem.matches ||
      elem.matchesSelector ||
      elem.webkitMatchesSelector ||
      elem.mozMatchesSelector ||
      elem.msMatchesSelector ||
      elem.oMatchesSelector;

    try {
      return matches.call(elem, selector);
    } catch (err) {
      console.error(`Selector '${ selector }' is not a valid selector (Elem#is)`);

      return false;
    }
  }

  /**
   * @method Elem#isBroken
   * @public
   * @returns {Boolean} If the first image in the set is broken.
   * @description Returns if the first element in the set is broken.
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
  isBroken() {
    let isBroken = false;

    this.some((elem) => {
      if (new Elem(elem).name === 'img') {
        isBroken = !!(elem.complete && (!elem.naturalWidth || elem.naturalHeight));

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
  last() {
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
  lastChild(selector = null) {
    return this.object((elems, elem) => {
      const { value: found } = new Arr(elem.children)
        .reverse()
        .find((elem) => new Elem(elem).is(selector)) || {};

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
  load() {
    const images = {
      proper: new Elem(),
      broken: new Elem()
    };

    return Promise.all(this.map((elem) => {
      const $elem = new Elem(elem);

      if (elem.complete) {
        images[$elem.isBroken() ? 'broken' : 'proper'].push(elem);

        return;
      }

      return new Promise((resolve) => {
        const removeListeners = $elem.on({
          load() {
            images.proper.add(elem);

            removeListeners();
            resolve();
          },
          error() {
            images.broken.add(elem);

            removeListeners();
            resolve();
          }
        });
      });
    }).$).then(() => images);
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
  moveAttr(attr, value = '') {
    const prev = attrs[attr];
    const elem = this.elem();

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
  moveClass(cls) {
    const prev = classes[cls];
    const elem = this.elem();

    if (prev && elem.length) {
      prev.removeClasses(cls);
    }

    if (elem.length) {
      classes[cls] = elem.addClasses(cls);
    }

    return this;
  }

  /**
   * @member Elem#name
   * @type {String|undefined}
   * @public
   * @readonly
   * @description tagName (lowercased) of the first element in the set.
   *
   * @example
   * const elem1 = elem.create('div');
   * elem1.name // 'div'
   */
  get name() {
    if (!this.length) {
      return;
    }

    return this.$[0].tagName;
  }

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
  next(selector = null) {
    return this.object((elems, elem) => {
      /* eslint no-cond-assign: 0 */
      while (elem = elem.nextElementSibling) {
        if (new Elem(elem).is(selector)) {
          return elems.add(elem);
        }
      }
    }, new Elem());
  }

  // TODO: add null check
  off() {
    const { removeListeners } = this.$.domcData;

    iterate(arguments, (event) => {
      const listeners = removeListeners[event];

      if (isObject(listeners)) {
        listeners.forEach(({ removeListener }) => removeListener());
      }
    });

    return this;
  }

  // TODO: add null check
  on(event, selector, listener) {
    const elem = this.$;
    const { removeListeners } = elem.domcData;

    if (isFunction(selector)) {
      listener = selector;
      selector = null;
    }

    if (isString(event)) {
      event = { [event]: listener };
    }

    const listeners = new Super({});

    new Super(event).forEach((listener, event) => {
      const removeEventListeners = removeListeners[event] = removeListeners[event] || new Super({}).value('index', 0);
      const index = removeEventListeners.prop('index');

      if (!removeEventListeners.has('listener')) {
        const newListener = (e) => {
          removeEventListeners.forEach(({ selector, listener }) => {
            if (!selector || new Elem(e.target).is(selector)) {
              listener.call(elem, e, this);
            }
          });
        };

        elem.addEventListener(event, newListener, false);
        removeEventListeners.value('listener', newListener);
      }

      const removeListener = () => {
        removeEventListeners.delete(index);

        if (!removeEventListeners.count) {
          elem.removeEventListener(event, removeEventListeners.prop('listener'), false);
          removeEventListeners.delete('listener');
        }
      };

      listeners.prop(event, removeListener);

      removeEventListeners.assign({
        index: index + 1,
        [index]: {
          selector,
          listener,
          removeListener
        }
      });
    });

    return function removeEventListeners(event) {
      if (arguments.length) {
        if (listeners.has(event)) {
          listeners.prop(event)();
        }

        return listeners.delete(event);
      }

      listeners.forEach((removeListener) => removeListener());
    };
  }

  /**
   * @member Elem#outerHTML
   * @type {String}
   * @public
   * @readonly
   * @description Outer HTML for the first element in the set.
   */
  get outerHTML() {
    return this.length ? this.$[0].outerHTML : undefined;
  }

  // TODO: outerWidth/outerHeight

  /**
   * @method Elem#parent
   * @public
   * @returns {Elem} New instance of Elem.
   * @description Method returns wrap of the set of the parent elements of each element in the set.
   */
  parent() {
    return this.object((elems, elem) => elems.add(elem.parentElement), new Elem());
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
  parentTree() {
    return this.object((elems, elem) => {
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
  prev(selector = null) {
    return this.object((elems, elem) => {
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
  prop(property, value) {
    if (arguments.length <= 1 && isString(property)) {
      return this.$[0] ? this.$[0][property] : undefined;
    }

    if (arguments.length >= 2) {
      property = { [property]: value };
    }

    return this.forEach((elem, index) => {
      iterate(property, (value, prop) => {
        elem[prop] = isFunction(value) ? value(elem.prop, elem, index) : value;
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
  ref(link) {
    return this.attr.apply(this, new Arr(arguments).unshift(refSwitcher(this.name)).$);
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
    return this.forEach((elem) => {
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
  removeAttr(...attributes) {
    return this.forEach((elem) => {
      iterate(arguments, (attr) => {
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
  removeClass(...classes) {
    return this.forEach((elem) => {
      const list = elem.classList;

      list.remove.apply(list, arguments);
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
  removeCSS(...props) {
    iterate(arguments, (css) => {
      this.css(css, '');
    });

    return this;
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
  replace(element) {
    const elem = getElem(this);
    const parent = elem.parentElement;

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
  setOf(type, iterator, callback) {
    validate({ 2: callback }, { 2: ['function'] }, 'Elem#setOf');

    iterator = new Super(iterator).$;

    if (isNumber(iterator)) {
      try {
        validate({ 1: iterator }, { 1: ['intLike', '>=0'] }, 'Elem#setOf');
      } catch (e) {
        throw new Error(`
					2nd argument must be either or non-negative integer, or object!
				`);
      }

      iterator = array(iterator);
    }

    return this.object((elems, elem, index) => {
      iterate(iterator, (value, key) => {
        const created = new Elem(elem).create(type);

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
  show() {
    const elem = this.$;

    if (!elem) {
      return this;
    }

    const { domcData } = elem;

    if (elem.style.display === 'none') {
      elem.style.display = domcData.previousDisplay;
      domcData.previousDisplay = '';
    }

    return this;
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
  text(text) {
    if (!arguments.length) {
      return this.prop(node.propertyDescriptor('textContent') ? 'textContent' : 'innerText');
    }

    return this.forEach((elem, index) => {
      new Elem(elem)
        .html('')
        .addText(
          isFunction(text)
            ? text(elem[node.propertyDescriptor('textContent') ? 'textContent' : 'innerText'], elem, index)
            : text
        );
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
  toggleClass(cls, condition) {
    return (arguments.length < 2 ? !this.hasClass(cls) : condition)
      ? this.addClass(cls)
      : this.removeClass(cls);
  }

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
  up(level = 1) {
    validate([level], [['intLike', '>=0']], 'Elem#up');

    return this.object((elems, elem) => {
      level = Number(level);

      while (n-- && elem) {
        elem = elem.parentElement;
      }

      elems.add(elem);
    }, new Elem());
  }

  /**
   * @method Elem#valid
   * @public
   * @returns {Boolean} If the first element in the set is valid.
   * @description Returns if the first element in the set is valid.
   *
   * @example
   * input
   *   .attr({
   *     required: '',
   *     maxLength: 2
   *   })
   *   .value('foo');
   *
   * input.valid; // false
   */
  get valid() {
    const elem = getElem(this);

    return elem && elem.validity ? elem.validity.valid : true;
  }

  /**
   * @method Elem#value
   * @public
   * @param {*|ElemValueCallback} [value] - Value to set.
   * @returns {Elem|String} If no arguments passed value of the first element in the set returned.
   * Otherwise all elements values in the set are set to the value argument.
   * @description Gets or sets value.
   *
   * @example
   * elem.value('123');
   * elem.value(); // '123'
   */
  value(value) {
    return this.prop.apply(this, new Arr(arguments).unshift('value').$);
  }
}

defineProperties(Elem.prototype, {
  [Symbol.toStringTag]: 'Elem'
});

export const window = new Elem(global);
export const document = new Elem(nativeDocument);
export const html = new Elem(nativeDocument.documentElement);
export const body = new Elem(nativeDocument.body);
export const head = new Elem(nativeDocument.head);

dynamicDefineProperties(Elem.prototype, elements, (elem) => function () {
  return this.create.apply(this, new Arr(arguments).unshift(elem).$);
});

/**
 * @function toFind
 * @private
 * @param {Element|Elem|String} elem - Element, selector of Elements or Elem.
 * @returns {Elem} Instance of Elem.
 */
function toFind(elem) {
  if (isString(elem)) {
    elem = find(elem);
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
 * @function htmlElement
 * @private
 * @param {*} [elem] - Element to wrap.
 * @returns {Elem} New instance of Elem.
 */
function htmlElement(elem) {
  return isElem(elem) ? elem : new Elem(elem);
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

/**
 * @function addDomcData
 * @private
 * @param {Element} elem - Element to add domcData to.
 * @returns {void}
 */
function addDomcData(elem) {
  if (!{}.hasOwnProperty.call(elem, 'domcData')) {
    /**
     * @member Element#domcData
     * @type {Object}
     * @protected
     * @property {String} previousDisplay - Parameter used for hiding/showing elements.
     * @property {Object.<String, Super>} removeListeners - Parameter used for remove event listeners.
     * @property {Super} [rules] - Parameter used for css styles.
     * @description D data.
     */
    Object.defineProperty(elem, 'domcData', {
      value: {
        previousDisplay: '',
        removeListeners: {},
        rules: this.name === 'style' && new Super(elem.cssRules)
      }
    });
  }
}

constructors[1].push({
  check: (elem) => isElement(elem) || /^(HTMLCollection|NodeList)$/.test(toStringTag(elem)),
  cls: Elem
});

export function find(selector, base = nativeDocument) {
  selector = String(selector);

  const found = new Elem(base.querySelectorAll(selector));

  Object.defineProperties(found, {
    base: {
      value: base
    },
    selector: {
      value: selector
    }
  });

  return found;
}
export function parseHTML(html) {
  return document
    .div()
    .html(html)
    .children();
}
export function px(size) {
  return Number(size.replace(/px$/, ''));
}

export default Elem;

// TODO: add selectors
// TODO: :elem(num), :not(selector) :is(selector), :hidden, :visible, :parent, :lt(num), :gt(num)
// TODO: :after(selector, immediate = false), :before(selector, immediate = false), :css(prop, value)
// TODO: < selector, :broken, :prop(key, value), :has(selector), :within(selector), :closest(selector)
// TODO: :child-of(selector)
