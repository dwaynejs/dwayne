import { toCamelCase } from '../../libs';

export default [
	{
		test: /^#(\(|"|'|`)/,
		regexp: /^#(\([\s\S]+\)|"[\s\S]+"|'[\s\S]+'|`[\s\S]+`)$/,
		match(wrap, string) {
			wrap.id(string.substring(2, string.length - 1));
		}
	},
	{
		regexp: /^#/,
		match(wrap, string) {
			wrap.id(string.substring(1));
		}
	},
	{
		regexp: /^\./,
		match(wrap, string) {
			wrap.addClasses(string.substring(1));
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
			wrap.ref(string.substring(2));
		}
	},
	{
		regexp: /^\-\./,
		match(wrap, string) {
			wrap.removeClasses(string.substring(2));
		}
	},
	{
		regexp: /^\-@/,
		match(wrap, string) {
			wrap.removeCss(string.substring(2));
		}
	},
	{
		regexp: /^\-/,
		match(wrap, string) {
			wrap.removeAttr(string.substring(1));
		}
	},
	{
		test: /^=>(\(|"|'|`)/,
		regexp: /^=>(\([\s\S]+\)|"[\s\S]+"|'[\s\S]+'|`[\s\S]+`)$/,
		match(wrap, string) {
			wrap.into(string.substring(3, string.length - 1));
		}
	},
	{
		regexp: /^=>\./,
		match(wrap, string) {
			wrap.moveClass(string.substring(3));
		}
	},
	{
		regexp: /^=>/,
		match(wrap, string) {
			wrap.moveAttr(string.substring(2));
		}
	},
	{
		regexp: /^~\./,
		match(wrap, string) {
			wrap.toggleClass(string.substring(2));
		}
	},
	{
		regexp: /^~/,
		match(wrap, string) {
			wrap.toggleAttr(string.substring(1));
		}
	},
	{
		test: /^\*/,
		regexp: /^\*[\s\S]+\*$/,
		match(wrap, string) {
			wrap.text(string.substring(1, string.length - 1));
		}
	},
	{
		test: /^\+\*/,
		regexp: /^\+\*[\s\S]+\*$/,
		match(wrap, string) {
			wrap.addText(string.substring(2, string.length - 1));
		}
	},
	{
		test: /^>(\(|"|'|`)/,
		regexp: /^>(\([\s\S]+\)|"[\s\S]+"|'[\s\S]+'|`[\s\S]+`)<$/,
		match(wrap, string) {
			wrap.html(string.substring(2, string.length - 2));
		}
	},
	{
		test: /^\+>(\(|"|'|`)/,
		regexp: /^\+>(\([\s\S]+\)|"[\s\S]+"|'[\s\S]+'|`[\s\S]+`)<$/,
		match(wrap, string) {
			wrap.addHtml(string.substring(3, string.length - 2));
		}
	},
	{
		regexp: /^\$/,
		match(wrap, string) {
			switch (string.substring(1)) {
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
			const prop = toCamelCase(match);
			
			wrap.css(prop, string.substring(match.length + 2, string.length - 1));
		}
	},
	{
		regexp: /^[^:]+:[\s\S]+$/,
		match(wrap, string) {
			const match = string.match(/^[^:]+/)[0];
			const prop = toCamelCase(match);
			
			wrap.css(prop, string.substring(match.length + 1));
		}
	},
	{
		test: /^[^=]+=(\(|"|'|`)/,
		regexp: /^[^=]+=(\([\s\S]+\)|"[\s\S]+"|'[\s\S]+'|`[\s\S]+`)$/,
		match(wrap, string) {
			const attr = string.match(/^[^=]+/)[0];
			
			wrap.attr(attr, string.substring(attr.length + 2, string.length - 1));
		}
	},
	{
		regexp: /^[^=]+=[\s\S]+$/,
		match(wrap, string) {
			const attr = string.match(/^[^=]+/)[0];
			
			wrap.attr(attr, string.substring(attr.length + 1));
		}
	}
];
