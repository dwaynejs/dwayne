import Class from './';
import { isNaN } from '../../libs';

const assert = require('assert');
const eps = Math.pow(2, -47);
const max = Math.pow(2, 53) - 1;
const pi = Math.PI;
const e = Math.E;
const ln2 = Math.LN2;
const ln10 = Math.LN10;
const pow = Math.pow;
const sqrt = Math.sqrt;
const abs = Math.abs;
const ceil = Math.ceil;
const floor = Math.floor;
const round = Math.round;
const ln = Math.log;
const toExp = (x) => x.toExponential();
const toFixed = (x, r) => x.toFixed(r);
const toPrecision = (x, r) => x.toPrecision(r);
const toString = (x, r) => x.toString(r);

export default () => {
	describe('it should test D.Number.prototype.[methods]', () => {
		describe('get abs', () => {
			it('should work the same as Math.abs', () => {
				const n1 = 1;
				const n2 = -1;
				const n3 = 0;
				const n4 = -0;
				const n5 = Infinity;
				const n6 = NaN;
				const wrap1 = new Class(n1);
				const wrap2 = new Class(n2);
				const wrap3 = new Class(n3);
				const wrap4 = new Class(n4);
				const wrap5 = new Class(n5);
				const wrap6 = new Class(n6);
				assert.strictEqual(wrap1.abs, 1);
				assert.strictEqual(wrap2.abs, 1);
				assert.strictEqual(wrap3.abs, 0);
				assert.strictEqual(wrap4.abs, 0);
				assert.strictEqual(wrap5.abs, Infinity);
				assert.strictEqual(isNaN(wrap6.abs), true);
			});
		});
		describe('.acos()', () => {
			it('should work the same as Math.acos with falsey argument', () => {
				const n1 = 1;
				const n2 = -1;
				const n3 = 0;
				const n4 = 1/2;
				const n5 = 1/sqrt(2);
				const wrap1 = new Class(n1);
				const wrap2 = new Class(n2);
				const wrap3 = new Class(n3);
				const wrap4 = new Class(n4);
				const wrap5 = new Class(n5);
				const diff1 = abs(wrap1.acos() - 0);
				const diff2 = abs(wrap2.acos() - pi);
				const diff3 = abs(wrap3.acos() - pi/2);
				const diff4 = abs(wrap4.acos() - pi/3);
				const diff5 = abs(wrap5.acos() - pi/4);
				assert.strictEqual(diff1 <= eps, true, `acos(1): ${ diff1 } <= ${ eps }`);
				assert.strictEqual(diff2 <= eps, true, `acos(-1): ${ diff2 } <= ${ eps }`);
				assert.strictEqual(diff3 <= eps, true, `acos(0): ${ diff3 } <= ${ eps }`);
				assert.strictEqual(diff4 <= eps, true, `acos(0.5): ${ diff4 } <= ${ eps }`);
				assert.strictEqual(diff5 <= eps, true, `acos(1/sqrt2): ${ diff5 } <= ${ eps }`);
			});
			it('should return acos(x) in degrees with truthy argument', () => {
				const n1 = 1;
				const n2 = -1;
				const n3 = 0;
				const n4 = 1/2;
				const n5 = 1/sqrt(2);
				const wrap1 = new Class(n1);
				const wrap2 = new Class(n2);
				const wrap3 = new Class(n3);
				const wrap4 = new Class(n4);
				const wrap5 = new Class(n5);
				const diff1 = abs(wrap1.acos(true) - 0);
				const diff2 = abs(wrap2.acos(true) - 180);
				const diff3 = abs(wrap3.acos(true) - 90);
				const diff4 = abs(wrap4.acos(true) - 60);
				const diff5 = abs(wrap5.acos(true) - 45);
				assert.strictEqual(diff1 <= eps, true, `acos(1): ${ diff1 } <= ${ eps }`);
				assert.strictEqual(diff2 <= eps, true, `acos(-1): ${ diff2 } <= ${ eps }`);
				assert.strictEqual(diff3 <= eps, true, `acos(0): ${ diff3 } <= ${ eps }`);
				assert.strictEqual(diff4 <= eps, true, `acos(0.5): ${ diff4 } <= ${ eps }`);
				assert.strictEqual(diff5 <= eps, true, `acos(1/sqrt2): ${ diff5 } <= ${ eps }`);
			});
		});
		describe('.array()', () => {
			it('should return a wrap of an array from 0 to n without arguments', () => {
				const n = 7;
				const wrap = new Class(n);

				assert.deepEqual(wrap.array().$, [0, 1, 2, 3, 4, 5, 6]);
			});
			it('should return a wrap of an array filled by mapFn from argument if it\'s present', () => {
				const n = 7;
				const wrap = new Class(n);
				const array = wrap.array((x) => 2*x).$;

				assert.deepEqual(array, [0, 2, 4, 6, 8, 10, 12]);
			});
		});
		describe('.asin()', () => {
			it('should work the same as Math.asin with falsey argument', () => {
				const n1 = 1;
				const n2 = -1;
				const n3 = 0;
				const n4 = 1/2;
				const n5 = 1/sqrt(2);
				const wrap1 = new Class(n1);
				const wrap2 = new Class(n2);
				const wrap3 = new Class(n3);
				const wrap4 = new Class(n4);
				const wrap5 = new Class(n5);
				const diff1 = abs(wrap1.asin() - pi/2);
				const diff2 = abs(wrap2.asin() - -pi/2);
				const diff3 = abs(wrap3.asin() - 0);
				const diff4 = abs(wrap4.asin() - pi/6);
				const diff5 = abs(wrap5.asin() - pi/4);
				assert.strictEqual(diff1 <= eps, true, `asin(1): ${ diff1 } <= ${ eps }`);
				assert.strictEqual(diff2 <= eps, true, `asin(-1): ${ diff2 } <= ${ eps }`);
				assert.strictEqual(diff3 <= eps, true, `asin(0): ${ diff3 } <= ${ eps }`);
				assert.strictEqual(diff4 <= eps, true, `asin(0.5): ${ diff4 } <= ${ eps }`);
				assert.strictEqual(diff5 <= eps, true, `asin(1/sqrt2): ${ diff5 } <= ${ eps }`);
			});
			it('should return asin(x) in degrees with truthy argument', () => {
				const n1 = 1;
				const n2 = -1;
				const n3 = 0;
				const n4 = 1/2;
				const n5 = 1/sqrt(2);
				const wrap1 = new Class(n1);
				const wrap2 = new Class(n2);
				const wrap3 = new Class(n3);
				const wrap4 = new Class(n4);
				const wrap5 = new Class(n5);
				const diff1 = abs(wrap1.asin(true) - 90);
				const diff2 = abs(wrap2.asin(true) - (-90));
				const diff3 = abs(wrap3.asin(true) - 0);
				const diff4 = abs(wrap4.asin(true) - 30);
				const diff5 = abs(wrap5.asin(true) - 45);
				assert.strictEqual(diff1 <= eps, true, `asin(1): ${ diff1 } <= ${ eps }`);
				assert.strictEqual(diff2 <= eps, true, `asin(-1): ${ diff2 } <= ${ eps }`);
				assert.strictEqual(diff3 <= eps, true, `asin(0): ${ diff3 } <= ${ eps }`);
				assert.strictEqual(diff4 <= eps, true, `asin(0.5): ${ diff4 } <= ${ eps }`);
				assert.strictEqual(diff5 <= eps, true, `asin(1/sqrt2): ${ diff5 } <= ${ eps }`);
			});
		});
		describe('.atan()', () => {
			it('should work the same as Math.atan with falsey argument', () => {
				const n1 = 1;
				const n2 = -1;
				const n3 = 0;
				const n4 = sqrt(3);
				const wrap1 = new Class(n1);
				const wrap2 = new Class(n2);
				const wrap3 = new Class(n3);
				const wrap4 = new Class(n4);
				const diff1 = abs(wrap1.atan() - pi/4);
				const diff2 = abs(wrap2.atan() - (-pi/4));
				const diff3 = abs(wrap3.atan() - 0);
				const diff4 = abs(wrap4.atan() - pi/3);
				assert.strictEqual(diff1 <= eps, true, `atan(1): ${ diff1 } <= ${ eps }`);
				assert.strictEqual(diff2 <= eps, true, `atan(-1): ${ diff2 } <= ${ eps }`);
				assert.strictEqual(diff3 <= eps, true, `atan(0): ${ diff3 } <= ${ eps }`);
				assert.strictEqual(diff4 <= eps, true, `atan(0.5): ${ diff4 } <= ${ eps }`);
			});
			it('should return atan(x) in degrees with truthy argument', () => {
				const n1 = 1;
				const n2 = -1;
				const n3 = 0;
				const n4 = sqrt(3);
				const wrap1 = new Class(n1);
				const wrap2 = new Class(n2);
				const wrap3 = new Class(n3);
				const wrap4 = new Class(n4);
				const diff1 = abs(wrap1.atan(true) - 45);
				const diff2 = abs(wrap2.atan(true) - (-45));
				const diff3 = abs(wrap3.atan(true) - 0);
				const diff4 = abs(wrap4.atan(true) - 60);
				assert.strictEqual(diff1 <= eps, true, `atan(1): ${ diff1 } <= ${ eps }`);
				assert.strictEqual(diff2 <= eps, true, `atan(-1): ${ diff2 } <= ${ eps }`);
				assert.strictEqual(diff3 <= eps, true, `atan(0): ${ diff3 } <= ${ eps }`);
				assert.strictEqual(diff4 <= eps, true, `atan(0.5): ${ diff4 } <= ${ eps }`);
			});
		});
		describe('get cbrt', () => {
			it('should work the same as Math.cbrt', () => {
				const n1 = 1;
				const n2 = -8;
				const n3 = 0;
				const n4 = 27;
				const n5 = -Infinity;
				const n6 = NaN;
				const wrap1 = new Class(n1);
				const wrap2 = new Class(n2);
				const wrap3 = new Class(n3);
				const wrap4 = new Class(n4);
				const wrap5 = new Class(n5);
				const wrap6 = new Class(n6);
				const diff1 = abs(wrap1.cbrt - 1);
				const diff2 = abs(wrap2.cbrt - (-2));
				const diff3 = abs(wrap3.cbrt - 0);
				const diff4 = abs(wrap4.cbrt - 3);
				assert.strictEqual(diff1 <= eps, true, `cbrt(1): ${ diff1 } <= ${ eps }`);
				assert.strictEqual(diff2 <= eps, true, `cbrt(-8): ${ diff2 } <= ${ eps }`);
				assert.strictEqual(diff3 <= eps, true, `cbrt(0): ${ diff3 } <= ${ eps }`);
				assert.strictEqual(diff4 <= eps, true, `cbrt(27): ${ diff4 } <= ${ eps }`);
				assert.strictEqual(wrap5.cbrt, -Infinity);
				assert.strictEqual(isNaN(wrap6.cbrt), true);
			});
		});
		describe('get ceil', () => {
			it('should work the same as Math.ceil', () => {
				const n1 = 1;
				const n2 = -5.5;
				const n3 = 0;
				const n4 = 7.5;
				const n5 = Infinity;
				const n6 = NaN;
				const wrap1 = new Class(n1);
				const wrap2 = new Class(n2);
				const wrap3 = new Class(n3);
				const wrap4 = new Class(n4);
				const wrap5 = new Class(n5);
				const wrap6 = new Class(n6);
				assert.strictEqual(wrap1.ceil, ceil(n1));
				assert.strictEqual(wrap2.ceil, ceil(n2));
				assert.strictEqual(wrap3.ceil, ceil(n3));
				assert.strictEqual(wrap4.ceil, ceil(n4));
				assert.strictEqual(wrap5.ceil, ceil(n5));
				assert.strictEqual(isNaN(wrap6.ceil), true);
			});
		});
		describe('.cos()', () => {
			it('should work the same as Math.cos with falsey argument', () => {
				const n1 = 0;
				const n2 = pi;
				const n3 = pi/2;
				const n4 = pi/3;
				const n5 = pi/4;
				const wrap1 = new Class(n1);
				const wrap2 = new Class(n2);
				const wrap3 = new Class(n3);
				const wrap4 = new Class(n4);
				const wrap5 = new Class(n5);
				const diff1 = Math.abs(wrap1.cos() - 1);
				const diff2 = Math.abs(wrap2.cos() - (-1));
				const diff3 = Math.abs(wrap3.cos() - 0);
				const diff4 = Math.abs(wrap4.cos() - 1/2);
				const diff5 = Math.abs(wrap5.cos() - 1/Math.sqrt(2));
				assert.strictEqual(diff1 <= eps, true, `cos(0): ${ diff1 } <= ${ eps }`);
				assert.strictEqual(diff2 <= eps, true, `cos(pi): ${ diff2 } <= ${ eps }`);
				assert.strictEqual(diff3 <= eps, true, `cos(pi/2): ${ diff3 } <= ${ eps }`);
				assert.strictEqual(diff4 <= eps, true, `cos(pi/3): ${ diff4 } <= ${ eps }`);
				assert.strictEqual(diff5 <= eps, true, `cos(pi/4): ${ diff5 } <= ${ eps }`);
			});
			it('should use context as number of degrees with truthy argument', () => {
				const n1 = 0;
				const n2 = 180;
				const n3 = 90;
				const n4 = 60;
				const n5 = 45;
				const wrap1 = new Class(n1);
				const wrap2 = new Class(n2);
				const wrap3 = new Class(n3);
				const wrap4 = new Class(n4);
				const wrap5 = new Class(n5);
				const diff1 = Math.abs(wrap1.cos(true) - 1);
				const diff2 = Math.abs(wrap2.cos(true) - (-1));
				const diff3 = Math.abs(wrap3.cos(true) - 0);
				const diff4 = Math.abs(wrap4.cos(true) - 1/2);
				const diff5 = Math.abs(wrap5.cos(true) - 1/Math.sqrt(2));
				assert.strictEqual(diff1 <= eps, true, `cos(0): ${ diff1 } <= ${ eps }`);
				assert.strictEqual(diff2 <= eps, true, `cos(180): ${ diff2 } <= ${ eps }`);
				assert.strictEqual(diff3 <= eps, true, `cos(90): ${ diff3 } <= ${ eps }`);
				assert.strictEqual(diff4 <= eps, true, `cos(60): ${ diff4 } <= ${ eps }`);
				assert.strictEqual(diff5 <= eps, true, `cos(45): ${ diff5 } <= ${ eps }`);
			});
		});
		describe('get cube', () => {
			it('should return cube of the number', () => {
				const n1 = 1;
				const n2 = -5;
				const n3 = 0;
				const n4 = 7;
				const n5 = -Infinity;
				const n6 = NaN;
				const wrap1 = new Class(n1);
				const wrap2 = new Class(n2);
				const wrap3 = new Class(n3);
				const wrap4 = new Class(n4);
				const wrap5 = new Class(n5);
				const wrap6 = new Class(n6);
				assert.strictEqual(wrap1.cube, 1);
				assert.strictEqual(wrap2.cube, -125);
				assert.strictEqual(wrap3.cube, 0);
				assert.strictEqual(wrap4.cube, 343);
				assert.strictEqual(wrap5.cube, -Infinity);
				assert.strictEqual(isNaN(wrap6.cube), true);
			});
		});
		describe('get exp', () => {
			it('should work the same as Math.exp', () => {
				const n1 = 1;
				const n2 = -5;
				const n3 = 0;
				const n4 = 7;
				const n5 = Infinity;
				const n6 = NaN;
				const wrap1 = new Class(n1);
				const wrap2 = new Class(n2);
				const wrap3 = new Class(n3);
				const wrap4 = new Class(n4);
				const wrap5 = new Class(n5);
				const wrap6 = new Class(n6);
				const diff1 = abs(wrap1.exp - pow(e, n1));
				const diff2 = abs(wrap2.exp - pow(e, n2));
				const diff3 = abs(wrap3.exp - pow(e, n3));
				const diff4 = abs(wrap4.exp - pow(e, n4));
				assert.strictEqual(diff1 <= eps, true, `exp(1): ${ diff1 } <= ${ eps }`);
				assert.strictEqual(diff2 <= eps, true, `exp(-5): ${ diff2 } <= ${ eps }`);
				assert.strictEqual(diff3 <= eps, true, `exp(0): ${ diff3 } <= ${ eps }`);
				assert.strictEqual(diff4 <= eps, true, `exp(7): ${ diff4 } <= ${ eps }`);
				assert.strictEqual(wrap5.exp, Infinity);
				assert.strictEqual(isNaN(wrap6.exp), true);
			});
		});
		describe('get floor', () => {
			it('should work the same as Math.floor', () => {
				const n1 = 1;
				const n2 = -5.5;
				const n3 = 0;
				const n4 = 7.5;
				const n5 = Infinity;
				const n6 = NaN;
				const wrap1 = new Class(n1);
				const wrap2 = new Class(n2);
				const wrap3 = new Class(n3);
				const wrap4 = new Class(n4);
				const wrap5 = new Class(n5);
				const wrap6 = new Class(n6);
				assert.strictEqual(wrap1.floor, floor(n1));
				assert.strictEqual(wrap2.floor, floor(n2));
				assert.strictEqual(wrap3.floor, floor(n3));
				assert.strictEqual(wrap4.floor, floor(n4));
				assert.strictEqual(wrap5.floor, floor(n5));
				assert.strictEqual(isNaN(wrap6.floor), true);
			});
		});
		describe('.interval()', () => {
			it('should return clear-interval function', (done) => {
				const n = 100;
				const wrap = new Class(n);
				let number = 0;
				const clear = wrap.interval(() => {
					if (number !== 2) {
						return number++;
					}

					done(new Error('Clear failed'));

					number++;
				});

				setTimeout(() => {
					clear();
					done();
				}, 150);
			});
			it('should be { clear() {} } context in repeated function', (done) => {
				const n = 100;
				const wrap = new Class(n);
				let number = 0;
				wrap.interval(function () {
					if (number) {
						return done(new Error('Clear failed'));
					}

					number++;

					this.clear();

					done();
				});
			});
			it('should actually call argument every <context> milliseconds', (done) => {
				const n = 100;
				const wrap = new Class(n);
				let number = 0;
				const clear = wrap.interval(() => {
					number++;
				});

				setTimeout(() => {
					try {
						assert.strictEqual(number, 10);
						clear();
						done();
					} catch (err) {
						done(err);
					}
				}, 999);
			});
		});
		describe('get ln', () => {
			it('should work the same as Math.log', () => {
				const n1 = 1;
				const n2 = 0.45;
				const n3 = 0;
				const n4 = e;
				const n5 = Infinity;
				const n6 = NaN;
				const wrap1 = new Class(n1);
				const wrap2 = new Class(n2);
				const wrap3 = new Class(n3);
				const wrap4 = new Class(n4);
				const wrap5 = new Class(n5);
				const wrap6 = new Class(n6);
				assert.strictEqual(wrap1.ln, ln(n1));
				assert.strictEqual(wrap2.ln, ln(n2));
				assert.strictEqual(wrap3.ln, ln(n3));
				assert.strictEqual(wrap4.ln, ln(n4));
				assert.strictEqual(wrap5.ln, ln(n5));
				assert.strictEqual(isNaN(wrap6.ln), true);
			});
		});
		describe('.log()', () => {
			it('should return logarithm with context base of an argument', () => {
				const n1 = 2;
				const n2 = 7;
				const n3 = 27;
				const n4 = 0.5;
				const n5 = 1;
				const n6 = Infinity;
				const n7 = NaN;
				const wrap1 = new Class(n1);
				const wrap2 = new Class(n2);
				const wrap3 = new Class(n3);
				const wrap4 = new Class(n4);
				const wrap5 = new Class(n5);
				const wrap6 = new Class(n6);
				const wrap7 = new Class(n7);
				const diff1 = abs(wrap1.log(0.5) - (-1));
				const diff2 = abs(wrap2.log(49) - 2);
				const diff3 = abs(wrap3.log(3) - 1/3);
				const diff4 = abs(wrap4.log(4) - (-2));
				assert.strictEqual(diff1 <= eps, true, `log(${ n1 }, 0.5): ${ diff1 } <= ${ eps }`);
				assert.strictEqual(diff2 <= eps, true, `log(${ n2 }, 49): ${ diff2 } <= ${ eps }`);
				assert.strictEqual(diff3 <= eps, true, `log(${ n3 }, 1/3): ${ diff3 } <= ${ eps }`);
				assert.strictEqual(diff4 <= eps, true, `log(${ n4 }, 4): ${ diff4 } <= ${ eps }`);
				assert.strictEqual(isNaN(wrap5.log(1)), true);
				assert.strictEqual(wrap5.log(2), Infinity);
				assert.strictEqual(wrap5.log(0.5), -Infinity);
				assert.strictEqual(wrap6.log(1), 0);
				assert.strictEqual(wrap6.log(0.5), -0);
				assert.strictEqual(isNaN(wrap7.log(0)), true);
			});
		});
		describe('get log2', () => {
			it('should work the same as Math.log2', () => {
				const n1 = 1;
				const n2 = 0.45;
				const n3 = 0;
				const n4 = 2;
				const n5 = Infinity;
				const n6 = NaN;
				const wrap1 = new Class(n1);
				const wrap2 = new Class(n2);
				const wrap3 = new Class(n3);
				const wrap4 = new Class(n4);
				const wrap5 = new Class(n5);
				const wrap6 = new Class(n6);
				const diff1 = abs(wrap1.log2 - ln(n1) / ln2);
				const diff2 = abs(wrap2.log2 - ln(n2) / ln2);
				const diff4 = abs(wrap4.log2 - ln(n4) / ln2);
				assert.strictEqual(diff1 <= eps, true, `log2(1): ${ diff1 } <= ${ eps }`);
				assert.strictEqual(diff2 <= eps, true, `log2(0.45): ${ diff2 } <= ${ eps }`);
				assert.strictEqual(wrap3.log2, -Infinity);
				assert.strictEqual(diff4 <= eps, true, `log2(2): ${ diff4 } <= ${ eps }`);
				assert.strictEqual(wrap5.log2, Infinity);
				assert.strictEqual(isNaN(wrap6.log2), true);
			});
		});
		describe('get log10', () => {
			it('should work the same as Math.log10', () => {
				const n1 = 1;
				const n2 = 0.45;
				const n3 = 0;
				const n4 = 10;
				const n5 = Infinity;
				const n6 = NaN;
				const wrap1 = new Class(n1);
				const wrap2 = new Class(n2);
				const wrap3 = new Class(n3);
				const wrap4 = new Class(n4);
				const wrap5 = new Class(n5);
				const wrap6 = new Class(n6);
				const diff1 = abs(wrap1.log10 - ln(n1) / ln10);
				const diff2 = abs(wrap2.log10 - ln(n2) / ln10);
				const diff4 = abs(wrap4.log10 - ln(n4) / ln10);
				assert.strictEqual(diff1 <= eps, true, `log10(1): ${ diff1 } <= ${ eps }`);
				assert.strictEqual(diff2 <= eps, true, `log10(0.45): ${ diff2 } <= ${ eps }`);
				assert.strictEqual(wrap3.log10, -Infinity);
				assert.strictEqual(diff4 <= eps, true, `log10(2): ${ diff4 } <= ${ eps }`);
				assert.strictEqual(wrap5.log10, Infinity);
				assert.strictEqual(isNaN(wrap6.log10), true);
			});
		});
		describe('.pow()', () => {
			it('should work the same as Math.pow', () => {
				const n1 = 1;
				const n2 = 6;
				const n3 = 33;
				const n4 = -11;
				const n5 = Infinity;
				const n6 = NaN;
				const wrap1 = new Class(n1);
				const wrap2 = new Class(n2);
				const wrap3 = new Class(n3);
				const wrap4 = new Class(n4);
				const wrap5 = new Class(n5);
				const wrap6 = new Class(n6);
				assert.strictEqual(wrap1.pow(2), pow(n1, 2));
				assert.strictEqual(wrap2.pow(-6), pow(n2, -6));
				assert.strictEqual(wrap3.pow(4), pow(n3, 4));
				assert.strictEqual(wrap4.pow(13), pow(n4, 13));
				assert.strictEqual(wrap5.pow(-12), pow(n5, -12));
				assert.strictEqual(isNaN(wrap6.pow(1)), true);
			});
		});
		describe('.root()', () => {
			it('should return root of the context', () => {
				const n1 = 1;
				const n2 = 6;
				const n3 = 33;
				const n4 = 11;
				const n5 = Infinity;
				const n6 = NaN;
				const wrap1 = new Class(n1);
				const wrap2 = new Class(n2);
				const wrap3 = new Class(n3);
				const wrap4 = new Class(n4);
				const wrap5 = new Class(n5);
				const wrap6 = new Class(n6);
				assert.strictEqual(wrap1.root(2), pow(n1, 1/2));
				assert.strictEqual(wrap2.root(6), pow(n2, 1/6));
				assert.strictEqual(wrap3.root(4), pow(n3, 1/4));
				assert.strictEqual(wrap4.root(13), pow(n4, 1/13));
				assert.strictEqual(wrap5.root(12), pow(n5, 1/12));
				assert.strictEqual(isNaN(wrap6.root(0)), true);
			});
		});
		describe('get round', () => {
			it('should work the same as Math.round', () => {
				const n1 = 1;
				const n2 = -5.5;
				const n3 = 0;
				const n4 = 7.5;
				const n5 = Infinity;
				const n6 = NaN;
				const wrap1 = new Class(n1);
				const wrap2 = new Class(n2);
				const wrap3 = new Class(n3);
				const wrap4 = new Class(n4);
				const wrap5 = new Class(n5);
				const wrap6 = new Class(n6);
				assert.strictEqual(wrap1.round, round(n1));
				assert.strictEqual(wrap2.round, round(n2));
				assert.strictEqual(wrap3.round, round(n3));
				assert.strictEqual(wrap4.round, round(n4));
				assert.strictEqual(wrap5.round, round(n5));
				assert.strictEqual(isNaN(wrap6.round), true);
			});
		});
		describe('get sign', () => {
			it('should work the same as Math.sign', () => {
				const n1 = 2;
				const n2 = -2;
				const n3 = 0;
				const n4 = -0;
				const n5 = Infinity;
				const n6 = -Infinity;
				const n7 = NaN;
				const wrap1 = new Class(n1);
				const wrap2 = new Class(n2);
				const wrap3 = new Class(n3);
				const wrap4 = new Class(n4);
				const wrap5 = new Class(n5);
				const wrap6 = new Class(n6);
				const wrap7 = new Class(n7);
				assert.strictEqual(wrap1.sign, 1);
				assert.strictEqual(wrap2.sign, -1);
				assert.strictEqual(wrap3.sign, 0);
				assert.strictEqual(wrap4.sign, -0);
				assert.strictEqual(wrap5.sign, 1);
				assert.strictEqual(wrap6.sign, -1);
				assert.strictEqual(isNaN(wrap7.sign), true);
			});
		});
		describe('.sin()', () => {
			it('should work the same as Math.sin with falsey argument', () => {
				const n1 = 0;
				const n2 = pi;
				const n3 = pi/2;
				const n4 = pi/3;
				const n5 = pi/4;
				const wrap1 = new Class(n1);
				const wrap2 = new Class(n2);
				const wrap3 = new Class(n3);
				const wrap4 = new Class(n4);
				const wrap5 = new Class(n5);
				const diff1 = abs(wrap1.sin() - 0);
				const diff2 = abs(wrap2.sin() - 0);
				const diff3 = abs(wrap3.sin() - 1);
				const diff4 = abs(wrap4.sin() - sqrt(3)/2);
				const diff5 = abs(wrap5.sin() - 1/sqrt(2));
				assert.strictEqual(diff1 <= eps, true, `sin(0): ${ diff1 } <= ${ eps }`);
				assert.strictEqual(diff2 <= eps, true, `sin(pi): ${ diff2 } <= ${ eps }`);
				assert.strictEqual(diff3 <= eps, true, `sin(pi/2): ${ diff3 } <= ${ eps }`);
				assert.strictEqual(diff4 <= eps, true, `sin(pi/3): ${ diff4 } <= ${ eps }`);
				assert.strictEqual(diff5 <= eps, true, `sin(pi/4): ${ diff5 } <= ${ eps }`);
			});
			it('should use context as number of degrees with truthy argument', () => {
				const n1 = 0;
				const n2 = 180;
				const n3 = 90;
				const n4 = 60;
				const n5 = 45;
				const wrap1 = new Class(n1);
				const wrap2 = new Class(n2);
				const wrap3 = new Class(n3);
				const wrap4 = new Class(n4);
				const wrap5 = new Class(n5);
				const diff1 = abs(wrap1.sin(true) - 0);
				const diff2 = abs(wrap2.sin(true) - 0);
				const diff3 = abs(wrap3.sin(true) - 1);
				const diff4 = abs(wrap4.sin(true) - sqrt(3)/2);
				const diff5 = abs(wrap5.sin(true) - 1/sqrt(2));
				assert.strictEqual(diff1 <= eps, true, `sin(0): ${ diff1 } <= ${ eps }`);
				assert.strictEqual(diff2 <= eps, true, `sin(180): ${ diff2 } <= ${ eps }`);
				assert.strictEqual(diff3 <= eps, true, `sin(90): ${ diff3 } <= ${ eps }`);
				assert.strictEqual(diff4 <= eps, true, `sin(60): ${ diff4 } <= ${ eps }`);
				assert.strictEqual(diff5 <= eps, true, `sin(45): ${ diff5 } <= ${ eps }`);
			});
		});
		describe('get sqrt', () => {
			it('should work the same as Math.sqrt', () => {
				const n1 = 1;
				const n2 = 4;
				const n3 = 0;
				const n4 = 9;
				const n5 = Infinity;
				const n6 = NaN;
				const wrap1 = new Class(n1);
				const wrap2 = new Class(n2);
				const wrap3 = new Class(n3);
				const wrap4 = new Class(n4);
				const wrap5 = new Class(n5);
				const wrap6 = new Class(n6);
				const diff1 = Math.abs(wrap1.sqrt - 1);
				const diff2 = Math.abs(wrap2.sqrt - 2);
				const diff3 = Math.abs(wrap3.sqrt - 0);
				const diff4 = Math.abs(wrap4.sqrt - 3);
				assert.strictEqual(diff1 <= eps, true, `sqrt(1): ${ diff1 } <= ${ eps }`);
				assert.strictEqual(diff2 <= eps, true, `sqrt(4): ${ diff2 } <= ${ eps }`);
				assert.strictEqual(diff3 <= eps, true, `sqrt(0): ${ diff3 } <= ${ eps }`);
				assert.strictEqual(diff4 <= eps, true, `sqrt(9): ${ diff4 } <= ${ eps }`);
				assert.strictEqual(wrap5.sqrt, Infinity);
				assert.strictEqual(isNaN(wrap6.sqrt), true);
			});
		});
		describe('get square', () => {
			it('should return square of the number', () => {
				const n1 = 1;
				const n2 = -5;
				const n3 = 0;
				const n4 = 7;
				const n5 = -Infinity;
				const n6 = NaN;
				const wrap1 = new Class(n1);
				const wrap2 = new Class(n2);
				const wrap3 = new Class(n3);
				const wrap4 = new Class(n4);
				const wrap5 = new Class(n5);
				const wrap6 = new Class(n6);
				assert.strictEqual(wrap1.square, 1);
				assert.strictEqual(wrap2.square, 25);
				assert.strictEqual(wrap3.square, 0);
				assert.strictEqual(wrap4.square, 49);
				assert.strictEqual(wrap5.square, Infinity);
				assert.strictEqual(isNaN(wrap6.square), true);
			});
		});
		describe('.tan()', () => {
			it('should work the same as Math.tan with falsey argument', () => {
				const n1 = 0;
				const n2 = pi;
				const n3 = pi/2;
				const n4 = pi/3;
				const n5 = pi/4;
				const wrap1 = new Class(n1);
				const wrap2 = new Class(n2);
				const wrap3 = new Class(n3);
				const wrap4 = new Class(n4);
				const wrap5 = new Class(n5);
				const diff1 = Math.abs(wrap1.tan() - 0);
				const diff2 = Math.abs(wrap2.tan() - 0);
				const diff3 = Math.abs(wrap3.tan());
				const diff4 = Math.abs(wrap4.tan() - Math.sqrt(3));
				const diff5 = Math.abs(wrap5.tan() - 1);
				assert.strictEqual(diff1 <= eps, true, `tan(0): ${ diff1 } <= ${ eps }`);
				assert.strictEqual(diff2 <= eps, true, `tan(pi): ${ diff2 } <= ${ eps }`);
				assert.strictEqual(diff3 >= max, true, `tan(pi/2): ${ diff3 } <= ${ eps }`);
				assert.strictEqual(diff4 <= eps, true, `tan(pi/3): ${ diff4 } <= ${ eps }`);
				assert.strictEqual(diff5 <= eps, true, `tan(pi/4): ${ diff5 } <= ${ eps }`);
			});
			it('should use context as number of degrees with truthy argument', () => {
				const n1 = 0;
				const n2 = 180;
				const n3 = 90;
				const n4 = 60;
				const n5 = 45;
				const wrap1 = new Class(n1);
				const wrap2 = new Class(n2);
				const wrap3 = new Class(n3);
				const wrap4 = new Class(n4);
				const wrap5 = new Class(n5);
				const diff1 = Math.abs(wrap1.tan(true) - 0);
				const diff2 = Math.abs(wrap2.tan(true) - 0);
				const diff3 = Math.abs(wrap3.tan(true));
				const diff4 = Math.abs(wrap4.tan(true) - Math.sqrt(3));
				const diff5 = Math.abs(wrap5.tan(true) - 1);
				assert.strictEqual(diff1 <= eps, true, `tan(0): ${ diff1 } <= ${ eps }`);
				assert.strictEqual(diff2 <= eps, true, `tan(180): ${ diff2 } <= ${ eps }`);
				assert.strictEqual(diff3 >= max, true, `tan(90): ${ diff3 } <= ${ eps }`);
				assert.strictEqual(diff4 <= eps, true, `tan(60): ${ diff4 } <= ${ eps }`);
				assert.strictEqual(diff5 <= eps, true, `tan(45): ${ diff5 } <= ${ eps }`);
			});
		});
		describe('.timeout()', () => {
			it('should return promise with clear method', (done) => {
				const n = 150;
				const wrap = new Class(n);
				const timeout = wrap.timeout();
				timeout.then(() => done(new Error('Clear failed')), () => {});

				setTimeout(() => {
					timeout.clear().catch(() => {});
					done();
				}, 100);
			});
			it('should return promise, that will be resolved with value in argument in <context> milliseconds', (done) => {
				const n = 150;
				const wrap = new Class(n);
				const random = Math.random();
				wrap.timeout(random).then((value) => {
					try {
						assert.strictEqual(value, random);
						done();
					} catch (err) {
						done(err);
					}
				});
			});
		});
		describe('.toBase()', () => {
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
				const wrap1 = new Class(n1);
				const wrap2 = new Class(n2);
				const wrap3 = new Class(n3);
				const wrap4 = new Class(n4);
				const wrap5 = new Class(n5);
				const wrap6 = new Class(n6);
				const wrap7 = new Class(n7);
				const wrap8 = new Class(n8);
				const wrap9 = new Class(n9);
				const wrap10 = new Class(n10);
				assert.strictEqual(wrap1.toBase(2), toString(n1, 2));
				assert.strictEqual(wrap2.toBase(3), toString(n2, 3));
				assert.strictEqual(wrap3.toBase(12), toString(n3, 12));
				assert.strictEqual(wrap4.toBase(3), toString(n4, 3));
				assert.strictEqual(wrap5.toBase(16), toString(n5, 16));
				assert.strictEqual(wrap6.toBase(26), toString(n6, 26));
				assert.strictEqual(wrap7.toBase(11), toString(n7, 11));
				assert.strictEqual(wrap8.toBase(8), toString(n8, 8));
				assert.strictEqual(wrap9.toBase(36), toString(n9, 36));
				assert.strictEqual(wrap10.toBase(4), toString(n10, 4));
			});
		});
		describe('.toExponential()', () => {
			it('should work the same as Number.prototype.toExponential', () => {
				const n1 = 1;
				const n2 = -5.5;
				const n3 = 0;
				const n4 = 7.5;
				const n5 = Infinity;
				const n6 = NaN;
				const wrap1 = new Class(n1);
				const wrap2 = new Class(n2);
				const wrap3 = new Class(n3);
				const wrap4 = new Class(n4);
				const wrap5 = new Class(n5);
				const wrap6 = new Class(n6);
				assert.strictEqual(wrap1.toExponential(), toExp(n1));
				assert.strictEqual(wrap2.toExponential(), toExp(n2));
				assert.strictEqual(wrap3.toExponential(), toExp(n3));
				assert.strictEqual(wrap4.toExponential(), toExp(n4));
				assert.strictEqual(wrap5.toExponential(), toExp(n5));
				assert.strictEqual(wrap6.toExponential(), toExp(n6));
			});
		});
		describe('.toFixed()', () => {
			it('should work the same as Number.prototype.toFixed', () => {
				const n1 = 1.456;
				const n2 = -5.5234;
				const n3 = 0.2345;
				const n4 = 7.51245;
				const n5 = Infinity;
				const n6 = NaN;
				const wrap1 = new Class(n1);
				const wrap2 = new Class(n2);
				const wrap3 = new Class(n3);
				const wrap4 = new Class(n4);
				const wrap5 = new Class(n5);
				const wrap6 = new Class(n6);
				assert.strictEqual(wrap1.toFixed(1), toFixed(n1, 1));
				assert.strictEqual(wrap2.toFixed(4), toFixed(n2, 4));
				assert.strictEqual(wrap3.toFixed(3), toFixed(n3, 3));
				assert.strictEqual(wrap4.toFixed(2), toFixed(n4, 2));
				assert.strictEqual(wrap5.toFixed(7), toFixed(n5, 7));
				assert.strictEqual(wrap6.toFixed(9), toFixed(n6, 9));
			});
		});
		describe('.toPrecision()', () => {
			it('should work the same as Number.prototype.toPrecision', () => {
				const n1 = 1.456;
				const n2 = -5.5234;
				const n3 = 0.2345;
				const n4 = 7.51245;
				const n5 = Infinity;
				const n6 = NaN;
				const wrap1 = new Class(n1);
				const wrap2 = new Class(n2);
				const wrap3 = new Class(n3);
				const wrap4 = new Class(n4);
				const wrap5 = new Class(n5);
				const wrap6 = new Class(n6);
				assert.strictEqual(wrap1.toPrecision(1), toPrecision(n1, 1));
				assert.strictEqual(wrap2.toPrecision(4), toPrecision(n2, 4));
				assert.strictEqual(wrap3.toPrecision(3), toPrecision(n3, 3));
				assert.strictEqual(wrap4.toPrecision(2), toPrecision(n4, 2));
				assert.strictEqual(wrap5.toPrecision(7), toPrecision(n5, 7));
				assert.strictEqual(wrap6.toPrecision(9), toPrecision(n6, 9));
			});
		});
		describe('.valueOf()', () => {
			it('should return value of context', () => {
				const n1 = 1.456;
				const n2 = -5.5234;
				const n3 = 0.2345;
				const n4 = 7.51245;
				const n5 = Infinity;
				const n6 = NaN;
				const wrap1 = new Class(n1);
				const wrap2 = new Class(n2);
				const wrap3 = new Class(n3);
				const wrap4 = new Class(n4);
				const wrap5 = new Class(n5);
				const wrap6 = new Class(n6);
				assert.strictEqual(+wrap1, n1);
				assert.strictEqual(+wrap2, n2);
				assert.strictEqual(+wrap3, n3);
				assert.strictEqual(+wrap4, n4);
				assert.strictEqual(+wrap5, n5);
				assert.strictEqual(isNaN(+wrap6), true);
			});
		});
	});
};