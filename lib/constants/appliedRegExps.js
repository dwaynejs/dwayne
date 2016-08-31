/**
 * @module constants/appliedRegExps
 * @private
 * @description Exports different types of syntax for {@link Elem#apply}.
 */

/**
 * @callback matchAppliedExprCallback
 * @param {Elem} elem - D-elem of an element to apply expression to.
 * @param {String} string - Matched applied name.
 * @param {String} arg - Argument within the parentheses.
 */

/**
 * @type {Object.<String, matchAppliedExprCallback|Object.<String, matchAppliedExprCallback>>}
 * @description Object of different types of syntax.
 */

export default {
  '#'(elem, id) {
    elem.id(id);
  },
  '.'(elem, cls) {
    elem.addClasses(cls);
  },
  $(elem, attr, arg) {
    elem.attr(attr, arg);
  },
  '@'(elem, prop, arg) {
    elem.css(prop, arg);
  },
  '&'(elem, html) {
    elem.html(html);
  },
  '*'(elem, text) {
    elem.text(text);
  },
  '-': {
    '.'(elem, value) {
      elem.removeClasses(value.slice(1));
    },
    $(elem, value) {
      elem.removeAttr(value.slice(1));
    },
    '@'(elem, value) {
      elem.removeCSS(value.slice(1));
    }
  }
};
