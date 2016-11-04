import { deepEqual, strictEqual } from 'assert';
import { blob } from '../lib/BlobObject';
import { Super } from '../lib/Super';

describe('it should test BlobObject#', () => {
  describe('readAs', () => {
    it('should return promise, that is resolved with text with "text" argument', (done) => {
      const string = '{"foo":"bar"}';
      const wrap = blob([new Super({ foo: 'bar' }).json()], { type: 'application/json' });

      wrap.readAs('text')
        .then((text) => {
          strictEqual(text, string);

          done();
        })
        .catch(done);
    });
    it('should return promise, that is resolved with dataURL with "dataURL" argument', (done) => {
      const string = 'data:application/json;base64,eyJmb28iOiJiYXIifQ==';
      const wrap = blob([new Super({ foo: 'bar' }).json()], { type: 'application/json' });

      wrap.readAs('dataURL')
        .then((dataURL) => {
          strictEqual(dataURL, string);

          done();
        })
        .catch(done);
    });
    it('should return promise, that is resolved with binary data with "binary" argument', (done) => {
      const string = '{"foo":"bar"}';
      const wrap = blob([new Super({ foo: 'bar' }).json()], { type: 'application/json' });

      wrap.readAs('binary')
        .then((binary) => {
          strictEqual(binary, string);

          done();
        })
        .catch(done);
    });
    it('should return promise, that is resolved with array buffer with "buffer" argument', (done) => {
      const string = '{"foo":"bar"}';
      const wrap = blob([new Super({ foo: 'bar' }).json()], { type: 'application/json' });

      wrap.readAs('buffer')
        .then((buffer) => {
          const charCodes = new Super(string).map((symbol) => symbol.charCodeAt(0)).$;

          deepEqual(new Int8Array(buffer), charCodes);

          done();
        })
        .catch(done);
    });
    it('should return promise, that has abort method', (done) => {
      const wrap = blob([new Super({ foo: 'bar' }).json()], { type: 'application/json' });
      
      wrap.readAs('buffer')
        .abort()
        .then(done)
        .catch((err) => {
          strictEqual(err.message, 'Reading was aborted');

          done();
        })
        .catch(done);
    });
  });
});
