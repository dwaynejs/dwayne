/**
 * @module BlobObject
 * @private
 * @mixin
 * @description Exports BlobObject class.
 */

import Super from './Super';
import Promise from './Promise';
import global from './constants/global';
import constructors from './constants/constructors';
import {
  isArray, isFunction,
  toStringTag, Symbol, defineProperties
} from './helpers';

/**
 * @typedef {{ buffer: String, binary: String, dataURL: String, text: String }} methods
 * @private
 * @description List of read blob methods.
 */
const methods = {
  buffer: 'ArrayBuffer',
  binary: 'BinaryString',
  dataURL: 'DataURL',
  text: 'Text'
};
const { URL } = global;

/**
 * @typedef {('buffer'|'binary'|'dataURL'|'text')} ReadBlobMethod
 * @public
 * @description Enum type of read blob methods.
 */

/**
 * @typedef {ArrayBuffer|ArrayBufferView|Blob|String} BlobParts
 * @public
 * @description Allowed blob parts.
 */

/**
 * @callback ReaderEventListener
 * @public
 * @param {Event} e - Fired event.
 * @param {FileReader} reader - FileReader.
 */

/**
 * @class BlobObject
 * @extends Super
 * @public
 * @param {Blob} blob - Blob to wrap.
 * @returns {BlobObject} Instance of BlobObject.
 * @description Wrap of a blob.
 *
 * @example
 * new BlobObject(new Blob(['{"foo":"bar"}'], { type: 'application/json' }));
 */
export class BlobObject extends Super {
  /**
   * @member BlobObject#$
   * @type {Blob}
   * @public
   * @description Original Blob.
   */

  /**
   * @member {String} BlobObject#dataURL
   * @type {String}
   * @public
   * @readonly
   * @description Returns dataURL representation of the blob.
   */
  get dataURL() {
    return URL.createObjectURL(this.$);
  }

  /**
   * @method BlobObject#readAs
   * @public
   * @param {ReadBlobMethod} method - Method that is used for reading from blob.
   * @param {ReaderEventListener} [progress] - Progress listener.
   * @returns {Promise} Promise that could be aborted.
   * @description Method for reading from blobs.
   *
   * @example
   * new BlobObject(new Blob(['{"foo":"bar"}'], { type: 'application/json' }))
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
      reader.onprogress = function (e) {
        progress(e, this);
      };
    }

    const promise = new Promise((resolve, reject) => {
      toReject = reject;

      reader.onerror = ({ target }) => {
        if (reader) {
          reject(target.error);
        }
      };

      reader.onload = ({ target }) => {
        resolve(target.result);
      };

      reader[`readAs${ methods[method] }`](this.$);
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
   * @method BlobObject#saveAs
   * @public
   * @param {String} [name] - Name that is used for saving file.
   * @returns {BlobObject} Returns this.
   * @description Method for saving blobs.
   *
   * @example
   * new BlobObject(new Blob(['{"foo":"bar"}'], { type: 'application/json' }))
   *   .saveAs('blob.json');
   */
  saveAs(name = 'download') {
    const anchor = document.createElement('a');

    anchor.href = this.dataURL;
    anchor.setAttribute('download', name);
    anchor.click();

    return this;
  }
}

defineProperties(BlobObject.prototype, {
  [Symbol.toStringTag]: 'BlobObject'
});

constructors[1].push({
  check: (blob) => /^(Blob|File)$/.test(toStringTag(blob)),
  cls: BlobObject
});

/**
 * @function blob
 * @public
 * @param {(BlobParts[]|BlobParts)} blobParts - Blob parts that are passed to
 * [Blob]{@link https://developer.mozilla.org/en-US/docs/Web/API/Blob/Blob} constructor.
 * @param {Object} [options] - Options that are passed to
 * [Blob]{@link https://developer.mozilla.org/en-US/docs/Web/API/Blob/Blob} constructor.
 * @returns {BlobObject} New instance of BlobObject.
 * @description Function for creating blobs not involving BlobObject and Blob constructors.
 */
export function blob(blobParts, options = {}) {
  if (!isArray(blobParts)) {
    blobParts = [blobParts];
  }

  return new BlobObject(new Blob(blobParts, options));
}

export default BlobObject;
