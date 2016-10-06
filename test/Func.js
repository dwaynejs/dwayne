import { deepStrictEqual, strictEqual } from 'assert';
import Func, { noop, self, method, prop } from '../lib/Func';
import Arr from '../lib/Arr';
import Num, { rand, random } from '../lib/Num';

function concat() {
  return this + new Arr(arguments).string();
}

function concatWithContext() {
  return this.a + new Arr(arguments).string();
}

describe('it should test Func::[[Call]]', () => {
  describe('it should test middlewares', () => {
    it('should test synchronous middlewares', () => {
      const func = concat;
      const wrap = new Func(func);

      wrap
        .before((args) => new Arr(args).map((x) => 2 * x).$)
        .after((ret) => `D is awesome! ${ ret }`);

      strictEqual(wrap.call('concat: ', 1, 2, 3), 'D is awesome! concat: 246');
    });
    it('should test asynchronous middlewares', (done) => {
      const func = function () {
        return new Num(50).timeout(concat.apply(this, arguments));
      };
      const wrap = new Func(func);

      wrap
        .async()
        .before((args) => new Num(50).timeout(new Arr(args).map((x) => 2 * x).$))
        .after((ret) => new Num(50).timeout(`D is awesome! ${ ret }`))
        .call('concat: ', 1, 2, 3)
        .then((ret) => {
          strictEqual(ret, 'D is awesome! concat: 246');

          done();
        })
        .catch(done);
    });
  });
  describe('it should test maximum calls count', () => {
    it('should not call function after n calls', (done) => {
      let called = 0;

      const toCall = random(10, 50);
      const func = () => {
        if (++called > toCall) {
          done(new Error(`Called more than ${ toCall } times`));
        }
      };
      const wrap = new Func(func);

      wrap.canBeCalled(toCall);

      try {
        for (let i = 0; i <= toCall; i++) {
          wrap();
        }

        strictEqual(wrap.called, toCall + 1);

        done();
      } catch (err) {
        done(err);
      }
    });
  });
});

describe('it should test Func#', () => {
  describe('after()', () => {
    it('should add middleware into the end of after array with no or truthy argument', () => {
      const func = () => {};
      const wrap = new Func(func);
      const after1 = () => {};
      const after2 = () => {};

      wrap.after(after1);
      wrap.after(after2);

      deepStrictEqual(wrap.$$.after, [after1, after2]);
    });
    it('should add middleware into the start of after array with falsey argument', () => {
      const func = () => {};
      const wrap = new Func(func);
      const after1 = () => {};
      const after2 = () => {};

      wrap.after(after1, false);
      wrap.after(after2, false);

      deepStrictEqual(wrap.$$.after, [after2, after1]);
    });
  });
  describe('apply()', () => {
    it('should work the same as Function.prototype.apply', () => {
      const func = concat;
      const wrap = new Func(func);

      strictEqual(wrap.apply('concat: ', [1, 2, 3, 4, 5]), 'concat: 12345');
    });
  });
  describe('async()', () => {
    it('should became async with no or truthy argument', () => {
      const func = () => {};
      const wrap = new Func(func);

      wrap.async();

      strictEqual(wrap.$$.sync, false);
    });
  });
  describe('before()', () => {
    it('should add middleware into the start of before array with no or truthy argument', () => {
      const func = () => {};
      const wrap = new Func(func);
      const before1 = () => {};
      const before2 = () => {};

      wrap.before(before1);
      wrap.before(before2);

      deepStrictEqual(wrap.$$.before, [before2, before1]);
    });
    it('should add middleware into the end of before array with falsey argument', () => {
      const func = () => {};
      const wrap = new Func(func);
      const before1 = () => {};
      const before2 = () => {};

      wrap.before(before1, false);
      wrap.before(before2, false);

      deepStrictEqual(wrap.$$.before, [before1, before2]);
    });
  });
  describe('bind()', () => {
    it('should bind context and arguments', () => {
      const func = concat;
      const wrap = new Func(func);

      wrap.bind('concat: ', 1, 2, 3);

      strictEqual(wrap(4, 5), 'concat: 12345');
    });
  });
  describe('bindArgs()', () => {
    it('should bind arguments', () => {
      const func = concat;
      const wrap = new Func(func);

      wrap.bindArgs([1, 2]);
      wrap.bindArgs([3]);

      strictEqual(wrap.call('concat: ', 4, 5), 'concat: 12345');
    });
  });
  describe('bindContext()', () => {
    it('should bind context', () => {
      const func = concat;
      const wrap = new Func(func);

      wrap.bindContext('concat: ');

      strictEqual(wrap(1, 2, 3, 4, 5), 'concat: 12345');
    });
  });
  describe('call()', () => {
    it('should work the same as Function.prototype.call', () => {
      const func = concat;
      const wrap = new Func(func);

      strictEqual(wrap.call('concat: ', 1, 2, 3, 4, 5), 'concat: 12345');
    });
  });
  describe('get called', () => {
    it('should return number of calls', () => {
      const func = () => {};
      const wrap = new Func(func);
      const toCall = random(0, 100);

      for (let i = 0; i < toCall; i++) {
        wrap();
      }

      strictEqual(wrap.called, toCall);
    });
  });
  describe('canBeCalled()', () => {
    it('should not call function after n calls', () => {
      const toCall = random(10, 50);
      const func = () => {};
      const wrap = new Func(func);

      wrap.canBeCalled(toCall);

      strictEqual(wrap.$$.canBeCalled, toCall);
    });
  });
  describe('limitArgsTo()', () => {
    it('should limit arguments to n before calling function', () => {
      const func = concat;
      const wrap = new Func(func);

      wrap.limitArgsTo(3);

      strictEqual(wrap.call('concat: ', 1, 2, 3, 4, 5), 'concat: 123');
    });
  });
  describe('lock()', () => {
    it('should lock context and arguments', () => {
      const func = concat;
      const wrap = new Func(func);

      wrap.lock('concat: ', [1, 2]);

      strictEqual(wrap.call('no', 3, 4, 5), 'concat: 12345');

      wrap.unbind();

      strictEqual(wrap.call('no', 3, 4, 5), 'concat: 12345');
    });
  });
  describe('lockArgs()', () => {
    it('should lock arguments', () => {
      const func = concat;
      const wrap = new Func(func);

      wrap.lockArgs([1, 2]);

      strictEqual(wrap.call('concat: ', 3, 4, 5), 'concat: 12345');

      wrap.bindArgs([3, 4]);

      strictEqual(wrap.call('concat: ', 5), 'concat: 12345');

      wrap.unbindArgs();

      strictEqual(wrap.call('concat: ', 3, 4, 5), 'concat: 12345');

      wrap.lockArgs([3]);

      strictEqual(wrap.call('concat: ', 4, 5), 'concat: 12345');
    });
  });
  describe('lockContext()', () => {
    it('should lock context', () => {
      const func = concat;
      const wrap = new Func(func);

      wrap.lockContext('concat: ');

      strictEqual(wrap.call('no', 1, 2, 3), 'concat: 123');

      wrap.bindContext('no');

      strictEqual(wrap(1, 2, 3), 'concat: 123');

      wrap.unbindContext();

      strictEqual(wrap(1, 2, 3), 'concat: 123');
    });
  });
  describe('timing()', () => {
    it('should add timing middlewares into the start of after array and to the end of before array', () => {
      const func = () => {};
      const wrap = new Func(func);
      const before = () => {};
      const after = () => {};

      wrap
        .before(before)
        .after(after)
        .timing('mark');

      strictEqual(wrap.$$.before[0], before);
      strictEqual(wrap.$$.after.length, 2);
      strictEqual(wrap.$$.after[1], after);
      strictEqual(wrap.$$.after.length, 2);
    });
  });
  describe('unbind()', () => {
    it('should unbind context and arguments', () => {
      const func = concatWithContext;
      const wrap = new Func(func);

      wrap
        .bind({ a: 'concat: ' }, 1, 2, 3)
        .unbind()
        .bindContext({ a: 'no: ' });

      strictEqual(wrap(1, 2, 3), 'no: 123');
    });
  });
  describe('unbindArgs()', () => {
    it('should unbind arguments', () => {
      const func = concat;
      const wrap = new Func(func);

      wrap
        .bindArgs([1, 2, 3])
        .unbindArgs();

      strictEqual(wrap.call('concat: ', 1, 2, 3), 'concat: 123');
    });
  });
  describe('unbindContext()', () => {
    it('should unbind context', () => {
      const func = concatWithContext;
      const wrap = new Func(func);

      wrap
        .bindContext({ a: 'concat: ' })
        .unbindContext()
        .bindContext({ a: 'no: ' });

      strictEqual(wrap(1, 2, 3), 'no: 123');
    });
  });
});

describe('it should test exported methods from Function', () => {
  describe('method()', () => {
    it('should be the function returning <ctx>[method](...args), where ctx is the first argument', () => {
      const rnd = rand();
      const unique = {
        foo() {
          return this.x + new Arr(arguments).sum();
        },
        x: rnd
      };

      strictEqual(method('foo')(unique), rnd);
      strictEqual(method('foo', [1, 2, 3])(unique), 6 + rnd);
    });
  });
  describe('noop()', () => {
    it('should be the function always returning undefined', () => {
      strictEqual(noop(1, 2, 3), undefined);
      strictEqual(noop([]), undefined);
      strictEqual(noop(''), undefined);
      strictEqual(noop(), undefined);
    });
  });
  describe('prop()', () => {
    it('should be the function returning function returning property of its first argument', () => {
      const rnd = rand();
      const unique = {
        x: rnd
      };

      strictEqual(prop('x')(unique), rnd);
    });
  });
  describe('self()', () => {
    it('should be the function always returning first argument', () => {
      const unique = {};

      strictEqual(self(1, 2, 3), 1);
      strictEqual(self(unique), unique);
      strictEqual(self(), undefined);
    });
  });
});
