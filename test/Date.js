import * as assert from 'assert';
import Date, { now } from '../lib/Date';
import { random } from '../lib/Number';

const NativeDate = global.Date;

describe('it should test Date::[methods]', () => {
  describe('add()', () => {
    it('should support (what, number) syntax', () => {
      const date = new NativeDate('1999-12-08T00:00:00.00Z');
      const wrap = new Date(date);

      wrap.add('c', 999);
      wrap.add('s', 59);
      wrap.add('m', 59);
      wrap.add('h', 23);
      wrap.add('d', 2);
      wrap.add('w', 3);

      assert.strictEqual(date.toJSON(), '1999-12-31T23:59:59.999Z');
    });
    it('should support { [what]: number, ... } syntax', () => {
      const date = new NativeDate('1999-12-08T00:00:00.00Z');
      const wrap = new Date(date);

      wrap.add({
        c: 999,
        s: 59,
        m: 59,
        h: 23,
        d: 2,
        w: 3
      });

      assert.strictEqual(date.toJSON(), '1999-12-31T23:59:59.999Z');
    });
  });
  describe('expires()', () => {
    it('should return promise, that resolves when context comes', (done) => {
      const date = new NativeDate(now() + 100);
      const wrap = new Date(date);
      const unique = {};

      wrap.expires(unique)
        .then((value) => {
          assert.strictEqual(value, unique);

          done();
        })
        .catch(done);
    });
  });
  describe('format()', () => {
    it('should return formatted date', () => {
      const date = new NativeDate('1999-12-31T23:59:59.999Z');
      const wrap = new Date(date);

      assert.strictEqual(wrap.format('ss ccc'), '59 999');
    });
    it('should support second argument', () => {
      const date = new NativeDate('1999-12-31T23:59:59.999Z');
      const wrap = new Date(date);

      assert.strictEqual(wrap.format('ss: $ss. ccc: $ccc', '$'), 'ss: 59. ccc: 999');
    });
  });
  describe('formatUTC()', () => {
    it('should return formatted date', () => {
      const date = new NativeDate('1999-12-31T23:59:59.999Z');
      const wrap = new Date(date);

      assert.strictEqual(wrap.formatUTC('yyyy-MM-ddThh:mm:ss.cccZ'), date.toISOString());
    });
    it('should support second argument', () => {
      const date = new NativeDate('1999-12-31T23:59:59.999Z');
      const wrap = new Date(date);

      assert.strictEqual(
        wrap.formatUTC('Year is $yyyy.', '$'),
        'Year is 1999.'
      );
      assert.strictEqual(
        wrap.formatUTC('Month name is $MMMM.', '$'),
        'Month name is December.'
      );
      assert.strictEqual(
        wrap.formatUTC('Month alias is $MMM.', '$'),
        'Month alias is Dec.'
      );
      assert.strictEqual(
        wrap.formatUTC('Month number is $M.', '$'),
        'Month number is 12.'
      );
      assert.strictEqual(
        wrap.formatUTC('Day of the week name is $DDDD.', '$'),
        'Day of the week name is Friday.'
      );
      assert.strictEqual(
        wrap.formatUTC('Day of the week alias is $DDD.', '$'),
        'Day of the week alias is Fri.'
      );
      assert.strictEqual(
        wrap.formatUTC('Date is $yyyy-$MM-$dd.', '$'),
        'Date is 1999-12-31.'
      );
      assert.strictEqual(
        wrap.formatUTC('Time is $hh:$mm:$ss.$ccc.', '$'),
        'Time is 23:59:59.999.'
      );
    });
  });
  describe('get()', () => {
    it('should return proper date parameter', () => {
      const date = new NativeDate('1999-12-31T23:59:59.999Z');
      const wrap = new Date(date);

      assert.strictEqual(wrap.get('c'), date.getMilliseconds());
      assert.strictEqual(wrap.get('s'), date.getSeconds());
      assert.strictEqual(wrap.get('m'), date.getMinutes());
      assert.strictEqual(wrap.get('h'), date.getHours());
      assert.strictEqual(wrap.get('d'), date.getDate());
      assert.strictEqual(wrap.get('dw'), date.getDay());
      assert.strictEqual(wrap.get('M'), date.getMonth() + 1);
      assert.strictEqual(wrap.get('y'), date.getFullYear());
    });
  });
  describe('getUTC()', () => {
    it('should return proper date utc parameter', () => {
      const date = new NativeDate('1999-12-31T23:59:59.999Z');
      const wrap = new Date(date);

      assert.strictEqual(wrap.getUTC('c'), date.getUTCMilliseconds());
      assert.strictEqual(wrap.getUTC('s'), date.getUTCSeconds());
      assert.strictEqual(wrap.getUTC('m'), date.getUTCMinutes());
      assert.strictEqual(wrap.getUTC('h'), date.getUTCHours());
      assert.strictEqual(wrap.getUTC('d'), date.getUTCDate());
      assert.strictEqual(wrap.getUTC('dw'), date.getUTCDay());
      assert.strictEqual(wrap.getUTC('dwa'), 'Fri');
      assert.strictEqual(wrap.getUTC('dwn'), 'Friday');
      assert.strictEqual(wrap.getUTC('M'), date.getUTCMonth() + 1);
      assert.strictEqual(wrap.getUTC('Ma'), 'Dec');
      assert.strictEqual(wrap.getUTC('Mn'), 'December');
      assert.strictEqual(wrap.getUTC('y'), date.getUTCFullYear());
    });
  });
  describe('isAfter()', () => {
    it('should return true with argument before context', () => {
      const date = new NativeDate();
      const wrap = new Date(date);
      const before = new NativeDate(now() - 100);

      assert.strictEqual(wrap.isAfter(before), true);
    });
    it('should return false with argument after context', () => {
      const date = new NativeDate();
      const wrap = new Date(date);
      const after = new NativeDate(now() + 100);

      assert.strictEqual(wrap.isAfter(after), false);
    });
  });
  describe('isBefore()', () => {
    it('should return true with argument after context', () => {
      const date = new NativeDate();
      const wrap = new Date(date);
      const after = new NativeDate(now() + 100);

      assert.strictEqual(wrap.isBefore(after), true);
    });
    it('should return false with argument before context', () => {
      const date = new NativeDate();
      const wrap = new Date(date);
      const before = new NativeDate(now() - 100);

      assert.strictEqual(wrap.isBefore(before), false);
    });
  });
  describe('isBetween()', () => {
    it('should return true with first argument before context and second after', () => {
      const date = new NativeDate();
      const wrap = new Date(date);
      const before = new NativeDate(now() - 100);
      const after = new NativeDate(now() + 100);

      assert.strictEqual(wrap.isBetween(before, after), true);
    });
    it('should return true with first argument after context or second before', () => {
      const date = new NativeDate();
      const wrap = new Date(date);
      const before = new NativeDate(now() - 100);
      const after = new NativeDate(now() + 100);

      assert.strictEqual(wrap.isBetween(before, before), false);
      assert.strictEqual(wrap.isBetween(after, after), false);
      assert.strictEqual(wrap.isBetween(after, before), false);
    });
  });
  describe('isInvalid()', () => {
    it('should return true with invalid context', () => {
      const date = new NativeDate('a');
      const wrap = new Date(date);

      assert.strictEqual(wrap.isInvalid(), true);
    });
    it('should return false with not invalid context', () => {
      const date = new NativeDate();
      const wrap = new Date(date);

      assert.strictEqual(wrap.isInvalid(), false);
    });
  });
  describe('isPassed()', () => {
    it('should return true with context before now', () => {
      const date = new NativeDate(now() - 100);
      const wrap = new Date(date);

      assert.strictEqual(wrap.isPassed(), true);
    });
    it('should return false with context after now', () => {
      const date = new NativeDate(now() + 100);
      const wrap = new Date(date);

      assert.strictEqual(wrap.isPassed(), false);
    });
  });
  describe('ofOne()', () => {
    it('should return true with second argument of one <first argument>', () => {
      const date1 = new NativeDate('1999-12-31T23:59:59.999Z');
      const date2 = new NativeDate('1999-12-31T23:59:59.998Z');
      const wrap = new Date(date1);

      assert.strictEqual(wrap.ofOne('s', date2), true);
      assert.strictEqual(wrap.ofOne('m', date2), true);
      assert.strictEqual(wrap.ofOne('h', date2), true);
      assert.strictEqual(wrap.ofOne('d', date2), true);
      assert.strictEqual(wrap.ofOne('M', date2), true);
      assert.strictEqual(wrap.ofOne('y', date2), true);
    });
    it('should return true with second argument not of one <first argument>', () => {
      const date1 = new NativeDate('1999-12-31T23:59:59.999Z');
      const date2 = new NativeDate('1998-12-31T23:59:59.998Z');
      const wrap = new Date(date1);

      assert.strictEqual(wrap.ofOne('s', date2), false);
      assert.strictEqual(wrap.ofOne('m', date2), false);
      assert.strictEqual(wrap.ofOne('h', date2), false);
      assert.strictEqual(wrap.ofOne('d', date2), false);
      assert.strictEqual(wrap.ofOne('M', date2), false);
      assert.strictEqual(wrap.ofOne('y', date2), false);
    });
  });
  describe('set()', () => {
    it('should support (what, number) syntax', () => {
      const date = new NativeDate();
      const wrap = new Date(date);

      wrap.set('c', 999);
      wrap.set('s', 59);
      wrap.set('m', 59);
      wrap.set('h', 23);
      wrap.set('d', 31);
      wrap.set('M', 12);
      wrap.set('y', 1999);

      assert.strictEqual(date.getMilliseconds(), 999);
      assert.strictEqual(date.getSeconds(), 59);
      assert.strictEqual(date.getMinutes(), 59);
      assert.strictEqual(date.getHours(), 23);
      assert.strictEqual(date.getDate(), 31);
      assert.strictEqual(date.getMonth(), 11);
      assert.strictEqual(date.getFullYear(), 1999);
    });
    it('should support { [what]: number, ... } syntax', () => {
      const date = new NativeDate();
      const wrap = new Date(date);

      wrap.set({
        c: 999,
        s: 59,
        m: 59,
        h: 23,
        d: 31,
        M: 12,
        y: 1999
      });

      assert.strictEqual(date.getMilliseconds(), 999);
      assert.strictEqual(date.getSeconds(), 59);
      assert.strictEqual(date.getMinutes(), 59);
      assert.strictEqual(date.getHours(), 23);
      assert.strictEqual(date.getDate(), 31);
      assert.strictEqual(date.getMonth(), 11);
      assert.strictEqual(date.getFullYear(), 1999);
    });
  });
  describe('setUTC()', () => {
    it('should support (what, number) syntax', () => {
      const date = new NativeDate();
      const wrap = new Date(date);

      wrap.setUTC('c', 999);
      wrap.setUTC('s', 59);
      wrap.setUTC('m', 59);
      wrap.setUTC('h', 23);
      wrap.setUTC('d', 31);
      wrap.setUTC('M', 12);
      wrap.setUTC('y', 1999);

      assert.strictEqual(date.toJSON(), '1999-12-31T23:59:59.999Z');
    });
    it('should support { [what]: number, ... } syntax', () => {
      const date = new NativeDate();
      const wrap = new Date(date);

      wrap.setUTC({
        c: 999,
        s: 59,
        m: 59,
        h: 23,
        d: 31,
        M: 12,
        y: 1999
      });

      assert.strictEqual(date.toJSON(), '1999-12-31T23:59:59.999Z');
    });
  });
  describe('time()', () => {
    it('should get time without arguments', () => {
      const time = now() - random(50, 100);
      const date = new NativeDate(time);
      const wrap = new Date(date);

      assert.strictEqual(wrap.time(), date.getTime());
    });
    it('should set time of argument', () => {
      const time = now() - random(50, 100);
      const date = new NativeDate(time);
      const wrap = new Date(date);

      wrap.time(time);

      assert.strictEqual(date.getTime(), time);
    });
  });
  describe('toLocaleString()', () => {
    it('should return the same as <context>.toLocaleString()', () => {
      const date = new NativeDate();
      const wrap = new Date(date);

      assert.strictEqual(wrap.toLocaleString(), date.toLocaleString());
    });
  });
  describe('toString()', () => {
    it('should return the same as <context>.toString()', () => {
      const date = new NativeDate();
      const wrap = new Date(date);

      assert.strictEqual(wrap.toString(), date.toString());
    });
  });
  describe('valueOf()', () => {
    it('should return the same as <context>.valueOf()', () => {
      const date = new NativeDate();
      const wrap = new Date(date);

      assert.strictEqual(wrap.valueOf(), date.valueOf());
    });
  });
});
