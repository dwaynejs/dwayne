import Arr from './Array';
import constructors from './constants/constructors';
import { toStringTag, toArray, crossClassMethods } from './helpers';

export class HtmlCollection extends Arr {
  constructor(collection) {
    super(crossClassMethods.toHtmlCollection(collection));
  }
}

constructors[2].push({
	check: (collection) => /^(HtmlCollection|NodeList)$/.test(toStringTag(collection)),
	cls: HtmlCollection
});

export default HtmlCollection;
