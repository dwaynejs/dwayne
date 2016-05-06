import classes from '../../classes';
import { isFunction, isPromise, defineProperties, supportSymbol } from '../../libs';

const secret = {};

const iterator = supportSymbol && global.Symbol.iterator ? Symbol.iterator : Math.random().toString(36);

export class Promise {
	constructor(func) {
    if (!isFunction(func)) {
      throw new TypeError(`Promise resolver ${ Object.prototype.toString.call(func) } is not a function`);
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

    Object.defineProperty(this, '$', { value: {} });

		defineProperties(this.$, {
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
			func(resolve, reject);
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
				if (isPromise(value) || value instanceof Promise) {
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

      return new this((resolve, reject) => {
        let next = iterable.next();
        let i = 0;

        while (!next.done) {
          const promise = this.resolve(next.value);

          toResolve++;

          promise.then((value) => {
            toResolve--;
            array[i] = value;

            setTimeout(() => {
              if (next.done && !toResolve) {
                resolve(array);
              }
            }, 1);
          }, reject);

          i++;
          next = iterable.next();
        }

        if (!i) {
          return this.resolve([]);
        }
      });
    }

    const length = iterable.length;

    if (!length) {
			return this.resolve([]);
		}

    toResolve = length;

		return new this((resolve, reject) => {
      for (let i = 0; i < length; i++) {
        const promise = this.resolve(array[i]);

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

      return new this((resolve, reject) => {
        for (const promise of iterable) {
          promise.then(resolve, reject);
        }
      });
    }

		return new this((resolve, reject) => {
			for (let i = 0, length = array.length; i < length; i++) {
				array[i].then(resolve, reject);
			}
		});
	}
	static reject(value) {
		return new this((resolve, reject) => {
			reject(value);
		});
	}
	static resolve(value) {
		if (isPromise(value) || value instanceof this) {
			return value;
		}

		return new this((resolve) => {
			resolve(value);
		});
	}

	['catch'](onReject) {
		return resolveOrReject(this.$, null, onReject);
	}
	then(onResolve, onReject) {
		return resolveOrReject(this.$, onResolve, onReject);
	}
}

if (supportSymbol) {
  Promise.prototype[Symbol.toStringTag] = 'Promise';
}

function resolveOrReject(promise, onResolve, onReject) {
	if (promise.status === 'pending') {
		return new Promise((resolve, reject) => {
			promise.handle('reject', onReject, resolve, reject, secret);
			promise.handle('resolve', onResolve, resolve, reject, secret);
		});
	}

	promise.handled = secret;

	const { value } = promise;

	let method;
	let handler;

	if (promise.status === 'resolved') {
		method = 'resolve';
		handler = onResolve;
	} else {
		method = 'reject';
		handler = onReject;
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

classes.Promise = Promise;

export const all = Promise.all.bind(Promise);
export const race = Promise.race.bind(Promise);
export const reject = Promise.reject.bind(Promise);
export const resolve = Promise.resolve.bind(Promise);

export default Promise;
