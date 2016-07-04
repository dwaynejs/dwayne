import * as assert from 'assert';
import HtmlElement, { find, findAll, loadImages } from '../lib/HtmlElement';
import HtmlCollection from '../lib/HtmlCollection';
import { array } from '../lib/Array';
import Super from '../lib/Super';
import css from '../lib/constants/css';
import elements from '../lib/constants/elements';

const nativeDocument = global.document;

describe('it should test HtmlElement#', () => {
  describe('absolute()', () => {
    it('should set position to absolute', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.absolute();

      assert.strictEqual(elem.style.position, 'absolute');
    });
  });
  describe('addClasses()', () => {
    it('should add classes from arguments', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.addClasses('foo', 'bar', 'baz');

      assert.strictEqual(elem.classList.contains('foo'), true);
      assert.strictEqual(elem.classList.contains('bar'), true);
      assert.strictEqual(elem.classList.contains('baz'), true);
    });
  });
  describe('addHTML()', () => {
    it('should add html to the end', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);
      
      elem.innerHTML = '123';
      wrap.addHTML('<div></div>');
      
      assert.strictEqual(elem.innerHTML, '123<div></div>');
    });
  });
  describe('addText()', () => {
    it('should add text to the end', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);
      
      elem.innerHTML = '123';
      wrap.addText('<div></div>');
      
      assert.strictEqual(elem.innerHTML, '123&lt;div&gt;&lt;/div&gt;');
    });
  });
  // TODO: addRule()
  describe('apply()', () => {
    it('should set id to the value from the string', () => {
      const elem1 = nativeDocument.createElement('div');
      const elem2 = nativeDocument.createElement('div');
      const elem3 = nativeDocument.createElement('div');
      const elem4 = nativeDocument.createElement('div');
      const elem5 = nativeDocument.createElement('div');
      const wrap1 = new HtmlElement(elem1);
      const wrap2 = new HtmlElement(elem2);
      const wrap3 = new HtmlElement(elem3);
      const wrap4 = new HtmlElement(elem4);
      const wrap5 = new HtmlElement(elem5);

      wrap1.apply('#(domc id1)');
      wrap2.apply('#"domc id2"');
      wrap3.apply('#`domc id3`');
      wrap4.apply('#\'domc id4\'');
      wrap5.apply('#domc');

      assert.strictEqual(elem1.id, 'domc id1');
      assert.strictEqual(elem2.id, 'domc id2');
      assert.strictEqual(elem3.id, 'domc id3');
      assert.strictEqual(elem4.id, 'domc id4');
      assert.strictEqual(elem5.id, 'domc');
    });
    it('should add class from the string', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.apply('.domc');

      assert.strictEqual(elem.classList.contains('domc'), true);
    });
    it('should set float to left', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.apply('<--');

      assert.strictEqual(elem.style.float, 'left');
    });
    it('should set float to right', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.apply('-->');

      assert.strictEqual(elem.style.float, 'right');
    });
    it('should set ref to the value from the string', () => {
      const elem = nativeDocument.createElement('img');
      const wrap = new HtmlElement(elem);

      wrap.apply('->/test.html');

      assert.strictEqual(elem.getAttribute('src'), '/test.html');
    });
    it('should remove class from the string', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      elem.className = 'foo bar baz';
      wrap.apply('-.bar');

      assert.strictEqual(elem.classList.contains('bar'), false);
    });
    it('should remove css property from the string', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      elem.style.display = 'inline';
      wrap.apply('-@display');

      assert.strictEqual(elem.style.display, '');
    });
    it('should remove attribute from the string', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      elem.setAttribute('foo', 'bar');
      wrap.apply('-foo');

      assert.strictEqual(elem.hasAttribute('foo'), false);
    });
    it('should put element to the element presented by selector from the string', () => {
      const elem1 = nativeDocument.createElement('div');
      const elem2 = nativeDocument.createElement('div');
      const elem3 = nativeDocument.createElement('div');
      const elem4 = nativeDocument.createElement('div');
      const parent1 = nativeDocument.createElement('div');
      const parent2 = nativeDocument.createElement('div');
      const parent3 = nativeDocument.createElement('div');
      const parent4 = nativeDocument.createElement('div');
      const wrap1 = new HtmlElement(elem1);
      const wrap2 = new HtmlElement(elem2);
      const wrap3 = new HtmlElement(elem3);
      const wrap4 = new HtmlElement(elem4);

      parent1.id = 'domc-parent1';
      parent2.id = 'domc-parent2';
      parent3.id = 'domc-parent3';
      parent4.id = 'domc-parent4';

      nativeDocument.body.appendChild(parent1);
      nativeDocument.body.appendChild(parent2);
      nativeDocument.body.appendChild(parent3);
      nativeDocument.body.appendChild(parent4);

      wrap1.apply('=>(body > #domc-parent1)');
      wrap2.apply('=>"body > #domc-parent2"');
      wrap3.apply('=>`body > #domc-parent3`');
      wrap4.apply('=>\'body > #domc-parent4\'');

      assert.strictEqual(parent1.contains(elem1), true);
      assert.strictEqual(parent2.contains(elem2), true);
      assert.strictEqual(parent3.contains(elem3), true);
      assert.strictEqual(parent4.contains(elem4), true);

      parent1.remove();
      parent2.remove();
      parent3.remove();
      parent4.remove();
    });
    it('should move class from the string', () => {
      const elem1 = nativeDocument.createElement('div');
      const elem2 = nativeDocument.createElement('div');
      const wrap1 = new HtmlElement(elem1);
      const wrap2 = new HtmlElement(elem2);

      wrap1.moveClass('domc');
      wrap2.apply('=>.domc');

      assert.strictEqual(elem1.classList.contains('domc'), false);
      assert.strictEqual(elem2.classList.contains('domc'), true);
    });
    it('should move attribute from the string', () => {
      const elem1 = nativeDocument.createElement('div');
      const elem2 = nativeDocument.createElement('div');
      const wrap1 = new HtmlElement(elem1);
      const wrap2 = new HtmlElement(elem2);

      wrap1.moveAttr('domc', 'value');
      wrap2.apply('=>domc');

      assert.strictEqual(elem1.hasAttribute('domc'), false);
      assert.strictEqual(elem2.getAttribute('domc'), 'value');
    });
    it('should toggle class from the string', () => {
      const elem1 = nativeDocument.createElement('div');
      const elem2 = nativeDocument.createElement('div');
      const wrap1 = new HtmlElement(elem1);
      const wrap2 = new HtmlElement(elem2);

      elem1.className = 'foo bar';
      elem2.className = 'foo bar';
      wrap1.apply('~.bar');
      wrap2.apply('~.baz');

      assert.strictEqual(elem1.classList.contains('bar'), false);
      assert.strictEqual(elem2.classList.contains('baz'), true);
    });
    it('should toggle attribute from the string', () => {
      const elem1 = nativeDocument.createElement('div');
      const elem2 = nativeDocument.createElement('div');
      const wrap1 = new HtmlElement(elem1);
      const wrap2 = new HtmlElement(elem2);

      elem1.setAttribute('foo', 'bar');
      elem2.setAttribute('foo', 'bar');
      wrap1.apply('~foo');
      wrap2.apply('~bar');

      assert.strictEqual(elem1.hasAttribute('foo'), false);
      assert.strictEqual(elem2.getAttribute('bar'), '');
    });
    it('should set text to the value from the string', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.apply('*domc text*');

      assert.strictEqual(wrap.text(), 'domc text');
    });
    it('should add text from the string', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.text('some text');
      wrap.apply('+* and another text*');

      assert.strictEqual(wrap.text(), 'some text and another text');
    });
    it('should set html to the value from the string', () => {
      const elem1 = nativeDocument.createElement('div');
      const elem2 = nativeDocument.createElement('div');
      const elem3 = nativeDocument.createElement('div');
      const elem4 = nativeDocument.createElement('div');
      const wrap1 = new HtmlElement(elem1);
      const wrap2 = new HtmlElement(elem2);
      const wrap3 = new HtmlElement(elem3);
      const wrap4 = new HtmlElement(elem4);

      wrap1.apply('>(<div><input id = "input1" type = "email" /></div>)<');
      wrap2.apply('>"<div><input id = "input2" type = "email" /></div>"<');
      wrap3.apply('>`<div><input id = "input3" type = "email" /></div>`<');
      wrap4.apply('>\'<div><input id = "input4" type = "email" /></div>\'<');

      assert.strictEqual(elem1.innerHTML, '<div><input id="input1" type="email"></div>');
      assert.strictEqual(elem2.innerHTML, '<div><input id="input2" type="email"></div>');
      assert.strictEqual(elem3.innerHTML, '<div><input id="input3" type="email"></div>');
      assert.strictEqual(elem4.innerHTML, '<div><input id="input4" type="email"></div>');
    });
    it('should add html from the string', () => {
      const elem1 = nativeDocument.createElement('div');
      const elem2 = nativeDocument.createElement('div');
      const elem3 = nativeDocument.createElement('div');
      const elem4 = nativeDocument.createElement('div');
      const wrap1 = new HtmlElement(elem1);
      const wrap2 = new HtmlElement(elem2);
      const wrap3 = new HtmlElement(elem3);
      const wrap4 = new HtmlElement(elem4);

      elem1.innerHTML = '<div></div>';
      elem2.innerHTML = '<div></div>';
      elem3.innerHTML = '<div></div>';
      elem4.innerHTML = '<div></div>';

      wrap1.apply('+>(<input id = "input1" type = "email" />)<');
      wrap2.apply('+>"<input id = "input2" type = "email" />"<');
      wrap3.apply('+>`<input id = "input3" type = "email" />`<');
      wrap4.apply('+>\'<input id = "input4" type = "email" />\'<');

      assert.strictEqual(elem1.innerHTML, '<div></div><input id="input1" type="email">');
      assert.strictEqual(elem2.innerHTML, '<div></div><input id="input2" type="email">');
      assert.strictEqual(elem3.innerHTML, '<div></div><input id="input3" type="email">');
      assert.strictEqual(elem4.innerHTML, '<div></div><input id="input4" type="email">');
    });
    it('should set position to absolute', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.apply('$a');

      assert.strictEqual(elem.style.position, 'absolute');
    });
    it('should set font-weight to bold', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.apply('$b');

      assert.strictEqual(elem.style.fontWeight, 'bold');
    });
    it('should set text-align to center', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.apply('$c');

      assert.strictEqual(elem.style.textAlign, 'center');
    });
    it('should set position to fixed', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.apply('$f');

      assert.strictEqual(elem.style.position, 'fixed');
    });
    it('should hide the element', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.apply('$h');

      assert.strictEqual(elem.style.display, 'none');
    });
    it('should set font-style to italic', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.apply('$i');

      assert.strictEqual(elem.style.fontStyle, 'italic');
    });
    it('should set position to relative', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.apply('$r');

      assert.strictEqual(elem.style.position, 'relative');
    });
    it('should show the element', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      elem.style.display = 'inline';
      wrap.hide();
      wrap.apply('$s');

      assert.strictEqual(elem.style.display, 'inline');
    });
    it('should set opacity to 0', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.apply('$t');

      assert.strictEqual(elem.style.opacity, '0');
    });
    it('should set text-decoration-line to underline', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.apply('$u');

      assert.strictEqual(elem.style.textDecorationLine, 'underline');
    });
    it('should set css property from the string to the value from the string', () => {
      const elem1 = nativeDocument.createElement('div');
      const elem2 = nativeDocument.createElement('div');
      const elem3 = nativeDocument.createElement('div');
      const elem4 = nativeDocument.createElement('div');
      const elem5 = nativeDocument.createElement('div');
      const wrap1 = new HtmlElement(elem1);
      const wrap2 = new HtmlElement(elem2);
      const wrap3 = new HtmlElement(elem3);
      const wrap4 = new HtmlElement(elem4);
      const wrap5 = new HtmlElement(elem5);

      wrap1.apply('border:(1px solid black)');
      wrap2.apply('border:"2px solid black"');
      wrap3.apply('border:`3px solid black`');
      wrap4.apply('border:\'4px solid black\'');
      wrap5.apply('margin-left:2px');
      wrap5.apply('marginRight:4px');

      assert.strictEqual(elem1.style.border, '1px solid black');
      assert.strictEqual(elem2.style.border, '2px solid black');
      assert.strictEqual(elem3.style.border, '3px solid black');
      assert.strictEqual(elem4.style.border, '4px solid black');
      assert.strictEqual(elem5.style.marginLeft, '2px');
      assert.strictEqual(elem5.style.marginRight, '4px');

    });
    it('should set attribute from the string to the value from the string', () => {
      const elem1 = nativeDocument.createElement('div');
      const elem2 = nativeDocument.createElement('div');
      const elem3 = nativeDocument.createElement('div');
      const elem4 = nativeDocument.createElement('div');
      const elem5 = nativeDocument.createElement('div');
      const wrap1 = new HtmlElement(elem1);
      const wrap2 = new HtmlElement(elem2);
      const wrap3 = new HtmlElement(elem3);
      const wrap4 = new HtmlElement(elem4);
      const wrap5 = new HtmlElement(elem5);

      wrap1.apply('domc=(foo1 bar)');
      wrap2.apply('domc="foo2 bar"');
      wrap3.apply('domc=`foo3 bar`');
      wrap4.apply('domc=\'foo4 bar\'');
      wrap5.apply('domc=foo5');

      assert.strictEqual(elem1.getAttribute('domc'), 'foo1 bar');
      assert.strictEqual(elem2.getAttribute('domc'), 'foo2 bar');
      assert.strictEqual(elem3.getAttribute('domc'), 'foo3 bar');
      assert.strictEqual(elem4.getAttribute('domc'), 'foo4 bar');
      assert.strictEqual(elem5.getAttribute('domc'), 'foo5');
    });
    it('should add attribute from the string', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.apply('domc');

      assert.strictEqual(elem.hasAttribute('domc'), true);
    });
  });
  describe('attr()', () => {
    it('should return wrap of an object of attributes with no arguments', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      elem.setAttribute('data', '123');
      elem.setAttribute('contentEditable', '');

      assert.deepEqual(wrap.attr().$, { data: '123', contenteditable: '' });
    });
    it('should return value of an attribute with first string argument', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      elem.setAttribute('data', '123');

      assert.strictEqual(wrap.attr('data'), '123');
    });
    it('should support (attr, value) syntax', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.attr('data', '123');

      assert.strictEqual(elem.getAttribute('data'), '123');
    });
    it('should support object property syntax', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.attr({ data: '123', contentEditable: '' });

      assert.strictEqual(elem.getAttribute('data'), '123');
      assert.strictEqual(elem.getAttribute('contentEditable'), '');
    });
  });
  describe('block()', () => {
    it('should set display to block', () => {
      const elem = nativeDocument.createElement('span');
      const wrap = new HtmlElement(elem);

      wrap.block();

      assert.strictEqual(elem.style.display, 'block');
    });
  });
  describe('bold()', () => {
    it('should set font-weight to bold', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.bold();

      assert.strictEqual(elem.style.fontWeight, 'bold');
    });
  });
  // TODO: calcCSS()
  describe('centerText()', () => {
    it('should set text-align to center', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.centerText();

      assert.strictEqual(elem.style.textAlign, 'center');
    });
  });
  // TODO: changeRule()
  describe('child()', () => {
    it('should return wrap of n-th child if argument is non-negative integer', () => {
      const elem = nativeDocument.createElement('div');
      const child1 = nativeDocument.createElement('div');
      const child2 = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      elem.appendChild(child1);
      elem.appendChild(child2);

      assert.strictEqual(wrap.child(0).$, child1);
      assert.strictEqual(wrap.child(1).$, child2);
    });
    it('should support (element) syntax', () => {
      const elem = nativeDocument.createElement('div');
      const child = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.child(child);

      assert.strictEqual(elem.contains(child), true);
    });
    it('should support (D.HtmlElement) syntax', () => {
      const elem = nativeDocument.createElement('div');
      const child = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);
      const childWrap = new HtmlElement(child);

      wrap.child(childWrap);

      assert.strictEqual(elem.contains(child), true);
    });
    it('should support (selector) syntax', () => {
      const elem = nativeDocument.createElement('div');
      const child = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      child.id = 'domc-child';
      nativeDocument.body.appendChild(child);
      wrap.child('body #domc-child');

      assert.strictEqual(elem.contains(child), true);
    });
  });
  describe('children()', () => {
    it('should support (element) syntax', () => {
      const elem = nativeDocument.createElement('div');
      const child1 = nativeDocument.createElement('div');
      const child2 = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      elem.appendChild(child1);
      elem.appendChild(child2);

      const children = wrap.children().$;

      assert.strictEqual(children[0].$, child1);
      assert.strictEqual(children[1].$, child2);
    });
  });
  describe('class()', () => {
    it('should return wrap of an array of classes with no arguments', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      elem.className = 'foo bar baz';

      assert.deepEqual(wrap.class().$, ['foo', 'bar', 'baz']);
    });
    it('should set className with more arguments', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.class('foo bar baz');

      assert.strictEqual(elem.className, 'foo bar baz');
    });
  });
  describe('click()', () => {
    it('should click the element', (done) => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

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
      const wrap = new HtmlElement(child);

      parent1.appendChild(parent2);
      parent2.appendChild(parent3);
      parent3.appendChild(child);

      assert.strictEqual(wrap.closest('.foo').$, null);
    });
    it('should return a wrap of itself if it matches selector', () => {
      const parent1 = nativeDocument.createElement('div');
      const parent2 = nativeDocument.createElement('div');
      const parent3 = nativeDocument.createElement('div');
      const child = nativeDocument.createElement('div');
      const wrap = new HtmlElement(child);

      child.className = 'foo';
      parent1.appendChild(parent2);
      parent2.appendChild(parent3);
      parent3.appendChild(child);

      assert.strictEqual(wrap.closest('.foo').$, child);
    });
    it('should return a wrap of closest parent, that matches selector', () => {
      const parent1 = nativeDocument.createElement('div');
      const parent2 = nativeDocument.createElement('div');
      const parent3 = nativeDocument.createElement('div');
      const child = nativeDocument.createElement('div');
      const wrap = new HtmlElement(child);

      parent3.className = 'foo';
      parent2.className = 'foo';
      parent1.appendChild(parent2);
      parent2.appendChild(parent3);
      parent3.appendChild(child);

      assert.strictEqual(wrap.closest('.foo').$, parent3);
    });
  });
  // TODO: clone()
  describe('contains', () => {
    it('should return true, if element contains another, and false if not', () => {
      const elem1 = nativeDocument.createElement('div');
      const elem2 = nativeDocument.createElement('div');
      const elem3 = nativeDocument.createElement('div');
      const elem4 = nativeDocument.createElement('div');
      const wrap1 = new HtmlElement(elem1);
      const wrap2 = new HtmlElement(elem2);
      const wrap3 = new HtmlElement(elem3);
      const wrap4 = new HtmlElement(elem4);

      elem1.appendChild(elem2);
      elem2.appendChild(elem3);
      
      assert.strictEqual(wrap1.contains(elem2), true);
      assert.strictEqual(wrap2.contains(elem3), true);
      assert.strictEqual(wrap1.contains(elem4), false);
      assert.strictEqual(wrap3.contains(elem4), false);
      assert.strictEqual(wrap4.contains(elem3), false);
    });
    it('should support (selector) syntax', () => {
      const parent = nativeDocument.createElement('div');
      const child = nativeDocument.createElement('div');
      const wrap = new HtmlElement(parent);
  
      parent.appendChild(child);
      child.id = 'foo';
      nativeDocument.body.appendChild(parent);
      
      assert.strictEqual(wrap.contains('#foo'), true);
      assert.strictEqual(wrap.contains('.foo'), false);
      
      parent.remove();
    });
    it('should support (D.HtmlElement) syntax', () => {
      const parent = nativeDocument.createElement('div');
      const child = nativeDocument.createElement('div');
      const parentWrap = new HtmlElement(parent);
      const childWrap = new HtmlElement(parent);
  
      parent.appendChild(child);
      
      assert.strictEqual(parentWrap.contains(childWrap), true);
    });
  });
  describe('css()', () => {
    it('should return wrap of an object of css properties with no arguments', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      elem.style.display = 'inline';
      elem.style.textAlign = 'center';
      elem.style.border = '1px solid black';

      assert.deepEqual(wrap.css().$, { display: 'inline', textAlign: 'center', border: '1px solid black' });
    });
    it('should return value of css property with first string argument', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      elem.style.display = 'inline';

      assert.strictEqual(wrap.css('display'), 'inline');
    });
    it('should support (attr, value) syntax', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.css('display', 'inline');

      assert.strictEqual(elem.style.display, 'inline');
    });
    it('should support object property syntax', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.css({
        display: 'inline',
        cursor: 'pointer'
      });

      assert.strictEqual(elem.style.display, 'inline');
      assert.strictEqual(elem.style.cursor, 'pointer');
    });
  });
  describe('[css-property]()', () => {
    it('should check that get methods are working', () => {
      new Super(css)
        .keys()
        .filter((css) => [
          'borderImage',
          'pageBreakAfter',
          'pageBreakBefore',
          'pageBreakInside'
        ].indexOf(css) === -1)
        .forEach((css) => {
          const elem = nativeDocument.createElement('div');
          const wrap = new HtmlElement(elem);

          elem.style[css] = 'initial';

          assert.strictEqual(wrap[css](), 'initial');
        });
    });
    it('should check that set methods are working', () => {
      new Super(css).keys().forEach((value) => {
        const elem = nativeDocument.createElement('div');
        const wrap = new HtmlElement(elem);

        wrap[value]('initial');

        if (['borderImage', 'pageBreakAfter', 'pageBreakBefore', 'pageBreakInside'].indexOf(value) === -1) {
          assert.strictEqual(elem.style[value], 'initial');
        }
      });
    });
  });
  describe('create()', () => {
    it('should return wrap of a new element inside context of type of first argument', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      const input = wrap.create('input').$;

      assert.strictEqual(input.parentNode, elem);
      assert.strictEqual(input.tagName.toLowerCase(), 'input');
    });
    it('should use second argument as applied expression', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      const input = wrap.create('input', '#123').$;

      assert.strictEqual(input.parentNode, elem);
      assert.strictEqual(input.tagName.toLowerCase(), 'input');
      assert.strictEqual(input.id, '123');
    });
  });
  describe('[html-element]()', () => {
    it('should return wrap of a new element inside context', () => {
      new Super(elements).keys().forEach((type) => {
          const elem = nativeDocument.createElement('div');
          const wrap = new HtmlElement(elem);

          const created = wrap[type]().$;

          assert.strictEqual(created.parentNode, elem);
          assert.strictEqual(created.tagName.toLowerCase(), type);
        });
    });
    it('should use first argument as applied expression', () => {
      new Super(elements).keys().forEach((type) => {
          const elem = nativeDocument.createElement('div');
          const wrap = new HtmlElement(elem);

          const created = wrap[type]('.' + type).$;

          assert.strictEqual(created.parentNode, elem);
          assert.strictEqual(created.tagName.toLowerCase(), type);
          assert.strictEqual(created.className, type);
        });
    });
  });
  describe('data()', () => {
    it('should return wrap of a dataset object without arguments', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      elem.setAttribute('data-domc-foo', '123');
      elem.setAttribute('data-domc-bar', '456');

      assert.strictEqual(wrap.data().$, elem.dataset);
    });
    it('should return value of dataset parameter', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      elem.setAttribute('data-domc-foo', '123');
      elem.setAttribute('data-domc-bar', '456');

      assert.strictEqual(wrap.data('domcFoo'), '123');
    });
    it('should support (key, value) setter syntax', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.data('domcFoo', '123');

      assert.deepEqual(elem.dataset, { domcFoo: '123' });
    });
    it('should support ({ [key]: value, ... }) setter syntax', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.data({
        domcFoo: '123',
        domcBar: '456'
      });

      assert.deepEqual(elem.dataset, { domcFoo: '123', domcBar: '456' });
    });
  });
  // TODO: deleteRule()
  describe('defaultValue()', () => {
    it('should return default value with no arguments', () => {
      const elem = nativeDocument.createElement('input');
      const wrap = new HtmlElement(elem);

      elem.defaultValue = '123';

      assert.strictEqual(wrap.defaultValue(), '123');
    });
    it('should set default value with more arguments', () => {
      const elem = nativeDocument.createElement('input');
      const wrap = new HtmlElement(elem);

      wrap.defaultValue('123');

      assert.strictEqual(elem.defaultValue, '123');
    });
  });
  describe('disabled()', () => {
    it('should set disabled state to true with no arguments', () => {
      const elem = nativeDocument.createElement('button');
      const wrap = new HtmlElement(elem);

      wrap.disabled();

      assert.strictEqual(elem.disabled, true);
    });
    it('should set disabled state to Boolean(argument)', () => {
      const elem = nativeDocument.createElement('button');
      const wrap = new HtmlElement(elem);

      wrap.disabled(null);

      assert.strictEqual(elem.disabled, false);
    });
  });
  describe('dispatch()', () => {
    it('should dispatch event on element', (done) => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.on('click', () => {
        done();
      });
      wrap.dispatch('click');
    });
    it('should dispatch already constructed event', (done) => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      let event;

      try {
        event = new Event('click');
      } catch (err) {
        event = nativeDocument.createEvent('Event');
      }

      wrap.on('click', (e) => {
        try {
          assert.strictEqual(e, event);

          done();
        } catch (err) {
          done(err);
        }
      });
      wrap.dispatch(event);
    });
    it('should add details to event', (done) => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);
      const unique = {};

      wrap.on('click', (e) => {
        try {
          assert.deepEqual(e.detail, unique);
          assert.deepEqual(e.data, unique);

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
      const wrap = new HtmlElement(elem);

      wrap.draggable();

      assert.strictEqual(elem.draggable, true);
    });
    it('should set draggable state to Boolean(argument)', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.draggable(null);

      assert.strictEqual(elem.draggable, false);
    });
  });
  describe('editable()', () => {
    it('should set contentEditable state to true with no arguments', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.editable();

      assert.strictEqual(elem.contentEditable, 'true');
    });
    it('should set contentEditable state to Boolean(argument)', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.editable(null);

      assert.notStrictEqual(elem.contentEditable, 'true');
    });
  });
  describe('find()', () => {
    it('should find a wrap of first element in nested children, that matches selector', () => {
      const elem = nativeDocument.createElement('div');
      const child1 = nativeDocument.createElement('div');
      const child2 = nativeDocument.createElement('div');
      const child3 = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      elem.appendChild(child1);
      elem.appendChild(child2);
      child2.appendChild(child3);

      child1.className = 'foo';
      child3.className = 'foo';

      assert.strictEqual(wrap.find('.foo').$, child1);
    });
    it('should find a wrap of null if not find', () => {
      const elem = nativeDocument.createElement('div');
      const child1 = nativeDocument.createElement('div');
      const child2 = nativeDocument.createElement('div');
      const child3 = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      elem.appendChild(child1);
      elem.appendChild(child2);
      child2.appendChild(child3);

      elem.className = 'foo';
      child3.className = 'foo';

      assert.strictEqual(wrap.find('.bar').$, null);
    });
  });
  describe('findAll()', () => {
    it('should find a wrap of all elements in nested children, that match selector', () => {
      const elem = nativeDocument.createElement('div');
      const child1 = nativeDocument.createElement('div');
      const child2 = nativeDocument.createElement('div');
      const child3 = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      elem.appendChild(child1);
      elem.appendChild(child2);
      child2.appendChild(child3);

      child1.className = 'foo';
      child3.className = 'foo';

      const found = wrap.findAll('.foo').$;

      assert.strictEqual(found[0].$, child1);
      assert.strictEqual(found[1].$, child3);
    });
    it('should find a wrap of [] if not find', () => {
      const elem = nativeDocument.createElement('div');
      const child1 = nativeDocument.createElement('div');
      const child2 = nativeDocument.createElement('div');
      const child3 = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      elem.appendChild(child1);
      elem.appendChild(child2);
      child2.appendChild(child3);

      elem.className = 'foo';
      child3.className = 'foo';

      assert.deepEqual(wrap.findAll('.bar').$, []);
    });
  });
  describe('first()', () => {
    it('should return wrap of the first child', () => {
      const elem1 = nativeDocument.createElement('div');
      const elem2 = nativeDocument.createElement('div');
      const child1 = nativeDocument.createElement('div');
      const child2 = nativeDocument.createElement('div');
      const wrap1 = new HtmlElement(elem1);
      const wrap2 = new HtmlElement(elem2);

      elem1.appendChild(child1);
      elem1.appendChild(child2);

      assert.strictEqual(wrap1.first().$, child1);
      assert.strictEqual(wrap2.first().$, null);
    });
    it('should return wrap of the first element child', () => {
      const elem = nativeDocument.createElement('div');
      const child1 = nativeDocument.createTextNode('div');
      const child2 = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      elem.appendChild(child1);
      elem.appendChild(child2);

      assert.strictEqual(wrap.first(true).$, child2);
    });
  });
  describe('fixed()', () => {
    it('should set position to fixed', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.fixed();

      assert.strictEqual(elem.style.position, 'fixed');
    });
  });
  // TODO: getFormData()
  describe('hasAttr()', () => {
    it('should return true if the element has class', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      elem.setAttribute('foo', 'bar');
      elem.setAttribute('bar', 'baz');
      elem.setAttribute('baz', 'foo');

      assert.strictEqual(wrap.hasAttr('bar'), true);
    });
    it('should return false if the element does not have class', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      elem.setAttribute('foo', 'bar');
      elem.setAttribute('bar', 'baz');
      elem.setAttribute('baz', 'foo');

      assert.strictEqual(wrap.hasAttr('a'), false);
    });
  });
  describe('hasClass()', () => {
    it('should return true if the element has class', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      elem.className = 'foo bar baz';

      assert.strictEqual(wrap.hasClass('bar'), true);
    });
    it('should return false if the element does not have class', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      elem.className = 'foo bar baz';

      assert.strictEqual(wrap.hasClass('a'), false);
    });
  });
  describe('hide', () => {
    it('should set display to none and set element.domcData.previousDisplay to previous display', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      elem.style.display = 'inline';
      wrap.hide();

      assert.strictEqual(elem.style.display, 'none');
      assert.strictEqual(elem.domcData.previousDisplay, 'inline');
    });
  });
  describe('html()', () => {
    it('should return innerHTML with no arguments', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      elem.innerHTML = '<div></div>';

      assert.strictEqual(wrap.html(), '<div></div>');
    });
    it('should set innerHTML with more arguments', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.html('<div></div>');

      assert.strictEqual(elem.innerHTML, '<div></div>');
    });
  });
  describe('id()', () => {
    it('should return id with no arguments', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      elem.id = 'domc';

      assert.strictEqual(wrap.id(), 'domc');
    });
    it('should set id with more arguments', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.id('domc');

      assert.strictEqual(elem.id, 'domc');
    });
  });
  describe('inline()', () => {
    it('should set display to inline', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.inline();

      assert.strictEqual(elem.style.display, 'inline');
    });
  });
  describe('inlineBlock()', () => {
    it('should set display to inline-block', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.inlineBlock();

      assert.strictEqual(elem.style.display, 'inline-block');
    });
  });
  describe('insertAfter()', () => {
    it('should insert context to the argument\'s parent\'s end if it\'s last child', () => {
      const elem = nativeDocument.createElement('div');
      const child1 = nativeDocument.createElement('div');
      const child2 = nativeDocument.createElement('div');
      const wrap = new HtmlElement(child2);

      elem.appendChild(child1);
      wrap.insertAfter(child1);

      assert.deepEqual(elem.childNodes, [child1, child2]);
    });
    it('should insert context after argument', () => {
      const elem = nativeDocument.createElement('div');
      const child1 = nativeDocument.createElement('div');
      const child2 = nativeDocument.createElement('div');
      const child3 = nativeDocument.createElement('div');
      const wrap = new HtmlElement(child3);

      elem.appendChild(child1);
      elem.appendChild(child2);
      wrap.insertAfter(child1);

      assert.deepEqual(elem.childNodes, [child1, child3, child2]);
    });
    it('should support selector syntax', () => {
      const elem = nativeDocument.createElement('div');
      const child1 = nativeDocument.createElement('div');
      const child2 = nativeDocument.createElement('div');
      const child3 = nativeDocument.createElement('div');
      const wrap = new HtmlElement(child3);

      nativeDocument.body.appendChild(elem);
      child1.id = 'domc';
      elem.appendChild(child1);
      elem.appendChild(child2);
      wrap.insertAfter('#domc');

      assert.deepEqual(elem.childNodes, [child1, child3, child2]);

      elem.remove();
    });
  });
  describe('insertBefore()', () => {
    it('should insert context to the argument\'s parent\'s start if it\'s first child', () => {
      const elem = nativeDocument.createElement('div');
      const child1 = nativeDocument.createElement('div');
      const child2 = nativeDocument.createElement('div');
      const wrap = new HtmlElement(child2);

      elem.appendChild(child1);
      wrap.insertBefore(child1);

      assert.deepEqual(elem.childNodes, [child2, child1]);
    });
    it('should insert context before argument', () => {
      const elem = nativeDocument.createElement('div');
      const child1 = nativeDocument.createElement('div');
      const child2 = nativeDocument.createElement('div');
      const child3 = nativeDocument.createElement('div');
      const wrap = new HtmlElement(child3);

      elem.appendChild(child1);
      elem.appendChild(child2);
      wrap.insertBefore(child2);

      assert.deepEqual(elem.childNodes, [child1, child3, child2]);
    });
    it('should support selector syntax', () => {
      const elem = nativeDocument.createElement('div');
      const child1 = nativeDocument.createElement('div');
      const child2 = nativeDocument.createElement('div');
      const child3 = nativeDocument.createElement('div');
      const wrap = new HtmlElement(child3);

      nativeDocument.body.appendChild(elem);
      child2.id = 'domc';
      elem.appendChild(child1);
      elem.appendChild(child2);
      wrap.insertBefore('#domc');

      assert.deepEqual(elem.childNodes, [child1, child3, child2]);

      elem.remove();
    });
  });
  describe('into()', () => {
    it('should support (element) syntax', () => {
      const elem = nativeDocument.createElement('div');
      const parent = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.into(parent);

      assert.strictEqual(parent.contains(elem), true);
    });
    it('should support (D.HtmlElement) syntax', () => {
      const elem = nativeDocument.createElement('div');
      const parent = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);
      const parentWrap = new HtmlElement(parent);

      wrap.into(parentWrap);

      assert.strictEqual(parent.contains(elem), true);
    });
    it('should support (selector) syntax', () => {
      const elem = nativeDocument.createElement('div');
      const parent = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      parent.id = 'domc-parent';
      nativeDocument.body.appendChild(parent);
      wrap.into('body #domc-parent');

      assert.strictEqual(parent.contains(elem), true);

      parent.remove();
    });
  });
  // TODO: isBroken()
  describe('italic()', () => {
    it('should set font-style to italic', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.italic();

      assert.strictEqual(elem.style.fontStyle, 'italic');
    });
  });
  describe('last()', () => {
    it('should return wrap of the last child', () => {
      const elem1 = nativeDocument.createElement('div');
      const elem2 = nativeDocument.createElement('div');
      const child1 = nativeDocument.createElement('div');
      const child2 = nativeDocument.createElement('div');
      const wrap1 = new HtmlElement(elem1);
      const wrap2 = new HtmlElement(elem2);

      elem1.appendChild(child1);
      elem1.appendChild(child2);

      assert.strictEqual(wrap1.last().$, child2);
      assert.strictEqual(wrap2.last().$, null);
    });
    it('should return wrap of the last element child', () => {
      const elem = nativeDocument.createElement('div');
      const child1 = nativeDocument.createElement('div');
      const child2 = nativeDocument.createTextNode('div');
      const wrap = new HtmlElement(elem);

      elem.appendChild(child1);
      elem.appendChild(child2);

      assert.strictEqual(wrap.last(true).$, child1);
    });
  });
  describe('lineThrough()', () => {
    it('should set text-decoration-line to line-through', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.lineThrough();

      assert.strictEqual(elem.style.textDecorationLine, 'line-through');
    });
  });
  // TODO: load()
  describe('matches()', () => {
    it('should return if context matches selector', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      elem.id = 'foo';
      elem.className = 'bar';
      elem.setAttribute('baz', '');

      assert.strictEqual(wrap.matches('#foo.bar[baz]'), true);
      assert.strictEqual(wrap.matches('#foo.bar[bar]'), false);
    });
  });
  describe('moveAttr()', () => {
    it('should add attribute and set value to "" with 1 argument', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.moveAttr('domc1');

      assert.strictEqual(elem.getAttribute('domc1'), '');
    });
    it('should add attribute and set value to the second argument with 2 arguments', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.moveAttr('domc2', 'value');

      assert.strictEqual(elem.getAttribute('domc2'), 'value');
    });
    it('should move attribute and set value to previous with 1 argument', () => {
      const elem1 = nativeDocument.createElement('div');
      const elem2 = nativeDocument.createElement('div');
      const wrap1 = new HtmlElement(elem1);
      const wrap2 = new HtmlElement(elem2);

      wrap1.moveAttr('domc3', 'value');
      wrap2.moveAttr('domc3');

      assert.strictEqual(elem1.hasAttribute('domc3'), false);
      assert.strictEqual(elem2.getAttribute('domc3'), 'value');
    });
    it('should move attribute and set value to the second argument with 2 arguments', () => {
      const elem1 = nativeDocument.createElement('div');
      const elem2 = nativeDocument.createElement('div');
      const wrap1 = new HtmlElement(elem1);
      const wrap2 = new HtmlElement(elem2);

      wrap1.moveAttr('domc4', 'oldValue');
      wrap2.moveAttr('domc4', 'newValue');

      assert.strictEqual(elem1.hasAttribute('domc4'), false);
      assert.strictEqual(elem2.getAttribute('domc4'), 'newValue');
    });
  });
  describe('moveClass()', () => {
    it('should add class if there was no last element', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.moveClass('domc1');

      assert.strictEqual(elem.classList.contains('domc1'), true);
    });
    it('should move class if there was last element', () => {
      const elem1 = nativeDocument.createElement('div');
      const elem2 = nativeDocument.createElement('div');
      const wrap1 = new HtmlElement(elem1);
      const wrap2 = new HtmlElement(elem2);

      wrap1.moveClass('domc3');
      wrap2.moveClass('domc3');

      assert.strictEqual(elem1.classList.contains('domc3'), false);
      assert.strictEqual(elem2.classList.contains('domc3'), true);
    });
  });
  describe('get name', () => {
    it('should return tagName.toLowerCase()', () => {
      const div = nativeDocument.createElement('div');
      const input = nativeDocument.createElement('input');
      const fieldset = nativeDocument.createElement('fieldset');
      const divWrap = new HtmlElement(div);
      const inputWrap = new HtmlElement(input);
      const fieldsetWrap = new HtmlElement(fieldset);

      assert.strictEqual(divWrap.name, 'div');
      assert.strictEqual(inputWrap.name, 'input');
      assert.strictEqual(fieldsetWrap.name, 'fieldset');
    });
  });
  describe('next()', () => {
    it('should return a wrap of the next sibling', () => {
      const parent = nativeDocument.createElement('div');
      const elem1 = nativeDocument.createElement('div');
      const elem2 = nativeDocument.createElement('div');
      const wrap1 = new HtmlElement(elem1);
      const wrap2 = new HtmlElement(elem2);

      parent.appendChild(elem1);
      parent.appendChild(elem2);

      assert.strictEqual(wrap1.next().$, elem2);
      assert.strictEqual(wrap2.next().$, null);
    });
    it('should return a wrap of the next element sibling', () => {
      const elem = nativeDocument.createElement('div');
      const child1 = nativeDocument.createElement('div');
      const child2 = nativeDocument.createTextNode('div');
      const child3 = nativeDocument.createElement('div');
      const wrap = new HtmlElement(child1);

      elem.appendChild(child1);
      elem.appendChild(child2);
      elem.appendChild(child3);

      assert.strictEqual(wrap.next(true).$, child3);
    });
  });
  // TODO: off()
  describe('on()', () => {
    it('should support (event, listener) syntax', (done) => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.on('click', () => {
        done();
      });
      wrap.dispatch('click');
    });
    it('should support ({ [event]: listener, ... }) syntax', (done) => {
      let times = 0;

      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);
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
      const wrap = new HtmlElement(elem);
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
      const wrap = new HtmlElement(elem);

      elem.innerHTML = '<input />';

      assert.strictEqual(wrap.outerHTML, elem.outerHTML);
    });
  });
  describe('overline()', () => {
    it('should set text-decoration-line to overline', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.overline();

      assert.strictEqual(elem.style.textDecorationLine, 'overline');
    });
  });
  describe('parent()', () => {
    it('should return a wrap of the parent element', () => {
      const elem1 = nativeDocument.createElement('div');
      const elem2 = nativeDocument.createElement('div');
      const parent = nativeDocument.createElement('div');
      const wrap1 = new HtmlElement(elem1);
      const wrap2 = new HtmlElement(elem2);

      parent.appendChild(elem1);

      assert.strictEqual(wrap1.parent().$, parent);
      assert.strictEqual(wrap2.parent().$, null);
    });
  });
  describe('parentTree()', () => {
    it('should return the whole tree of parents', () => {
      const parent1 = nativeDocument.createElement('div');
      const parent2 = nativeDocument.createElement('div');
      const parent3 = nativeDocument.createElement('div');
      const child = nativeDocument.createElement('div');
      const wrap = new HtmlElement(child);

      parent1.appendChild(parent2);
      parent2.appendChild(parent3);
      parent3.appendChild(child);

      const tree = wrap.parentTree().$;

      assert.strictEqual(tree[0].$, parent3);
      assert.strictEqual(tree[1].$, parent2);
      assert.strictEqual(tree[2].$, parent1);
    });
  });
  describe('pointer()', () => {
    it('should set cursor to pointer', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.pointer();

      assert.strictEqual(elem.style.cursor, 'pointer');
    });
  });
  describe('prev()', () => {
    it('should return a wrap of the previous sibling', () => {
      const parent = nativeDocument.createElement('div');
      const elem1 = nativeDocument.createElement('div');
      const elem2 = nativeDocument.createElement('div');
      const wrap1 = new HtmlElement(elem1);
      const wrap2 = new HtmlElement(elem2);

      parent.appendChild(elem1);
      parent.appendChild(elem2);

      assert.strictEqual(wrap1.prev().$, null);
      assert.strictEqual(wrap2.prev().$, elem1);
    });
    it('should return a wrap of the previous element sibling', () => {
      const elem = nativeDocument.createElement('div');
      const child1 = nativeDocument.createElement('div');
      const child2 = nativeDocument.createTextNode('div');
      const child3 = nativeDocument.createElement('div');
      const wrap = new HtmlElement(child3);

      elem.appendChild(child1);
      elem.appendChild(child2);
      elem.appendChild(child3);

      assert.strictEqual(wrap.prev(true).$, child1);
    });
  });
  // TODO: ref()
  describe('relative()', () => {
    it('should set position to relative', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.relative();

      assert.strictEqual(elem.style.position, 'relative');
    });
  });
  describe('remove()', () => {
    it('should remove the element', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      nativeDocument.body.appendChild(elem);
      wrap.remove();

      assert.strictEqual(nativeDocument.body.contains(elem), false);
    });
  });
  describe('removeAttr()', () => {
    it('should remove attributes from arguments', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      elem.setAttribute('foo', 'bar');
      elem.setAttribute('bar', 'baz');
      elem.setAttribute('baz', 'foo');
      wrap.removeAttr('foo', 'bar', 'baz');

      assert.strictEqual(elem.hasAttribute('foo'), false);
      assert.strictEqual(elem.hasAttribute('bar'), false);
      assert.strictEqual(elem.hasAttribute('baz'), false);
    });
  });
  describe('removeClasses()', () => {
    it('should remove classes from arguments', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      elem.className = 'foo bar baz';
      wrap.removeClasses('foo', 'bar', 'baz');

      assert.strictEqual(elem.classList.contains('foo'), false);
      assert.strictEqual(elem.classList.contains('bar'), false);
      assert.strictEqual(elem.classList.contains('baz'), false);
    });
  });
  describe('removeCSS()', () => {
    it('should remove css properties from arguments', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      elem.style.display = 'inline';
      elem.style.cursor = 'pointer';
      elem.style.margin = '2px';

      wrap.removeCSS('display', 'cursor', 'margin');

      assert.strictEqual(elem.style.display, '');
      assert.strictEqual(elem.style.cursor, '');
      assert.strictEqual(elem.style.margin, '');
      assert.strictEqual(elem.style.marginLeft, '');
      assert.strictEqual(elem.style.marginTop, '');
      assert.strictEqual(elem.style.marginRight, '');
      assert.strictEqual(elem.style.marginBottom, '');
    });
  });
  // TODO: replace()
  describe('setOf', () => {
    it('should add set of elements of specified type', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);
      const elements = [];

      wrap.setOf('div', 3, (elem) => {
        elements.push(elem.$);
      });

      assert.deepEqual(elem.childNodes, elements);
    });
  });
  describe('show', () => {
    it('should not change display if it is not none and delete element.domcData.previousDisplay', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.hide();
      elem.style.display = 'inline';
      wrap.show();

      assert.strictEqual(elem.style.display, 'inline');
      assert.strictEqual('previousDisplay' in elem.domcData, false);
    });
    it('should set display to element.domcData.previousDisplay', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      elem.style.display = 'inline';
      wrap.hide();
      wrap.show();

      assert.strictEqual(elem.style.display, 'inline');
    });
  });
  describe('text()', () => {
    it('should get text of the element with no arguments', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      elem.innerHTML = '123';

      assert.strictEqual(wrap.text(), '123');
    });
    it('should set text of the element', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.text('123');

      assert.strictEqual(elem.innerHTML, '123');
    });
  });
  describe('toggleAttr()', () => {
    it('should toggle attribute from argument if it is one', () => {
      const elem1 = nativeDocument.createElement('div');
      const elem2 = nativeDocument.createElement('div');
      const wrap1 = new HtmlElement(elem1);
      const wrap2 = new HtmlElement(elem2);

      elem1.setAttribute('foo', 'bar');
      elem2.setAttribute('foo', 'bar');
      wrap1.toggleAttr('foo');
      wrap2.toggleAttr('baz');

      assert.strictEqual(elem1.hasAttribute('foo'), false);
      assert.strictEqual(elem2.hasAttribute('baz'), true);
    });
    it('should add attribute from the first argument if the second is truthy and remove if not', () => {
      const elem1 = nativeDocument.createElement('div');
      const elem2 = nativeDocument.createElement('div');
      const elem3 = nativeDocument.createElement('div');
      const elem4 = nativeDocument.createElement('div');
      const wrap1 = new HtmlElement(elem1);
      const wrap2 = new HtmlElement(elem2);
      const wrap3 = new HtmlElement(elem3);
      const wrap4 = new HtmlElement(elem4);

      elem1.setAttribute('foo', 'bar');
      elem2.setAttribute('foo', 'bar');
      elem3.setAttribute('foo', 'bar');
      elem4.setAttribute('foo', 'bar');

      wrap1.toggleAttr('foo', null);
      wrap2.toggleAttr('foo', 1);
      wrap3.toggleAttr('baz', null);
      wrap4.toggleAttr('baz', 1);

      assert.strictEqual(elem1.hasAttribute('foo'), false);
      assert.strictEqual(elem2.hasAttribute('foo'), true);
      assert.strictEqual(elem3.hasAttribute('baz'), false);
      assert.strictEqual(elem4.hasAttribute('baz'), true);
    });
  });
  describe('toggleClass()', () => {
    it('should toggle class from argument if it is one', () => {
      const elem1 = nativeDocument.createElement('div');
      const elem2 = nativeDocument.createElement('div');
      const wrap1 = new HtmlElement(elem1);
      const wrap2 = new HtmlElement(elem2);

      elem1.className = 'foo bar';
      elem2.className = 'foo bar';
      wrap1.toggleClass('foo');
      wrap2.toggleClass('baz');

      assert.strictEqual(elem1.classList.contains('foo'), false);
      assert.strictEqual(elem2.classList.contains('baz'), true);
    });
    it('should add class from the first argument if the second is truthy and remove if not', () => {
      const elem1 = nativeDocument.createElement('div');
      const elem2 = nativeDocument.createElement('div');
      const elem3 = nativeDocument.createElement('div');
      const elem4 = nativeDocument.createElement('div');
      const wrap1 = new HtmlElement(elem1);
      const wrap2 = new HtmlElement(elem2);
      const wrap3 = new HtmlElement(elem3);
      const wrap4 = new HtmlElement(elem4);

      elem1.className = 'foo bar';
      elem2.className = 'foo bar';
      elem3.className = 'foo bar';
      elem4.className = 'foo bar';

      wrap1.toggleClass('foo', null);
      wrap2.toggleClass('foo', 1);
      wrap3.toggleClass('baz', null);
      wrap4.toggleClass('baz', 1);

      assert.strictEqual(elem1.classList.contains('foo'), false);
      assert.strictEqual(elem2.classList.contains('foo'), true);
      assert.strictEqual(elem3.classList.contains('baz'), false);
      assert.strictEqual(elem4.classList.contains('baz'), true);
    });
  });
  describe('type()', () => {
    it('should return type with no arguments', () => {
      const elem = nativeDocument.createElement('input');
      const wrap = new HtmlElement(elem);

      elem.type = 'email';

      assert.strictEqual(wrap.type(), 'email');
    });
    it('should set type with more arguments', () => {
      const elem = nativeDocument.createElement('input');
      const wrap = new HtmlElement(elem);

      wrap.type('email');

      assert.strictEqual(elem.type, 'email');
    });
  });
  describe('underline()', () => {
    it('should set text-decoration-line to underline', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.underline();

      assert.strictEqual(elem.style.textDecorationLine, 'underline');
    });
  });
  describe('up()', () => {
    it('should return a wrap of the parent element with no arguments', () => {
      const elem = nativeDocument.createElement('div');
      const parent = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      parent.appendChild(elem);

      assert.strictEqual(wrap.up().$, parent);
    });
    it('should return a wrap of the element with 0 argument', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      assert.strictEqual(wrap.up(0).$, elem);
    });
    it('should return a wrap of the n-th parent element with n argument', () => {
      const parent1 = nativeDocument.createElement('div');
      const parent2 = nativeDocument.createElement('div');
      const parent3 = nativeDocument.createElement('div');
      const child = nativeDocument.createElement('div');
      const wrap = new HtmlElement(child);

      parent1.appendChild(parent2);
      parent2.appendChild(parent3);
      parent3.appendChild(child);

      assert.strictEqual(wrap.up(1).$, parent3);
      assert.strictEqual(wrap.up(2).$, parent2);
      assert.strictEqual(wrap.up(3).$, parent1);
    });
  });
  describe('get valid', () => {
    it('should return true if element is not validated', () => {
      const elem = nativeDocument.createElement('div');
      const wrap = new HtmlElement(elem);

      assert.strictEqual(wrap.valid, true);
    });
    it('should return if the element is valid', () => {
      const elem1 = nativeDocument.createElement('input');
      const elem2 = nativeDocument.createElement('input');
      const elem3 = nativeDocument.createElement('input');
      const elem4 = nativeDocument.createElement('input');
      const wrap1 = new HtmlElement(elem1);
      const wrap2 = new HtmlElement(elem2);
      const wrap3 = new HtmlElement(elem3);
      const wrap4 = new HtmlElement(elem4);

      elem1.required = true;
      elem3.type = 'email';
      elem3.value = '123';
      elem4.type = 'email';
      elem4.value = 'example@subdomain.domain';

      assert.strictEqual(wrap1.valid, false);
      assert.strictEqual(wrap2.valid, true);
      assert.strictEqual(wrap3.valid, false);
      assert.strictEqual(wrap4.valid, true);
    });
  });
  describe('value()', () => {
    it('should return value with no arguments', () => {
      const elem = nativeDocument.createElement('input');
      const wrap = new HtmlElement(elem);

      elem.value = 'domc';

      assert.strictEqual(wrap.value(), 'domc');
    });
    it('should set value with more arguments', () => {
      const elem = nativeDocument.createElement('input');
      const wrap = new HtmlElement(elem);

      wrap.value('domc');

      assert.strictEqual(elem.value, 'domc');
    });
  });
});

describe('it should test exported methods from HtmlElement', () => {
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

      assert.strictEqual(find('.foo').$, child1);

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

      assert.strictEqual(find('.bar').$, null);

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

      assert.strictEqual(found[0].$, child1);
      assert.strictEqual(found[1].$, child3);

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

      assert.deepEqual(findAll('.bar').$, []);

      elem.remove();
    });
  });
  describe('loadImages()', () => {
    it('return promise.all for all images', function (done) {
      this.timeout(5000);
      const source = [
        'https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png',
        'http://cdni.wired.co.uk/1920x1280/g_j/GOOGLELOGO_1.jpg',
        'https://www.facebookbrand.com/img/fb-art.jpg'
      ];

      loadImages(new Super(source))
        .then((images) => {
          assert.deepEqual(images.map((img) => img.ref()).$, source);

          done();
        })
        .catch(done);
    });
    it('return resolve already loaded images as well', function (done) {
      const source = 'https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png';
      const img = nativeDocument.createElement('img');
      img.onload = load;
      img.src = source;

      function load() {
        loadImages([img])
          .then((images) => {
            assert.strictEqual(images.$[0].ref(), source);

            done();
          })
          .catch(done);
      }
    });
    it('return resolve broken images as well', function (done) {
      this.timeout(3000);
      const source = 'http://localhost/some/broken/image';

      loadImages([source])
        .then((images) => {
          assert.strictEqual(images.$[0].ref(), source);

          done();
        })
        .catch(done);
    });
  });
  // TODO: px()
});

describe('it should test HtmlCollection#', () => {
  const count = 3;
  let wrap;

  beforeEach(() => {
    array(count, () => {
      const elem = nativeDocument.createElement('div');
      elem.className = 'foo';
      nativeDocument.body.appendChild(elem);
    });

    wrap = new HtmlCollection(nativeDocument.getElementsByClassName('foo'));
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
        assert.strictEqual(elem.parent().$, parent);
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
        assert.strictEqual(elem.css('display'), 'none');
        assert.strictEqual(elem.$.domcData.previousDisplay, 'inline');
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

      assert.strictEqual(nativeDocument.getElementsByClassName('foo').length, all - count);
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
        assert.strictEqual(elem.css('display'), 'inline');
      });
    });
  });
});

describe('it should test String#', () => {
  // TODO: parseHTML()
});
