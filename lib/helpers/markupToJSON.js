/**
 * @module helpers/markupToJSON
 * @private
 * @description Exports markupToJSON method.
 */

import { Arr } from '../Arr';
import { Str } from '../Str';
import { Super } from '../Super';
import { switcher } from '../Switcher';
import { htmlAllowedTagSymbols, htmlAllowedAttrSymbols, voidElements } from '../constants';
import { isUndefined } from './checkTypes';

/**
 * @typedef {Object} MarkupElement
 * @property {'comment'|'text'|'element'} type - Type of the node.
 * @property {MarkupElement} parent - Type of the node.
 * @property {Object.<String, String>} attrs - Node attributes
 * @property {MarkupElement[]} children - Node children.
 */

const submitString = 'Please, submit an issue at https://github.com/dwaynejs/dwayne/issues/new, if needed.';
const NODE_REGEX_SET = new Super({
  'tag-open': new RegExp(`<(${ htmlAllowedTagSymbols })\\s*`, 'i'),
  'tag-close': constructCloseTagRegExp(htmlAllowedTagSymbols),
  comment: /<!--((?:-[^\->]|[^\->])(?:-?[^-])*[^-]?|)-->/
});
const TAG_OPEN_CLOSE = /^(\/?)>/;
// const ATTRIBUTE = /^([^\u0000-\u0020\s"'>\/=]+)(?:\s*=\s*('[^']*'|"[^"]*"|[^\s"'`<>=]+))?\s*/;
const ATTRIBUTE = new RegExp(`^(${ htmlAllowedAttrSymbols })(?:\\s*=\\s*('[^']*'|"[^"]*"|[^\\s"'\`<>=]+))?\\s*`);
const div = document.createElement('div');
const nodeSwitcher = switcher('strictEquals', (elem) => elem)
  .case('tag-open', (elem, node) => {
    const {
      value: name,
      selfClosing
    } = node;

    node = {
      name,
      attrs: new Super(node.attrs).map((value) => (
        value === true
          ? value
          : parseCharacterData(value)
      )).$,
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
  .case(['comment', 'text'], (elem, node, collapseWhiteSpace, type) => {
    const element = {
      name: `#${ type }`,
      parent: elem,
      value: node.value
    };

    if (type === 'text' && elem.name !== 'script' && elem.name !== 'style') {
      element.value = parseCharacterData(element.value);

      if (collapseWhiteSpace) {
        element.value = new Str(element.value).trim().$;
      }
    }

    if (!collapseWhiteSpace || !/^\s*$/.test(element.value)) {
      elem.children.push(element);
    }

    return elem;
  });
const rawTextSwitcher = switcher('strictEquals', false)
  .case(['title', 'textarea', 'style', 'script'], true);

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
 * @param {Boolean} [collapseWhiteSpace = false] - If the whitespace should be collapsed.
 * @returns {Arr.<MarkupElement>} Markup elements array.
 * @description Function for parsing html and xml to JSON.
 */
export default (markup, collapseWhiteSpace) => {
  collapseWhiteSpace = !!collapseWhiteSpace;

  const elements = new Arr([]);
  const startMarkup = markup;
  let found;
  let globalIndex = 0;
  let elem = {
    name: null,
    children: elements
  };

  while (markup.length) {
    try {
      found = find(markup, elem);
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

    elem = nodeSwitcher(node.type, [elem, node, collapseWhiteSpace]);

    markup = markup.slice(index);
  }

  return elements;

  function throwUnexpectedError() {
    throw new ParsingError(`Unexpected parsing error near index ${ nearString(startMarkup, globalIndex) }. ${ submitString }`);
  }
};

function find(markup, elem) {
  const { name } = elem;
  let matches;

  if (rawTextSwitcher(name)) {
    matches = new Super({
      'tag-close': markup.match(constructCloseTagRegExp(name))
    });
  } else {
    matches = NODE_REGEX_SET.map((regex) => (
      markup.match(regex)
    ));
  }

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

        if (!attr) {
          returning.index += 1;

          continue;
        }

        attrs[attr[1]] = isUndefined(attr[2])
          ? true
          : attr[2].replace(/^("|')|("|')$/g, '');
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

function constructCloseTagRegExp(tagName) {
  return new RegExp(`</(${ tagName })\\s*>`, 'i');
}

function nearString(markup, index) {
  return `${ index } (~~~ "${ markup.slice(index, index + 15) }" ~~~, the string itself is "${ markup }")`;
}

function parseCharacterData(string) {
  return string.replace(/&(\w+|#x?\d+);/g, (match) => {
    div.innerHTML = match;

    return div.textContent || div.innerText;
  });
}
