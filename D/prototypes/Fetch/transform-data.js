import Obj from '../Object';
import { isObject, toString } from '../../libs';

const notToTransform = new Obj(['FormData', 'File', 'Blob', 'ArrayBuffer', 'String', 'Number']);

export default (data, headers) => {
	if (isObject(data) && notToTransform.keyOf(toString(data)) === null) {
		if (!headers['Content-Type']) {
			headers.contentType = 'application/json;charset=utf-8';
		}

		return new Obj(data).json();
	}
	
	return data;
};