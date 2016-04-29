import D from '../../';
import { default as parent, transform } from '../Object';
import Num from '../Number';
import Str from '../String';
import { isDate } from '../../libs';

const NativeDate = Date;
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
const formats = {
	ccc: (date) => round(date.get('c'), 3),
	cc: (date) => cut(date.get('c'), 3, 2).replace(/^0\./, ''),
	c: (date) => cut(date.get('c'), 3, 1).replace(/^0\./, ''),
	ss: (date) => round(date.get('s'), 2),
	s: (date) => String(date.get('s')),
	mm: (date) => round(date.get('m'), 2),
	m: (date) => String(date.get('m')),
	hh: (date) => round(date.get('h'), 2),
	h: (date) => String(date.get('h')),
	DDD: (date) => date.get('dwa'),
	dd: (date) => round(date.get('d'), 2),
	d: (date) => String(date.get('d')),
	D: (date) => date.get('dwn'),
	MMMM: (date) => date.get('Mn'),
	MMM: (date) => date.get('Ma'),
	MM: (date) => round(date.get('M'), 2),
	M: (date) => String(date.get('M')),
	yyyy: (date) => round(date.get('y'), 4),
	yy: (date) => String(date.get('y')).substring(2),
	y: (date) => date.get('y')
};
const daysOfTheWeekNames = {
	0: 'Sunday',
	1: 'Monday',
	2: 'Tuesday',
	3: 'Wednesday',
	4: 'Thursday',
	5: 'Friday',
	6: 'Saturday'
};
const daysOfTheWeekAliases = {
	0: 'Sun',
	1: 'Mon',
	2: 'Tue',
	3: 'Wed',
	4: 'Thu',
	5: 'Fri',
	6: 'Sat'
};
const monthsNames = {
	0: 'January',
	1: 'February',
	2: 'March',
	3: 'April',
	4: 'May',
	5: 'June',
	6: 'Jule',
	7: 'August',
	8: 'September',
	9: 'October',
	10: 'November',
	11: 'December'
};
const monthsAliases = {
	0: 'Jan',
	1: 'Feb',
	2: 'Mar',
	3: 'Apr',
	4: 'May',
	5: 'Jun',
	6: 'Jul',
	7: 'Aug',
	8: 'Sep',
	9: 'Oct',
	10: 'Nov',
	11: 'Dec'
};
const zero = new D.String('0');

export class Date extends parent {
	constructor(date = new NativeDate()) {
		super(new NativeDate(date));
	}

	add(what, number) {
		const date = this.$;

		if (isInvalid(date)) {
			return invalidDate();
		}

		if (arguments.length >= 2) {
			what = { [what]: number };
		}

		what = transform(what);

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

		return new Date(date.getTime() + increment);
	}
	between(date) {
		date = new NativeDate(transform(date));

		return this.$.getTime() > date.getTime();
	}
	expires(value) {
		return new Num(this.$ - now()).timeout(value);
	}
	format(string, prefix = '') {
		string = new Str(transform(string));
		prefix = String(transform(prefix));

		for (const f in formats) {
			if (formats.hasOwnProperty(f)) {
				string = string.replaceString(prefix + f, formats[f](this));
			}
		}

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
	// TODO: .isInRange(range) -> Boolean
	isAfter(date) {
		date = new NativeDate(transform(date));

		return date.getTime() > this.$.getTime();
	}
	isBefore(date) {
		date = new NativeDate(transform(date));

		return date.getTime() > this.$.getTime();
	}
	isInvalid() {
		return isInvalid(this.$);
	}
	isPassed() {
		return Date.now() > this.$.getTime();
	}
	ofOne(what, secondDate) {
		secondDate = new Date(transform(secondDate));
		const date = this.$;
		const diff = Math.abs(date.getTime() - secondDate.getTime());

		if (what in coeffs) {
			return this.get(what) === secondDate.get(what) && diff < coeffs[what];
		}

		// TODO: add "of one week"

		return false;
	}
	set(what, number) {
		const date = this.$;

		if (isInvalid(date)) {
			return this;
		}

		if (arguments.length >= 2) {
			what = { [what]: number };
		}

		what = transform(what);

		for (let key in what) {
			if (what.hasOwnProperty(key)) {
				const value = what[key];

				switch (key) {
					case 'c':
						date.setMilliseconds(value);
						continue;
					case 's':
						date.setSeconds(value);
						continue;
					case 'm':
						date.setMinutes(value);
						continue;
					case 'h':
						date.setHours(value);
						continue;
					case 'd':
						date.setDate(value);
						continue;
					case 'M':
						date.setMonth(value);
						continue;
					case 'y':
						date.setFullYear(value);
				}
			}
		}

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

function now() {
	return NativeDate.now();
}

function round(number, digits) {
	const string = String(number);
	let zeroes = digits - string.length;
	zeroes = zeroes < 0 ? 0 : zeroes;

	return zero.repeat(zeroes).$ + string;
}

function cut(number, max, digits) {
	return (number/Math.pow(10, max)).toFixed(digits);
}

D.Date = Date;
D.constructors.unshift({
	check: isDate,
	cls: Date
});

export default Date;