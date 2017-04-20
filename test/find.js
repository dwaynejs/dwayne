import { strictEqual } from 'assert';
import { Elem, find } from '../src';

const { document } = global;
const { body } = document;

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
