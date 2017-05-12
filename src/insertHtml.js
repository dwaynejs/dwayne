import {
  toObjectKeys,
  assign, keys, create
} from './utils';

export function insertHtml(html, templates) {
  const {
    vars = []
  } = html;
  const newTemplates = create(null);
  const newVars = toObjectKeys(vars);

  assign(newTemplates, templates);

  (function iterateAndChangeChildren(nodes = []) {
    for (let i = 0; i < nodes.length; i++) {
      const {
        type,
        value,
        children
      } = nodes[i];

      if (type === '#comment') {
        const trimmed = value.trim();

        if (newTemplates[trimmed]) {
          const newTemplate = newTemplates[trimmed];

          nodes.splice(i, 1, ...newTemplate);
          assign(newVars, toObjectKeys(newTemplates[trimmed].vars));

          i += newTemplate.length - 1;
        }
      } else {
        iterateAndChangeChildren(children);
      }
    }
  })(html);

  html.vars = keys(newVars);

  return html;
}
