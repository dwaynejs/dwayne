import { assign } from './libs';
import constructors from './constructors';
import * as methods from './methods';

function D(object) {
	for (let i = 0, length = constructors.length; i < length; i++) {
		const constructor = constructors[i];

		if (constructor.check(object)) {
			return new constructor.cls(object);
		}
	}
}

export default assign(
	D,
	methods
);
