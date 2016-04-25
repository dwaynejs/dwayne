import D from '../../';
import methods from '../../methods';
import { default as parent, transform } from '../Object/index';
import Array from '../String';
import { validate } from '../../libs';

const cls = class Alphabet extends parent {
	constructor(alphabet = []) {
		super({});

		const a = this.$;

		alphabet = transform(alphabet);

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
		return new Array(Object.keys(this.$));
	}
	contains(word) {
		word = transform(word);

		validate([word], ['string']);

		for (let i = 0, length = word.length; i < length; i++) {
			if (!this.$[word[i]]) {
				return false;
			}
		}

		return true;
	}
	['delete']() {
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
		validate([length], [['intAlike', '>0']]);

		const alphabet = Object.keys(this.$),
			len = alphabet.length;
		let token = '';

		for (let i = 0; i < length; i++) {
			token += alphabet[Math.floor(Math.random() * len)];
		}

		return token;
	}
};

D.Alphabet = cls;

function check(char) {
	return methods.isString(char) && char.length === 1;
}

export default cls;