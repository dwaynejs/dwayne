import { Block, initApp, find, isNil } from './dwayne';
import AppTemplate from './templates/App.pug';
import Block1Template from './templates/Block1.pug';
import Block2Template from './templates/Block2.pug';

class Block1 extends Block {
  static template = Block1Template();
  static defaultArgs = {
    value: 'no caption'
  };
}

Block.block('App', AppTemplate());
Block.block('Block1', Block1);
Block.block('Block2', Block2Template());
Block.mixin('html', (newValue, oldValue, mixin) => {
  mixin.elem.html(isNil(newValue) ? '' : `${ newValue }`);
});
initApp('App', find('.root'));
