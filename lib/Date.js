/**
 * @module Dat
 * @private
 * @mixin
 * @description Exports Dat class.
 */

import Super from './Super';
import Num from './Number';
import Str from './String';
import { switcher } from './Switcher';
import constructors from './constants/constructors';
import formats from './constants/formats';
import {
  isDate, iterate, Symbol, defineProperties,
  inherits, checkClassInstance, possibleSuperClassReturn
} from './helpers';

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

const coeffs = {
	c: 1,
	s: 1000,
	m: 60000,
	h: 3600000,
	d: 86400000,
	w: 604800000,
	M: 2592000000,
	y: 31536000000
};

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
export function Dat(date = new Date()) {
  checkClassInstance(this, Dat, 'Dat');

  return possibleSuperClassReturn(this, Super, [date]);

  /**
   * @member {Date} Dat#$
   * @public
   * @description Original date.
   */
}

inherits(Dat, Super);

defineProperties(Dat.prototype, {
  /**
   * @member {Function} Dat#add
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
  add(what, number) {
    if (arguments.length >= 2) {
      what = { [what]: number };
    }

    return this.time(this.time() + new Super(what).sum((value, what) => coeffs[what] * value));
  },

  /**
   * @member {Function} Dat#expires
   * @public
   * @param {*} value - Value to resolve after the date expires.
   * @returns {Promise} New instance of Promise.
   * @description Method for defining when the date expires.
   *
   * @example
   * new Dat().add('c', 500).expires('Expired').then((value) => {
   *   // After 500 milliseconds
   *   console.log(value); // 'Expired'
   * });
   */
  expires(value) {
    return new Num(this.$ - now()).timeout(value);
  },

  /**
   * @member {Function} Dat#format
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
  format(string, prefix = '') {
    string = new Str(new Super(string).$);
    prefix = String(new Super(prefix).$);

    iterate(formats, (format) => {
      string = string.replaceString(prefix + format.format, format.match(this, 'get'));
    });

    return string.$;
  },

  /**
   * @member {Function} Dat#formatUTC
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
  formatUTC(string, prefix = '') {
    string = new Str(new Super(string).$);
    prefix = String(new Super(prefix).$);

    iterate(formats, (format) => {
      string = string.replaceString(prefix + format.format, format.match(this, 'getUTC'));
    });

    return string.$;
  },

  /**
   * @member {Function} Dat#get
   * @public
   * @param {GetPeriod} what - What to get.
   * @returns {Number} Number of what to get.
   * @description Method for getting values such as seconds or minutes.
   *
   * @example
   * new Dat(new Date('1999-12-31T23:59:59.999Z')).get('s'); // 59
   */
  get(what) {
    return getSwitcher(what, [this.$, 'get']);
  },

  /**
   * @member {Function} Dat#getUTC
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
  getUTC(what) {
    return getSwitcher(what, [this.$, 'getUTC']);
  },

  /**
   * @member {Function} Dat#isAfter
   * @public
   * @param {DateLike} date - Date to be compared to this date.
   * @returns {Boolean} If this date is after the argument one.
   * @description Finds out if this date is after the argument one.
   *
   * @example
   * new Dat(new Date(333)).isAfter(new Date(334)); // false
   * new Dat(new Date(333)).isAfter(new Date(332)); // true
   */
  isAfter(date) {
    date = new Date(new Super(date).$);

    return date.getTime() < this.$.getTime();
  },

  /**
   * @member {Function} Dat#isBefore
   * @public
   * @param {DateLike} date - Date to be compared to this date.
   * @returns {Boolean} If this date is before the argument one.
   * @description Finds out if this date is before the argument one.
   *
   * @example
   * new Dat(new Date(333)).isBefore(new Date(334)); // true
   * new Dat(new Date(333)).isBefore(new Date(332)); // false
   */
  isBefore(date) {
    date = new Date(new Super(date).$);

    return date.getTime() > this.$.getTime();
  },

  /**
   * @member {Function} Dat#isBetween
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
  isBetween(date1, date2) {
    const time = this.$.getTime();

    date1 = new Date(new Super(date1).$);
    date2 = new Date(new Super(date2).$);

    return time > date1.getTime() && time < date2.getTime();
  },

  /**
   * @member {Function} Dat#isInvalid
   * @public
   * @returns {Boolean} If the date is invalid.
   * @description Returns if the date is invalid.
   *
   * @example
   * new Dat(new Date('a')).isInvalid(); // true
   * new Dat(new Date(1)).isInvalid();   // false
   */
  isInvalid() {
    return this.$.toString() === 'Invalid Date';
  },

  /**
   * @member {Function} Dat#isPassed
   * @public
   * @returns {Boolean} If the date is passed.
   * @description Returns if the date is passed.
   *
   * @example
   * new Dat(new Date(1)).isPassed(); // true
   */
  isPassed() {
    return this.isBefore(now());
  },

  /**
   * @member {Function} Dat#ofOne
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
  ofOne(what, date) {
    if (!(what in coeffs) || what === 'w') {
      return false;
    }

    date = new Dat(new Date(date));

    let started;

    return iterate(coeffs, (coeff, w) => {
        if (w === what) {
          started = true;
        }

        if (!started || w === 'w') {
          return;
        }

        if (started && this.get(w) !== date.get(w)) {
          return false;
        }
      }) !== false;
  },

  /**
   * @member {Function} Dat#set
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
  set(what, number) {
    const date = this.$;

    if (arguments.length >= 2) {
      what = { [what]: number };
    }

    what = new Super(what).$;

    iterate(what, (value, what) => {
      setSwitcher(what, [date, value, 'set']);
    });

    return this;
  },

  /**
   * @member {Function} Dat#setUTC
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
  setUTC(what, number) {
    const date = this.$;

    if (arguments.length >= 2) {
      what = { [what]: number };
    }

    what = new Super(what).$;

    iterate(what, (value, what) => {
      setSwitcher(what, [date, value, 'setUTC']);
    });

    return this;
  },

  /**
   * @member {Function} Dat#setUTC
   * @public
   * @param {Number} [time] - Time to set.
   * @returns {Dat|Number} - If the time argument is present this is returned otherwise the time is returned.
   * @description Synonym for both
   * [Date#getTime]
   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime} and
   * [Date#setTime]
   * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date/setTime}.
   */
  time(time) {
    const date = this.$;

    if (arguments.length) {
      date.setTime(time);
    }

    return date.getTime();
  },

  toISOString() {
    return this.$.toISOString();
  },

  toLocaleString() {
    return this.$.toLocaleString();
  },

  toString() {
    return this.$.toString();
  },

  valueOf() {
    return this.$.valueOf();
  },

  [Symbol.toStringTag]: 'Dat'
});

const getSwitcher = switcher({
  c: (date, utc) => date[utc + 'Milliseconds'](),
  s: (date, utc) => date[utc + 'Seconds'](),
  m: (date, utc) => date[utc + 'Minutes'](),
  h: (date, utc) => date[utc + 'Hours'](),
  d: (date, utc) => date[utc + 'Date'](),
  dw: (date, utc) => date[utc + 'Day'](),
  M: (date, utc) => date[utc + 'Month']() + 1,
  y: (date, utc) => date[utc + 'FullYear']()
}, 'equals', NaN);
const setSwitcher = switcher({
  c: (date, value, utc) => date[utc + 'Milliseconds'](value),
  s: (date, value, utc) => date[utc + 'Seconds'](value),
  m: (date, value, utc) => date[utc + 'Minutes'](value),
  h: (date, value, utc) => date[utc + 'Hours'](value),
  d: (date, value, utc) => date[utc + 'Date'](value),
  M: (date, value, utc) => date[utc + 'Month'](value - 1),
  y: (date, value, utc) => date[utc + 'FullYear'](value)
});

constructors[1].push({
	check: isDate,
	cls: Dat
});

/**
 * @function now
 * @public
 * @returns {Number} Number of milliseconds.
 * @description Synonym for
 * [Date.now]
 * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date/now}.
 */
export function now() {
  return Date.now();
}

/**
 * @function date
 * @public
 * @param {DateLike} [date] - Date-like value.
 * @returns {Dat} New instance of Dat.
 * @description Synonym for new Dat(new Date(date));
 */
export function date(date) {
  if (!arguments.length) {
    return new Dat(new Date());
  }

  date = new Super(date).$;

  return new Dat(new Date(date));
}

export default Dat;
