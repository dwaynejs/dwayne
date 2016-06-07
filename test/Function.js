import * as assert from 'assert';
import Function, { noop, self, callsMethod } from '../lib/Function';
import Arr from '../lib/Array';
import Num, { rand, random } from '../lib/Number';

function concat() {
  return this + new Arr(arguments).string();
}

function concatWithContext() {
  return this.a + new Arr(arguments).string();
}

describe('it should test Function::[[Call]]', () => {
  describe('it should test middlewares', () => {
    it('should test synchronous middlewares', () => {
      const func = concat;
      const wrap = new Function(func);

      wrap
        .before((args) =>  new Arr(args).map((x) => 2*x).$)
        .after((ret) => 'D is awesome! ' + ret);

      assert.strictEqual(wrap.call('concat: ', 1, 2, 3), 'D is awesome! concat: 246');
    });
    it('should test asynchronous middlewares', (done) => {
      const func = function () {
        return new Num(50).timeout(concat.apply(this, arguments));
      };
      const wrap = new Function(func);

      wrap
        .async()
        .before((args) => new Num(50).timeout(new Arr(args).map((x) => 2*x).$))
        .after((ret) => new Num(50).timeout('D is awesome! ' + ret))
        .call('concat: ', 1, 2, 3)
        .then((ret) => {
          assert.strictEqual(ret, 'D is awesome! concat: 246');

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
      const wrap = new Function(func);

      wrap.canBeCalled(toCall);

      try {
        for (let i = 0; i <= toCall; i++) {
          wrap();
        }

        assert.strictEqual(wrap.called, toCall + 1);

        done();
      } catch (err) {
        done(err);
      }
    });
  });
});

describe('it should test Function#', () => {
  describe('after()', () => {
    it('should add middleware into the end of after array with no or truthy argument', () => {
      const func = () => {};
      const wrap = new Function(func);
      const after1 = () => {};
      const after2 = () => {};

      wrap.after(after1);
      wrap.after(after2);

      assert.deepEqual(wrap.$$.after, [after1, after2]);
    });
    it('should add middleware into the start of after array with falsey argument', () => {
      const func = () => {};
      const wrap = new Function(func);
      const after1 = () => {};
      const after2 = () => {};

      wrap.after(after1, false);
      wrap.after(after2, false);

      assert.deepEqual(wrap.$$.after, [after2, after1]);
    });
  });
  describe('apply()', () => {
    it('should work the same as Function.prototype.apply', () => {
      const func = concat;
      const wrap = new Function(func);

      assert.strictEqual(wrap.apply('concat: ', [1, 2, 3, 4, 5]), 'concat: 12345');
    });
  });
  describe('async()', () => {
    it('should became async with no or truthy argument', () => {
      const func = () => {};
      const wrap = new Function(func);

      wrap.async();

      assert.strictEqual(wrap.$$.sync, false);
    });
  });
  describe('before()', () => {
    it('should add middleware into the start of before array with no or truthy argument', () => {
      const func = () => {};
      const wrap = new Function(func);
      const before1 = () => {};
      const before2 = () => {};

      wrap.before(before1);
      wrap.before(before2);

      assert.deepEqual(wrap.$$.before, [before2, before1]);
    });
    it('should add middleware into the end of before array with falsey argument', () => {
      const func = () => {};
      const wrap = new Function(func);
      const before1 = () => {};
      const before2 = () => {};

      wrap.before(before1, false);
      wrap.before(before2, false);

      assert.deepEqual(wrap.$$.before, [before1, before2]);
    });
  });
  describe('bind()', () => {
    it('should bind context and arguments', () => {
      const func = concat;
      const wrap = new Function(func);

      wrap.bind('concat: ', [1, 2, 3]);

      assert.strictEqual(wrap(4, 5), 'concat: 12345');
    });
  });
  describe('bindArgs()', () => {
    it('should bind arguments', () => {
      const func = concat;
      const wrap = new Function(func);

      wrap.bindArgs([1, 2]);
      wrap.bindArgs([3]);

      assert.strictEqual(wrap.call('concat: ', 4, 5), 'concat: 12345');
    });
  });
  describe('bindContext()', () => {
    it('should bind context', () => {
      const func = concat;
      const wrap = new Function(func);

      wrap.bindContext('concat: ');

      assert.strictEqual(wrap(1, 2, 3, 4, 5), 'concat: 12345');
    });
  });
  describe('call()', () => {
    it('should work the same as Function.prototype.call', () => {
      const func = concat;
      const wrap = new Function(func);

      assert.strictEqual(wrap.call('concat: ', 1, 2, 3, 4, 5), 'concat: 12345');
    });
  });
  describe('get called', () => {
    it('should return number of calls', () => {
      const func = () => {};
      const wrap = new Function(func);
      const toCall = random(0, 100);

      for (let i = 0; i < toCall; i++) {
        wrap();
      }

      assert.strictEqual(wrap.called, toCall);
    });
  });
  describe('canBeCalled()', () => {
    it('should not call function after n calls', () => {
      const toCall = random(10, 50);
      const func = () => {};
      const wrap = new Function(func);

      wrap.canBeCalled(toCall);

      assert.strictEqual(wrap.$$.canBeCalled, toCall);
    });
  });
  describe('limitArgsTo()', () => {
    it('should limit arguments to n before calling function', () => {
      const func = concat;
      const wrap = new Function(func);

      wrap.limitArgsTo(3);

      assert.strictEqual(wrap.call('concat: ', 1, 2, 3, 4, 5), 'concat: 123');
    });
  });
  describe('lock()', () => {
    it('should lock context and arguments', () => {
      const func = concat;
      const wrap = new Function(func);

      wrap.lock('concat: ', [1, 2]);

      assert.strictEqual(wrap.call('no', 3, 4, 5), 'concat: 12345');

      wrap.unbind();

      assert.strictEqual(wrap.call('no', 3, 4, 5), 'concat: 12345');
    });
  });
  describe('lockArgs()', () => {
    it('should lock arguments', () => {
      const func = concat;
      const wrap = new Function(func);

      wrap.lockArgs([1, 2]);

      assert.strictEqual(wrap.call('concat: ', 3, 4, 5), 'concat: 12345');

      wrap.bindArgs([3, 4]);

      assert.strictEqual(wrap.call('concat: ', 5), 'concat: 12345');

      wrap.unbindArgs();

      assert.strictEqual(wrap.call('concat: ', 3, 4, 5), 'concat: 12345');

      wrap.lockArgs([3]);

      assert.strictEqual(wrap.call('concat: ', 4, 5), 'concat: 12345');
    });
  });
  describe('lockContext()', () => {
    it('should lock context', () => {
      const func = concat;
      const wrap = new Function(func);

      wrap.lockContext('concat: ');

      assert.strictEqual(wrap.call('no', 1, 2, 3), 'concat: 123');

      wrap.bindContext('no');

      assert.strictEqual(wrap(1, 2, 3), 'concat: 123');

      wrap.unbindContext();

      assert.strictEqual(wrap(1, 2, 3), 'concat: 123');
    });
  });
  describe('timing()', () => {
    it('should add timing middlewares into the start of after array and to the end of before array', () => {
      const func = () => {};
      const wrap = new Function(func);
      const before = () => {};
      const after = () => {};

      wrap.before(before);
      wrap.after(after);
      wrap.timing('mark');

      assert.strictEqual(wrap.$$.before[0], before);
      assert.strictEqual(wrap.$$.after.length, 2);
      assert.strictEqual(wrap.$$.after[1], after);
      assert.strictEqual(wrap.$$.after.length, 2);
    });
  });
  describe('unbind()', () => {
    it('should unbind context and arguments', () => {
      const func = concatWithContext;
      const wrap = new Function(func);

      wrap.bind({ a: 'concat: ' }, [1, 2, 3]);
      wrap.unbind();
      wrap.bindContext({ a: 'no: ' });

      assert.strictEqual(wrap(1, 2, 3), 'no: 123');
    });
  });
  describe('unbindArgs()', () => {
    it('should unbind arguments', () => {
      const func = concat;
      const wrap = new Function(func);

      wrap.bindArgs([1, 2, 3]);
      wrap.unbindArgs();

      assert.strictEqual(wrap.call('concat: ', 1, 2, 3), 'concat: 123');
    });
  });
  describe('unbindContext()', () => {
    it('should unbind context', () => {
      const func = concatWithContext;
      const wrap = new Function(func);

      wrap.bindContext({ a: 'concat: ' });
      wrap.unbindContext();
      wrap.bindContext({ a: 'no: ' });

      assert.strictEqual(wrap(1, 2, 3), 'no: 123');
    });
  });
});

describe('it should test exported methods from Function', () => {
  describe('noop()', () => {
    it('should be the function always returning undefined', () => {
      assert.strictEqual(noop(1, 2, 3), undefined);
      assert.strictEqual(noop([]), undefined);
      assert.strictEqual(noop(''), undefined);
      assert.strictEqual(noop(), undefined);
    });
  });
  describe('self()', () => {
    it('should be the function always returning first argument', () => {
      const unique = {};

      assert.strictEqual(self(1, 2, 3), 1);
      assert.strictEqual(self(unique), unique);
      assert.strictEqual(self(), undefined);
    });
  });
  describe('callsMethod()', () => {
    it('should be the function returning <ctx>[method](args), where ctx is the first argument', () => {
      const rnd = rand();
      const unique = {
        foo() { return this.x + new Arr(arguments).sum(); },
        x: rnd
      };

      assert.strictEqual(callsMethod('foo')(unique), rnd);
      assert.strictEqual(callsMethod('foo', [1, 2, 3])(unique), 6 + rnd);
    });
  });
});
