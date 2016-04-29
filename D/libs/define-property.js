const getRegexp = /^get /;
const setRegexp = /^set /;
const getSetRegexp = /^get\/set /;

export function dynamicDefineProperties(object, methods, descriptorGenerator) {
	for (let i = 0, length = methods.length; i < length; i++) {
		const name = methods[i];
		Object.defineProperty(object, name, { value: descriptorGenerator(name) });
	}
}

export function defineProperties(object, methods) {
	for (const name in methods) {
		if (methods.hasOwnProperty(name)) {
			const method = methods[name];

			if (getRegexp.test(name)) {
				Object.defineProperty(object, name.replace(getRegexp, ''), { get: method });
				continue;
			}

			if (setRegexp.test(name)) {
				Object.defineProperty(object, name.replace(setRegexp, ''), { set: method });
				continue;
			}

			if (getSetRegexp.test(name)) {
				Object.defineProperty(object, name.replace(getSetRegexp, ''), { get: method.get, set: method.set });
				continue;
			}

			Object.defineProperty(object, name, { value: method });

		}
	}
}