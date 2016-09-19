import Arr from './Arr';
import Elem, { find, win } from './Elem';
import Func from './Func';
import Promise from './Promise';
import Str from './Str';
import Super from './Super';
import { switcher } from './Switcher';
import {
  isFunction, isNull, isNullOrUndefined, isRegExp, isString,
  assign, iterate, defineProperties, validate
} from './helpers';
import constructURL from './helpers/constructURL';
import resolveURL from './helpers/resolveURL';

/**
 * @typedef {Object} RouterStateOptions
 * @property {Object} [params = {}] - Parameters for URL. For '/users/:userId' userId is a param.
 * @property {Object} [query = {}] - Query parameters for URL.
 */

const extendLink = 'https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes#Sub_classing_with_extends';
const stateAttrName = 'dwayne-router-state';
const isPrototypeOf = {}.isPrototypeOf;
const {
  URL,
  history,
  location,
  location: {
    origin,
    href
  }
} = global;
const stoppable = new Arr(['beforeLeave', 'beforeLoad']);
const stopError = new Error();
const states = new Arr([]);
const pathSwitcher = switcher('call', () => {
  throw new Error('State path must be a string, a regular expression or undefined! (at registerState)');
})
  .case(isRegExp, (path) => ({
    path: path.source.replace(/\\\//g, '/'),
    url: path,
    params: {}
  }))
  .case(isNullOrUndefined, () => ({
    path: '/',
    url: '/',
    params: {}
  }))
  .case(isString, (path) => {
    if (path.indexOf('/')) {
      throw new Error('If state path is a string it must start with "/"! (at registerState)');
    }

    const index = path.indexOf('?');
    const params = new Super({});
    let newURL = '';
    const newPath = new Str(path)
      .slice(0, index === -1 ? path.length : index)
      .replace(/^\/|\/$/g)
      .split(/\//)
      .map((part, i, array) => {
        if (!part && array.length > 1) {
          throw new Error('If state path is a string it must not contain "//" or end with "/"! (at registerState)');
        }

        const index = part.indexOf(':');

        if (index > 0) {
          throw new Error('If state path is a string resource part must be either a string or an URL parameter! (at registerState)');
        }

        if (index === -1) {
          return {
            url: part,
            value: part
          };
        }

        const {
          name,
          regexp = /[^\/]*/
        } = resolveParameter(
          part.slice(1),
          'URL parameter must not be an empty string or contain characters besides "a-zA-Z_$"! (at registerState)',
          'URL parameter regexp validator must be within parentheses (e.g. :userId(\\d+) and not contain ones)! (at registerState)'
        );

        params.$[name] = params.count;

        return {
          type: 'param',
          url: `:${ name }`,
          value: regexp
        };
      })
      .word(({ type, url, value }) => {
        let newPath;

        if (type === 'param') {
          newPath = `(${ value.source.replace(/\\\//g, '/') })`;
        } else {
          newPath = new Str(value).escapeRegExp().$;
        }

        newURL += `/${ url }`;

        return `/${ newPath }`;
      });

    return {
      path: newPath,
      url: newURL,
      params: params.$
    };
  });

let eventPromise = Promise.resolve();
let pushed;
let initialized;
let routerLoaded;
let router;
let pageTitle;
let pageIcon;
let currentState;
let currentTitle;
let currentIcon;

export class Router {
  static buildURL(relativeToURL = location.href, options = {}) {
    if (arguments.length === 1 && !isString(relativeToURL)) {
      options = relativeToURL;
      relativeToURL = location.href;
    }

    const { url } = this;

    if (isRegExp(url)) {
      throw new Error('URL can be built only from the string URLs! (Router.buildURL)');
    }

    const {
      params = {},
      query = {},
      hash = ''
    } = options;

    const {
      origin,
      pathname
    } = new URL(url, relativeToURL);

    return constructURL(origin, pathname, params, query, hash, {
      params: this.encodeParams,
      query: this.encodeQuery
    });
  }

  static go(options) {
    if (this.abstract) {
      throw new Error('Cannot go to an abstract state! (at Router.go)');
    }

    go(this.buildURL(options));

    return this;
  }

  static init() {
    initialized = true;

    initialize();

    return this;
  }

  static on(event, listener) {
    if (arguments.length >= 2) {
      event = { [event]: listener };
    }

    const { listeners } = this.$$;
    const allListeners = {};

    iterate(event, (listener, event) => {
      const array = listeners[event] || new Arr([]);

      listener = new Func(listener).bindContext(this);

      allListeners[event] = listener;
      (listeners[event] = array).push(listener);
    });

    return function removeEventListeners(event) {
      let actualListeners = allListeners;

      if (allListeners[event]) {
        actualListeners = { [event]: allListeners[event] };
      }

      iterate(actualListeners, (listener, event) => {
        const eventListeners = listeners[event];

        const found = eventListeners.find((l) => l === listener);

        if (found) {
          eventListeners.splice(found.key);
        }
      });
    };
  }

  constructor(props = {}) {
    const {
      name,
      url,
      params = {},
      query = {},
      hash = ''
    } = props;
    const {
      templateParams,
      title,
      icon
    } = new Super(this).proto().$.constructor;

    this.name = name;
    this.url = url;
    this.params = params;
    this.query = query;
    this.hash = hash;
    this.title = title;
    this.icon = icon;
    this.templateParams = new Super(templateParams).create().$;
  }

  onBeforeLeave() {}

  onBeforeLoad() {}

  onInit() {}

  onLeave() {}

  onLoad() {}

  onRender() {}
}

const MainState = Router.prototype;

let defaultState = Router;

defineProperties(Router, {
  $$: {
    listeners: {},
    state: null,
    states
  },

  parent: null,
  children: new Arr([]),
  abstract: false,
  stateName: null,
  url: '/',
  path: /^\/$/,
  relativeURL: '/',
  relativePath: '/',
  params: {},
  templateParams: {},
  query: {},
  template: '',
  encodeParams: true,
  decodeParams: true,
  encodeQuery: true,
  decodeQuery: true,
  icon: null,
  title: null,

  'get/set default': {
    get() {
      return defaultState;
    },
    set(state) {
      if (states.indexOf(state) === -1) {
        throw new Error('State must be registered! (Router.default)');
      }

      const {
        abstract,
        url,
        params,
        query
      } = state;

      if (abstract) {
        throw new Error('Default state must not be abstract! (Router.default)');
      }

      if (isRegExp(url)) {
        throw new Error('Default state must not have regexp path! (Router.default)');
      }

      if (new Super(params).count || new Super(query).count) {
        throw new Error('Default state must not have URL or query params! (Router.default)');
      }

      defaultState = state;
    }
  }
});

function redirect(url, push) {
  const { url: currentURL } = currentState;
  const newURL = new URL(url, currentURL.href);

  eventPromise = eventPromise
    .then(() => dispatchNewEvent('beforeLeave'))
    .then(() => dispatchNewEvent('leave'))
    .then(() => {
      currentState.base
        .hide()
        .html('');
    })
    .then(() => beforeLoad(newURL, push ? 'pushState' : 'replaceState'))
    .catch(handleError)
    .catch(() => {});

  function dispatchNewEvent(type) {
    return dispatchEvent(new Super({}).value({
      type,
      state: currentState,
      fromURL: newURL,
      toURL: currentURL
    }).$);
  }
}
function beforeLoad(newURL, action) {
  if (newURL.origin !== origin) {
    location.href = newURL.href;

    return Promise.reject(stopError);
  }

  const { hash } = resolveURL(newURL, Router.decodeQuery);
  let newState;

  return Promise.resolve()
    .then(() => {
      let promise = Promise.reject();

      findStatesByURL(newURL).forEach(({ state, params, query }) => {
        promise = promise
          .catch(() => {
            newState = new state({
              name: state.stateName,
              url: newURL,
              params,
              query,
              hash
            });

            return dispatchNewEvent('beforeLoad');
          });
      });

      return promise;
    })
    .then(() => {
      if (action) {
        history[action](null, null, newURL.href);
      }

      pushed = true;

      currentState = Router.$$.state = newState;

      return dispatchNewEvent('load');
    })
    .then(() => {
      const proto = new Super(newState).proto().$.constructor;
      const renderStates = new Arr([proto]);
      const {
        stateName,
        templateParams,
        title,
        icon
      } = newState;
      const ownTemplateParams = new Super(templateParams).clone();
      let state = proto;
      let promise = Promise.resolve();

      while (!getStateBase(state).length && (state = state.parent)) {
        renderStates.unshift(state);
      }

      find(`[${ stateAttrName }]`).forEach((elem) => {
        elem = new Elem(elem);

        const stateNameFromAttr = elem.attr(stateAttrName);
        const { value: foundState } = states.find(({ stateName }) => stateName === stateNameFromAttr) || {};

        if (!foundState || (stateNameFromAttr !== stateName && !(newState instanceof foundState))) {
          elem
            .hide()
            .html('');
        }
      });

      renderStates.forEach((state) => {
        const {
          template,
          templateParams: parentTemplateParams
        } = state;
        const templateParams = new Super(parentTemplateParams)
          .create()
          .assign(ownTemplateParams)
          .$;

        promise = promise.then(() => {
          const base = getStateBase(state)
            .first()
            .show();

          try {
            base.html(isFunction(template) ? template(templateParams) : template);
          } catch (err) {
            console.error('%s %o', 'Render error:', err);
          }

          base
            .find(`[${ stateAttrName }]`)
            .hide();

          if (state === proto) {
            newState.base = base;

            if (!isNull(title) && title !== currentTitle) {
              pageTitle.text(currentTitle = title);
            }

            if (!isNull(icon) && icon !== currentIcon) {
              pageIcon.ref(currentIcon = icon);
            }
          }

          return dispatchNewEvent('render', state);
        });
      });

      return promise;
    })
    .catch(handleError)
    .catch(() => {});

  function dispatchNewEvent(type, renderingState) {
    return dispatchEvent(new Super({}).value({
      type,
      state: newState,
      url: newURL
    }).$, renderingState);
  }
}

function decode(string, decodeParams) {
  return decodeParams
    ? decodeURIComponent(string)
    : string;
}
function handleError(err) {
  if (err !== stopError) {
    printError(err);

    throw err;
  }
}
function printError(err) {
  console.error('%s %o', 'Uncaught (in event listener)', err);
}
function getStateBase(state) {
  return state === Router ? router : find(`[${ stateAttrName }="${ state.stateName }"]`);
}
function isInstanceOfRouterState(state) {
  return isPrototypeOf.call(Router, state) || isPrototypeOf.call(MainState, state.prototype);
}
function resolveParameter(param, nameErrorName, valueErrorName) {
  const nameMatch = param.match(/^[a-z_\$]+/i);

  if (!nameMatch) {
    throw new Error(nameErrorName);
  }

  const name = nameMatch[0];
  const value = param.slice(name.length);
  let regexp;

  if (value && (value.indexOf('(') || value.indexOf(')') !== value.length - 1)) {
    throw new Error(valueErrorName);
  }

  if (value) {
    regexp = new RegExp(value.slice(1, -1));
  }

  return {
    name,
    regexp
  };
}
function findStatesByURL(url) {
  const pathname = url.pathname || '/';
  const search = url.search || '';
  const eventualStates = states.object((states, state) => {
    if (state.abstract) {
      return;
    }

    const {
      url: stateURL,
      path,
      params,
      query: requiredQuery,
      decodeParams,
      decodeQuery
    } = state;
    const query = new Super(resolveURL(url, decodeQuery).query);
    const eventualParams = {};
    const match = (
      (pathname.replace(/\/$/, '') || '/') +
      (isRegExp(stateURL) ? search : '')
    ).match(path);

    if (!match) {
      return false;
    }

    /* eslint guard-for-in: 0 */
    for (const param in requiredQuery) {
      if (!query.hasOwn(param) || !requiredQuery[param].test(query.$[param])) {
        return;
      }
    }

    match.shift();

    for (const param in params) {
      eventualParams[param] = decode(match[params[param]], decodeParams);
    }

    states.push({
      state,
      params: eventualParams,
      query: query.$
    });
  }, new Arr([]));

  if (eventualStates.every(({ state }) => state !== defaultState)) {
    eventualStates.push({
      state: defaultState,
      params: {},
      query: resolveURL(url, defaultState.decodeQuery).query
    });
  }

  return eventualStates;
}
function dispatchEvent(event, renderingState) {
  let paused;
  let stopped;
  let continuePropagation = () => {};
  let stopPropagation = () => {};
  let promise = Promise.resolve();

  const {
    type,
    state
  } = event;
  const isStoppable = stoppable.indexOfStrict(type) !== -1 && (
    new Super(state).proto().$.constructor !== defaultState ||
    type !== 'beforeLoad'
  );

  new Super(event).value({
    continue() {
      if (isStoppable) {
        paused = false;
        continuePropagation();
      }
    },
    pause() {
      if (isStoppable) {
        paused = true;
      }
    },
    stop() {
      if (isStoppable) {
        stopped = true;
        stopPropagation();
      }
    }
  });

  getListeners(state, type, renderingState).forEach((listener) => {
    promise = promise.then(() => new Promise((resolve, reject) => {
      let finished = false;

      continuePropagation = () => {
        if (finished) {
          resolve();
        }
      };

      stopPropagation = () => {
        reject(stopError);
      };

      listener(event);

      finished = true;

      if (stopped) {
        return reject(stopError);
      }

      if (!paused) {
        resolve();
      }
    }));
  });

  return promise.catch((err) => {
    if (err !== stopError && !isStoppable) {
      printError(err);
    }

    if (isStoppable) {
      throw err;
    }
  });
}
function getListeners(state = new Super(MainState).create().$, type, renderingState) {
  const tree = new Arr([]);
  const desc = /leave/i.test(type);
  const method = desc ? 'push' : 'unshift';
  const listenerName = `on${ new Str(type).capitalizeFirst() }`;
  let proto = new Super(state).proto().$.constructor;

  while (proto) {
    if (!renderingState || isPrototypeOf.call(proto, renderingState) || renderingState === proto) {
      tree[method](proto);
    }

    proto = proto.parent;
  }

  return tree
    .object((listeners, {
      $$: {
        listeners: ownListeners
        },
      prototype: proto
    }) => {
      if (new Super(proto).hasOwn(listenerName)) {
        listeners.push(new Func(proto[listenerName]).bind(state));
      }

      listeners.push.apply(listeners, (ownListeners[type] || new Arr([])).$);
    }, new Arr([]));
}
function initialize() {
  if (initialized && !routerLoaded) {
    routerLoaded = true;
    pageTitle = find('#dwayne-router-title');
    pageIcon = find('#dwayne-router-icon');

    find(`[${ stateAttrName }]`).hide();

    defineProperties(MainState, {
      base: router = find('#dwayne-router').first()
    });

    win.on('click', (e) => {
      const target = new Elem(e.target);

      if (target.name === 'a' && target.attr('target') !== '_blank') {
        const url = target.attr('href') || '';
        const currentURL = location.href;
        const newURL = new URL(url, currentURL);
        const index = newURL.href.indexOf('#');

        if (
          index !== -1 && (
            currentURL.indexOf('#') === -1 || (
              currentURL.slice(index) === newURL.href.slice(index) &&
              location.hash !== newURL.hash
            )
          )
        ) {
          return;
        }

        e.preventDefault();

        redirect(newURL, true);
      }
    });

    states.forEach((state) => {
      const {
        parent: {
          children,
          params: parentParams,
          query: parentQuery,
          templateParams: parentTemplateParams
        },
        params,
        query,
        templateParams,
        relativeURL,
        relativePath
      } = state;
      let proto = state;
      let count = 0;
      let newPath = relativePath;
      let newURL = '';

      while (proto = proto.parent) {
        count += new Super(proto.params).count;
        newPath = proto.relativePath + newPath;
        newURL = proto.relativeURL + newURL;
      }

      newPath = new RegExp(`^${ newPath.replace(/\/+/g, '/').replace(/\/$/, '') || '/' }$`);
      newURL = isRegExp(relativeURL)
        ? newPath
        : (newURL + relativeURL).replace(/\/+/g, '/').replace(/\/$/, '') || '/';

      children.push(state);

      new Super(templateParams).proto(parentTemplateParams);
      new Super(query).proto(parentQuery);
      new Super(params)
        .proto(parentParams)
        .forEach((value, key, params) => {
          params[key] += count;
        });

      defineProperties(state, {
        url: newURL,
        path: newPath
      });
    });

    eventPromise = eventPromise
      .then(() => dispatchEvent(new Super({}).value({
        type: 'init'
      }).$))
      .then(() => beforeLoad(new URL(location.href)))
      .then(() => {
        win.on('popstate', () => {
          if (location.href !== href) {
            pushed = true;
          }

          if (pushed) {
            eventPromise = eventPromise.then(() => beforeLoad(new URL(location.href)));
          }
        });
      });
  }
}

export function go(url) {
  redirect(new URL(url, location.href), true);
}
export function redirectTo(url) {
  redirect(new URL(url, location.href));
}
export function registerState(state) {
  if (states.indexOf(state) !== -1) {
    return;
  }

  if (!isInstanceOfRouterState(state)) {
    throw new Error(`State must extend (${ extendLink }) Router! (at registerState)`);
  }

  const { stateName } = state;

  if (!new Super(state).hasOwn('stateName') || states.find(({ stateName: n }) => n === stateName)) {
    throw new Error('State must have unique stateName! (at registerState)');
  }

  const proto = Object.getPrototypeOf(state);

  if (isRegExp(proto.url)) {
    throw new Error('URL regexp state cannot be extended! (at registerState)');
  }

  const $state = new Super(state);
  const path = $state.hasOwn('path')
    ? state.path
    : '';
  const {
    url: relativeURL,
    path: relativePath,
    params
  } = pathSwitcher(path);

  defineProperties(state, {
    $$: {
      listeners: {}
    },

    stateName,
    parent: proto,
    children: new Arr([]),
    template: $state.hasOwn('template')
      ? state.template
      : '',
    relativeURL,
    relativePath,
    params,
    abstract: $state.hasOwn('abstract') && !!state.abstract,
    templateParams: $state.hasOwn('templateParams')
      ? state.templateParams
      : {},
    query: {}
  });

  const { query } = state;
  const index = isString(path) ? path.indexOf('?') : -1;

  if (index !== -1) {
    new Str(path)
      .replace(/&$/)
      .slice(index + 1)
      .split('&')
      .forEach((param) => {
        const {
          name,
          regexp = /[\s\S]*/
        } = resolveParameter(
          param,
          'Query parameter must not be an empty string or contain characters besides "a-zA-Z_$"! (at registerState)',
          'Query parameter regexp validator must be within parentheses (e.g. :userId(\\d+)) and not contain them! (at registerState)'
        );

        query[name] = new RegExp(`^${ regexp.source.replace(/\\\//g, '/') }$`);
      });
  }

  states.push(state);
}
