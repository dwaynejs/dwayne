export function removeWithParentSignal(child) {
  child.$$.remove(true);
}

export function remove(child) {
  child.$$.remove();
}
