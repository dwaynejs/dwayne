import D from '../../';
import Super from '../Super';
import { isString, validate, supportSymbol } from '../../libs';

export class Alphabet extends Super {
	constructor(alphabet = []) {
		super({});

		const a = this.$;

		alphabet = new Super(alphabet).$;

		for (let i = 0, length = alphabet.length; i < length; i++) {
			const char = alphabet[i];

			if (!check(char)) {
				throw new Error('Each element of an array must be a single char!');
			}

			a[char] = char;
		}
	}

	add() {
		for (let i = 0, length = arguments.length; i < length; i++) {
			const char = arguments[i];

			if (!check(char)) {
				throw new Error('Each argument must be a single char!');
			}

			this.$[char] = char;
		}

		return this;
	}
	alphabet() {
		return D(Object.keys(this.$));
	}
	contains(word) {
		word = new Super(word).$;

		validate([word], ['string'], 'Alphabet.prototype.contains');

    const alphabet = this.$;

		for (let i = 0, length = word.length; i < length; i++) {
			if (!alphabet[word[i]]) {
				return false;
			}
		}

		return true;
	}
	'delete'() {
		for (let i = 0, length = arguments.length; i < length; i++) {
			const char = arguments[i];

			if (!check(char)) {
				throw new Error('Each argument must be a single char!');
			}

			delete this.$[char];
		}

		return this;
	}
	token(length) {
		validate([length], [['intLike', '>0']], 'Alphabet.prototype.token');

		const alphabet = Object.keys(this.$);
		const len = alphabet.length;
		let token = '';

		for (let i = 0; i < length; i++) {
			token += alphabet[Math.floor(Math.random() * len)];
		}

		return token;
	}
}

if (supportSymbol) {
  Alphabet.prototype[Symbol.toStringTag] = 'Alphabet';
}

function check(char) {
	return isString(char) && char.length === 1;
}

export function alphabet(string) {
  string = new Super(string).$;

  validate([string], ['string']);

  const ranges = string.match(/[\s\S]-[\s\S]/g) || [];
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
      alphabet.push(String.fromCharCode(start + k));
    }
  }

  return new Alphabet(alphabet);
}

export default Alphabet;
