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

class DOn extends Block {
  static template = html`
    <div d-on(click)="{onClick()}"/>
  `;

  afterRender() {
    app = this;
  }
}

Block.block('DOn', DOn);

export default () => {
  describe('d-on', () => {
    before(() => {
      initApp(htmlScopeless`<DOn/>`, container);
    });

    it('should call the expression every time the event is dispatched', (done) => {
      app.onClick = () => {
        done();
      };

      container
        .find('div')
        .dispatch('click');
    });

    after(remove);
  });
};
