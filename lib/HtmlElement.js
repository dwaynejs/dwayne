/**
 * @module Elem
 * @private
 * @mixin
 * @description Exports Elem class.
 */

import Super from './Super';
import Arr, { array } from './Array';
import Func from './Function';
import HtmlCollection from './HtmlCollection';
import Promise from './Promise';
import Str from './String';
import { switcher } from './Switcher';
import constructors from './constants/constructors';
import appliedRegExps from './constants/appliedRegExps';
import collectionMethods from './constants/collectionMethods';
import css from './constants/css';
import elements from './constants/elements';
import {
	isFunction, isNumber, isString, isInteger, isNull,
	assign, dynamicDefineProperties, defineProperties,
	validate, toStringTag, iterate, crossClassMethods, supportSymbol
} from './helpers';

const nativeDocument = global.document;

export class Elem extends Super {
  /**
   * @class Elem
   * @extends Super
   * @public
   * @param {Element} [elem = null] - An element to wrap.
   * @returns {Elem} Instance of Elem.
   * @description Wrap of an element.
   *
   * @example
   * const elem = new Elem(document.getElementById('id'));
   */
	constructor(elem = null) {
		super(elem);

		if (!isNull(elem) && !this.hasOwn('domcData')) {
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

    /**
     * @member {Element|null} Elem#$
     * @public
     * @description Initial element.
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
    if (this.$) {
      const list = this.$.classList;

      list.add.apply(list, arguments);
    }

		return this;
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
    if (this.$) {
      this.$.innerHTML += html;
    }

		return this;
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
    if (!this.$ || this.name !== 'style') {
      return this;
    }

    const { sheet } = this.$;
    const { length } = sheet.cssRules;

    sheet.insertRule(selector + ' {\n' + new Super(style).word((value, property) => {
      return `${ property }: ${ value };\n`;
    }) + '}', length);
    sheet.cssRules[length].domcData = { name };

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
    this.child(nativeDocument.createTextNode(text));

		return this;
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
    if (!this.$) {
      return this;
    }

    iterate(arguments, (string) => {
			if (!string) {
				return;
			}

			const split = String(string).split(/(\s+)/);
      const len = split.length;

			let applied;

			top: for (let k = 0; k < len; k++) {
				string = split[k];

				let cas;

				if (!applied) {
					if (/^\s+$/.test(string)) {
						continue;
					}

					for (let m = 0, l = appliedRegExps.length; m < l; m++) {
						cas = appliedRegExps[m];

						if (cas.test && cas.test.test(string)) {
							applied = { text: '', cas };
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

				const text = applied.text = applied.text + string;

				cas = applied.cas;

				if (cas.regexp.test(text)) {
					cas.match(this, text);
					applied = null;
				}
			}
		});

		return this;
	}

  /**
   * @method Elem#css
   * @public
   * @param {String|Object.<String, String>} [attr] - Name of the attribute to get or
   * an object of the format { [attrName]: value, ... } to set attributes.
   * @param {String} [value] - If the first argument is a string it should be a value to set for that attribute.
   * @returns {Super|String|Elem} If no arguments passed, D-Wrap of attributes of the element returned,
   * if 1 string argument is passed the value of the attribute returned otherwise returns this.
   * @description Method for getting and setting attributes.
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
   * elem.attr().$;                // { display: 'none', cursor: 'pointer' }
   */
  attr(attr, value) {
		const elem = this.$;

		if (!arguments.length) {
      return new Super(elem && elem.attributes).object((o, attr) => {
        o[attr.name] = attr.value;
      });
		}

		if (arguments.length <= 1 && isString(attr)) {
			return elem ? elem.getAttribute(attr) : undefined;
		}

    if (!elem) {
      return this;
    }

		if (arguments.length >= 2) {
			attr = { [attr]: value };
		}

    iterate(new Super(attr).$, (value, key) => {
      elem.setAttribute(key, value);
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
    if (this.$) {
      this.$.blur();
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
    return getComputedStyle(this.$, pseudo);
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
    if (!this.$ || this.name !== 'style') {
      return this;
    }

    const rule = this.$.domcData.rules.find((rule) => rule.domcData && rule.domcData.name === name);

    if (rule) {
      assign(rule.value.style, style);
    }

    return this;
  }

  /**
   * @method Elem#child
   * @public
   * @param {Number|String|Elem|Element} element - If the argument is a number the child of this index returned
   * otherwise an element to put into this element or a selector of it.
   * @returns {Elem} Returns inserted element.
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
      return htmlElement(this.$ ? this.$.childNodes[element] : null);
    }

		return htmlElement(toFind(element)).into(this);
	}

  /**
   * @method Elem#children
   * @public
   * @returns {HtmlCollection} D-Wrap of the element's children.
   * @description Method for getting element's children.
   *
   * @example
   * const children = elem.children();
   */
	children() {
		return new HtmlCollection(this.$ ? this.$.children : []);
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
		const elem = this.$;

		if (!arguments.length) {
			return new Arr(elem ? elem.className.split(' ') : []);
		}

    if (elem) {
      elem.className = cls;
    }

		return this;
	}

  /**
   * @method Elem#click
   * @returns {Elem} Returns this.
   * @description Synonym for
   * [HTMLElement#click]{@link https://developer.mozilla.org/en/docs/Web/API/HTMLElement/click}.
   */
	click() {
    if (this.$) {
      this.$.click();
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
		const elem = this.$;

		return htmlElement(elem.cloneNode(deep));
	}
	contains(element) {
		element = toFind(element);

		return this.$.contains(element);
	}
	create(type, strings) {
		const elem = this.$;
		const element = htmlElement(nativeDocument.createElement(type));

		if (elem !== nativeDocument) {
			element.into(this);
		}

		return element.apply.apply(element, Array.prototype.slice.call(arguments, 1));
	}

  /**
   * @method Elem#css
   * @public
   * @param {String|Object.<String, String>} [property] - Name of the property to get or
   * an object of the format { [property]: value, ... } to set styles.
   * @param {String} [value] - If the first argument is a string it should be a value to set for that property.
   * @returns {Super|String|Elem} If no arguments passed, D-Wrap of css styles of the element returned,
   * if 1 string argument is passed the value of the property returned otherwise returns this.
   * @description Method for getting and setting styles. Supports !important.
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

    iterate(key, (value, key) => {
      dataset[key] = value;
    });

    return this;
	}
  deleteRule(name) {
    const elem = this.$;
    const rule = elem.domcData.rules.find((rule) => rule.domcData && rule.domcData.name === name);

    if (rule) {
      elem.sheet.deleteRule(rule.key);
    }

    return this;
  }
	defaultValue(value) {
		const elem = this.$;

		if (arguments.length) {
			elem.defaultValue = value;
			return this;
		}

		return elem.defaultValue;
	}
	disabled(cond = true) {
		if (cond) {
			return this.attr('disabled', '');
		}

		return this.removeAttr('disabled');
	}
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
	draggable(cond = true) {
		this.$.draggable = Boolean(cond);

		return this;
	}
	editable(cond = true) {
		if (cond) {
			return this.attr('contentEditable', '');
		}

		return this.removeAttr('contentEditable');
	}
	find(selector) {
		return htmlElement(this.$.querySelector(selector));
	}
	findAll(selector) {
		return new HtmlCollection(this.$.querySelectorAll(selector));
	}
  // TODO: add #first(selector) and #first(selector, elementBool) syntax
	first(bool) {
		return htmlElement(bool ? this.$.firstElementChild : this.$.firstChild);
	}
	fixed() {
		this.$.style.position = 'fixed';

		return this;
	}
	focus() {
		this.$.focus();
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
		return this.$.hasAttribute(attr);
	}
	hasClass(css) {
		return this.$.classList.contains(css);
	}
	hide() {
		const elem = this.$;

		elem.domcData.previousDisplay = elem.style.display;
		elem.style.display = 'none';
		return this;
	}
	html(html) {
		const elem = this.$;

		if (arguments.length) {
			elem.innerHTML = html;
			return this;
		}

		return elem.innerHTML;
	}
	id(id) {
		const elem = this.$;

		if (arguments.length) {
			elem.id = id;
			return this;
		}

		return elem.id;
	}
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
  insertBefore(element) {
    element = toFind(element);

    element.parentNode.insertBefore(this.$, element);

    return this;
  }
	inline() {
		this.$.style.display = 'inline';

		return this;
	}
	inlineBlock() {
		this.$.style.display = 'inline-block';

		return this;
	}

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

    return elem.complete && (!elem.naturalWidth || elem.naturalHeight);
  }
	italic() {
		this.$.style.fontStyle = 'italic';

		return this;
	}
  // TODO: add #last(selector) and #last(selector, elementBool) syntax
	last(bool) {
		return htmlElement(bool ? this.$.lastElementChild : this.$.lastChild);
	}
	lineThrough() {
		this.$.style.textDecorationLine = 'line-through';

		return this;
	}
  load() {
    const elem = this.$;

    if (elem.complete) {
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
		return this.$.matches(selector);
	}
	moveAttr(attr, value = '') {
		const prev = attrs[attr];

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
	moveClass(cls) {
		const elem = this.$,
			prev = classes[cls];

		if (prev) {
			prev.classList.remove(cls);
		}

		elem.classList.add(cls);
		classes[cls] = elem;

		return this;
	}
	get name() {
		return (this.$.tagName || '').toLowerCase();
	}
  // TODO: add #next(selector) and #next(selector, elementBool) syntax
  next(bool) {
		return htmlElement(bool ? this.$.nextElementSibling : this.$.nextSibling);
	}
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
		return this.$.outerHTML;
	}
	overline() {
		this.$.style.textDecorationLine = 'overline';

		return this;
	}
	parent() {
		return htmlElement(this.$.parentNode);
	}
	parentTree() {
		const collection = [];
		let elem = this.$.parentNode;

		while (elem) {
			collection.push(elem);
			elem = elem.parentNode;
		}

		return new HtmlCollection(collection);
	}
	pointer() {
		this.$.style.cursor = 'pointer';

		return this;
	}
  // TODO: add #prev(selector) and #prev(selector, elementBool) syntax
	prev(bool) {
		return htmlElement(bool ? this.$.previousElementSibling : this.$.previousSibling);
	}
  // TODO: add #putBefore(): parent.putAfter(element, childNumber)
  // TODO: add #putBefore(): parent.putBefore(element, childNumber)
	ref(ref) {
		const attr = refSwitcher(this.name);

		if (arguments.length) {
			this.attr(attr, ref);

			return this;
		}

		return this.attr(attr);
	}
	relative() {
		this.$.style.position = 'relative';

		return this;
	}
	remove() {
    if (this.$) {
      this.$.remove();
    }

		return this;
	}
	removeAttr() {
    iterate(arguments, (attr) => {
      this.$.removeAttribute(attr);
    });

		return this;
	}
	removeClasses() {
		const list = this.$.classList;

		list.remove.apply(list, arguments);

		return this;
	}
  removeCSS() {
		const elem = this.$;

    iterate(arguments, (css) => {
      elem.style[css] = '';
    });

		return this;
	}
	replace(element) {
		const elem = this.$;

		element = toFind(element);
		elem.parentNode.replaceChild(elem, element);

		return this;
	}
	setOf(type, iterator, callback) {
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
    const { domcData } = elem;

		if (elem.style.display === 'none') {
			elem.style.display = domcData.previousDisplay;
      domcData.previousDisplay = '';
		}

		return this;
	}
	text(text) {
		const elem = this.$;

		if (arguments.length) {
      this.html('').child(nativeDocument.createTextNode(text));

			return this;
		}

		if (Object.getOwnPropertyDescriptor(Node.prototype, 'textContent')) {
			return elem.textContent;
		}

		return elem.innerText;
	}
	toggleAttr(attr, condition) {
		const elem = this.$,
			cond = arguments.length < 2 ? !elem.hasAttribute(attr) : condition;

		if (cond) {
			return this.attr(attr, '');
		}

		return this.removeAttr(attr);
	}
	toggleClass() {
		const list = this.$.classList;

		list.toggle.apply(list, arguments);

		return this;
	}
	type(type) {
		const elem = this.$;

		if (arguments.length) {
			elem.type = type;
			return this;
		}

		return elem.type;
	}
	underline() {
		this.$.style.textDecorationLine = 'underline';

		return this;
	}
	up(n = 1) {
		validate([n], [['intLike', '>=0']], 'Elem#up');

		n = Number(n);

		let elem = this.$;

		while (n--) {
			if (!elem) {
				return htmlElement(null);
			}

			elem = elem.parentNode;
		}

		return htmlElement(elem);
	}
	get valid() {
		const elem = this.$;

		return elem.validity ? elem.validity.valid : true;
	}
	value(value) {
		const elem = this.$;

		if (arguments.length) {
			elem.value = value;
			return this;
		}

		return elem.value;
	}
}

if (supportSymbol) {
  defineProperties(Symbol.prototype, {
    [Symbol.toStringTag]: 'Symbol'
  });
}

export const window = htmlElement(global);
export const document = htmlElement(nativeDocument);
export const body = htmlElement(nativeDocument.body);
export const head = htmlElement(nativeDocument.head);

crossClassMethods.toHtmlCollection = (collection) => {
  return new Arr(collection).map((elem) => htmlElement(elem)).$;
};

defineProperties(Elem.prototype, {
  closest: (() => {
    if (Element.prototype.closest) {
      return function closest(selector) {
        return htmlElement(this.$.closest(selector));
      };
    }

    return function closest(selector) {
      let elem = this.$;

      while (elem) {
        if (elem.matches(selector)) {
          return htmlElement(elem);
        }

        elem = elem.parentNode;
      }

      return htmlElement();
    };
  })()
});

defineProperties(HtmlCollection.prototype, {
  on() {
    const listeners = [];

    this.forEach((item) => {
      listeners.push(item.on.apply(item, arguments));
    });

    return function removeEventListeners() {
      iterate(listeners, (removeListener) => removeListener());
    };
  }
});

defineProperties(Str.prototype, {
  parseHTML() {
    return document
      .div()
      .html(this.$)
      .children();
  }
});

dynamicDefineProperties(Elem.prototype, css, (prop) => {
  return function (value) {
    if (arguments.length) {
      this.$.style[prop] = value;
      return this;
    }

    return this.$.style[prop];
  };
});

dynamicDefineProperties(Elem.prototype, elements, (elem) => {
  return function () {
    Array.prototype.unshift.call(arguments, elem);

    return this.create.apply(this, arguments);
  };
});

dynamicDefineProperties(HtmlCollection.prototype, new Arr(collectionMethods).keys().$, (prop) => {
  return function () {
    iterate(this.$, (elem) => {
      const item = htmlElement(elem);

      item[prop].apply(item, arguments);
    });
    
    return this;
  };
});

const classes = {};
const attrs = {};
const refSwitcher = switcher('strictEquals', 'href')
  .case(['img', 'script', 'iframe', 'audio', 'video'], 'src')
  .case(['form'], 'action');

function toFind(element) {
	element = new Super(element).$;

	if (isString(element)) {
		element = nativeDocument.querySelector(element);
	}

	return element;
}

/**
 * @function htmlElement
 * @private
 * @param {*} elem - Element to wrap.
 * @returns {Elem} New instance of Elem.
 */
function htmlElement(elem) {
  return elem ? D(elem) : new Elem(elem);
}

constructors[1].push({
	check: (elem) => /^(HTML\w*Element|Text|Window)$/.test(toStringTag(elem)),
	cls: Elem
});

export function find(selector, element = nativeDocument) {
  const found = new Super(element).$.querySelector(selector);

  return htmlElement(found);
}
export function findAll(selector, element = nativeDocument) {
  const found = new Super(element).$.querySelectorAll(selector);

  return new HtmlCollection(found);
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

  return Promise.all(promises).then((images) => new HtmlCollection(images));
}
// TODO: px()

export default Elem;
