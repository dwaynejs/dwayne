import { isArrayLike } from '../methods';

export function toArray(array) {
	const a = [];

	if (isArrayLike(array)) {
		for (let i = 0, length = array.length; i < length; i++) {
			a.push(array[i]);
		}
	} else {
		a.push(array);
	}

	return a;
}
