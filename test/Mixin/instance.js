import { strictEqual } from 'assert';
import { Block, Mixin, initApp, removeApp, doc } from '../../src/index';

const error = new Error();

class AfterUpdateError extends Block {
  static template = html`
    <div AfterUpdateErrorMixin/>
  `;
}

class BeforeRemoveError extends Block {
  static template = html`
    <div BeforeRemoveErrorMixin/>
  `;
}

class AfterUpdateMixin extends Mixin {}

class AfterUpdateErrorMixin extends Mixin {}

class BeforeRemoveMixin extends Mixin {}

class BeforeRemoveErrorMixin extends Mixin {}

class DefaultAfterUpdateMixin extends Mixin {}

class ToStringMixin extends Mixin {}

Block.mixin('AfterUpdateMixin', AfterUpdateMixin);
Block.mixin('AfterUpdateErrorMixin', AfterUpdateErrorMixin);
Block.mixin('BeforeRemoveMixin', BeforeRemoveMixin);
Block.mixin('BeforeRemoveErrorMixin', BeforeRemoveErrorMixin);
Block.mixin('DefaultAfterUpdateMixin', DefaultAfterUpdateMixin);
Block.mixin('ToStringMixin', ToStringMixin);

export default () => {
  const oldConsoleError = console.error;

  afterEach(() => {
    console.error = oldConsoleError;
  });

  describe('afterUpdate()', () => {
    it('should call afterUpdate on construct and on a change', (done) => {
      let times = 0;
      let app;

      class AfterUpdate extends Block {
        static template = html`
          <div AfterUpdateMixin="{value}" DefaultAfterUpdateMixin/>
        `;

        value = 1;

        afterConstruct() {
          app = this;
        }
      }

      AfterUpdateMixin.prototype.afterUpdate = (value, oldValue) => {
        if (++times === 1) {
          try {
            strictEqual(value, 1);
            strictEqual(oldValue, undefined);

            app.value = 2;
          } catch (err) {
            done(err);
          }
        } else if (times === 2) {
          try {
            strictEqual(value, 2);
            strictEqual(oldValue, 1);

            done();
          } catch (err) {
            done(err);
          }
        } else {
          done(new Error('Called more than two times'));
        }
      };

      initApp(AfterUpdate, doc.create('div'));
    });
    it('should log error afterUpdate', (done) => {
      AfterUpdateErrorMixin.prototype.afterUpdate = () => {
        throw error;
      };
      console.error = (message, e) => {
        try {
          strictEqual(message, 'Uncaught error in AfterUpdateErrorMixin#afterUpdate:');
          strictEqual(e, error);

          done();
        } catch (err) {
          done(err);
        }
      };

      initApp(AfterUpdateError, doc.create('div'));
    });
  });
  describe('beforeRemove()', () => {
    it('should call beforeRemove on remove with true argument when removing the element as well', (done) => {
      class BeforeRemove extends Block {
        static template = html`
          <div BeforeRemoveMixin/>
        `;
      }

      BeforeRemoveMixin.prototype.beforeRemove = (isElementRemoved) => {
        try {
          strictEqual(isElementRemoved, true);

          done();
        } catch (err) {
          done(err);
        }
      };

      const container = doc.create('div');

      initApp(BeforeRemove, container);
      removeApp(container);
    });
    it('should call beforeRemove on remove with false argument when not removing the element', (done) => {
      let app;

      class BeforeRemove extends Block {
        static template = html`
          <div d-rest="{rest}"/>
        `;

        rest = {
          BeforeRemoveMixin: 1
        };

        afterRender() {
          app = this;
        }
      }

      BeforeRemoveMixin.prototype.beforeRemove = (isElementRemoved) => {
        try {
          strictEqual(isElementRemoved, false);

          done();
        } catch (err) {
          done(err);
        }
      };

      initApp(BeforeRemove, doc.create('div'));

      app.rest = {};
    });
    it('should log error beforeRemove', (done) => {
      BeforeRemoveErrorMixin.prototype.beforeRemove = () => {
        throw error;
      };
      console.error = (message, e) => {
        try {
          strictEqual(message, 'Uncaught error in BeforeRemoveErrorMixin#beforeRemove:');
          strictEqual(e, error);

          done();
        } catch (err) {
          done(err);
        }
      };

      const container = doc.create('div');

      initApp(BeforeRemoveError, container);
      removeApp(container);
    });
  });
  describe('toString()', () => {
    it('should return "[object Mixin]"', (done) => {
      class ToString extends Block {
        static template = html`
          <div ToStringMixin/>
        `;
      }

      ToStringMixin.prototype.afterUpdate = function () {
        try {
          strictEqual(this.toString(), '[object Mixin]');

          done();
        } catch (err) {
          done(err);
        }
      };

      initApp(ToString, doc.create('div'));
    });
  });
};
