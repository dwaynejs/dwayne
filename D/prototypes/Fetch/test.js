import Class from './module';
const assert = require('assert');

export default () => {
  describe('it should test D.String.prototype.[methods]', () => {
    describe('after()', () => {
      it('should insert middleware', () => {
        const fetch = new Class();
        const middleware = () => {};

        fetch.after(middleware);

        assert.strictEqual(fetch.$.after.length, 1);
      });
    });
    // TODO: .after()
    // TODO: .before()
    // TODO: .config()
    // TODO: .delete()
    // TODO: .get()
    // TODO: .head()
    // TODO: .headers()
    // TODO: .instance()
    // TODO: .patch()
    // TODO: .post()
    // TODO: .put()
    // TODO: .request()
  });
};
