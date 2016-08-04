import Arr from './Array';
import HtmlElement, { find, window } from './HtmlElement';
import Promise from './Promise';
import Str from './String';
import Super from './Super';
import { isFunction, assign, iterate, crossClassMethods } from './helpers';

// const eventPromise = Promise.resolve();
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
  render() {}
  on(event, listener) {
    if (arguments.length >= 2) {
      event = { [event]: listener };
    }

    const { listeners } = this.$;

    iterate(event, (listener, event) => {
      const array = listeners[event] || [];

      (listeners[event] = array).push(listener);
    });

    return this;
  }
}

export const Router = {
  $: {
    default: '/',
    icon: null,
    listeners: {},
    state: null,
    states: {},
    title: null
  },

  history: new Arr([]),

  get store() {
    return store.$;
  },
  set store(value) {
    store.assign(value);
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
  init() {
    initialized = true;

    initialize();
    
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
    state.createController = () => {
      let ctrl;

      if (controller.prototype instanceof StateController) {
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

window.on({
  DOMContentLoaded() {
    loaded = true;

    initialize();
  },
  DOMNodeInserted({ target }) {
    target = new HtmlElement(target);

    const anchors = target.findAll('a');

    if (target.name === 'a') {
      anchors.push(target);
    }

    anchors.forEach((anchor) => {
      const { domcData } = anchor.$;

      if (!domcData.clickHandler) {
        domcData.clickHandler = anchor.on('click', ({ target }) => {
          if (target === anchor.$ && !anchor.attr('download')) {
            e.preventDefault();

            // TODO: handle anchor click (beforeLeave(...))
          }
        });
      }
    });
  }
});

crossClassMethods.transformAnchor = (anchor) => {
  if (anchor.name === 'a') {
    // TODO: transform src attr into d-href and src attrs
  }
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
    if (error !== stopError) {
      url = new URL(url, currentURL).href.replace(/\/$/, '');

      if (url.indexOf(origin) === 0) {
        if (push) {
          pushState(state, title, url);
        } else {
          replaceState(state, title, url);
        }
      } else {
        global.location = url;
      }

      return;
    }

    return error;
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
    load();
  }
}
/*
function render() {

}
*/

function constructURL(url, params) {
  params = new Super(params);
  url = new Str(url);

  iterate(params, (value, param) => {
    url = url.replaceString(`:${ param }`, value);
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
    state = Router.$[state.parent];
  }

  return new Arr(tree)
    .object((array, value) => {
      const controller = value.controller;

      array.push.apply(
        array,
        new Arr(controller.$.listeners[type])
          .push(controller[type])
          .map((listener) => ({
            context: controller,
            listener
          })).$
      );
    }, [])
    .concat(
      new Arr(Router.$.listeners[type]).map((listener) => ({
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

      window.on('popstate', () => {
        load();
      });

      // TODO: resolve dependencies (parent, url)

      beforeLoad(history.state, '', location.pathname);
    }
  }
}
function pushState() {
  history.pushState.apply(history, arguments);
  load();
}
function replaceState() {
  history.replaceState.apply(history, arguments);
  load();
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
