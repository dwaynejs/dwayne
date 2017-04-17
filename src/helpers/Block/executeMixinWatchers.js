import { iterateArray } from '../../utils';

export function executeMixinWatchers(mixin, value) {
  const oldValue = mixin.$$.value;

  mixin.$$.value = value;

  iterateArray(mixin.$$.watchers, (watcher) => {
    watcher(value, oldValue);
  });
}
