/**
 * @module helpers/markupToJSON
 * @private
 * @description Exports markupToJSON method.
 */

import Arr from '../Arr';
import Super from '../Super';
import { switcher } from '../Switcher';
import { voidElements } from '../constants';

/**
 * @typedef {Object} MarkupElement
 * @property {'comment'|'text'|'element'} type - Type of the node.
 * @property {MarkupElement} parent - Type of the node.
 * @property {Object.<String, String>} attrs - Node attributes
 * @property {MarkupElement[]} children - Node children.
 */

const submitString = 'Please, submit an issue at https://github.com/dwaynejs/dwayne/issues.';
const NODE_REGEX_SET = new Super({
  'tag-open': /<([a-z][a-z\-_.:]*)\s*/i,
  'tag-close': /<\/([a-z][a-z\-_.:]*)>/i,
  comment: /<!--((?:-[^\->]|[^\->])(?:-?[^\-])*[^\-]?|)-->/
});
const TAG_OPEN_CLOSE = /^(\/?)>/;
const ATTRIBUTE = /^([^\u0000-\u0020\s"'>\/=]+)(?:\s*=\s*(?:'([^']*)(?:')|"([^"]*)(?:")|([^\s"'`<>=]+)))?\s*/;
const nodeSwitcher = switcher('strictEquals', (elem) => elem)
  .case('tag-open', (elem, node) => {
    const {
      value: name,
      selfClosing
    } = node;

    node = {
      type: 'element',
      name,
      attrs: node.attrs,
      parent: elem,
      children: new Arr([])
    };

    elem.children.push(node);

    if (!selfClosing && voidElements.indexOf(name) === -1) {
      elem = node;
    }

    return elem;
  })
  .case('tag-close', (elem, node) => {
    if (elem.name === node.value) {
      elem = elem.parent;
    }

    return elem;
  })
  .case(['comment', 'text'], (elem, node, type) => {
    elem.children.push({
      type,
      value: node.value
    });

    return elem;
  });

class InternalParsingError {
  constructor(index) {
    this.index = index;
  }
}

class ParsingError extends Error {
  type = 'PARSING_ERROR';
}

/**
 * @function markupToJSON
 * @private
 * @param {String} markup - Markup to parse to JSON.
 * @returns {Arr.<MarkupElement>} Markup elements array.
 * @description Function for parsing html and xml to JSON.
 */
export default (markup) => {
  const elements = new Arr([]);
  const nodes = [];
  const startMarkup = markup;
  let found;
  let globalIndex = 0;
  let elem = {
    name: null,
    children: elements
  };

  while (markup.length) {
    try {
      found = find(markup);
    } catch (err) {
      if (!(err instanceof InternalParsingError)) {
        throwUnexpectedError();
      }

      throw new ParsingError(`Parsing error near index ${ nearString(startMarkup, globalIndex + err.index) }`);
    }

    const {
      type,
      attrs,
      selfClosing,
      index,
      value
    } = found;

    globalIndex += index;

    if (!index) {
      throwUnexpectedError();
    }

    const node = {
      type,
      value
    };

    if (type === 'tag-open') {
      node.attrs = attrs;
      node.selfClosing = selfClosing;
    }

    nodes.push(node);

    markup = markup.slice(index);
  }

  nodes.forEach((node) => {
    elem = nodeSwitcher(node.type, [elem, node]);
  });

  JSON.stringify(elements, (key, value) => {
    if (value) {
      delete value.parent;
    }

    return value;
  });

  return elements.json(2);

  function throwUnexpectedError() {
    throw new ParsingError(`Unexpected parsing error near index ${ nearString(startMarkup, globalIndex) }. ${ submitString }`);
  }
};

function find(markup) {
  const matches = NODE_REGEX_SET.map((regex) => (
    markup.match(regex)
  ));

  let match;

  if (
    match = matches.find((match) => (
      match && match.index === 0
    ))
  ) {
    const returning = {
      type: match.key,
      index: match.value[0].length,
      value: match.value[1]
    };
    const attrs = {};

    if (match.key === 'tag-open') {
      const startMarkup = markup;
      let closeMatch;

      returning.selfClosing = false;
      returning.attrs = attrs;

      while (
        (markup = startMarkup.slice(returning.index)) &&
        !(closeMatch = markup.match(TAG_OPEN_CLOSE))
      ) {
        const attr = markup.match(ATTRIBUTE);

        // console.log(markup, attr);

        if (!attr) {
          throw new InternalParsingError(returning.index);
        }

        attrs[attr[1]] = attr[4] || attr[3] || attr[2] || '';
        returning.index += attr[0].length;
      }

      if (closeMatch) {
        returning.index += closeMatch[0].length;
        returning.selfClosing = !!closeMatch[1];
      }
    }

    return returning;
  }

  let { value: index } = matches.min((match) => (
    match ? match.index : NaN
  ));

  if (index === Infinity) {
    index = markup.length;
  }

  return {
    type: 'text',
    index,
    value: markup.slice(0, index)
  };
}

function nearString(markup, index) {
  return `${ index } (~~~ "${ markup.slice(index, index + 15) }" ~~~, the string itself is "${ markup }")`;
}
