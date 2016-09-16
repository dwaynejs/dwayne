import Arr from './Arr';
import Elem, { find, win } from './Elem';
import Promise from './Promise';
import Str from './Str';
import Super from './Super';
import { switcher } from './Switcher';
import global from './constants/global';
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
const stateAttrName = 'dwayne-router-state';
const stoppable = new Arr(['beforeLeave', 'beforeLoad']);
const stopError = new Error();
const states = new Arr([]);
const pathSwitcher = switcher('call', () => {
  throw new Error('State path must be a string, a regular expression, null or undefined! (registerState)');
})
  .case(isRegExp, (path) => ({
    path: path.source,
    params: {}
  }))
  .case(isNullOrUndefined, () => ({
    path: '/',
    params: {}
  }))
  .case(isString, (path) => {
    if (path.indexOf('/')) {
      throw new Error('If state path is a string it must start with "/"! (at registerState)');
    }

    const index = path.indexOf('?');
    const params = new Super({});
    const newPath = new Str(path)
      .slice(0, index === -1 ? path.length : index + 1)
      .replace(/^\/|\/$/g)
      .split(/\/[^\/]*/g)
      .map((part, i, array) => {
        if (!part && array.length > 1) {
          throw new Error('If state path is a string it must not contain "//"! (at registerState)');
        }

        const index = part.indexOf(':');

        if (index > 0) {
          throw new Error('If state path is a string resource part must be either a string or an URL parameter! (at registerState)');
        }

        if (index === -1) {
          return {
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
          value: regexp
        };
      })
      .word((path) => {
        if (path.type === 'param') {
          path = `(${ path.value.source })`;
        } else {
          path = new Str(path.value).escapeRegExp().$;
        }

        return `/${ path }`;
      });

    return {
      path: newPath,
      params: params.$
    };
  });

let eventPromise = Promise.resolve();
let pushed;
let initialized;
let routerLoaded;
let router = find('#dwayne-router').first();
let pageTitle;
let pageIcon;
let currentTitle;
let currentIcon;

export class Router {
  static init() {
    initialized = true;

    initialize();

    return this;
  }

  constructor() {
    this.templateParams = new Super(new Super(this).proto().constructor.templateParams).create().$;
  }

  back() {
    history.back();

    return this;
  }

  forward() {
    history.forward();

    return this;
  }

  go(page) {
    history.go(page);

    return this;
  }

  on(event, listener) {
    if (arguments.length >= 2) {
      event = { [event]: listener };
    }

    const { listeners } = this.$$;
    const allListeners = {};

    iterate(event, (listener, event) => {
      const array = listeners[event] || new Arr([]);

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

  onBeforeLeave() {}

  onBeforeLoad() {}

  onLeave() {}

  onLoad() {}

  onRender() {}
}

export const MainState = Router.prototype;

let defaultState = Router;

defineProperties(Router, {
  $$: {
    listeners: {},
    state: null,
    states
  },

  parent: null,
  children: new Arr([]),
  name: null,
  path: '/',
  params: {},
  templateParams: {},
  otherQuery: true,
  query: {},
  template: '',
  encodeParams: true,
  encodeQuery: true,
  icon: null,
  title: null,

  'get/set default': {
    get() {
      return defaultState;
    },
    set(state) {
      if (!isInstanceOfRouterState(state)) {
        throw new Error('State must extend Router! (Router.default)');
      }

      if (state.params.length || state.query.type === 'some' || state.query.required.count) {
        throw new Error('Default state must not have URL or query params! (Router.default)');
      }

      defaultState = state;
    }
  }
});

defineProperties(MainState, {
  base: router
});

function constructState(cls, url, options) {
  const state = new cls();
  const {
    params = {},
    query = {},
    hash
  } = options;

  defineProperties(state, {
    $$: {
      listeners: {}
    }
  });

  assign(state, {
    url,
    params,
    query,
    templateParams: new Super(cls.templateParams).create().$,
    hash
  });

  return state;
}
function redirect(url, push) {
  const currentState = Router.$$.state;
  const currentURL = new URL(location.pathname);
  const newURL = new URL(url, currentURL);

  eventPromise = eventPromise
    .then(() => dispatchNewEvent('beforeLeave'))
    .then(() => dispatchNewEvent('leave'))
    .then(() => {
      currentState.base
        .hide()
        .html('');
    })
    .then(() => beforeLoad(newURL, push ? 'pushState' : 'replaceState'))
    .catch(() => {});

  function dispatchNewEvent(type) {
    return dispatchEvent(new Super({}).value({
      type,
      state: currentState,
      url: currentURL
    }).$);
  }
}
function beforeLoad(newURL, action) {
  const {
    query,
    hash
  } = resolveURL(newURL, Router.encodeQuery);
  let newState;

  return Promise.resolve()
    .then(() => {
      let promise = Promise.reject();

      findStatesByURL(newURL, query).forEach(({ state, params }) => {
        promise = promise
          .catch(() => {
            const options = {
              params,
              query,
              hash
            };

            newState = constructState(state, newURL, options);

            return dispatchNewEvent('beforeLoad');
          });
      });

      return promise;
    })
    .then(() => {
      if (newURL.origin === origin) {
        if (action) {
          history[action](null, null, newURL.href);
        }

        pushed = true;

        Router.$$.state = newState;
      } else {
        location.href = newURL.href;
      }
    })
    .then(() => dispatchNewEvent('load'))
    .then(() => {
      const proto = new Super(newState).proto().constructor;
      const states = new Arr([proto]);
      const {
        templateParams,
        title,
        icon
      } = newState;
      const ownTemplateParams = new Super(templateParams).clone();
      let state = proto;
      let promise = Promise.resolve();

      while (!getStateBase(state).length && (state = state.parent)) {
        states.unshift(state);
      }

      states.forEach((state) => {
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
            .show()
            .html(isFunction(template) ? template(templateParams) : template);

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

          return dispatchNewEvent('render', false);
        });
      });

      return promise;
    })
    .catch((err) => {
      console.log(err);
    });

  function dispatchNewEvent(type) {
    return dispatchEvent(new Super({}).value({
      type,
      state: newState,
      url: newURL
    }).$);
  }
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
  const value = param.slice(1 + name.length);
  let regexp;

  if (value && (value.indexOf('(') && value.indexOf(')') !== value.length - 1)) {
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
function findStatesByURL(url, query) {
  query = new Super(query);

  const { pathname } = url;
  const eventualStates = states.object((states, state) => {
    const {
      path,
      params,
      otherQuery,
      query: requiredQuery
    } = state;
    const eventualParams = {};
    let paths = new Arr([path]);
    let proto = state;

    while (proto = proto.parent) {
      paths.unshift(proto.path);
    }

    paths = paths
      .join('/')
      .replace(/\/+/g, '/');

    const regexp = new RegExp(`^${ paths }$`);
    const match = pathname.match(regexp);

    if (!match) {
      return false;
    }

    if (!otherQuery) {
      if (query.some((param) => !requiredQuery[param])) {
        return;
      }
    }

    /* eslint guard-for-in: 0 */
    for (const param in requiredQuery) {
      if (!query.$[param] || !requiredQuery[param].test(query.$[param])) {
        return;
      }
    }

    match.shift();

    for (const param in params) {
      eventualParams[param] = match[params[param]];
    }

    states.push({
      state,
      params: eventualParams
    });
  }, new Arr([]));

  if (eventualStates.indexOf(defaultState) === -1) {
    eventualStates.push({
      state: defaultState,
      params: {}
    });
  }

  return eventualStates;
}
function dispatchEvent(event, bubbles = true) {
  let paused;
  let stopped;
  let continuePropagation = () => {};
  let promise = Promise.resolve();

  const {
    type,
    state
  } = event;
  const listeners = getListeners(state, type, bubbles);
  const isStoppable = stoppable.indexOfStrict(type) === -1;
  const isEventCompatible = isStoppable && state !== defaultState;

  new Super(event).value({
    continue() {
      if (isEventCompatible) {
        paused = false;
        continuePropagation();
      }
    },
    pause() {
      if (isEventCompatible) {
        paused = true;
      }
    },
    stop() {
      if (isEventCompatible) {
        stopped = true;
      }
    }
  });

  listeners.forEach((listener) => {
    promise = promise.then(() => new Promise((resolve, reject) => {
      let finished = false;

      continuePropagation = () => {
        if (finished) {
          resolve();
        }
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
    if (err !== stopError) {
      console.error('%s %o', 'Uncaught (in event listener)', err);

      if (isEventCompatible) {
        throw err;
      }
    }
  });
}
function getListeners(state, type, bubbles) {
  const tree = new Arr([]);
  const desc = /leave/i.test(type);
  const listenerName = `on${ new Str(type).capitalizeFirst() }`;
  const ownListeners = (state.$$.listeners || new Arr([])).$;
  let proto = new Super(state).proto().constructor;

  while (proto) {
    tree[desc ? 'push' : 'unshift'](proto);

    proto = bubbles && proto.parent;
  }

  const listeners = new Arr(tree)
    .object((listeners, value) => {
      if (new Super(value).hasOwn(listenerName)) {
        listeners.push(value);
      }
    }, new Arr([]));

  listeners[desc ? 'unshift' : 'push'].apply(listeners, ownListeners);

  return listeners.$;
}
function initialize() {
  if (initialized && !routerLoaded) {
    routerLoaded = true;
    pageTitle = find('#dwayne-router-title');
    pageIcon = find('#dwayne-router-icon');

    find(`[${ stateAttrName }]`).hide();

    MainState.base = router = find('#dwayne-router').first();

    if (!router.html()) {
      const {
        template,
        templateParams
      } = Router;

      router.html(isFunction(template) ? template(templateParams) : template);
    }

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

    states
      .forEach((state) => {
        const { parent } = state;
        let proto = state;
        let count = 0;

        while (proto = proto.parent) {
          count += new Super(proto.params).count;
        }

        parent.children.push(state);

        new Super(state.templateParams).proto(parent.templateParams);
        new Super(state.query).proto(parent.query);
        new Super(state.params)
          .proto(parent.params)
          .forEach((value, key, params) => {
            params[key] += count;
          });
      });

    eventPromise = eventPromise
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

export function buildURL(url, options = {}) {
  validate([url], ['string'], 'buildURL');

  const {
    params = {},
    query = {},
    hash = location.hash.replace(/^#/, '')
  } = options;

  return constructURL(origin, url, params, query, hash, {
    params: Router.encodeParams,
    query: Router.encodeQuery
  });
}
export function directTo(url) {
  redirect(new URL(url, location.href), true);
}
export function redirectTo(url) {
  redirect(new URL(url, location.href));
}
export function registerState(state) {
  if (!isInstanceOfRouterState(state)) {
    throw new Error('State must extend Router! (at registerState)');
  }

  const { stateName } = state;

  if (!new Super(state).hasOwn('stateName') || states.find(({ stateName: n }) => n === stateName)) {
    throw new Error('State must have unique stateName! (at registerState)');
  }

  const proto = Object.getPrototypeOf(state);

  if (isRegExp(proto.path)) {
    throw new Error('Path regexp state cannot be extended! (at registerState)');
  }

  const {
    path = '/',
    template = '',
    templateParams
  } = state;
  const {
    path: newPath,
    params
  } = pathSwitcher(path);

  defineProperties(state, {
    stateName,
    parent: proto,
    children: new Arr([]),
    template,
    path: newPath,
    params,
    templateParams,
    otherQuery: false,
    query: {}
  });

  const { query } = state;
  const index = isString(path) ? path.indexOf('?') : -1;

  if (index !== -1) {
    if (path.lastIndexOf('&') === path.length - 1) {
      state.otherQuery = true;
    }

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

        query[name] = regexp;
      });
  }

  states.push(state);
}
