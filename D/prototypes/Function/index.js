import constructors from '../../constructors';
import Promise from '../Promise';
import { isFunction, assign, validate, toArray } from '../../libs';

const NativeFunction = global.Function;

export class Function {
	constructor(func = () => {}) {
		function proxy() {
			if (++proxy.$.called < proxy.$.canBeCalled) {
				let { before, after, context, args, sync, contextLocked } = proxy.$;
				let ret;

				context = contextLocked ? context : context || this;
				args = args.concat(toArray(arguments));

				if (sync) {
					for (let i = 0; i < before.length; i++) {
						args = before[i].call(null, toArray(args));
					}

					ret = func.apply(context, toArray(args));

					for (let i = 0; i < after.length; i++) {
						ret = after[i](ret);
					}

					return ret;
				}

				let promise = Promise.resolve(args);

				for (let i = 0; i < before.length; i++) {
					promise = promise.then((args) => {
						return before[i].call(null, toArray(args));
					});
				}

				promise = promise.then((args) => {
					return func.apply(context, toArray(args));
				});

				for (let i = 0; i < after.length; i++) {
					promise = promise.then((ret) => {
						return after[i](ret);
					});
				}

				return promise;
			}
		}

		Object.defineProperty(proxy, '$', { value: {} });

    Object.setPrototypeOf(proxy, Function.prototype);

		assign(proxy.$, {
			after: [],
			args: [],
			argsLocked: [],
			before: [],
			called: 0,
			canBeCalled: Infinity,
			context: null,
			contextLocked: false,
      original: func,
			originalName: func.name || 'anonymous',
			sync: true
		});

		return proxy;
	}

	after(f, where = true) {
		validate([f], ['function'], 'Function.prototype.after');

		const func = this.$;

		if (!where) {
			func.after.unshift(f);
		} else {
			func.after.push(f);
		}

		return this;
	}
	apply() {
		return NativeFunction.prototype.apply.apply(this, arguments);
	}
	async(cond = true) {
		this.$.sync = !cond;

		return this;
	}
	before(f, where = true) {
		validate([f], ['function'], 'Function.prototype.before');

		const func = this.$;

		if (!where) {
			func.before.push(f);
		} else {
			func.before.unshift(f);
		}

		return this;
	}
	bind(context, args) {
		this.bindContext(context);
		this.bindArgs(args);

		return this;
	}
	bindArgs(args) {
		const func = this.$;

		func.args = func.args.concat(toArray(args));

		return this;
	}
	bindContext(context) {
		const func = this.$;

		if (!func.contextLocked) {
			func.context = context;
		}

		return this;
	}
	call(context) {
    return NativeFunction.prototype.call.apply(this, arguments);
	}
  get called() {
    return this.$.called;
  }
	canBeCalled(n) {
		this.$.canBeCalled = n;

		return this;
	}
  limitArgsTo(n) {
    return this.before((args) => args.slice(0, n), false);
  }
	lock(context, args) {
		this.lockContext(context);
		this.lockArgs(args);

		return this;
	}
	lockArgs(args) {
		const func = this.$;

		func.args = func.argsLocked = func.argsLocked.concat(toArray(args));

		return this;
	}
	lockContext(context) {
		const func = this.$;

		if (!func.contextLocked) {
			func.context = context;
			func.contextLocked = true;
		}

		return this;
	}
	timing(mark) {
		mark = !arguments.length ? this.$.originalName : String(mark);

		this.before(function () {
			console.time(mark);

			return arguments;
		}, false);

		this.after((ret) => {
			console.timeEnd(mark);

			return ret;
		}, false);

		return this;
	}
  toString() {
    return NativeFunction.prototype.toString.call(this);
  }
	unbind() {
		this.unbindContext();
		this.unbindArgs();

		return this;
	}
	unbindArgs() {
		const func = this.$;

		func.args = func.argsLocked;

		return this;
	}
	unbindContext() {
		const func = this.$;

		if (!func.contextLocked) {
			func.context = null;
		}

		return this;
	}
}

constructors[1].push({
	check: isFunction,
	cls: Function
});

export function noop() {}
export function self(arg) {
  return arg;
}
export function callsMethod(method) {
  const args = Array.prototype.slice.call(arguments);
  
  return function callsMethod(x) {
    return x[method].apply(x, args);
  };
}

export default Function;
