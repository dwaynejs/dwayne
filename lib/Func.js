/**
 * @module Func
 * @private
 * @mixin
 * @description Exports Func class.
 */

import Super from './Super';
import Promise from './Promise';
import constructors from './constants/constructors';
import { isFunction, validate, toArray, Symbol, defineProperties, iterate } from './helpers';

/**
 * @callback BeforeMiddleware
 * @param {Array} args - Previous arguments.
 * @param {Func} func - This function.
 * @returns {Array} - New arguments.
 */

/**
 * @callback AfterMiddleware
 * @param {*} returnValue - Previous return value.
 * @param {Func} func - This function.
 * @returns {*} - New return value.
 */

/**
 * @class Func
 * @extends Super
 * @public
 * @param {Function} [func = function () {}] - Function to wrap.
 * @returns {Func} Instance of Func.
 * @description A wrap of a function.
 *
 * @example
 * const func = new Func(Math.max);
 *
 * func(1, 4, -2, 5); // 5
 */
export class Func extends Super {
  constructor(func = () => {}) {
    super();

    if (func instanceof Func) {
      return func;
    }

    function proxy() {
      if (++proxy.$$.called < proxy.$$.canBeCalled) {
        const { before, after, sync, contextLocked } = proxy.$$;
        let { context, args } = proxy.$$;
        let ret;

        context = contextLocked ? context : context || this;
        args = args.concat(toArray(arguments));

        if (sync) {
          iterate(before, (middleware) => {
            args = middleware.call(context, toArray(args), proxy);
          });

          ret = func.apply(context, toArray(args));

          iterate(after, (middleware) => {
            ret = middleware.call(context, ret, proxy);
          });

          return ret;
        }

        let promise = Promise.resolve(args);

        iterate(before, (middleware) => {
          promise = promise.then((args) => middleware.call(context, toArray(args), proxy));
        });

        promise = promise.then((args) => func.apply(context, toArray(args)));

        iterate(after, (middleware) => {
          promise = promise.then((ret) => middleware.call(context, ret, proxy));
        });

        return promise;
      }
    }

    /**
     * @member {Object} Func#$$
     * @type {Object}
     * @protected
     * @property {Array} after - After middleware array.
     * @property {Array} args - Locked and bound arguments.
     * @property {Array} argsLocked - Locked arguments.
     * @property {Array} before - Before middleware array.
     * @property {Number} called - How many times the function was called.
     * @property {Number} canBeCalled - How many times the function can be actually called.
     * @property {*} context - Locked or bound context.
     * @property {Boolean} contextLocked - Is context locked or not.
     * @property {Boolean} sync - Is function synchronous or not.
     * @description Config parameters.
     */
    Object.defineProperty(proxy, '$$', {
      value: {
        after: [],
        args: [],
        argsLocked: [],
        before: [],
        called: 0,
        canBeCalled: Infinity,
        context: null,
        contextLocked: false,
        sync: true
      }
    });

    /**
     * @member {Function} Func#$
     * @type {Function}
     * @public
     * @description Original function.
     */
    Object.defineProperty(proxy, '$', { value: func });
    Object.setPrototypeOf(proxy, Func.prototype);

    return proxy;
  }

  /**
   * @method Func#after
   * @public
   * @param {AfterMiddleware} middleware - After middleware.
   * @param {Boolean|*} [afterAll = true] - Boolean parameter where to put middleware.
   * Truthy parameter stands for "to the end" and falsey for "to the beginning".
   * @returns {Func} Returns this.
   * @description Adds after middleware.
   *
   * @example
   * const func = new Func((a) => a + 1)
   *   .after((result) => result * result);
   *
   * func(4);  // 25
   * func(-4); // 9
   */
  after(middleware, afterAll = true) {
    validate([middleware], ['function'], 'Func#after');

    const { after } = this.$$;

    if (afterAll) {
      after.push(middleware);
    } else {
      after.unshift(middleware);
    }

    return this;
  }

  /**
   * @method Func#apply
   * @public
   * @param {*} [context] - Context to call with.
   * @param {(Array|Arguments)} [args] - Arguments to call with.
   * @returns {*} Return of function call.
   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Function/apply
   * @description Synonym for
   * [Function#apply]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Function/apply}.
   */
  apply(context, args) {
    return (() => {}).apply.apply(this, arguments);
  }

  /**
   * @method Func#async
   * @public
   * @param {Boolean|*} [condition] - If the function should be synchronous or not.
   * @returns {Func} Returns this.
   * @description If the function should be synchronous or not.
   *
   * @example
   * const func = new Func((a) => a + 1).async();
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
   * @method Func#before
   * @public
   * @param {BeforeMiddleware} middleware - Before middleware.
   * @param {Boolean|*} [beforeAll = true] - Boolean parameter where to put middleware.
   * Truthy parameter stands for "to the beginning" and falsey for "to the end".
   * @returns {Func} Returns this.
   * @description Adds before middleware.
   *
   * @example
   * const func = new Func((a) => a + 1)
   *   .before(([arg]) => [arg * arg]);
   *
   * func(4); // 17
   * func(3); // 10
   */
  before(middleware, beforeAll = true) {
    validate([middleware], ['function'], 'Func#before');

    const { before } = this.$$;

    if (beforeAll) {
      before.unshift(middleware);
    } else {
      before.push(middleware);
    }

    return this;
  }

  /**
   * @method Func#bind
   * @public
   * @param {*} context - Context to bind.
   * @param {(Array|Arguments|*)} args - Arguments to bind.
   * @returns {Func} Returns this.
   * @description Composition of {@link Func#bindContext} and {@link Func#bindArgs}.
   *
   * @example
   * const func = new Func(function (a, b) {
   *   return this.a + a + b;
   * }).bind({ a: 2 }, [1]);
   *
   * func(1); // 4
   * func(3); // 6
   */
  bind(context, args) {
    return this
      .bindContext(context)
      .bindArgs(args);
  }

  /**
   * @method Func#bindArgs
   * @public
   * @param {(Array|Arguments)} args - Arguments to bind.
   * @returns {Func} Returns this.
   * @description Binds arguments in addition to already locked and bound ones.
   *
   * @example
   * const func = new Func((...args) => {
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
   * @method Func#bindContext
   * @public
   * @param {*} context - Context to bind.
   * @returns {Func} Returns this.
   * @description Bind new context if it's not already locked.
   *
   * @example
   * const func = new Func(function () {
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
   * @method Func#call
   * @public
   * @param {*} [context] - Context to call with.
   * @param {...*} [args] - Arguments to call with.
   * @returns {*} Return of function call.
   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Function/call
   * @description Synonym for
   * [Function#call]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Function/call}.
   */
  call(context, ...args) {
    return (() => {}).call.apply(this, arguments);
  }

  /**
   * @member {Number} Func#called
   * @public
   * @readonly
   * @description Returns how many times the function was called.
   *
   * @example
   * const func = new Func((a) => a + 1);
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
   * @method Func#canBeCalled
   * @public
   * @param {Number} times - Number of maximum times the function is called (middlewares are also taken for a count).
   * @returns {Func} Returns this.
   * @description Method for limiting call times of function.
   *
   * @example
   * const func = new Func((a) => a + 1)
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
   * @method Func#limitArgsTo
   * @public
   * @param {Number} number - Number of arguments to limit to.
   * @returns {Func} Returns this.
   * @description Built-in before middleware for limiting number of arguments
   * that is put to the end of before middlewares.
   *
   * @example
   * const func = new Func((a, b) => [a, b]);
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
   * @method Func#lock
   * @public
   * @param {*} context - Context to lock.
   * @param {(Array|Arguments|*)} args - Arguments to lock.
   * @returns {Func} Returns this.
   * @description Composition of {@link Func#lockContext} and {@link Func#lockArgs}.
   *
   * @example
   * const func = new Func(function (a, b) {
   *   return this.a + a + b;
   * }).lock({ a: 2 }, [1]);
   *
   * func(1); // 4
   * func(3); // 6
   */
  lock(context, args) {
    return this
      .lockContext(context)
      .lockArgs(args);
  }

  /**
   * @method Func#lockArgs
   * @public
   * @param {(Array|Arguments|*)} args - Arguments to lock.
   * @returns {Func} Returns this.
   * @description Erases bound arguments and adds new arguments to already locked ones.
   *
   * @example
   * const func = new Func((...args) => {
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
   * @method Func#lockContext
   * @public
   * @param {*} context - Context to lock.
   * @returns {Func} Returns this.
   * @description Locks context if it's not already locked.
   *
   * @example
   * const func = new Func(function () {
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
   * @method Func#timing
   * @public
   * @param {String} mark - Argument that is passed to console.time() and console.timeEnd().
   * By default name of the original function, or if it's not present, 'anonymous' is used.
   * @returns {Func} Returns this.
   * @description Built-in before and after middlewares for noting calling time.
   * In case of asynchronous functions it notes time between calling function and resolving or rejecting the result.
   *
   * @example
   * const func = new Func((a) => a + 1)
   *   .timing('plus 1');
   *
   * func(2); // plus 1: 0.010ms
   *
   * const async = new Func(() => new Promise(() => {
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
    mark = arguments.length ? String(mark) : this.$.name || 'anonymous';

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
    return (() => {}).toString.call(this.$);
  }

  /**
   * @method Func#unbind
   * @public
   * @returns {Func} Returns this.
   * @description Composition of {@link Func#unbindContext} and {@link Func#unbindArgs}.
   *
   * @example
   * const func = new Func(function (a) {
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
    return this
      .unbindContext()
      .unbindArgs();
  }

  /**
   * @method Func#unbindArgs
   * @public
   * @returns {Func} Returns this.
   * @description Erases all bound arguments.
   *
   * @example
   * const func = new Func((...args) => {
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
   * @method Func#unbindContext
   * @public
   * @returns {Func} Returns this.
   * @description Erases context if it's not locked.
   *
   * @example
   * const func = new Func(function () {
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

defineProperties(Func.prototype, {
  [Symbol.toStringTag]: 'Func'
});

constructors[1].push({
  check: isFunction,
  cls: Func
});

/**
 * @function method
 * @public
 * @param {String} method - Method to call.
 * @param {(Array|Arguments|*)} args - Arguments to call the method with.
 * @returns {Function} Function that calls stated method with given arguments.
 * @description Function that returns the function
 * that calls stated method of its first argument with given arguments.
 *
 * @example
 * [1.2345, 2.789, 3.14].map(method('toFixed', [2])); // ['1.23', '2.79', '3.14']
 */
export function method(method, args = []) {
  return (x) => x[method].apply(x, toArray(args));
}

/**
 * @function noop
 * @public
 * @returns {void}
 * @description Empty function.
 */
export function noop() {}

/**
 * @function self
 * @public
 * @returns {*} First argument itself.
 * @description Function that returns the first argument.
 *
 * @example
 * [1, 2].map(self);                     // [1, 2]
 * [1, 3, NaN, 0, 7, null].filter(self); // [1, 3, 7]
 */
export function self() {
  return arguments[0];
}

export default Func;
