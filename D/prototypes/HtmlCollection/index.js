import constructors from '../../constructors';
import Arr from '../Array';
import { toStringTag, toArray } from '../../libs';

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
