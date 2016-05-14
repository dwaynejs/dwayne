import constructors from './constants/constructors';

export * from './helpers/checkTypes';

function D(object) {
	for (let i = constructors.length - 1; i >= 0; i--) {
		const levelConstructors = constructors[i];

    for (let k = 0, len = levelConstructors.length; k < len; k++) {
      const constructor = levelConstructors[k];

      if (constructor.check(object)) {
        return new constructor.cls(object);
      }
    }
	}
}

export default D;
