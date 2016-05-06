import Super from '../Super';
import { isObject, toStringTag } from '../../libs';

const notToTransform = new Super(['FormData', 'File', 'Blob', 'ArrayBuffer', 'String', 'Number']);
const withoutBody = new Super(['DELETE', 'GET', 'HEAD']);

export default (data, method, headers) => {
  if (withoutBody.keyOfStrict(method) !== null) {
    return null;
  }

	if (isObject(data) && notToTransform.keyOfStrict(toStringTag(data)) === null) {
		if (!headers.contentType) {
			headers.contentType = 'application/json;charset=utf-8';
		}

		return new Super(data).json();
	}
	
	return data;
};
