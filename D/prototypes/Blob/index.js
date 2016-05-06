import classes from '../../classes';
import constructors from '../../constructors';
import Super from '../Super';
import Promise from '../Promise';
import { toStringTag } from '../../libs';

const methods = {
  buffer: 'ArrayBuffer',
  binary: 'BinaryString',
  dataURL: 'DataURL',
  text: 'Text'
};

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
}

classes.Blob = Blob;
constructors.unshift({
  check: (blob) => /^(Blob|File)$/.test(toStringTag(blob)),
  cls: Blob
});

export default Blob;
