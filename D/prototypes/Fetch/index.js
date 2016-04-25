import D from '../../';
import methods from '../../methods';
import { default as parent, transform } from '../Object';
import Num from '../Number';
import { validate } from '../../libs';

const cls = class Fetch extends parent {
	constructor() {
		super({
			after: {},
			before: {},
			timeout: 0
		});
	}
};

D.Fetch = cls;
D.fetch = new cls();

export default cls;