import Super from '../Super';
import { isNull, isObject, toStringTag } from './checkTypes';

const notToTransform = new Super(['FormData', 'File', 'Blob', 'ArrayBuffer', 'String', 'Number']);
const withoutBody = new Super(['DELETE', 'GET', 'HEAD']);

export default (data, method, headers) => {
  if (!isNull(withoutBody.keyOfStrict(method))) {
    return null;
  }

	if (isObject(data) && isNull(notToTransform.keyOfStrict(toStringTag(data)))) {
		if (!headers.contentType) {
			headers.contentType = 'application/json;charset=utf-8';
		}

		return new Super(data).json();
	}
	
	return data;
};
