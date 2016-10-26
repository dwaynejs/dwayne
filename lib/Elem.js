/**
 * @module Elem
 * @private
 * @mixin
 * @description Exports Elem class.
 */

import Super from './Super';
import Arr, { array } from './Arr';
import { blob } from './BlobObject';
import Fetch from './Fetch';
import { method } from './Func';
import Promise from './Promise';
import Str from './Str';
import { switcher } from './Switcher';
import constructors from './constants/constructors';
import appliedRegExps from './constants/appliedRegExps';
import elements from './constants/elements';
import { canvasGetMethods, canvasRestMethods } from './constants/canvasMethods';
import {
  isArray, isArrayLike, isElement, isFunction,
  isInteger, isNumber, isNull, isString,
  assign, dynamicDefineProperties, defineProperties, toArray,
  validate, toStringTag, iterate, Symbol
} from './helpers';

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

const nativeDocument = global.document;
const emptyDiv = nativeDocument.createElement('div');
const eventSeparator = /, *| +/;
const textProperty = new Super(Node.prototype).propertyDescriptor('textContent') ? 'textContent' : 'innerText';
const classes = {};
const attrs = {};
const windowsDwayneData = new Arr([]);
const inputElements = 'input, select, textarea, datalist, keygen, output';
const dataURLFetch = new Fetch({ responseType: 'arraybuffer' });
const click = method('click');
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
      (elem) => new Elem(elem).is(selector)
  )
  .case(
    [isArray, isElem],
    (elems) => {
      elems = new Arr(elems);

      return (elem) => elems.indexOf(elem) !== -1;
    }
  );
const innerSwitcher = switcher('strictEquals', 0)
  .case('padding-box', (paddings) => paddings)
  .case('border-box', (paddings, borders) => paddings + borders);
const outerSwitcher = switcher('strictEquals', (borders, paddings) => borders + paddings)
  .case('padding-box', (borders) => borders)
  .case('border-box', 0);

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
export class Elem extends Arr {
  constructor(elem = []) {
    super((() => {
      let element = elem;

      if (isArrayLike(element) && (
        isWindow(element) ||
        isHTMLDocument(element) ||
        isElement(element)
      )) {
        element = [element];
      }

      return new Arr(toArray(new Super(element).$, true)).object((elems, elem) => {
        if ((isElement(elem) || isWindow(elem) || isHTMLDocument(elem) || toStringTag(elem) === 'CSSStyleRule') && elems.indexOf(elem) === -1) {
          return elems.push(elem);
        }

        if (isElem(elem)) {
          elems.push.apply(elems, elem.$);
        }
      }, []).$;
    })());

    this.$$ = elem;

    this.forEach(addDwayneData);

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
  }

  /**
   * @method Elem#add
   * @public
   * @param {...(String|Elem|Element|Element[])} elements - Each argument is a selector, or Elem, or Element, or array of Elements.
   * @returns {Elem} Returns this.
   * @description Method for adding new elements to the set.
   *
   * @example
   * elem1.find('.cls1')
   *   .add(elem2.find('.cls2'))
   *   .hide();
   */
  add(...elements) {
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
   * @method Elem#addClass
   * @public
   * @param {...String} classes - Classes to add.
   * @returns {Elem} Returns this.
   * @description Method for adding classes to the all the elements in the set.
   *
   * @example
   * elem.addClass('red', 'round');
   */
  addClass(...classes) {
    return this.forEach((elem) => {
      const list = elem.classList;

      iterate(arguments, (cls) => list.add(cls));
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
   * Note: style element should be inside the document.
   *
   * @example
   * style.addRule('img-size', 'img.square', {
   *   width: '40px !important',
   *   height: '40px !important'
   * });
   */
  addRule(name, selector, style) {
    this.some((elem) => {
      if (getName(elem) === 'style') {
        const { sheet } = elem;
        const { length } = sheet.cssRules;
        const rules = new Super(style).word((value, property) => (
          `${ new Str(property).toHyphenCase() }: ${ value };\n`
        ));

        sheet.insertRule(
          `${ selector } {${ rules && '\n' }${ rules }}`,
          length
        );
        sheet.cssRules[length].dwayneData = { name };

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
   * //   .addClass('c1', 'c2')
   * //   .css('border', '1px solid black')
   * //   .attr({
   * //     attr, 'some value'
   * //     disabled: ''
   * //   })
   * //   .text('Click me!');
   * // There is a full list of possible types of syntax below...
   *
   * elem.apply('#id');                    // shorthand for elem.id('id');
   * elem.apply('.c1 .c2');                // shorthand for elem.addClass('c1', 'c2');
   * elem.apply('-.c1 -.c2');              // shorthand for elem.removeClass('c1', 'c2');
   * elem.apply('-@float -@display');      // shorthand for elem.removeCSS('float', 'display');
   * elem.apply('-$a1 -$a2');              // shorthand for elem.removeAttr('a1', 'a2');
   * elem.apply('*(some text)');           // shorthand for elem.text('some text');
   * elem.apply('&(<div>1</div>)');        // shorthand for elem.html('<div>1</div>');
   * elem.apply('@float(right)');          // shorthand for elem.css('float', 'right');
   * elem.apply('@transform(scale(5px))'); // shorthand for elem.css('transform', 'scale(5px)');
   * elem.apply('@margin(2px 2px)');       // shorthand for elem.css('margin', '2px 2px');
   * elem.apply('@marginLeft(2px)');       // shorthand for elem.css('marginLeft', '2px 2px');
   * elem.apply('@margin-left(2px)');      // shorthand for elem.css('margin-left', '2px 2px');
   * elem.apply('$attr(some value)');      // shorthand for elem.attr('attr', 'some value');
   * elem.apply('$attr');                  // shorthand for elem.attr('attr', '');
   */
  apply(...strings) {
    let applied;
    let setApplied;
    let callback;
    let name;
    let np1;
    let slice;

    new Str(new Arr(arguments).join(' '))
      .split(/(\s+)/)
      .forEach((string) => {
        if (!applied) {
          np1 = string.slice(0, 1);
          callback = appliedRegExps[np1];
          slice = 1;

          if (callback && !isFunction(callback)) {
            callback = callback[string.slice(1, 2)];
            slice = 2;
          }

          if (/^\s+$/.test(string) || !callback) {
            return;
          }

          name = string.slice(slice).match(/^[^()]+/);

          if (!name && (np1 !== '*' && np1 !== '&')) {
            return;
          }

          applied = {
            name: name ? name[0] : '',
            args: string.slice(slice + (name ? name[0] : '').length),
            callback
          };

          setApplied = true;
        }

        if (!setApplied) {
          applied.args += string;
        }

        if (!applied.args || /^\([\s\S]+\)$/.test(applied.args)) {
          applied.callback(this, applied.name, applied.args.replace(/^\(|\)$/g, ''));
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

    return this.forEach((elem, index) => {
      new Super(attr).forEach((value, key) => {
        elem.setAttribute(key, isFunction(value) ? value(elem.getAttribute(key), elem, index) : value);
      });
    });
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
  blob(options = {}) {
    // TODO: write using ArrayBuffer

    return new Promise((resolve, reject) => {
      const elem = this.first();
      const { name } = elem;

      if (name !== 'img' && name !== 'canvas') {
        reject(new Error('First element in the set isn\'t an image or a canvas! (Elem#blob)'));
      }

      if (name === 'canvas') {
        return resolve(elem);
      }

      elem
        .load()
        .then(() => {
          if (elem.isBroken()) {
            return reject(new Error('The image is broken! (Elem#blob)'));
          }

          const canvas = new Elem(nativeDocument).canvas();
          const width = elem.width();
          const height = elem.height();

          canvas
            .width(width)
            .height(height)
            .drawImage(elem.$[0], 0, 0);

          resolve(canvas);
        });
    })
      .then((canvas) => dataURLFetch(canvas.dataURL()))
      .then(({ data: ab }) => blob(ab, options));
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
   * Note: style element should be inside the document.
   *
   * @example
   * style.changeRule('img-size', {
   *   width: '50px !important',
   *   height: '50px !important'
   * });
   */
  changeRule(name, style) {
    this.some((elem) => {
      if (getName(elem) === 'style') {
        const { value: rule } = new Arr(elem.sheet.cssRules).find((rule) => rule.dwayneData && rule.dwayneData.name === name) || {};

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
  child(element) {
    if (isInteger(element) && element >= 0) {
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
    return this.forEach(click);
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
  clone(deep = false) {
    return this.object((elems, elem) => {
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
  create(type, ...appliedExpressions) {
    return this.object((elems, elem) => {
      const element = new Elem(nativeDocument.createElement(type));

      if (elem !== nativeDocument) {
        element.into(elem);
      }

      elems.add(element.apply.apply(element, appliedExpressions));
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
  css(property, value) {
    const style = getElem(this).style;

    if (!arguments.length) {
      return new Str(style.cssText)
        .split(/; ?/)

        .object((o, value) => {
          if (value) {
            property = value.split(/: /);

            o[new Str(property[0]).toCamelCase().$] = property[1];
          }
        });
    }

    if (arguments.length <= 1 && isString(property)) {
      property = new Str(property).toHyphenCase().$;

      return style.getPropertyValue(property) + (style.getPropertyPriority(property) ? ' !important' : '');
    }

    if (arguments.length >= 2) {
      property = { [property]: value };
    }

    return this.forEach((elem, index) => {
      new Super(property).forEach((value, property) => {
        property = new Str(property).toHyphenCase().$;

        if (isFunction(value)) {
          value = value(new Elem(elem).css(property), elem, index);
        }

        elem.style.removeProperty(property);
        elem.style.setProperty(
          property,
          value.replace(/ ?!important$/, ''),
          /!important$/.test(value) ? 'important' : ''
        );
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
  ctx(property, value) {
    let ctx;

    this.some((elem) => {
      if (getName(elem) === 'canvas') {
        ctx = elem.dwayneData.ctx;

        return true;
      }
    });

    if (!arguments.length) {
      return ctx;
    }

    if (isFunction(property)) {
      property(ctx);
    } else {
      if (arguments.length >= 2) {
        property = { [property]: value };
      }

      assign(ctx, property);
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
  dataURL(type, encoderOptions) {
    const ctx = this.ctx();

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
  deleteRule(name) {
    this.some((elem) => {
      if (getName(elem) === 'style') {
        const rule = new Arr(elem.sheet.cssRules).find((rule) => rule.dwayneData && rule.dwayneData.name === name);

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
  dispatch(event, eventInit = {}, details = {}) {
    const { bubbles = true, cancelable = true } = eventInit || {};
    let finalEvent = event;

    if (!/Event$/.test(toStringTag(finalEvent))) {
      try {
        finalEvent = new Event(finalEvent, { bubbles, cancelable });
      } catch (err) {
        finalEvent = nativeDocument.createEvent('Event');
        finalEvent.initEvent(event, bubbles, cancelable);
      }

      assign(finalEvent, details);
    }

    return this.forEach((elem) => {
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
    if (!isString(selector)) {
      return super.find(selector);
    }

    return this.object((elems, elem) => {
      elems.add(find(selector, elem));
    }, new Elem());
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
  focus() {
    return this.forEach((elem) => {
      elem.focus();
    });
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
  getRule(name) {
    let found = {
      selector: undefined,
      rules: {}
    };

    this.some((elem) => {
      if (getName(elem) === 'style') {
        const { value: rule } = new Arr(elem.sheet.cssRules).find((rule) => rule.dwayneData && rule.dwayneData.name === name) || {};

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
   * elem.addClass('cls').hasClass('cls');    // true
   * elem.removeClass('cls').hasClass('cls'); // false
   */
  hasClass(cls) {
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
  height(height) {
    return this.prop.apply(this, new Arr(arguments).unshift('height').$);
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
    return this.forEach((elem) => {
      elem = new Elem(elem);

      const currentDisplay = elem.css('display');

      if (currentDisplay.indexOf('none')) {
        elem.prop('dwayneData').previousDisplay = currentDisplay;
      }

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
   * elem.html('<div>1</div>');
   * elem.html(); // '<div>1</div>'
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
  get innerHeight() {
    const elem = this.$[0];

    if (!elem) {
      return 0;
    }

    if (isWindow(elem)) {
      return elem.innerHeight;
    }

    const {
      borderTopWidth,
      borderBottomWidth,
      boxSizing,
      height,
      paddingTop,
      paddingBottom
    } = this.calcCSS();
    const borders = px(borderTopWidth) + px(borderBottomWidth);
    const paddings = px(paddingTop) + px(paddingBottom);

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
  get innerWidth() {
    const elem = this.$[0];

    if (!elem) {
      return 0;
    }

    if (isWindow(elem)) {
      return elem.innerWidth;
    }

    const {
      borderLeftWidth,
      borderRightWidth,
      boxSizing,
      paddingLeft,
      paddingRight,
      width
    } = this.calcCSS();
    const borders = px(borderLeftWidth) + px(borderRightWidth);
    const paddings = px(paddingLeft) + px(paddingRight);

    return px(width) - innerSwitcher(boxSizing, [paddings, borders]);
  }

  /**
   * @method Elem#insertAfter
   * @public
   * @param {String|Elem|Element} element - Element to insert this element after or a selector of it.
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
    element = toFind(element).first();

    let parent = element.parent();

    if (!parent.length) {
      return this;
    }

    element = element.next().$[0];
    parent = parent.$[0];

    return this.forEach((elem) => {
      if (element) {
        parent.insertBefore(elem, element);

        element = elem;
      } else {
        parent.appendChild(elem);
      }
    });
  }

  /**
   * @method Elem#insertBefore
   * @public
   * @param {String|Elem|Element} element - Element to insert this element before or a selector of it.
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
    element = toFind(element).first();

    let parent = element.parent();

    if (!parent.length) {
      return this;
    }

    element = element.$[0];
    parent = parent.$[0];

    return this.forEach((elem) => {
      parent.insertBefore(elem, element);
    });
  }

  /**
   * @method Elem#into
   * @public
   * @param {String|Elem|Element} element - Element to put this elements into or a selector of it.
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
    element = toFind(element).$[0];

    if (!element) {
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
  isBroken() {
    let isBroken = false;

    this.some((elem) => {
      if (getName(elem) === 'img') {
        isBroken = !!(elem.complete && (!elem.naturalWidth || !elem.naturalHeight));

        return true;
      }
    });

    return isBroken;
  }

  /**
   * @method Elem#isWithinDocument
   * @public
   * @returns {Boolean} Returns if the first element in the set is within the document or not.
   * @description Returns if the first element in the set is within the document or not.
   *
   * @example
   * new Elem(document.body).isWithinDocument();  // true
   * new Elem(document).div().isWithinDocument(); // false
   */
  isWithinDocument() {
    return this.first().closest('html').length !== 0;
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

    return Promise.all(
      this
        .filter((elem) => getName(elem) === 'img')
        .map((elem) => {
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
        })
        .$
    ).then(() => images);
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
  get name() {
    return getName(this.$[0]);
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
        if (isNull(selector) || new Elem(elem).is(selector)) {
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
  off(...events) {
    return this.forEach((elem) => {
      const { listeners } = elem.dwayneData;

      iterate(arguments, (event) => {
        iterate(event.split(eventSeparator), (event) => {
          (listeners[event] || new Super()).forEach(({ removeListener }) => removeListener());
        });
      });
    });
  }

  /**
   * @method Elem#on
   * @public
   * @param {ElemEventString|Object.<ElemEventString|ElemListener>} event - Either a {@link ElemEventString} string
   * or an object with event keys (a key is also ElemEventString) and listeners values.
   * @param {String} [selector = null] - Selector to filter event targets.
   * @param {ElemListener} [listener] - If the first argument is a string it must be a listener function for
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
  on(event, selector = null, listener) {
    const allListeners = new Super({});

    if (isFunction(selector)) {
      listener = selector;
      selector = null;
    }

    if (isString(event)) {
      event = { [event]: listener };
    }

    event = new Super(event).object((listeners, listener, event) => {
      iterate(event.split(eventSeparator), (event) => {
        listeners[event] = listener;
      });
    });

    this.forEach((elem) => {
      const { listeners } = (windowsDwayneData.find(({ element }) => element === elem) || {}).value || elem.dwayneData;

      event.forEach((listener, event) => {
        const removeEventListeners = listeners[event] = listeners[event] || new Super({}).define('index', {
          value: 0,
          configurable: true,
          writable: true
        });
        const index = removeEventListeners.prop('index');

        if (!removeEventListeners.has('listener')) {
          const newListener = (e) => {
            removeEventListeners.forEach(({ selector, listener }) => {
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

        const removeListener = () => {
          removeEventListeners.delete(index);

          if (!removeEventListeners.count) {
            elem.removeEventListener(event, removeEventListeners.prop('listener'), false);
            removeEventListeners.delete('listener');
          }
        };

        allListeners.prop(event, (allListeners.prop(event) || new Arr()).push(removeListener));

        removeEventListeners.assign({
          index: index + 1,
          [index]: {
            selector,
            listener,
            removeListener
          }
        });
      });
    });

    return function removeEventListeners(event) {
      if (arguments.length) {
        iterate(arguments, (event) => {
          iterate(event.split(eventSeparator), (event) => {
            if (allListeners.has(event)) {
              allListeners.prop(event).forEach((removeListener) => removeListener());
              allListeners.delete(event);
            }
          });
        });

        return;
      }

      allListeners.forEach((removeListeners) => {
        removeListeners.forEach((removeListener) => removeListener());
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
  get outerHeight() {
    const elem = this.$[0];

    if (!elem) {
      return 0;
    }

    if (isWindow(elem)) {
      return elem.outerHeight;
    }

    const {
      borderTopWidth,
      borderBottomWidth,
      boxSizing,
      height,
      marginTop,
      marginBottom,
      paddingTop,
      paddingBottom
    } = this.calcCSS();
    const borders = px(borderTopWidth) + px(borderBottomWidth);
    const paddings = px(paddingTop) + px(paddingBottom);

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
  get outerWidth() {
    const elem = this.$[0];

    if (!elem) {
      return 0;
    }

    if (isWindow(elem)) {
      return elem.outerWidth;
    }

    const {
      borderLeftWidth,
      borderRightWidth,
      boxSizing,
      marginLeft,
      marginRight,
      paddingLeft,
      paddingRight,
      width
    } = this.calcCSS();
    const borders = px(borderLeftWidth) + px(borderRightWidth);
    const paddings = px(paddingLeft) + px(paddingRight);

    return px(width) + px(marginLeft) + px(marginRight) + outerSwitcher(boxSizing, [borders, paddings]);
  }

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
        if (isNull(selector) || new Elem(elem).is(selector)) {
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
        elem[prop] = isFunction(value) ? value(elem[prop], elem, index) : value;
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
    if (!arguments.length) {
      return this.attr(refSwitcher(this.name));
    }

    return this.forEach((elem) => {
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
  remove() {
    return this.forEach((elem) => {
      const parent = elem.parentElement;

      if (parent) {
        parent.removeChild(elem);
      }
    });
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

      iterate(arguments, (cls) => list.remove(cls));
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
    return this.forEach((elem) => {
      iterate(arguments, (css) => {
        elem.style.removeProperty(css);
      });
    });
  }

  /**
   * @method Elem#replace
   * @public
   * @param {String|Elem|Element} element - Element to replace the first element in the set
   * with a set of elements specified by the argument (Element, set of elements or a selector of them).
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
    element = toFind(element);

    const parent = this.first().parent();

    if (!parent.length) {
      return this;
    }

    let elem = parent;
    let method = 'into';
    const next = this.next().first().$[0];
    const prev = this.prev().first().$[0];

    if (next) {
      elem = next;
      method = 'insertBefore';
    } else if (prev) {
      elem = prev;
      method = 'insertAfter';
    }

    this.first().remove();

    element[method](elem);
  }

  /**
   * @method Elem#setOf
   * @public
   * @param {String} type - HTML element type.
   * @param {Number|Object|Array.<*>} iterator - A number (how many elements to create inside each element),
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
        throw new Error('2nd argument must be either or non-negative integer, or object! (at Elem#setOf)');
      }

      iterator = array(iterator).$;
    }

    return this.object((elems, elem, index) => {
      iterate(iterator, (value, key) => {
        const created = new Elem(elem).create(type);

        callback(created.$[0], value, key, iterator, elem, index);

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
    return this.forEach((elem) => {
      const { dwayneData } = elem;

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
  text(text) {
    if (!arguments.length) {
      return this.prop(textProperty);
    }

    return this.forEach((elem, index) => {
      const txt = elem[textProperty];

      new Elem(elem)
        .html('')
        .addText(
          isFunction(text)
            ? text(txt, elem, index)
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

  get toStringTag() {
    return toStringTag(this.$$);
  }

  /**
   * @method Elem#up
   * @public
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

    level = Number(level);

    return this.object((elems, elem) => {
      let n = level;

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
   * @returns {Elem|Object.<String, Error|*>|null}
   * If a callback argument provided returns this. If no arguments provided returns either an object
   * with input names keys and errors values or null if no errors found.
   * @description If a callback argument provided adds it to the element validators list.
   * If no arguments provided validates every input element in the set with its own functions.
   * If an element is a form it validates all input elements inside it. After the validation
   * fires 'validate' event with 'valid' and 'error' (if form it's errors) properties.
   *
   * @example
   * form.on('input change', 'input', (value, input) => {
   *   input = D(input);
   *
   *   if (Number(value) % 3) {
   *     input.addClass('invalid');
   *
   *     throw new Error('The value should be divided by 3!');
   *   }
   *
   *   input.removeClass('invalid');
   * });
   */
  validate(validator) {
    validate([validator], ['function||!'], 'Elem#validate');

    if (validator) {
      return this.forEach(({ dwayneData }) => {
        dwayneData.validators.push(validator);
      });
    }

    const errors = new Super({ errors: null });

    this
      .filter(`${ inputElements }, form`)
      .forEach((elem, index) => {
        if (getName(elem) === 'form') {
          let formErrors = { errors: null };
          const form = new Elem(elem);
          const inputs = form.find(inputElements);

          inputs.forEach((input, index) => {
            validatorWrap(input, index, formErrors);
          });

          errors.deepAssign(formErrors);

          formErrors = formErrors.errors;

          form.dispatch('validate', {}, {
            valid: !formErrors,
            errors: formErrors
          });

          return inputs.forEach((input) => {
            const inputError = (formErrors || {})[input.name];

            new Elem(input).dispatch('validate', {}, {
              valid: !inputError,
              error: inputError || null
            });
          });
        }

        let inputError = { errors: null };

        validatorWrap(elem, index, inputError);
        errors.deepAssign(inputError);

        inputError = (inputError.errors || {})[elem.name];

        new Elem(elem).dispatch('validate', {}, {
          valid: !inputError,
          error: inputError || null
        });
      });

    function validatorWrap(input, index, errors) {
      try {
        if (input.validity && !input.validity.valid) {
          throw new Error(input.validationMessage);
        }

        input.dwayneData.validators.forEach((validator) => {
          validator(input.value, input, index);
        });
      } catch (err) {
        (errors.errors = errors.errors || {})[input.name] = err;
      }
    }

    if (errors.every((error) => isNull(error))) {
      return null;
    }

    return errors.$.errors;
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
  width(width) {
    return this.prop.apply(this, new Arr(arguments).unshift('width').$);
  }
}

defineProperties(Elem.prototype, {
  [Symbol.toStringTag]: 'Elem'
});

/**
 * @const {Elem} win
 * @type {Elem}
 * @public
 * @description Elem instance of window.
 */
export const win = new Elem(global);

/**
 * @const {Elem} doc
 * @type {Elem}
 * @public
 * @description Elem instance of document.
 */
export const doc = new Elem(nativeDocument);

/**
 * @const {Elem} html
 * @type {Elem}
 * @public
 * @description Elem instance of document.documentElement.
 */
export const html = new Elem(nativeDocument.documentElement);

/**
 * @const {Elem} body
 * @type {Elem}
 * @public
 * @description Elem instance of document.body.
 */
export const body = new Elem(nativeDocument.body);

/**
 * @const {Elem} head
 * @type {Elem}
 * @public
 * @description Elem instance of document.head.
 */
export const head = new Elem(nativeDocument.head);

dynamicDefineProperties(Elem.prototype, elements, (elem) => function () {
  return this.create.apply(this, new Arr(arguments).unshift(elem).$);
});

dynamicDefineProperties(Elem.prototype, canvasGetMethods, (method) => function () {
  const ctx = this.ctx();

  if (ctx) {
    return ctx[method].apply(ctx, arguments);
  }
});

dynamicDefineProperties(Elem.prototype, canvasRestMethods, (method) => function () {
  const ctx = this.ctx();

  if (ctx) {
    ctx[method].apply(ctx, arguments);
  }

  return this;
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
 * @function isWindow
 * @private
 * @param {*} value - Value to check if it's Window.
 * @returns {Boolean} If the value is Window.
 * @description Returns if the value is Window or not.
 */
function isWindow(value) {
  return toStringTag(value) === 'Window';
}

/**
 * @function isHTMLDocument
 * @private
 * @param {*} value - Value to check if it's HTMLDocument.
 * @returns {Boolean} If the value is HTMLDocument.
 * @description Returns if the value is HTMLDocument or not.
 */
function isHTMLDocument(value) {
  return toStringTag(value) === 'HTMLDocument';
}

/**
 * @function getElem
 * @private
 * @param {Elem} elem - Element to check.
 * @returns {Element} The argument or a fallback if needed.
 */
function getElem(elem) {
  return elem.$[0] || emptyDiv;
}

/**
 * @function getName
 * @private
 * @param {Element} [elem] - Element which name is needed to know.
 * @returns {String} Elements name
 */
function getName(elem) {
  return (elem && elem.tagName && elem.tagName.toLowerCase()) || '';
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
        validators: new Arr([])
      }
    });
  } else if (!windowsDwayneData.some(({ element }) => element === elem)) {
    windowsDwayneData.push({
      element: elem,
      listeners: {}
    });
  }
}

constructors[2].push({
  check: (elem) => (
    isElement(elem) ||
    isWindow(elem) ||
    isHTMLDocument(elem) ||
    /^(HTMLCollection|NodeList)$/.test(toStringTag(elem))
  ),
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
export function find(selector, base = nativeDocument) {
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
 * parseHTML('<div>123</div>'); // Elem
 */
export function parseHTML(html) {
  return doc
    .div()
    .html(html)
    .children();
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
export function px(size) {
  return Number(String(size).replace(/px$/, ''));
}

export default Elem;
