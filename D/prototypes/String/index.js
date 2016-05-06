import D from '../../';
import classes from '../../classes';
import constructors from '../../constructors';
import Super from '../Super';
import Alphabet from '../Alphabet';
import Arr from '../Array';
import HtmlElement from '../HtmlElement';
import {
	isFunction, isNumberLike, isObject, isString,
	validate
} from '../../libs';
import regexpSpecialCharacters from './regexp-special-characters';

const NativeString = global.String;
const htmlSpecials = {
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;'
};
const regexpSpecialsRegexp = new RegExp(new Arr(regexpSpecialCharacters).map((x) => '\\' + x).join('|'), 'g');
const dateRegexp = /^\d\d\d\d-\d\d-\d\dt\d\d:\d\d:\d\d\.\d\d\dz$/i;

export class String extends Super {
	constructor(string = '') {
		super((() => {
			if (isString(string)) {
				return string;
			}

			return NativeString(string);
		})());
	}

	alphabet() {
		const ranges = this.$.match(/[\s\S]-[\s\S]/g) || [];
		const length = ranges.length;
		const alphabet = [];

		for (let i = 0; i < length; i++) {
			const range = ranges[i];
			const start = range.charCodeAt(0);
			const end = range.charCodeAt(2);

			if (start > end) {
				throw new Error('Start of the range must be before its end!');
			}

			for (let k = 0, len = end - start + 1; k < len; k++) {
				alphabet.push(NativeString.fromCharCode(start + k));
			}
		}

		return new Alphabet(alphabet);
	}
	capitalizeFirst() {
		const string = NativeString(this.$);
		const S = String;

		return new S(string[0].toUpperCase() + string.substring(1));
	}
	endsWith(string) {
		const Str = String;
		
		return this.revert().startsWith(new Str(string).revert().$);
	}
	escapeHtml() {
		const S = String;
		let string = this.$;

		for (const symbol in htmlSpecials) {
			if (htmlSpecials.hasOwnProperty(symbol)) {
				string = string.replace(new RegExp(symbol, 'g'), htmlSpecials[symbol]);
			}
		}

		return new S(string);
	}
	escapeRegExp() {
		return this.replace(regexpSpecialsRegexp, '\\$&');
	}
	find() {
		if (!arguments.length) {
			const found = document.querySelector(this.$);

			return new HtmlElement(found);
		}

		return Object.getPrototypeOf(String.prototype).find.apply(this, arguments);
	}
	findAll() {
		if (!arguments.length) {
			const found = document.querySelectorAll(this.$);

			return new HtmlElement(found);
		}

		return Object.getPrototypeOf(String.prototype).find.apply(this, arguments);
	}
	'in'(object) {
		if (!isObject(object)) {
			return false;
		}

		return this.$ in object;
	}
	indexOf() {
		return this.$.indexOf.apply(this.$, arguments);
	}
	match() {
		const match = this.$.match.apply(this.$, arguments);
    
    return D(match);
	}
	parseHTML() {
		const doc = document.createElement('div');

		doc.innerHTML = this.$;

		return new HtmlElement(doc).children();
	}
	parseJSON(params, mapFn) {
		if (isFunction(params)) {
			mapFn = params;
			params = {};
		}

		const { numbers, dates } = params;
		const parsed = JSON.parse(this.$, function (key, value) {
			if (dates && dateRegexp.test(value)) {
				value = new Date(value);
			} else if (numbers && isNumberLike(value)) {
				value = Number(value);
			}

			return mapFn ? mapFn.apply(null, arguments) : value;
		});

		return D(parsed);
	}
	parseInt(base = 10) {
		return parseInt(this.$, base);
	}
	repeat(n) {
		validate([n], [['intLike', '>=0']], 'String.prototype.repeat');

		n = Number(n);

		const S = String;
		let string = this.$,
			s = '';

		for (let i = 0; i < n; i++) {
			s += string;
		}

		return new S(s);
	}
	replace(regexp, replacer = '') {
		const S = String;

		return new S(this.$.replace(regexp, replacer));
	}
	replaceString(string, replacer = '') {
		string = new Super(string).$;

		validate([string], ['string'], 'String.prototype.replaceString');

		const S = String;

		return new S(this.$.split(string).join(replacer));
	}
	revert() {
		const Str = String;
		const string = this.$;
		let str = '';

		for (let i = string.length - 1; i >= 0; i--) {
			str += string[i];
		}

		return new Str(str);
	}
	split(delimiter) {
		return new Arr(this.$.split(delimiter));
	}
	startsWith(string) {
		return this.$.indexOf(string) === 0;
	}
	substring() {
		const string = String(this.$);

		return string.substring.apply(string, arguments);
	}
	substr() {
		const string = String(this.$);

		return string.substr.apply(string, arguments);
	}
	toCamelCase() {
		const S = String;

		return new S(trim(this.$)
			.replace(/[\s\-_\.]+/g, '-')
			.replace(/\-[^\-]/g, (match) => {
				return match[1].toUpperCase();
			})
			.replace(/^[\S]/, (match) => {
				return match.toLowerCase();
			})
		);
	}
	toCapitalCase() {
		const S = String;

		return new S(trim(this.$)
			.replace(/[\s\-_\.]+/g, ' ')
			.replace(/[\S]/g, (match) => {
				if (match.toLowerCase() !== match) {
					return ' ' + match;
				}

				return match;
			})
			.replace(/\s[\S]/g, (match) => {
				return match.toUpperCase();
			})
			.replace(/\s+/g, ' ')
			.replace(/^\s/, '')
			.replace(/^[\S]/, (match) => {
				return match.toUpperCase();
			})
		);
	}
	toDotCase() {
		const S = String;

		return new S(trim(this.$)
			.replace(/[\s\-_\.]+/g, '.')
			.replace(/[^\.]/g, (match) => {
				if (match.toLowerCase() !== match) {
					return '.' + match;
				}

				return match;
			})
			.replace(/\.+/g, '.')
			.replace(/^\./, '')
			.toLowerCase()
		);
	}
	toLowerCase() {
		const S = String;

		return new S(this.$.toLowerCase());
	}
	toSnakeCase() {
		const S = String;

		return new S(trim(this.$)
			.replace(/[\s\-_\.]+/g, '_')
			.replace(/[^_]/g, (match) => {
				if (match.toLowerCase() !== match) {
					return '_' + match;
				}

				return match;
			})
			.replace(/_+/g, '_')
			.replace(/^_/, '')
			.toLowerCase()
		);
	}
	toSpaceCase() {
		const S = String;

		return new S(trim(this.$)
			.replace(/[\s\-_\.]+/g, ' ')
			.replace(/[\S]/g, (match) => {
				if (match.toLowerCase() !== match) {
					return ' ' + match;
				}

				return match;
			})
			.replace(/\s+/g, ' ')
			.replace(/^\s/, '')
			.toLowerCase()
		);
	}
	toSpinalCase() {
		const S = String;

		return new S(trim(this.$)
			.replace(/[\s\-_\.]+/g, '-')
			.replace(/[^\-]/g, (match) => {
				if (match.toLowerCase() !== match) {
					return '-' + match;
				}

				return match;
			})
			.replace(/\-+/g, '-')
			.replace(/^\-/, '')
			.toLowerCase()
		);
	}
	toString() {
		return this.$;
	}
	toUpperCase() {
		const S = String;

		return new S(this.$.toUpperCase());
	}
	trim() {
		const S = String;

		return new S(this.$.replace(/^\s+|\s+$/g, ''));
	}
	trimLeft() {
		const S = String;

		return new S(this.$.replace(/^\s+/, ''));
	}
	trimRight() {
		const S = String;

		return new S(this.$.replace(/\s+$/, ''));
	}
}

function trim(string) {
	return string.replace(/^[\s\-_\.]+|[\s\-_\.]+$/g, '');
}

classes.String = String;
constructors.unshift({
	check: isString,
	cls: String
});

export default String;
