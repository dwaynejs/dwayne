/**
 * @module Function
 * @private
 * @description Exports Function class.
 */

import Super from './Super';
import Promise from './Promise';
import constructors from './constants/constructors';
import { isFunction, assign, validate, toArray } from './helpers';

const NativeFunction = global.Function;

export class Function extends Super {
  /**
   * @class Function
   * @extends Super
   * @public
   * @param {Function} [func=function () {}] - Function to wrap.
   * @returns {Function} Instance of Function.
   * @description A wrap of a function.
   * 
   * @example
   * const func = new Function(Math.max);
   * 
   * func(1, 4, -2, 5); // 5
   */
	constructor(func = () => {}) {
    super();
    
		function proxy() {
			if (++proxy.$$.called < proxy.$$.canBeCalled) {
				let { before, after, context, args, sync, contextLocked } = proxy.$$;
				let ret;

				context = contextLocked ? context : context || this;
				args = args.concat(toArray(arguments));

				if (sync) {
					for (let i = 0; i < before.length; i++) {
						args = before[i].call(null, toArray(args));
					}

					ret = func.apply(context, toArray(args));

					for (let i = 0; i < after.length; i++) {
						ret = after[i](ret);
					}

					return ret;
				}

				let promise = Promise.resolve(args);

				for (let i = 0; i < before.length; i++) {
					promise = promise.then((args) => {
						return before[i].call(null, toArray(args));
					});
				}

				promise = promise.then((args) => {
					return func.apply(context, toArray(args));
				});

				for (let i = 0; i < after.length; i++) {
					promise = promise.then((ret) => {
						return after[i](ret);
					});
				}

				return promise;
			}
		}
    
    /**
     * @member {Object} Function#$$
     * @protected
     * @property {Array} after - After middleware array.
     * @property {Array} args - Locked and bound arguments.
     * @property {Array} argsLocked - Locked arguments.
     * @property {Array} before - Before middleware array.
     * @property {Number} canBeCalled - How many times the function can be actually called.
     * @property {*} context - Locked or bound context.
     * @property {Boolean} contextLocked - Is context locked or not.
     * @property {Boolean} sync - Is function synchronous or not.
     * @description Config parameters.
     */
		Object.defineProperty(proxy, '$$', { value: {} });

    /**
     * @member {Function} Function#$
     * @public
     * @description Original function.
     */
    Object.defineProperty(proxy, '$', { value: func });

    Object.setPrototypeOf(proxy, Function.prototype);

		assign(proxy.$$, {
			after: [],
			args: [],
			argsLocked: [],
			before: [],
			called: 0,
			canBeCalled: Infinity,
			context: null,
			contextLocked: false,
			sync: true
		});

		return proxy;
	}

  /**
   * @method Function#after
   * @public
   * @param {Function} f - After middleware.
   * @param {Boolean|*} [where=true] - Boolean parameter where to put middleware.
   * Truthy parameter stands for "to the end" and falsey for "to the beginning".
   * @returns {Function} Returns this.
   * @description Adds after middleware.
   * 
   * @example
   * const func = new Function((a) => a + 1)
   *   .after((result) => result * result);
   *   
   * func(4);  // 25
   * func(-4); // 9
   */
	after(f, where = true) {
		validate([f], ['function'], 'Function#after');

		const func = this.$$;

		if (!where) {
			func.after.unshift(f);
		} else {
			func.after.push(f);
		}

		return this;
	}

  /**
   * @method Function#apply
   * @public
   * @param {*} context - Context to call with.
   * @param {(Array|Arguments)} args - Arguments to call with.
   * @returns {*} Return of function call.
   * @description Synonym of Function#apply.
   */
	apply(context, args) {
		return NativeFunction.prototype.apply.apply(this, arguments);
	}

  /**
   * @method Function#async
   * @public
   * @param {Boolean|*} [condition] - If the function should be synchronous or not.
   * @returns {Function} Returns this.
   * @description If the function should be synchronous or not.
   * 
   * @example
   * const func = new Function((a) => a + 1).async();
   * 
   * func(4).then((result) => {
   *   console.log(result); // 5
   * });
   */
	async(condition = true) {
		this.$$.sync = !condition;

		return this;
	}

  /**
   * @method Function#before
   * @public
   * @param {Function} f - Before middleware.
   * @param {Boolean|*} [where=true] - Boolean parameter where to put middleware.
   * Truthy parameter stands for "to the beginning" and falsey for "to the end".
   * @returns {Function} Returns this.
   * @description Adds before middleware.
   *
   * @example
   * const func = new Function((a) => a + 1)
   *   .before(([arg]) => [arg * arg]);
   *
   * func(4); // 17
   * func(3); // 10
   */
	before(f, where = true) {
		validate([f], ['function'], 'Function#before');

		const func = this.$$;

		if (!where) {
			func.before.push(f);
		} else {
			func.before.unshift(f);
		}

		return this;
	}

  /**
   * @method Function#bind
   * @public
   * @param {*} context - Context to bind.
   * @param {(Array|Arguments|*)} args - Arguments to bind.
   * @returns {Function} Returns this.
   * @description Composition of {@link Function#bindContext} and {@link Function#bindArgs}.
   *
   * @example
   * const func = new Function(function (a, b) {
   *   return this.a + a + b;
   * }).bind({ a: 2 }, [1]);
   *
   * func(1); // 4
   * func(3); // 6
   */
	bind(context, args) {
		this.bindContext(context);
		this.bindArgs(args);

		return this;
	}
  
  /**
   * @method Function#bindArgs
   * @public
   * @param {(Array|Arguments)} args - Arguments to bind.
   * @returns {Function} Returns this.
   * @description Binds arguments in addition to already locked and bound ones.
   *
   * @example
   * const func = new Function((...args) => {
   *   let sum = 0;
   *
   *   for (let i = 0; i < args.length; i++) {
   *     sum += args[i];
   *   }
   *
   *   return sum;
   * });
   *
   * func(1, 2, 3); // 6
   *
   * func.bindArgs([4]);
   *
   * func(1, 2, 3); // 10
   *
   * func.bindArgs([5]);
   *
   * func(1, 2, 3); // 15
   */
	bindArgs(args) {
		const func = this.$$;

		func.args = func.args.concat(toArray(args));

		return this;
	}
  
  /**
   * @method Function#bindContext
   * @public
   * @param {*} context - Context to bind.
   * @returns {Function} Returns this.
   * @description Bind new context if it's not already locked.
   *
   * @example
   * const func = new Function(function () {
   *   return this.a;
   * }).bindContext({ a: 1 });
   *
   * func(); // 1
   *
   * func.bindContext({ a: 2 });
   *
   * func(); // 2
   */
	bindContext(context) {
		const func = this.$$;

		if (!func.contextLocked) {
			func.context = context;
		}

		return this;
	}

  /**
   * @method Function#call
   * @public
   * @param {*} context - Context to call with.
   * @param {...*} args - Arguments to call with.
   * @returns {*} Return of function call.
   * @description Synonym of Function#call.
   */
	call(context, ...args) {
    return NativeFunction.prototype.call.apply(this, arguments);
	}

  /**
   * @member Function#called
   * @public
   * @returns {Number} How many times the function was called.
   * @description Returns how many times the function was called.
   * 
   * @example
   * const func = new Function((a) => a + 1);
   * 
   * func();
   * func();
   * 
   * func.called // 2
   */
  get called() {
    return this.$$.called;
  }
  
  /**
   * @method Function#canBeCalled
   * @public
   * @param {Number} times - Number of maximum times the function is called (middlewares are also taken for a count).
   * @returns {Function} Returns this.
   * @description Method for limiting call times of function.
   * 
   * @example
   * const func = new Function((a) => a + 1)
   *   .canBeCalled(1);
   *   
   * func(1); // 2
   * func(1); // undefined
   */
	canBeCalled(times) {
		this.$$.canBeCalled = times;

		return this;
	}
  
  /**
   * @method Function#limitArgsTo
   * @public
   * @param {Number} number - Number of arguments to limit to.
   * @returns {Function} Returns this.
   * @description Built-in before middleware for limiting number of arguments
   * that is put to the end of before middlewares.
   *
   * @example
   * const func = new Function((a, b) => [a, b]);
   *
   * func(1, 2); // [1, 2]
   *
   * func.limitArgsTo(1);
   *
   * func(1, 2); // [1, undefined]
   */
  limitArgsTo(number) {
    return this.before((args) => args.slice(0, number), false);
  }

  /**
   * @method Function#lock
   * @public
   * @param {*} context - Context to lock.
   * @param {(Array|Arguments|*)} args - Arguments to lock.
   * @returns {Function} Returns this.
   * @description Composition of {@link Function#lockContext} and {@link Function#lockArgs}.
   *
   * @example
   * const func = new Function(function (a, b) {
   *   return this.a + a + b;
   * }).lock({ a: 2 }, [1]);
   *
   * func(1); // 4
   * func(3); // 6
   */
	lock(context, args) {
		this.lockContext(context);
		this.lockArgs(args);

		return this;
	}

  /**
   * @method Function#lockArgs
   * @public
   * @param {(Array|Arguments|*)} args - Arguments to lock.
   * @returns {Function} Returns this.
   * @description Erases bound arguments and adds new arguments to already locked ones.
   *
   * @example
   * const func = new Function((...args) => {
   *   let sum = 0;
   *
   *   for (let i = 0; i < args.length; i++) {
   *     sum += args[i];
   *   }
   *
   *   return sum;
   * });
   *
   * func(1, 2, 3); // 6
   *
   * func.lockArgs([4]);
   *
   * func(1, 2, 3); // 10
   *
   * func.bindArgs([6, 7]);
   * func.lockArgs([5]);
   *
   * func(1, 2, 3); // 15
   */
	lockArgs(args) {
		const func = this.$$;

		func.args = func.argsLocked = func.argsLocked.concat(toArray(args));

		return this;
	}

  /**
   * @method Function#lockContext
   * @public
   * @param {*} context - Context to lock.
   * @returns {Function} Returns this.
   * @description Locks context if it's not already locked.
   *
   * @example
   * const func = new Function(function () {
   *   return this.a;
   * }).lockContext({ a: 1 });
   *
   * func(); // 1
   *
   * func.lockContext({ a: 2 });
   *
   * func(); // 1
   */
	lockContext(context) {
		const func = this.$$;

		if (!func.contextLocked) {
			func.context = context;
			func.contextLocked = true;
		}

		return this;
	}

  /**
   * @method Function#timing
   * @public
   * @param {String} mark - Argument that is passed to console.time() and console.timeEnd().
   * By default name of the original function, or if it's not present, 'anonymous' is used.
   * @returns {Function} Returns this.
   * @description Built-in before and after middlewares for noting calling time.
   * In case of asynchronous functions it notes time between calling function and resolving or rejecting the result.
   *
   * @example
   * const func = new Function((a) => a + 1)
   *   .timing('plus 1');
   *
   * func(2); // plus 1: 0.010ms
   *
   * const async = new Function(() => new Promise(() => {
   *     setTimeout(resolve, 1000);
   *   }))
   *   .async()
   *   .timing();
   *
   * async();
   * // After 1 second...
   * // anonymous: 1000.010ms
   */
	timing(mark) {
		mark = !arguments.length ? this.$.name || 'anonymous' : String(mark);

		this.before((args) => {
			console.time(mark);

			return args;
		}, false);

		this.after((ret) => {
			console.timeEnd(mark);

			return ret;
		}, false);

		return this;
	}

  toString() {
    return NativeFunction.prototype.toString.call(this.$);
  }

  /**
   * @method Function#unbind
   * @public
   * @returns {Function} Returns this.
   * @description Composition of {@link Function#unbindContext} and {@link Function#unbindArgs}.
   *
   * @example
   * const func = new Function(function (a) {
   *   return this.foo + ' & ' +  a;
   * }).bind({ foo: 2 }, [1]);
   *
   * func(); // 2 & 1
   *
   * func.unbind();
   *
   * func(); // 'undefined & undefined'
   */
	unbind() {
		this.unbindContext();
		this.unbindArgs();

		return this;
	}

  /**
   * @method Function#unbindArgs
   * @public
   * @returns {Function} Returns this.
   * @description Erases all bound arguments.
   *
   * @example
   * const func = new Function((...args) => {
   *   let sum = 0;
   *
   *   for (let i = 0; i < args.length; i++) {
   *     sum += args[i];
   *   }
   *
   *   return sum;
   * }).bindArgs([4, 5]);
   *
   * func(1, 2, 3); // 15
   *
   * func.unbindArgs();
   *
   * func(1, 2, 3); // 6
   */
	unbindArgs() {
		const func = this.$$;

		func.args = func.argsLocked;

		return this;
	}

  /**
   * @method Function#unbindContext
   * @public
   * @returns {Function} Returns this.
   * @description Erases context if it's not locked.
   *
   * @example
   * const func = new Function(function () {
   *   return this.foo;
   * }).bindContext({ foo: 1 });
   *
   * func(); // 1
   *
   * func.unbindArgs();
   *
   * func(); // undefined
   */
	unbindContext() {
		const func = this.$$;

		if (!func.contextLocked) {
			func.context = null;
		}

		return this;
	}
}

constructors[1].push({
	check: isFunction,
	cls: Function
});

/**
 * @function callsMethod
 * @param {String} method - Method to call.
 * @param {(Array|Arguments|*)} args - Arguments to call the method with.
 * @returns {Function} Function that calls stated method with given arguments.
 * @description Function that returns the function
 * that calls stated method of its first argument with given arguments.
 */
export function callsMethod(method, args = []) {
  return function callsMethod(x) {
    return x[method].apply(x, toArray(args));
  };
}

/**
 * @function noop
 * @public
 * @returns {undefined}
 * @description Empty function.
 */
export function noop() {}

/**
 * @function self
 * @param {*} arg - Anything.
 * @returns {*} First argument itself.
 * @description Function that returns the first argument.
 *
 * @example
 * [1, 2].map(self);                     // [1, 2]
 * [1, 3, NaN, 0, 7, null].filter(self); // [1, 3, 7]
 */
export function self(arg) {
  return arg;
}

export default Function;
