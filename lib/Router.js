/**
 * @module Router
 * @private
 * @mixin
 * @description Exports Router.
 */

import { Arr } from './Arr';
import { Elem, win } from './Elem';
import { self } from './Func';
import { Str } from './Str';
import { Super } from './Super';
import { switcher } from './Switcher';
import { assign, isNil, isRegExp, isString } from './helpers';
import constructURL from './helpers/constructURL';
import resolveURL from './helpers/resolveURL';

const Routes = new Arr([]);
const currentRoutes = new Arr([]);
const subscribers = {};
const {
  history,
  location,
  location: {
    href: initialURL
  }
} = global;
let initialized;
let pushed;
let wasRoot;
let wasDefault;
let rootRoute;
let redirectRoute;
let RedirectRoute;
let defaultRoute;
let DefaultRoute;
let currentRoute;
let currentRouteParams;

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
      throw new Error('If route path is a string it must start with "/"! (at registerState)');
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
          throw new Error('If route path is a string it must not contain "//" or end with "/"! (at makeRoute)');
        }

        const index = part.indexOf(':');

        if (index > 0) {
          throw new Error('If route path is a string resource part must be either a string or an URL parameter! (at makeRoute)');
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
          'URL parameter must not be an empty string or contain characters besides "a-zA-Z_$"! (at makeRoute)',
          'URL parameter regexp validator must be within parentheses (e.g. :userId(\\d+) and not contain ones)! (at makeRoute)'
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

const router = {
  buildURL,
  go,
  goToURL,
  pushURL,
  redirect,
  redirectToURL,
  replaceURL
};

class Route {
  constructor(options) {
    options = options || {};

    const {
      name,
      path = '/',
      abstract = false,
      parent,
      decodeQuery = true,
      encodeQuery = true,
      decodeParams = true,
      encodeParams = true
    } = options || {};
    const {
      url: relativeURL,
      path: relativePath,
      params
    } = pathSwitcher(path);
    const query = {};

    new Super(this).assign({
      name,
      parentName: parent,
      abstract: !!abstract,
      children: new Arr([]),
      decodeParams: !!decodeParams,
      decodeQuery: !!decodeQuery,
      encodeParams: !!encodeParams,
      encodeQuery: !!encodeQuery,
      params,
      query,
      relativePath,
      relativeURL
    });

    const index = isString(path)
      ? path.indexOf('?')
      : -1;

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
            'Query parameter must not be an empty string or contain characters besides "a-zA-Z_$"! (at makeRoute)',
            'Query parameter regexp validator must be within parentheses (e.g. :userId(\\d+)) and not contain them! (at makeRoute)'
          );

          query[name] = new RegExp(`^${ regexp.source.replace(/\\\//g, '/') }$`);
        });
    }

    if (name === defaultRoute && (
        new Super(params).count
        || new Super(query).count
      )) {
      throw new Error('Default route must not have URL or query params! (at makeRoute)');
    }
  }
}

const baseRoute = new Route();

function initRouter() {
  if (initialized) {
    return;
  }

  initialized = true;
  RedirectRoute = (Routes.find(({ name }) => name === redirectRoute) || {}).value;
  DefaultRoute = (Routes.find(({ name }) => name === defaultRoute) || {}).value;

  if (redirectRoute && !RedirectRoute) {
    throw new Error(`There is no specified fallback route ("${ redirectRoute }")! (at initRouter)`);
  }

  Routes
    .forEach((route) => {
      const {
        parentName,
        name
      } = route;
      const ParentName = parentName || rootRoute;
      const { value: parent } = Routes.find(({ name }) => name === ParentName) || {};

      if (!parent) {
        throw new Error(`No such parent route ("${ ParentName }") found for the route ("${ name }")! (at initRouter)`);
      }

      if (!parent.abstract && name !== rootRoute) {
        throw new Error(`Parent route must be abstract (for "${ name }")! (at initRouter)`);
      }

      if (name !== rootRoute) {
        route.parentName = ParentName;
      }

      route.parent = name === rootRoute
        ? baseRoute
        : parent;
    })
    .forEach((route) => {
      const {
        name,
        parent: {
          params: parentParams,
          query: parentQuery,
          path
        },
        params,
        query,
        relativeURL,
        relativePath
      } = route;
      let proto = route;
      let count = 0;
      let newPath = relativePath;
      let newURL = '';

      if (isRegExp(path)) {
        throw new Error('URL regexp route cannot be extended! (at initRouter)');
      }

      while (proto = proto.parent) {
        count += new Super(proto.params).count;
        newPath = proto.relativePath + newPath;
        newURL = proto.relativeURL + newURL;

        proto.children.push(route);
      }

      newPath = new RegExp(`^${ newPath.replace(/\/+/g, '/').replace(/\/$/, '') || '/' }$`);
      newURL = isRegExp(relativeURL)
        ? newPath
        : (newURL + relativeURL).replace(/\/+/g, '/').replace(/\/$/, '') || '/';

      new Super(query).proto(parentQuery);
      new Super(params)
        .proto(parentParams)
        .forEach((value, key, params) => {
          params[key] += count;
        });

      if (name === defaultRoute && (
          new Super(params).count
          || new Super(query).count
        )) {
        throw new Error('Default route must not have URL or query params! (at initRouter)');
      }

      route.url = newURL;
      route.validatePath = newPath;
    });

  changeRoute();

  win.on({
    popstate() {
      if (location.href !== initialURL) {
        pushed = true;
      }

      if (pushed) {
        changeRoute();
      }
    },
    click(e) {
      const closestLink = new Elem(e.target).closest('a');

      if (closestLink.length && closestLink.attr('target') !== '_blank') {
        const push = !closestLink.hasAttr('replace');

        e.preventDefault();

        forward(closestLink.attr('href') || '', push);
      }
    }
  });
}

function makeRoute(options) {
  return (Block) => {
    options = assign({}, options, Block.routerOptions);

    const {
      name,
      path,
      abstract,
      root,
      fallbackTo,
      default: isDefault
    } = options || {};

    if (initialized) {
      console.warn('Router was already initialized (at makeRoute)');

      return self;
    }

    if (wasRoot && root) {
      throw new Error(`There can't be two root routes ("${ rootRoute }" and "${ name }")! (at makeRoute)`);
    }

    if (wasDefault && isDefault) {
      throw new Error(`There can't be two default routes ("${ defaultRoute }" and "${ name }")! (at makeRoute)`);
    }

    if (!name) {
      throw new Error('State must have a non-empty string "name" property! (at makeRoute)');
    }

    if (Routes.some(({ name: Name }) => Name === name)) {
      throw new Error('State must have unique "name" property! (at makeRoute)');
    }

    if (root) {
      wasRoot = true;
      rootRoute = name;
      options.parent = null;

      if (fallbackTo) {
        redirectRoute = fallbackTo;
      }
    }

    if (isDefault) {
      wasDefault = true;
      defaultRoute = name;

      if (abstract) {
        throw new Error('Default route can\'t be abstract! (at makeRoute)');
      }

      if (isRegExp(path)) {
        throw new Error('Default route can\'t have a regexp path! (at makeRoute)');
      }
    }

    const route = new Route(options);

    Routes.push(route);

    let unsubscribe;
    let routeLoaded;

    return class extends Block {
      /* eslint prefer-template: 0 */
      static template = '<div'
        + ` class="dwayne-route route-${ name }"`
        + ' d-class="{{ \'active-route\': __isCurrentRoute__ }}"'
        + ' d-show="{__isCurrentRoute__}"'
        + '>'
        + Block.template
        + '</div>';

      constructor(opts) {
        super(opts);

        if (root) {
          initRouter();

          this.global.router = router;
        }

        this.__routerInstance__ = route;
        this.__isCurrentRoute__ = currentRoutes.includes(route);
        this.args.route = currentRouteParams;

        routeLoaded = false;
        unsubscribe = subscribe(name, (action) => {
          const isCurrentRoute = action !== 'leave';

          this.__isCurrentRoute__ = isCurrentRoute;

          if (isCurrentRoute) {
            this.args.route = currentRouteParams;
          }

          if (action === 'load') {
            callBeforeLoad(this);
          } else if (action === 'leave') {
            callBeforeLeave(this);
          }
        });

        if (this.__isCurrentRoute__) {
          callBeforeLoad(this);
        }
      }

      beforeRemove() {
        unsubscribe();
        unsubscribe = null;
        callBeforeLeave(this);
        super.beforeRemove();
      }
    };

    function callBeforeLoad(route) {
      if (routeLoaded) {
        return;
      }

      const block = {
        $$: {
          children: new Arr([route])
        }
      };
      let wasRoute;

      block.$$.children.forEach(function beforeLoad(block) {
        if (block.__routerInstance__) {
          if (wasRoute) {
            return;
          }

          wasRoute = true;
        }

        const {
          name,
          children,
          mixins
        } = block.$$;

        if (children) {
          children.forEach(beforeLoad);
        }

        if (mixins) {
          mixins.forEach(beforeLoad);
        }

        if (block.beforeLoadRoute) {
          try {
            block.beforeLoadRoute();
          } catch (err) {
            console.error(`Uncaught error in ${ name }#beforeLoad:`, err);
          }
        }
      });

      routeLoaded = true;
    }

    function callBeforeLeave(route) {
      if (!routeLoaded) {
        return;
      }

      const block = {
        $$: {
          children: new Arr([route])
        }
      };
      let wasRoute;

      block.$$.children.forEach(function beforeLeave(block) {
        if (block.__routerInstance__) {
          if (wasRoute) {
            return;
          }

          wasRoute = true;
        }

        const {
          name,
          children,
          mixins
        } = block.$$;

        if (children) {
          children.forEach(beforeLeave);
        }

        if (mixins) {
          mixins.forEach(beforeLeave);
        }

        if (block.beforeLeaveRoute) {
          try {
            block.beforeLeaveRoute();
          } catch (err) {
            console.error(`Uncaught error in ${ name }#beforeLeave:`, err);
          }
        }
      });

      routeLoaded = false;
    }
  };
}

function subscribe(name, callback) {
  subscribers[name] = callback;

  return () => {
    delete subscribers[name];
  };
}

function forward(url, push) {
  changeHistory(url, push);
  changeRoute();
}

function changeRoute() {
  const route = findRouteByURL();

  if (route) {
    ({
      route: currentRoute,
      ...currentRouteParams
    } = route);
    assign(currentRouteParams, {
      name: currentRoute.name,
      host: location.host,
      hostname: location.hostname,
      href: location.href,
      origin: location.origin,
      pathname: location.pathname,
      port: location.port,
      protocol: location.protocol,
      search: location.search
    });
  } else {
    if (redirectRoute) {
      const {
        url,
        encodeParams,
        encodeQuery
      } = RedirectRoute;

      return forward(constructURL('', url, {}, {}, '', {
        params: encodeParams,
        query: encodeQuery
      }));
    }

    currentRoute = null;
    currentRouteParams = null;
  }

  const routesToLeave = new Arr([]);
  const routesToLoad = new Arr([]);
  let parent;

  while (currentRoutes.length && !parent) {
    const route = currentRoutes.pop();

    if (route.children.includes(currentRoute)) {
      currentRoutes.push(route);
      parent = route;
    } else {
      routesToLeave.push(route);
    }
  }

  if (currentRoute) {
    let currentParent = currentRoute;

    while (currentParent !== parent && currentParent !== baseRoute) {
      routesToLoad.unshift(currentParent);
      currentParent = currentParent.parent;
    }

    currentRoutes.push(...routesToLoad.$);
  }

  routesToLeave.forEach(({ name }) => {
    if (subscribers[name]) {
      subscribers[name]('leave');
    }
  });
  currentRoutes.forEach((route) => {
    const { name } = route;

    if (subscribers[name]) {
      subscribers[name](
        routesToLoad.includes(route)
          ? 'load'
          : 'update'
      );
    }
  });
}

function findRouteByURL() {
  const pathname = location.pathname || '/';
  const search = location.search || '';
  let urlParams;

  Routes.some((route) => {
    if (route.abstract) {
      return;
    }

    const {
      url: routeURL,
      validatePath,
      params,
      query: requiredQuery,
      decodeParams,
      decodeQuery
    } = route;
    const resolved = resolveURL(decodeQuery);
    const query = new Super(resolved.query);
    const eventualParams = {};
    const match = (
      (pathname.replace(/\/$/, '') || '/') +
      (isRegExp(routeURL) ? search : '')
    ).match(validatePath);

    if (!match) {
      return;
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

    urlParams = {
      route,
      params: eventualParams,
      query: query.$,
      hash: resolved.hash
    };

    return true;
  });

  if (urlParams) {
    return urlParams;
  }

  if (!defaultRoute) {
    return;
  }

  return {
    route: DefaultRoute,
    params: {},
    ...resolveURL(DefaultRoute.decodeQuery)
  };
}

function decode(string, decodeParams) {
  return decodeParams
    ? decodeURIComponent(string)
    : string;
}

function changeHistory(url, push) {
  try {
    history[push ? 'pushState' : 'replaceState'](null, null, url);
    pushed = true;
  } catch (err) {
    location.href = url;
  }
}

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

function buildURL(name, options = {}) {
  const { value: route } = Routes.find(({ name: n }) => n === name) || {};

  if (!route) {
    throw new Error(`There are no routes with name "${ name }"! (at router.buildURL)`);
  }

  const {
    url,
    encodeParams,
    encodeQuery
  } = route;

  if (isRegExp(url)) {
    throw new Error('URL can be built only from the string URLs! (at router.buildURL)');
  }

  const {
    params = {},
    query = {},
    hash = ''
  } = options;

  return constructURL('', url, params, query, hash, {
    params: encodeParams,
    query: encodeQuery
  });
}

function go(name, options) {
  forward(buildURL(name, options), true);
}

function goToURL(url) {
  forward(url, true);
}

function pushURL(url) {
  changeHistory(url, true);
}

function redirect(name, options) {
  forward(buildURL(name, options));
}

function redirectToURL(url) {
  forward(url);
}

function replaceURL(url) {
  changeHistory(url);
}

export { makeRoute, router };
