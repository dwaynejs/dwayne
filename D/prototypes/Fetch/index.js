import D from '../../';
import { default as parent, transform } from '../Object';
import Arr from '../Array';
import Promise from '../Promise';
import Str from '../String';
import { isFunction, isString, assign } from '../../libs';
import constructUrl from './construct-url';
import parseHeaders from './parse-headers';
import transformData from './transform-data';

import axios from 'axios';

window.top.axios = axios;

const defaults = {
	after: [],
	auth: {
		username: '',
		password: ''
	},
	baseURL: window.location.origin,
	before: [],
	headers: {},
	method: 'get',
	params: {},
	responseType: '',
	query: {},
	timeout: 0,
	url: '',
	withCredentials: false
};
const uploadMethods = new Arr(['post', 'put']);

export class Fetch extends parent {
	constructor(config = {}) {
		super();

		function fetch(url, config) {
			return fetch.request(url, config);
		}

		const conf = assign({}, defaults, config);
    const headers = conf.headers = assign({}, conf.headers);

		conf.after = [];
		conf.auth = assign({}, conf.auth);
		conf.before = [];
    conf.params = assign({}, conf.params);
    conf.query = assign({}, conf.query);
    
    for (const header in headers) {
      if (headers.hasOwnProperty(header)) {
        headers[header] = headers[header].slice();
      }
    }

		Object.defineProperty(fetch, '$', { value: conf });
		Object.setPrototypeOf(fetch, Fetch.prototype);

		return fetch;
	}

	after(onResolve, onReject) {
		this.$.after.push({ onResolve, onReject });

		return this;
	}
	before(onResolve, onReject) {
		this.$.before.push({ onResolve, onReject });

		return this;
	}
	config(f) {
		const config = this.$;

		if (!arguments.length) {
			return config;
		}

		f = transform(f);

		if (isFunction(f)) {
			f(config);
		} else {
			assign(config, f);
		}

		return this;
	}
	'delete'(url, config = {}) {
		return this.request(url, assign({ method: 'delete' }, config));
	}
	get(url, config = {}) {
		return this.request(url, assign({ method: 'get' }, config));
	}
	head(url, config = {}) {
		return this.request(url, assign({ method: 'head' }, config));
	}
	headers(header, value) {
		const { headers } = this.$;

		if (arguments.length >= 1) {
			header = { [header]: value };
		}

		for (const key in header) {
			if (header.hasOwnProperty(key)) {
				headers[key] = (headers[key] || []).push(header[key]);
			}
		}

		return this;
	}
	instance(config = {}) {
    const conf = assign({}, this.$, config);
    const headers = conf.headers = assign({}, conf.headers);
    
    conf.after = assign([], conf.after);
    conf.auth = assign({}, conf.auth);
    conf.before = assign([], conf.before);
    conf.params = assign({}, conf.params);
    conf.query = assign({}, conf.query);
    
    for (const header in headers) {
      if (headers.hasOwnProperty(header)) {
        headers[header] = headers[header].slice();
      }
    }

		return new Fetch(assign(conf, config));
	}
	patch(url, data = {}, config = {}) {
		if (!isString(url)) {
			config = data;
			data = url;
			url = null;
		}

		return this.request(url, assign({ method: 'patch', data }, config));
	}
	post(url, data = {}, config = {}) {
		if (!isString(url)) {
			config = data;
			data = url;
			url = null;
		}

		return this.request(url, assign({ method: 'post', data }, config));
	}
	put(url, data = {}, config = {}) {
		if (!isString(url)) {
			config = data;
			data = url;
			url = null;
		}

		return this.request(url, assign({ method: 'put', data }, config));
	}
	request(url, config = {}) {
		if (arguments.length === 1 && !isString(url)) {
			config = url;
		}

		const urlConf = isString(url) ? { url } : {};
		const conf = assign({}, this.$, urlConf, config);

		const { before } = conf;

		let promise = Promise.resolve(conf);

		for (let i = 0, length = before.length; i < length; i++) {
			const { onResolve, onReject } = before[i];
			
			promise = promise.then((value) => {
				if (!isFunction(onResolve)) {
					return value;
				}

				return new Promise((resolve, reject) => {
					onResolve(conf, function (err) {
						if (arguments.length) {
							return reject(err);
						}

						resolve();
					});
				});
			}, (err) => {
				if (!isFunction(onReject)) {
					return Promise.reject(err);
				}

				return new Promise((resolve, reject) => {
					onReject(conf, function (err) {
						if (arguments.length) {
							return reject(err);
						}

						resolve();
					});
				});
			});
		}

		promise = promise.then(() => {
			return new Promise((resolve, reject) => {
				const {
					after,
					auth: { username, password },
					baseURL,
					data: notTransformedData,
					headers,
					method,
					onprogress,
					params,
					responseType,
					query,
					timeout,
					url: URL,
					withCredentials
				} = conf;

				let xhr = new XMLHttpRequest();
				xhr.responseType = responseType;
				xhr.timeout = timeout;
				xhr.withCredentials = !!withCredentials;

				if (onprogress) {
					if (uploadMethods.keyOf(method.toUpperCase()) !== null) {
						xhr.upload.onprogress = onprogress;
					} else {
						xhr.onprogress = onprogress;
					}
				}
        
        conf.constructedUrl = constructUrl(baseURL, URL, params, query);
        conf.constructedData = transformData(transform(notTransformedData), headers);

				xhr.open(method.toUpperCase(), conf.constructedUrl, true, username, password);

				for (const header in headers) {
					if (headers.hasOwnProperty(header)) {
						xhr.setRequestHeader(new Str(header).toCapitalCase().replace(/\s+/g, '-').$, headers[header].join(', '));
					}
				}

				promise.abort = function abort() {
					xhr.abort();

					return this;
				};

				xhr.onabort = () => {
					reject('Request was aborted');

					xhr = null;
				};

				xhr.onerror = () => {
					reject(new Error('Network error'));

					xhr = null;
				};

				xhr.ontimeout = () => {
					reject(new Error('Request time exceeded'));

					xhr = null;
				};

				xhr.onreadystatechange = () => {
					if (!xhr || !xhr.status || xhr.readyState !== 4) {
						return;
					}

					const response = {
						config: conf,
						data: !config.responseType || config.responseType === 'text' ? xhr.responseText : xhr.response,
						headers: parseHeaders(xhr.getAllResponseHeaders()),
						status: xhr.status === 1223 ? 204 : xhr.status,
						statusText: xhr.status === 1223 ? 'No Content' : xhr.statusText,
						xhr
					};

					let promise = Promise.resolve(response);

					for (let i = 0, length = after.length; i < length; i++) {
						const { onResolve, onReject } = after[i];
						
						promise = promise.then((value) => {
							if (!isFunction(onResolve)) {
								return value;
							}

							return new Promise((resolve, reject) => {
								onResolve(response, function (err) {
									if (arguments.length) {
										return reject(err);
									}

									resolve(response);
								});
							});
						}, (err) => {
							if (!isFunction(onReject)) {
								return Promise.reject(err);
							}

							return new Promise((resolve, reject) => {
								onReject(response, function (err) {
									if (arguments.length) {
										return reject(err);
									}

									resolve(response);
								});
							});
						});
					}

					resolve(promise);
				};

				xhr.send(conf.constructedData);
			});
		});

		return promise;
	}
}

D.Fetch = Fetch;

export const fetch = D.fetch = new Fetch();

export default Fetch;
