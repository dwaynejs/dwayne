import classes from '../../classes';
import { default as parent, transform } from '../Object';
import Arr from '../Array';
import Promise from '../Promise';
import Str from '../String';
import { isArray, isFunction, isString, assign } from '../../libs';
import constructUrl from './construct-url';
import parseHeaders from './parse-headers';
import transformData from './transform-data';

import axios from 'axios';

global.top.axios = axios;

const defaults = {
	after: [],
	auth: {
		username: '',
		password: ''
	},
	baseURL: global.location.origin,
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

		function fetch() {
			return fetch.request.apply(fetch, arguments);
		}

		const conf = assign({}, defaults, config);
    const headers = conf.headers = assign({}, conf.headers);

		conf.after = [];
		conf.auth = assign({}, defaults.auth, conf.auth);
		conf.before = [];
    conf.params = assign({}, conf.params);
    conf.query = assign({}, conf.query);
    
    for (const header in headers) {
      if (headers.hasOwnProperty(header)) {
        const array = headers[header];
  
        headers[header] = isArray(array) ? new Arr(array).slice().$ : [array];
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
    if (!isString(url)) {
      config = url;
      url = undefined;
    }

		return this.request(url, assign({ method: 'delete' }, config));
	}
	get(url, config = {}) {
    if (!isString(url)) {
      config = url;
      url = undefined;
    }

    return this.request(url, assign({ method: 'get' }, config));
	}
	head(url, config = {}) {
    if (!isString(url)) {
      config = url;
      url = undefined;
    }

    return this.request(url, assign({ method: 'head' }, config));
	}
	headers(header, value) {
		const { headers } = this.$;

		if (arguments.length >= 2) {
			header = { [header]: value };
		}

		for (const key in header) {
			if (header.hasOwnProperty(key)) {
        const value = header[key];
        const array = headers[key] || [];
        const toPush = isArray(value) ? value : [value];
        
        (headers[key] = array).push.apply(array, toPush);
			}
		}

		return this;
	}
	instance(config = {}) {
    const old = this.$;
    const conf = assign({}, old, config);
    const headers = conf.headers = assign({}, old.headers, conf.headers);
    
    conf.after = assign([], old.after);
    conf.auth = assign({}, old.auth, conf.auth);
    conf.before = assign([], old.before);
    conf.params = assign({}, old.params, conf.params);
    conf.query = assign({}, old.params, conf.query);
    
    for (const header in headers) {
      if (headers.hasOwnProperty(header)) {
        const array = headers[header];
  
        headers[header] = isArray(array) ? new Arr(array).slice().$ : [array];
      }
    }

		return new Fetch(conf);
	}
	patch(url, data = {}, config = {}) {
		if (arguments.length && !isString(url)) {
			config = data;
			data = url;
			url = undefined;
		}

		return this.request(url, assign({ method: 'patch', data }, config));
	}
	post(url, data = {}, config = {}) {
		if (arguments.length && !isString(url)) {
			config = data;
			data = url;
			url = undefined;
		}

		return this.request(url, assign({ method: 'post', data }, config));
	}
	put(url, data = {}, config = {}) {
		if (arguments.length && !isString(url)) {
			config = data;
			data = url;
			url = undefined;
		}

		return this.request(url, assign({ method: 'put', data }, config));
	}
	request(url, config = {}) {
		if (arguments.length === 1 && !isString(url)) {
			config = url;
		}

		const urlConf = isString(url) ? { url } : {};
		const conf = assign({}, this.$, urlConf, config);

		const {
      baseURL,
      before,
      data,
      headers,
      params,
      query,
      url: URL
    } = conf;
    
    const METHOD = conf.method.toUpperCase();
    
    conf.constructedUrl = constructUrl(baseURL, URL, params, query);
    conf.constructedData = transformData(transform(data), METHOD, headers);

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
					onprogress,
					responseType,
					timeout,
					withCredentials
				} = conf;

				let xhr = new XMLHttpRequest();
				xhr.responseType = responseType;
				xhr.timeout = Number(timeout) || 0;
				xhr.withCredentials = !!withCredentials;

				if (onprogress) {
					if (uploadMethods.keyOf(METHOD) !== null) {
						xhr.upload.onprogress = onprogress;
					} else {
						xhr.onprogress = onprogress;
					}
				}
        
				xhr.open(METHOD, conf.constructedUrl, true, username, password);

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

classes.Fetch = Fetch;

export default Fetch;
