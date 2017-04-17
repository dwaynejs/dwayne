import { escapeRegex } from '../../utils';

export function constructMixinRegex(name) {
  return new RegExp(`^${ escapeRegex(name) }(?:\\(([^\\)]*)\\))?(?:#([\\s\\S]*))?$`);
}
