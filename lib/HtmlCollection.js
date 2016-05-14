import Arr from './Array';
import constructors from './constants/constructors';
import { toStringTag, toArray } from './helpers';

export class HtmlCollection extends Arr {
  constructor(collection) {
    super(toArray(collection));
  }
}

constructors[2].push({
	check: (collection) => /^(HtmlCollection|NodeList)$/.test(toStringTag(collection)),
	cls: HtmlCollection
});

export default HtmlCollection;
