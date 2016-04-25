import D from '../../';
import methods from '../../methods';
import { default as parent, transform } from '../Object';
import Alphabet from '../Alphabet';
import Arr from '../Array';
import HtmlElement from '../Alphabet';
import { validate } from '../../libs';

const NativeString = String;
const Obj = parent;

const cls = class String extends parent {
	constructor(string = '') {
		super((() => {
			if (methods.isString(string)) {
				return string;
			}

			return NativeString(string);
		})());
	}

	alphabet() {
		const ranges = this.$.match(/[\s\S]-[\s\S]/g) || [],
			length = ranges.length,
			alphabet = [];

		for (let i = 0; i < length; i++) {
			const range = ranges[i],
				start = range.charCodeAt(0),
				end = range.charCodeAt(2);

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

		return new S(string[0] + string.substring(1));
	}
	// TODO: .endsWith()
	find() {
		if (!arguments.length) {
			const S = String,
				found = document.querySelector(this.$),
				name = found ? found.tagName.toLowerCase() : 'null',
				constructor = D[`Html${ new S(name).toCapitalCase() }Element`];

			if (constructor) {
				return new constructor(found);
			}

			return new HtmlElement(found);
		}

		return Object.getPrototypeOf(String.prototype).find.apply(this, arguments);
	}
	// TODO: .in()
	indexOf() {
		return this.$.indexOf.apply(this.$, arguments);
	}
	match() {
		const match = this.$.match.apply(this.$, arguments);

		if (methods.isArray(match)) {
			return new Arr(match);
		}

		return new Obj(match);
	}
	// TODO: .parse(string('json' | 'html' | 'xml'?))
	repeat(n) {
		validate([n], [['intAlike', '>=0']]);

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
		string = transform(string);

		validate([string], ['string']);

		const S = String;

		return new S(this.$.split(string).join(replacer));
	}
	split(delimiter) {
		return new Arr(this.$.split(delimiter));
	}
	// TODO: .startsWith()
	// TODO: .substring()
	// TODO: .substr()
	toCamelCase() {
		const S = String;

		return new S(trim(this.$)
			.replace(/[\s\-_\.]+/g, '-')
			.replace(/\-[^\-]/g, (match) => {
				return match[1].toUpperCase();
			})
		);
	}
	toCapitalCase() {
		const S = String;

		return new S(trim(this.$)
			.replace(/[\s\-_\.]+/g, ' ')
			.replace(/[\S]+/g, (match) => {
				return match[0].toUpperCase() + match.substring(1);
			})
		);
	}
	toDotCase() {
		const S = String;

		return new S(trim(this.$)
			.replace(/[\s\-_\.]+/g, '.')
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
			.toLowerCase()
		);
	}
	toSpaceCase() {
		const S = String;

		return new S(trim(this.$)
			.replace(/[\s\-_\.]+/g, ' ')
			.toLowerCase()
		);
	}
	toSpinalCase() {
		const S = String;

		return new S(trim(this.$)
			.replace(/[\s\-_\.]+/g, '-')
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
	trim(side) {
		const S = String;

		if (side === 'left') {
			return new S(this.$.replace(/^\s+/, ''));
		}

		if (side === 'right') {
			return new S(this.$.replace(/\s+$/, ''));
		}

		return new S(this.$.replace(/^\s+|\s+$/g, ''));
	}
};

function trim(string) {
	return string.replace(/^[\s\-_\.]+|[\s\-_\.]+$/g, '');
}

D.String = cls;
D.constructors.unshift({
	check: methods.isString,
	cls
});

export default cls;