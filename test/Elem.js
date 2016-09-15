import { deepStrictEqual, strictEqual } from 'assert';
import global from '../lib/constants/global';
import Elem, { find, px, parseHTML } from '../lib/Elem';
import Super from '../lib/Super';
import Num from '../lib/Num';
import elements from '../lib/constants/elements';

const nativeDocument = global.document;
const nativeBody = nativeDocument.body;
const nativeHead = nativeDocument.head;

describe('it should test Elem#', () => {
  describe('add()', () => {
    it('should add elements from arguments', () => {
      const elem = [
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div')
      ];
      const elem1 = nativeDocument.createElement('div');
      const elem2 = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      wrap.add(elem1, elem2);

      strictEqual(wrap.length, 5);
      strictEqual(wrap.$[3], elem1);
      strictEqual(wrap.$[4], elem2);
    });
    it('should not duplicate elements', () => {
      const elem1 = nativeDocument.createElement('div');
      const elem2 = nativeDocument.createElement('div');
      const elem = [
        elem1,
        elem2,
        nativeDocument.createElement('div')
      ];
      const wrap = new Elem(elem);

      wrap.add(elem1, elem2);

      strictEqual(wrap.length, 3);
    });
    it('should support Elem syntax', () => {
      const elem1 = nativeDocument.createElement('div');
      const elem2 = nativeDocument.createElement('div');
      const elem = [
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div')
      ];
      const wrap = new Elem(elem);
      const wrap1 = new Elem(elem1);
      const wrap2 = new Elem(elem2);

      wrap.add(wrap1, wrap2);

      strictEqual(wrap.length, 5);
      strictEqual(wrap.$[3], elem1);
      strictEqual(wrap.$[4], elem2);
    });
    it('should support selector syntax', () => {
      const elem1 = nativeDocument.createElement('div');
      const elem2 = nativeDocument.createElement('div');
      const elem = [
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div')
      ];
      const wrap = new Elem(elem);

      elem1.className = 'foo';
      elem2.className = 'foo';

      nativeBody.appendChild(elem1);
      nativeBody.appendChild(elem2);

      wrap.add('body .foo');

      strictEqual(wrap.length, 5);
      strictEqual(wrap.$[3], elem1);
      strictEqual(wrap.$[4], elem2);

      elem1.remove();
      elem2.remove();
    });
  });
  describe('addClass()', () => {
    it('should add classes from arguments', () => {
      const elem = [
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div')
      ];
      const wrap = new Elem(elem);

      wrap
        .addClass('foo', 'bar', 'baz')
        .forEach((elem) => {
          strictEqual(elem.classList.contains('foo'), true);
          strictEqual(elem.classList.contains('bar'), true);
          strictEqual(elem.classList.contains('baz'), true);
        });
    });
  });
  describe('addHTML()', () => {
    it('should add html to the end', () => {
      const elem = [
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div')
      ];
      const wrap = new Elem(elem);

      wrap
        .forEach((elem) => {
          elem.innerHTML = '123';
        })
        .addHTML('<div></div>')
        .forEach((elem) => {
          strictEqual(elem.innerHTML, '123<div></div>');
        });
    });
  });
  describe('addText()', () => {
    it('should add text to the end', () => {
      const elem = [
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div')
      ];
      const wrap = new Elem(elem);

      wrap
        .forEach((elem) => {
          elem.innerHTML = '123';
        })
        .addText('<div></div>')
        .forEach((elem) => {
          strictEqual(elem.innerHTML, '123&lt;div&gt;&lt;/div&gt;');
        });
    });
  });
  describe('addRule()', () => {
    it('should add rule to the first style element in the set', () => {
      const style = nativeDocument.createElement('style');
      const elem = nativeDocument.createElement('div');
      const styleWrap = new Elem(style);
      const elemWrap = new Elem(elem);

      elem.className = 'foo';

      nativeHead.appendChild(style);
      nativeBody.appendChild(elem);

      styleWrap.addRule('dwayne-style', '.foo', {
        margin: '2px 1px 3px'
      });

      const css = elemWrap.calcCSS();

      strictEqual(css.marginTop, '2px');
      strictEqual(css.marginRight, '1px');
      strictEqual(css.marginBottom, '3px');
      strictEqual(css.marginLeft, '1px');

      style.remove();
      elem.remove();
    });
  });
  describe('apply()', () => {
    it('should set id to the value from the string', () => {
      const elem = [
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div')
      ];
      const wrap = new Elem(elem);

      wrap
        .apply('#dwayne')
        .forEach((elem) => {
          strictEqual(elem.id, 'dwayne');
        });
    });
    it('should add class from the string', () => {
      const elem = [
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div')
      ];
      const wrap = new Elem(elem);

      wrap
        .apply('.dwayne')
        .forEach((elem) => {
          strictEqual(elem.classList.contains('dwayne'), true);
        });
    });
    it('should remove class from the string', () => {
      const elem = [
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div')
      ];
      const wrap = new Elem(elem);

      wrap
        .forEach((elem) => {
          elem.className = 'foo bar baz';
        })
        .apply('-.bar')
        .forEach((elem) => {
          strictEqual(elem.classList.contains('bar'), false);
        });
    });
    it('should remove css property from the string', () => {
      const elem = [
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div')
      ];
      const wrap = new Elem(elem);

      wrap
        .forEach((elem) => {
          elem.style.display = 'inline';
        })
        .apply('-@display')
        .forEach((elem) => {
          strictEqual(elem.style.display, '');
        });
    });
    it('should remove attribute from the string', () => {
      const elem = [
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div')
      ];
      const wrap = new Elem(elem);

      wrap
        .forEach((elem) => {
          elem.setAttribute('foo', 'bar');
        })
        .apply('-$foo')
        .forEach((elem) => {
          strictEqual(elem.hasAttribute('foo'), false);
        });
    });
    it('should set html to the value from the string', () => {
      const elem = [
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div')
      ];
      const wrap = new Elem(elem);

      wrap
        .apply('&(<div>123</div>)')
        .forEach((elem) => {
          strictEqual(elem.innerHTML, '<div>123</div>');
        });
    });
    it('should set text to the value from the string', () => {
      const elem = [
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div')
      ];
      const wrap = new Elem(elem);

      wrap
        .apply('*(dwayne text)')
        .forEach((elem) => {
          strictEqual(new Elem(elem).text(), 'dwayne text');
        });
    });
    it('should set css property from the string to the value from the string', () => {
      const elem = [
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div')
      ];
      const wrap = new Elem(elem);

      wrap
        .apply('@border-left(1px solid black !important)')
        .forEach((elem) => {
          strictEqual(new Elem(elem).css('border-left'), '1px solid black !important');
        });
    });
    it('should set css property from the string to the value from the string', () => {
      const elem = [
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div')
      ];
      const wrap = new Elem(elem);

      wrap
        .apply('@transform(translate(10px))')
        .forEach((elem) => {
          strictEqual(new Elem(elem).css('transform'), 'translate(10px)');
        });
    });
    it('should set attribute from the string to the value from the string', () => {
      const elem = [
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div')
      ];
      const wrap = new Elem(elem);

      wrap
        .apply('$dwayne(foo)')
        .forEach((elem) => {
          strictEqual(elem.getAttribute('dwayne'), 'foo');
        });
    });
    it('should add attribute from the string', () => {
      const elem = [
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div')
      ];
      const wrap = new Elem(elem);

      wrap
        .apply('$dwayne')
        .forEach((elem) => {
          strictEqual(elem.hasAttribute('dwayne'), true);
        });
    });
  });
  describe('attr()', () => {
    it('should return wrap of an object of attributes with no arguments', () => {
      const elem = [
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div')
      ];
      const wrap = new Elem(elem);

      wrap
        .forEach((elem) => {
          elem.setAttribute('attr', '123');
          elem.setAttribute('contentEditable', '');
        })
        .forEach((elem) => {
          deepStrictEqual(new Elem(elem).attr().$, {
            attr: '123',
            contenteditable: ''
          });
        });
    });
    it('should return value of an attribute with first string argument', () => {
      const elem = [
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div')
      ];
      const wrap = new Elem(elem);

      wrap
        .forEach((elem) => {
          elem.setAttribute('attr', '123');
          elem.setAttribute('contentEditable', '');
        })
        .forEach((elem) => {
          strictEqual(new Elem(elem).attr('attr'), '123');
          strictEqual(new Elem(elem).attr('contentEditable'), '');
        });
    });
    it('should support (attr, value) syntax', () => {
      const elem = [
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div')
      ];
      const wrap = new Elem(elem);

      wrap
        .attr('attr', '123')
        .forEach((elem) => {
          strictEqual(elem.getAttribute('attr'), '123');
        });
    });
    it('should support (attr, callback) syntax', () => {
      const elem = [
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div')
      ];
      const wrap = new Elem(elem);

      wrap
        .forEach((elem, index) => {
          elem.setAttribute('attr', index);
        })
        .attr('attr', (value) => +value + 10)
        .forEach((elem, index) => {
          strictEqual(elem.getAttribute('attr'), `${ (10 + index) }`);
        });
    });
    it('should support object property syntax', () => {
      const elem = [
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div')
      ];
      const wrap = new Elem(elem);

      wrap
        .attr({ attr: '123', contentEditable: '' })
        .forEach((elem) => {
          strictEqual(elem.getAttribute('attr'), '123');
          strictEqual(elem.getAttribute('contentEditable'), '');
        });
    });
  });
  describe('blob', () => {
    it('should return a blob promise with canvas context', (done) => {
      const elem = nativeDocument.createElement('canvas');
      const wrap = new Elem(elem);

      wrap
        .width(1)
        .height(1)
        .blob({ type: 'image/png' })
        .then((blob) => blob.readAs('buffer'))
        .then((buffer) => {
          deepStrictEqual(new Int8Array(buffer), new Int8Array([
            -119, 80, 78, 71, 13, 10, 26, 10, 0, 0,
            0, 13, 73, 72, 68, 82, 0, 0, 0, 1, 0, 0,
            0, 1, 8, 6, 0, 0, 0, 31, 21, -60, -119,
            0, 0, 0, 11, 73, 68, 65, 84, 24, 87, 99,
            96, 0, 2, 0, 0, 5, 0, 1, -86, -43, -56,
            81, 0, 0, 0, 0, 73, 69, 78, 68, -82, 66,
            96, -126
          ]));

          done();
        })
        .catch(done);
    });
    it('should return a blob promise with image context', (done) => {
      const elem = nativeDocument.createElement('img');
      const wrap = new Elem(elem);

      wrap
        .ref('/test/images/image.png')
        .blob({ type: 'image/png' })
        .then((blob) => blob.readAs('buffer'))
        .then((buffer) => {
          deepStrictEqual(new Int8Array(buffer), new Int8Array([
            -119, 80, 78, 71, 13, 10, 26, 10, 0, 0,
            0, 13, 73, 72, 68, 82, 0, 0, 0, 1, 0, 0,
            0, 1, 8, 6, 0, 0, 0, 31, 21, -60, -119,
            0, 0, 0, 11, 73, 68, 65, 84, 24, 87, 99,
            96, 0, 2, 0, 0, 5, 0, 1, -86, -43, -56,
            81, 0, 0, 0, 0, 73, 69, 78, 68, -82, 66,
            96, -126
          ]));

          done();
        })
        .catch(done);
    });
  });
  describe('calcCSS()', () => {
    it('should calculate css for the first element in the set', () => {
      const style = nativeDocument.createElement('style');
      const elem = nativeDocument.createElement('div');
      const styleWrap = new Elem(style);
      const elemWrap = new Elem(elem);

      elem.className = 'foo';

      nativeHead.appendChild(style);
      nativeBody.appendChild(elem);

      styleWrap.addRule('dwayne-style', '.foo', {
        margin: '2px 1px 3px'
      });

      const css = elemWrap.calcCSS();

      strictEqual(css.marginTop, '2px');
      strictEqual(css.marginRight, '1px');
      strictEqual(css.marginBottom, '3px');
      strictEqual(css.marginLeft, '1px');

      style.remove();
      elem.remove();
    });
  });
  describe('changeRule()', () => {
    it('should add rule to the first style element in the set', () => {
      const style = nativeDocument.createElement('style');
      const elem = nativeDocument.createElement('div');
      const styleWrap = new Elem(style);
      const elemWrap = new Elem(elem);

      elem.className = 'foo';

      nativeHead.appendChild(style);
      nativeBody.appendChild(elem);

      styleWrap.addRule('dwayne-style', '.foo', {
        margin: '2px 1px 3px'
      });

      styleWrap.changeRule('dwayne-style', {
        marginLeft: '4px',
        padding: '5px 6px 7px 8px'
      });

      const css = elemWrap.calcCSS();

      strictEqual(css.marginTop, '2px');
      strictEqual(css.marginRight, '1px');
      strictEqual(css.marginBottom, '3px');
      strictEqual(css.marginLeft, '4px');
      strictEqual(css.paddingTop, '5px');
      strictEqual(css.paddingRight, '6px');
      strictEqual(css.paddingBottom, '7px');
      strictEqual(css.paddingLeft, '8px');

      style.remove();
      elem.remove();
    });
  });
  describe('child()', () => {
    it('should return wrap of n-th child of the first element if argument is non-negative integer', () => {
      const elem1 = nativeDocument.createElement('div');
      const child1 = nativeDocument.createElement('div');
      const child2 = nativeDocument.createElement('div');
      const elem = [
        elem1,
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div')
      ];
      const wrap1 = new Elem(elem);
      const wrap2 = new Elem();

      elem1.appendChild(child1);
      elem1.appendChild(child2);

      strictEqual(wrap1.child(0).length, 1);
      strictEqual(wrap1.child(0).$[0], child1);
      strictEqual(wrap1.child(1).length, 1);
      strictEqual(wrap1.child(1).$[0], child2);
      strictEqual(wrap1.child(2).length, 0);
      strictEqual(wrap2.child(0).length, 0);
    });
    it('should support (element) syntax', () => {
      const elem1 = nativeDocument.createElement('div');
      const child = nativeDocument.createElement('div');
      const elem = [
        elem1,
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div')
      ];
      const wrap = new Elem(elem);

      wrap.child(child);

      strictEqual(elem1.contains(child), true);
    });
    it('should support (Elem) syntax', () => {
      const elem1 = nativeDocument.createElement('div');
      const child = nativeDocument.createElement('div');
      const elem = [
        elem1,
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div')
      ];
      const wrap = new Elem(elem);
      const childWrap = new Elem(child);

      wrap.child(childWrap);

      strictEqual(elem1.contains(child), true);
    });
    it('should support (selector) syntax', () => {
      const elem1 = nativeDocument.createElement('div');
      const child = nativeDocument.createElement('div');
      const elem = [
        elem1,
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div')
      ];
      const wrap = new Elem(elem);

      child.id = 'dwayne-child';
      nativeBody.appendChild(child);
      wrap.child('body #dwayne-child');

      strictEqual(elem1.contains(child), true);

      child.remove();
    });
  });
  describe('children()', () => {
    it('should return wrap of the children of the first element', () => {
      const elem1 = nativeDocument.createElement('div');
      const child1 = nativeDocument.createElement('div');
      const child2 = nativeDocument.createElement('div');
      const elem = [
        elem1,
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div')
      ];
      const wrap1 = new Elem(elem);
      const wrap2 = new Elem();

      elem1.appendChild(child1);
      elem1.appendChild(child2);

      const children1 = wrap1.children();
      const children2 = wrap2.children();

      strictEqual(children1.length, 2);
      strictEqual(children1.$[0], child1);
      strictEqual(children1.$[1], child2);
      strictEqual(children2.length, 0);
    });
  });
  describe('class()', () => {
    it('should return wrap of an array of classes with no arguments', () => {
      const elem = [
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div')
      ];
      const wrap = new Elem(elem);

      wrap
        .forEach((elem) => {
          elem.className = 'foo bar baz';
        })
        .forEach((elem) => {
          deepStrictEqual(new Elem(elem).class().$, ['foo', 'bar', 'baz']);
        });
    });
    it('should set className with more arguments', () => {
      const elem = [
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div')
      ];
      const wrap = new Elem(elem);

      wrap
        .class('foo bar baz')
        .forEach((elem) => {
          strictEqual(elem.className, 'foo bar baz');
        });
    });
  });
  describe('click()', () => {
    it('should click the element', (done) => {
      const elem = [
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div')
      ];
      const wrap = new Elem(elem);
      let fired = 0;

      wrap.on('click', doneAll);

      wrap.click();

      function doneAll() {
        if (++fired === 3) {
          done();
        }
      }
    });
  });
  describe('closest()', () => {
    it('should return a wrap of the set of closest parents that matches selector', () => {
      const child1 = nativeDocument.createElement('div');
      const child2 = nativeDocument.createElement('div');
      const child3 = nativeDocument.createElement('div');
      const parent1 = nativeDocument.createElement('div');
      const parent2 = nativeDocument.createElement('div');
      const parent3 = nativeDocument.createElement('div');
      const elem = [
        child1,
        child2,
        child3
      ];
      const wrap = new Elem(elem);

      parent3.className = 'foo';
      parent1.className = 'foo';
      child2.className = 'foo';
      parent1.appendChild(child2);
      parent2.appendChild(child3);
      parent3.appendChild(parent2);

      const closest = wrap.closest('.foo').$;

      strictEqual(closest[0], child2);
      strictEqual(closest[1], parent3);
    });
  });
  describe('contains', () => {
    it('should return true, if element contains another, and false if not', () => {
      const elem1 = nativeDocument.createElement('div');
      const elem2 = nativeDocument.createElement('div');
      const elem3 = nativeDocument.createElement('div');
      const elem4 = nativeDocument.createElement('div');
      const wrap1 = new Elem(elem1);
      const wrap2 = new Elem(elem2);
      const wrap3 = new Elem(elem3);
      const wrap4 = new Elem(elem4);

      elem1.appendChild(elem2);
      elem2.appendChild(elem3);
      
      strictEqual(wrap1.contains(elem2), true);
      strictEqual(wrap2.contains(elem3), true);
      strictEqual(wrap1.contains(elem4), false);
      strictEqual(wrap3.contains(elem4), false);
      strictEqual(wrap4.contains(elem3), false);
    });
    it('should support (selector) syntax', () => {
      const parent = nativeDocument.createElement('div');
      const child = nativeDocument.createElement('div');
      const wrap = new Elem(parent);
  
      parent.appendChild(child);
      child.id = 'foo';
      nativeBody.appendChild(parent);
      
      strictEqual(wrap.contains('#foo'), true);
      strictEqual(wrap.contains('.foo'), false);
      
      parent.remove();
    });
    it('should support (Elem) syntax', () => {
      const parent = nativeDocument.createElement('div');
      const child = nativeDocument.createElement('div');
      const parentWrap = new Elem(parent);
      const childWrap = new Elem(parent);
  
      parent.appendChild(child);
      
      strictEqual(parentWrap.contains(childWrap), true);
    });
  });
  describe('create()', () => {
    it('should return wrap of the set of new elements inside context of type of first argument', () => {
      const elem = [
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div')
      ];
      const wrap = new Elem(elem);
      const input = wrap.create('input');

      input.forEach((input, index) => {
        strictEqual(input.parentElement, wrap.$[index]);
        strictEqual(input.tagName.toLowerCase(), 'input');
      });
    });
    it('should use second argument as applied expression', () => {
      const elem = [
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div')
      ];
      const wrap = new Elem(elem);
      const input = wrap.create('input', '#id .foo');

      input.forEach((input, index) => {
        strictEqual(input.parentElement, wrap.$[index]);
        strictEqual(input.tagName.toLowerCase(), 'input');
        strictEqual(input.id, 'id');
        strictEqual(input.className, 'foo');
      });
    });
  });
  describe('[html-element]()', () => {
    it('should return wrap of a new element inside context', () => {
      new Super(elements).forEach((type) => {
        const elem = [
          nativeDocument.createElement('div'),
          nativeDocument.createElement('div'),
          nativeDocument.createElement('div')
        ];
        const wrap = new Elem(elem);
        const created = wrap[type]();

        created.forEach((elem, index) => {
          strictEqual(elem.parentElement, wrap.$[index]);
          strictEqual(elem.tagName.toLowerCase(), type);
        });
      });
    });
    it('should use first argument as applied expression', () => {
      new Super(elements).forEach((type) => {
        const elem = [
          nativeDocument.createElement('div'),
          nativeDocument.createElement('div'),
          nativeDocument.createElement('div')
        ];
        const wrap = new Elem(elem);
        const created = wrap[type](`.${ type }`);

        created.forEach((elem, index) => {
          strictEqual(elem.parentElement, wrap.$[index]);
          strictEqual(elem.tagName.toLowerCase(), type);
          strictEqual(elem.className, type);
        });
      });
    });
  });
  describe('css()', () => {
    it('should return wrap of an object of css properties with no arguments', () => {
      const elem1 = nativeDocument.createElement('div');
      const elem = [
        elem1,
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div')
      ];
      const wrap1 = new Elem(elem);
      const wrap2 = new Elem();

      elem1.style.display = 'inline';
      elem1.style.textAlign = 'center';
      elem1.style.border = '1px solid black';

      deepStrictEqual(wrap1.css().$, {
        display: 'inline',
        textAlign: 'center',
        border: '1px solid black'
      });
      deepStrictEqual(wrap2.css().$, {});
    });
    it('should return value of css property with first string argument', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      elem.style.setProperty('margin-left', '1px', 'important');
      elem.style.setProperty('margin-right', '2px', '');

      strictEqual(wrap.css('margin-left'), '1px !important');
      strictEqual(wrap.css('marginRight'), '2px');
    });
    it('should support (prop, value) syntax', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      wrap.css('margin-left', '1px !important');
      wrap.css('marginRight', '2px');

      strictEqual(elem.style.getPropertyValue('margin-left'), '1px');
      strictEqual(elem.style.getPropertyPriority('margin-left'), 'important');
      strictEqual(elem.style.getPropertyValue('margin-right'), '2px');
      strictEqual(elem.style.getPropertyPriority('margin-right'), '');
    });
    it('should support (prop, callback) syntax', () => {
      const elem = [
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div')
      ];
      const wrap = new Elem(elem);

      wrap
        .forEach((elem, index) => {
          elem.style.setProperty('margin-left', `${ index }px`, '');
        })
        .css('margin-left', (value) => `${ px(value) + 10 }px`)
        .forEach((elem, index) => {
          strictEqual(elem.style.marginLeft, `${ index + 10 }px`);
        });
    });
    it('should support object property syntax', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      wrap.css({
        'margin-left': '1px !important',
        marginRight: '2px'
      });

      strictEqual(elem.style.getPropertyValue('margin-left'), '1px');
      strictEqual(elem.style.getPropertyPriority('margin-left'), 'important');
      strictEqual(elem.style.getPropertyValue('margin-right'), '2px');
      strictEqual(elem.style.getPropertyPriority('margin-right'), '');
    });
  });
  describe('data()', () => {
    it('should return wrap of an dataset object with no arguments', () => {
      const elem = [
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div')
      ];
      const wrap = new Elem(elem);

      wrap
        .forEach((elem) => {
          elem.setAttribute('data-dwayne-attr', '123');
          elem.setAttribute('data-dwayne-power', 'Infinity');
        })
        .forEach((elem) => {
          deepStrictEqual(new Elem(elem).data().$, {
            dwayneAttr: '123',
            dwaynePower: 'Infinity'
          });
        });
    });
    it('should return value of dataset parameter', () => {
      const elem = [
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div')
      ];
      const wrap = new Elem(elem);

      wrap
        .forEach((elem) => {
          elem.setAttribute('data-dwayne-attr', '123');
          elem.setAttribute('data-dwayne-power', 'Infinity');
        })
        .forEach((elem) => {
          strictEqual(new Elem(elem).data('dwayneAttr'), '123');
          strictEqual(new Elem(elem).data('dwaynePower'), 'Infinity');
        });
    });
    it('should support (key, value) setter syntax', () => {
      const elem = [
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div')
      ];
      const wrap = new Elem(elem);

      wrap
        .data('dwaynePower', 'Infinity')
        .forEach((elem) => {
          strictEqual(elem.getAttribute('data-dwayne-power'), 'Infinity');
        });
    });
    it('should support (attr, callback) syntax', () => {
      const elem = [
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div')
      ];
      const wrap = new Elem(elem);

      wrap
        .forEach((elem, index) => {
          elem.setAttribute('data-dwayne-power', index);
        })
        .data('dwaynePower', (value) => +value + 10)
        .forEach((elem, index) => {
          strictEqual(elem.getAttribute('data-dwayne-power'), `${ (10 + index) }`);
        });
    });
    it('should support object property syntax', () => {
      const elem = [
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div')
      ];
      const wrap = new Elem(elem);

      wrap
        .data({
          dwayneAttr: '123',
          dwaynePower: 'Infinity'
        })
        .forEach((elem) => {
          strictEqual(elem.getAttribute('data-dwayne-attr'), '123');
          strictEqual(elem.getAttribute('data-dwayne-power'), 'Infinity');
        });
    });
  });
  describe('deleteRule()', () => {
    it('should add rule to the first style element in the set', () => {
      const style = nativeDocument.createElement('style');
      const elem = nativeDocument.createElement('div');
      const styleWrap = new Elem(style);
      const elemWrap = new Elem(elem);

      elem.className = 'foo';

      nativeHead.appendChild(style);
      nativeBody.appendChild(elem);

      styleWrap.addRule('dwayne-style', '.foo', {
        margin: '2px 1px 3px'
      });

      styleWrap.deleteRule('dwayne-style');

      const css = elemWrap.calcCSS();

      strictEqual(css.marginTop, '0px');
      strictEqual(css.marginRight, '0px');
      strictEqual(css.marginBottom, '0px');
      strictEqual(css.marginLeft, '0px');

      style.remove();
      elem.remove();
    });
  });
  describe('dispatch()', () => {
    it('should dispatch event on element', (done) => {
      const elem = [
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div')
      ];
      const wrap = new Elem(elem);
      let fired = 0;

      wrap.on('click', doneAll);

      wrap.dispatch('click');

      function doneAll() {
        if (++fired === 3) {
          done();
        }
      }
    });
    it('should dispatch already constructed event', (done) => {
      const elem = [
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div')
      ];
      const wrap = new Elem(elem);
      let fired = 0;
      let event;

      try {
        event = new Event('click');
      } catch (err) {
        event = nativeDocument.createEvent('Event');
      }

      wrap.on('click', (e) => {
        try {
          strictEqual(e, event);

          doneAll();
        } catch (err) {
          doneAll(err);
        }
      });
      wrap.dispatch(event);

      function doneAll(err) {
        if (err) {
          done(err);
        }

        if (++fired === 3) {
          done();
        }
      }
    });
    it('should add details to event', (done) => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);
      const unique = {};

      wrap.on('click', (e) => {
        try {
          strictEqual(e.detail, unique);
          strictEqual(e.data, unique);

          done();
        } catch (err) {
          done(err);
        }
      });
      wrap.dispatch('click', {}, {
        detail: unique,
        data: unique
      });
    });
  });
  describe('elem()', () => {
    it('should return wrap of the n-th element', () => {
      const elem1 = nativeDocument.createElement('div');
      const elem2 = nativeDocument.createElement('div');
      const elem = [
        elem1,
        elem2
      ];
      const wrap1 = new Elem(elem);
      const wrap2 = new Elem();

      strictEqual(wrap1.elem().length, 1);
      strictEqual(wrap1.elem().$[0], elem1);
      strictEqual(wrap1.elem(0).length, 1);
      strictEqual(wrap1.elem(0).$[0], elem1);
      strictEqual(wrap1.elem(1).length, 1);
      strictEqual(wrap1.elem(1).$[0], elem2);
      strictEqual(wrap2.elem().length, 0);
    });
  });
  describe('find()', () => {
    it('should find a wrap of all elements in nested children, that matches selector', () => {
      const elem1 = nativeDocument.createElement('div');
      const elem2 = nativeDocument.createElement('div');
      const child1 = nativeDocument.createElement('div');
      const child2 = nativeDocument.createElement('div');
      const child3 = nativeDocument.createElement('div');
      const elem = [
        elem1,
        elem2,
        nativeDocument.createElement('div')
      ];
      const wrap = new Elem(elem);

      elem1.appendChild(child1);
      elem1.appendChild(child2);
      elem2.appendChild(child3);

      child1.className = 'foo';
      child2.className = 'foo';
      child3.className = 'foo';

      const found = wrap.find('.foo').$;

      strictEqual(found.length, 3);
      strictEqual(found[0], child1);
      strictEqual(found[1], child2);
      strictEqual(found[2], child3);
    });
  });
  describe('filter()', () => {
    it('should find a wrap of all elements in nested children, that matches selector', () => {
      const elem1 = nativeDocument.createElement('div');
      const elem2 = nativeDocument.createElement('div');
      const elem3 = nativeDocument.createElement('div');
      const elem = [
        elem1,
        elem2,
        elem3
      ];
      const wrap = new Elem(elem);

      elem1.className = 'foo';
      elem3.className = 'foo';

      const filtered = wrap.filter('.foo').$;

      strictEqual(filtered.length, 2);
      strictEqual(filtered[0], elem1);
      strictEqual(filtered[1], elem3);
    });
  });
  describe('first()', () => {
    it('should return wrap of the first element', () => {
      const elem1 = nativeDocument.createElement('div');
      const elem = [
        elem1,
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div')
      ];
      const wrap1 = new Elem(elem);
      const wrap2 = new Elem();

      strictEqual(wrap1.first().length, 1);
      strictEqual(wrap1.first().$[0], elem1);
      strictEqual(wrap2.first().length, 0);
    });
  });
  describe('firstChild()', () => {
    it('should return a wrap of the first children of all elements in the set with no arguments', () => {
      const parent1 = nativeDocument.createElement('div');
      const parent2 = nativeDocument.createElement('div');
      const elem1 = nativeDocument.createElement('div');
      const elem2 = nativeDocument.createElement('div');
      const elem3 = nativeDocument.createElement('div');
      const elem4 = nativeDocument.createElement('div');
      const wrap = new Elem([
        parent1,
        parent2
      ]);

      parent1.appendChild(elem1);
      parent1.appendChild(elem2);
      parent2.appendChild(elem3);
      parent2.appendChild(elem4);

      const firstChildren = wrap.firstChild().$;

      strictEqual(firstChildren.length, 2);
      strictEqual(firstChildren[0], elem1);
      strictEqual(firstChildren[1], elem3);
    });
    it('should return a wrap of the first children of all elements in the set that match selector  with selector argument', () => {
      const parent1 = nativeDocument.createElement('div');
      const parent2 = nativeDocument.createElement('div');
      const parent3 = nativeDocument.createElement('div');
      const elem1 = nativeDocument.createElement('div');
      const elem2 = nativeDocument.createElement('div');
      const elem3 = nativeDocument.createElement('div');
      const elem4 = nativeDocument.createElement('div');
      const elem5 = nativeDocument.createElement('div');
      const elem6 = nativeDocument.createElement('div');
      const wrap = new Elem([
        parent1,
        parent2,
        parent3
      ]);

      parent1.appendChild(elem1);
      parent1.appendChild(elem2);
      parent1.appendChild(elem3);
      parent2.appendChild(elem4);
      parent2.appendChild(elem5);
      parent3.appendChild(elem6);

      elem3.className = 'foo';
      elem6.className = 'foo';

      const firstChildren = wrap.firstChild('.foo').$;

      strictEqual(firstChildren.length, 2);
      strictEqual(firstChildren[0], elem3);
      strictEqual(firstChildren[1], elem6);
    });
  });
  describe('getFormData()', () => {
    it('should return form data', () => {
      const form = nativeDocument.createElement('form');
      const input1 = nativeDocument.createElement('input');
      const input2 = nativeDocument.createElement('input');
      const input3 = nativeDocument.createElement('input');
      const wrap = new Elem(form);

      form.appendChild(input1);
      form.appendChild(input2);
      form.appendChild(input3);

      input1.name = 'input1';
      input1.value = '1';
      input2.name = 'input2';
      input2.value = '2';
      input3.name = 'input3';
      input3.value = '3';

      deepStrictEqual(wrap.getFormData(), {
        input1: '1',
        input2: '2',
        input3: '3'
      });
    });
  });
  describe('getRule()', () => {
    it('should add rule to the first style element in the set', () => {
      const style = nativeDocument.createElement('style');
      const styleWrap = new Elem(style);

      nativeHead.appendChild(style);

      styleWrap.addRule('dwayne-style', '.foo', {
        margin: '2px 1px 3px !important',
        padding: '5px 6px 7px 8px'
      });

      deepStrictEqual(styleWrap.getRule('dwayne-style'), {
        selector: '.foo',
        rules: {
          margin: '2px 1px 3px !important',
          padding: '5px 6px 7px 8px'
        }
      });

      style.remove();
    });
  });
  describe('hasAttr()', () => {
    it('should return true if the element has class', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      elem.setAttribute('foo', 'bar');
      elem.setAttribute('bar', 'baz');
      elem.setAttribute('baz', 'foo');

      strictEqual(wrap.hasAttr('bar'), true);
    });
    it('should return false if the element does not have class', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      elem.setAttribute('foo', 'bar');
      elem.setAttribute('bar', 'baz');
      elem.setAttribute('baz', 'foo');

      strictEqual(wrap.hasAttr('a'), false);
    });
  });
  describe('hasClass()', () => {
    it('should return true if the element has class', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      elem.className = 'foo bar baz';

      strictEqual(wrap.hasClass('bar'), true);
    });
    it('should return false if the element does not have class', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      elem.className = 'foo bar baz';

      strictEqual(wrap.hasClass('a'), false);
    });
  });
  describe('hide', () => {
    it('should set display to none and set element.dwayneData.previousDisplay to previous display', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      elem.style.display = 'inline';
      wrap.hide();

      strictEqual(elem.style.display, 'none');
      strictEqual(elem.dwayneData.previousDisplay, 'inline');
    });
  });
  describe('html()', () => {
    it('should return innerHTML with no arguments', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      elem.innerHTML = '<div></div>';

      strictEqual(wrap.html(), '<div></div>');
    });
    it('should set innerHTML with non-function argument', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      wrap.html('<div></div>');

      strictEqual(elem.innerHTML, '<div></div>');
    });
    it('should support callback', () => {
      const elem = [
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div')
      ];
      const wrap = new Elem(elem);

      wrap
        .forEach((elem, index) => {
          elem.innerHTML = `<div>${ index }</div>`;
        })
        .html((html) => `x${ html }x`)
        .forEach((elem, index) => {
          strictEqual(elem.innerHTML, `x<div>${ index }</div>x`);
        });
    });
  });
  describe('id()', () => {
    it('should return id with no arguments', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      elem.id = 'dwayne';

      strictEqual(wrap.id(), 'dwayne');
    });
    it('should set id with more arguments', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      wrap.id('dwayne');

      strictEqual(elem.id, 'dwayne');
    });
  });
  describe('into()', () => {
    it('should support (element) syntax', () => {
      const parent = nativeDocument.createElement('div');
      const elem = [
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div')
      ];
      const wrap = new Elem(elem);

      wrap
        .into(parent)
        .forEach((elem) => {
          strictEqual(parent.contains(elem), true);
        });
    });
    it('should support (Elem) syntax', () => {
      const parent = nativeDocument.createElement('div');
      const elem = [
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div')
      ];
      const wrap = new Elem(elem);
      const parentWrap = new Elem(parent);

      wrap
        .into(parentWrap)
        .forEach((elem) => {
          strictEqual(parent.contains(elem), true);
        });
    });
    it('should support (selector) syntax', () => {
      const parent = nativeDocument.createElement('div');
      const elem = [
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div')
      ];
      const wrap = new Elem(elem);

      parent.id = 'dwayne-parent';
      nativeBody.appendChild(parent);

      wrap
        .into('body #dwayne-parent')
        .forEach((elem) => {
          strictEqual(parent.contains(elem), true);
        });

      parent.remove();
    });
  });
  describe('innerHeight', () => {
    it('should return inner height', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      nativeBody.appendChild(elem);

      wrap.css({
        boxSizing: 'border-box',
        height: '200px',
        paddingTop: '2px',
        paddingBottom: '3px',
        borderTop: '1px solid black',
        borderBottom: '4px solid black'
      });

      strictEqual(wrap.innerHeight, 190);

      wrap.css('box-sizing', 'content-box');

      strictEqual(wrap.innerHeight, 200);

      elem.remove();
    });
  });
  describe('innerWidth', () => {
    it('should return inner width', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      nativeBody.appendChild(elem);

      wrap.css({
        boxSizing: 'border-box',
        width: '200px',
        paddingLeft: '2px',
        paddingRight: '3px',
        borderLeft: '1px solid black',
        borderRight: '4px solid black'
      });

      strictEqual(wrap.innerWidth, 190);

      wrap.css('box-sizing', 'content-box');

      strictEqual(wrap.innerWidth, 200);

      elem.remove();
    });
  });
  describe('is()', () => {
    it('should return if context matches selector', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      elem.id = 'foo';
      elem.className = 'bar';
      elem.setAttribute('baz', '');

      strictEqual(wrap.is('#foo.bar[baz]'), true);
      strictEqual(wrap.is('#foo.bar[bar]'), false);
    });
  });
  describe('isBroken()', () => {
    it('should return if the image is broken', (done) => {
      const proper = nativeDocument.createElement('img');
      const broken = nativeDocument.createElement('img');
      const elem = [
        proper,
        broken
      ];
      const wrap = new Elem(elem);
      const properWrap = new Elem(proper);
      const brokenWrap = new Elem(broken);

      properWrap.ref('/test/images/image.png');
      brokenWrap.ref('/some/broken/image');

      strictEqual(properWrap.isBroken(), false);
      strictEqual(brokenWrap.isBroken(), false);

      wrap
        .load()
        .then(() => {
          strictEqual(properWrap.isBroken(), false);
          strictEqual(brokenWrap.isBroken(), true);

          done();
        })
        .catch(done);
    });
  });
  describe('last()', () => {
    it('should return wrap of the last element', () => {
      const elem1 = nativeDocument.createElement('div');
      const elem = [
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div'),
        elem1
      ];
      const wrap1 = new Elem(elem);
      const wrap2 = new Elem();

      strictEqual(wrap1.last().length, 1);
      strictEqual(wrap1.last().$[0], elem1);
      strictEqual(wrap2.last().length, 0);
    });
  });
  describe('lastChild()', () => {
    it('should return a wrap of the last children of all elements in the set with no arguments', () => {
      const parent1 = nativeDocument.createElement('div');
      const parent2 = nativeDocument.createElement('div');
      const elem1 = nativeDocument.createElement('div');
      const elem2 = nativeDocument.createElement('div');
      const elem3 = nativeDocument.createElement('div');
      const elem4 = nativeDocument.createElement('div');
      const wrap = new Elem([
        parent1,
        parent2
      ]);

      parent1.appendChild(elem1);
      parent1.appendChild(elem2);
      parent2.appendChild(elem3);
      parent2.appendChild(elem4);

      const lastChildren = wrap.lastChild().$;

      strictEqual(lastChildren.length, 2);
      strictEqual(lastChildren[0], elem2);
      strictEqual(lastChildren[1], elem4);
    });
    it('should return a wrap of the last children of all elements in the set that match selector  with selector argument', () => {
      const parent1 = nativeDocument.createElement('div');
      const parent2 = nativeDocument.createElement('div');
      const parent3 = nativeDocument.createElement('div');
      const elem1 = nativeDocument.createElement('div');
      const elem2 = nativeDocument.createElement('div');
      const elem3 = nativeDocument.createElement('div');
      const elem4 = nativeDocument.createElement('div');
      const elem5 = nativeDocument.createElement('div');
      const elem6 = nativeDocument.createElement('div');
      const wrap = new Elem([
        parent1,
        parent2,
        parent3
      ]);

      parent1.appendChild(elem1);
      parent1.appendChild(elem2);
      parent1.appendChild(elem3);
      parent2.appendChild(elem4);
      parent2.appendChild(elem5);
      parent3.appendChild(elem6);

      elem1.className = 'foo';
      elem5.className = 'foo';

      const lastChildren = wrap.lastChild('.foo').$;

      strictEqual(lastChildren.length, 2);
      strictEqual(lastChildren[0], elem1);
      strictEqual(lastChildren[1], elem5);
    });
  });
  describe('load()', () => {
    it('should load all the images in the set', (done) => {
      const properImage = nativeDocument.createElement('img');
      const brokenImage = nativeDocument.createElement('img');
      const elem = [
        properImage,
        brokenImage
      ];
      const wrap = new Elem(elem);

      properImage.src = '/test/images/image.png';
      brokenImage.src = '/some/broken/image';

      wrap
        .load()
        .then(({ proper, broken }) => {
          strictEqual(proper.length, 1);
          strictEqual(proper.$[0], properImage);
          strictEqual(broken.length, 1);
          strictEqual(broken.$[0], brokenImage);

          done();
        })
        .catch(done);
    });
  });
  describe('moveAttr()', () => {
    it('should add attribute and set value to "" with 1 argument', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      wrap.moveAttr('dwayne1');

      strictEqual(elem.getAttribute('dwayne1'), '');
    });
    it('should add attribute and set value to the second argument with 2 arguments', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      wrap.moveAttr('dwayne2', 'value');

      strictEqual(elem.getAttribute('dwayne2'), 'value');
    });
    it('should move attribute and set value to previous with 1 argument', () => {
      const elem1 = nativeDocument.createElement('div');
      const elem2 = nativeDocument.createElement('div');
      const wrap1 = new Elem(elem1);
      const wrap2 = new Elem(elem2);

      wrap1.moveAttr('dwayne3', 'value');
      wrap2.moveAttr('dwayne3');

      strictEqual(elem1.hasAttribute('dwayne3'), false);
      strictEqual(elem2.getAttribute('dwayne3'), 'value');
    });
    it('should move attribute and set value to the second argument with 2 arguments', () => {
      const elem1 = nativeDocument.createElement('div');
      const elem2 = nativeDocument.createElement('div');
      const wrap1 = new Elem(elem1);
      const wrap2 = new Elem(elem2);

      wrap1.moveAttr('dwayne4', 'oldValue');
      wrap2.moveAttr('dwayne4', 'newValue');

      strictEqual(elem1.hasAttribute('dwayne4'), false);
      strictEqual(elem2.getAttribute('dwayne4'), 'newValue');
    });
  });
  describe('moveClass()', () => {
    it('should add class if there was no last element', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      wrap.moveClass('dwayne1');

      strictEqual(elem.classList.contains('dwayne1'), true);
    });
    it('should move class if there was last element', () => {
      const elem1 = nativeDocument.createElement('div');
      const elem2 = nativeDocument.createElement('div');
      const wrap1 = new Elem(elem1);
      const wrap2 = new Elem(elem2);

      wrap1.moveClass('dwayne3');
      wrap2.moveClass('dwayne3');

      strictEqual(elem1.classList.contains('dwayne3'), false);
      strictEqual(elem2.classList.contains('dwayne3'), true);
    });
  });
  describe('name', () => {
    it('should return tagName.toLowerCase()', () => {
      const div = nativeDocument.createElement('div');
      const input = nativeDocument.createElement('input');
      const fieldset = nativeDocument.createElement('fieldset');
      const divWrap = new Elem(div);
      const inputWrap = new Elem(input);
      const fieldsetWrap = new Elem(fieldset);

      strictEqual(divWrap.name, 'div');
      strictEqual(inputWrap.name, 'input');
      strictEqual(fieldsetWrap.name, 'fieldset');
    });
  });
  describe('next()', () => {
    it('should return a wrap of the next elements to all elements in the set with no arguments', () => {
      const parent1 = nativeDocument.createElement('div');
      const parent2 = nativeDocument.createElement('div');
      const elem1 = nativeDocument.createElement('div');
      const elem2 = nativeDocument.createElement('div');
      const elem3 = nativeDocument.createElement('div');
      const elem4 = nativeDocument.createElement('div');
      const wrap = new Elem([
        elem1,
        elem2,
        elem3,
        elem4
      ]);

      parent1.appendChild(elem1);
      parent1.appendChild(elem2);
      parent2.appendChild(elem3);
      parent2.appendChild(elem4);

      const next = wrap.next().$;

      strictEqual(next.length, 2);
      strictEqual(next[0], elem2);
      strictEqual(next[1], elem4);
    });
    it('should return a wrap of the next elements that match selector to all elements in the set with selector argument', () => {
      const parent1 = nativeDocument.createElement('div');
      const parent2 = nativeDocument.createElement('div');
      const parent3 = nativeDocument.createElement('div');
      const elem1 = nativeDocument.createElement('div');
      const elem2 = nativeDocument.createElement('div');
      const elem3 = nativeDocument.createElement('div');
      const elem4 = nativeDocument.createElement('div');
      const elem5 = nativeDocument.createElement('div');
      const elem6 = nativeDocument.createElement('div');
      const wrap = new Elem([
        elem1,
        elem2,
        elem3,
        elem4,
        elem5,
        elem6
      ]);

      parent1.appendChild(elem1);
      parent1.appendChild(elem2);
      parent1.appendChild(elem3);
      parent2.appendChild(elem4);
      parent2.appendChild(elem5);
      parent3.appendChild(elem6);

      elem3.className = 'foo';
      elem5.className = 'foo';

      const next = wrap.next('.foo').$;

      strictEqual(next.length, 2);
      strictEqual(next[0], elem3);
      strictEqual(next[1], elem5);
    });
  });
  describe('off()', () => {
    it('should support (event) syntax', (done) => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);
      let times = 0;

      wrap.on('click', () => {
        if (++times === 1) {
          done();

          return wrap.off('click');
        }

        done('Hasn\'t been cleared');
      });
      wrap
        .dispatch('click')
        .dispatch('click');
    });
    it('should support (events) syntax', (done) => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);
      let times = 0;

      wrap.on('click', () => {
        if (++times === 1) {
          done();

          return wrap.off('click, contextmenu');
        }

        done('Hasn\'t been cleared');
      });
      wrap
        .dispatch('click')
        .dispatch('contextmenu');
    });
  });
  describe('on()', () => {
    it('should support (event, listener) syntax', (done) => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      wrap.on('click', () => {
        done();
      });
      wrap.dispatch('click');
    });
    it('should support (events, listener) syntax', (done) => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);
      let times = 0;

      wrap.on('click, contextmenu', () => {
        if (++times === 2) {
          done();
        }
      });

      wrap
        .dispatch('click')
        .dispatch('contextmenu');
    });
    it('should support ({ [event]: listener, ... }) syntax', (done) => {
      let times = 0;

      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);
      const listener = () => {
        if (++times === 2) {
          done();
        }
      };

      wrap.on({
        click: listener,
        contextmenu: listener
      });
      wrap.dispatch('click').dispatch('contextmenu');
    });
    it('should support (event, selector, listener) syntax', (done) => {
      const elem = nativeDocument.createElement('div');
      const elem1 = nativeDocument.createElement('div');
      const elem2 = nativeDocument.createElement('div');
      const elem3 = nativeDocument.createElement('div');
      const wrap = new Elem(elem);
      let times = 0;

      elem1.className = 'foo';
      elem2.className = 'foo';

      elem.appendChild(elem1);
      elem.appendChild(elem2);
      elem.appendChild(elem3);

      wrap.on('click', '.foo', () => {
        if (++times === 2) {
          return done();
        }

        if (times < 3) {
          return;
        }

        done(new Error('Hasn\'t been filtered'));
      });

      elem1.click();
      elem2.click();
      elem3.click();
    });
    it('should return removeEventListeners function', (done) => {
      let times = 0;

      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);
      const removeListener = wrap.on('click', () => {
        if (++times === 1) {
          done();

          return removeListener();
        }

        done(new Error('Not removed'));
      });

      wrap
        .dispatch('click')
        .dispatch('click');
    });
    it('should return removeEventListeners function that supports arguments', (done) => {
      let times = 0;

      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);
      const removeListener = wrap.on('click, contextmenu', () => {
        if (++times === 2) {
          done();

          return removeListener('click');
        }

        if (times < 2) {
          return;
        }

        done(new Error('Not removed'));
      });

      wrap
        .dispatch('click')
        .dispatch('contextmenu')
        .dispatch('click');
    });
  });
  describe('outerHeight', () => {
    it('should return outer height', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      nativeBody.appendChild(elem);

      wrap.css({
        boxSizing: 'border-box',
        height: '200px',
        paddingTop: '2px',
        paddingBottom: '3px',
        borderTop: '1px solid black',
        borderBottom: '4px solid black',
        marginTop: '0px',
        marginBottom: '5px'
      });

      strictEqual(wrap.outerHeight, 205);

      wrap.css('box-sizing', 'content-box');

      strictEqual(wrap.outerHeight, 215);

      elem.remove();
    });
  });
  describe('outerWidth', () => {
    it('should return outer width', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      nativeBody.appendChild(elem);

      wrap.css({
        boxSizing: 'border-box',
        width: '200px',
        paddingLeft: '2px',
        paddingRight: '3px',
        borderLeft: '1px solid black',
        borderRight: '4px solid black',
        marginLeft: '0px',
        marginRight: '5px'
      });

      strictEqual(wrap.outerWidth, 205);

      wrap.css('box-sizing', 'content-box');

      strictEqual(wrap.outerWidth, 215);

      elem.remove();
    });
  });
  describe('parent()', () => {
    it('should return a wrap of the parent elements of all the elements in the set', () => {
      const parent1 = nativeDocument.createElement('div');
      const parent2 = nativeDocument.createElement('div');
      const parent3 = nativeDocument.createElement('div');
      const elem1 = nativeDocument.createElement('div');
      const elem2 = nativeDocument.createElement('div');
      const elem3 = nativeDocument.createElement('div');
      const elem4 = nativeDocument.createElement('div');
      const elem5 = nativeDocument.createElement('div');
      const elem6 = nativeDocument.createElement('div');
      const wrap = new Elem([
        elem1,
        elem2,
        elem3,
        elem4,
        elem5,
        elem6
      ]);

      parent1.appendChild(elem1);
      parent1.appendChild(elem2);
      parent1.appendChild(elem3);
      parent2.appendChild(elem4);
      parent2.appendChild(elem5);
      parent3.appendChild(elem6);

      const parents = wrap.parent().$;

      strictEqual(parents.length, 3);
      strictEqual(parents[0], parent1);
      strictEqual(parents[1], parent2);
      strictEqual(parents[2], parent3);
    });
  });
  describe('parentTree()', () => {
    it('should return the whole tree of parents', () => {
      const parent1 = nativeDocument.createElement('div');
      const parent2 = nativeDocument.createElement('div');
      const parent3 = nativeDocument.createElement('div');
      const parent4 = nativeDocument.createElement('div');
      const parent5 = nativeDocument.createElement('div');
      const parent6 = nativeDocument.createElement('div');
      const elem1 = nativeDocument.createElement('div');
      const elem2 = nativeDocument.createElement('div');
      const elem3 = nativeDocument.createElement('div');
      const elem4 = nativeDocument.createElement('div');
      const elem5 = nativeDocument.createElement('div');
      const elem6 = nativeDocument.createElement('div');
      const wrap = new Elem([
        elem1,
        elem2,
        elem3,
        elem4,
        elem5,
        elem6
      ]);

      parent1.appendChild(elem1);
      parent1.appendChild(elem2);
      parent1.appendChild(elem3);
      parent2.appendChild(elem4);
      parent2.appendChild(elem5);
      parent3.appendChild(elem6);
      parent4.appendChild(parent1);
      parent5.appendChild(parent4);
      parent6.appendChild(parent2);

      const tree = wrap.parentTree().$;

      strictEqual(tree.length, 6);
      strictEqual(tree[0], parent1);
      strictEqual(tree[1], parent4);
      strictEqual(tree[2], parent5);
      strictEqual(tree[3], parent2);
      strictEqual(tree[4], parent6);
      strictEqual(tree[5], parent3);
    });
  });
  describe('prev()', () => {
    it('should return a wrap of the previous elements to all elements in the set with no arguments', () => {
      const parent1 = nativeDocument.createElement('div');
      const parent2 = nativeDocument.createElement('div');
      const elem1 = nativeDocument.createElement('div');
      const elem2 = nativeDocument.createElement('div');
      const elem3 = nativeDocument.createElement('div');
      const elem4 = nativeDocument.createElement('div');
      const wrap = new Elem([
        elem1,
        elem2,
        elem3,
        elem4
      ]);

      parent1.appendChild(elem1);
      parent1.appendChild(elem2);
      parent2.appendChild(elem3);
      parent2.appendChild(elem4);

      const prev = wrap.prev().$;

      strictEqual(prev.length, 2);
      strictEqual(prev[0], elem1);
      strictEqual(prev[1], elem3);
    });
    it('should return a wrap of the previous elements that match selector to all elements in the set with selector argument', () => {
      const parent1 = nativeDocument.createElement('div');
      const parent2 = nativeDocument.createElement('div');
      const parent3 = nativeDocument.createElement('div');
      const elem1 = nativeDocument.createElement('div');
      const elem2 = nativeDocument.createElement('div');
      const elem3 = nativeDocument.createElement('div');
      const elem4 = nativeDocument.createElement('div');
      const elem5 = nativeDocument.createElement('div');
      const elem6 = nativeDocument.createElement('div');
      const wrap = new Elem([
        elem1,
        elem2,
        elem3,
        elem4,
        elem5,
        elem6
      ]);

      parent1.appendChild(elem1);
      parent1.appendChild(elem2);
      parent1.appendChild(elem3);
      parent2.appendChild(elem4);
      parent2.appendChild(elem5);
      parent3.appendChild(elem6);

      elem1.className = 'foo';
      elem4.className = 'foo';

      const prev = wrap.prev('.foo').$;

      strictEqual(prev.length, 2);
      strictEqual(prev[0], elem1);
      strictEqual(prev[1], elem4);
    });
  });
  describe('ref()', () => {
    it('should set references to elements', () => {
      const elem1 = nativeDocument.createElement('img');
      const elem2 = nativeDocument.createElement('form');
      const elem3 = nativeDocument.createElement('script');
      const elem4 = nativeDocument.createElement('link');
      const elem5 = nativeDocument.createElement('iframe');
      const elem6 = nativeDocument.createElement('audio');
      const elem7 = nativeDocument.createElement('video');
      const wrap = new Elem([
        elem1,
        elem2,
        elem3,
        elem4,
        elem5,
        elem6,
        elem7
      ]);

      wrap.ref('http://google.com/');

      strictEqual(elem1.src, 'http://google.com/');
      strictEqual(elem2.action, 'http://google.com/');
      strictEqual(elem3.src, 'http://google.com/');
      strictEqual(elem4.href, 'http://google.com/');
      strictEqual(elem5.src, 'http://google.com/');
      strictEqual(elem6.src, 'http://google.com/');
      strictEqual(elem7.src, 'http://google.com/');
    });
  });
  describe('remove()', () => {
    it('should remove the element', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      nativeBody.appendChild(elem);
      wrap.remove();

      strictEqual(nativeDocument.body.contains(elem), false);
    });
  });
  describe('removeAttr()', () => {
    it('should remove attributes from arguments', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      elem.setAttribute('foo', 'bar');
      elem.setAttribute('bar', 'baz');
      elem.setAttribute('baz', 'foo');
      wrap.removeAttr('foo', 'bar', 'baz');

      strictEqual(elem.hasAttribute('foo'), false);
      strictEqual(elem.hasAttribute('bar'), false);
      strictEqual(elem.hasAttribute('baz'), false);
    });
  });
  describe('removeClass()', () => {
    it('should remove classes from arguments', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      elem.className = 'foo bar baz';
      wrap.removeClass('foo', 'bar', 'baz');

      strictEqual(elem.classList.contains('foo'), false);
      strictEqual(elem.classList.contains('bar'), false);
      strictEqual(elem.classList.contains('baz'), false);
    });
  });
  describe('removeCSS()', () => {
    it('should remove css properties from arguments', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      elem.style.display = 'inline';
      elem.style.cursor = 'pointer';
      elem.style.margin = '2px';

      wrap.removeCSS('display', 'cursor', 'margin');

      strictEqual(elem.style.display, '');
      strictEqual(elem.style.cursor, '');
      strictEqual(elem.style.margin, '');
      strictEqual(elem.style.marginLeft, '');
      strictEqual(elem.style.marginTop, '');
      strictEqual(elem.style.marginRight, '');
      strictEqual(elem.style.marginBottom, '');
    });
  });
  describe('replace()', () => {
    it('should replace the element with another', () => {
      const parent = nativeDocument.createElement('div');
      const elem1 = nativeDocument.createElement('div');
      const elem2 = nativeDocument.createElement('div');
      const elem = [
        elem1,
        nativeDocument.createElement('div'),
        nativeDocument.createElement('div')
      ];
      const wrap = new Elem(elem);

      parent.appendChild(elem1);

      wrap.replace(elem2);

      strictEqual(elem1.parentNode, null);
      strictEqual(elem2.parentNode, parent);
    });
  });
  describe('setOf()', () => {
    it('should add set of elements of specified type', () => {
      const elem1 = nativeDocument.createElement('div');
      const elem2 = nativeDocument.createElement('div');
      const elem3 = nativeDocument.createElement('div');
      const elem = [
        elem1,
        elem2,
        elem3
      ];
      const wrap = new Elem(elem);

      wrap
        .setOf('div', 3, (elem, index) => {
          elem.className = index;
        })
        .forEach((elem, index) => {
          index = new Num(index / 3).floor;

          strictEqual(elem.parentElement, wrap.elem(index).$[0]);
          strictEqual(elem.className, index);
        });
    });
  });
  describe('show()', () => {
    it('should not change display if it is not none and set element.dwayneData.previousDisplay to \'\'', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      elem.style.display = 'inline-block';
      wrap.hide();
      elem.style.display = 'inline';
      wrap.show();

      strictEqual(elem.style.display, 'inline');
      strictEqual(elem.dwayneData.previousDisplay, '');
    });
    it('should set display to element.dwayneData.previousDisplay', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      elem.style.display = 'inline';
      wrap.hide();
      wrap.show();

      strictEqual(elem.style.display, 'inline');
    });
  });
  describe('text()', () => {
    it('should get text of the element with no arguments', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      elem.innerHTML = '123';

      strictEqual(wrap.text(), '123');
    });
    it('should set text of the element', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      wrap.text('123');

      strictEqual(elem.innerHTML, '123');
    });
  });
  describe('toggleAttr()', () => {
    it('should toggle attribute from argument if it is one', () => {
      const elem1 = nativeDocument.createElement('div');
      const elem2 = nativeDocument.createElement('div');
      const wrap1 = new Elem(elem1);
      const wrap2 = new Elem(elem2);

      elem1.setAttribute('foo', 'bar');
      elem2.setAttribute('foo', 'bar');
      wrap1.toggleAttr('foo');
      wrap2.toggleAttr('baz');

      strictEqual(elem1.hasAttribute('foo'), false);
      strictEqual(elem2.hasAttribute('baz'), true);
    });
    it('should add attribute from the first argument if the second is truthy and remove if not', () => {
      const elem1 = nativeDocument.createElement('div');
      const elem2 = nativeDocument.createElement('div');
      const elem3 = nativeDocument.createElement('div');
      const elem4 = nativeDocument.createElement('div');
      const wrap1 = new Elem(elem1);
      const wrap2 = new Elem(elem2);
      const wrap3 = new Elem(elem3);
      const wrap4 = new Elem(elem4);

      elem1.setAttribute('foo', 'bar');
      elem2.setAttribute('foo', 'bar');
      elem3.setAttribute('foo', 'bar');
      elem4.setAttribute('foo', 'bar');

      wrap1.toggleAttr('foo', null);
      wrap2.toggleAttr('foo', 1);
      wrap3.toggleAttr('baz', null);
      wrap4.toggleAttr('baz', 1);

      strictEqual(elem1.hasAttribute('foo'), false);
      strictEqual(elem2.hasAttribute('foo'), true);
      strictEqual(elem3.hasAttribute('baz'), false);
      strictEqual(elem4.hasAttribute('baz'), true);
    });
  });
  describe('toggleClass()', () => {
    it('should toggle class from argument if it is one', () => {
      const elem1 = nativeDocument.createElement('div');
      const elem2 = nativeDocument.createElement('div');
      const wrap1 = new Elem(elem1);
      const wrap2 = new Elem(elem2);

      elem1.className = 'foo bar';
      elem2.className = 'foo bar';
      wrap1.toggleClass('foo');
      wrap2.toggleClass('baz');

      strictEqual(elem1.classList.contains('foo'), false);
      strictEqual(elem2.classList.contains('baz'), true);
    });
    it('should add class from the first argument if the second is truthy and remove if not', () => {
      const elem1 = nativeDocument.createElement('div');
      const elem2 = nativeDocument.createElement('div');
      const elem3 = nativeDocument.createElement('div');
      const elem4 = nativeDocument.createElement('div');
      const wrap1 = new Elem(elem1);
      const wrap2 = new Elem(elem2);
      const wrap3 = new Elem(elem3);
      const wrap4 = new Elem(elem4);

      elem1.className = 'foo bar';
      elem2.className = 'foo bar';
      elem3.className = 'foo bar';
      elem4.className = 'foo bar';

      wrap1.toggleClass('foo', null);
      wrap2.toggleClass('foo', 1);
      wrap3.toggleClass('baz', null);
      wrap4.toggleClass('baz', 1);

      strictEqual(elem1.classList.contains('foo'), false);
      strictEqual(elem2.classList.contains('foo'), true);
      strictEqual(elem3.classList.contains('baz'), false);
      strictEqual(elem4.classList.contains('baz'), true);
    });
  });
  describe('up()', () => {
    it('should return a wrap of the parent elements with no arguments', () => {
      const parent1 = nativeDocument.createElement('div');
      const parent2 = nativeDocument.createElement('div');
      const parent3 = nativeDocument.createElement('div');
      const parent4 = nativeDocument.createElement('div');
      const parent5 = nativeDocument.createElement('div');
      const parent6 = nativeDocument.createElement('div');
      const elem1 = nativeDocument.createElement('div');
      const elem2 = nativeDocument.createElement('div');
      const elem3 = nativeDocument.createElement('div');
      const elem4 = nativeDocument.createElement('div');
      const elem5 = nativeDocument.createElement('div');
      const elem6 = nativeDocument.createElement('div');
      const wrap = new Elem([
        elem1,
        elem2,
        elem3,
        elem4,
        elem5,
        elem6
      ]);

      parent1.appendChild(elem1);
      parent1.appendChild(elem2);
      parent1.appendChild(elem3);
      parent2.appendChild(elem4);
      parent2.appendChild(elem5);
      parent3.appendChild(elem6);
      parent4.appendChild(parent1);
      parent5.appendChild(parent4);
      parent6.appendChild(parent2);

      const parents = wrap.up().$;

      strictEqual(parents.length, 3);
      strictEqual(parents[0], parent1);
      strictEqual(parents[1], parent2);
      strictEqual(parents[2], parent3);
    });
    it('should return a wrap of the elements with 0 argument', () => {
      const parent1 = nativeDocument.createElement('div');
      const parent2 = nativeDocument.createElement('div');
      const parent3 = nativeDocument.createElement('div');
      const parent4 = nativeDocument.createElement('div');
      const parent5 = nativeDocument.createElement('div');
      const parent6 = nativeDocument.createElement('div');
      const elem1 = nativeDocument.createElement('div');
      const elem2 = nativeDocument.createElement('div');
      const elem3 = nativeDocument.createElement('div');
      const elem4 = nativeDocument.createElement('div');
      const elem5 = nativeDocument.createElement('div');
      const elem6 = nativeDocument.createElement('div');
      const wrap = new Elem([
        elem1,
        elem2,
        elem3,
        elem4,
        elem5,
        elem6
      ]);

      parent1.appendChild(elem1);
      parent1.appendChild(elem2);
      parent1.appendChild(elem3);
      parent2.appendChild(elem4);
      parent2.appendChild(elem5);
      parent3.appendChild(elem6);
      parent4.appendChild(parent1);
      parent5.appendChild(parent4);
      parent6.appendChild(parent2);

      const parents = wrap.up(0).$;

      strictEqual(parents.length, 6);
      strictEqual(parents[0], elem1);
      strictEqual(parents[1], elem2);
      strictEqual(parents[2], elem3);
      strictEqual(parents[3], elem4);
      strictEqual(parents[4], elem5);
      strictEqual(parents[5], elem6);
    });
    it('should return a wrap of the n-th parent elements with n argument', () => {
      const parent1 = nativeDocument.createElement('div');
      const parent2 = nativeDocument.createElement('div');
      const parent3 = nativeDocument.createElement('div');
      const parent4 = nativeDocument.createElement('div');
      const parent5 = nativeDocument.createElement('div');
      const parent6 = nativeDocument.createElement('div');
      const elem1 = nativeDocument.createElement('div');
      const elem2 = nativeDocument.createElement('div');
      const elem3 = nativeDocument.createElement('div');
      const elem4 = nativeDocument.createElement('div');
      const elem5 = nativeDocument.createElement('div');
      const elem6 = nativeDocument.createElement('div');
      const wrap = new Elem([
        elem1,
        elem2,
        elem3,
        elem4,
        elem5,
        elem6
      ]);

      parent1.appendChild(elem1);
      parent1.appendChild(elem2);
      parent1.appendChild(elem3);
      parent2.appendChild(elem4);
      parent2.appendChild(elem5);
      parent3.appendChild(elem6);
      parent4.appendChild(parent1);
      parent5.appendChild(parent4);
      parent6.appendChild(parent2);

      const parents = wrap.up(2).$;

      strictEqual(parents.length, 2);
      strictEqual(parents[0], parent4);
      strictEqual(parents[1], parent6);
    });
  });
  describe('validate()', () => {
    it('should return a wrap of the parent elements with no arguments', () => {
      const form = nativeDocument.createElement('form');
      const input = nativeDocument.createElement('input');
      const formWrap = new Elem(form);
      const inputWrap = new Elem(input);
      let errors;

      form.appendChild(input);

      inputWrap.attr({
        name: 'input1',
        required: ''
      });

      errors = inputWrap.validate();

      strictEqual(errors.input1.message, 'Please fill out this field.');

      errors = formWrap.validate();

      strictEqual(errors.input1.message, 'Please fill out this field.');

      inputWrap.validate((text) => {
        if (text[0].toLowerCase() === text[0]) {
          throw new Error('Input must be capitilized.');
        }
      });

      errors = inputWrap
        .prop('value', 't')
        .validate();

      strictEqual(errors.input1.message, 'Input must be capitilized.');

      errors = formWrap.validate();

      strictEqual(errors.input1.message, 'Input must be capitilized.');

      errors = inputWrap
        .prop('value', 'T')
        .validate();

      strictEqual(errors, null);
    });
  });
});

describe('it should test exported methods from Elem', () => {
  describe('find()', () => {
    it('should find a wrap of all elements in nested children, that matches selector', () => {
      const elem = nativeDocument.createElement('div');
      const child1 = nativeDocument.createElement('div');
      const child2 = nativeDocument.createElement('div');
      const child3 = nativeDocument.createElement('div');

      nativeBody.appendChild(elem);
      elem.appendChild(child1);
      elem.appendChild(child2);
      child2.appendChild(child3);

      child1.className = 'dwayne-unique-class';
      child3.className = 'dwayne-unique-class';

      const found = find('.dwayne-unique-class').$;

      strictEqual(found.length, 2);
      strictEqual(found[0], child1);
      strictEqual(found[1], child3);

      elem.remove();
    });
  });
  describe('parseHTML()', () => {
    it('should parse HTML', () => {
      const html = `
        <div id="foo">
          <div attr="value"></div>
        </div>
        <span class="foo"></span>
        <input type="button"/>
      `;
      const parsed = parseHTML(html);
      const parsed0 = parsed.elem(0);
      const parsed1 = parsed.elem(1);
      const parsed2 = parsed.elem(2);

      strictEqual(parsed.length, 3);
      strictEqual(parsed0.name, 'div');
      strictEqual(parsed0.id(), 'foo');
      strictEqual(parsed0.children().length, 1);
      strictEqual(parsed0.find('div').attr('attr'), 'value');
      strictEqual(parsed1.name, 'span');
      strictEqual(parsed1.class().join(' '), 'foo');
      strictEqual(parsed2.name, 'input');
      strictEqual(parsed2.attr('type'), 'button');
    });
  });
  describe('px()', () => {
    it('should return number of px from the string', () => {
      const px1 = '';
      const px2 = 0;
      const px3 = '0px';
      const px4 = '42px';

      strictEqual(px(px1), 0);
      strictEqual(px(px2), 0);
      strictEqual(px(px3), 0);
      strictEqual(px(px4), 42);
    });
  });
});
