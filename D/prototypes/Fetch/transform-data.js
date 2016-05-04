import Obj from '../Object';
import { isObject, toString } from '../../libs';

const notToTransform = new Obj(['FormData', 'File', 'Blob', 'ArrayBuffer', 'String', 'Number']);
const withoutBody = new Obj(['DELETE', 'GET', 'HEAD']);

export default (data, method, headers) => {
  if (withoutBody.keyOfStrict(method) === null) {
    return null;
  }

	if (isObject(data) && notToTransform.keyOfStrict(toString(data)) === null) {
		if (!headers.contentType) {
			headers.contentType = 'application/json;charset=utf-8';
		}

		return new Obj(data).json();
	}
	
	return data;
};
