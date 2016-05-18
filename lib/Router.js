import Arr from './Array';
import Promise from './Promise';
import Str from './String';
import Super from './Super';
import { window } from './HtmlElement';
import { isFunction, assign, iterate } from './helpers';

const history = global.history;
const location = global.location;
const stoppable = new Arr(['beforeLeave', 'beforeLoad']);
const stopError = new Error();

let loaded;
let initialized;
let routerLoaded;

export const Router = {
  $: {
    default: '/',
    icon: null,
    listeners: {},
    state: null,
    states: {},
    title: null
  },

  back() {
    return this.go(-1);
  },
  config(f) {
    const config = this.$;

    if (!arguments.length) {
      return config;
    }

    if (isFunction(f)) {
      f(config);
    } else {
      config.icon = f.icon || config.icon;
      config.title = f.title || config.title;
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
  history: new Arr([]),
  init() {
    initialized = true;
    
    firstLoad();
    
    return this;
  },
  on(event, listener) {
    if (arguments.length >= 2) {
      event = { [event]: listener };
    }

    const listeners = this.$.listeners;

    iterate(event, (listener, event) => {
      const array = listeners[event] || [];
      (listeners[event] = array).push(listener);
    });

    return this;
  },
  state(name, options) {
    const {
      controller = () => {},
      icon,
      parent,
      template = '',
      title,
      url = '/'
    } = options;

    if (this.$.states[name]) {
      throw new Error('State name must be unique');
    }

    const state = this.$.states[name] = {};

    state.controller = null;
    state.icon = icon;
    state.parent = parent;
    state.template = template;
    state.title = title;
    state.url = url;

    state.createController = function createController() {
      let ctrl;

      if (controller.prototype instanceof StateController.prototype) {
        ctrl = new controller();
      } else {
        ctrl = new StateController();
        controller.call(ctrl);
      }

      return ctrl;
    };
    
    return this;
  }
};

export class StateController {
  constructor() {
    Object.defineProperty(this, '$', {
      value: {
        listeners: {}
      }
    });
  }

  beforeLeave() {}
  beforeLoad() {}
  leave() {}
  load() {}
  on(event, listener) {
    if (arguments.length >= 2) {
      event = { [event]: listener };
    }

    const listeners = this.$.listeners;

    iterate(event, (listener, event) => {
      const array = listeners[event] || [];
      (listeners[event] = array).push(listener);
    });

    return this;
  }
}

window.on('DOMContentLoaded', () => {
  loaded = true;

  firstLoad();
});

function beforeLeave(state, title, url, push) {
  const currentURL = location.pathname;
  const event = {
    from: currentURL,
    to: url,
    type: 'beforeLeave'
  };

  dispatchEvent(event).then((error) => {
    if (error !== stopError) {
      leave(state, title, url, push);
    }
  });
}
function beforeLoad(state, title, url, push) {
  const currentURL = location.pathname;
  const event = {
    from: currentURL,
    to: url,
    type: 'beforeLoad'
  };

  dispatchEvent(event).then((error) => {
    if (error !== stopError) {
      try {
        if (push) {
          pushState(state, title, url);
        } else {
          replaceState(state, title, url);
        }

        load();
      } catch (err) {
        global.location = url;
      }
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

  dispatchEvent(event).then(() => {
    beforeLoad(state, title, url, push);
  });
}
function load() {
  const current = location.pathname;
  const def = Router.$.default;
  const newState = new Super(Router.$.states).find(({ urlRegExp }) => urlRegExp.test(current));

  if (newState) {
    Router.history.push(current);
    // TODO: render template and so on
    const event = {
      url: current,
      type: 'load'
    };

    dispatchEvent(event);
  } else if (current !== def) {
    replaceState(history.state, '', def);
    load();
  } else {
    console.error(`There is no state with default url (${ def })`);
  }
}

function constructURL(url, params) {
  params = new Super(params);
  url = new Str(url);

  iterate(params, (value, param) => {
    url = url.replaceString(':' + param, value);
  });

  return url.$;
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
    promise = promise.then(() => {
      return new Promise((resolve, reject) => {
        let finished;

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
      });
    });
  });

  return promise.catch((err) => {
    if (err !== stopError) {
      throw err;
    }

    return err;
  });
}
function firstLoad() {
  if (loaded && initialized && !routerLoaded) {
    routerLoaded = true;

    window.on('popstate', () => {
      load();
    });

    beforeLoad(history.state, '', location.pathname);
  }
}
function getListeners(state, type) {
  const tree = [];

  while (state) {
    tree.push(state);
    state = Router.$[state.parent];
  }

  return new Arr(tree).array((array, value) => {
    const controller = value.controller;

    array.push.apply(array, new Arr(controller.$.listeners[type]).push(controller[type]).map((listener) => {
      return { context: controller, listener };
    }).$);
  }).concat(new Arr(Router.$.listeners[type]).map((listener) => {
    return { context: Router, listener };
  }));
}
function pushState() {
  history.pushState.apply(history, arguments);
}
function replaceState() {
  history.replaceState.apply(history, arguments);
}

export function directByName(name, params) {
  const state = Router.$.states[name];
  
  if (!state) {
    throw new Error(`There is no state with given name (${ name })`);
  }
  
  beforeLeave(null, '', constructURL(state.url, params), true);
}
export function directTo(url) {
  beforeLeave(null, '', url, true);
}
export function redirectByName(name, params) {
  const state = Router.$.states[name];
  
  if (!state) {
    throw new Error(`There is no state with given name (${ name })`);
  }
  
  beforeLeave(null, '', constructURL(state.url, params));
}
export function redirectTo(url) {
  beforeLeave(null, '', url);
}
