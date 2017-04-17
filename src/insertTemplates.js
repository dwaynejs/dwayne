import {
  toObjectKeys, iterateArray,
  assign, keys, create
} from './utils';

export function insertTemplates(template, templates) {
  const {
    vars,
    value
  } = template;
  const newTemplates = create(null);
  const newVars = toObjectKeys(vars);

  assign(newTemplates, templates);
  iterateArray(value, forEachNode);

  function forEachNode({ type, value, children }, index, tree) {
    if (type === '#comment') {
      value = value.trim();

      if (newTemplates[value]) {
        tree[index] = newTemplates[value].value;
        assign(newVars, toObjectKeys(newTemplates[value].vars));
      }
    } else {
      iterateArray(children, forEachNode);
    }
  }

  vars.length = 0;
  vars.push(...keys(newVars));

  return template;
}
