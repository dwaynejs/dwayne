import constructors from './constructors';

function D(object) {
	for (let i = 0, length = constructors.length; i < length; i++) {
		const constructor = constructors[i];

		if (constructor.check(object)) {
			return new constructor.cls(object);
		}
	}
}

global.D = D;

export default D;
