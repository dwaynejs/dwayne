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
    elem.addClass(cls);
  },
  $(elem, attr, value) {
    elem.attr(attr, value);
  },
  '@'(elem, prop, value) {
    elem.css(prop, value);
  },
  '&'(elem, html) {
    elem.html(html);
  },
  '*'(elem, text) {
    elem.text(text);
  },
  '-': {
    '.'(elem, cls) {
      elem.removeClass(cls);
    },
    $(elem, attr) {
      elem.removeAttr(attr);
    },
    '@'(elem, prop) {
      elem.removeCSS(prop);
    }
  }
};
