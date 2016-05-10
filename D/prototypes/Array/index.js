import constructors from '../../constructors';
import Super from '../Super';
import {
  isArrayLike, isNaN, isString,
	toArray, validate, iterate
} from '../../libs';

const NativeArray = global.Array;

export class Array extends Super {
	constructor(array = []) {
		super(array);
	}

	concat() {
		const array = toArray(this.$);

    iterate(arguments, (value) => {
      value = new Super(value).$;

      if (isArrayLike(value) && !isString(value)) {
        iterate(value, (value) => {
          array.push(value);
        });

        return;
      }

      array.push(value);
    });

		return new Array(array);
	}
  indexOf(value) {
    const key = this.keyOf(value);
    
    return key === null ? -1 : Number(key);
  }
  indexOfStrict(value) {
    const key = this.keyOfStrict(value);
  
    return key === null ? -1 : Number(key);
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
		const a = [];

    iterate(this.$, (value) => {
      a.unshift(value);
    });

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

    iterate(array, (value, index) => {
      const k = index + Math.floor((length - index) * Math.random());
      const change = value;

      a.push(array[k]);
      array[index] = array[k];
      array[k] = change;
    });

		return new Array(a);
	}
	slice() {
		return new Array(NativeArray.prototype.slice.apply(this.$, arguments));
	}
	sort(f) {
		validate([f], ['function'], 'Array.prototype.contains');
		
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

constructors[1].push({
	check: isArrayLike,
	cls: Array
});

export function array(number, mapFn) {
  validate([number, mapFn], [['intLike', '>=0'], 'function||!']);

  const array = [];

  for (let i = 0; i < number; i++) {
    array.push(mapFn ? mapFn(i) : i);
  }

  return new Array(array);
}

export default Array;
