import classes from '../../classes';
import constructors from '../../constructors';
import { default as parent, transform } from '../Object';
import {
	isArrayAlike, isNaN, isString,
	toArray, validate
} from '../../libs';

const NativeArray = global.Array;

export class Array extends parent {
	constructor(array = []) {
		super(array);
	}

	concat() {
		const array = toArray(this.$);
		const length = arguments.length;

		for (let i = 0; i < length; i++) {
			const value = arguments[i];
			const transformed = transform(value);

			if (isArrayAlike(transformed) && !isString(transformed)) {
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
		const array = this.$;
		const length = array.length;
		const a = [];

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
		const array = toArray(this.$);
		const length = array.length;
		const a = [];

		for (let i = 0; i < length; i++) {
			const k = i + Math.floor((length - i) * Math.random());
			const change = array[i];

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
		validate([f], ['function']);
		
		return new Array(toArray(this.$).sort(f));
	}
	sortAsc() {
		return new Array(toArray(this.$).sort(asc));
	}
	sortDesc() {
		return new Array(toArray(this.$).sort((y, x) => {
			return asc(x, y);
		}));
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
}

function asc(x, y) {
	x = Number(x);
	y = Number(y);
	
	if (x > y) {
		return 1;
	}
	
	if (x < y) {
		return -1;
	}
	
	if (isNaN(y) && !isNaN(x)) {
		return 1;
	}
	
	if (isNaN(x) && !isNaN(y)) {
		return -1;
	}
	
	return 0;
}

classes.Array = Array;
constructors.unshift({
	check: (value) => isArrayAlike(value) && !isString(value),
	cls: Array
});

export default Array;
