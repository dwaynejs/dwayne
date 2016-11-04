/**
 * @module constants/elements
 * @private
 * @description Exports methods for {@link Elem} for creating html-elements.
 */

/**
 * @const
 * @type {String[]}
 */
export const htmlElements = [
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
  'wbr'
];

export const svgElements = [
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
  'vkern'
];

export const voidElements = [
  'area',
  'base',
  'br',
  'col',
  'command',
  'embed',
  'hr',
  'img',
  'input',
  'keygen',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr'
];
