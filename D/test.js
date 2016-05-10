import * as methods from './methods';
const assert = require('assert');

describe('it should test D.[methods]', () => {
  describe('isArray()', () => {
    it('should return false with arguments argument', () => {
      assert.strictEqual(methods.isArray((function () {
        return arguments;
      })()), false);
    });
    it('should return true with array argument', () => {
      assert.strictEqual(methods.isArray([]), true);
    });
  });
  describe('isArrayLike()', () => {
    it('should return true with arguments argument', () => {
      assert.strictEqual((function () {
        return methods.isArrayLike(arguments);
      })(1, 2, 3), true);
    });
    it('should return true with HTMLCollection argument', () => {
      assert.strictEqual(methods.isArrayLike(document.getElementsByTagName('body')), true);
    });
    it('should return true with a string argument ("")', () => {
      assert.strictEqual(methods.isArrayLike('123'), true);
    });
  });
  describe('isBoolean()', () => {
    it('should return false with no arguments', () => {
      assert.strictEqual(methods.isBoolean(), false);
    });
    it('should return true with boolean argument', () => {
      assert.strictEqual(methods.isBoolean(false), true);
      assert.strictEqual(methods.isBoolean(true), true);
    });
  });
  describe('isDate()', () => {
    it('should return false with date alike argument', () => {
      assert.strictEqual(methods.isDate('1999-12-31T23:59:59.999Z'), false);
      assert.strictEqual(methods.isDate(946684799999), false);
    });
    it('should return true with date argument', () => {
      assert.strictEqual(methods.isDate(new Date()), true);
    });
  });
  describe('isDateLike()', () => {
    it('should return true with date-like arguments', () => {
      assert.strictEqual(methods.isDateLike('1999-12-31T23:59:59.999Z'), true);
      assert.strictEqual(methods.isDateLike(946684799999), true);
      assert.strictEqual(methods.isDateLike(null), true);
    });
  });
  describe('isFinite()', () => {
    it('should return false with non-number argument', () => {
      assert.strictEqual(methods.isFinite('1'), false);
      assert.strictEqual(methods.isFinite({}), false);
      assert.strictEqual(methods.isFinite(null), false);
    });
    it('should return false with NaN, Infinity, -Infinity arguments', () => {
      assert.strictEqual(methods.isFinite(NaN), false);
      assert.strictEqual(methods.isFinite(Infinity), false);
      assert.strictEqual(methods.isFinite(-Infinity), false);
    });
    it('should return true with constructed number argument', () => {
      assert.strictEqual(methods.isFinite(new Number()), true);
    });
    it('should return true with primitive number argument', () => {
      assert.strictEqual(methods.isFinite(0), true);
    });
  });
  describe('isFunction()', () => {
    it('should return true with function argument', () => {
      assert.strictEqual(methods.isFunction(() => {}), true);
    });
  });
  describe('isInteger()', () => {
    it('should return false with string argument', () => {
      assert.strictEqual(methods.isInteger('1'), false);
    });
    it('should return true with integer argument', () => {
      assert.strictEqual(methods.isInteger(1), true);
    });
  });
  describe('isIntegerLike()', () => {
    it('should return true with null argument', () => {
      assert.strictEqual(methods.isIntegerLike(null), true);
    });
    it('should return true with string argument representing integer', () => {
      assert.strictEqual(methods.isIntegerLike('1'), true);
    });
  });
  describe('isNaN()', () => {
    it('should return false with no arguments', () => {
      assert.strictEqual(methods.isNaN(), false);
    });
    it('should return false with a "NaN" string argument', () => {
      assert.strictEqual(methods.isNaN('NaN'), false);
    });
    it('should return true with NaN argument', () => {
      assert.strictEqual(methods.isNaN(NaN), true);
    });
  });
  describe('isNull()', () => {
    it('should return false with no arguments', () => {
      assert.strictEqual(methods.isNull(), false);
    });
    it('should return true with null argument', () => {
      assert.strictEqual(methods.isNull(null), true);
    });
  });
  describe('isNullOrUndefined()', () => {
    it('should return true with no arguments', () => {
      assert.strictEqual(methods.isNullOrUndefined(), true);
    });
    it('should return true with null argument', () => {
      assert.strictEqual(methods.isNullOrUndefined(null), true);
    });
  });
  describe('isNumber()', () => {
    it('should return false with string argument', () => {
      assert.strictEqual(methods.isNumber('1'), false);
    });
    it('should return true with NaN argument', () => {
      assert.strictEqual(methods.isNumber(NaN), true);
    });
    it('should return true with constructed number argument', () => {
      assert.strictEqual(methods.isNumber(new Number()), true);
    });
    it('should return true with primitive number argument', () => {
      assert.strictEqual(methods.isNumber(0), true);
    });
  });
  describe('isNumberLike()', () => {
    it('should return true with null argument', () => {
      assert.strictEqual(methods.isNumberLike(null), true);
    });
    it('should return true with string argument representing number', () => {
      assert.strictEqual(methods.isNumberLike('1'), true);
      assert.strictEqual(methods.isNumberLike('1e4'), true);
      assert.strictEqual(methods.isNumberLike('NaN'), true);
      assert.strictEqual(methods.isNumberLike('-Infinity'), true);
    });
  });
  describe('isObject()', () => {
    it('should return false with primitive arguments', () => {
      assert.strictEqual(methods.isObject(0), false);
      assert.strictEqual(methods.isObject('0'), false);
      assert.strictEqual(methods.isObject(false), false);
    });
    it('should return true with object argument', () => {
      assert.strictEqual(methods.isObject({}), true);
    });
  });
  describe('isRegExp()', () => {
    it('should return true with regexp argument', () => {
      assert.strictEqual(methods.isRegExp(/1/), true);
    });
  });
  describe('isString()', () => {
    it('should return true with constructed string argument', () => {
      assert.strictEqual(methods.isString(new String()), true);
    });
    it('should return true with primitive string argument', () => {
      assert.strictEqual(methods.isString(''), true);
    });
  });
  describe('isUndefined()', () => {
    it('should return false with null argument', () => {
      assert.strictEqual(methods.isUndefined(null), false);
    });
    it('should return true with no arguments', () => {
      assert.strictEqual(methods.isUndefined(), true);
    });
  });
});
