import D from '../../';
import methods from '../../methods';
import { default as parent, transform } from '../Object';
import { validate, assign, toArray } from '../../libs';

const NativeArray = Array;

const sortMethods = {
	asc: (x, y) => {
		x = Number(x);
		y = Number(y);

		if (x > y) {
			return 1;
		}

		if (x < y) {
			return -1;
		}

		if (methods.isNaN(y) && !methods.isNaN(x)) {
			return 1;
		}

		if (methods.isNaN(x) && !methods.isNaN(y)) {
			return -1;
		}

		return 0;
	}
};

assign(sortMethods, {
	desc: (x, y) => {
		return sortMethods.asc(y, x);
	}
});

const cls = class Array extends parent {
	constructor(array = []) {
		super(array);
	}

	static from(array) {
		return new this(toArray(array));
	}

	concat() {
		const array = from(this.$),
			length = arguments.length;

		for (let i = 0; i < length; i++) {
			const value = arguments[i],
				transformed = transform(value);

			if (methods.isArrayAlike(transformed) && !methods.isString(transformed)) {
				for (let k = 0, len = transformed.length; k < len; k++) {
					array.push(transformed[k]);
				}

				continue;
			}

			array.push(value);
		}

		return new Array(array);
	}
	join() {
		return NativeArray.prototype.join.apply(this.$, arguments);
	}
	get last() {
		const array = this.$;

		return array[array.length - 1];
	}
	get length() {
		return this.$.length;
	}
	pop() {
		NativeArray.prototype.pop.call(this.$);

		return this;
	}
	push() {
		NativeArray.prototype.push.apply(this.$, arguments);

		return this;
	}
	reverse() {
		const array = this.$,
			length = array.length,
			a = [];

		for (let i = length - 1; i >= 0; i--) {
			a.push(array[i]);
		}

		return new Array(a);
	}
	shift() {
		NativeArray.prototype.shift.call(this.$);

		return this;
	}
	shuffle() {
		const array = from(this.$),
			length = array.length,
			a = [];

		for (let i = 0; i < length; i++) {
			const k = i + Math.floor((length - i) * Math.random()),
				change = array[i];

			a.push(array[k]);
			array[i] = array[k];
			array[k] = change;
		}

		return new Array(a);
	}
	slice() {
		return new Array(NativeArray.prototype.slice.apply(this.$, arguments));
	}
	sort(f) {
		try {
			validate([f], ['function']);
		} catch (e) {
			if (!(f in sortMethods)) {
				throw new TypeError(
					`1st argument must either or function, or method from [${ Object.keys(sortMethods).join(', ') }]!`
				);
			}

			f = sortMethods[f];
		}

		return new Array(from(this.$).sort(f));
	}
	splice() {
		NativeArray.prototype.splice.apply(this.$, arguments);

		return this;
	}
	string() {
		return NativeArray.prototype.join.call(this.$, '');
	}
	unshift() {
		NativeArray.prototype.unshift.apply(this.$, arguments);

		return this;
	}
};

D.Array = cls;
D.constructors.unshift({
	check: (value) => methods.isArrayAlike(value) && !methods.isString(value),
	cls
});

export default cls;