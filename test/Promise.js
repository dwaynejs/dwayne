import * as assert from 'assert';
import Promise from '../lib/Promise';

describe('it should test Promise#', () => {
  describe('constructor()', () => {
    it('should return new Promise, that is instantly resolved', (done) => {
      const unique = {};

      new Promise((resolve) => resolve(unique))
        .then((value) => {
          assert.strictEqual(value, unique);

          done();
        })
        .catch(done);
    });
    it('should return new Promise, that is instantly rejected', (done) => {
      const unique = new Error();

      new Promise((resolve, reject) => reject(unique))
        .then(done)
        .catch((err) => {
          assert.strictEqual(err, unique);

          done();
        });
    });
    it('should return new Promise, that is resolved in 50ms', (done) => {
      const unique = {};

      new Promise((resolve) => {
        setTimeout(resolve, 50, unique);
      })
        .then((value) => {
          assert.strictEqual(value, unique);

          done();
        })
        .catch(done);
    });
    it('should return new Promise, that should be resolved before it\'s rejected', (done) => {
      const unique = {};

      new Promise((resolve, reject) => {
        setTimeout(resolve, 99, unique);
        setTimeout(reject, 100, new Error());
      })
        .then((value) => {
          assert.strictEqual(value, unique);

          done();
        })
        .catch(done);
    });
    it('should resolve nested promises', (done) => {
      const unique = {};

      new Promise((resolve) => resolve(Promise.resolve(unique)))
        .then((value) => {
          assert.strictEqual(value, unique);

          done();
        })
        .catch(done);
    });
  });
  describe('catch()', () => {
    it('should return new promise with rejected value', (done) => {
      const unique = new Error();

      Promise.reject(unique)
        .then(done)
        .catch((err) => {
          assert.strictEqual(err, unique);

          done();
        });
    });
    it('should return new promise with rejected value, that was threw in then', (done) => {
      const unique = new Error();

      Promise.resolve()
        .then(() => {
          throw unique;
        })
        .then(done)
        .catch((err) => {
          assert.strictEqual(err, unique);

          done();
        });
    });
  });
  describe('then()', () => {
    it('should return new promise with resolved value', (done) => {
      const unique = new Error();

      Promise.resolve(unique)
        .then((value) => {
          assert.strictEqual(value, unique);

          done();
        })
        .catch(done);
    });
    it('should return new promise with resolved value, that was resolved in catch', (done) => {
      const unique = new Error();

      Promise.reject(unique)
        .then(done)
        .catch((err) => Promise.resolve(err))
        .then((value) => {
          assert.strictEqual(value, unique);

          done();
        })
        .catch(done);
    });
  });
});

describe('it should test Promise.[methods]', () => {
  describe('all()', () => {
    it('should return resolved promise with array of resolved values', (done) => {
      const unique1 = {};
      const unique2 = {};
      const unique3 = {};

      Promise.all([
        Promise.resolve(unique1),
        Promise.resolve(unique2),
        Promise.resolve(unique3)
      ])
        .then(([value1, value2, value3]) => {
          assert.strictEqual(value1, unique1);
          assert.strictEqual(value2, unique2);
          assert.strictEqual(value3, unique3);

          done();
        })
        .catch(done);
    });
    it('should return rejected promise, if one was rejected', (done) => {
      const unique1 = {};
      const unique2 = new Error();
      const unique3 = {};

      Promise.all([
        Promise.resolve(unique1),
        Promise.reject(unique2),
        Promise.resolve(unique3)
      ])
        .then(done)
        .catch((err) => {
          assert.strictEqual(err, unique2);

          done();
        })
        .catch(done);
    });
    it('should support iterators parameters, if Symbol.iterator is supported', (done) => {
      if (Symbol && Symbol.iterator) {
        const unique1 = {};
        const unique2 = {};
        const unique3 = {};
        const promise1 = Promise.resolve(unique1);
        const promise2 = Promise.resolve(unique2);
        const promise3 = Promise.resolve(unique3);
        const hiddenIterable = [promise1, promise2, promise3];
        const iterable = {};

        let iterated = 0;

        iterable[Symbol.iterator] = () => ({
          next() {
            return {
              value: hiddenIterable[iterated++],
              done: iterated > hiddenIterable.length
            };
          }
        });

        Promise.all(iterable)
          .then(([value1, value2, value3]) => {
            assert.strictEqual(value1, unique1);
            assert.strictEqual(value2, unique2);
            assert.strictEqual(value3, unique3);

            done();
          })
          .catch(done);
      }
    });
  });
  describe('race()', () => {
    it('should return resolved promise with first resolved value', (done) => {
      const unique1 = {};
      const unique2 = new Error();
      const unique3 = {};

      Promise.race([
        new Promise((resolve) => setTimeout(resolve, 100, unique1)),
        new Promise((resolve, reject) => setTimeout(reject, 101, unique2)),
        new Promise((resolve) => setTimeout(resolve, 102, unique3))
      ])
        .then((value) => {
          assert.strictEqual(value, unique1);

          done();
        })
        .catch(done);
    });
    it('should return rejected promise with first rejected value', (done) => {
      const unique1 = {};
      const unique2 = new Error();
      const unique3 = {};

      Promise.race([
        new Promise((resolve) => setTimeout(resolve, 101, unique1)),
        new Promise((resolve, reject) => setTimeout(reject, 100, unique2)),
        new Promise((resolve) => setTimeout(resolve, 102, unique3))
      ])
        .then(done)
        .catch((err) => {
          assert.strictEqual(err, unique2);

          done();
        })
        .catch(done);
    });
    it('should support iterators parameters, if Symbol.iterator is supported', (done) => {
      if (Symbol && Symbol.iterator) {
        const unique1 = {};
        const unique2 = new Error();
        const unique3 = {};
        const promise1 = new Promise((resolve) => setTimeout(resolve, 100, unique1));
        const promise2 = new Promise((resolve, reject) => setTimeout(reject, 101, unique2));
        const promise3 = new Promise((resolve) => setTimeout(resolve, 102, unique3));
        const hiddenIterable = [promise1, promise2, promise3];
        const iterable = {};

        let iterated = 0;

        iterable[Symbol.iterator] = () => ({
          next() {
            return {
              value: hiddenIterable[iterated++],
              done: iterated > hiddenIterable.length
            };
          }
        });

        Promise.race(iterable)
          .then((value) => {
            assert.strictEqual(value, unique1);

            done();
          })
          .catch(done);
      }
    });
  });
  describe('resolve()', () => {
    it('should return resolved promise with resolved value', (done) => {
      const unique = {};

      Promise.resolve(unique)
        .then((value) => {
          assert.strictEqual(value, unique);

          done();
        })
        .catch(done);
    });
    it('should return rejected promise with rejected value', (done) => {
      const unique = new Error();

      Promise.resolve(Promise.reject(unique))
        .then(done)
        .catch((err) => {
          assert.strictEqual(err, unique);

          done();
        });
    });
  });
  describe('reject()', () => {
    it('should return rejected promise with rejected value', (done) => {
      const unique = new Error();

      Promise.reject(unique)
        .then(done)
        .catch((err) => {
          assert.strictEqual(err, unique);

          done();
        });
    });
  });
});
