import D from '../../';
import {
	isArrayAlike, isDate, isFunction, isNaN,
	isNull, isObject, isRegExp, isUndefined,
	validate
} from '../../libs';

const NativeObject = global.Object;

const cls = class Object {
	constructor(object = {}) {
		NativeObject.defineProperty(this, '$', { value: object });
	}

	static defineProperty() {
		return NativeObject.defineProperty.apply(NativeObject, arguments);
	}

	array(mapFn) {
		validate([mapFn], ['function']);

		const object = this.$;
		const array = isArrayAlike(object);
		const a = [];

		for (const key in object) {
			if (object.hasOwnProperty(key)) {
				const value = object[key];

				mapFn(a, value, array ? Number(key) : key, object);
			}
		}

		return new D.Array(a);
	}
	assign() {
		const object = this.$,
			length = arguments.length;

		for (let i = 0; i < length; i++) {
			const o = transform(arguments[i]);

			for (const key in o) {
				if (o.hasOwnProperty(key)) {
					object[key] = o[key];
				}
			}
		}

		return this;
	}
	average(mapFn = null) {
		return this.sum(mapFn) / this.count;
	}
	call(f) {
		validate([f], ['function']);

		const g = f;
		Array.prototype.shift.call(arguments);

		return g.apply(this, arguments);
	}
	// TODO: .copy()
	get count() {
		const object = this.$;

		if (!isObject(object)) {
			return 0;
		}

		return NativeObject.keys(object).length;
	}
	// TODO: .deepAssign()
	// TODO: .deepCopy()
	deepEquals(o = null) {
		return deepEqual(this.$, o);
	}
	deepEvery(mapFn, n) {
		if (arguments.length === 1 && !isFunction(mapFn)) {
			n = mapFn;
			mapFn = Boolean;
		} else if (arguments.length === 1) {
			n = 1;
		} else if (!arguments.length) {
			n = 1;
			mapFn = Boolean;
		}

		validate([mapFn, n], ['function', ['intAlike', '>0']]);

		n = Number(n);

		return deepEvery(this.$, mapFn, n, [{ key: null, value: this.$ }]);
	}
	deepFilter(mapFn, n) {
		if (arguments.length === 1 && !isFunction(mapFn)) {
			n = mapFn;
			mapFn = Boolean;
		} else if (arguments.length === 1) {
			n = 1;
		} else if (!arguments.length) {
			n = 1;
			mapFn = Boolean;
		}

		validate([mapFn, n], ['function', ['intAlike', '>0']]);

		const filtered = deepFilter(this.$, mapFn, n, [{ key: null, value: this.$ }]);

		return isArrayAlike(filtered) ? new D.Array(filtered) : new Object(filtered);
	}
	deepFind(mapFn, n) {
		if (arguments.length === 1 && !isFunction(mapFn)) {
			n = mapFn;
			mapFn = Boolean;
		} else if (arguments.length === 1) {
			n = 1;
		} else if (!arguments.length) {
			n = 1;
			mapFn = Boolean;
		}

		validate([mapFn, n], ['function', ['intAlike', '>0']]);

		return deepFind(this.$, mapFn, n, [{ key: null, value: this.$ }]);
	}
	deepFreeze() {
		deepFreeze(this.$);

		return this;
	}
	deepMap(mapFn, n = 1) {
		validate([mapFn, n], ['function', ['intAlike', '>0']]);

		n = Number(n);

		const map = deepMap(this.$, mapFn, n, [{ key: null, value: this.$ }]);

		return isArrayAlike(map) ? new D.Array(map) : new Object(map);
	}
	deepReduce(mapFn, n = 1, IV) {
		validate([mapFn, n], ['function', ['intAlike', '>0']]);

		n = Number(n);

		return deepReduce(this.$, mapFn, n, false, IV, [{ key: null, value: this.$ }]);
	}
	deepSome(mapFn, n) {
		if (arguments.length === 1 && !isFunction(mapFn)) {
			n = mapFn;
			mapFn = Boolean;
		} else if (arguments.length === 1) {
			n = 1;
		} else if (!arguments.length) {
			n = 1;
			mapFn = Boolean;
		}

		validate([mapFn, n], ['function', ['intAlike', '>0']]);

		n = Number(n);

		return deepSome(this.$, mapFn, n, [{ key: null, value: this.$ }]);
	}
	deepStrictEquals(o = null) {
		return deepEqual(this.$, o, true);
	}
	define(property, descriptor) {
		if (arguments.length >= 2) {
			property = { [property]: descriptor };
		}

		property = transform(property);

		if (isObject(this.$)) {
			NativeObject.defineProperties(this.$, property);
		}

		return this;
	}
	'delete'() {
		const object = this.$;

		if (object) {
			for (let i = 0, length = arguments.length; i < length; i++) {
				delete object[arguments[i]];
			}
		}

		return this;
	}
	equals(o) {
		o = transform(o);

		return this.$ == o;
	}
	every(mapFn) {
		validate([mapFn], ['function']);

		const object = this.$;
		const array = isArrayAlike(object);

		let iterated = 0;

		for (const key in object) {
			if (object.hasOwnProperty(key)) {
				if (array && iterated === object.length) {
					break;
				}

				iterated++;

				if (!mapFn(object[key], array ? Number(key) : key, object)) {
					return false;
				}
			}
		}

		return true;
	}
	filter(mapFn) {
		validate([mapFn], ['function']);

		const object = this.$;
		const array = isArrayAlike(object);
		const nul = isNull(this.$);
		const o = array ? [] : nul ? null : {};

		let iterated = 0;

		for (const key in object) {
			if (object.hasOwnProperty(key)) {
				if (array && iterated === object.length) {
					break;
				}

				iterated++;

				const value = object[key];

				if (mapFn(value, array ? Number(key) : key, object)) {
					o[key] = value;
				}
			}
		}

		return array ? new D.Array(o) : new Object(o);
	}
	find(mapFn) {
		validate([mapFn], ['function']);

		const object = this.$;
		const array = isArrayAlike(object);

		let iterated = 0;

		for (const key in object) {
			if (object.hasOwnProperty(key)) {
				if (array && iterated === object.length) {
					break;
				}

				iterated++;

				const value = object[key];

				if (mapFn(value, array ? Number(key) : key, object)) {
					return { key, value };
				}
			}
		}

		return null;
	}
	forEach(mapFn) {
		validate([mapFn], ['function']);

		const object = this.$;
		const array = isArrayAlike(object);

		let iterated = 0;

		for (const key in object) {
			if (object.hasOwnProperty(key)) {
				if (array && iterated === object.length) {
					break;
				}

				iterated++;

				mapFn(object[key], array ? Number(key) : key, object);
			}
		}

		return this;
	}
	freeze() {
		NativeObject.freeze(this.$);

		return this;
	}
	get(property, getter) {
		if (arguments.length >= 2) {
			property = { [property]: getter };
		}

		const object = this.$;

		property = transform(property);

		if (isObject(object)) {
			for (const key in property) {
				if (property.hasOwnProperty(key)) {
					NativeObject.defineProperty(object, key, { get: property[key] });
				}
			}
		}

		return this;
	}
	has(key) {
		const object = this.$;

		if (!isObject(object)) {
			return false;
		}

		return key in object;
	}
	hasOwn(key) {
		const object = this.$;

		if (!isObject(object)) {
			return false;
		}

		return object.hasOwnProperty(key);
	}
	// TODO: .instanceof()
	isFrozen() {
		return NativeObject.isFrozen(this.$);
	}
	json(mapFn, indent) {
		if (arguments.length === 1 && !isFunction(f)) {
			indent = mapFn;
			mapFn = null;
		} else if (!arguments.length) {
			mapFn = null;
		}

		validate([mapFn], ['function||!']);

		return JSON.stringify(this.$, function (key, value) {
			value = transform(value);

			return mapFn ? mapFn.apply(null, arguments) : value;
		}, indent);
	}
	keyOf(value) {
		const object = this.$;

		for (const key in object) {
			if (object.hasOwnProperty(key)) {
				const val = object[key];

				if (val == value || (isNaN(val) && isNaN(value))) {
					return key;
				}
			}
		}

		return null;
	}
	keyOfStrict(value) {
		const object = this.$;

		for (const key in object) {
			if (object.hasOwnProperty(key)) {
				const val = object[key];
				
				if (val === value || (isNaN(val) && isNaN(value))) {
					return key;
				}
			}
		}

		return null;
	}
	keys() {
		const object = this.$;

		if (!isObject(object)) {
			return new D.Array();
		}

		return new D.Array(NativeObject.keys(object));
	}
	map(mapFn) {
		validate([mapFn], ['function']);

		const object = this.$;
		const array = isArrayAlike(object);
		const nul = isNull(object);
		const o = array ? [] : nul ? null : {};

		let iterated = 0;

		for (const key in object) {
			if (object.hasOwnProperty(key)) {
				if (array && iterated === object.length) {
					break;
				}

				iterated++;

				o[key] = mapFn(object[key], key, object);
			}
		}

		return array ? new D.Array(o) : new Object(o);
	}
	max(mapFn = null) {
		validate([mapFn], ['function||!']);

		const object = this.$;
		const array = isArrayAlike(object);

		let max = { key: null, value: -Infinity };
		let iterated = 0;

		for (const key in object) {
			if (object.hasOwnProperty(key)) {
				if (array && iterated === object.length) {
					break;
				}

				iterated++;

				const value = object[key],
					val = mapFn ? mapFn(value, array ? Number(key) : key, object) : value;

				if (val > max.value) {
					max = { key, value };
				}
			}
		}

		return max;
	}
	min(mapFn = null) {
		validate([mapFn], ['function||!']);

		const object = this.$;
		const array = isArrayAlike(object);

		let min = { key: null, value: Infinity };
		let iterated = 0;

		for (const key in object) {
			if (object.hasOwnProperty(key)) {
				if (array && iterated === object.length) {
					break;
				}

				iterated++;

				const value = object[key],
					val = mapFn ? mapFn(value, array ? Number(key) : key, object) : value;

				if (val < min.value) {
					min = { key, value };
				}
			}
		}

		return min;
	}
	object(mapFn) {
		validate([mapFn], ['function']);

		const object = this.$;
		const array = isArrayAlike(object);
		const o = {};

		let iterated = 0;

		for (const key in object) {
			if (object.hasOwnProperty(key)) {
				if (array && iterated === object.length) {
					break;
				}

				iterated++;

				mapFn(o, object[key], array ? Number(key) : key, object);
			}
		}

		return new Object(o);
	}
	propertyDescriptor(key) {
		const object = this.$;

		if (!isObject(object)) {
			return;
		}

		return NativeObject.getOwnPropertyDescriptor(object, key);
	}
	propertyNames() {
		const object = this.$;

		if (!isObject(object)) {
			return new D.Array();
		}

		return new D.Array(NativeObject.getOwnPropertyNames(object));
	}
	propertySymbols() {
		const object = this.$;

		if (!isObject(object)) {
			return new D.Array();
		}

		return new D.Array(NativeObject.getOwnPropertySymbols(object));
	}
	proto(proto) {
		const object = this.$;

		if (arguments.length) {
			if (isObject(object)) {
				NativeObject.setPrototypeOf(object, proto);
			}
			return this;
		}

		if (!isObject(object)) {
			return;
		}

		return NativeObject.getPrototypeOf(object);
	}
	reduce(mapFn, IV) {
		validate([mapFn], ['function']);

		const object = this.$;
		const array = isArrayAlike(object);

		let startKey;
		let iterated = 0;

		if (IV == null) {
			for (const key in object) {
				if (object.hasOwnProperty(key)) {
					startKey = key;
					iterated = 1;
					IV = object[key];
					break;
				}
			}
		}

		for (const key in object) {
			if (object.hasOwnProperty(key) && key != startKey) {
				if (array && iterated === object.length) {
					break;
				}

				iterated++;

				IV = mapFn(IV, object[key], array ? Number(key) : key, object);
			}
		}

		return IV;
	}
	set(property, setter) {
		if (arguments.length >= 2) {
			property = { [property]: setter };
		}

		property = transform(property);

		const object = this.$;

		if (isObject(object)) {
			for (const key in property) {
				if (property.hasOwnProperty(key)) {
					NativeObject.defineProperty(object, key, { set: property[key] });
				}
			}
		}

		return this;
	}
	some(mapFn) {
		validate([mapFn], ['function']);

		const object = this.$;
		const array = isArrayAlike(object);

		let iterated = 0;

		for (const key in object) {
			if (object.hasOwnProperty(key)) {
				if (array && iterated === object.length) {
					break;
				}

				iterated++;

				if (mapFn(object[key], array ? Number(key) : key, object)) {
					return true;
				}
			}
		}

		return false;
	}
	strictEquals(o) {
		o = transform(o);

		return this.$ === o;
	}
	sum(mapFn = null) {
		validate([mapFn], ['function||!']);

		const object = this.$;
		const array = isArrayAlike(object);

		let sum = 0;
		let iterated = 0;

		for (const key in object) {
			if (object.hasOwnProperty(key)) {
				if (array && iterated === object.length) {
					break;
				}

				iterated++;

				const value = object[key];

				sum += Number(mapFn ? mapFn(value, array ? Number(key) : key, object) : value);
			}
		}

		return sum;
	}
	// TODO: .typeof()
	values() {
		const object = this.$;
		const array = [];

		for (const key in object) {
			if (object.hasOwnProperty(key)) {
				array.push(object[key]);
			}
		}

		return new D.Array(array);
	}
	word(mapFn = null) {
		validate([mapFn], ['function||!']);

		const object = this.$;
		const array = isArrayAlike(object);

		let word = '';
		let iterated = 0;

		for (const key in object) {
			if (object.hasOwnProperty(key)) {
				if (array && iterated === object.length) {
					break;
				}

				iterated++;

				const value = object[key];

				word += String(mapFn ? mapFn(value, array ? Number(key) : key, object) : value);
			}
		}

		return word;
	}
};

function deepEqual(o1, o2, strict) {
	o1 = transform(o1);
	o2 = transform(o2);

	if (isNull(o1) && isNull(o2)) {
		return true;
	}

	if (isNull(o1) || isNull(o2)) {
		return false;
	}
	
	if (isUndefined(o1) && isUndefined(o2)) {
		return true;
	}
	
	if (isUndefined(o1) || isUndefined(o2)) {
		return false;
	}
	
	if (isNaN(o1) && isNaN(o2)) {
		return true;
	}
	
	if (isNaN(o1) || isNaN(o2)) {
		return false;
	}

	if (isDate(o1) && isDate(o2)) {
		return o1.getTime() === o2.getTime();
	}

	if (isRegExp(o1) && isRegExp(o2)) {
		return o1.toString() === o2.toString();
	}

	if (
		(strict ? o1 !== o2 : o1 != o2) &&
		NativeObject.keys(o1).length !== NativeObject.keys(o2).length
	) {
		return false;
	}

	for (const key in o1) {
		if (o1.hasOwnProperty(key)) {
			if (!(key in o2) || !deepEqual(o1[key], o2[key], strict)) {
				return false;
			}
		}
	}

	return true;
}
function deepEvery(object = {}, mapFn, n, tree) {
	object = transform(object);

	const array = isArrayAlike(object);
	const end = n === 1;

	let iterated = 0;

	for (const key in object) {
		if (object.hasOwnProperty(key)) {
			if (array && iterated === object.length) {
				break;
			}

			iterated++;

			const value = object[key];
			const newTree = [{ key, value }].concat(tree);

			if (
				end ?
					!mapFn(value, array ? Number(key) : key, object, newTree)
					: !deepEvery(value, mapFn, n - 1, newTree)
			) {
				return false;
			}
		}
	}

	return true;
}
function deepFilter(object = {}, mapFn, n, tree) {
	object = transform(object);

	const array = isArrayAlike(object);
	const nul = isNull(object);
	const o = array ? [] : nul ? null : {};
	const end = n === 1;

	let iterated = 0;

	for (const key in object) {
		if (object.hasOwnProperty(key)) {
			if (array && iterated === object.length) {
				break;
			}

			iterated++;

			const value = object[key];
			const newTree = [{ key, value }].concat(tree);

			if (end && mapFn(value, key, object, newTree)) {
				if (array) {
					o.push(value);
					continue;
				}

				o[key] = value;
				continue;
			}

			if (!end) {
				const filtered = deepFilter(value, mapFn, n - 1, newTree);

				if (array) {
					o.push(filtered);
					continue;
				}

				o[key] = filtered;
			}
		}
	}

	return o;
}
function deepFind(object = {}, mapFn, n, tree) {
	object = transform(object);

	const array = isArrayAlike(object);
	const end = n === 1;

	let iterated = 0;

	for (const key in object) {
		if (object.hasOwnProperty(key)) {
			if (array && iterated === object.length) {
				break;
			}

			iterated++;

			const value = object[key];
			const newTree = [{ key, value }].concat(tree);

			if (end) {
				if (mapFn(value, array ? Number(key) : key, object, newTree)) {
					return newTree;
				}

				continue;
			}

			const result = deepFind(value, mapFn, n - 1, newTree);

			if (result) {
				return result;
			}
		}
	}

	return null;
}
function deepFreeze(object = {}) {
	NativeObject.freeze(object);
	for (const key in object) {
		if (object.hasOwnProperty(key)) {
			deepFreeze(object[key]);
		}
	}
}
function deepMap(object = {}, mapFn, n, tree) {
	object = transform(object);

	const array = isArrayAlike(object);
	const nul = isNull(object);
	const o = array ? [] : nul ? null : {};
	const end = n === 1;

	let iterated = 0;

	for (const key in object) {
		if (object.hasOwnProperty(key)) {
			if (array && iterated === object.length) {
				break;
			}

			iterated++;

			const value = object[key];
			const newTree = [{ key, value }].concat(tree);

			o[key] = end
				? mapFn(value, array ? Number(key) : key, object, newTree)
				: deepMap(value, mapFn, n - 1, newTree);
		}
	}

	return o;
}
function deepReduce(object = {}, mapFn, n, start, IV, tree) {
	object = transform(object);

	const array = isArrayAlike(object);
	const end = n === 1;

	let startKey;
	let iterated = 0;

	if (IV == null && end && !start) {
		for (const key in object) {
			if (object.hasOwnProperty(key)) {
				start = true;
				startKey = key;
				iterated = 1;
				IV = object[key];
				break;
			}
		}
	}

	for (const key in object) {
		if (object.hasOwnProperty(key) && key !== startKey) {
			if (array && iterated === object.length) {
				break;
			}

			iterated++;

			const value = object[key];
			const newTree = [{ key, value }].concat(tree);

			IV = end
				? mapFn(IV, value, array ? Number(key) : key, object, newTree)
				: deepReduce(value, mapFn, n - 1, start, IV, newTree);
		}
	}

	return IV;
}
function deepSome(object = {}, mapFn, n, tree) {
	object = transform(object);

	const array = isArrayAlike(object);
	const end = n === 1;

	let iterated = 0;

	for (const key in object) {
		if (object.hasOwnProperty(key)) {
			if (array && iterated === object.length) {
				break;
			}

			iterated++;

			const value = object[key];
			const newTree = [{ key, value }].concat(tree);

			if (
				end
					? mapFn(value, array ? Number(key) : key, object, newTree)
					: deepSome(value, mapFn, n - 1, newTree)
			) {
				return true;
			}
		}
	}

	return false;
}

D.Object = cls;
D.constructors.unshift({
	check: isObject,
	cls
});

export function transform(object) {
	while (object instanceof cls) {
		object = object.$;
	}

	return object;
}

export const Obj = cls;

export default cls;