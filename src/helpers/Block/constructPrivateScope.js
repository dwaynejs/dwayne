import { create, collectFromObject } from '../../utils';

export function constructPrivateScope(object, type, parentScope) {
  let scope = {};

  if (type === 'globals') {
    scope = create(
      parentScope
        ? parentScope.$$.globals
        : null
    );
  }

  return collectFromObject(object, (scope, value, key) => {
    scope[key] = {
      value,
      watchers: {
        temp: [],
        perm: []
      }
    };
  }, scope);
}
