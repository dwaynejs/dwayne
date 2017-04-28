import { defineProperties, mapObject, iterateArray } from '../../utils';
import { gettingVars, evalMode } from '../../Block';
import { removeTempWatcher } from './removeWatcher';

export function constructPublicScope(scope, scopeValues, privateScope) {
  defineProperties(scope, mapObject(scopeValues, (value, key) => {
    const scope = privateScope[key];

    return {
      configurable: false,
      enumerable: true,
      get() {
        if (evalMode) {
          if (gettingVars.indexOf(scope.watchers) === -1) {
            gettingVars.push(scope.watchers);
          }
        }

        return scope.value;
      },
      set(value) {
        if (value === scope.value) {
          return;
        }

        const oldTempWatchers = scope.watchers.slice();

        scope.watchers = [];
        scope.value = value;

        iterateArray(oldTempWatchers, removeTempWatcher);
      }
    };
  }));
}
