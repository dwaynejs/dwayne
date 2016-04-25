import { assign } from './libs';
import methods from './methods';

function D() {
	console.log(123);
}

export default assign(
	D,
	{ constructors: [] },
	methods
);