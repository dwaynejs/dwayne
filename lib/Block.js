/**
 * @module Block
 * @private
 * @mixin
 * @description Exports Block class.
 */

import { find } from './Elem';
import { Super } from './Super';
import { defineProperties, isString } from './helpers';
import markupToJSON from './helpers/markupToJSON';

/**
 * @typedef {Object} BlockConfig
 * @property {Boolean} [collapseWhiteSpace = true] - If the whitespace between html
 * elements and in the start and the end inside the tag should be omitted during parsing.
 */

const blocks = {};

/**
 * @class Block
 * @public
 * @param {Object} args - Element arguments.
 * @returns {Block} Instance of Block.
 * @description Class for dynamic templating.
 *
 * @example
 * import { D, Block, initApp, registerBlock } from 'dwayne';
 *
 * class App extends Block {
 *   static Name = 'App';
 *   static template = '<Hello text="world"/>';
 *
 *   constructor(args) {
 *     super(args);
 *
 *     this.locals = {
 *       text: 'world (0)',
 *       times: 0
 *     };
 *
 *     this.setInterval();
 *   }
 *
 *   setInterval() {
 *     D(1000).interval(() => {
 *       this.locals.text = `world (${ ++this.locals.times })`;
 *     });
 *   }
 * }
 *
 * class Hello extends Block {
 *   static Name = 'Hello';
 *   static template = 'Hello, <d-text value="{args.text}"/>!';
 * }
 *
 * registerBlock(App);
 * registerBlock(Hello);
 *
 * initApp('App');
 */
class Block {
  /**
   * @member {Boolean} [Block.collapseWhiteSpace = true]
   * @type {Boolean}
   * @description If the whitespace between html elements and
   * in the start and the end inside the tag should be omitted during parsing.
   */
  static collapseWhiteSpace = false;

  constructor(args) {
    this.args = args;
    this.locals = {};

    new Super(this)
      .proto()
      .forEach((func, prop) => {
        this[prop] = func;
      });
  }
}

class Mixin {
  static evaluate = true;

  evaluate() {

  }

  constructor(props) {
    this._value = props.value;
    this.elem = props.elem;
    this.type = props.type;

    if (new Super(this).proto().$.constructor.evaluate) {
      this.value = this.evaluate();
    }
  }
}

function initApp(component) {
  const root = find('d-root').first();

  if (!root.length) {
    throw new Error('No d-root element is found! (initApp)');
  }

  const block = root.attr('block');

  if (!blocks[block]) {
    throw new Error(`No "${ block }" is registered! (initApp)`);
  }
}

function registerBlock(block) {
  const { Name } = block;

  if (!isString(Name)) {
    throw new Error('Block has to have a string Name parameter! (registerBlock)');
  }

  blocks[Name] = block;

  defineProperties(block, {
    _html: markupToJSON(`${ block.template || '' }`, block.collapseWhiteSpace)
  });
}

function registerMixin() {

}

export { Block, Mixin, initApp };
