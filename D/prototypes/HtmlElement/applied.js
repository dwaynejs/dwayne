import { toCamelCase } from '../../libs';

export default [
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
			const match = string.match(/^[^:]+/)[0];
			const prop = toCamelCase(match);
			
			wrap.css(prop, String(string).substring(match.length + 2, string.length - 1));
		}
	},
	{
		regexp: /^[^:]+:[\s\S]+$/,
		match(wrap, string) {
			const match = string.match(/^[^:]+/)[0];
			const prop = toCamelCase(match);
			
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