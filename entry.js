import { Block, initApp, find } from './dwayne';

class App extends Block {
  static template = `
    <form>
      <input d-value="a"/>
      <br/>
      <input d-value="b"/>
      <div>{'a: "' + a + '"'}</div>
      <div>{'b: "' + b + '"'}</div>
      <button type="reset">Reset</button>
    </form>
  `;

  a = '';
  b = '';
}

Block.register('App', App);

initApp('App', find('.root'));
