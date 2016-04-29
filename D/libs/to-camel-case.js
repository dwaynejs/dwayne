export function toCamelCase(string) {
	return string
		.replace(/[\s\-_\.]+/g, '-')
		.replace(/^[\-]|[\-]+$/g, '')
		.replace(/\-[^\-]/g, (match) => {
			return match[1].toUpperCase();
		})
		.replace(/^[\S]/, (match) => {
			return match.toLowerCase();
		});
}