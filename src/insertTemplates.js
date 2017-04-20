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
  iterateAndChangeChildren(value);

  function iterateAndChangeChildren(nodes = []) {
    for (let i = 0; i < nodes.length; i++) {
      const {
        name,
        value,
        children
      } = nodes[i];

      if (name === '#comment') {
        const trimmed = value.trim();

        if (newTemplates[trimmed]) {
          const newTemplate = newTemplates[trimmed].value;

          nodes.splice(i, 1, ...newTemplate);
          assign(newVars, toObjectKeys(newTemplates[trimmed].vars));

          i += newTemplate.length - 1;
        }
      } else {
        iterateAndChangeChildren(children);
      }
    }
  }

  vars.length = 0;
  vars.push(...keys(newVars));

  return template;
}
