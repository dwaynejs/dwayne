import { strictEqual } from 'assert';
import {
  isArray, isArrayLike, isBoolean, isDate, isDateLike, isElement, isFinite,
  isFunction, isInteger, isIntegerLike, isNaN, isNull, isNullOrUndefined, isNumber,
  isNumberLike, isObject, isPrimitive, isRegExp, isString, isSymbol, isUndefined
} from './../lib/D';

/* eslint no-new-wrappers: 0 */

describe('it should test D.', () => {
  describe('isArray()', () => {
    it('should return false with arguments argument', () => {
      strictEqual((function () {
        return isArray(arguments);
      })(1, 2, 3), false);
    });
    it('should return true with array argument', () => {
      strictEqual(isArray([]), true);
    });
  });
  describe('isArrayLike()', () => {
    it('should return true with arguments argument', () => {
      strictEqual((function () {
        return isArrayLike(arguments);
      })(1, 2, 3), true);
    });
    it('should return true with HTMLCollection argument', () => {
      strictEqual(isArrayLike(document.getElementsByTagName('body')), true);
    });
    it('should return true with a string argument ("")', () => {
      strictEqual(isArrayLike('123'), true);
    });
  });
  describe('isBoolean()', () => {
    it('should return false with no arguments', () => {
      strictEqual(isBoolean(), false);
    });
    it('should return true with boolean argument', () => {
      strictEqual(isBoolean(false), true);
      strictEqual(isBoolean(true), true);
    });
  });
  describe('isDate()', () => {
    it('should return false with date alike argument', () => {
      strictEqual(isDate('1999-12-31T23:59:59.999Z'), false);
      strictEqual(isDate(946684799999), false);
    });
    it('should return true with date argument', () => {
      strictEqual(isDate(new Date()), true);
    });
  });
  describe('isDateLike()', () => {
    it('should return true with date-like arguments', () => {
      strictEqual(isDateLike('1999-12-31T23:59:59.999Z'), true);
      strictEqual(isDateLike(946684799999), true);
      strictEqual(isDateLike(null), true);
    });
  });
  describe('isDateLike()', () => {
    it('should return true with Element arguments', () => {
      strictEqual(isElement(document.createElement('html')), true);
      strictEqual(isElement(document.createElement('div')), true);
    });
  });
  describe('isFinite()', () => {
    it('should return false with non-number argument', () => {
      strictEqual(isFinite('1'), false);
      strictEqual(isFinite({}), false);
      strictEqual(isFinite(null), false);
    });
    it('should return false with NaN, Infinity, -Infinity arguments', () => {
      strictEqual(isFinite(NaN), false);
      strictEqual(isFinite(Infinity), false);
      strictEqual(isFinite(-Infinity), false);
    });
    it('should return true with constructed number argument', () => {
      strictEqual(isFinite(new Number()), true);
    });
    it('should return true with primitive number argument', () => {
      strictEqual(isFinite(0), true);
    });
  });
  describe('isFunction()', () => {
    it('should return true with function argument', () => {
      strictEqual(isFunction(() => {}), true);
    });
  });
  describe('isInteger()', () => {
    it('should return false with string argument', () => {
      strictEqual(isInteger('1'), false);
    });
    it('should return true with integer argument', () => {
      strictEqual(isInteger(1), true);
    });
  });
  describe('isIntegerLike()', () => {
    it('should return true with null argument', () => {
      strictEqual(isIntegerLike(null), true);
    });
    it('should return true with string argument representing integer', () => {
      strictEqual(isIntegerLike('1'), true);
    });
  });
  describe('isNaN()', () => {
    it('should return false with no arguments', () => {
      strictEqual(isNaN(), false);
    });
    it('should return false with a "NaN" string argument', () => {
      strictEqual(isNaN('NaN'), false);
    });
    it('should return true with NaN argument', () => {
      strictEqual(isNaN(NaN), true);
    });
  });
  describe('isNull()', () => {
    it('should return false with no arguments', () => {
      strictEqual(isNull(), false);
    });
    it('should return true with null argument', () => {
      strictEqual(isNull(null), true);
    });
  });
  describe('isNullOrUndefined()', () => {
    it('should return true with no arguments', () => {
      strictEqual(isNullOrUndefined(), true);
    });
    it('should return true with null argument', () => {
      strictEqual(isNullOrUndefined(null), true);
    });
  });
  describe('isNumber()', () => {
    it('should return false with string argument', () => {
      strictEqual(isNumber('1'), false);
    });
    it('should return true with NaN argument', () => {
      strictEqual(isNumber(NaN), true);
    });
    it('should return true with constructed number argument', () => {
      strictEqual(isNumber(new Number()), true);
    });
    it('should return true with primitive number argument', () => {
      strictEqual(isNumber(0), true);
    });
  });
  describe('isNumberLike()', () => {
    it('should return true with null argument', () => {
      strictEqual(isNumberLike(null), true);
    });
    it('should return true with string argument representing number', () => {
      strictEqual(isNumberLike('1'), true);
      strictEqual(isNumberLike('1e4'), true);
      strictEqual(isNumberLike('NaN'), true);
      strictEqual(isNumberLike('-Infinity'), true);
    });
  });
  describe('isObject()', () => {
    it('should return false with primitive arguments', () => {
      strictEqual(isObject(0), false);
      strictEqual(isObject('0'), false);
      strictEqual(isObject(false), false);
    });
    it('should return true with object argument', () => {
      strictEqual(isObject({}), true);
    });
  });
  describe('isPrimitive()', () => {
    it('should return false with non-primitive arguments', () => {
      strictEqual(isPrimitive(new String()), false);
      strictEqual(isPrimitive(new Number()), false);
      strictEqual(isPrimitive(new Boolean()), false);
      strictEqual(isPrimitive({}), false);
    });
    it('should return true with primitive argument', () => {
      strictEqual(isPrimitive(undefined), true);
      strictEqual(isPrimitive(null), true);
      strictEqual(isPrimitive(0), true);
      strictEqual(isPrimitive('0'), true);
      strictEqual(isPrimitive(false), true);

      if (isFunction(global.Symbol)) {
        strictEqual(isPrimitive(Symbol()), true);
      }
    });
  });
  describe('isRegExp()', () => {
    it('should return true with regexp argument', () => {
      strictEqual(isRegExp(/1/), true);
    });
  });
  describe('isString()', () => {
    it('should return true with constructed string argument', () => {
      strictEqual(isString(new String()), true);
    });
    it('should return true with primitive string argument', () => {
      strictEqual(isString(''), true);
    });
  });
  if (isFunction(global.Symbol)) {
    describe('isSymbol()', () => {
      it('should return true with Symbol argument', () => {
        strictEqual(isSymbol(Symbol('1')), true);
      });
    });
  }
  describe('isUndefined()', () => {
    it('should return false with null argument', () => {
      strictEqual(isUndefined(null), false);
    });
    it('should return true with no arguments', () => {
      strictEqual(isUndefined(), true);
    });
  });
});
