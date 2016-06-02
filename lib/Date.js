import Super from './Super';
import Num from './Number';
import Str from './String';
import constructors from './constants/constructors';
import formats from './constants/formats';
import { isDate, iterate } from './helpers';

const NativeDate = global.Date;
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

export class Date extends Super {
	constructor(date = new NativeDate()) {
		super(date);
	}

  static now() {
    return now();
  }

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

		for (let key in what) {
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
	expires(value) {
		return new Num(this.$ - now()).timeout(value);
	}
	format(string, prefix = '') {
		string = new Str(new Super(string).$);
		prefix = String(new Super(prefix).$);

    iterate(formats, (format) => {
      string = string.replaceString(prefix + format.format, format.match(this, 'get'));
    });

		return string.$;
	}
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

		switch (what) {
			case 'c':
				return date.getMilliseconds();
			case 's':
				return date.getSeconds();
			case 'm':
				return date.getMinutes();
			case 'h':
				return date.getHours();
			case 'd':
				return date.getDate();
			case 'dw':
				return date.getDay();
			case 'dwa':
				return daysOfTheWeekAliases[date.getDay()];
			case 'dwn':
				return daysOfTheWeekNames[date.getDay()];
			case 'M':
				return date.getMonth() + 1;
			case 'Ma':
				return monthsAliases[date.getMonth()];
			case 'Mn':
				return monthsNames[date.getMonth()];
			case 'y':
				return date.getFullYear();
		}
	}
	getUTC(what) {
		const date = this.$;

		switch (what) {
			case 'c':
				return date.getUTCMilliseconds();
			case 's':
				return date.getUTCSeconds();
			case 'm':
				return date.getUTCMinutes();
			case 'h':
				return date.getUTCHours();
			case 'd':
				return date.getUTCDate();
			case 'dw':
				return date.getUTCDay();
			case 'dwa':
				return daysOfTheWeekAliases[date.getUTCDay()];
			case 'dwn':
				return daysOfTheWeekNames[date.getUTCDay()];
			case 'M':
				return date.getUTCMonth() + 1;
			case 'Ma':
				return monthsAliases[date.getUTCMonth()];
			case 'Mn':
				return monthsNames[date.getUTCMonth()];
			case 'y':
				return date.getUTCFullYear();
		}
	}
	isAfter(date) {
		date = new NativeDate(new Super(date).$);

		return date.getTime() < this.$.getTime();
	}
	isBefore(date) {
		date = new NativeDate(new Super(date).$);

		return date.getTime() > this.$.getTime();
	}
  isBetween(date1, date2) {
    const time = this.$.getTime();

    date1 = new NativeDate(new Super(date1).$);
    date2 = new NativeDate(new Super(date2).$);

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
	return new Date('a');
}
function isInvalid(date) {
	return date.toString() === 'Invalid Date';
}

constructors[1].push({
	check: isDate,
	cls: Date
});

export function now() {
  return NativeDate.now();
}

export function date(date) {
  if (!arguments.length) {
    return new Date(new NativeDate());
  }

  date = new Super(date).$;

  return new Date(new NativeDate(date));
}

export default Date;
