/**
 * @module Router
 * @private
 * @mixin
 * @description Exports Router class.
 */

import { Arr } from './Arr';
import { Elem, find, win } from './Elem';
import { Func } from './Func';
import { Promise } from './Promise';
import { Str } from './Str';
import { Super } from './Super';
import { switcher } from './Switcher';
import {
  isArray, isFunction, isNil, isNull, isRegExp, isString,
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
 * @description Method that pauses the event propagation.
 * Only {@link Router#event:beforeLoad} can be paused.
 *
 * @example
 * event.pause();
 */

/**
 * @method Router#event#continue
 * @public
 * @description Method that continues the event propagation.
 * Only {@link Router#event:beforeLoad} can be paused therefore continued.
 *
 * @example
 * event.continue();
 */

/**
 * @method Router#event#stop
 * @public
 * @description Method that stops the event propagation.
 * Only {@link Router#event:beforeLoad} can be stopped.
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
 * @event Router#event:leave
 * @public
 * @property {String} type - 'leave' string.
 * @property {Router} state - Initial state.
 * @property {String} toURL - URL the redirect goes to.
 * @description Router leave event. Is fired right after {@link Router#event:beforeLoad} has been fired.
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
 * @description Router beforeLoad event. Is fired right after the URL has been already changed,
 * (including after one of the browser back or forward buttons has been pressed)
 * and after the only {@link Router#event:init} has been fired.
 * It can be [paused]{@link Router#event#pause}, [stopped]{@link Router#event#stop}
 * preventing the state from loading and causing going to the next matched state or
 * redirected [one]{@link Router#event#go} way or [another]{@link Router#event#redirectTo}.
 * Is fired from the Router state down to the loading state.
 */

/**
 * @event Router#event:load
 * @public
 * @property {String} type - 'leave' string.
 * @property {Router} state - Eventual state.
 * @description Router load event. Is fired right after {@link Router#event:leave} has been fired.
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
const stoppable = 'beforeLoad';
const states = new Arr([]);
const pathSwitcher = switcher('call', () => {
  throw new Error('State path must be a string, a regular expression or undefined! (at registerState)');
})
  .case(isRegExp, (path) => ({
    path: path.source.replace(/\\\//g, '/'),
    url: path,
    params: {}
  }))
  .case(isNil, () => ({
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
          regexp = /[^/]*/
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

let MainState;
let currentStates = new Arr([]);
let newStates;
let eventPromise = Promise.resolve();
let pushed;
let initialized;
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
 * URLs and queries can be validated. There can be hooks (such as {@link Router#event:beforeLoad},
 * {@link Router#event:load}, {@link Router#event:leave} and {@link Router#event:render}).
 * Don't try to call new <YourState>() or new Router().
 * All following examples contain proposed syntax for class properties.
 */
class Router {
  /**
   * @member {Object} Router.$$
   * @type {Object}
   * @protected
   * @property {Arr} [states] - All states. Only Router has this property.
   * @property {Router} [state] - Current state. Only Router has this property.
   * @description Config object. Only Router has it.
   */
  static $$ = {
    state: null,
    states
  };

  /**
   * @member {Router} Router._parent
   * @type {Router}
   * @protected
   * @description Parent state.
   */
  static _parent = null;

  /**
   * @member {Arr} Router._children
   * @type {Arr}
   * @protected
   * @description Children states.
   */
  static _children = new Arr([]);

  /**
   * @member {RegExp} Router._validatePath
   * @type {RegExp}
   * @protected
   * @description Regexp to validate the URL. Created during the router initialization.
   */
  static _validatePath = /^\/$/;

  /**
   * @member {String} Router._url
   * @type {String}
   * @protected
   * @description State matching URL. Generated during the router initialization.
   */
  static _url = '/';

  /**
   * @member {String} Router._relativePath
   * @type {String}
   * @protected
   * @description State matching relative path. Generated during the state registration.
   */
  static _relativePath = '/';

  /**
   * @member {String|RegExp} Router._relativeURL
   * @type {String|RegExp}
   * @protected
   * @description State matching relative URL. Generated during the state registration.
   */
  static _relativeURL = '/';

  /**
   * @member {Object} Router._params
   * @type {Object}
   * @protected
   * @description State URL params. Generated during the state registration.
   */
  static _params = {};

  /**
   * @member {Object} Router._query
   * @type {Object}
   * @protected
   * @description State query params. Generated during the state registration.
   */
  static _query = {};

  /**
   * @member {Super} Router._elems
   * @type {Super}
   * @protected
   * @description State elements selectors. Generated during the state registration.
   */
  static _elems = new Super({});

  /**
   * @member {Boolean} Router.abstract
   * @type {Boolean}
   * @public
   * @description If the states should be abstract or not. Abstract state cannot be current state.
   * This field is not required and defaults to false.
   */
  static abstract = true;

  /**
   * @member {String} Router.Name
   * @type {String}
   * @public
   * @description A unique name bound to state. Required.
   */
  static Name = null;

  /**
   * @member {String|RegExp} [Router.path = '/']
   * @type {String|RegExp}
   * @public
   * @description State path relative to the parent state. Must begin with "/" if present.
   * Not required and defaults to "/".
   */
  static path = '/';

  /**
   * @member {String|Function} [Router.template = '']
   * @type {String|Function}
   * @public
   * @description State template. Can be either a static string template
   * or a generated function from your javascript templates provider.
   * Not required and defaults to "".
   */
  static template = '';

  /**
   * @member {Object} [Router.templateParams = {}]
   * @type {Object}
   * @public
   * @description State template params (for javascript templates).
   * During the Router initialization are inherited from the parent state template params.
   * Not required and defaults to {}.
   */
  static templateParams = {};

  /**
   * @member {Object} [Router.elements = {}]
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
   *   static Name = 'myState';
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
   *   static Name = 'myState';
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
   * @member {Boolean} [Router.encodeParams = true]
   * @type {Boolean}
   * @public
   * @description If the URL params should be encoded during the URL building (see {@link Router.buildURL}).
   * Not required and inherited from the parent state. Router default value is true.
   */
  static encodeParams = true;

  /**
   * @member {Boolean} [Router.decodeParams = true]
   * @type {Boolean}
   * @public
   * @description If the URL params should be decoded during the state initialization.
   * Not required and inherited from the parent state. Router default value is true.
   */
  static decodeParams = true;

  /**
   * @member {Boolean} [Router.encodeQuery = true]
   * @type {Boolean}
   * @public
   * @description If the query params should be encoded during the URL building (see {@link Router.buildURL}).
   * Not required and inherited from the parent state. Router default value is true.
   */
  static encodeQuery = true;

  /**
   * @member {Boolean} [Router.decodeQuery = true]
   * @type {Boolean}
   * @public
   * @description If the query params should be decoded during the state initialization.
   * Not required and inherited from the parent state. Router default value is true.
   */
  static decodeQuery = true;

  /**
   * @member {String?} [Router.icon = null]
   * @type {String}
   * @public
   * @description URL to the state icon (one within the tab). To set icons you should create a link element
   * with "dwayne-router-icon" id. Router will set href itself.
   * Not required and inherited from the parent state. Router default value is null.
   */
  static icon = null;

  /**
   * @member {String} [Router.title = null]
   * @type {String}
   * @public
   * @description App title (one within the tab). To set title you should create a title element
   * with "dwayne-router-title" id. Router will set the value itself.
   * Not required and inherited from the parent state. Router default value is null.
   */
  static title = null;

  /**
   * @member {Router?} [Router.default = null]
   * @type {Router}
   * @public
   * @description Works with Router only. Default Router state.
   *
   * @example
   * class MyState extends Router {
   *   Name = 'default';
   * }
   *
   * Router.default = MyState;
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
      _params,
      _query
    } = state;

    if (abstract) {
      throw new Error('Default state must not be abstract! (Router.default)');
    }

    if (isRegExp(path)) {
      throw new Error('Default state must not have regexp path! (Router.default)');
    }

    if (new Super(_params).count || new Super(_query).count) {
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
   *   static Name = 'myState';
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
    const { _url } = this;

    if (isRegExp(_url)) {
      throw new Error('URL can be built only from the string URLs! (Router.buildURL)');
    }

    const {
      params = {},
      query = {},
      hash = ''
    } = options;

    return constructURL(origin, _url, params, query, hash, {
      params: this.encodeParams,
      query: this.encodeQuery
    });
  }

  /**
   * @method Router.go
   * @public
   * @fires Router#event:beforeLoad
   * @fires Router#event:leave
   * @fires Router#event:load
   * @fires Router#event:render
   * @param {URLOptions} [options = {}] - URL options.
   * @description Method combines {@link Router#buildURL} and {@link go}.
   *
   * @example
   * class MyState extends Router {
   *   static Name = 'myState';
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
   * @fires Router#event:beforeLoad
   * @fires Router#event:leave
   * @fires Router#event:load
   * @fires Router#event:render
   * @param {URLOptions} [options = {}] - URL options.
   * @description Method combines {@link Router#buildURL} and {@link redirectTo}.
   *
   * @example
   * class MyState extends Router {
   *   static Name = 'myState';
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
    if (initialized) {
      return;
    }

    initialized = true;
    pageTitle = find('#dwayne-router-title').first();
    pageIcon = find('#dwayne-router-icon').first();
    router = find('#dwayne-router').first();
    initHTML = router.html() || '';
    initTitle = pageTitle.text() || '';
    initIcon = pageIcon.ref() || '';

    find(`[${ stateAttrName }]`).hide();

    defineProperties(Router.prototype, {
      base: router
    });

    states
      .forEach((state) => {
        const {
          parent,
          Name
        } = state;
        const _parent = states.find(({ Name }) => Name === parent);

        if (!_parent) {
          throw new Error(`No such parent state (${ parent }) found for the state (${ Name })! (at Router.init)`);
        }

        if (!_parent.abstract) {
          throw new Error(`Parent state must be abstract (for ${ Name })! (at Router.init)`);
        }

        defineProperties(state, {
          _parent: _parent.value
        });
      })
      .forEach((state) => {
        const {
          _parent: {
            _children,
            _params: parentParams,
            _query: parentQuery,
            path,
            templateParams: parentTemplateParams
          },
          _params,
          _query,
          templateParams,
          _relativeURL,
          _relativePath
        } = state;
        let proto = state;
        let count = 0;
        let newPath = _relativePath;
        let newURL = '';

        if (isRegExp(path)) {
          throw new Error('URL regexp state cannot be extended! (at Router.init)');
        }

        while (proto = proto._parent) {
          count += new Super(proto._params).count;
          newPath = proto._relativePath + newPath;
          newURL = proto._relativeURL + newURL;
        }

        newPath = new RegExp(`^${ newPath.replace(/\/+/g, '/').replace(/\/$/, '') || '/' }$`);
        newURL = isRegExp(_relativeURL)
          ? newPath
          : (newURL + _relativeURL).replace(/\/+/g, '/').replace(/\/$/, '') || '/';

        _children.push(state);

        new Super(templateParams).proto(parentTemplateParams);
        new Super(_query).proto(parentQuery);
        new Super(_params)
          .proto(parentParams)
          .forEach((value, key, params) => {
            params[key] += count;
          });

        defineProperties(state, {
          _url: newURL,
          _validatePath: newPath
        });
      });

    eventPromise = eventPromise
      .then(() => dispatchEvent('init', MainState))
      .then(() => load());

    win.on({
      popstate() {
        if (location.href !== href) {
          pushed = true;
        }

        if (pushed) {
          eventPromise = eventPromise.then(() => load());
        }
      },
      click(e) {
        const closestLink = new Elem(e.target).closest('a');

        if (closestLink.length && closestLink.attr('target') !== '_blank') {
          e.preventDefault();

          redirect(closestLink.attr('href') || '', true);
        }
      }
    });
  }

  /**
   * @method Router.on
   * @public
   * @listens Router#event
   * @param {String|Object.<String|RouterListener>} event - Either a event string
   * or an object with event keys and listeners values.
   * @param {String|String[]|RegExp} [selector] - String, array of strings or
   * a regular expression to filter states by the state name. Render event is treated
   * the special way: current rendering state name is compared to the selector.
   * @param {RouterListener} [listener] - If the first argument is a string it must be
   * a listener function for specified event.
   * @returns {RouterRemoveListeners} Function that can remove listeners that has just been set.
   * @description Method for listening to all events you want.
   */
  static on(event, selector = null, listener) {
    if (isFunction(selector)) {
      listener = selector;
      selector = null;
    }

    if (isString(event)) {
      event = { [event]: listener };
    }

    if (!this._listeners) {
      this._listeners = {};
    }

    const { _listeners } = this;
    const allListeners = {};
    const matchesSelector = selectorMatchesSwitcher(selector);

    iterate(event, (listener, event) => {
      const array = _listeners[event] || new Arr([]);
      const newListener = (e) => {
        const name = e.state && e.state.name;

        if (matchesSelector(name)) {
          listener.call(this, e);
        }
      };

      newListener.toString = () => listener.toString();

      allListeners[event] = newListener;
      (_listeners[event] = array).push(newListener);
    });

    return function removeEventListeners(event) {
      let actualListeners = allListeners;

      if (allListeners[event]) {
        actualListeners = { [event]: allListeners[event] };
      }

      iterate(actualListeners, (listener, event) => {
        const eventListeners = _listeners[event];

        const found = eventListeners.find((l) => l === listener);

        if (found) {
          eventListeners.splice(found.key, 1);
        }
      });
    };
  }

  /**
   * @member {Router} Router#_constructor
   * @type {Router}
   * @protected
   * @description Initial constructor.
   */
  _constructor = Router;

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
  templateParams = new Super(this._constructor.templateParams).create().$;

  constructor(props = {}) {
    const { constructor } = new Super(this).proto().$;

    Object.defineProperty(this, '_constructor', {
      value: constructor
    });

    defineProperties(this, {
      name: constructor.Name
    });

    assign(this, props);
  }

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

states.push(Router);

currentStates = new Arr([MainState = new Router()]);

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

function load() {
  return Promise.resolve()
    .then(() => tryToLoadStatesByOne())
    .then((newState) => {
      currentState = Router.$$.state = newState;

      return dispatchNewEvent('load')
        .then(() => newState);
    })
    .then((newState) => {
      const proto = newState._constructor;
      const renderStates = new Arr([proto]);
      const {
        Name,
        templateParams
      } = newState;
      const {
        title,
        icon
      } = proto;
      const ownTemplateParams = new Super(templateParams).clone();
      let state = proto;
      let promise = Promise.resolve();

      while (!getStateBase(state).length && (state = state._parent)) {
        renderStates.unshift(state);
      }

      find(`[${ stateAttrName }]`).forEach((elem) => {
        elem = new Elem(elem);

        const stateNameFromAttr = elem.attr(stateAttrName);
        const { value: foundState } = states.find(({ Name }) => Name === stateNameFromAttr) || {};

        if (!foundState || (stateNameFromAttr !== Name && !(newState instanceof foundState))) {
          elem
            .hide()
            .html('');
        }
      });

      renderStates.forEach((state) => {
        const {
          template,
          templateParams: parentTemplateParams,
          _elems
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

          new Super(newState).assign(_elems.map(({ selector, listeners }) => {
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

  function dispatchNewEvent(type) {
    return dispatchEvent(type, newState);
  }
}

function leave() {

}

function tryToLoadStatesByOne() {
  const { hash } = resolveURL(Router.decodeQuery);
  let promise = Promise.reject(stopError);

  findStatesByURL().forEach(({ state, params, query }) => {
    promise = promise.catch((err) => {
      if (err instanceof RouterError && err.type === 'redirect') {
        throw err;
      }

      printError(err);

      const {
        key,
        value: parent
      } = findCommonParent(state);
      const parents = new Arr([]);
      let parentState = state;

      while (parentState !== parent) {
        parents.unshift(parentState);

        parentState = state._parent;
      }
      
      newStates = currentStates.slice(key);

      parents.forEach((state) => {
        newStates.unshift(
          new state({
            params,
            query,
            hash
          })
        );
      });

      const newState = newStates[0];

      return dispatchNewEvent('beforeLoad')
        .then(() => newState);
    });
  });

  return promise
    .catch((err) => {
      if (err instanceof RouterError && err.type === 'redirect') {
        changeHistory(err.url, err.push);

        return tryToLoadStatesByOne();
      }

      throw err;
    });
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
    return dispatchEvent(type, currentState, {
      toURL: newURL
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
  return state === Router ? router : find(`[${ stateAttrName }="${ state.Name }"]`);
}

/**
 * @function isInstanceOfRouterState
 * @param {Router} state - State to find out if it extends Router.
 * @returns {Boolean} If the state extends Router.
 */
function isInstanceOfRouterState(state) {
  return isPrototypeOf.call(Router, state) || isPrototypeOf.call(Router.prototype, state.prototype);
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
  const nameMatch = param.match(/^[a-z_$]+/i);

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

function findCommonParent(newState) {
  return currentStates.find((state) => {
    let proto = newState;

    while (proto && state._constructor !== proto) {
      proto = proto._parent;
    }

    if (proto) {
      return true;
    }
  });
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
      _url: stateURL,
      _validatePath,
      _params,
      _query: requiredQuery,
      decodeParams,
      decodeQuery
    } = state;
    const query = new Super(resolveURL(decodeQuery).query);
    const eventualParams = {};
    const match = (
      (pathname.replace(/\/$/, '') || '/') +
      (isRegExp(stateURL) ? search : '')
    ).match(_validatePath);

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

    for (const param in _params) {
      eventualParams[param] = decode(match[_params[param]], decodeParams);
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
 */
function dispatchEvent(event, assigned) {
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
  const isStoppable = (
    stoppable === type &&
    state._constructor !== defaultState
  );

  let paused;
  let stopped;
  let continuePropagation;
  let stopPropagation;
  let redirect;
  let promise = Promise.resolve();

  new Super(eventualEvent).value({
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
      if (isStoppable) {
        redirect(url, true);
      }
    },
    redirectTo(url) {
      if (isStoppable) {
        redirect(url);
      }
    }
  });

  getListeners(state, type).forEach((listener) => {
    promise = promise.then(() => new Promise((resolve, reject) => {
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
 * @returns {Arr} Listeners.
 */
function getListeners(state, type) {
  const tree = new Arr([]);
  const listenerName = `on${ new Str(type).capitalizeFirst() }`;
  let proto = state._constructor;

  while (proto) {
    tree.push(proto);

    proto = proto._parent;
  }

  return tree
    .object((listeners, {
      _listeners,
      prototype: proto,
      Name
    }) => {
      if (new Super(proto).hasOwn(listenerName) && state.name === Name) {
        listeners.push(
          new Func(proto[listenerName]).bindContext(state)
        );
      }

      listeners.push.apply(
        listeners, (_listeners[type] || new Arr([])).$
      );
    }, new Arr([]));
}

/**
 * @function pushURL
 * @public
 * @param {String} url - URL to change to. History.pushState is used.
 * @returns {void}
 * @description Function for just changing URL. No other actions is taken.
 *
 * @example
 * pushURL('/');
 */
function pushURL(url) {
  changeHistory(url, true);
}

/**
 * @function replaceURL
 * @public
 * @param {String} url - URL to change to. History.replaceState is used.
 * @returns {void}
 * @description Function for just changing URL. No other actions is taken.
 *
 * @example
 * replaceURL('/');
 */
function replaceURL(url) {
  changeHistory(url);
}

/**
 * @function go
 * @public
 * @fires Router#event:beforeLoad
 * @fires Router#event:leave
 * @fires Router#event:load
 * @fires Router#event:render
 * @param {String} url - URL to go to.
 * @returns {void}
 * @description Function for directing to an URL. Can be external one or inner one.
 *
 * @example
 * go('/user/56');
 */
function go(url) {
  redirect(url, true);
}

/**
 * @function redirectTo
 * @public
 * @fires Router#event:beforeLoad
 * @fires Router#event:leave
 * @fires Router#event:load
 * @fires Router#event:render
 * @param {String} url - URL to go to.
 * @returns {void}
 * @description Function for redirecting to an URL. Can be external one or inner one.
 *
 * @example
 * redirectTo('/user/56');
 */
function redirectTo(url) {
  redirect(url);
}

/**
 * @function reload
 * @public
 * @fires Router#event:beforeLoad
 * @fires Router#event:leave
 * @fires Router#event:reload
 * @fires Router#event:load
 * @fires Router#event:render
 * @returns {void}
 * @description First fires {@link Router#event:leave}, then resets router content,
 * page title and icon to initial content, fires {@link Router#event:reload}
 * and then loads page like if it was the first time.
 */
function reload() {
  eventPromise = eventPromise
    .then(() => beforeLeave(location.href))
    .then(() => {
      router.html(initHTML);
      pageTitle.text(initTitle);
      pageIcon.ref(initIcon);
    })
    .then(() => {
      MainState = new Router();
      currentStates = new Arr([MainState]);
      currentState = Router.$$.state = null;
    })
    .then(() => dispatchEvent('reload', MainState))
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
 *   static Name = 'myState';
 *   static path = '/user/:userId';
 * }
 *
 * registerState(MyState);
 */
function registerState(state) {
  if (states.indexOf(state) !== -1) {
    return;
  }

  if (!isInstanceOfRouterState(state)) {
    throw new Error(`State must extend (${ extendLink }) Router! (at registerState)`);
  }

  const { Name } = state;

  if (states.find(({ Name: n }) => n === Name)) {
    throw new Error('State must have unique Name! (at registerState)');
  }

  const $state = new Super(state);
  const path = $state.hasOwn('path')
    ? state.path
    : '/';
  const {
    url: _relativeURL,
    path: _relativePath,
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
    _children: new Arr([]),
    _relativePath,
    _relativeURL,
    _params: params,
    _query: {},
    _elems: elems,
    abstract: $state.hasOwn('abstract')
      ? !!state.abstract
      : false,
    Name,
    parent: $state.hasOwn('parent')
      ? state.parent
      : null,
    path,
    template: $state.hasOwn('template')
      ? state.template
      : '',
    templateParams: $state.hasOwn('templateParams')
      ? state.templateParams
      : {}
  });

  const { _query } = state;
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

        _query[name] = new RegExp(`^${ regexp.source.replace(/\\\//g, '/') }$`);
      });
  }

  states.push(state);
}

/**
 * @const currentState
 * @public
 * @description Router current state,
 */
export { Router, currentState, pushURL, replaceURL, go, redirectTo, reload, registerState };
