import Str from '../String';

const zero = new Str('0');
const formats = [
  {
    format: 'ccc',
    match: (date, utc) => round(date[utc]('c'), 3)
  },
  {
    format: 'cc',
    match: (date, utc) => cut(date[utc]('c'), 3, 2).replace(/^0\./, '')
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
    format: 'DDDD',
    match: (date, utc) => date[utc]('dwn')
  },
  {
    format: 'DDD',
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
    match: (date, utc) => String(date[utc]('y')).substring(2)
  },
  {
    format: 'y',
    match: (date, utc) => date[utc]('y')
  }
];

function round(number, digits) {
  const string = String(number);
  let zeroes = digits - string.length;
  zeroes = zeroes < 0 ? 0 : zeroes;

  return zero.repeat(zeroes).$ + string;
}
function cut(number, max, digits) {
  return (number / Math.pow(10, max)).toFixed(digits);
}

export default formats;
