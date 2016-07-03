/**
 * @module Promise
 * @private
 * @mixin
 * @description Exports Promise class.
 */

import { isFunction, defineProperties, supportSymbol } from './helpers';

const secret = {};

const iterator = supportSymbol && global.Symbol.iterator ? global.Symbol.iterator : Math.random().toString(36);

export class Promise {
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

	static reject(value) {
		return new Promise((resolve, reject) => {
			reject(value);
		});
	}

	static resolve(value) {
    if (value && isFunction(value.then)) {
			return value;
		}

		return new Promise((resolve) => {
			resolve(value);
		});
	}

  abort() {}

	catch(onRejected) {
		return resolveOrReject(this.$$, null, onRejected);
	}

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

export default Promise;
