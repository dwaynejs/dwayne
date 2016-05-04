export const assign = Object.assign || function (target) {
	for (let i = 1; i < arguments.length; i++) {
		const source = arguments[i];
    
		for (const key in source) {
			if (source.hasOwnProperty(key)) {
				target[key] = source[key];
			}
		}
	}
    
	return target;
};
