import { deepStrictEqual, strictEqual } from 'assert';
import { Elem, find } from '../src/Elem';

const { document } = global;
const { body } = document;

describe('it should test Elem#', () => {
  describe('add()', () => {
    it('should add elements from arguments', () => {
      const elem = [
        document.createElement('div'),
        document.createElement('div'),
        document.createElement('div')
      ];
      const elem1 = document.createElement('div');
      const elem2 = document.createElement('div');
      const wrap = new Elem(elem);
      const newWrap = wrap.add(elem1, elem2);

      strictEqual(newWrap.length, 5);
      strictEqual(newWrap[3], elem1);
      strictEqual(newWrap[4], elem2);
    });
    it('should not duplicate elements', () => {
      const elem1 = document.createElement('div');
      const elem2 = document.createElement('div');
      const elem = [
        elem1,
        elem2,
        document.createElement('div')
      ];
      const wrap = new Elem(elem);
      const newWrap = wrap.add(elem1, elem2, document.createElement('div'));

      strictEqual(newWrap.length, 4);
    });
    it('should support Elem syntax', () => {
      const elem1 = document.createElement('div');
      const elem2 = document.createElement('div');
      const elem = [
        document.createElement('div'),
        document.createElement('div'),
        document.createElement('div')
      ];
      const wrap = new Elem(elem);
      const wrap1 = new Elem(elem1);
      const wrap2 = new Elem(elem2);
      const newWrap = wrap.add(wrap1, wrap2);

      strictEqual(newWrap.length, 5);
      strictEqual(newWrap[3], elem1);
      strictEqual(newWrap[4], elem2);
    });
  });
  describe('addClass()', () => {
    it('should add classes from arguments', (done) => {
      const elem = [
        document.createElement('div'),
        document.createElement('div'),
        document.createElement('div')
      ];
      const wrap = new Elem(elem);
      let count = 0;

      try {
        wrap
          .addClass('foo', 'bar', 'baz')
          .forEach((elem) => {
            strictEqual(elem.classList.contains('foo'), true);
            strictEqual(elem.classList.contains('bar'), true);
            strictEqual(elem.classList.contains('baz'), true);

            doneAll();
          });
      } catch (err) {
        done(err);
      }

      function doneAll() {
        if (++count === elem.length) {
          done();
        }
      }
    });
  });
  describe('attr()', () => {
    it('should return wrap of an object of attributes with no arguments', (done) => {
      const elem = [
        document.createElement('div'),
        document.createElement('div'),
        document.createElement('div')
      ];
      const wrap = new Elem(elem);
      let count = 0;

      try {
        wrap
          .forEach((elem) => {
            elem.setAttribute('attr', '123');
            elem.setAttribute('contentEditable', '');
          })
          .forEach((elem) => {
            deepStrictEqual(new Elem(elem).attr(), {
              attr: '123',
              contenteditable: ''
            });

            doneAll();
          });
      } catch (err) {
        done(err);
      }

      function doneAll() {
        if (++count === elem.length) {
          done();
        }
      }
    });
    it('should return value of an attribute with first string argument', (done) => {
      const elem = [
        document.createElement('div'),
        document.createElement('div'),
        document.createElement('div')
      ];
      const wrap = new Elem(elem);
      let count = 0;

      try {
        wrap
          .forEach((elem) => {
            elem.setAttribute('attr', '123');
            elem.setAttribute('contentEditable', '');
          })
          .forEach((elem) => {
            strictEqual(new Elem(elem).attr('attr'), '123');
            strictEqual(new Elem(elem).attr('contentEditable'), '');

            doneAll();
          });
      } catch (err) {
        done(err);
      }

      function doneAll() {
        if (++count === elem.length) {
          done();
        }
      }
    });
    it('should support (attr, value) syntax', (done) => {
      const elem = [
        document.createElement('div'),
        document.createElement('div'),
        document.createElement('div')
      ];
      const wrap = new Elem(elem);
      let count = 0;

      try {
        wrap
          .attr('attr', '123')
          .forEach((elem) => {
            strictEqual(elem.getAttribute('attr'), '123');

            doneAll();
          });
      } catch (err) {
        done(err);
      }

      function doneAll() {
        if (++count === elem.length) {
          done();
        }
      }
    });
    it('should support object property syntax', (done) => {
      const elem = [
        document.createElement('div'),
        document.createElement('div'),
        document.createElement('div')
      ];
      const wrap = new Elem(elem);
      let count = 0;

      try {
        wrap
          .attr({ attr: '123', contentEditable: '' })
          .forEach((elem) => {
            strictEqual(elem.getAttribute('attr'), '123');
            strictEqual(elem.getAttribute('contentEditable'), '');

            doneAll();
          });
      } catch (err) {
        done(err);
      }

      function doneAll() {
        if (++count === elem.length) {
          done();
        }
      }
    });
  });
  describe('children()', () => {
    it('should return wrap of the children of the first element', () => {
      const elem1 = document.createElement('div');
      const child1 = document.createElement('div');
      const child2 = document.createElement('div');
      const elem = [
        elem1,
        document.createElement('div'),
        document.createElement('div')
      ];
      const wrap1 = new Elem(elem);
      const wrap2 = new Elem();

      elem1.appendChild(child1);
      elem1.appendChild(child2);

      const children1 = wrap1.children();
      const children2 = wrap2.children();

      strictEqual(children1.length, 2);
      strictEqual(children1[0], child1);
      strictEqual(children1[1], child2);
      strictEqual(children2.length, 0);
    });
  });
  describe('closest()', () => {
    it('should return a wrap of the set of closest parents that matches selector', () => {
      const child1 = document.createElement('div');
      const child2 = document.createElement('div');
      const child3 = document.createElement('div');
      const parent1 = document.createElement('div');
      const parent2 = document.createElement('div');
      const parent3 = document.createElement('div');
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

      const closest = wrap.closest('.foo');

      strictEqual(closest[0], child2);
      strictEqual(closest[1], parent3);
    });
  });
  describe('contains()', () => {
    it('should return true, if element contains another, and false if not', () => {
      const elem1 = document.createElement('div');
      const elem2 = document.createElement('div');
      const elem3 = document.createElement('div');
      const elem4 = document.createElement('div');
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
    it('should support (Elem) syntax', () => {
      const parent = document.createElement('div');
      const child = document.createElement('div');
      const parentWrap = new Elem(parent);
      const childWrap = new Elem(parent);
  
      parent.appendChild(child);
      
      strictEqual(parentWrap.contains(childWrap), true);
    });
  });
  describe('create()', () => {
    it('should return wrap of the set of new elements inside context of type of first argument', (done) => {
      const elem = [
        document.createElement('div'),
        document.createElement('div'),
        document.createElement('div')
      ];
      const wrap = new Elem(elem);
      const inputs = wrap.create('input');
      let count = 0;

      try {
        inputs.forEach((input, index) => {
          strictEqual(input.parentElement, wrap[index]);
          strictEqual(input.tagName.toLowerCase(), 'input');

          doneAll();
        });
      } catch (err) {
        done(err);
      }

      function doneAll() {
        if (++count === elem.length) {
          done();
        }
      }
    });
    it('should treat "#text" and "#comment" as special arguments', (done) => {
      const elem = [
        document.createElement('div'),
        document.createElement('div'),
        document.createElement('div')
      ];
      const wrap = new Elem(elem);
      let count = 0;

      try {
        wrap
          .create('#comment')
          .text('comment')
          .parent()
          .create('#text')
          .text('123')
          .parent()
          .forEach((elem) => {
            strictEqual(elem.innerHTML, '<!--comment-->123');

            doneAll();
          });
      } catch (err) {
        done(err);
      }

      function doneAll() {
        if (++count === elem.length) {
          done();
        }
      }
    });
  });
  describe('createComment()', () => {
    it('should create comment node inside elements', (done) => {
      const elem = [
        document.createElement('div'),
        document.createElement('div'),
        document.createElement('div')
      ];
      const wrap = new Elem(elem);
      let count = 0;

      try {
        wrap
          .forEach((elem) => {
            elem.innerHTML = '123';
          })
          .createComment('comment')
          .parent()
          .forEach((elem) => {
            strictEqual(elem.innerHTML, '123<!--comment-->');

            doneAll();
          });
      } catch (err) {
        done(err);
      }

      function doneAll() {
        if (++count === elem.length) {
          done();
        }
      }
    });
  });
  describe('createText()', () => {
    it('should create comment node inside elements', (done) => {
      const elem = [
        document.createElement('div'),
        document.createElement('div'),
        document.createElement('div')
      ];
      const wrap = new Elem(elem);
      let count = 0;

      try {
        wrap
          .forEach((elem) => {
            elem.innerHTML = '123';
          })
          .createText('<div>123</div>')
          .parent()
          .forEach((elem) => {
            strictEqual(elem.innerHTML, '123&lt;div&gt;123&lt;/div&gt;');

            doneAll();
          });
      } catch (err) {
        done(err);
      }

      function doneAll() {
        if (++count === elem.length) {
          done();
        }
      }
    });
  });
  describe('css()', () => {
    it('should return wrap of an object of css properties with no arguments', () => {
      const elem1 = document.createElement('div');
      const elem = [
        elem1,
        document.createElement('div'),
        document.createElement('div')
      ];
      const wrap1 = new Elem(elem);
      const wrap2 = new Elem();

      elem1.style.display = 'inline';
      elem1.style.textAlign = 'center';
      elem1.style.border = '1px solid black';

      deepStrictEqual(wrap1.css(), {
        display: 'inline',
        textAlign: 'center',
        border: '1px solid black'
      });
      deepStrictEqual(wrap2.css(), {});
    });
    it('should return value of css property with first string argument', () => {
      const elem = document.createElement('div');
      const wrap = new Elem(elem);

      elem.style.setProperty('margin-left', '1px', 'important');
      elem.style.setProperty('margin-right', '2px', '');

      strictEqual(wrap.css('margin-left'), '1px !important');
      strictEqual(wrap.css('marginRight'), '2px');
    });
    it('should support (prop, value) syntax', () => {
      const elem = document.createElement('div');
      const wrap = new Elem(elem);

      wrap.css('margin-left', '1px !important');
      wrap.css('marginRight', '2px');

      strictEqual(elem.style.getPropertyValue('margin-left'), '1px');
      strictEqual(elem.style.getPropertyPriority('margin-left'), 'important');
      strictEqual(elem.style.getPropertyValue('margin-right'), '2px');
      strictEqual(elem.style.getPropertyPriority('margin-right'), '');
    });
    it('should support object property syntax', () => {
      const elem = document.createElement('div');
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
    it('should return wrap of an dataset object with no arguments', (done) => {
      const elem = [
        document.createElement('div'),
        document.createElement('div'),
        document.createElement('div')
      ];
      const wrap = new Elem(elem);
      let count = 0;

      try {
        wrap
          .forEach((elem) => {
            elem.setAttribute('data-dwayne-attr', '123');
            elem.setAttribute('data-dwayne-power', 'Infinity');
          })
          .forEach((elem) => {
            deepStrictEqual(new Elem(elem).data(), {
              dwayneAttr: '123',
              dwaynePower: 'Infinity'
            });

            doneAll();
          });
      } catch (err) {
        done(err);
      }

      function doneAll() {
        if (++count === elem.length) {
          done();
        }
      }
    });
    it('should return value of dataset parameter', (done) => {
      const elem = [
        document.createElement('div'),
        document.createElement('div'),
        document.createElement('div')
      ];
      const wrap = new Elem(elem);
      let count = 0;

      try {
        wrap
          .forEach((elem) => {
            elem.setAttribute('data-dwayne-attr', '123');
            elem.setAttribute('data-dwayne-power', 'Infinity');
          })
          .forEach((elem) => {
            strictEqual(new Elem(elem).data('dwayneAttr'), '123');
            strictEqual(new Elem(elem).data('dwaynePower'), 'Infinity');

            doneAll();
          });
      } catch (err) {
        done(err);
      }

      function doneAll() {
        if (++count === elem.length) {
          done();
        }
      }
    });
    it('should support (key, value) setter syntax', (done) => {
      const elem = [
        document.createElement('div'),
        document.createElement('div'),
        document.createElement('div')
      ];
      const wrap = new Elem(elem);
      let count = 0;

      try {
        wrap
          .data('dwaynePower', 'Infinity')
          .forEach((elem) => {
            strictEqual(elem.getAttribute('data-dwayne-power'), 'Infinity');

            doneAll();
          });
      } catch (err) {
        done(err);
      }

      function doneAll() {
        if (++count === elem.length) {
          done();
        }
      }
    });
    it('should support object property syntax', (done) => {
      const elem = [
        document.createElement('div'),
        document.createElement('div'),
        document.createElement('div')
      ];
      const wrap = new Elem(elem);
      let count = 0;

      try {
        wrap
          .data({
            dwayneAttr: '123',
            dwaynePower: 'Infinity'
          })
          .forEach((elem) => {
            strictEqual(elem.getAttribute('data-dwayne-attr'), '123');
            strictEqual(elem.getAttribute('data-dwayne-power'), 'Infinity');

            doneAll();
          });
      } catch (err) {
        done(err);
      }

      function doneAll() {
        if (++count === elem.length) {
          done();
        }
      }
    });
  });
  describe('dispatch()', () => {
    it('should dispatch event on element', (done) => {
      const elem = [
        document.createElement('div'),
        document.createElement('div'),
        document.createElement('div')
      ];
      const wrap = new Elem(elem);
      let fired = 0;

      wrap.into(body);
      wrap.on('click', doneAll);

      wrap.dispatch('click');

      function doneAll() {
        if (++fired === 3) {
          wrap.remove();

          done();
        }
      }
    });
    it('should dispatch already constructed event', (done) => {
      const elem = [
        document.createElement('div'),
        document.createElement('div'),
        document.createElement('div')
      ];
      const wrap = new Elem(elem);
      let fired = 0;
      let event;

      try {
        event = new Event('click');
      } catch (err) {
        event = document.createEvent('Event');
        event.initEvent('click', false, false);
      }

      wrap.into(body);
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
          wrap.remove();

          done();
        }
      }
    });
    it('should add details to event', (done) => {
      const elem = document.createElement('div');
      const wrap = new Elem(elem);
      const unique = {};

      wrap.into(body);
      wrap.on('click', (e) => {
        try {
          strictEqual(e.detail, unique);
          strictEqual(e.data, unique);

          wrap.remove();

          done();
        } catch (err) {
          done(err);
        }
      });
      wrap.dispatch('click', {
        detail: unique,
        data: unique
      });
    });
  });
  describe('elem()', () => {
    it('should return wrap of the n-th element', () => {
      const elem1 = document.createElement('div');
      const elem2 = document.createElement('div');
      const elem = [
        elem1,
        elem2
      ];
      const wrap1 = new Elem(elem);
      const wrap2 = new Elem();

      strictEqual(wrap1.elem().length, 1);
      strictEqual(wrap1.elem()[0], elem1);
      strictEqual(wrap1.elem(0).length, 1);
      strictEqual(wrap1.elem(0)[0], elem1);
      strictEqual(wrap1.elem(1).length, 1);
      strictEqual(wrap1.elem(1)[0], elem2);
      strictEqual(wrap2.elem().length, 0);
    });
  });
  describe('find()', () => {
    it('should find a wrap of all elements in nested children, that matches selector', () => {
      const elem1 = document.createElement('div');
      const elem2 = document.createElement('div');
      const child1 = document.createElement('div');
      const child2 = document.createElement('div');
      const child3 = document.createElement('div');
      const elem = [
        elem1,
        elem2,
        document.createElement('div')
      ];
      const wrap = new Elem(elem);

      elem1.appendChild(child1);
      elem1.appendChild(child2);
      elem2.appendChild(child3);

      child1.className = 'foo';
      child2.className = 'foo';
      child3.className = 'foo';

      const found = wrap.find('.foo');

      strictEqual(found.length, 3);
      strictEqual(found[0], child1);
      strictEqual(found[1], child2);
      strictEqual(found[2], child3);
    });
  });
  describe('filter()', () => {
    // TODO: function filter
  });
  describe('hasAttr()', () => {
    it('should return true if the element has class', () => {
      const elem = document.createElement('div');
      const wrap = new Elem(elem);

      elem.setAttribute('foo', 'bar');
      elem.setAttribute('bar', 'baz');
      elem.setAttribute('baz', 'foo');

      strictEqual(wrap.hasAttr('bar'), true);
    });
    it('should return false if the element does not have class', () => {
      const elem = document.createElement('div');
      const wrap = new Elem(elem);

      elem.setAttribute('foo', 'bar');
      elem.setAttribute('bar', 'baz');
      elem.setAttribute('baz', 'foo');

      strictEqual(wrap.hasAttr('a'), false);
    });
  });
  describe('hasClass()', () => {
    it('should return true if the element has class', () => {
      const elem = document.createElement('div');
      const wrap = new Elem(elem);

      elem.className = 'foo bar baz';

      strictEqual(wrap.hasClass('bar'), true);
    });
    it('should return false if the element does not have class', () => {
      const elem = document.createElement('div');
      const wrap = new Elem(elem);

      elem.className = 'foo bar baz';

      strictEqual(wrap.hasClass('a'), false);
    });
  });
  describe('hide()', () => {
    it('should hide the element', () => {
      const elem = document.createElement('div');
      const wrap = new Elem(elem);

      elem.style.display = 'inline';
      wrap.hide();

      strictEqual(elem.className, '__dwayne-hidden__');
    });
  });
  describe('html()', () => {
    it('should return innerHTML with no arguments', () => {
      const elem = document.createElement('div');
      const wrap = new Elem(elem);

      elem.innerHTML = '<div></div>';

      strictEqual(wrap.html(), '<div></div>');
    });
    it('should set innerHTML with an argument', () => {
      const elem = document.createElement('div');
      const wrap = new Elem(elem);

      wrap.html('<div></div>');

      strictEqual(elem.innerHTML, '<div></div>');
    });
  });
  describe('insertAfter()', () => {
    it('should support (element) syntax', () => {
      const elem1 = document.createElement('div');
      const elem2 = document.createElement('div');
      const elem3 = document.createElement('div');
      const elem4 = document.createElement('div');
      const elem5 = document.createElement('div');
      const elem = [
        elem1,
        elem2,
        elem3
      ];
      const wrap = new Elem(elem);
      const wrap2 = new Elem(elem4);

      elem4.appendChild(elem5);

      wrap.insertAfter(elem5);

      const children = wrap2.children();

      strictEqual(children.length, 4);
      strictEqual(children[0], elem5);
      strictEqual(children[1], elem1);
      strictEqual(children[2], elem2);
      strictEqual(children[3], elem3);
    });
    it('should support (Elem) syntax', () => {
      const elem1 = document.createElement('div');
      const elem2 = document.createElement('div');
      const elem3 = document.createElement('div');
      const elem4 = document.createElement('div');
      const elem5 = document.createElement('div');
      const elem = [
        elem1,
        elem2,
        elem3
      ];
      const wrap = new Elem(elem);
      const wrap2 = new Elem(elem4);
      const wrap3 = new Elem(elem5);

      elem4.appendChild(elem5);

      wrap.insertAfter(wrap3);

      const children = wrap2.children();

      strictEqual(children.length, 4);
      strictEqual(children[0], elem5);
      strictEqual(children[1], elem1);
      strictEqual(children[2], elem2);
      strictEqual(children[3], elem3);
    });
  });
  describe('insertBefore()', () => {
    it('should support (element) syntax', () => {
      const elem1 = document.createElement('div');
      const elem2 = document.createElement('div');
      const elem3 = document.createElement('div');
      const elem4 = document.createElement('div');
      const elem5 = document.createElement('div');
      const elem = [
        elem1,
        elem2,
        elem3
      ];
      const wrap = new Elem(elem);
      const wrap2 = new Elem(elem4);

      elem4.appendChild(elem5);

      wrap.insertBefore(elem5);

      const children = wrap2.children();

      strictEqual(children.length, 4);
      strictEqual(children[0], elem1);
      strictEqual(children[1], elem2);
      strictEqual(children[2], elem3);
      strictEqual(children[3], elem5);
    });
    it('should support (Elem) syntax', () => {
      const elem1 = document.createElement('div');
      const elem2 = document.createElement('div');
      const elem3 = document.createElement('div');
      const elem4 = document.createElement('div');
      const elem5 = document.createElement('div');
      const elem = [
        elem1,
        elem2,
        elem3
      ];
      const wrap = new Elem(elem);
      const wrap2 = new Elem(elem4);
      const wrap3 = new Elem(elem5);

      elem4.appendChild(elem5);

      wrap.insertBefore(wrap3);

      const children = wrap2.children();

      strictEqual(children.length, 4);
      strictEqual(children[0], elem1);
      strictEqual(children[1], elem2);
      strictEqual(children[2], elem3);
      strictEqual(children[3], elem5);
    });
  });
  describe('into()', () => {
    it('should support (element) syntax', (done) => {
      const parent = document.createElement('div');
      const elem = [
        document.createElement('div'),
        document.createElement('div'),
        document.createElement('div')
      ];
      const wrap = new Elem(elem);
      let count = 0;

      try {
        wrap
          .into(parent)
          .forEach((elem) => {
            strictEqual(parent.contains(elem), true);

            doneAll();
          });
      } catch (err) {
        done(err);
      }

      function doneAll() {
        if (++count === elem.length) {
          done();
        }
      }
    });
    it('should support (Elem) syntax', (done) => {
      const parent = document.createElement('div');
      const elem = [
        document.createElement('div'),
        document.createElement('div'),
        document.createElement('div')
      ];
      const wrap = new Elem(elem);
      const parentWrap = new Elem(parent);
      let count = 0;

      try {
        wrap
          .into(parentWrap)
          .forEach((elem) => {
            strictEqual(parent.contains(elem), true);

            doneAll();
          });
      } catch (err) {
        done(err);
      }

      function doneAll() {
        if (++count === elem.length) {
          done();
        }
      }
    });
    it('should support second parameter', () => {
      const parent = document.createElement('div');
      const elem = [
        document.createElement('div'),
        document.createElement('div'),
        document.createElement('div')
      ];
      const wrap = new Elem(elem);

      parent.appendChild(document.createElement('div'));

      wrap.into(parent, false);

      const children = parent.childNodes;

      strictEqual(children[0], elem[0]);
      strictEqual(children[1], elem[1]);
      strictEqual(children[2], elem[2]);
    });
  });
  describe('is()', () => {
    it('should return if context matches selector', () => {
      const elem = document.createElement('div');
      const wrap = new Elem(elem);

      elem.id = 'foo';
      elem.className = 'bar';
      elem.setAttribute('baz', '');

      strictEqual(wrap.is('#foo.bar[baz]'), true);
      strictEqual(wrap.is('#foo.bar[bar]'), false);
    });
  });
  describe('name()', () => {
    it('should return tagName.toLowerCase()', () => {
      const div = document.createElement('div');
      const input = document.createElement('input');
      const fieldset = document.createElement('fieldset');
      const divWrap = new Elem(div);
      const inputWrap = new Elem(input);
      const fieldsetWrap = new Elem(fieldset);

      strictEqual(divWrap.name(), 'div');
      strictEqual(inputWrap.name(), 'input');
      strictEqual(fieldsetWrap.name(), 'fieldset');
    });
  });
  describe('next()', () => {
    it('should return a wrap of the next elements to all elements in the set with no arguments', () => {
      const parent1 = document.createElement('div');
      const parent2 = document.createElement('div');
      const elem1 = document.createElement('div');
      const elem2 = document.createElement('div');
      const elem3 = document.createElement('div');
      const elem4 = document.createElement('div');
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

      const next = wrap.next();

      strictEqual(next.length, 2);
      strictEqual(next[0], elem2);
      strictEqual(next[1], elem4);
    });
  });
  describe('on()', () => {
    it('should support (event, listener) syntax', (done) => {
      const elem = document.createElement('div');
      const wrap = new Elem(elem);

      wrap.into(body);
      wrap.on('click', () => {
        wrap.remove();

        done();
      });
      wrap.dispatch('click');
    });
    it('should support (events, listener) syntax', (done) => {
      const elem = document.createElement('div');
      const wrap = new Elem(elem);
      let times = 0;

      wrap.into(body);
      wrap.on('click, contextmenu', () => {
        if (++times === 2) {
          wrap.remove();

          done();
        }
      });

      wrap
        .dispatch('click')
        .dispatch('contextmenu');
    });
    it('should support ({ [event]: listener, ... }) syntax', (done) => {
      let times = 0;

      const elem = document.createElement('div');
      const wrap = new Elem(elem);
      const listener = () => {
        if (++times === 2) {
          wrap.remove();

          done();
        }
      };

      wrap.into(body);
      wrap.on({
        click: listener,
        contextmenu: listener
      });
      wrap.dispatch('click').dispatch('contextmenu');
    });
    it('should return removeEventListeners function', (done) => {
      let times = 0;

      const elem = document.createElement('div');
      const wrap = new Elem(elem);
      const removeListener = wrap.on('click', () => {
        if (++times === 1) {
          wrap.remove();

          done();

          return removeListener();
        }

        done(new Error('Not removed'));
      });

      wrap.into(body);
      wrap
        .dispatch('click')
        .dispatch('click');
    });
    it('should return removeEventListeners function that supports arguments', (done) => {
      let times = 0;

      const elem = document.createElement('div');
      const wrap = new Elem(elem);
      const removeListener = wrap.on('click, contextmenu', () => {
        if (++times === 2) {
          wrap.remove();

          done();

          return removeListener('click');
        }

        if (times < 2) {
          return;
        }

        done(new Error('Not removed'));
      });

      wrap.into(body);
      wrap
        .dispatch('click')
        .dispatch('contextmenu')
        .dispatch('click');
    });
  });
  describe('parent()', () => {
    it('should return a wrap of the parent elements of all the elements in the set', () => {
      const parent1 = document.createElement('div');
      const parent2 = document.createElement('div');
      const parent3 = document.createElement('div');
      const elem1 = document.createElement('div');
      const elem2 = document.createElement('div');
      const elem3 = document.createElement('div');
      const elem4 = document.createElement('div');
      const elem5 = document.createElement('div');
      const elem6 = document.createElement('div');
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

      const parents = wrap.parent();

      strictEqual(parents.length, 3);
      strictEqual(parents[0], parent1);
      strictEqual(parents[1], parent2);
      strictEqual(parents[2], parent3);
    });
  });
  describe('prev()', () => {
    it('should return a wrap of the previous elements to all elements in the set with no arguments', () => {
      const parent1 = document.createElement('div');
      const parent2 = document.createElement('div');
      const elem1 = document.createElement('div');
      const elem2 = document.createElement('div');
      const elem3 = document.createElement('div');
      const elem4 = document.createElement('div');
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

      const prev = wrap.prev();

      strictEqual(prev.length, 2);
      strictEqual(prev[0], elem1);
      strictEqual(prev[1], elem3);
    });
  });
  describe('remove()', () => {
    it('should remove the element', () => {
      const elem = document.createElement('div');
      const wrap = new Elem(elem);

      body.appendChild(elem);
      wrap.remove();

      strictEqual(body.contains(elem), false);
    });
  });
  describe('removeAttr()', () => {
    it('should remove attributes from arguments', () => {
      const elem = document.createElement('div');
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
      const elem = document.createElement('div');
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
      const elem = document.createElement('div');
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
    it('should replace the element with a set of elements if it\'s not the only, first or last child', () => {
      const parent = document.createElement('div');
      const elem1 = document.createElement('div');
      const elem2 = document.createElement('div');
      const elem3 = document.createElement('div');
      const elem4 = document.createElement('div');
      const elem5 = document.createElement('div');
      const elem6 = document.createElement('div');
      const elem = [
        elem4,
        elem5,
        elem6
      ];
      const wrap = new Elem(elem);
      const wrap2 = new Elem(elem2);
      const parentWrap = new Elem(parent);

      parent.appendChild(elem1);
      parent.appendChild(elem2);
      parent.appendChild(elem3);

      wrap2.replace(wrap);

      const children = parentWrap.children();

      strictEqual(children.length, 5);
      strictEqual(children[0], elem1);
      strictEqual(children[1], elem4);
      strictEqual(children[2], elem5);
      strictEqual(children[3], elem6);
      strictEqual(children[4], elem3);
    });
    it('should replace the element with a set of elements if it\'s a first child', () => {
      const parent = document.createElement('div');
      const elem1 = document.createElement('div');
      const elem2 = document.createElement('div');
      const elem3 = document.createElement('div');
      const elem4 = document.createElement('div');
      const elem5 = document.createElement('div');
      const elem6 = document.createElement('div');
      const elem = [
        elem4,
        elem5,
        elem6
      ];
      const wrap = new Elem(elem);
      const wrap2 = new Elem(elem1);
      const parentWrap = new Elem(parent);

      parent.appendChild(elem1);
      parent.appendChild(elem2);
      parent.appendChild(elem3);

      wrap2.replace(wrap);

      const children = parentWrap.children();

      strictEqual(children.length, 5);
      strictEqual(children[0], elem4);
      strictEqual(children[1], elem5);
      strictEqual(children[2], elem6);
      strictEqual(children[3], elem2);
      strictEqual(children[4], elem3);
    });
    it('should replace the element with a set of elements if it\'s a last child', () => {
      const parent = document.createElement('div');
      const elem1 = document.createElement('div');
      const elem2 = document.createElement('div');
      const elem3 = document.createElement('div');
      const elem4 = document.createElement('div');
      const elem5 = document.createElement('div');
      const elem6 = document.createElement('div');
      const elem = [
        elem4,
        elem5,
        elem6
      ];
      const wrap = new Elem(elem);
      const wrap2 = new Elem(elem3);
      const parentWrap = new Elem(parent);

      parent.appendChild(elem1);
      parent.appendChild(elem2);
      parent.appendChild(elem3);

      wrap2.replace(wrap);

      const children = parentWrap.children();

      strictEqual(children.length, 5);
      strictEqual(children[0], elem1);
      strictEqual(children[1], elem2);
      strictEqual(children[2], elem4);
      strictEqual(children[3], elem5);
      strictEqual(children[4], elem6);
    });
    it('should replace the element with a set of elements if it\'s an only child', () => {
      const parent = document.createElement('div');
      const elem1 = document.createElement('div');
      const elem2 = document.createElement('div');
      const elem3 = document.createElement('div');
      const elem4 = document.createElement('div');
      const elem = [
        elem2,
        elem3,
        elem4
      ];
      const wrap = new Elem(elem);
      const wrap2 = new Elem(elem1);
      const parentWrap = new Elem(parent);

      parent.appendChild(elem1);

      wrap2.replace(wrap);

      const children = parentWrap.children();

      strictEqual(children.length, 3);
      strictEqual(children[0], elem2);
      strictEqual(children[1], elem3);
      strictEqual(children[2], elem4);
    });
    it('should support (element) syntax', () => {
      const parent = document.createElement('div');
      const elem1 = document.createElement('div');
      const elem2 = document.createElement('div');
      const wrap = new Elem(elem1);
      const parentWrap = new Elem(parent);

      parent.appendChild(elem1);

      wrap.replace(elem2);

      const children = parentWrap.children();

      strictEqual(children.length, 1);
      strictEqual(children[0], elem2);
    });
  });
  describe('show()', () => {
    it('should show the element', () => {
      const elem = document.createElement('div');
      const wrap = new Elem(elem);

      elem.style.display = 'inline';
      wrap.hide();
      wrap.show();

      strictEqual(elem.style.display, 'inline');
    });
  });
  describe('text()', () => {
    it('should get text of the element with no arguments', () => {
      const elem = document.createElement('div');
      const wrap = new Elem(elem);

      elem.innerHTML = '123';

      strictEqual(wrap.text(), '123');
    });
    it('should set text of the element', () => {
      const elem = document.createElement('div');
      const wrap = new Elem(elem);

      wrap.text('123');

      strictEqual(elem.innerHTML, '123');
    });
  });
  describe('toggleAttr()', () => {
    it('should toggle attribute from argument if it is one', () => {
      const elem1 = document.createElement('div');
      const elem2 = document.createElement('div');
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
      const elem1 = document.createElement('div');
      const elem2 = document.createElement('div');
      const elem3 = document.createElement('div');
      const elem4 = document.createElement('div');
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
      const elem1 = document.createElement('div');
      const elem2 = document.createElement('div');
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
      const elem1 = document.createElement('div');
      const elem2 = document.createElement('div');
      const elem3 = document.createElement('div');
      const elem4 = document.createElement('div');
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
});

describe('it should test exported methods from Elem', () => {
  describe('find()', () => {
    it('should find a wrap of all elements in nested children, that matches selector', () => {
      const elem = document.createElement('div');
      const child1 = document.createElement('div');
      const child2 = document.createElement('div');
      const child3 = document.createElement('div');

      body.appendChild(elem);
      elem.appendChild(child1);
      elem.appendChild(child2);
      child2.appendChild(child3);

      child1.className = 'dwayne-unique-class';
      child3.className = 'dwayne-unique-class';

      const found = find('.dwayne-unique-class');

      strictEqual(found.length, 2);
      strictEqual(found[0], child1);
      strictEqual(found[1], child3);

      new Elem(elem).remove();
    });
  });
});
