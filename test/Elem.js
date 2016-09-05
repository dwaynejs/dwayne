import { deepStrictEqual, notEqual, strictEqual } from 'assert';
import Elem, { find, px } from '../lib/Elem';
import Super from '../lib/Super';
import elements from '../lib/constants/elements';

const nativeDocument = global.document;

describe('it should test Elem#', () => {
  // TODO: add()
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
  // TODO: addRule()
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
          deepStrictEqual(new Elem(elem).attr('attr'), '123');
          deepStrictEqual(new Elem(elem).attr('contentEditable'), '');
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
  // TODO: blob()
  // TODO: calcCSS()
  // TODO: changeRule()
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
      nativeDocument.body.appendChild(child);
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

      deepStrictEqual(wrap.closest('.foo').$, [child2, parent3]);
    });
  });
  // TODO: clone()
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
      nativeDocument.body.appendChild(parent);
      
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
          deepStrictEqual(new Elem(elem).data('dwayneAttr'), '123');
          deepStrictEqual(new Elem(elem).data('dwaynePower'), 'Infinity');
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
  // TODO: deleteRule()
  describe('disabled()', () => {
    it('should set disabled state to true with no arguments', () => {
      const elem = nativeDocument.createElement('button');
      const wrap = new Elem(elem);

      wrap.disabled();

      strictEqual(elem.disabled, true);
    });
    it('should set disabled state to Boolean(argument)', () => {
      const elem = nativeDocument.createElement('button');
      const wrap = new Elem(elem);

      wrap.disabled(null);

      strictEqual(elem.disabled, false);
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
          deepStrictEqual(e.detail, unique);
          deepStrictEqual(e.data, unique);

          done();
        } catch (err) {
          done(err);
        }
      });
      wrap.dispatch('click', null, {
        detail: unique,
        data: unique
      });
    });
  });
  // TODO: elem()
  describe('find()', () => {
    it('should find a wrap of first element in nested children, that matches selector', () => {
      const elem = nativeDocument.createElement('div');
      const child1 = nativeDocument.createElement('div');
      const child2 = nativeDocument.createElement('div');
      const child3 = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      elem.appendChild(child1);
      elem.appendChild(child2);
      child2.appendChild(child3);

      child1.className = 'foo';
      child3.className = 'foo';

      strictEqual(wrap.find('.foo').$, child1);
    });
    it('should find a wrap of null if not find', () => {
      const elem = nativeDocument.createElement('div');
      const child1 = nativeDocument.createElement('div');
      const child2 = nativeDocument.createElement('div');
      const child3 = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      elem.appendChild(child1);
      elem.appendChild(child2);
      child2.appendChild(child3);

      elem.className = 'foo';
      child3.className = 'foo';

      strictEqual(wrap.find('.bar').$, null);
    });
  });
  // TODO: filter()
  describe('first()', () => {
    it('should return wrap of the first child', () => {
      const elem1 = nativeDocument.createElement('div');
      const elem2 = nativeDocument.createElement('div');
      const child1 = nativeDocument.createElement('div');
      const child2 = nativeDocument.createElement('div');
      const wrap1 = new Elem(elem1);
      const wrap2 = new Elem(elem2);

      elem1.appendChild(child1);
      elem1.appendChild(child2);

      strictEqual(wrap1.first().$, child1);
      strictEqual(wrap2.first().$, null);
    });
    it('should return wrap of the first element child', () => {
      const elem = nativeDocument.createElement('div');
      const child1 = nativeDocument.createTextNode('div');
      const child2 = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      elem.appendChild(child1);
      elem.appendChild(child2);

      strictEqual(wrap.first(true).$, child2);
    });
  });
  // TODO: firstChild()
  // TODO: getFormData()
  // TODO: getRule()
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
    it('should set innerHTML with more arguments', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      wrap.html('<div></div>');

      strictEqual(elem.innerHTML, '<div></div>');
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
      const elem = nativeDocument.createElement('div');
      const parent = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      wrap.into(parent);

      strictEqual(parent.contains(elem), true);
    });
    it('should support (Elem) syntax', () => {
      const elem = nativeDocument.createElement('div');
      const parent = nativeDocument.createElement('div');
      const wrap = new Elem(elem);
      const parentWrap = new Elem(parent);

      wrap.into(parentWrap);

      strictEqual(parent.contains(elem), true);
    });
    it('should support (selector) syntax', () => {
      const elem = nativeDocument.createElement('div');
      const parent = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      parent.id = 'dwayne-parent';
      nativeDocument.body.appendChild(parent);
      wrap.into('body #dwayne-parent');

      strictEqual(parent.contains(elem), true);

      parent.remove();
    });
  });
  // TODO: innerHeight
  // TODO: innerWidth
  // TODO: isBroken()
  describe('last()', () => {
    it('should return wrap of the last child', () => {
      const elem1 = nativeDocument.createElement('div');
      const elem2 = nativeDocument.createElement('div');
      const child1 = nativeDocument.createElement('div');
      const child2 = nativeDocument.createElement('div');
      const wrap1 = new Elem(elem1);
      const wrap2 = new Elem(elem2);

      elem1.appendChild(child1);
      elem1.appendChild(child2);

      strictEqual(wrap1.last().$, child2);
      strictEqual(wrap2.last().$, null);
    });
    it('should return wrap of the last element child', () => {
      const elem = nativeDocument.createElement('div');
      const child1 = nativeDocument.createElement('div');
      const child2 = nativeDocument.createTextNode('div');
      const wrap = new Elem(elem);

      elem.appendChild(child1);
      elem.appendChild(child2);

      strictEqual(wrap.last(true).$, child1);
    });
  });
  // TODO: lastChild()
  // TODO: load()
  describe('matches()', () => {
    it('should return if context matches selector', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      elem.id = 'foo';
      elem.className = 'bar';
      elem.setAttribute('baz', '');

      strictEqual(wrap.matches('#foo.bar[baz]'), true);
      strictEqual(wrap.matches('#foo.bar[bar]'), false);
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
    it('should return a wrap of the next sibling', () => {
      const parent = nativeDocument.createElement('div');
      const elem1 = nativeDocument.createElement('div');
      const elem2 = nativeDocument.createElement('div');
      const wrap1 = new Elem(elem1);
      const wrap2 = new Elem(elem2);

      parent.appendChild(elem1);
      parent.appendChild(elem2);

      strictEqual(wrap1.next().$, elem2);
      strictEqual(wrap2.next().$, null);
    });
    it('should return a wrap of the next element sibling', () => {
      const elem = nativeDocument.createElement('div');
      const child1 = nativeDocument.createElement('div');
      const child2 = nativeDocument.createTextNode('div');
      const child3 = nativeDocument.createElement('div');
      const wrap = new Elem(child1);

      elem.appendChild(child1);
      elem.appendChild(child2);
      elem.appendChild(child3);

      strictEqual(wrap.next(true).$, child3);
    });
  });
  // TODO: off()
  describe('on()', () => {
    it('should support (event, listener) syntax', (done) => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      wrap.on('click', () => {
        done();
      });
      wrap.dispatch('click');
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
    // TODO: test (event, secector, syntax)
    // TODO: test ({ [event]: listener }, selector) syntax
    it('should return removeEventListeners function', (done) => {
      let times = 0;

      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);
      const removeListener = wrap.on('click', () => {
        if (++times === 1) {
          return removeListener();
        }

        done(new Error('Not removed'));
      });

      wrap.dispatch('click').dispatch('click');

      setTimeout(done, 50);
    });
    // TODO: test selector parameter
  });
  describe('get outerHTML', () => {
    it('should return the same as element.outerHTML', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      elem.innerHTML = '<input />';

      strictEqual(wrap.outerHTML, elem.outerHTML);
    });
  });
  // TODO: outerHeight
  // TODO: outerWidth
  describe('parent()', () => {
    it('should return a wrap of the parent element', () => {
      const elem1 = nativeDocument.createElement('div');
      const elem2 = nativeDocument.createElement('div');
      const parent = nativeDocument.createElement('div');
      const wrap1 = new Elem(elem1);
      const wrap2 = new Elem(elem2);

      parent.appendChild(elem1);

      strictEqual(wrap1.parent().$, parent);
      strictEqual(wrap2.parent().$, null);
    });
  });
  describe('parentTree()', () => {
    it('should return the whole tree of parents', () => {
      const parent1 = nativeDocument.createElement('div');
      const parent2 = nativeDocument.createElement('div');
      const parent3 = nativeDocument.createElement('div');
      const child = nativeDocument.createElement('div');
      const wrap = new Elem(child);

      parent1.appendChild(parent2);
      parent2.appendChild(parent3);
      parent3.appendChild(child);

      const tree = wrap.parentTree().$;

      strictEqual(tree[0].$, parent3);
      strictEqual(tree[1].$, parent2);
      strictEqual(tree[2].$, parent1);
    });
  });
  describe('prev()', () => {
    it('should return a wrap of the previous sibling', () => {
      const parent = nativeDocument.createElement('div');
      const elem1 = nativeDocument.createElement('div');
      const elem2 = nativeDocument.createElement('div');
      const wrap1 = new Elem(elem1);
      const wrap2 = new Elem(elem2);

      parent.appendChild(elem1);
      parent.appendChild(elem2);

      strictEqual(wrap1.prev().$, null);
      strictEqual(wrap2.prev().$, elem1);
    });
    it('should return a wrap of the previous element sibling', () => {
      const elem = nativeDocument.createElement('div');
      const child1 = nativeDocument.createElement('div');
      const child2 = nativeDocument.createTextNode('div');
      const child3 = nativeDocument.createElement('div');
      const wrap = new Elem(child3);

      elem.appendChild(child1);
      elem.appendChild(child2);
      elem.appendChild(child3);

      strictEqual(wrap.prev(true).$, child1);
    });
  });
  // TODO: ref()
  describe('remove()', () => {
    it('should remove the element', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      nativeDocument.body.appendChild(elem);
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
      wrap.removeClasses('foo', 'bar', 'baz');

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
  // TODO: replace()
  describe('setOf()', () => {
    it('should add set of elements of specified type', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);
      const elements = [];

      wrap.setOf('div', 3, (elem) => {
        elements.push(elem.$);
      });

      deepStrictEqual(elem.childNodes, elements);
    });
  });
  describe('show()', () => {
    it('should not change display if it is not none and delete element.dwayneData.previousDisplay', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      wrap.hide();
      elem.style.display = 'inline';
      wrap.show();

      strictEqual(elem.style.display, 'inline');
      strictEqual('previousDisplay' in elem.dwayneData, false);
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
  describe('type()', () => {
    it('should return type with no arguments', () => {
      const elem = nativeDocument.createElement('input');
      const wrap = new Elem(elem);

      elem.type = 'email';

      strictEqual(wrap.type(), 'email');
    });
    it('should set type with more arguments', () => {
      const elem = nativeDocument.createElement('input');
      const wrap = new Elem(elem);

      wrap.type('email');

      strictEqual(elem.type, 'email');
    });
  });
  describe('up()', () => {
    it('should return a wrap of the parent element with no arguments', () => {
      const elem = nativeDocument.createElement('div');
      const parent = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      parent.appendChild(elem);

      strictEqual(wrap.up().$, parent);
    });
    it('should return a wrap of the element with 0 argument', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      strictEqual(wrap.up(0).$, elem);
    });
    it('should return a wrap of the n-th parent element with n argument', () => {
      const parent1 = nativeDocument.createElement('div');
      const parent2 = nativeDocument.createElement('div');
      const parent3 = nativeDocument.createElement('div');
      const child = nativeDocument.createElement('div');
      const wrap = new Elem(child);

      parent1.appendChild(parent2);
      parent2.appendChild(parent3);
      parent3.appendChild(child);

      strictEqual(wrap.up(1).$, parent3);
      strictEqual(wrap.up(2).$, parent2);
      strictEqual(wrap.up(3).$, parent1);
    });
  });
  // TODO: validate()
  describe('value()', () => {
    it('should return value with no arguments', () => {
      const elem = nativeDocument.createElement('input');
      const wrap = new Elem(elem);

      elem.value = 'dwayne';

      strictEqual(wrap.value(), 'dwayne');
    });
    it('should set value with more arguments', () => {
      const elem = nativeDocument.createElement('input');
      const wrap = new Elem(elem);

      wrap.value('dwayne');

      strictEqual(elem.value, 'dwayne');
    });
  });
});

describe('it should test exported methods from Elem', () => {
  describe('find()', () => {
    it('should find a wrap of first element in nested children, that matches selector', () => {
      const elem = nativeDocument.createElement('div');
      const child1 = nativeDocument.createElement('div');
      const child2 = nativeDocument.createElement('div');
      const child3 = nativeDocument.createElement('div');

      nativeDocument.body.appendChild(elem);
      elem.appendChild(child1);
      elem.appendChild(child2);
      child2.appendChild(child3);

      child1.className = 'foo';
      child3.className = 'foo';

      strictEqual(find('.foo').$, child1);

      elem.remove();
    });
    it('should find a wrap of null if not find', () => {
      const elem = nativeDocument.createElement('div');
      const child1 = nativeDocument.createElement('div');
      const child2 = nativeDocument.createElement('div');
      const child3 = nativeDocument.createElement('div');

      nativeDocument.body.appendChild(elem);
      elem.appendChild(child1);
      elem.appendChild(child2);
      child2.appendChild(child3);

      elem.className = 'foo';
      child3.className = 'foo';

      strictEqual(find('.bar').$, null);

      elem.remove();
    });
  });
  // TODO: parseHTML()
  // TODO: px()
});
