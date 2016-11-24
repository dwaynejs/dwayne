/**
 * @module Block
 * @private
 * @mixin
 * @description Exports Block class.
 */

import { Arr } from './Arr';
import { find, doc, Elem } from './Elem';
import { Super } from './Super';
import {
  iterate, defineProperties, validate,
  isFunction, isNil
} from './helpers';
import markupToJSON from './helpers/markupToJSON';

/**
 * @callback Watcher
 * @param {*} newValue - New value.
 * @param {*} oldValue - Old value.
 */

const blocks = {};
const isPrototypeOf = {}.isPrototypeOf;
const tagName = /^[a-z][a-z\-_.:!@#\$%\^&*()\[\]{}\\='"]*$/i;
const { document } = global;
const svgNS = 'http://www.w3.org/2000/svg';
let evalMode;
let getting;

/**
 * @class Block
 * @public
 * @param {Object} opts - Element options.
 * @returns {Block} Instance of Block.
 * @description Class for dynamic templating.
 *
 * @example
 * import { D, Block, initApp, registerBlock } from 'dwayne';
 *
 * class App extends Block {
 *   static template = '<Hello text="{text}"/>';
 *
 *   constructor(args, children) {
 *     super(args, children);
 *
 *     this.text = 'world (0)';
 *     this.times = 0;
 *
 *     this.setInterval();
 *   }
 *
 *   setInterval() {
 *     D(1000).interval(() => {
 *       this.text = `world (${ ++this.times })`;
 *     });
 *   }
 * }
 *
 * class Hello extends Block {
 *   static template = 'Hello, <d-text value="{args.text}"/>!';
 * }
 *
 * Block.App = App;
 * Block.Hello = Hello;
 *
 * initApp();
 */
class Block {
  /**
   * @member {Boolean} [Block.collapseWhiteSpace = true]
   * @type {Boolean}
   * @public
   * @description If the whitespace between html elements and
   * in the start and the end inside the tag should be omitted during parsing.
   */
  static collapseWhiteSpace = true;

  /**
   * @member {Object} [Block.defaultArgs = true]
   * @type {Object}
   * @public
   * @description Provide default args if that args may not appear in the args
   * (using "d-rest") but you use them in your template and want them to be watched.
   */
  static defaultArgs = {};

  constructor(opts) {
    const {
      args: originalArgs,
      children,
      parent,
      elems
    } = opts;
    const watchersToRemove = new Arr([]);

    Object.defineProperties(this, {
      /**
       * @member {Block} Block#$
       * @type {Block}
       * @public
       * @description This.
       */
      $: {
        value: this
      },

      /**
       * @member {Object} Block#$$
       * @type {Object}
       * @protected
       * @property {Object} args - Private args scope.
       * @property {Arr} children - Child blocks.
       * @property {Object} elems - Elements connected to the block.
       * @property {Elem} elems.parent - Parent element.
       * @property {Elem} elems.start - Start comment block.
       * @property {Elem} elems.end - End comment block.
       * @property {Elem} elems.content - Content elements.
       * @property {Function} evaluate - Evaluate function.
       * @property {Object} global - Private global scope.
       * @property {Object} locals - Private locals scope.
       * @property {Arr} watchersToRemove - Watchers to remove before removing element.
       */
      $$: {
        value: {
          originalArgs,
          parent,
          children: new Arr([]),
          elems,
          watchersToRemove,
          evaluate: (expression, onChange, instance) => {
            /* eslint no-new-func: 0 */
            const { watchersToRemove } = instance.$$;
            const func = new Function('', `
              with (document.DwayneStore) {
                try {
                  $$.expr = eval($$.expr);
                  return $$.expr;
                } catch (err) {}
              }
            `);

            return evaluate.call(this);

            function evaluate() {
              evalMode = true;
              getting = new Arr([]);
              this.$$.expr = expression;
              document.DwayneStore = this;

              const result = func();

              getting.forEach((watchers) => {
                const watcher = () => {
                  onChange(evaluate.call(this));
                };
                const watcherBlock = {
                  watcher,
                  watchers
                };

                watcher.onRemove = () => {
                  const index = watchersToRemove.indexOf(watcherBlock);

                  if (index !== -1) {
                    watchersToRemove.splice(index, 1);
                  }
                };

                watchersToRemove.push(watcherBlock);
                watchers.push(watcher);
              });

              evalMode = false;
              getting = new Arr([]);
              this.$$.expr = null;
              document.DwayneStore = null;

              return result;
            }
          }
        }
      }
    });

    const args = new Super(originalArgs).map((value, arg) => {
      if (!/^\{|\}$/.test(value)) {
        return value;
      }

      return parent.$$.evaluate(value.replace(/^\{|\}$/g, ''), (value) => {
        this.args[arg] = value;
      }, this);
    }).$;

    this.args = args;
    this.children = children || new Arr([]);
    this.global = parent ? Object.create(parent.global) : {};

    new Super(this)
      .proto()
      .forEach((func, prop) => {
        this[prop] = func;
      });

    elems.start.$[0].DwayneBlock = this;
    elems.end.$[0].DwayneBlock = this;

    if (parent) {
      parent.$$.children.push(this);
    }
  }

  afterConstruct() {}

  beforeRemove() {}

  /**
   * @method Block#remove
   * @public
   * @description Method fot forcing the block to be removed. Calls
   * remove method for all of its child blocks and calls beforeRemove function.
   */
  remove() {
    const {
      parent,
      children,
      elems: {
        start,
        content,
        end
      },
      watchersToRemove
    } = this.$$;

    watchersToRemove.forEach(({ watcher, watchers }) => {
      const index = watchers.indexOf(watcher);

      if (index !== -1) {
        watchers.splice(index, 1);
      }
    });

    children.forEach((child) => {
      child.remove();
    });

    try {
      this.beforeRemove();
    } catch (err) {
      console.error('Uncaught error in beforeRemove:', err);
    }

    if (parent) {
      const index = parent.$$.children.indexOf(this);

      if (index !== -1) {
        parent.$$.children.splice(index, 1);
      }
    }

    new Elem([
      start,
      content,
      end
    ]).remove();
  }

  /**
   * @method Block#watchArgs
   * @public
   * @param {String} arg - Arg to watch.
   * @param {Watcher} watcher - Called when watched args are changed.
   */
  watchArgs(arg, watcher) {
    validate([arg, watcher], ['string', 'function'], 'Block#watchArgs');

    this.$$.args[arg].watchers.perm.push(watcher);
  }

  /**
   * @method Block#watchLocals
   * @public
   * @param {String} local - Local variable to watch.
   * @param {Watcher} watcher - Called when watched locals are changed.
   */
  watchLocals(local, watcher) {
    validate([local, watcher], ['string', 'function'], 'Block#watchLocals');

    this.$$.locals[local].watchers.perm.push(watcher);
  }
}

class DElements extends Block {
  afterConstruct() {
    this.watchArgs('value', (value) => {
      const {
        children,
        elems: {
          start,
          content,
          end,
          parent
        }
      } = this.$$;
      let elem = start;

      children.forEach((child) => {
        child.remove();
      });
      content.remove();

      this.$$.children = new Arr([]);

      (value || new Arr([])).forEach((child) => {
        const {
          name,
          attrs,
          children
        } = child;

        createBlock(null, name, child, elem, parent, attrs, children, this);
      });

      const newContent = new Elem();

      while ((elem = elem.next()).$[0] !== end.$[0]) {
        newContent.add(elem);
      }

      this.$$.elems.content = newContent;
    });
  }
}

class DText extends Block {
  static template = '<d-elements value="{[{ name: \'#text\', value: args.value}]}"/>';
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

Object.defineProperties(Block, {
  'd-elements': {
    value: DElements,
    enumerable: true
  },
  'd-text': {
    value: DText,
    enumerable: true
  }
});

function initApp() {
  const root = find('d-root').first();

  if (!root.length) {
    throw new Error('No d-root element is found! (initApp)');
  }

  iterate(Block, (block, name) => {
    if (name === 'collapseWhiteSpace' || name === 'defaultArgs') {
      return;
    }

    if (!isFunction(block)) {
      console.warn(`Block "${ name }" is not a function and will not be registered (initApp)`);

      return;
    }

    if (!tagName.test(name)) {
      console.warn(`Name "${ name }" is not allowed so the block will not be registered (initApp)`);

      return;
    }

    if (!isInstanceOfBlock(block)) {
      console.warn(`Block "${ name }" does not extends Block so the block will not be registered (initApp)`);

      return;
    }

    blocks[name] = block;

    defineProperties(block, {
      _html: markupToJSON(`${ block.template || '' }`, block.collapseWhiteSpace)
    });
  });

  const block = root.attr('block');

  if (!blocks[block]) {
    throw new Error(`No "${ block }" block is registered! (initApp)`);
  }

  const replacement = doc.createComment(' d-root: start ');

  replacement.add(doc.createComment(' d-root: end '));

  root.replace(replacement);

  createBlock(blocks[block], block, null, replacement.first(), root.parent(), {}, null);
}

function createBlock(Block, name, node, after, parent, args, children, parentBlock) {
  const elem = parent.prop('namespaceURI') === svgNS
    ? doc.svg()
    : new Elem(doc.template().$[0].content);

  if (!Block) {
    const {
      name,
      value,
      block,
      children
    } = node;
    const element = elem.create(name);
    const realParentBlock = block || parentBlock;

    const attrs = new Super(args).map((value, arg) => {
      if (!/^\{|\}$/.test(value)) {
        return value;
      }

      return realParentBlock.$$.evaluate(value.replace(/^\{|\}$/g, ''), (value) => {
        element.attr(arg, value);
      }, parentBlock);
    }).$;

    if (!isNil(value)) {
      element.text(value);
    }

    if (attrs) {
      element.attr(attrs);
    }

    if (children) {
      children.forEach((child) => {
        const {
          name: childName,
          attrs,
          children
        } = child;
        const parent = name === 'template'
          ? new Elem(element.prop('content'))
          : element;

        createBlock(
          blocks[childName], childName, child, parent.lastChild(),
          parent, attrs, children, realParentBlock
        );
      });
    }

    if (after.length) {
      element.insertAfter(after);
    } else {
      element.into(parent);
    }

    return;
  }

  (children || new Arr([])).forEach((child) => {
    child.block = parentBlock;
  });

  const blockInstance = new Block({
    args,
    children,
    parent: parentBlock,
    elems: {
      start: doc.createComment(` ${ name }: start `),
      end: doc.createComment(` ${ name }: end `),
      parent
    }
  });

  const html = name === 'd-elements'
    ? blockInstance.args.value || new Arr([])
    : deepCloneChildren(Block._html, {});
  const {
    $$,
    args: Args,
    global,
    ...locals
  } = blockInstance;
  const eventualArgs = {
    ...Args,
    ...Block.defaultArgs
  };

  delete locals.$;
  delete locals.$$;

  $$.args = constructPrivateScope(eventualArgs);
  $$.locals = constructPrivateScope(locals);
  $$.global = constructPrivateScope(global);

  constructPublicScope(Args, eventualArgs, blockInstance.$$.args);
  constructPublicScope(global, global, blockInstance.$$.global);
  constructPublicScope(blockInstance, locals, blockInstance.$$.locals);

  try {
    blockInstance.afterConstruct();
  } catch (err) {
    console.error('Uncaught error in afterConstruct:', err);
  }

  // console.log(blockInstance);

  html.forEach((child) => {
    const {
      name,
      attrs,
      children
    } = child;

    createBlock(
      blocks[name], name, child, elem.lastChild(),
      elem, attrs, children, blockInstance
    );
  });

  const elems = $$.elems.content = elem.children();
  const block = new Elem([
    $$.elems.start,
    elems,
    $$.elems.end
  ]);

  if (after.length) {
    block.insertAfter(after);
  } else {
    block.into(parent);
  }
}

function deepCloneChildren(children, parent) {
  return children.map((child) => {
    const {
      name,
      attrs,
      value,
      children
    } = child;
    const newChild = {
      name,
      value,
      attrs: { ...attrs }
    };

    if (children) {
      newChild.children = deepCloneChildren(children, newChild);
    }

    return newChild;
  });
}

function isInstanceOfBlock(block) {
  return isPrototypeOf.call(Block, block) && isPrototypeOf.call(Block.prototype, block.prototype);
}

function constructPrivateScope(object) {
  return new Super(object).map((value) => ({
    value,
    watchers: {
      temp: new Arr([]),
      perm: new Arr([])
    }
  })).$;
}

function constructPublicScope(scope, scopeValues, privateScope) {
  new Super(scope).define(new Super(scopeValues).map((value, key) => {
    const scope = privateScope[key];

    return {
      get() {
        if (evalMode) {
          if (getting.indexOf(scope.watchers.temp) === -1) {
            getting.push(scope.watchers.temp);
          }
        }

        return scope.value;
      },
      set(value) {
        if (value === scope.value) {
          return;
        }

        const oldTempWatchers = scope.watchers.temp;
        const oldValue = scope.value;

        scope.watchers.temp = new Arr([]);
        scope.value = value;

        oldTempWatchers.forEach((watcher) => {
          watcher.onRemove();
          watcher();
        });
        scope.watchers.perm.forEach((watcher) => {
          watcher(value, oldValue);
        });
      }
    };
  }).$);
}

export { Block, Mixin, initApp };
