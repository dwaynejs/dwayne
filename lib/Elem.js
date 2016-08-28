/**
 * @module Elem
 * @private
 * @mixin
 * @description Exports Elem class.
 */

import Super from './Super';
import Arr, { array } from './Arr';
import Func from './Func';
import Promise from './Promise';
import Str from './Str';
import { switcher } from './Switcher';
import constructors from './constants/constructors';
import appliedRegExps from './constants/appliedRegExps';
import css from './constants/css';
import elements from './constants/elements';
import {
  isFunction, isNumber, isString, isInteger, isElement,
  assign, dynamicDefineProperties, defineProperties, toArray,
  validate, toStringTag, iterate, crossClassMethods, Symbol,
  checkClassInstance, possibleSuperClassReturn, inherits
} from './helpers';

/**
 * @callback ElemValueCallback
 * @public
 * @param {String} value - Old value.
 * @param {Number} index - Index in the set of the elements.
 * @param {Elem} elem - Current element.
 */

const nativeDocument = global.document;
const empty = nativeDocument.createElement('div');
const node = new Super(Node.prototype);
const classes = {};
const attrs = {};
const refSwitcher = switcher('strictEquals', 'href')
  .case(['img', 'script', 'iframe', 'audio', 'video'], 'src')
  .case(['form'], 'action');

export function Elem(elem = []) {
  checkClassInstance(this, Elem, 'Elem');

  elem = new Super(elem).$;

  if (!elem) {
    elem = [];
  } else if (isElement(elem)) {
    elem = [elem];
  }

  const $this = possibleSuperClassReturn(this, Arr, [toArray(elem, true)]);

  this.forEach((elem) => {
    if (!{}.hasOwnProperty.call(elem, 'domcData')) {
      /**
       * @member Node#domcData
       * @protected
       * @property {String} previousDisplay - Parameter used for hiding/showing elements.
       * @property {Object.<String, Super>} removeListeners - Parameter used for remove event listeners.
       * @property {Super|undefined} rules - Parameter used for css styles.
       * @description D data.
       */
      Super.prototype.value.call(this, 'domcData', {
        previousDisplay: '',
        removeListeners: {},
        rules: this.name === 'style' && new Super(this.prop('sheet').cssRules)
      });
    }
  });

  return $this;

  /**
   * @member {Element[]} Elem#$
   * @public
   * @description Initial element set.
   */
}

inherits(Elem, Arr);

defineProperties(Elem.prototype, {
  /**
   * @method Elem#absolute
   * @public
   * @returns {Elem} Returns this.
   * @description Shorthand for elem.position('absolute').
   *
   * @example
   * elem.absolute();
   */
  absolute() {
    return this.position('absolute');
  },

  // TODO: add()

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
  addClasses() {
    return this.forEach((elem) => {
      const list = elem.classList;

      list.add.apply(list, arguments);
    });
  },

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
  addHTML(html) {
    return this.forEach((elem) => {
      elem.innerHTML += html;
    });
  },

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
      if (htmlElement(elem).name === 'style') {
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
  },

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
  },

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
  apply() {
    let applied;
    let np;
    let value;
    let slice;

    iterate(String(new Arr(arguments).join(' ')).split(/(\s+)/), (string) => {
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
  },

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
        elem.setAttribute(key, isFunction(value) ? value(elem.getAttribute(key), index, elem) : value);
      });
    });

    crossClassMethods.transformAnchor(this);

    return this;
  },

  /**
   * @method Elem#block
   * @public
   * @returns {Elem} Returns this.
   * @description Shorthand for elem.display('block').
   *
   * @example
   * elem.block();
   */
  block() {
    return this.display('block');
  },

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
  },

  /**
   * @method Elem#bold
   * @public
   * @returns {Elem} Returns this.
   * @description Shorthand for elem.fontWeight('bold').
   */
  bold() {
    return this.fontWeight('bold');
  },

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
  },

  /**
   * @method Elem#centerText
   * @public
   * @returns {Elem} Returns this.
   * @description Shorthand for elem.textAlign('center').
   */
  centerText() {
    return this.textAlign('center');
  },

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
      if (htmlElement(elem).name === 'style') {
        const rule = elem.domcData.rules.find((rule) => rule.domcData && rule.domcData.name === name);

        if (rule) {
          new Elem(rule.value).css(style);

          return true;
        }
      }
    });

    return this;
  },

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
   * const child = elem.child(1);
   *
   * elem.child(elem2);
   * elem.child(document.getElementById('id'));
   * elem.child('#id div.c1');
   */
  child(element) {
    if (isInteger(element) && element >= 0) {
      return htmlElement(getElem(this).children[element]);
    }

    return toFind(element).into(this);
  },

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
    return new Elem(getElem(this).children);
  },

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
  class(cls) {
    if (!arguments.length) {
      return new Arr(getElem(this).className.split(' '));
    }

    return this.forEach((elem) => {
      elem.className = cls;
    });
  },

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
  },

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
    return this.map((elem) => htmlElement(elem.cloneNode(deep)));
  },

  /**
   * @method Elem#closest
   * @public
   * @param {String} selector - See the link.
   * @returns {Elem} Set of the closest elements.
   * @description Synonym for
   * [Element#closest]{@link https://developer.mozilla.org/en/docs/Web/API/Element/closest}.
   */
  closest(selector) {
    return new Elem(this.object((elems, elem) => {
      while (elem) {
        if (new Elem(elem).is(selector)) {
          return elems.add(elem);
        }

        elem = elem.parentNode;
      }
    }, []));
  },

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
  },

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
    const elem = this.$[0];
    const element = htmlElement(nativeDocument.createElement(type));

    if (elem && elem !== nativeDocument) {
      element.into(this);
    }

    return element.apply.apply(element, new Arr(arguments).slice(1).$);
  },

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
  },

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
        elem.dataset[key] = isFunction(value) ? value(elem.dataset[key], index, elem) : value;
      });
    });

    return this;
  },

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
    if (!arguments.length) {
      return getElem(this).defaultValue;
    }

    return this.forEach((elem) => {
      elem.defaultValue = value;
    });
  },

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
      if (htmlElement(elem).name === 'style') {
        const rule = elem.domcData.rules.find((rule) => rule.domcData && rule.domcData.name === name);

        if (rule) {
          elem.sheet.deleteRule(rule.key);

          return true;
        }
      }
    });

    return this;
  },

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
  },

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
  },

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
    return this.forEach((elem) => {
      new Super(elem).prop('draggable', !!draggable);
    });
  },

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
  editable(editable = true) {
    return this.toggleAttr('contentEditable', editable);
  },

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

    return new Elem(this.prop(index));
  },

  // TODO: write after writing selectors API
  find(selector) {
    return find(selector, this.$);
  },

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
  first(selector = null) {
    return new Elem(this.object((elems, elem) => {
      const { value: found } = new Super(elem.children).find((elem) => new Elem(elem).is(selector)) || {};

      if (found) {
        elems.add(found);
      }
    }, []));
  },

  /**
   * @method Elem#fixed
   * @public
   * @returns {Elem} Returns this.
   * @description Shorthand for elem.position('fixed').
   *
   * @example
   * elem.fixed();
   */
  fixed() {
    return this.position('fixed');
  },

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
  },

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
  },

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
      if (htmlElement(elem).name === 'style') {
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
  },

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
  },

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
  },

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
  },

  html(html) {
    if (!arguments.length) {
      return getElem(this).innerHTML;
    }

    return this.forEach((elem) => {
      elem.innerHTML = html;
    });
  },
  id(id) {
    if (!arguments.length) {
      return getElem(this).id;
    }

    return this.forEach((elem) => {
      elem.id = id;
    });
  },

  // TODO: add null check
  insertAfter(element) {
    element = toFind(element);

    const parent = element.parentNode;

    if (parent.lastChild === element) {
      parent.appendChild(this.$);
    } else {
      parent.insertBefore(this.$, element.nextSibling);
    }

    return this;
  },

  // TODO: add null check
  insertBefore(element) {
    element = toFind(element);

    element.parentNode.insertBefore(this.$, element);

    return this;
  },
  inline() {
    return this.display('inline');
  },
  inlineBlock() {
    return this.display('inline-block');
  },

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

    if (element && this.$) {
      element.appendChild(this.$);
    }

    return this;
  },
  is(selector) {
    return this.$ ? this.$.matches(selector) : false;
  },
  isBroken() {
    const elem = this.$;

    return elem ? elem.complete && (!elem.naturalWidth || elem.naturalHeight) : false;
  },
  italic() {
    return this.fontStyle('italic');
  },

  // TODO: add #last(selector) and #last(selector, elementBool) syntax
  // TODO: add null check
  last(bool) {
    return htmlElement(bool ? this.$.lastElementChild : this.$.lastChild);
  },
  lineThrough() {
    return this.textDecorationLine('line-through');
  },
  load() {
    const elem = this.$;

    if (!elem || elem.complete) {
      return this.isBroken() ? Promise.reject(this) : Promise.resolve(this);
    }

    return new Promise((resolve, reject) => {
      const removeListeners = this.on({
        load() {
          removeListeners();
          resolve(this);
        },
        error(err) {
          removeListeners();
          reject(err);
        }
      });
    });
  },
  // TODO: #matches() -> #is()
  moveAttr(attr, value = '') {
    const prev = attrs[attr];

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
  },
  moveClass(cls) {
    const prev = classes[cls];

    if (prev && this.$) {
      prev.removeClasses(cls);
    }

    if (this.$) {
      classes[cls] = this;
    }

    return this.addClasses(cls);
  },
  'get name'() {
    return this.$ && this.$.tagName ? this.$.tagName.toLowerCase() : undefined;
  },

  // TODO: add #next(selector) and #next(selector, elementBool) syntax
  // TODO: add null check
  next(bool) {
    return htmlElement(bool ? this.$.nextElementSibling : this.$.nextSibling);
  },

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
  },

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
            if (!selector || htmlElement(e.target).matches(selector)) {
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
  },

  'get outerHTML'() {
    return this.$ ? this.$.outerHTML || '' : '';
  },

  // TODO: outerWidth/outerHeight

  overline() {
    return this.textDecorationLine('overline');
  },
  parent() {
    return htmlElement(this.$ ? this.$.parentNode : null);
  },
  parentTree() {
    const collection = [];
    let elem = this.parent();

    while (elem.$) {
      collection.push(elem);
      elem = elem.parent();
    }

    return new Elem(collection);
  },
  pointer() {
    return this.cursor('pointer');
  },

  // TODO: add #prev(selector) and #prev(selector, elementBool) syntax
  // TODO: add null check
  prev(bool) {
    return htmlElement(bool ? this.$.previousElementSibling : this.$.previousSibling);
  },
  // TODO: add #putBefore(): parent.putAfter(element, childNumber)
  // TODO: add #putBefore(): parent.putBefore(element, childNumber)
  ref() {
    return this.attr.apply(this, new Arr(arguments).unshift(refSwitcher(this.name)).$);
  },
  relative() {
    return this.position('relative');
  },
  remove() {
    if (this.$) {
      this.$.remove();
    }

    return this;
  },
  removeAttr() {
    const elem = this.$;

    iterate(elem && arguments, (attr) => {
      elem.removeAttribute(attr);
    });

    return this;
  },
  removeClasses() {
    if (!this.$) {
      return this;
    }

    const list = this.$.classList;

    list.remove.apply(list, arguments);

    return this;
  },
  removeCSS() {
    iterate(arguments, (css) => {
      this.css(css, '');
    });

    return this;
  },

  // TODO: add null check
  replace(element) {
    const elem = this.$;

    element = toFind(element);
    elem.parentNode.replaceChild(elem, element);

    return this;
  },
  setOf(type, iterator, callback) {
    if (!this.$) {
      return this;
    }

    iterator = new Super(iterator).$;

    if (isNumber(iterator)) {
      try {
        validate([null, iterator], { 1: ['intLike', '>=0'] }, 'Elem#setOf');
      } catch (e) {
        throw new Error(`
					2nd argument must be either or non-negative integer, or object!
				`);
      }

      iterator = array(iterator);
    }

    new Super(iterator).forEach((value, key) => {
      const created = this.create(type);

      if (callback) {
        callback(created, value, key, iterator);
      }
    });

    return this;
  },
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
  },
  text(text) {
    return arguments.length
      ? this.html('').addText(text)
      : this.prop(node.propertyDescriptor('textContent') ? 'textContent' : 'innerText');
  },
  toggleAttr(attr, condition) {
    return (arguments.length < 2 ? !this.hasAttr(attr) : condition)
      ? this.attr(attr, '')
      : this.removeAttr(attr);
  },
  toggleClass(cls, condition) {
    return (arguments.length < 2 ? !this.hasClass(cls) : condition)
      ? this.addClasses(cls)
      : this.removeClasses(cls);
  },
  type() {
    return this.prop.apply(this, new Arr(arguments).unshift('type').$);
  },
  underline() {
    return this.textDecorationLine('underline');
  },
  up(n = 1) {
    validate([n], [['intLike', '>=0']], 'Elem#up');

    n = Number(n);

    let elem = this.$;

    while (n-- && elem) {
      elem = elem.parentNode;
    }

    return htmlElement(elem);
  },
  'get valid'() {
    const elem = this.$;

    return elem && elem.validity ? elem.validity.valid : true;
  },
  value() {
    return this.prop.apply(this, new Arr(arguments).unshift('value').$);
  },
  [Symbol.toStringTag]: 'Elem'
});

export const window = htmlElement(global);
export const document = htmlElement(nativeDocument);
export const html = htmlElement(nativeDocument.documentElement);
export const body = htmlElement(nativeDocument.body);
export const head = htmlElement(nativeDocument.head);

dynamicDefineProperties(Elem.prototype, css, (prop) => function () {
  return this.css.apply(this, new Arr(arguments).unshift(prop).$);
});

dynamicDefineProperties(Elem.prototype, elements, (elem) => function () {
  return this.create.apply(this, new Arr(arguments).unshift(elem).$);
});

crossClassMethods.htmlElement = htmlElement;

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

constructors[1].push({
  check: (elem) => isElement(elem) || /^(HTMLCollection|NodeList)$/.test(toStringTag(elem)),
  cls: Elem
});

// TODO: add watch parameter
export function find(selector) {
  const found = nativeDocument.querySelectorAll(selector);

  return htmlElement(found);
}
export function loadImages(images) {
  const promises = [];

  images = new Super(images).$;

  iterate(images, (image) => {
    image = new Super(image).$;

    if (!isString(image) && image.complete) {
      promises.push(htmlElement(image));

      return;
    }

    promises.push(new Promise((resolve) => {
      const img = isString(image) ? document.img() : image;

      resolve = new Func(resolve).bindArgs([img]);

      img.on({
        load: resolve,
        error: resolve
      });

      if (isString(image)) {
        img.ref(image);
      }
    }));
  });

  return Promise.all(promises).then((images) => new Elem(images));
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
