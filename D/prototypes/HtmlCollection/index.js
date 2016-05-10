import constructors from '../../constructors';
import Arr from '../Array';
import { toStringTag } from '../../libs';

export class HtmlCollection extends Arr {
	
}

constructors[2].push({
	check: (collection) => /^(HtmlCollection|NodeList)$/.test(toStringTag(collection)),
	cls: HtmlCollection
});

export default HtmlCollection;
