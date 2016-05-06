import classes from '../../classes';
import Super from '../Super';
import Arr from '../Array';
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
		return new Arr(Object.keys(this.$));
	}
	contains(word) {
		word = new Super(word).$;

		validate([word], ['string'], 'Alphabet.prototype.contains');

		for (let i = 0, length = word.length; i < length; i++) {
			if (!this.$[word[i]]) {
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

classes.Alphabet = Alphabet;

function check(char) {
	return isString(char) && char.length === 1;
}

export default Alphabet;
