import Class from './';
const assert = require('assert');

export default () => {
	describe('it should test D.Promise.prototype.[methods]', () => {
		describe('.constructor()', () => {
			it('should return new Promise, that is instantly resolved', (done) => {
				new Class((resolve) => resolve()).then(() => done()).catch(done);
			});
			it('should return new Promise, that is instantly rejected', (done) => {
				new Class((resolve, reject) => reject()).then(done).catch(() => done());
			});
			it('should return new Promise, that is resolved in 50ms', (done) => {
				new Class((resolve) => {
					setTimeout(resolve, 50);
				}).then(() => done()).catch(done);
			});
			it('should return new Promise, that should be resolved before it\'s rejected', (done) => {
				new Class((resolve, reject) => {
					setTimeout(resolve, 99);
					setTimeout(reject, 100, new Error('Rejected first'));
				}).then(() => done()).catch(done);
			});
			it('should resolve nested promises', (done) => {
				const unique = {};

				new Class((resolve) => resolve(Promise.resolve(unique)))
					.then((value) => {
						assert.strictEqual(value, unique);

						done();
					})
					.catch(done);
			});
		});
		describe('static .all()', () => {
			it('should return resolved promise with array of resolved values', (done) => {
				const unique1 = {};
				const unique2 = {};
				const unique3 = {};

				Promise.all([
					Promise.resolve(unique1),
					Promise.resolve(unique2),
					Promise.resolve(unique3)
				]).then(([value1, value2, value3]) => {
					assert.strictEqual(value1, unique1);
					assert.strictEqual(value2, unique2);
					assert.strictEqual(value3, unique3);

					done();
				}).catch(done);
			});
		});
		// TODO: static .all()
		// TODO: static .race()
		// TODO: static .resolve()
		// TODO: static .reject()
		// TODO: .then()
		// TODO: .catch()
	});
};