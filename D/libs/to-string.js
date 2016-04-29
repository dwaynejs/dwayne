export function toString(object) {
	return Object.prototype.toString.call(object).replace(/^\[object |]$/g, '');
}