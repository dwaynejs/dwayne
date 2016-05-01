import Class from './';
const assert = require('assert');

export default () => {
	describe('it should test D.Promise.prototype.[methods]', () => {
		describe('constructor()', () => {
			it('should return new Promise, that is instantly resolved', (done) => {
				const unique = {};

				new Class((resolve) => resolve(unique))
					.then((value) => {
						assert.strictEqual(value, unique);

						done();
					})
					.catch(done);
			});
			it('should return new Promise, that is instantly rejected', (done) => {
				const unique = new Error();

				new Class((resolve, reject) => reject(unique))
					.then(done)
					.catch((err) => {
						assert.strictEqual(err, unique);

						done();
					});
			});
			it('should return new Promise, that is resolved in 50ms', (done) => {
				const unique = {};

				new Class((resolve) => {
					setTimeout(resolve, 50, unique);
				})
					.then((value) => {
						assert.strictEqual(value, unique);

						done();
					})
					.catch(done);
			});
			it('should return new Promise, that should be resolved before it\'s rejected', (done) => {
				const unique = {};

				new Class((resolve, reject) => {
					setTimeout(resolve, 99, unique);
					setTimeout(reject, 100, new Error());
				})
					.then((value) => {
						assert.strictEqual(value, unique);

						done();
					})
					.catch(done);
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
		describe('static all()', () => {
			it('should return resolved promise with array of resolved values', (done) => {
				const unique1 = {};
				const unique2 = {};
				const unique3 = {};

				Promise.all([
					Promise.resolve(unique1),
					Promise.resolve(unique2),
					Promise.resolve(unique3)
				])
					.then(([value1, value2, value3]) => {
						assert.strictEqual(value1, unique1);
						assert.strictEqual(value2, unique2);
						assert.strictEqual(value3, unique3);

						done();
					})
					.catch(done);
			});
			it('should return rejected promise, if one was rejected', (done) => {
				const unique1 = {};
				const unique2 = new Error();
				const unique3 = {};

				Promise.all([
					Promise.resolve(unique1),
					Promise.reject(unique2),
					Promise.resolve(unique3)
				])
					.then(done)
					.catch((err) => {
						assert.strictEqual(err, unique2);

						done();
					});
			});
		});
		describe('static race()', () => {
			it('should return resolved promise with first resolved value', (done) => {
				const unique1 = {};
				const unique2 = {};
				const unique3 = {};

				Promise.race([
					new Class((resolve) => setTimeout(resolve, 100, unique1)),
					new Class((resoove, reject) => setTimeout(reject, 101, unique2)),
					new Class((resolve) => setTimeout(resolve, 102, unique3))
				])
					.then((value1) => {
						assert.strictEqual(value1, unique1);

						done();
					})
					.catch(done);
			});
			it('should return rejected promise with first rejected value', (done) => {
				const unique1 = {};
				const unique2 = new Error();
				const unique3 = {};

				Promise.race([
					new Class((resolve) => setTimeout(resolve, 101, unique1)),
					new Class((resoove, reject) => setTimeout(reject, 100, unique2)),
					new Class((resolve) => setTimeout(resolve, 102, unique3))
				])
					.then(done)
					.catch((err) => {
						assert.strictEqual(err, unique2);

						done();
					});
			});
		});
		describe('static resolve()', () => {
			it('should return resolved promise with resolved value', (done) => {
				const unique = {};

				Promise.resolve(unique)
					.then((value) => {
						assert.strictEqual(value, unique);

						done();
					})
					.catch(done);
			});
			it('should return rejected promise with rejected value', (done) => {
				const unique = new Error();

				Promise.resolve(Promise.reject(unique))
					.then(done)
					.catch((err) => {
						assert.strictEqual(err, unique);

						done();
					});
			});
		});
		describe('static reject()', () => {
			it('should return rejected promise with rejected value', (done) => {
				const unique = new Error();

				Promise.reject(unique)
					.then(done)
					.catch((err) => {
						assert.strictEqual(err, unique);

						done();
					});
			});
		});
		describe('catch()', () => {
			it('should return new promise with rejected value', (done) => {
				const unique = new Error();

				Promise.reject(unique)
					.then(done)
					.catch((err) => {
						assert.strictEqual(err, unique);

						done();
					});
			});
			it('should return new promise with rejected value, that was threw in then', (done) => {
				const unique = new Error();

				Promise.resolve()
					.then(() => {
						throw unique;
					})
					.then(done)
					.catch((err) => {
						assert.strictEqual(err, unique);

						done();
					});
			});
		});
		describe('then()', () => {
			it('should return new promise with resolved value', (done) => {
				const unique = new Error();

				Promise.resolve(unique)
					.then((value) => {
						assert.strictEqual(value, unique);

						done();
					})
					.catch(done);
			});
			it('should return new promise with resolved value, that was resolved in catch', (done) => {
				const unique = new Error();

				Promise.reject(unique)
					.then(done)
					.catch((err) => {
						return Promise.resolve(err);
					})
					.then((value) => {
						assert.strictEqual(value, unique);

						done();
					})
					.catch(done);
			});
		});
	});
};