import { deepStrictEqual, strictEqual } from 'assert';
import Elem, { find } from '../lib/Elem';
import { array } from '../lib/Arr';
import Super from '../lib/Super';
import elements from '../lib/constants/elements';

const nativeDocument = global.document;

describe('it should test Elem#', () => {
  // TODO: add()
  describe('addClasses()', () => {
    it('should add classes from arguments', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      wrap.addClasses('foo', 'bar', 'baz');

      strictEqual(elem.classList.contains('foo'), true);
      strictEqual(elem.classList.contains('bar'), true);
      strictEqual(elem.classList.contains('baz'), true);
    });
  });
  describe('addHTML()', () => {
    it('should add html to the end', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);
      
      elem.innerHTML = '123';
      wrap.addHTML('<div></div>');
      
      strictEqual(elem.innerHTML, '123<div></div>');
    });
  });
  describe('addText()', () => {
    it('should add text to the end', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);
      
      elem.innerHTML = '123';
      wrap.addText('<div></div>');
      
      strictEqual(elem.innerHTML, '123&lt;div&gt;&lt;/div&gt;');
    });
  });
  // TODO: addRule()
  describe('apply()', () => {
    it('should set id to the value from the string', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      wrap.apply('#domc');

      strictEqual(elem.id, 'domc');
    });
    it('should add class from the string', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      wrap.apply('.domc');

      strictEqual(elem.classList.contains('domc'), true);
    });
    it('should remove class from the string', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      elem.className = 'foo bar baz';
      wrap.apply('-.bar');

      strictEqual(elem.classList.contains('bar'), false);
    });
    it('should remove css property from the string', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      elem.style.display = 'inline';
      wrap.apply('-@display');

      strictEqual(elem.style.display, '');
    });
    it('should remove attribute from the string', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      elem.setAttribute('foo', 'bar');
      wrap.apply('-$foo');

      strictEqual(elem.hasAttribute('foo'), false);
    });
    it('should set text to the value from the string', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      wrap.apply('&(domc text)');

      strictEqual(wrap.text(), 'domc text');
    });
    it('should set position to absolute', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      wrap.apply('-a');

      strictEqual(elem.style.position, 'absolute');
    });
    it('should set font-weight to bold', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      wrap.apply('-b');

      strictEqual(elem.style.fontWeight, 'bold');
    });
    it('should set text-align to center', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      wrap.apply('-c');

      strictEqual(elem.style.textAlign, 'center');
    });
    it('should set position to fixed', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      wrap.apply('-f');

      strictEqual(elem.style.position, 'fixed');
    });
    it('should hide the element', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      wrap.apply('-h');

      strictEqual(elem.style.display, 'none');
    });
    it('should set font-style to italic', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      wrap.apply('-i');

      strictEqual(elem.style.fontStyle, 'italic');
    });
    it('should set position to relative', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      wrap.apply('-r');

      strictEqual(elem.style.position, 'relative');
    });
    it('should show the element', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      elem.style.display = 'inline';
      wrap.hide();
      wrap.apply('-s');

      strictEqual(elem.style.display, 'inline');
    });
    it('should set opacity to 0', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      wrap.apply('-t');

      strictEqual(elem.style.opacity, '0');
    });
    it('should set text-decoration-line to underline', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      wrap.apply('-u');

      strictEqual(elem.style.textDecorationLine, 'underline');
    });
    it('should set css property from the string to the value from the string', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      wrap.apply('@border(1px solid black)');

      strictEqual(elem.style.border, '1px solid black');
    });
    it('should set css property from the string to the value from the string', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      wrap.apply('@transform(scale(10px))');

      strictEqual(elem.style.transform, 'scale(10px)');
    });
    it('should set attribute from the string to the value from the string', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      wrap.apply('$domc(foo5)');
      
      strictEqual(elem.getAttribute('domc'), 'foo5');
    });
    it('should add attribute from the string', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      wrap.apply('$domc');

      strictEqual(elem.hasAttribute('domc'), true);
    });
  });
  describe('attr()', () => {
    it('should return wrap of an object of attributes with no arguments', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      elem.setAttribute('data', '123');
      elem.setAttribute('contentEditable', '');

      deepStrictEqual(wrap.attr().$, { data: '123', contenteditable: '' });
    });
    it('should return value of an attribute with first string argument', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      elem.setAttribute('data', '123');

      strictEqual(wrap.attr('data'), '123');
    });
    it('should support (attr, value) syntax', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      wrap.attr('data', '123');

      strictEqual(elem.getAttribute('data'), '123');
    });
    it('should support object property syntax', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      wrap.attr({ data: '123', contentEditable: '' });

      strictEqual(elem.getAttribute('data'), '123');
      strictEqual(elem.getAttribute('contentEditable'), '');
    });
  });
  // TODO: calcCSS()
  describe('centerText()', () => {
    it('should set text-align to center', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      wrap.centerText();

      strictEqual(elem.style.textAlign, 'center');
    });
  });
  // TODO: changeRule()
  describe('child()', () => {
    it('should return wrap of n-th child if argument is non-negative integer', () => {
      const elem = nativeDocument.createElement('div');
      const child1 = nativeDocument.createElement('div');
      const child2 = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      elem.appendChild(child1);
      elem.appendChild(child2);

      strictEqual(wrap.child(0).$, child1);
      strictEqual(wrap.child(1).$, child2);
    });
    it('should support (element) syntax', () => {
      const elem = nativeDocument.createElement('div');
      const child = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      wrap.child(child);

      strictEqual(elem.contains(child), true);
    });
    it('should support (Elem) syntax', () => {
      const elem = nativeDocument.createElement('div');
      const child = nativeDocument.createElement('div');
      const wrap = new Elem(elem);
      const childWrap = new Elem(child);

      wrap.child(childWrap);

      strictEqual(elem.contains(child), true);
    });
    it('should support (selector) syntax', () => {
      const elem = nativeDocument.createElement('div');
      const child = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      child.id = 'domc-child';
      nativeDocument.body.appendChild(child);
      wrap.child('body #domc-child');

      strictEqual(elem.contains(child), true);
    });
  });
  describe('children()', () => {
    it('should support (element) syntax', () => {
      const elem = nativeDocument.createElement('div');
      const child1 = nativeDocument.createElement('div');
      const child2 = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      elem.appendChild(child1);
      elem.appendChild(child2);

      const children = wrap.children().$;

      strictEqual(children[0].$, child1);
      strictEqual(children[1].$, child2);
    });
  });
  describe('class()', () => {
    it('should return wrap of an array of classes with no arguments', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      elem.className = 'foo bar baz';

      deepStrictEqual(wrap.class().$, ['foo', 'bar', 'baz']);
    });
    it('should set className with more arguments', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      wrap.class('foo bar baz');

      strictEqual(elem.className, 'foo bar baz');
    });
  });
  describe('click()', () => {
    it('should click the element', (done) => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      wrap.on('click', () => {
        done();
      });

      wrap.click();
    });
  });
  describe('closest()', () => {
    it('should return a wrap of null if no closest parent found', () => {
      const parent1 = nativeDocument.createElement('div');
      const parent2 = nativeDocument.createElement('div');
      const parent3 = nativeDocument.createElement('div');
      const child = nativeDocument.createElement('div');
      const wrap = new Elem(child);

      parent1.appendChild(parent2);
      parent2.appendChild(parent3);
      parent3.appendChild(child);

      strictEqual(wrap.closest('.foo').$, null);
    });
    it('should return a wrap of itself if it matches selector', () => {
      const parent1 = nativeDocument.createElement('div');
      const parent2 = nativeDocument.createElement('div');
      const parent3 = nativeDocument.createElement('div');
      const child = nativeDocument.createElement('div');
      const wrap = new Elem(child);

      child.className = 'foo';
      parent1.appendChild(parent2);
      parent2.appendChild(parent3);
      parent3.appendChild(child);

      strictEqual(wrap.closest('.foo').$, child);
    });
    it('should return a wrap of closest parent, that matches selector', () => {
      const parent1 = nativeDocument.createElement('div');
      const parent2 = nativeDocument.createElement('div');
      const parent3 = nativeDocument.createElement('div');
      const child = nativeDocument.createElement('div');
      const wrap = new Elem(child);

      parent3.className = 'foo';
      parent2.className = 'foo';
      parent1.appendChild(parent2);
      parent2.appendChild(parent3);
      parent3.appendChild(child);

      strictEqual(wrap.closest('.foo').$, parent3);
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
  describe('css()', () => {
    it('should return wrap of an object of css properties with no arguments', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      elem.style.display = 'inline';
      elem.style.textAlign = 'center';
      elem.style.border = '1px solid black';

      deepStrictEqual(wrap.css().$, { display: 'inline', textAlign: 'center', border: '1px solid black' });
    });
    it('should return value of css property with first string argument', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      elem.style.display = 'inline';

      strictEqual(wrap.css('display'), 'inline');
    });
    it('should support (attr, value) syntax', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      wrap.css('display', 'inline');

      strictEqual(elem.style.display, 'inline');
    });
    it('should support object property syntax', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      wrap.css({
        display: 'inline',
        cursor: 'pointer'
      });

      strictEqual(elem.style.display, 'inline');
      strictEqual(elem.style.cursor, 'pointer');
    });
  });
  describe('create()', () => {
    it('should return wrap of a new element inside context of type of first argument', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      const input = wrap.create('input').$;

      strictEqual(input.parentNode, elem);
      strictEqual(input.tagName.toLowerCase(), 'input');
    });
    it('should use second argument as applied expression', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      const input = wrap.create('input', '#123').$;

      strictEqual(input.parentNode, elem);
      strictEqual(input.tagName.toLowerCase(), 'input');
      strictEqual(input.id, '123');
    });
  });
  describe('[html-element]()', () => {
    it('should return wrap of a new element inside context', () => {
      new Super(elements)
        .keys()
        .forEach((type) => {
          const elem = nativeDocument.createElement('div');
          const wrap = new Elem(elem);

          const created = wrap[type]().$;

          strictEqual(created.parentNode, elem);
          strictEqual(created.tagName.toLowerCase(), type);
        });
    });
    it('should use first argument as applied expression', () => {
      new Super(elements)
        .keys()
        .forEach((type) => {
          const elem = nativeDocument.createElement('div');
          const wrap = new Elem(elem);

          const created = wrap[type](`.${ type }`).$;

          strictEqual(created.parentNode, elem);
          strictEqual(created.tagName.toLowerCase(), type);
          strictEqual(created.className, type);
        });
    });
  });
  describe('data()', () => {
    it('should return wrap of a dataset object without arguments', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      elem.setAttribute('data-domc-foo', '123');
      elem.setAttribute('data-domc-bar', '456');

      strictEqual(wrap.data().$, elem.dataset);
    });
    it('should return value of dataset parameter', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      elem.setAttribute('data-domc-foo', '123');
      elem.setAttribute('data-domc-bar', '456');

      strictEqual(wrap.data('domcFoo'), '123');
    });
    it('should support (key, value) setter syntax', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      wrap.data('domcFoo', '123');

      deepStrictEqual(elem.dataset, { domcFoo: '123' });
    });
    it('should support ({ [key]: value, ... }) setter syntax', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      wrap.data({
        domcFoo: '123',
        domcBar: '456'
      });

      deepStrictEqual(elem.dataset, { domcFoo: '123', domcBar: '456' });
    });
  });
  // TODO: deleteRule()
  describe('defaultValue()', () => {
    it('should return default value with no arguments', () => {
      const elem = nativeDocument.createElement('input');
      const wrap = new Elem(elem);

      elem.defaultValue = '123';

      strictEqual(wrap.defaultValue(), '123');
    });
    it('should set default value with more arguments', () => {
      const elem = nativeDocument.createElement('input');
      const wrap = new Elem(elem);

      wrap.defaultValue('123');

      strictEqual(elem.defaultValue, '123');
    });
  });
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
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      wrap.on('click', () => {
        done();
      });
      wrap.dispatch('click');
    });
    it('should dispatch already constructed event', (done) => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      let event;

      try {
        event = new Event('click');
      } catch (err) {
        event = nativeDocument.createEvent('Event');
      }

      wrap.on('click', (e) => {
        try {
          strictEqual(e, event);

          done();
        } catch (err) {
          done(err);
        }
      });
      wrap.dispatch(event);
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
      wrap.dispatch('click', { detail: unique, data: unique });
    });
  });
  describe('draggable()', () => {
    it('should set draggable state to true with no arguments', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      wrap.draggable();

      strictEqual(elem.draggable, true);
    });
    it('should set draggable state to Boolean(argument)', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      wrap.draggable(null);

      strictEqual(elem.draggable, false);
    });
  });
  describe('editable()', () => {
    it('should set contentEditable state to true with no arguments', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      wrap.editable();

      strictEqual(elem.contentEditable, 'true');
    });
    it('should set contentEditable state to Boolean(argument)', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      wrap.editable(null);

      notEqual(elem.contentEditable, 'true');
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
    it('should set display to none and set element.domcData.previousDisplay to previous display', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      elem.style.display = 'inline';
      wrap.hide();

      strictEqual(elem.style.display, 'none');
      strictEqual(elem.domcData.previousDisplay, 'inline');
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

      elem.id = 'domc';

      strictEqual(wrap.id(), 'domc');
    });
    it('should set id with more arguments', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      wrap.id('domc');

      strictEqual(elem.id, 'domc');
    });
  });
  describe('insertAfter()', () => {
    it('should insert context to the argument\'s parent\'s end if it\'s last child', () => {
      const elem = nativeDocument.createElement('div');
      const child1 = nativeDocument.createElement('div');
      const child2 = nativeDocument.createElement('div');
      const wrap = new Elem(child2);

      elem.appendChild(child1);
      wrap.insertAfter(child1);

      deepStrictEqual(elem.childNodes, [child1, child2]);
    });
    it('should insert context after argument', () => {
      const elem = nativeDocument.createElement('div');
      const child1 = nativeDocument.createElement('div');
      const child2 = nativeDocument.createElement('div');
      const child3 = nativeDocument.createElement('div');
      const wrap = new Elem(child3);

      elem.appendChild(child1);
      elem.appendChild(child2);
      wrap.insertAfter(child1);

      deepStrictEqual(elem.childNodes, [child1, child3, child2]);
    });
    it('should support selector syntax', () => {
      const elem = nativeDocument.createElement('div');
      const child1 = nativeDocument.createElement('div');
      const child2 = nativeDocument.createElement('div');
      const child3 = nativeDocument.createElement('div');
      const wrap = new Elem(child3);

      nativeDocument.body.appendChild(elem);
      child1.id = 'domc';
      elem.appendChild(child1);
      elem.appendChild(child2);
      wrap.insertAfter('#domc');

      deepStrictEqual(elem.childNodes, [child1, child3, child2]);

      elem.remove();
    });
  });
  describe('insertBefore()', () => {
    it('should insert context to the argument\'s parent\'s start if it\'s first child', () => {
      const elem = nativeDocument.createElement('div');
      const child1 = nativeDocument.createElement('div');
      const child2 = nativeDocument.createElement('div');
      const wrap = new Elem(child2);

      elem.appendChild(child1);
      wrap.insertBefore(child1);

      deepStrictEqual(elem.childNodes, [child2, child1]);
    });
    it('should insert context before argument', () => {
      const elem = nativeDocument.createElement('div');
      const child1 = nativeDocument.createElement('div');
      const child2 = nativeDocument.createElement('div');
      const child3 = nativeDocument.createElement('div');
      const wrap = new Elem(child3);

      elem.appendChild(child1);
      elem.appendChild(child2);
      wrap.insertBefore(child2);

      deepStrictEqual(elem.childNodes, [child1, child3, child2]);
    });
    it('should support selector syntax', () => {
      const elem = nativeDocument.createElement('div');
      const child1 = nativeDocument.createElement('div');
      const child2 = nativeDocument.createElement('div');
      const child3 = nativeDocument.createElement('div');
      const wrap = new Elem(child3);

      nativeDocument.body.appendChild(elem);
      child2.id = 'domc';
      elem.appendChild(child1);
      elem.appendChild(child2);
      wrap.insertBefore('#domc');

      deepStrictEqual(elem.childNodes, [child1, child3, child2]);

      elem.remove();
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

      parent.id = 'domc-parent';
      nativeDocument.body.appendChild(parent);
      wrap.into('body #domc-parent');

      strictEqual(parent.contains(elem), true);

      parent.remove();
    });
  });
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

      wrap.moveAttr('domc1');

      strictEqual(elem.getAttribute('domc1'), '');
    });
    it('should add attribute and set value to the second argument with 2 arguments', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      wrap.moveAttr('domc2', 'value');

      strictEqual(elem.getAttribute('domc2'), 'value');
    });
    it('should move attribute and set value to previous with 1 argument', () => {
      const elem1 = nativeDocument.createElement('div');
      const elem2 = nativeDocument.createElement('div');
      const wrap1 = new Elem(elem1);
      const wrap2 = new Elem(elem2);

      wrap1.moveAttr('domc3', 'value');
      wrap2.moveAttr('domc3');

      strictEqual(elem1.hasAttribute('domc3'), false);
      strictEqual(elem2.getAttribute('domc3'), 'value');
    });
    it('should move attribute and set value to the second argument with 2 arguments', () => {
      const elem1 = nativeDocument.createElement('div');
      const elem2 = nativeDocument.createElement('div');
      const wrap1 = new Elem(elem1);
      const wrap2 = new Elem(elem2);

      wrap1.moveAttr('domc4', 'oldValue');
      wrap2.moveAttr('domc4', 'newValue');

      strictEqual(elem1.hasAttribute('domc4'), false);
      strictEqual(elem2.getAttribute('domc4'), 'newValue');
    });
  });
  describe('moveClass()', () => {
    it('should add class if there was no last element', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      wrap.moveClass('domc1');

      strictEqual(elem.classList.contains('domc1'), true);
    });
    it('should move class if there was last element', () => {
      const elem1 = nativeDocument.createElement('div');
      const elem2 = nativeDocument.createElement('div');
      const wrap1 = new Elem(elem1);
      const wrap2 = new Elem(elem2);

      wrap1.moveClass('domc3');
      wrap2.moveClass('domc3');

      strictEqual(elem1.classList.contains('domc3'), false);
      strictEqual(elem2.classList.contains('domc3'), true);
    });
  });
  describe('get name', () => {
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
  describe('removeClasses()', () => {
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
  describe('setOf', () => {
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
  describe('show', () => {
    it('should not change display if it is not none and delete element.domcData.previousDisplay', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new Elem(elem);

      wrap.hide();
      elem.style.display = 'inline';
      wrap.show();

      strictEqual(elem.style.display, 'inline');
      strictEqual('previousDisplay' in elem.domcData, false);
    });
    it('should set display to element.domcData.previousDisplay', () => {
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

      elem.value = 'domc';

      strictEqual(wrap.value(), 'domc');
    });
    it('should set value with more arguments', () => {
      const elem = nativeDocument.createElement('input');
      const wrap = new Elem(elem);

      wrap.value('domc');

      strictEqual(elem.value, 'domc');
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
  describe('findAll()', () => {
    it('should find a wrap of all elements in nested children, that match selector', () => {
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

      const found = findAll('.foo').$;

      strictEqual(found[0].$, child1);
      strictEqual(found[1].$, child3);

      elem.remove();
    });
    it('should find a wrap of [] if not find', () => {
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

      deepStrictEqual(findAll('.bar').$, []);

      elem.remove();
    });
  });
  // TODO: parseHTML()
  // TODO: px()
});

describe('it should test Elems#', () => {
  const count = 3;
  let wrap;

  beforeEach(() => {
    array(count, () => {
      const elem = nativeDocument.createElement('div');

      elem.className = 'foo';
      nativeDocument.body.appendChild(elem);
    });

    wrap = new Elems(nativeDocument.getElementsByClassName('foo'));
  });

  afterEach(() => {
    wrap.remove();
  });

  describe('dispatch()', () => {
    it('should dispatch event on elements in collection', (done) => {
      let times = 0;

      wrap.on('click', () => {
        if (++times === count) {
          done();
        }
      });
      wrap.dispatch('click');
    });
  });
  describe('into()', () => {
    it('should hide elements in collection', () => {
      const parent = nativeDocument.createElement('div');

      wrap.into(parent);

      wrap.forEach((elem) => {
        strictEqual(elem.parent().$, parent);
      });
    });
  });
  describe('hide()', () => {
    it('should hide elements in collection', () => {
      wrap.forEach((elem) => {
        elem.css('display', 'inline');
      });

      wrap.hide();

      wrap.forEach((elem) => {
        strictEqual(elem.css('display'), 'none');
        strictEqual(elem.$.domcData.previousDisplay, 'inline');
      });
    });
  });
  describe('on()', () => {
    it('should add listeners to elements in collection', (done) => {
      let times = 0;

      wrap.on('click', () => {
        if (++times === count) {
          done();
        }
      });
      wrap.dispatch('click');
    });
    it('should return removeListeners function', (done) => {
      let times = 0;

      const removeListener = wrap.on('click', () => {
        if (++times === count) {
          return removeListener();
        } else if (times < count) {
          return;
        }

        done(new Error('Not removed'));
      });

      wrap.dispatch('click').dispatch('click');

      setTimeout(done, 50);
    });
    // TODO: test selector parameter
  });
  describe('remove()', () => {
    it('should remove elements in collection from the page', () => {
      const all = nativeDocument.getElementsByClassName('foo').length;

      wrap.remove();

      strictEqual(nativeDocument.getElementsByClassName('foo').length, all - count);
    });
  });
  describe('show()', () => {
    it('should show elements in collection', () => {
      wrap.forEach((elem) => {
        elem.css('display', 'inline');
      });

      wrap.hide();
      wrap.show();

      wrap.forEach((elem) => {
        strictEqual(elem.css('display'), 'inline');
      });
    });
  });
});
