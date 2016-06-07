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
	isFunction, isNumber, isString, isInteger,
	assign, dynamicDefineProperties, defineProperties,
	validate, toStringTag, iterate, crossClassMethods
} from './helpers';

const nativeDocument = global.document;

export class HtmlElement extends Super {
	constructor(elem = null) {
		super(elem);

    elem = this.$;

		if (elem && !elem.domcData) {
      elem.domcData = {};
      Object.defineProperty(elem, 'domcData', {
        value: {
          removeListeners: {}
        }
      });
		}
	}

	absolute() {
		this.$.style.position = 'absolute';

		return this;
	}
	addClasses() {
		const list = this.$.classList;

		list.add.apply(list, arguments);

		return this;
	}
	addHtml(html) {
		this.$.innerHTML += html;

		return this;
	}
	addText(text) {
		new HtmlElement(nativeDocument.createTextNode(text)).into(this);

		return this;
	}
	apply() {
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
	attr(attr, value) {
		const elem = this.$;

		if (!arguments.length) {
			const attrs = elem.attributes;
      const o = {};

      iterate(attrs, (attr) => {
        o[attr.name] = attr.value;
      });

			return new Super(o);
		}

		if (arguments.length <= 1 && isString(attr)) {
			return elem.getAttribute(attr);
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
	block() {
		this.$.style.display = 'block';

		return this;
	}
	blur() {
		this.$.blur();
		return this;
	}
	bold() {
		this.$.style.fontWeight = 'bold';

		return this;
	}
	centerText() {
		this.$.style.textAlign = 'center';

		return this;
	}
	child(element) {
    if (isInteger(element) && element >= 0) {
      return new HtmlElement(this.$.childNodes[element]);
    }

		return new HtmlElement(toFind(element)).into(this);
	}
	children() {
		return new HtmlCollection(this.$.childNodes);
	}
	class(cls) {
		const elem = this.$;

		if (!arguments.length) {
			return new Arr(elem.className.split(' '));
		}

		elem.className = cls;

		return this;
	}
	click() {
		this.$.click();
		return this;
	}
	get clientHeight() {
		return this.$.clientHeight;
	}
	get clientLeft() {
		return this.$.clientLeft;
	}
	get clientTop() {
		return this.$.clientTop;
	}
	get clientWidth() {
		return this.$.clientWidth;
	}
	clone() {
		const elem = this.$;

		return new this.constructor(elem.cloneNode(false));
	}
	contains(element) {
		element = toFind(element);

		return this.$.contains(element);
	}
	create(type, strings) {
		const elem = this.$;
		const element = new HtmlElement(nativeDocument.createElement(type));

		if (elem !== nativeDocument) {
			element.into(this);
		}

		return element.apply.apply(element, Array.prototype.slice.call(arguments, 1));
	}
	css(property, value) {
		const elem = this.$;

		if (!arguments.length) {
			const css = this.$.style.cssText.split(/; ?/);
			const o = {};

      iterate(css, (value) => {
        if (value) {
          property = value.split(/: /);

          o[new Str(property[0]).toCamelCase().$] = property[1];
        }
      });

			return new Super(o);
		}

		if (arguments.length <= 1 && isString(property)) {
			return elem.style[property];
		}

		if (arguments.length >= 2) {
			property = { [property]: value };
		}

		property = new Super(property).$;

		assign(elem.style, property);

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
	deepClone() {
		const elem = this.$;

		return new this.constructor(elem.cloneNode(true));
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
		return new HtmlElement(this.$.querySelector(selector));
	}
	findAll(selector) {
		return new HtmlCollection(this.$.querySelectorAll(selector));
	}
	first(bool) {
		return new HtmlElement(bool ? this.$.firstElementChild : this.$.firstChild);
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
      inputs = inputs.filter((input) => new HtmlElement(input).attr('name'));
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
	into(element) {
    toFind(element).appendChild(this.$);

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
	last(bool) {
		return new HtmlElement(bool ? this.$.lastElementChild : this.$.lastChild);
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
	next(bool) {
		return new HtmlElement(bool ? this.$.nextElementSibling : this.$.nextSibling);
	}
	get offsetHeight() {
		return this.$.offsetHeight;
	}
	get offsetLeft() {
		return this.$.offsetLeft;
	}
	get offsetTop() {
		return this.$.offsetTop;
	}
	get offsetWidth() {
		return this.$.offsetWidth;
	}
  off() {
    const { removeListeners } = this.$.domcData;
  
    iterate(arguments, (event) => {
      iterate(removeListeners[event], (removeListener) => removeListener());
    });
  
    return this;
  }
  on(event, listener) {
    const elem = this.$;

    if (arguments.length >= 2) {
      event = { [event]: listener };
    }

    const listeners = {};

    iterate(new Super(event).$, (listener, event) => {
      const newListener = new Func(listener).bindContext(this);
      listeners[event] = newListener;
      elem.addEventListener(event, newListener, false);
    });

    return function removeEventListeners() {
      iterate(listeners, (listener, event) => {
        elem.removeEventListener(event, listener, false);
      });
    };
  }
	get outerHTML() {
		return this.$.outerHTML;
	}
	get outerText() {
		return this.$.outerText;
	}
	overline() {
		this.$.style.textDecorationLine = 'overline';

		return this;
	}
	parent() {
		return new HtmlElement(this.$.parentNode);
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
	prev(bool) {
		return new HtmlElement(bool ? this.$.previousElementSibling : this.$.previousSibling);
	}
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
	removeCss() {
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
	get scrollHeight() {
		return this.$.scrollHeight;
	}
	get scrollLeft() {
		return this.$.scrollLeft;
	}
	get scrollTop() {
		return this.$.scrollTop;
	}
	get scrollWidth() {
		return this.$.scrollWidth;
	}
	setOf(type, iterator, applied) {
		iterator = new Super(iterator).$;

		if (isNumber(iterator)) {
			try {
				validate([null, iterator], { 1: ['intLike', '>=0'] }, 'HtmlElement#setOf');
			} catch (e) {
				throw new Error(`
					2nd argument must be either or non-negative integer, or object!
				`);
			}

			iterator = array(iterator);
		}

    validate({ 2: applied }, { 2: 'function' }, 'HtmlElement#setOf');

		const func = isFunction(applied);
    
    new Super(iterator).forEach((value, key) => {
      const created = this.create(type);
  
      if (func) {
        applied(created, value, key, iterator);
      } else {
        created.apply(applied.replace(/\{\$key}/g, key).replace(/\{\$value}/g, value));
      }
    });

    return this;
	}
	show() {
		const elem = this.$;

		if (elem.style.display === 'none') {
			elem.style.display = elem.domcData.previousDisplay || '';
		}

		delete elem.domcData.previousDisplay;

		return this;
	}
	text(text) {
		const elem = this.$;

		if (arguments.length) {
			elem.innerHTML = '';
			new HtmlElement(nativeDocument.createTextNode(text)).into(this);

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
		validate([n], [['intLike', '>=0']], 'HtmlElement#up');

		n = Number(n);

		let elem = this.$;

		while (n--) {
			if (!elem) {
				return new HtmlElement(null);
			}

			elem = elem.parentNode;
		}

		return new HtmlElement(elem);
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

export const window = new HtmlElement(global);
export const document = new HtmlElement(nativeDocument);
export const body = new HtmlElement(nativeDocument.body || null);
export const head = new HtmlElement(nativeDocument.head || null);

crossClassMethods.toHtmlCollection = (collection) => {
  return new Arr(collection).map((elem) => new HtmlElement(elem)).$;
};

defineProperties(HtmlElement.prototype, {
  closest: (() => {
    if (Element.prototype.closest) {
      return function closest(selector) {
        return new HtmlElement(this.$.closest(selector));
      };
    }

    return function closest(selector) {
      let elem = this.$;

      while (elem) {
        if (elem.matches(selector)) {
          return new HtmlElement(elem);
        }

        elem = elem.parentNode;
      }

      return new HtmlElement(null);
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

dynamicDefineProperties(HtmlElement.prototype, new Arr(css).keys().$, (prop) => {
  return function (value) {
    if (arguments.length) {
      this.$.style[prop] = value;
      return this;
    }

    return this.$.style[prop];
  };
});

dynamicDefineProperties(HtmlElement.prototype, new Arr(elements).keys().$, (elem) => {
  return function () {
    Array.prototype.unshift.call(arguments, elem);

    return this.create.apply(this, arguments);
  };
});

dynamicDefineProperties(HtmlCollection.prototype, new Arr(collectionMethods).keys().$, (prop) => {
  return function () {
    iterate(this.$, (elem) => {
      const item = new HtmlElement(elem);

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

constructors[1].push({
	check: (elem) => /^(HTML\w*Element|Text)$/.test(toStringTag(elem)),
	cls: HtmlElement
});

export function find(selector) {
  const found = nativeDocument.querySelector(selector);

  return new HtmlElement(found);
}
export function findAll(selector) {
  const found = nativeDocument.querySelectorAll(selector);

  return new HtmlCollection(found);
}
export function loadImages(images) {
  const promises = [];

  images = new Super(images).$;

  iterate(images, (image) => {
    image = new Super(image).$;

    if (!isString(image) && image.complete) {
      promises.push(new HtmlElement(image));

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

export default HtmlElement;
