import classes from '../../classes';
import constructors from '../../constructors';
import Super from '../Super';
import Promise from '../Promise';
import { isFunction, assign, validate, toArray } from '../../libs';

const nativeFunction = global.Function;

export class Function extends Super {
	constructor(func = () => {}) {
    super();

		validate([func], ['function'], 'new Function');

		function proxy() {
			if (proxy.$.called < proxy.$.canBeCalled) {
				proxy.$.called++;

				let { before, after, context, args, sync, contextLocked } = proxy.$;
				let ret;

				context = contextLocked ? context : this;
				args = args.concat(toArray(arguments));

				if (sync) {
					for (let i = 0; i < before.length; i++) {
						args = before[i].apply(null, toArray(args));
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
						return before[i].apply(null, toArray(args));
					});
				}

				promise = promise.then((args) => {
					return func.apply(this, toArray(args));
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
			originalName: func.name || 'anonymous',
			sync: true
		});

		return proxy;
	}

	after(f, where = 1) {
		validate([f], ['function'], 'Function.prototype.after');

		const func = this.$;

		if (where < 0) {
			func.after.unshift(f);
		} else {
			func.after.push(f);
		}

		return this;
	}
	apply(context, args) {
		return nativeFunction.apply.call(this, context, args);
	}
	async(cond = true) {
		this.$.sync = !cond;

		return this;
	}
	before(f, where = -1) {
		validate([f], ['function'], 'Function.prototype.before');

		const func = this.$;

		if (where > 0) {
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
    return nativeFunction.apply.call(this, context, Array.prototype.slice.call(arguments, 1));
	}
	canBeCalled(n) {
		this.$.canBeCalled = n;

		return this;
	}
	interval(number) {
		const f = this.$.bind({ clear });
		const args = Array.prototype.slice.call(arguments, 1);

		let interval;

		(() => {
			f.apply(null, args);
			interval = setInterval.apply(null, [f, number].concat(args));
		})();

		function clear() {
			return clearInterval(interval);
		}

		return clear;
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
  promise() {
    return new Promise(this);
  }
	timing(mark) {
		mark = !arguments.length ? this.$.originalName : String(mark);

		this.before(function () {
			console.time(mark);

			return arguments;
		}, 1);

		this.after((ret) => {
			console.timeEnd(mark);

			return ret;
		}, -1);

		return this;
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

classes.Function = Function;
constructors.unshift({
	check: isFunction,
	cls: Function
});

export default Function;
