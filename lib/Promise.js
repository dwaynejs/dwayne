/**
 * @module Promise
 * @private
 * @mixin
 * @description Exports Promise class.
 */

import { isFunction, defineProperties, Symbol } from './helpers';

/**
 * @callback onFulfilledOrRejected
 * @public
 * @param {*} value - Promise value.
 * @param {Boolean} success - If the previous promise is fulfilled it's true and false if rejected.
 */

/**
 * @callback onRejected
 * @public
 * @param {Error|*} err - Promise error.
 */

/**
 * @callback onFulfilled
 * @public
 * @param {*} value - Promise value.
 */

const secret = {};
const iterator = Symbol.iterator;

/**
 * @class Promise
 * @public
 * @param {Function} executor - Function that takes two arguments: resolve and reject functions.
 * Call the resolve function when you need to fulfill the promise and call the reject one
 * when you need to reject it.
 * @returns {Promise} Instance of Promise.
 * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise
 * @description Class with almost identical API to
 * [ES6 Promise]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise}.
 * There is a couple differences: set Promise.onError to a function with which you want to
 * subscribe to a promise error and set Promise.onUnhandledRejection to a function with which
 * you want to subscribe to an unhandled error
 * (defaults to console.error.bind(console, '%s %o', 'Uncaught (in promise)')).
 */
class Promise {
  static onError = null;
  static onUnhandledRejection = console.error.bind(console, '%s %o', 'Uncaught (in promise)');

  constructor(executor) {
    if (!isFunction(executor)) {
      throw new TypeError(`Promise resolver ${ {}.toString.call(executor) } is not a function`);
    }

    let hiddenStatus;
    let hiddenValue;

    const	onFulfill = [];
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
     * @property {Boolean|Object} handled - If the promise is handled or not.
     * @property {'pending'|'fulfilled'|'rejected'} status - Status of the promise.
     * @property {*} value - Value of the promise.
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
    defineProperties(this.$$ = {}, {
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
              reject(err);
            }
          } : null;

          if (status === 'resolve') {
            onFulfill.push(proxy || ((value) => resolve(value)));
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
      executor(resolve, reject);
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

        const {
          onUnhandledRejection,
          onError
        } = Promise;

        if (isFunction(onError)) {
          onError(err);
        }

        setTimeout(() => {
          if (!hiddenPromise.handled && isFunction(onUnhandledRejection)) {
            onUnhandledRejection(err);
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

        hiddenPromise.status = 'fulfilled';
        hiddenPromise.value = value;

        for (let i = 0, length = onFulfill.length; i < length; i++) {
          hiddenPromise.handled = true;

          onFulfill[i](value);
        }
      }
    }
  }

  /**
   * @method Promise.all
   * @param {(Array|Iterable).<Promise|*>} iterable - Iterable object (like array) of promises
   * or any values.
   * @returns {Promise} New instance of Promise.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
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
        const promise = Promise.resolve(iterable[i]);

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
   * @param {(Array|Iterable).<Promise|*>} iterable - Iterable object (like array) of promises
   * or any values.
   * @returns {Promise} New instance of Promise.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race
   */
  static race(iterable) {
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
      for (let i = 0, length = iterable.length; i < length; i++) {
        iterable[i].then(resolve, reject);
      }
    });
  }

  /**
   * @method Promise.reject
   * @param {*} value - Value to reject.
   * @returns {Promise} New instance of Promise.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject
   */
  static reject(value) {
    return new Promise((resolve, reject) => {
      reject(value);
    });
  }

  /**
   * @method Promise.resolve
   * @param {Promise|Thenable|*} value - Promise, thenable or any value to resolve.
   * @returns {Promise} New instance of Promise.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve
   */
  static resolve(value) {
    if (value && isFunction(value.then)) {
      return value;
    }

    return new Promise((resolve) => {
      resolve(value);
    });
  }

  abort() {}

  /**
   * @method Promise#catch
   * @param {onRejected} onRejected - onRejected callback.
   * @returns {Promise} New instance of Promise.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch
   */
  catch(onRejected) {
    return this.then(null, onRejected);
  }

  /**
   * @method Promise#finally
   * @public
   * @param {onFulfilledOrRejected} onFulfilledOrRejected - onFulfilledOrRejected callback.
   * @returns {Promise}
   * @description Method for catching both fulfilled and rejected promises.
   *
   * @example
   * spinner.show();
   * fetchData()
   *   .then((data) => {
   *     // do something with data
   *   })
   *   .catch((err) => {
   *     // handle error somehow
   *   })
   *   .finally(() => {
   *     spinner.hide();
   *   });
   */
  finally(onFulfilledOrRejected) {
    const isFunc = isFunction(onFulfilledOrRejected);

    return this.then((value) => (
      isFunc
        ? onFulfilledOrRejected(value, true)
        : value
    ), (err) => (
      isFunc
        ? onFulfilledOrRejected(err, false)
        : Promise.reject(err)
    ));
  }

  /**
   * @method Promise#then
   * @param {onFulfilled} onFulfilled - onFulfilled callback.
   * @param {onRejected} onRejected - onRejected callback.
   * @returns {Promise} New instance of Promise.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then
   */
  then(onFulfilled, onRejected) {
    const promise = this.$$;

    if (promise.status === 'pending') {
      return new Promise((resolve, reject) => {
        promise.handle('reject', onRejected, resolve, reject, secret);
        promise.handle('resolve', onFulfilled, resolve, reject, secret);
      });
    }

    promise.handled = secret;

    const { value } = promise;

    let method;
    let handler;

    if (promise.status === 'fulfilled') {
      method = 'resolve';
      handler = onFulfilled;
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
}

defineProperties(Promise.prototype, {
  [Symbol.toStringTag]: 'Promise'
});

export { Promise };
