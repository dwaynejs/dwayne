import Str from '../String';

export default [
	{
		test: /^#(\(|"|'|`)/,
		regexp: /^#(\([\s\S]+\)|"[\s\S]+"|'[\s\S]+'|`[\s\S]+`)$/,
		match(wrap, string) {
			wrap.id(string.slice(2, -1));
		}
	},
	{
		regexp: /^#/,
		match(wrap, string) {
			wrap.id(string.slice(1));
		}
	},
	{
		regexp: /^\./,
		match(wrap, string) {
			wrap.addClasses(string.slice(1));
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
			wrap.ref(string.slice(2));
		}
	},
	{
		regexp: /^\-\./,
		match(wrap, string) {
			wrap.removeClasses(string.slice(2));
		}
	},
	{
		regexp: /^\-@/,
		match(wrap, string) {
			wrap.removeCss(string.slice(2));
		}
	},
	{
		regexp: /^\-/,
		match(wrap, string) {
			wrap.removeAttr(string.slice(1));
		}
	},
	{
		test: /^=>(\(|"|'|`)/,
		regexp: /^=>(\([\s\S]+\)|"[\s\S]+"|'[\s\S]+'|`[\s\S]+`)$/,
		match(wrap, string) {
			wrap.into(string.slice(3, -1));
		}
	},
	{
		regexp: /^=>\./,
		match(wrap, string) {
			wrap.moveClass(string.slice(3));
		}
	},
	{
		regexp: /^=>/,
		match(wrap, string) {
			wrap.moveAttr(string.slice(2));
		}
	},
	{
		regexp: /^~\./,
		match(wrap, string) {
			wrap.toggleClass(string.slice(2));
		}
	},
	{
		regexp: /^~/,
		match(wrap, string) {
			wrap.toggleAttr(string.slice(1));
		}
	},
	{
		test: /^\*/,
		regexp: /^\*[\s\S]+\*$/,
		match(wrap, string) {
			wrap.text(string.slice(1, -1));
		}
	},
	{
		test: /^\+\*/,
		regexp: /^\+\*[\s\S]+\*$/,
		match(wrap, string) {
			wrap.addText(string.slice(2, -1));
		}
	},
	{
		test: /^>(\(|"|'|`)/,
		regexp: /^>(\([\s\S]+\)|"[\s\S]+"|'[\s\S]+'|`[\s\S]+`)<$/,
		match(wrap, string) {
			wrap.html(string.slice(2, -2));
		}
	},
	{
		test: /^\+>(\(|"|'|`)/,
		regexp: /^\+>(\([\s\S]+\)|"[\s\S]+"|'[\s\S]+'|`[\s\S]+`)<$/,
		match(wrap, string) {
			wrap.addHtml(string.slice(3, -2));
		}
	},
	{
		regexp: /^\$/,
		match(wrap, string) {
			switch (string.slice(1)) {
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
			const match = string.match(/^[^:]+/)[0];
			const prop = new Str(match).toCamelCase().$;
			
			wrap.css(prop, string.slice(match.length + 2, -1));
		}
	},
	{
		regexp: /^[^:]+:[\s\S]+$/,
		match(wrap, string) {
			const match = string.match(/^[^:]+/)[0];
			const prop = new Str(match).toCamelCase().$;
			
			wrap.css(prop, string.slice(match.length + 1));
		}
	},
	{
		test: /^[^=]+=(\(|"|'|`)/,
		regexp: /^[^=]+=(\([\s\S]+\)|"[\s\S]+"|'[\s\S]+'|`[\s\S]+`)$/,
		match(wrap, string) {
			const attr = string.match(/^[^=]+/)[0];
			
			wrap.attr(attr, string.slice(attr.length + 2, -1));
		}
	},
	{
		regexp: /^[^=]+=[\s\S]+$/,
		match(wrap, string) {
			const attr = string.match(/^[^=]+/)[0];
			
			wrap.attr(attr, string.slice(attr.length + 1));
		}
	}
];
