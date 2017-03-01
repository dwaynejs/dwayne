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

var appliedRegExps = {
  '#': function _(elem, id) {
    elem.id(id);
  },
  '.': function _(elem, cls) {
    elem.addClass(cls);
  },
  $: function $(elem, attr, value) {
    elem.attr(attr, value);
  },
  '@': function _(elem, prop, value) {
    elem.css(prop, value);
  },
  '&': function _(elem, name, html) {
    elem.html(html);
  },
  '*': function _(elem, name, text) {
    elem.text(text);
  },

  '-': {
    '.': function _(elem, cls) {
      elem.removeClass(cls);
    },
    $: function $(elem, attr) {
      elem.removeAttr(attr);
    },
    '@': function _(elem, prop) {
      elem.removeCSS(prop);
    }
  }
};

/**
 * @module constants/elements
 * @private
 * @description Exports different canvas methods for {@link Elem} for creating html-elements.
 */

/**
 * @const
 * @type {String[]}
 */
var canvasGetMethods = [
/**
 * @member {Function} Elem#createImageData
 * @type {Function}
 * @param {...*} args
 * @returns {ImageData|void}
 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/createImageData
 */
'createImageData',

/**
 * @member {Function} Elem#createLinearGradient
 * @type {Function}
 * @param {...*} args
 * @returns {CanvasGradient|void}
 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/createLinearGradient
 */
'createLinearGradient',

/**
 * @member {Function} Elem#createPattern
 * @type {Function}
 * @param {...*} args
 * @returns {CanvasPattern|void}
 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/createPattern
 */
'createPattern',

/**
 * @member {Function} Elem#createRadialGradient
 * @type {Function}
 * @param {...*} args
 * @returns {CanvasGradient|void}
 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/createRadialGradient
 */
'createRadialGradient',

/**
 * @member {Function} Elem#getImageData
 * @type {Function}
 * @param {...*} args
 * @returns {ImageData|void}
 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/getImageData
 */
'getImageData',

/**
 * @member {Function} Elem#getLineDash
 * @type {Function}
 * @param {...*} args
 * @returns {Number[]|void}
 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/getLineDash
 */
'getLineDash',

/**
 * @member {Function} Elem#isPointInPath
 * @type {Function}
 * @param {...*} args
 * @returns {Boolean|void}
 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/isPointInPath
 */
'isPointInPath',

/**
 * @member {Function} Elem#isPointInStroke
 * @type {Function}
 * @param {...*} args
 * @returns {Boolean|void}
 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/isPointInStroke
 */
'isPointInStroke',

/**
 * @member {Function} Elem#measureText
 * @type {Function}
 * @param {...*} args
 * @returns {TextMetrics|void}
 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/measureText
 */
'measureText'];

var canvasRestMethods = [
/**
 * @member {Function} Elem#arc
 * @type {Function}
 * @param {...*} args
 * @returns {Elem}
 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/arc
 */
'arc',

/**
 * @member {Function} Elem#arcTo
 * @type {Function}
 * @param {...*} args
 * @returns {Elem}
 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/arcTo
 */
'arcTo',

/**
 * @member {Function} Elem#beginPath
 * @type {Function}
 * @param {...*} args
 * @returns {Elem}
 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/beginPath
 */
'beginPath',

/**
 * @member {Function} Elem#bezierCurveTo
 * @type {Function}
 * @param {...*} args
 * @returns {Elem}
 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/bezierCurveTo
 */
'bezierCurveTo',

/**
 * @member {Function} Elem#clearRect
 * @type {Function}
 * @param {...*} args
 * @returns {Elem}
 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/clearRect
 */
'clearRect',

/**
 * @member {Function} Elem#clip
 * @type {Function}
 * @param {...*} args
 * @returns {Elem}
 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/clip
 */
'clip',

/**
 * @member {Function} Elem#closePath
 * @type {Function}
 * @param {...*} args
 * @returns {Elem}
 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/closePath
 */
'closePath',

/**
 * @member {Function} Elem#drawFocusIfNeeded
 * @type {Function}
 * @param {...*} args
 * @returns {Elem}
 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/drawFocusIfNeeded
 */
'drawFocusIfNeeded',

/**
 * @member {Function} Elem#drawImage
 * @type {Function}
 * @param {...*} args
 * @returns {Elem}
 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/drawImage
 */
'drawImage',

/**
 * @member {Function} Elem#ellipse
 * @type {Function}
 * @param {...*} args
 * @returns {Elem}
 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/ellipse
 */
'ellipse',

/**
 * @member {Function} Elem#fill
 * @type {Function}
 * @param {...*} args
 * @returns {Elem}
 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/fill
 */
'fill',

/**
 * @member {Function} Elem#fillRect
 * @type {Function}
 * @param {...*} args
 * @returns {Elem}
 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/fillRect
 */
'fillRect',

/**
 * @member {Function} Elem#fillText
 * @type {Function}
 * @param {...*} args
 * @returns {Elem}
 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/fillText
 */
'fillText',

/**
 * @member {Function} Elem#lineTo
 * @type {Function}
 * @param {...*} args
 * @returns {Elem}
 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/lineTo
 */
'lineTo',

/**
 * @member {Function} Elem#moveTo
 * @type {Function}
 * @param {...*} args
 * @returns {Elem}
 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/moveTo
 */
'moveTo',

/**
 * @member {Function} Elem#putImageData
 * @type {Function}
 * @param {...*} args
 * @returns {Elem}
 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/putImageData
 */
'putImageData',

/**
 * @member {Function} Elem#quadraticCurveTo
 * @type {Function}
 * @param {...*} args
 * @returns {Elem}
 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/quadraticCurveTo
 */
'quadraticCurveTo',

/**
 * @member {Function} Elem#rect
 * @type {Function}
 * @param {...*} args
 * @returns {Elem}
 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/rect
 */
'rect',

/**
 * @member {Function} Elem#resetTransform
 * @type {Function}
 * @param {...*} args
 * @returns {Elem}
 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/resetTransform
 */
'resetTransform',

/**
 * @member {Function} Elem#restore
 * @type {Function}
 * @param {...*} args
 * @returns {Elem}
 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/restore
 */
'restore',

/**
 * @member {Function} Elem#rotate
 * @type {Function}
 * @param {...*} args
 * @returns {Elem}
 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/rotate
 */
'rotate',

/**
 * @member {Function} Elem#save
 * @type {Function}
 * @param {...*} args
 * @returns {Elem}
 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/save
 */
'save',

/**
 * @member {Function} Elem#scale
 * @type {Function}
 * @param {...*} args
 * @returns {Elem}
 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/scale
 */
'scale',

/**
 * @member {Function} Elem#setLineDash
 * @type {Function}
 * @param {...*} args
 * @returns {Elem}
 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/setLineDash
 */
'setLineDash',

/**
 * @member {Function} Elem#setTransform
 * @type {Function}
 * @param {...*} args
 * @returns {Elem}
 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/setTransform
 */
'setTransform',

/**
 * @member {Function} Elem#stroke
 * @type {Function}
 * @param {...*} args
 * @returns {Elem}
 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/stroke
 */
'stroke',

/**
 * @member {Function} Elem#strokeRect
 * @type {Function}
 * @param {...*} args
 * @returns {Elem}
 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/strokeRect
 */
'strokeRect',

/**
 * @member {Function} Elem#strokeText
 * @type {Function}
 * @param {...*} args
 * @returns {Elem}
 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/strokeText
 */
'strokeText',

/**
 * @member {Function} Elem#transform
 * @type {Function}
 * @param {...*} args
 * @returns {Elem}
 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/transform
 */
'transform',

/**
 * @member {Function} Elem#translate
 * @type {Function}
 * @param {...*} args
 * @returns {Elem}
 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/translate
 */
'translate'];

/**
 * @module constants/constructors
 * @private
 * @description Exports constructors levels.
 */

/**
 * @const
 * @type {Array[]}
 */
var constructors = [[], [], []];

/**
 * @module constants/elements
 * @private
 * @description Exports methods for {@link Elem} for creating html-elements.
 */

/**
 * @const
 * @type {String[]}
 */
var htmlElements = [
/**
 * @member {Function} Elem#a
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'a',

/**
 * @member {Function} Elem#abbr
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'abbr',

/**
 * @member {Function} Elem#address
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'address',

/**
 * @member {Function} Elem#area
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'area',

/**
 * @member {Function} Elem#article
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'article',

/**
 * @member {Function} Elem#audio
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'audio',

/**
 * @member {Function} Elem#b
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'b',

/**
 * @member {Function} Elem#base
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'base',

/**
 * @member {Function} Elem#bdi
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'bdi',

/**
 * @member {Function} Elem#bdo
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'bdo',

/**
 * @member {Function} Elem#blockquote
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'blockquote',

/**
 * @member {Function} Elem#body
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'body',

/**
 * @member {Function} Elem#br
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'br',

/**
 * @member {Function} Elem#button
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'button',

/**
 * @member {Function} Elem#canvas
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'canvas',

/**
 * @member {Function} Elem#caption
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'caption',

/**
 * @member {Function} Elem#cite
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'cite',

/**
 * @member {Function} Elem#code
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'code',

/**
 * @member {Function} Elem#col
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'col',

/**
 * @member {Function} Elem#colgroup
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'colgroup',

/**
 * @member {Function} Elem#content
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'content',

/**
 * @member {Function} Elem#datalist
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'datalist',

/**
 * @member {Function} Elem#dd
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'dd',

/**
 * @member {Function} Elem#del
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'del',

/**
 * @member {Function} Elem#details
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'details',

/**
 * @member {Function} Elem#dfn
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'dfn',

/**
 * @member {Function} Elem#dialog
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'dialog',

/**
 * @member {Function} Elem#div
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'div',

/**
 * @member {Function} Elem#dl
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'dl',

/**
 * @member {Function} Elem#dt
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'dt',

/**
 * @member {Function} Elem#element
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'element',

/**
 * @member {Function} Elem#em
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'em',

/**
 * @member {Function} Elem#embed
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'embed',

/**
 * @member {Function} Elem#fieldset
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'fieldset',

/**
 * @member {Function} Elem#figcaption
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'figcaption',

/**
 * @member {Function} Elem#figure
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'figure',

/**
 * @member {Function} Elem#footer
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'footer',

/**
 * @member {Function} Elem#form
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'form',

/**
 * @member {Function} Elem#h1
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'h1',

/**
 * @member {Function} Elem#h2
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'h2',

/**
 * @member {Function} Elem#h3
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'h3',

/**
 * @member {Function} Elem#h4
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'h4',

/**
 * @member {Function} Elem#h5
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'h5',

/**
 * @member {Function} Elem#h6
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'h6',

/**
 * @member {Function} Elem#head
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'head',

/**
 * @member {Function} Elem#header
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'header',

/**
 * @member {Function} Elem#hgroup
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'hgroup',

/**
 * @member {Function} Elem#hr
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'hr',

/**
 * @member {Function} Elem#i
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'i',

/**
 * @member {Function} Elem#iframe
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'iframe',

/**
 * @member {Function} Elem#img
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'img',

/**
 * @member {Function} Elem#input
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'input',

/**
 * @member {Function} Elem#ins
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'ins',

/**
 * @member {Function} Elem#kbd
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'kbd',

/**
 * @member {Function} Elem#label
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'label',

/**
 * @member {Function} Elem#legend
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'legend',

/**
 * @member {Function} Elem#li
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'li',

/**
 * @member {Function} Elem#link
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'link',

/**
 * @member {Function} Elem#main
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'main',

/**
 * @member {Function} Elem#mark
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'mark',

/**
 * @member {Function} Elem#menu
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'menu',

/**
 * @member {Function} Elem#menuitem
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'menuitem',

/**
 * @member {Function} Elem#meta
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'meta',

/**
 * @member {Function} Elem#meter
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'meter',

/**
 * @member {Function} Elem#nav
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'nav',

/**
 * @member {Function} Elem#noscript
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'noscript',

/**
 * @member {Function} Elem#ol
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'ol',

/**
 * @member {Function} Elem#optgroup
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'optgroup',

/**
 * @member {Function} Elem#option
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'option',

/**
 * @member {Function} Elem#output
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'output',

/**
 * @member {Function} Elem#p
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'p',

/**
 * @member {Function} Elem#param
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'param',

/**
 * @member {Function} Elem#pre
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'pre',

/**
 * @member {Function} Elem#progress
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'progress',

/**
 * @member {Function} Elem#q
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'q',

/**
 * @member {Function} Elem#rp
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'rp',

/**
 * @member {Function} Elem#rt
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'rt',

/**
 * @member {Function} Elem#rtc
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'rtc',

/**
 * @member {Function} Elem#ruby
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'ruby',

/**
 * @member {Function} Elem#s
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
's',

/**
 * @member {Function} Elem#samp
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'samp',

/**
 * @member {Function} Elem#script
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'script',

/**
 * @member {Function} Elem#section
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'section',

/**
 * @member {Function} Elem#select
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'select',

/**
 * @member {Function} Elem#shadow
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'shadow',

/**
 * @member {Function} Elem#small
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'small',

/**
 * @member {Function} Elem#source
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'source',

/**
 * @member {Function} Elem#span
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'span',

/**
 * @member {Function} Elem#strong
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'strong',

/**
 * @member {Function} Elem#style
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'style',

/**
 * @member {Function} Elem#sub
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'sub',

/**
 * @member {Function} Elem#summary
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'summary',

/**
 * @member {Function} Elem#sup
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'sup',

/**
 * @member {Function} Elem#table
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'table',

/**
 * @member {Function} Elem#tbody
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'tbody',

/**
 * @member {Function} Elem#td
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'td',

/**
 * @member {Function} Elem#template
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'template',

/**
 * @member {Function} Elem#textarea
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'textarea',

/**
 * @member {Function} Elem#tfoot
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'tfoot',

/**
 * @member {Function} Elem#th
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'th',

/**
 * @member {Function} Elem#thead
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'thead',

/**
 * @member {Function} Elem#time
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'time',

/**
 * @member {Function} Elem#title
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'title',

/**
 * @member {Function} Elem#tr
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'tr',

/**
 * @member {Function} Elem#track
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'track',

/**
 * @member {Function} Elem#u
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'u',

/**
 * @member {Function} Elem#ul
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'ul',

/**
 * @member {Function} Elem#var
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'var',

/**
 * @member {Function} Elem#video
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'video',

/**
 * @member {Function} Elem#wbr
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'wbr'];

var svgElements = [
/**
 * @member {Function} Elem#altGlyph
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'altGlyph',

/**
 * @member {Function} Elem#altGlyphDef
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'altGlyphDef',

/**
 * @member {Function} Elem#altGlyphItem
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'altGlyphItem',

/**
 * @member {Function} Elem#animate
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'animate',

/**
 * @member {Function} Elem#animateColor
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'animateColor',

/**
 * @member {Function} Elem#animateMotion
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'animateMotion',

/**
 * @member {Function} Elem#animateTransform
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'animateTransform',

/**
 * @member {Function} Elem#circle
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'circle',

/**
 * @member {Function} Elem#clipPath
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'clipPath',

/**
 * @member {Function} Elem#colorProfile
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'color-profile',

/**
 * @member {Function} Elem#cursor
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'cursor',

/**
 * @member {Function} Elem#defs
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'defs',

/**
 * @member {Function} Elem#desc
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'desc',

/**
 * @member {Function} Elem#discard
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'discard',

/**
 * @member {Function} Elem#ellipse
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'ellipse',

/**
 * @member {Function} Elem#feBlend
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'feBlend',

/**
 * @member {Function} Elem#feColorMatrix
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'feColorMatrix',

/**
 * @member {Function} Elem#feComponentTransfer
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'feComponentTransfer',

/**
 * @member {Function} Elem#feComposite
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'feComposite',

/**
 * @member {Function} Elem#feConvolveMatrix
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'feConvolveMatrix',

/**
 * @member {Function} Elem#feDiffuseLighting
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'feDiffuseLighting',

/**
 * @member {Function} Elem#feDisplacementMap
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'feDisplacementMap',

/**
 * @member {Function} Elem#feDistantLight
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'feDistantLight',

/**
 * @member {Function} Elem#feDropShadow
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'feDropShadow',

/**
 * @member {Function} Elem#feFlood
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'feFlood',

/**
 * @member {Function} Elem#feFuncA
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'feFuncA',

/**
 * @member {Function} Elem#feFuncB
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'feFuncB',

/**
 * @member {Function} Elem#feFuncG
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'feFuncG',

/**
 * @member {Function} Elem#feFuncR
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'feFuncR',

/**
 * @member {Function} Elem#feGaussianBlur
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'feGaussianBlur',

/**
 * @member {Function} Elem#feImage
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'feImage',

/**
 * @member {Function} Elem#feMerge
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'feMerge',

/**
 * @member {Function} Elem#feMergeNode
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'feMergeNode',

/**
 * @member {Function} Elem#feMorphology
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'feMorphology',

/**
 * @member {Function} Elem#feOffset
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'feOffset',

/**
 * @member {Function} Elem#fePointLight
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'fePointLight',

/**
 * @member {Function} Elem#feSpecularLighting
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'feSpecularLighting',

/**
 * @member {Function} Elem#feSpotLight
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'feSpotLight',

/**
 * @member {Function} Elem#feTile
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'feTile',

/**
 * @member {Function} Elem#feTurbulence
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'feTurbulence',

/**
 * @member {Function} Elem#font
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'font',

/**
 * @member {Function} Elem#fontFace
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'font-face',

/**
 * @member {Function} Elem#fontFaceFormat
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'font-face-format',

/**
 * @member {Function} Elem#fontFaceName
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'font-face-name',

/**
 * @member {Function} Elem#fontFaceSrc
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'font-face-src',

/**
 * @member {Function} Elem#fontFaceUri
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'font-face-uri',

/**
 * @member {Function} Elem#foreignObject
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'foreignObject',

/**
 * @member {Function} Elem#g
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'g',

/**
 * @member {Function} Elem#glyph
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'glyph',

/**
 * @member {Function} Elem#glyphRef
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'glyphRef',

/**
 * @member {Function} Elem#hatch
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'hatch',

/**
 * @member {Function} Elem#hatchpath
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'hatchpath',

/**
 * @member {Function} Elem#hkern
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'hkern',

/**
 * @member {Function} Elem#image
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'image',

/**
 * @member {Function} Elem#line
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'line',

/**
 * @member {Function} Elem#linearGradient
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'linearGradient',

/**
 * @member {Function} Elem#marker
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'marker',

/**
 * @member {Function} Elem#mask
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'mask',

/**
 * @member {Function} Elem#mesh
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'mesh',

/**
 * @member {Function} Elem#meshgradient
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'meshgradient',

/**
 * @member {Function} Elem#meshpatch
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'meshpatch',

/**
 * @member {Function} Elem#meshrow
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'meshrow',

/**
 * @member {Function} Elem#metadata
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'metadata',

/**
 * @member {Function} Elem#missingGlyph
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'missing-glyph',

/**
 * @member {Function} Elem#mpath
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'mpath',

/**
 * @member {Function} Elem#path
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'path',

/**
 * @member {Function} Elem#pattern
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'pattern',

/**
 * @member {Function} Elem#polygon
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'polygon',

/**
 * @member {Function} Elem#polyline
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'polyline',

/**
 * @member {Function} Elem#radialGradient
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'radialGradient',

/**
 * @member {Function} Elem#rect
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'rect',

/**
 * @member {Function} Elem#set
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'set',

/**
 * @member {Function} Elem#solidcolor
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'solidcolor',

/**
 * @member {Function} Elem#stop
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'stop',

/**
 * @member {Function} Elem#style
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'style',

/**
 * @member {Function} Elem#svg
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'svg',

/**
 * @member {Function} Elem#switch
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'switch',

/**
 * @member {Function} Elem#symbol
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'symbol',

/**
 * @member {Function} Elem#textPath
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'textPath',

/**
 * @member {Function} Elem#tref
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'tref',

/**
 * @member {Function} Elem#tspan
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'tspan',

/**
 * @member {Function} Elem#unknown
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'unknown',

/**
 * @member {Function} Elem#use
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'use',

/**
 * @member {Function} Elem#view
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'view',

/**
 * @member {Function} Elem#vkern
 * @type {Function}
 * @param {...String} appliedExpressions
 * @returns {Elem}
 */
'vkern'];

var voidElements = ['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'];

var htmlAllowedTagSymbols = '[a-z][a-z\\d\\-_.:!@#\\$%\\^&*()\\[\\]{}\\\\=\'"]*';
var htmlAllowedAttrSymbols = '[^\\u0000-\\u0020\\s"\'>/=]+';

/**
 * @module constants/regexpSpecialCharacters
 * @private
 * @description Exports special characters for RegExp.
 */

/**
 * @const
 * @name module:constants/regexpSpecialCharacters~regexpSpecialCharacters
 * @type {String[]}
 */
var regexpSpecialCharacters = ['.', '+', '*', '?', '(', ')', '[', ']', '{', '}', '<', '>', '^', '$', '!', '=', ':', '-', '|', ',', '\\'];

/**
 * @module helpers/toStringTag
 * @private
 * @description Exports toStringTag method.
 */

/**
 * @function toStringTag
 * @param {*} object - Object to get toStringTag of.
 * @returns {String} Cut string.
 * @description Cut "Type" string from "[object Type]" string that gotten from {}.toString,call(object).
 */
function toStringTag(object) {
  return {}.toString.call(object).replace(/^\[object |]$/g, '');
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var get$1 = function get$1(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get$1(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};









var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};



var set$1 = function set$1(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set$1(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();













var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

/**
 * @module helpers/checkTypes
 * @private
 * @mixin
 * @description Exports is<Type> methods.
 */

/**
 * @function isArray
 * @public
 * @param {*} value - Value to check if it is an array.
 * @returns {Boolean} If the argument is an array or not.
 * 
 * @example
 * isArray([]);                             // true
 * isArray(0);                              // true
 * isArray(document.querySelectorAll('*')); // false
 */
function isArray(value) {
  return toStringTag(value) === 'Array';
}

/**
 * @function isArrayLike
 * @public
 * @param {*} value - Value to check if it is array-like.
 * @returns {Boolean} If the argument is array-like or not.
 * @description Basically returns if the argument has non-negative integer "length" property and isn't a function.
 * 
 * @example
 * isArrayLike([]);                             // true
 * isArrayLike('');                             // true
 * isArrayLike(() => {});                       // false
 * isArrayLike(document.querySelectorAll('*')); // true
 */
function isArrayLike(value) {
  if (!value || isFunction(value)) {
    return false;
  }

  var length = value.length;

  return isInteger(length) && length >= 0;
}

/**
 * @function isBoolean
 * @public
 * @param {*} value - Value to check if it is a boolean.
 * @returns {Boolean} If the argument is a boolean or not.
 * 
 * @example
 * isBoolean(true);               // true
 * isBoolean(new Boolean(false)); // true
 * isBoolean(null);               // false
 */
function isBoolean(value) {
  return toStringTag(value) === 'Boolean';
}

/**
 * @function isDate
 * @public
 * @param {*} value - Value to check if it is a date.
 * @returns {Boolean} If the argument is a date or not.
 * 
 * @example
 * isDate(new Date());                 // true
 * isDate('1999-12-31T23:59:59.999Z'); // false
 */
function isDate(value) {
  return toStringTag(value) === 'Date';
}

/**
 * @function isDateLike
 * @public
 * @param {*} value - Value to check if it is date-like.
 * @returns {Boolean} If the argument is date-like or not.
 * @description Basically returns if new Date(argument) is not invalid date.
 * 
 * @example
 * isDateLike(new Date());                 // true
 * isDateLike('1999-12-31T23:59:59.999Z'); // true
 * isDateLike(0);                          // true
 */
function isDateLike(value) {
  value = new Date(value);

  return !isNaN(value.getTime());
}

/**
 * @function isElement
 * @public
 * @param {*} value - Value to check if it is an element.
 * @returns {Boolean} If the argument is element or not.
 *
 * @example
 * isElement(document.querySelector('html')); // true
 */
function isElement(value) {
  return (/Element$/.test(toStringTag(value))
  );
}

/**
 * @function isFinite
 * @public
 * @param {*} value - Value to check if it is finite.
 * @returns {Boolean} If the argument is finite or not.
 * 
 * @example
 * isFinite(0);        // true
 * isFinite('0');      // false
 * isFinite(Infinity); // false
 * isFinite(NaN);      // false
 */
function isFinite(value) {
  if (!isNumber(value)) {
    return false;
  }

  value = Number(value);

  return !isNaN(value) && value !== Infinity && value !== -Infinity;
}

/**
 * @function isFunction
 * @public
 * @param {*} value - Value to check if it is a function.
 * @returns {Boolean} If the argument is a function or not.
 * 
 * @example
 * isFunction(() => {});            // true
 * 
 * const func = () => {};
 * Object.setPrototypeOf(func, {});
 * isFunction(func);                // true
 */
function isFunction(value) {
  return toStringTag(value) === 'Function' || typeof value === 'function';
}

/**
 * @function isInteger
 * @public
 * @param {*} value - Value to check if it is an integer.
 * @returns {Boolean} If the argument is an integer or not.
 *
 * @example
 * isInteger(0);             // true
 * isInteger(0.1);           // false
 * isInteger(new Number(0)); // true
 * isInteger('0');           // false
 * isInteger(Infinity);      // false
 * isInteger(NaN);           // false
 */
function isInteger(value) {
  return isNumber(value) && value % 1 === 0;
}

/**
 * @function isIntegerLike
 * @public
 * @param {*} value - Value to check if it is integer-like.
 * @returns {Boolean} If the argument is integer-like or not.
 *
 * @example
 * isIntegerLike(0);             // true
 * isIntegerLike(new Number(0)); // true
 * isIntegerLike(0.1);           // false
 * isIntegerLike('0');           // true
 */
function isIntegerLike(value) {
  value = parseInt(Number(value));

  return !!(value || value === 0);
}

/**
 * @function isNaN
 * @public
 * @param {*} value - Value to check if it is NaN.
 * @returns {Boolean} If the argument is NaN or not.
 *
 * @example
 * isNaN(0);               // false
 * isNaN('NaN');           // false
 * isNaN(NaN);             // true
 * isNaN(new Number(NaN)); // true
 */
function isNaN(value) {
  if (!isNumber(value)) {
    return false;
  }

  value = Number(value);

  return value !== value;
}

/**
 * @function isNull
 * @public
 * @param {*} value - Value to check if it is null.
 * @returns {Boolean} If the argument is null or not.
 *
 * @example
 * isNull(null);      // true
 * isNull(undefined); // false
 */
function isNull(value) {
  return value === null;
}

/**
 * @function isNil
 * @public
 * @param {*} value - Value to check if it is null or undefined.
 * @returns {Boolean} If the argument is null or undefined or not.
 *
 * @example
 * isNil(null);      // true
 * isNil(undefined); // true
 * isNil(false);     // false
 */
function isNil(value) {
  return value === null || typeof value === 'undefined';
}

/**
 * @function isNumber
 * @public
 * @param {*} value - Value to check if it is a number.
 * @returns {Boolean} If the argument is a number or not.
 *
 * @example
 * isNumber(0);             // true
 * isNumber(new Number(0)); // true
 * isNumber(NaN);           // true
 * isNumber('0');           // false
 */
function isNumber(value) {
  return toStringTag(value) === 'Number';
}

/**
 * @function isNumberLike
 * @public
 * @param {*} value - Value to check if it is number-like.
 * @returns {Boolean} If the argument is number-like or not.
 *
 * @example
 * isNumberLike(0);          // true
 * isNumberLike('0');        // true
 * isNumberLike('Infinity'); // true
 * isNumberLike('NaN');      // true
 * isNumberLike(NaN);        // true
 */
function isNumberLike(value) {
  if (isNaN(value) || value === 'NaN') {
    return true;
  }

  value = Number(value);

  return !!(value || value === 0);
}

/**
 * @function isObject
 * @public
 * @param {*} value - Value to check if it is an object.
 * @returns {Boolean} If the argument is an object or not.
 *
 * @example
 * isObject({});   // true
 * isObject(1);    // false
 * isObject(null); // false
 */
function isObject(value) {
  return !!value && (toStringTag(value) === 'Object' || (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' || value instanceof Object);
}

/**
 * @function isPlainObject
 * @public
 * @param {*} value - Value to check if it is a plain object.
 * @returns {Boolean} If the argument is a plain object or not.
 *
 * @example
 * const obj = {};
 *
 * ifPlainObject(obj); // true
 *
 * Object.setPrototypeOf(object, null);
 *
 * ifPlainObject(obj); // true
 *
 * Object.setPrototypeOf(object, {});
 *
 * ifPlainObject(obj); // false
 */
function isPlainObject(value) {
  if (isPrimitive(value)) {
    return false;
  }

  var proto = Object.getPrototypeOf(value);

  if (isNull(proto)) {
    return true;
  }

  var constructor = proto.constructor;

  return isFunction(constructor) && constructor instanceof constructor && isNull(Object.getPrototypeOf(proto));
}

/**
 * @function isPrimitive
 * @public
 * @param {*} value - Value to check if it is primitive.
 * @returns {Boolean} If the argument is primitive or not.
 *
 * @example
 * isPrimitive(1);             // true
 * isPrimitive({});            // false
 * isPrimitive('');            // true
 * isPrimitive(new Number(0)); // false
 * isPrimitive(true);          // true
 * isPrimitive(Symbol('foo')); // true
 * isPrimitive(null);          // true
 * isPrimitive(undefined);     // true
 */
function isPrimitive(value) {
  return isNull(value) || /^(number|string|boolean|symbol|undefined)$/.test(typeof value === 'undefined' ? 'undefined' : _typeof(value));
}

/**
 * @function isRegExp
 * @public
 * @param {*} value - Value to check if it is a regular expression.
 * @returns {Boolean} If the argument is a regular expression or not.
 *
 * @example
 * isRegExp(/foo/);             // true
 * isRegExp('/foo/');           // false
 * isRegExp(new RegExp('foo')); // true
 */
function isRegExp(value) {
  return toStringTag(value) === 'RegExp';
}

/**
 * @function isString
 * @public
 * @param {*} value - Value to check if it is a string.
 * @returns {Boolean} If the argument is a string or not.
 *
 * @example
 * isString('0');             // true
 * isString(new String('0')); // true
 */
function isString(value) {
  return toStringTag(value) === 'String';
}

/**
 * @function isSymbol
 * @public
 * @param {*} value - Value to check if it is a symbol.
 * @returns {Boolean} If the argument is a symbol or not.
 *
 * @example
 * isSymbol(Symbol('1')); // true
 */
function isSymbol(value) {
  return toStringTag(value) === 'Symbol';
}

/**
 * @function isUndefined
 * @public
 * @param {*} value - Value to check if it is undefined.
 * @returns {Boolean} If the argument is undefined or not.
 *
 * @example
 * isUndefined(null);      // false
 * isUndefined(undefined); // true
 */
function isUndefined(value) {
  return typeof value === 'undefined';
}

/**
 * @module constants/validateCheckExpressions
 * @private
 * @description Exports different types of validate expressions for {@link module:helpers/validate}.
 */

/**
 * @callback checkValidityCallback
 * @private
 * @param {*} value - Value to check.
 */

/**
 * @typedef {Object} validateExpr
 * @private
 * @property {String} text - Text of the thrown error.
 * @property {Error} error - Type of the thrown error.
 * @property {checkValidityCallback} check - Callback for checking value.
 */

/**
 * @type {validateExpr[]}
 * @private
 * @description Object of different types of validation.
 */
var validateCheckExpressions = {
  '>0': {
    check: function check(n) {
      return n > 0;
    },
    text: '$n argument must be positive!',
    error: RangeError
  },
  '>=0': {
    check: function check(n) {
      return n >= 0;
    },
    text: '$n argument must be non-negative!',
    error: RangeError
  },
  '<0': {
    check: function check(n) {
      return n < 0;
    },
    text: '$n argument must be negative!',
    error: RangeError
  },
  '<=0': {
    check: function check(n) {
      return n <= 0;
    },
    text: '$n argument must be non-positive!',
    error: RangeError
  },
  '!!': {
    check: function check(v) {
      return !isNil(v);
    },
    text: '$n argument must be not null or undefined!',
    error: TypeError
  },
  array: {
    check: isArray,
    text: '$n argument must be an array!',
    error: TypeError
  },
  'array||!': {
    check: function check(a) {
      return isArray(a) || isNil(a);
    },
    text: '$n argument must be an array, or undefined, or null!',
    error: TypeError
  },
  arrayLike: {
    check: isArrayLike,
    text: '$n argument must be array-like!',
    error: TypeError
  },
  'arrayLike||!': {
    check: function check(a) {
      return isArrayLike(a) || isNil(a);
    },
    text: '$n argument must be array-like, or undefined, or null!',
    error: TypeError
  },
  date: {
    check: isDate,
    text: '$n argument must be a date!',
    error: TypeError
  },
  'date||!': {
    check: function check(d) {
      return isDate(d) || isNil(d);
    },
    text: '$n argument must be a date, or undefined, or null!',
    error: TypeError
  },
  dateLike: {
    check: isDateLike,
    text: '$n argument must be date-like!',
    error: TypeError
  },
  'dateLike||!': {
    check: function check(d) {
      return isDateLike(d) || isNil(d);
    },
    text: '$n argument must be date-like, or undefined, or null!',
    error: TypeError
  },
  function: {
    check: isFunction,
    text: '$n argument must be a function!',
    error: TypeError
  },
  'function||!': {
    check: function check(f) {
      return isFunction(f) || isNil(f);
    },
    text: '$n argument must be a function, or undefined, or null!',
    error: TypeError
  },
  int: {
    check: isInteger,
    text: '$n argument must be an integer!',
    error: TypeError
  },
  'int||!': {
    check: function check(i) {
      return isInteger(i) || isNil(i);
    },
    text: '$n argument must be an integer, or undefined, or null!',
    error: TypeError
  },
  intLike: {
    check: isIntegerLike,
    text: '$n argument must be integer-like!',
    error: TypeError
  },
  'intLike||!': {
    check: function check(i) {
      return isIntegerLike(i) || isNil(i);
    },
    text: '$n argument must be integer-like, or undefined, or null!',
    error: TypeError
  },
  number: {
    check: isNumber,
    text: '$n argument must be a number!',
    error: TypeError
  },
  'number||!': {
    check: function check(n) {
      return isNumber(n) || isNil(n);
    },
    text: '$n argument must be a number, or undefined, or null!',
    error: TypeError
  },
  numberLike: {
    check: isNumberLike,
    text: '$n argument must be number-like!',
    error: TypeError
  },
  'numberLike||!': {
    check: function check(n) {
      return isNumberLike(n) || isNil(n);
    },
    text: '$n argument must be number-like, or undefined, or null!',
    error: TypeError
  },
  object: {
    check: isObject,
    text: '$n argument must be an object!',
    error: TypeError
  },
  'object||!': {
    check: function check(o) {
      return isObject(o) || isNil(o);
    },
    text: '$n argument must be an object, or undefined, or null!',
    error: TypeError
  },
  regexp: {
    check: isRegExp,
    text: '$n argument must be a regular expression!',
    error: TypeError
  },
  'regexp||!': {
    check: function check(r) {
      return isRegExp(r) || isNil(r);
    },
    text: '$n argument must be a regular expression, or undefined, or null!',
    error: TypeError
  },
  string: {
    check: isString,
    text: '$n argument must be a string!',
    error: TypeError
  },
  'string||!': {
    check: function check(s) {
      return isString(s) || isNil(s);
    },
    text: '$n argument must be a string, or undefined, or null!',
    error: TypeError
  }
};

/**
 * @module D
 * @private
 * @description Exports D function.
 */

/**
 * @function D
 * @public
 * @param {*} [value] - Any value.
 * @returns {DWrap} Wrap of the argument.
 * @description Function for creating a D-wrap of an object.
 *
 * @example
 * D({});            // Super
 * D(() => {});      // Func
 * D([]);            // Arr
 * D(1);             // Num
 * D('1');           // Str
 * D(new Date());    // Dat
 * D(document.body); // Elem
 */
function D$2(value) {
  for (var i = constructors.length - 1; i >= 0; i--) {
    var levelConstructors = constructors[i];

    for (var k = 0, len = levelConstructors.length; k < len; k++) {
      var _constructor = levelConstructors[k];

      if (value instanceof _constructor.cls) {
        return value;
      }

      if (_constructor.check(value)) {
        return new _constructor.cls(value);
      }
    }
  }
}

/**
 * @module helpers/iterate
 * @private
 * @description Exports iterate method.
 */

/**
 * @callback IterationCallback
 * @param {*} value - Iteration value.
 * @param {String|Number} key - Iteration key.
 * @param {*} object - Initial iterable object.
 */

/**
 * @function iterate
 * @param {(Object|Array|null|undefined)} object - Value to iterate over.
 * @param {IterationCallback} callback - Callback that is called on every iteration.
 * @returns {*} If callback returns not undefined then iterate returns this value.
 * @description Function for iterating over all types of values.
 */
function iterate(object, callback) {
  var array = isArrayLike(object);
  var iteratedKeys = {};

  var iterated = 0;

  for (var key in object) {
    if ({}.hasOwnProperty.call(iteratedKeys, key)) {
      continue;
    }

    iteratedKeys[key] = true;

    if ({}.hasOwnProperty.call(object, key)) {
      if (array && iterated++ >= object.length) {
        break;
      }

      var value = callback(object[key], array ? Number(key) : key, object);

      if (!isUndefined(value)) {
        return value;
      }
    }
  }
}

/**
 * @module helpers/assign
 * @private
 * @description Exports Object.assign-like method.
 */

/**
 * @const
 * @function assign
 * @param {Object} target - Object to assign rest of arguments to.
 * @param {...Object} objects - Objects that are assigned to the target.
 * @returns {Object} Target.
 */
function assign$1(target) {
  for (var _len = arguments.length, objects = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    objects[_key - 1] = arguments[_key];
  }

  iterate(arguments, function (source, index) {
    if (index) {
      iterate(source, function (value, key) {
        target[key] = value;
      });
    }
  });

  return target;
}

/**
 * @module helpers/constructEvalFunction
 * @private
 * @description Exports constructEvalFunction method.
 */

/**
 * @function constructEvalFunction
 * @param {String} code - JS code.
 * @param {String} original - Original JS code.
 * @returns {*} Eval function.
 * @description Function for constructing eval function.
 */
function constructEvalFunction(code, original) {
  var func = void 0;

  try {
    /* eslint no-new-func: 0 */
    func = new Function('$', 'return ' + code);
    func.expression = code;
    func.original = original;

    return func;
  } catch (err) {
    throw new Error('Syntax error (in "' + code + '", original code: "' + original + '")');
  }
}

/**
 * @module helpers/defineProperty
 * @private
 * @description Exports defineProperty and dynamicDefineProperties methods.
 */

/**
 * @callback propertyGeneratorCallback
 * @param {String} name - Name of the property.
 * @param {Number} i - Index of the array.
 * @returns {*} Generated property.
 */

/**
 * @function dynamicDefineProperties
 * @param {Object} target - Object to define properties for.
 * @param {Array} properties - Object which keys are properties.
 * @param {propertyGeneratorCallback} propertyGenerator - Callback for every property.
 * @returns {void}
 * @description Function for dynamic creating properties based on name of the method.
 */
function dynamicDefineProperties(target, properties, propertyGenerator) {
  iterate(properties, function (name, i) {
    Object.defineProperty(target, name, {
      value: propertyGenerator(name, i),
      writable: true,
      enumerable: false,
      configurable: true
    });
  });
}

/**
 * @function defineProperties
 * @param {Object} target - Target to define properties for.
 * @param {Object} properties - Object with properties needed to be assign to the target.
 * @returns {void}
 * @description Function for defining properties of an object.
 */
function defineProperties(target, properties) {
  iterate(properties, function (value, name) {
    if (/^get /.test(name)) {
      Object.defineProperty(target, name.replace(/^get /, ''), {
        get: value,
        set: undefined,
        enumerable: false,
        configurable: true
      });

      return;
    }

    if (/^set /.test(name)) {
      Object.defineProperty(target, name.replace(/^set /, ''), {
        set: value,
        get: undefined,
        enumerable: false,
        configurable: true
      });

      return;
    }

    if (/^get\/set /.test(name)) {
      Object.defineProperty(target, name.replace(/^get\/set /, ''), {
        get: value.get,
        set: value.set,
        enumerable: false,
        configurable: true
      });

      return;
    }

    if (name !== 'Symbol.toStringTag') {
      Object.defineProperty(target, name, {
        value: value,
        writable: true,
        enumerable: false,
        configurable: true
      });
    }
  });
}

/**
 * @function defineUsualProperties
 * @param {Object} target - Target to define properties for.
 * @param {Object} properties - Object with properties needed to be assign to the target.
 * @returns {void}
 * @description Function for defining usual properties of an object.
 */
function defineUsualProperties(target, properties) {
  iterate(properties, function (value, name) {
    Object.defineProperty(target, name, {
      value: value,
      writable: true,
      enumerable: true,
      configurable: true
    });
  });
}

/**
 * @function defineFrozenProperties
 * @param {Object} target - Target to define properties for.
 * @param {Object} properties - Object with properties needed to be assign to the target.
 * @returns {void}
 * @description Function for defining frozen properties of an object.
 */
function defineFrozenProperties(target, properties) {
  iterate(properties, function (value, name) {
    Object.defineProperty(target, name, {
      value: value,
      writable: false,
      enumerable: false,
      configurable: false
    });
  });
}

/* eslint no-nested-ternary: 0 */
/* eslint no-negated-condition: 0 */
var global$1 = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

/**
 * @module helpers/Symbol
 * @private
 * @description Exports Symbol class.
 */

var _Symbol = global$1.Symbol || {
  toStringTag: 'Symbol.toStringTag',
  iterator: Math.random().toString(36)
};

/**
 * @module helpers/toArray
 * @private
 * @description Exports toArray method.
 */

/**
 * @function toArray
 * @param {*} value - Any value.
 * @param {Boolean} [createNewArray = false] - If it is needed to create new array.
 * @returns {Array} Create array.
 * @description Function for creating an array of any value.
 */
function toArray$1(value, createNewArray) {
  if (isArray(value) && !createNewArray) {
    return value;
  }

  var array = [];

  if (isArrayLike(value) && !isString(value)) {
    iterate(value, function (value) {
      array.push(value);
    });
  } else {
    array.push(value);
  }

  return array;
}

/**
 * @module helpers/toJSON
 * @private
 * @description Exports toJSON method.
 */

/**
 * @module helpers/validate
 * @private
 * @description Exports validate method.
 */

var numbers = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th'];

/**
 * @function validate
 * @private
 * @param {Object} args - Arguments of function.
 * @param {Object} options - Object with validate parameters.
 * @param {String} [name] - Name of the function what called validate.
 * @returns {void}
 * @description Function for checking arguments of other functions.
 */
function validate$1(args, options, name) {
  iterate(options, function (array, number) {
    if (!isArray(array)) {
      array = [array];
    }

    iterate(array, function (checker) {
      checker = validateCheckExpressions[checker];

      if (!checker.check(args[number])) {
        throw new checker.error(checker.text.replace('$n', numbers[number]) + (name ? ' (at ' + name + ')' : ''));
      }
    });
  });
}

/**
 * @module Alphabet
 * @private
 * @mixin
 * @description Exports Alphabet class.
 */

/**
 * @typedef {String} Char
 * @public
 * @description A string of one char.
 */

/**
 * @class Alphabet
 * @public
 * @param {ArrayLike} alphabet - Alphabet to wrap.
 * @returns {Alphabet} Instance of Alphabet.
 * @description Class for alphabet manipulations: add, delete symbols, generate a token from an alphabet,
 * check if an alphabet contains a word.
 *
 * @example
 * new Alphabet(['a', 'b', 'c']);
 */

var Alphabet = function () {
  function Alphabet() {
    var alphabet = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    classCallCheck(this, Alphabet);

    var a = {};

    for (var i = 0, length = alphabet.length; i < length; i++) {
      var char = alphabet[i];

      if (!check$1(char)) {
        throw new Error('Each element of an array must be a single char! (in Alphabet)');
      }

      a[char] = char;
    }

    /**
     * @member {Object} Alphabet#$$
     * @public
     * @description The alphabet.
     */
    Object.defineProperty(this, '$$', { value: a });
  }

  /**
   * @method Alphabet#add
   * @public
   * @param {...Char} chars - Chars to add.
   * @returns {Alphabet} Returns this.
   * @description Method for adding new letters to the alphabet.
   *
   * @example
   * const alphabet = new Alphabet(['a', 'b', 'c']);
   *
   * alphabet.add('d', 'e');
   *
   * alphabet.get().$; // ['a', 'b', 'c', 'd', 'e']
   */


  createClass(Alphabet, [{
    key: 'add',
    value: function add() {
      for (var _len = arguments.length, chars = Array(_len), _key = 0; _key < _len; _key++) {
        chars[_key] = arguments[_key];
      }

      for (var i = 0, length = chars.length; i < length; i++) {
        var char = chars[i];

        if (!check$1(char)) {
          throw new Error('Each argument must be a single char! (in Alphabet#add)');
        }

        this.$$[char] = char;
      }

      return this;
    }

    /**
     * @method Alphabet#contains
     * @public
     * @param {String} word - Word to check if it is in the alphabet or not.
     * @returns {Boolean} If the word in the alphabet or not.
     * @description Method that returns if a word is in alphabet or not.
     *
     * @example
     * const alphabet = new Alphabet(['f', 'b', 'o', 'a', 'r']);
     *
     * alphabet.contains('foo'); // true
     * alphabet.contains('bar'); // true
     * alphabet.contains('baz'); // false
     */

  }, {
    key: 'contains',
    value: function contains(word) {
      validate$1([word], ['string'], 'Alphabet#contains');

      var alphabet = this.$$;

      for (var i = 0, length = word.length; i < length; i++) {
        if (!alphabet[word[i]]) {
          return false;
        }
      }

      return true;
    }

    /**
     * @method Alphabet#delete
     * @public
     * @param {...Char} chars - Chars to delete.
     * @returns {Alphabet} Returns this.
     * @description Method for deleting letters from the alphabet.
     *
     * @example
     * const alphabet = new Alphabet(['a', 'b', 'c', 'd']);
     *
     * alphabet.delete('a');
     *
     * alphabet.get().$; // ['b', 'c', 'd']
     *
     * alphabet.delete('b', 'd');
     *
     * alphabet.get().$; // ['c']
     */

  }, {
    key: 'delete',
    value: function _delete() {
      for (var _len2 = arguments.length, chars = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        chars[_key2] = arguments[_key2];
      }

      for (var i = 0, length = chars.length; i < length; i++) {
        var char = chars[i];

        if (!check$1(char)) {
          throw new Error('Each argument must be a single char! (in Alphabet#delete)');
        }

        delete this.$$[char];
      }

      return this;
    }

    /**
     * @method Alphabet#get
     * @returns {Array} Wrap of an array of alphabet letters.
     * @description Method for getting array of alphabet letters.
     *
     * @example
     * new Alphabet(['a', 'b', 'c']).get().$; // ['a', 'b', 'c']
     */

  }, {
    key: 'get',
    value: function get() {
      return Object.keys(this.$$);
    }

    /**
     * @method Alphabet#token
     * @public
     * @param {Number} length - Token length.
     * @returns {String} Token.
     * @description Method for generating random token with given length.
     *
     * @example
     * new Alphabet(['a', 'b', 'c']).token(4); // 'abcb'
     */

  }, {
    key: 'token',
    value: function token(length) {
      validate$1([length], [['intLike', '>0']], 'Alphabet#token');

      var alphabet = Object.keys(this.$$);
      var len = alphabet.length;
      var token = '';

      for (var i = 0; i < length; i++) {
        token += alphabet[Math.floor(Math.random() * len)];
      }

      return token;
    }
  }]);
  return Alphabet;
}();

defineProperties(Alphabet.prototype, defineProperty({}, _Symbol.toStringTag, 'Alphabet'));

function check$1(char) {
  return isString(char) && char.length === 1;
}

/**
 * @function alphabet
 * @public
 * @param {String} string - String to generate an alphabet from.
 * @returns {Alphabet} New instance of Alphabet.
 * @description Function for creating an alphabet from a string that has format like this:
 * '&lt;char1&gt;-&lt;char2&gt; &lt;char3&gt;-&lt;char4&gt;'
 *
 * @example
 * const a1 = alphabet('a-c 1-3');
 * const a2 = alphabet('5-5f-g');
 *
 * a1.get().$; // ['1', '2', '3', 'a', 'b', 'c']
 * a2.get().$; // ['5', 'f', 'g']
 */
function alphabet(string) {
  validate$1([string], ['string']);

  var ranges = string.split(/([\s\S]-+[\s\S])?/g);
  var length = ranges.length;
  var alphabet = [];

  for (var i = 0; i < length; i++) {
    var range = ranges[i];

    if (!range || range === ' ') {
      continue;
    }

    if (/-/.test(range) && !/[\s\S]-+[\s\S]/.test(range)) {
      throw new Error('Wrong part of the string (' + range + ')! (in alphabet)');
    }

    if (/-/.test(range)) {
      var start = range.charCodeAt(0);
      var end = range.charCodeAt(2);

      if (start > end) {
        throw new Error('Start of the range must be before its end! (in alphabet)');
      }

      for (var k = 0, len = end - start + 1; k < len; k++) {
        alphabet.push(String.fromCharCode(start + k));
      }

      continue;
    }

    if (range.length === 1) {
      alphabet.push(range);
    }
  }

  return new Alphabet(alphabet);
}

/**
 * @module Switcher
 * @private
 * @mixin
 * @description Exports Switcher class.
 */

/**
 * @typedef {'boolean'|'equals'|'strictEquals'|'call'} SwitcherMode
 * @public
 * @description Enum type of switcher modes.
 */

/**
 * @callback SwitcherCallCallback
 * @public
 * @param {*} value - Switcher value.
 * @returns {Boolean|*} On what the callback returns depends if the case is a match (truthy for the match).
 */

/**
 * @callback SwitcherMatchCallback
 * @public
 * @param {...*} args - Arguments from the second argument that switcher was called with.
 * @param {*} value - Switcher value.
 * @param {*} matched - Switcher matched case.
 */

/**
 * @class Switcher
 * @public
 * @param {Object} [cases = {}] - Object of cases.
 * @param {SwitcherMode} [mode = 'equals'] - Switcher mode.
 * @param {*} [defaultValue] - Switcher default value.
 * @returns {Switcher} - Instance of Switcher.
 * @description Switcher class for creating functions working similar to switch (value) {} construction,
 * but with the value assignment. Switcher instance is a function that accepts a value argument and an optional
 * args argument. Args with additional switcher value and matched case
 * are passed into the function of the matched case (if it is a function).
 *
 * @example
 * const switcher = new Switcher();
 * const switcher = new Switcher({
 *   case1: 'value1',
 *   case2: 'value2'
 * });
 * const switcher = new Switcher('strictEquals');
 * const switcher = new Switcher({
 *   case1: 'value1',
 *   case2: 'value2'
 * }, 'strictEquals');
 * const switcher = new Switcher('strictEquals', 'defaultValue');
 * const switcher = new Switcher({
 *   case1: 'value1',
 *   case2: 'value2'
 * }, 'strictEquals', 'defaultValue');
 *
 * // See [switcher]{@link switcher} examples for more information.
 */

var Switcher = function (_Function) {
  inherits(Switcher, _Function);

  function Switcher() {
    var cases = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'equals';

    var _ret;

    var defaultValue = arguments[2];
    classCallCheck(this, Switcher);

    var _this = possibleConstructorReturn(this, (Switcher.__proto__ || Object.getPrototypeOf(Switcher)).call(this));

    if (isString(cases)) {
      if (!isUndefined(arguments[1])) {
        defaultValue = mode;
      }

      mode = cases;
      cases = {};
    }

    var eventualCases = [];

    iterate(cases, function (value, Case) {
      eventualCases.push({ case: Case, value: value });
    });

    function switcher(value) {
      var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var _switcher$$$ = switcher.$$;
      var mode = _switcher$$$.mode;
      var def = _switcher$$$.default;
      var cases = _switcher$$$.cases;


      var ret = iterate(cases, function (_ref) {
        var val = _ref.value;
        var Case = _ref.case;

        if (mode === 'boolean' && Case ||
        /* eslint eqeqeq: 0 */
        mode === 'equals' && Case == value || mode === 'strictEquals' && Case === value || mode === 'call' && Case(value)) {
          return { case: Case, value: val };
        }
      });

      if (isUndefined(ret)) {
        ret = { value: def };
      }

      if (!isFunction(ret.value)) {
        return ret.value;
      }

      args = toArray$1(args, true);
      args.push(value, ret.case);

      return ret.value.apply(null, args);
    }

    /**
     * @member Switcher#$$
     * @type {Object}
     * @protected
     * @property {Array} cases - Array of cases.
     * @property {SwitcherMode} mode - Switcher mode.
     * @property {*} default - Switcher default value.
     * @description Config parameters.
     */
    Object.defineProperty(switcher, '$$', {
      value: {
        cases: eventualCases,
        mode: mode,
        default: defaultValue
      }
    });
    Object.setPrototypeOf(switcher, Switcher.prototype);

    return _ret = switcher, possibleConstructorReturn(_this, _ret);
  }

  /**
   * @method Switcher#case
   * @public
   * @param {*|SwitcherCallCallback|Array.<*|SwitcherCallCallback>} cases - Case or an array of cases.
   * @param {*|SwitcherMatchCallback} value - Value that has to be assigned or a function
   * that is called with switcher value, if it's the case.
   * @returns {Switcher} Returns this.
   * @description Method for defining new cases.
   *
   * @example
   * const sw = new Switcher()
   *   .case(1, 'one')
   *   .case(2, 'two');
   *
   * sw(1); // 'one'
   * sw(2); // 'two'
   */


  createClass(Switcher, [{
    key: 'case',
    value: function _case(cases, value) {
      var _this2 = this;

      if (!isArray(cases)) {
        cases = [cases];
      }

      iterate(cases, function (Case) {
        _this2.$$.cases.push({ case: Case, value: value });
      });

      return this;
    }

    /**
     * @method Switcher#default
     * @public
     * @param {*} def - New default value.
     * @returns {Switcher} Returns this.
     * @description Method for redefining default switcher value.
     *
     * @example
     * const sw = new Switcher()
     *   .case(1, 'one')
     *   .default('three');
     *
     * sw(1); // 'one'
     * sw(2); // 'three'
     */

  }, {
    key: 'default',
    value: function _default(def) {
      this.$$.default = def;

      return this;
    }

    /**
     * @method Switcher#mode
     * @public
     * @param {SwitcherMode} mode - New switcher mode.
     * @returns {Switcher} Returns this.
     * @description Method for redefining switcher mode.
     *
     * @example
     * const sw = new Switcher()
     *   .mode('strictEquals')
     *   .case(1, 'number')
     *   .case('1', 'string');
     *
     * sw(1);   // 'number'
     * sw('1'); // 'string'
     */

  }, {
    key: 'mode',
    value: function mode(_mode) {
      this.$$.mode = _mode;

      return this;
    }
  }]);
  return Switcher;
}(Function);

defineProperties(Switcher.prototype, defineProperty({}, _Symbol.toStringTag, 'Switcher'));

/**
 * @function switcher
 * @public
 * @param {Object} [cases = {}] - Object of cases.
 * @param {SwitcherMode} [mode = 'equals'] - Switcher mode.
 * @param {*} [defaultValue] - Switcher default value.
 * @returns {Switcher} New instance of Switcher.
 * @description Simple wrap of [new Switcher(...)]{@link Switcher}.
 * 
 * @example
 * const sw = switcher({
 *   1: 'foo',
 *   2: 'bar'
 * });
 * sw(1); // 'foo'
 * sw(2); // 'bar'
 * sw(3); // undefined
 * 
 * @example
 * const sw = switcher()
 *   .case([1, 2], 'foo')
 *   .case(3, 'bar');
 *   
 * sw(1); // 'foo'
 * sw(2); // 'foo'
 * sw(3); // 'bar'
 * 
 * @example
 * const sw = switcher('call')
 *   .case(isArray, 'array')
 *   .case(isString, 'string')
 *   .case(isNumber, 'number')
 *   .default('rest');
 *   
 * sw([]);    // 'array'
 * sw('foo'); // 'string'
 * sw(123);   // 'number'
 * sw({});    // 'rest'
 * 
 * @example
 * const sw = switcher({
 *   1: (value) => {
 *     console.log(value + 1);
 *   },
 *   2: () => {
 *     console.log(value - 1);
 *   }
 * });
 * 
 * sw(1); // 2
 * sw(2); // 1
 * 
 * @example
 * const sw = switcher({
 *   first: (array) => array[0],
 *   last: (array) => array[array.length - 1]
 * }, 'equals', (array, index) => array[index]);
 * const array = [1, 2, 3, 4];
 * 
 * sw('first', [array]); // 1
 * sw('last', [array]);  // 4
 * sw(1, [array]);       // 2
 * sw(2, [array]);       // 3
 */
function switcher(cases, mode, defaultValue) {
  return new (Function.prototype.bind.apply(Switcher, [null].concat(Array.prototype.slice.call(arguments))))();
}

/**
 * @function when
 * @public
 * @param {Boolean|*} condition - Condition used for returning the proper value.
 * @param {*} value1 - Value if the condition is truthy.
 * @param {*} value2 - Value if the condition is falsey.
 * @returns {*} value1 or value2.
 * @description Synonym for
 * [ternary operator]{@link https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Operators/Conditional_Operator}.
 * 
 * @example
 * when(true, 'true', 'false'); // 'true'
 */
function when(condition, value1, value2) {
  return condition ? value1 : value2;
}

/**
 * @module Super
 * @private
 * @mixin
 * @description Exports Super class.
 */

/**
 * @typedef {Super|Arr|Func|Elem|Str|Num|Dat|BlobObject} DWrap
 * @public
 * @description Any kind of D-Wrap.
 */

/**
 * @typedef {String|Number|null} Key
 * @public
 * @description Key type used in many methods.
 */

/**
 * @typedef {TreeElement[]} Tree
 * @public
 */

/**
 * @typedef {Object} TreeElement
 * @public
 * @property {Key} key - Tree element key.
 * @property {*} value - Tree element value.
 * @description {@link Tree} element.
 */

/**
 * @callback DeepIterationCallback
 * @public
 * @param {*} value - Current iteration value.
 * @param {String|Number} key - Current iteration key/index.
 * @param {*} object - Iteration object.
 * @param {Tree} tree - Tree of { key, value } elements.
 */

/**
 * @callback DeepReduceCallback
 * @public
 * @param {*} previousValue - Previous value.
 * @param {*} value - Current iteration value.
 * @param {String|Number} key - Current iteration key/index.
 * @param {*} object - Iteration object.
 * @param {Tree} tree - Tree of { key, value } elements.
 */

/**
 * @callback IterationCallback
 * @public
 * @param {*} value - Current iteration value.
 * @param {String|Number} key - Current iteration key/index.
 * @param {*} object - Iteration object.
 */

/**
 * @callback JSONCallback
 * @public
 * @param {String|null} key - Current value.
 * @param {*} value - Current key.
 * @param {Object} object - Iteration object.
 */

/**
 * @callback ObjectCallback
 * @public
 * @param {Object} newObject - The new object.
 * @param {*} value - Current iteration value.
 * @param {String|Number} key - Current iteration key/index.
 * @param {*} object - Iteration object.
 */

/**
 * @callback ReduceCallback
 * @public
 * @param {*} previousValue - Previous value.
 * @param {*} value - Current iteration value.
 * @param {String|Number} key - Current iteration key/index.
 * @param {*} object - Iteration object.
 */

/**
 * @callback SuperMethod
 * @public
 * @this {DWrap}
 */

var cloneSwitcher = switcher('call', function (object) {
  return object;
}).case(function (object) {
  return new Super(object) === object;
}, function (object) {
  return new (Object.getPrototypeOf(object).constructor)(new Super(object.$).deepClone().$);
}).case(isElement, function (object, deep) {
  return object.clone(deep);
}).case(isDate, function (object) {
  return new Date(object);
}).case(isRegExp, function (object) {
  return new RegExp(object.source, object.toString().match(/[gimuy]*$/)[0]);
}).case(isArray, function () {
  return [];
}).case(isPlainObject, function () {
  return {};
});

/**
 * @class Super
 * @public
 * @param {*} [object] - An object to wrap.
 * @returns {DWrap} Instance of Super.
 * @description Wrap of any value. And there is no way to create a nested wrap.
 *
 * @example
 * new Super({}); // Super
 */

var Super = function () {
  function Super(object) {
    classCallCheck(this, Super);

    if (object instanceof Super) {
      return object;
    }

    /**
     * @member Super#$
     * @type {*}
     * @public
     * @description Wrapped object.
     */
    Object.defineProperty(this, '$', { value: object });
  }

  /**
   * @method Super.addStaticProperties
   * @public
   * @param {String|Object} property - Either a string of a property or an object
   * with properties keys and values values.
   * @param {Object} [value] - If a property parameter is a string this has to be a property value.
   * @returns {this} Returns this.
   * @description Sets static properties for DWrap constructors.
   *
   * @example
   * Super.addStaticProperties('cool', 42);
   * Super.addStaticProperties('superCool', 42*42);
   */


  createClass(Super, [{
    key: 'assign',


    /**
     * @method Super#assign
     * @public
     * @param {...(Object|Super|*)} objects - Objects to be assigned to the object.
     * @returns {DWrap} Returns this.
     * @description Synonym for
     * [Object.assign]
     * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign}.
     *
     * @example
     * new Super({ a: 1, b: 2 }).assign({ a: 3 }, { c: 3, d: 4 }, { d: 5 }).$; // { a: 3, b: 2, c: 3, d: 5 }
     */
    value: function assign() {
      for (var _len = arguments.length, objects = Array(_len), _key = 0; _key < _len; _key++) {
        objects[_key] = arguments[_key];
      }

      var object = this.$;

      iterate(object && arguments, function (o) {
        iterate(new Super(o).$, function (value, key) {
          object[key] = value;
        });
      });

      return this;
    }

    /**
     * @method Super#average
     * @public
     * @param {IterationCallback} [callback = null] - Callback that is passed to {@link Super#sum}.
     * @returns {Number} Average value.
     * @description Synonym for object.sum(callback) / object.count.
     *
     * @example
     * new Super({ a: 1, b: 2, c: 3 }).average();                         // 2
     * new Super({ a: 1, b: 2, c: 5 }).average((value) => value * value); // 10
     */

  }, {
    key: 'average',
    value: function average() {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      validate$1([callback], ['function||!'], 'Super#average');

      return this.sum(callback) / this.count;
    }

    /**
     * @method Super#call
     * @public
     * @param {SuperMethod} func - Function to be called with this context.
     * @param {...*} args - Arguments to be called with.
     * @returns {*} Return of function call.
     * @description Synonym for func.call(DObject, ...args);
     *
     * @example
     * new Super({ a: 1 }).call(function (b, c) {
     *   return this.a + b + c;
     * }, 2, 3); // 6
     */

  }, {
    key: 'call',
    value: function call(func) {
      validate$1([func], ['function'], 'Super#call');

      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      return func.apply(this, args);
    }

    /**
     * @method Super#clone
     * @returns {DWrap} New object.
     * @description Method assigns properties of the object to an empty one and returns the new one.
     *
     * @example
     * new Super({ a: 1, b: { c: 2 } }).clone().$; // { a: 1, b: { c: 2 } }
     */

  }, {
    key: 'clone',
    value: function clone() {
      var object = this.$;
      var clone = cloneSwitcher(object, [object, false]);

      if (clone !== object) {
        iterate(object, function (value, key) {
          clone[key] = value;
        });
      }

      return new this.constructor(clone);
    }

    /**
     * @member Super#count
     * @type {Number}
     * @public
     * @readonly
     * @description Returns number of own enumerable keys of the object.
     *
     * @example
     * new Super({ a: 1, b: 2 }).count; // 2
     */

  }, {
    key: 'create',


    /**
     * @method Super#create
     * @public
     * @param {Object} [descriptors] - Descriptors passed to Object.create.
     * @returns {DWrap} New instance of D-Wrap.
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/create
     * @description Synonym for
     * [Object.create]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/create}.
     *
     * @example
     * new Super({}).create({
     *   a: {
     *     value: 1,
     *     enumerable: false,
     *     writable: true,
     *     configurable: false
     *   }
     * }).$; // { a: 1 }
     */
    value: function create(descriptors) {
      return D$2(isPrimitive(this.$) ? undefined : Object.create(this.$, descriptors));
    }

    /**
     * @method Super#deepAssign
     * @public
     * @param {...*} objects - Objects to be assigned to the object.
     * @returns {DWrap} Returns this.
     * @description Deep analogue of {@link Super#assign}.
     *
     * @example
     * new Super({ a: 1 }).deepAssign(
     *   {
     *     b: {
     *       c: 2
     *     }
     *   },
     *   {
     *     a: {
     *       b: 1
     *     }
     *   },
     *   {
     *     a: {
     *       c: {
     *         d: 1
     *       }
     *     },
     *     b: 2
     *   },
     *   null
     * });
     * // {
     * //   a: {
     * //     b: 1,
     * //     c: {
     * //       d: 1
     * //     }
     * //   },
     * //   b: 2,
     * // }
     */

  }, {
    key: 'deepAssign',
    value: function deepAssign() {
      for (var _len3 = arguments.length, objects = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        objects[_key3] = arguments[_key3];
      }

      var object = this.$;

      if (isPrimitive(object)) {
        return this;
      }

      iterate(arguments, function (o) {
        _deepAssign(object, o);
      });

      return this;
    }

    /**
     * @method Super#deepClone
     * @public
     * @returns {DWrap} New instance of DWrap.
     * @description Deep cloning method. Clones plain objects, arrays, regular expressions and elements, the rest stays the same.
     *
     * @example
     * new Super({ a: 1, b: [2, 3], c: { d: 4 } }).deepClone().$;
     * // {
     * //   a: 1,
     * //   b: [2, 3],
     * //   c: { d: 4 }
     * // }
     */

  }, {
    key: 'deepClone',
    value: function deepClone() {
      return new this.constructor(_deepClone(this.$));
    }

    /**
     * @method Super#deepEquals
     * @public
     * @param {*} [object] - Object to compare to.
     * @returns {Boolean} - If the objects are deep equal or not.
     * @description Method for deep comparison of two objects.
     *
     * @example
     * new Super({ a: 1 }).deepEquals({ a: '1' }); // true
     * new Super(/1/).deepEquals(/1/);             // true
     */

  }, {
    key: 'deepEquals',
    value: function deepEquals() {
      var object = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      return deepEqual(this.$, object, false);
    }

    /**
     * @method Super#deepEvery
     * @public
     * @param {DeepIterationCallback} [callback = Boolean] - Called on each iteration.
     * If returns truthy iteration goes on and if falsey it stops.
     * @param {Number} [n = Infinity] - Iteration depth.
     * @returns {Boolean} If all the callback calls returned truthy value.
     * @description Returns boolean if all the callback calls returned truthy value.
     * Otherwise false. Deep analogue of {@link Super#every}.
     *
     * @example
     * new Super({ a: 1, b: { c: 2, d: 3 } }).deepEvery((value) => value < 4); // true
     * new Super({ a: {}, b: {}, c: {} }).deepEvery(() => false);              // true
     */

  }, {
    key: 'deepEvery',
    value: function deepEvery(callback, n) {
      if (arguments.length === 1 && !isFunction(callback)) {
        n = callback;
        callback = Boolean;
      } else if (arguments.length === 1) {
        n = Infinity;
      } else if (!arguments.length) {
        n = Infinity;
        callback = Boolean;
      }

      validate$1([callback, n], ['function', ['numberLike', '>0']], 'Super#deepEvery');

      n = Number(n);

      return _deepEvery(this.$, callback, n, [{ key: null, value: this.$ }]);
    }

    /**
     * @method Super#deepFilter
     * @public
     * @param {DeepIterationCallback} [callback = Boolean] - Called on each iteration.
     * If returns truthy the element is included and if falsey it's excluded.
     * @param {Number} [n = Infinity] - Iteration depth.
     * @returns {DWrap} New D-Wrap of filtered object.
     * @description Returns filtered by the callback object. Deep analogue of {@link Super#filter}.
     *
     * @example
     * new Super({ a: 1, b: { c: 2, d: 3 } }).deepFilter((value) => value%2).$;     // { a: 1, b: { d: 3 } }
     * new Super({ a: 1, b: { c: 2, d: 3 } }).deepFilter((value) => value === 1).$; // { a: 1 }
     * new Super({ a: 1, b: { c: 2, d: 3 } }).deepFilter((value) => value > 3).$;   // {}
     */

  }, {
    key: 'deepFilter',
    value: function deepFilter(callback, n) {
      if (arguments.length === 1 && !isFunction(callback)) {
        n = callback;
        callback = Boolean;
      } else if (arguments.length === 1) {
        n = Infinity;
      } else if (!arguments.length) {
        n = Infinity;
        callback = Boolean;
      }

      validate$1([callback, n], ['function', ['numberLike', '>0']], 'Super#deepFilter');

      var filtered = _deepFilter(this.$, callback, n, [{ key: null, value: this.$ }]);

      return D$2(isNil(filtered) ? filtered : filtered || {});
    }

    /**
     * @method Super#deepFind
     * @public
     * @param {DeepIterationCallback} [callback = Boolean] - Called on each iteration.
     * If returns truthy iteration stops and if falsey it continues.
     * @param {Number} [n = Infinity] - Iteration depth.
     * @returns {Tree|null} Tree of { key, value } if something found and null if not.
     * @description Returns tree of the elements if something found and null if nothing found.
     * Deep analogue of {@link Super#find}.
     *
     * @example
     * new Super({ a: 1, b: { c: 2, d: 3 } }).deepFind((value) => value === 2);
     * // [
     * //   { key: 'c', value: 2 },
     * //   { key: 'b', value: { c: 2, d: 3 } },
     * //   { key: null, value: <initial object> }
     * // ]
     */

  }, {
    key: 'deepFind',
    value: function deepFind(callback, n) {
      if (arguments.length === 1 && !isFunction(callback)) {
        n = callback;
        callback = Boolean;
      } else if (arguments.length === 1) {
        n = Infinity;
      } else if (!arguments.length) {
        n = Infinity;
        callback = Boolean;
      }

      validate$1([callback, n], ['function', ['numberLike', '>0']], 'Super#deepFind');

      return _deepFind(this.$, callback, n, [{ key: null, value: this.$ }]);
    }

    /**
     * @method Super#deepForEach
     * @public
     * @param {DeepIterationCallback} callback - Called on each iteration.
     * @param {Number} [n = Infinity] - Iteration depth.
     * @returns {DWrap} Returns this.
     * @description Method for iterating over any object. Deep analogue of {@link Super#forEach}.
     *
     * @example
     * new Super({ a: 1, b: { c: 2, d: 3 } }).deepForEach((value, key, object) => object[key] = value * value).$;
     * // { a: 1, b: { c: 4, d: 9 } }
     */

  }, {
    key: 'deepForEach',
    value: function deepForEach(callback) {
      var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Infinity;

      validate$1([callback, n], ['function', ['numberLike', '>0']], 'Super#deepForEach');

      n = Number(n);

      _deepForEach(this.$, callback, n, [{ key: null, value: this.$ }]);

      return this;
    }

    /**
     * @method Super#deepForEach
     * @public
     * @param {DeepIterationCallback} callback - Called on each iteration.
     * @param {Number} [n = Infinity] - Iteration depth.
     * @returns {DWrap} Returns this.
     * @description Method for iterating over any object. Deep analogue of {@link Super#forEach}.
     * Unlike {@link Super#deepForEach} the callback is called on every value of every object inside
     *
     * @example
     * new Super({ a: 1, b: { c: 2, d: 3 } }).deepForEach((value, key, object) => object[key] = value * value).$;
     * // { a: 1, b: { c: 4, d: 9 } }
     */

  }, {
    key: 'deepForEachEntry',
    value: function deepForEachEntry(callback) {
      var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Infinity;

      validate$1([callback, n], ['function', ['numberLike', '>0']], 'Super#deepForEach');

      n = Number(n);

      _deepForEachEntry(this.$, callback, n, [{ key: null, value: this.$ }]);

      return this;
    }

    /**
     * @method Super#deepFreeze
     * @public
     * @returns {DWrap} Returns this.
     * @description Deep analogue of {@link Super#freeze}.
     *
     * @example
     * new Super({ a: 1, b: { c: 2, d: 3 } }).deepFreeze(); // Super
     */

  }, {
    key: 'deepFreeze',
    value: function deepFreeze() {
      _deepFreeze(this.$);

      return this;
    }

    /**
     * @method Super#deepMap
     * @public
     * @param {DeepIterationCallback} callback - Called on each iteration.
     * Return value is used for creating a new object.
     * @param {Number} [n = Infinity] - Iteration depth.
     * @returns {DWrap} D-Wrap of the new object.
     * @description Returns a wrap of a new object using the callback. Deep analogue of {@link Super#map}.
     *
     * @example
     * new Super({ a: 1, b: { c: 2, d: 3 } }).deepMap((value) => value * value).$;
     * // { a: 1, b: { c: 4, d: 9 } }
     */

  }, {
    key: 'deepMap',
    value: function deepMap(callback) {
      var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Infinity;

      validate$1([callback, n], ['function', ['numberLike', '>0']], 'Super#deepMap');

      n = Number(n);

      return D$2(_deepMap(this.$, callback, n, [{ key: null, value: this.$ }]));
    }

    /**
     * @method Super#deepReduce
     * @public
     * @param {DeepReduceCallback} callback - Called on each iteration.
     * Return value is passed to the next callback call.
     * @param {Number} [n = Infinity] - Iteration depth.
     * @param {*} [IV = <first value>|undefined] - Initial value.
     * @returns {*} Modified IV.
     * @description Returns modified IV. Deep analogue of {@link Super#reduce}.
     *
     * @example
     * new Super({ a: 1, b: { c: 2, d: 3 } }).deepReduce((sum, value) => sum + value * value, Infinity, 0); // 14
     */

  }, {
    key: 'deepReduce',
    value: function deepReduce(callback) {
      var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Infinity;
      var IV = arguments[2];

      validate$1([callback, n], ['function', ['numberLike', '>0']], 'Super#deepReduce');

      n = Number(n);

      var object = this.$;
      var tree = [{ key: null, value: this.$ }];

      if (arguments.length < 3) {
        return _deepReduce(object, callback, n, false, undefined, tree).IV;
      }

      return _deepReduce(object, callback, n, false, { IV: IV }, tree).IV;
    }

    /**
     * @method Super#deepSome
     * @public
     * @param {DeepIterationCallback} [callback = Boolean] - Called on each iteration.
     * If returns truthy iteration stops and if falsey it continues.
     * @param {Number} [n = Infinity] - Iteration depth.
     * @returns {Boolean} If all the callback calls returned truthy value.
     * @description Returns true if some of the callback calls returned truthy value.
     * Otherwise false. Deep analogue of {@link Super#some}.
     *
     * @example
     * new Super({ a: 1, b: { c: 2, d: 3 } }).deepSome((value) => value > 4); // false
     * new Super({ a: {}, b: {}, c: {} }).deepSome(() => true);               // false
     */

  }, {
    key: 'deepSome',
    value: function deepSome(callback, n) {
      if (arguments.length === 1 && !isFunction(callback)) {
        n = callback;
        callback = Boolean;
      } else if (arguments.length === 1) {
        n = Infinity;
      } else if (!arguments.length) {
        n = Infinity;
        callback = Boolean;
      }

      validate$1([callback, n], ['function', ['numberLike', '>0']], 'Super#deepSome');

      n = Number(n);

      return _deepSome(this.$, callback, n, [{ key: null, value: this.$ }]);
    }

    /**
     * @method Super#deepStrictEquals
     * @public
     * @param {*} [object] - Object to compare to.
     * @returns {Boolean} - If the objects are deep strict equal or not.
     * @description Method for deep strict comparison of two objects.
     *
     * @example
     * new Super({ a: 1 }).deepStrictEquals({ a: '1' }); // false
     * new Super(/1/).deepStrictEquals(/1/);             // true
     */

  }, {
    key: 'deepStrictEquals',
    value: function deepStrictEquals() {
      var object = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      return deepEqual(this.$, object, true);
    }

    /**
     * @method Super#define
     * @param {String|Object} property - Either a string of a property or a descriptors object.
     * @param {Object} [descriptor] - If a property parameter is a string this has to be a property descriptor.
     * @returns {DWrap} Returns this.
     * @description Synonym for both
     * [Object.defineProperty]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty}
     * and
     * [Object.defineProperties]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties}.
     *
     * @example
     * new Super({}).define('a', {
     *   value: 1,
     *   enumerable: false,
     *   writable: true,
     *   configurable: false
     * }).$; // { a: 1 }
     * new Super({}).define({
     *   a: {
     *     value: 1,
     *     enumerable: false,
     *     writable: true,
     *     configurable: false
     *   }
     * }).$; // { a: 1 }
     */

  }, {
    key: 'define',
    value: function define(property, descriptor) {
      if (arguments.length >= 2) {
        property = defineProperty({}, property, descriptor);
      }

      property = new Super(property).$;

      if (isObject(this.$)) {
        Object.defineProperties(this.$, property);
      }

      return this;
    }

    /**
     * @method Super#delete
     * @public
     * @param {...String} props - List of properties to delete.
     * @returns {DWrap} Returns this.
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/delete
     * @description Synonym for multiple
     * ["delete" operator]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/delete}.
     *
     * @example
     * new Super({ a: 1, b: 2, c: 3 }).delete('c', 'a').$; // { b: 2 }
     */

  }, {
    key: 'delete',
    value: function _delete() {
      var object = this.$;

      for (var _len4 = arguments.length, props = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        props[_key4] = arguments[_key4];
      }

      iterate(object && props, function (property) {
        delete object[property];
      });

      return this;
    }

    /**
     * @method Super#equals
     * @public
     * @param {*} [object] - Object to compare.
     * @returns {Boolean} If the objects are equal or not.
     * @description Returns true if objects are equal using '==' operator and false if not. NaNs are considered to be equal.
     *
     * @example
     * new Super(3).equals('3');   // true
     * new Super(NaN).equals(NaN); // true
     */

  }, {
    key: 'equals',
    value: function equals(object) {
      var o = this.$;

      object = new Super(object).$;

      /* eslint eqeqeq: 0 */
      return o == object || isNaN(o) && isNaN(object);
    }

    /**
     * @method Super#every
     * @public
     * @param {IterationCallback} [callback = Boolean] - Called on each iteration.
     * If returns truthy iteration goes on and if falsey it stops.
     * @returns {Boolean} If all the callback calls returned truthy value.
     * @description Returns boolean if all the callback calls returned truthy value.
     *
     * @example
     * new Super({ a: 1, b: 2, c: 3 }).every((value) => value < 4); // true
     * new Super({}).every(() => false);                            // true
     */

  }, {
    key: 'every',
    value: function every() {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Boolean;

      validate$1([callback], ['function'], 'Super#every');

      return iterate(this.$, function (value, key, object) {
        if (!callback(value, key, object)) {
          return false;
        }
      }) !== false;
    }

    /**
     * @method Super#except
     * @public
     * @param {...String} [props] - Props to filter.
     * @returns {DWrap} New D-Wrap of filtered object.
     * @description Returns filter by the props object.
     *
     * @example
     * new Super({ a: 1, b: 2, c: 3 }).except('a', 'b').$; // { c: 3 }
     * new Super(null).except('a').$;                      // {}
     */

  }, {
    key: 'except',
    value: function except() {
      for (var _len5 = arguments.length, props = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        props[_key5] = arguments[_key5];
      }

      return this.filter(function (value, key) {
        return props.indexOf(key) === -1;
      });
    }

    /**
     * @method Super#filter
     * @public
     * @param {IterationCallback} [callback = Boolean] - Called on each iteration.
     * If returns truthy the element is included and if falsey it's excluded.
     * @returns {DWrap} New D-Wrap of filtered object.
     * @description Returns filtered by the callback object.
     *
     * @example
     * new Super({ a: 1, b: 2, c: 3 }).filter((value) => value%2).$; // { a: 1, c: 3 }
     * new Super(null).filter((value) => value%2).$;                 // null
     */

  }, {
    key: 'filter',
    value: function filter() {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Boolean;

      validate$1([callback], ['function'], 'Super#filter');

      var object = this.$;
      var array = isArrayLike(object);

      /* eslint no-nested-ternary: 0 */
      var o = array ? [] : isNil(object) ? object : {};

      iterate(object, function (value, key) {
        if (callback(value, key, object)) {
          if (array) {
            o.push(value);
          } else {
            o[key] = value;
          }
        }
      });

      return D$2(o);
    }

    /**
     * @method Super#find
     * @public
     * @param {IterationCallback} [callback = Boolean] - Called on each iteration.
     * If returns truthy iteration stops and if falsey it continues.
     * @returns {{ key: Key, value: * }|null} { key, value } if found and null if not.
     * @description Returns found { key, value } if something found and null if nothing found.
     *
     * @example
     * new Super({ a: 1, b: 2, c: 3 }).find((value) => value === 2); // { key: 'b', value: 2 }
     * new Super([1, 2, 3]).find((value) => value === 2);            // { key: 1, value: 2 }
     */

  }, {
    key: 'find',
    value: function find(callback) {
      validate$1([callback], ['function'], 'Super#find');

      return iterate(this.$, function (value, key, object) {
        if (callback(value, key, object)) {
          return { key: key, value: value };
        }
      }) || null;
    }

    /**
     * @method Super#forEach
     * @public
     * @param {IterationCallback} callback - Called on each iteration.
     * @returns {DWrap} Returns this.
     * @description Method for iterating over any object.
     *
     * @example
     * new Super({ a: 1, b: 2, c: 3 }).forEach((value, key, object) => {
     *   object[key] = value * value;
     * }).$; // { a: 1, b: { c: 4, d: 5 } }
     */

  }, {
    key: 'forEach',
    value: function forEach(callback) {
      validate$1([callback], ['function'], 'Super#forEach');

      iterate(this.$, function (value, key, object) {
        callback(value, key, object);
      });

      return this;
    }

    /**
     * @method Super#freeze
     * @public
     * @returns {DWrap} Returns this.
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
     * @description Synonym for
     * [Object.freeze]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze}.
     *
     * @example
     * new Super({ a: 1, b: 2, c: 3 }).freeze(); // Super
     */

  }, {
    key: 'freeze',
    value: function freeze() {
      Object.freeze(this.$);

      return this;
    }

    /**
     * @method Super#get
     * @public
     * @param {String|Object.<String, Function>} property - Either a string of a property or a getters object.
     * @param {Function} [getter] - If a property parameter is a string this has to be a getter function.
     * @returns {DWrap} Returns this.
     * @description Method for defining getters.
     *
     * @example
     * const object1 = new Super({}).get('a', () => 1).$;
     * object1.a; // 1
     *
     * const object2 = new Super({}).get({
     *   a: () => 2
     * }).$;
     * object2.a; // 2
     */

  }, {
    key: 'get',
    value: function get(property, getter) {
      if (arguments.length >= 2) {
        property = defineProperty({}, property, getter);
      }

      var object = this.$;

      iterate(isObject(object) && new Super(property).$, function (getter, property) {
        Object.defineProperty(object, property, { get: getter });
      });

      return this;
    }

    /**
     * @method Super#has
     * @public
     * @param {String|*} key - Property to check.
     * @returns {Boolean} Returns true if the object has the key and false if not.
     * @see https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/in
     * @description Synonym for
     * ["in" operator]{@link https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/in}.
     *
     * @example
     * new Super({ a: 1, b: 2, c: 3 }).has('b'); // true
     */

  }, {
    key: 'has',
    value: function has(key) {
      var object = this.$;

      if (!isObject(object)) {
        return false;
      }

      return key in object;
    }

    /**
     * @method Super#hasOwn
     * @public
     * @param {String|*} key - Property to check.
     * @returns {Boolean} Returns true if the object has its own key and false if not.
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty
     * @description Synonym for
     * [Object#hasOwnProperty]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty}.
     *
     * @example
     * new Super({ a: 1, b: 2, c: 3 }).hasOwn('b');              // true
     * new Super({ a: 1, b: 2, c: 3 }).hasOwn('hasOwnProperty'); // false
     */

  }, {
    key: 'hasOwn',
    value: function hasOwn(key) {
      var object = this.$;

      if (!isObject(object)) {
        return false;
      }

      return {}.hasOwnProperty.call(object, key);
    }

    /**
     * @method Super#instanceof
     * @public
     * @param {Function} constructor - Constructor to check.
     * @returns {Boolean} If the object is an instance of constructor.
     * @see https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/instanceof
     * @description Synonym for
     * ["instanceof" operator]{@link https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/instanceof}.
     */

  }, {
    key: 'instanceof',
    value: function _instanceof(constructor) {
      return this.$ instanceof constructor;
    }

    /**
     * @method Super#isFrozen
     * @public
     * @returns {Boolean} If the object is frozen.
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/isFrozen
     * @description Synonym for
     * [Object.isFrozen]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/isFrozen}.
     *
     * @example
     * new Super({}).freeze().isFrozen(); // true
     */

  }, {
    key: 'isFrozen',
    value: function isFrozen() {
      return Object.isFrozen(this.$);
    }

    /**
     * @method Super#json
     * @public
     * @param {JSONCallback|String[]} [replacer] - See the link.
     * @param {String|Number} [space] - See the link.
     * @returns {String} JSON string.
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
     * @description Synonym for
     * [JSON.stringify]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify}.
     *
     * @example
     * new Super({ a: 1, b: 2, c: 3 }).json(); // '{"a":1,"b":2,"c":3}'
     * new Super({ a: 1, b: 2, c: 3 }).json('    ');
     * // {
     * //     "a": 1,
     * //     "b": 2,
     * //     "c": 3
     * // }
     * new Super({ a: 1, b: 2, c: 3 }).json((key, value) => {
     *   if (typeof value === 'number') {
     *     return value%2 ? key + value0 : undefined;
     *   }
     *
     *   return value;
     * }, 2);
     * // {
     * //   "a": "a1",
     * //   "c": "c3"
     * // }
     */

  }, {
    key: 'json',
    value: function json(replacer, space) {
      if (arguments.length === 1 && !isFunction(replacer) && !isArray(replacer)) {
        [].unshift.call(arguments, null);
      }

      [].unshift.call(arguments, this.$);

      return JSON.stringify.apply(JSON, arguments);
    }

    /**
     * @method Super#keyOf
     * @public
     * @param {*} value - Value to find.
     * @returns {String|Number|null} A key or an index if found and null if not.
     * @description Method for finding equal to the argument value in the object. NaNs are considered to be equal.
     *
     * @example
     * new Super({ a: 1, b: 2, c: 3 }).keyOf(2);   // 'b'
     * new Super({ a: 1, b: 2, c: 3 }).keyOf('2'); // 'b'
     */

  }, {
    key: 'keyOf',
    value: function keyOf(value) {
      var key = iterate(this.$, function (val, key) {
        if (val == value || isNaN(val) && isNaN(value)) {
          return key;
        }
      });

      return isUndefined(key) ? null : key;
    }

    /**
     * @method Super#keyOfStrict
     * @public
     * @param {*} value - Value to find.
     * @returns {String|Number|null} A key or an index if found and null if not.
     * @description Method for finding strict equal to the argument value in the object. NaNs are considered to be equal.
     *
     * @example
     * new Super({ a: 1, b: 2, c: 3 }).keyOfStrict(2);   // 'b'
     * new Super({ a: 1, b: 2, c: 3 }).keyOfStrict('2'); // 'b'
     */

  }, {
    key: 'keyOfStrict',
    value: function keyOfStrict(value) {
      var key = iterate(this.$, function (val, key) {
        if (val === value || isNaN(val) && isNaN(value)) {
          return key;
        }
      });

      return isUndefined(key) ? null : key;
    }

    /**
     * @method Super#keys
     * @public
     * @returns {DWrap} A wrap of the keys array.
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
     * @description Synonym for
     * [Object.keys]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/keys}.
     *
     * @example
     * new Super({ a: 1, b: 2, c: 3 }).keys().$; // ['a', 'b', 'c']
     * new Super(null).keys().$;                 // []
     */

  }, {
    key: 'keys',
    value: function keys() {
      var object = this.$;

      return D$2(isObject(object) ? Object.keys(object) : []);
    }

    /**
     * @method Super#map
     * @public
     * @param {IterationCallback} callback - Called on each iteration.
     * Return value is used for creating a new object.
     * @returns {DWrap} D-Wrap of the new object.
     * @description Returns a wrap of a new object using the callback.
     *
     * @example
     * new Super({ a: 1, b: 2, c: 3 }).map((value) => value * 2).$; // { a: 2, b: 4, c: 6 }
     * new Super(null).map((value) => value * 2).$;                 // null
     */

  }, {
    key: 'map',
    value: function map(callback) {
      validate$1([callback], ['function'], 'Super#map');

      var object = this.$;
      var o = isArrayLike(object) ? [] : isNull(object) ? null : {};

      iterate(object, function (value, key) {
        o[key] = callback(value, key, object);
      });

      return D$2(o);
    }

    /**
     * @method Super#max
     * @public
     * @param {IterationCallback} callback - Called on each iteration.
     * Return value is used for comparison with the previous max value.
     * @returns {{key: Key, value: Number}} Object with max value and key of the max value.
     * @description Method for finding max value in the object.
     * If no callback is present comparison is between values of the object.
     *
     * @example
     * new Super({ a: 1, b: 2, c: 3 }).max();                     // { key: 'c', value: 3 }
     * new Super({ a: 1, b: 2, c: 3 }).max((value) => 4 - value); // { key: 'a', value: 3 }
     * new Super({ a: 'a', b: 'b', c: 'c' }).max();               // { key: null, value: -Infinity }
     */

  }, {
    key: 'max',
    value: function max() {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      validate$1([callback], ['function||!'], 'Super#max');

      return this.object(function (max, value, key, object) {
        var val = Number(callback ? callback(value, key, object) : value);

        if (val > max.value) {
          max.key = key;
          max.value = val;
        }
      }, { key: null, value: -Infinity }).$;
    }

    /**
     * @method Super#min
     * @public
     * @param {IterationCallback} callback - Called on each iteration.
     * Return value is used for comparison with the previous min value.
     * @returns {{key: Key, value: Number}} Object with min value and key of the min value.
     * @description Method for finding min value in the object.
     * If no callback is present comparison is between values of the object.
     *
     * @example
     * new Super({ a: 1, b: 2, c: 3 }).min();                     // { key: 'a', value: 1 }
     * new Super({ a: 1, b: 2, c: 3 }).min((value) => 4 - value); // { key: 'c', value: 1 }
     * new Super({ a: 'a', b: 'b', c: 'c' }).min();               // { key: null, value: Infinity }
     */

  }, {
    key: 'min',
    value: function min() {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      validate$1([callback], ['function||!'], 'Super#min');

      return this.object(function (min, value, key, object) {
        var val = Number(callback ? callback(value, key, object) : value);

        if (val < min.value) {
          min.key = key;
          min.value = val;
        }
      }, { key: null, value: Infinity }).$;
    }

    /**
     * @method Super#object
     * @public
     * @param {ObjectCallback} callback - Called on each iteration.
     * @param {Object|*} [object = {}] - Object that is passed to the callback.
     * @returns {DWrap} Wrap of the new object.
     * @description Type of {@link Super#reduce}.
     * The object is passed as an argument into the callback. The output is this object.
     *
     * @example
     * new Super({ a: 1, b: 2 }).object((object, value, key) => {
     *   object[key] = value;
     *   object[key + key] = value * 2;
     * }).$; // { a: 1, aa: 2, b: 2, bb: 4 }
     */

  }, {
    key: 'object',
    value: function object(callback) {
      var _object = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      validate$1([callback], ['function'], 'Super#object');

      iterate(this.$, function (value, key, obj) {
        callback(_object, value, key, obj);
      });

      return D$2(_object);
    }

    /**
     * @method Super#prop
     * @public
     * @param {String|Object.<String, *>} property - Either a string of a property or an assigned object.
     * @param {*} [value] - If a property parameter is a string
     * this has to be an assigned value if it's present.
     * @returns {DWrap|*} Returns this if it's a setter or a value if getter.
     * @description Method for getting and setting properties.
     *
     * @example
     * new Super({ a: 1, b: 2, c: 3 }).prop('a');              // 1
     * new Super({ a: 1, b: 2, c: 3 }).prop('a', 7).$;         // { a: 7, b: 2, c: 3 }
     * new Super({ a: 1, b: 2, c: 3 }).prop({ a: 7, b: 8 }).$; // { a: 7, b: 8, c: 3 }
     */

  }, {
    key: 'prop',
    value: function prop(property, value) {
      if (arguments.length <= 1 && isString(property)) {
        return this.$ ? this.$[property] : undefined;
      }

      if (arguments.length >= 2) {
        property = defineProperty({}, property, value);
      }

      return this.assign(property);
    }

    /**
     * @method Super#propertyDescriptor
     * @public
     * @param {String} property - Property of the object.
     * @returns {Object|undefined} Property descriptor.
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor
     * @descriptor Synonym for
     * [Object.getOwnPropertyDescriptor]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor}.
     *
     * @example
     * new Super({ a: 1 }).propertyDescriptor('a');
     * // {
     * //   value: 1,
     * //   enumerable: true,
     * //   writable: true,
     * //   configurable: true
     * // }
     */

  }, {
    key: 'propertyDescriptor',
    value: function propertyDescriptor(property) {
      var object = this.$;

      return isObject(object) ? Object.getOwnPropertyDescriptor(object, property) : undefined;
    }

    /**
     * @method Super#propertyNames
     * @public
     * @returns {DWrap} D-Wrap of the names array.
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames
     * @descriptor Synonym for
     * [Object.getOwnPropertyNames]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames}.
     *
     * @example
     * new Super({ a: 1, b: 2 }).define('c', { value: 3 }).$; // ['a', 'b', 'c']
     */

  }, {
    key: 'propertyNames',
    value: function propertyNames() {
      var object = this.$;

      return D$2(isObject(object) ? Object.getOwnPropertyNames(object) : []);
    }

    /**
     * @method Super#propertySymbols
     * @public
     * @returns {DWrap} D-Wrap of the names array.
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols
     * @descriptor Synonym for
     * [Object.getOwnPropertySymbols]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols}.
     *
     * @example
     * new Super({ [Symbol('foo')]: 1 }).define(Symbol('bar'), { value: 2 }).$; // [Symbol('foo'), Symbol('bar')]
     */

  }, {
    key: 'propertySymbols',
    value: function propertySymbols() {
      var object = this.$;

      return D$2(isObject(object) ? Object.getOwnPropertySymbols(object) : []);
    }

    /**
     * @method Super#proto
     * @public
     * @param {*} [proto] - If it's present it's set as a prototype to the object.
     * @returns {DWrap} In getter mode returns wrap of the prototype and in setter mode returns this.
     * @description Synonym for both
     * [Object.getPrototypeOf]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf}
     * and
     * [Object.setPrototypeOf]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf}.
     */

  }, {
    key: 'proto',
    value: function proto(_proto) {
      var object = this.$;
      var isContextObject = !isNil(object);

      if (arguments.length) {
        if (isContextObject && (isObject(_proto) || isNull(_proto))) {
          Object.setPrototypeOf(object, _proto);
        }

        return this;
      }

      return isContextObject ? new Super(Object.getPrototypeOf(object)) : new Super();
    }

    /**
     * @method Super#reduce
     * @public
     * @param {ReduceCallback} callback - Called on each iteration.
     * Return value is passed to the next callback call.
     * @param {*} [IV = <first value>|undefined] - Initial value.
     * @returns {*} Modified IV.
     * @description Returns modified IV. If the second argument is not present first value in the object is taken
     *
     * @example
     * new Super({ a: 1, b: 2, c: 3 }).reduce((sum, value) => sum + value * value, 0); // 14
     */

  }, {
    key: 'reduce',
    value: function reduce(callback, IV) {
      validate$1([callback], ['function'], 'Super#reduce');

      var object = this.$;

      var startKey = void 0;

      if (arguments.length === 1) {
        iterate(object, function (value, key) {
          startKey = key;
          IV = value;

          return true;
        });
      }

      iterate(object, function (value, key) {
        if (key !== startKey) {
          IV = callback(IV, value, key, object);
        }
      });

      return IV;
    }

    /**
     * @method Super#set
     * @public
     * @param {String|Object.<String, Function>} property - Either a string of a property or a setters object.
     * @param {Function} [setter] - If a property parameter is a string this has to be a setter function.
     * @returns {DWrap} Returns this.
     * @description Method for defining setters.
     *
     * @example
     * const object = new Super({})
     *   .get('public', function () {
     *     return this._private;
     *   })
     *   .set('public', function (value) {
     *     if (typeof value === 'number') {
     *       this._private = value;
     *     }
     *   });
     * object.prop('public', '1').$; // { public: undefined }
     * object.prop('public', 1).$;   // { public: 1, _private: 1 }
     *
     * new Super({}).set({
     *   public(value) {
     *     if (typeof value === 'number') {
     *       this._private = value;
     *     }
     *   }
     * });
     */

  }, {
    key: 'set',
    value: function set(property, setter) {
      if (arguments.length >= 2) {
        property = defineProperty({}, property, setter);
      }

      var object = this.$;

      iterate(isObject(object) && new Super(property).$, function (setter, property) {
        Object.defineProperty(object, property, { set: setter });
      });

      return this;
    }

    /**
     * @method Super#some
     * @public
     * @param {IterationCallback} [callback = Boolean] - Called on each iteration.
     * If returns truthy iteration stops and if falsey it continues.
     * @returns {Boolean} If all the callback calls returned truthy value.
     * @description Returns true if some of the callback calls returned truthy value. Otherwise false.
     *
     * @example
     * new Super({ a: 1, b: 2, c: 3 }).some((value) => value > 4); // false
     * new Super({}).some(() => true);                             // false
     */

  }, {
    key: 'some',
    value: function some() {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Boolean;

      validate$1([callback], ['function'], 'Super#some');

      return iterate(this.$, function (value, key, object) {
        if (callback(value, key, object)) {
          return true;
        }
      }) || false;
    }

    /**
     * @method Super#strictEquals
     * @public
     * @param {*} [object] - Object to compare.
     * @returns {Boolean} If the objects are equal or not.
     * @description Returns true if objects are equal using '===' operator and false if not.
     * NaNs are considered to be strict equal.
     *
     * @example
     * new Super(3).strictEquals('3');   // false
     * new Super(NaN).strictEquals(NaN); // true
     */

  }, {
    key: 'strictEquals',
    value: function strictEquals(object) {
      var o = this.$;

      object = new Super(object).$;

      return o === object || isNaN(o) && isNaN(object);
    }

    /**
     * @method Super#sum
     * @public
     * @param {IterationCallback} [callback = null] - Called on each iteration.
     * @returns {Number} Sum.
     * @description Type of {@link Super#reduce}.
     * If the callback is present it's used for summing. If not the value is used.
     *
     * @example
     * new Super({ a: 1, b: 2, c: 3 }).sum();                         // 6
     * new Super({ a: 1, b: 2, c: 3 }).sum((value) => value * value); // 14
     */

  }, {
    key: 'sum',
    value: function sum() {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      validate$1([callback], ['function||!'], 'Super#sum');

      return this.reduce(function (sum, value, key, object) {
        return sum + Number(callback ? callback(value, key, object) : value);
      }, 0);
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return this.$;
    }

    /**
     * @member Super#toStringTag
     * @type {String}
     * @public
     * @readonly
     * @description Returns toString tag of the object.
     *
     * @example
     * new Super({}).toStringTag; // 'Object'
     * new Super([]).toStringTag; // 'Array'
     * new Super(1).toStringTag;  // 'Number'
     */

  }, {
    key: 'value',


    /**
     * @method Super#value
     * @public
     * @param {String|Object.<String, *>} property - Either a string of a property or a values object.
     * @param {Object.<String, *>} [value] - If a property parameter is a string this has to be a value to be set.
     * @returns {DWrap} Returns this.
     * @description Method for defining non-enumerable, non-writable, non-configurable values.
     * Synonym for object.define(property, { value: value }).
     *
     * @example
     * new Super({}).value('a', 1).$; // { a: 1 }
     * new Super({}).value({
     *   a: 1
     * }).$;                          // { a: 1 }
     */
    value: function value(property, _value) {
      if (arguments.length >= 2) {
        property = defineProperty({}, property, _value);
      }

      var object = this.$;

      iterate(isObject(object) && new Super(property).$, function (value, property) {
        Object.defineProperty(object, property, { value: value });
      });

      return this;
    }

    /**
     * @method Super#values
     * @public
     * @returns {DWrap} A wrap of the values array.
     * @description Returns D-Wrap of the values array.
     *
     * @example
     * new Super({ a: 1, b: 2, c: 3 }).values().$; // [1, 2, 3]
     * new Super(null).values().$;                 // []
     */

  }, {
    key: 'values',
    value: function values() {
      var array = [];

      iterate(this.$, function (value) {
        array.push(value);
      });

      return D$2(array);
    }

    /**
     * @method Super#word
     * @public
     * @param {IterationCallback} callback - Called on each iteration.
     * @returns {String} Concatenated string.
     * @description Type of {@link Super#reduce}.
     * If the callback is present it's used for concatenating. If not the value is used.
     *
     * @example
     * new Super({ a: 1, b: 2, c: 3 }).word();                         // '123'
     * new Super({ a: 1, b: 2, c: 3 }).word((value) => value + value); // '112233'
     */

  }, {
    key: 'word',
    value: function word() {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      validate$1([callback], ['function||!'], 'Super#word');

      return this.reduce(function (word, value, key, object) {
        return word + String(callback ? callback(value, key, object) : value);
      }, '');
    }
  }, {
    key: 'count',
    get: function get() {
      var object = this.$;

      if (!isObject(object)) {
        return 0;
      }

      return isArrayLike(object) ? object.length : Object.keys(object).length;
    }
  }, {
    key: 'toStringTag',
    get: function get() {
      return toStringTag(this.$);
    }

    /**
     * @member Super#type
     * @type {String}
     * @public
     * @readonly
     * @description Synonym for
     * ["typeof" operator]{@link https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/instanceof}..
     *
     * @example
     * new Super({}).type;   // 'object'
     * new Super(1).type;    // 'number'
     * new Super('1').type;  // 'string'
     * new Super(true).type; // 'boolean'
     */

  }, {
    key: 'type',
    get: function get() {
      return _typeof(this.$);
    }
  }], [{
    key: 'addStaticProperties',
    value: function addStaticProperties(property, value) {
      if (arguments.length >= 2) {
        property = defineProperty({}, property, value);
      }

      defineProperties(this, property);

      return this;
    }

    /**
     * @method Super.addInstanceProperties
     * @public
     * @param {String|Object} property - Either a string of a property or an object
     * with properties keys and values values.
     * @param {Object} [value] - If a property parameter is a string this has to be a property value.
     * @returns {this} Returns this.
     * @description Sets static properties for DWrap prototypes.
     *
     * @example
     * Super.addInstanceProperties('cool', 42);
     * Super.addInstanceProperties('superCool', 42*42);
     */

  }, {
    key: 'addInstanceProperties',
    value: function addInstanceProperties(property, value) {
      if (arguments.length >= 2) {
        property = defineProperty({}, property, value);
      }

      defineProperties(this.prototype, property);

      return this;
    }
  }]);
  return Super;
}();

defineProperties(Super.prototype, defineProperty({}, _Symbol.toStringTag, 'Super'));

/**
 * @function deepAssign
 * @private
 * @param {*} target - Object to assign properties to.
 * @param {*} object - Object to assign properties from.
 * @returns {void}
 */
function _deepAssign(target, object) {
  iterate(object, function (value, key) {
    if (isPrimitive(target[key]) || !{}.hasOwnProperty.call(target, key)) {
      target[key] = _deepClone(value);

      return;
    }

    if (!isPrimitive(target[key])) {
      _deepAssign(target[key], value);
    }
  });
}

/**
 * @function deepClone
 * @private
 * @param {*} object - Object to clone.
 * @description Does the deep cloning.
 */
function _deepClone(object) {
  var clone = cloneSwitcher(object, [object, true]);

  if (clone !== object) {
    iterate(object, function (value, key) {
      clone[key] = _deepClone(value);
    });
  }

  return clone;
}

/**
 * @function deepEqual
 * @private
 * @param {*} o1 - First object to compare.
 * @param {*} o2 - Second object to compare.
 * @param {Boolean} strict - If comparison should be strict or not.
 * @returns {Boolean} - If the object are deep equal or not.
 */
function deepEqual(o1, o2, strict) {
  if (o1 === o2) {
    return true;
  }

  if (isNaN(o1) && isNaN(o2) && isPrimitive(o1) && isPrimitive(o2)) {
    return true;
  }

  if (isNaN(o1) || isNaN(o2)) {
    return false;
  }

  if (isPrimitive(o1) || isPrimitive(o2)) {
    return strict ? o1 === o2 : o1 == o2;
  }

  if (isDate(o1) && isDate(o2)) {
    return o1.getTime() === o2.getTime();
  }

  if (isDate(o1) || isDate(o2)) {
    return false;
  }

  if (isRegExp(o1) && isRegExp(o2)) {
    return o1.source === o2.source && o1.toString().match(/[gimuy]*$/)[0] === o2.toString().match(/[gimuy]*$/)[0] && o1.lastIndex === o2.lastIndex;
  }

  if (isRegExp(o1) || isRegExp(o2)) {
    return false;
  }

  if (!isPlainObject(o1) && !isArray(o1) || !isPlainObject(o2) && !isArray(o2)) {
    return false;
  }

  var p1 = Object.getPrototypeOf(o1);
  var p2 = Object.getPrototypeOf(o1);

  if (Object.keys(o1).length !== Object.keys(o2).length) {
    return false;
  }

  if (p1 && p2 && toStringTag(p1.constructor) !== toStringTag(p2.constructor)) {
    return false;
  }

  return iterate(o1, function (value, key) {
    if (!(key in o2) || !deepEqual(value, o2[key], strict)) {
      return false;
    }
  }) !== false;
}

/**
 * @function deepEvery
 * @private
 * @param {*} object - Object to iterate over.
 * @param {DeepIterationCallback} callback - Callback that is called on every element.
 * If returns truthy the iteration goes on and if not it stops.
 * @param {Number} n - Depth of iteration.
 * @param {Tree} tree - Tree of { key, value } objects of iteration.
 * @returns {Boolean} - If all the callback calls returned truthy value.
 */
function _deepEvery(object, callback, n, tree) {
  var end = n === 1;

  return iterate(object, function (value, key, object) {
    var newTree = [{ key: key, value: value }].concat(tree);

    if (end || isPrimitive(value) ? !callback(value, key, object, newTree) : !_deepEvery(value, callback, n - 1, newTree)) {
      return false;
    }
  }) !== false;
}

/**
 * @function deepFilter
 * @private
 * @param {*} object - Object to iterate over.
 * @param {DeepIterationCallback} callback - Callback that is called on every element.
 * If returns truthy the element is included in the output and if not it's excluded.
 * @param {Number} n - Depth of iteration.
 * @param {Tree} tree - Tree of { key, value } objects of iteration.
 * @returns {*} Filtered object.
 */
function _deepFilter(object, callback, n, tree) {
  var array = isArrayLike(object);
  var nul = isNil(object);
  var o = array ? [] : nul ? object : {};
  var end = n === 1;

  iterate(object, function (value, key, object) {
    var newTree = [{ key: key, value: value }].concat(tree);

    if ((end || isPrimitive(value)) && callback(value, key, object, newTree)) {
      if (array) {
        o.push(value);
      } else {
        o[key] = value;
      }

      return;
    }

    if (!end) {
      var filtered = _deepFilter(value, callback, n - 1, newTree);

      if (filtered) {
        if (array) {
          o.push(filtered);
        } else {
          o[key] = filtered;
        }
      }
    }
  });

  if (array) {
    return o.length ? o : undefined;
  }

  if (!nul) {
    return Object.keys(o).length ? o : undefined;
  }

  return o;
}

/**
 * @function deepFind
 * @private
 * @param {*} object - Object to iterate over.
 * @param {DeepIterationCallback} callback - Callback that is called on every element.
 * If returns truthy the iteration stops and if not it continues.
 * @param {Number} n - Depth of iteration.
 * @param {Tree} tree - Tree of { key, value } objects of iteration.
 * @returns {Tree|null} - If found the whole tree is returned and if not it's null what's returned.
 */
function _deepFind(object, callback, n, tree) {
  var end = n === 1;

  return iterate(object, function (value, key, object) {
    var newTree = [{ key: key, value: value }].concat(tree);

    if (end || isPrimitive(value)) {
      if (callback(value, key, object, newTree)) {
        return newTree;
      }

      return;
    }

    var result = _deepFind(value, callback, n - 1, newTree);

    if (result) {
      return result;
    }
  }) || null;
}

/**
 * @function deepForEach
 * @private
 * @param {*} object - Object to iterate over.
 * @param {DeepIterationCallback} callback - Callback that is called on every element.
 * @param {Number} n - Depth of iteration.
 * @param {Tree} tree - Tree of { key, value } objects of iteration.
 * @returns {void}
 */
function _deepForEach(object, callback, n, tree) {
  var end = n === 1;

  iterate(object, function (value, key, object) {
    var newTree = [{ key: key, value: value }].concat(tree);

    if (end || isPrimitive(value)) {
      callback(value, key, object, newTree);
    } else {
      _deepForEach(value, callback, n - 1, newTree);
    }
  });
}

/**
 * @function deepForEachEntry
 * @private
 * @param {*} object - Object to iterate over.
 * @param {DeepIterationCallback} callback - Callback that is called on every element.
 * @param {Number} n - Depth of iteration.
 * @param {Tree} tree - Tree of { key, value } objects of iteration.
 * @returns {void}
 */
function _deepForEachEntry(object, callback, n, tree) {
  var end = n === 1;

  iterate(object, function (value, key, object) {
    var newTree = [{ key: key, value: value }].concat(tree);

    callback(value, key, object, newTree);

    if (!end && !isPrimitive(value)) {
      _deepForEachEntry(value, callback, n - 1, newTree);
    }
  });
}

/**
 * @function deepFreeze
 * @private
 * @param {*} object - Object to freeze.
 * @returns {void}
 */
function _deepFreeze(object) {
  Object.freeze(object);
  iterate(object, _deepFreeze);
}

/**
 * @function deepMap
 * @private
 * @param {*} object - Object to iterate over.
 * @param {DeepIterationCallback} callback - Callback that is called on every element.
 * Returned value is used to create to new object.
 * @param {Number} n - Depth of iteration.
 * @param {Tree} tree - Tree of { key, value } objects of iteration.
 * @returns {*} New object.
 */
function _deepMap(object, callback, n, tree) {
  var o = isArrayLike(object) ? [] : isNil(object) ? object : {};
  var end = n === 1;

  iterate(object, function (value, key, object) {
    var newTree = [{ key: key, value: value }].concat(tree);

    o[key] = end || isPrimitive(value) ? callback(value, key, object, newTree) : _deepMap(value, callback, n - 1, newTree);
  });

  return o;
}

/**
 * @function deepReduce
 * @private
 * @param {*} object - Object to iterate over.
 * @param {DeepReduceCallback} callback - Callback that is called on every element.
 * Returned value is used to create to new object.
 * @param {Number} n - Depth of iteration.
 * @param {Boolean} start - If callback was called already or not.
 * @param {{ IV: * }|undefined} IV - If callback was called already or not.
 * @param {Tree} tree - Tree of { key, value } objects of iteration.
 * @returns {{ IV: * }} Transformed IV.
 */
function _deepReduce(object, callback, n, start, IV, tree) {
  var end = n === 1;

  iterate(object, function (value, key, object) {
    if (!IV && (end || isPrimitive(value)) && !start) {
      IV = { IV: value };
      start = true;

      return;
    }

    var newTree = [{ key: key, value: value }].concat(tree);

    IV = end || isPrimitive(value) ? { IV: callback(IV.IV, value, key, object, newTree) } : _deepReduce(value, callback, n - 1, start, IV, newTree);
  });

  return IV;
}

/**
 * @function deepSome
 * @private
 * @param {*} object - Object to iterate over.
 * @param {DeepIterationCallback} callback - Callback that is called on every element.
 * If returns truthy the iteration stops and if not it continues.
 * @param {Number} n - Depth of iteration.
 * @param {Tree} tree - Tree of { key, value } objects of iteration.
 * @returns {Boolean} - If some of the callback calls returned truthy value.
 */
function _deepSome(object, callback, n, tree) {
  var end = n === 1;

  return iterate(object, function (value, key, object) {
    var newTree = [{ key: key, value: value }].concat(tree);

    if (end || isPrimitive(value) ? callback(value, key, object, newTree) : _deepSome(value, callback, n - 1, newTree)) {
      return true;
    }
  }) || false;
}

constructors[0].push({
  check: function check() {
    return true;
  },
  cls: Super
});

/**
 * @module Promise
 * @private
 * @mixin
 * @description Exports Promise class.
 */

/**
 * @callback onFulfilledOrRejected
 * @public
 * @param {*} value - Promise value.
 * @param {Boolean} success - If the previous promise is fulfilled it's true and false if rejected.
 */

/**
 * @callback onRejected
 * @public
 * @param {Error|*} err - Promise error.
 */

/**
 * @callback onFulfilled
 * @public
 * @param {*} value - Promise value.
 */

var secret = {};
var iterator = _Symbol.iterator;

/**
 * @class Promise
 * @public
 * @param {Function} executor - Function that takes two arguments: resolve and reject functions.
 * Call the resolve function when you need to fulfill the promise and call the reject one
 * when you need to reject it.
 * @returns {Promise} Instance of Promise.
 * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise
 * @description Class with almost identical API to
 * [ES6 Promise]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise}.
 * There is a couple differences: set Promise.onError to a function with which you want to
 * subscribe to a promise error and set Promise.onUnhandledRejection to a function with which
 * you want to subscribe to an unhandled error
 * (defaults to console.error.bind(console, '%s %o', 'Uncaught (in promise)')).
 */

var Promise$1 = function () {
  function Promise(executor) {
    classCallCheck(this, Promise);

    if (!isFunction(executor)) {
      throw new TypeError('Promise resolver ' + {}.toString.call(executor) + ' is not a function');
    }

    var hiddenStatus = void 0;
    var hiddenValue = void 0;

    var onFulfill = [];
    var onReject = [];
    var realPromise = this;
    var hiddenPromise = {
      handled: false,
      get status() {
        return hiddenStatus;
      },
      set status(value) {
        hiddenStatus = value;
        realPromise.status = value;
      },
      get value() {
        return hiddenValue;
      },
      set value(val) {
        hiddenValue = val;
        realPromise.value = val;
      }
    };

    hiddenPromise.status = 'pending';
    hiddenPromise.value = undefined;

    /**
     * @typedef {Object} hiddenPromise
     * @private
     * @property {Boolean|Object} handled - If the promise is handled or not.
     * @property {'pending'|'fulfilled'|'rejected'} status - Status of the promise.
     * @property {*} value - Value of the promise.
     */

    /**
     * @member {Function} hiddenPromise#handle
     * @private
     * @param {('reject'|'resolve')} event - Type of the event to handle.
     * @param {Function} handler - Handler itself.
     * @param {Function} resolve - Resolve function.
     * @param {Function} reject - Reject function.
     * @param {Object} secret - Secret.
     * @description Private method for handling promises.
     */

    /**
     * @member {hiddenPromise} Promise#$$
     * @protected
     */
    defineProperties(this.$$ = {}, {
      'get/set handled': {
        get: function get() {
          return hiddenPromise.handled;
        },
        set: function set(key) {
          if (key === secret) {
            hiddenPromise.handled = true;
          }
        }
      },
      handle: function handle(status, f, resolve, reject, key) {
        if (key === secret) {
          var proxy = isFunction(f) ? function (value) {
            try {
              resolve(f(value));
            } catch (err) {
              reject(err);
            }
          } : null;

          if (status === 'resolve') {
            onFulfill.push(proxy || function (value) {
              return resolve(value);
            });
          } else if (status === 'reject') {
            onReject.push(proxy || function (err) {
              return reject(err);
            });
          }
        }
      },
      'get status': function getStatus() {
        return hiddenPromise.status;
      },
      'get value': function getValue() {
        return hiddenPromise.value;
      }
    });

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }

    function reject(err) {
      if (hiddenPromise.status === 'pending') {
        (function () {
          hiddenPromise.status = 'rejected';
          hiddenPromise.value = err;

          for (var i = 0, length = onReject.length; i < length; i++) {
            hiddenPromise.handled = true;

            onReject[i](err);
          }

          var onUnhandledRejection = Promise.onUnhandledRejection;
          var onError = Promise.onError;


          if (isFunction(onError)) {
            onError(err);
          }

          setTimeout(function () {
            if (!hiddenPromise.handled && isFunction(onUnhandledRejection)) {
              onUnhandledRejection(err);
            }
          }, 1);
        })();
      }
    }

    function resolve(value) {
      if (hiddenPromise.status === 'pending') {
        if (value && isFunction(value.then)) {
          return value.then(function (value) {
            resolve(value);
          }, function (err) {
            reject(err);
          });
        }

        hiddenPromise.status = 'fulfilled';
        hiddenPromise.value = value;

        for (var i = 0, length = onFulfill.length; i < length; i++) {
          hiddenPromise.handled = true;

          onFulfill[i](value);
        }
      }
    }
  }

  /**
   * @method Promise.all
   * @param {(Array|Iterable).<Promise|*>} iterable - Iterable object (like array) of promises
   * or any values.
   * @returns {Promise} New instance of Promise.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
   */


  createClass(Promise, [{
    key: 'abort',
    value: function abort() {}

    /**
     * @method Promise#catch
     * @param {onRejected} onRejected - onRejected callback.
     * @returns {Promise} New instance of Promise.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch
     */

  }, {
    key: 'catch',
    value: function _catch(onRejected) {
      return this.then(null, onRejected);
    }

    /**
     * @method Promise#finally
     * @public
     * @param {onFulfilledOrRejected} onFulfilledOrRejected - onFulfilledOrRejected callback.
     * @returns {Promise}
     * @description Method for catching both fulfilled and rejected promises.
     *
     * @example
     * spinner.show();
     * fetchData()
     *   .then((data) => {
     *     // do something with data
     *   })
     *   .catch((err) => {
     *     // handle error somehow
     *   })
     *   .finally(() => {
     *     spinner.hide();
     *   });
     */

  }, {
    key: 'finally',
    value: function _finally(onFulfilledOrRejected) {
      var isFunc = isFunction(onFulfilledOrRejected);

      return this.then(function (value) {
        return Promise.resolve(isFunc ? onFulfilledOrRejected(value, true) : 0).then(function () {
          return value;
        });
      }, function (err) {
        return Promise.resolve(isFunc ? onFulfilledOrRejected(err, false) : 0).then(function () {
          return Promise.reject(err);
        });
      });
    }

    /**
     * @method Promise#then
     * @param {onFulfilled} [onFulfilled] - onFulfilled callback.
     * @param {onRejected} [onRejected] - onRejected callback.
     * @returns {Promise} New instance of Promise.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then
     */

  }, {
    key: 'then',
    value: function then(onFulfilled, onRejected) {
      var promise = this.$$;

      if (promise.status === 'pending') {
        return new Promise(function (resolve, reject) {
          promise.handle('reject', onRejected, resolve, reject, secret);
          promise.handle('resolve', onFulfilled, resolve, reject, secret);
        });
      }

      promise.handled = secret;

      var value = promise.value;


      var method = void 0;
      var handler = void 0;

      if (promise.status === 'fulfilled') {
        method = 'resolve';
        handler = onFulfilled;
      } else {
        method = 'reject';
        handler = onRejected;
      }

      if (!isFunction(handler)) {
        return Promise[method](value);
      }

      try {
        return Promise.resolve(handler(value));
      } catch (err) {
        return Promise.reject(err);
      }
    }
  }], [{
    key: 'all',
    value: function all(iterable) {
      var array = [];

      var toResolve = 0;

      if (iterable[iterator]) {
        iterable = iterable[iterator]();

        return new Promise(function (resolve, reject) {
          var next = void 0;
          var i = 0;

          var _loop = function _loop() {
            var promise = Promise.resolve(next.value);

            toResolve++;

            (function (i) {
              promise.then(function (value) {
                toResolve--;
                array[i] = value;

                setTimeout(function () {
                  if (next.done && !toResolve) {
                    resolve(array);
                  }
                }, 1);
              }, reject);
            })(i++);
          };

          while (!(next = iterable.next()).done) {
            _loop();
          }

          if (!i) {
            return Promise.resolve([]);
          }
        });
      }

      var length = iterable.length;

      if (!length) {
        return Promise.resolve([]);
      }

      toResolve = length;

      return new Promise(function (resolve, reject) {
        var _loop2 = function _loop2(i) {
          var promise = Promise.resolve(iterable[i]);

          promise.then(function (value) {
            toResolve--;
            array[i] = value;

            if (!toResolve) {
              resolve(array);
            }
          }, reject);
        };

        for (var i = 0; i < length; i++) {
          _loop2(i);
        }
      });
    }

    /**
     * @method Promise.race
     * @param {(Array|Iterable).<Promise|*>} iterable - Iterable object (like array) of promises
     * or any values.
     * @returns {Promise} New instance of Promise.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race
     */

  }, {
    key: 'race',
    value: function race(iterable) {
      if (iterable[iterator]) {
        iterable = iterable[iterator]();

        return new Promise(function (resolve, reject) {
          var next = void 0;

          while (!(next = iterable.next()).done) {
            next.value.then(resolve, reject);
          }
        });
      }

      return new Promise(function (resolve, reject) {
        for (var i = 0, length = iterable.length; i < length; i++) {
          iterable[i].then(resolve, reject);
        }
      });
    }

    /**
     * @method Promise.reject
     * @param {*} value - Value to reject.
     * @returns {Promise} New instance of Promise.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject
     */

  }, {
    key: 'reject',
    value: function reject(value) {
      return new Promise(function (resolve, reject) {
        reject(value);
      });
    }

    /**
     * @method Promise.resolve
     * @param {Promise|Thenable|*} value - Promise, thenable or any value to resolve.
     * @returns {Promise} New instance of Promise.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve
     */

  }, {
    key: 'resolve',
    value: function resolve(value) {
      if (value && isFunction(value.then)) {
        return value;
      }

      return new Promise(function (resolve) {
        resolve(value);
      });
    }
  }]);
  return Promise;
}();

Promise$1.onError = null;
Promise$1.onUnhandledRejection = console.error.bind(console, '%s %o', 'Uncaught (in promise)');


defineProperties(Promise$1.prototype, defineProperty({}, _Symbol.toStringTag, 'Promise'));

/**
 * @module Func
 * @private
 * @mixin
 * @description Exports Func class.
 */

/**
 * @callback BeforeMiddleware
 * @param {Array} args - Previous arguments.
 * @param {Func} func - This function.
 * @returns {Array} - New arguments.
 */

/**
 * @callback AfterMiddleware
 * @param {*} returnValue - Previous return value.
 * @param {Func} func - This function.
 * @returns {*} - New return value.
 */

/**
 * @class Func
 * @extends Super
 * @public
 * @param {Function} [func = function () {}] - Function to wrap.
 * @returns {Func} Instance of Func.
 * @description A wrap of a function.
 *
 * @example
 * const func = new Func(Math.max);
 *
 * func(1, 4, -2, 5); // 5
 */

var Func = function (_Super) {
  inherits(Func, _Super);

  function Func() {
    var _ret;

    var func = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
    classCallCheck(this, Func);

    var _this = possibleConstructorReturn(this, (Func.__proto__ || Object.getPrototypeOf(Func)).call(this));

    function proxy() {
      var _this2 = this,
          _arguments = arguments;

      if (++proxy.$$.called < proxy.$$.canBeCalled) {
        var _ret2 = function () {
          var _proxy$$$ = proxy.$$;
          var before = _proxy$$$.before;
          var after = _proxy$$$.after;
          var sync = _proxy$$$.sync;
          var contextLocked = _proxy$$$.contextLocked;
          var _proxy$$$2 = proxy.$$;
          var context = _proxy$$$2.context;
          var args = _proxy$$$2.args;

          var ret = void 0;

          context = contextLocked ? context : context || _this2;
          args = args.concat(toArray$1(_arguments));

          if (sync) {
            iterate(before, function (middleware) {
              args = middleware.call(context, toArray$1(args), proxy);
            });

            ret = func.apply(context, toArray$1(args));

            iterate(after, function (middleware) {
              ret = middleware.call(context, ret, proxy);
            });

            return {
              v: ret
            };
          }

          var promise = Promise$1.resolve(args);

          iterate(before, function (middleware) {
            promise = promise.then(function (args) {
              return middleware.call(context, toArray$1(args), proxy);
            });
          });

          promise = promise.then(function (args) {
            return func.apply(context, toArray$1(args));
          });

          iterate(after, function (middleware) {
            promise = promise.then(function (ret) {
              return middleware.call(context, ret, proxy);
            });
          });

          return {
            v: promise
          };
        }();

        if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
      }
    }

    /**
     * @member {Object} Func#$$
     * @type {Object}
     * @protected
     * @property {Array} after - After middleware array.
     * @property {Array} args - Locked and bound arguments.
     * @property {Array} argsLocked - Locked arguments.
     * @property {Array} before - Before middleware array.
     * @property {Number} called - How many times the function was called.
     * @property {Number} canBeCalled - How many times the function can be actually called.
     * @property {*} context - Locked or bound context.
     * @property {Boolean} contextLocked - Is context locked or not.
     * @property {Boolean} sync - Is function synchronous or not.
     * @description Config parameters.
     */
    Object.defineProperty(proxy, '$$', {
      value: {
        after: [],
        args: [],
        argsLocked: [],
        before: [],
        called: 0,
        canBeCalled: Infinity,
        context: null,
        contextLocked: false,
        sync: true
      }
    });

    /**
     * @member {Function} Func#$
     * @type {Function}
     * @public
     * @description Original function.
     */
    Object.defineProperty(proxy, '$', { value: func });
    Object.setPrototypeOf(proxy, Func.prototype);

    return _ret = proxy, possibleConstructorReturn(_this, _ret);
  }

  /**
   * @method Func#after
   * @public
   * @param {AfterMiddleware} middleware - After middleware.
   * @param {Boolean|*} [afterAll = true] - Boolean parameter where to put middleware.
   * Truthy parameter stands for "to the end" and falsey for "to the beginning".
   * @returns {Func} Returns this.
   * @description Adds after middleware.
   *
   * @example
   * const func = new Func((a) => a + 1)
   *   .after((result) => result * result);
   *
   * func(4);  // 25
   * func(-4); // 9
   */


  createClass(Func, [{
    key: 'after',
    value: function after(middleware) {
      var afterAll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      validate$1([middleware], ['function'], 'Func#after');

      var after = this.$$.after;


      if (afterAll) {
        after.push(middleware);
      } else {
        after.unshift(middleware);
      }

      return this;
    }

    /**
     * @method Func#apply
     * @public
     * @param {*} [context] - Context to call with.
     * @param {(Array|Arguments)} [args] - Arguments to call with.
     * @returns {*} Return of function call.
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Function/apply
     * @description Synonym for
     * [Function#apply]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Function/apply}.
     */

  }, {
    key: 'apply',
    value: function apply(context, args) {
      return function () {}.apply.apply(this, arguments);
    }

    /**
     * @method Func#async
     * @public
     * @param {Boolean|*} [condition] - If the function should be synchronous or not.
     * @returns {Func} Returns this.
     * @description If the function should be synchronous or not.
     *
     * @example
     * const func = new Func((a) => a + 1).async();
     *
     * func(4).then((result) => {
     *   console.log(result); // 5
     * });
     */

  }, {
    key: 'async',
    value: function async() {
      var condition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      this.$$.sync = !condition;

      return this;
    }

    /**
     * @method Func#before
     * @public
     * @param {BeforeMiddleware} middleware - Before middleware.
     * @param {Boolean|*} [beforeAll = true] - Boolean parameter where to put middleware.
     * Truthy parameter stands for "to the beginning" and falsey for "to the end".
     * @returns {Func} Returns this.
     * @description Adds before middleware.
     *
     * @example
     * const func = new Func((a) => a + 1)
     *   .before(([arg]) => [arg * arg]);
     *
     * func(4); // 17
     * func(3); // 10
     */

  }, {
    key: 'before',
    value: function before(middleware) {
      var beforeAll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      validate$1([middleware], ['function'], 'Func#before');

      var before = this.$$.before;


      if (beforeAll) {
        before.unshift(middleware);
      } else {
        before.push(middleware);
      }

      return this;
    }

    /**
     * @method Func#bind
     * @public
     * @param {*} context - Context to bind.
     * @param {...(Array|Arguments|*)} args - Arguments to bind.
     * @returns {Func} Returns this.
     * @description Composition of {@link Func#bindContext} and {@link Func#bindArgs}.
     *
     * @example
     * const func = new Func(function (a, b) {
     *   return this.a + a + b;
     * }).bind({ a: 2 }, 1);
     *
     * func(1); // 4
     * func(3); // 6
     */

  }, {
    key: 'bind',
    value: function bind(context) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return this.bindContext(context).bindArgs(args);
    }

    /**
     * @method Func#bindArgs
     * @public
     * @param {(Array|Arguments)} args - Arguments to bind.
     * @returns {Func} Returns this.
     * @description Binds arguments in addition to already locked and bound ones.
     *
     * @example
     * const func = new Func((...args) => {
     *   let sum = 0;
     *
     *   for (let i = 0; i < args.length; i++) {
     *     sum += args[i];
     *   }
     *
     *   return sum;
     * });
     *
     * func(1, 2, 3); // 6
     *
     * func.bindArgs([4]);
     *
     * func(1, 2, 3); // 10
     *
     * func.bindArgs([5]);
     *
     * func(1, 2, 3); // 15
     */

  }, {
    key: 'bindArgs',
    value: function bindArgs(args) {
      var func = this.$$;

      func.args = func.args.concat(toArray$1(args));

      return this;
    }

    /**
     * @method Func#bindContext
     * @public
     * @param {*} context - Context to bind.
     * @returns {Func} Returns this.
     * @description Bind new context if it's not already locked.
     *
     * @example
     * const func = new Func(function () {
     *   return this.a;
     * }).bindContext({ a: 1 });
     *
     * func(); // 1
     *
     * func.bindContext({ a: 2 });
     *
     * func(); // 2
     */

  }, {
    key: 'bindContext',
    value: function bindContext(context) {
      var func = this.$$;

      if (!func.contextLocked) {
        func.context = context;
      }

      return this;
    }

    /**
     * @method Func#call
     * @public
     * @param {*} [context] - Context to call with.
     * @param {...*} [args] - Arguments to call with.
     * @returns {*} Return of function call.
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Function/call
     * @description Synonym for
     * [Function#call]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Function/call}.
     */

  }, {
    key: 'call',
    value: function call(context) {
      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      return function () {}.call.apply(this, arguments);
    }

    /**
     * @member {Number} Func#called
     * @public
     * @readonly
     * @description Returns how many times the function was called.
     *
     * @example
     * const func = new Func((a) => a + 1);
     *
     * func();
     * func();
     *
     * func.called // 2
     */

  }, {
    key: 'canBeCalled',


    /**
     * @method Func#canBeCalled
     * @public
     * @param {Number} times - Number of maximum times the function is called (middlewares are also taken for a count).
     * @returns {Func} Returns this.
     * @description Method for limiting call times of function.
     *
     * @example
     * const func = new Func((a) => a + 1)
     *   .canBeCalled(1);
     *
     * func(1); // 2
     * func(1); // undefined
     */
    value: function canBeCalled(times) {
      this.$$.canBeCalled = times;

      return this;
    }

    /**
     * @method Func#limitArgsTo
     * @public
     * @param {Number} number - Number of arguments to limit to.
     * @returns {Func} Returns this.
     * @description Built-in before middleware for limiting number of arguments
     * that is put to the end of before middlewares.
     *
     * @example
     * const func = new Func((a, b) => [a, b]);
     *
     * func(1, 2); // [1, 2]
     *
     * func.limitArgsTo(1);
     *
     * func(1, 2); // [1, undefined]
     */

  }, {
    key: 'limitArgsTo',
    value: function limitArgsTo(number) {
      return this.before(function (args) {
        return args.slice(0, number);
      }, false);
    }

    /**
     * @method Func#lock
     * @public
     * @param {*} context - Context to lock.
     * @param {(Array|Arguments|*)} args - Arguments to lock.
     * @returns {Func} Returns this.
     * @description Composition of {@link Func#lockContext} and {@link Func#lockArgs}.
     *
     * @example
     * const func = new Func(function (a, b) {
     *   return this.a + a + b;
     * }).lock({ a: 2 }, [1]);
     *
     * func(1); // 4
     * func(3); // 6
     */

  }, {
    key: 'lock',
    value: function lock(context, args) {
      return this.lockContext(context).lockArgs(args);
    }

    /**
     * @method Func#lockArgs
     * @public
     * @param {(Array|Arguments|*)} args - Arguments to lock.
     * @returns {Func} Returns this.
     * @description Erases bound arguments and adds new arguments to already locked ones.
     *
     * @example
     * const func = new Func((...args) => {
     *   let sum = 0;
     *
     *   for (let i = 0; i < args.length; i++) {
     *     sum += args[i];
     *   }
     *
     *   return sum;
     * });
     *
     * func(1, 2, 3); // 6
     *
     * func.lockArgs([4]);
     *
     * func(1, 2, 3); // 10
     *
     * func.bindArgs([6, 7]);
     * func.lockArgs([5]);
     *
     * func(1, 2, 3); // 15
     */

  }, {
    key: 'lockArgs',
    value: function lockArgs(args) {
      var func = this.$$;

      func.args = func.argsLocked = func.argsLocked.concat(toArray$1(args));

      return this;
    }

    /**
     * @method Func#lockContext
     * @public
     * @param {*} context - Context to lock.
     * @returns {Func} Returns this.
     * @description Locks context if it's not already locked.
     *
     * @example
     * const func = new Func(function () {
     *   return this.a;
     * }).lockContext({ a: 1 });
     *
     * func(); // 1
     *
     * func.lockContext({ a: 2 });
     *
     * func(); // 1
     */

  }, {
    key: 'lockContext',
    value: function lockContext(context) {
      var func = this.$$;

      if (!func.contextLocked) {
        func.context = context;
        func.contextLocked = true;
      }

      return this;
    }

    /**
     * @method Func#timing
     * @public
     * @param {String} mark - Argument that is passed to console.time() and console.timeEnd().
     * By default name of the original function, or if it's not present, 'anonymous' is used.
     * @returns {Func} Returns this.
     * @description Built-in before and after middlewares for noting calling time.
     * In case of asynchronous functions it notes time between calling function and resolving or rejecting the result.
     *
     * @example
     * const func = new Func((a) => a + 1)
     *   .timing('plus 1');
     *
     * func(2); // plus 1: 0.010ms
     *
     * const async = new Func(() => new Promise(() => {
     *     setTimeout(resolve, 1000);
     *   }))
     *   .async()
     *   .timing();
     *
     * async();
     * // After 1 second...
     * // anonymous: 1000.010ms
     */

  }, {
    key: 'timing',
    value: function timing(mark) {
      mark = arguments.length ? String(mark) : this.$.name || 'anonymous';

      this.before(function (args) {
        console.time(mark);

        return args;
      }, false);

      this.after(function (ret) {
        console.timeEnd(mark);

        return ret;
      }, false);

      return this;
    }
  }, {
    key: 'toString',
    value: function toString() {
      return function () {}.toString.call(this.$);
    }

    /**
     * @method Func#unbind
     * @public
     * @returns {Func} Returns this.
     * @description Composition of {@link Func#unbindContext} and {@link Func#unbindArgs}.
     *
     * @example
     * const func = new Func(function (a) {
     *   return this.foo + ' & ' +  a;
     * }).bind({ foo: 2 }, 1);
     *
     * func(); // '2 & 1'
     *
     * func.unbind();
     *
     * func(); // 'undefined & undefined'
     */

  }, {
    key: 'unbind',
    value: function unbind() {
      return this.unbindContext().unbindArgs();
    }

    /**
     * @method Func#unbindArgs
     * @public
     * @returns {Func} Returns this.
     * @description Erases all bound arguments.
     *
     * @example
     * const func = new Func((...args) => {
     *   let sum = 0;
     *
     *   for (let i = 0; i < args.length; i++) {
     *     sum += args[i];
     *   }
     *
     *   return sum;
     * }).bindArgs([4, 5]);
     *
     * func(1, 2, 3); // 15
     *
     * func.unbindArgs();
     *
     * func(1, 2, 3); // 6
     */

  }, {
    key: 'unbindArgs',
    value: function unbindArgs() {
      var func = this.$$;

      func.args = func.argsLocked;

      return this;
    }

    /**
     * @method Func#unbindContext
     * @public
     * @returns {Func} Returns this.
     * @description Erases context if it's not locked.
     *
     * @example
     * const func = new Func(function () {
     *   return this.foo;
     * }).bindContext({ foo: 1 });
     *
     * func(); // 1
     *
     * func.unbindArgs();
     *
     * func(); // undefined
     */

  }, {
    key: 'unbindContext',
    value: function unbindContext() {
      var func = this.$$;

      if (!func.contextLocked) {
        func.context = null;
      }

      return this;
    }
  }, {
    key: 'called',
    get: function get() {
      return this.$$.called;
    }
  }]);
  return Func;
}(Super);

defineProperties(Func.prototype, defineProperty({}, _Symbol.toStringTag, 'Func'));

constructors[1].push({
  check: isFunction,
  cls: Func
});

/**
 * @function method
 * @public
 * @param {String} method - Method to call.
 * @param {(Array|Arguments|*)} args - Arguments to call the method with.
 * @returns {Function} Function that calls stated method with given arguments.
 * @description Function that returns the function
 * that calls stated method of its first argument with given arguments.
 *
 * @example
 * [1.2345, 2.789, 3.14].map(method('toFixed', [2])); // ['1.23', '2.79', '3.14']
 */
function method(method) {
  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  return function (x) {
    return x[method].apply(x, toArray$1(args));
  };
}

/**
 * @function noop
 * @public
 * @returns {void}
 * @description Empty function.
 */
function noop() {}

/**
 * @function prop
 * @public
 * @param {String} prop - Property to return.
 * @returns {Function} Function that returns given property of its first argument.
 * @description Function that return the function that returns given property of its first argument.
 *
 * @example
 * ['foo', '12', '7890'].map(prop('length')); // [3, 2, 4]
 */
function prop$1(prop) {
  return function (_ref) {
    var value = _ref[prop];
    return value;
  };
}

/**
 * @function self
 * @public
 * @returns {*} First argument itself.
 * @description Function that returns the first argument.
 *
 * @example
 * [1, 2].map(self);                     // [1, 2]
 * [1, 3, NaN, 0, 7, null].filter(self); // [1, 3, 7]
 */
function self$1() {
  return arguments[0];
}

/**
 * @module Num
 * @private
 * @mixin
 * @description Exports Num class.
 */

var toRadian = Math.PI / 180;
var toDegree = 180 / Math.PI;
var ln2 = Math.LN2;
var ln10 = Math.LN10;

/**
 * @class Num
 * @extends Super
 * @public
 * @param {Number} [number = 0] - A number to wrap.
 * @returns {Num} Instance of Num.
 * @description Wrap of a number.
 *
 * @example
 * const num = new Num(1);
 */

var Num = function (_Super) {
  inherits(Num, _Super);

  function Num() {
    var number = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    classCallCheck(this, Num);
    return possibleConstructorReturn(this, (Num.__proto__ || Object.getPrototypeOf(Num)).call(this, +number));

    /**
     * @member Num#$
     * @type {Number}
     * @public
     * @description Original number.
     */
  }

  /**
   * @member Num#abs
   * @type {Number}
   * @public
   * @readonly
   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/abs
   * @description Synonym for
   * [Math.abs]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/abs}.
   *
   * @example
   * new Num(1).abs;  // 1
   * new Num(-1).abs; // 1
   */


  createClass(Num, [{
    key: 'acos',


    /**
     * @method Num#acos
     * @public
     * @param {Boolean|*} [toDegrees = false] If it is truthy the return value is transformed into degrees.
     * @returns {Number} Arccosine of the number.
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/acos
     * @description Synonym for
     * [Math.acos]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/acos}.
     */
    value: function acos(toDegrees) {
      return (toDegrees ? toDegree : 1) * Math.acos(this.$);
    }

    /**
     * @member Num#acosh
     * @type {Number}
     * @public
     * @readonly
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/acosh
     * @description Synonym for
     * [Math.acosh]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/acosh}.
     */

  }, {
    key: 'asin',


    /**
     * @method Num#asin
     * @public
     * @param {Boolean|*} [toDegrees = false] If it is truthy the return value is transformed into degrees.
     * @returns {Number} Arcsine of the number.
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/asin
     * @description Synonym for
     * [Math.asin]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/asin}.
     */
    value: function asin(toDegrees) {
      return (toDegrees ? toDegree : 1) * Math.asin(this.$);
    }

    /**
     * @method Num#atan
     * @public
     * @param {Boolean|*} [toDegrees = false] If it is truthy the return value is transformed into degrees.
     * @returns {Number} Arcsine of the number.
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/atan
     * @description Synonym for
     * [Math.atan]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/atan}.
     */

  }, {
    key: 'atan',
    value: function atan(toDegrees) {
      return (toDegrees ? toDegree : 1) * Math.atan(this.$);
    }

    /**
     * @member Num#atanh
     * @type {Number}
     * @public
     * @readonly
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/atanh
     * @description Synonym for
     * [Math.atanh]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/atanh}.
     */

  }, {
    key: 'cos',


    /**
     * @method Num#cos
     * @public
     * @param {Boolean|*} [asDegrees = false] If it is truthy the number is treated as a degree value.
     * @returns {Number} Cosine of the number.
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/cos
     * @description Synonym for
     * [Math.cos]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/cos}.
     */
    value: function cos(asDegrees) {
      return Math.cos((asDegrees ? toRadian : 1) * this.$);
    }

    /**
     * @member Num#cosh
     * @type {Number}
     * @public
     * @readonly
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/cosh
     * @description Synonym for
     * [Math.cosh]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/cosh}.
     */

  }, {
    key: 'interval',


    /**
     * @method Num#interval
     * @public
     * @param {Function} func - Function that is called every <number> milliseconds.
     * @param {Array} [args] - Arguments passed to the function.
     * @returns {Function} Function that aborts the interval. The context of the function (if it's not already bound)
     * is the object with the abort method.
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/setInterval
     * @description Analogue of the
     * [setInterval]{@link https://developer.mozilla.org/en/docs/Web/API/WindowTimers/setInterval}.
     *
     * @example
     * const times = 0;
     * new Num(50).interval(function () {
     *   if (++times === 10) {
     *     this.abort();
     *   }
     * });
     */
    value: function interval(func) {
      var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      validate$1([func], ['function'], 'Num#interval');

      func = new Func(func).bindContext({ abort: abort });
      args = toArray$1(args);

      var number = this.$;

      var aborted = void 0;
      var timeout = setTimeout(function interval() {
        if (!aborted) {
          func.apply(null, args);

          if (!aborted) {
            timeout = setTimeout(interval, number);
          }
        }
      }, 0);

      return abort;

      function abort() {
        aborted = true;

        return clearTimeout(timeout);
      }
    }

    /**
     * @member Num#ln
     * @type {Number}
     * @public
     * @readonly
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/log
     * @description Synonym for
     * [Math.log]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/log}.
     */

  }, {
    key: 'log',


    /**
     * @method Num#log
     * @public
     * @param {Number} number - Number to get logarithm of.
     * @returns {Number} Logarithm of the argument number to the number base.
     * @description Returns the logarithm of the argument number to the number base.
     *
     * @example
     * new Num(2).log(16);  // 4
     * new Num(3).log(243); // 5
     */
    value: function log(number) {
      return Math.log(number) / Math.log(this.$);
    }

    /**
     * @member Num#log2
     * @type {Number}
     * @public
     * @readonly
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/log2
     * @description Synonym for
     * [Math.log2]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/log2}.
     */

  }, {
    key: 'pow',


    /**
     * @method Num#pow
     * @public
     * @param {Number} power - Power the number should be raised to.
     * @returns {Number} The number to the <power> power.
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/pow
     * @description Synonym for
     * [Math.pow]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/pow}.
     *
     * @example
     * new Num(4).pow(.5); // 2
     * new Num(3).pow(2);  // 9
     */
    value: function pow(power) {
      return Math.pow(this.$, power);
    }

    /**
     * @method Num#root
     * @public
     * @param {Number} power - Power the number should be raised to.
     * @returns {Number} The <power> root of the number.
     * @description Synonym for number.pow(1 / power);
     *
     * @example
     * new Num(4).root(2);   // 0.5
     * new Num(243).root(5); // 3
     */

  }, {
    key: 'root',
    value: function root(power) {
      return Math.pow(this.$, 1 / power);
    }

    /**
     * @member Num#round
     * @type {Number}
     * @public
     * @readonly
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/round
     * @description Synonym for
     * [Math.round]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/round}.
     *
     * @example
     * new Num(1.1).floor;  // 1
     * new Num(-1.1).floor; // -1
     * new Num(1.5).floor;  // 2
     */

  }, {
    key: 'sin',


    /**
     * @method Num#sin
     * @public
     * @param {Boolean|*} [asDegrees = false] If it is truthy the number is treated as a degree value.
     * @returns {Number} Sine of the number.
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/sin
     * @description Synonym for
     * [Math.sin]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/sin}.
     */
    value: function sin(asDegrees) {
      return Math.sin((asDegrees ? toRadian : 1) * this.$);
    }

    /**
     * @member Num#sinh
     * @type {Number}
     * @public
     * @readonly
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/sinh
     * @description Synonym for
     * [Math.sinh]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/sinh}.
     */

  }, {
    key: 'tan',


    /**
     * @method Num#tan
     * @public
     * @param {Boolean|*} [asDegrees = false] If it is truthy the number is treated as a degree value.
     * @returns {Number} Tangent of the number.
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/tan
     * @description Synonym for
     * [Math.tan]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/tan}.
     */
    value: function tan(asDegrees) {
      return Math.tan((asDegrees ? toRadian : 1) * this.$);
    }

    /**
     * @member Num#tanh
     * @type {Number}
     * @public
     * @readonly
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/tanh
     * @description Synonym for
     * [Math.tanh]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/tanh}.
     */

  }, {
    key: 'timeout',


    /**
     * @method Num#timeout
     * @public
     * @param {*} [value] - Value to be resolved by the promise.
     * @returns {Promise} Promise that could be aborted.
     * @see https://developer.mozilla.org/en/docs/Web/API/WindowTimers/setTimeout
     * @description Promise-based analogue of
     * [setTimeout]{@link https://developer.mozilla.org/en/docs/Web/API/WindowTimers/setTimeout}.
     *
     * @example
     * new Num(50).timeout('resolved').then((value) => {
     *   console.log(value); // 'resolved'
     * });
     *
     * const promise = new Num(50).timeout();
     * promise.abort();
     */
    value: function timeout(value) {
      var _this2 = this;

      var timeout = void 0;
      var reject = void 0;

      var promise = new Promise$1(function (resolve, rej) {
        reject = rej;
        timeout = setTimeout(resolve, _this2.$, value);
      });

      promise.abort = function abort() {
        clearTimeout(timeout);

        reject(new Error('Timeout was aborted'));

        return this;
      };

      return promise;
    }

    /**
     * @method Num#toBase
     * @public
     * @param {Number} [base = 10] - Base that the number should inverted to.
     * @returns {String} A string representation of the number in <base> base.
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Number/toString
     * @description Synonym for
     * [Number#toString]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Number/toString}.
     *
     * @example
     * new Num(4).toBase(2); // 100
     * new Num(3).toBase();  // 3
     */

  }, {
    key: 'toBase',
    value: function toBase() {
      var base = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;

      return this.$.toString(base);
    }

    /**
     * @method Num#toExponential
     * @public
     * @param {Number} [fractionDigits] - See the link.
     * @returns {String} A string representation of the number in the exponential format.
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Number/toExponential
     * @description Synonym for
     * [Number#toExponential]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Number/toExponential}.
     */

  }, {
    key: 'toExponential',
    value: function toExponential(fractionDigits) {
      return this.$.toExponential(fractionDigits);
    }

    /**
     * @method Num#toFixed
     * @public
     * @param {Number} [digits = 0] - See the link.
     * @returns {String} Fixed-point formatted number.
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed
     * @description Synonym for
     * [Number#toFixed]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed}.
     */

  }, {
    key: 'toFixed',
    value: function toFixed(digits) {
      return this.$.toFixed(digits);
    }

    /**
     * @method Num#toPrecision
     * @public
     * @param {Number} [precision] - See the link.
     * @returns {String} A string representation of the number to the specified precision.
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Number/toPrecision
     * @description Synonym for
     * [Number#toPrecision]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Number/toPrecision}.
     */

  }, {
    key: 'toPrecision',
    value: function toPrecision(precision) {
      return this.$.toPrecision(precision);
    }
  }, {
    key: 'valueOf',
    value: function valueOf() {
      return Number(this.$);
    }
  }, {
    key: 'abs',
    get: function get() {
      return Math.abs(this.$);
    }
  }, {
    key: 'acosh',
    get: function get() {
      var number = this.$;

      return Math.log(number + Math.sqrt(number * number - 1));
    }

    /**
     * @member Num#asinh
     * @type {Number}
     * @public
     * @readonly
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/asinh
     * @description Synonym for
     * [Math.asinh]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/asinh}.
     */

  }, {
    key: 'asinh',
    get: function get() {
      var number = this.$;

      return Math.log(number + Math.sqrt(number * number + 1));
    }
  }, {
    key: 'atanh',
    get: function get() {
      var number = this.$;

      return Math.log((1 + number) / (1 - number)) / 2;
    }

    /**
     * @member Num#cbrt
     * @type {Number}
     * @public
     * @readonly
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/cbrt
     * @description Synonym for
     * [Math.cbrt]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/cbrt}.
     */

  }, {
    key: 'cbrt',
    get: function get() {
      var cbrt = Math.pow(Math.abs(this.$), 1 / 3);

      return this.$ > 0 ? cbrt : -cbrt;
    }

    /**
     * @member Num#ceil
     * @type {Number}
     * @public
     * @readonly
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil
     * @description Synonym for
     * [Math.ceil]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil}.
     *
     * @example
     * new Num(1.1).ceil;  // 2
     * new Num(-1.1).ceil; // -1
     */

  }, {
    key: 'ceil',
    get: function get() {
      return Math.ceil(this.$);
    }
  }, {
    key: 'cosh',
    get: function get() {
      var exp = this.exp;

      return (exp + 1 / exp) / 2;
    }

    /**
     * @member Num#cube
     * @type {Number}
     * @public
     * @readonly
     * @description Cube of the number.
     *
     * @example
     * new Num(2).cube;  // 8
     * new Num(-3).ceil; // -27
     */

  }, {
    key: 'cube',
    get: function get() {
      return this.$ * this.$ * this.$;
    }

    /**
     * @member Num#exp
     * @type {Number}
     * @public
     * @readonly
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/exp
     * @description Synonym for
     * [Math.exp]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/exp}.
     */

  }, {
    key: 'exp',
    get: function get() {
      return Math.exp(this.$);
    }

    /**
     * @member Num#floor
     * @type {Number}
     * @public
     * @readonly
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/floor
     * @description Synonym for
     * [Math.floor]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/floor}.
     *
     * @example
     * new Num(1.1).floor;  // 1
     * new Num(-1.1).floor; // -2
     */

  }, {
    key: 'floor',
    get: function get() {
      return Math.floor(this.$);
    }
  }, {
    key: 'ln',
    get: function get() {
      return Math.log(this.$);
    }
  }, {
    key: 'log2',
    get: function get() {
      return this.ln / ln2;
    }

    /**
     * @member Num#log10
     * @type {Number}
     * @public
     * @readonly
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/log10
     * @description Synonym for
     * [Math.log10]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/log10}.
     */

  }, {
    key: 'log10',
    get: function get() {
      return this.ln / ln10;
    }
  }, {
    key: 'round',
    get: function get() {
      return Math.round(this.$);
    }

    /**
     * @member Num#sign
     * @type {Number}
     * @public
     * @readonly
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/sign
     * @description Synonym for
     * [Math.sign]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/sign}.
     */

  }, {
    key: 'sign',
    get: function get() {
      var number = this.$;

      if (!number) {
        return number;
      }

      return number > 0 ? 1 : -1;
    }
  }, {
    key: 'sinh',
    get: function get() {
      var exp = this.exp;

      return (exp - 1 / exp) / 2;
    }

    /**
     * @member Num#sq
     * @type {Number}
     * @public
     * @readonly
     * @description The square of the number.
     *
     * @example
     * new Num(2).sq;  // 4
     * new Num(-3).sq; // 9
     */

  }, {
    key: 'sq',
    get: function get() {
      return this.$ * this.$;
    }

    /**
     * @member Num#sqrt
     * @type {Number}
     * @public
     * @readonly
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/sqrt
     * @description Synonym for
     * [Math.sqrt]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/sqrt}.
     */

  }, {
    key: 'sqrt',
    get: function get() {
      return Math.sqrt(this.$);
    }
  }, {
    key: 'tanh',
    get: function get() {
      var number = this.$;

      if (!isFinite(number)) {
        return this.sign;
      }

      var exp = Math.exp(2 * number);

      return (exp - 1) / (exp + 1);
    }
  }]);
  return Num;
}(Super);

defineProperties(Num.prototype, defineProperty({}, _Symbol.toStringTag, 'Num'));

constructors[1].push({
  check: isNumber,
  cls: Num
});

/**
 * @function rand
 * @public
 * @param {Number} [start = 0] - Start of the range.
 * @param {Number} [end = 1] - End of the range.
 * @returns {Number} Random number.
 * @description Returns a random number in the range specified by the arguments.
 *
 * @example
 * rand(1, 5); // 2.315
 * rand(1, 5); // 4.356763
 */
function rand() {
  var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  return start + (end - start) * Math.random();
}

/**
 * @function random
 * @public
 * @param {Integer} start - Start of the range.
 * @param {Integer} end - End of the range.
 * @returns {Number} Random integer.
 * @description Returns a random integer number in the range specified by the arguments.
 *
 * @example
 * random(1, 5); // 3
 * random(1, 5); // 1
 */
function random$1(start, end) {
  validate$1([start, end], ['intLike', 'intLike'], 'random');

  if (end <= start) {
    throw new Error('The second argument must be greater than the first!', 'random');
  }

  return Math.floor(rand(start, end + 1));
}

/**
 * @module Arr
 * @private
 * @mixin
 * @description Exports Arr class.
 */

/**
 * @typedef {Array|*} ArrayLike
 * @public
 * @description Array-like type.
 */

/**
 * @callback ArrayCallback
 * @public
 * @param {Number} i - Iteration index.
 */

/**
 * @callback IterateCallback
 * @public
 * @param {Number} i - Iteration index.
 */

/**
 * @callback CompareFunction
 * @public
 * @param {*} x - First value to be compared.
 * @param {*} y - Second value to be compared.
 */

/**
 * @class Arr
 * @extends Super
 * @public
 * @param {Array} [array = []] - An array to wrap.
 * @returns {Arr} Instance of Arr.
 * @description Wrap of an array.
 *
 * @example
 * new Arr([1, 2]);
 */

var Arr = function (_Super) {
  inherits(Arr, _Super);

  function Arr() {
    var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    classCallCheck(this, Arr);
    return possibleConstructorReturn(this, (Arr.__proto__ || Object.getPrototypeOf(Arr)).call(this, toArray$1(array instanceof Arr ? array.$ : array)));

    /**
     * @member Arr#$
     * @type {Array}
     * @public
     * @description Made array.
     */
  }

  /**
   * @method Arr#concat
   * @public
   * @param {...(Array|Arr|*)} values - Arrays or any other values to concat the array with.
   * @returns {Arr} New instance of Arr.
   * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/concat
   * @description Synonym for
   * [Array#concat]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/concat}.
   */


  createClass(Arr, [{
    key: 'concat',
    value: function concat() {
      for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
        values[_key] = arguments[_key];
      }

      var array = toArray$1(this.$, true);

      iterate(arguments, function (value) {
        value = new Super(value).$;

        if (isArrayLike(value) && !isString(value)) {
          iterate(value, function (value) {
            array.push(value);
          });

          return;
        }

        array.push(value);
      });

      return new this.constructor(array);
    }

    /**
     * @member Arr#first
     * @type {*}
     * @public
     * @readonly
     * @description Returns the first element of the array.
     *
     * @example
     * new Arr([1, 2, 3]).first; // 1
     * new Arr([]).first;        // undefined
     */

  }, {
    key: 'forEachReverse',


    /**
     * @method Super#forEachReverse
     * @public
     * @param {IterationCallback} callback - Called on each iteration.
     * @returns {Arr} Returns this.
     * @description Method for iterating over any object.
     *
     * @example
     * new Super({ a: 1, b: 2, c: 3 }).forEach((value, key, object) => {
     *   object[key] = value * value;
     * }).$; // { a: 1, b: { c: 4, d: 5 } }
     */
    value: function forEachReverse(callback) {
      validate$1([callback], ['function'], 'Arr#forEachReverse');

      var array = this.$;

      for (var i = array.length - 1; i >= 0; i--) {
        callback(array[i], i, array);
      }

      return this;
    }

    /**
     * @method Arr#includes
     * @public
     * @param {*} value - Value to search.
     * @returns {Boolean} If the array includes the value.
     * @description Synonym for array.indexOfStrict(value) !== -1.
     *
     * @example
     * new Arr([1, 2, 3]).includes(1);       // true
     * new Arr([1, 2, 3]).includes('1');     // false
     * new Arr([1, 2, 3]).includes(3);       // true
     * new Arr([1, 2, NaN]).includes(NaN);   // true
     */

  }, {
    key: 'includes',
    value: function includes(value) {
      return this.indexOfStrict(value) !== -1;
    }

    /**
     * @method Arr#indexOf
     * @public
     * @param {*} value - Value to search.
     * @returns {Number} Index of the argument.
     * @description Almost the same as {@link Super#keyOf}. The difference is that if the value is not found
     * -1 returned instead of null and if found Number(key) returned.
     *
     * @example
     * new Arr([1, 2, 3]).indexOf(1);       // 0
     * new Arr([1, 2, 3]).indexOf('1');     // 0
     * new Arr([1, 2, 3]).indexOf(3);       // -1
     * new Arr([1, 2, NaN]).indexOf(NaN);   // 2
     */

  }, {
    key: 'indexOf',
    value: function indexOf(value) {
      var key = this.keyOf(value);

      return key === null ? -1 : Number(key);
    }

    /**
     * @method Arr#indexOfStrict
     * @public
     * @param {*} value - Value to search.
     * @returns {Number} Index of the argument.
     * @description Almost the same as {@link Super#keyOfStrict}. The difference is that if the value is not found
     * -1 returned instead of null and if found Number(key) returned.
     *
     * @example
     * new Arr([1, 2, 3]).indexOfStrict(1);       // 0
     * new Arr([1, 2, 3]).indexOfStrict('1');     // -1
     * new Arr([1, 2, 3]).indexOfStrict(3);       // -1
     * new Arr([1, 2, NaN]).indexOfStrict(NaN);   // 2
     */

  }, {
    key: 'indexOfStrict',
    value: function indexOfStrict(value) {
      var key = this.keyOfStrict(value);

      return key === null ? -1 : Number(key);
    }

    /**
     * @method Arr#join
     * @public
     * @param {String} [separator = ','] - See the link.
     * @returns {String} - String of joined array.
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/join
     * @description Synonym for
     * [Array#join]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/join}.
     */

  }, {
    key: 'join',
    value: function join(separator) {
      return this.$.join.apply(this.$, arguments);
    }

    /**
     * @member Arr#last
     * @type {*}
     * @public
     * @readonly
     * @description The last element of the array.
     *
     * @example
     * new Arr([1, 2, 3]).last; // 3
     * new Arr([]).last;        // undefined
     */

  }, {
    key: 'pop',


    /**
     * @method Arr#pop
     * @public
     * @returns {*} Returns deleted element.
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/pop
     * @description Synonym for
     * [Array#pop]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/pop}.
     */
    value: function pop() {
      return this.$.pop();
    }

    /**
     * @method Arr#push
     * @public
     * @param {...*} values - See the link.
     * @this {Arr}
     * @returns {Arr} Returns this.
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/push
     * @description Synonym for
     * [Array#push]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/push}
     * besides returning this.
     */

  }, {
    key: 'push',
    value: function push() {
      for (var _len2 = arguments.length, values = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        values[_key2] = arguments[_key2];
      }

      this.$.push.apply(this.$, arguments);

      return this;
    }

    /**
     * @method Arr#pushArray
     * @public
     * @param {Array} array - Array to push.
     * @this {Arr}
     * @returns {Arr} Returns this.
     * @description Method for pushing an array into another.
     */

  }, {
    key: 'pushArray',
    value: function pushArray(array) {
      this.$.push.apply(this.$, array);

      return this;
    }

    /**
     * @method Arr#random
     * @public
     * @returns {*} Random item of the array.
     * @description Method for getting random items of the array.
     *
     * @example
     * new Arr([1, 5, 3]).random(); // 3
     * new Arr([1, 5, 3]).random(); // 5
     */

  }, {
    key: 'random',
    value: function random() {
      return this.$[random$1(0, this.$.length - 1)];
    }

    /**
     * @method Arr#reverse
     * @public
     * @returns {Arr} A wrap of the reversed array.
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse
     * @description Synonym for
     * [Array#reverse]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse}.
     */

  }, {
    key: 'reverse',
    value: function reverse() {
      this.$.reverse();

      return this;
    }

    /**
     * @method Arr#shift
     * @public
     * @returns {*} Returns deleted element.
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/shift
     * @description Synonym for
     * [Array#shift]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/shift}.
     */

  }, {
    key: 'shift',
    value: function shift() {
      return this.$.shift();
    }

    /**
     * @method Arr#shuffle
     * @public
     * @returns {Arr} Returns this.
     * @description Method for shuffling.
     *
     * @example
     * new Arr([1, 2, 3, 4]).shuffle().$; // [4, 2, 3, 1]
     * new Arr([1, 2, 3, 4]).shuffle().$; // [1, 3, 4, 2]
     */

  }, {
    key: 'shuffle',
    value: function shuffle() {
      var length = this.$.length;

      return this.forEach(function (value, index, array) {
        var randomIndex = index + Math.floor((length - index) * Math.random());

        array[index] = array[randomIndex];
        array[randomIndex] = value;
      });
    }

    /**
     * @method Arr#slice
     * @public
     * @param {Number} [begin = 0] - See the link.
     * @param {Number} [end = array.length] - See the link.
     * @returns {Arr} A wrap of a sliced array.
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
     * @description Synonym for
     * [Array#slice]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/slice}.
     */

  }, {
    key: 'slice',
    value: function slice(begin, end) {
      return new this.constructor(this.$.slice.apply(this.$, arguments));
    }

    /**
     * @method Arr#sort
     * @public
     * @param {CompareFunction} [compareFunction] - See the link.
     * @returns {Arr} Returns this.
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
     * @description Synonym for
     * [Array#sort]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/sort}.
     */

  }, {
    key: 'sort',
    value: function sort(compareFunction) {
      validate$1([compareFunction], ['function||!'], 'Arr#sort');

      this.$.sort(compareFunction);

      return this;
    }

    /**
     * @method Arr#sortAsc
     * @public
     * @returns {Arr} Returns this.
     * @description Method for ascending sorting. Puts non-numbers first, then NaNs, then sorted values.
     *
     * @example
     * new Arr([NaN, 1, -7, '100', 5]).sortAsc().$; // ['100', NaN, -7, 1, 5]
     */

  }, {
    key: 'sortAsc',
    value: function sortAsc() {
      return this.sort(asc);
    }

    /**
     * @method Arr#sortDesc
     * @public
     * @returns {Arr} Returns this.
     * @description Method for descending sorting. Puts sorted values first, then NaNs, then non-numbers.
     *
     * @example
     * new Arr([NaN, 1, -7, '100', 5]).sortDesc().$; // [5, 1, -7, NaN, '100']
     */

  }, {
    key: 'sortDesc',
    value: function sortDesc() {
      return this.sort(function (y, x) {
        return asc(x, y);
      });
    }

    /**
     * @method Arr#splice
     * @public
     * @param {Number} [start] - See the link.
     * @param {Number} [deleteCount] - See the link.
     * @param {...*} [items] - See the link.
     * @returns {Arr} A wrap of return value of #splice call.
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
     * @description Synonym for
     * [Array#splice]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/splice}.
     */

  }, {
    key: 'splice',
    value: function splice(start, deleteCount) {
      for (var _len3 = arguments.length, items = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
        items[_key3 - 2] = arguments[_key3];
      }

      return new Arr(this.$.splice.apply(this.$, arguments));
    }

    /**
     * @method Arr#string
     * @public
     * @returns {String} Concatenated array.
     * @description Synonym for array.join('').
     *
     * @example
     * new Arr([1, 2, 3]).string(); // '123'
     */

  }, {
    key: 'string',
    value: function string() {
      return this.join('');
    }

    /**
     * @method Arr#unshift
     * @public
     * @param {...*} [values] - See the link.
     * @returns {Arr} Returns this.
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift
     * @description Synonym for
     * [Array#unshift]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift}
     * besides returning this.
     */

  }, {
    key: 'unshift',
    value: function unshift() {
      for (var _len4 = arguments.length, values = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        values[_key4] = arguments[_key4];
      }

      this.$.unshift.apply(this.$, arguments);

      return this;
    }
  }, {
    key: 'first',
    get: function get() {
      return this.$[0];
    }
  }, {
    key: 'last',
    get: function get() {
      var array = this.$;

      return array[array.length - 1];
    }

    /**
     * @member Arr#length
     * @type {Number}
     * @public
     * @readonly
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/length
     * @description Synonym for
     * [Array#length]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/length}.
     */

  }, {
    key: 'length',
    get: function get() {
      return this.$.length;
    }
  }]);
  return Arr;
}(Super);

defineProperties(Arr.prototype, defineProperty({}, _Symbol.toStringTag, 'Arr'));

/**
 * @function asc
 * @private
 * @param {*} x - First value to be compared.
 * @param {*} y - Second value to be compared.
 * @returns {Number} Where to put the first element: before or after.
 */
function asc(x, y) {
  if (!isNumber(x) && !isNumber(y)) {
    return 0;
  }

  if (!isNumber(x)) {
    return -1;
  }

  if (!isNumber(y)) {
    return 1;
  }

  if (isNaN(x) && isNaN(y)) {
    return 0;
  }

  if (isNaN(x)) {
    return -1;
  }

  if (isNaN(y)) {
    return 1;
  }

  return x - y;
}

constructors[1].push({
  check: isArrayLike,
  cls: Arr
});

/**
 * @function array
 * @public
 * @param {Number} number - Length of the array.
 * @param {ArrayCallback} [callback] - If it's present it has to be a function
 * that returns the element that is pushed to the new array.
 * @returns {Arr} New instance of Arr.
 * @description Method for creating new array from the length using optional callback.
 *
 * @example
 * array(3).$;               // [0, 1, 2]
 * array(3, (i) => i * 2).$; // [0, 2, 4]
 */
function array(number, callback) {
  validate$1([number, callback], [['intLike', '>=0'], 'function||!'], 'array');

  var array = [];

  for (var i = 0; i < number; i++) {
    array.push(callback ? callback(i) : i);
  }

  return new Arr(array);
}

/**
 * @function iterate
 * @public
 * @param {Number} number - Number of iterations.
 * @param {IterateCallback} callback - Callback that is called on each iteration with the iteration index.
 * @returns {void}
 * @description Method for replacing for (...) construction.
 *
 * @example
 * iterate();
 */
function iterate$1(number, callback) {
  validate$1([number, callback], [['intLike', '>=0'], 'function'], 'iterate');

  for (var i = 0; i < number; i++) {
    callback(i);
  }
}

/**
 * @module BlobObject
 * @private
 * @mixin
 * @description Exports BlobObject class.
 */

/**
 * @typedef {{ buffer: String, binary: String, dataURL: String, text: String }} methods
 * @private
 * @description List of read blob methods.
 */
var methods = {
  buffer: 'ArrayBuffer',
  binary: 'BinaryString',
  dataURL: 'DataURL',
  text: 'Text'
};
var _global = global$1;
var URL = _global.URL;

/**
 * @typedef {('buffer'|'binary'|'dataURL'|'text')} ReadBlobMethod
 * @public
 * @description Enum type of read blob methods.
 */

/**
 * @typedef {ArrayBuffer|ArrayBufferView|Blob|String} BlobParts
 * @public
 * @description Allowed blob parts.
 */

/**
 * @callback ReaderEventListener
 * @public
 * @param {Event} e - Fired event.
 * @param {FileReader} reader - FileReader.
 */

/**
 * @class BlobObject
 * @extends Super
 * @public
 * @param {Blob} blob - Blob to wrap.
 * @returns {BlobObject} Instance of BlobObject.
 * @description Wrap of a blob.
 *
 * @example
 * new BlobObject(new Blob(['{"foo":"bar"}'], { type: 'application/json' }));
 */

var BlobObject = function (_Super) {
  inherits(BlobObject, _Super);

  function BlobObject() {
    classCallCheck(this, BlobObject);
    return possibleConstructorReturn(this, (BlobObject.__proto__ || Object.getPrototypeOf(BlobObject)).apply(this, arguments));
  }

  createClass(BlobObject, [{
    key: 'readAs',


    /**
     * @method BlobObject#readAs
     * @public
     * @param {ReadBlobMethod} method - Method that is used for reading from blob.
     * @param {ReaderEventListener} [progress] - Progress listener.
     * @returns {Promise} Promise that could be aborted.
     * @description Method for reading from blobs.
     *
     * @example
     * new BlobObject(new Blob(['{"foo":"bar"}'], { type: 'application/json' }))
     *   .readAs('text')
     *   .then((value) => {
     *     console.log(value); // '{"foo":"bar"}'
     *   });
     */
    value: function readAs(method, progress) {
      var _this2 = this;

      if (!methods[method]) {
        throw new Error('1st argument must be one of following values: buffer, binary, dataURL, text');
      }

      var reader = new FileReader();
      var toReject = void 0;

      if (isFunction(progress)) {
        reader.onprogress = function (e) {
          progress(e, this);
        };
      }

      var promise = new Promise$1(function (resolve, reject) {
        toReject = reject;

        reader.onerror = function (_ref) {
          var target = _ref.target;

          if (reader) {
            reject(target.error);
          }
        };

        reader.onload = function (_ref2) {
          var target = _ref2.target;

          resolve(target.result);
        };

        reader['readAs' + methods[method]](_this2.$);
      });

      promise.abort = function abort() {
        toReject(new Error('Reading was aborted'));

        reader.abort();

        reader = null;

        return this;
      };

      return promise;
    }

    /**
     * @method BlobObject#saveAs
     * @public
     * @param {String} [name] - Name that is used for saving file.
     * @returns {BlobObject} Returns this.
     * @description Method for saving blobs.
     *
     * @example
     * new BlobObject(new Blob(['{"foo":"bar"}'], { type: 'application/json' }))
     *   .saveAs('blob.json');
     */

  }, {
    key: 'saveAs',
    value: function saveAs() {
      var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'download';

      var anchor = document.createElement('a');

      anchor.href = this.dataURL;
      anchor.setAttribute('download', name);
      anchor.click();

      return this;
    }
  }, {
    key: 'dataURL',

    /**
     * @member BlobObject#$
     * @type {Blob}
     * @public
     * @description Original Blob.
     */

    /**
     * @member {String} BlobObject#dataURL
     * @type {String}
     * @public
     * @readonly
     * @description Returns dataURL representation of the blob.
     */
    get: function get() {
      return URL.createObjectURL(this.$);
    }
  }]);
  return BlobObject;
}(Super);

defineProperties(BlobObject.prototype, defineProperty({}, _Symbol.toStringTag, 'BlobObject'));

constructors[1].push({
  check: function check(blob) {
    return (/^(Blob|File)$/.test(toStringTag(blob))
    );
  },
  cls: BlobObject
});

/**
 * @function blob
 * @public
 * @param {(BlobParts[]|BlobParts)} blobParts - Blob parts that are passed to
 * [Blob]{@link https://developer.mozilla.org/en-US/docs/Web/API/Blob/Blob} constructor.
 * @param {Object} [options] - Options that are passed to
 * [Blob]{@link https://developer.mozilla.org/en-US/docs/Web/API/Blob/Blob} constructor.
 * @returns {BlobObject} New instance of BlobObject.
 * @description Function for creating blobs not involving BlobObject and Blob constructors.
 */
function blob$1(blobParts) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!isArray(blobParts)) {
    blobParts = [blobParts];
  }

  return new BlobObject(new Blob(blobParts, options));
}

/**
 * @module Str
 * @private
 * @mixin
 * @description Exports Str class.
 */

var htmlSpecials = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;'
};
var regexpSpecialsRegexp = new RegExp(new Super(regexpSpecialCharacters).word(function (x) {
  return '\\' + x + '|';
}).replace(/\|$/, ''), 'g');

/**
 * @class Str
 * @extends Super
 * @public
 * @param {String} [string = ''] - A string to wrap.
 * @returns {Str} Instance of Str.
 * @description Wrap of a string.
 *
 * @example
 * const s = new Num('1');
 */

var Str = function (_Super) {
  inherits(Str, _Super);

  function Str() {
    var string = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    classCallCheck(this, Str);
    return possibleConstructorReturn(this, (Str.__proto__ || Object.getPrototypeOf(Str)).call(this, '' + string));

    /**
     * @member Str#$
     * @type {String}
     * @public
     * @description Original string.
     */
  }

  /**
   * @method Str#capitalizeFirst
   * @public
   * @returns {Str} Capitalized string.
   * @description Method capitalizing the first symbol.
   *
   * @example
   * new Str('foo').capitalizeFirst().$; // 'Foo'
   */


  createClass(Str, [{
    key: 'capitalizeFirst',
    value: function capitalizeFirst() {
      var string = this.$;

      return new Str(string.slice(0, 1).toUpperCase() + string.slice(1));
    }

    /**
     * @method Str#endsWith
     * @public
     * @param {String} searchString - See the link.
     * @param {Number} [position = string.length] - See the link.
     * @returns {Boolean} If the string ends with the argument string.
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
     * @description Synonym for
     * [String#endsWith]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith}.
     */

  }, {
    key: 'endsWith',
    value: function endsWith(searchString, position) {
      if (arguments.length < 2) {
        position = this.$.length;
      }

      return this.slice(0, position).revert().startsWith(new Str(searchString).revert().$);
    }

    /**
     * @method Str#escapeHTML
     * @public
     * @returns {Str} New instance of Str.
     * @description Methods escaping "&", "<" and ">" symbols.
     *
     * @example
     * new Str('"1 < 2" & "7 > 4" are true expressions.').escapeHTML().$;
     * // '"1 &lt; 2" &amp "7 &gt; 2" are true expressions.'
     */

  }, {
    key: 'escapeHTML',
    value: function escapeHTML() {
      var string = this.$;

      iterate(htmlSpecials, function (escaped, symbol) {
        string = string.replace(new RegExp(symbol, 'g'), escaped);
      });

      return new Str(string);
    }

    /**
     * @method Str#escapeRegExp
     * @public
     * @returns {Str} New instance of Str.
     * @description Method escaping RegExp special characters.
     *
     * @example
     * new Str('(213.98 - [] {})').escapeRegExp().$; // '\(213\.98 \- \[\] \{\}\)'
     */

  }, {
    key: 'escapeRegExp',
    value: function escapeRegExp() {
      return this.replace(regexpSpecialsRegexp, '\\$&');
    }

    /**
     * @method Str#in
     * @public
     * @param {*} object - Object to check the string as a property in.
     * @returns {Boolean} If it is in the object or not.
     * @description Returns string in object.
     *
     * @example
     * new Str('a').in({ a: 1 }); // true
     * new Str('toFixed').in(1);  // false
     * new Str('a').in(null);     // false
     */

  }, {
    key: 'in',
    value: function _in(object) {
      if (!isObject(object)) {
        return false;
      }

      return this.$ in object;
    }

    /**
     * @method Str#indexOf
     * @public
     * @param {String} searchValue - See the link.
     * @param {Number} [fromIndex = 0] - See the link.
     * @returns {Number} Found index or -1.
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf
     * @description Synonym for
     * [String#indexOf]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf}.
     */

  }, {
    key: 'indexOf',
    value: function indexOf(searchValue, fromIndex) {
      return this.$.indexOf.apply(this.$, arguments);
    }

    /**
     * @method Str#lastIndexOf
     * @public
     * @param {String} searchValue - See the link.
     * @param {Number} [fromIndex = string.length] - See the link.
     * @returns {Number} Found index or -1.
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/lastIndexOf
     * @description Synonym for
     * [String#lastIndexOf]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/lastIndexOf}.
     */

  }, {
    key: 'lastIndexOf',
    value: function lastIndexOf(searchValue, fromIndex) {
      return this.$.lastIndexOf.apply(this.$, arguments);
    }

    /**
     * @member Str#length
     * @type {Number}
     * @public
     * @readonly
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/length
     * @description Synonym for
     * [String#length]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/length}.
     */

  }, {
    key: 'match',


    /**
     * @method Str#match
     * @public
     * @returns {Arr|Super} D-Wrap of found match.
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/match
     * @description Synonym for
     * [String#match]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/match}.
     */
    value: function match(regexp) {
      return D$2(this.$.match.apply(this.$, arguments));
    }

    /**
     * @method Str#repeat
     * @public
     * @param {Integer} times - Times to repeat the string.
     * @returns {Str} New instance of Str.
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/repeat
     * @description Synonym for
     * [String#repeat]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/repeat}.
     *
     * @example
     * new Str('123').repeat(2).$; // '123123'
     * new Str('123').repeat(0).$; // ''
     */

  }, {
    key: 'repeat',
    value: function repeat(times) {
      validate$1([times], [['intLike', '>=0']], 'Str#repeat');

      times = +times;

      var string = this.$;

      var s = '';

      for (var i = 0; i < times; i++) {
        s += string;
      }

      return new Str(s);
    }

    /**
     * @method Str#replace
     * @public
     * @param {RegExp|String} regexp - See the link.
     * @param {String|Function} [replacer = ''] - See the link.
     * @returns {Str} New instance of Str.
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/replace
     * @description Synonym for
     * [String#replace]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/replace}
     * besides that replacer has a default value of ''.
     */

  }, {
    key: 'replace',
    value: function replace(regexp) {
      var replacer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      return new Str(this.$.replace(regexp, replacer));
    }

    /**
     * @method Str#replaceString
     * @public
     * @param {String} string - String to replace.
     * @param {String} [replacer = ''] - String to replace with.
     * @returns {Str} New instance of Str.
     * @description Method for global string replaceing.
     *
     * @example
     * new Str('123123').replaceString('1', '4').$; // '423423'
     * new Str('123123').replaceString('1').$;      // '2323'
     */

  }, {
    key: 'replaceString',
    value: function replaceString(string) {
      var replacer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      string = new Super(string).$;

      validate$1([string], ['string'], 'Str#replaceString');

      return new Str(this.$.split(string).join(replacer));
    }

    /**
     * @method Str#revert
     * @public
     * @returns {Str} New instance of string.
     * @description Method for reverting a string.
     *
     * @example
     * new Str('1234').revert().$; // '4321'
     */

  }, {
    key: 'revert',
    value: function revert() {
      var string = this.$;
      var str = '';

      for (var i = string.length - 1; i >= 0; i--) {
        str += string[i];
      }

      return new Str(str);
    }

    /**
     * @method Str#search
     * @public
     * @param {RegExp} regexp - See the link.
     * @returns {Number} Index of the first match, if found, and -1 if not.
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/search
     * @description Synonym for
     * [String#search]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/search}.
     */

  }, {
    key: 'search',
    value: function search(regexp) {
      validate$1([regexp], ['regexp']);

      return this.$.search.apply(this.$, arguments);
    }

    /**
     * @method Str#slice
     * @public
     * @param {Number} [beginSlice = 0] - See the link.
     * @param {Number} [endSlice = string.length] - See the link.
     * @returns {Str} New instance of Str.
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/slice
     * @description Synonym for
     * [String#slice]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/slice}.
     */

  }, {
    key: 'slice',
    value: function slice(beginSlice, endSlice) {
      return new Str(this.$.slice.apply(this.$, arguments));
    }

    /**
     * @method Str#split
     * @public
     * @param {RegExp|String} [separator] - See the link.
     * @returns {Arr|Super} D-Wrap of the array.
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/split
     * @description Synonym for
     * [String#split]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/split}.
     */

  }, {
    key: 'split',
    value: function split(separator) {
      return D$2(this.$.split.apply(this.$, arguments));
    }

    /**
     * @method Str#startsWith
     * @public
     * @param {String} searchString - See the link.
     * @param {Number} [position = 0] - See the link.
     * @returns {Boolean} If the string ends with the argument string.
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith
     * @description Synonym for
     * [String#startsWith]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith}.
     */

  }, {
    key: 'startsWith',
    value: function startsWith(searchString) {
      var position = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      return this.$.indexOf.apply(this.$, arguments) === position;
    }

    /**
     * @method Str#substr
     * @public
     * @param {Number} [start = 0] - See the link.
     * @param {Number} [length = string.length] - See the link.
     * @returns {Str} New instance of Str.
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/substr
     * @description Synonym for
     * [String#substr]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/substr}.
     */

  }, {
    key: 'substr',
    value: function substr(start, length) {
      return new Str(this.$.substr.apply(this.$, arguments));
    }

    /**
     * @method Str#substring
     * @public
     * @param {Number} [indexStart = 0] - See the link.
     * @param {Number} [indexEnd = string.length] - See the link.
     * @returns {Str} New instance of Str.
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/substring
     * @description Synonym for
     * [String#substring]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/substring}.
     */

  }, {
    key: 'substring',
    value: function substring(indexStart, indexEnd) {
      return new Str(this.$.substring.apply(this.$, arguments));
    }

    /**
     * @method Str#toCamelCase
     * @public
     * @returns {Str} New instance of Str.
     * @description Removes following regexp /\s\-_\./ making the string camel cased.
     *
     * @example
     * new Str('spinal-case').toCamelCase().$;  // 'spinalCase'
     * new Str('_snake_case_').toCamelCase().$; // 'snakeCase'
     */

  }, {
    key: 'toCamelCase',
    value: function toCamelCase() {
      return new Str(trim(this.$).replace(/[\s\-_.]+/g, '-').replace(/-[^-]/g, function (match) {
        return match[1].toUpperCase();
      }).replace(/^[\S]/, function (match) {
        return match.toLowerCase();
      }));
    }

    /**
     * @method Str#toCapitalCase
     * @public
     * @returns {Str} New instance of Str.
     * @description Removes following regexp /\-_\./ making the string capital letter cased.
     *
     * @example
     * new Str('spinal-case').toCapitalCase().$;  // 'Spinal Case'
     * new Str('_snake_case_').toCapitalCase().$; // 'Snake Case'
     */

  }, {
    key: 'toCapitalCase',
    value: function toCapitalCase() {
      return new Str(trim(this.$).replace(/[\s\-_.]+/g, ' ').replace(/[\S]/g, function (match) {
        return match.toLowerCase() === match ? match : ' ' + match;
      }).replace(/\s[\S]/g, function (match) {
        return match.toUpperCase();
      }).replace(/\s+/g, ' ').replace(/^\s/, '').replace(/^[\S]/, function (match) {
        return match.toUpperCase();
      }));
    }

    /**
     * @method Str#toDotCase
     * @public
     * @returns {Str} New instance of Str.
     * @description Removes following regexp /\-_\./ making the string dot cased.
     *
     * @example
     * new Str('spinal-case').toDotCase().$;  // 'spinal.case'
     * new Str('_snake_case_').toDotCase().$; // 'snake.case'
     */

  }, {
    key: 'toDotCase',
    value: function toDotCase() {
      return new Str(trim(this.$).replace(/[\s\-_.]+/g, '.').replace(/[^.]/g, function (match) {
        return match.toLowerCase() === match ? match : '.' + match;
      }).replace(/\.+/g, '.').replace(/^\./, '').toLowerCase());
    }

    /**
     * @method Str#toHyphenCase
     * @public
     * @returns {Str} New instance of Str.
     * @description Removes following regexp /\s\-_\./ making the string camel cased.
     *
     * @example
     * new Str('camelCase').toSpinalCase().$;    // 'camel-case'
     * new Str('_snake_case_').toSpinalCase().$; // 'snake-case'
     */

  }, {
    key: 'toHyphenCase',
    value: function toHyphenCase() {
      return new Str(trim(this.$).replace(/[\s\-_.]+/g, '-').replace(/[^-]/g, function (match) {
        return match.toLowerCase() === match ? match : '-' + match;
      }).replace(/-+/g, '-').replace(/^-/, '').toLowerCase());
    }

    /**
     * @method Str#toLowerCase
     * @public
     * @returns {Str} New instance of Str.
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase
     * @description Synonym for
     * [String#toLowerCase]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase}.
     *
     * @example
     * new Str('UPPER-CASE').toLowerCase().$;  // 'upper-case'
     */

  }, {
    key: 'toLowerCase',
    value: function toLowerCase() {
      return new Str(this.$.toLowerCase());
    }

    /**
     * @method Str#toSnakeCase
     * @public
     * @returns {Str} New instance of Str.
     * @description Removes following regexp /\s\-\./ making the string spinal cased.
     *
     * @example
     * new Str('spinal-case').toSnakeCase().$; // 'spinal_case'
     * new Str('camelCase').toSnakeCase().$;   // 'camel_case'
     */

  }, {
    key: 'toSnakeCase',
    value: function toSnakeCase() {
      return new Str(trim(this.$).replace(/[\s\-_.]+/g, '_').replace(/[^_]/g, function (match) {
        return match.toLowerCase() === match ? match : '_' + match;
      }).replace(/_+/g, '_').replace(/^_/, '').toLowerCase());
    }

    /**
     * @method Str#toSpaceCase
     * @public
     * @returns {Str} New instance of Str.
     * @description Removes following regexp /\-_\./ making the string space cased.
     *
     * @example
     * new Str('spinal-case').toSpaceCase().$;  // 'spinal case'
     * new Str('_snake_case_').toSpaceCase().$; // 'snake case'
     */

  }, {
    key: 'toSpaceCase',
    value: function toSpaceCase() {
      return new Str(trim(this.$).replace(/[\s\-_.]+/g, ' ').replace(/[\S]/g, function (match) {
        return match.toLowerCase() === match ? match : ' ' + match;
      }).replace(/\s+/g, ' ').replace(/^\s/, '').toLowerCase());
    }
  }, {
    key: 'toString',
    value: function toString() {
      return this.$;
    }

    /**
     * @method Str#toUpperCase
     * @public
     * @returns {Str} New instance of Str.
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase
     * @description Synonym for
     * [String#toUpperCase]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase}.
     *
     * @example
     * new Str('lower-case').toUpperCase().$;  // 'LOWER-CASE'
     */

  }, {
    key: 'toUpperCase',
    value: function toUpperCase() {
      return new Str(this.$.toUpperCase());
    }

    /**
     * @method Str#trim
     * @public
     * @returns {Str} New instance of Str.
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/trim
     * @description Synonym for
     * [String#trim]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/trim}.
     */

  }, {
    key: 'trim',
    value: function trim() {
      return new Str(this.$.replace(/^[\s\ufeff\u00a0]+|[\s\ufeff\u00a0]+$/g, ''));
    }

    /**
     * @method Str#trimLeft
     * @public
     * @returns {Str} New instance of Str.
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/trimLeft
     * @description Synonym for
     * [String#trimLeft]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/trimLeft}.
     */

  }, {
    key: 'trimLeft',
    value: function trimLeft() {
      return new Str(this.$.replace(/^[\s\ufeff\u00a0]+/, ''));
    }

    /**
     * @method Str#trimRight
     * @public
     * @returns {Str} New instance of Str.
     * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/trimRight
     * @description Synonym for
     * [String#trimRight]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/trimRight}.
     */

  }, {
    key: 'trimRight',
    value: function trimRight() {
      return new Str(this.$.replace(/[\s\ufeff\u00a0]+$/, ''));
    }
  }, {
    key: 'length',
    get: function get() {
      return this.$.length;
    }
  }]);
  return Str;
}(Super);

defineProperties(Str.prototype, defineProperty({}, _Symbol.toStringTag, 'Str'));

constructors[2].push({
  check: isString,
  cls: Str
});

function trim(string) {
  return string.replace(/^[\s\-_.]+|[\s\-_.]+$/g, '');
}

/**
 * @function parseJSON
 * @public
 * @param {String} [json = null] - String to parse.
 * @param {Object} [options] - Options.
 * @param {Boolean|*} [options.numbers] - If it is needed to parse number-like strings as numbers.
 * @param {Boolean|*} [options.dates] - If it is needed to parse date-like string as dates.
 * Date-like string is considered to match ^\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d\.\d\d\dZ?$
 * @param {JSONCallback} [callback] - Callback that called on every iteration.
 * @returns {DWrap} D-Wrap of found match.
 * @description Method for parsing json.
 *
 * @example
 * parseJSON('{ "a": 1 }').$;                                           // { a: 1 }
 * parseJSON('{ "a": "1" }', { numbers: true }).$;                      // { numbers: true }
 * parseJSON('{ "a": "1999-12-31T23:59:59.999Z" }', { dates: true }).$; // { a: Date {...} }
 */
function parseJSON$1() {
  var json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var callback = arguments[2];

  if (arguments.length <= 1) {
    return D$2(JSON.parse(json));
  }

  if (isFunction(options)) {
    callback = options;
    options = {};
  }

  var _options = options;
  var numbers = _options.numbers;
  var dates = _options.dates;

  var parsed = JSON.parse(json, function (key, value) {
    if (dates && /^\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d\.\d\d\dZ?$/.test(value)) {
      value = new Date(value);
    } else if (numbers && isNumberLike(value) && isString(value)) {
      value = Number(value);
    }

    return callback ? callback.apply(this, arguments) : value;
  });

  return D$2(parsed);
}

/**
 * @module helpers/markupToJSON
 * @private
 * @description Exports markupToJSON method.
 */

/**
 * @typedef {Object} MarkupElement
 * @property {'comment'|'text'|'element'} type - Type of the node.
 * @property {MarkupElement} parent - Type of the node.
 * @property {Object.<String, String>} attrs - Node attributes
 * @property {MarkupElement[]} children - Node children.
 */

var submitString = 'Please, submit an issue at https://github.com/dwaynejs/dwayne/issues/new, if needed.';
var NODE_REGEX_SET = new Super({
  'tag-open': new RegExp('<(' + htmlAllowedTagSymbols + ')\\s*', 'i'),
  'tag-close': constructCloseTagRegExp(htmlAllowedTagSymbols),
  comment: /<!--((?:-[^\->]|[^\->])(?:-?[^-])*[^-]?|)-->/
});
var TAG_OPEN_CLOSE = /^(\/?)>/;
// const ATTRIBUTE = /^([^\u0000-\u0020\s"'>\/=]+)(?:\s*=\s*('[^']*'|"[^"]*"|[^\s"'`<>=]+))?\s*/;
var ATTRIBUTE = new RegExp('^(' + htmlAllowedAttrSymbols + ')(?:\\s*=\\s*(\'[^\']*\'|"[^"]*"|[^\\s"\'`<>=]+))?\\s*');
var div = document.createElement('div');
var nodeSwitcher = switcher('strictEquals', function (elem) {
  return elem;
}).case('tag-open', function (elem, node) {
  var _node = node;
  var name = _node.value;
  var selfClosing = _node.selfClosing;


  node = {
    name: name,
    attrs: new Super(node.attrs).map(function (value) {
      return value === true ? value : parseCharacterData(value);
    }).$,
    parent: elem,
    children: new Arr([])
  };

  elem.children.push(node);

  if (!selfClosing && voidElements.indexOf(name) === -1) {
    elem = node;
  }

  return elem;
}).case('tag-close', function (elem, node) {
  if (elem.name === node.value) {
    elem = elem.parent;
  }

  return elem;
}).case(['comment', 'text'], function (elem, node, collapseWhiteSpace, type) {
  var element = {
    name: '#' + type,
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
var rawTextSwitcher = switcher('strictEquals', false).case(['title', 'textarea', 'style', 'script'], true);

var InternalParsingError = function InternalParsingError(index) {
  classCallCheck(this, InternalParsingError);

  this.index = index;
};

var ParsingError = function (_Error) {
  inherits(ParsingError, _Error);

  function ParsingError() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, ParsingError);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = ParsingError.__proto__ || Object.getPrototypeOf(ParsingError)).call.apply(_ref, [this].concat(args))), _this), _this.type = 'PARSING_ERROR', _temp), possibleConstructorReturn(_this, _ret);
  }

  return ParsingError;
}(Error);

/**
 * @function markupToJSON
 * @private
 * @param {String} markup - Markup to parse to JSON.
 * @param {Boolean} [collapseWhiteSpace = false] - If the whitespace should be collapsed.
 * @returns {Arr.<MarkupElement>} Markup elements array.
 * @description Function for parsing html and xml to JSON.
 */


var markupToJSON = (function (markup, collapseWhiteSpace) {
  collapseWhiteSpace = !!collapseWhiteSpace;

  var elements = new Arr([]);
  var startMarkup = markup;
  var found = void 0;
  var globalIndex = 0;
  var elem = {
    name: null,
    children: elements
  };

  while (markup.length) {
    try {
      found = find$1(markup, elem);
    } catch (err) {
      if (!(err instanceof InternalParsingError)) {
        throwUnexpectedError();
      }

      throw new ParsingError('Parsing error near index ' + nearString(startMarkup, globalIndex + err.index));
    }

    var _found = found;
    var type = _found.type;
    var attrs = _found.attrs;
    var selfClosing = _found.selfClosing;
    var index = _found.index;
    var value = _found.value;


    globalIndex += index;

    if (!index) {
      throwUnexpectedError();
    }

    var node = {
      type: type,
      value: value
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
    throw new ParsingError('Unexpected parsing error near index ' + nearString(startMarkup, globalIndex) + '. ' + submitString);
  }
});

function find$1(markup, elem) {
  var name = elem.name;

  var matches = void 0;

  if (rawTextSwitcher(name)) {
    matches = new Super({
      'tag-close': markup.match(constructCloseTagRegExp(name))
    });
  } else {
    matches = NODE_REGEX_SET.map(function (regex) {
      return markup.match(regex);
    });
  }

  var match = void 0;

  if (match = matches.find(function (match) {
    return match && match.index === 0;
  })) {
    var returning = {
      type: match.key,
      index: match.value[0].length,
      value: match.value[1]
    };
    var attrs = {};

    if (match.key === 'tag-open') {
      var startMarkup = markup;
      var closeMatch = void 0;

      returning.selfClosing = false;
      returning.attrs = attrs;

      while ((markup = startMarkup.slice(returning.index)) && !(closeMatch = markup.match(TAG_OPEN_CLOSE))) {
        var attr = markup.match(ATTRIBUTE);

        if (!attr) {
          returning.index += 1;

          continue;
        }

        attrs[attr[1]] = isUndefined(attr[2]) ? true : attr[2].replace(/^("|')|("|')$/g, '');
        returning.index += attr[0].length;
      }

      if (closeMatch) {
        returning.index += closeMatch[0].length;
        returning.selfClosing = !!closeMatch[1];
      }
    }

    return returning;
  }

  var _matches$min = matches.min(function (match) {
    return match ? match.index : NaN;
  });

  var index = _matches$min.value;


  if (index === Infinity) {
    index = markup.length;
  }

  return {
    type: 'text',
    index: index,
    value: markup.slice(0, index)
  };
}

function constructCloseTagRegExp(tagName) {
  return new RegExp('</(' + tagName + ')\\s*>', 'i');
}

function nearString(markup, index) {
  return index + ' (~~~ "' + markup.slice(index, index + 15) + '" ~~~, the string itself is "' + markup + '")';
}

function parseCharacterData(string) {
  return string.replace(/&(\w+|#x?\d+);/g, function (match) {
    div.innerHTML = match;

    return div.textContent || div.innerText;
  });
}

/**
 * @module Elem
 * @private
 * @mixin
 * @description Exports Elem class.
 */

/**
 * @typedef {String} ElemEventString
 * @public
 * @description A string containing events separated by a comma with zero or more spaces or just spaces.
 */

/**
 * @callback ElemValueCallback
 * @public
 * @param {String} value - Old value.
 * @param {Elem} elem - Current element.
 * @param {Number} index - Index in the set of the elements.
 */

/**
 * @callback ElemSetOfCallback
 * @public
 * @param {Element} created - Created element.
 * @param {*} value - Value of the iterated element in the object.
 * @param {Key} key - Key of the iterated element in the object.
 * @param {*} object - Object that is iterated over.
 * @param {Element} elem - Current element.
 * @param {Number} index - Index of the current element.
 */

/**
 * @callback ValidateCallback
 * @public
 * @param {*} value - Element value.
 * @param {Element} elem - Element to validate.
 * @param {Number} index - Index of the element.
 */

/**
 * @callback CtxCallback
 * @public
 * @param {CanvasRenderingContext2D} ctx - Canvas rendering context.
 */

/**
 * @callback ElemListener
 * @public
 * @param {Event} e - Fired event.
 * @param {Element} elem - Element on which the listener was called.
 * @param {Number} index - Index of the element on which the listener was called.
 */

/**
 * @callback ElemRemoveListeners
 * @public
 * @param {...ElemEventString} events - If at least one argument present only removes event listeners specified
 * by the events in the arguments.
 */

var nativeDocument = global$1.document;
var emptyDiv = nativeDocument.createElement('div');
var eventSeparator = /(?:,| ) */;
var textProperty = new Super(Node.prototype).propertyDescriptor('textContent') ? 'textContent' : 'innerText';
var classes = {};
var attrs = {};
var windowsDwayneData = new Arr([]);
var inputElements = 'input, select, textarea, datalist, keygen, output';
var click$1 = method('click');
var svgNS$1 = 'http://www.w3.org/2000/svg';
var xmlNS = 'http://www.w3.org/2000/xmlns/';
var xlinkNS = 'http://www.w3.org/1999/xlink';
var xhtmlNS = 'http://www.w3.org/1999/xhtml';
var typeSwitcher = switcher('call', function (elem, type) {
  var ns = type === 'svg' ? svgNS$1 : elem.prop('namespaceURI') || nativeDocument.documentElement.namespaceURI || xhtmlNS;

  return nativeDocument.createElementNS(ns, type);
}).case(function (type) {
  return type === '#comment';
}, function () {
  return nativeDocument.createComment('');
}).case(function (type) {
  return type === '#text';
}, function () {
  return nativeDocument.createTextNode('');
});
var refSwitcher = switcher('strictEquals', 'href').case(['img', 'script', 'iframe', 'audio', 'video'], 'src').case('form', 'action');
var filterSwitcher = switcher('call', function (selector) {
  return selector;
}).case(isString, function (selector) {
  return function (elem) {
    return new Elem(elem).is(selector);
  };
}).case([isArray, isElem], function (elems) {
  elems = new Arr(elems);

  return function (elem) {
    return elems.indexOf(elem) !== -1;
  };
});
var innerSwitcher = switcher('strictEquals', 0).case('padding-box', function (paddings) {
  return paddings;
}).case('border-box', function (paddings, borders) {
  return paddings + borders;
});
var outerSwitcher = switcher('strictEquals', function (borders, paddings) {
  return borders + paddings;
}).case('padding-box', function (borders) {
  return borders;
}).case('border-box', 0);
var attrNSSwitcher = switcher('call', null).case(function (attr) {
  return attr === 'xmlns' || attr === 'xmlns:xlink';
}, function (elem) {
  return elem.name === 'svg' ? xmlNS : null;
}).case(function (attr) {
  return (/^xlink:\w/.test(attr)
  );
}, function (elem) {
  return elem.closest('svg').length ? xlinkNS : null;
});

/**
 * @class Elem
 * @extends Arr
 * @public
 * @param {Element|Element[]} [elem = []] - An element or an array of elements to wrap.
 * @returns {Elem} Instance of Elem.
 * @description Wrap of an elements set. Also has all methods from from
 * [CanvasRenderingContext2D]{@link https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D}.
 * Getters methods return the same as methods from CanvasRenderingContext2D and the rest return this.
 * Work for the first canvas element in the set.
 *
 * @example
 * new Elem(document.body);
 * new Elem(document.querySelectorAll('.cls'));
 * new Elem(document.getElementsByClassName('cls'));
 */

var Elem = function (_Arr) {
  inherits(Elem, _Arr);

  function Elem() {
    var elem = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    classCallCheck(this, Elem);

    var _this = possibleConstructorReturn(this, (Elem.__proto__ || Object.getPrototypeOf(Elem)).call(this, function () {
      var element = elem;

      if (isArrayLike(element) && (isWindow(element) || isHTMLDocument(element) || isDocumentFragment(element) || isElement(element) || isCommentOrText(element) || isStyleRule(element))) {
        element = [element];
      }

      return new Arr(toArray$1(new Super(element).$, true)).object(function (elems, elem) {
        if (elems.indexOf(elem) === -1 && (isElement(elem) || isWindow(elem) || isHTMLDocument(elem) || isDocumentFragment(elem) || isCommentOrText(elem) || isStyleRule(elem))) {
          return elems.push(elem);
        }

        if (isElem(elem)) {
          elems.push.apply(elems, elem.$);
        }
      }, []).$;
    }()));

    _this.$$ = elem;

    _this.forEach(addDwayneData);

    /**
     * @member {Array.<Node|Window>} Elem#$
     * @type {Array.<Node|Window>}
     * @public
     * @description Constructed element set.
     */

    /**
     * @member {*} Elem#$$
     * @type {*}
     * @public
     * @description Initial element set.
     */
    return _this;
  }

  /**
   * @method Elem#add
   * @public
   * @param {...(String|Elem|Element|Element[])} elements - Each argument is a selector, or Elem, or Element, or array of Elements.
   * @returns {Elem} Returns this.
   * @description Method for adding new elements to the set.
   *
   * @example
   * elem1.find('.cls1')
   *   .add(elem2.find('.cls2'))
   *   .hide();
   */


  createClass(Elem, [{
    key: 'add',
    value: function add() {
      var _this2 = this;

      for (var _len = arguments.length, elements = Array(_len), _key = 0; _key < _len; _key++) {
        elements[_key] = arguments[_key];
      }

      iterate(arguments, function (elem) {
        toFind(elem).forEach(function (elem) {
          if (_this2.indexOf(elem) === -1) {
            _this2.push(elem);
          }
        });
      });

      return this;
    }

    /**
     * @method Elem#addClass
     * @public
     * @param {...String} classes - Classes to add.
     * @returns {Elem} Returns this.
     * @description Method for adding classes to the all the elements in the set.
     *
     * @example
     * elem.addClass('red', 'round');
     */

  }, {
    key: 'addClass',
    value: function addClass() {
      var _arguments = arguments;

      for (var _len2 = arguments.length, classes = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        classes[_key2] = arguments[_key2];
      }

      return this.forEach(function (elem) {
        var list = elem.classList;

        iterate(isElement(elem) && _arguments, function (cls) {
          return list.add(cls);
        });
      });
    }

    /**
     * @method Elem#addComment
     * @public
     * @param {String} text - Text of comment to add.
     * @param {Boolean} end - If the comment should be inserted to the end. If false it's inserted to the start.
     * @returns {Elem} Returns this.
     * @description Method for adding comment to all the elements in the set.
     *
     * @example
     * elem.addHTML('<div>1</div>');
     */

  }, {
    key: 'addComment',
    value: function addComment(text) {
      var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      return this.forEach(function (elem) {
        if (isElement(elem)) {
          elem.insertAdjacentHTML(end ? 'beforeend' : 'afterbegin', '<!--' + text + '-->');
        }
      });
    }

    /**
     * @method Elem#addHTML
     * @public
     * @param {String} html - HTML to add.
     * @param {Boolean} end - If the HTML should be inserted to the end. If false it's inserted to the start.
     * @returns {Elem} Returns this.
     * @description Method for adding HTML to all the elements in the set.
     *
     * @example
     * elem.addHTML('<div>1</div>');
     */

  }, {
    key: 'addHTML',
    value: function addHTML(html) {
      var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      return this.forEach(function (elem) {
        if (isElement(elem)) {
          elem.insertAdjacentHTML(end ? 'beforeend' : 'afterbegin', html);
        }
      });
    }

    /**
     * @method Elem#addRule
     * @public
     * @param {String} name - Name of the rule.
     * @param {String} selector - Selector for the rule
     * @param {Object.<String, String>} style - Style for the selector.
     * @returns {Elem} Returns this.
     * @description Method for adding css styles into the first style tag in the set.
     * Note: style element should be inside the document.
     *
     * @example
     * style.addRule('img-size', 'img.square', {
     *   width: '40px !important',
     *   height: '40px !important'
     * });
     */

  }, {
    key: 'addRule',
    value: function addRule(name, selector, style) {
      this.some(function (elem) {
        if (getName(elem) === 'style') {
          var sheet = elem.sheet;
          var length = sheet.cssRules.length;

          var rules = new Super(style).word(function (value, property) {
            return new Str(property).toHyphenCase() + ': ' + value + ';\n';
          });

          sheet.insertRule(selector + ' {' + (rules && '\n') + rules + '}', length);
          sheet.cssRules[length].dwayneData = { name: name };

          return true;
        }
      });

      return this;
    }

    /**
     * @method Elem#addText
     * @public
     * @param {String} text - Text to add.
     * @param {Boolean} end - If the text should be inserted to the end. If false it's inserted to the start.
     * @returns {Elem} Returns this.
     * @description Method for adding text to all the elements in the set.
     *
     * @example
     * elem.addText('123');
     */

  }, {
    key: 'addText',
    value: function addText(text) {
      var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      return this.forEach(function (elem) {
        new Elem(nativeDocument.createTextNode(text)).into(elem, end);
      });
    }

    /**
     * @method Elem#apply
     * @public
     * @param {...String} strings - Strings to apply.
     * @returns {Elem} Returns this.
     * @description Method that is a shorthand for many other methods.
     * All shorthands can be separated with space and written within one string.
     *
     * @example
     * elem.apply(
     *   '#id .c1 .c2 @border(1px solid black) $disabled $attr(some value) *(Click me!)'
     * );
     * // shorthand for
     * // elem
     * //   .id('id')
     * //   .addClass('c1', 'c2')
     * //   .css('border', '1px solid black')
     * //   .attr({
     * //     attr, 'some value'
     * //     disabled: ''
     * //   })
     * //   .text('Click me!');
     * // There is a full list of possible types of syntax below...
     *
     * elem.apply('#id');                    // shorthand for elem.id('id');
     * elem.apply('.c1 .c2');                // shorthand for elem.addClass('c1', 'c2');
     * elem.apply('-.c1 -.c2');              // shorthand for elem.removeClass('c1', 'c2');
     * elem.apply('-@float -@display');      // shorthand for elem.removeCSS('float', 'display');
     * elem.apply('-$a1 -$a2');              // shorthand for elem.removeAttr('a1', 'a2');
     * elem.apply('*(some text)');           // shorthand for elem.text('some text');
     * elem.apply('&(<div>1</div>)');        // shorthand for elem.html('<div>1</div>');
     * elem.apply('@float(right)');          // shorthand for elem.css('float', 'right');
     * elem.apply('@transform(scale(5px))'); // shorthand for elem.css('transform', 'scale(5px)');
     * elem.apply('@margin(2px 2px)');       // shorthand for elem.css('margin', '2px 2px');
     * elem.apply('@marginLeft(2px)');       // shorthand for elem.css('marginLeft', '2px 2px');
     * elem.apply('@margin-left(2px)');      // shorthand for elem.css('margin-left', '2px 2px');
     * elem.apply('$attr(some value)');      // shorthand for elem.attr('attr', 'some value');
     * elem.apply('$attr');                  // shorthand for elem.attr('attr', '');
     */

  }, {
    key: 'apply',
    value: function apply() {
      var _this3 = this;

      for (var _len3 = arguments.length, strings = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        strings[_key3] = arguments[_key3];
      }

      var applied = void 0;
      var setApplied = void 0;
      var callback = void 0;
      var name = void 0;
      var np1 = void 0;
      var slice = void 0;

      new Str(new Arr(arguments).join(' ')).split(/(\s+)/).forEach(function (string) {
        if (!applied) {
          np1 = string.slice(0, 1);
          callback = appliedRegExps[np1];
          slice = 1;

          if (callback && !isFunction(callback)) {
            callback = callback[string.slice(1, 2)];
            slice = 2;
          }

          if (/^\s+$/.test(string) || !callback) {
            return;
          }

          name = string.slice(slice).match(/^[^()]+/);

          if (!name && np1 !== '*' && np1 !== '&') {
            return;
          }

          applied = {
            name: name ? name[0] : '',
            args: string.slice(slice + (name ? name[0] : '').length),
            callback: callback
          };

          setApplied = true;
        }

        if (!setApplied) {
          applied.args += string;
        }

        if (!applied.args || /^\([\s\S]+\)$/.test(applied.args)) {
          applied.callback(_this3, applied.name, applied.args.replace(/^\(|\)$/g, ''));
          applied = null;
        }

        setApplied = false;
      });

      return this;
    }

    /**
     * @method Elem#attr
     * @public
     * @param {String|Object.<String, String|ElemValueCallback>} [attr] - Name of the attribute to get or
     * an object of the format { [attrName]: value, ... } to set attributes.
     * @param {String|ElemValueCallback} [value] - If the first argument is a string
     * it should be a value to set for that attribute.
     * @returns {Super|String|Elem} If no arguments passed, D-Wrap of attributes of the first element in the set
     * returned, if 1 string argument is passed the value of the attribute of the first element in the set
     * returned otherwise returns this.
     * @description Method for getting/setting attributes.
     *
     * @example
     * elem.attr('attr1', 'value1'); // attribute attr1 set to 'value1' and this returned
     * elem.attr('attr1');           // 'value1'
     * elem.attr({
     *   attr1: 'value3',            // attribute attr1 set to 'value3'
     *   attr2: 'value2'             // attribute attr2 set to 'value2'
     * });                           // this returned
     * elem.attr().$;                // { attr1: 'value3', attr2: 'value2' }
     */

  }, {
    key: 'attr',
    value: function attr(_attr, value) {
      var elem = getElem(this);

      if (!arguments.length) {
        return new Super(elem.attributes).object(function (o, attr) {
          o[attr.name] = attr.value;
        });
      }

      if (arguments.length <= 1 && isString(_attr)) {
        var ns = attrNSSwitcher(_attr, [new Elem(elem)]);

        return isNull(ns) ? elem.getAttribute(_attr) : elem.getAttributeNS(ns, _attr);
      }

      if (arguments.length >= 2) {
        _attr = defineProperty({}, _attr, value);
      }

      return this.forEach(function (elem, index) {
        if (!isElement(elem)) {
          return;
        }

        new Super(_attr).forEach(function (value, key) {
          if (isNil(value) || value === false) {
            return new Elem(elem).removeAttr(key);
          }

          if (isFunction(value)) {
            value = value(new Elem(elem).attr(key), elem, index);
          }

          if (isNil(value) || value === false) {
            return new Elem(elem).removeAttr(key);
          }

          value = value === true ? '' : value;

          var ns = attrNSSwitcher(key, [new Elem(elem)]);

          if (isNull(ns)) {
            elem.setAttribute(key, value);
          } else {
            elem.setAttributeNS(ns, key, value);
          }
        });
      });
    }

    /**
     * @method Elem#blob
     * @public
     * @param {Object} [options = {}] - Options that are passed into {@link blob}.
     * @returns {Promise.<BlobObject>} New instance of promise.
     * @description Returns a {@link BlobObject} Promise. Works with image or canvas first element.
     *
     * @example
     * image.blob().then((blob) => console.log(blob));  // BlobObject
     * canvas.blob().then((blob) => console.log(blob)); // BlobObject
     */

  }, {
    key: 'blob',
    value: function blob() {
      var _this4 = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return new Promise$1(function (resolve, reject) {
        var elem = _this4.first();
        var name = elem.name;


        if (name !== 'img' && name !== 'canvas') {
          reject(new Error('First element in the set isn\'t an image or a canvas! (Elem#blob)'));
        }

        if (name === 'canvas') {
          return resolve(elem);
        }

        elem.load().then(function () {
          if (elem.isBroken()) {
            return reject(new Error('The image is broken! (Elem#blob)'));
          }

          var canvas = new Elem(nativeDocument).canvas();
          var width = elem.width();
          var height = elem.height();

          canvas.width(width).height(height).drawImage(elem.$[0], 0, 0);

          resolve(canvas);
        });
      }).then(function (canvas) {
        var dataURL = canvas.dataURL();
        var byteString = atob(dataURL.split(',')[1]);
        var length = byteString.length;
        var ab = new ArrayBuffer(length);
        var ia = new Uint8Array(ab);

        iterate$1(length, function (i) {
          ia[i] = byteString.charCodeAt(i);
        });

        return blob$1(ab, options);
      });
    }

    /**
     * @method Elem#blur
     * @returns {Elem} Returns this.
     * @see https://developer.mozilla.org/en/docs/Web/API/HTMLElement/blur
     * @description Synonym for
     * [HTMLElement#blur]{@link https://developer.mozilla.org/en/docs/Web/API/HTMLElement/blur}.
     */

  }, {
    key: 'blur',
    value: function blur() {
      return this.forEach(function (elem) {
        if (isElement(elem)) {
          elem.blur();
        }
      });
    }

    /**
     * @method Elem#calcCSS
     * @param {String} [pseudo] - See the link.
     * @returns {CSSStyleDeclaration} See the link.
     * @see https://developer.mozilla.org/en/docs/Web/API/Window/getComputedStyle
     * @description Synonym for
     * [getComputedStyle]{@link https://developer.mozilla.org/en/docs/Web/API/Window/getComputedStyle}.
     * Returns computed style for the first element in the set or undefined.
     */

  }, {
    key: 'calcCSS',
    value: function calcCSS() {
      var pseudo = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      return getComputedStyle(getElem(this), pseudo);
    }

    /**
     * @method Elem#changeRule
     * @public
     * @param {String} name - Name of the rule.
     * @param {Object.<String, String>} style - Style for the selector.
     * @returns {Elem} Returns this.
     * @description Method for changing css styles in the first style tag in the set.
     * Note: style element should be inside the document.
     *
     * @example
     * style.changeRule('img-size', {
     *   width: '50px !important',
     *   height: '50px !important'
     * });
     */

  }, {
    key: 'changeRule',
    value: function changeRule(name, style) {
      this.some(function (elem) {
        if (getName(elem) === 'style') {
          var _ref = new Arr(elem.sheet.cssRules).find(function (rule) {
            return rule.dwayneData && rule.dwayneData.name === name;
          }) || {};

          var rule = _ref.value;


          if (rule) {
            new Elem(rule).css(style);

            return true;
          }
        }
      });

      return this;
    }

    /**
     * @method Elem#child
     * @public
     * @param {Number|String|Elem|Element|Element[]} element - If the argument is a number a wrap of the set of the children
     * of this index of each element in the set returned otherwise an element to put into this element, a collection
     * or a selector of it.
     * @param {Boolean} end - If the elements should be inserted to the end. If false they are inserted to the start.
     * @returns {Elem} Returns a wrap of children or inserted elements.
     * @description Method is similar to
     * [Node#appendChild]{@link https://developer.mozilla.org/en/docs/Web/API/Node/appendChild}.
     *
     * @example
     * const child = elem.child(1);
     *
     * elem.child(elem2);
     * elem.child(document.getElementById('id'));
     * elem.child('#id div.c1');
     */

  }, {
    key: 'child',
    value: function child(element) {
      var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (isInteger(element) && element >= 0) {
        return this.children().elem(element);
      }

      return toFind(element).into(this, end);
    }

    /**
     * @method Elem#children
     * @public
     * @returns {Elem} D-Wrap of the children of the first element in the set.
     * @description Method for getting element's children.
     *
     * @example
     * const children = elem.children();
     */

  }, {
    key: 'children',
    value: function children() {
      return new Elem(this.length ? this.$[0].childNodes : []);
    }

    /**
     * @method Elem#class
     * @public
     * @param {String} [cls] - If it's present it has to contain class attribute to set.
     * @returns {Arr|Elem} If the argument is present this returned otherwise a wrap of the classes array returned.
     * @description Method for getting/setting classes.
     *
     * @example
     * elem.class('c1 c2'); // class set to 'c1 c2'
     * elem.class().$;      // ['c1', 'c2']
     */

  }, {
    key: 'class',
    value: function _class(cls) {
      if (!arguments.length) {
        return new Arr(getElem(this).className.split(' '));
      }

      return this.forEach(function (elem) {
        if (isElement(elem)) {
          elem.className = cls;
        }
      });
    }

    /**
     * @method Elem#click
     * @returns {Elem} Returns this.
     * @see https://developer.mozilla.org/en/docs/Web/API/HTMLElement/click
     * @description Synonym for
     * [HTMLElement#click]{@link https://developer.mozilla.org/en/docs/Web/API/HTMLElement/click}.
     */

  }, {
    key: 'click',
    value: function click$1() {
      return this.forEach(function (elem) {
        if (isElement(elem)) {
          elem.click();
        }
      });
    }

    /**
     * @method Elem#clone
     * @public
     * @param {Boolean|*} [deep = false] - See thee link.
     * @returns {Elem} New instance of Elem.
     * @see https://developer.mozilla.org/en/docs/Web/API/Node/cloneNode
     * @description Synonym for
     * [Node#cloneNode]{@link https://developer.mozilla.org/en/docs/Web/API/Node/cloneNode}.
     */

  }, {
    key: 'clone',
    value: function clone() {
      var deep = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      return this.object(function (elems, elem) {
        elems.add(elem.cloneNode(!!deep));
      }, new Elem());
    }

    /**
     * @method Elem#closest
     * @public
     * @param {String} selector - See the link.
     * @returns {Elem} Set of the closest elements.
     * @description Synonym for
     * [Element#closest]{@link https://developer.mozilla.org/en/docs/Web/API/Element/closest}.
     */

  }, {
    key: 'closest',
    value: function closest(selector) {
      return this.object(function (elems, elem) {
        while (elem) {
          if (new Elem(elem).is(selector)) {
            return elems.add(elem);
          }

          elem = elem.parentNode;
        }
      }, new Elem());
    }

    /**
     * @method Elem#contains
     * @public
     * @param {String|Elem|Element} element - Element to find out if it's within the first element
     * in the set or a selector of it.
     * @returns {Boolean} Returns if the argument within this element.
     * @description Method is extension for
     * [Node#contains]{@link https://developer.mozilla.org/en/docs/Web/API/Node/contains}.
     *
     * @example
     * elem1.contains(elem2);   // true|false
     * elem.contains(selector); // true|false
     */

  }, {
    key: 'contains',
    value: function contains(element) {
      element = toFind(element);

      return getElem(this).contains(getElem(element));
    }

    /**
     * @method Elem#create
     * @public
     * @param {String} type - Type of created element. If type is "#text" a text node is created.
     * If type is "#comment" a comment node is created.
     * @param {...String} appliedExpressions - Strings that are passed into {@link Elem#apply}.
     * @returns {Elem} New instance of Elem - wrap of the created elements.
     * @description Method for creating elements inside this element.
     * If this element is not an Element the element is just created.
     *
     * @example
     * elem.create('div', '#id .c1 .c2 *Some text*');
     *
     * // also there are shorthands for almost every HTML-element
     * elem.div();
     * elem.input('$type(checkbox) $name(country)');
     */

  }, {
    key: 'create',
    value: function create(type) {
      for (var _len4 = arguments.length, appliedExpressions = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        appliedExpressions[_key4 - 1] = arguments[_key4];
      }

      return this.object(function (elems, elem) {
        var element = new Elem(typeSwitcher(type, [new Elem(elem)]));

        element.into(elem);

        elems.add(element.apply.apply(element, appliedExpressions));
      }, new Elem());
    }

    /**
     * @method Elem#createComment
     * @public
     * @param {String} text - Text of the comment.
     * @returns {Elem} New instance of Elem - wrap of the created comments.
     * @description Method for creating comments inside this element.
     * If this element is not an Element the comment is just created.
     *
     * @example
     * elem.createComment('comment');
     */

  }, {
    key: 'createComment',
    value: function createComment(text) {
      return this.create('#comment').text(text);
    }

    /**
     * @method Elem#createText
     * @public
     * @param {String} text - Text.
     * @returns {Elem} New instance of Elem - wrap of the created text nodes.
     * @description Method for creating text nodes inside this element.
     * If this element is not an Element the text node is just created.
     *
     * @example
     * elem.createText('text');
     */

  }, {
    key: 'createText',
    value: function createText(text) {
      return this.create('#text').text(text);
    }

    /**
     * @method Elem#css
     * @public
     * @param {String|Object.<String, String|ElemValueCallback>} [property] - Name of the property to get or
     * an object of the format { [property]: value, ... } to set styles.
     * @param {String|ElemValueCallback} [value] - If the first argument is a string it should be a value to set for that property.
     * @returns {Super|String|Elem} If no arguments passed, D-Wrap of css styles of the element returned,
     * if 1 string argument is passed the value of the property returned otherwise returns this.
     * @description Method for getting/setting styles. Supports !important.
     *
     * @example
     * elem.css('display', 'none'); // display set to 'none' and this returned
     * elem.css('display');         // 'none'
     * elem.css({
     *   display: 'inline',         // display set to 'inline'
     *   cursor: 'pointer'          // cursor set to 'pointer'
     * });                          // this returned
     * elem.css().$;                // { display: 'none', cursor: 'pointer' }
     */

  }, {
    key: 'css',
    value: function css(property, value) {
      var style = getElem(this).style;

      if (isStyleRule(this.$[0])) {
        style = this.$[0].style;
      }

      if (!arguments.length) {
        return new Str(style.cssText).split(/; ?/).object(function (o, value) {
          if (value) {
            property = value.split(/: /);

            o[new Str(property[0]).toCamelCase().$] = property[1];
          }
        });
      }

      if (arguments.length <= 1 && isString(property)) {
        property = new Str(property).toHyphenCase().$;

        return style.getPropertyValue(property) + (style.getPropertyPriority(property) ? ' !important' : '');
      }

      if (arguments.length >= 2) {
        property = defineProperty({}, property, value);
      }

      return this.forEach(function (elem, index) {
        if (!isElement(elem) && !isStyleRule(elem)) {
          return;
        }

        new Super(property).forEach(function (value, property) {
          if (isNil(value)) {
            return new Elem(elem).removeCSS(property);
          }

          property = new Str(property).toHyphenCase().$;

          if (isFunction(value)) {
            value = value(new Elem(elem).css(property), elem, index);
          }

          if (isNil(value)) {
            return new Elem(elem).removeAttr(key);
          }

          elem.style.removeProperty(property);
          elem.style.setProperty(property, value.replace(/ ?!important$/, ''), /!important$/.test(value) ? 'important' : '');
        });
      });
    }

    /**
     * @method Elem#ctx
     * @public
     * @param {String|Object|CtxCallback} [property] - If present and object
     * it's assigned to the canvas rendering context, if function
     * it's called with canvas rendering context argument, if string
     * the value from the second argument is used for assigning
     * this property to canvas rendering context and if not present
     * canvas rendering context returned.
     * @param {*} [value] - See the property argument.
     * @returns {CanvasRenderingContext2D|Elem}
     * @description Rendering context of the first canvas in the set.
     *
     * @example
     * canvas.ctx; // CanvasRenderingContext2D
     */

  }, {
    key: 'ctx',
    value: function ctx(property, value) {
      var ctx = void 0;

      this.some(function (elem) {
        if (getName(elem) === 'canvas') {
          ctx = elem.dwayneData.ctx;

          return true;
        }
      });

      if (!arguments.length) {
        return ctx;
      }

      if (!ctx) {
        return this;
      }

      if (isFunction(property)) {
        property(ctx);
      } else {
        if (arguments.length >= 2) {
          property = defineProperty({}, property, value);
        }

        assign$1(ctx, property);
      }

      return this;
    }

    /**
     * @method Elem#data
     * @public
     * @param {String|Object.<String, String|ElemValueCallback>} [key] - Name of the data attribute (without data- prefix)
     * to get or an object of the format { [attrName]: value, ... } to set attributes.
     * @param {String|ElemValueCallback} [value] - If the first argument is a string it should be a value to set for that attribute.
     * @returns {Super|String|Elem} If no arguments passed, D-Wrap of dataset of the element returned,
     * if 1 string argument is passed the value of the data attribute returned otherwise returns this.
     * @description Method for getting/setting data attributes. See
     * [HTMLElement#dataset]{@link https://developer.mozilla.org/en/docs/Web/API/HTMLElement/dataset}.
     *
     * @example
     * elem.data('someKey1', 'value'); // attribute data-some-key1 set to 'value1' and this returned
     * elem.data('someKey1');          // 'value1'
     * elem.data({
     *   someKey1: 'value3',           // attribute data-some-key1 set to 'value3'
     *   someKey2: 'value2'            // attribute data-some-key2 set to 'value2'
     * });                             // this returned
     * elem.data().$;                  // { someKey1: 'value3', someKey2: 'value2' }
     */

  }, {
    key: 'data',
    value: function data(key, value) {
      var dataset = getElem(this).dataset;

      if (!arguments.length) {
        return new Super(dataset).object(function (o, value, key) {
          o[key] = value;
        });
      }

      if (arguments.length === 1 && isString(key)) {
        return dataset[key];
      }

      if (arguments.length >= 2) {
        key = defineProperty({}, key, value);
      }

      return this.forEach(function (elem, index) {
        if (!isElement(elem)) {
          return;
        }

        iterate(key, function (value, key) {
          elem.dataset[key] = isFunction(value) ? value(elem.dataset[key], elem, index) : value;
        });
      });
    }

    /**
     * @method Elem#dataURL
     * @param {String} [type = 'image/png'] - See the link
     * @param {Number} [encoderOptions = 0.92] - See the link.
     * @returns {String} Data URL for the first canvas element in the set.
     * @see https://developer.mozilla.org/en/docs/Web/API/HTMLCanvasElement/toDataURL
     * @description Synonym for
     * [HTMLCanvasElement#toDataURL]{@link https://developer.mozilla.org/en/docs/Web/API/HTMLCanvasElement/toDataURL}.
     *
     * @example
     * canvas.dataURL();
     */

  }, {
    key: 'dataURL',
    value: function dataURL(type, encoderOptions) {
      var ctx = this.ctx();

      if (!ctx) {
        return '';
      }

      return ctx.canvas.toDataURL.apply(ctx.canvas, arguments);
    }

    /**
     * @method Elem#deleteRule
     * @public
     * @param {String} name - Name of the rule.
     * @returns {Elem} Returns this.
     * @description Method for deleting css styles in a style tag.
     * Note: style element should be inside the document.
     *
     * @example
     * style.deleteRule('img-size');
     */

  }, {
    key: 'deleteRule',
    value: function deleteRule(name) {
      this.some(function (elem) {
        if (getName(elem) === 'style') {
          var rule = new Arr(elem.sheet.cssRules).find(function (rule) {
            return rule.dwayneData && rule.dwayneData.name === name;
          });

          if (rule) {
            elem.sheet.deleteRule(rule.key);

            return true;
          }
        }
      });

      return this;
    }

    /**
     * @method Elem#dispatch
     * @public
     * @param {String|Event} event - Event or a string (new Event(event) is created).
     * @param {Object} [eventInit = {}] - See the link.
     * @param {Boolean} [eventInit.bubbles = true] - See the link.
     * @param {Boolean} [eventInit.cancelable = true] - See the link.
     * @param {Object} [details = {}] - Object that is assigned to the event.
     * @returns {Elem} Returns this.
     * @see https://developer.mozilla.org/en/docs/Web/API/Event/Event
     * @description Synonym for
     * [EventTarget#dispatchEvent]{@link https://developer.mozilla.org/en/docs/Web/API/EventTarget/dispatchEvent}.
     *
     * @example
     * elem.dispatch('click');
     * elem.dispatch('click', { bubbles: false, cancellable: false });
     * elem.dispatch(new CustomEvent('custom-event'));
     */

  }, {
    key: 'dispatch',
    value: function dispatch(event) {
      var eventInit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var details = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var _ref2 = eventInit || {};

      var _ref2$bubbles = _ref2.bubbles;
      var bubbles = _ref2$bubbles === undefined ? true : _ref2$bubbles;
      var _ref2$cancelable = _ref2.cancelable;
      var cancelable = _ref2$cancelable === undefined ? true : _ref2$cancelable;

      var finalEvent = event;

      if (!/Event$/.test(toStringTag(finalEvent))) {
        try {
          finalEvent = new Event(finalEvent, { bubbles: bubbles, cancelable: cancelable });
        } catch (err) {
          finalEvent = nativeDocument.createEvent('Event');
          finalEvent.initEvent(event, bubbles, cancelable);
        }

        assign$1(finalEvent, details);
      }

      return this.forEach(function (elem) {
        if (isElement(elem)) {
          elem.dispatchEvent(finalEvent);
        }
      });
    }

    /**
     * @method Elem#elem
     * @public
     * @param {Number} [index = 0] - Index of the element of the set to get. Negative index means elem.length + index.
     * @returns {Elem} New instance of Elem.
     *
     * @example
     * elem.elem(1); // a wrap of the element in the set that has index 1
     * elem.elem();  // a wrap of the element in the set that has index 0
     */

  }, {
    key: 'elem',
    value: function elem() {
      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      if (index < 0) {
        index = this.length + index;
      }

      return new Elem(this.$[index]);
    }

    /**
     * @method Elem#filter
     * @public
     * @param {String|Function|Element[]|Elem} [selector = Boolean] - If it's a string the method filters elements with the selector
     * otherwise super.filter is called.
     * @returns {Elem} New instance of Elem.
     * @description Method for filtering elements.
     *
     * @example
     * elem.filter((elem) => new Elem(elem).closest('.parent'));
     * elem.filter(elemsInArray);
     * elem.filter(elemsInElem);
     * elem.filter('.child');
     */

  }, {
    key: 'filter',
    value: function filter() {
      var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Boolean;

      return new Elem(get$1(Elem.prototype.__proto__ || Object.getPrototypeOf(Elem.prototype), 'filter', this).call(this, filterSwitcher(selector)));
    }

    /**
     * @method Elem#find
     * @public
     * @param {String|Function} selector - Selector to find.
     * @returns {Elem|{ key: Key, value: * }|null} New instance of Elem if selector is a string
     * otherwise super.find is called.
     * @description Synonym for
     * [Element#querySelectorAll]{@link https://developer.mozilla.org/en/docs/Web/API/Element/querySelectorAll}.
     */

  }, {
    key: 'find',
    value: function find(selector) {
      if (!isString(selector)) {
        return get$1(Elem.prototype.__proto__ || Object.getPrototypeOf(Elem.prototype), 'find', this).call(this, selector);
      }

      return this.object(function (elems, elem) {
        elems.add(_find(selector, elem));
      }, new Elem());
    }

    /**
     * @method Elem#first
     * @public
     * @returns {Elem} New instance of Elem.
     * @description Synonym for elem.elem(0).
     */

  }, {
    key: 'first',
    value: function first() {
      return this.elem(0);
    }

    /**
     * @method Elem#firstChild
     * @public
     * @param {String} [selector = null] - If present, finds first child in every elem that matches the selector.
     * If not, finds first child of each element in the set.
     * @returns {Elem} New instance of Elem.
     * @description Method for finding first children of each element in the set.
     *
     * @example
     * elem.first();       // finds first child of each element in the elem set
     * elem.first('.foo'); // find first child that has foo class of each element in the set
     */

  }, {
    key: 'firstChild',
    value: function firstChild() {
      var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      return this.object(function (elems, elem) {
        var _ref3 = new Elem(elem).children().find(function (elem) {
          return new Elem(elem).is(selector);
        }) || {};

        var found = _ref3.value;


        elems.add(found);
      }, new Elem());
    }

    /**
     * @method Elem#focus
     * @returns {Elem} Returns this.
     * @see https://developer.mozilla.org/en/docs/Web/API/HTMLElement/focus
     * @description Synonym for
     * [HTMLElement#focus]{@link https://developer.mozilla.org/en/docs/Web/API/HTMLElement/focus}.
     */

  }, {
    key: 'focus',
    value: function focus() {
      return this.forEach(function (elem) {
        if (isElement(elem)) {
          elem.focus();
        }
      });
    }

    /**
     * @method Elem#getRule
     * @public
     * @param {String} name - Name of the rule.
     * @returns {{ selector: (String|void), rules: Object }} Set of the css rules.
     * @description Method for getting set of the rules under the name.
     * Note: style element should be inside the document.
     *
     * @example
     * style.addRule('img-size', 'img.square', {
     *   width: '40px',
     *   height: '40px'
     * });
     * style.getRule('img-size');
     * // {
     * //   selector: 'img.square',
     * //   rules: {
     * //     width: '40px',
     * //     height: '40px'
     * //   }
     * // }
     */

  }, {
    key: 'getRule',
    value: function getRule(name) {
      var found = {
        selector: undefined,
        rules: {}
      };

      this.some(function (elem) {
        if (getName(elem) === 'style') {
          var _ref4 = new Arr(elem.sheet.cssRules).find(function (rule) {
            return rule.dwayneData && rule.dwayneData.name === name;
          }) || {};

          var rule = _ref4.value;


          if (rule) {
            found = {
              selector: rule.selectorText,
              rules: new Elem(rule).css().$
            };

            return true;
          }
        }
      });

      return found;
    }

    /**
     * @method Elem#hasAttr
     * @public
     * @param {String} attr - Name of the attribute.
     * @returns {Boolean} If the first element in the set has the attribute.
     * @description Method that returns if the first element in the set has the attribute or not.
     *
     * @example
     * elem.attr('attr', 'value').hasAttr('attr'); // true
     * elem.removeAttr('attr').hasAttr('attr');    // false
     */

  }, {
    key: 'hasAttr',
    value: function hasAttr(attr) {
      var elem = getElem(this);
      var ns = attrNSSwitcher(attr, [new Elem(elem)]);

      return isNull(ns) ? elem.hasAttribute(attr) : elem.hasAttributeNS(ns, attr);
    }

    /**
     * @method Elem#hasClass
     * @public
     * @param {String} cls - Name of the class.
     * @returns {Boolean} If the first element in the set has the class.
     * @description Method that returns if the first element in the set has the class or not.
     *
     * @example
     * elem.addClass('cls').hasClass('cls');    // true
     * elem.removeClass('cls').hasClass('cls'); // false
     */

  }, {
    key: 'hasClass',
    value: function hasClass(cls) {
      return getElem(this).classList.contains(cls);
    }

    /**
     * @method Elem#height
     * @public
     * @param {*|ElemValueCallback} [height] - Height to set.
     * @returns {Elem|String} If no arguments passed height of the first element in the set returned.
     * Otherwise all elements heights in the set are set to the height argument.
     * @description Gets or sets height.
     *
     * @example
     * elem.height(123);
     * elem.height(); // 123
     */

  }, {
    key: 'height',
    value: function height(_height) {
      return this.prop.apply(this, new Arr(arguments).unshift('height').$);
    }

    /**
     * @method Elem#hide
     * @public
     * @returns {Elem} Returns this.
     * @description Hides all elements in the set.
     *
     * @example
     * elem.hide();
     */

  }, {
    key: 'hide',
    value: function hide() {
      return this.forEach(function (elem) {
        elem = new Elem(elem);

        var currentDisplay = elem.css('display');

        if (currentDisplay.indexOf('none')) {
          elem.prop('dwayneData').previousDisplay = currentDisplay;
        }

        elem.css('display', 'none !important');
      });
    }

    /**
     * @method Elem#html
     * @public
     * @param {String|ElemValueCallback|*} [html] - HTML to write instead of current HTML.
     * @returns {Elem|String} If no arguments passed HTML of the first element in the set returned.
     * Otherwise all elements HTML in the set are set to the html argument.
     * @description Gets or sets HTML.
     *
     * @example
     * elem.html('<div>1</div>');
     * elem.html(); // '<div>1</div>'
     */

  }, {
    key: 'html',
    value: function html(_html) {
      if (!arguments.length) {
        return getElem(this).innerHTML;
      }

      return this.forEach(function (elem, index) {
        if (isElement(elem)) {
          elem.innerHTML = isFunction(_html) ? _html(elem.innerHTML, elem, index) : _html;
        }
      });
    }

    /**
     * @method Elem#id
     * @public
     * @param {String|*} [id] - Id to set.
     * @returns {Elem|String} If no arguments passed id of the first element in the set returned.
     * Otherwise all elements ids in the set are set to the id argument.
     * @description Gets id or sets ids.
     *
     * @example
     * elem.id('unique');
     * elem.id(); // 'unique'
     */

  }, {
    key: 'id',
    value: function id(_id) {
      if (!arguments.length) {
        return getElem(this).id;
      }

      return this.forEach(function (elem) {
        if (isElement(elem)) {
          elem.id = _id;
        }
      });
    }

    /**
     * @member {Number} Elem#innerHeight
     * @type {Number}
     * @public
     * @readonly
     * @description Getter for finding how much height content of the first element can be.
     *
     * @example
     * elem.css({
     *   boxSizing: 'border-box',
     *   height: '200px',
     *   paddingTop: '2px',
     *   paddingBottom: '3px',
     *   borderTop: '1px solid black',
     *   borderBottom: '4px solid black'
     * }).innerHeight; // 190
     * elem
     *   .css('box-sizing', 'content-box')
     *   .innerHeight; // 200
     * elem
     *   .css('box-sizing', 'padding-box')
     *   .innerHeight; // 195
     */

  }, {
    key: 'insertAfter',


    /**
     * @method Elem#insertAfter
     * @public
     * @param {String|Elem|Element} element - Element to insert this element after or a selector of it.
     * @returns {Elem} Returns this.
     * @description Puts the elements from the set after the element specified by the argument.
     * The elements remain in the same order.
     *
     * @example
     * elem.insertAfter(elem2);
     * elem.insertAfter(document.getElementById('id'));
     * elem.insertAfter('#id div.c1');
     */
    value: function insertAfter(element) {
      element = toFind(element).first();

      var parent = element.parent();

      if (!parent.length) {
        return this;
      }

      element = element.next().$[0];
      parent = parent.$[0];

      return this.forEach(function (elem) {
        if (elem === element) {
          element = element.nextSibling;

          return;
        }

        if (element) {
          parent.insertBefore(elem, element);
        } else {
          parent.appendChild(elem);
        }
      });
    }

    /**
     * @method Elem#insertBefore
     * @public
     * @param {String|Elem|Element} element - Element to insert this element before or a selector of it.
     * @returns {Elem} Returns this.
     * @description Puts the elements from the set before the element specified by the argument.
     * The elements remain in the same order.
     *
     * @example
     * elem.insertBefore(elem2);
     * elem.insertBefore(document.getElementById('id'));
     * elem.insertBefore('#id div.c1');
     */

  }, {
    key: 'insertBefore',
    value: function insertBefore(element) {
      element = toFind(element).first();

      var parent = element.parent();

      if (!parent.length) {
        return this;
      }

      element = element.$[0];
      parent = parent.$[0];

      return this.forEach(function (elem) {
        parent.insertBefore(elem, element);
      });
    }

    /**
     * @method Elem#into
     * @public
     * @param {String|Elem|Element} element - Element to put this elements into or a selector of it.
     * @param {Boolean} end - If the elements should be inserted to the end. If false they are inserted to the start.
     * @returns {Elem} Returns this.
     * @description Method is similar to
     * [Node#appendChild]{@link https://developer.mozilla.org/en/docs/Web/API/Node/appendChild}.
     *
     * @example
     * elem.into(elem2);
     * elem.into(document.getElementById('id'));
     * elem.into('#id div.c1');
     */

  }, {
    key: 'into',
    value: function into(element) {
      var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      element = toFind(element).$[0];

      if (!element || isWindow(element) || isHTMLDocument(element) || isCommentOrText(element)) {
        return this;
      }

      if (!end && element.firstChild) {
        return this.forEachReverse(function (elem) {
          element.insertBefore(elem, element.firstChild);
        });
      }

      return this.forEach(function (elem) {
        element.appendChild(elem);
      });
    }

    /**
     * @method Elem#is
     * @public
     * @param {String} selector
     * @returns {Boolean} If the first element in the set matches the selector.
     * If the selector is undefined or null always returns true. If it's not for not elements
     * entries returns false.
     * @description Synonym for
     * [Element#matches]{@link https://developer.mozilla.org/en/docs/Web/API/Element/matches}.
     *
     * @example
     * elem.addClass('cls');
     * elem.is('.cls');         // true
     *
     * elem.removeClass('cls');
     * elem.is('.cls');         // false
     */

  }, {
    key: 'is',
    value: function is(selector) {
      if (isNull(selector)) {
        return true;
      }

      var elem = getElem(this);
      var matches = elem.matches || elem.matchesSelector || elem.webkitMatchesSelector || elem.mozMatchesSelector || elem.msMatchesSelector || elem.oMatchesSelector;

      if (!isElement(this.$[0])) {
        return false;
      }

      try {
        return matches.call(elem, selector);
      } catch (err) {
        console.error('Selector \'' + selector + '\' is not a valid selector (Elem#is)');

        return false;
      }
    }

    /**
     * @method Elem#isBroken
     * @public
     * @returns {Boolean} If the first image in the set is broken.
     * @description Returns if the first element in the set is broken. Not image and not loaded image is considered proper.
     *
     * @example
     * const img = elem.img().on({
     *   'load': onload,
     *   'error': onload
     * });
     *
     * onload = () => {
     *   console.log(img.isBroken()); // true
     * };
     *
     * img.ref('/some/non-existent/site/not-found.png');
     */

  }, {
    key: 'isBroken',
    value: function isBroken() {
      var isBroken = false;

      this.some(function (elem) {
        if (getName(elem) === 'img') {
          isBroken = !!(elem.complete && (!elem.naturalWidth || !elem.naturalHeight));

          return true;
        }
      });

      return isBroken;
    }

    /**
     * @method Elem#isWithinDocument
     * @public
     * @returns {Boolean} Returns if the first element in the set is within the document or not.
     * @description Returns if the first element in the set is within the document or not.
     *
     * @example
     * new Elem(document.body).isWithinDocument();  // true
     * new Elem(document).div().isWithinDocument(); // false
     */

  }, {
    key: 'isWithinDocument',
    value: function isWithinDocument() {
      return this.first().closest('html').length !== 0;
    }

    /**
     * @method Elem#last
     * @public
     * @returns {Elem} New instance of Elem.
     * @description Synonym for elem.elem(-1).
     */

  }, {
    key: 'last',
    value: function last() {
      return this.elem(-1);
    }

    /**
     * @method Elem#lastChild
     * @public
     * @param {String} [selector = null] - If present, finds last child in every elem that matches the selector.
     * If not, finds last child of each element in the set.
     * @returns {Elem} New instance of Elem.
     * @description Method for finding last children of each element in the set.
     *
     * @example
     * elem.last();       // finds last child of each element in the elem set
     * elem.last('.foo'); // find last child that has 'foo' class of each element in the set
     */

  }, {
    key: 'lastChild',
    value: function lastChild() {
      var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      return this.object(function (elems, elem) {
        var _ref5 = new Elem(elem).children().reverse().find(function (elem) {
          return new Elem(elem).is(selector);
        }) || {};

        var found = _ref5.value;


        elems.add(found);
      }, new Elem());
    }

    /**
     * @method Elem#load
     * @public
     * @returns {Promise.<{ proper: Elem, broken: Elem }>} Promise with broken and proper images.
     * @description Loads each image in the set and puts it to the proper or broken array.
     *
     * @example
     * images.load().then(({ broken }) => {
     *   broken.filter('img').ref('/fallback.png');
     * });
     */

  }, {
    key: 'load',
    value: function load() {
      var images = {
        proper: new Elem(),
        broken: new Elem()
      };

      return Promise$1.all(this.filter(function (elem) {
        return getName(elem) === 'img';
      }).map(function (elem) {
        var $elem = new Elem(elem);

        if (elem.complete) {
          images[$elem.isBroken() ? 'broken' : 'proper'].push(elem);

          return;
        }

        return new Promise$1(function (resolve) {
          var removeListeners = $elem.on({
            load: function load() {
              images.proper.add(elem);

              removeListeners();
              resolve();
            },
            error: function error() {
              images.broken.add(elem);

              removeListeners();
              resolve();
            }
          });
        });
      }).$).then(function () {
        return images;
      });
    }

    /**
     * @method Elem#moveAttr
     * @public
     * @param {String} attr - Attribute to move to the first element.
     * @param {String} [value = ''] - Value to set for the attribute. If not set attribute of the previous element or '' used.
     * @returns {Elem} Returns this.
     * @description Method for moving an attribute from previous element to the next one (first element in this set).
     *
     * @example
     * elem1.moveAttr('attr', 'value');     // attribute 'attr' set to 'value' on elem1
     * elem2.moveAttr('attr');              // attribute 'attr' removed from elem1. set to 'value' on elem2
     * elem3.moveAttr('attr', 'new value'); // attribute 'attr' removed from elem2. set to 'new value' on elem3
     */

  }, {
    key: 'moveAttr',
    value: function moveAttr(attr) {
      var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      var prev = attrs[attr];
      var elem = this.elem();

      if (prev && elem.length) {
        if (arguments.length < 2) {
          value = prev.attr(attr);
        }

        prev.removeAttr(attr);
      }

      if (elem.length) {
        attrs[attr] = elem.attr(attr, value);
      }

      return this;
    }

    /**
     * @method Elem#moveClass
     * @public
     * @param {String} cls - Class to move to the first element.
     * @returns {Elem} Returns this.
     * @description Method for moving a class from previous element to the next one (first element in this set).
     *
     * @example
     * elem1.moveClass('cls'); // class 'cls' added to elem1
     * elem2.moveClass('cls'); // class 'cls' removed from elem1. added to elem1
     */

  }, {
    key: 'moveClass',
    value: function moveClass(cls) {
      var prev = classes[cls];
      var elem = this.elem();

      if (prev && elem.length) {
        prev.removeClass(cls);
      }

      if (elem.length) {
        classes[cls] = elem.addClass(cls);
      }

      return this;
    }

    /**
     * @member {String} Elem#name
     * @type {String}
     * @public
     * @readonly
     * @description nodeName (lowercased) of the first element in the set.
     *
     * @example
     * const elem1 = elem.create('div');
     * elem1.name // 'div'
     */

  }, {
    key: 'next',


    /**
     * @method Elem#next
     * @public
     * @param {String} [selector = null] - If present, finds next element to every elem that matches the selector.
     * If not, finds next element to each element in the set.
     * @returns {Elem} New instance of Elem.
     * @description Method for finding next element to each element in the set.
     *
     * @example
     * elem.next();       // finds next element to each element in the set
     * elem.next('.foo'); // finds next element to each element that has 'foo' class
     */
    value: function next() {
      var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      return this.object(function (elems, elem) {
        /* eslint no-cond-assign: 0 */
        while (elem = elem.nextSibling) {
          if (new Elem(elem).is(selector)) {
            return elems.add(elem);
          }
        }
      }, new Elem());
    }

    /**
     * @method Elem#off
     * @public
     * @param {...ElemEventString} events - Events to remove.
     * @returns {Elem} Returns this.
     * @description Method that removes all the listeners from each element in the set specified by the events arguments.
     *
     * @example
     * elem.off('click');
     * elem.off('click, input');
     * elem.off('click, input', 'focus');
     */

  }, {
    key: 'off',
    value: function off() {
      var _arguments2 = arguments;

      for (var _len5 = arguments.length, events = Array(_len5), _key6 = 0; _key6 < _len5; _key6++) {
        events[_key6] = arguments[_key6];
      }

      return this.forEach(function (elem) {
        var listeners = elem.dwayneData.listeners;


        iterate(_arguments2, function (event) {
          iterate(event.split(eventSeparator), function (event) {
            (listeners[event] || new Super()).forEach(function (_ref6) {
              var removeListener = _ref6.removeListener;
              return removeListener();
            });
          });
        });
      });
    }

    /**
     * @method Elem#on
     * @public
     * @param {ElemEventString|Object.<ElemEventString|ElemListener>} event - Either a {@link ElemEventString} string
     * or an object with event keys (a key is also ElemEventString) and listeners values.
     * @param {String} [selector = null] - Selector to filter event targets.
     * @param {ElemListener} [listener] - If the first argument is a string it must be a listener function for
     * specified event(s).
     * @returns {ElemRemoveListeners} Function that takes optional event argument.
     * @description Adds event listeners for all the elements in the set.
     * For debugging: If you need to know what listeners are in work (and what selectors filter targets)
     * you can look at the base property of the only dwayne listener that listens for the event
     * and find all working listeners in listener.base.dwayneData.listeners[event].$.
     *
     * @example
     * elem.on(
     *   'change, input',
     *   'input, select, textarea, datalist, keygen, output',
     *   (e, elem, index) => console.log(elem.value)
     * );
     * elem.on(
     *   'change, input',
     *   (e, elem, index) => console.log(elem.value)
     * );
     * elem.on(
     *   {
     *     'change, input': (e, elem, index) => console.log(elem.value),
     *     'blur': () => console.log('blur')
     *   },
     *   'input, select, textarea, datalist, keygen, output'
     * );
     *
     * const removeListeners = elem.on({
     *   'change, input': (e, elem, index) => console.log(elem.value),
     *   'blur': () => console.log('blur')
     * });
     *
     * removeListeners('click');
     * removeListeners('blur, change');
     * removeListeners('blur, change', 'input');
     * removeListeners();
     */

  }, {
    key: 'on',
    value: function on(event) {
      var selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var listener = arguments[2];

      var allListeners = new Super({});

      if (isFunction(selector)) {
        listener = selector;
        selector = null;
      }

      if (isString(event)) {
        event = defineProperty({}, event, listener);
      }

      event = new Super(event).object(function (listeners, listener, event) {
        iterate(event.split(eventSeparator), function (event) {
          listeners[event] = listener;
        });
      });

      this.forEach(function (elem) {
        if (!isElement(elem) && !isWindow(elem) && !isHTMLDocument(elem)) {
          return;
        }

        var _ref7 = (windowsDwayneData.find(function (_ref9) {
          var element = _ref9.element;
          return element === elem;
        }) || {}).value || elem.dwayneData;

        var listeners = _ref7.listeners;


        event.forEach(function (listener, event) {
          var removeEventListeners = listeners[event] = listeners[event] || new Super({}).define('index', {
            value: 0,
            configurable: true,
            writable: true
          });
          var index = removeEventListeners.prop('index');

          if (!removeEventListeners.has('listener')) {
            var newListener = function newListener(e) {
              removeEventListeners.forEach(function (_ref8) {
                var selector = _ref8.selector;
                var listener = _ref8.listener;

                if (new Elem(e.target).is(selector)) {
                  listener.call(elem, e, elem, index);
                }
              });
            };

            newListener.base = elem;

            elem.addEventListener(event, newListener, false);
            removeEventListeners.define('listener', {
              value: newListener,
              configurable: true,
              writable: true
            });
          }

          var removeListener = function removeListener() {
            removeEventListeners.delete(index);

            if (!removeEventListeners.count) {
              elem.removeEventListener(event, removeEventListeners.prop('listener'), false);
              removeEventListeners.delete('listener');
            }
          };

          allListeners.prop(event, (allListeners.prop(event) || new Arr()).push(removeListener));

          removeEventListeners.assign(defineProperty({
            index: index + 1
          }, index, {
            selector: selector,
            listener: listener,
            removeListener: removeListener
          }));
        });
      });

      return function removeEventListeners(event) {
        if (arguments.length) {
          iterate(arguments, function (event) {
            iterate(event.split(eventSeparator), function (event) {
              if (allListeners.has(event)) {
                allListeners.prop(event).forEach(function (removeListener) {
                  return removeListener();
                });
                allListeners.delete(event);
              }
            });
          });

          return;
        }

        allListeners.forEach(function (removeListeners) {
          removeListeners.forEach(function (removeListener) {
            return removeListener();
          });
        });
      };
    }

    /**
     * @member {Number} Elem#outerHeight
     * @type {Number}
     * @public
     * @readonly
     * @description Getter for finding how much height the element actually is.
     *
     * @example
     * elem.css({
     *   boxSizing: 'border-box',
     *   height: '200px',
     *   paddingTop: '2px',
     *   paddingBottom: '3px',
     *   borderTop: '1px solid black',
     *   borderBottom: '4px solid black'
     *   marginTop: '0px',
     *   marginBottom: '5px'
     * }).outerHeight; // 205
     * elem
     *   .css('box-sizing', 'content-box')
     *   .outerHeight; // 215
     * elem
     *   .css('box-sizing', 'padding-box')
     *   .outerHeight; // 210
     */

  }, {
    key: 'parent',


    /**
     * @method Elem#parent
     * @public
     * @returns {Elem} New instance of Elem.
     * @description Method returns wrap of the set of the parent elements of each element in the set.
     */
    value: function parent() {
      return this.object(function (elems, elem) {
        return elems.add(elem.parentNode);
      }, new Elem());
    }

    /**
     * @method Elem#parentTree
     * @public
     * @returns {Elem} New instance of Elem.
     * @description Returns wrap of all parents of each element in the set.
     *
     * @example
     * elem.parentTree(); // Elem
     */

  }, {
    key: 'parentTree',
    value: function parentTree() {
      return this.object(function (elems, elem) {
        while (elem = elem.parentNode) {
          elems.add(elem);
        }
      }, new Elem());
    }

    /**
     * @method Elem#prev
     * @public
     * @param {String} [selector = null] - If present, finds previous element to every elem that matches the selector.
     * If not, finds previous element to each element in the set.
     * @returns {Elem} New instance of Elem.
     * @description Method for finding previous element to each element in the set.
     *
     * @example
     * elem.next();       // finds previous element to each element in the set
     * elem.next('.foo'); // finds previous element to each element that has 'foo' class
     */

  }, {
    key: 'prev',
    value: function prev() {
      var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      return this.object(function (elems, elem) {
        /* eslint no-cond-assign: 0 */
        while (elem = elem.previousSibling) {
          if (new Elem(elem).is(selector)) {
            return elems.add(elem);
          }
        }
      }, new Elem());
    }

    /**
     * @method Elem#prop
     * @public
     * @param {String|Object.<String, ElemValueCallback|*>} property - Either a string of a property or an assigned object.
     * @param {ElemValueCallback|*} [value] - If a property parameter is a string
     * this has to be an assigned value if it's present.
     * @returns {Elem|*} Returns this if it's setter or a value if getter.
     * @description Method that is either a property getter for the first element in the set
     * or a setter for every element in the set.
     *
     * @example
     * elem.prop('draggable', false);
     * elem.prop('draggable'); // false
     */

  }, {
    key: 'prop',
    value: function prop(property, value) {
      if (arguments.length <= 1 && isString(property)) {
        return this.$[0] ? this.$[0][property] : undefined;
      }

      if (arguments.length >= 2) {
        property = defineProperty({}, property, value);
      }

      return this.forEach(function (elem, index) {
        iterate(property, function (value, prop$$1) {
          elem[prop$$1] = isFunction(value) ? value(elem[prop$$1], elem, index) : value;
        });
      });
    }

    /**
     * @method Elem#ref
     * @public
     * @param {String|ElemValueCallback} [link] - If it's present link to a resource.
     * @returns {Elem|String} If the link argument isn't present it's a getter of the 'src' attribute
     * for the one of following elements: img, script, iframe, audio, video; of the 'action' attribute
     * for a form element and of the 'href' attribute for the rest. If it's present it's a setter
     * of the same attribute for all the element in the set.
     * @description Method for getting resources links and setting them.
     *
     * @example
     * elem.ref('/some/cool/image.png');
     * elem.ref(); // '/some/cool/image.png'
     */

  }, {
    key: 'ref',
    value: function ref(link) {
      if (!arguments.length) {
        return this.attr(refSwitcher(this.name));
      }

      return this.forEach(function (elem) {
        elem = new Elem(elem);

        elem.attr(refSwitcher(elem.name), link);
      });
    }

    /**
     * @method Elem#remove
     * @public
     * @returns {Elem} Returns this.
     * @description Removes all the elements from the set from the document.
     * Note: it doesn't remove them from the set so watch out for the memory leaks.
     *
     * @example
     * elem.remove();
     */

  }, {
    key: 'remove',
    value: function remove() {
      return this.forEach(function (elem) {
        var parent = elem.parentNode;

        if (parent) {
          parent.removeChild(elem);
        }
      });
    }

    /**
     * @method Elem#removeAttr
     * @public
     * @param {...String} attributes - Attributes to remove.
     * @returns {Elem} Returns this.
     * @description Removes all the attributes from arguments from all the elements in the set.
     *
     * @example
     * elem.removeAttr('foo', 'bar', 'baz');
     */

  }, {
    key: 'removeAttr',
    value: function removeAttr() {
      var _arguments3 = arguments;

      for (var _len6 = arguments.length, attributes = Array(_len6), _key7 = 0; _key7 < _len6; _key7++) {
        attributes[_key7] = arguments[_key7];
      }

      return this.forEach(function (elem) {
        if (!isElement(elem)) {
          return;
        }

        iterate(_arguments3, function (attr) {
          var ns = attrNSSwitcher(attr, [new Elem(elem)]);

          if (isNull(ns)) {
            elem.removeAttribute(attr);
          } else {
            elem.removeAttributeNS(ns, attr);
          }
        });
      });
    }

    /**
     * @method Elem#removeClass
     * @public
     * @param {...String} classes - Classes to remove.
     * @returns {Elem} Returns this.
     * @description Removes all the classes from arguments from all the elements in the set.
     *
     * @example
     * elem.removeClass('foo', 'bar', 'baz');
     */

  }, {
    key: 'removeClass',
    value: function removeClass() {
      var _arguments4 = arguments;

      for (var _len7 = arguments.length, classes = Array(_len7), _key8 = 0; _key8 < _len7; _key8++) {
        classes[_key8] = arguments[_key8];
      }

      return this.forEach(function (elem) {
        var list = elem.classList;

        iterate(isElement(elem) && _arguments4, function (cls) {
          return list.remove(cls);
        });
      });
    }

    /**
     * @method Elem#removeCSS
     * @public
     * @param {...String} props - CSS properties to remove.
     * @returns {Elem} Returns this.
     * @description Removes all the CSS properties from arguments from all the elements in the set.
     *
     * @example
     * elem.removeCSS('display', 'position', 'margin');
     */

  }, {
    key: 'removeCSS',
    value: function removeCSS() {
      var _arguments5 = arguments;

      for (var _len8 = arguments.length, props = Array(_len8), _key9 = 0; _key9 < _len8; _key9++) {
        props[_key9] = arguments[_key9];
      }

      return this.forEach(function (elem) {
        if (!isElement(elem)) {
          return;
        }

        iterate(_arguments5, function (css) {
          elem.style.removeProperty(css);
        });
      });
    }

    /**
     * @method Elem#replace
     * @public
     * @param {String|Elem|Element} element - Element to replace the first element in the set
     * with a set of elements specified by the argument (Element, set of elements or a selector of them).
     * @returns {Elem} Returns this.
     * @description Method is similar to
     * [Node#replaceChild]{@link https://developer.mozilla.org/en/docs/Web/API/Node/replaceChild}.
     *
     * @example
     * elem.replace(elem2);
     * elem.replace(document.getElementById('id'));
     * elem.replace('#id div.c1');
     */

  }, {
    key: 'replace',
    value: function replace(element) {
      element = toFind(element);

      var parent = this.first().parent();

      if (!parent.length) {
        return this;
      }

      var elem = parent;
      var method$$1 = 'into';
      var next = this.next().first().$[0];
      var prev = this.prev().first().$[0];

      if (next) {
        elem = next;
        method$$1 = 'insertBefore';
      } else if (prev) {
        elem = prev;
        method$$1 = 'insertAfter';
      }

      this.first().remove();

      element[method$$1](elem);
    }

    /**
     * @method Elem#setOf
     * @public
     * @param {String} type - HTML element type.
     * @param {Number|Object|Array.<*>} iterator - A number (how many elements to create inside each element),
     * an object or an array to iterate over.
     * @param {ElemSetOfCallback} callback
     * @returns {Elem} New instance of Elem.
     * @description Function for creating set of elements inside each element in the set based on an array or an object.
     *
     * @example
     * table.setOf('tr', [[1, 2], [3, 4], [5, 6]], (row, array) => {
     *   D(row).setOf('td', array, (col, number) => {
     *     D(col).text(number);
     *   });
     * });
     */

  }, {
    key: 'setOf',
    value: function setOf(type, iterator, callback) {
      validate$1({ 2: callback }, { 2: ['function'] }, 'Elem#setOf');

      iterator = new Super(iterator).$;

      if (isNumber(iterator)) {
        try {
          validate$1({ 1: iterator }, { 1: ['intLike', '>=0'] }, 'Elem#setOf');
        } catch (e) {
          throw new Error('2nd argument must be either or non-negative integer, or object! (at Elem#setOf)');
        }

        iterator = array(iterator).$;
      }

      return this.object(function (elems, elem, index) {
        iterate(iterator, function (value, key) {
          var created = new Elem(elem).create(type);

          callback(created.$[0], value, key, iterator, elem, index);

          elems.add(created);
        });
      }, new Elem());
    }

    /**
     * @method Elem#show
     * @public
     * @returns {Elem} Returns this.
     * @description Shows all elements in the set.
     * If an element was hidden using {@link Elem#hide} previous display is set.
     *
     * @example
     * elem.show();
     */

  }, {
    key: 'show',
    value: function show() {
      return this.forEach(function (elem) {
        var _elem = elem;
        var dwayneData = _elem.dwayneData;


        elem = new Elem(elem);

        if (elem.css('display').indexOf('none') === 0) {
          elem.css('display', dwayneData.previousDisplay);
        }

        dwayneData.previousDisplay = '';
      });
    }

    /**
     * @method Elem#text
     * @public
     * @param {String|ElemValueCallback|*} [text] - Text to write instead of current text.
     * @returns {Elem|String} If no arguments passed text of the first element in the set returned.
     * Otherwise all elements texts in the set are set to the text argument.
     * @description Gets or sets text.
     *
     * @example
     * elem.text('123');
     * elem.text(); // '123'
     */

  }, {
    key: 'text',
    value: function text(_text) {
      if (!arguments.length) {
        return this.prop(textProperty);
      }

      return this.forEach(function (elem, index) {
        var txt = elem[textProperty];

        new Elem(elem).prop(textProperty, isFunction(_text) ? _text(txt, elem, index) : _text);
      });
    }

    /**
     * @method Elem#toggleAttr
     * @public
     * @param {String} attr - Attribute to toggle.
     * @param {Boolean|*} [condition] - If present and the condition is truthy method adds the attribute
     * with the '' value and if falsey method removes the attribute. If not present method adds
     * the attribute if it doesn't exist and removes if it does.
     * @returns {Elem} Returns this.
     * @description Method for toggling attributes.
     *
     * @example
     * elem.toggleAttr('attr');
     * elem.toggleAttr('attr', someCondition);
     */

  }, {
    key: 'toggleAttr',
    value: function toggleAttr(attr, condition) {
      var _arguments6 = arguments;

      return this.forEach(function (elem) {
        elem = new Elem(elem);

        if (_arguments6.length < 2 ? !elem.hasAttr(attr) : condition) {
          elem.attr(attr, '');
        } else {
          elem.removeAttr(attr);
        }
      });
    }

    /**
     * @method Elem#toggleAttr
     * @public
     * @param {String} cls - Class to toggle.
     * @param {Boolean|*} [condition] - If present and the condition is truthy method adds the class
     * and if falsey method removes the class. If not present method adds
     * the class if it doesn't exist and removes if it does.
     * @returns {Elem} Returns this.
     * @description Method for toggling classes.
     *
     * @example
     * elem.toggleClass('cls');
     * elem.toggleClass('cls', someCondition);
     */

  }, {
    key: 'toggleClass',
    value: function toggleClass(cls, condition) {
      return (arguments.length < 2 ? !this.hasClass(cls) : condition) ? this.addClass(cls) : this.removeClass(cls);
    }
  }, {
    key: 'up',


    /**
     * @method Elem#up
     * @public
     * @param {Integer} [level = 1] - What level up along the tree should be the parent.
     * @returns {Elem} New instance of Elem.
     * @description Creates a collection of parents of level &lt;level&gt;.
     *
     * @example
     * elem.up();
     * elem.up(2);
     */
    value: function up() {
      var level = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      validate$1([level], [['intLike', '>=0']], 'Elem#up');

      level = Number(level);

      return this.object(function (elems, elem) {
        var n = level;

        while (n-- && elem) {
          elem = elem.parentNode;
        }

        elems.add(elem);
      }, new Elem());
    }

    /**
     * @method Elem#validate
     * @public
     * @param {ValidateCallback} [validator] - If present, function that validates inputs.
     * @returns {Elem|Object.<String, Error|*>|null}
     * If a callback argument provided returns this. If no arguments provided returns either an object
     * with input names keys and errors values or null if no errors found.
     * @description If a callback argument provided adds it to the element validators list.
     * If no arguments provided validates every input element in the set with its own functions.
     * If an element is a form it validates all input elements inside it. After the validation
     * fires 'validate' event with 'valid' and 'error' (if form it's errors) properties.
     *
     * @example
     * form.on('input change', 'input', (value, input) => {
     *   input = D(input);
     *
     *   if (Number(value) % 3) {
     *     input.addClass('invalid');
     *
     *     throw new Error('The value should be divided by 3!');
     *   }
     *
     *   input.removeClass('invalid');
     * });
     */

  }, {
    key: 'validate',
    value: function validate(validator) {
      validate$1([validator], ['function||!'], 'Elem#validate');

      if (validator) {
        return this.forEach(function (_ref10) {
          var dwayneData = _ref10.dwayneData;

          dwayneData.validators.push(validator);
        });
      }

      var errors = new Super({ errors: null });

      this.filter(inputElements + ', form').forEach(function (elem, index) {
        if (getName(elem) === 'form') {
          var _ret = function () {
            var formErrors = { errors: null };
            var form = new Elem(elem);
            var inputs = form.find(inputElements);

            inputs.forEach(function (input, index) {
              validatorWrap(input, index, formErrors);
            });

            errors.deepAssign(formErrors);

            formErrors = formErrors.errors;

            form.dispatch('validate', {}, {
              valid: !formErrors,
              errors: formErrors
            });

            return {
              v: inputs.forEach(function (input) {
                var inputError = (formErrors || {})[input.name];

                new Elem(input).dispatch('validate', {}, {
                  valid: !inputError,
                  error: inputError || null
                });
              })
            };
          }();

          if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
        }

        var inputError = { errors: null };

        validatorWrap(elem, index, inputError);
        errors.deepAssign(inputError);

        inputError = (inputError.errors || {})[elem.name];

        new Elem(elem).dispatch('validate', {}, {
          valid: !inputError,
          error: inputError || null
        });
      });

      function validatorWrap(input, index, errors) {
        try {
          if (input.validity && !input.validity.valid) {
            throw new Error(input.validationMessage);
          }

          input.dwayneData.validators.forEach(function (validator) {
            validator(input.value, input, index);
          });
        } catch (err) {
          (errors.errors = errors.errors || {})[input.name] = err;
        }
      }

      if (errors.every(function (error) {
        return isNull(error);
      })) {
        return null;
      }

      return errors.$.errors;
    }

    /**
     * @method Elem#width
     * @public
     * @param {*|ElemValueCallback} [width] - Width to set.
     * @returns {Elem|String} If no arguments passed width of the first element in the set returned.
     * Otherwise all elements widths in the set are set to the width argument.
     * @description Gets or sets width.
     *
     * @example
     * elem.width(123);
     * elem.width(); // 123
     */

  }, {
    key: 'width',
    value: function width(_width) {
      return this.prop.apply(this, new Arr(arguments).unshift('width').$);
    }
  }, {
    key: 'innerHeight',
    get: function get() {
      var elem = this.$[0];

      if (isWindow(elem)) {
        return elem.innerHeight;
      }

      var _calcCSS = this.calcCSS();

      var borderTopWidth = _calcCSS.borderTopWidth;
      var borderBottomWidth = _calcCSS.borderBottomWidth;
      var boxSizing = _calcCSS.boxSizing;
      var height = _calcCSS.height;
      var paddingTop = _calcCSS.paddingTop;
      var paddingBottom = _calcCSS.paddingBottom;

      var borders = px(borderTopWidth) + px(borderBottomWidth);
      var paddings = px(paddingTop) + px(paddingBottom);

      return px(height) - innerSwitcher(boxSizing, [paddings, borders]);
    }

    /**
     * @member {Number} Elem#innerWidth
     * @type {Number}
     * @public
     * @readonly
     * @description Getter for finding how much width content of the first element can be.
     *
     * @example
     * elem.css({
     *   boxSizing: 'border-box',
     *   width: '200px',
     *   paddingLeft: '2px',
     *   paddingRight: '3px',
     *   borderLeft: '1px solid black',
     *   borderRight: '4px solid black'
     * }).innerWidth; // 190
     * elem
     *   .css('box-sizing', 'content-box')
     *   .innerWidth; // 200
     * elem
     *   .css('box-sizing', 'padding-box')
     *   .innerWidth; // 195
     */

  }, {
    key: 'innerWidth',
    get: function get() {
      var elem = this.$[0];

      if (isWindow(elem)) {
        return elem.innerWidth;
      }

      var _calcCSS2 = this.calcCSS();

      var borderLeftWidth = _calcCSS2.borderLeftWidth;
      var borderRightWidth = _calcCSS2.borderRightWidth;
      var boxSizing = _calcCSS2.boxSizing;
      var paddingLeft = _calcCSS2.paddingLeft;
      var paddingRight = _calcCSS2.paddingRight;
      var width = _calcCSS2.width;

      var borders = px(borderLeftWidth) + px(borderRightWidth);
      var paddings = px(paddingLeft) + px(paddingRight);

      return px(width) - innerSwitcher(boxSizing, [paddings, borders]);
    }
  }, {
    key: 'name',
    get: function get() {
      return getName(this.$[0]);
    }
  }, {
    key: 'outerHeight',
    get: function get() {
      var elem = this.$[0];

      if (isWindow(elem)) {
        return elem.outerHeight;
      }

      var _calcCSS3 = this.calcCSS();

      var borderTopWidth = _calcCSS3.borderTopWidth;
      var borderBottomWidth = _calcCSS3.borderBottomWidth;
      var boxSizing = _calcCSS3.boxSizing;
      var height = _calcCSS3.height;
      var marginTop = _calcCSS3.marginTop;
      var marginBottom = _calcCSS3.marginBottom;
      var paddingTop = _calcCSS3.paddingTop;
      var paddingBottom = _calcCSS3.paddingBottom;

      var borders = px(borderTopWidth) + px(borderBottomWidth);
      var paddings = px(paddingTop) + px(paddingBottom);

      return px(height) + px(marginTop) + px(marginBottom) + outerSwitcher(boxSizing, [borders, paddings]);
    }

    /**
     * @member {Number} Elem#outerWidth
     * @type {Number}
     * @public
     * @readonly
     * @description Getter for finding how much width the element actually is.
     *
     * @example
     * elem.css({
     *   boxSizing: 'border-box',
     *   width: '200px',
     *   paddingLeft: '2px',
     *   paddingRight: '3px',
     *   borderLeft: '1px solid black',
     *   borderRight: '4px solid black'
     *   marginLeft: '0px',
     *   marginRight: '5px'
     * }).outerWidth; // 205
     * elem
     *   .css('box-sizing', 'content-box')
     *   .outerWidth; // 215
     * elem
     *   .css('box-sizing', 'padding-box')
     *   .outerWidth; // 210
     */

  }, {
    key: 'outerWidth',
    get: function get() {
      var elem = this.$[0];

      if (isWindow(elem)) {
        return elem.outerWidth;
      }

      var _calcCSS4 = this.calcCSS();

      var borderLeftWidth = _calcCSS4.borderLeftWidth;
      var borderRightWidth = _calcCSS4.borderRightWidth;
      var boxSizing = _calcCSS4.boxSizing;
      var marginLeft = _calcCSS4.marginLeft;
      var marginRight = _calcCSS4.marginRight;
      var paddingLeft = _calcCSS4.paddingLeft;
      var paddingRight = _calcCSS4.paddingRight;
      var width = _calcCSS4.width;

      var borders = px(borderLeftWidth) + px(borderRightWidth);
      var paddings = px(paddingLeft) + px(paddingRight);

      return px(width) + px(marginLeft) + px(marginRight) + outerSwitcher(boxSizing, [borders, paddings]);
    }
  }, {
    key: 'toStringTag',
    get: function get() {
      return toStringTag(this.$$);
    }
  }]);
  return Elem;
}(Arr);

defineProperties(Elem.prototype, defineProperty({}, _Symbol.toStringTag, 'Elem'));

/**
 * @const {Elem} win
 * @type {Elem}
 * @public
 * @description Elem instance of window.
 */
var win = new Elem(global$1);

/**
 * @const {Elem} doc
 * @type {Elem}
 * @public
 * @description Elem instance of document.
 */
var doc = new Elem(nativeDocument);

/**
 * @const {Elem} html
 * @type {Elem}
 * @public
 * @description Elem instance of document.documentElement.
 */
var html = new Elem(nativeDocument.documentElement);

/**
 * @const {Elem} body
 * @type {Elem}
 * @public
 * @description Elem instance of document.body.
 */
var body = new Elem(nativeDocument.body);

/**
 * @const {Elem} head
 * @type {Elem}
 * @public
 * @description Elem instance of document.head.
 */
var head$1 = new Elem(nativeDocument.head);

var elements = new Arr(htmlElements).concat(svgElements).$;
var props = new Arr(elements).map(function (type) {
  return new Str(type).toCamelCase().$;
}).$;

dynamicDefineProperties(Elem.prototype, props, function (elem, i) {
  return function () {
    return this.create.apply(this, new Arr(arguments).unshift(elements[i]).$);
  };
});

dynamicDefineProperties(Elem.prototype, canvasGetMethods, function (method$$1) {
  return function () {
    var ctx = this.ctx();

    if (ctx) {
      return ctx[method$$1].apply(ctx, arguments);
    }
  };
});

dynamicDefineProperties(Elem.prototype, canvasRestMethods, function (method$$1) {
  return function () {
    var ctx = this.ctx();

    if (ctx) {
      ctx[method$$1].apply(ctx, arguments);
    }

    return this;
  };
});

/**
 * @function toFind
 * @private
 * @param {Element|Elem|String} elem - Element, selector of Elements or Elem.
 * @returns {Elem} Instance of Elem.
 */
function toFind(elem) {
  if (isElem(elem)) {
    return elem;
  }

  if (isString(elem)) {
    elem = _find(elem);
  }

  return new Elem(elem);
}

/**
 * @function isElem
 * @private
 * @param {*} value - Value to check if it's Elem.
 * @returns {Boolean} If the value is Elem.
 * @description Returns if the value is Elem or not.
 */
function isElem(value) {
  return value instanceof Elem;
}

/**
 * @function isWindow
 * @private
 * @param {*} value - Value to check if it's Window.
 * @returns {Boolean} If the value is Window.
 * @description Returns if the value is Window or not.
 */
function isWindow(value) {
  return toStringTag(value) === 'Window';
}

/**
 * @function isHTMLDocument
 * @private
 * @param {*} value - Value to check if it's HTMLDocument.
 * @returns {Boolean} If the value is HTMLDocument.
 * @description Returns if the value is HTMLDocument or not.
 */
function isHTMLDocument(value) {
  return toStringTag(value) === 'HTMLDocument';
}

/**
 * @function isDocumentFragment
 * @private
 * @param {*} value - Value to check if it's a DocumentFragment.
 * @returns {Boolean} If the value is a DocumentFragment.
 * @description Returns if the value is a DocumentFragment or not.
 */
function isDocumentFragment(value) {
  return toStringTag(value) === 'DocumentFragment';
}

/**
 * @function isStyleRule
 * @private
 * @param {*} value - Value to check if it's a style rule.
 * @returns {Boolean} If the value is a style rule.
 * @description Returns if the value is a style rule or not.
 */
function isStyleRule(value) {
  return toStringTag(value) === 'CSSStyleRule';
}

/**
 * @function
 * @private
 * @param {*} value - Value to check if it's Comment or Text.
 * @returns {Boolean} If the value is HTMLDocument.
 * @description Returns if the value is Comment or Text or not.
 */
function isCommentOrText(value) {
  var tag = toStringTag(value);

  return tag === 'Comment' || tag === 'Text';
}

/**
 * @function getElem
 * @private
 * @param {Elem} elem - Element to check.
 * @returns {Element} The argument or a fallback if needed.
 */
function getElem(elem) {
  return isElement(elem.$[0]) ? elem.$[0] : emptyDiv;
}

/**
 * @function getName
 * @private
 * @param {Element} [elem] - Element which name is needed to know.
 * @returns {String} Element name.
 */
function getName(elem) {
  return elem && elem.nodeName && elem.nodeName.toLowerCase() || '';
}

/**
 * @function addDwayneData
 * @private
 * @param {Element} elem - Element to add dwayneData to.
 * @returns {void}
 */
function addDwayneData(elem) {
  if (!{}.hasOwnProperty.call(elem, 'dwayneData') && !isWindow(elem)) {
    /**
     * @member Element#dwayneData
     * @type {Object}
     * @protected
     * @property {String} previousDisplay - Parameter used for hiding/showing elements.
     * @property {Object.<String, Super>} removeListeners - Parameter used for remove event listeners.
     * @property {CanvasRenderingContext2D} [ctx] - Canvas rendering context.
     * @property {Arr} validators - Validators assigned to element.
     * @description D data.
     */
    Object.defineProperty(elem, 'dwayneData', {
      value: {
        previousDisplay: '',
        listeners: {},
        ctx: getName(elem) === 'canvas' && elem.getContext('2d'),
        validators: new Arr([])
      }
    });
  } else if (isWindow(elem) && !windowsDwayneData.some(function (_ref11) {
    var element = _ref11.element;
    return element === elem;
  })) {
    windowsDwayneData.push({
      element: elem,
      listeners: {}
    });
  }
}

constructors[2].push({
  check: function check(elem) {
    return isElement(elem) || isWindow(elem) || isHTMLDocument(elem) || isCommentOrText(elem) || isDocumentFragment(elem) || /^(HTMLCollection|NodeList)$/.test(toStringTag(elem));
  },
  cls: Elem
});

/**
 * @function find
 * @public
 * @param {String} selector - Selector to find.
 * @param {Element} [base = document] - Base to find in.
 * @returns {Elem} New instance of Elem.
 * @description Synonym for
 * [Document#querySelectorAll]{@link https://developer.mozilla.org/en/docs/Web/API/Document/querySelectorAll}.
 */
function _find(selector) {
  var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : nativeDocument;

  return new Elem(isElement(base) || isHTMLDocument(base) ? base.querySelectorAll(String(selector)) : []);
}

/**
 * @function parseHTML
 * @public
 * @param {String} html - HTML to parse.
 * @param {Boolean} [collapseWhiteSpace = false] - If the whitespace should be
 * collapsed during the parsing.
 * @returns {Elem} New instance of Elem.
 * @description Parses HTML and returns a wrap of #document-fragment containing the contents.
 *
 * @example
 * parseHTML('<div>123</div>'); // Elem
 */
function parseHTML(html, collapseWhiteSpace) {
  var json = markupToJSON(html, collapseWhiteSpace);
  var template = doc.template();
  var elem = new Elem(template.$[0].content);

  json.forEach(function forEachNode(node) {
    var name = node.name;
    var attrs = node.attrs;
    var value = node.value;
    var parent = node.parent;
    var children = node.children;


    var parentNode = parent.elem || elem;
    var element = parentNode.create(name);

    node.elem = element;

    if (value) {
      element.text(value);
    }

    if (attrs) {
      element.attr(new Super(attrs).map(function (value) {
        return value === true ? '' : value;
      }).$);
    }

    if (name === 'template') {
      node.elem = new Elem(element.prop('content'));
    }

    if (children) {
      children.forEach(forEachNode);
    }
  });

  return new Elem(elem);
}

/**
 * @function px
 * @public
 * @param {String|Number} size - String containing pixels value or a number.
 * @returns {Number} Number of pixels.
 * @description Function for parsing pixel strings.
 *
 * @example
 * px('0px');  // 0
 * px('42px'); // 42
 */
function px(size) {
  return Number(String(size).replace(/px$/, ''));
}

function registerDBlock(Block) {
  var DBlock = function (_Block) {
    inherits(DBlock, _Block);

    function DBlock() {
      classCallCheck(this, DBlock);
      return possibleConstructorReturn(this, (DBlock.__proto__ || Object.getPrototypeOf(DBlock)).apply(this, arguments));
    }

    createClass(DBlock, [{
      key: 'afterConstruct',
      value: function afterConstruct() {
        var _this2 = this;

        this.watch('args.children', function () {
          var _$$ = _this2.$$;
          var parentScope = _$$.parentScope;
          var children = _$$.parentScope.children;
          var dBlockName = _$$.dBlockName;
          var _args = _this2.args;
          var argsParentScope = _args.parentScope;
          var argsChildren = _args.children;
          var ownChildren = _this2.children;

          var eventualChildren = argsChildren || children;
          var found = void 0;

          if (ownChildren.length) {
            return;
          }

          _this2.ParentScope = argsParentScope || parentScope.$$.parentScope;

          if (dBlockName) {
            found = children.find(function (_ref) {
              var nodeName = _ref.name;
              return nodeName === 'd-block:' + dBlockName;
            });

            if (!found) {
              var parent = _this2;

              while (!found && (parent = parent.$$.parentScope) && (!parent.$$.parentScope || parent.$$.parentScope.$$.name !== '#d-item')) {
                found = parent.$$.dBlocks.find(function (_ref2) {
                  var DBlockName = _ref2.$$.dBlockName;
                  return DBlockName === dBlockName;
                });
              }

              if (found) {
                _this2.ParentScope = parent;
              }
            }

            _this2.elems = found && found.value.children.length ? found.value.children : null;
          } else {
            _this2.elems = eventualChildren;
          }
        });
      }
    }]);
    return DBlock;
  }(Block);

  DBlock.template = '<d-elements value="{elems}" parentScope="{ParentScope}" />';


  return {
    name: 'd-block',
    value: DBlock
  };
}

function registerDEach(Block, createBlock) {
  var DEach = function (_Block) {
    inherits(DEach, _Block);

    function DEach(opts) {
      classCallCheck(this, DEach);

      var _this = possibleConstructorReturn(this, (DEach.__proto__ || Object.getPrototypeOf(DEach)).call(this, opts));

      var _this$args = _this.args;
      var _this$args$item = _this$args.item;
      var itemName = _this$args$item === undefined ? '$item' : _this$args$item;
      var _this$args$index = _this$args.index;
      var indexName = _this$args$index === undefined ? '$index' : _this$args$index;


      assign$1(_this.$$, {
        uids: new Super({}),
        items: new Arr([]),
        UID: _this.args.uid || undefined,
        itemName: itemName,
        indexName: indexName
      });
      return _this;
    }

    createClass(DEach, [{
      key: 'afterRender',
      value: function afterRender() {
        var _this2 = this;

        this.watch('args.set', 'args.sortBy', 'args.filterBy', function () {
          var _$$ = _this2.$$;
          var uids = _$$.uids;
          var parentScope = _$$.parentScope;
          var parentElem = _$$.parentElem;
          var scope = _$$.scope;
          var itemName = _$$.itemName;
          var indexName = _$$.indexName;
          var UID = _$$.UID;
          var children = _this2.children;
          var sortBy = _this2.args.sortBy;

          var $uids = uids.$;
          var newKeys = {};
          var newUIDs = {};
          var _args = _this2.args;
          var set$$1 = _args.set;
          var filterBy = _args.filterBy;


          if (isArray(set$$1) && isFunction(sortBy)) {
            set$$1 = new Arr(set$$1).slice().sort(sortBy).$;
          }

          if (isFunction(filterBy)) {
            filterBy = [filterBy];
          }

          if (isArray(filterBy)) {
            iterate(filterBy, function (filter) {
              set$$1 = new Super(set$$1).filter(filter).$;
            });
          }

          new Super(set$$1).forEach(function (item, index) {
            scope[itemName] = item;
            scope[indexName] = index;

            var uid = parentScope.$$.evaluate(UID, null, null, false, false, _this2);

            newKeys[uid] = newKeys[uid] || {};
            newKeys[uid][index] = true;
            newUIDs[index] = uid;
          });

          scope[itemName] = null;
          scope[indexName] = null;

          uids.forEach(function (items, uid) {
            if (!newKeys[uid]) {
              items.forEach(function (Item) {
                Item.$$.remove();
              });

              return;
            }

            items.splice(Object.keys(newKeys[uid]).length).forEach(function (Item) {
              Item.$$.remove();
            });
          });

          var prevBlock = void 0;

          new Super(set$$1).forEach(function (item, index) {
            var uid = newUIDs[index];
            var block = void 0;

            if ($uids[uid] && $uids[uid].length) {
              block = newKeys[uid][index] = uids.$[uid].shift();
              block.$$.scope[indexName] = index;
              block.$$.scope[itemName] = item;

              if (block.$$.prevBlock !== prevBlock && prevBlock) {
                prevBlock.$$.insertAfterIt(block.$$.content, true);
              }
            } else {
              block = newKeys[uid][index] = createBlock({
                node: {
                  itemName: itemName,
                  indexName: indexName,
                  item: item,
                  index: index,
                  name: '#d-item',
                  children: children
                },
                parent: _this2,
                parentElem: parentElem,
                parentBlock: _this2,
                parentScope: parentScope,
                prevBlock: prevBlock
              });
            }

            block.$$.prevBlock = prevBlock;
            prevBlock = block;
          });

          _this2.$$.uids = new Super(newKeys).map(function (items) {
            return new Super(items).values();
          });
        });
      }
    }]);
    return DEach;
  }(Block);

  return {
    name: 'd-each',
    value: DEach
  };
}

function registerDElements(Block, createBlock) {
  var DElements = function (_Block) {
    inherits(DElements, _Block);

    function DElements() {
      classCallCheck(this, DElements);
      return possibleConstructorReturn(this, (DElements.__proto__ || Object.getPrototypeOf(DElements)).apply(this, arguments));
    }

    createClass(DElements, [{
      key: 'afterConstruct',
      value: function afterConstruct() {
        var _this2 = this;

        var parentElem = this.$$.parentElem;
        var parentScope = this.args.parentScope;

        var firstTime = true;

        this.watch('args.value', function () {
          if (firstTime) {
            firstTime = false;

            return;
          }

          var _$$ = _this2.$$;
          var children = _$$.children;
          var mixins = _$$.mixins;
          var parent = _$$.parent;
          var watchersToRemove = _$$.watchersToRemove;
          var content = _$$.content;
          var value = _this2.args.value;


          children.forEach(function (child) {
            child.$$.remove(true);
          });
          mixins.forEach(function (mixin) {
            mixin.$$.remove(true);
          });
          content.remove();

          if (parent instanceof Block) {
            parent.$$.removeContent(content);
          }

          _this2.$$.children = new Arr([]);
          _this2.$$.mixins = new Arr([]);
          _this2.$$.watchersToRemove = watchersToRemove.filter(function (_ref) {
            var watchers = _ref.watchers;
            var watcher = _ref.watcher;
            var forDElements = _ref.forDElements;

            if (forDElements) {
              return true;
            }

            var index = watchers.indexOf(watcher);

            if (index !== -1) {
              watchers.splice(index, 1);
            }
          });
          _this2.$$.content = new Elem();

          var prevBlock = void 0;

          new Arr(value || []).forEach(function (child) {
            prevBlock = createBlock({
              node: child,
              parent: _this2,
              parentElem: parentElem,
              parentBlock: _this2,
              parentScope: parentScope,
              prevBlock: prevBlock
            });
          });
        });
      }
    }]);
    return DElements;
  }(Block);

  return {
    name: 'd-elements',
    value: DElements
  };
}

function registerDIf(Block) {
  var DIf = function (_Block) {
    inherits(DIf, _Block);

    function DIf(opts) {
      classCallCheck(this, DIf);

      var _this = possibleConstructorReturn(this, (DIf.__proto__ || Object.getPrototypeOf(DIf)).call(this, opts));

      var parentScope = _this.$$.parentScope;

      var index = Infinity;
      var values = _this.children.map(function (child, i) {
        var name = child.name;
        var attrs = child.attrs;
        var children = child.children;

        var cond = attrs.if;

        if (name !== 'd-else' && cond) {
          cond = parentScope.$$.evaluate(cond, function (newValue) {
            if (!!newValue === values.$[i]) {
              return;
            }

            values.$[i] = !!newValue;

            if (i > index) {
              return;
            }

            if (i < index) {
              index = i;
              _this.elems = children;

              return;
            }

            var found = values.find(Boolean);

            if (found) {
              index = found.key;
              _this.elems = _this.children.$[found.key].children;
            } else {
              index = Infinity;
              _this.elems = null;
            }
          }, _this);
        } else {
          cond = true;
        }

        if (cond && index === Infinity) {
          index = i;
          _this.elems = children;
        }

        return !!cond;
      });
      return _this;
    }

    return DIf;
  }(Block);

  DIf.template = '<d-elements value="{elems}" parentScope="{$$.parentScope}" />';


  return {
    name: 'd-if',
    value: DIf
  };
}

function registerDItem(Block) {
  var DItem = function (_Block) {
    inherits(DItem, _Block);

    function DItem() {
      classCallCheck(this, DItem);
      return possibleConstructorReturn(this, (DItem.__proto__ || Object.getPrototypeOf(DItem)).apply(this, arguments));
    }

    return DItem;
  }(Block);

  DItem.template = '<d-elements value="{children}" parentScope="{this}" />';


  return {
    name: '#d-item',
    value: DItem
  };
}

function registerDSwitch(Block) {
  var DSwitch = function (_Block) {
    inherits(DSwitch, _Block);

    function DSwitch(opts) {
      classCallCheck(this, DSwitch);

      var _this = possibleConstructorReturn(this, (DSwitch.__proto__ || Object.getPrototypeOf(DSwitch)).call(this, opts));

      _this.index = Infinity;
      var parentScope = _this.$$.parentScope;
      var args = _this.args;
      var value = _this.args.value;

      var wasDefault = void 0;

      _this.values = _this.children.object(function (values, child, i) {
        var name = child.name;
        var attrs = child.attrs;
        var children = child.children;

        var val = attrs.if;

        if (wasDefault) {
          return;
        }

        if (name !== 'd-case' && name !== 'd-default') {
          return;
        }

        if (name === 'd-default') {
          wasDefault = true;
        }

        if (name === 'd-default') {
          val = args.value;
        } else if (val) {
          val = parentScope.$$.evaluate(val, function (newValue) {
            if (_this.equals(_this.values.$[i].value, newValue)) {
              return;
            }

            _this.values.$[i].value = newValue;

            if (i > _this.index) {
              return;
            }

            if (i < _this.index) {
              _this.index = i;
              _this.elems = children;

              return;
            }

            var found = _this.values.find(function (_ref) {
              var value = _ref.value;
              return _this.equals(value, args.value);
            });

            if (found) {
              _this.index = found.key;
              _this.elems = found.value.children;
            } else {
              _this.index = Infinity;
              _this.elems = null;
            }
          }, _this);
        } else {
          val = undefined;
        }

        if (_this.equals(val, value) && _this.index === Infinity) {
          _this.index = i;
          _this.elems = children;
        }

        values.push({
          name: name,
          children: children,
          value: val
        });
      }, new Arr([]));
      return _this;
    }

    createClass(DSwitch, [{
      key: 'afterConstruct',
      value: function afterConstruct() {
        var _this2 = this;

        var firstTime = true;

        this.watch('args.value', function () {
          if (firstTime) {
            firstTime = false;

            return;
          }

          var newValue = _this2.args.value;


          _this2.index = Infinity;
          _this2.values.forEach(function (_ref2, i) {
            var name = _ref2.name;
            var value = _ref2.value;
            var children = _ref2.children;

            var val = name === 'd-default' ? newValue : value;

            if (_this2.equals(val, newValue) && _this2.index === Infinity) {
              _this2.index = i;
              _this2.elems = children;
            }
          });

          if (_this2.index === Infinity) {
            _this2.elems = null;
          }
        });
      }
    }, {
      key: 'equals',
      value: function equals(value1, value2) {
        return new Super(value1).equals(value2);
      }
    }]);
    return DSwitch;
  }(Block);

  DSwitch.template = '<d-elements value="{elems}" parentScope="{$$.parentScope}" />';


  return {
    name: 'd-switch',
    value: DSwitch
  };
}



var Blocks = Object.freeze({
	registerDBlock: registerDBlock,
	registerDEach: registerDEach,
	registerDElements: registerDElements,
	registerDIf: registerDIf,
	registerDItem: registerDItem,
	registerDSwitch: registerDSwitch
});

function registerDAttr(Mixin) {
  var DAttr = function (_Mixin) {
    inherits(DAttr, _Mixin);

    function DAttr() {
      var _ref;

      var _temp, _this, _ret;

      classCallCheck(this, DAttr);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = DAttr.__proto__ || Object.getPrototypeOf(DAttr)).call.apply(_ref, [this].concat(args))), _this), _this.attrs = {}, _temp), possibleConstructorReturn(_this, _ret);
    }

    createClass(DAttr, [{
      key: 'afterUpdate',
      value: function afterUpdate(newValue) {
        var elem = this.elem;
        var args = this.args;
        var attrs = this.attrs;


        if (args) {
          newValue = new Super(args).object(function (attrs, attr) {
            attrs[attr] = newValue;
          });
        }

        newValue = new Super(newValue || {}).$;

        new Super(attrs).forEach(function (value, prop) {
          if (!newValue[prop]) {
            elem.removeAttr(prop);
          }
        });
        elem.attr(newValue);

        this.attrs = newValue;
      }
    }, {
      key: 'beforeRemove',
      value: function beforeRemove() {
        var elem = this.elem;
        var attrs = this.attrs;


        elem.removeAttr.apply(elem, new Super(attrs).keys().$);
      }
    }]);
    return DAttr;
  }(Mixin);

  return {
    name: 'd-attr',
    value: DAttr
  };
}

function registerDBind(Mixin) {
  var DBind = function (_Mixin) {
    inherits(DBind, _Mixin);

    function DBind() {
      classCallCheck(this, DBind);
      return possibleConstructorReturn(this, (DBind.__proto__ || Object.getPrototypeOf(DBind)).apply(this, arguments));
    }

    createClass(DBind, [{
      key: 'afterUpdate',
      value: function afterUpdate(value) {
        if (this.off) {
          this.off();
        }

        if (!isFunction(value)) {
          return;
        }

        if (this.args) {
          this.off = this.elem.on(this.args.join(','), value);
        } else {
          console.error('Provide "d-bind" mixin with an event names (like "d-bind(click)" or "d-bind(keyup, keypress)")!');
        }
      }
    }, {
      key: 'beforeRemove',
      value: function beforeRemove() {
        var off = this.off;


        if (off) {
          off();
        }
      }
    }]);
    return DBind;
  }(Mixin);

  return {
    name: 'd-bind',
    value: DBind
  };
}

function registerDClass(Mixin) {
  var DClass = function (_Mixin) {
    inherits(DClass, _Mixin);

    function DClass() {
      var _ref;

      var _temp, _this, _ret;

      classCallCheck(this, DClass);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = DClass.__proto__ || Object.getPrototypeOf(DClass)).call.apply(_ref, [this].concat(args))), _this), _this.classes = [], _temp), possibleConstructorReturn(_this, _ret);
    }

    createClass(DClass, [{
      key: 'afterUpdate',
      value: function afterUpdate(newValue) {
        var elem = this.elem;
        var args = this.args;
        var classes = this.classes;

        var newClasses = [];

        newValue = new Super(newValue).$;

        if (args) {
          newValue = newValue ? args : [];
        }

        if (isString(newValue)) {
          newValue = newValue.split(/\s+/);
        }

        if (isArray(newValue)) {
          iterate(classes, function (cls) {
            if (newValue.indexOf(cls) === -1) {
              elem.removeClass(cls);
            }
          });
          iterate(newValue, function (cls) {
            if (isString(cls)) {
              newClasses.push(cls);
              elem.addClass(cls);
            }
          });
        } else {
          iterate(classes, function (cls) {
            if (!newValue || !newValue[cls]) {
              elem.removeClass(cls);
            }
          });
          iterate(newValue, function (val, cls) {
            if (val) {
              newClasses.push(cls);
              elem.addClass(cls);
            }
          });
        }

        this.classes = newClasses;
      }
    }, {
      key: 'beforeRemove',
      value: function beforeRemove() {
        var elem = this.elem;


        elem.removeClass.apply(elem, new Super(this.value).keys().$);
      }
    }]);
    return DClass;
  }(Mixin);

  return {
    name: 'd-class',
    value: DClass
  };
}

function registerDElem(Mixin) {
  var DElem = function (_Mixin) {
    inherits(DElem, _Mixin);

    function DElem(opts) {
      classCallCheck(this, DElem);

      var _this = possibleConstructorReturn(this, (DElem.__proto__ || Object.getPrototypeOf(DElem)).call(this, opts));

      var args = _this.args;
      var parentScope = _this.parentScope;
      var elem = _this.elem;

      var value = args ? args[0] : _this.evaluateOnce();

      if (isFunction(value)) {
        value(elem);
      } else if (isString(value)) {
        parentScope[value] = elem;
      }
      return _this;
    }

    return DElem;
  }(Mixin);

  DElem.evaluate = false;


  return {
    name: 'd-elem',
    value: DElem
  };
}

function registerDHide(Mixin) {
  var DHide = function (_Mixin) {
    inherits(DHide, _Mixin);

    function DHide() {
      classCallCheck(this, DHide);
      return possibleConstructorReturn(this, (DHide.__proto__ || Object.getPrototypeOf(DHide)).apply(this, arguments));
    }

    createClass(DHide, [{
      key: 'afterUpdate',
      value: function afterUpdate(value) {
        var elem = this.elem;


        if (value) {
          elem.hide();
        } else {
          elem.show();
        }
      }
    }, {
      key: 'beforeRemove',
      value: function beforeRemove() {
        this.elem.show();
      }
    }]);
    return DHide;
  }(Mixin);

  return {
    name: 'd-hide',
    value: DHide
  };
}

function registerDNode(Mixin) {
  var DNode = function (_Mixin) {
    inherits(DNode, _Mixin);

    function DNode(opts) {
      classCallCheck(this, DNode);

      var _this = possibleConstructorReturn(this, (DNode.__proto__ || Object.getPrototypeOf(DNode)).call(this, opts));

      var args = _this.args;
      var parentScope = _this.parentScope;
      var node = _this.node;

      var value = args ? args[0] : _this.evaluateOnce();

      if (isFunction(value)) {
        value(node);
      } else if (isString(value)) {
        parentScope[value] = node;
      }
      return _this;
    }

    return DNode;
  }(Mixin);

  DNode.evaluate = false;


  return {
    name: 'd-node',
    value: DNode
  };
}

function registerDOn(Mixin) {
  var DOn = function (_Mixin) {
    inherits(DOn, _Mixin);

    function DOn(opts) {
      classCallCheck(this, DOn);

      var _this = possibleConstructorReturn(this, (DOn.__proto__ || Object.getPrototypeOf(DOn)).call(this, opts));

      if (_this.args) {
        _this.off = _this.elem.on(_this.args.join(','), function () {
          _this.evaluateOnce();
        });
      } else {
        console.error('Provide "d-on" mixin with an event names (like "d-on(click)" or "d-on(keyup, keypress)")!');
      }
      return _this;
    }

    createClass(DOn, [{
      key: 'beforeRemove',
      value: function beforeRemove() {
        var off = this.off;


        if (off) {
          off();
        }
      }
    }]);
    return DOn;
  }(Mixin);

  DOn.evaluate = false;


  return {
    name: 'd-on',
    value: DOn
  };
}

function registerDShow(Mixin) {
  var DShow = function (_Mixin) {
    inherits(DShow, _Mixin);

    function DShow() {
      classCallCheck(this, DShow);
      return possibleConstructorReturn(this, (DShow.__proto__ || Object.getPrototypeOf(DShow)).apply(this, arguments));
    }

    createClass(DShow, [{
      key: 'afterUpdate',
      value: function afterUpdate(value) {
        var elem = this.elem;


        if (value) {
          elem.show();
        } else {
          elem.hide();
        }
      }
    }, {
      key: 'beforeRemove',
      value: function beforeRemove() {
        this.elem.show();
      }
    }]);
    return DShow;
  }(Mixin);

  return {
    name: 'd-show',
    value: DShow
  };
}

function registerDStyle(Mixin) {
  var DStyle = function (_Mixin) {
    inherits(DStyle, _Mixin);

    function DStyle() {
      var _ref;

      var _temp, _this, _ret;

      classCallCheck(this, DStyle);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = DStyle.__proto__ || Object.getPrototypeOf(DStyle)).call.apply(_ref, [this].concat(args))), _this), _this.css = {}, _temp), possibleConstructorReturn(_this, _ret);
    }

    createClass(DStyle, [{
      key: 'afterUpdate',
      value: function afterUpdate(newValue, oldValue) {
        var elem = this.elem;
        var args = this.args;
        var css = this.css;


        if (args) {
          newValue = new Super(args).object(function (css, prop) {
            css[prop] = newValue;
          });
        }

        if (isString(newValue)) {
          newValue = new Arr(newValue.split(/; ?/)).filter().object(function (css, item) {
            var _item = slicedToArray(item, 2);

            var prop = _item[0];
            var value = _item[1];


            css[prop] = value;
          });
        }

        newValue = new Super(newValue || {}).$;

        new Super(css).forEach(function (value, prop) {
          if (!newValue[prop]) {
            elem.removeCSS(prop);
          }
        });
        elem.css(newValue);

        this.css = newValue;
      }
    }, {
      key: 'beforeRemove',
      value: function beforeRemove() {
        var elem = this.elem;
        var css = this.css;


        elem.removeCSS.apply(elem, new Super(css).keys().$);
      }
    }]);
    return DStyle;
  }(Mixin);

  return {
    name: 'd-style',
    value: DStyle
  };
}

var listenerSwitcher = switcher('strictEquals', 'input').case('form', 'input, change').case('select', 'change').case('input', function (type) {
  return type === 'radio' || type === 'checkbox' || type === 'color' || type === 'file' ? 'change' : 'change input';
});

function registerDValidate(Mixin) {
  var DValidate = function (_Mixin) {
    inherits(DValidate, _Mixin);

    function DValidate(opts) {
      classCallCheck(this, DValidate);

      var _this = possibleConstructorReturn(this, (DValidate.__proto__ || Object.getPrototypeOf(DValidate)).call(this, opts));

      var elem = _this.elem;

      var validator = _this.value = _this.evaluateOnce();

      if (isFunction(validator)) {
        elem.validate(validator);
      } else if (validator === true) {
        _this.off = elem.on(listenerSwitcher(elem.name, [elem.prop('type')]), function () {
          elem.validate();
        });
      }
      return _this;
    }

    createClass(DValidate, [{
      key: 'beforeRemove',
      value: function beforeRemove() {
        var value = this.value;


        if (isFunction(value)) {
          var validators = this.node.dwayneData.validators;

          var index = validators.indexOf(value);

          if (index !== -1) {
            validators.splice(index, 1);
          }
        } else if (value === true) {
          this.off();
        }
      }
    }]);
    return DValidate;
  }(Mixin);

  DValidate.evaluate = false;


  return {
    name: 'd-validate',
    value: DValidate
  };
}

var propSwitcher = switcher('strictEquals', function (type, elem) {
  return elem.hasAttr('contenteditable') || elem.hasAttr('contentEditable') ? 'text' : 'value';
}).case('select', function (type, elem) {
  return elem.hasAttr('multiple') ? 'multiple-select' : 'value';
}).case('input', function (type) {
  if (type === 'file') {
    return 'files';
  }

  return type === 'radio' || type === 'checkbox' ? 'checked' : 'value';
});
var setValueSwitcher = switcher('strictEquals', function (value) {
  return value;
}).case('input', function (value, type, inputValue) {
  if (type !== 'radio' && type !== 'checkbox') {
    return value;
  }

  if (type === 'radio') {
    return value === inputValue;
  }

  return value.indexOf(inputValue) !== -1;
});
var getValueSwitcher = switcher('strictEquals', function (value) {
  return value;
}).case('select', function (value, type, inputValue, values, elem, options, init, isMultiple) {
  if (!isMultiple) {
    return value;
  }

  return options.object(function (values, _ref) {
    var selected = _ref.selected;
    var value = _ref.value;

    if (selected && values.indexOf(value) === -1) {
      values.push(value);
    }
  }, []).$;
}).case('input', function (value, type, inputValue, values, elem, options, init) {
  if (type !== 'radio' && type !== 'checkbox') {
    return value;
  }

  if (type === 'radio') {
    return value ? inputValue : null;
  }

  if (!value && init) {
    return values;
  }

  if (value) {
    if (values) {
      return values.indexOf(inputValue) === -1 ? new Arr(values).concat(inputValue).$ : values;
    }

    return [inputValue];
  }

  if (!isArray(values)) {
    return [];
  }

  var index = values.indexOf(inputValue);

  if (index !== -1) {
    return [].concat(toConsumableArray(new Arr(values).slice(0, index).$), toConsumableArray(new Arr(values).slice(index + 1).$));
  }

  return values;
});
var listenerSwitcher$1 = switcher('strictEquals', 'input').case('select', 'change').case('input', function (type) {
  return type === 'radio' || type === 'checkbox' || type === 'color' || type === 'file' ? 'change' : 'change input';
});

function registerDValue(Mixin, createBlock, Block) {
  var DValue = function (_Mixin) {
    inherits(DValue, _Mixin);

    function DValue(opts) {
      classCallCheck(this, DValue);

      var _this = possibleConstructorReturn(this, (DValue.__proto__ || Object.getPrototypeOf(DValue)).call(this, opts));

      var args = _this.args;
      var parentScope = _this.parentScope;
      var elem = _this.elem;
      var node = _this.node;

      var name = elem.name;
      var type = elem.prop('type');
      var value = _this.evaluateOnce();
      var initialScopeValue = null;

      _this.prop = propSwitcher(name, [type, elem]);
      _this.name = name;
      _this.type = type;
      _this.value = value;
      _this.options = elem.find('option');
      _this.scope = parentScope;

      if (args) {
        _this.name = args[0];
        _this.scope = value instanceof Block ? value : parentScope;
      }

      if (!isFunction(value)) {
        initialScopeValue = _this.scope.$$.evaluate(constructEvalFunction('$.' + value, value), function (newValue) {
          if (_this.currentValue !== newValue) {
            _this.currentValue = newValue;
            _this.setProp(newValue);
          }
        }, _this);
      }

      var initialElemValue = _this.getProp(initialScopeValue, true);
      var isInitialScopeValueNull = isNil(initialScopeValue);
      var isCheckbox = type === 'checkbox';
      var changeScope = function changeScope() {
        _this.currentValue = _this.getProp(_this.currentValue);
        _this.changeScope();
      };

      if (isInitialScopeValueNull || isCheckbox) {
        _this.currentValue = initialElemValue;
        _this.changeScope();

        if (!isInitialScopeValueNull && isCheckbox) {
          _this.setProp(initialScopeValue);
        }
      } else {
        _this.currentValue = initialScopeValue;
        _this.setProp(initialScopeValue);
      }

      _this.offElemListener = elem.on(listenerSwitcher$1(name, [type]), function (e) {
        if (e.target === node) {
          changeScope();
        }
      });
      _this.offFormListener = elem.closest('form').on('reset', function () {
        setTimeout(changeScope, 0);
      });
      return _this;
    }

    createClass(DValue, [{
      key: 'changeScope',
      value: function changeScope() {
        var scope = this.scope;
        var value = this.value;
        var currentValue = this.currentValue;


        if (isFunction(value)) {
          value(currentValue);
        } else {
          scope[value] = currentValue;
        }
      }
    }, {
      key: 'setProp',
      value: function setProp(value) {
        var elem = this.elem;
        var name = this.name;
        var prop = this.prop;
        var type = this.type;
        var node = this.node;
        var options = this.options;


        if (prop === 'text') {
          elem.text(value);
        } else if (prop === 'multiple-select') {
          options.forEach(function (option) {
            option.selected = value.indexOf(option.value) !== -1;
          });
        } else {
          elem.prop(prop, setValueSwitcher(name, [value, type, node.value]));
        }
      }
    }, {
      key: 'getProp',
      value: function getProp(values, init) {
        var elem = this.elem;
        var name = this.name;
        var prop = this.prop;
        var type = this.type;
        var node = this.node;
        var options = this.options;


        return prop === 'text' ? elem.text() : getValueSwitcher(name, [elem.prop(prop), type, node.value, values, elem, options, init, prop === 'multiple-select']);
      }
    }, {
      key: 'beforeRemove',
      value: function beforeRemove() {
        this.offElemListener();
        this.offFormListener();
      }
    }]);
    return DValue;
  }(Mixin);

  DValue.evaluate = false;


  return {
    name: 'd-value',
    value: DValue
  };
}



var Mixins = Object.freeze({
	registerDAttr: registerDAttr,
	registerDBind: registerDBind,
	registerDClass: registerDClass,
	registerDElem: registerDElem,
	registerDHide: registerDHide,
	registerDNode: registerDNode,
	registerDOn: registerDOn,
	registerDShow: registerDShow,
	registerDStyle: registerDStyle,
	registerDValidate: registerDValidate,
	registerDValue: registerDValue
});

var emptySpaceRegExp = /^\s+/;
var anyEmptySpaceRegExp = /\s+/g;
var anyEscapedExpressionRegExp = /\\[\s\S]/g;
var anyDoubleQuoteRegExp = /"/g;
var anyNewLineRegExp = /\r\n|\r|\n/g;
var anyCommaEmptySpace = /\s*,\s*/;
var properEscapedRegExp = /\\|u|n|f|r|t|b|v|`[0-7]/;

var thisRegExp = /^this(?![a-zA-Z_$])/;
var simpleExpressionRegExp = /^(?:true|false|null|undefined)(?![a-zA-Z_$])/;
var variableRegExp = /^[a-zA-Z_$][a-zA-Z0-9_$]*/;
var numberRegExp = /^(?:NaN|-?(?:(?:\d+|\d*\.\d+)(?:[E|e][+|\-]?\d+)?|Infinity))/;
var stringRegExp = /^(?:"(?:(?:\\[\s\S])|[^"\n\\])*"|'(?:(?:\\[\s\S])|[^'\n\\])*')/;
var regexpRegExp = /^\/(?:(?:\\[\s\S])|[^\/\n\\])+\/[gimuy]*/;
var arrowFunctionRegExp = /^(?:(?:\(\s*((?:[a-zA-Z_$][a-zA-Z0-9_$]*\s*,\s*)?(?:[a-zA-Z_$][a-zA-Z0-9_$]*)?)\s*\))|([a-zA-Z_$][a-zA-Z0-9_$]*))\s*=>/;
var templateStringContentRegExp = /^(?:(?:\\[\s\S])|\$(?!\{)|[^`$\\])+/;
var operatorRegExp = /^(?:(?:>>>|>>|<<)=?|&&|\|\||,|(?:\+|-|\*|\/|%|&|\||\^|<|>|==|!=)=?|=)/;
var pointOperatorRegExp = /^\.([a-zA-Z_$][a-zA-Z0-9_$]*)/;
var propertyRegExp = /^((?:"(?:(?:\\[\s\S])|[^"\n\\])*"|'(?:(?:\\[\s\S])|[^'\n\\])*'|[a-zA-Z_$][a-zA-Z0-9_$]*))\s*:/;
var shorthandPropertyRegExp = /^([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=,|})(,?)/;
var unaryOperatorRegExp = /^(?:-|~|\+|!)/;
var keywordsArray = ['do', 'if', 'in', 'for', 'let', 'new', 'try', 'var', 'case', 'else', 'enum', 'null', 'this', 'true', 'void', 'with', 'break', 'catch', 'class', 'const', 'false', 'super', 'throw', 'while', 'yield', 'delete', 'export', 'import', 'public', 'return', 'static', 'switch', 'typeof', 'default', 'extends', 'finally', 'package', 'private', 'continue', 'debugger', 'function', 'arguments', 'interface', 'protected', 'implements', 'instanceof'];
var keywordsRegExp = new RegExp('^(?:' + keywordsArray.join('|') + ')$');

var EXPRESSION = 'expression';
var END_OF_FUNC_BODY = 'end of function body';
var submitString$1 = 'Please, submit an issue at https://github.com/dwaynejs/dwayne/issues/new, if needed.';

function parseJS(string, wholeString, curlyError) {
  curlyError = !!curlyError;

  var initialString = string;
  var expected = {
    expression: true,
    closingExpressions: [],
    functionScope: {}
  };
  var variables = {};
  var closingExpressions = expected.closingExpressions;

  var expression = '';
  var index = 0;

  while (string.length) {
    var spaceMatch = void 0;
    var match = void 0;
    var toConcat = '';
    var matched = void 0;
    var isEmptySpace = void 0;

    var _ref = closingExpressions[closingExpressions.length - 1] || {};

    var properType = _ref.type;
    var properSymbol = _ref.symbol;

    var firstSymbol = string[0];

    if ((spaceMatch = string.match(emptySpaceRegExp)) && !expected.templateString) {
      isEmptySpace = true;
      match = spaceMatch[0];
    } else {
      if (expected.expression) {
        match = string.match(arrowFunctionRegExp);

        if (match) {
          var vars = (match[2] || match[1]).split(anyCommaEmptySpace);
          var _variables = [];
          var newFunctionVars = Object.create(expected.functionScope);

          for (var i = 0, length = vars.length; i < length; i++) {
            var variable = vars[i];

            if (variable) {
              _variables.push(variable);
              newFunctionVars[variable] = true;
            }
          }

          toConcat = 'function(' + _variables.join(',') + '){return ';
          expected.functionScope = newFunctionVars;
          closingExpressions.push({
            type: 'any',
            symbol: END_OF_FUNC_BODY
          }, {
            type: 'any',
            symbol: EXPRESSION
          });
        } else if (firstSymbol === '(') {
          match = '(';
          closingExpressions.push({
            type: 'paren',
            symbol: ')'
          });
        } else if (firstSymbol === '[') {
          match = '[';
          closingExpressions.push({
            type: 'array',
            symbol: ']'
          });
        } else if (firstSymbol === '`') {
          match = '`';
          toConcat = '(""';
          expected.templateString = true;
          closingExpressions.push({
            type: 'templateString',
            symbol: '`'
          });

          delete expected.expression;
        } else if (firstSymbol === '{') {
          match = '{';
          expected.objectProperty = true;
          closingExpressions.push({
            type: 'object',
            symbol: '}'
          });

          delete expected.expression;
        } else {
          match = string.match(unaryOperatorRegExp);

          if (match) {
            toConcat = match[0].replace(anyEmptySpaceRegExp, ' ');
          } else {
            match = string.match(simpleExpressionRegExp);

            if (!match) {
              match = string.match(numberRegExp);

              if (!match) {
                match = string.match(stringRegExp);

                if (!match) {
                  match = string.match(regexpRegExp);

                  if (!match) {
                    match = string.match(thisRegExp);

                    if (match) {
                      toConcat = '$';
                    } else {
                      match = string.match(variableRegExp);

                      if (match) {
                        var _variable = match[0];

                        if (!expected.functionScope[_variable]) {
                          variables[_variable] = true;
                        }

                        toConcat = getVariable(_variable, expected.functionScope);
                      }
                    }
                  }
                }
              }
            }

            if (match) {
              expected.operator = true;
              matched = EXPRESSION;

              delete expected.expression;
            }
          }
        }
      } else if (expected.templateString) {
        match = string.match(templateStringContentRegExp);

        if (match) {
          var _string = match[0].replace(anyEscapedExpressionRegExp, function (match) {
            var second = match[1];

            return properEscapedRegExp.test(second) ? match : second;
          }).replace(anyDoubleQuoteRegExp, '\\"').replace(anyNewLineRegExp, function (match) {
            if (match === '\r\n') {
              match = '\\r\\n';
            } else if (match === '\r') {
              match = '\\r';
            } else {
              match = '\\n';
            }

            return '"+"' + match + '"+"';
          });

          toConcat = '+"' + _string + '"';
        } else if (firstSymbol === '`') {
          match = '`';
          matched = EXPRESSION;
          toConcat = ')';
          expected.operator = true;
          closingExpressions.pop();

          delete expected.templateString;
        } else if (string.slice(0, 2) === '${') {
          match = '${';
          toConcat = '+(';
          expected.expression = true;
          closingExpressions.push({
            type: 'templateString',
            symbol: '}'
          }, {
            type: 'any',
            symbol: EXPRESSION
          });

          delete expected.templateString;
        }
      } else if (expected.objectProperty) {
        match = string.match(propertyRegExp);

        if (match) {
          if (keywordsRegExp.test(match[1])) {
            match[1] = '"' + match[1] + '"';
          }

          toConcat = match[1] + ':';
          expected.expression = true;
          closingExpressions.push({
            type: 'any',
            symbol: EXPRESSION
          });

          delete expected.objectProperty;
        } else {
          match = string.match(shorthandPropertyRegExp);

          if (match) {
            var _variable2 = match[1];

            if (!expected.functionScope[_variable2]) {
              variables[_variable2] = true;
            }

            toConcat = _variable2 + ':' + getVariable(_variable2, expected.functionScope) + match[2];

            if (!match[2]) {
              expected.operator = true;

              delete expected.objectProperty;
            }
          }
        }
      } else if (expected.operator) {
        if (firstSymbol === ')' || firstSymbol === ']' || firstSymbol === '}' || firstSymbol === ',') {
          toConcat = closeFunctionBody(expected);

          var _ref2 = closingExpressions[closingExpressions.length - 1] || {};

          properType = _ref2.type;
          properSymbol = _ref2.symbol;
        }

        if (firstSymbol === '(') {
          match = '(';
          expected.expression = true;
          closingExpressions.push({
            type: 'call',
            symbol: ')'
          });

          delete expected.operator;
        } else if (firstSymbol === '?') {
          match = '?';
          expected.expression = true;
          closingExpressions.push({
            type: 'ternary',
            symbol: ':'
          }, {
            type: 'any',
            symbol: EXPRESSION
          });

          delete expected.operator;
        } else if (firstSymbol === ':' && properSymbol === ':') {
          match = ':';
          expected.expression = true;
          closingExpressions.pop();

          delete expected.operator;
        } else if (firstSymbol === '[') {
          match = '[';
          expected.expression = true;
          closingExpressions.push({
            type: 'property',
            symbol: ']'
          }, {
            type: 'any',
            symbol: EXPRESSION
          });

          delete expected.operator;
        } else if (firstSymbol === '}' && properSymbol === '}' && properType === 'templateString') {
          match = firstSymbol;
          toConcat += ')';
          expected.templateString = true;
          closingExpressions.pop();

          delete expected.operator;
        } else if (firstSymbol === ']' && properSymbol === ']' && properType === 'property') {
          match = firstSymbol;
          toConcat += firstSymbol;
          matched = EXPRESSION;
          closingExpressions.pop();
        } else if (firstSymbol === ')' && properSymbol === ')' && properType === 'paren') {
          match = firstSymbol;
          toConcat += firstSymbol;
          matched = EXPRESSION;
          closingExpressions.pop();
        } else if (firstSymbol === ',' && properSymbol === '}' && properType === 'object') {
          match = firstSymbol;
          toConcat += firstSymbol;
          matched = EXPRESSION;
          expected.objectProperty = true;

          delete expected.operator;
        } else {
          match = string.match(pointOperatorRegExp);

          if (match) {
            matched = EXPRESSION;

            if (keywordsRegExp.test(match[1])) {
              toConcat += '["' + match[1] + '"]';
            }
          } else {
            match = string.match(operatorRegExp);

            if (match) {
              toConcat += match[0].replace(anyEmptySpaceRegExp, ' ');
              expected.expression = true;
              closingExpressions.push({
                type: 'any',
                symbol: EXPRESSION
              });

              delete expected.operator;
            }
          }
        }
      }

      if (!match) {
        if (firstSymbol === ')' || firstSymbol === ']' || firstSymbol === '}') {
          toConcat += closeFunctionBody(expected);

          var _ref3 = closingExpressions[closingExpressions.length - 1] || {};

          properType = _ref3.type;
          properSymbol = _ref3.symbol;
        }

        var closingBrace = void 0;

        if (properSymbol === ')' && firstSymbol === ')' && properType === 'call') {
          closingBrace = true;

          delete expected.expression;
        } else if (properSymbol === ']' && firstSymbol === ']' && properType === 'array') {
          closingBrace = true;

          delete expected.expression;
        } else if (firstSymbol === '}' && properSymbol === '}' && properType === 'object') {
          closingBrace = true;

          delete expected.objectProperty;
        }

        if (closingBrace) {
          match = firstSymbol;
          toConcat += firstSymbol;
          expected.operator = true;
          matched = EXPRESSION;
          closingExpressions.pop();
        }
      }

      if (matched === EXPRESSION && closingExpressions.length && closingExpressions[closingExpressions.length - 1].symbol === EXPRESSION) {
        closingExpressions.pop();
      }
    }

    var noMatch = !match || !match[0];
    var curlyIndex = string.indexOf('}');

    if (noMatch && (curlyIndex > 0 || curlyError)) {
      var expressionString = curlyError ? initialString : initialString.slice(0, initialString.length - string.length + curlyIndex);

      throw new Error('Syntax error near ~~~ "' + initialString.slice(index, index + 15) + '" ~~~ (index: ' + index + ', ' + constructErrorInfo(expressionString, wholeString, closingExpressions, curlyError));
    } else if (noMatch && curlyIndex === 0) {
      expression += toConcat;

      break;
    } else if (noMatch && curlyIndex === -1) {
      return null;
    }

    match = typeof match === 'string' ? match : match[0];

    if (!isEmptySpace) {
      expression += toConcat || match;
    }

    string = string.slice(match.length);
    index += match.length;
  }

  expression += closeFunctionBody(expected);

  if (closingExpressions.length) {
    var _expressionString = initialString.slice(0, initialString.length - string.length);

    throw new Error('Unexpected end of input (' + constructErrorInfo(_expressionString, wholeString, closingExpressions, curlyError));
  }

  if (!string.length && !curlyError) {
    return null;
  }

  return {
    expression: expression,
    variables: variables,
    original: initialString.slice(0, index),
    rest: string.slice(1)
  };
}

function getVariable(name, functionScope) {
  return functionScope[name] ? name : '$.' + name;
}

function closeFunctionBody(expected) {
  var closingExpressions = expected.closingExpressions;

  var toConcat = '';

  while (closingExpressions[closingExpressions.length - 1] && closingExpressions[closingExpressions.length - 1].symbol === END_OF_FUNC_BODY) {
    toConcat += '}';
    expected.functionScope = Object.getPrototypeOf(expected.functionScope);
    closingExpressions.pop();

    if (closingExpressions.length && closingExpressions[closingExpressions.length - 1].symbol === EXPRESSION) {
      closingExpressions.pop();
    }
  }

  return toConcat;
}

function constructErrorInfo(expressionString, wholeString, closingExpressions, curlyError) {
  var _ref4 = closingExpressions[closingExpressions.length - 1] || {};

  var last = _ref4.symbol;

  var wholeStringString = '';

  if (last && last !== EXPRESSION && last !== END_OF_FUNC_BODY) {
    last = '"' + last + '"';
  }

  if (!curlyError) {
    wholeStringString = ', whole string: "' + wholeString + '"';
  }

  var lastString = last ? 'expected ' + last + ', ' : '';

  return lastString + 'initial expression: "' + expressionString + '"' + wholeStringString + '). ' + submitString$1;
}

/**
 * @module Block
 * @private
 * @mixin
 * @description Exports Block class.
 */

/**
 * @typedef {Error} EvaluationError
 * @public
 * @property {String} expression - Expression which has been evaluated with the error.
 * @property {Block} block - Block in context of which the expression has been evaluated with the error.
 */

/**
 * @callback Watcher
 * @public
 * @param {*} newValue - New value.
 * @param {*} oldValue - Old value.
 */

/**
 * @callback VarsWatcher
 * @public
 */

/**
 * @callback Wrapper
 * @public
 * @param {Block} Block class to wrap.
 * @returns {Block} New Block class.
 */

/**
 * @callback AfterUpdate
 * @public
 * @param {*} newValue - New value.
 * @param {*} oldValue - Old value.
 * @param {*} mixin - Mixin instance.
 */

var rootBlocks = Object.create(null);
var rootMixins = Object.create(null);
var isPrototypeOf = {}.isPrototypeOf;
var tagName = new RegExp('^' + htmlAllowedTagSymbols + '$', 'i');
var attrName = new RegExp('^' + htmlAllowedAttrSymbols + '$');
var svgNS = 'http://www.w3.org/2000/svg';
var curlyBracketRegExp = /\{/;
var dRestRegExp = /^d-rest(?:#|$)/;
var afterElem = new Elem();
var evalMode = void 0;
var getting = void 0;
var changed = void 0;

/**
 * @class Block
 * @public
 * @param {Object} opts - Element options.
 * @returns {Block} Instance of Block.
 * @description Class for dynamic templating.
 *
 * @example
 * import { D, Block, initApp, registerBlock } from 'dwayne';
 *
 * class App extends Block {
 *   static template = '<Hello text="{text}"/>';
 *
 *   constructor(args, children) {
 *     super(args, children);
 *
 *     this.text = 'world (0)';
 *     this.times = 0;
 *
 *     this.setInterval();
 *   }
 *
 *   setInterval() {
 *     D(1000).interval(() => {
 *       this.text = `world (${ ++this.times })`;
 *     });
 *   }
 * }
 *
 * class Hello extends Block {
 *   static template = 'Hello, {args.text}!';
 * }
 *
 * Block.register('App', App);
 * Block.register('Hello', 'Hello, {args.text}!');
 *
 * initApp('App', document.getElementById('root'));
 */

var Block = function () {
  createClass(Block, null, [{
    key: 'onEvalError',


    /**
     * @method Block.onEvalError
     * @public
     * @param {EvaluationError} err - The method is called when an evaluation error occurs.
     */


    /**
     * @member {Object} [Block.defaultLocals = null]
     * @type {Object}
     * @public
     * @description Block default locals.
     */


    /**
     * @member {Boolean} [Block.collapseWhiteSpace = true]
     * @type {Boolean}
     * @public
     * @description If the whitespace between html elements and
     * in the start and the end inside the tag should be omitted during parsing.
     */
    value: function onEvalError(err) {
      console.error('Eval error (evaluating "' + err.expression + '" in context of block "' + err.block.$$.name + '"):', err);
    }

    /**
     * @member {String} [Block.template = '']
     * @type {String}
     * @public
     * @description Block template.
     */


    /**
     * @member {Object} [Block.defaultArgs = null]
     * @type {Object}
     * @public
     * @description Block default args.
     */

  }, {
    key: 'getBlocks',
    value: function getBlocks() {
      return new Super(_extends({}, this._blocks));
    }
  }, {
    key: 'getMixins',
    value: function getMixins() {
      return new Super(_extends({}, this._mixins));
    }

    /**
     * @method Block.beforeRegisterBlock
     * @public
     * @param {Block} Block - Block which is registering.
     * @param {String} name - Name of the Block.
     * @returns {Block|void} Return value is used for registering the block.
     * If Block subclass returned it's registered instead of the initial block, otherwise
     * the initial block is used.
     */

  }, {
    key: 'beforeRegisterBlock',
    value: function beforeRegisterBlock(Block, name) {}

    /**
     * @method Block.beforeRegisterMixin
     * @public
     * @param {Mixin} Mixin - Mixin which is registering.
     * @param {String} name - Name of the Mixin.
     * @returns {Mixin|void} Return value is used for registering the mixin.
     * If Mixin subclass returned it's registered instead of the initial mixin, otherwise
     * the initial mixin is used.
     */

  }, {
    key: 'beforeRegisterMixin',
    value: function beforeRegisterMixin(Mixin, name) {}

    /**
     * @method Block.block
     * @public
     * @param {String} name - Block or mixin name.
     * @param {String|Block} Subclass - Subclass of Block or template string of it.
     * @returns {void}
     * @description Register block in the namespace of this.
     */

  }, {
    key: 'block',
    value: function block(name, _Subclass) {
      var _this = new Super(this);

      if (isString(_Subclass)) {
        var _class, _temp;

        _Subclass = (_temp = _class = function (_Block) {
          inherits(Subclass, _Block);

          function Subclass() {
            classCallCheck(this, Subclass);
            return possibleConstructorReturn(this, (Subclass.__proto__ || Object.getPrototypeOf(Subclass)).apply(this, arguments));
          }

          return Subclass;
        }(Block), _class.template = _Subclass, _temp);
      }

      if (isFunction(_Subclass) && !isInstanceOf(Block, _Subclass)) {
        (function () {
          var constructor = _Subclass;

          _Subclass = function (_Block2) {
            inherits(_Subclass, _Block2);

            function _Subclass(opts) {
              classCallCheck(this, _Subclass);

              var _this3 = possibleConstructorReturn(this, (_Subclass.__proto__ || Object.getPrototypeOf(_Subclass)).call(this, opts));

              constructor.call(_this3, opts);
              return _this3;
            }

            return _Subclass;
          }(Block);
        })();
      }

      if (!isFunction(_Subclass)) {
        console.warn('Block must be a string (representing a block template), a function or a class that extends Block class (name: "' + name + '") (Block.block)');

        return;
      }

      if (!isInstanceOf(Block, _Subclass)) {
        extendBlock(_Subclass);
      }

      if (rootBlocks[name]) {
        console.warn('The "' + name + '" block is a built-in block so the block will not be registered (Block.block)');

        return;
      }

      if (!tagName.test(name)) {
        console.warn('Name "' + name + '" is not allowed for blocks so the block will not be registered (Block.block)');

        return;
      }

      if (!_this.hasOwn('_blocks')) {
        this._blocks = Object.create(_this.proto().$._blocks);
      }

      var returnValue = void 0;

      try {
        returnValue = this.beforeRegisterBlock(_Subclass, name);
      } catch (err) {
        console.error('Uncaught error in ' + this._name + '.beforeRegisterBlock:', err);
      }

      if (isInstanceOf(Block, returnValue)) {
        _Subclass = returnValue;
      }

      var variables = {};

      _Subclass._name = name;
      _Subclass._html = transformDIfChildren(transformJSExpressions(markupToJSON('' + (_Subclass.template || ''), _Subclass.collapseWhiteSpace), variables));
      _Subclass._variables = new Super(variables).except('$$', '$').keys();

      if (new Super(_Subclass).hasOwn('defaultArgs')) {
        new Super(_Subclass.defaultArgs).proto(null);
      }

      this._blocks[name] = _Subclass;
    }

    /**
     * @method Block.mixin
     * @public
     * @param {String} name - Block or mixin name.
     * @param {Mixin|AfterUpdate} Subclass - Subclass of Mixin or AfterUpdate callback.
     * @returns {void}
     * @description Register mixin in the namespace of this.
     */

  }, {
    key: 'mixin',
    value: function mixin(name, Subclass) {
      var _this = new Super(this);

      if (isFunction(Subclass) && !isInstanceOf(Mixin, Subclass)) {
        (function () {
          var _afterUpdate = Subclass;

          Subclass = function (_Mixin) {
            inherits(Subclass, _Mixin);

            function Subclass() {
              classCallCheck(this, Subclass);
              return possibleConstructorReturn(this, (Subclass.__proto__ || Object.getPrototypeOf(Subclass)).apply(this, arguments));
            }

            createClass(Subclass, [{
              key: 'afterUpdate',
              value: function afterUpdate(newValue, oldValue) {
                _afterUpdate.call(this, newValue, oldValue, this);
              }
            }]);
            return Subclass;
          }(Mixin);
        })();
      }

      if (!isInstanceOf(Mixin, Subclass)) {
        console.warn('The "' + name + '" class does not extend Mixin and will not be registered (Block.mixin)');

        return;
      }

      if (rootMixins[name]) {
        console.warn('The "' + name + '" mixin is a built-in mixin so the mixin will not be registered (Block.mixin)');

        return;
      }

      if (!attrName.test(name)) {
        console.warn('Name "' + name + '" is not allowed for mixins so the mixin will not be registered (Block.mixin)');

        return;
      }

      if (!_this.hasOwn('_mixins')) {
        this._mixins = Object.create(_this.proto().$._mixins);
      }

      var returnValue = void 0;

      try {
        returnValue = this.beforeRegisterMixin(Subclass, name);
      } catch (err) {
        console.error('Uncaught error in ' + this._name + '.beforeRegisterMixin:', err);
      }

      if (isInstanceOf(Mixin, returnValue)) {
        Subclass = returnValue;
      }

      Subclass._name = name;
      Subclass._match = constructMixinRegExp(name);

      this._mixins[name] = Subclass;
    }

    /**
     * @method Block.wrap
     * @public
     * @param {...Wrapper} wrappers - Functions that return wrapped block.
     * @returns {Block} New block.
     * @description Method for wrapping blocks into another blocks.
     * It is considered best practice to just extends the old block with a new one.
     *
     * @example
     * class MyBlock extends Block {
     *   static template = '<div>123</div>';
     * }
     *
     * MyBlock.wrap((Block) => {
     *   return class extends Block {
     *     static template = `<section class="wrapper">${ Block.template }</section>`;
     *
     *     constructor(opts) {
     *       super(opts);
     *
     *       this.additionalVar = 'additional';
     *     }
     *   };
     * });
     */

  }, {
    key: 'wrap',
    value: function wrap() {
      for (var _len = arguments.length, wrappers = Array(_len), _key = 0; _key < _len; _key++) {
        wrappers[_key] = arguments[_key];
      }

      return new Arr(arguments).reduce(function (block, wrapper) {
        return wrapper(block);
      }, this);
    }
  }]);

  function Block(opts) {
    var _this5 = this;

    classCallCheck(this, Block);
    var name = opts.name;
    var originalArgs = opts.args;
    var dBlockName = opts.dBlockName;
    var children = opts.children;
    var parent = opts.parent;
    var parentElem = opts.parentElem;
    var parentBlock = opts.parentBlock;
    var parentScope = opts.parentScope;
    var prevBlock = opts.prevBlock;

    var watchersToRemove = new Arr([]);
    var constructor = new Super(this).proto().$.constructor;
    var childrenBlocks = new Arr([]);
    var mixins = new Arr([]);
    var isParentBlock = parent instanceof Block;

    defineFrozenProperties(this, {
      /**
       * @member {Block} Block#$
       * @type {Block}
       * @public
       * @description This.
       */
      $: this,

      /**
       * @member {Object} Block#$$
       * @type {Object}
       * @protected
       * @property {Object} args - Private args scope.
       * @property {Arr} children - Child blocks.
       * @property {Arr} mixins - Child mixins.
       * @property {Elem} parentElem - Parent element.
       * @property {Elem} content - Content elements.
       * @property {Function} evaluate - Evaluate function.
       * @property {Object} globals - Private globals scope.
       * @property {Object} locals - Private locals scope.
       * @property {Arr} watchersToRemove - Watchers to remove before removing element.
       */
      $$: {
        name: name,
        dBlockName: dBlockName,
        dBlocks: new Arr([]),
        parent: parent,
        parentElem: parentElem,
        parentScope: parentScope,
        parentBlock: parentBlock,
        content: new Elem(),
        ns: constructor,
        children: childrenBlocks,
        mixins: mixins,
        prevBlock: prevBlock,
        watchersToRemove: watchersToRemove,
        evaluate: function evaluate(func, onChange, instance, forDElements, forDItem, forDEach) {
          if (!isFunction(func)) {
            return func;
          }

          forDElements = !!forDElements;
          forDItem = !!forDItem;

          var scope = name === '#d-item' && !forDItem || forDEach ? (forDEach || _this5).$$.scope : _this5;

          var _ref = instance ? instance.$$ : {};

          var watchersToRemove = _ref.watchersToRemove;

          /* eslint no-new-func: 0 */

          var evaluate = function evaluate() {
            var result = void 0;

            if (onChange) {
              evalMode = true;
              getting = new Arr([]);
            }

            try {
              result = func(scope);
            } catch (err) {
              err.expression = func.expression;
              err.original = func.original;
              err.block = _this5;

              if (isFunction(constructor.onEvalError)) {
                constructor.onEvalError(err);
              }
            }

            if (onChange) {
              (function () {
                var localWatchers = new Arr([]);

                getting.forEach(function (watchers) {
                  var watcher = function watcher() {
                    var newResult = evaluate();

                    if (newResult !== result) {
                      onChange(newResult, result);
                    }
                  };
                  var watcherBlock = {
                    forDElements: forDElements,
                    watcher: watcher,
                    watchers: watchers
                  };

                  watcher.onRemove = function () {
                    localWatchers.forEach(function (watcherBlock) {
                      var watcher = watcherBlock.watcher;
                      var watchers = watcherBlock.watchers;

                      var index1 = watchersToRemove.indexOf(watcherBlock);
                      var index2 = watchers.indexOf(watcher);

                      if (index1 !== -1) {
                        watchersToRemove.splice(index1, 1);
                      }

                      if (index2 !== -1) {
                        watchers.splice(index2, 1);
                      }
                    });
                  };

                  localWatchers.push(watcherBlock);
                  watchersToRemove.push(watcherBlock);
                  watchers.push(watcher);
                });

                evalMode = false;
                getting = new Arr([]);
              })();
            }

            return result;
          };

          return evaluate();
        },
        remove: function remove(isParentSignal) {
          removeWatchers(watchersToRemove);

          childrenBlocks.forEach(function (child) {
            child.$$.remove(true);
          });

          mixins.forEach(function (mixin) {
            mixin.$$.remove(true);
          });

          try {
            _this5.beforeRemove();
          } catch (err) {
            console.error('Uncaught error in ' + name + '#beforeRemove:', err);
          }

          if (!isParentSignal && isParentBlock) {
            parent.$$.removeContent(_this5.$$.content);
          }

          if (!isParentSignal && parentBlock) {
            var index = parentBlock.$$.children.indexOf(_this5);

            if (index !== -1) {
              parentBlock.$$.children.splice(index, 1);
            }
          }

          _this5.$$.content.remove();
        },
        addContent: function addContent(contentToAdd, notRecursive) {
          var index = _this5.$$.content.indexOf(contentToAdd.$[0].previousSibling) + 1;

          if (index === 0) {
            _this5.$$.content = contentToAdd.slice().pushArray(_this5.$$.content.$);
          } else {
            _this5.$$.content = _this5.$$.content.slice(0, index).pushArray(contentToAdd.$).pushArray(_this5.$$.content.slice(index).$);
          }

          if (isParentBlock && !notRecursive) {
            parent.$$.addContent(contentToAdd);
          }
        },
        moveContent: function moveContent(contentToMove, after) {
          var index = _this5.$$.content.indexOf(contentToMove.$[0]);
          var indexToPut = _this5.$$.content.indexOf(after.$[0]) + 1;

          if (indexToPut === 0) {
            _this5.$$.content = contentToMove.slice().pushArray(_this5.$$.content.slice(indexToPut, index).$).pushArray(_this5.$$.content.slice(index + contentToMove.length).$);
          } else if (index > indexToPut) {
            _this5.$$.content = _this5.$$.content.slice(0, indexToPut).pushArray(contentToMove.$).pushArray(_this5.$$.content.slice(indexToPut, index).$).pushArray(_this5.$$.content.slice(index + contentToMove.length).$);
          } else {
            _this5.$$.content = _this5.$$.content.slice(0, index).pushArray(_this5.$$.content.slice(index + contentToMove.length, indexToPut).$).pushArray(contentToMove.$).pushArray(_this5.$$.content.slice(indexToPut).$);
          }

          if (isParentBlock && indexToPut) {
            parent.$$.moveContent(contentToMove, after);
          }
        },
        removeContent: function removeContent(contentToRemove) {
          _this5.$$.content = _this5.$$.content.filter(function (elem) {
            return contentToRemove.indexOf(elem) === -1;
          });

          if (isParentBlock) {
            parent.$$.removeContent(contentToRemove);
          }
        },
        insertInStartOfIt: function insertInStartOfIt(contentToInsert, moveFlag) {
          var prevBlock = _this5.$$.prevBlock;

          var after = afterElem;

          if (prevBlock instanceof Block) {
            after = prevBlock.$$.insertAfterIt(contentToInsert, moveFlag);
          } else if (prevBlock) {
            after = prevBlock;
            contentToInsert.insertAfter(prevBlock);

            if (isParentBlock) {
              if (moveFlag) {
                parent.$$.moveContent(contentToInsert, after);
              } else {
                parent.$$.addContent(contentToInsert, true);
              }
            }
          } else if (isParentBlock) {
            var _prevBlock = parent.$$.prevBlock;


            if (_prevBlock) {
              var notRecursive = void 0;

              if (_prevBlock instanceof Block) {
                after = _prevBlock.$$.insertAfterIt(contentToInsert, moveFlag);
                notRecursive = true;
              } else {
                after = _prevBlock;
                notRecursive = false;
                contentToInsert.insertAfter(_prevBlock);
              }

              if (moveFlag) {
                parent.$$.moveContent(contentToInsert, after);
              } else {
                parent.$$.addContent(contentToInsert, notRecursive);
              }
            } else {
              after = parent.$$.insertInStartOfIt(contentToInsert, moveFlag);
            }
          } else {
            contentToInsert.into(parentElem, false);
          }

          if (moveFlag) {
            _this5.$$.moveContent(contentToInsert, after);
          } else {
            _this5.$$.addContent(contentToInsert, true);
          }

          return after;
        },
        insertAfterIt: function insertAfterIt(contentToInsert, moveFlag) {
          var prevBlock = _this5.$$.prevBlock;

          var after = afterElem;
          var tryToAddOrMove = void 0;

          if (_this5.$$.content.length) {
            after = _this5.$$.content.last();
            tryToAddOrMove = true;
            contentToInsert.insertAfter(after);
          } else if (prevBlock instanceof Block) {
            after = prevBlock.$$.insertAfterIt(contentToInsert, moveFlag);
          } else if (prevBlock) {
            after = prevBlock;
            tryToAddOrMove = true;
            contentToInsert.insertAfter(prevBlock);
          } else if (isParentBlock) {
            after = parent.$$.insertInStartOfIt(contentToInsert, moveFlag);
          } else {
            contentToInsert.into(parentElem, false);
          }

          if (isParentBlock && tryToAddOrMove) {
            if (moveFlag) {
              parent.$$.moveContent(contentToInsert, after);
            } else {
              parent.$$.addContent(contentToInsert);
            }
          }

          return after;
        }
      }
    });

    constructor._variables.forEach(function (variable) {
      _this5[variable] = _this5[variable];
    });
    iterate(constructor.defaultLocals, function (value, variable) {
      _this5[variable] = value;
    });

    var argsObject = Object.create(null);
    var $argsObject = new Super(argsObject);
    var args = Object.create(constructor.defaultArgs || null);
    var wasDRest = void 0;

    new Super(originalArgs).forEach(function (value, arg) {
      var isDRest = dRestRegExp.test(arg);
      var localArgs = isDRest || wasDRest ? Object.create(args) : args;

      args = localArgs;

      if (isDRest) {
        var restArgs = parentScope.$$.evaluate(value, function (value) {
          iterate(localArgs, function (value, arg) {
            delete localArgs[arg];
          });
          defineUsualProperties(localArgs, transformRestArgs(value));
          calculateArgs(args, argsObject, $argsObject);
        }, _this5);

        wasDRest = true;

        return defineUsualProperties(localArgs, transformRestArgs(restArgs));
      }

      var isDElements = name === 'd-elements';
      var forDElements = isDElements && arg === 'value';

      wasDRest = false;

      if (name !== 'd-each' || arg !== 'uid') {
        value = parentScope.$$.evaluate(value, function (value) {
          localArgs[arg] = value;
          calculateArgs(args, argsObject, $argsObject);
        }, _this5, forDElements, isDElements && parentBlock.$$.name === '#d-item');
      }

      defineUsualProperties(localArgs, defineProperty({}, arg, value));
    });

    defineFrozenProperties(this, {
      /**
       * @member {Object} Block#args
       * @type {Object}
       * @public
       */
      args: argsObject,

      /**
       * @member {Object} Block#children
       * @type {Object}
       * @public
       */
      children: children || new Arr([]),

      /**
       * @member {Object} Block#globals
       * @type {Object}
       * @public
       */
      globals: Object.create(parentScope ? Object.create(parentScope.globals) : null),

      /**
       * @member {Block|undefined} Block#parentScope
       * @type {Block|undefined}
       * @public
       */
      parentScope: parentScope
    });

    calculateArgs(args, argsObject, $argsObject);

    if (parentBlock) {
      parentBlock.$$.children.push(this);
    }
  }

  /**
   * @method Block#afterConstruct
   * @public
   * @description Is called after block construction (including all scopes)
   * but before rendering the block and its children.
   */


  createClass(Block, [{
    key: 'afterConstruct',
    value: function afterConstruct() {}

    /**
     * @method Block#afterRender
     * @public
     * @description Is called after block has been rendered.
     */

  }, {
    key: 'afterRender',
    value: function afterRender() {}

    /**
     * @method Block#afterRender
     * @public
     * @description Is called before the block removal.
     */

  }, {
    key: 'beforeRemove',
    value: function beforeRemove() {}

    /**
     * @method Block#evaluateAndWatch
     * @public
     * @param {String} expression - Expression to evaluate.
     * @param {Watcher} callback - Callback which is called when the expression value is changed.
     * @returns {*} Evaluation result.
     * @description Method for evaluating an expression in context of the block and watching for the changes.
     */

  }, {
    key: 'evaluateAndWatch',
    value: function evaluateAndWatch(expression, callback) {
      validate$1([expression], ['string'], 'Block#evaluateAndWatch');

      var _parseJS = parseJS(expression, expression, true);

      var code = _parseJS.expression;
      var original = _parseJS.original;


      var func = constructEvalFunction(code, original);

      return this.$$.parentScope.$$.evaluate(func, callback, this);
    }

    /**
     * @method Block#evaluateOnce
     * @public
     * @param {String} expression - Expression to evaluate.
     * @returns {*} Evaluation result.
     * @description Method for evaluating an expression in context of the block once.
     */

  }, {
    key: 'evaluateOnce',
    value: function evaluateOnce(expression) {
      validate$1([expression], ['string'], 'Block#evaluateOnce');

      var _parseJS2 = parseJS(expression, expression, true);

      var code = _parseJS2.expression;
      var original = _parseJS2.original;


      var func = constructEvalFunction(code, original);

      return this.$$.parentScope.$$.evaluate(func);
    }

    /**
     * @method Block#setLocals
     * @public
     * @param {Object} locals - Object to assign to this.
     * @description Method for simple assigning some values to this.
     */

  }, {
    key: 'setLocals',
    value: function setLocals(locals) {
      assign$1(this, locals);
    }

    /**
     * @method Block#watch
     * @public
     * @param {...('args'|'globals'|String)} [vars] - Vars to watch (args, globals or locals).
     * If no specified all locals, args and globals are to be watched.
     * If the 'args' string all args are to be watched.
     * If the 'globals' string all globals are to be watched.
     * @param {VarsWatcher} watcher - Called when watched vars are changed.
     * @description Method for watching for vars. If no vars passed in arguments
     * all vars are to be watched. If the 'args' string is in the arguments all args are to be watched.
     * If the 'globals' string is in the arguments all globals are to be watched.
     * Otherwise specified vars will be watched.
     * Watchers should not be put inside the constructor. It is considered best
     * practice to do it inside the {@link Block#afterConstruct} method.
     * Note that these expressions (vars, i.e. "args.arg") are not to be
     * evaluated so you cannot put there things like "a[b]" or any js code,
     * only expressions like "a", "b", "args.a", "args.b" and "globals.a", "globals.b".
     * Also note that if there are more than one var that are changed at once (synchronously)
     * the watcher is called only once.
     * Note that the watcher is executed right away because in most cases
     * this behaviour is very convenient.
     *
     * @example
     * class MyBlock extends Block {
     *   static template = '<div />';
     *
     *   afterConstruct() {
     *     this.watch('a', () => {});
     *     this.watch('args.a', 'globals.r', () => {});
     *     this.watch(() => {});
     *   }
     * }
     */

  }, {
    key: 'watch',
    value: function watch() {
      var _this6 = this;

      for (var _len2 = arguments.length, vars = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        vars[_key2] = arguments[_key2];
      }

      var oldWatcher = arguments[arguments.length - 1];

      if (!isFunction(oldWatcher)) {
        console.warn('The last argument (watcher) wasn\'t specified (' + this.$$.name + '#watch)');

        return;
      }

      var watcher = function watcher() {
        oldWatcher();
      };

      if (arguments.length === 1) {
        watchForAllGlobals(this, watcher);
        watchForAllArgs(this, watcher);

        iterate(this.$$.locals, function (_ref2) {
          var watchers = _ref2.watchers;

          watchers.perm.push(watcher);
        });
        oldWatcher();

        return;
      }

      iterate(arguments, function (variable) {
        if (variable === oldWatcher) {
          return;
        }

        variable = '' + variable;

        if (variable === 'args') {
          return watchForAllArgs(_this6, watcher);
        }

        if (variable === 'globals') {
          return watchForAllGlobals(_this6, watcher);
        }

        if (/^args\./.test(variable)) {
          variable = variable.replace(/^args\./, '');

          if (!_this6.$$.args[variable]) {
            return;
          }

          _this6.$$.args[variable].watchers.perm.push(watcher);

          return;
        }

        if (/^globals\./.test(variable)) {
          variable = variable.replace(/^globals\./, '');

          if (!_this6.$$.globals[variable]) {
            return;
          }

          var watchers = _this6.$$.globals[variable].watchers;


          watchers.perm.push(watcher);
          _this6.$$.watchersToRemove.push({
            watcher: watcher,
            watchers: watchers
          });

          return;
        }

        if (!_this6.$$.locals[variable]) {
          return;
        }

        _this6.$$.locals[variable].watchers.perm.push(watcher);
      });

      oldWatcher();
    }
  }]);
  return Block;
}();

Block._blocks = Object.create(rootBlocks);
Block._mixins = Object.create(rootMixins);
Block.collapseWhiteSpace = true;
Block.defaultArgs = null;
Block.defaultLocals = null;
Block.template = '';


new Super(Block.prototype).proto(null);

registerBuiltIns(Blocks, rootBlocks, Block);

var blocks = Block._blocks;

var Mixin = function () {
  function Mixin(opts) {
    var _this7 = this;

    classCallCheck(this, Mixin);
    var name = opts.name;
    var value = opts.value;
    var dynamic = opts.dynamic;
    var elem = opts.elem;
    var args = opts.args;
    var comment = opts.comment;
    var parentBlock = opts.parentBlock;
    var parentScope = opts.parentScope;

    var watchersToRemove = new Arr([]);
    var watchers = new Arr([]);

    defineFrozenProperties(this, {
      $$: {
        name: name,
        _value: value,
        value: value,
        isDynamic: dynamic,
        parentScope: parentScope,
        parentBlock: parentBlock,
        watchers: watchers,
        watchersToRemove: watchersToRemove,
        evaluate: function evaluate(watcher) {
          var _$$ = _this7.$$;
          var isDynamic = _$$.isDynamic;
          var value = _$$.value;
          var _value = _$$._value;

          var currentValue = isDynamic ? value : parentScope.$$.evaluate(_value);

          if (watcher) {
            watchers.push(watcher);
          }

          return currentValue;
        },
        remove: function remove(isParentSignal) {
          removeWatchers(watchersToRemove);

          try {
            _this7.beforeRemove();
          } catch (err) {
            console.error('Uncaught error in ' + name + '#beforeRemove:', err);
          }

          if (!isParentSignal && parentBlock) {
            var index = parentBlock.$$.mixins.indexOf(_this7);

            if (index !== -1) {
              parentBlock.$$.mixins.splice(index, 1);
            }
          }
        }
      }
    });

    this.args = args;
    this.comment = comment;
    this.parentScope = parentScope;
    this.elem = elem;
    this.node = elem.$[0];

    if (parentBlock) {
      parentBlock.$$.mixins.push(this);
    }
  }

  createClass(Mixin, [{
    key: 'afterUpdate',
    value: function afterUpdate() {}
  }, {
    key: 'beforeRemove',
    value: function beforeRemove() {}

    /**
     * @method Block#evaluateAndWatch
     * @public
     * @param {Watcher} callback - Callback which is called when the mixin value is changed.
     * @returns {*} Evaluation result.
     * @description Method for evaluating the mixin value and watching for the changes.
     */

  }, {
    key: 'evaluateAndWatch',
    value: function evaluateAndWatch(callback) {
      return this.$$.evaluate(callback);
    }

    /**
     * @method Block#evaluateOnce
     * @public
     * @returns {*} Evaluation result.
     * @description Method for evaluating the mixin value once.
     */

  }, {
    key: 'evaluateOnce',
    value: function evaluateOnce() {
      return this.$$.evaluate();
    }
  }]);
  return Mixin;
}();

Mixin.evaluate = true;


registerBuiltIns(Mixins, rootMixins, Mixin);

var mixins = Block._mixins;

function initApp(block, node) {
  if (!blocks[block]) {
    throw new Error('No "' + block + '" block is registered! (initApp)');
  }

  var parentElem = new Elem(node);

  parentElem.html('');

  if (!parentElem.length) {
    throw new Error('No valid element to insert the app into was given! (initApp)');
  }

  parentElem.$[0].DwayneRootBlock = createBlock({
    node: {
      name: block,
      attrs: {},
      children: new Arr([])
    },
    parent: parentElem,
    parentElem: parentElem
  });
  parentElem.attr('dwayne-root', block);
}

function removeApp(node) {
  var elem = new Elem(node);

  elem.html('');

  if (!elem.length) {
    throw new Error('No valid element to remove the app from was given! (removeApp)');
  }

  node = elem.$[0];

  if (!node.DwayneRootBlock) {
    throw new Error('No app registered inside the given element! (removeApp)');
  }

  delete node.DwayneRootBlock.$$.remove();
}

function registerBuiltIns(set$$1, scope, proto) {
  iterate(set$$1, function (register) {
    var _register = register(proto, createBlock, Block);

    var name = _register.name;
    var value = _register.value;


    if (proto === Block) {
      var variables = {};

      value._html = transformJSExpressions(markupToJSON('' + (value.template || ''), value.collapseWhiteSpace), variables);
      value._variables = new Super(variables).except('$$', '$').keys();
    } else {
      value._match = constructMixinRegExp(name);
    }

    scope[name] = value;
  });
}

function createBlock(_ref3) {
  var node = _ref3.node;
  var parent = _ref3.parent;
  var parentElem = _ref3.parentElem;
  var parentBlock = _ref3.parentBlock;
  var parentScope = _ref3.parentScope;
  var prevBlock = _ref3.prevBlock;

  var elem = parentElem.prop('namespaceURI') === svgNS ? doc.svg() : new Elem(doc.template().$[0].content);
  var localBlocks = parentScope ? parentScope.$$.ns._blocks : blocks;
  var localMixins = parentScope ? parentScope.$$.ns._mixins : mixins;
  var children = node.children || new Arr([]);
  var args = node.attrs || {};
  var name = node.name || 'UnknownBlock';
  var constructor = node.name && localBlocks[node.name];
  var dBlockMatch = void 0;
  var dBlockName = void 0;
  var dBlockArgs = void 0;
  var dBlockChildren = void 0;
  var dElementsName = void 0;

  if (name === 'd-block' && args.name) {
    name = 'd-elements';
    constructor = localBlocks[name];
    dElementsName = args.name;
    dBlockArgs = new Super(args).except('name').$;
    dBlockChildren = children;
    children = new Arr([]);
    args = {};
  } else if ((dBlockMatch = name.match(/^d-block:([\s\S]+)$/)) || name === 'd-block') {
    constructor = blocks['d-block'];
    dBlockName = dBlockMatch ? dBlockMatch[1] : null;
  }

  var blockInstance = void 0;

  if (constructor) {
    try {
      blockInstance = new constructor({
        name: name,
        args: args,
        dBlockName: dBlockName,
        children: children,
        parent: parent,
        parentElem: parentElem,
        parentBlock: parentBlock,
        parentScope: parentScope,
        prevBlock: prevBlock
      });
    } catch (err) {
      console.error('Uncaught error in new ' + name + ':', err);
      constructor = null;
    }
  }

  if (!constructor) {
    var _ret4 = function () {
      var _node = node;
      var value = _node.value;
      var children = _node.children;


      var element = elem.create(name);
      var currentAttrs = Object.create(null);
      var attrs = Object.create(null);
      var wasDRest = void 0;
      var mixinDefaultOpts = {
        elem: element,
        parentBlock: parentBlock,
        parentScope: parentScope
      };

      new Super(args).forEach(function (value, attr) {
        var isDRest = dRestRegExp.test(attr);
        var localAttrs = isDRest || wasDRest ? Object.create(attrs) : attrs;

        attrs = localAttrs;

        if (isDRest) {
          var restAttrs = parentScope.$$.evaluate(value, function (value) {
            setTimeout(function () {
              iterate(localAttrs, function (value, arg) {
                delete localAttrs[arg];
              });
              assign$1(localAttrs, transformRestAttrs(value, localMixins, mixinDefaultOpts));
              calculateAttrs(attrs, currentAttrs, element, false);
            }, 0);
          }, parentBlock);

          wasDRest = true;

          return assign$1(localAttrs, transformRestAttrs(restAttrs, localMixins, mixinDefaultOpts));
        }

        var match = mixinMatch(localMixins, attr);

        wasDRest = false;

        if (match) {
          if (value === true) {
            value = 'true';
          }

          localAttrs[attr] = {
            type: 'mixin',
            dynamic: false,
            opts: _extends({
              value: value
            }, match, mixinDefaultOpts),
            value: value
          };

          return;
        }

        localAttrs[attr] = {
          type: 'attr',
          value: parentScope.$$.evaluate(value, function (value) {
            localAttrs[attr] = {
              type: 'attr',
              value: value
            };
            calculateAttrs(attrs, currentAttrs, element, false);
          }, parentBlock)
        };
      });

      var createMixins = calculateAttrs(attrs, currentAttrs, element, true);

      if (name === '#comment') {
        element.text(value);
      }

      if (name === '#text') {
        var text = parentScope.$$.evaluate(value, function (value) {
          if (isNil(value)) {
            value = '';
          }

          element.text('' + value);
        }, parentBlock);

        if (isNil(text)) {
          text = '';
        }

        element.text('' + text);
      }

      if (children) {
        (function () {
          var parentElem = name === 'template' ? new Elem(element.$[0].content) : element;
          var prevBlock = void 0;

          children.forEach(function (child) {
            prevBlock = createBlock({
              node: child,
              parent: parentElem,
              parentElem: parentElem,
              parentBlock: parentBlock,
              parentScope: parentScope,
              prevBlock: prevBlock
            });
          });
        })();
      }

      var isParentBlock = parent instanceof Block;

      if (prevBlock instanceof Block) {
        prevBlock.$$.insertAfterIt(element, false);
      } else if (prevBlock) {
        element.insertAfter(prevBlock);

        if (isParentBlock) {
          parent.$$.addContent(element);
        }
      } else if (isParentBlock) {
        parent.$$.insertInStartOfIt(element, false);
      } else {
        element.into(parentElem, false);
      }

      createMixins();

      return {
        v: element
      };
    }();

    if ((typeof _ret4 === 'undefined' ? 'undefined' : _typeof(_ret4)) === "object") return _ret4.v;
  }

  var _blockInstance = blockInstance;
  var $$ = _blockInstance.$$;
  var Args = _blockInstance.args;
  var globals = _blockInstance.globals;
  var locals = objectWithoutProperties(_blockInstance, ['$$', 'args', 'globals']);


  if (dBlockMatch || name === 'd-block') {
    parentScope.$$.dBlocks.push(blockInstance);
  }

  if (dBlockArgs) {
    node = {
      attrs: dBlockArgs,
      children: dBlockChildren
    };
    node.name = parentScope.$$.evaluate(dElementsName, function (newName) {
      node.name = newName;

      var html$$1 = new Arr([node]);

      Args.value = newName === 'd-if' ? transformDIfChildren(html$$1) : html$$1;
    }, blockInstance, true);

    var _html = new Arr([node]);

    Args.value = node.name === 'd-if' ? transformDIfChildren(_html) : _html;
    Args.parentScope = parentScope;
  }

  var html$$1 = name === 'd-elements' ? new Arr(Args.value || []) : constructor._html;

  delete locals.$;
  delete locals.children;
  delete locals.parentScope;

  $$.args = constructPrivateScope(Args);
  $$.locals = constructPrivateScope(locals);
  $$.globals = constructPrivateScope(globals, 'globals', parentScope);

  if (name === '#d-item') {
    var _scopeValues;

    var scopeValues = (_scopeValues = {}, defineProperty(_scopeValues, node.itemName, node.item), defineProperty(_scopeValues, node.indexName, node.index), _scopeValues);
    var scope = parentScope.$$.name === '#d-item' ? parentScope.$$.scope : parentScope;

    $$.ns = parentScope.$$.ns;
    $$.privateScope = constructPrivateScope(scopeValues);
    constructPublicScope($$.scope = Object.create(scope), scopeValues, $$.privateScope);
  }

  if (name === 'd-each') {
    var _Object$create;

    $$.scope = Object.create(parentScope.$$.name === '#d-item' ? parentScope.$$.scope : parentScope, (_Object$create = {}, defineProperty(_Object$create, Args.item || '$item', {
      value: null,
      writable: true
    }), defineProperty(_Object$create, Args.index || '$index', {
      value: null,
      writable: true
    }), _Object$create));
  }

  constructPublicScope(Args, Args, $$.args);
  constructPublicScope(globals, globals, $$.globals);
  constructPublicScope(blockInstance, locals, $$.locals);

  try {
    blockInstance.afterConstruct();
  } catch (err) {
    console.error('Uncaught error in ' + name + '#afterConstruct:', err);
  }

  prevBlock = undefined;
  parentScope = name === 'd-elements' ? Args.parentScope : blockInstance;

  html$$1.forEach(function (child) {
    prevBlock = createBlock({
      node: child,
      parent: blockInstance,
      parentElem: parentElem,
      parentBlock: blockInstance,
      parentScope: parentScope,
      prevBlock: prevBlock
    });
  });

  try {
    blockInstance.afterRender();
  } catch (err) {
    console.error('Uncaught error in ' + name + '#afterRender:', err);
  }

  return blockInstance;
}

function createMixin(_ref4) {
  var name = _ref4.name;
  var Mixin = _ref4.Mixin;
  var dynamic = _ref4.dynamic;
  var value = _ref4.value;
  var args = _ref4.args;
  var comment = _ref4.comment;
  var elem = _ref4.elem;
  var parentBlock = _ref4.parentBlock;
  var parentScope = _ref4.parentScope;

  var mixin = new Mixin({
    name: name,
    value: value,
    dynamic: dynamic,
    args: args,
    comment: comment,
    elem: elem,
    parentBlock: parentBlock,
    parentScope: parentScope
  });

  if (Mixin.evaluate) {
    var _value2 = mixin.value = mixin.evaluateAndWatch(function (newValue, oldValue) {
      mixin.value = newValue;

      try {
        mixin.afterUpdate(newValue, oldValue);
      } catch (err) {
        console.error('Uncaught error in ' + name + '#afterUpdate:', err);
      }
    });

    mixin.afterUpdate(_value2);
  }

  return mixin;
}

function transformDIfChildren(children) {
  return new Arr(children || []).concat({}).object(function (object, child) {
    var name = child.name;
    var html$$1 = object.html;
    var ifElse = object.ifElse;


    if (name !== 'd-else-if' && name !== 'd-else') {
      if (ifElse) {
        html$$1.push({
          name: 'd-if',
          children: ifElse
        });

        object.ifElse = null;
      }

      if (name === 'd-if') {
        object.ifElse = new Arr([child]);
      } else if (name) {
        html$$1.push(child);
      }
    } else {
      (ifElse || html$$1).push(child);

      if (name === 'd-else' && ifElse) {
        html$$1.push({
          name: 'd-if',
          children: ifElse
        });

        object.ifElse = null;
      }
    }

    if (name) {
      child.children = transformDIfChildren(child.children);
    }
  }, {
    html: new Arr([]),
    ifElse: null
  }).$.html;
}

function transformJSExpressions(children, variables) {
  var exclude = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  return new Arr(children || []).object(function (children, child) {
    var name = child.name;
    var attrs = child.attrs;
    var ownChildren = child.children;
    var initialValue = child.value;

    var isDEach = name === 'd-each';
    var value = child.value;

    var excludeLocal = {};

    if (isDEach) {
      var _excludeLocal;

      excludeLocal = (_excludeLocal = {}, defineProperty(_excludeLocal, child.attrs.item || '$item', true), defineProperty(_excludeLocal, child.attrs.index || '$index', true), _excludeLocal);
    }

    child.attrs = new Super(attrs).map(function (value, attr) {
      if (value === true) {
        return true;
      }

      if (value[0] !== '{' || value[value.length - 1] !== '}') {
        return value;
      }

      var parsed = parseJS(value.slice(1, -1), value, true);

      if (!parsed) {
        return value;
      }

      if (parsed.rest) {
        throw new Error('Attribute, mixin and argument computed values must be of the format "{<js_expression>}"');
      }

      var isUID = attr === 'uid';

      var usedVariables = new Super(parsed.variables).filter(function (value, variable) {
        if (isDEach && isUID && excludeLocal[variable]) {
          return;
        }

        if (!exclude[variable]) {
          return true;
        }
      }).$;

      assign$1(variables, usedVariables);

      return constructEvalFunction(parsed.expression, parsed.original);
    }).$;

    if (name !== '#text') {
      exclude = _extends({}, exclude, excludeLocal);

      if (ownChildren) {
        child.children = transformJSExpressions(ownChildren, variables, exclude);
      }

      children.push(child);

      return;
    }

    while (value.length) {
      var match = value.match(curlyBracketRegExp);

      if (!match) {
        children.push({
          name: '#text',
          value: value
        });

        break;
      }

      var index = match.index;


      if (index) {
        children.push({
          name: '#text',
          value: value.slice(0, index)
        });
        value = value.slice(index);
      }

      var parsed = parseJS(value.slice(1), initialValue);

      if (!parsed) {
        children.push({
          name: '#text',
          value: value
        });

        break;
      }

      var usedVariables = new Super(parsed.variables).filter(function (value, variable) {
        if (!exclude[variable]) {
          return true;
        }
      }).$;

      assign$1(variables, usedVariables);

      children.push({
        name: '#text',
        value: constructEvalFunction(parsed.expression, parsed.original)
      });
      value = parsed.rest;
    }
  }, new Arr([]));
}

function isInstanceOf(Class, Subclass) {
  return isPrototypeOf.call(Class, Subclass) && isPrototypeOf.call(Class.prototype, Subclass.prototype);
}

function removeWatchers(watchersToRemove) {
  watchersToRemove.forEach(function (_ref5) {
    var watcher = _ref5.watcher;
    var watchers = _ref5.watchers;

    var index = watchers.indexOf(watcher);

    if (index !== -1) {
      watchers.splice(index, 1);
    }
  });
}

function constructPrivateScope(object, type, parentScope) {
  var scope = {};

  if (type === 'globals') {
    scope = Object.create(parentScope ? parentScope.$$.globals : null);
  }

  return new Super(object).object(function (scope, value, key) {
    scope[key] = {
      value: value,
      watchers: {
        temp: new Arr([]),
        perm: new Arr([])
      }
    };
  }, scope).$;
}

function constructPublicScope(scope, scopeValues, privateScope) {
  new Super(scope).define(new Super(scopeValues).map(function (value, key) {
    var scope = privateScope[key];

    return {
      configurable: false,
      enumerable: true,
      get: function get() {
        if (evalMode) {
          if (getting.indexOf(scope.watchers.temp) === -1) {
            getting.push(scope.watchers.temp);
          }
        }

        return scope.value;
      },
      set: function set(value) {
        if (value === scope.value) {
          return;
        }

        if (!changed) {
          changed = [];
        }

        var oldTempWatchers = scope.watchers.temp.slice();
        var oldValue = scope.value;

        scope.watchers.temp = new Arr([]);
        scope.value = value;

        oldTempWatchers.forEach(function (watcher) {
          watcher.onRemove();
          watcher();
        });
        changed.push({
          scope: scope,
          oldValue: oldValue,
          value: value
        });

        setTimeout(function () {
          if (!changed) {
            return;
          }

          var was = new Arr([]);
          var values = [];

          var _loop = function _loop(i) {
            var _changed$i = changed[i];
            var scope = _changed$i.scope;
            var value = _changed$i.value;
            var oldValue = _changed$i.oldValue;


            scope.watchers.perm.forEach(function (watcher) {
              var index = was.indexOf(watcher);

              if (index === -1) {
                was.push(watcher);
                values.push({
                  value: value,
                  oldValue: oldValue
                });
              } else {
                values[index].oldValue = oldValue;
              }
            });

            changed.splice(i, 1);
          };

          for (var i = changed.length - 1; i >= 0; i--) {
            _loop(i);
          }

          changed = null;

          was.forEach(function (watcher, i) {
            var _values$i = values[i];
            var value = _values$i.value;
            var oldValue = _values$i.oldValue;


            watcher(value, oldValue);
          });
        }, 0);
      }
    };
  }).$);
}

function watchForAllGlobals(block, watcher) {
  var _block$$$ = block.$$;
  var globals = _block$$$.globals;
  var watchersToRemove = _block$$$.watchersToRemove;


  for (var global in globals) {
    /* eslint guard-for-in: 0 */
    var watchers = globals[global].watchers.perm;

    watchers.push(watcher);
    watchersToRemove.push({
      watcher: watcher,
      watchers: watchers
    });
  }
}

function watchForAllArgs(block, watcher) {
  iterate(block.$$.args, function (_ref6) {
    var watchers = _ref6.watchers;

    watchers.perm.push(watcher);
  });
}

function calculateArgs(args, argsObject, $argsObject) {
  $argsObject.propertyNames().forEach(function (arg) {
    if (!(arg in args)) {
      argsObject[arg] = undefined;
    }
  });

  for (var arg in args) {
    argsObject[arg] = args[arg];
  }
}

function transformRestArgs(args) {
  return new Super(args).object(function (args, value, arg) {
    if (dRestRegExp.test(arg)) {
      assign$1(args, transformRestArgs(value));
    } else {
      args[arg] = value;
    }
  }).$;
}

function transformRestAttrs(attrs, mixins, mixinDefaultOpts) {
  return new Super(attrs).object(function (eventualAttrs, value, attr) {
    if (dRestRegExp.test(attr)) {
      return assign$1(eventualAttrs, transformRestAttrs(value, mixins, mixinDefaultOpts));
    }

    var match = mixinMatch(mixins, attr);

    if (match) {
      eventualAttrs[attr] = {
        type: 'mixin',
        dynamic: true,
        opts: _extends({
          value: value
        }, match, mixinDefaultOpts),
        value: value
      };

      return;
    }

    eventualAttrs[attr] = {
      type: 'attr',
      value: value
    };
  }).$;
}

function mixinMatch(mixins, attr) {
  var match = void 0;

  for (var name in mixins) {
    var _Mixin2 = mixins[name];
    var localMatch = attr.match(_Mixin2._match);

    if (localMatch) {
      var argsMatch = localMatch[1];
      var args = void 0;

      if (/^\s*$/.test(argsMatch)) {
        args = [];
      } else if (argsMatch) {
        args = new Str(argsMatch).split(/,\s*/).map(function (s) {
          return new Str(s).trim().$;
        }).$;
      }

      match = {
        args: args,
        comment: localMatch[2],
        Mixin: _Mixin2,
        name: name
      };

      break;
    }
  }

  return match;
}

function calculateAttrs(attrs, attrsObject, elem, firstTime) {
  iterate(attrsObject, function (_ref7, attr) {
    var type = _ref7.type;
    var value = _ref7.value;

    if (!attrs[attr]) {
      if (type === 'attr') {
        elem.removeAttr(attr);
      } else {
        value.$$.remove();
      }

      delete attrsObject[attr];
    }
  });

  var mixins = new Arr([]);

  var _loop2 = function _loop2(attr) {
    var _attrs$attr = attrs[attr];
    var type = _attrs$attr.type;
    var dynamic = _attrs$attr.dynamic;
    var value = _attrs$attr.value;
    var opts = _attrs$attr.opts;

    var nextType = void 0;
    var nextDynamic = void 0;
    var nextValue = void 0;

    if (attrsObject[attr]) {
      var _attrsObject$attr = attrsObject[attr];
      var prevType = _attrsObject$attr.type;
      var prevValue = _attrsObject$attr.value;


      if (type === 'attr') {
        if (prevType === 'mixin') {
          prevValue.$$.remove();
        }

        if (prevValue !== value) {
          elem.attr(attr, value);
        }

        nextValue = value;
      } else {
        (function () {
          var mixin = prevValue;

          if (prevType === 'attr') {
            elem.removeAttr(attr);
          }

          mixin.$$.isDynamic = dynamic;

          if (dynamic) {
            executeMixinWatchers(mixin, value);
          } else if (!mixin.$$.evaluated && opts.Mixin.evaluate) {
            var newValue = mixin.$$.parentScope.$$.evaluate(value, function (newValue) {
              var _attrs$attr2 = attrs[attr];
              var type = _attrs$attr2.type;
              var dynamic = _attrs$attr2.dynamic;


              if (type === 'mixin' && !dynamic) {
                executeMixinWatchers(mixin, newValue);
              }
            }, mixin);

            mixin.$$.evaluated = true;

            executeMixinWatchers(mixin, newValue);
          }

          nextValue = mixin;
        })();
      }

      nextType = type;
      nextDynamic = dynamic;
    } else {
      if (type === 'attr') {
        elem.attr(attr, value);

        nextValue = value;
      } else {
        var buildMixin = function buildMixin() {
          opts.dynamic = dynamic;

          var mixin = createMixin(opts);

          if (!dynamic && opts.Mixin.evaluate) {
            var parentScope = opts.parentScope;
            var _value3 = opts.value;

            var firstValue = parentScope.$$.evaluate(_value3, function (newValue) {
              var _attrs$attr3 = attrs[attr];
              var type = _attrs$attr3.type;
              var dynamic = _attrs$attr3.dynamic;


              if (type === 'mixin' && !dynamic) {
                executeMixinWatchers(mixin, newValue);
              }
            }, mixin);

            mixin.$$.evaluated = true;
            mixin.$$.value = firstValue;
          }

          nextValue = mixin;

          return {
            attr: attr,
            opts: {
              type: type,
              dynamic: dynamic,
              value: mixin
            }
          };
        };

        if (firstTime) {
          mixins.push(buildMixin);
        } else {
          buildMixin();
        }
      }

      nextType = type;
      nextDynamic = dynamic;
    }

    attrsObject[attr] = {
      type: nextType,
      dynamic: nextDynamic,
      value: nextValue
    };
  };

  for (var attr in attrs) {
    _loop2(attr);
  }

  if (firstTime) {
    return function () {
      mixins.forEach(function (buildMixin) {
        var _buildMixin = buildMixin();

        var attr = _buildMixin.attr;
        var opts = _buildMixin.opts;


        attrsObject[attr] = opts;
      });
    };
  }
}

function executeMixinWatchers(mixin, value) {
  var oldValue = mixin.$$.value;

  mixin.$$.value = value;

  mixin.$$.watchers.forEach(function (watcher) {
    watcher(value, oldValue);
  });
}

function constructMixinRegExp(name) {
  return new RegExp('^' + new Str(name).escapeRegExp().$ + '(?:\\(([^\\)]*)\\))?(?:#([\\s\\S]*))?$');
}

function extendBlock(cls) {
  new Super(cls).proto(Block);
  new Super(cls.prototype).proto(Block.prototype);
}

/**
 * @module constants/formats
 * @private
 * @description Exports different types of formatting for {@link Date#format}.
 */

var zero = new Str('0');
var daysOfTheWeekNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var daysOfTheWeekAliases = new Super(daysOfTheWeekNames).map(function (value) {
  return value.slice(0, 3);
}).$;
var monthsNames = ['January', 'February', 'March', 'April', 'May', 'June', 'Jule', 'August', 'September', 'October', 'November', 'December'];
var monthsAliases = new Super(monthsNames).map(function (value) {
  return value.slice(0, 3);
}).$;

/**
 * @callback module:constants/formats~matchCallback
 * @param {Dat} date - D-wrap of a date to apply format to.
 * @param {String} string - Matched applied expression.
 */

/**
 * @typedef {Object} module:constants/formats~formatExpr
 * @property {String} format - Matched format.
 * @property {module:constants/formats~matchCallback} match - Callback if there was a match.
 */

/**
 * @type {module:constants/formats~formatExpr[]}
 * @description Array of different formats.
 */
var formats = [{
  format: 'ccc',
  match: function match(date, utc) {
    return round(date[utc]('c'), 3);
  }
}, {
  format: 'c',
  match: function match(date, utc) {
    return date[utc]('c');
  }
}, {
  format: 'ss',
  match: function match(date, utc) {
    return round(date[utc]('s'), 2);
  }
}, {
  format: 's',
  match: function match(date, utc) {
    return date[utc]('s');
  }
}, {
  format: 'mm',
  match: function match(date, utc) {
    return round(date[utc]('m'), 2);
  }
}, {
  format: 'm',
  match: function match(date, utc) {
    return date[utc]('m');
  }
}, {
  format: 'hh',
  match: function match(date, utc) {
    return round(date[utc]('h'), 2);
  }
}, {
  format: 'h',
  match: function match(date, utc) {
    return date[utc]('h');
  }
}, {
  format: 'dddd',
  match: function match(date, utc) {
    return daysOfTheWeekNames[date[utc]('dw')];
  }
}, {
  format: 'ddd',
  match: function match(date, utc) {
    return daysOfTheWeekAliases[date[utc]('dw')];
  }
}, {
  format: 'dd',
  match: function match(date, utc) {
    return round(date[utc]('d'), 2);
  }
}, {
  format: 'd',
  match: function match(date, utc) {
    return date[utc]('d');
  }
}, {
  format: 'MMMM',
  match: function match(date, utc) {
    return monthsNames[date[utc]('M') - 1];
  }
}, {
  format: 'MMM',
  match: function match(date, utc) {
    return monthsAliases[date[utc]('M') - 1];
  }
}, {
  format: 'MM',
  match: function match(date, utc) {
    return round(date[utc]('M'), 2);
  }
}, {
  format: 'M',
  match: function match(date, utc) {
    return date[utc]('M');
  }
}, {
  format: 'yyyy',
  match: function match(date, utc) {
    return round(date[utc]('y'), 4);
  }
}, {
  format: 'yy',
  match: function match(date, utc) {
    return String(date[utc]('y')).slice(-2);
  }
}, {
  format: 'y',
  match: function match(date, utc) {
    return date[utc]('y');
  }
}];

/**
 * @function round
 * @private
 * @param {Number} number - Number to round.
 * @param {Number} digits - Number of the digits of the output.
 * @returns {String} String with necessary additional starting zeroes.
 */
function round(number, digits) {
  var string = String(number);
  var zeroes = digits - string.length;

  zeroes = zeroes < 0 ? 0 : zeroes;

  return zero.repeat(zeroes).$ + string;
}

/**
 * @module Dat
 * @private
 * @mixin
 * @description Exports Dat class.
 */

/**
 * @typedef {*} DateLike
 * @public
 */

/**
 * @typedef {'c'|'s'|'m'|'h'|'d'|'w'|'M'|'y'} AddPeriod
 * @public
 */

/**
 * @typedef {'c'|'s'|'m'|'h'|'d'|'dw'|'M'|'y'} GetPeriod
 * @public
 */

/**
 * @typedef {'c'|'s'|'m'|'h'|'d'|'M'|'y'} OfOnePeriod
 * @public
 */

/**
 * @typedef {'c'|'s'|'m'|'h'|'d'|'M'|'y'} SetPeriod
 * @public
 */

/**
 * @typedef {'ccc'|'c'|'ss'|'s'|'mm'|'m'|'hh'|'h'|'dddd'|'ddd'|'dd'|'d'|'MMMM'|'MMM'|'MM'|'M'|'yyyy'|'yy'|'y'} Format
 * @public
 */

var coeffs = {
  c: 1,
  s: 1000,
  m: 60000,
  h: 3600000,
  d: 86400000,
  w: 604800000,
  M: 2592000000,
  y: 31536000000
};

var getSwitcher = switcher({
  c: function c(date, utc) {
    return date[utc + 'Milliseconds']();
  },
  s: function s(date, utc) {
    return date[utc + 'Seconds']();
  },
  m: function m(date, utc) {
    return date[utc + 'Minutes']();
  },
  h: function h(date, utc) {
    return date[utc + 'Hours']();
  },
  d: function d(date, utc) {
    return date[utc + 'Date']();
  },
  dw: function dw(date, utc) {
    return date[utc + 'Day']();
  },
  M: function M(date, utc) {
    return date[utc + 'Month']() + 1;
  },
  y: function y(date, utc) {
    return date[utc + 'FullYear']();
  }
}, 'equals', NaN);
var setSwitcher = switcher({
  c: function c(date, value, utc) {
    return date[utc + 'Milliseconds'](value);
  },
  s: function s(date, value, utc) {
    return date[utc + 'Seconds'](value);
  },
  m: function m(date, value, utc) {
    return date[utc + 'Minutes'](value);
  },
  h: function h(date, value, utc) {
    return date[utc + 'Hours'](value);
  },
  d: function d(date, value, utc) {
    return date[utc + 'Date'](value);
  },
  M: function M(date, value, utc) {
    return date[utc + 'Month'](value - 1);
  },
  y: function y(date, value, utc) {
    return date[utc + 'FullYear'](value);
  }
});

/**
 * @class Dat
 * @extends Super
 * @public
 * @param {Date} [date = new Date()] - A date to wrap.
 * @returns {Dat} Instance of Dat.
 * @description Wrap of a date.
 *
 * @example
 * const date = new Dat(new Date());
 */

var Dat = function (_Super) {
  inherits(Dat, _Super);

  function Dat() {
    var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
    classCallCheck(this, Dat);
    return possibleConstructorReturn(this, (Dat.__proto__ || Object.getPrototypeOf(Dat)).call(this, date));

    /**
     * @member Dat#$
     * @type {Date}
     * @public
     * @description Original date.
     */
  }

  /**
   * @method Dat#add
   * @public
   * @param {AddPeriod|Object.<AddPeriod, Number>} what - What to add.
   * @param {Number} [number] - Number of what to add if the first argument is a period string.
   * @returns {Dat} Returns this.
   * @description Method for adding amounts of time to the date. Returns new instance of Dat.
   *
   * @example
   * new Dat(new Date('1999-12-31T23:59:59.999Z')).add('c', 2).toISOString();         // '2000-01-01T00:00:00.001Z'
   * new Dat(new Date('1999-12-31T23:59:59.999Z')).add({ c: 2, d: 5 }).toISOString(); // '2000-01-06T00:00:00.001Z'
   */


  createClass(Dat, [{
    key: 'add',
    value: function add(what, number) {
      if (arguments.length >= 2) {
        what = defineProperty({}, what, number);
      }

      return this.time(this.time() + new Super(what).sum(function (value, what) {
        return coeffs[what] * value;
      }));
    }

    /**
     * @method Dat#expires
     * @public
     * @param {*} [value = this] - Value to resolve after the date expires.
     * @returns {Promise} New instance of Promise.
     * @description Method for defining when the date expires.
     *
     * @example
     * new Dat().add('c', 500).expires('Expired').then((value) => {
     *   // After 500 milliseconds
     *   console.log(value); // 'Expired'
     * });
     */

  }, {
    key: 'expires',
    value: function expires(value) {
      if (!arguments.length) {
        value = this;
      }

      return new Num(this.$ - now()).timeout(value);
    }

    /**
     * @method Dat#format
     * @public
     * @param {String} string - Template for the output.
     * @param {String} [prefix = ''] - If needed [all special strings]{@link Format}
     * are treated as they should be prefix with prefix.
     * @returns {String} Formatted string.
     * @description Method for creating formatted output based on a string.
     *
     * @example
     * new Dat('1999-12-31T23:59:59.999Z').format('Seconds: $ss, milliseconds: $ccc.', '$');
     * // 'Seconds: 59, milliseconds: 999.'
     */

  }, {
    key: 'format',
    value: function format(string) {
      var _this2 = this;

      var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      string = new Str(new Super(string).$);
      prefix = String(new Super(prefix).$);

      iterate(formats, function (format) {
        string = string.replaceString(prefix + format.format, format.match(_this2, 'get'));
      });

      return string.$;
    }

    /**
     * @method Dat#formatUTC
     * @public
     * @param {String} string - See {@link Dat#format}.
     * @param {String} [prefix = ''] - See {@link Dat#format}.
     * @returns {String} Formatted string.
     * @description UTC version of {@link Dat#format}.
     *
     * @example
     * new Dat('1999-07-07T03:09:09.099Z').formatUTC(
     *   `
     *     Milliseconds: $ccc|$c.
     *     Seconds:      $ss|$s.
     *     Minutes:      $mm|$m.
     *     Hours:        $hh|$h.
     *     Day:          $dddd|$ddd|$dd|$d.
     *     Month:        $MMMM|$MMM|$MM|$M.
     *     Year:         $yyyy|$yy|$y.
     *   `,
     *   '$'
     * );
     * // Milliseconds: 099|99.
     * // Seconds:      09|9.
     * // Minutes:      09|9.
     * // Hours:        03|3.
     * // Day:          Friday|Fri|07|7.
     * // Month:        July|Jul|07|7.
     * // Year:         1999|99|1999.
     */

  }, {
    key: 'formatUTC',
    value: function formatUTC(string) {
      var _this3 = this;

      var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      string = new Str(new Super(string).$);
      prefix = String(new Super(prefix).$);

      iterate(formats, function (format) {
        string = string.replaceString(prefix + format.format, format.match(_this3, 'getUTC'));
      });

      return string.$;
    }

    /**
     * @method Dat#get
     * @public
     * @param {GetPeriod} what - What to get.
     * @returns {Number} Number of what to get.
     * @description Method for getting values such as seconds or minutes.
     *
     * @example
     * new Dat(new Date('1999-12-31T23:59:59.999Z')).get('s'); // 59
     */

  }, {
    key: 'get',
    value: function get(what) {
      return getSwitcher(what, [this.$, 'get']);
    }

    /**
     * @method Dat#getUTC
     * @public
     * @param {GetPeriod} what - See {@link Dat#get}.
     * @returns {Number} Number of what to get.
     * @description UTC version of {@link Dat#get}.
     *
     * @example
     * const date = new Dat(new Date('1999-12-31T23:59:59.999Z'));
     *
     * date.getUTC('c');  // 999
     * date.getUTC('s');  // 59
     * date.getUTC('m');  // 59
     * date.getUTC('h');  // 23
     * date.getUTC('d');  // 31
     * date.getUTC('dw'); // 5
     * date.getUTC('M');  // 12
     * date.getUTC('y');  // 1999
     */

  }, {
    key: 'getUTC',
    value: function getUTC(what) {
      return getSwitcher(what, [this.$, 'getUTC']);
    }

    /**
     * @method Dat#isAfter
     * @public
     * @param {DateLike} date - Date to be compared to this date.
     * @returns {Boolean} If this date is after the argument one.
     * @description Finds out if this date is after the argument one.
     *
     * @example
     * new Dat(new Date(333)).isAfter(new Date(334)); // false
     * new Dat(new Date(333)).isAfter(new Date(332)); // true
     */

  }, {
    key: 'isAfter',
    value: function isAfter(date) {
      date = new Date(new Super(date).$);

      return date.getTime() < this.$.getTime();
    }

    /**
     * @method Dat#isBefore
     * @public
     * @param {DateLike} date - Date to be compared to this date.
     * @returns {Boolean} If this date is before the argument one.
     * @description Finds out if this date is before the argument one.
     *
     * @example
     * new Dat(new Date(333)).isBefore(new Date(334)); // true
     * new Dat(new Date(333)).isBefore(new Date(332)); // false
     */

  }, {
    key: 'isBefore',
    value: function isBefore(date) {
      date = new Date(new Super(date).$);

      return date.getTime() > this.$.getTime();
    }

    /**
     * @method Dat#isBetween
     * @public
     * @param {DateLike} date1 - Start of the range.
     * @param {DateLike} date2 - End of the range.
     * @returns {Boolean} If this date is after date1 and before date2.
     * @description Finds out if this date is after date1 and before date2.
     *
     * @example
     * new Dat(new Date(333)).isBetween(new Date(332), new Date(334)); // true
     * new Dat(new Date(333)).isBetween(new Date(334), new Date(332)); // false
     */

  }, {
    key: 'isBetween',
    value: function isBetween(date1, date2) {
      var time = this.$.getTime();

      date1 = new Date(new Super(date1).$);
      date2 = new Date(new Super(date2).$);

      return time > date1.getTime() && time < date2.getTime();
    }

    /**
     * @method Dat#isInvalid
     * @public
     * @returns {Boolean} If the date is invalid.
     * @description Returns if the date is invalid.
     *
     * @example
     * new Dat(new Date('a')).isInvalid(); // true
     * new Dat(new Date(1)).isInvalid();   // false
     */

  }, {
    key: 'isInvalid',
    value: function isInvalid() {
      return this.$.toString() === 'Invalid Date';
    }

    /**
     * @method Dat#isPassed
     * @public
     * @returns {Boolean} If the date is passed.
     * @description Returns if the date is passed.
     *
     * @example
     * new Dat(new Date(1)).isPassed(); // true
     */

  }, {
    key: 'isPassed',
    value: function isPassed() {
      return this.isBefore(now());
    }

    /**
     * @method Dat#ofOne
     * @public
     * @param {OfOnePeriod} what - Period to check.
     * @param {DateLike} date - Date to check.
     * @returns {Boolean} If two dates are of one second, minute or something else.
     * @description Returns if two dates are of one second, minute or something else.
     *
     * @example
     * new Dat(new Date('1999-12-31T23:59:59.000Z')).ofOne('s', new Date(1999-12-31T23:59:59.333Z')); // true
     * new Dat(new Date('1999-12-31T23:59:59.000Z')).ofOne('s', new Date(1999-12-31T23:59:58.999Z')); // false
     */

  }, {
    key: 'ofOne',
    value: function ofOne(what, date) {
      var _this4 = this;

      if (!(what in coeffs) || what === 'w') {
        return false;
      }

      date = new Dat(new Date(date));

      var started = void 0;

      return iterate(coeffs, function (coeff, w) {
        if (w === what) {
          started = true;
        }

        if (!started || w === 'w') {
          return;
        }

        if (started && _this4.get(w) !== date.get(w)) {
          return false;
        }
      }) !== false;
    }

    /**
     * @method Dat#set
     * @public
     * @param {SetPeriod|Object.<SetPeriod, Number>} what - What to add.
     * @param {Number} [number] - Number of what to set if the first argument is a period string.
     * @returns {Dat} Returns this.
     * @description Method for setting values such as seconds or minutes.
     *
     * @example
     * new Dat(new Date('1999-12-31T23:59:59.999Z')).set('s', 58).get('s');           // 58
     * new Dat(new Date('1999-12-31T23:59:59.999Z')).set({ c: 998, s: 58 }).get('c'); // 998
     */

  }, {
    key: 'set',
    value: function set(what, number) {
      var date = this.$;

      if (arguments.length >= 2) {
        what = defineProperty({}, what, number);
      }

      what = new Super(what).$;

      iterate(what, function (value, what) {
        setSwitcher(what, [date, value, 'set']);
      });

      return this;
    }

    /**
     * @method Dat#setUTC
     * @public
     * @param {SetPeriod|Object.<SetPeriod, Number>} what - See {@link Dat#set}.
     * @param {Number} [number] - See {@link Dat#set}.
     * @returns {Dat} Returns this.
     * @description UTC version of {@link Dat#set}.
     *
     * @example
     * const date = new Dat(new Date('1999-12-31T23:59:59.999Z'));
     *
     * date.setUTC('ccc', 998).getUTC('ccc'); // 998
     * date.setUTC({
     *   s: 58,
     *   m: 58,
     *   h: 22
     * });
     *
     * date.getUTC('s'); // 58
     * date.getUTC('m'); // 58
     * date.getUTC('h'); // 23
     */

  }, {
    key: 'setUTC',
    value: function setUTC(what, number) {
      var date = this.$;

      if (arguments.length >= 2) {
        what = defineProperty({}, what, number);
      }

      what = new Super(what).$;

      iterate(what, function (value, what) {
        setSwitcher(what, [date, value, 'setUTC']);
      });

      return this;
    }

    /**
     * @method Dat#setUTC
     * @public
     * @param {Number} [time] - Time to set.
     * @returns {Dat|Number} - If the time argument is present this is returned otherwise the time is returned.
     * @description Synonym for both
     * [Date#getTime]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime} and
     * [Date#setTime]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date/setTime}.
     */

  }, {
    key: 'time',
    value: function time(_time) {
      var date = this.$;

      if (arguments.length) {
        date.setTime(_time);
      }

      return date.getTime();
    }
  }, {
    key: 'toISOString',
    value: function toISOString() {
      return this.$.toISOString();
    }
  }, {
    key: 'toLocaleString',
    value: function toLocaleString() {
      return this.$.toLocaleString();
    }
  }, {
    key: 'toString',
    value: function toString() {
      return this.$.toString();
    }
  }, {
    key: 'valueOf',
    value: function valueOf() {
      return this.$.valueOf();
    }
  }]);
  return Dat;
}(Super);

defineProperties(Dat.prototype, defineProperty({}, _Symbol.toStringTag, 'Dat'));

constructors[1].push({
  check: isDate,
  cls: Dat
});

/**
 * @function now
 * @public
 * @returns {Number} Number of milliseconds.
 * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date/now
 * @description Synonym for
 * [Date.now]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date/now}.
 */
function now() {
  return Date.now();
}

/**
 * @function date
 * @public
 * @param {DateLike} [date = new Date()] - Date-like value that is passed to the Date constructor.
 * @returns {Dat} New instance of Dat.
 * @description Synonym for new Dat(new Date(date));
 */
function date(date) {
  if (!arguments.length) {
    return new Dat(new Date(now()));
  }

  date = new Super(date).$;

  return new Dat(new Date(date));
}

/**
 * @module helpers/constructURL
 * @private
 * @description Exports constructURL method.
 */

/**
 * @type {RegExp}
 * @description Absolute URL pattern.
 */
var absoluteURLRegexp = /^(([a-z][a-z\d+\-.]*:)?\/\/|data:[a-z]+\/[a-z]+;base64,)/i;
var querySwitcher = switcher('call', function () {
  return new Arr([]);
}).case(isArray, function (prefix, query) {
  var queryParams = new Arr([]);

  iterate(query, function (value) {
    if (isPlainObject(value) || isArray(value)) {
      queryParams = queryParams.concat(querySwitcher(value, [prefix + '[]']));

      return;
    }

    queryParams.push({
      param: prefix + '[]',
      value: value
    });
  });

  return queryParams.$;
}).case(isPlainObject, function (prefix, query) {
  var queryParams = new Arr([]);

  iterate(query, function (value, param) {
    if (isPlainObject(value) || isArray(value)) {
      queryParams = queryParams.concat(querySwitcher(value, [prefix ? prefix + '[' + param + ']' : param]));

      return;
    }

    queryParams.push({
      param: prefix ? prefix + '[' + param + ']' : param,
      value: isObject(value) ? JSON.stringify(value) : String(value)
    });
  });

  return queryParams.$;
});

/**
 * @function constructURL
 * @param {String} baseURL - BaseURL of the output URL.
 * @param {String} url - Main part of the output URL.
 * @param {Object} params - Params to replace in the url expressions like ":param".
 * @param {Object} query - Object with query params.
 * @param {Object} [hash = ''] - URL hash.
 * @param {Object} [encodeOptions = {}] - If you need to encode something.
 * @param {Object} [encodeOptions.params = true] - If you need to encode params.
 * @param {Object} [encodeOptions.query = true] - If you need to encode query params.
 * @returns {String} Constructed URL.
 * @description Function for constructing URL from the base URL, URL, params and query params.
 */
var constructURL = (function (baseURL, url, params, query) {
  var hash = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
  var encodeOptions = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
  var _encodeOptions$params = encodeOptions.params;
  var encodeParams = _encodeOptions$params === undefined ? true : _encodeOptions$params;
  var _encodeOptions$query = encodeOptions.query;
  var encodeQuery = _encodeOptions$query === undefined ? true : _encodeOptions$query;

  var URL = isAbsolute(url) ? url : String(baseURL).replace(/\/+$/, '') + '/' + String(url).replace(/^\/+/, '');

  iterate(params, function (value, param) {
    URL = new Str(URL).replaceString(':' + param, encode(value, encodeParams)).$;
  });

  var queryParams = querySwitcher(query, ['']);

  if (queryParams.length) {
    URL += (URL.indexOf('?') === -1 ? '?' : '&') + queryParams.map(function (_ref) {
      var param = _ref.param;
      var value = _ref.value;
      return encode(param, encodeQuery) + '=' + encode(value, encodeQuery);
    }).join('&');
  }

  return '' + URL + (hash ? '#' + hash : '');
});

/**
 * @function isAbsolute
 * @param {String} url - URL to check if it is absolute or not.
 * @returns {Boolean} If the argument URL is absolute or not.
 */
function isAbsolute(url) {
  return absoluteURLRegexp.test(url);
}

/**
 * @function encode
 * @param {String} string - String to encode using encodeURIComponent.
 * @param {Boolean} isEncoded - If the string should be encoded.
 * @returns {String} Encoded string.
 */
function encode(string, isEncoded) {
  return isEncoded ? encodeURIComponent(string) : string;
}

/**
 * @module helpers/parseHeaders
 * @private
 * @description Exports parseHeaders method.
 */

/**
 * @function parseHeaders
 * @param {String} rawHeaders - Raw headers.
 * @returns {Object} Headers object
 * @description Function for parsing raw headers.
 */
var parseHeaders = (function (rawHeaders) {
  var headers = {};

  iterate((rawHeaders || '').split('\n'), function (value) {
    var index = value.indexOf(':');
    var key = new Str(value.substring(0, index)).trim().toCamelCase().$;
    var val = new Str(value.substring(index + 1)).trim().$;

    if (key) {
      headers[key] = (headers[key] ? headers[key] + ', ' : '') + val;
    }
  });

  return headers;
});

/**
 * @module helpers/transformData
 * @private
 * @description Exports transformData method.
 */

var notToTransform = new Arr(['FormData', 'File', 'Blob', 'ArrayBuffer', 'String', 'Number']);
var withoutBody = new Arr(['DELETE', 'GET', 'HEAD']);

/**
 * @function transformData
 * @param {*} data - Data to transform
 * @param {String} method - HTTP method.
 * @param {Object} headers - Object with headers.
 * @returns {*} - Transformed data.
 */
var transformData = (function (data, method, headers) {
  data = new Super(data).$;

  if (withoutBody.indexOfStrict(method) !== -1) {
    return null;
  }

  if (isObject(data) && notToTransform.indexOfStrict(toStringTag(data)) === -1) {
    if (!headers.contentType) {
      headers.contentType = ['application/json;charset=utf-8'];
    }

    return new Super(data).json();
  }

  return data;
});

/**
 * @module Fetch
 * @private
 * @mixin
 * @description Exports Fetch class.
 */

/**
 * @typedef {'get'|'post'|'delete'|'head'|'put'|'patch'} FetchMethod
 * @public
 */

/**
 * @typedef {Object} FetchConfig
 * @public
 * @property {Array.<AfterMiddleware|FetchErrorAfterMiddleware>} [after]
 * @property {Object} [auth]
 * @property {String} [auth.username]
 * @property {String} [auth.password]
 * @property {String} [baseURL]
 * @property {Array.<BeforeMiddleware|FetchErrorBeforeMiddleware>} [before]
 * @property {*} [data]
 * @property {Object.<String, String[]>} [headers]
 * @property {FetchMethod} [method]
 * @property {Object} [params]
 * @property {Object} [query]
 * @property {String} [responseType]
 * @property {Number} [timeout]
 * @property {String} [url]
 * @property {Boolean} [withCredentials]
 */

/**
 * @typedef {Object} FetchResponse
 * @public
 * @property {FetchConfig} config
 * @property {*} data
 * @property {Object.<String, String>} headers
 * @property {Number} status
 * @property {String} statusText
 * @property {XMLHttpRequest} xhr
 */

/**
 * @callback FetchAfterMiddleware
 * @public
 * @param {FetchResponse} config - Fetch response.
 */

/**
 * @callback FetchErrorAfterMiddleware
 * @public
 * @param {Error|*} err - Thrown error.
 * @param {FetchResponse} config - Fetch response.
 */

/**
 * @callback FetchBeforeMiddleware
 * @public
 * @param {FetchConfig} config - Fetch config.
 */

/**
 * @callback FetchErrorBeforeMiddleware
 * @public
 * @param {Error|*} err - Thrown error.
 * @param {FetchConfig} config - Fetch config.
 */

/**
 * @callback FetchConfigFunction
 * @public
 * @param {FetchConfig} config
 */

var defaults$1 = {
  after: [],
  auth: {
    username: '',
    password: ''
  },
  baseURL: global$1.location.origin,
  before: [],
  data: null,
  headers: {},
  method: 'get',
  params: {},
  query: {},
  responseType: '',
  timeout: 0,
  url: '',
  withCredentials: false
};
var uploadMethods = new Arr(['post', 'put']);

/**
 * @class Fetch
 * @extends Function
 * @public
 * @param {FetchConfig} [config = {}] - A number to wrap.
 * @returns {Fetch} Instance of Fetch.
 * An instance of Fetch is a function that simply calls #request with the same arguments.
 * @description Class for fetching data.
 *
 * @example
 * const fetch = new Fetch();
 *
 * fetch('/data').then((res) => {
 *   console.log(res);
 * });
 */

var Fetch = function (_Function) {
  inherits(Fetch, _Function);

  function Fetch() {
    var _ret;

    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, Fetch);

    var _this = possibleConstructorReturn(this, (Fetch.__proto__ || Object.getPrototypeOf(Fetch)).call(this));

    function fetch() {
      return fetch.request.apply(fetch, arguments);
    }

    var conf = new Super({}).deepAssign(defaults$1, config).$;

    if (conf.before.indexOf(fetchBeforeMiddleware) === -1) {
      conf.before.push(fetchBeforeMiddleware);
    }

    /**
     * @member {FetchConfig} Fetch#$$
     * @type {FetchConfig}
     * @public
     * @description Fetch config.
     */
    Object.defineProperty(fetch, '$$', { value: conf });
    Object.setPrototypeOf(fetch, Fetch.prototype);

    return _ret = fetch, possibleConstructorReturn(_this, _ret);
  }

  /**
   * @method Fetch#after
   * @public
   * @param {FetchAfterMiddleware|FetchErrorAfterMiddleware} middleware - Middleware to add.
   * @param {Boolean|*} [afterAll = true] - Boolean parameter where to put the middleware.
   * Truthy parameter stands for "to the end" and falsey for "to the beginning".
   * @returns {Fetch} Returns this.
   * @description Middleware that is called after the request.
   * If the middleware has 2 or less arguments it's treated as success middleware otherwise as an error one.
   * If the middleware returns a promise it becomes a part of the middleware chain.
   *
   * @example
   * const fetch = new Fetch()
   *   .after((err, res) => {
   *     console.log(err);
   *
   *     throw err;
   *   })
   *   .after((res) => {
   *     res.json = D(res.data).parseJSON():
   *   });
   */


  createClass(Fetch, [{
    key: 'after',
    value: function after(middleware) {
      var afterAll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      validate$1([middleware], ['function'], 'Fetch#after');

      var after = this.$$.after;


      if (afterAll) {
        after.push(middleware);
      } else {
        after.unshift(middleware);
      }

      return this;
    }

    /**
     * @method Fetch#before
     * @public
     * @param {FetchBeforeMiddleware|FetchErrorBeforeMiddleware} middleware - Middleware to add.
     * @param {Boolean|*} [beforeAll = true] - Boolean parameter where to put the middleware.
     * Truthy parameter stands for "to the beginning" and falsey for "to the end".
     * @returns {Fetch} Returns this.
     * @description Middleware that is called before the request.
     * If the middleware has 2 or less arguments it's treated as success middleware otherwise as an error one.
     * If the middleware returns a promise it becomes a part of the middleware chain.
     *
     * @example
     * const fetch = new Fetch()
     *   .before((err, req) => {
     *     console.log(err);
     *
     *     throw err;
     *   })
     *   .before((req) => {
     *     if (req.url === '/veryLongRequest') {
     *       req.timeout = 30000;
     *     }
     *   });
     */

  }, {
    key: 'before',
    value: function before(middleware) {
      var beforeAll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      validate$1([middleware], ['function'], 'Fetch#before');

      var before = this.$$.before;


      if (beforeAll) {
        before.unshift(middleware);
      } else {
        before.push(middleware);
      }

      return this;
    }

    /**
     * @method Fetch#config
     * @public
     * @param {String|FetchConfig|FetchConfigFunction} [property] - If it's a function
     * it's called with the fetch config argument, if it's a string the value argument
     * is used for assigning this property to the fetch config
     * otherwise it's assigned to the fetch config.
     * @param {*} [value] - See the property argument.
     * @returns {Fetch|FetchConfig} If the argument is present this is returned otherwise the fetch config is returned.
     * @description Method for getting and setting config.
     *
     * @example
     * const fetch = new Fetch();
     *
     * fetch.config({ baseURL: 5000 });
     * fetch.config().timeout; // 5000
     *
     * fetch.config((config) => {
     *   config.baseURL += '/api';
     * });
     */

  }, {
    key: 'config',
    value: function config(property, value) {
      var conf = this.$$;

      if (!arguments.length) {
        return conf;
      }

      if (isFunction(property)) {
        property(conf);
      } else {
        if (arguments.length >= 2) {
          property = defineProperty({}, property, value);
        }

        new Super(conf).deepAssign(property);
      }

      return this;
    }

    /**
     * @method Fetch#delete
     * @public
     * @param {String} [url] - See {@link Fetch#request}.
     * @param {FetchConfig} [config] - See {@link Fetch#request}.
     * @returns {Promise.<FetchResponse, Error>} See {@link Fetch#request}.
     * @description Shorthand for #request for delete requests.
     *
     * @example
     * new Fetch().delete('/data').then((res) => {
     *   console.log(res);
     * });
     */

  }, {
    key: 'delete',
    value: function _delete(url) {
      var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (!isString(url)) {
        config = url;
        url = undefined;
      }

      return this.request(url, assign$1({ method: 'delete' }, config));
    }

    /**
     * @method Fetch#get
     * @public
     * @param {String} [url] - See {@link Fetch#request}.
     * @param {FetchConfig} [config] - See {@link Fetch#request}.
     * @returns {Promise.<FetchResponse, Error>} See {@link Fetch#request}.
     * @description Shorthand for #request for get requests.
     *
     * @example
     * new Fetch().get('/data').then((res) => {
     *   console.log(res);
     * });
     */

  }, {
    key: 'get',
    value: function get(url) {
      var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (!isString(url)) {
        config = url;
        url = undefined;
      }

      return this.request(url, assign$1({ method: 'get' }, config));
    }

    /**
     * @method Fetch#head
     * @public
     * @param {String} [url] - See {@link Fetch#request}.
     * @param {FetchConfig} [config] - See {@link Fetch#request}.
     * @returns {Promise.<FetchResponse, Error>} See {@link Fetch#request}.
     * @description Shorthand for #request for head requests.
     *
     * @example
     * new Fetch().head('/data').then((res) => {
     *   console.log(res);
     * });
     */

  }, {
    key: 'head',
    value: function head(url) {
      var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (!isString(url)) {
        config = url;
        url = undefined;
      }

      return this.request(url, assign$1({ method: 'head' }, config));
    }

    /**
     * @method Fetch#headers
     * @public
     * @param {String|Object.<String, String|String[]>} header - A header string or an object of the following format:
     * { [header]: [value1, value2, ...] }.
     * @param {String|String[]} [value] - Header value. If the first argument is a string
     * this has to be a header value or an array of header values.
     * @returns {Fetch} Returns this.
     * @description Method for setting request headers.
     *
     * @example
     * const fetch = new Fetch()
     *   .headers('Header1', 'Value')
     *   .headers('Header2', ['Value1', 'Value2'])
     *   .headers({
     *     Header3: ['Value1', 'Value2']
     *   });
     */

  }, {
    key: 'headers',
    value: function headers(header, value) {
      var headers = this.$$.headers;


      if (arguments.length >= 2) {
        header = defineProperty({}, header, value);
      }

      iterate(header, function (value, header) {
        var array$$1 = headers[header] || [];
        var toPush = isArray(value) ? value : [value];

        (headers[header] = array$$1).push.apply(array$$1, toPush);
      });

      return this;
    }

    /**
     * @method Fetch#instance
     * @public
     * @param {FetchConfig} [config] - New config if needed.
     * @returns {Fetch} New instance of Fetch.
     * @description Method for creating new fetch instances based on already existent.
     *
     * @example
     * const mainFetch = new Fetch({
     *   baseURL: '//other.domain.com/api',
     *   withCredentials: true
     * });
     *
     * const longFetch = mainFetch.instance({
     *   timeout: 10000
     * });
     */

  }, {
    key: 'instance',
    value: function instance() {
      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var dataConfig = new Super(config).hasOwn('data') ? { data: config.data } : {};

      delete config.data;

      var conf = new Super({}).deepAssign(this.$$, config).assign(dataConfig).$;

      return new Fetch(conf);
    }

    /**
     * @method Fetch#patch
     * @public
     * @param {String} [url] - See {@link Fetch#request}.
     * @param {*} [data] - Additional parameter for uploading data.
     * @param {FetchConfig} [config] - See {@link Fetch#request}.
     * @returns {Promise.<FetchResponse, Error>} See {@link Fetch#request}.
     * @description Shorthand for #request for head requests.
     *
     * @example
     * new Fetch().patch('/data', { user: 'John' }).then((res) => {
     *   console.log(res);
     * });
     */

  }, {
    key: 'patch',
    value: function patch(url) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      if (arguments.length && !isString(url)) {
        config = data;
        data = url;
        url = undefined;
      }

      return this.request(url, assign$1({ method: 'patch', data: data }, config));
    }

    /**
     * @method Fetch#post
     * @public
     * @param {String} [url] - See {@link Fetch#request}.
     * @param {*} [data] - Additional parameter for uploading data.
     * @param {FetchConfig} [config] - See {@link Fetch#request}.
     * @returns {Promise.<FetchResponse, Error>} See {@link Fetch#request}.
     * @description Shorthand for #request for head requests.
     *
     * @example
     * new Fetch().post('/data', { user: 'John' }).then((res) => {
     *   console.log(res);
     * });
     */

  }, {
    key: 'post',
    value: function post(url) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      if (arguments.length && !isString(url)) {
        config = data;
        data = url;
        url = undefined;
      }

      return this.request(url, assign$1({ method: 'post', data: data }, config));
    }

    /**
     * @method Fetch#put
     * @public
     * @param {String} [url] - See {@link Fetch#request}.
     * @param {*} [data] - Additional parameter for uploading data.
     * @param {FetchConfig} [config] - See {@link Fetch#request}.
     * @returns {Promise.<FetchResponse, Error>} See {@link Fetch#request}.
     * @description Shorthand for #request for head requests.
     *
     * @example
     * new Fetch().put('/data', { user: 'John' }).then((res) => {
     *   console.log(res);
     * });
     */

  }, {
    key: 'put',
    value: function put(url) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      if (arguments.length && !isString(url)) {
        config = data;
        data = url;
        url = undefined;
      }

      return this.request(url, assign$1({ method: 'put', data: data }, config));
    }

    /**
     * @method Fetch#request
     * @public
     * @param {String} [url] - URL for the request.
     * @param {FetchConfig} [config] - Additional config for this particular request.
     * @returns {Promise.<FetchResponse, Error>} Promise that is resolved with the request response.
     * @description Main function for making requests. All request methods call this method
     * including the fetch instance itself.
     *
     * @example
     * const fetch = new Fetch();
     *
     * fetch.request('/data', { timeout: 1000 }).then((res) => {
     *   console.log(res);
     * });
     *
     * fetch.request({ timeout: 1000 }).then((res) => {
     *   console.log(res);
     * });
     *
     * fetch.request().then((res) => {
     *   console.log(res);
     * });
     */

  }, {
    key: 'request',
    value: function request(url) {
      var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (arguments.length === 1 && !isString(url)) {
        config = url;
      }

      var dataConfig = new Super(config).hasOwn('data') ? { data: config.data } : {};
      var urlConfig = isString(url) ? { url: url } : {};

      delete config.data;

      var conf = new Super(this.$$).deepClone().deepAssign(urlConfig, config).assign(dataConfig).$;

      var xhr = void 0;
      var promise = Promise$1.resolve();

      iterate(conf.before, function (middleware) {
        promise = promise.then(function () {
          if (middleware.length >= 2) {
            return Promise$1.resolve();
          }

          return new Promise$1(function (resolve) {
            resolve(middleware(conf));
          });
        }, function (err) {
          if (middleware.length < 2) {
            return Promise$1.reject(err);
          }

          return new Promise$1(function (resolve) {
            resolve(middleware(err, conf));
          });
        });
      });

      promise = promise.then(function () {
        return new Promise$1(function (resolve, reject) {
          var after = conf.after;
          var _conf$auth = conf.auth;
          var username = _conf$auth.username;
          var password = _conf$auth.password;
          var data = conf.data;
          var headers = conf.headers;
          var method = conf.method;
          var onprogress = conf.onprogress;
          var responseType = conf.responseType;
          var timeout = conf.timeout;
          var url = conf.url;
          var withCredentials = conf.withCredentials;


          xhr = new XMLHttpRequest();

          xhr.open(method, url, true, username, password);

          iterate(headers, function (value, header) {
            xhr.setRequestHeader(header, value);
          });

          if (onprogress) {
            if (uploadMethods.indexOfStrict(method) === -1) {
              xhr.onprogress = onprogress;
            } else {
              xhr.upload.onprogress = onprogress;
            }
          }

          xhr.onabort = function () {
            var error = new Error('Request was aborted');

            error.type = 'ABORT_ERROR';

            reject(error);

            xhr = null;
          };

          xhr.onerror = function () {
            var error = new Error('Network error');

            error.type = 'NETWORK_ERROR';

            reject(error);

            xhr = null;
          };

          xhr.ontimeout = function () {
            var error = new Error('Request time exceeded');

            error.type = 'TIMEOUT_ERROR';

            reject(error);

            xhr = null;
          };

          xhr.onreadystatechange = function () {
            if (!xhr || !xhr.status || xhr.readyState !== 4) {
              return;
            }

            var response = {
              config: conf,
              data: !responseType || responseType === 'text' ? xhr.responseText : xhr.response,
              headers: parseHeaders(xhr.getAllResponseHeaders()),
              status: xhr.status === 1223 ? 204 : xhr.status,
              statusText: xhr.status === 1223 ? 'No Content' : xhr.statusText,
              xhr: xhr
            };

            var promise = Promise$1.resolve();

            iterate(after, function (middleware) {
              promise = promise.then(function () {
                if (middleware.length >= 2) {
                  return Promise$1.resolve();
                }

                return new Promise$1(function (resolve) {
                  resolve(middleware(response));
                });
              }, function (err) {
                if (middleware.length < 2) {
                  return Promise$1.reject(err);
                }

                return new Promise$1(function (resolve) {
                  resolve(middleware(err, response));
                });
              });
            });

            resolve(promise.then(function () {
              return response;
            }).catch(function (err) {
              try {
                err.response = response;
              } catch (e) {
                throw err;
              }

              throw err;
            }));
          };

          xhr.responseType = responseType;
          xhr.timeout = Number(timeout) || 0;
          xhr.withCredentials = !!withCredentials;

          xhr.send(data);
        });
      });

      promise.abort = function abort() {
        if (xhr) {
          xhr.abort();
        }

        return this;
      };

      return promise;
    }
  }]);
  return Fetch;
}(Function);

defineProperties(Fetch.prototype, defineProperty({}, _Symbol.toStringTag, 'Fetch'));

/**
 * @function fetchBeforeMiddleware
 * @private
 * @param {FetchConfig} config
 * @description Built-in before middleware for url, data, method, headers construction.
 */
function fetchBeforeMiddleware(config) {
  var baseURL = config.baseURL;
  var data = config.data;
  var headers = config.headers;
  var method = config.method;
  var params = config.params;
  var query = config.query;
  var url = config.url;

  var METHOD = method.toUpperCase();

  config.method = METHOD;
  config.url = constructURL(baseURL, url, params, query);
  config.data = transformData(data, METHOD, headers);
  config.headers = new Super(headers).object(function (headers, values, header) {
    header = new Str(header).toCapitalCase().replace(/\s+/g, '-').$;

    headers[header] = values.join(', ');
  }).$;
}

/**
 * @const {Fetch} fetch
 * @type {Fetch}
 * @public
 * @description Empty instance of Fetch.
 */
var fetch = new Fetch();

/**
 * @module helpers/resolveURL
 * @private
 * @description Exports Object.assign-like method.
 */

var _global$2 = global$1;
var location$1 = _global$2.location;


var resolveURL = (function (decodeQuery) {
  var query = location$1.search;
  var hash = location$1.hash;

  var params = {
    query: {},
    hash: hash.replace(/^#/, '')
  };

  if (!query) {
    return params;
  }

  new Str(query.replace(/^\?/, '')).split('&').forEach(function (rawParam) {
    var _rawParam$split = rawParam.split('=');

    var _rawParam$split2 = slicedToArray(_rawParam$split, 2);

    var param = _rawParam$split2[0];
    var _rawParam$split2$ = _rawParam$split2[1];
    var value = _rawParam$split2$ === undefined ? '' : _rawParam$split2$;


    param = decodeQuery ? decodeURIComponent(param) : param;
    value = decodeQuery ? decodeURIComponent(value) : value;

    if (!/^[^[]+/.test(param)) {
      return;
    }

    var paramName = void 0;
    var paramObject = params.query;

    new Str(param).match(/^[^[\]]*|\[[^[\]]*]/g).forEach(function (name) {
      if (name.indexOf('[')) {
        paramName = name;

        return;
      }

      name = name.slice(1, -1);

      paramObject = paramObject[paramName] = paramObject[paramName] || (name ? {} : []);
      paramName = name || paramObject.length;
    });

    paramObject[paramName] = value;
  });

  return params;
});

/**
 * @module Router
 * @private
 * @mixin
 * @description Exports Router.
 */

var Routes = new Arr([]);
var currentRoutes = new Arr([]);
var subscribers = {};
var _global$1 = global$1;
var history = _global$1.history;
var location = _global$1.location;
var initialURL = _global$1.location.href;

var initialized = void 0;
var pushed = void 0;
var wasRoot = void 0;
var wasDefault = void 0;
var rootRoute = void 0;
var redirectRoute = void 0;
var redirectRouteIsNeededToPush = false;
var RedirectRoute = void 0;
var defaultRoute = void 0;
var DefaultRoute = void 0;
var currentRoute = void 0;
var currentRouteParams = void 0;

var pathSwitcher = switcher('call', function () {
  throw new Error('State path must be a string, a regular expression or undefined! (at registerState)');
}).case(isRegExp, function (path) {
  return {
    path: path.source.replace(/\\\//g, '/'),
    url: path,
    params: {}
  };
}).case(isNil, function () {
  return {
    path: '/',
    url: '/',
    params: {}
  };
}).case(isString, function (path) {
  if (path.indexOf('/')) {
    throw new Error('If route path is a string it must start with "/"! (at registerState)');
  }

  var index = path.indexOf('?');
  var params = new Super({});
  var newURL = '';
  var newPath = new Str(path).slice(0, index === -1 ? path.length : index).replace(/^\/|\/$/g).split(/\//).map(function (part, i, array$$1) {
    if (!part && array$$1.length > 1) {
      throw new Error('If route path is a string it must not contain "//" or end with "/"! (at makeRoute)');
    }

    var index = part.indexOf(':');

    if (index > 0) {
      throw new Error('If route path is a string resource part must be either a string or an URL parameter! (at makeRoute)');
    }

    if (index === -1) {
      return {
        url: part,
        value: part
      };
    }

    var _resolveParameter = resolveParameter(part.slice(1), 'URL parameter must not be an empty string or contain characters besides "a-zA-Z_$"! (at makeRoute)', 'URL parameter regexp validator must be within parentheses (e.g. :userId(\\d+) and not contain ones)! (at makeRoute)');

    var name = _resolveParameter.name;
    var _resolveParameter$reg = _resolveParameter.regexp;
    var regexp = _resolveParameter$reg === undefined ? /[^/]*/ : _resolveParameter$reg;


    params.$[name] = params.count;

    return {
      type: 'param',
      url: ':' + name,
      value: regexp
    };
  }).word(function (_ref) {
    var type = _ref.type;
    var url = _ref.url;
    var value = _ref.value;

    var newPath = void 0;

    if (type === 'param') {
      newPath = '(' + value.source.replace(/\\\//g, '/') + ')';
    } else {
      newPath = new Str(value).escapeRegExp().$;
    }

    newURL += '/' + url;

    return '/' + newPath;
  });

  return {
    path: newPath,
    url: newURL,
    params: params.$
  };
});

var router = {
  buildURL: buildURL,
  go: go,
  goToURL: goToURL,
  pushURL: pushURL,
  redirect: redirect,
  redirectToURL: redirectToURL,
  replaceURL: replaceURL
};

var Route = function Route(options) {
  classCallCheck(this, Route);

  options = options || {};

  var _ref2 = options || {};

  var name = _ref2.name;
  var _ref2$path = _ref2.path;
  var path = _ref2$path === undefined ? '/' : _ref2$path;
  var _ref2$abstract = _ref2.abstract;
  var abstract = _ref2$abstract === undefined ? false : _ref2$abstract;
  var parent = _ref2.parent;
  var _ref2$decodeQuery = _ref2.decodeQuery;
  var decodeQuery = _ref2$decodeQuery === undefined ? true : _ref2$decodeQuery;
  var _ref2$encodeQuery = _ref2.encodeQuery;
  var encodeQuery = _ref2$encodeQuery === undefined ? true : _ref2$encodeQuery;
  var _ref2$decodeParams = _ref2.decodeParams;
  var decodeParams = _ref2$decodeParams === undefined ? true : _ref2$decodeParams;
  var _ref2$encodeParams = _ref2.encodeParams;
  var encodeParams = _ref2$encodeParams === undefined ? true : _ref2$encodeParams;

  var _pathSwitcher = pathSwitcher(path);

  var relativeURL = _pathSwitcher.url;
  var relativePath = _pathSwitcher.path;
  var params = _pathSwitcher.params;

  var query = {};

  new Super(this).assign({
    name: name,
    parentName: parent,
    abstract: !!abstract,
    children: new Arr([]),
    decodeParams: !!decodeParams,
    decodeQuery: !!decodeQuery,
    encodeParams: !!encodeParams,
    encodeQuery: !!encodeQuery,
    params: params,
    query: query,
    relativePath: relativePath,
    relativeURL: relativeURL
  });

  var index = isString(path) ? path.indexOf('?') : -1;

  if (index !== -1) {
    new Str(path).replace(/&$/).slice(index + 1).split('&').forEach(function (param) {
      var _resolveParameter2 = resolveParameter(param, 'Query parameter must not be an empty string or contain characters besides "a-zA-Z_$"! (at makeRoute)', 'Query parameter regexp validator must be within parentheses (e.g. :userId(\\d+)) and not contain them! (at makeRoute)');

      var name = _resolveParameter2.name;
      var _resolveParameter2$re = _resolveParameter2.regexp;
      var regexp = _resolveParameter2$re === undefined ? /[\s\S]*/ : _resolveParameter2$re;


      query[name] = new RegExp('^' + regexp.source.replace(/\\\//g, '/') + '$');
    });
  }

  if (name === defaultRoute && (new Super(params).count || new Super(query).count)) {
    throw new Error('Default route must not have URL or query params! (at makeRoute)');
  }
};

var baseRoute = new Route();

function initRouter() {
  if (initialized) {
    return;
  }

  initialized = true;
  RedirectRoute = (Routes.find(function (_ref3) {
    var name = _ref3.name;
    return name === redirectRoute;
  }) || {}).value;
  DefaultRoute = (Routes.find(function (_ref4) {
    var name = _ref4.name;
    return name === defaultRoute;
  }) || {}).value;

  if (redirectRoute && !RedirectRoute) {
    throw new Error('There is no specified fallback route ("' + redirectRoute + '")! (at initRouter)');
  }

  Routes.forEach(function (route) {
    var parentName = route.parentName;
    var name = route.name;

    var ParentName = parentName || rootRoute;

    var _ref5 = Routes.find(function (_ref6) {
      var name = _ref6.name;
      return name === ParentName;
    }) || {};

    var parent = _ref5.value;


    if (!parent) {
      throw new Error('No such parent route ("' + ParentName + '") found for the route ("' + name + '")! (at initRouter)');
    }

    if (!parent.abstract && name !== rootRoute) {
      throw new Error('Parent route must be abstract (for "' + name + '")! (at initRouter)');
    }

    if (name !== rootRoute) {
      route.parentName = ParentName;
    }

    route.parent = name === rootRoute ? baseRoute : parent;
  }).forEach(function (route) {
    var name = route.name;
    var _route$parent = route.parent;
    var parentParams = _route$parent.params;
    var parentQuery = _route$parent.query;
    var path = _route$parent.path;
    var params = route.params;
    var query = route.query;
    var relativeURL = route.relativeURL;
    var relativePath = route.relativePath;

    var proto = route;
    var count = 0;
    var newPath = relativePath;
    var newURL = '';

    if (isRegExp(path)) {
      throw new Error('URL regexp route cannot be extended! (at initRouter)');
    }

    while (proto = proto.parent) {
      count += new Super(proto.params).count;
      newPath = proto.relativePath + newPath;
      newURL = proto.relativeURL + newURL;

      proto.children.push(route);
    }

    newPath = new RegExp('^' + (newPath.replace(/\/+/g, '/').replace(/\/$/, '') || '/') + '$');
    newURL = isRegExp(relativeURL) ? newPath : (newURL + relativeURL).replace(/\/+/g, '/').replace(/\/$/, '') || '/';

    new Super(query).proto(parentQuery);
    new Super(params).proto(parentParams).forEach(function (value, key, params) {
      params[key] += count;
    });

    if (name === defaultRoute && (new Super(params).count || new Super(query).count)) {
      throw new Error('Default route must not have URL or query params! (at initRouter)');
    }

    route.url = newURL;
    route.validatePath = newPath;
  });

  changeRoute();

  win.on({
    popstate: function popstate() {
      if (location.href !== initialURL) {
        pushed = true;
      }

      if (pushed) {
        changeRoute();
      }
    },
    click: function click(e) {
      var closestLink = new Elem(e.target).closest('a');

      if (closestLink.length && closestLink.attr('target') !== '_blank' && !closestLink.hasAttr('no-routing')) {
        var push = !closestLink.hasAttr('replace');

        e.preventDefault();

        forward(closestLink.attr('href') || '', push);
      }
    }
  });
}

function makeRoute(options) {
  return function (Block) {
    var _class, _temp;

    options = assign$1({}, options, Block.routerOptions);

    var _ref7 = options || {};

    var name = _ref7.name;
    var path = _ref7.path;
    var abstract = _ref7.abstract;
    var root = _ref7.root;
    var fallbackTo = _ref7.fallbackTo;
    var _ref7$replace = _ref7.replace;
    var replace = _ref7$replace === undefined ? true : _ref7$replace;
    var isDefault = _ref7.default;


    if (initialized) {
      console.warn('Router was already initialized (at makeRoute)');

      return self$1;
    }

    if (wasRoot && root) {
      throw new Error('There can\'t be two root routes ("' + rootRoute + '" and "' + name + '")! (at makeRoute)');
    }

    if (wasDefault && isDefault) {
      throw new Error('There can\'t be two default routes ("' + defaultRoute + '" and "' + name + '")! (at makeRoute)');
    }

    if (!name) {
      throw new Error('State must have a non-empty string "name" property! (at makeRoute)');
    }

    if (Routes.some(function (_ref8) {
      var Name = _ref8.name;
      return Name === name;
    })) {
      throw new Error('State must have unique "name" property! (at makeRoute)');
    }

    if (root) {
      wasRoot = true;
      rootRoute = name;
      options.parent = null;

      if (fallbackTo) {
        redirectRoute = fallbackTo;
        redirectRouteIsNeededToPush = !replace;
      }
    }

    if (isDefault) {
      wasDefault = true;
      defaultRoute = name;

      if (abstract) {
        throw new Error('Default route can\'t be abstract! (at makeRoute)');
      }

      if (isRegExp(path)) {
        throw new Error('Default route can\'t have a regexp path! (at makeRoute)');
      }
    }

    var route = new Route(options);

    Routes.push(route);

    var unsubscribe = void 0;
    var routeLoaded = void 0;

    return _temp = _class = function (_Block) {
      inherits(_class, _Block);

      function _class(opts) {
        classCallCheck(this, _class);

        var _this = possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, opts));

        if (root) {
          initRouter();

          _this.globals.router = router;
        }

        _this.__routerInstance__ = route;
        _this.__isCurrentRoute__ = currentRoutes.includes(route);
        _this.__wasRouteActive__ = _this.__isCurrentRoute__;
        _this.args.route = currentRouteParams;

        routeLoaded = false;
        unsubscribe = subscribe(name, function (action) {
          var isCurrentRoute = action !== 'leave';

          _this.__isCurrentRoute__ = isCurrentRoute;

          if (isCurrentRoute) {
            _this.__wasRouteActive__ = true;
            _this.args.route = currentRouteParams;
          }

          if (action === 'load') {
            callBeforeLoad(_this);
          } else if (action === 'leave') {
            callBeforeLeave(_this);
          }
        });

        if (_this.__isCurrentRoute__) {
          callBeforeLoad(_this);
        }
        return _this;
      }
      /* eslint prefer-template: 0 */


      createClass(_class, [{
        key: 'beforeRemove',
        value: function beforeRemove() {
          unsubscribe();
          unsubscribe = null;
          callBeforeLeave(this);
          get$1(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'beforeRemove', this).call(this);
        }
      }]);
      return _class;
    }(Block), _class.template = '<d-if if="{__wasRouteActive__}">' + '<div' + ('  class="dwayne-route route-' + (name + (abstract ? ' abstract-route' : '')) + '"') + '  d-class="{{ \'active-route\': __isCurrentRoute__ }}"' + '  d-show="{__isCurrentRoute__}"' + '>' + Block.template + '</div>' + '</d-if>', _temp;

    function callBeforeLoad(route) {
      if (routeLoaded) {
        return;
      }

      var block = {
        $$: {
          children: new Arr([route])
        }
      };
      var wasRoute = void 0;

      block.$$.children.forEach(function beforeLoad(block) {
        if (block.__routerInstance__) {
          if (wasRoute) {
            return;
          }

          wasRoute = true;
        }

        var _block$$$ = block.$$;
        var name = _block$$$.name;
        var children = _block$$$.children;
        var mixins = _block$$$.mixins;


        if (children) {
          children.forEach(beforeLoad);
        }

        if (mixins) {
          mixins.forEach(beforeLoad);
        }

        if (block.beforeLoadRoute) {
          try {
            block.beforeLoadRoute();
          } catch (err) {
            console.error('Uncaught error in ' + name + '#beforeLoad:', err);
          }
        }
      });

      routeLoaded = true;
    }

    function callBeforeLeave(route) {
      if (!routeLoaded) {
        return;
      }

      var block = {
        $$: {
          children: new Arr([route])
        }
      };
      var wasRoute = void 0;

      block.$$.children.forEach(function beforeLeave(block) {
        if (block.__routerInstance__) {
          if (wasRoute) {
            return;
          }

          wasRoute = true;
        }

        var _block$$$2 = block.$$;
        var name = _block$$$2.name;
        var children = _block$$$2.children;
        var mixins = _block$$$2.mixins;


        if (children) {
          children.forEach(beforeLeave);
        }

        if (mixins) {
          mixins.forEach(beforeLeave);
        }

        if (block.beforeLeaveRoute) {
          try {
            block.beforeLeaveRoute();
          } catch (err) {
            console.error('Uncaught error in ' + name + '#beforeLeave:', err);
          }
        }
      });

      routeLoaded = false;
    }
  };
}

function subscribe(name, callback) {
  subscribers[name] = callback;

  return function () {
    delete subscribers[name];
  };
}

function forward(url, push) {
  changeHistory(url, push);
  changeRoute();
}

function changeRoute() {
  var route = findRouteByURL();

  if (route) {
    currentRoute = route.route;
    currentRouteParams = objectWithoutProperties(route, ['route']);

    assign$1(currentRouteParams, {
      name: currentRoute.name,
      host: location.host,
      hostname: location.hostname,
      href: location.href,
      origin: location.origin,
      pathname: location.pathname,
      port: location.port,
      protocol: location.protocol,
      search: location.search
    });
  } else {
    if (redirectRoute) {
      var _RedirectRoute = RedirectRoute;
      var url = _RedirectRoute.url;
      var encodeParams = _RedirectRoute.encodeParams;
      var encodeQuery = _RedirectRoute.encodeQuery;


      return forward(constructURL('', url, {}, {}, '', {
        params: encodeParams,
        query: encodeQuery
      }), redirectRouteIsNeededToPush);
    }

    currentRoute = null;
    currentRouteParams = null;
  }

  var routesToLeave = new Arr([]);
  var routesToLoad = new Arr([]);
  var parent = void 0;

  while (currentRoutes.length && !parent) {
    var _route = currentRoutes.pop();

    if (_route.children.includes(currentRoute)) {
      currentRoutes.push(_route);
      parent = _route;
    } else {
      routesToLeave.push(_route);
    }
  }

  if (currentRoute) {
    var currentParent = currentRoute;

    while (currentParent !== parent && currentParent !== baseRoute) {
      routesToLoad.unshift(currentParent);
      currentParent = currentParent.parent;
    }

    currentRoutes.push.apply(currentRoutes, toConsumableArray(routesToLoad.$));
  }

  routesToLeave.forEach(function (_ref9) {
    var name = _ref9.name;

    if (subscribers[name]) {
      subscribers[name]('leave');
    }
  });
  currentRoutes.forEach(function (route) {
    var name = route.name;


    if (subscribers[name]) {
      subscribers[name](routesToLoad.includes(route) ? 'load' : 'update');
    }
  });
}

function findRouteByURL() {
  var pathname = location.pathname || '/';
  var search = location.search || '';
  var urlParams = void 0;

  Routes.some(function (route) {
    if (route.abstract) {
      return;
    }

    var routeURL = route.url;
    var validatePath = route.validatePath;
    var params = route.params;
    var requiredQuery = route.query;
    var decodeParams = route.decodeParams;
    var decodeQuery = route.decodeQuery;

    var resolved = resolveURL(decodeQuery);
    var query = new Super(resolved.query);
    var eventualParams = {};
    var match = ((pathname.replace(/\/$/, '') || '/') + (isRegExp(routeURL) ? search : '')).match(validatePath);

    if (!match) {
      return;
    }

    /* eslint guard-for-in: 0 */
    for (var param in requiredQuery) {
      if (!query.hasOwn(param) || !requiredQuery[param].test(query.$[param])) {
        return;
      }
    }

    match.shift();

    for (var _param in params) {
      eventualParams[_param] = decode(match[params[_param]], decodeParams);
    }

    urlParams = {
      route: route,
      params: eventualParams,
      query: query.$,
      hash: resolved.hash
    };

    return true;
  });

  if (urlParams) {
    return urlParams;
  }

  if (!defaultRoute) {
    return;
  }

  return _extends({
    route: DefaultRoute,
    params: {}
  }, resolveURL(DefaultRoute.decodeQuery));
}

function decode(string, decodeParams) {
  return decodeParams ? decodeURIComponent(string) : string;
}

function changeHistory(url, push) {
  try {
    history[push ? 'pushState' : 'replaceState'](null, null, url);
    pushed = true;
  } catch (err) {
    location.href = url;
  }
}

function resolveParameter(param, nameErrorName, valueErrorName) {
  var nameMatch = param.match(/^[a-z_$]+/i);

  if (!nameMatch) {
    throw new Error(nameErrorName);
  }

  var name = nameMatch[0];
  var value = param.slice(name.length);
  var regexp = void 0;

  if (value && (value.indexOf('(') || value.indexOf(')') !== value.length - 1)) {
    throw new Error(valueErrorName);
  }

  if (value) {
    regexp = new RegExp(value.slice(1, -1));
  }

  return {
    name: name,
    regexp: regexp
  };
}

function buildURL(name) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var _ref10 = Routes.find(function (_ref11) {
    var n = _ref11.name;
    return n === name;
  }) || {};

  var route = _ref10.value;


  if (!route) {
    throw new Error('There are no routes with name "' + name + '"! (at router.buildURL)');
  }

  var url = route.url;
  var encodeParams = route.encodeParams;
  var encodeQuery = route.encodeQuery;


  if (isRegExp(url)) {
    throw new Error('URL can be built only from the string URLs! (at router.buildURL)');
  }

  var _options$params = options.params;
  var params = _options$params === undefined ? {} : _options$params;
  var _options$query = options.query;
  var query = _options$query === undefined ? {} : _options$query;
  var _options$hash = options.hash;
  var hash = _options$hash === undefined ? '' : _options$hash;


  return constructURL('', url, params, query, hash, {
    params: encodeParams,
    query: encodeQuery
  });
}

function go(name, options) {
  forward(buildURL(name, options), true);
}

function goToURL(url) {
  forward(url, true);
}

function pushURL(url) {
  changeHistory(url, true);
}

function redirect(name, options) {
  forward(buildURL(name, options));
}

function redirectToURL(url) {
  forward(url);
}

function replaceURL(url) {
  changeHistory(url);
}



var statics = Object.freeze({
	D: D$2,
	isArray: isArray,
	isArrayLike: isArrayLike,
	isBoolean: isBoolean,
	isDate: isDate,
	isDateLike: isDateLike,
	isElement: isElement,
	isFinite: isFinite,
	isFunction: isFunction,
	isInteger: isInteger,
	isIntegerLike: isIntegerLike,
	isNaN: isNaN,
	isNull: isNull,
	isNil: isNil,
	isNumber: isNumber,
	isNumberLike: isNumberLike,
	isObject: isObject,
	isPlainObject: isPlainObject,
	isPrimitive: isPrimitive,
	isRegExp: isRegExp,
	isString: isString,
	isSymbol: isSymbol,
	isUndefined: isUndefined,
	Alphabet: Alphabet,
	alphabet: alphabet,
	Arr: Arr,
	array: array,
	iterate: iterate$1,
	BlobObject: BlobObject,
	blob: blob$1,
	Block: Block,
	Mixin: Mixin,
	initApp: initApp,
	removeApp: removeApp,
	Dat: Dat,
	now: now,
	date: date,
	Elem: Elem,
	win: win,
	doc: doc,
	html: html,
	body: body,
	head: head$1,
	find: _find,
	parseHTML: parseHTML,
	px: px,
	Fetch: Fetch,
	fetch: fetch,
	Func: Func,
	method: method,
	noop: noop,
	prop: prop$1,
	self: self$1,
	Num: Num,
	rand: rand,
	random: random$1,
	Promise: Promise$1,
	makeRoute: makeRoute,
	router: router,
	Str: Str,
	parseJSON: parseJSON$1,
	Super: Super,
	Switcher: Switcher,
	switcher: switcher,
	when: when
});

var D$$1 = D$2;


assign$1(D$$1, statics);

delete D$$1.D;

export { D$2 as D, isArray, isArrayLike, isBoolean, isDate, isDateLike, isElement, isFinite, isFunction, isInteger, isIntegerLike, isNaN, isNull, isNil, isNumber, isNumberLike, isObject, isPlainObject, isPrimitive, isRegExp, isString, isSymbol, isUndefined, Alphabet, alphabet, Arr, array, iterate$1 as iterate, BlobObject, blob$1 as blob, Block, Mixin, initApp, removeApp, Dat, now, date, Elem, win, doc, html, body, head$1 as head, _find as find, parseHTML, px, Fetch, fetch, Func, method, noop, prop$1 as prop, self$1 as self, Num, rand, random$1 as random, Promise$1 as Promise, makeRoute, router, Str, parseJSON$1 as parseJSON, Super, Switcher, switcher, when };export default D$$1;
