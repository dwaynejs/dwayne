/**
 * @module Blob
 * @private
 * @mixin
 * @description Exports Blob class.
 */

import Super from './Super';
import Promise from './Promise';
import constructors from './constants/constructors';
import { isArray, isFunction, toStringTag } from './helpers';

/**
 * @member {{buffer: String, binary: String, dataURL: String, text: String}} methods
 * @private
 * @description List of read blob methods.
 */
const methods = {
  buffer: 'ArrayBuffer',
  binary: 'BinaryString',
  dataURL: 'DataURL',
  text: 'Text'
};

const NativeBlob = global.Blob;

/**
 * @typedef {('buffer'|'binary'|'dataURL'|'text')} ReadBlobMethod
 * @public
 * @description Enum type of read blob methods.
 */

/**
 * @typedef {(ArrayBuffer|ArrayBufferView|global.Blob|window.Blob|String)} BlobParts
 * @public
 * @description Allowed blob parts.
 */

export class Blob extends Super {
  /**
   * @class Blob
   * @extends Super
   * @public
   * @param {(global.Blob|window.Blob)} blob - Blob to wrap.
   * @returns {Blob} Instance of Blob.
   * @description Wrap of a blob.
   *
   * @example
   * new Blob(new global.Blob(['{"foo":"bar"}'], { type: 'application/json' }));
   */
  constructor(blob) {
    super(blob);
  }

  /**
   * @method Blob#readAs
   * @public
   * @param {ReadBlobMethod} method - Method that is used for reading from blob.
   * @param {Function} [progress] - Progress listener.
   * @returns {AbortablePromise} Promise that could be aborted.
   * @description Method for reading from blobs.
   *
   * @example
   * new Blob(new global.Blob(['{"foo":"bar"}'], { type: 'application/json' }))
   *   .readAs('text')
   *   .then((value) => {
   *     console.log(value); // '{"foo":"bar"}'
   *   });
   */
  readAs(method, progress) {
    if (!methods[method]) {
      throw new Error('1st argument must be one of following values: buffer, binary, dataURL, text');
    }

    let reader = new FileReader();
    let toReject;

    if (isFunction(progress)) {
      reader.onprogress = progress;
    }

    const promise = new Promise((resolve, reject) => {
      toReject = reject;
      
      reader.onerror = () => {
        if (reader) {
          reject(new Error('Reading error'));
        }
      };

      reader.onload = () => {
        resolve(reader.result);
      };
      
      reader['readAs' + methods[method]](this.$);
    });
    
    promise.abort = function abort() {
      toReject(new Error('Reading was aborted'));

      reader.abort();
      
      reader = null;
      
      return this;
    };
    
    return promise;
  }

  /**
   * @method Blob#saveAs
   * @public
   * @param {String} [name] - Name that is used for saving file.
   * @returns {Blob} Returns this.
   * @description Method for saving blobs.
   *
   * @example
   * new Blob(new global.Blob(['{"foo":"bar"}'], { type: 'application/json' }))
   *   .saveAs('blob.json');
   */
  saveAs(name = 'download') {
    const anchor = document.createElement('a');

    anchor.href = URL.createObjectURL(this.$);
    anchor.setAttribute('download', name);
    anchor.click();

    return this;
  }
}

constructors[1].push({
  check: (blob) => /^(Blob|File)$/.test(toStringTag(blob)),
  cls: Blob
});

/**
 * @function blob
 * @public
 * @param {(BlobParts[]|BlobParts)} blobParts - Blob parts that are passed to
 * [global.Blob]{@link https://developer.mozilla.org/en-US/docs/Web/API/Blob/Blob} constructor.
 * @param {Object} [options] - Options that are passed to
 * [global.Blob]{@link https://developer.mozilla.org/en-US/docs/Web/API/Blob/Blob} constructor.
 * @returns {Blob} New instance of Blob.
 * @description Function for creating blobs not involving Blob and global.Blob constructors.
 */
export function blob(blobParts, options) {
  if (!isArray(blobParts)) {
    blobParts = [blobParts];
  }

  return new Blob(new NativeBlob(blobParts, options));
}

export default Blob;
