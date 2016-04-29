import { isArrayAlike } from '../methods/check-type-methods';

export function toArray(array) {
	const a = [];

	if (isArrayAlike(array)) {
		for (let i = 0, length = array.length; i < length; i++) {
			a.push(array[i]);
		}
	} else {
		a.push(array);
	}

	return a;
}