/**
 * @module Fetch
 * @private
 * @mixin
 * @description Exports Fetch class.
 */

import Promise from './Promise';
import Super from './Super';
import Arr from './Arr';
import Str from './Str';
import {
  isArray, isFunction, isString,
  assign, Symbol, validate, iterate, defineProperties
} from './helpers';
import constructURL from './helpers/constructURL';
import parseHeaders from './helpers/parseHeaders';
import transformData from './helpers/transformData';

/**
 * @typedef {'get'|'post'|'delete'|'head'|'put'|'patch'} FetchMethod
 * @public
 */

/**
 * @typedef {Object} FetchConfig
 * @public
 * @property {Array.<AfterMiddleware|FetchErrorAfterMiddleware>} [after]
 * @property {Object} [auth]
 * @property {String} [auth.username]
 * @property {String} [auth.password]
 * @property {String} [baseURL]
 * @property {Array.<BeforeMiddleware|FetchErrorBeforeMiddleware>} [before]
 * @property {*} [data]
 * @property {Object.<String, String[]>} [headers]
 * @property {FetchMethod} [method]
 * @property {Object} [params]
 * @property {Object} [query]
 * @property {String} [responseType]
 * @property {Number} [timeout]
 * @property {String} [url]
 * @property {Boolean} [withCredentials]
 */

/**
 * @typedef {Object} FetchResponse
 * @public
 * @property {FetchConfig} config
 * @property {*} data
 * @property {Object.<String, String>} headers
 * @property {Number} status
 * @property {String} statusText
 * @property {XMLHttpRequest} xhr
 */

/**
 * @callback FetchAfterMiddleware
 * @public
 * @param {FetchResponse} config - Fetch response.
 */

/**
 * @callback FetchErrorAfterMiddleware
 * @public
 * @param {Error|*} err - Thrown error.
 * @param {FetchResponse} config - Fetch response.
 */

/**
 * @callback FetchBeforeMiddleware
 * @public
 * @param {FetchConfig} config - Fetch config.
 */

/**
 * @callback FetchErrorBeforeMiddleware
 * @public
 * @param {Error|*} err - Thrown error.
 * @param {FetchConfig} config - Fetch config.
 */

/**
 * @callback FetchConfigFunction
 * @public
 * @param {FetchConfig} config
 */

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
  query: {},
  responseType: '',
  timeout: 0,
  url: '',
  withCredentials: false
};
const uploadMethods = new Arr(['post', 'put']);

/**
 * @class Fetch
 * @extends Function
 * @public
 * @param {FetchConfig} [config = {}] - A number to wrap.
 * @returns {Fetch} Instance of Fetch.
 * An instance of Fetch is a function that simply calls #request with the same arguments.
 * @description Class for fetching data.
 *
 * @example
 * const fetch = new Fetch();
 *
 * fetch('/data').then((res) => {
 *   console.log(res);
 * });
 */
export class Fetch extends Function {
  constructor(config = {}) {
    super();

    function fetch() {
      return fetch.request.apply(fetch, arguments);
    }

    const conf = new Super({}).deepAssign(defaults, config).$;

    conf.before.push(fetchBeforeMiddleware);

    /**
     * @member Fetch#$$
     * @type {FetchConfig}
     * @public
     * @description Fetch config.
     */
    Object.defineProperty(fetch, '$$', { value: conf });
    Object.setPrototypeOf(fetch, Fetch.prototype);

    return fetch;
  }

  /**
   * @method Fetch#after
   * @public
   * @param {FetchAfterMiddleware|FetchErrorAfterMiddleware} middleware - Middleware to add.
   * @param {Boolean|*} [afterAll = true] - Boolean parameter where to put the middleware.
   * Truthy parameter stands for "to the end" and falsey for "to the beginning".
   * @returns {Fetch} Returns this.
   * @description Middleware that is called after the request.
   * If the middleware has 2 or less arguments it's treated as success middleware otherwise as an error one.
   * If the middleware returns a promise it becomes a part of the middleware chain.
   *
   * @example
   * const fetch = new Fetch()
   *   .after((err, res) => {
   *     console.log(err);
   *
   *     throw err;
   *   })
   *   .after((res) => {
   *     res.json = D(res.data).parseJSON():
   *   });
   */
  after(middleware, afterAll = true) {
    validate([middleware], ['function'], 'Fetch#after');

    const { after } = this.$$;

    if (afterAll) {
      after.push(middleware);
    } else {
      after.unshift(middleware);
    }

    return this;
  }

  /**
   * @method Fetch#before
   * @public
   * @param {FetchBeforeMiddleware|FetchErrorBeforeMiddleware} middleware - Middleware to add.
   * @param {Boolean|*} [beforeAll = true] - Boolean parameter where to put the middleware.
   * Truthy parameter stands for "to the beginning" and falsey for "to the end".
   * @returns {Fetch} Returns this.
   * @description Middleware that is called before the request.
   * If the middleware has 2 or less arguments it's treated as success middleware otherwise as an error one.
   * If the middleware returns a promise it becomes a part of the middleware chain.
   *
   * @example
   * const fetch = new Fetch()
   *   .before((err, req) => {
   *     console.log(err);
   *
   *     throw err;
   *   })
   *   .before((req) => {
   *     if (req.url === '/veryLongRequest') {
   *       req.timeout = 30000;
   *     }
   *   });
   */
  before(middleware, beforeAll = true) {
    validate([middleware], ['function'], 'Fetch#before');

    const { before } = this.$$;

    if (beforeAll) {
      before.unshift(middleware);
    } else {
      before.push(middleware);
    }

    return this;
  }

  /**
   * @method Fetch#config
   * @public
   * @param {FetchConfig|FetchConfigFunction} [config] - If it's a function it's called with th fetch config argument
   * otherwise it's assigned to the fetch config.
   * @returns {Fetch|FetchConfig} If the argument is present this is returned otherwise the fetch config is returned.
   * @description Method for getting and setting config.
   *
   * @example
   * const fetch = new Fetch();
   *
   * fetch.config({ baseURL: 5000 });
   * fetch.config().timeout; // 5000
   *
   * fetch.config((config) => {
   *   config.baseURL += '/api';
   * });
   */
  config(config) {
    const conf = this.$$;

    if (!arguments.length) {
      return conf;
    }

    if (isFunction(config)) {
      config(conf);
    } else {
      assign(conf, config);
    }

    return this;
  }

  /**
   * @method Fetch#delete
   * @public
   * @param {String} [url] - See {@link Fetch#request}.
   * @param {FetchConfig} [config] - See {@link Fetch#request}.
   * @returns {Promise.<FetchResponse, Error>} See {@link Fetch#request}.
   * @description Shorthand for #request for delete requests.
   *
   * @example
   * new Fetch().delete('/data').then((res) => {
   *   console.log(res);
   * });
   */
  delete(url, config = {}) {
    if (!isString(url)) {
      config = url;
      url = undefined;
    }

    return this.request(url, assign({ method: 'delete' }, config));
  }

  /**
   * @method Fetch#get
   * @public
   * @param {String} [url] - See {@link Fetch#request}.
   * @param {FetchConfig} [config] - See {@link Fetch#request}.
   * @returns {Promise.<FetchResponse, Error>} See {@link Fetch#request}.
   * @description Shorthand for #request for get requests.
   *
   * @example
   * new Fetch().get('/data').then((res) => {
   *   console.log(res);
   * });
   */
  get(url, config = {}) {
    if (!isString(url)) {
      config = url;
      url = undefined;
    }

    return this.request(url, assign({ method: 'get' }, config));
  }

  /**
   * @method Fetch#head
   * @public
   * @param {String} [url] - See {@link Fetch#request}.
   * @param {FetchConfig} [config] - See {@link Fetch#request}.
   * @returns {Promise.<FetchResponse, Error>} See {@link Fetch#request}.
   * @description Shorthand for #request for head requests.
   *
   * @example
   * new Fetch().head('/data').then((res) => {
   *   console.log(res);
   * });
   */
  head(url, config = {}) {
    if (!isString(url)) {
      config = url;
      url = undefined;
    }

    return this.request(url, assign({ method: 'head' }, config));
  }

  /**
   * @method Fetch#headers
   * @public
   * @param {String|Object.<String, String|String[]>} header - A header string or an object of the following format:
   * { [header]: [value1, value2, ...] }.
   * @param {String|String[]} [value] - Header value. If the first argument is a string
   * this has to be a header value or an array of header values.
   * @returns {Fetch} Returns this.
   * @description Method for setting request headers.
   *
   * @example
   * const fetch = new Fetch()
   *   .headers('Header1', 'Value')
   *   .headers('Header2', ['Value1', 'Value2'])
   *   .headers({
   *     Header3: ['Value1', 'Value2']
   *   });
   */
  headers(header, value) {
    const { headers } = this.$$;

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

  /**
   * @method Fetch#instance
   * @public
   * @param {FetchConfig} [config] - New config if needed.
   * @returns {Fetch} New instance of Fetch.
   * @description Method for creating new fetch instances based on already existent.
   *
   * @example
   * const mainFetch = new Fetch({
   *   baseURL: '//other.domain.com/api',
   *   withCredentials: true
   * });
   *
   * const longFetch = mainFetch.instance({
   *   timeout: 10000
   * });
   */
  instance(config = {}) {
    const conf = new Super({}).deepAssign(this.$$, config).$;

    if (conf.before.indexOf(fetchBeforeMiddleware) === -1) {
      conf.before.push(fetchBeforeMiddleware);
    }

    return new Fetch(conf);
  }

  /**
   * @method Fetch#patch
   * @public
   * @param {String} [url] - See {@link Fetch#request}.
   * @param {*} [data] - Additional parameter for uploading data.
   * @param {FetchConfig} [config] - See {@link Fetch#request}.
   * @returns {Promise.<FetchResponse, Error>} See {@link Fetch#request}.
   * @description Shorthand for #request for head requests.
   *
   * @example
   * new Fetch().patch('/data', { user: 'John' }).then((res) => {
   *   console.log(res);
   * });
   */
  patch(url, data = {}, config = {}) {
    if (arguments.length && !isString(url)) {
      config = data;
      data = url;
      url = undefined;
    }

    return this.request(url, assign({ method: 'patch', data }, config));
  }

  /**
   * @method Fetch#post
   * @public
   * @param {String} [url] - See {@link Fetch#request}.
   * @param {*} [data] - Additional parameter for uploading data.
   * @param {FetchConfig} [config] - See {@link Fetch#request}.
   * @returns {Promise.<FetchResponse, Error>} See {@link Fetch#request}.
   * @description Shorthand for #request for head requests.
   *
   * @example
   * new Fetch().post('/data', { user: 'John' }).then((res) => {
   *   console.log(res);
   * });
   */
  post(url, data = {}, config = {}) {
    if (arguments.length && !isString(url)) {
      config = data;
      data = url;
      url = undefined;
    }

    return this.request(url, assign({ method: 'post', data }, config));
  }

  /**
   * @method Fetch#put
   * @public
   * @param {String} [url] - See {@link Fetch#request}.
   * @param {*} [data] - Additional parameter for uploading data.
   * @param {FetchConfig} [config] - See {@link Fetch#request}.
   * @returns {Promise.<FetchResponse, Error>} See {@link Fetch#request}.
   * @description Shorthand for #request for head requests.
   *
   * @example
   * new Fetch().put('/data', { user: 'John' }).then((res) => {
   *   console.log(res);
   * });
   */
  put(url, data = {}, config = {}) {
    if (arguments.length && !isString(url)) {
      config = data;
      data = url;
      url = undefined;
    }

    return this.request(url, assign({ method: 'put', data }, config));
  }

  /**
   * @method Fetch#request
   * @public
   * @param {String} [url] - URL for the request.
   * @param {FetchConfig} [config] - Additional config for this particular request.
   * @returns {Promise.<FetchResponse, Error>} Promise that is resolved with the request response.
   * @description Main function for making requests. All request methods call this method
   * including the fetch instance itself.
   *
   * @example
   * const fetch = new Fetch();
   *
   * fetch.request('/data', { timeout: 1000 }).then((res) => {
   *   console.log(res);
   * });
   *
   * fetch.request({ timeout: 1000 }).then((res) => {
   *   console.log(res);
   * });
   *
   * fetch.request().then((res) => {
   *   console.log(res);
   * });
   */
  request(url, config = {}) {
    if (arguments.length === 1 && !isString(url)) {
      config = url;
    }

    const urlConf = isString(url) ? { url } : {};
    const conf = assign({}, this.$$, urlConf, config);

    let xhr;
    let promise = Promise.resolve();

    iterate(conf.before, (middleware) => {
      promise = promise.then(() => {
        if (middleware.length >= 2) {
          return Promise.resolve();
        }

        return new Promise((resolve) => {
          resolve(middleware(conf));
        });
      }, (err) => {
        if (middleware.length < 2) {
          return Promise.reject(err);
        }

        return new Promise((resolve) => {
          resolve(middleware(err, conf));
        });
      });
    });

    promise = promise.then(() => new Promise((resolve, reject) => {
      const {
        after,
        auth: {
          username,
          password
        },
        data,
        headers,
        method,
        onprogress,
        responseType,
        timeout,
        url,
        withCredentials
      } = conf;

      xhr = new XMLHttpRequest();

      xhr.open(method, url, true, username, password);

      iterate(headers, (value, header) => {
        xhr.setRequestHeader(header, value);
      });

      if (onprogress) {
        if (uploadMethods.indexOfStrict(method) === -1) {
          xhr.onprogress = onprogress;
        } else {
          xhr.upload.onprogress = onprogress;
        }
      }

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
            if (middleware.length >= 2) {
              return Promise.resolve();
            }

            return new Promise((resolve) => {
              resolve(middleware(response));
            });
          }, (err) => {
            if (middleware.length < 2) {
              return Promise.reject(err);
            }

            return new Promise((resolve) => {
              resolve(middleware(err, response));
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

      xhr.responseType = responseType;
      xhr.timeout = Number(timeout) || 0;
      xhr.withCredentials = !!withCredentials;

      xhr.send(data);
    }));

    promise.abort = function abort() {
      if (xhr) {
        xhr.abort();
      }

      return this;
    };

    return promise;
  }
}

defineProperties(Fetch.prototype, {
  [Symbol.toStringTag]: 'Fetch'
});

/**
 * @function fetchBeforeMiddleware
 * @private
 * @param {FetchConfig} config
 * @description Built-in before middleware for url, data, method, headers construction.
 */
function fetchBeforeMiddleware(config) {
  const {
    baseURL,
    data,
    headers,
    method,
    params,
    query,
    url
  } = config;
  const METHOD = method.toUpperCase();

  config.method = METHOD;
  config.url = constructURL(baseURL, url, params, query);
  config.data = transformData(data, METHOD, headers);
  config.headers = new Super(headers).object((object, values, header) => {
    header = new Str(header)
      .toCapitalCase()
      .replace(/\s+/g, '-').$;

    object[header] = values.join(', ');
  }).$;
}

/**
 * @const {Fetch} fetch
 * @public
 * @description Empty instance of Fetch.
 */
export const fetch = new Fetch();

export default Fetch;
