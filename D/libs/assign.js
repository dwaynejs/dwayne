export const assign = Object.assign || ((target, ...objects) => {
	for (let i = 0; i < objects.length; i++) {
		const source = objects[i];
		for (let key in source) {
			if (source.hasOwnProperty(key)) {
				target[key] = source[key];
			}
		}
	}
	return target;
});