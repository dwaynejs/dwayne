import Str from '../String';
import { isArray, isObject } from './checkTypes';

const absoluteUrlRegexp = /^([a-z][a-z\d\+\-\.]*:)?\/\//i;

export default (baseURL, url, params, query) => {
	let URL = isAbsolute(url)
		? url
		: String(baseURL).replace(/\/+$/, '') + '/' + String(url).replace(/^\/+/,'');

	for (const param in params) {
		if (params.hasOwnProperty(param)) {
			URL = new Str(URL).replaceString(':' + param, params[param]).$;
		}
	}

	const queryParams = [];

	for (let param in query) {
		if (query.hasOwnProperty(param)) {
			let value = query[param];

			if (isArray(value)) {
				param = param + '[]';
			} else {
				value = [value];
			}

			for (let i = 0, length = value.length; i < length; i++) {
				let val = value[i];

				if (isObject(val)) {
					val = JSON.stringify(val);
				} else {
					val = String(val);
				}

				queryParams.push(encode(param) + '=' + encode(val));
			}
		}
	}
	
	if (queryParams.length) {
		URL += (URL.indexOf('?') === -1 ? '?' : '&') + queryParams.join('&');
	}

	return URL;
};

function isAbsolute(url) {
	return absoluteUrlRegexp.test(url);
}

function encode(string) {
	return encodeURIComponent(string);
}
