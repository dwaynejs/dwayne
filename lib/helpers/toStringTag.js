export function toStringTag(object) {
	return Object.prototype.toString.call(object).replace(/^\[object |]$/g, '');
}
