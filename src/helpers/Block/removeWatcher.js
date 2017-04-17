import { removeArrayElem, iterateArray } from '../../utils';

export function removeTempWatcher(watcher) {
  watcher.onRemove();
  watcher();
}

export function removeWatchers(watchersToRemove) {
  iterateArray(watchersToRemove, removeWatcher);
}

function removeWatcher({ watcher, watchers }) {
  removeArrayElem(watchers, watcher);
}
