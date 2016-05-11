import D from '../../';
import constructors from '../../constructors';
import {
	isArrayLike, isDate, isFunction, isNaN, isNull,
  isObject, isRegExp, isString, isUndefined,
	validate, toStringTag, iterate, assign
} from '../../libs';

export class Super {
	constructor(object = {}) {
    while (object instanceof Super && '$' in object) {
      object = object.$;
    }
    
		Object.defineProperty(this, '$', { value: object });
	}

	array(mapFn) {
		validate([mapFn], ['function'], 'Super.prototype.array');

		const a = [];

    iterate(this.$, (value, key, object) => {
      mapFn(a, value, key, object);
    });

		return D(a);
	}
	assign() {
		const object = this.$;

    iterate(arguments, (o) => {
      iterate(new Super(o).$, (value, key) => {
        object[key] = value;
      });
    });

		return this;
	}
	average(mapFn = null) {
		return this.sum(mapFn) / this.count;
	}
	call(f) {
		validate([f], ['function'], 'Super.prototype.call');
    
		return f.apply(this, Array.prototype.slice.call(arguments, 1));
	}
	get count() {
		const object = this.$;

		if (!isObject(object)) {
			return 0;
		}

		return Object.keys(object).length;
	}
  create(descriptors) {
    return Object.create(this.$, descriptors);
  }
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

		validate([mapFn, n], ['function', ['intLike', '>0']], 'Super.prototype.deepEvery');

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

		validate([mapFn, n], ['function', ['intLike', '>0']], 'Super.prototype.deepFilter');

		const filtered = deepFilter(this.$, mapFn, n, [{ key: null, value: this.$ }]);

		return D(filtered);
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

		validate([mapFn, n], ['function', ['intLike', '>0']], 'Super.prototype.deepFind');

		return deepFind(this.$, mapFn, n, [{ key: null, value: this.$ }]);
	}
	deepFreeze() {
		deepFreeze(this.$);

		return this;
	}
	deepMap(mapFn, n = 1) {
		validate([mapFn, n], ['function', ['intLike', '>0']], 'Super.prototype.deepMap');

		n = Number(n);

		const map = deepMap(this.$, mapFn, n, [{ key: null, value: this.$ }]);

		return D(map);
	}
	deepReduce(mapFn, n = 1, IV) {
		validate([mapFn, n], ['function', ['intLike', '>0']], 'Super.prototype.deepReduce');

		n = Number(n);

    const object = this.$;
    const tree = [{ key: null, value: this.$ }];

    if (arguments.length < 3) {
      return deepReduce(object, mapFn, n, false, null, tree).IV;
    }

		return deepReduce(object, mapFn, n, false, { IV }, tree).IV;
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

		validate([mapFn, n], ['function', ['intLike', '>0']], 'Super.prototype.deepSome');

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

		property = new Super(property).$;

		if (isObject(this.$)) {
			Object.defineProperties(this.$, property);
		}

		return this;
	}
	delete() {
		const object = this.$;

		if (object) {
      iterate(arguments, (property) => {
        delete object[property];
      });
		}

		return this;
	}
	equals(o) {
		o = new Super(o).$;

		return this.$ == o;
	}
	every(mapFn = Boolean) {
		validate([mapFn], ['function'], 'Super.prototype.every');

    return iterate(this.$, (value, key, object) => {
      if (!mapFn(value, key, object)) {
        return false;
      }
    }) !== false;
	}
  filter(mapFn = Boolean) {
		validate([mapFn], ['function'], 'Super.prototype.filter');

		const object = this.$;
    const array = isArrayLike(object);
		const o = array ? [] : isNull(object) ? null : {};

    iterate(object, (value, key) => {
      if (mapFn(value, key, object)) {
        if (array) {
          o.push(value);
        } else {
          o[key] = value;
        }
      }
    });

		return D(o);
	}
	find(mapFn) {
		validate([mapFn], ['function'], 'Super.prototype.find');

    return iterate(this.$, (value, key, object) => {
      if (mapFn(value, key, object)) {
        return { key, value };
      }
    }) || null;
	}
	forEach(mapFn) {
		validate([mapFn], ['function'], 'Super.prototype.forEach');

    iterate(this.$, (value, key, object) => {
      mapFn(value, key, object);
    });

		return this;
	}
	freeze() {
		Object.freeze(this.$);

		return this;
	}
	get(property, getter) {
		if (arguments.length >= 2) {
			property = { [property]: getter };
		}

		const object = this.$;

		if (isObject(object)) {
      iterate(new Super(property).$, (getter, property) => {
        Object.defineProperty(object, property, { get: getter });
      });
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
  instanceof(constructor) {
    return this.$ instanceof constructor;
  }
	isFrozen() {
		return Object.isFrozen(this.$);
	}
	json(mapFn, indent) {
		if (arguments.length === 1 && !isFunction(mapFn)) {
      Array.prototype.unshift.call(arguments, null);
		}

    Array.prototype.unshift.call(arguments, this.$);

		return JSON.stringify.apply(JSON, arguments);
	}
	keyOf(value) {
    const key = iterate(this.$, (val, key) => {
      if (val == value || (isNaN(val) && isNaN(value))) {
        return key;
      }
    });

		return isUndefined(key) ? null : key;
	}
	keyOfStrict(value) {
    const key = iterate(this.$, (val, key) => {
      if (val === value || (isNaN(val) && isNaN(value))) {
        return key;
      }
    });

    return isUndefined(key) ? null : key;
	}
	keys() {
		const object = this.$;

		return D(!isObject(object) ? [] : Object.keys(object));
	}
	map(mapFn) {
		validate([mapFn], ['function'], 'Super.prototype.map');

    const object = this.$;
    const o = isArrayLike(object) ? [] : isNull(object) ? null : {};

    iterate(object, (value, key) => {
      o[key] = mapFn(value, key, object);
    });

		return D(o);
	}
	max(mapFn = null) {
		validate([mapFn], ['function||!'], 'Super.prototype.max');

		let max = { key: null, value: -Infinity };

    iterate(this.$, (value, key, object) => {
      const val = Number(mapFn ? mapFn(value, key, object) : value);

      if (val > max.value) {
        max = { key, value: val };
      }
    });

		return max;
	}
	min(mapFn = null) {
    validate([mapFn], ['function||!'], 'Super.prototype.max');

    let min = { key: null, value: Infinity };

    iterate(this.$, (value, key, object) => {
      const val = Number(mapFn ? mapFn(value, key, object) : value);

      if (val < min.value) {
        min = { key, value: val };
      }
    });

    return min;
	}
	object(mapFn) {
    validate([mapFn], ['function'], 'Super.prototype.array');

    const o = {};

    iterate(this.$, (value, key, object) => {
      mapFn(o, value, key, object);
    });

    return new Super(o);
	}
  prop(property, value) {
    const object = this.$;

    if (arguments.length <= 1 && isString(property)) {
      return object[property];
    }

    if (arguments.length >= 2) {
      property = { [property]: value };
    }

    property = new Super(property).$;

    assign(object, property);

    return this;
  }
	propertyDescriptor(property) {
		const object = this.$;

		if (!isObject(object)) {
			return;
		}

		return Object.getOwnPropertyDescriptor(object, property);
	}
	propertyNames() {
		const object = this.$;

		return D(!isObject(object) ? [] : Object.getOwnPropertyNames(object));
	}
	propertySymbols() {
		const object = this.$;

		return D(!isObject(object) ? [] : Object.getOwnPropertySymbols(object));
	}
	proto(proto) {
		const object = this.$;

		if (arguments.length) {
			if (isObject(object)) {
				Object.setPrototypeOf(object, proto);
			}
			return this;
		}

		if (!isObject(object)) {
			return;
		}

		return Object.getPrototypeOf(object);
	}
	reduce(mapFn, IV) {
		validate([mapFn], ['function'], 'Super.prototype.reduce');

		const object = this.$;

    let startKey;

    if (arguments.length === 1) {
      iterate(object, (value, key) => {
        startKey = key;
        IV = value;

        return true;
      });
    }

    iterate(object, (value, key) => {
      if (key !== startKey) {
        IV = mapFn(IV, value, key, object);
      }
    });

		return IV;
	}
	set(property, setter) {
    if (arguments.length >= 2) {
      property = { [property]: setter };
    }

    const object = this.$;

    if (isObject(object)) {
      iterate(new Super(property).$, (setter, property) => {
        Object.defineProperty(object, property, { set: setter });
      });
    }

    return this;
	}
	some(mapFn = Boolean) {
    validate([mapFn], ['function'], 'Super.prototype.every');

    return iterate(this.$, (value, key, object) => {
      if (mapFn(value, key, object)) {
        return true;
      }
    }) || false;
	}
	strictEquals(o) {
		o = new Super(o).$;

		return this.$ === o;
	}
	sum(mapFn = null) {
    validate([mapFn], ['function||!'], 'Super.prototype.array');

    let sum = 0;

    iterate(this.$, (value, key, object) => {
      sum += Number(mapFn ? mapFn(value, key, object) : value);
    });

    return sum;
	}
  toJSON() {
    return this.$;
  }
  get toStringTag() {
    return toStringTag(this.$);
  }
  get type() {
    return typeof this.$;
  }
	values() {
    const array = [];

    iterate(this.$, (value) => {
      array.push(value);
    });

		return D(array);
	}
	word(mapFn = null) {
    validate([mapFn], ['function||!'], 'Super.prototype.array');

    let word = '';

    iterate(this.$, (value, key, object) => {
      word += String(mapFn ? mapFn(value, key, object) : value);
    });

    return word;
	}
}

function deepEqual(o1, o2, strict) {
	o1 = new Super(o1).$;
	o2 = new Super(o2).$;

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

	if (isDate(o1) || isDate(o2)) {
		return false;
	}

	if (isRegExp(o1) && isRegExp(o2)) {
		return o1.toString() === o2.toString();
	}

	if (isRegExp(o1) || isRegExp(o2)) {
		return false;
	}

  if (isFunction(o1) && isFunction(o2)) {
    return o1 === o2;
  }

  if (isFunction(o1) || isFunction(o2)) {
    return false;
  }

	if (
		(strict ? o1 !== o2 : o1 != o2) &&
		Object.keys(o1).length !== Object.keys(o2).length
	) {
		return false;
	}

  return iterate(o1, (value, key) => {
    if (!(key in o2) || !deepEqual(value, o2[key], strict)) {
      return false;
    }
  }) !== false;
}
function deepEvery(object = {}, mapFn, n, tree) {
	object = new Super(object).$;

	const end = n === 1;

  return iterate(object, (value, key, object) => {
    const newTree = [{ key, value }].concat(tree);

    if (
      end
        ? !mapFn(value, key, object, newTree)
        : !deepEvery(value, mapFn, n - 1, newTree)
    ) {
      return false;
    }
  }) !== false;
}
function deepFilter(object = {}, mapFn, n, tree) {
	object = new Super(object).$;

  const array = isArrayLike(object);
	const o = array ? [] : isNull(object) ? null : {};
	const end = n === 1;

  iterate(object, (value, key, object) => {
    const newTree = [{ key, value }].concat(tree);

    if (end && mapFn(value, key, object, newTree)) {
      if (array) {
        o.push(value);
      } else {
        o[key] = value;
      }

      return;
    }

    if (!end) {
      const filtered = deepFilter(value, mapFn, n - 1, newTree);

      if (array) {
        o.push(filtered);
      } else {
        o[key] = filtered;
      }
    }
  });

	let iterated = 0;

	for (const key in object) {
		if (object.hasOwnProperty(key)) {
			if (array && iterated === object.length) {
				break;
			}

			iterated++;


		}
	}

	return o;
}
function deepFind(object = {}, mapFn, n, tree) {
	object = new Super(object).$;

	const end = n === 1;

  return iterate(object, (value, key, object) => {
    const newTree = [{ key, value }].concat(tree);

    if (end) {
      if (mapFn(value, key, object, newTree)) {
        return newTree;
      }

      return;
    }

    const result = deepFind(value, mapFn, n - 1, newTree);

    if (result) {
      return result;
    }
  }) || null;
}
function deepFreeze(object = {}) {
	Object.freeze(object);
  iterate(object, deepFreeze);
}
function deepMap(object = {}, mapFn, n, tree) {
	object = new Super(object).$;

	const o = isArrayLike(object) ? [] : isNull(object) ? null : {};
	const end = n === 1;

  iterate(object, (value, key, object) => {
    const newTree = [{ key, value }].concat(tree);

    o[key] = end
      ? mapFn(value, key, object, newTree)
      : deepMap(value, mapFn, n - 1, newTree);
  });

	return o;
}
function deepReduce(object = {}, mapFn, n, start, IV, tree) {
	object = new Super(object).$;

	const end = n === 1;

	let startKey;

  if (!IV && end && !start) {
    IV = { IV: undefined };

    iterate(object, (value, key) => {
      start = true;
      startKey = key;
      IV.IV = value;

      return true;
    });
  }

  iterate(object, (value, key, object) => {
    if (key !== startKey) {
      const newTree = [{ key, value }].concat(tree);

      IV = end
        ? { IV: mapFn(IV.IV, value, key, object, newTree) }
        : deepReduce(value, mapFn, n - 1, start, IV, newTree);
    }
  });

	return IV;
}
function deepSome(object = {}, mapFn, n, tree) {
  object = new Super(object).$;

  const end = n === 1;

  return iterate(object, (value, key, object) => {
    const newTree = [{ key, value }].concat(tree);

    if (
      end
        ? mapFn(value, key, object, newTree)
        : deepSome(value, mapFn, n - 1, newTree)
    ) {
      return true;
    }
  }) || false;
}

constructors[0].push({
	check: () => true,
	cls: Super
});

// TODO: .switch()

export default Super;
