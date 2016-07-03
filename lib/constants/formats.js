/**
 * @module constants/formats
 * @private
 * @description Exports different types of formatting for {@link Date#format}.
 */

import Str from '../String';

const zero = new Str('0');

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
export default [
  {
    format: 'ccc',
    match: (date, utc) => round(date[utc]('c'), 3)
  },
  {
    format: 'c',
    match: (date, utc) => cut(date[utc]('c'), 3, 1).replace(/^0\./, '')
  },
  {
    format: 'ss',
    match: (date, utc) => round(date[utc]('s'), 2)
  },
  {
    format: 's',
    match: (date, utc) => String(date[utc]('s'))
  },
  {
    format: 'mm',
    match: (date, utc) => round(date[utc]('m'), 2)
  },
  {
    format: 'm',
    match: (date, utc) => String(date[utc]('m'))
  },
  {
    format: 'hh',
    match: (date, utc) => round(date[utc]('h'), 2)
  },
  {
    format: 'h',
    match: (date, utc) => String(date[utc]('h'))
  },
  {
    format: 'dddd',
    match: (date, utc) => date[utc]('dwn')
  },
  {
    format: 'ddd',
    match: (date, utc) => date[utc]('dwa')
  },
  {
    format: 'dd',
    match: (date, utc) => round(date[utc]('d'), 2)
  },
  {
    format: 'd',
    match: (date, utc) => String(date[utc]('d'))
  },
  {
    format: 'MMMM',
    match: (date, utc) => date[utc]('Mn')
  },
  {
    format: 'MMM',
    match: (date, utc) => date[utc]('Ma')
  },
  {
    format: 'MM',
    match: (date, utc) => round(date[utc]('M'), 2)
  },
  {
    format: 'M',
    match: (date, utc) => String(date[utc]('M'))
  },
  {
    format: 'yyyy',
    match: (date, utc) => round(date[utc]('y'), 4)
  },
  {
    format: 'yy',
    match: (date, utc) => String(date[utc]('y')).slice(2)
  },
  {
    format: 'y',
    match: (date, utc) => date[utc]('y')
  }
];

/**
 * @function round
 * @private
 * @param {Number} number - Number to round.
 * @param {Number} digits - Number of the digits of the output.
 * @returns {String} String with necessary additional starting zeroes.
 */
function round(number, digits) {
  const string = String(number);
  let zeroes = digits - string.length;
  zeroes = zeroes < 0 ? 0 : zeroes;

  return zero.repeat(zeroes).$ + string;
}

/**
 * @function cut
 * @private
 * @param {Number} number - Number to cut.
 * @param {Number} max - Number of digits in number.
 * @param {Number} digits - Number of the digits of the output.
 * @returns {string} Cut input.
 */
function cut(number, max, digits) {
  return (number / Math.pow(10, max)).toFixed(digits);
}
