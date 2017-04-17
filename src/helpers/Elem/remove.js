export function remove(elem) {
  const parent = elem.parentNode;

  if (parent) {
    parent.removeChild(elem);
  }
}
