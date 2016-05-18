import Arr from '../Array';
import Super from '../Super';
import { isObject, toStringTag } from './';

const notToTransform = new Arr(['FormData', 'File', 'Blob', 'ArrayBuffer', 'String', 'Number']);
const withoutBody = new Arr(['DELETE', 'GET', 'HEAD']);

export default (data, method, headers) => {
  data = new Super(data).$;

  if (withoutBody.indexOfStrict(method) !== -1) {
    return null;
  }

	if (isObject(data) && notToTransform.keyOfStrict(toStringTag(data)) !== -1) {
		if (!headers.contentType) {
			headers.contentType = ['application/json;charset=utf-8'];
		}

		return new Super(data).json();
	}
	
	return data;
};
