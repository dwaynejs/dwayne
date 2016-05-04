import Class from './module';
const assert = require('assert');
const random = Math.random;

describe('it should test D.Fetch.prototype.[methods]', () => {
  describe('after()', () => {
    it('should insert "after" middleware', () => {
      const fetch = new Class();
      const middleware1 = () => {};
      const middleware2 = () => {};
      const middleware3 = () => {};

      fetch.after(middleware1);

      assert.deepEqual(fetch.$.after, [
        { onResolve: middleware1, onReject: undefined }
      ]);

      fetch.after(middleware2, middleware3);

      assert.deepEqual(fetch.$.after, [
        { onResolve: middleware1, onReject: undefined },
        { onResolve: middleware2, onReject: middleware3 }
      ]);
    });
  });
  describe('before()', () => {
    it('should insert "before" middleware', () => {
      const fetch = new Class();
      const middleware1 = () => {};
      const middleware2 = () => {};
      const middleware3 = () => {};

      fetch.before(middleware1);

      assert.deepEqual(fetch.$.before, [
        { onResolve: middleware1, onReject: undefined }
      ]);

      fetch.before(middleware2, middleware3);

      assert.deepEqual(fetch.$.before, [
        { onResolve: middleware1, onReject: undefined },
        { onResolve: middleware2, onReject: middleware3 }
      ]);
    });
  });
  describe('config()', () => {
    it('should support object argument', () => {
      const fetch = new Class();
      const rand = random();

      fetch.config({ timeout: rand });

      assert.strictEqual(fetch.$.timeout, rand);
    });
    it('should support function argument', () => {
      const fetch = new Class();
      const rand = random();

      fetch.config((config) => {
        if (config.timeout === 0) {
          config.timeout = rand;
        }
      });

      assert.strictEqual(fetch.$.timeout, rand);
    });
  });
  describe('delete()', () => {
    it('should support call without arguments', () => {
      const fetch = new Class();

      fetch.request = (url, config) => {
        assert.strictEqual(url, undefined);
        assert.deepEqual(config, { method: 'delete' });
      };

      fetch.delete();
    });
    it('should support call with only url', () => {
      const fetch = new Class();
      const URL = '/foo';

      fetch.request = (url, config) => {
        assert.strictEqual(url, URL);
        assert.deepEqual(config, { method: 'delete' });
      };

      fetch.delete(URL);
    });
    it('should support call with only config', () => {
      const fetch = new Class();
      const rand = random();

      fetch.request = (url, config) => {
        assert.strictEqual(url, undefined);
        assert.deepEqual(config, { method: 'delete', timeout: rand });
      };

      fetch.delete({ timeout: rand });
    });
    it('should support call with both url and config', () => {
      const fetch = new Class();
      const URL = '/foo';
      const rand = random();

      fetch.request = (url, config) => {
        assert.strictEqual(url, URL);
        assert.deepEqual(config, { method: 'delete', timeout: rand });
      };

      fetch.delete(URL, { timeout: rand });
    });
  });
  describe('get()', () => {
    it('should support call without arguments', () => {
      const fetch = new Class();

      fetch.request = (url, config) => {
        assert.strictEqual(url, undefined);
        assert.deepEqual(config, { method: 'get' });
      };

      fetch.get();
    });
    it('should support call with only url', () => {
      const fetch = new Class();
      const URL = '/foo';

      fetch.request = (url, config) => {
        assert.strictEqual(url, URL);
        assert.deepEqual(config, { method: 'get' });
      };

      fetch.get(URL);
    });
    it('should support call with only config', () => {
      const fetch = new Class();
      const rand = random();

      fetch.request = (url, config) => {
        assert.strictEqual(url, undefined);
        assert.deepEqual(config, { method: 'get', timeout: rand });
      };

      fetch.get({ timeout: rand });
    });
    it('should support call with both url and config', () => {
      const fetch = new Class();
      const URL = '/foo';
      const rand = random();

      fetch.request = (url, config) => {
        assert.strictEqual(url, URL);
        assert.deepEqual(config, { method: 'get', timeout: rand });
      };

      fetch.get(URL, { timeout: rand });
    });
  });
  describe('head()', () => {
    it('should support call without arguments', () => {
      const fetch = new Class();

      fetch.request = (url, config) => {
        assert.strictEqual(url, undefined);
        assert.deepEqual(config, { method: 'head' });
      };

      fetch.head();
    });
    it('should support call with only url', () => {
      const fetch = new Class();
      const URL = '/foo';

      fetch.request = (url, config) => {
        assert.strictEqual(url, URL);
        assert.deepEqual(config, { method: 'head' });
      };

      fetch.head(URL);
    });
    it('should support call with only config', () => {
      const fetch = new Class();
      const rand = random();

      fetch.request = (url, config) => {
        assert.strictEqual(url, undefined);
        assert.deepEqual(config, { method: 'head', timeout: rand });
      };

      fetch.head({ timeout: rand });
    });
    it('should support call with both url and config', () => {
      const fetch = new Class();
      const URL = '/foo';
      const rand = random();

      fetch.request = (url, config) => {
        assert.strictEqual(url, URL);
        assert.deepEqual(config, { method: 'head', timeout: rand });
      };

      fetch.head(URL, { timeout: rand });
    });
  });
  // TODO: .headers()
  // TODO: .instance()
  // TODO: .patch()
  // TODO: .post()
  // TODO: .put()
  // TODO: .request()
});
