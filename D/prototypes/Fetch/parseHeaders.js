import Str from '../String';

export default (string) => {
	const headers = {};
	const split = (string || '').split('\n');

	for (let i = 0, length = split.length; i < length; i++) {
		const value = split[i];
		const index = value.indexOf(':');
		const key = new Str(value.substring(0, index)).trim().toCamelCase().$;
		const val = new Str(value.substring(index + 1)).trim().$;

		if (key) {
			headers[key] = (headers[key] ? headers[key] + ', ' : '') + val;
		}
	}

	return headers;
};