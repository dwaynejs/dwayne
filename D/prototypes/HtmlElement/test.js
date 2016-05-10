import HtmlElement, { window } from './module';
import Super from '../Super';
import css from './css';
import elements from './elements';
import events from './events';
import * as assert from 'assert';

describe('it should test HtmlElement::[methods]', () => {
  describe('absolute()', () => {
    it('should set position to absolute', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.absolute();

      assert.strictEqual(elem.style.position, 'absolute');
    });
  });
  describe('addClasses()', () => {
    it('should add classes from arguments', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.addClasses('foo', 'bar', 'baz');

      assert.strictEqual(elem.classList.contains('foo'), true);
      assert.strictEqual(elem.classList.contains('bar'), true);
      assert.strictEqual(elem.classList.contains('baz'), true);
    });
  });
  describe('addHtml()', () => {
    it('should add html to the end', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);
      
      elem.innerHTML = '123';
      wrap.addHtml('<div></div>');
      
      assert.strictEqual(elem.innerHTML, '123<div></div>');
    });
  });
  describe('addText()', () => {
    it('should add text to the end', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);
      
      elem.innerHTML = '123';
      wrap.addText('<div></div>');
      
      assert.strictEqual(elem.innerHTML, '123&lt;div&gt;&lt;/div&gt;');
    });
  });
  describe('apply()', () => {
    it('should set id to the value from the string', () => {
      const elem1 = document.createElement('div');
      const elem2 = document.createElement('div');
      const elem3 = document.createElement('div');
      const elem4 = document.createElement('div');
      const elem5 = document.createElement('div');
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
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.apply('.domc');

      assert.strictEqual(elem.classList.contains('domc'), true);
    });
    it('should set float to left', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.apply('<--');

      assert.strictEqual(elem.style.float, 'left');
    });
    it('should set float to right', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.apply('-->');

      assert.strictEqual(elem.style.float, 'right');
    });
    it('should set ref to the value from the string', () => {
      const elem = document.createElement('img');
      const wrap = new HtmlElement(elem);

      wrap.apply('->/test.html');

      assert.strictEqual(elem.getAttribute('src'), '/test.html');
    });
    it('should remove class from the string', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      elem.className = 'foo bar baz';
      wrap.apply('-.bar');

      assert.strictEqual(elem.classList.contains('bar'), false);
    });
    it('should remove css property from the string', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      elem.style.display = 'inline';
      wrap.apply('-@display');

      assert.strictEqual(elem.style.display, '');
    });
    it('should remove attribute from the string', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      elem.setAttribute('foo', 'bar');
      wrap.apply('-foo');

      assert.strictEqual(elem.hasAttribute('foo'), false);
    });
    it('should put element to the element presented by selector from the string', () => {
      const elem1 = document.createElement('div');
      const elem2 = document.createElement('div');
      const elem3 = document.createElement('div');
      const elem4 = document.createElement('div');
      const parent1 = document.createElement('div');
      const parent2 = document.createElement('div');
      const parent3 = document.createElement('div');
      const parent4 = document.createElement('div');
      const wrap1 = new HtmlElement(elem1);
      const wrap2 = new HtmlElement(elem2);
      const wrap3 = new HtmlElement(elem3);
      const wrap4 = new HtmlElement(elem4);

      parent1.id = 'domc-parent1';
      parent2.id = 'domc-parent2';
      parent3.id = 'domc-parent3';
      parent4.id = 'domc-parent4';

      document.body.appendChild(parent1);
      document.body.appendChild(parent2);
      document.body.appendChild(parent3);
      document.body.appendChild(parent4);

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
      const elem1 = document.createElement('div');
      const elem2 = document.createElement('div');
      const wrap1 = new HtmlElement(elem1);
      const wrap2 = new HtmlElement(elem2);

      wrap1.moveClass('domc');
      wrap2.apply('=>.domc');

      assert.strictEqual(elem1.classList.contains('domc'), false);
      assert.strictEqual(elem2.classList.contains('domc'), true);
    });
    it('should move attribute from the string', () => {
      const elem1 = document.createElement('div');
      const elem2 = document.createElement('div');
      const wrap1 = new HtmlElement(elem1);
      const wrap2 = new HtmlElement(elem2);

      wrap1.moveAttr('domc', 'value');
      wrap2.apply('=>domc');

      assert.strictEqual(elem1.hasAttribute('domc'), false);
      assert.strictEqual(elem2.getAttribute('domc'), 'value');
    });
    it('should toggle class from the string', () => {
      const elem1 = document.createElement('div');
      const elem2 = document.createElement('div');
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
      const elem1 = document.createElement('div');
      const elem2 = document.createElement('div');
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
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.apply('*domc text*');

      assert.strictEqual(wrap.text(), 'domc text');
    });
    it('should add text from the string', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.text('some text');
      wrap.apply('+* and another text*');

      assert.strictEqual(wrap.text(), 'some text and another text');
    });
    it('should set html to the value from the string', () => {
      const elem1 = document.createElement('div');
      const elem2 = document.createElement('div');
      const elem3 = document.createElement('div');
      const elem4 = document.createElement('div');
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
      const elem1 = document.createElement('div');
      const elem2 = document.createElement('div');
      const elem3 = document.createElement('div');
      const elem4 = document.createElement('div');
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
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.apply('$a');

      assert.strictEqual(elem.style.position, 'absolute');
    });
    it('should set font-weight to bold', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.apply('$b');

      assert.strictEqual(elem.style.fontWeight, 'bold');
    });
    it('should set text-align to center', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.apply('$c');

      assert.strictEqual(elem.style.textAlign, 'center');
    });
    it('should set position to fixed', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.apply('$f');

      assert.strictEqual(elem.style.position, 'fixed');
    });
    it('should hide the element', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.apply('$h');

      assert.strictEqual(elem.style.display, 'none');
    });
    it('should set font-style to italic', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.apply('$i');

      assert.strictEqual(elem.style.fontStyle, 'italic');
    });
    it('should set position to relative', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.apply('$r');

      assert.strictEqual(elem.style.position, 'relative');
    });
    it('should show the element', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      elem.style.display = 'inline';
      wrap.hide();
      wrap.apply('$s');

      assert.strictEqual(elem.style.display, 'inline');
    });
    it('should set opacity to 0', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.apply('$t');

      assert.strictEqual(elem.style.opacity, '0');
    });
    it('should set text-decoration-line to underline', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.apply('$u');

      assert.strictEqual(elem.style.textDecorationLine, 'underline');
    });
    it('should set css property from the string to the value from the string', () => {
      const elem1 = document.createElement('div');
      const elem2 = document.createElement('div');
      const elem3 = document.createElement('div');
      const elem4 = document.createElement('div');
      const elem5 = document.createElement('div');
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
      const elem1 = document.createElement('div');
      const elem2 = document.createElement('div');
      const elem3 = document.createElement('div');
      const elem4 = document.createElement('div');
      const elem5 = document.createElement('div');
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
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.apply('domc');

      assert.strictEqual(elem.hasAttribute('domc'), true);
    });
  });
  describe('attr()', () => {
    it('should return wrap of an object of attributes with no arguments', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      elem.setAttribute('data', '123');
      elem.setAttribute('contentEditable', '');

      assert.deepEqual(wrap.attr().$, { data: '123', contenteditable: '' });
    });
    it('should return value of an attribute with first string argument', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      elem.setAttribute('data', '123');

      assert.strictEqual(wrap.attr('data'), '123');
    });
    it('should support (attr, value) syntax', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.attr('data', '123');

      assert.strictEqual(elem.getAttribute('data'), '123');
    });
    it('should support object property syntax', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.attr({ data: '123', contentEditable: '' });

      assert.strictEqual(elem.getAttribute('data'), '123');
      assert.strictEqual(elem.getAttribute('contentEditable'), '');
    });
  });
  describe('block()', () => {
    it('should set display to block', () => {
      const elem = document.createElement('span');
      const wrap = new HtmlElement(elem);

      wrap.block();

      assert.strictEqual(elem.style.display, 'block');
    });
  });
  describe('bold()', () => {
    it('should set font-weight to bold', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.bold();

      assert.strictEqual(elem.style.fontWeight, 'bold');
    });
  });
  describe('centerText()', () => {
    it('should set text-align to center', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.centerText();

      assert.strictEqual(elem.style.textAlign, 'center');
    });
  });
  describe('child()', () => {
    it('should support (element) syntax', () => {
      const elem = document.createElement('div');
      const child = document.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.child(child);

      assert.strictEqual(elem.contains(child), true);
    });
    it('should support (D.HtmlElement) syntax', () => {
      const elem = document.createElement('div');
      const child = document.createElement('div');
      const wrap = new HtmlElement(elem);
      const childWrap = new HtmlElement(child);

      wrap.child(childWrap);

      assert.strictEqual(elem.contains(child), true);
    });
    it('should support (selector) syntax', () => {
      const elem = document.createElement('div');
      const child = document.createElement('div');
      const wrap = new HtmlElement(elem);

      child.id = 'domc-child';
      document.body.appendChild(child);
      wrap.child('body #domc-child');

      assert.strictEqual(elem.contains(child), true);
    });
  });
  describe('children()', () => {
    it('should support (element) syntax', () => {
      const elem = document.createElement('div');
      const child1 = document.createElement('div');
      const child2 = document.createElement('div');
      const wrap = new HtmlElement(elem);

      elem.appendChild(child1);
      elem.appendChild(child2);

      assert.deepEqual(wrap.children().$, [child1, child2]);
    });
  });
  describe('class()', () => {
    it('should return wrap of an array of classes with no arguments', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      elem.className = 'foo bar baz';

      assert.deepEqual(wrap.class().$, ['foo', 'bar', 'baz']);
    });
    it('should set className with more arguments', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.class('foo bar baz');

      assert.strictEqual(elem.className, 'foo bar baz');
    });
  });
  describe('click()', () => {
    it('should click the element', (done) => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.on('click', () => {
        done();
      });

      wrap.click();
    });
  });
  // TODO: .closest()
  describe('get clientHeight', () => {
    it('should return the same as element.clientHeight', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      elem.innerHTML = '123';
      document.body.appendChild(elem);

      assert.strictEqual(wrap.clientHeight, elem.clientHeight);

      elem.remove();
    });
  });
  describe('get clientLeft', () => {
    it('should return the same as element.clientLeft', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      elem.innerHTML = '123';
      document.body.appendChild(elem);

      assert.strictEqual(wrap.clientLeft, elem.clientLeft);

      elem.remove();
    });
  });
  describe('get clientTop', () => {
    it('should return the same as element.clientTop', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      elem.innerHTML = '123';
      document.body.appendChild(elem);

      assert.strictEqual(wrap.clientTop, elem.clientTop);

      elem.remove();
    });
  });
  describe('get clientWidth', () => {
    it('should return the same as element.clientWidth', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      elem.innerHTML = '123';
      document.body.appendChild(elem);

      assert.strictEqual(wrap.clientWidth, elem.clientWidth);

      elem.remove();
    });
  });
  // TODO: .clone()
  // TODO: .contains()
  describe('css()', () => {
    it('should return wrap of an object of css properties with no arguments', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      elem.style.display = 'inline';
      elem.style.textAlign = 'center';
      elem.style.border = '1px solid black';

      assert.deepEqual(wrap.css().$, { display: 'inline', textAlign: 'center', border: '1px solid black' });
    });
    it('should return value of css property with first string argument', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      elem.style.display = 'inline';

      assert.strictEqual(wrap.css('display'), 'inline');
    });
    it('should support (attr, value) syntax', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.css('display', 'inline');

      assert.strictEqual(elem.style.display, 'inline');
    });
    it('should support object property syntax', () => {
      const elem = document.createElement('div');
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
          const elem = document.createElement('div');
          const wrap = new HtmlElement(elem);

          elem.style[css] = 'initial';

          assert.strictEqual(wrap[css](), 'initial');
        });
    });
    it('should check that set methods are working', () => {
      new Super(css).keys().forEach((value) => {
        const elem = document.createElement('div');
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
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      const input = wrap.create('input').$;

      assert.strictEqual(input.parentNode, elem);
      assert.strictEqual(input.tagName.toLowerCase(), 'input');
    });
    it('should use second argument as applied expression', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      const input = wrap.create('input', '#123').$;

      assert.strictEqual(input.parentNode, elem);
      assert.strictEqual(input.tagName.toLowerCase(), 'input');
      assert.strictEqual(input.id, '123');
    });
  });
  describe('[html-element]()', () => {
    it('should return wrap of a new element inside context', () => {
      new Super(elements)
        .keys()
        .filter((type) => type !== 'html')
        .forEach((type) => {
          const elem = document.createElement('div');
          const wrap = new HtmlElement(elem);

          const created = wrap[type]().$;

          assert.strictEqual(created.parentNode, elem);
          assert.strictEqual(created.tagName.toLowerCase(), type);
        });
    });
    it('should use first argument as applied expression', () => {
      new Super(elements)
        .keys()
        .filter((type) => type !== 'html')
        .forEach((type) => {
          const elem = document.createElement('div');
          const wrap = new HtmlElement(elem);

          const created = wrap[type]('.' + type).$;

          assert.strictEqual(created.parentNode, elem);
          assert.strictEqual(created.tagName.toLowerCase(), type);
          assert.strictEqual(created.className, type);
        });
    });
  });
  describe('dataset()', () => {
    it('should return wrap of a dataset object', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      elem.setAttribute('data-domc-foo', '123');
      elem.setAttribute('data-domc-bar', '456');

      assert.deepEqual(wrap.dataset().$, { domcFoo: '123', domcBar: '456' });
    });
  });
  // TODO: .deepClone()
  describe('defaultValue()', () => {
    it('should return default value with no arguments', () => {
      const elem = document.createElement('input');
      const wrap = new HtmlElement(elem);

      elem.defaultValue = '123';

      assert.strictEqual(wrap.defaultValue(), '123');
    });
    it('should set default value with more arguments', () => {
      const elem = document.createElement('input');
      const wrap = new HtmlElement(elem);

      wrap.defaultValue('123');

      assert.strictEqual(elem.defaultValue, '123');
    });
  });
  describe('disabled()', () => {
    it('should set disabled state to true with no arguments', () => {
      const elem = document.createElement('button');
      const wrap = new HtmlElement(elem);

      wrap.disabled();

      assert.strictEqual(elem.disabled, true);
    });
    it('should set disabled state to Boolean(argument)', () => {
      const elem = document.createElement('button');
      const wrap = new HtmlElement(elem);

      wrap.disabled(null);

      assert.strictEqual(elem.disabled, false);
    });
  });
  // TODO: .dispatch()
  describe('draggable()', () => {
    it('should set draggable state to true with no arguments', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.draggable();

      assert.strictEqual(elem.draggable, true);
    });
    it('should set draggable state to Boolean(argument)', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.draggable(null);

      assert.strictEqual(elem.draggable, false);
    });
  });
  describe('editable()', () => {
    it('should set contentEditable state to true with no arguments', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.editable();

      assert.strictEqual(elem.contentEditable, 'true');
    });
    it('should set contentEditable state to Boolean(argument)', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.editable(null);

      assert.notStrictEqual(elem.contentEditable, 'true');
    });
  });
  // TODO: .find()
  // TODO: .findAll()
  describe('firstChild()', () => {
    it('should return wrap of the first child', () => {
      const elem1 = document.createElement('div');
      const elem2 = document.createElement('div');
      const child1 = document.createElement('div');
      const child2 = document.createElement('div');
      const wrap1 = new HtmlElement(elem1);
      const wrap2 = new HtmlElement(elem2);

      elem1.appendChild(child1);
      elem1.appendChild(child2);

      assert.strictEqual(wrap1.firstChild().$, child1);
      assert.strictEqual(wrap2.firstChild().$, null);
    });
  });
  describe('fixed()', () => {
    it('should set position to fixed', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.fixed();

      assert.strictEqual(elem.style.position, 'fixed');
    });
  });
  describe('hasAttr()', () => {
    it('should return true if the element has class', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      elem.setAttribute('foo', 'bar');
      elem.setAttribute('bar', 'baz');
      elem.setAttribute('baz', 'foo');

      assert.strictEqual(wrap.hasAttr('bar'), true);
    });
    it('should return false if the element does not have class', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      elem.setAttribute('foo', 'bar');
      elem.setAttribute('bar', 'baz');
      elem.setAttribute('baz', 'foo');

      assert.strictEqual(wrap.hasAttr('a'), false);
    });
  });
  describe('hasClass()', () => {
    it('should return true if the element has class', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      elem.className = 'foo bar baz';

      assert.strictEqual(wrap.hasClass('bar'), true);
    });
    it('should return false if the element does not have class', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      elem.className = 'foo bar baz';

      assert.strictEqual(wrap.hasClass('a'), false);
    });
  });
  describe('hide', () => {
    it('should set display to none and set element.domcData.previousDisplay to previous display', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      elem.style.display = 'inline';
      wrap.hide();

      assert.strictEqual(elem.style.display, 'none');
      assert.strictEqual(elem.domcData.previousDisplay, 'inline');
    });
  });
  describe('html()', () => {
    it('should return innerHTML with no arguments', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      elem.innerHTML = '<div></div>';

      assert.strictEqual(wrap.html(), '<div></div>');
    });
    it('should set innerHTML with more arguments', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.html('<div></div>');

      assert.strictEqual(elem.innerHTML, '<div></div>');
    });
  });
  describe('id()', () => {
    it('should return id with no arguments', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      elem.id = 'domc';

      assert.strictEqual(wrap.id(), 'domc');
    });
    it('should set id with more arguments', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.id('domc');

      assert.strictEqual(elem.id, 'domc');
    });
  });
  describe('inline()', () => {
    it('should set display to inline', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.inline();

      assert.strictEqual(elem.style.display, 'inline');
    });
  });
  describe('inlineBlock()', () => {
    it('should set display to inline-block', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.inlineBlock();

      assert.strictEqual(elem.style.display, 'inline-block');
    });
  });
  // TODO: .insertAfter()
  // TODO: .insertBefore()
  describe('into()', () => {
    it('should support (element) syntax', () => {
      const elem = document.createElement('div');
      const parent = document.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.into(parent);

      assert.strictEqual(parent.contains(elem), true);
    });
    it('should support (D.HtmlElement) syntax', () => {
      const elem = document.createElement('div');
      const parent = document.createElement('div');
      const wrap = new HtmlElement(elem);
      const parentWrap = new HtmlElement(parent);

      wrap.into(parentWrap);

      assert.strictEqual(parent.contains(elem), true);
    });
    it('should support (selector) syntax', () => {
      const elem = document.createElement('div');
      const parent = document.createElement('div');
      const wrap = new HtmlElement(elem);

      parent.id = 'domc-parent';
      document.body.appendChild(parent);
      wrap.into('body #domc-parent');

      assert.strictEqual(parent.contains(elem), true);

      parent.remove();
    });
  });
  describe('italic()', () => {
    it('should set font-style to italic', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.italic();

      assert.strictEqual(elem.style.fontStyle, 'italic');
    });
  });
  describe('lastChild()', () => {
    it('should return wrap of the last child', () => {
      const elem1 = document.createElement('div');
      const elem2 = document.createElement('div');
      const child1 = document.createElement('div');
      const child2 = document.createElement('div');
      const wrap1 = new HtmlElement(elem1);
      const wrap2 = new HtmlElement(elem2);

      elem1.appendChild(child1);
      elem1.appendChild(child2);

      assert.strictEqual(wrap1.lastChild().$, child2);
      assert.strictEqual(wrap2.lastChild().$, null);
    });
  });
  describe('lineThrough()', () => {
    it('should set text-decoration-line to line-through', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.lineThrough();

      assert.strictEqual(elem.style.textDecorationLine, 'line-through');
    });
  });
  // TODO: .matches()
  describe('moveAttr()', () => {
    it('should add attribute and set value to "" with 1 argument', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.moveAttr('domc1');

      assert.strictEqual(elem.getAttribute('domc1'), '');
    });
    it('should add attribute and set value to the second argument with 2 arguments', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.moveAttr('domc2', 'value');

      assert.strictEqual(elem.getAttribute('domc2'), 'value');
    });
    it('should move attribute and set value to previous with 1 argument', () => {
      const elem1 = document.createElement('div');
      const elem2 = document.createElement('div');
      const wrap1 = new HtmlElement(elem1);
      const wrap2 = new HtmlElement(elem2);

      wrap1.moveAttr('domc3', 'value');
      wrap2.moveAttr('domc3');

      assert.strictEqual(elem1.hasAttribute('domc3'), false);
      assert.strictEqual(elem2.getAttribute('domc3'), 'value');
    });
    it('should move attribute and set value to the second argument with 2 arguments', () => {
      const elem1 = document.createElement('div');
      const elem2 = document.createElement('div');
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
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.moveClass('domc1');

      assert.strictEqual(elem.classList.contains('domc1'), true);
    });
    it('should move class if there was last element', () => {
      const elem1 = document.createElement('div');
      const elem2 = document.createElement('div');
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
      const div = document.createElement('div');
      const input = document.createElement('input');
      const fieldset = document.createElement('fieldset');
      const divWrap = new HtmlElement(div);
      const inputWrap = new HtmlElement(input);
      const fieldsetWrap = new HtmlElement(fieldset);

      assert.strictEqual(divWrap.name, 'div');
      assert.strictEqual(inputWrap.name, 'input');
      assert.strictEqual(fieldsetWrap.name, 'fieldset');
    });
  });
  describe('next()', () => {
    it('should return a wrap of the next element', () => {
      const parent = document.createElement('div');
      const elem1 = document.createElement('div');
      const elem2 = document.createElement('div');
      const wrap1 = new HtmlElement(elem1);
      const wrap2 = new HtmlElement(elem2);

      parent.appendChild(elem1);
      parent.appendChild(elem2);

      assert.strictEqual(wrap1.next().$, elem2);
      assert.strictEqual(wrap2.next().$, null);
    });
  });
  describe('get offsetHeight', () => {
    it('should return the same as element.offsetHeight', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      elem.innerHTML = '123';
      document.body.appendChild(elem);

      assert.strictEqual(wrap.offsetHeight, elem.offsetHeight);

      elem.remove();
    });
  });
  describe('get offsetLeft', () => {
    it('should return the same as element.offsetLeft', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      elem.innerHTML = '123';
      document.body.appendChild(elem);

      assert.strictEqual(wrap.offsetLeft, elem.offsetLeft);

      elem.remove();
    });
  });
  describe('get offsetTop', () => {
    it('should return the same as element.offsetTop', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      elem.innerHTML = '123';
      document.body.appendChild(elem);

      assert.strictEqual(wrap.offsetTop, elem.offsetTop);

      elem.remove();
    });
  });
  describe('get offsetWidth', () => {
    it('should return the same as element.offsetWidth', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      elem.innerHTML = '123';
      document.body.appendChild(elem);

      assert.strictEqual(wrap.offsetWidth, elem.offsetWidth);

      elem.remove();
    });
  });
  describe('on()', () => {
    it('should support (event, listener) syntax', (done) => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.on('click', () => {
        done();
      });
      wrap.dispatch('click');
    });
    it('should support { [event]: listener, ... } syntax', (done) => {
      let times = 0;

      const elem = document.createElement('div');
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
    it('should return removeEventListeners function', (done) => {
      let times = 0;

      const elem = document.createElement('div');
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
  });
  describe('[on-event]()', () => {
    it('should return <context>[on-event] without arguments', () => {
      new Super(events)
        .keys()
        .forEach((onevent) => {
          const listener = () => {};

          window.$[onevent] = listener;

          assert.strictEqual(window[onevent](), listener);
        });
    });
    it('should set <context>[on-event] with listener argument', () => {
      new Super(events)
        .keys()
        .forEach((onevent) => {
          const listener = () => {};

          window[onevent](listener);

          assert.strictEqual(window.$[onevent], listener);
        });
    });
  });
  describe('get outerHtml', () => {
    it('should return the same as element.outerHTML', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      elem.innerHTML = '<input />';

      assert.strictEqual(wrap.outerHtml, elem.outerHTML);
    });
  });
  describe('get outerText', () => {
    it('should return the same as element.outerText', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      elem.innerHTML = '123<input />123';

      assert.strictEqual(wrap.outerText, elem.outerText);
    });
  });
  describe('overline()', () => {
    it('should set text-decoration-line to overline', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.overline();

      assert.strictEqual(elem.style.textDecorationLine, 'overline');
    });
  });
  describe('parent()', () => {
    it('should return a wrap of the parent element', () => {
      const elem1 = document.createElement('div');
      const elem2 = document.createElement('div');
      const parent = document.createElement('div');
      const wrap1 = new HtmlElement(elem1);
      const wrap2 = new HtmlElement(elem2);

      parent.appendChild(elem1);

      assert.strictEqual(wrap1.parent().$, parent);
      assert.strictEqual(wrap2.parent().$, null);
    });
  });
  // TODO: .parentTree()
  describe('pointer()', () => {
    it('should set cursor to pointer', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.pointer();

      assert.strictEqual(elem.style.cursor, 'pointer');
    });
  });
  describe('prev()', () => {
    it('should return a wrap of the previous element', () => {
      const parent = document.createElement('div');
      const elem1 = document.createElement('div');
      const elem2 = document.createElement('div');
      const wrap1 = new HtmlElement(elem1);
      const wrap2 = new HtmlElement(elem2);

      parent.appendChild(elem1);
      parent.appendChild(elem2);

      assert.strictEqual(wrap1.prev().$, null);
      assert.strictEqual(wrap2.prev().$, elem1);
    });
  });
  // TODO: .putAfter()
  // TODO: .putBefore()
  // TODO: .ref()
  describe('relative()', () => {
    it('should set position to relative', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.relative();

      assert.strictEqual(elem.style.position, 'relative');
    });
  });
  describe('remove()', () => {
    it('should remove the element', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      document.body.appendChild(elem);
      wrap.remove();

      assert.strictEqual(document.body.contains(elem), false);
    });
  });
  describe('removeAttr()', () => {
    it('should remove attributes from arguments', () => {
      const elem = document.createElement('div');
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
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      elem.className = 'foo bar baz';
      wrap.removeClasses('foo', 'bar', 'baz');

      assert.strictEqual(elem.classList.contains('foo'), false);
      assert.strictEqual(elem.classList.contains('bar'), false);
      assert.strictEqual(elem.classList.contains('baz'), false);
    });
  });
  // TODO: .removeCss()
  // TODO: .replace()
  describe('get scrollHeight', () => {
    it('should return the same as element.scrollHeight', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      elem.innerHTML = '123';
      document.body.appendChild(elem);

      assert.strictEqual(wrap.scrollHeight, elem.scrollHeight);

      elem.remove();
    });
  });
  describe('get scrollLeft', () => {
    it('should return the same as element.scrollLeft', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      elem.innerHTML = '123';
      document.body.appendChild(elem);

      assert.strictEqual(wrap.scrollLeft, elem.scrollLeft);

      elem.remove();
    });
  });
  describe('get scrollTop', () => {
    it('should return the same as element.scrollTop', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      elem.innerHTML = '123';
      document.body.appendChild(elem);

      assert.strictEqual(wrap.scrollTop, elem.scrollTop);

      elem.remove();
    });
  });
  describe('get scrollWidth', () => {
    it('should return the same as element.scrollWidth', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      elem.innerHTML = '123';
      document.body.appendChild(elem);

      assert.strictEqual(wrap.scrollWidth, elem.scrollWidth);

      elem.remove();
    });
  });
  // TODO: .setOf()
  describe('show', () => {
    it('should not change display if it is not none and delete element.domcData.previousDisplay', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.hide();
      elem.style.display = 'inline';
      wrap.show();

      assert.strictEqual(elem.style.display, 'inline');
      assert.strictEqual('previousDisplay' in elem.domcData, false);
    });
    it('should set display to element.domcData.previousDisplay and delete it', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      elem.style.display = 'inline';
      wrap.hide();
      wrap.show();

      assert.strictEqual(elem.style.display, 'inline');
      assert.strictEqual('previousDisplay' in elem.domcData, false);
    });
  });
  // TODO: .text()
  describe('toggleAttr()', () => {
    it('should toggle attribute from argument if it is one', () => {
      const elem1 = document.createElement('div');
      const elem2 = document.createElement('div');
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
      const elem1 = document.createElement('div');
      const elem2 = document.createElement('div');
      const elem3 = document.createElement('div');
      const elem4 = document.createElement('div');
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
      const elem1 = document.createElement('div');
      const elem2 = document.createElement('div');
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
      const elem1 = document.createElement('div');
      const elem2 = document.createElement('div');
      const elem3 = document.createElement('div');
      const elem4 = document.createElement('div');
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
      const elem = document.createElement('input');
      const wrap = new HtmlElement(elem);

      elem.type = 'email';

      assert.strictEqual(wrap.type(), 'email');
    });
    it('should set type with more arguments', () => {
      const elem = document.createElement('input');
      const wrap = new HtmlElement(elem);

      wrap.type('email');

      assert.strictEqual(elem.type, 'email');
    });
  });
  describe('underline()', () => {
    it('should set text-decoration-line to underline', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      wrap.underline();

      assert.strictEqual(elem.style.textDecorationLine, 'underline');
    });
  });
  describe('up()', () => {
    it('should return a wrap of the parent element with no arguments', () => {
      const elem = document.createElement('div');
      const parent = document.createElement('div');
      const wrap = new HtmlElement(elem);

      parent.appendChild(elem);

      assert.strictEqual(wrap.up().$, parent);
    });
    it('should return a wrap of the element with 0 argument', () => {
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      assert.strictEqual(wrap.up(0).$, elem);
    });
    it('should return a wrap of the n-th parent element with n argument', () => {
      const parent1 = document.createElement('div');
      const parent2 = document.createElement('div');
      const parent3 = document.createElement('div');
      const child = document.createElement('div');
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
      const elem = document.createElement('div');
      const wrap = new HtmlElement(elem);

      assert.strictEqual(wrap.valid, true);
    });
    it('should return if the element is valid', () => {
      const elem1 = document.createElement('input');
      const elem2 = document.createElement('input');
      const elem3 = document.createElement('input');
      const elem4 = document.createElement('input');
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
      const elem = document.createElement('input');
      const wrap = new HtmlElement(elem);

      elem.value = 'domc';

      assert.strictEqual(wrap.value(), 'domc');
    });
    it('should set value with more arguments', () => {
      const elem = document.createElement('input');
      const wrap = new HtmlElement(elem);

      wrap.value('domc');

      assert.strictEqual(elem.value, 'domc');
    });
  });
});

describe('it should test exported methods from HtmlElement', () => {
  // TODO: .find()
  // TODO: .findAll()
});

describe('it should test HtmlCollection::[methods]', () => {
  // TODO: .delete()
  // TODO: .hide()
  // TODO: .into()
  // TODO: .on()
  // TODO: .[on-event]()
  // TODO: .show()
});

describe('it should test String::[methods]', () => {
  // TODO: .parseHTML()
});
