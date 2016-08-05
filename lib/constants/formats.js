/**
 * @module constants/formats
 * @private
 * @description Exports different types of formatting for {@link Date#format}.
 */

import Super from '../Super';
import Str from '../Str';

const zero = new Str('0');
const daysOfTheWeekNames = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];
const daysOfTheWeekAliases = new Super(daysOfTheWeekNames).map((value) => value.slice(0, 3)).$;
const monthsNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'Jule',
  'August',
  'September',
  'October',
  'November',
  'December'
];
const monthsAliases = new Super(monthsNames).map((value) => value.slice(0, 3)).$;

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
    match: (date, utc) => date[utc]('c')
  },
  {
    format: 'ss',
    match: (date, utc) => round(date[utc]('s'), 2)
  },
  {
    format: 's',
    match: (date, utc) => date[utc]('s')
  },
  {
    format: 'mm',
    match: (date, utc) => round(date[utc]('m'), 2)
  },
  {
    format: 'm',
    match: (date, utc) => date[utc]('m')
  },
  {
    format: 'hh',
    match: (date, utc) => round(date[utc]('h'), 2)
  },
  {
    format: 'h',
    match: (date, utc) => date[utc]('h')
  },
  {
    format: 'dddd',
    match: (date, utc) => daysOfTheWeekNames[date[utc]('dw')]
  },
  {
    format: 'ddd',
    match: (date, utc) => daysOfTheWeekAliases[date[utc]('dw')]
  },
  {
    format: 'dd',
    match: (date, utc) => round(date[utc]('d'), 2)
  },
  {
    format: 'd',
    match: (date, utc) => date[utc]('d')
  },
  {
    format: 'MMMM',
    match: (date, utc) => monthsNames[date[utc]('M') - 1]
  },
  {
    format: 'MMM',
    match: (date, utc) => monthsAliases[date[utc]('M') - 1]
  },
  {
    format: 'MM',
    match: (date, utc) => round(date[utc]('M'), 2)
  },
  {
    format: 'M',
    match: (date, utc) => date[utc]('M')
  },
  {
    format: 'yyyy',
    match: (date, utc) => round(date[utc]('y'), 4)
  },
  {
    format: 'yy',
    match: (date, utc) => String(date[utc]('y')).slice(-2)
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
