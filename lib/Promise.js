/**
 * @module Promise
 * @private
 * @mixin
 * @description Exports Promise class.
 */

import { isFunction, defineProperties, supportSymbol } from './helpers';

const secret = {};

const iterator = supportSymbol && global.Symbol.iterator ? global.Symbol.iterator : Math.random().toString(36);

/**
 * @typedef {Promise} AbortablePromise
 * @public
 * @description Promise that could be aborted.
 */

/**
 * @member {Function} AbortablePromise#abort
 * @public
 * @returns {AbortablePromise} Returns this.
 * @description Abort method.
 */

/**
 * @callback PromiseThen
 * @public
 * @param {*} value - Promise value.
 */

/**
 * @callback PromiseCatch
 * @public
 * @param {(Error|*)} - Promise error.
 */

/**
 * @callback PromiseResolve
 * @public
 * @param {*} - Function for resolving a promise.
 */

/**
 * @callback PromiseReject
 * @public
 * @param {(Error|*)} - Function for rejecting a promise.
 */

/**
 * @callback PromiseResolver
 * @public
 * @param {PromiseResolve} - Function for resolving the promise.
 * @param {PromiseReject} - Function for rejecting the promise.
 */

export class Promise {
  /**
   * @class Promise
   * @public
   * @param {PromiseResolver} resolver - Promise resolver.
   * @returns {Promise} Instance of Promise.
   * @description
   * [Promise API]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise}.
   *
   * @example
   * new Promise((resolve) => {
   *   resolve(1);
   * }).then((value) => {
   *   console.log(value); // 1
   * });
   */
	constructor(resolver) {
    if (!isFunction(resolver)) {
      throw new TypeError(`Promise resolver ${ Object.prototype.toString.call(resolver) } is not a function`);
    }

    let hiddenStatus;
    let hiddenValue;
    
		const	onResolve = [];
		const onReject = [];
    const realPromise = this;
    const hiddenPromise = {
      handled: false,
      get status() {
        return hiddenStatus;
      },
      set status(value) {
        hiddenStatus = value;
        realPromise.status = value;
      },
      get value() {
        return hiddenValue;
      },
      set value(val) {
        hiddenValue = val;
        realPromise.value = val;
      }
    };

    hiddenPromise.status = 'pending';
    hiddenPromise.value = undefined;

    /**
     * @typedef {Object} hiddenPromise
     * @private
     */

    /**
     * @member {(Boolean|Object)} hiddenPromise#handled
     * @private
     * @description If the promise is handled or not.
     */

    /**
     * @member {('pending'|'resolved'|'rejected')} hiddenPromise#status
     * @private
     * @description Status of the promise.
     */

    /**
     * @member {*} hiddenPromise#value
     * @private
     * @description Value of the promise.
     */

    /**
     * @member {Function} hiddenPromise#handle
     * @private
     * @param {('reject'|'resolve')} event - Type of the event to handle.
     * @param {Function} handler - Handler itself.
     * @param {Function} resolve - Resolve function.
     * @param {Function} reject - Reject function.
     * @param {Object} secret - Secret.
     * @description Private method for handling promises.
     */

    /**
     * @member {hiddenPromise} Promise#$$
     * @protected
     */
    this.$$ = {};
		defineProperties(this.$$, {
			'get/set handled': {
				get() {
					return hiddenPromise.handled;
				},
				set(key) {
					if (key === secret) {
						hiddenPromise.handled = true;
					}
				}
			},
			handle(status, f, resolve, reject, key) {
				if (key === secret) {
					const proxy = isFunction(f) ? (value) => {
						try {
							resolve(f(value));
						} catch (err) {
							return reject(err);
						}
					} : null;

					if (status === 'resolve') {
						onResolve.push(proxy || ((value) => resolve(value)));
					} else if (status === 'reject') {
						onReject.push(proxy || ((err) => reject(err)));
					}
				}
			},
			'get status'() {
        return hiddenPromise.status;
      },
			'get value'() {
				return hiddenPromise.value;
			}
		});

		try {
      resolver(resolve, reject);
		} catch (err) {
			reject(err);
		}

		function reject(err) {
			if (hiddenPromise.status === 'pending') {
				hiddenPromise.status = 'rejected';
				hiddenPromise.value = err;

				for (let i = 0, length = onReject.length; i < length; i++) {
					hiddenPromise.handled = true;

					onReject[i](err);
				}

				setTimeout(() => {
					if (!hiddenPromise.handled) {
						console.error('%s %o', 'Uncaught (in promise)', err);
					}
				}, 1);
			}
		}
		function resolve(value) {
			if (hiddenPromise.status === 'pending') {
				if (value && isFunction(value.then)) {
					return value.then((value) => {
						resolve(value);
					}, (err) => {
						reject(err);
					});
				}

				hiddenPromise.status = 'resolved';
				hiddenPromise.value = value;

				for (let i = 0, length = onResolve.length; i < length; i++) {
					hiddenPromise.handled = true;

					onResolve[i](value);
				}
			}
		}
	}

  /**
   * @method Promise.all
   * @public
   * @param {(Array|Arguments|Iterable)} iterable - Iterable object to get promises iterating over it.
   * @returns {Promise} New instance of Promise.
   * @description Returns Promise that is resolved with an array of resolved values of all promises or
   * Promise that is rejected with first error.
   *
   * @example
   * Promise.all([
   *   new Promise((resolve) => resolve(1)),
   *   Promise.resolve(2)
   * ]).then((values) => {
   *   console.log(values); // [1, 2]
   * });
   *
   * Promise.all([
   *   new Promise((resolve) => resolve(1)),
   *   Promise.reject(new Error('error'))
   * ]).catch((error) => {
   *   console.log(error); // Error: error
   * });
   */
	static all(iterable) {
    const array = [];

    let toResolve = 0;

    if (iterable[iterator]) {
      iterable = iterable[iterator]();

      return new Promise((resolve, reject) => {
        let next;
        let i = 0;

        while (!(next = iterable.next()).done) {
          const promise = Promise.resolve(next.value);

          toResolve++;

          ((i) => {
            promise.then((value) => {
              toResolve--;
              array[i] = value;

              setTimeout(() => {
                if (next.done && !toResolve) {
                  resolve(array);
                }
              }, 1);
            }, reject);
          })(i++);
        }

        if (!i) {
          return Promise.resolve([]);
        }
      });
    }

    const length = iterable.length;

    if (!length) {
			return Promise.resolve([]);
		}

    toResolve = length;

		return new Promise((resolve, reject) => {
      for (let i = 0; i < length; i++) {
        const promise = Promise.resolve(array[i]);

        promise.then((value) => {
          toResolve--;
          array[i] = value;

          if (!toResolve) {
            resolve(array);
          }
        }, reject);
      }
		});
	}

  /**
   * @method Promise.race
   * @public
   * @param {(Array|Arguments|Iterable)} iterable - Iterable object to get promises iterating over it.
   * @returns {Promise} New instance of Promise.
   * @description Returns Promise with first resolved value or first rejected error.
   *
   * @example
   * Promise.race([
   *   new Promise((resolve) => setTimeout(() => {
   *     resolve(1);
   *   }, 100)),
   *   new Promise((resolve) => setTimeout(() => {
   *     resolve(2);
   *   }, 50))
   * ]).then((value) => {
   *   console.log(value); // 2
   * });
   *
   * Promise.all([
   *   new Promise((reject) => setTimeout(() => {
   *     resolve(1);
   *   }, 100)),
   *   new Promise((resolve, reject) => setTimeout(() => {
   *     reject(new Error('error'));
   *   }, 50))
   * ]).catch((error) => {
   *   console.log(error); // Error: error
   * });
   */
	static race(iterable) {
    const array = [];

    if (iterable[iterator]) {
      iterable = iterable[iterator]();

      return new Promise((resolve, reject) => {
        let next;

        while (!(next = iterable.next()).done) {
          next.value.then(resolve, reject);
        }
      });
    }

		return new Promise((resolve, reject) => {
			for (let i = 0, length = array.length; i < length; i++) {
				array[i].then(resolve, reject);
			}
		});
	}

  /**
   * @method Promise.reject
   * @public
   * @param {*} [value] - Value to reject.
   * @returns {Promise} New instance of Promise.
   * @description Returns instantly rejected Promise with given value.
   *
   * @example
   * Promise.reject(new Error('error')).catch((err) => {
   *   console.log(error); // Error: error
   * });
   */
	static reject(value) {
		return new Promise((resolve, reject) => {
			reject(value);
		});
	}

  /**
   * @method Promise.resolve
   * @public
   * @param {(*|Promise)} [value] - Value or Promise to resolve.
   * @returns {(Promise|Thenable)} - If the argument is Thenable then returns itself and if not returns Promise.
   * @description Resolves not-Thenable objects and returns Thenable itself if the argument is Thenable.
   *
   * @example
   * Promise.resolve(1).then((value) => {
   *   console.log(value); // 1
   * });
   *
   * Promise.resolve(Promise.resolve(1)).then((value) => {
   *   console.log(value); // 1
   * });
   */
	static resolve(value) {
    if (value && isFunction(value.then)) {
			return value;
		}

		return new Promise((resolve) => {
			resolve(value);
		});
	}

  /**
   * @method Promise#catch
   * @public
   * @param {PromiseCatch} [onRejected] - Function that is called when the promise is rejected.
   * @returns {Promise} New instance of Promise.
   * @description Method to catch errors inside previous promises.
   *
   * @example
   * Promise.reject(new Error('error')).catch((err) => {
   *   console.log(err); // Error: error
   * });
   */
	catch(onRejected) {
		return resolveOrReject(this.$$, null, onRejected);
	}

  /**
   * @method Promise#then
   * @public
   * @param {?PromiseThen} [onResolved] - Function that is called when the promise is resolved.
   * @param {?PromiseCatch} [onRejected] - Function that is called when the promise is rejected.
   * @returns {Promise} New instance of Promise.
   * @description Method for chaining promises.
   *
   * @example
   * Promise.resolve(1).then((value) => {
   *   console.log(value); // 1
   * });
   */
	then(onResolved, onRejected) {
		return resolveOrReject(this.$$, onResolved, onRejected);
	}
}

if (supportSymbol) {
  Promise.prototype[Symbol.toStringTag] = 'Promise';
}

/**
 * @function resolveOrReject
 * @private
 * @param {hiddenPromise} promise
 * @param {?PromiseThen} onResolved - Resolve function.
 * @param {?PromiseCatch} onRejected - Reject function.
 * @returns {Promise} New instance of Promise.
 */
function resolveOrReject(promise, onResolved, onRejected) {
	if (promise.status === 'pending') {
		return new Promise((resolve, reject) => {
			promise.handle('reject', onRejected, resolve, reject, secret);
			promise.handle('resolve', onResolved, resolve, reject, secret);
		});
	}

	promise.handled = secret;

	const { value } = promise;

	let method;
	let handler;

	if (promise.status === 'resolved') {
		method = 'resolve';
		handler = onResolved;
	} else {
		method = 'reject';
		handler = onRejected;
	}

	if (!isFunction(handler)) {
		return Promise[method](value);
	}

	try {
		return Promise.resolve(handler(value));
	} catch (err) {
		return Promise.reject(err);
	}
}

/**
 * @function promise
 * @public
 * @param {PromiseResolver} resolver - Passed to the Promise#constructor.
 * @returns {Promise} New instance of Promise.
 * @description Simple wrap of [new Switcher(...)]{@link Promise}.
 */
export function promise(resolver) {
  return new Promise(resolver);
}

/**
 * @function all
 * @public
 * @description Synonym of {@link Promise.all}.
 */
export const all = Promise.all;

/**
 * @function race
 * @public
 * @description Synonym of {@link Promise.race}.
 */
export const race = Promise.race;

/**
 * @function reject
 * @public
 * @description Synonym of {@link Promise.reject}.
 */
export const reject = Promise.reject;

/**
 * @function resolve
 * @public
 * @description Synonym of {@link Promise.resolve}.
 */
export const resolve = Promise.resolve;

export default Promise;
