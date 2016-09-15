import Arr from './Arr';
import Elem, { find, win } from './Elem';
import Promise from './Promise';
import Str from './Str';
import Super from './Super';
import { switcher } from './Switcher';
import global from './constants/global';
import {
  isFunction, isNull, isNullOrUndefined, isRegExp, isString,
  iterate, defineProperties, validate
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
const stoppable = new Arr(['beforeLeave', 'beforeLoad']);
const stopError = new Error();
const states = new Arr([]);
const pathSwitcher = switcher('call', () => {
  throw new Error('State path must be a string, a regular expression, null or undefined! (registerState)');
})
  .case(isRegExp, (path) => ({
    path: path.source,
    params: []
  }))
  .case(isNullOrUndefined, () => ({
    path: '/',
    params: []
  }))
  .case(isString, (path) => {
    if (path.indexOf('/')) {
      throw new Error('If state path is a string it must start with "/"! (at registerState)');
    }

    const index = path.indexOf('?');
    const params = [];
    const newPath = new Str(path)
      .slice(0, index === -1 ? path.length : index + 1)
      .replace(/^\/|\/$/g)
      .split(/\/[^\/]*/g)
      .map((part) => {
        if (!part) {
          throw new Error('If state path is a string it must not contain "//"! (at registerState)');
        }

        const index = path.indexOf(':');

        if (index > 0) {
          throw new Error('If state path is a string resource part must be either a string or an URL parameter! (at registerState)');
        }

        if (index === -1) {
          return {
            value: path
          };
        }

        const {
          name,
          regexp = /[^\/]*/
        } = resolveParameter(
          path.slice(1),
          'URL parameter must not be an empty string or contain characters besides "a-zA-Z_$"! (at registerState)',
          'URL parameter regexp validator must be within parentheses (e.g. :userId(\\d+) and not contain ones)! (at registerState)'
        );

        params.push(name);

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
      })
      .$;

    return {
      path: newPath,
      params
    };
  });

let eventPromise = Promise.resolve();
let pushed;
let initialized;
let routerLoaded;
let router;
let pageTitle;
let pageIcon;

export class RouterState {
  constructor() {
    this.templateParams = new Super(super.templateParams).create();
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

  init() {
    initialized = true;

    initialize();

    return this;
  }

  on(event, listener) {
    if (arguments.length >= 2) {
      event = { [event]: listener };
    }

    const { listeners } = this.$$;
    const allListeners = {};

    iterate(event, (listener, event) => {
      const array = listeners[event] || new Arr();

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

export const Router = RouterState.prototype;

let defaultState = Router;

defineProperties(RouterState, {
  parent: null,
  children: new Arr([]),
  name: null,
  path: '/',
  params: [],
  query: {
    type: 'any',
    required: {}
  },
  template: '',
  encodeParams: true,
  encodeQuery: true
});

defineProperties(Router, {
  $$: {
    listeners: {},
    state: null,
    states
  },

  templateParams: {},
  icon: null,
  title: null
});

defineProperties(RouterState, {
  'get/set default': {
    get() {
      return defaultState;
    },
    set(state) {
      if (!isInstanceOfRouterState(state)) {
        throw new Error('State must extend RouterState! (RouterState.default)');
      }

      if (isRegExp(state.path) || state.path.some(({ type }) => type === 'param')) {
        throw new Error('Default state must have string path without params! (RouterState.default)');
      }

      defaultState = state;
    }
  }
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
    },
    url,
    params,
    query,
    templateParams: new Super(cls.prototype.templateParams).create().$,
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
      currentState.base.html('');
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
  } = resolveURL(newURL, RouterState.encodeQuery);
  let newState;

  return Promise.resolve()
    .then(() => {
      let promise = Promise.reject();

      findStatesByURL(newURL).forEach(({ state, params }) => {
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
      const proto = new Super(newState).proto().$.constructor;
      const states = new Arr([proto]);
      const {
        templateParams,
        title,
        icon
      } = newState;
      let state = proto;
      let promise = Promise.resolve();

      while (state && state !== Router) {
        states.unshift(state);

        state = state.parent;
      }

      states.some((state) => {
        states.shift();

        return !router.find(`[dwayne-router-state="${ state.name }"]`).length;
      });

      states.forEach((state) => {
        const { name, template } = state;

        promise = promise.then(() => {
          const base = router
            .find(`[dwayne-router-state="${ name }"]`)
            .first()
            .html(isFunction(template) ? template(templateParams) : template);

          if (state === proto) {
            newState.base = base;

            if (!isNull(title)) {
              pageTitle.text(title);
            }

            if (!isNull(icon)) {
              pageIcon.ref(icon);
            }
          }

          return dispatchNewEvent('render', false);
        });
      });

      return promise;
    })
    .catch(() => {});

  function dispatchNewEvent(type) {
    return dispatchEvent(new Super({}).value({
      type,
      state: newState,
      url: newURL
    }).$);
  }
}

function isInstanceOfRouterState(state) {
  return isPrototypeOf.call(RouterState, state) || isPrototypeOf.call(Router, state.prototype);
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
function findStatesByURL(url) {
  const pathname = new Str(url.pathname);
  const eventualStates = states.filter((states, state) => {
    // TODO: get state classes list (default if not already present added to the end)

    const { path } = state;
    const paths = new Arr([path]);
    let proto;

    while (proto = state.parent) {
      paths.unshift(proto.path);
    }

    const regexp = new RegExp(
      paths
        .join('/')
        .replace(/\/+/g, ''),
      'i'
    );
    const match = pathname.match(regexp);

    if (!match.$) {
      return false;
    }

    match.shift();
  });

  if (eventualStates.indexOf(defaultState) === -1) {
    eventualStates.push(defaultState);
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
  const listeners = getListeners(new Super(state).proto().$.constructor, type, bubbles);
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

  while (state) {
    if (desc) {
      tree.push(state);
    } else {
      tree.unshift(state);
    }

    state = bubbles && state.parent;
  }

  return new Arr(tree)
    .reduce((array, value) => array.concat(value.$$.listeners[type] || []), new Arr([]))
    .$;
}
function initialize() {
  if (initialized && !routerLoaded) {
    routerLoaded = true;
    router = find('dwayne-router');
    pageTitle = find('dwayne-router-title');
    pageIcon = find('dwayne-router-icon');

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

        parent.children.push(state);

        new Super(state.prototype.templateParams).proto(parent.prototype.templateParams);
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
    throw new Error('State must extend RouterState! (at registerState)');
  }

  const { name } = state;

  if (states.find(({ name: n }) => n === name)) {
    throw new Error('State name must be unique! (at registerState)');
  }

  const proto = Object.getPrototypeOf(state);

  if (isRegExp(proto.path)) {
    throw new Error('Path regexp state cannot be extended! (at registerState)');
  }

  const {
    path,
    template = ''
  } = state;
  const {
    path: newPath,
    params
  } = pathSwitcher(path);

  defineProperties(state, {
    parent: proto,
    children: new Arr([]),
    template,
    path: newPath,
    params,
    query: {
      type: 'any',
      required: {}
    }
  });

  const query = state.query;
  const index = path.indexOf('?');

  if (isString(path) && index !== -1) {
    new Str(path)
      .slice(index + 1)
      .split('&')
      .forEach((param) => {
        if (!param) {
          query.type = 'some';

          return;
        }

        const {
          name,
          regexp = /[\s\S]*/
        } = resolveParameter(
          param,
          'Query parameter must not be an empty string or contain characters besides "a-zA-Z_$"! (at registerState)',
          'Query parameter regexp validator must be within parentheses (e.g. :userId(\\d+)) and not contain them! (at registerState)'
        );

        query.required[name] = regexp;
      });
  }

  states.push(state);
}
