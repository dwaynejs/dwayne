/**
 * @module Elem
 * @private
 * @mixin
 * @description Exports Elem class.
 */

import Super from './Super';
import Arr, { array } from './Array';
import Func from './Function';
import Promise from './Promise';
import Str from './String';
import { switcher } from './Switcher';
import constructors from './constants/constructors';
import appliedRegExps from './constants/appliedRegExps';
import css from './constants/css';
import elements from './constants/elements';
import {
	isFunction, isNumber, isString, isInteger,
	assign, dynamicDefineProperties, defineProperties, toArray,
	validate, toStringTag, iterate, crossClassMethods, supportSymbol
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

export class Elem extends Arr {
  /**
   * @class Elem
   * @extends Super
   * @public
   * @param {Element|Element[]} [elem = []] - An element to wrap.
   * @returns {Elem} Instance of Elem.
   * @description Wrap of an element.
   *
   * @example
   * const elem = new Elem(document.getElementById('id'));
   */
	constructor(elem = []) {
		super((() => {
      elem = new Super(elem).$;

      if (!elem) {
        elem = [];
      } else if (isHTMLElement(elem)) {
        elem = [elem];
      }

      return toArray(elem, true);
    })());
    
    this.forEach((elem) => {
      if (!elem.hasOwnProperty('domcData')) {
        /**
         * @member Node#domcData
         * @protected
         * @property {String} previousDisplay - Parameter used for hiding/showing elements.
         * @property {Object.<String, Super>} removeListeners - Parameter used for remove event listeners.
         * @property {Super|undefined} rules - Parameter used for css styles.
         * @description D data.
         */
        super.value('domcData', {
          previousDisplay: '',
          removeListeners: {},
          rules: this.name === 'style' && new Super(this.prop('sheet').cssRules)
        });
      }
    });

    /**
     * @member {Element[]} Elem#$
     * @public
     * @description Initial element set.
     */
	}

  /**
   * @method Elem#absolute
   * @public
   * @returns {Elem} Returns this.
   * @description Shorthand for elem.position('absolute');
   */
	absolute() {
		return this.position('absolute');
	}

  /**
   * @method Elem#addClasses
   * @public
   * @param {...String} classes - Classes to add.
   * @returns {Elem} Returns this.
   * @description Method for adding classes.
   *
   * @example
   * elem.addClasses('red', 'round');
   */
	addClasses(...classes) {
    return this.forEach((elem) => {
      const list = elem.classList;

      list.add.apply(list, arguments);
    });
	}

  /**
   * @method Elem#addHTML
   * @public
   * @param {String} html - HTML to add.
   * @returns {Elem} Returns this.
   * @description Method for adding HTML.
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
   * @description Method for adding css styles into a style tag.
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
          selector + ' {\n' + new Super(style).word((value, property) => `${ property }: ${ value };\n`) + '}',
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
   * @description Method for adding text.
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
   * For values with a space within it use synonymous (), "", '' or ``.
   *
   * @example
   * elem.apply(
   *   '#id .c1 .c2 display:none border:"1ps solid black" disabled attr=`long value`'
   * );
   * // shorthand for
   * // elem
   * //   .id('id')
   * //   .addClasses('c1', 'c2')
   * //   .display('none')
   * //   .border('1px solid black')
   * //   .disabled()
   * //   .attr('attr', 'long value');
   * // There is a full list of possible types of syntax below...
   *
   * elem.apply('#id');                  // shorthand for elem.id('id');
   * elem.apply('#(long id)');           // shorthand for elem.id('long id');
   * elem.apply('.c1 .c2');              // shorthand for elem.addClasses('c1', 'c2');
   * elem.apply('<--');                  // shorthand for elem.float('left');
   * elem.apply('-->');                  // shorthand for elem.float('right');
   * elem.apply('->/login');             // shorthand for elem.ref('/login');
   * elem.apply('->(/link with space)'); // shorthand for elem.ref('/link with space');
   * elem.apply('-.c1 -.c2');            // shorthand for elem.removeClasses('c1', 'c2');
   * elem.apply('-@float -@display');    // shorthand for elem.removeCSS('float', 'display');
   * elem.apply('-a1 -a2');              // shorthand for elem.removeAttr('a1', 'a2');
   * elem.apply('=>"div.c1 .c2"');       // shorthand for elem.into('div.c1 .c2');
   * elem.apply('=>.c1');                // shorthand for elem.moveClass('.c1');
   * elem.apply('=>attr');               // shorthand for elem.moveAttr('attr');
   * elem.apply('~.c1');                 // shorthand for elem.toggleClass('c1');
   * elem.apply('~attr');                // shorthand for elem.toggleAttr('attr');
   * elem.apply('~attr');                // shorthand for elem.toggleAttr('attr');
   * elem.apply('*set text*');           // shorthand for elem.text('set text');
   * elem.apply('+*add text*');          // shorthand for elem.addText('add text');
   * elem.apply('>(<div>1</div>)<');     // shorthand for elem.html('<div>1</div>');
   * elem.apply('+>(<div>1</div>)<');    // shorthand for elem.addHTML('<div>1</div>');
   * elem.apply('a');                    // shorthand for elem.absolute();
   * elem.apply('b');                    // shorthand for elem.bold();
   * elem.apply('c');                    // shorthand for elem.centerText();
   * elem.apply('f');                    // shorthand for elem.fixed();
   * elem.apply('h');                    // shorthand for elem.hide();
   * elem.apply('i');                    // shorthand for elem.italic();
   * elem.apply('r');                    // shorthand for elem.relative();
   * elem.apply('s');                    // shorthand for elem.show();
   * elem.apply('t');                    // shorthand for elem.opacity(0);
   * elem.apply('u');                    // shorthand for elem.underline();
   * elem.apply('float:right');          // shorthand for elem.css('float', 'right');
   * elem.apply('margin:"2px 2px"');     // shorthand for elem.css('margin', '2px 2px');
   * elem.apply('attr=value');           // shorthand for elem.attr('attr', 'value');
   * elem.apply('attr=value');           // shorthand for elem.attr('attr', 'value');
   * elem.apply('attr');                 // shorthand for elem.attr('attr', '');
   */
	apply(...strings) {
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
        applied.text += string;
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
   * @param {String|ElemValueCallback} [value] - If the first argument is a string it should be a value to set for that attribute.
   * @returns {Super|String|Elem} If no arguments passed, D-Wrap of attributes of the element returned,
   * if 1 string argument is passed the value of the attribute returned otherwise returns this.
   * @description Method for getting/setting attributes.
   *
   * @example
   * const elem = new Elem(document.createElement('div'));
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
    const elem = getElem(this.$[0]);

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
      this.forEach((elem) => {
        elem.setAttribute(key, !isFunction(value) ? value : value(elem.getAttribute(key), key, elem));
      });
    });
    
    crossClassMethods.transformAnchor(this);

		return this;
	}

  /**
   * @method Elem#block
   * @public
   * @returns {Elem} Returns this.
   * @description Shorthand for elem.display('block');
   */
	block() {
    return this.display('block');
	}

  /**
   * @method Elem#blur
   * @returns {Elem} Returns this.
   * @description Synonym for
   * [HTMLElement#blur]{@link https://developer.mozilla.org/en/docs/Web/API/HTMLElement/blur}.
   */
	blur() {
    const elem = this.$[0];

    if (elem) {
      elem.blur();
    }

		return this;
	}

  /**
   * @method Elem#bold
   * @public
   * @returns {Elem} Returns this.
   * @description Shorthand for elem.fontWeight('bold');
   */
	bold() {
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
   */
  calcCSS(pseudo = null) {
    const elem = this.$[0];

    return elem && getComputedStyle(elem, pseudo);
  }

  /**
   * @method Elem#centerText
   * @public
   * @returns {Elem} Returns this.
   * @description Shorthand for elem.textAlign('center');
   */
  centerText() {
    return this.textAlign('center');
	}

  /**
   * @method Elem#changeRule
   * @public
   * @param {String} name - Name of the rule.
   * @param {Object.<String, String>} style - Style for the selector.
   * @returns {Elem} Returns this.
   * @description Method for changing css styles in a style tag.
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
        }

        return true;
      }
    });

    return this;
  }

  /**
   * @method Elem#child
   * @public
   * @param {Number|String|Elem|Element} element - If the argument is a number a wrap of the child
   * of this index returned otherwise an element to put into this element or a selector of it.
   * @returns {Elem} Returns a wrap of inserted elements.
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
      return htmlElement(getElem(this.$[0]).children[element]);
    }

		return toFind(element).into(this);
	}

  /**
   * @method Elem#children
   * @public
   * @returns {Elem} D-Wrap of the element's children.
   * @description Method for getting element's children.
   *
   * @example
   * const children = elem.children();
   */
	children() {
		return new Elem(getElem(this.$[0]).children);
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
	class(cls) {
		if (!arguments.length) {
			return new Arr(getElem(this.$[0]).className.split(' '));
		}

		return this.forEach((elem) => {
      elem.className = cls;
    });
	}

  /**
   * @method Elem#click
   * @returns {Elem} Returns this.
   * @description Synonym for
   * [HTMLElement#click]{@link https://developer.mozilla.org/en/docs/Web/API/HTMLElement/click}.
   */
	click() {
    const elem = this.$[0];

    if (elem) {
      elem.click();
    }

    return this;
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
	clone(deep) {
		return this.map((elem) => {
      return elem.cloneNode(deep);
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
  closest(selector) {
    if (element.propertyDescriptor('closest')) {
      return this.object((array, elem) => {
        const closest = elem.closest(selector);

        if (closest) {
          array.push(closest);
        }
      }, new Elem());
    }

    return this.object((array, elem) => {
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
	contains(element) {
		element = toFind(element);

    return getElem(this.$[0]).contains(getElem(element.$[0]));
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
   */
	create(type, ...appliedExpressions) {
		const elem = this.$;
		const element = htmlElement(nativeDocument.createElement(type));

		if (elem && elem !== nativeDocument) {
			element.into(this);
		}

		return element.apply.apply(element, new Arr(arguments).slice(1).$);
	}

  /**
   * @method Elem#css
   * @public
   * @param {String|Object.<String, String>} [property] - Name of the property to get or
   * an object of the format { [property]: value, ... } to set styles.
   * @param {String} [value] - If the first argument is a string it should be a value to set for that property.
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
   */
	css(property, value) {
		const elem = this.$;

		if (!arguments.length) {
      return new Str(this.$.style.cssText)
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
      if (/\!important$/.test(value)) {
        elem.style.setProperty(property.replace(/\!important$/, ''), value, 'important');

        return;
      }

      elem.style[property] = value;
    });

		return this;
	}

  /**
   * @method Elem#data
   * @public
   * @param {String|Object.<String, String>} [key] - Name of the data attribute (without data- prefix) to get or
   * an object of the format { [attrName]: value, ... } to set attributes.
   * @param {String} [value] - If the first argument is a string it should be a value to set for that attribute.
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
    const dataset = this.$.dataset;

    if (!arguments.length) {
      return new Super(dataset);
    }

    if (arguments.length === 1 && isString(key)) {
      return dataset[key];
    }

    if (arguments.length >= 2) {
      key = { [key]: value };
    }

    assign(dataset, key);

    return this;
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
    if (!this.$ || this.name !== 'style') {
      return this;
    }

    const elem = this.$;
    const rule = elem.domcData.rules.find((rule) => rule.domcData && rule.domcData.name === name);

    if (rule) {
      elem.sheet.deleteRule(rule.key);
    }

    return this;
  }

  /**
   * @method Elem#defaultValue
   * @public
   * @param {*} [value] - If it's present it's used for default value of the element.
   * @returns {Elem|*} If the argument is present this returned otherwise element default value.
   * @description Method for getting/setting default value.
   *
   * @example
   * elem.defaultValue('default');
   * elem.defaultValue(); // 'default'
   */
	defaultValue(value) {
    return this.prop.apply(this, new Arr(arguments).unshift('defaultValue').$);
	}
	disabled(condition = true) {
    return this.toggleAttr('disabled', condition);
	}

  // TODO: add null check
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

    this.$.dispatchEvent(event);

    return this;
  }
	draggable(condition = true) {
    return this.prop('draggable', !!condition);
	}
	editable(condition = true) {
    return this.toggleAttr('contentEditable', condition);
	}
	find(selector) {
		return find(selector, this.$);
	}

  // TODO: add #first(selector) and #first(selector, elementBool) syntax
  // TODO: add null check
	first(bool) {
		return htmlElement(bool ? this.$.firstElementChild : this.$.firstChild);
	}
	fixed() {
    return this.position('fixed');
	}
	focus() {
    if (this.$) {
      this.$.focus();
    }

		return this;
	}
  getFormData(filter = true) {
    let inputs = this.findAll('input');

    if (filter) {
      inputs = inputs.filter((input) => htmlElement(input).attr('name'));
    }

    return inputs.map((input) => input.value);
  }
	hasAttr(attr) {
		return this.$ ? this.$.hasAttribute(attr) : false;
	}
	hasClass(cls) {
		return this.$ ? this.$.classList.contains(cls) : false;
	}
	hide() {
		const elem = this.$;

    if (elem) {
      elem.domcData.previousDisplay = elem.style.display;
    }

		return this.display('none !important');
	}
	html(html) {
    return this.prop.apply(this, new Arr(arguments).unshift('innerHTML').$) || '';
	}
	id(id) {
    return this.prop.apply(this, new Arr(arguments).unshift('id').$);
	}

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
  }

  // TODO: add null check
  insertBefore(element) {
    element = toFind(element);

    element.parentNode.insertBefore(this.$, element);

    return this;
  }
	inline() {
    return this.display('inline');
	}
	inlineBlock() {
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
	into(element) {
    element = toFind(element);

    if (element && this.$) {
      element.appendChild(this.$);
    }

		return this;
	}
  isBroken() {
    const elem = this.$;

    return elem ? elem.complete && (!elem.naturalWidth || elem.naturalHeight) : false;
  }
	italic() {
    return this.fontStyle('italic');
	}

  // TODO: add #last(selector) and #last(selector, elementBool) syntax
  // TODO: add null check
	last(bool) {
		return htmlElement(bool ? this.$.lastElementChild : this.$.lastChild);
	}
	lineThrough() {
    return this.textDecorationLine('line-through');
	}
  load() {
    const elem = this.$;

    if (!elem || elem.complete) {
      return !this.isBroken() ? Promise.resolve(this) : Promise.reject(this);
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
  }
  // TODO: #matches() -> #is()
	matches(selector) {
		return this.$ ? this.$.matches(selector) : false;
	}
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
	}
	moveClass(cls) {
    const prev = classes[cls];

		if (prev && this.$) {
      prev.removeClasses(cls);
		}

    if (this.$) {
      classes[cls] = this;
    }

		return this.addClasses(cls);
	}
	get name() {
		return this.$ && this.$.tagName ? this.$.tagName.toLowerCase() : undefined;
	}

  // TODO: add #next(selector) and #next(selector, elementBool) syntax
  // TODO: add null check
  next(bool) {
		return htmlElement(bool ? this.$.nextElementSibling : this.$.nextSibling);
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
  }

	get outerHTML() {
		return this.$ ? this.$.outerHTML || '' : '';
	}

  // TODO: outerWidth/outerHeight

	overline() {
    return this.textDecorationLine('overline');
	}
	parent() {
		return htmlElement(this.$ ? this.$.parentNode : null);
	}
	parentTree() {
		const collection = [];
		let elem = this.parent();

		while (elem.$) {
			collection.push(elem);
			elem = elem.parent();
		}

		return new Elems(collection);
	}
	pointer() {
    return this.cursor('pointer');
	}

  // TODO: add #prev(selector) and #prev(selector, elementBool) syntax
  // TODO: add null check
	prev(bool) {
		return htmlElement(bool ? this.$.previousElementSibling : this.$.previousSibling);
	}
  // TODO: add #putBefore(): parent.putAfter(element, childNumber)
  // TODO: add #putBefore(): parent.putBefore(element, childNumber)
	ref(reference) {
    return this.attr.apply(this, new Arr(arguments).unshift(refSwitcher(this.name)).$);
	}
	relative() {
    return this.position('relative');
	}
	remove() {
    if (this.$) {
      this.$.remove();
    }

		return this;
	}
	removeAttr() {
    const elem = this.$;

    iterate(elem && arguments, (attr) => {
      elem.removeAttribute(attr);
    });

		return this;
	}
	removeClasses() {
    if (!this.$) {
      return this;
    }

		const list = this.$.classList;

		list.remove.apply(list, arguments);

		return this;
	}
  removeCSS() {
    iterate(arguments, (css) => {
      this.css(css, '');
    });

		return this;
	}

  // TODO: add null check
	replace(element) {
		const elem = this.$;

		element = toFind(element);
		elem.parentNode.replaceChild(elem, element);

		return this;
	}
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
	}
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
	text(text) {
    return arguments.length
      ? this.html('').addText(text)
      : this.prop(node.propertyDescriptor('textContent') ? 'textContent' : 'innerText');
	}
	toggleAttr(attr, condition) {
    return (arguments.length < 2 ? !this.hasAttr(attr) : condition)
      ? this.attr(attr, '')
      : this.removeAttr(attr);
	}
	toggleClass(cls, condition) {
    return (arguments.length < 2 ? !this.hasClass(cls) : condition)
      ? this.addClasses(cls)
      : this.removeClasses(cls);
	}
	type(type) {
    return this.prop.apply(this, new Arr(arguments).unshift('type').$);
	}
	underline() {
    return this.textDecorationLine('underline');
	}
	up(n = 1) {
		validate([n], [['intLike', '>=0']], 'Elem#up');

		n = Number(n);

		let elem = this.$;

		while (n-- && elem) {
			elem = elem.parentNode;
		}

		return htmlElement(elem);
	}
	get valid() {
		const elem = this.$;

		return elem && elem.validity ? elem.validity.valid : true;
	}
	value(value) {
    return this.prop.apply(this, new Arr(arguments).unshift('value').$);
	}
}

if (supportSymbol) {
  defineProperties(Symbol.prototype, {
    [Symbol.toStringTag]: 'Symbol'
  });
}

export class Elems extends Arr {
  constructor(collection = []) {
    super(collection);

    this.forEach((elem, key, collection) => {
      collection[key] = htmlElement(elem);
    });
  }

  // TODO: push(), every(), some()
  // TODO: gt(), lt()
  // TODO: add most of Elem#
  elem(index) {
    return htmlElement(this.prop(index));
  }

  filter(callback) {
    return super.filter(isFunction(callback) ? callback : (elem) => elem.matches(callback));
  }

  map(callback) {
    validate([callback], ['function'], 'Elems#map');

    const object = this.$;
    const o = [];

    let elements = true;

    iterate(object, (value, key) => {
      const elem = callback(value, key, object);

      elements = elements && /^(HTML\w*Element)$/.test(toStringTag(new Super(elem).$));

      o.push(elem);
    });

    return elements ? new Elems(o) : D(o);
  }

  on() {
    const listeners = [];

    this.forEach((item) => {
      listeners.push(item.on.apply(item, arguments));
    });

    return function removeEventListeners() {
      iterate(listeners, (removeListener) => removeListener());
    };
  }
}

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

const node = htmlElement(Node.prototype);
const element = htmlElement(Element.prototype);
const classes = {};
const attrs = {};
const refSwitcher = switcher('strictEquals', 'href')
  .case(['img', 'script', 'iframe', 'audio', 'video'], 'src')
  .case(['form'], 'action');

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
 * @param {Element} elem - Element to check.
 * @returns {Element} The argument or a fallback if neede.
 */
function getElem(elem) {
  return elem && empty;
}

function isHTMLElement(elem) {
  /^HTML\w*Element$/.test(toStringTag(elem));
}

constructors[1].push({
	check: (elem) => isHTMLElement(elem) || /^(HTMLCollection|NodeList)$/.test(toStringTag(elem)),
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

  return Promise.all(promises).then((images) => new Elems(images));
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
