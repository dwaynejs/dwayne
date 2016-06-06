import Super from './Super';
import Promise from './Promise';
import constructors from './constants/constructors';
import { isArray, toStringTag } from './helpers';

const methods = {
  buffer: 'ArrayBuffer',
  binary: 'BinaryString',
  dataURL: 'DataURL',
  text: 'Text'
};

const NativeBlob = global.Blob;

export class Blob extends Super {
  constructor(blob) {
    super(blob);
  }

  readAs(method, progress) {
    if (!methods[method]) {
      throw new Error('1st argument must be one of following values: buffer, binary, dataURL, text');
    }

    let reader = new FileReader();
    let toReject;

    reader.onprogress = progress;

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

export function blob(blobParts, options) {
  if (!isArray(blobParts)) {
    blobParts = [blobParts];
  }

  return new Blob(new NativeBlob(blobParts, options));
}

export default Blob;
