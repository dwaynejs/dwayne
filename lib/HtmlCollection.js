import Arr from './Array';
import Super from './Super';
import constructors from './constants/constructors';
import { toStringTag, toArray, crossClassMethods, validate, iterate } from './helpers';

// TODO: move the whole class into HtmlElement class module
export class HtmlCollection extends Arr {
  constructor(collection = []) {
    super(crossClassMethods.toHtmlCollection(new Super(collection).$));
  }

  // TODO: #elem()
  // TODO: add most of Elem#

  // TODO: #filter(selector)
  filter(callback) {
    validate([callback], ['function'], 'HtmlCollection#filter');

    return new HtmlCollection(super.filter(callback).$);
  }

  map(callback) {
    validate([callback], ['function'], 'HtmlCollection#map');

    const object = this.$;
    const o = [];

    let elements = true;

    iterate(object, (value, key) => {
      const elem = callback(value, key, object);

      elements = elements && /^(HTML\w*Element)$/.test(toStringTag(new Super(elem).$));

      o.push(elem);
    });

    return elements ? new HtmlCollection(o) : D(o);
  }
}

constructors[2].push({
	check: (collection) => /^(HtmlCollection|NodeList)$/.test(toStringTag(collection)),
	cls: HtmlCollection
});

export default HtmlCollection;
