/**
 * @module constants/elements
 * @private
 * @description Exports different canvas methods for {@link Elem} for creating html-elements.
 */

/**
 * @const
 * @type {String[]}
 */
export const canvasGetMethods = [
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
  'measureText'
];

export const canvasRestMethods = [
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
  'translate'
];
