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
import { isDate, iterate } from './helpers';

/**
 * @typedef {'c'|'s'|'m'|'h'|'d'|'w'|'M'|'y'} Period
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

export class Dat extends Super {
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
  constructor(date = new Date()) {
		super(date);

    /**
     * @member {Date} Dat#$
     * @public
     * @description Original date.
     */
  }

  /**
   * @method Dat#add
   * @public
   * @param {Period|Object.<Period, Number>} what - What to add.
   * @param {Number} [number] - Number of what to add if the first argument is a period string.
   * @returns {Dat} New instance of Dat.
   * @description Method for adding amounts of time to the date. Returns new instance of Dat.
   *
   * @example
   * new Dat(new Date('1999-12-31T23:59:59.999Z')).add('c', 2).toISOString();         // '2000-01-01T00:00:00.001Z'
   * new Dat(new Date('1999-12-31T23:59:59.999Z')).add({ c: 2, d: 5 }).toISOString(); // '2000-01-06T00:00:00.001Z'
   */
	add(what, number) {
		const date = this.$;

		if (isInvalid(date)) {
			return invalidDate();
		}

		if (arguments.length >= 2) {
			what = { [what]: number };
		}

		what = new Super(what).$;

		let increment = 0;

		for (const key in what) {
			if (what.hasOwnProperty(key)) {
				const coeff = coeffs[key];

				if (!coeff) {
					return invalidDate();
				}

				increment += coeff * what[key];
			}
		}

		date.setTime(date.getTime() + increment);

    return this;
	}

  /**
   * @method Dat#expires
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
	format(string, prefix = '') {
		string = new Str(new Super(string).$);
		prefix = String(new Super(prefix).$);

    iterate(formats, (format) => {
      string = string.replaceString(prefix + format.format, format.match(this, 'get'));
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
	formatUTC(string, prefix = '') {
		string = new Str(new Super(string).$);
		prefix = String(new Super(prefix).$);

    iterate(formats, (format) => {
      string = string.replaceString(prefix + format.format, format.match(this, 'getUTC'));
    });

		return string.$;
	}
	get(what) {
		const date = this.$;

    return switcher(what, {
      c: date.getMilliseconds(),
      s: date.getSeconds(),
      m: date.getMinutes(),
      h: date.getHours(),
      d: date.getDate(),
      dw: date.getDay(),
      dwa: daysOfTheWeekAliases[date.getDay()],
      dwn: daysOfTheWeekNames[date.getDay()],
      M: date.getMonth() + 1,
      Ma: monthsAliases[date.getMonth()],
      Mn: monthsNames[date.getMonth()],
      y: date.getFullYear()
    });
	}
	getUTC(what) {
		const date = this.$;

    return switcher(what, {
      c: date.getUTCMilliseconds(),
      s: date.getUTCSeconds(),
      m: date.getUTCMinutes(),
      h: date.getUTCHours(),
      d: date.getUTCDate(),
      dw: date.getUTCDay(),
      dwa: daysOfTheWeekAliases[date.getUTCDay()],
      dwn: daysOfTheWeekNames[date.getUTCDay()],
      M: date.getUTCMonth() + 1,
      Ma: monthsAliases[date.getUTCMonth()],
      Mn: monthsNames[date.getUTCMonth()],
      y: date.getUTCFullYear()
    });
	}
	isAfter(date) {
		date = new Date(new Super(date).$);

		return date.getTime() < this.$.getTime();
	}
	isBefore(date) {
		date = new Date(new Super(date).$);

		return date.getTime() > this.$.getTime();
	}
  isBetween(date1, date2) {
    const time = this.$.getTime();

    date1 = new Date(new Super(date1).$);
    date2 = new Date(new Super(date2).$);

    return time > date1.getTime() && time < date2.getTime();
  }
	isInvalid() {
		return isInvalid(this.$);
	}
	isPassed() {
		return now() > this.$.getTime();
	}
	ofOne(what, secondDate) {
    if (!(what in coeffs) || what === 'w') {
      return false;
    }

		secondDate = date(secondDate);

    let started;

    return iterate(coeffs, (coeff, w) => {
      if (w === what) {
        started = true;
      }

      if (!started || w === 'w') {
        return;
      }

      if (started && this.get(w) !== secondDate.get(w)) {
        return false;
      }
    }) !== false;
	}
	set(what, number) {
		const date = this.$;

		if (isInvalid(date)) {
			return this;
		}

		if (arguments.length >= 2) {
			what = { [what]: number };
		}

		what = new Super(what).$;

    iterate(what, (value, what) => {
      switch (what) {
        case 'c':
          date.setMilliseconds(value);
          return;
        case 's':
          date.setSeconds(value);
          return;
        case 'm':
          date.setMinutes(value);
          return;
        case 'h':
          date.setHours(value);
          return;
        case 'd':
          date.setDate(value);
          return;
        case 'M':
          date.setMonth(value - 1);
          return;
        case 'y':
          date.setFullYear(value);
      }
    });

		return this;
	}
	setUTC(what, number) {
		const date = this.$;

		if (isInvalid(date)) {
			return this;
		}

		if (arguments.length >= 2) {
			what = { [what]: number };
		}

		what = new Super(what).$;

    iterate(what, (value, what) => {
      switch (what) {
        case 'c':
          date.setUTCMilliseconds(value);
          return;
        case 's':
          date.setUTCSeconds(value);
          return;
        case 'm':
          date.setUTCMinutes(value);
          return;
        case 'h':
          date.setUTCHours(value);
          return;
        case 'd':
          date.setUTCDate(value);
          return;
        case 'M':
          date.setUTCMonth(value - 1);
          return;
        case 'y':
          date.setUTCFullYear(value);
      }
    });

		return this;
	}
	time(time) {
		const date = this.$;

		if (arguments.length) {
			date.setTime(time);
		}

		return date.getTime();
	}
  toISOString() {
    return this.$.toISOString();
  }
	toLocaleString() {
		return this.$.toLocaleString();
	}
	toString() {
		return this.$.toString();
	}
	valueOf() {
		return this.$.valueOf();
	}
}

function invalidDate() {
	return date('a');
}
function isInvalid(date) {
	return date.toString() === 'Invalid Date';
}

constructors[1].push({
	check: isDate,
	cls: Dat
});

export function now() {
  return Date.now();
}

export function date(date) {
  if (!arguments.length) {
    return new Dat(new Date());
  }

  date = new Super(date).$;

  return new Dat(new Date(date));
}

export default Dat;
