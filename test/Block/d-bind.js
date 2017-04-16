import { strictEqual } from 'assert';
import { Block, doc, initApp, removeApp } from '../../src';

let app;
let block;
const container = doc.create('div');
const remove = () => {
  removeApp(container);

  app = null;
  block = null;
};

class DBind extends Block {
  static template = html`
    <div d-bind(click)="{onClick}"/>
  `;

  afterRender() {
    app = this;
  }
}

Block.block('DBind', DBind);

export default () => {
  describe('d-bind', () => {
    before(() => {
      initApp(htmlScopeless`<DBind/>`, container);
    });

    it('should bind event listeners', (done) => {
      app.onClick = (e) => {
        try {
          strictEqual(e.type, 'click');

          done();
        } catch (err) {
          done(err);
        }
      };

      container
        .find('div')
        .dispatch('click');
    });

    after(remove);
  });
};
