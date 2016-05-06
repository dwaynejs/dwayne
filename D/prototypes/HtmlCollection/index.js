import classes from '../../classes';
import constructors from '../../constructors';
import Arr from '../Array';
import { toStringTag } from '../../libs';

export class HtmlCollection extends Arr {
	
}

classes.HtmlCollection = HtmlCollection;
constructors.unshift({
	check: (collection) => /^(HtmlCollection|NodeList)$/.test(toStringTag(collection)),
	cls: HtmlCollection
});

export default HtmlCollection;
