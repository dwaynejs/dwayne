import Arr from './Arr';
import Elem, { find, window } from './Elem';
import Promise from './Promise';
import Str from './Str';
import Super from './Super';
import { switcher } from './Switcher';
import {
  isNullOrUndefined, isRegExp, isString,
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
  location
} = global;
const origin = location && location.origin;
const stoppable = new Arr(['beforeLeave', 'beforeLoad']);
const stopError = new Error();
const states = new Arr([]);
const pathSwitcher = switcher('call', () => {
  throw new Error('State path must be a string, a regular expression, null or undefined! (registerState)');
})
  .case(isRegExp, (path) => path)
  .case(isNullOrUndefined, () => new Arr([]))
  .case(isString, (path) => {
    if (path.indexOf('/')) {
      throw new Error('If state path is a string it must start with "/"! (registerState)');
    }

    const index = path.indexOf('?');

    return new Str(path)
      .slice(0, index === -1 ? path.length : index + 1)
      .replace(/^\/|\/$/g)
      .split(/\/[^\/]*/g)
      .map((part) => {
        if (!part) {
          throw new Error('If state path is a string it must not contain "//"! (registerState)');
        }

        const index = path.indexOf(':');

        if (index > 0) {
          throw new Error('If state path is a string resource part must be either a string or an URL parameter! (registerState)');
        }

        if (index === -1) {
          return {
            type: 'string',
            value: path
          };
        }

        const {
          name,
          regexp = /[^\/]*/
        } = resolveParameter(
          path.slice(1),
          'URL parameter should not be an empty string or contain characters besides "a-zA-Z_$"! (registerState)',
          'URL parameter regexp validator should be within parentheses (e.g. :userId(^\\d+$))! (registerState)'
        );

        return {
          type: 'param',
          name,
          regexp
        };
      });
  });

let eventPromise = Promise.resolve();
let pushed;
let initialized;
let routerLoaded;
let RouterInstance;

export class RouterState {
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

export const Router = RouterInstance = RouterState.prototype;

let defaultState = Router;

defineProperties(RouterState, {
  parent: null,
  children: [],
  name: null,
  path: [{ type: 'string', value: '/' }],
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
      // TODO: remove view
    })
    .then(() => beforeLoad(newURL, push))
    .catch(() => {});

  function dispatchNewEvent(type, state, url) {
    return dispatchEvent(new Super({}).value({
      type,
      state: currentState,
      url: currentURL
    }).$);
  }
}
function beforeLoad(newURL, push) {
  const {
    query,
    hash
  } = resolveURL(newURL, RouterState.encodeQuery);
  let newState;

  return Promise.resolve()
    .then(() => {
      const statesClasses = findStatesByURL(newURL);
      let promise = Promise.reject();

      statesClasses.forEach(({ state, params }) => {
        promise = promise
          .catch(() => {
            const options = {
              params,
              query,
              hash
            };

            newState = constructState(state, newURL, options);

            return dispatchNewEvent();
          });
      });

      return promise;
    })
    .then(() => {
      if (newURL.origin === origin) {
        history[push ? 'pushState' : 'replaceState'](null, null, newURL.href);

        pushed = true;

        Router.$$.state = newState;
      } else {
        location.href = newURL.href;
      }
    })
    .catch(() => {});

  function dispatchNewEvent() {
    return dispatchEvent(new Super({}).value({
      type: 'beforeLoad',
      state: newState,
      url: newURL
    }).$);
  }
}
function load() {

}
/*
function render() {

}
*/

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
  return states.object((states, state) => {
    // TODO: get state classes list (default if not already present added to the end)

    const { path } = state;
  }, new Arr([]));
}
function dispatchEvent(event) {
  let paused;
  let stopped;
  let continuePropagation = () => {};
  let promise = Promise.resolve();

  const {
    type,
    state
  } = event;
  const listeners = getListeners(state, type);
  const isStoppable = stoppable.indexOfStrict(type) === -1;

  new Super(event).value({
    continue() {
      if (isStoppable && state !== defaultState) {
        paused = false;
        continuePropagation();
      }
    },
    pause() {
      if (isStoppable && state !== defaultState) {
        paused = true;
      }
    },
    stop() {
      if (isStoppable && state !== defaultState) {
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

      if (isStoppable && state !== defaultState) {
        throw err;
      }
    }
  });
}
function getListeners(state, type, asc) {
  const tree = new Arr([]);

  while (state) {
    if (asc) {
      tree.unshift(state);
    } else {
      tree.push(state);
    }

    state = state.parent;
  }

  return new Arr(tree)
    .reduce((array, value) => array.concat(value.$$.listeners[type] || []), new Arr([]))
    .$;
}
function initialize() {
  if (initialized && !routerLoaded) {
    const router = find('dwayne-router');

    if (router.length) {
      routerLoaded = true;

      window.on({
        popstate() {
          if (pushed) {
            load();
          }
        },
        click(e) {
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
        }
      });

      states
        .forEach((state) => {
          const { parent } = state;

          parent.children.push(state);

          new Super(state.prototype.templateParams).proto(parent.prototype.templateParams);
        });

      eventPromise = eventPromise.then(() => beforeLoad(new URL(location.pathname)));
    }
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
    params: RouterInstance.encodeParams,
    query: RouterInstance.encodeQuery
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
    throw new Error('State must extend RouterState! (registerState)');
  }

  const { name } = state;

  if (states.find(({ name: n }) => n === name)) {
    throw new Error('State name must be unique! (registerState)');
  }

  const proto = Object.getPrototypeOf(state);

  if (isRegExp(proto.path)) {
    throw new Error('Path regexp state cannot be extended! (registerState)');
  }

  const {
    path,
    template = ''
  } = state;

  defineProperties(state, {
    parent: proto,
    children: new Arr([]),
    template,
    path: pathSwitcher(path),
    requiredQueryParams: {
      type: 'any',
      required: {}
    }
  });

  const requiredQueryParams = state.requiredQueryParams;
  const index = path.indexOf('?');

  if (isString(path) && index !== -1) {
    new Str(path)
      .slice(index + 1)
      .split('&')
      .forEach((param) => {
        if (!param) {
          requiredQueryParams.type = 'some';

          return;
        }

        const {
          name,
          regexp = /[\s\S]*/
        } = resolveParameter(
          param,
          'Query parameter should not be an empty string or contain characters besides "a-zA-Z_$"! (registerState)',
          'Query parameter regexp validator should be within parentheses (e.g. :userId(^\\d+$))! (registerState)'
        );

        requiredQueryParams.required[name] = regexp;
      });
  }

  states.push(state);
}
