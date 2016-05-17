import * as assert from 'assert';
import Fetch from '../lib/Fetch';

const random = Math.random;

describe('it should test Fetch::[methods]', () => {
  describe('after()', () => {
    it('should insert "after" middleware', () => {
      const fetch = new Fetch();
      const middleware1 = () => {};
      const middleware2 = () => {};

      fetch.after(middleware1);

      assert.deepEqual(fetch.$.after, [middleware1]);

      fetch.after(middleware2);

      assert.deepEqual(fetch.$.after, [middleware1, middleware2]);
    });
  });
  describe('before()', () => {
    it('should insert "before" middleware', () => {
      const fetch = new Fetch();
      const middleware1 = () => {};
      const middleware2 = () => {};

      fetch.before(middleware1);

      assert.deepEqual(fetch.$.before, [middleware1]);

      fetch.before(middleware2);

      assert.deepEqual(fetch.$.before, [middleware1, middleware2]);
    });
  });
  describe('config()', () => {
    it('should support object argument', () => {
      const fetch = new Fetch();
      const rand = random();

      fetch.config({ timeout: rand });

      assert.strictEqual(fetch.$.timeout, rand);
    });
    it('should support function argument', () => {
      const fetch = new Fetch();
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
      const fetch = new Fetch();

      fetch.request = (url, config) => {
        assert.strictEqual(url, undefined);
        assert.deepEqual(config, { method: 'delete' });
      };

      fetch.delete();
    });
    it('should support call with only url', () => {
      const fetch = new Fetch();
      const URL = '/foo';

      fetch.request = (url, config) => {
        assert.strictEqual(url, URL);
        assert.deepEqual(config, { method: 'delete' });
      };

      fetch.delete(URL);
    });
    it('should support call with only config', () => {
      const fetch = new Fetch();
      const rand = random();

      fetch.request = (url, config) => {
        assert.strictEqual(url, undefined);
        assert.deepEqual(config, { method: 'delete', timeout: rand });
      };

      fetch.delete({ timeout: rand });
    });
    it('should support call with both url and config', () => {
      const fetch = new Fetch();
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
      const fetch = new Fetch();

      fetch.request = (url, config) => {
        assert.strictEqual(url, undefined);
        assert.deepEqual(config, { method: 'get' });
      };

      fetch.get();
    });
    it('should support call with only url', () => {
      const fetch = new Fetch();
      const URL = '/foo';

      fetch.request = (url, config) => {
        assert.strictEqual(url, URL);
        assert.deepEqual(config, { method: 'get' });
      };

      fetch.get(URL);
    });
    it('should support call with only config', () => {
      const fetch = new Fetch();
      const rand = random();

      fetch.request = (url, config) => {
        assert.strictEqual(url, undefined);
        assert.deepEqual(config, { method: 'get', timeout: rand });
      };

      fetch.get({ timeout: rand });
    });
    it('should support call with both url and config', () => {
      const fetch = new Fetch();
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
      const fetch = new Fetch();

      fetch.request = (url, config) => {
        assert.strictEqual(url, undefined);
        assert.deepEqual(config, { method: 'head' });
      };

      fetch.head();
    });
    it('should support call with only url', () => {
      const fetch = new Fetch();
      const URL = '/foo';

      fetch.request = (url, config) => {
        assert.strictEqual(url, URL);
        assert.deepEqual(config, { method: 'head' });
      };

      fetch.head(URL);
    });
    it('should support call with only config', () => {
      const fetch = new Fetch();
      const rand = random();

      fetch.request = (url, config) => {
        assert.strictEqual(url, undefined);
        assert.deepEqual(config, { method: 'head', timeout: rand });
      };

      fetch.head({ timeout: rand });
    });
    it('should support call with both url and config', () => {
      const fetch = new Fetch();
      const URL = '/foo';
      const rand = random();

      fetch.request = (url, config) => {
        assert.strictEqual(url, URL);
        assert.deepEqual(config, { method: 'head', timeout: rand });
      };

      fetch.head(URL, { timeout: rand });
    });
  });
  describe('headers()', () => {
    it('should support (header, value: String) syntax', () => {
      const fetch = new Fetch();

      fetch.headers('foo', 'bar');

      assert.deepEqual(fetch.$.headers, { foo: ['bar'] });
    });
    it('should support (header, value: Array) syntax', () => {
      const fetch = new Fetch();

      fetch.headers('foo', ['bar', 'baz']);

      assert.deepEqual(fetch.$.headers, { foo: ['bar', 'baz'] });
    });
    it('should support { header: value: String, ... } syntax', () => {
      const fetch = new Fetch();

      fetch.headers({ foo: 'bar' });

      assert.deepEqual(fetch.$.headers, { foo: ['bar'] });
    });
    it('should support { header: value: Array, ... } syntax', () => {
      const fetch = new Fetch();

      fetch.headers({ foo: ['bar', 'baz'] });

      assert.deepEqual(fetch.$.headers, { foo: ['bar', 'baz'] });
    });
    it('should add header to array if it was one', () => {
      const fetch = new Fetch();

      fetch.headers('foo', 'bar1');
      fetch.headers('foo', 'baz1');

      assert.deepEqual(fetch.$.headers, { foo: ['bar1', 'baz1'] });

      fetch.headers('foo', ['bar2']);

      assert.deepEqual(fetch.$.headers, { foo: ['bar1', 'baz1', 'bar2'] });

      fetch.headers({ foo: 'baz2' });

      assert.deepEqual(fetch.$.headers, { foo: ['bar1', 'baz1', 'bar2', 'baz2'] });

      fetch.headers({ foo: ['bar3', 'baz3'] });

      assert.deepEqual(fetch.$.headers, { foo: ['bar1', 'baz1', 'bar2', 'baz2', 'bar3', 'baz3'] });
    });
  });
  describe('instance()', () => {
    it('should create new instance without config without arguments', () => {
      const fetch = new Fetch({ headers: { foo: 'bar' } });
      const instance = fetch.instance();
      const old = fetch.config();

      instance.config((config) => {
        assert.notEqual(old.auth, config.auth);
        assert.notEqual(old.headers, config.headers);
        assert.notEqual(old.headers.foo, config.headers.foo);
        assert.deepEqual(old.headers.foo, config.headers.foo);
        assert.notEqual(old.query, config.query);
        assert.notEqual(old.params, config.params);
      });
    });
    it('should not modify context\'s config', () => {
      const fetch = new Fetch();
      fetch.instance({
        auth: { username: 'foo', password: 'bar' },
        baseURL: '//foo',
        headers: { foo: 'bar', bar: 'foo' },
        params: { foo: 'bar', bar: 'foo' },
        query: { foo: 'bar', bar: 'foo' },
        timeout: 5000
      });

      fetch.config((config) => {
        assert.deepEqual(config.auth, { username: '', password: '' });
        assert.strictEqual(config.baseURL, global.location.origin);
        assert.deepEqual(config.headers, {});
        assert.deepEqual(config.params, {});
        assert.deepEqual(config.query, {});
        assert.strictEqual(config.timeout, 0);
      });
    });
    it('should create new instance with config argument', () => {
      const fetch = new Fetch({
        auth: { username: 'foo', password: 'bar' },
        baseURL: '//foo',
        headers: { foo: 'bar', bar: 'foo' },
        params: { foo: 'bar', bar: 'foo' },
        query: { foo: 'bar', bar: 'foo' }
      });
      const instance = fetch.instance({
        auth: { username: 'baz' },
        headers: { foo: 'baz', baz: 'foo' },
        params: { foo: 'baz', baz: 'foo' },
        query: { foo: 'baz', baz: 'foo' },
        timeout: 5000
      });

      instance.config((config) => {
        assert.deepEqual(config.auth, { username: 'baz', password: 'bar' });
        assert.strictEqual(config.baseURL, '//foo');
        assert.deepEqual(config.headers, { foo: ['baz'], bar: ['foo'], baz: ['foo'] });
        assert.deepEqual(config.params, { foo: 'baz', bar: 'foo', baz: 'foo' });
        assert.deepEqual(config.query, { foo: 'baz', bar: 'foo', baz: 'foo' });
        assert.strictEqual(config.timeout, 5000);
      });
    });
  });
  describe('patch()', () => {
    it('should support call without arguments', () => {
      const fetch = new Fetch();

      fetch.request = (url, config) => {
        assert.strictEqual(url, undefined);
        assert.deepEqual(config, { method: 'patch', data: {} });
      };

      fetch.patch();
    });
    it('should support call with only url', () => {
      const fetch = new Fetch();
      const URL = '/foo';

      fetch.request = (url, config) => {
        assert.strictEqual(url, URL);
        assert.deepEqual(config, { method: 'patch', data: {} });
      };

      fetch.patch(URL);
    });
    it('should support call with only data', () => {
      const fetch = new Fetch();
      const data = { foo: 'bar' };

      fetch.request = (url, config) => {
        assert.strictEqual(url, undefined);
        assert.deepEqual(config, { method: 'patch', data });
      };

      fetch.patch(data);
    });
    it('should support call with url and data', () => {
      const fetch = new Fetch();
      const URL = '/foo';
      const data = { foo: 'bar' };

      fetch.request = (url, config) => {
        assert.strictEqual(url, URL);
        assert.deepEqual(config, { method: 'patch', data });
      };

      fetch.patch(URL, data);
    });
    it('should support call with data and config', () => {
      const fetch = new Fetch();
      const data = { foo: 'bar' };
      const rand = random();

      fetch.request = (url, config) => {
        assert.strictEqual(url, undefined);
        assert.deepEqual(config, { method: 'patch', data, timeout: rand });
      };

      fetch.patch(data, { timeout: rand });
    });
    it('should support call with url, data and config', () => {
      const fetch = new Fetch();
      const URL = '/foo';
      const data = { foo: 'bar' };
      const rand = random();

      fetch.request = (url, config) => {
        assert.strictEqual(url, URL);
        assert.deepEqual(config, { method: 'patch', data, timeout: rand });
      };

      fetch.patch(URL, data, { timeout: rand });
    });
  });
  describe('post()', () => {
    it('should support call without arguments', () => {
      const fetch = new Fetch();

      fetch.request = (url, config) => {
        assert.strictEqual(url, undefined);
        assert.deepEqual(config, { method: 'post', data: {} });
      };

      fetch.post();
    });
    it('should support call with only url', () => {
      const fetch = new Fetch();
      const URL = '/foo';

      fetch.request = (url, config) => {
        assert.strictEqual(url, URL);
        assert.deepEqual(config, { method: 'post', data: {} });
      };

      fetch.post(URL);
    });
    it('should support call with only data', () => {
      const fetch = new Fetch();
      const data = { foo: 'bar' };

      fetch.request = (url, config) => {
        assert.strictEqual(url, undefined);
        assert.deepEqual(config, { method: 'post', data });
      };

      fetch.post(data);
    });
    it('should support call with url and data', () => {
      const fetch = new Fetch();
      const URL = '/foo';
      const data = { foo: 'bar' };

      fetch.request = (url, config) => {
        assert.strictEqual(url, URL);
        assert.deepEqual(config, { method: 'post', data });
      };

      fetch.post(URL, data);
    });
    it('should support call with data and config', () => {
      const fetch = new Fetch();
      const data = { foo: 'bar' };
      const rand = random();

      fetch.request = (url, config) => {
        assert.strictEqual(url, undefined);
        assert.deepEqual(config, { method: 'post', data, timeout: rand });
      };

      fetch.post(data, { timeout: rand });
    });
    it('should support call with url, data and config', () => {
      const fetch = new Fetch();
      const URL = '/foo';
      const data = { foo: 'bar' };
      const rand = random();

      fetch.request = (url, config) => {
        assert.strictEqual(url, URL);
        assert.deepEqual(config, { method: 'post', data, timeout: rand });
      };

      fetch.post(URL, data, { timeout: rand });
    });
  });
  describe('put()', () => {
    it('should support call without arguments', () => {
      const fetch = new Fetch();

      fetch.request = (url, config) => {
        assert.strictEqual(url, undefined);
        assert.deepEqual(config, { method: 'put', data: {} });
      };

      fetch.put();
    });
    it('should support call with only url', () => {
      const fetch = new Fetch();
      const URL = '/foo';

      fetch.request = (url, config) => {
        assert.strictEqual(url, URL);
        assert.deepEqual(config, { method: 'put', data: {} });
      };

      fetch.put(URL);
    });
    it('should support call with only data', () => {
      const fetch = new Fetch();
      const data = { foo: 'bar' };

      fetch.request = (url, config) => {
        assert.strictEqual(url, undefined);
        assert.deepEqual(config, { method: 'put', data });
      };

      fetch.put(data);
    });
    it('should support call with url and data', () => {
      const fetch = new Fetch();
      const URL = '/foo';
      const data = { foo: 'bar' };

      fetch.request = (url, config) => {
        assert.strictEqual(url, URL);
        assert.deepEqual(config, { method: 'put', data });
      };

      fetch.put(URL, data);
    });
    it('should support call with data and config', () => {
      const fetch = new Fetch();
      const data = { foo: 'bar' };
      const rand = random();

      fetch.request = (url, config) => {
        assert.strictEqual(url, undefined);
        assert.deepEqual(config, { method: 'put', data, timeout: rand });
      };

      fetch.put(data, { timeout: rand });
    });
    it('should support call with url, data and config', () => {
      const fetch = new Fetch();
      const URL = '/foo';
      const data = { foo: 'bar' };
      const rand = random();

      fetch.request = (url, config) => {
        assert.strictEqual(url, URL);
        assert.deepEqual(config, { method: 'put', data, timeout: rand });
      };

      fetch.put(URL, data, { timeout: rand });
    });
  });
  describe('request()', () => {
    it('should construct url the right way', (done) => {
      const fetch = new Fetch({
        baseURL: '//foo/',
        url: '/bar/:baz/:baz/:foo/:bar?foo=bar'
      });

      fetch.before((config, next) => {
        assert.strictEqual(
          config.constructedUrl,
          '//foo/bar/foo/foo/bar/baz?foo=bar&bar[]=foo&bar[]=baz&baz=foo'
        );

        next();
      });

      fetch.before(() => {
        throw new Error();
      });

      fetch.request({
        params: { foo: 'bar', bar: 'baz', baz: 'foo' },
        query: { bar: ['foo', 'baz'], baz: 'foo' }
      }).catch(() => done());
    });
    // TODO: test cache
    // TODO: test data transformation
    // TODO: test headers transformation
    // TODO: test middlewares
    // TODO: test request itself
  });
});
