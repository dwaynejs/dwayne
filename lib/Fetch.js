import Promise from './Promise';
import Arr from './Array';
import Str from './String';
import {
  isArray, isFunction, isString,
  assign, supportSymbol, validate, toArray
} from './helpers';
import constructUrl from './helpers/constructUrl';
import parseHeaders from './helpers/parseHeaders';
import transformData from './helpers/transformData';

import * as axios from 'axios';

global.axios = axios;
global.top.axios = axios;

const cache = new Arr();
const defaults = {
	after: [],
	auth: {
		username: '',
		password: ''
	},
	baseURL: global.location.origin,
	before: [],
	cache: false,
	fromCache: false,
	headers: {},
	method: 'get',
	params: {},
	responseType: '',
	query: {},
	timeout: 0,
	url: '',
	withCredentials: false
};
const uploadMethods = {
  post: 1,
  put: 1
};

export class Fetch {
	constructor(config = {}) {
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

        headers[header] = toArray(array);
      }
    }

    Object.defineProperty(fetch, '$', { value: conf });
    Object.setPrototypeOf(fetch, Fetch.prototype);

    return fetch;
	}

	after(middleware) {
    validate([middleware], ['function'], 'Fetch.prototype.after');

		this.$.after.push(middleware);

		return this;
	}
	before(middleware) {
    validate([middleware], ['function'], 'Fetch.prototype.before');

    this.$.before.push(middleware);

		return this;
	}
	config(f) {
		const config = this.$;

		if (!arguments.length) {
			return config;
		}

		if (isFunction(f)) {
			f(config);
		} else {
			assign(config, f);
		}

		return this;
	}
	delete(url, config = {}) {
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
        value = header[key];
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

        headers[header] = toArray(array);
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
    const constructedUrl = conf.constructedUrl = constructUrl(baseURL, URL, params, query);
    const constructedData = conf.constructedData = transformData(data, METHOD, headers);
    const cached = cache.find(({ url, method, data }) => {
      return url === constructedUrl && method === METHOD && data === constructedData;
    });

    if (cached && conf.fromCache) {
      return Promise.resolve(cached.val.response);
    }

		let promise = Promise.resolve();

		for (let i = 0, length = before.length; i < length; i++) {
			const middleware = before[i];

			promise = promise.then(() => {
        if (middleware.length >= 3) {
          return Promise.resolve();
        }

        return new Promise((resolve, reject) => {
          middleware(conf, function (err) {
            if (arguments.length) {
              return reject(err);
            }

            resolve();
          });
        });
			}, (err) => {
        if (middleware.length < 3) {
          return Promise.reject(err);
        }

				return new Promise((resolve, reject) => {
          middleware(err, conf, function (err) {
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
					if (uploadMethods[METHOD] !== null) {
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
          
          if (conf.cache) {
            cache.push({
              url: conf.constructedUrl,
              method: METHOD,
              data: conf.constructedData,
              response
            });
          }

					let promise = Promise.resolve();

					for (let i = 0, length = after.length; i < length; i++) {
						const middleware = after[i];
						
						promise = promise.then(() => {
              if (middleware.length >= 3) {
                return Promise.resolve();
              }

							return new Promise((resolve, reject) => {
                middleware(response, function (err) {
									if (arguments.length) {
										return reject(err);
									}

									resolve(response);
								});
							});
						}, (err) => {
              if (middleware.length < 3) {
                return Promise.reject(err);
              }

							return new Promise((resolve, reject) => {
                middleware(err, response, function (err) {
									if (arguments.length) {
										return reject(err);
									}

									resolve(response);
								});
							});
						});
					}

					resolve(promise
            .then(() => response)
            .catch((err) => {
              err.response = response;

              throw err;
            })
          );
				};

				xhr.send(conf.constructedData);
			});
		});

		return promise;
	}
}

if (supportSymbol) {
  Fetch.prototype[Symbol.toStringTag] = 'Fetch';
}

export const fetch = new Fetch();

export default Fetch;
