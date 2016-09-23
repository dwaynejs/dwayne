/**
 * @module Router
 * @private
 * @mixin
 * @description Exports Router class.
 */

import Arr from './Arr';
import Elem, { find, win } from './Elem';
import Func from './Func';
import Promise from './Promise';
import Str from './Str';
import Super from './Super';
import { switcher } from './Switcher';
import {
  isFunction, isNull, isNullOrUndefined, isRegExp, isString,
  assign, iterate, defineProperties
} from './helpers';
import constructURL from './helpers/constructURL';
import resolveURL from './helpers/resolveURL';

/**
 * @typedef {Object} URLOptions
 * @public
 * @property {Object} [params = {}] - URL params.
 * @property {Object} [query = {}] - Query params.
 * @property {String} [hash = ''] - Hash.
 */

/**
 * @event Router#event
 * @public
 * @description Router event.
 */

/**
 * @method Router#event#pause
 * @public
 * @description Method that pauses the event propagation. Only {@link Router#event:beforeLeave} and
 * {@link Router#event:beforeLoad} can be paused.
 *
 * @example
 * event.pause();
 */

/**
 * @method Router#event#continue
 * @public
 * @description Method that continues the event propagation. Only {@link Router#event:beforeLeave} and
 * {@link Router#event:beforeLoad} can be paused therefore continued.
 *
 * @example
 * event.continue();
 */

/**
 * @method Router#event#stop
 * @public
 * @description Method that stops the event propagation. Only {@link Router#event:beforeLeave} and
 * {@link Router#event:beforeLoad} can be stopped.
 *
 * @example
 * event.stop();
 */

/**
 * @event Router#event:init
 * @public
 * @property {String} type - 'init' string.
 * @description Router init event. Is fired once after Router.init has been called
 * and Router initialization. It cannot be [paused]{@link Router#event#pause}
 * or [stopped]{@link Router#event#stop}.
 */

/**
 * @event Router#event:beforeLeave
 * @public
 * @property {String} type - 'beforeLeave' string.
 * @property {Router} state - Current state.
 * @property {URL} url - Current URL.
 * @property {URL} toURL - URL the redirect goes to.
 * @description Router beforeLeave event. Is fired when an attempt to leave the state happened
 * (or it bubbled to the parent state). It can be [paused]{@link Router#event#pause}
 * and [stopped]{@link Router#event#stop}.
 */

/**
 * @event Router#event:leave
 * @public
 * @property {String} type - 'leave' string.
 * @property {Router} state - Current state.
 * @property {URL} url - Current URL.
 * @property {URL} toURL - URL the redirect goes to.
 * @description Router leave event. Is fired right after {@link Router#event:beforeLeave} has been fired.
 * It cannot be [paused]{@link Router#event#pause} or [stopped]{@link Router#event#stop}.
 */

/**
 * @event Router#event:beforeLoad
 * @public
 * @property {String} type - 'beforeLoad' string.
 * @property {Router} state - Loading state.
 * @property {URL} url - Loading URL.
 * @description Router beforeLoad event. Is fired when the URL has been already changed after
 * {@link Router#event:leave} has been fired, after the only {@link Router#event:init}
 * has been fired and after browser back or forward buttons has been pressed.
 * It can be [paused]{@link Router#event#pause} and [stopped]{@link Router#event#stop}
 * preventing the state from loading and causing going to the next matched state.
 * Is fired from the Router state down to the loading state.
 */

/**
 * @event Router#event:load
 * @public
 * @property {String} type - 'leave' string.
 * @property {Router} state - Loading state.
 * @property {URL} url - Loading URL.
 * @description Router load event. Is fired right after {@link Router#event:beforeLoad} has been fired.
 * It cannot be [paused]{@link Router#event#pause} or [stopped]{@link Router#event#stop}.
 * Is fired from the Router state down to the loading state.
 */

/**
 * @event Router#event:render
 * @public
 * @property {String} type - 'render' string.
 * @property {Router} state - Rendering state.
 * @property {URL} url - Loading URL.
 * @description Router load event. Is fired right after {@link Router#event:beforeLoad} has been fired.
 * It cannot be [paused]{@link Router#event#pause} or [stopped]{@link Router#event#stop}.
 * In order to render the state there should be an element with the "dwayne-router-state" attribute
 * set to the state name. States are rendered from the Router down to the current state.
 */

/**
 * @callback RouterRemoveListeners
 * @public
 * @param {String} [event] - If not specified all listeners are removed.
 * Otherwise only specified by the name are to be removed.
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
let defaultState;
let currentState;
let currentURL = new URL(location.href);
let currentTitle;
let currentIcon;

/**
 * @class Router
 * @public
 * @param {Object} props - Always pass props to the super constructor from the Router subclasses.
 * @returns {Router} New instance of Router state.
 * @description Wrap of an array.
 *
 * @example
 * Class for routing the app. It uses [History API]{@link https://developer.mozilla.org/en/docs/Web/API/History_API}.
 * You can redirect and go to parts of your app not reloading the page (changing the URL).
 * URLs and queries can be validates. There can hooks (such as {@link Router#event:beforeLoad},
 * {@link Router#event:load}, {@link Router#event:beforeLeave}, {@link Router#event:leave}
 * and {@link Router#event:render}). Don't try to call new <YourState>() or new Router().
 * All following examples contain proposed syntax for class properties.
 */
export class Router {
  /**
   * @member {Object} Router.$$
   * @type {Object}
   * @protected
   * @property {Object} listeners - State listeners.
   * @property {Arr} [states] - All states. Only Router has this property.
   * @property {Router} [state] - Current state. Only Router has this property.
   * @description Config object.
   */
  static $$ = {
    listeners: {},
    state: null,
    states
  };

  /**
   * @member {Router} Router.parent
   * @type {Router}
   * @protected
   * @description Parent state.
   */
  static parent = null;

  /**
   * @member {Arr} Router.children
   * @type {Arr}
   * @protected
   * @description Children states.
   */
  static children = new Arr([]);

  /**
   * @member {RegExp} Router.validatePath
   * @type {RegExp}
   * @protected
   * @description Regexp to validate the URL. Created during the router initialization.
   */
  static validatePath = /^\/$/;

  /**
   * @member {String} Router.url
   * @type {String}
   * @protected
   * @description State matching URL. Generated during the router initialization.
   */
  static url = '/';

  /**
   * @member {String} Router.relativePath
   * @type {String}
   * @protected
   * @description State matching relative path. Generated during the state registration.
   */
  static relativePath = '/';

  /**
   * @member {String|RegExp} Router.relativeURL
   * @type {String|RegExp}
   * @protected
   * @description State matching relative URL. Generated during the state registration.
   */
  static relativeURL = '/';

  /**
   * @member {Object} Router.params
   * @type {Object}
   * @protected
   * @description State URL params. Generated during the state registration.
   */
  static params = {};

  /**
   * @member {Object} Router.query
   * @type {Object}
   * @protected
   * @description State query params. Generated during the state registration.
   */
  static query = {};

  /**
   * @member {Boolean} Router.abstract
   * @type {Boolean}
   * @public
   * @description If the states should be abstract or not. Abstract state cannot be current state.
   * This field is not required and defaults to false.
   */
  static abstract = false;

  /**
   * @member {String} Router.stateName
   * @type {String}
   * @public
   * @description A unique name bound to state. Required.
   */
  static stateName = null;

  /**
   * @member {String|RegExp} Router.path
   * @type {String|RegExp}
   * @public
   * @description State path relative to the parent state. Must begin with "/" if present.
   * Not required and defaults to "/".
   */
  static path = '/';

  /**
   * @member {String|Function} Router.template
   * @type {String|Function}
   * @public
   * @description State template. Can be either a static string template
   * or a generated function from your javascript templates provider.
   * Not required and defaults to "".
   */
  static template = '';

  /**
   * @member {Object} Router.templateParams
   * @type {Object}
   * @public
   * @description State template params (for javascript templates).
   * During the Router initialization are inherited from the parent state template params.
   * Not required and defaults to {}.
   */
  static templateParams = {};

  /**
   * @member {Boolean} Router.encodeParams
   * @type {Boolean}
   * @public
   * @description If the URL params should be encoded during the URL building (see {@link Router.buildURL}).
   * Not required and inherited from the parent state. Router default value is true.
   */
  static encodeParams = true;

  /**
   * @member {Boolean} Router.decodeParams
   * @type {Boolean}
   * @public
   * @description If the URL params should be decoded during the state initialization.
   * Not required and inherited from the parent state. Router default value is true.
   */
  static decodeParams = true;

  /**
   * @member {Boolean} Router.encodeQuery
   * @type {Boolean}
   * @public
   * @description If the query params should be encoded during the URL building (see {@link Router.buildURL}).
   * Not required and inherited from the parent state. Router default value is true.
   */
  static encodeQuery = true;

  /**
   * @member {Boolean} Router.decodeQuery
   * @type {Boolean}
   * @public
   * @description If the query params should be decoded during the state initialization.
   * Not required and inherited from the parent state. Router default value is true.
   */
  static decodeQuery = true;

  /**
   * @member {Boolean} Router.icon
   * @type {String}
   * @public
   * @description URL to the app icon (one within the tab). To set icons you should create a link element
   * with "dwayne-router-icon" id. Router will set href itself.
   * Not required and inherited from the parent state. Router default value is null.
   */
  static icon = null;

  /**
   * @member {Boolean} Router.title
   * @type {String}
   * @public
   * @description App title (one within the tab). To set title you should create a title element
   * with "dwayne-router-title" id. Router will set the value itself.
   * Not required and inherited from the parent state. Router default value is null.
   */
  static title = null;

  /**
   * @member {Router} Router.default
   * @type {Router}
   * @public
   * @description Works with Router only. Default Router state.
   */
  static get default() {
    return defaultState;
  }
  // noinspection JSAnnotator
  static set default(state) {
    if (states.indexOf(state) === -1) {
      throw new Error('State must be registered! (Router.default)');
    }

    const {
      abstract,
      path,
      params,
      query
    } = state;

    if (abstract) {
      throw new Error('Default state must not be abstract! (Router.default)');
    }

    if (isRegExp(path)) {
      throw new Error('Default state must not have regexp path! (Router.default)');
    }

    if (new Super(params).count || new Super(query).count) {
      throw new Error('Default state must not have URL or query params! (Router.default)');
    }

    defaultState = state;
  }

  /**
   * @method Router.buildURL
   * @public
   * @param {String} [relativeToURL = location.href] - Relative to what URL new URL should be built.
   * @param {URLOptions} [options = {}] - URL options.
   * @returns {String} Built URL.
   * @description Method for building URLs that guaranteed to be matched by this state.
   * Works properly only after {@link Router#event:init} has been fired.
   *
   * @example
   * class MyState extends Router {
   *   static stateName = 'myState';
   *   static path = '/user/:userId';
   * }
   *
   * registerState(MyState);
   *
   * Router.on('init', () => {
   *   MyState.buildURL({
   *     params: {
   *       userId: 42
   *     },
   *     query: {
   *       param: 'value'
   *     }
   *   }); // '<yourOrigin>/user/42?param=value'
   * });
   */
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

  /**
   * @method Router.go
   * @public
   * @fires Router#event:beforeLeave
   * @param {URLOptions} [options = {}] - URL options.
   * @description Method combines {@link Router#buildURL} and {@link go}.
   *
   * @example
   * class MyState extends Router {
   *   static stateName = 'myState';
   *   static path = '/user/:userId';
   * }
   *
   * registerState(MyState);
   *
   * Router.on('init', () => {
   *   MyState.go({
   *     params: {
   *       userId: 42
   *     },
   *     query: {
   *       param: 'value'
   *     }
   *   });
   * });
   */
  static go(options) {
    if (this.abstract) {
      throw new Error('Cannot go to an abstract state! (at Router.go)');
    }

    go(this.buildURL(options));
  }

  /**
   * @method Router.redirect
   * @public
   * @fires Router#event:beforeLeave
   * @param {URLOptions} [options = {}] - URL options.
   * @description Method combines {@link Router#buildURL} and {@link redirectTo}.
   *
   * @example
   * class MyState extends Router {
   *   static stateName = 'myState';
   *   static path = '/user/:userId';
   * }
   *
   * registerState(MyState);
   *
   * Router.on('init', () => {
   *   MyState.redirect({
   *     params: {
   *       userId: 42
   *     },
   *     query: {
   *       param: 'value'
   *     }
   *   });
   * });
   */
  static redirect(options) {
    if (this.abstract) {
      throw new Error('Cannot go to an abstract state! (at Router.go)');
    }

    redirectTo(this.buildURL(options));
  }

  /**
   * @method Router.init
   * @public
   * @fires Router#event:init
   * @description Method for initializing Router.
   * Note that method like {@link Router.buildURL} and {@link Router.go}
   * don't work properly until the 'init' event is fired. In order to initialize Router
   * there should be an element with the "dwayne-router" id (content of the Router states).
   *
   * @example
   * Router.init();
   */
  static init() {
    initialized = true;

    initialize();
  }

  /**
   * @method Router.on
   * @public
   * @listens Router#event
   * @param {String|Object.<String|Listener>} event - Either a event string
   * or an object with event keys and listeners values.
   * @param {Listener} [listener] - If the first argument is a string it must be a listener function for
   * specified event.
   * @returns {RouterRemoveListeners} Function that can remove listeners that has just been set.
   * @description Method for listening to all events you want. beforeLeave
   */
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

  // TODO: Router#store

  /**
   * @member {Elem} Router#base
   * @type {Elem}
   * @public
   * @description State rendering base node.
   * Created before firing {@link Router#event:render}.
   */
  base = router;

  /**
   * @member {String} Router#name
   * @type {String}
   * @public
   * @description State name (inherited from the constructor).
   * Created during state initialization.
   */
  name = null;

  /**
   * @member {URL} Router#url
   * @type {URL}
   * @public
   * @description State URL.
   * Created during state initialization.
   */
  url = new URL(location.href);

  /**
   * @member {Object} Router#params
   * @type {Object}
   * @public
   * @description State URL params.
   * Created during state initialization.
   */
  params = {};

  /**
   * @member {Object} Router#query
   * @type {Object}
   * @public
   * @description State query params.
   * Created during state initialization.
   */
  query = {};

  /**
   * @member {String} Router#hash
   * @type {String}
   * @public
   * @description State query params.
   * Created during state initialization.
   */
  hash = '';

  /**
   * @member {Object} Router#templateParams
   * @type {Object}
   * @public
   * @description State template params. Inherited from the constructor template params.
   * Can be changed before rendering in beforeLoad or load event listeners.
   * Created during state initialization.
   */
  templateParams = new Super(new Super(this).proto().$.constructor.templateParams).create().$;

  constructor(props = {}) {
    assign(this, props);
  }

  /**
   * @method Router#onBeforeLeave
   * @public
   * @listens Router#event:beforeLeave
   * @param {Router#event:beforeLeave} event - Fired event.
   * @description Called on beforeLeave event. Called after the listeners.
   */
  onBeforeLeave() {}

  /**
   * @method Router#onBeforeLoad
   * @public
   * @listens Router#event:beforeLoad
   * @param {Router#event:beforeLoad} event - Fired event.
   * @description Called on beforeLoad event. Called after the listeners.
   */
  onBeforeLoad() {}

  /**
   * @method Router#onInit
   * @public
   * @listens Router#event:init
   * @param {Router#event:init} event - Fired event.
   * @description Called on init event. Called after the listeners.
   */
  onInit() {}

  /**
   * @method Router#onLeave
   * @public
   * @listens Router#event:leave
   * @param {Router#event:leave} event - Fired event.
   * @description Called on leave event. Called after the listeners.
   */
  onLeave() {}

  /**
   * @method Router#onLoad
   * @public
   * @listens Router#event:load
   * @param {Router#event:load} event - Fired event.
   * @description Called on load event. Called after the listeners.
   */
  onLoad() {}

  /**
   * @method Router#onRender
   * @public
   * @listens Router#event:render
   * @param {Router#event:render} event - Fired event.
   * @description Called on render event. Called after the listeners.
   */
  onRender() {}
}

const MainState = Router.prototype;

defaultState = Router;

/**
 * @function redirect
 * @private
 * @param {URL} newURL - New URL to go to.
 * @param {Boolean} [push] - If it's need to push state or rather replace it.
 */
function redirect(newURL, push) {
  eventPromise = eventPromise
    .then(() => dispatchNewEvent('beforeLeave'))
    .then(() => dispatchNewEvent('leave'))
    .then(() => {
      (currentState ? currentState.base : new Elem([]))
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
      url: newURL,
      toURL: currentURL
    }).$);
  }
}

/**
 * @function beforeLoad
 * @private
 * @param {URL} newURL - New URL to load.
 * @param {'pushState'|'replaceState'|undefined} action - Action to do.
 * @returns {Promise}
 */
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
      currentURL = newURL;

      return dispatchNewEvent('load');
    })
    .then(() => {
      const proto = new Super(newState).proto().$.constructor;
      const renderStates = new Arr([proto]);
      const {
        stateName,
        templateParams
      } = newState;
      const {
        title,
        icon
      } = proto;
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

/**
 * @function decode
 * @private
 * @param {String} string - String to decode.
 * @param {Boolean} decodeParams - If the string should be decoded in the first place.
 * @returns {String} Decoded string.
 */
function decode(string, decodeParams) {
  return decodeParams
    ? decodeURIComponent(string)
    : string;
}

/**
 * @function handleError
 * @private
 * @param {Error} err - Error to handle.
 */
function handleError(err) {
  if (err !== stopError) {
    printError(err);

    throw err;
  }
}

/**
 * @function printError
 * @private
 * @param {Error} err - Error to log.
 */
function printError(err) {
  console.error('%s %o', 'Uncaught (in event listener)', err);
}

/**
 * @function getStateBase
 * @param {Router} state - State to find the base of.
 * @returns {Elem} State base.
 */
function getStateBase(state) {
  return state === Router ? router : find(`[${ stateAttrName }="${ state.stateName }"]`);
}

/**
 * @function isInstanceOfRouterState
 * @param {Router} state - State to find out if it extends Router.
 * @returns {Boolean} If the state extends Router.
 */
function isInstanceOfRouterState(state) {
  return isPrototypeOf.call(Router, state) || isPrototypeOf.call(MainState, state.prototype);
}

/**
 * @function resolveParameter
 * @private
 * @param {String} param - Param to resolve.
 * @param {String} nameErrorName - Name error description.
 * @param {String} valueErrorName - Name error description.
 * @returns {{ name: String, regexp: RegExp|undefined }}
 */
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

/**
 * @function findStatesByURL
 * @private
 * @param {URL} url - Current URL.
 * @returns {Arr} Arr of matching states.
 */
function findStatesByURL(url) {
  const pathname = url.pathname || '/';
  const search = url.search || '';
  const eventualStates = states.object((states, state) => {
    if (state.abstract) {
      return;
    }

    const {
      url: stateURL,
      validatePath,
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
    ).match(validatePath);

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

/**
 * @function dispatchEvent
 * @private
 * @param {Router#event} event - Event to be fired.
 * @param {Router} [renderingState] - If it's render event it's current rendering state.
 */
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
  const isStoppable = stoppable.indexOfStrict(type) !== -1 && state && (
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

/**
 * @function getListeners
 * @private
 * @param {Router} state - State to get listeners from.
 * @param {String} type - Event type.
 * @param {Router} [renderingState] - If the type is "render" then it's current rendering state.
 */
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

/**
 * @function initialize
 * @private
 */
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
        validatePath: newPath
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

/**
 * @function go
 * @public
 * @fires Router#event:beforeLeave
 * @param {String} url - URL to go to.
 * @returns {void}
 * @description Function for directing to an URL. Can be external one or inner one.
 *
 * @example
 * go('/user/56');
 */
export function go(url) {
  redirect(new URL(url, location.href), true);
}

/**
 * @function redirectTo
 * @public
 * @fires Router#event:beforeLeave
 * @param {String} url - URL to go to.
 * @returns {void}
 * @description Function for redirecting to an URL. Can be external one or inner one.
 *
 * @example
 * redirectTo('/user/56');
 */
export function redirectTo(url) {
  redirect(new URL(url, location.href));
}

/**
 * @function registerState
 * @public
 * @param {Router} state - State to register.
 * @returns {void}
 * @description Function for registering states.
 *
 * @example
 * class MyState extends Router {
 *   static stateName = 'myState';
 *   static path = '/user/:userId';
 * }
 *
 * registerState(MyState);
 */
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
