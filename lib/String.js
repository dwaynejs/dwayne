import D from './D';
import Super from './Super';
import constructors from './constants/constructors';
import regexpSpecialCharacters from './constants/regexpSpecialCharacters';
import {
	isDateLike, isFunction, isNumberLike, isObject, isString,
	validate
} from './helpers';

const NativeString = global.String;
const htmlSpecials = {
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;'
};
const regexpSpecialsRegexp = new RegExp(new Super(regexpSpecialCharacters)
  .word((x) => '\\' + x + '|')
  .replace(/\|$/, ''), 'g'
);

export class String extends Super {
	constructor(string = '') {
		super(string);
	}

	capitalizeFirst() {
		const string = this.$;

		return new String(string[0].toUpperCase() + string.substring(1));
	}
	endsWith(string) {
		return this.revert().startsWith(new String(string).revert().$);
	}
	escapeHtml() {
		let string = this.$;

		for (const symbol in htmlSpecials) {
			if (htmlSpecials.hasOwnProperty(symbol)) {
				string = string.replace(new RegExp(symbol, 'g'), htmlSpecials[symbol]);
			}
		}

		return new String(string);
	}
	escapeRegExp() {
		return this.replace(regexpSpecialsRegexp, '\\$&');
	}
	in(object) {
		if (!isObject(object)) {
			return false;
		}

		return this.$ in object;
	}
	indexOf() {
		return this.$.indexOf.apply(this.$, arguments);
	}
  get length() {
    return this.$.length;
  }
	match() {
		const match = this.$.match.apply(this.$, arguments);
    
    return D(match);
	}
  parseJSON(options = {}, mapFn) {
    if (!arguments.length) {
      return D(JSON.parse(this.$));
    }

    if (isFunction(options)) {
      mapFn = options;
      options = {};
    }

    const { numbers, dates } = options;
    const parsed = JSON.parse(this.$, function (key, value) {
      if (dates && isDateLike(value) && !isNumberLike(value)) {
        value = new Date(value);
      } else if (numbers && isNumberLike(value) && isString(value)) {
        value = Number(value);
      }

      return mapFn ? mapFn.apply(this, arguments) : value;
    });

    return D(parsed);
  }
	repeat(n) {
		validate([n], [['intLike', '>=0']], 'String#repeat');

		n = Number(n);

		const string = this.$;

    let s = '';

		for (let i = 0; i < n; i++) {
			s += string;
		}

		return new String(s);
	}
	replace(regexp, replacer = '') {
		return new String(this.$.replace(regexp, replacer));
	}
	replaceString(string, replacer = '') {
		string = new Super(string).$;

		validate([string], ['string'], 'String#replaceString');

		return new String(this.$.split(string).join(replacer));
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
  slice() {
    const string = this.$;

    return new String(string.slice.apply(string, arguments));
  }
	split(delimiter) {
		return D(this.$.split(delimiter));
	}
	startsWith(string) {
		return this.$.indexOf(string) === 0;
	}
	substr() {
		const string = this.$;

		return new String(string.substr.apply(string, arguments));
	}
  substring() {
    const string = this.$;

    return new String(string.substring.apply(string, arguments));
  }
  toCamelCase() {
		return new String(trim(this.$)
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
		return new String(trim(this.$)
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
		return new String(trim(this.$)
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
		return new String(this.$.toLowerCase());
	}
	toSnakeCase() {
		return new String(trim(this.$)
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
		return new String(trim(this.$)
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
		return new String(trim(this.$)
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
		return new String(this.$.toUpperCase());
	}
	trim() {
		return new String(this.$.replace(/^\s+|\s+$/g, ''));
	}
	trimLeft() {
		return new String(this.$.replace(/^\s+/, ''));
	}
	trimRight() {
		return new String(this.$.replace(/\s+$/, ''));
	}
  valueOf() {
    return this.$.toString().valueOf();
  }
}

function trim(string) {
	return string.replace(/^[\s\-_\.]+|[\s\-_\.]+$/g, '');
}

constructors[2].push({
	check: isString,
	cls: String
});

export default String;
