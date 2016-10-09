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
  isArray, isFunction, isNull, isNullOrUndefined, isRegExp, isString,
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
 * @method Router#event#go
 * @public
 * @description Method that prevents Router from loading the default state forcing the page
 * going directly to another URL.
 *
 * @example
 * event.go('/login');
 */

/**
 * @method Router#event#redirectTo
 * @public
 * @description Method that prevents Router from loading the default state forcing the page
 * going directly to another URL.
 *
 * @example
 * event.go('/login');
 */

/**
 * @event Router#event:init
 * @public
 * @property {String} type - 'init' string.
 * @description Router init event. Is fired on Router once after Router.init has been called
 * and Router initialization. It cannot be [paused]{@link Router#event#pause}
 * or [stopped]{@link Router#event#stop}.
 */

/**
 * @event Router#event:beforeLeave
 * @public
 * @property {String} type - 'beforeLeave' string.
 * @property {Router} state - Initial state.
 * @property {String} toURL - URL the redirect goes to.
 * @description Router beforeLeave event. Is fired when an attempt to leave the state happened
 * (or it bubbled to the parent state). It can be [paused]{@link Router#event#pause}
 * and [stopped]{@link Router#event#stop}.
 */

/**
 * @event Router#event:leave
 * @public
 * @property {String} type - 'leave' string.
 * @property {Router} state - Initial state.
 * @property {String} toURL - URL the redirect goes to.
 * @description Router leave event. Is fired right after {@link Router#event:beforeLeave} has been fired.
 * It cannot be [paused]{@link Router#event#pause} or [stopped]{@link Router#event#stop}.
 */

/**
 * @event Router#event:reload
 * @public
 * @property {String} type - 'reload' string.
 * @description Router reload event. Is fired only on Router during {@link reload} is called.
 */

/**
 * @event Router#event:beforeLoad
 * @public
 * @property {String} type - 'beforeLoad' string.
 * @property {Router} state - Eventual state.
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
 * @property {Router} state - Eventual state.
 * @description Router load event. Is fired right after {@link Router#event:beforeLoad} has been fired.
 * It cannot be [paused]{@link Router#event#pause} or [stopped]{@link Router#event#stop}.
 * Is fired from the Router state down to the loading state.
 */

/**
 * @event Router#event:render
 * @public
 * @property {String} type - 'render' string.
 * @property {Router} state - Eventual state.
 * @property {Router} renderingState - Constructor of current rendering state.
 * @description Router load event. Is fired right after {@link Router#event:beforeLoad} has been fired.
 * It cannot be [paused]{@link Router#event#pause} or [stopped]{@link Router#event#stop}.
 * In order to render the state there should be an element with the "dwayne-router-state" attribute
 * set to the state name. States are rendered from the Router down to the current state.
 */

/**
 * @callback RouterListener
 * @public
 * @param {Router#event} e - Fired event.
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
  history,
  location,
  location: {
    origin,
    href
  }
} = global;
const stoppable = new Arr(['beforeLeave', 'beforeLoad']);
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
const selectorMatchesSwitcher = switcher('call', (selector) => (name) => name === selector)
  .case(isNull, (selector) => (name) => true)
  .case(isRegExp, (selector) => (name) => selector.test(name))
  .case(isArray, (selector) => (name) => selector.indexOf(name) !== -1);

let eventPromise = Promise.resolve();
let pushed;
let initialized;
let routerLoaded;
let router;
let pageTitle;
let pageIcon;
let defaultState;
let currentState;
let currentTitle;
let currentIcon;
let initTitle;
let initIcon;
let initHTML;

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
   * @member {Super} Router.elems
   * @type {Super}
   * @protected
   * @description State elements selectors. Generated during the state registration.
   */
  static elems = new Super({});

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
   * @member {Object} Router.elements
   * @type {Object}
   * @public
   * @description State view elements selectors and event listeners.
   * Before rendering these elements are found within the rendering state
   * and assigned to the state. Events will be eventually lowercased.
   * Event listeners are set to the specified events and elements
   * and already bound to the state. Not required and defaults to {}.
   *
   * @example
   * class MyState extends Router {
   *   static stateName = 'myState';
   *   static elements = {
   *     caption: '.caption',
   *     form: {
   *       $: '.form',
   *
   *       $onSubmit: 'onSubmit',
   *
   *       emailInput: 'input[type="email"]',
   *       passwordInput: 'input[type="password"]'
   *     },
   *     container: {
   *       $: '.container',
   *
   *       nestedContainer: {
   *         $: '.nested-container',
   *
   *         $onClick: 'onNestedContainerClick',
   *
   *         content: '.content'
   *       }
   *     }
   *   };
   *
   *   logEvent(e) {
   *     console.log(e);
   *   }
   *
   *   onSubmit(e) {
   *     this.logEvent(e);
   *
   *     console.log('submitting form');
   *   }
   *
   *   onNestedContainerClick(e) {
   *     this.logEvent(e);
   *
   *     console.log('clicked container');
   *   }
   *
   *   onRender() {
   *     console.log(this.caption); // instance of Elem
   *     console.log(this.form);    // instance of Elem
   *     console.log(this.content); // instance of Elem
   *
   *     // etc
   *   }
   * }
   *
   * // this is an equivalent to
   *
   * class MyState extends Router {
   *   static stateName = 'myState';
   *
   *   logEvent(e) {
   *     console.log(e);
   *   }
   *
   *   onSubmit(e) {
   *     this.logEvent(e);
   *
   *     console.log('submitting form');
   *   }
   *
   *   onNestedContainerClick(e) {
   *     this.logEvent(e);
   *
   *     console.log('clicked container');
   *   }
   *
   *   onRender() {
   *     const { base } = this;
   *
   *     this.caption         = base.find('.caption');
   *     this.form            = base.find('.form');
   *     this.emailInput      = base.find('.form input[type="email"]');
   *     this.passwordInput   = base.find('.form input[type="password"]');
   *     this.container       = base.find('.container');
   *     this.nestedContainer = base.find('.container .nested-container');
   *     this.content         = base.find('.container .nested-container .content');
   *
   *     this.form.on('submit', this.onSubmit.bind(this));
   *     this.nestedContainer.on('click', this.onNestedContainerClick.bind(this));
   *
   *     // your usual onRender code goes here
   *   }
   * }
   */
  static elements = {};

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
   * @description URL to the state icon (one within the tab). To set icons you should create a link element
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
  static buildURL(options = {}) {
    const { url } = this;

    if (isRegExp(url)) {
      throw new Error('URL can be built only from the string URLs! (Router.buildURL)');
    }

    const {
      params = {},
      query = {},
      hash = ''
    } = options;

    return constructURL(origin, url, params, query, hash, {
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
   * @param {String|String[]|RegExp} selector - String, array of strings or
   * a regular expression to filter states by the state name. Render event is treated
   * the special way: current rendering state name is compared to the selector.
   * @param {RouterListener} [listener] - If the first argument is a string it must be
   * a listener function for specified event.
   * @returns {RouterRemoveListeners} Function that can remove listeners that has just been set.
   * @description Method for listening to all events you want. beforeLeave
   */
  static on(event, selector = null, listener) {
    if (isFunction(selector)) {
      listener = selector;
      selector = null;
    }

    if (isString(event)) {
      event = { [event]: listener };
    }

    const { listeners } = this.$$;
    const allListeners = {};
    const matchesSelector = selectorMatchesSwitcher(selector);

    iterate(event, (listener, event) => {
      const array = listeners[event] || new Arr([]);
      const newListener = (e) => {
        let name = e.state && e.state.name;

        if (e.renderingState) {
          name = e.renderingState.stateName;
        }

        if (matchesSelector(name)) {
          listener.call(this, e);
        }
      };

      newListener.toString = () => listener.toString();

      allListeners[event] = newListener;
      (listeners[event] = array).push(newListener);
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

class RouterError {}

const stopError = new RouterError();

/**
 * @function redirect
 * @private
 * @param {String} newURL - New URL to go to.
 * @param {Boolean} [push] - If it's need to push state or rather replace it.
 */
function redirect(newURL, push) {
  eventPromise = eventPromise
    .then(() => beforeLeave(newURL))
    .then(() => {
      (currentState ? currentState.base : new Elem([]))
        .hide()
        .html('');

      changeHistory(newURL, push);
    })
    .then(() => {
      currentState = Router.$$.state = null;
    })
    .then(beforeLoad)
    .catch(printError);
}

/**
 * @function beforeLeave
 * @private
 * @param {String} newURL - New URL to go to.
 * @returns {Promise}
 */
function beforeLeave(newURL) {
  return Promise.resolve()
    .then(() => dispatchNewEvent('beforeLeave'))
    .then(() => dispatchNewEvent('leave'));

  function dispatchNewEvent(type) {
    return dispatchEvent(type, {
      type,
      state: currentState,
      toURL: newURL
    });
  }
}

/**
 * @function beforeLoad
 * @private
 * @returns {Promise}
 */
function beforeLoad() {
  const { hash } = resolveURL(Router.decodeQuery);
  let newState;

  return Promise.resolve()
    .then(() => loadStatesByOne())
    .then(() => {
      currentState = Router.$$.state = newState;

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
          templateParams: parentTemplateParams,
          elems
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

          newState.base = base;

          new Super(newState).assign(elems.map(({ selector, listeners }) => {
            const elem = base.find(selector);

            listeners.forEach((listenerName, event) => {
              const listener = new Func(newState[listenerName]).bindContext(newState);

              if (isFunction(listener)) {
                elem.on(event, listener);
              }
            });

            return elem;
          }).$);

          if (state === proto) {
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
    .catch(printError);

  function dispatchNewEvent(type, renderingState) {
    return dispatchEvent(type, {
      type,
      state: newState
    }, renderingState);
  }

  function loadStatesByOne() {
    let promise = Promise.reject(stopError);

    findStatesByURL().forEach(({ state, params, query }) => {
      promise = promise.catch((err) => {
        if (err instanceof RouterError && err.type === 'redirect') {
          throw err;
        }

        printError(err);

        newState = new state({
          name: state.stateName,
          params,
          query,
          hash
        });

        return dispatchNewEvent('beforeLoad');
      });
    });

    return promise.catch((err) => {
      if (err instanceof RouterError && err.type === 'redirect') {
        changeHistory(err.url, err.push);

        return loadStatesByOne();
      }

      throw err;
    });
  }
}

/**
 * @function changeHistory
 * @private
 * @param {String} url - URL to go to.
 * @param {Boolean} push - If the state is needed to be pushed or replaced.
 * @description Function for manipulating history.
 */
function changeHistory(url, push) {
  try {
    history[push ? 'pushState' : 'replaceState'](null, null, url);
    pushed = true;
  } catch (err) {
    location.href = url;
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
 * @function printError
 * @private
 * @param {Error} err - Error to log.
 */
function printError(err) {
  if (!(err instanceof RouterError)) {
    console.error('%s %o', 'Uncaught (in event listener)', err);
  }
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
 * @returns {Arr} Arr of matching states.
 */
function findStatesByURL() {
  const pathname = location.pathname || '/';
  const search = location.search || '';
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
    const query = new Super(resolveURL(decodeQuery).query);
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
      query: resolveURL(defaultState.decodeQuery).query
    });
  }

  return eventualStates;
}

/**
 * @function dispatchEvent
 * @private
 * @param {String} event - Event to be fired.
 * @param {Object} [assigned] - Properties to be assigned to the event.
 * @param {Router} [renderingState] - Current state.
 */
function dispatchEvent(event, assigned, renderingState) {
  const eventualEvent = new Super({})
    .value({
      type: event
    })
    .value(assigned || {})
    .$;
  const {
    type,
    state
  } = eventualEvent;
  const isStoppable = stoppable.indexOfStrict(type) !== -1 && state && (
    new Super(state).proto().$.constructor !== defaultState ||
    type !== 'beforeLoad'
  );

  let paused;
  let stopped;
  let continuePropagation = () => {};
  let stopPropagation = () => {};
  let redirect = () => {};
  let promise = Promise.resolve();
  let currentState;

  new Super(eventualEvent)
    .get('renderingState', () => currentState)
    .value({
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
      },
      go(url) {
        if (isStoppable && type === 'beforeLoad') {
          redirect(url, true);
        }
      },
      redirectTo(url) {
        if (isStoppable && type === 'beforeLoad') {
          redirect(url);
        }
      }
    });

  getListeners(state, type, renderingState).forEach(({ renderingState, listener }) => {
    promise = promise.then(() => new Promise((resolve, reject) => {
      currentState = renderingState;

      let finished = false;

      continuePropagation = () => {
        if (finished) {
          resolve();
        }
      };

      redirect = (url, push) => {
        const err = new RouterError();

        err.type = 'redirect';
        err.push = push;
        err.url = url;

        reject(err);
      };

      stopPropagation = () => {
        reject(stopError);
      };

      listener(eventualEvent);

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
    if (isStoppable) {
      throw err;
    }

    printError(err);
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
        listeners.push({
          renderingState,
          listener: new Func(proto[listenerName]).bindContext(state)
        });
      }

      listeners.push.apply(listeners, (ownListeners[type] || new Arr([])).map((listener) => ({
        renderingState,
        listener
      })).$);
    }, new Arr([]));
}

/**
 * @function initialize
 * @private
 */
function initialize() {
  if (!initialized || routerLoaded) {
    return;
  }

  routerLoaded = true;
  pageTitle = find('#dwayne-router-title').first();
  pageIcon = find('#dwayne-router-icon').first();
  router = find('#dwayne-router').first();
  initHTML = router.html() || '';
  initTitle = pageTitle.text() || '';
  initIcon = pageIcon.ref() || '';

  find(`[${ stateAttrName }]`).hide();

  defineProperties(MainState, {
    base: router
  });

  win.on('click', (e) => {
    const closestLink = new Elem(e.target).closest('a');

    if (closestLink.length && closestLink.attr('target') !== '_blank') {
      e.preventDefault();

      redirect(closestLink.attr('href') || '', true);
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
    .then(() => dispatchEvent('init'))
    .then(() => beforeLoad())
    .then(() => {
      win.on('popstate', () => {
        if (location.href !== href) {
          pushed = true;
        }

        if (pushed) {
          eventPromise = eventPromise.then(() => beforeLoad());
        }
      });
    });
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
  redirect(url, true);
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
  redirect(url);
}

/**
 * @function reload
 * @public
 * @fires Router#event:beforeLeave
 * @returns {void}
 * @description Fires {@link Router#event:beforeLeave}, {@link Router#event:leave}
 * as usual, then resets router content, page title and icon to initial content,
 * fires {@link Router#event:reload} and then loads page like if it was the first time.
 */
export function reload() {
  eventPromise = eventPromise
    .then(() => beforeLeave(location.href))
    .then(() => {
      router.html(initHTML);
      pageTitle.text(initTitle);
      pageIcon.ref(initIcon);
    })
    .then(() => {
      currentState = Router.$$.state = null;
    })
    .then(() => dispatchEvent('reload'))
    .then(beforeLoad)
    .catch(printError);
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
    : '/';
  const {
    url: relativeURL,
    path: relativePath,
    params
  } = pathSwitcher(path);
  const elems = new Super({});

  if ($state.hasOwn('elements')) {
    const { elements } = state;

    new Super(elements).deepForEach((value, key, object, tree) => {
      tree = new Arr(tree);

      tree.reverse().shift();

      const selectors = tree.map(({ value }) => String(value.$ || value || ''));

      if (key === '$' || /\$on[\s\S]/.test(key)) {
        const name = tree.$[tree.length - 2].key;
        const elem = elems.$[name] = elems.$[name] || {
          listeners: new Super({})
        };

        if (key === '$') {
          selectors.pop();

          elem.selector = selectors.join(' ');
        } else {
          elem.listeners.$[key.replace(/^\$on[\s\S]/, (match) => (match[3] || '')).toLowerCase()] = value;
        }

        return;
      }

      elems.$[key] = {
        selector: selectors.join(' '),
        listeners: new Super({})
      };
    });
  }

  defineProperties(state, {
    $$: {
      listeners: {}
    },

    stateName,
    path,
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
    elems,
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

/**
 * @const currentState
 * @public
 * @description Router current state,
 */
export { currentState };
