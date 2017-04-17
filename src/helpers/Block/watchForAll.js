import { iterateObject } from '../../utils';

export function watchForAllLocals(block, watcher) {
  iterateObject(block.$$.locals, ({ watchers }) => {
    watchers.perm.push(watcher);
  });
}

export function watchForAllGlobals(block, watcher) {
  const {
    globals,
    watchersToRemove
  } = block.$$;

  for (const glob in globals) {
    /* eslint guard-for-in: 0 */
    const watchers = globals[glob].watchers.perm;

    watchers.push(watcher);
    watchersToRemove.push({
      watcher,
      watchers
    });
  }
}

export function watchForAllArgs(block, watcher) {
  iterateObject(block.$$.args, ({ watchers }) => {
    watchers.perm.push(watcher);
  });
}
