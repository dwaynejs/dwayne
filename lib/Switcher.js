import { isArray, isFunction, isObject, isUndefined, iterate, supportSymbol } from './helpers';

export class Switcher {
  constructor(cases = {}, mode = 'strictEquals', def) {
    if (arguments.length && !isObject(cases)) {
      if (arguments.length !== 1) {
        def = mode;
      }

      mode = cases;
      cases = {};
    }

    const eventualCases = [];

    iterate(cases, (value, Case) => {
      eventualCases.push({ case: Case, value });
    });

    function switcher(value) {
      const { mode, default: def, cases } = switcher.$;

      const ret = iterate(cases, ({ value: val, case: Case }) => {
        if (
          (mode === 'boolean' && Case) ||
          (mode === 'equals' && Case == value) ||
          (mode === 'strictEquals' && Case === value) ||
          (mode === 'call' && Case(value))
        ) {
          return { return: val };
        }
      });

      return !isUndefined(ret) ? (isFunction(ret.return) ? ret.return(value) : ret.return) : def;
    }

    Object.defineProperty(switcher, '$', {
      value: {
        cases: eventualCases,
        mode,
        default: def
      }
    });
    Object.setPrototypeOf(switcher, Switcher.prototype);

    return switcher;
  }

  case(cases, value) {
    if (!isArray(cases)) {
      cases = [cases];
    }

    iterate(cases, (Case) => {
      this.$.cases.push({ case: Case, value });
    });

    return this;
  }
  default(def) {
    this.$.default = def;

    return this;
  }
  mode(mode) {
    this.$.mode = mode;

    return this;
  }
  toString() {
    return Function.prototype.toString.call(this);
  }
}

if (supportSymbol) {
  Switcher.prototype[Symbol.toStringTag] = 'Switcher';
}

export function switcher(...args) {
  return new Switcher(...args);
}

export default Switcher;
