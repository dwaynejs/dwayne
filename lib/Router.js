import Arr from './Arr';
import Elem, { find, window } from './Elem';
import Func from './Func';
import Promise from './Promise';
import Str from './Str';
import Super from './Super';
import { isFunction, assign, iterate, crossClassMethods, validate } from './helpers';
import constructURLHelper from './helpers/constructURL';

/**
 * @typedef {Object} RouterStateOptions
 * @property {Object} [params = {}] - Parameters for URL. For '/users/:userId' userId is a param.
 * @property {Object} [query = {}] - Query parameters for URL.
 */

const eventPromise = Promise.resolve();
const URL = global.URL;
const history = global.history;
const location = global.location;
const origin = location && location.origin;
const stoppable = new Arr(['beforeLeave', 'beforeLoad']);
const stopError = new Error();

let loaded;
let initialized;
let routerLoaded;

export class StateController {
  constructor() {
    Object.defineProperty(this, '$$', {
      value: {
        listeners: {}
      }
    });
  }

  beforeLeave() {}
  beforeLoad() {}
  leave() {}
  load() {}
  render() {}
  on(event, listener) {
    if (arguments.length >= 2) {
      event = { [event]: listener };
    }

    const { listeners } = this.$$;

    iterate(event, (listener, event) => {
      const array = listeners[event] || [];

      (listeners[event] = array).push(listener);
    });

    return this;
  }
}

export const Router = {
  $$: {
    default: null,
    listeners: {},
    state: null,
    states: {}
  },
  globals: {
    icon: null,
    title: null,
    params: {},
    query: {},
    hash: '',
    templateParams: {}
  },

  back() {
    return this.go(-1);
  },
  config(config) {
    const conf = this.$;

    if (!arguments.length) {
      return conf;
    }

    if (isFunction(config)) {
      config(conf);
    } else {
      conf.icon = config.icon || conf.icon;
      conf.title = config.title || conf.title;
    }

    return this;
  },
  forward() {
    return this.go(1);
  },
  go(page) {
    history.go(page);

    return this;
  },
  init() {
    initialized = true;

    initialize();
    
    return this;
  },
  on(event, listener) {
    if (arguments.length >= 2) {
      event = { [event]: listener };
    }

    const listeners = this.$$.listeners;

    iterate(event, (listener, event) => {
      const array = listeners[event] || [];

      (listeners[event] = array).push(listener);
    });

    return this;
  },
  addState(name, options = {}) {
    validate([name], ['string'], 'Router.addState');

    const {
      controller = () => {},
      icon,
      parent,
      template = '',
      title,
      url = '/'
    } = options;
    const { states } = this.$$;
    const stateController = new Func(controller);

    if (states[name]) {
      throw new Error('State name must be unique! (Router.addState)');
    }

    if (!isFunction(controller)) {
      throw new Error('Controller constructor must be a function! (Router.addState)');
    }

    const state = states[name] = {};

    state.controller = null;
    state.icon = icon;
    state.parent = parent;
    state.template = template;
    state.title = title;
    state.url = url;
    state.controllerClass = stateController;
    
    return this;
  }
};

window.on({
  DOMContentLoaded() {
    loaded = true;

    initialize();
  }
});

crossClassMethods.transformAnchor = (anchor) => {
  anchor.forEach((anchor) => {
    if (new Elem(anchor).name === 'a') {
      // TODO: transform src attr into d-href and src attrs
    }
  });
};

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
  const states = new Super(Router.$.states);
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
    Router.history.push(current);

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

function resolveURL() {

}
function constructURL(url, options = {}) {
  return constructURLHelper(origin, url, options.params || {}, options.query || {});
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
    const router = find('d-router');

    if (router) {
      routerLoaded = true;

      window.on({
        popstate() {
          load();
        },
        click(e) {
          const target = new Elem(e.target);

          if (target.name === 'a') {
            e.preventDefault();

            // TODO: handle anchor click (beforeLeave(...))
          }
        }
      });

      // TODO: resolve dependencies (parent, url)

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

  eventPromise.then(() => beforeLeave(null, '', constructURL(state.url, options), true));
}
export function directTo(url) {
  eventPromise.then(() => beforeLeave(null, '', url, true));
}
export function redirectByName(name, params) {
  const state = Router.$$.states[name];
  
  if (!state) {
    throw new Error(`There is no state with given name (${ name })`);
  }

  eventPromise.then(() => beforeLeave(null, '', constructURL(state.url, options)));
}
export function redirectTo(url) {
  eventPromise.then(() => beforeLeave(null, '', url));
}
