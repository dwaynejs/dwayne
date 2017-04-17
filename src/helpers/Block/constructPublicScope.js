import { defineProperties, mapObject, iterateArray } from '../../utils';
import { Scope } from '../../constants';
import { removeTempWatcher } from './removeWatcher';

let changed;

export function constructPublicScope(scope, scopeValues, privateScope) {
  defineProperties(scope, mapObject(scopeValues, (value, key) => {
    const scope = privateScope[key];
    const { watchers } = scope;

    return {
      configurable: false,
      enumerable: true,
      get() {
        if (Scope.evalMode) {
          if (Scope.gettingVars.indexOf(watchers.temp) === -1) {
            Scope.gettingVars.push(watchers.temp);
          }
        }

        return scope.value;
      },
      set(value) {
        if (value === scope.value) {
          return;
        }

        if (!changed) {
          changed = [];
        }

        const oldTempWatchers = watchers.temp.slice();
        const oldValue = scope.value;

        watchers.temp = [];
        scope.value = value;

        iterateArray(oldTempWatchers, removeTempWatcher);
        changed.push({
          scope,
          oldValue,
          value
        });

        setTimeout(() => {
          if (!changed) {
            return;
          }

          const was = [];
          const values = [];

          for (let i = changed.length - 1; i >= 0; i--) {
            const {
              scope,
              value,
              oldValue
            } = changed[i];

            iterateArray(scope.watchers.perm, (watcher) => {
              const index = was.indexOf(watcher);

              if (index === -1) {
                was.push(watcher);
                values.push({
                  value,
                  oldValue
                });
              } else {
                values[index].oldValue = oldValue;
              }
            });

            changed.splice(i, 1);
          }

          changed = null;

          iterateArray(was, (watcher, i) => {
            const {
              value,
              oldValue
            } = values[i];

            watcher(value, oldValue);
          });
        }, 0);
      }
    };
  }));
}
