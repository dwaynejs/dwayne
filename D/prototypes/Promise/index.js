import D from '../../';
import methods from '../../methods';
import { default as parent, transform } from '../Object';
import S from '../String';
import { defineProperties, validate } from '../../libs';

const secret = {};

const cls = /*typeof Promise !== 'undefined' ? Promise : */class Promise {
	constructor(func) {
		validate([func], ['function']);

		const hiddenPromise = {
			handled: false,
			status: 'pending'
		};
		const	onResolve = [];
		const onReject = [];

		defineProperties(this, {
			'get/set handled': {
				get() {
					return hiddenPromise.handled;
				},
				set({ secret: key }) {
					if (key === secret) {
						hiddenPromise.handled = true;
					}
				}
			},
			$$handle(status, f, resolve, reject, key) {
				if (key === secret) {
					const proxy = methods.isFunction(f) ? (value) => {
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
				if (err instanceof Promise) {
					return err.then((value) => {
						resolve(value);
					}, (err) => {
						reject(err);
					});
				}

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
				if (value instanceof Promise) {
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

	static all(array) {
		validate([array], ['array']);

		let length = array.length,
			toResolve = length;

		if (!length) {
			return Promise.resolve([]);
		}

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
	static race(array) {
		validate([array], ['array']);

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
		if (value instanceof Promise) {
			return value;
		}

		return new Promise((resolve) => {
			resolve(value);
		});
	}

	['catch'](onReject) {
		return resolveOrReject(this, null, onReject);
	}
	then(onResolve, onReject) {
		return resolveOrReject(this, onResolve, onReject);
	}
};

function resolveOrReject(promise, onResolve, onReject) {
	if (promise.status === 'pending') {
		return new cls((resolve, reject) => {
			promise.$$handle('reject', onReject, resolve, reject, secret);
			promise.$$handle('resolve', onResolve, resolve, reject, secret);
		});
	}

	promise.handled = { secret };

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

	if (!methods.isFunction(handler)) {
		return cls[method](value);
	}

	try {
		return cls.resolve(handler(value));
	} catch (err) {
		return cls.reject(err);
	}
}

D.Promise = cls;

export default cls;