import Arr from './Arr';
import Elem, { find, window } from './Elem';
import Promise from './Promise';
import Str from './Str';
import Super from './Super';
import { switcher } from './Switcher';
import {
  isNullOrUndefined, isObject, isRegExp, isString,
  assign, iterate, crossClassMethods, validate, defineProperties
} from './helpers';
import constructURLHelper from './helpers/constructURL';

/**
 * @typedef {Object} RouterStateOptions
 * @property {Object} [params = {}] - Parameters for URL. For '/users/:userId' userId is a param.
 * @property {Object} [query = {}] - Query parameters for URL.
 */

const isPrototypeOf = {}.isPrototypeOf;
const URL = global.URL;
const history = global.history;
const location = global.location;
const origin = location && location.origin;
const stoppable = new Arr(['beforeLeave', 'beforeLoad']);
const stopError = new Error();
const states = new Super({});
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

    return new Str(path.slice(0, index === -1 ? path.length : index + 1))
      .match(/\/[^\/]*/g)
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
let loaded;
let initialized;
let routerLoaded;

export class RouterState {
  back() {
    history.back();

    return this;
  }

  beforeLeave() {}

  beforeLoad() {}

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

  leave() {}

  load() {}

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

  render() {}
}

export const Router = RouterState.prototype;

defineProperties(RouterState, {
  parent: null,
  children: [],
  path: [{ type: 'string', value: '/' }],
  params: {},
  query: {},
  hash: '',
  templateParams: {}
});

defineProperties(Router, {
  $$: {
    listeners: {},
    default: null,
    state: null,
    states
  },

  template: '',
  default: null,
  encodeParams: true,
  encodeQuery: true,
  icon: null,
  title: null
});

defineProperties(Router.$$, {
  'get/set default': {
    get() {
      return Router.$$.default;
    },
    set(name) {
      if (!states.prop(name)) {
        return;
      }

      Router.$$.default = states.prop(name);
    }
  }
});

window.on({
  DOMContentLoaded() {
    loaded = true;

    initialize();
  }
});

crossClassMethods.transformAnchor = (anchor) => {
  anchor.forEach((anchor) => {
    anchor = new Elem(anchor);

    if (anchor.name === 'a' && anchor.hasAttr('dwayne-state')) {
      // TODO: transform src attr into d-href and src attrs
    }
  });
};

function constructState(cls, url, {
  params = {},
  query = {},
  templateParams = {},
  hash = location.hash.replace(/^#/, '')
}) {
  const state = new cls();

  let proto = cls;
  let eventualParams = new Super({});
  let eventualQuery = new Super({});
  let eventualTemplateParams = new Super({});

  while (proto) {
    eventualParams = new Super({}).deepAssign(proto.params, eventualParams.$);
    eventualQuery = new Super({}).deepAssign(proto.query, eventualQuery.$);
    eventualTemplateParams = new Super({}).deepAssign(proto.templateParams, eventualTemplateParams.$);

    proto = proto.parent;
  }

  eventualParams.deepAssign(params);
  eventualQuery.deepAssign(query);
  eventualTemplateParams.deepAssign(templateParams);

  defineProperties(state, {
    $$: {
      listeners: {}
    },
    url: constructURLHelper(origin, url, params, query, hash, {
      params: Router.encodeParams,
      query: Router.encodeQuery
    }),
    params: eventualParams.$,
    query: eventualQuery.$,
    templateParams: eventualTemplateParams.$,
    hash
  });

  return state;
}
function beforeLeave(state, title, url, push) {
  const currentURL = location.pathname;
  const event = {
    from: currentURL,
    to: url,
    type: 'beforeLeave'
  };

  return dispatchEvent(event).then((error) => {
    if (error !== stopError) {
      return leave(state, title, url, push);
    }

    return error;
  });
}
function beforeLoad(state, title, url, push) {
  const currentURL = location.pathname;
  const event = {
    from: currentURL,
    to: url,
    type: 'beforeLoad'
  };

  return dispatchEvent(event).then((error) => {
    if (error === stopError) {
      return error;
    }

    url = new URL(url, currentURL).href.replace(/\/$/, '');

    if (url.indexOf(origin) === 0) {
      if (push) {
        pushState(state, title, url);
      } else {
        replaceState(state, title, url);
      }
    } else {
      location.href = url;
    }
  });
}
function leave(state, title, url, push) {
  const currentURL = location.pathname;
  const event = {
    from: currentURL,
    to: url,
    type: 'leave'
  };

  return dispatchEvent(event).then(() => beforeLoad(state, title, url, push));
}
function load() {
  const current = location.pathname;
  const def = Router.$.default;
  const maxMatch = states.max(({ urlRegExp }) => {
    const match = current.match(urlRegExp);

    return match && match[0].length;
  });
  /*
  const minLevel = states
    .filter(({ urlRegExp }) => {
      const match = current.match(urlRegExp);
      
      return match && match[0].length === maxMatch.value;
    })
    .min(({ level }) => level);
    */

  if (maxMatch.value > 0) {
    const event = {
      url: current,
      type: 'load'
    };

    dispatchEvent(event);
  } else if (current === def) {
    console.error(`There is no state with default url (${ def })`);
  } else {
    replaceState(history.state, '', def);
  }
}
/*
function render() {

}
*/

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
function resolveQueryParams(rawParams) {
  const params = {};

  new Str(rawParams)
    .split('&')
    .forEach((rawParam) => {
      let [param, value] = rawParam.split('=');

      param = Router.encodeQuery ? decodeURIComponent(param) : param;
      value = Router.encodeQuery ? decodeURIComponent(value) : value;

      if (!/^[^\[]+/.test(param)) {
        return;
      }

      let paramName;
      let paramObject = params;

      new Str(param)
        .match(/^[\s\S]*|\[[\s\S]*\]/g)
        .forEach((name) => {
          if (name.indexOf('[')) {
            paramName = name;

            return;
          }

          name = name.slice(1, -1);

          paramObject = paramObject[paramName] = paramObject[paramName] || (name ? {} : []);
          paramName = name || paramObject.length;
        });

      paramObject[paramName] = value;
    });

  return params;
}
function findStateByURL(url) {

}
function findStateByName(name, functionSource) {
  const state = states.prop(name);

  if (!state) {
    throw new Error(`There is no state with given name (${ name })! (${ functionSource })`);
  }

  return state;
}
function resolveURL() {

}
function constructURL(url, options = {}) {
  return constructURLHelper(origin, url, options.params || {}, options.query || {}, options.hash || '');
}
function dispatchEvent(event) {
  let paused;
  let stopped;
  let continuePropagation = () => {};
  let promise = Promise.resolve();

  const type = event.type;
  const currentState = Router.$.state;
  const listeners = getListeners(currentState, type);

  if (stoppable.indexOfStrict(type) === -1) {
    assign(event, {
      continue() {
        paused = false;
        continuePropagation();
      },
      pause() {
        paused = true;
      },
      stop() {
        stopped = true;
      }
    });
  }

  listeners.forEach(({ context, listener }) => {
    promise = promise.then(() => new Promise((resolve, reject) => {
      let finished = false;

      continuePropagation = () => {
        if (finished) {
          resolve();
        }
      };

      listener.call(context, event);

      finished = true;

      if (stopped) {
        return reject(stopError);
      }

      if (!paused) {
        return resolve();
      }
    }));
  });

  return promise.catch((err) => {
    if (err !== stopError) {
      throw err;
    }

    return err;
  });
}
function getListeners(state, type) {
  const tree = [];

  while (state) {
    tree.push(state);
    state = state.parent;
  }

  return new Arr(tree)
    .object((array, value) => {
      const controller = value.controller;

      array.push.apply(
        array,
        new Arr(controller.$$.listeners[type])
          .push(controller[type])
          .map((listener) => ({
            context: controller,
            listener
          })).$
      );
    }, [])
    .concat(
      new Arr(Router.$$.listeners[type]).map((listener) => ({
        context: Router,
        listener
      }))
    );
}
function initialize() {
  if (loaded && initialized && !routerLoaded) {
    const router = find('dwayne-router');

    // TODO: transform all links present

    if (router.length) {
      routerLoaded = true;

      window.on({
        DOMNodeInserted() {
          // TODO: transform dwayne-data-state into href
        },
        popstate() {
          load();
        },
        click(e) {
          const target = new Elem(e.target);

          if (target.name === 'a') {
            const url = target.attr('href') || '';
            const currentURL = location.href;
            const newURL = new URL(url, currentURL);
            const index = newURL.indexOf('#');

            if (
              index !== -1 && (
                currentURL.indexOf('#') === -1 || (
                  currentURL.slice(index) === newURL.slice(index) &&
                  location.hash !== newURL.hash
                )
              )
            ) {
              return;
            }

            e.preventDefault();

            // TODO: handle anchor click based on data-dwayne-state, data-dwayne-params, data-dwayne-query,
            // TODO: data-dwayne-hash, data-dwayne-data, data-dwayne-template-params
            // TODO: handle anchor click (beforeLeave(...))
          }
        }
      });

      states
        .forEach((state) => {
          state.parent.children.push(state);
        });

      beforeLoad(history.state, '', location.pathname);
    }
  }
}
function pushState() {
  history.pushState.apply(history, arguments);
}
function replaceState() {
  history.replaceState.apply(history, arguments);
}

export function directByName(name, options) {
  const state = Router.$$.states[name];
  
  if (!state) {
    throw new Error(`There is no state with given name (${ name })`);
  }

  eventPromise = eventPromise.then(() => beforeLeave(null, '', constructURL(state.url, options), true));
}
export function directTo(url) {
  eventPromise = eventPromise.then(() => beforeLeave(null, '', url, true));
}
export function redirectByName(name, options) {
  const state = Router.$$.states[name];
  
  if (!state) {
    throw new Error(`There is no state with given name (${ name })`);
  }

  eventPromise = eventPromise.then(() => beforeLeave(null, '', constructURL(state.url, options)));
}
export function redirectTo(url) {
  eventPromise = eventPromise.then(() => beforeLeave(null, '', url));
}
export function registerState(state) {
  if (isPrototypeOf.call(RouterState, state) || isPrototypeOf.call(Router, state.prototype)) {
    throw new Error('State must extend RouterState! (registerState)');
  }

  const { name } = state;

  if (states.hasOwn(name)) {
    throw new Error('State name must be unique! (registerState)');
  }

  const {
    path,
    params,
    query,
    templateParams,
    template = ''
  } = state;

  defineProperties(state, {
    parent: Object.getPrototypeOf(state),
    children: new Arr(),
    template,
    path: pathSwitcher(path),
    params: isObject(params) ? params : {},
    query: isObject(query) ? query : {},
    templateParams: isObject(templateParams) ? templateParams : {},
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

  states.prop(name, state);
}
