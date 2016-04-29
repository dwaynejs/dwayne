import { assign } from './libs';
import * as methods from './methods';

function D(object) {
	for (let i = 0, length = D.constructors.length; i < length; i++) {
		const constructor = D.constructors[i];

		if (constructor.check(object)) {
			return new constructor.cls(object);
		}
	}

	return new D.Object(object);
}

export default assign(
	D,
	{ constructors: [] },
	methods
);