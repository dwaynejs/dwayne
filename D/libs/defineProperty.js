const getRegexp = /^get /;
const setRegexp = /^set /;
const getSetRegexp = /^get\/set /;

export function dynamicDefineProperties(object, methods, descriptorGenerator) {
	for (let i = 0, length = methods.length; i < length; i++) {
		const name = methods[i];
		Object.defineProperty(object, name, {
      value: descriptorGenerator(name),
      writable: true,
      enumerable: false,
      configurable: true
    });
	}
}

export function defineProperties(object, methods) {
	for (const name in methods) {
		if (methods.hasOwnProperty(name)) {
			const method = methods[name];

			if (getRegexp.test(name)) {
				Object.defineProperty(object, name.replace(getRegexp, ''), {
          get: method,
          set: undefined,
          enumerable: false,
          configurable: true
        });
				continue;
			}

			if (setRegexp.test(name)) {
				Object.defineProperty(object, name.replace(setRegexp, ''), {
          set: method,
          get: undefined,
          enumerable: false,
          configurable: true
        });
				continue;
			}

			if (getSetRegexp.test(name)) {
				Object.defineProperty(object, name.replace(getSetRegexp, ''), {
          get: method.get,
          set: method.set,
          enumerable: false,
          configurable: true
        });
				continue;
			}

			Object.defineProperty(object, name, {
        value: method,
        writable: true,
        enumerable: false,
        configurable: true
      });
		}
	}
}
