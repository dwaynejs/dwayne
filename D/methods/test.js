import checkTypeMethodsTests from './check-type-methods/test';
const assert = require('assert');

export default () => {
	describe('it should test D.[methods]', () => {
		checkTypeMethodsTests();
	});
};