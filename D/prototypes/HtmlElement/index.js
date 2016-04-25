import D from '../../';
import methods from '../../methods';
import css from './css';
import elements from './elements';
import childrenGenerator from './children';
import { default as parent, transform } from '../Object';
import Arr from '../Array';
import Num from '../Number';
import { assign, dynamicDefineProperties, defineProperties, validate } from '../../libs';

const Obj = parent;

const cls = class HtmlElement extends parent {
	constructor(elem) {
		super(elem);

		if (this.$) {
			this.$.domcData = {};
			//defineProperties(this.$, { domcData: {} });
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
		new HtmlElement(document.createTextNode(text)).into(this);

		return this;
	}
	apply() {
		for (let i = 0, length = arguments.length; i < length; i++) {
			if (!arguments[i]) {
				continue;
			}

			const split = String(arguments[i]).split(/(\s+)/),
				len = split.length;

			let applied;

			top: for (let k = 0; k < len; k++) {
				const string = split[k];

				let cas;

				if (!applied) {
					if (/^\s+$/.test(string)) {
						continue;
					}

					for (let m = 0, l = applyRegexps.length; m < l; m++) {
						cas = applyRegexps[m];

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
		}

		return this;
	}
	attr(attr, value) {
		const elem = this.$;

		if (!arguments.length) {
			const attrs = elem.attributes,
				length = attrs.length,
				o = {};

			for (let i = 0; i < length; i++) {
				attr = attrs[i];

				o[attr.name] = attr.value;
			}

			return new Obj(o);
		}

		if (arguments.length <= 1 && methods.isString(attr)) {
			return elem.getAttribute(attr);
		}

		if (arguments.length >= 2) {
			attr = { [attr]: value };
		}

		attr = transform(attr);

		for (const key in attr) {
			if (attr.hasOwnProperty(key)) {
				elem.setAttribute(key, attr[key]);
			}
		}

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
		return new HtmlElement(find(element)).into(this);
	}
	children() {
		return new D.HtmlCollection(this.$.childNodes);
	}
	['class'](cls) {
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
		element = find(element);

		return this.$.contains(element);
	}
	create(type, strings) {
		const elem = this.$,
			element = htmlElement(document.createElement(type));

		if (elem !== document) {
			element.into(this);
		}

		return element.apply.apply(element, Array.prototype.slice.call(arguments, 1));
	}
	css(property, value) {
		const elem = this.$;

		if (!arguments.length) {
			const css = this.$.style.cssText.split(/; ?/),
				length = css.length,
				o = {};

			for (let i = 0; i < length; i++) {
				if (!css[i]) {
					continue;
				}

				property = css[i].split(/: /);

				o[new D.String(property[0]).toCamelCase()] = property[1];
			}

			return new Obj(o);
		}

		if (arguments.length <= 1 && methods.isString(property)) {
			return elem.style[property];
		}

		if (arguments.length >= 2) {
			property = { [property]: value };
		}

		property = transform(property);

		assign(elem.style, property);

		return this;
	}
	dataset() {
		return new Obj(this.$.dataset);
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
		return new D.HtmlCollection(this.$.querySelectorAll(selector));
	}
	firstChild() {
		return htmlElement(this.$.firstElementChild);
	}
	fixed() {
		this.$.style.position = 'fixed';

		return this;
	}
	focus() {
		this.$.focus();
		return this;
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
	// TODO: .insertAfter()
	// TODO: .insertBefore()
	inline() {
		this.$.style.display = 'inline';

		return this;
	}
	inlineBlock() {
		this.$.style.display = 'inline-block';

		return this;
	}
	into(element) {
		find(element).appendChild(this.$);

		return this;
	}
	italic() {
		this.$.style.fontStyle = 'italic';

		return this;
	}
	lastChild() {
		return htmlElement(this.$.lastElementChild);
	}
	lineThrough() {
		this.$.style.textDecorationLine = 'line-through';

		return this;
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
	next() {
		return htmlElement(this.$.nextElementSibling);
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
	get outerHtml() {
		return this.$.outerHTML;
	}
	overline() {
		this.$.style.textDecorationLine = 'overline';

		return this;
	}
	parent() {
		return htmlElement(this.$.parentElement);
	}
	parentTree() {
		const collection = [];
		let elem = this.$.parentElement;

		while (elem) {
			collection.push(elem);
			elem = elem.parentElement;
		}

		return new D.HtmlCollection(collection);
	}
	pointer() {
		this.$.style.cursor = 'pointer';

		return this;
	}
	prev() {
		return htmlElement(this.$.previousElementSibling);
	}
	// TODO: .putAfter()
	// TODO: .putBefore()
	ref(ref) {
		let attr;

		switch (this.name) {
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
		this.$.remove();

		return this;
	}
	removeAttr() {
		for (let i = 0, length = arguments.length; i < length; i++) {
			this.$.removeAttribute(arguments[i]);
		}

		return this;
	}
	removeClasses() {
		const list = this.$.classList;

		list.remove.apply(list, arguments);

		return this;
	}
	removeCss() {
		const elem = this.$,
			length = arguments.length;

		for (let i = 0; i < length; i++) {
			elem.style[arguments[i]] = '';
		}

		return this;
	}
	replace(element) {
		const elem = this.$;

		element = find(transform(element));
		elem.parentElement.replaceChild(elem, element);

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
	setOf(type, iterator, applied, mapFn) {
		iterator = transform(iterator);

		if (methods.isNumber(iterator)) {
			try {
				validate([null, iterator], { 1: ['int', '>=0'] });
			} catch (e) {
				throw new Error(`
					2nd argument must be either or non-negative integer, or object!
				`);
			}

			iterator = new Num(iterator).array();
		}

		if (arguments.length < 3) {
			throw new Error('No applied expression or map function is present!');
		}

		if (arguments.length < 4 && methods.isFunction(applied)) {
			mapFn = applied;
			applied = '';
		}

		const elem = this.$;

		for (const key in iterator) {
			if (iterator.hasOwnProperty(key)) {
				const value = iterator[key],
					created = elem.new(type, applied.replace(/%key%/g, key).replace(/%value%/g, value)),
					array = methods.isArrayAlike(iterator);

				if (mapFn) {
					mapFn(created, value, array ? Number(key) : key, iterator);
				}
			}
		}
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
			new HtmlElement(document.createTextNode(text)).into(this);

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
	toggleAttrNS(ns, attr, condition) {
		const elem = this.$,
			cond = arguments.length < 2 ? elem.hasAttributeNS(ns, attr) : condition;

		if (cond) {
			elem.setAttributeNS(ns, attr, '');
		} else {
			elem.removeAttributeNS(ns, attr);
		}

		return this;
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
		validate([n], [['intAlike', '>=0']]);

		n = Number(n);

		let elem = this.$;

		while (n--) {
			if (!elem) {
				return htmlElement(null);
			}

			elem = elem.parentElement;
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
};

dynamicDefineProperties(cls.prototype, css, (prop) => {
	return function (value) {
		if (arguments.length) {
			this.$.style[prop] = value;
			return this;
		}

		return this.$.style[prop];
	};
});

dynamicDefineProperties(cls.prototype, elements.filter((elem) => elem !== 'html'), (elem) => {
	return function () {
		Array.prototype.unshift.call(arguments, elem);

		return this.create.apply(this, arguments);
	};
});

defineProperties(cls.prototype, {
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

				elem = elem.parentElement;
			}

			return htmlElement(null);
		};
	})()
});

const children = childrenGenerator(cls),
	classes = {},
	attrs = {},
	applyRegexps = [
		{
			test: /^#(\(|"|'|`)/,
			regexp: /^#(\([\s\S]+\)|"[\s\S]+"|'[\s\S]+'|`[\s\S]+`)$/,
			match(wrap, string) {
				wrap.id(String(string).substring(2, string.length - 1));
			}
		},
		{
			regexp: /^#/,
			match(wrap, string) {
				wrap.id(String(string).substring(1));
			}
		},
		{
			regexp: /^\./,
			match(wrap, string) {
				wrap.addClasses(String(string).substring(1));
			}
		},
		{
			regexp: /^<\-\-$/,
			match(wrap) {
				wrap.float('left');
			}
		},
		{
			regexp: /^\-\->$/,
			match(wrap) {
				wrap.float('right');
			}
		},
		{
			regexp: /^\->/,
			match(wrap, string) {
				wrap.ref(String(string).substring(2));
			}
		},
		{
			regexp: /^\-\./,
			match(wrap, string) {
				wrap.removeClasses(String(string).substring(2));
			}
		},
		{
			regexp: /^\-@/,
			match(wrap, string) {
				wrap.removeCss(String(string).substring(2));
			}
		},
		{
			regexp: /^\-/,
			match(wrap, string) {
				wrap.removeAttr(String(string).substring(1));
			}
		},
		{
			test: /^=>(\(|"|'|`)/,
			regexp: /^=>(\([\s\S]+\)|"[\s\S]+"|'[\s\S]+'|`[\s\S]+`)$/,
			match(wrap, string) {
				wrap.into(String(string).substring(3, string.length - 1));
			}
		},
		{
			regexp: /^=>\./,
			match(wrap, string) {
				wrap.moveClass(String(string).substring(3));
			}
		},
		{
			regexp: /^=>/,
			match(wrap, string) {
				wrap.moveAttr(String(string).substring(2));
			}
		},
		{
			regexp: /^~\./,
			match(wrap, string) {
				wrap.toggleClass(String(string).substring(2));
			}
		},
		{
			regexp: /^~/,
			match(wrap, string) {
				wrap.toggleAttr(String(string).substring(1));
			}
		},
		{
			test: /^\*/,
			regexp: /^\*[\s\S]+\*$/,
			match(wrap, string) {
				wrap.text(String(string).substring(1, string.length - 1));
			}
		},
		{
			test: /^\+\*/,
			regexp: /^\+\*[\s\S]+\*$/,
			match(wrap, string) {
				wrap.addText(String(string).substring(2, string.length - 1));
			}
		},
		{
			test: /^>(\(|"|'|`)/,
			regexp: /^>(\([\s\S]+\)|"[\s\S]+"|'[\s\S]+'|`[\s\S]+`)<$/,
			match(wrap, string) {
				wrap.html(String(string).substring(2, string.length - 2));
			}
		},
		{
			test: /^\+>(\(|"|'|`)/,
			regexp: /^\+>(\([\s\S]+\)|"[\s\S]+"|'[\s\S]+'|`[\s\S]+`)<$/,
			match(wrap, string) {
				wrap.addHtml(String(string).substring(3, string.length - 2));
			}
		},
		{
			regexp: /^\$/,
			match(wrap, string) {
				switch (String(string).substring(1)) {
					case 'a':
						return wrap.absolute();
					case 'b':
						return wrap.bold();
					case 'c':
						return wrap.centerText();
					case 'f':
						return wrap.fixed();
					case 'h':
						return wrap.hide();
					case 'i':
						return wrap.italic();
					case 'r':
						return wrap.relative();
					case 's':
						return wrap.show();
					case 't':
						return wrap.opacity(0);
					case 'u':
						return wrap.underline();
				}
			}
		},
		{
			test: /^[^:]+:(\(|"|'|`)/,
			regexp: /^[^:]+:(\([\s\S]+\)|"[\s\S]+"|'[\s\S]+'|`[\s\S]+`)$/,
			match(wrap, string) {
				const match = string.match(/^[^:]+/)[0],
					prop = new D.String(match).toCamelCase().$;

				wrap.css(prop, String(string).substring(match.length + 2, string.length - 1));
			}
		},
		{
			regexp: /^[^:]+:[\s\S]+$/,
			match(wrap, string) {
				const match = string.match(/^[^:]+/)[0],
					prop = new D.String(match).toCamelCase().$;

				wrap.css(prop, String(string).substring(match.length + 1));
			}
		},
		{
			test: /^[^=]+=(\(|"|'|`)/,
			regexp: /^[^=]+=(\([\s\S]+\)|"[\s\S]+"|'[\s\S]+'|`[\s\S]+`)$/,
			match(wrap, string) {
				const attr = string.match(/^[^=]+/)[0];

				wrap.attr(attr, String(string).substring(attr.length + 2, string.length - 1));
			}
		},
		{
			regexp: /^[^=]+=[\s\S]+$/,
			match(wrap, string) {
				const attr = string.match(/^[^=]+/)[0];

				wrap.attr(attr, String(string).substring(attr.length + 1));
			}
		}
	];

let elementToCheck;

for (const name in children) {
	if (children.hasOwnProperty(name)) {
		D[`Html${ name[0].toUpperCase() + name.substring(1) }Element`] = children[name];
	}
}

function htmlElement(elem) {
	if (!elem) {
		return new children.null(elem);
	}

	const constructor = children[String(elem.tagName || '').toLowerCase()] || cls;

	return new constructor(elem);
}

function find(element) {
	element = transform(element);

	if (methods.isString(element)) {
		element = document.querySelector(element);
	}

	return element;
}

D.HtmlElement = cls;
D.constructors.unshift({
	check: (elem) => {
		if (!(elem instanceof HTMLElement)) {
			return false;
		}

		elementToCheck = elem;

		return true;
	},
	get cls() {
		return children[String(elementToCheck.tagName || '').toLowerCase()] || cls;
	}
});

export default cls;