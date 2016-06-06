import Promise from './Promise';
import Arr from './Array';
import Str from './String';
import {
  isArray, isFunction, isString,
  assign, supportSymbol, validate, toArray, iterate
} from './helpers';
import constructURL from './helpers/constructURL';
import parseHeaders from './helpers/parseHeaders';
import transformData from './helpers/transformData';

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

    iterate(headers, (array, header) => {
      headers[header] = toArray(array);
    });

    Object.defineProperty(fetch, '$', { value: conf });
    Object.setPrototypeOf(fetch, Fetch.prototype);

    return fetch;
	}

	after(middleware) {
    validate([middleware], ['function'], 'Fetch#after');

		this.$.after.push(middleware);

		return this;
	}
	before(middleware) {
    validate([middleware], ['function'], 'Fetch#before');

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

    iterate(header, (value, header) => {
      const array = headers[header] || [];
      const toPush = isArray(value) ? value : [value];

      (headers[header] = array).push.apply(array, toPush);
    });

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

    iterate(headers, (array, header) => {
      headers[header] = toArray(array);
    });

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
      headers,
      params,
      query
    } = conf;

    let xhr;
		let promise = Promise.resolve();
    
    iterate(before, (middleware) => {
      promise = promise.then(() => {
        if (middleware.length >= 3) {
          return Promise.resolve();
        }
    
        return new Promise((resolve, reject) => {
          middleware.call(this, conf, function (err) {
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
          middleware.call(this, err, conf, function (err) {
            if (arguments.length) {
              return reject(err);
            }
        
            resolve();
          });
        });
      });
    });

		promise = promise.then(() => {
			return new Promise((resolve, reject) => {
				const {
					after,
					auth: { username, password },
          data,
          method,
					onprogress,
					responseType,
					timeout,
          url,
					withCredentials
				} = conf;

				xhr = new XMLHttpRequest();
				xhr.responseType = responseType;
				xhr.timeout = Number(timeout) || 0;
				xhr.withCredentials = !!withCredentials;
        
        const METHOD = method.toUpperCase();

				if (onprogress) {
					if (uploadMethods.indexOfStrict(METHOD) !== -1) {
						xhr.upload.onprogress = onprogress;
					} else {
						xhr.onprogress = onprogress;
					}
				}
        
        const URL = conf.constructedUrl = constructURL(baseURL, url, params, query);
        const constructedData = conf.constructedData = transformData(data, METHOD, headers);
        
				xhr.open(METHOD, URL, true, username, password);
        
        iterate(headers, (value, header) => {
          xhr.setRequestHeader(new Str(header).toCapitalCase().replace(/\s+/g, '-').$, value.join(', '));
        });

				xhr.onabort = () => {
					reject(new Error('Request was aborted'));

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

					let promise = Promise.resolve();
          
          iterate(after, (middleware) => {
            promise = promise.then(() => {
              if (middleware.length >= 3) {
                return Promise.resolve();
              }
    
              return new Promise((resolve, reject) => {
                middleware.call(this, response, function (err) {
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
                middleware.call(this, err, response, function (err) {
                  if (arguments.length) {
                    return reject(err);
                  }
        
                  resolve(response);
                });
              });
            });
          });

					resolve(promise
            .then(() => response)
            .catch((err) => {
              try {
                err.response = response;
              } catch (e) {
                throw err;
              }

              throw err;
            })
          );
				};

				xhr.send(constructedData);
			});
		});

    promise.abort = function abort() {
      xhr.abort();

      return this;
    };

		return promise;
	}
  toString() {
    return Function.prototype.toString.call(this);
  }
}

if (supportSymbol) {
  Fetch.prototype[Symbol.toStringTag] = 'Fetch';
}

export const fetch = new Fetch();

export default Fetch;
