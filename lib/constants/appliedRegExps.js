/**
 * @module constants/appliedRegExps
 * @private
 * @description Exports different types of syntax for {@link Elem#apply}.
 */

import Str from '../String';

/**
 * @callback module:constants/appliedRegExps~matchCallback
 * @param {Elem} elem - D-elem of an element to apply expression to.
 * @param {String} string - Matched applied expression.
 */

/**
 * @typedef {Object} module:constants/appliedRegExps~appliedExpr
 * @property {?RegExp} test - RegExp for testing for the start of an applied expression.
 * @property {RegExp} regexp - RegExp for testing for the whole applied expression.
 * @property {module:constants/appliedRegExps~matchCallback} match - Callback if there was a match.
 */

/**
 * @type {module:constants/appliedRegExps~appliedExpr[]}
 * @description Array of different types of syntax.
 */
export default [
  {
    test: /^#(\(|"|'|`)/,
    regexp: /^#(\([\s\S]+\)|"[\s\S]+"|'[\s\S]+'|`[\s\S]+`)$/,
    match(elem, string) {
      elem.id(string.slice(2, -1));
    }
  },
  {
    regexp: /^#/,
    match(elem, string) {
      elem.id(string.slice(1));
    }
  },
  {
    regexp: /^\./,
    match(elem, string) {
      elem.addClasses(string.slice(1));
    }
  },
  {
    regexp: /^<\-\-$/,
    match(elem) {
      elem.float('left');
    }
  },
  {
    regexp: /^\-\->$/,
    match(elem) {
      elem.float('right');
    }
  },
  {
    regexp: /^\->/,
    match(elem, string) {
      elem.ref(string.slice(2));
    }
  },
  {
    regexp: /^\-\./,
    match(elem, string) {
      elem.removeClasses(string.slice(2));
    }
  },
  {
    regexp: /^\-@/,
    match(elem, string) {
      elem.removeCSS(string.slice(2));
    }
  },
  {
    regexp: /^\-/,
    match(elem, string) {
      elem.removeAttr(string.slice(1));
    }
  },
  {
    test: /^=>(\(|"|'|`)/,
    regexp: /^=>(\([\s\S]+\)|"[\s\S]+"|'[\s\S]+'|`[\s\S]+`)$/,
    match(elem, string) {
      elem.into(string.slice(3, -1));
    }
  },
  {
    regexp: /^=>\./,
    match(elem, string) {
      elem.moveClass(string.slice(3));
    }
  },
  {
    regexp: /^=>/,
    match(elem, string) {
      elem.moveAttr(string.slice(2));
    }
  },
  {
    regexp: /^~\./,
    match(elem, string) {
      elem.toggleClass(string.slice(2));
    }
  },
  {
    regexp: /^~/,
    match(elem, string) {
      elem.toggleAttr(string.slice(1));
    }
  },
  {
    test: /^\*/,
    regexp: /^\*[\s\S]+\*$/,
    match(elem, string) {
      elem.text(string.slice(1, -1));
    }
  },
  {
    test: /^\+\*/,
    regexp: /^\+\*[\s\S]+\*$/,
    match(elem, string) {
      elem.addText(string.slice(2, -1));
    }
  },
  {
    test: /^>(\(|"|'|`)/,
    regexp: /^>(\([\s\S]+\)|"[\s\S]+"|'[\s\S]+'|`[\s\S]+`)<$/,
    match(elem, string) {
      elem.html(string.slice(2, -2));
    }
  },
  {
    test: /^\+>(\(|"|'|`)/,
    regexp: /^\+>(\([\s\S]+\)|"[\s\S]+"|'[\s\S]+'|`[\s\S]+`)<$/,
    match(elem, string) {
      elem.addHTML(string.slice(3, -2));
    }
  },
  {
    regexp: /^\$/,
    match(elem, string) {
      switch (string.slice(1)) {
        case 'a':
          return elem.absolute();
        case 'b':
          return elem.bold();
        case 'c':
          return elem.centerText();
        case 'f':
          return elem.fixed();
        case 'h':
          return elem.hide();
        case 'i':
          return elem.italic();
        case 'r':
          return elem.relative();
        case 's':
          return elem.show();
        case 't':
          return elem.opacity(0);
        case 'u':
          return elem.underline();
      }
    }
  },
  {
    test: /^[^:]+:(\(|"|'|`)/,
    regexp: /^[^:]+:(\([\s\S]+\)|"[\s\S]+"|'[\s\S]+'|`[\s\S]+`)$/,
    match(elem, string) {
      const match = string.match(/^[^:]+/)[0];
      const prop = new Str(match).toCamelCase().$;

      elem.css(prop, string.slice(match.length + 2, -1));
    }
  },
  {
    regexp: /^[^:]+:[\s\S]+$/,
    match(elem, string) {
      const match = string.match(/^[^:]+/)[0];
      const prop = new Str(match).toCamelCase().$;

      elem.css(prop, string.slice(match.length + 1));
    }
  },
  {
    test: /^[^=]+=(\(|"|'|`)/,
    regexp: /^[^=]+=(\([\s\S]+\)|"[\s\S]+"|'[\s\S]+'|`[\s\S]+`)$/,
    match(elem, string) {
      const attr = string.match(/^[^=]+/)[0];

      elem.attr(attr, string.slice(attr.length + 2, -1));
    }
  },
  {
    regexp: /^[^=]+=[\s\S]+$/,
    match(elem, string) {
      const attr = string.match(/^[^=]+/)[0];

      elem.attr(attr, string.slice(attr.length + 1));
    }
  }
];
