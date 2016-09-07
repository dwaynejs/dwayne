import { strictEqual } from 'assert';
import Num from '../lib/Num';
import { isNaN } from '../lib/helpers';

const eps = Math.pow(2, -47);
const max = Math.pow(2, 53) - 1;
const pi = Math.PI;
const e = Math.E;
const ln2 = Math.LN2;
const ln10 = Math.LN10;
const pow = Math.pow;
const sqrt = Math.sqrt;
const abs = Math.abs;
const exp = Math.exp;
const ceil = Math.ceil;
const floor = Math.floor;
const round = Math.round;
const ln = Math.log;
const toExp = (x) => x.toExponential();
const toFixed = (x, r) => x.toFixed(r);
const toPrecision = (x, r) => x.toPrecision(r);
const toString = (x, r) => x.toString(r);

describe('it should test Num#', () => {
  describe('abs', () => {
    it('should work the same as Math.abs', () => {
      const n1 = 1;
      const n2 = -1;
      const n3 = 0;
      const n4 = -0;
      const n5 = Infinity;
      const n6 = NaN;
      const wrap1 = new Num(n1);
      const wrap2 = new Num(n2);
      const wrap3 = new Num(n3);
      const wrap4 = new Num(n4);
      const wrap5 = new Num(n5);
      const wrap6 = new Num(n6);

      strictEqual(wrap1.abs, 1);
      strictEqual(wrap2.abs, 1);
      strictEqual(wrap3.abs, 0);
      strictEqual(wrap4.abs, 0);
      strictEqual(wrap5.abs, Infinity);
      strictEqual(isNaN(wrap6.abs), true);
    });
  });
  describe('acos()', () => {
    it('should work the same as Math.acos with falsey argument', () => {
      const n1 = 1;
      const n2 = -1;
      const n3 = 0;
      const n4 = 1 / 2;
      const n5 = 1 / sqrt(2);
      const wrap1 = new Num(n1);
      const wrap2 = new Num(n2);
      const wrap3 = new Num(n3);
      const wrap4 = new Num(n4);
      const wrap5 = new Num(n5);
      const diff1 = abs(wrap1.acos() - 0);
      const diff2 = abs(wrap2.acos() - pi);
      const diff3 = abs(wrap3.acos() - pi / 2);
      const diff4 = abs(wrap4.acos() - pi / 3);
      const diff5 = abs(wrap5.acos() - pi / 4);

      strictEqual(diff1 <= eps, true, `acos(1): ${ diff1 } <= ${ eps }`);
      strictEqual(diff2 <= eps, true, `acos(-1): ${ diff2 } <= ${ eps }`);
      strictEqual(diff3 <= eps, true, `acos(0): ${ diff3 } <= ${ eps }`);
      strictEqual(diff4 <= eps, true, `acos(0.5): ${ diff4 } <= ${ eps }`);
      strictEqual(diff5 <= eps, true, `acos(1/sqrt2): ${ diff5 } <= ${ eps }`);
    });
    it('should return acos(x) in degrees with truthy argument', () => {
      const n1 = 1;
      const n2 = -1;
      const n3 = 0;
      const n4 = 1 / 2;
      const n5 = 1 / sqrt(2);
      const wrap1 = new Num(n1);
      const wrap2 = new Num(n2);
      const wrap3 = new Num(n3);
      const wrap4 = new Num(n4);
      const wrap5 = new Num(n5);
      const diff1 = abs(wrap1.acos(true) - 0);
      const diff2 = abs(wrap2.acos(true) - 180);
      const diff3 = abs(wrap3.acos(true) - 90);
      const diff4 = abs(wrap4.acos(true) - 60);
      const diff5 = abs(wrap5.acos(true) - 45);

      strictEqual(diff1 <= eps, true, `acos(1): ${ diff1 } <= ${ eps }`);
      strictEqual(diff2 <= eps, true, `acos(-1): ${ diff2 } <= ${ eps }`);
      strictEqual(diff3 <= eps, true, `acos(0): ${ diff3 } <= ${ eps }`);
      strictEqual(diff4 <= eps, true, `acos(0.5): ${ diff4 } <= ${ eps }`);
      strictEqual(diff5 <= eps, true, `acos(1/sqrt2): ${ diff5 } <= ${ eps }`);
    });
  });
  describe('asin()', () => {
    it('should work the same as Math.asin with falsey argument', () => {
      const n1 = 1;
      const n2 = -1;
      const n3 = 0;
      const n4 = 1 / 2;
      const n5 = 1 / sqrt(2);
      const wrap1 = new Num(n1);
      const wrap2 = new Num(n2);
      const wrap3 = new Num(n3);
      const wrap4 = new Num(n4);
      const wrap5 = new Num(n5);
      const diff1 = abs(wrap1.asin() - pi / 2);
      const diff2 = abs(wrap2.asin() - -pi / 2);
      const diff3 = abs(wrap3.asin() - 0);
      const diff4 = abs(wrap4.asin() - pi / 6);
      const diff5 = abs(wrap5.asin() - pi / 4);

      strictEqual(diff1 <= eps, true, `asin(1): ${ diff1 } <= ${ eps }`);
      strictEqual(diff2 <= eps, true, `asin(-1): ${ diff2 } <= ${ eps }`);
      strictEqual(diff3 <= eps, true, `asin(0): ${ diff3 } <= ${ eps }`);
      strictEqual(diff4 <= eps, true, `asin(0.5): ${ diff4 } <= ${ eps }`);
      strictEqual(diff5 <= eps, true, `asin(1/sqrt2): ${ diff5 } <= ${ eps }`);
    });
    it('should return asin(x) in degrees with truthy argument', () => {
      const n1 = 1;
      const n2 = -1;
      const n3 = 0;
      const n4 = 1 / 2;
      const n5 = 1 / sqrt(2);
      const wrap1 = new Num(n1);
      const wrap2 = new Num(n2);
      const wrap3 = new Num(n3);
      const wrap4 = new Num(n4);
      const wrap5 = new Num(n5);
      const diff1 = abs(wrap1.asin(true) - 90);
      const diff2 = abs(wrap2.asin(true) - (-90));
      const diff3 = abs(wrap3.asin(true) - 0);
      const diff4 = abs(wrap4.asin(true) - 30);
      const diff5 = abs(wrap5.asin(true) - 45);

      strictEqual(diff1 <= eps, true, `asin(1): ${ diff1 } <= ${ eps }`);
      strictEqual(diff2 <= eps, true, `asin(-1): ${ diff2 } <= ${ eps }`);
      strictEqual(diff3 <= eps, true, `asin(0): ${ diff3 } <= ${ eps }`);
      strictEqual(diff4 <= eps, true, `asin(0.5): ${ diff4 } <= ${ eps }`);
      strictEqual(diff5 <= eps, true, `asin(1/sqrt2): ${ diff5 } <= ${ eps }`);
    });
  });
  describe('atan()', () => {
    it('should work the same as Math.atan with falsey argument', () => {
      const n1 = 1;
      const n2 = -1;
      const n3 = 0;
      const n4 = sqrt(3);
      const wrap1 = new Num(n1);
      const wrap2 = new Num(n2);
      const wrap3 = new Num(n3);
      const wrap4 = new Num(n4);
      const diff1 = abs(wrap1.atan() - pi / 4);
      const diff2 = abs(wrap2.atan() - (-pi / 4));
      const diff3 = abs(wrap3.atan() - 0);
      const diff4 = abs(wrap4.atan() - pi / 3);

      strictEqual(diff1 <= eps, true, `atan(1): ${ diff1 } <= ${ eps }`);
      strictEqual(diff2 <= eps, true, `atan(-1): ${ diff2 } <= ${ eps }`);
      strictEqual(diff3 <= eps, true, `atan(0): ${ diff3 } <= ${ eps }`);
      strictEqual(diff4 <= eps, true, `atan(0.5): ${ diff4 } <= ${ eps }`);
    });
    it('should return atan(x) in degrees with truthy argument', () => {
      const n1 = 1;
      const n2 = -1;
      const n3 = 0;
      const n4 = sqrt(3);
      const wrap1 = new Num(n1);
      const wrap2 = new Num(n2);
      const wrap3 = new Num(n3);
      const wrap4 = new Num(n4);
      const diff1 = abs(wrap1.atan(true) - 45);
      const diff2 = abs(wrap2.atan(true) - (-45));
      const diff3 = abs(wrap3.atan(true) - 0);
      const diff4 = abs(wrap4.atan(true) - 60);

      strictEqual(diff1 <= eps, true, `atan(1): ${ diff1 } <= ${ eps }`);
      strictEqual(diff2 <= eps, true, `atan(-1): ${ diff2 } <= ${ eps }`);
      strictEqual(diff3 <= eps, true, `atan(0): ${ diff3 } <= ${ eps }`);
      strictEqual(diff4 <= eps, true, `atan(0.5): ${ diff4 } <= ${ eps }`);
    });
  });
  describe('cbrt', () => {
    it('should work the same as Math.cbrt', () => {
      const n1 = 1;
      const n2 = -8;
      const n3 = 0;
      const n4 = 27;
      const n5 = -Infinity;
      const n6 = NaN;
      const wrap1 = new Num(n1);
      const wrap2 = new Num(n2);
      const wrap3 = new Num(n3);
      const wrap4 = new Num(n4);
      const wrap5 = new Num(n5);
      const wrap6 = new Num(n6);
      const diff1 = abs(wrap1.cbrt - 1);
      const diff2 = abs(wrap2.cbrt - (-2));
      const diff3 = abs(wrap3.cbrt - 0);
      const diff4 = abs(wrap4.cbrt - 3);

      strictEqual(diff1 <= eps, true, `cbrt(1): ${ diff1 } <= ${ eps }`);
      strictEqual(diff2 <= eps, true, `cbrt(-8): ${ diff2 } <= ${ eps }`);
      strictEqual(diff3 <= eps, true, `cbrt(0): ${ diff3 } <= ${ eps }`);
      strictEqual(diff4 <= eps, true, `cbrt(27): ${ diff4 } <= ${ eps }`);
      strictEqual(wrap5.cbrt, -Infinity);
      strictEqual(isNaN(wrap6.cbrt), true);
    });
  });
  describe('ceil', () => {
    it('should work the same as Math.ceil', () => {
      const n1 = 1;
      const n2 = -5.5;
      const n3 = 0;
      const n4 = 7.5;
      const n5 = Infinity;
      const n6 = NaN;
      const wrap1 = new Num(n1);
      const wrap2 = new Num(n2);
      const wrap3 = new Num(n3);
      const wrap4 = new Num(n4);
      const wrap5 = new Num(n5);
      const wrap6 = new Num(n6);

      strictEqual(wrap1.ceil, ceil(n1));
      strictEqual(wrap2.ceil, ceil(n2));
      strictEqual(wrap3.ceil, ceil(n3));
      strictEqual(wrap4.ceil, ceil(n4));
      strictEqual(wrap5.ceil, ceil(n5));
      strictEqual(isNaN(wrap6.ceil), true);
    });
  });
  describe('cos()', () => {
    it('should work the same as Math.cos with falsey argument', () => {
      const n1 = 0;
      const n2 = pi;
      const n3 = pi / 2;
      const n4 = pi / 3;
      const n5 = pi / 4;
      const wrap1 = new Num(n1);
      const wrap2 = new Num(n2);
      const wrap3 = new Num(n3);
      const wrap4 = new Num(n4);
      const wrap5 = new Num(n5);
      const diff1 = Math.abs(wrap1.cos() - 1);
      const diff2 = Math.abs(wrap2.cos() - (-1));
      const diff3 = Math.abs(wrap3.cos() - 0);
      const diff4 = Math.abs(wrap4.cos() - 1 / 2);
      const diff5 = Math.abs(wrap5.cos() - 1 / sqrt(2));

      strictEqual(diff1 <= eps, true, `cos(0): ${ diff1 } <= ${ eps }`);
      strictEqual(diff2 <= eps, true, `cos(pi): ${ diff2 } <= ${ eps }`);
      strictEqual(diff3 <= eps, true, `cos(pi/2): ${ diff3 } <= ${ eps }`);
      strictEqual(diff4 <= eps, true, `cos(pi/3): ${ diff4 } <= ${ eps }`);
      strictEqual(diff5 <= eps, true, `cos(pi/4): ${ diff5 } <= ${ eps }`);
    });
    it('should use context as number of degrees with truthy argument', () => {
      const n1 = 0;
      const n2 = 180;
      const n3 = 90;
      const n4 = 60;
      const n5 = 45;
      const wrap1 = new Num(n1);
      const wrap2 = new Num(n2);
      const wrap3 = new Num(n3);
      const wrap4 = new Num(n4);
      const wrap5 = new Num(n5);
      const diff1 = Math.abs(wrap1.cos(true) - 1);
      const diff2 = Math.abs(wrap2.cos(true) - (-1));
      const diff3 = Math.abs(wrap3.cos(true) - 0);
      const diff4 = Math.abs(wrap4.cos(true) - 1 / 2);
      const diff5 = Math.abs(wrap5.cos(true) - 1 / sqrt(2));

      strictEqual(diff1 <= eps, true, `cos(0): ${ diff1 } <= ${ eps }`);
      strictEqual(diff2 <= eps, true, `cos(180): ${ diff2 } <= ${ eps }`);
      strictEqual(diff3 <= eps, true, `cos(90): ${ diff3 } <= ${ eps }`);
      strictEqual(diff4 <= eps, true, `cos(60): ${ diff4 } <= ${ eps }`);
      strictEqual(diff5 <= eps, true, `cos(45): ${ diff5 } <= ${ eps }`);
    });
  });
  describe('cube', () => {
    it('should return cube of the number', () => {
      const n1 = 1;
      const n2 = -5;
      const n3 = 0;
      const n4 = 7;
      const n5 = -Infinity;
      const n6 = NaN;
      const wrap1 = new Num(n1);
      const wrap2 = new Num(n2);
      const wrap3 = new Num(n3);
      const wrap4 = new Num(n4);
      const wrap5 = new Num(n5);
      const wrap6 = new Num(n6);

      strictEqual(wrap1.cube, 1);
      strictEqual(wrap2.cube, -125);
      strictEqual(wrap3.cube, 0);
      strictEqual(wrap4.cube, 343);
      strictEqual(wrap5.cube, -Infinity);
      strictEqual(isNaN(wrap6.cube), true);
    });
  });
  describe('exp', () => {
    it('should work the same as Math.exp', () => {
      const n1 = 1;
      const n2 = -5;
      const n3 = 0;
      const n4 = 7;
      const n5 = Infinity;
      const n6 = NaN;
      const wrap1 = new Num(n1);
      const wrap2 = new Num(n2);
      const wrap3 = new Num(n3);
      const wrap4 = new Num(n4);
      const wrap5 = new Num(n5);
      const wrap6 = new Num(n6);
      const diff1 = abs(wrap1.exp - exp(n1));
      const diff2 = abs(wrap2.exp - exp(n2));
      const diff3 = abs(wrap3.exp - exp(n3));
      const diff4 = abs(wrap4.exp - exp(n4));

      strictEqual(diff1 <= eps, true, `exp(1): ${ diff1 } <= ${ eps }`);
      strictEqual(diff2 <= eps, true, `exp(-5): ${ diff2 } <= ${ eps }`);
      strictEqual(diff3 <= eps, true, `exp(0): ${ diff3 } <= ${ eps }`);
      strictEqual(diff4 <= eps, true, `exp(7): ${ diff4 } <= ${ eps }`);
      strictEqual(wrap5.exp, Infinity);
      strictEqual(isNaN(wrap6.exp), true);
    });
  });
  describe('floor', () => {
    it('should work the same as Math.floor', () => {
      const n1 = 1;
      const n2 = -5.5;
      const n3 = 0;
      const n4 = 7.5;
      const n5 = Infinity;
      const n6 = NaN;
      const wrap1 = new Num(n1);
      const wrap2 = new Num(n2);
      const wrap3 = new Num(n3);
      const wrap4 = new Num(n4);
      const wrap5 = new Num(n5);
      const wrap6 = new Num(n6);

      strictEqual(wrap1.floor, floor(n1));
      strictEqual(wrap2.floor, floor(n2));
      strictEqual(wrap3.floor, floor(n3));
      strictEqual(wrap4.floor, floor(n4));
      strictEqual(wrap5.floor, floor(n5));
      strictEqual(isNaN(wrap6.floor), true);
    });
  });
  describe('interval()', () => {
    it('should return abort-interval function', (done) => {
      let number = 0;

      const n = 100;
      const wrap = new Num(n);
      const abort = wrap.interval(() => {
        if (++number === 2) {
          done();

          return abort();
        }

        if (number < 2) {
          return;
        }

        done(new Error('Clear failed'));
      });
    });
    it('should be { clear() {} } context in repeated function', (done) => {
      let number = 0;

      const n = 100;
      const wrap = new Num(n);

      wrap.interval(function () {
        if (number) {
          return done(new Error('Clear failed'));
        }

        number++;

        this.abort();

        done();
      });
    });
    it('should actually call argument every <context> milliseconds', (done) => {
      let number = 0;

      const n = 100;
      const wrap = new Num(n);
      const abort = wrap.interval(() => {
        if (++number === 10) {
          done();

          return abort();
        }

        if (number < 10) {
          return;
        }

        done(new Error(`${ number } times!`));
      });
    });
  });
  describe('ln', () => {
    it('should work the same as Math.log', () => {
      const n1 = 1;
      const n2 = 0.45;
      const n3 = 0;
      const n4 = e;
      const n5 = Infinity;
      const n6 = NaN;
      const wrap1 = new Num(n1);
      const wrap2 = new Num(n2);
      const wrap3 = new Num(n3);
      const wrap4 = new Num(n4);
      const wrap5 = new Num(n5);
      const wrap6 = new Num(n6);

      strictEqual(wrap1.ln, ln(n1));
      strictEqual(wrap2.ln, ln(n2));
      strictEqual(wrap3.ln, ln(n3));
      strictEqual(wrap4.ln, ln(n4));
      strictEqual(wrap5.ln, ln(n5));
      strictEqual(isNaN(wrap6.ln), true);
    });
  });
  describe('log()', () => {
    it('should return logarithm with context base of an argument', () => {
      const n1 = 2;
      const n2 = 7;
      const n3 = 27;
      const n4 = 0.5;
      const n5 = 1;
      const n6 = Infinity;
      const n7 = NaN;
      const wrap1 = new Num(n1);
      const wrap2 = new Num(n2);
      const wrap3 = new Num(n3);
      const wrap4 = new Num(n4);
      const wrap5 = new Num(n5);
      const wrap6 = new Num(n6);
      const wrap7 = new Num(n7);
      const diff1 = abs(wrap1.log(0.5) - (-1));
      const diff2 = abs(wrap2.log(49) - 2);
      const diff3 = abs(wrap3.log(3) - 1 / 3);
      const diff4 = abs(wrap4.log(4) - (-2));

      strictEqual(diff1 <= eps, true, `log(${ n1 }, 0.5): ${ diff1 } <= ${ eps }`);
      strictEqual(diff2 <= eps, true, `log(${ n2 }, 49): ${ diff2 } <= ${ eps }`);
      strictEqual(diff3 <= eps, true, `log(${ n3 }, 1/3): ${ diff3 } <= ${ eps }`);
      strictEqual(diff4 <= eps, true, `log(${ n4 }, 4): ${ diff4 } <= ${ eps }`);
      strictEqual(isNaN(wrap5.log(1)), true);
      strictEqual(wrap5.log(2), Infinity);
      strictEqual(wrap5.log(0.5), -Infinity);
      strictEqual(wrap6.log(1), 0);
      strictEqual(wrap6.log(0.5), -0);
      strictEqual(isNaN(wrap7.log(0)), true);
    });
  });
  describe('log2', () => {
    it('should work the same as Math.log2', () => {
      const n1 = 1;
      const n2 = 0.45;
      const n3 = 0;
      const n4 = 2;
      const n5 = Infinity;
      const n6 = NaN;
      const wrap1 = new Num(n1);
      const wrap2 = new Num(n2);
      const wrap3 = new Num(n3);
      const wrap4 = new Num(n4);
      const wrap5 = new Num(n5);
      const wrap6 = new Num(n6);
      const diff1 = abs(wrap1.log2 - ln(n1) / ln2);
      const diff2 = abs(wrap2.log2 - ln(n2) / ln2);
      const diff4 = abs(wrap4.log2 - ln(n4) / ln2);

      strictEqual(diff1 <= eps, true, `log2(1): ${ diff1 } <= ${ eps }`);
      strictEqual(diff2 <= eps, true, `log2(0.45): ${ diff2 } <= ${ eps }`);
      strictEqual(wrap3.log2, -Infinity);
      strictEqual(diff4 <= eps, true, `log2(2): ${ diff4 } <= ${ eps }`);
      strictEqual(wrap5.log2, Infinity);
      strictEqual(isNaN(wrap6.log2), true);
    });
  });
  describe('log10', () => {
    it('should work the same as Math.log10', () => {
      const n1 = 1;
      const n2 = 0.45;
      const n3 = 0;
      const n4 = 10;
      const n5 = Infinity;
      const n6 = NaN;
      const wrap1 = new Num(n1);
      const wrap2 = new Num(n2);
      const wrap3 = new Num(n3);
      const wrap4 = new Num(n4);
      const wrap5 = new Num(n5);
      const wrap6 = new Num(n6);
      const diff1 = abs(wrap1.log10 - ln(n1) / ln10);
      const diff2 = abs(wrap2.log10 - ln(n2) / ln10);
      const diff4 = abs(wrap4.log10 - ln(n4) / ln10);

      strictEqual(diff1 <= eps, true, `log10(1): ${ diff1 } <= ${ eps }`);
      strictEqual(diff2 <= eps, true, `log10(0.45): ${ diff2 } <= ${ eps }`);
      strictEqual(wrap3.log10, -Infinity);
      strictEqual(diff4 <= eps, true, `log10(2): ${ diff4 } <= ${ eps }`);
      strictEqual(wrap5.log10, Infinity);
      strictEqual(isNaN(wrap6.log10), true);
    });
  });
  describe('pow()', () => {
    it('should work the same as Math.pow', () => {
      const n1 = 1;
      const n2 = 6;
      const n3 = 33;
      const n4 = -11;
      const n5 = Infinity;
      const n6 = NaN;
      const wrap1 = new Num(n1);
      const wrap2 = new Num(n2);
      const wrap3 = new Num(n3);
      const wrap4 = new Num(n4);
      const wrap5 = new Num(n5);
      const wrap6 = new Num(n6);

      strictEqual(wrap1.pow(2), pow(n1, 2));
      strictEqual(wrap2.pow(-6), pow(n2, -6));
      strictEqual(wrap3.pow(4), pow(n3, 4));
      strictEqual(wrap4.pow(13), pow(n4, 13));
      strictEqual(wrap5.pow(-12), pow(n5, -12));
      strictEqual(isNaN(wrap6.pow(1)), true);
    });
  });
  describe('root()', () => {
    it('should return root of the context', () => {
      const n1 = 1;
      const n2 = 6;
      const n3 = 33;
      const n4 = 11;
      const n5 = Infinity;
      const n6 = NaN;
      const wrap1 = new Num(n1);
      const wrap2 = new Num(n2);
      const wrap3 = new Num(n3);
      const wrap4 = new Num(n4);
      const wrap5 = new Num(n5);
      const wrap6 = new Num(n6);

      strictEqual(wrap1.root(2), pow(n1, 1 / 2));
      strictEqual(wrap2.root(6), pow(n2, 1 / 6));
      strictEqual(wrap3.root(4), pow(n3, 1 / 4));
      strictEqual(wrap4.root(13), pow(n4, 1 / 13));
      strictEqual(wrap5.root(12), pow(n5, 1 / 12));
      strictEqual(isNaN(wrap6.root(0)), true);
    });
  });
  describe('round', () => {
    it('should work the same as Math.round', () => {
      const n1 = 1;
      const n2 = -5.5;
      const n3 = 0;
      const n4 = 7.5;
      const n5 = Infinity;
      const n6 = NaN;
      const wrap1 = new Num(n1);
      const wrap2 = new Num(n2);
      const wrap3 = new Num(n3);
      const wrap4 = new Num(n4);
      const wrap5 = new Num(n5);
      const wrap6 = new Num(n6);

      strictEqual(wrap1.round, round(n1));
      strictEqual(wrap2.round, round(n2));
      strictEqual(wrap3.round, round(n3));
      strictEqual(wrap4.round, round(n4));
      strictEqual(wrap5.round, round(n5));
      strictEqual(isNaN(wrap6.round), true);
    });
  });
  describe('sign', () => {
    it('should work the same as Math.sign', () => {
      const n1 = 2;
      const n2 = -2;
      const n3 = 0;
      const n4 = -0;
      const n5 = Infinity;
      const n6 = -Infinity;
      const n7 = NaN;
      const wrap1 = new Num(n1);
      const wrap2 = new Num(n2);
      const wrap3 = new Num(n3);
      const wrap4 = new Num(n4);
      const wrap5 = new Num(n5);
      const wrap6 = new Num(n6);
      const wrap7 = new Num(n7);

      strictEqual(wrap1.sign, 1);
      strictEqual(wrap2.sign, -1);
      strictEqual(wrap3.sign, 0);
      strictEqual(wrap4.sign, -0);
      strictEqual(wrap5.sign, 1);
      strictEqual(wrap6.sign, -1);
      strictEqual(isNaN(wrap7.sign), true);
    });
  });
  describe('sin()', () => {
    it('should work the same as Math.sin with falsey argument', () => {
      const n1 = 0;
      const n2 = pi;
      const n3 = pi / 2;
      const n4 = pi / 3;
      const n5 = pi / 4;
      const wrap1 = new Num(n1);
      const wrap2 = new Num(n2);
      const wrap3 = new Num(n3);
      const wrap4 = new Num(n4);
      const wrap5 = new Num(n5);
      const diff1 = abs(wrap1.sin() - 0);
      const diff2 = abs(wrap2.sin() - 0);
      const diff3 = abs(wrap3.sin() - 1);
      const diff4 = abs(wrap4.sin() - sqrt(3) / 2);
      const diff5 = abs(wrap5.sin() - 1 / sqrt(2));

      strictEqual(diff1 <= eps, true, `sin(0): ${ diff1 } <= ${ eps }`);
      strictEqual(diff2 <= eps, true, `sin(pi): ${ diff2 } <= ${ eps }`);
      strictEqual(diff3 <= eps, true, `sin(pi/2): ${ diff3 } <= ${ eps }`);
      strictEqual(diff4 <= eps, true, `sin(pi/3): ${ diff4 } <= ${ eps }`);
      strictEqual(diff5 <= eps, true, `sin(pi/4): ${ diff5 } <= ${ eps }`);
    });
    it('should use context as number of degrees with truthy argument', () => {
      const n1 = 0;
      const n2 = 180;
      const n3 = 90;
      const n4 = 60;
      const n5 = 45;
      const wrap1 = new Num(n1);
      const wrap2 = new Num(n2);
      const wrap3 = new Num(n3);
      const wrap4 = new Num(n4);
      const wrap5 = new Num(n5);
      const diff1 = abs(wrap1.sin(true) - 0);
      const diff2 = abs(wrap2.sin(true) - 0);
      const diff3 = abs(wrap3.sin(true) - 1);
      const diff4 = abs(wrap4.sin(true) - sqrt(3) / 2);
      const diff5 = abs(wrap5.sin(true) - 1 / sqrt(2));

      strictEqual(diff1 <= eps, true, `sin(0): ${ diff1 } <= ${ eps }`);
      strictEqual(diff2 <= eps, true, `sin(180): ${ diff2 } <= ${ eps }`);
      strictEqual(diff3 <= eps, true, `sin(90): ${ diff3 } <= ${ eps }`);
      strictEqual(diff4 <= eps, true, `sin(60): ${ diff4 } <= ${ eps }`);
      strictEqual(diff5 <= eps, true, `sin(45): ${ diff5 } <= ${ eps }`);
    });
  });
  describe('sq', () => {
    it('should return square of the number', () => {
      const n1 = 1;
      const n2 = -5;
      const n3 = 0;
      const n4 = 7;
      const n5 = -Infinity;
      const n6 = NaN;
      const wrap1 = new Num(n1);
      const wrap2 = new Num(n2);
      const wrap3 = new Num(n3);
      const wrap4 = new Num(n4);
      const wrap5 = new Num(n5);
      const wrap6 = new Num(n6);

      strictEqual(wrap1.sq, 1);
      strictEqual(wrap2.sq, 25);
      strictEqual(wrap3.sq, 0);
      strictEqual(wrap4.sq, 49);
      strictEqual(wrap5.sq, Infinity);
      strictEqual(isNaN(wrap6.sq), true);
    });
  });
  describe('sqrt', () => {
    it('should work the same as Math.sqrt', () => {
      const n1 = 1;
      const n2 = 4;
      const n3 = 0;
      const n4 = 9;
      const n5 = Infinity;
      const n6 = NaN;
      const wrap1 = new Num(n1);
      const wrap2 = new Num(n2);
      const wrap3 = new Num(n3);
      const wrap4 = new Num(n4);
      const wrap5 = new Num(n5);
      const wrap6 = new Num(n6);
      const diff1 = Math.abs(wrap1.sqrt - 1);
      const diff2 = Math.abs(wrap2.sqrt - 2);
      const diff3 = Math.abs(wrap3.sqrt - 0);
      const diff4 = Math.abs(wrap4.sqrt - 3);

      strictEqual(diff1 <= eps, true, `sqrt(1): ${ diff1 } <= ${ eps }`);
      strictEqual(diff2 <= eps, true, `sqrt(4): ${ diff2 } <= ${ eps }`);
      strictEqual(diff3 <= eps, true, `sqrt(0): ${ diff3 } <= ${ eps }`);
      strictEqual(diff4 <= eps, true, `sqrt(9): ${ diff4 } <= ${ eps }`);
      strictEqual(wrap5.sqrt, Infinity);
      strictEqual(isNaN(wrap6.sqrt), true);
    });
  });
  describe('tan()', () => {
    it('should work the same as Math.tan with falsey argument', () => {
      const n1 = 0;
      const n2 = pi;
      const n3 = pi / 2;
      const n4 = pi / 3;
      const n5 = pi / 4;
      const wrap1 = new Num(n1);
      const wrap2 = new Num(n2);
      const wrap3 = new Num(n3);
      const wrap4 = new Num(n4);
      const wrap5 = new Num(n5);
      const diff1 = Math.abs(wrap1.tan() - 0);
      const diff2 = Math.abs(wrap2.tan() - 0);
      const diff3 = Math.abs(wrap3.tan());
      const diff4 = Math.abs(wrap4.tan() - sqrt(3));
      const diff5 = Math.abs(wrap5.tan() - 1);

      strictEqual(diff1 <= eps, true, `tan(0): ${ diff1 } <= ${ eps }`);
      strictEqual(diff2 <= eps, true, `tan(pi): ${ diff2 } <= ${ eps }`);
      strictEqual(diff3 >= max, true, `tan(pi/2): ${ diff3 } <= ${ eps }`);
      strictEqual(diff4 <= eps, true, `tan(pi/3): ${ diff4 } <= ${ eps }`);
      strictEqual(diff5 <= eps, true, `tan(pi/4): ${ diff5 } <= ${ eps }`);
    });
    it('should use context as number of degrees with truthy argument', () => {
      const n1 = 0;
      const n2 = 180;
      const n3 = 90;
      const n4 = 60;
      const n5 = 45;
      const wrap1 = new Num(n1);
      const wrap2 = new Num(n2);
      const wrap3 = new Num(n3);
      const wrap4 = new Num(n4);
      const wrap5 = new Num(n5);
      const diff1 = Math.abs(wrap1.tan(true) - 0);
      const diff2 = Math.abs(wrap2.tan(true) - 0);
      const diff3 = Math.abs(wrap3.tan(true));
      const diff4 = Math.abs(wrap4.tan(true) - sqrt(3));
      const diff5 = Math.abs(wrap5.tan(true) - 1);

      strictEqual(diff1 <= eps, true, `tan(0): ${ diff1 } <= ${ eps }`);
      strictEqual(diff2 <= eps, true, `tan(180): ${ diff2 } <= ${ eps }`);
      strictEqual(diff3 >= max, true, `tan(90): ${ diff3 } <= ${ eps }`);
      strictEqual(diff4 <= eps, true, `tan(60): ${ diff4 } <= ${ eps }`);
      strictEqual(diff5 <= eps, true, `tan(45): ${ diff5 } <= ${ eps }`);
    });
  });
  describe('timeout()', () => {
    it('should return promise with abort method', (done) => {
      const n = 150;
      const wrap = new Num(n);
      const timeout = wrap.timeout();

      timeout
        .then(() => done(new Error('Clear failed')))
        .catch((err) => {
          strictEqual(err.message, 'Timeout was aborted');

          done();
        });

      setTimeout(() => {
        timeout.abort();
      }, 100);
    });
    it('should return promise, that will be resolved with value in argument in <context> milliseconds', (done) => {
      const n = 150;
      const wrap = new Num(n);
      const random = Math.random();

      wrap.timeout(random)
        .then((value) => {
          strictEqual(value, random);

          done();
        })
        .catch(done);
    });
  });
  describe('toBase()', () => {
    it('should work the same as Number.prototype.toString', () => {
      const n1 = 1;
      const n2 = -5.5;
      const n3 = 0;
      const n4 = 7.5;
      const n5 = 65;
      const n6 = -32;
      const n7 = 19.666;
      const n8 = 11;
      const n9 = Infinity;
      const n10 = NaN;
      const wrap1 = new Num(n1);
      const wrap2 = new Num(n2);
      const wrap3 = new Num(n3);
      const wrap4 = new Num(n4);
      const wrap5 = new Num(n5);
      const wrap6 = new Num(n6);
      const wrap7 = new Num(n7);
      const wrap8 = new Num(n8);
      const wrap9 = new Num(n9);
      const wrap10 = new Num(n10);

      strictEqual(wrap1.toBase(2), toString(n1, 2));
      strictEqual(wrap2.toBase(3), toString(n2, 3));
      strictEqual(wrap3.toBase(12), toString(n3, 12));
      strictEqual(wrap4.toBase(3), toString(n4, 3));
      strictEqual(wrap5.toBase(16), toString(n5, 16));
      strictEqual(wrap6.toBase(26), toString(n6, 26));
      strictEqual(wrap7.toBase(11), toString(n7, 11));
      strictEqual(wrap8.toBase(8), toString(n8, 8));
      strictEqual(wrap9.toBase(36), toString(n9, 36));
      strictEqual(wrap10.toBase(4), toString(n10, 4));
    });
  });
  describe('toExponential()', () => {
    it('should work the same as Number.prototype.toExponential', () => {
      const n1 = 1;
      const n2 = -5.5;
      const n3 = 0;
      const n4 = 7.5;
      const n5 = Infinity;
      const n6 = NaN;
      const wrap1 = new Num(n1);
      const wrap2 = new Num(n2);
      const wrap3 = new Num(n3);
      const wrap4 = new Num(n4);
      const wrap5 = new Num(n5);
      const wrap6 = new Num(n6);

      strictEqual(wrap1.toExponential(), toExp(n1));
      strictEqual(wrap2.toExponential(), toExp(n2));
      strictEqual(wrap3.toExponential(), toExp(n3));
      strictEqual(wrap4.toExponential(), toExp(n4));
      strictEqual(wrap5.toExponential(), toExp(n5));
      strictEqual(wrap6.toExponential(), toExp(n6));
    });
  });
  describe('toFixed()', () => {
    it('should work the same as Number.prototype.toFixed', () => {
      const n1 = 1.456;
      const n2 = -5.5234;
      const n3 = 0.2345;
      const n4 = 7.51245;
      const n5 = Infinity;
      const n6 = NaN;
      const wrap1 = new Num(n1);
      const wrap2 = new Num(n2);
      const wrap3 = new Num(n3);
      const wrap4 = new Num(n4);
      const wrap5 = new Num(n5);
      const wrap6 = new Num(n6);

      strictEqual(wrap1.toFixed(1), toFixed(n1, 1));
      strictEqual(wrap2.toFixed(4), toFixed(n2, 4));
      strictEqual(wrap3.toFixed(3), toFixed(n3, 3));
      strictEqual(wrap4.toFixed(2), toFixed(n4, 2));
      strictEqual(wrap5.toFixed(7), toFixed(n5, 7));
      strictEqual(wrap6.toFixed(9), toFixed(n6, 9));
    });
  });
  describe('toPrecision()', () => {
    it('should work the same as Number.prototype.toPrecision', () => {
      const n1 = 1.456;
      const n2 = -5.5234;
      const n3 = 0.2345;
      const n4 = 7.51245;
      const n5 = Infinity;
      const n6 = NaN;
      const wrap1 = new Num(n1);
      const wrap2 = new Num(n2);
      const wrap3 = new Num(n3);
      const wrap4 = new Num(n4);
      const wrap5 = new Num(n5);
      const wrap6 = new Num(n6);

      strictEqual(wrap1.toPrecision(1), toPrecision(n1, 1));
      strictEqual(wrap2.toPrecision(4), toPrecision(n2, 4));
      strictEqual(wrap3.toPrecision(3), toPrecision(n3, 3));
      strictEqual(wrap4.toPrecision(2), toPrecision(n4, 2));
      strictEqual(wrap5.toPrecision(7), toPrecision(n5, 7));
      strictEqual(wrap6.toPrecision(9), toPrecision(n6, 9));
    });
  });
  describe('valueOf()', () => {
    it('should return value of context', () => {
      const n1 = 1.456;
      const n2 = -5.5234;
      const n3 = 0.2345;
      const n4 = 7.51245;
      const n5 = Infinity;
      const n6 = NaN;
      const wrap1 = new Num(n1);
      const wrap2 = new Num(n2);
      const wrap3 = new Num(n3);
      const wrap4 = new Num(n4);
      const wrap5 = new Num(n5);
      const wrap6 = new Num(n6);

      strictEqual(+wrap1, n1);
      strictEqual(+wrap2, n2);
      strictEqual(+wrap3, n3);
      strictEqual(+wrap4, n4);
      strictEqual(+wrap5, n5);
      strictEqual(isNaN(+wrap6), true);
    });
  });
});
