import Class from './module';
import Str from '../Array';
const assert = require('assert');

describe('it should test D.Function.prototype.[methods]', () => {
  describe('readAs', () => {
    it('should return promise, that is resolved with text with "text" argument', (done) => {
      const blob = new Blob([JSON.stringify({ foo: 'bar' })], { type: 'application/json' });
      const string = '{"foo":"bar"}';
      const wrap = new Class(blob);

      wrap.readAs('text')
        .then((text) => {
          assert.strictEqual(text, string);

          done();
        })
        .catch(done);
    });
    it('should return promise, that is resolved with dataURL with "dataURL" argument', (done) => {
      const blob = new Blob([JSON.stringify({ foo: 'bar' })], { type: 'application/json' });
      const string = 'data:application/json;base64,eyJmb28iOiJiYXIifQ==';
      const wrap = new Class(blob);

      wrap.readAs('dataURL')
        .then((dataURL) => {
          assert.strictEqual(dataURL, string);

          done();
        })
        .catch(done);
    });
    it('should return promise, that is resolved with binary data with "binary" argument', (done) => {
      const blob = new Blob([JSON.stringify({ foo: 'bar' })], { type: 'application/json' });
      const string = '{"foo":"bar"}';
      const wrap = new Class(blob);

      wrap.readAs('binary')
        .then((binary) => {
          assert.strictEqual(binary, string);

          done();
        })
        .catch(done);
    });
    it('should return promise, that is resolved with array buffer data with "buffer" argument', (done) => {
      const blob = new Blob([JSON.stringify({ foo: 'bar' })], { type: 'application/json' });
      const string = '{"foo":"bar"}';
      const wrap = new Class(blob);

      wrap.readAs('buffer')
        .then((buffer) => {
          const charCodes = new Str(string).map((symbol) => symbol.charCodeAt(0)).$;

          assert.deepEqual(new Int8Array(buffer), charCodes);

          done();
        })
        .catch(done);
    });
    it('should return promise, that has abort method', (done) => {
      const blob = new Blob([JSON.stringify({ foo: 'bar' })], { type: 'application/json' });
      const string = '{"foo":"bar"}';
      const wrap = new Class(blob);
      
      wrap.readAs('buffer')
        .abort()
        .then(done)
        .catch((err) => {
          assert.strictEqual(err.message, 'Reading was aborted');

          done();
        })
        .catch(done);
    });
  });
});
