import D from '../../';
import { default as parent } from '../Array';

const cls = class HtmlCollection extends parent {

};

D.HtmlCollection = cls;
D.constructors.unshift({
	check: (collection) => collection instanceof HTMLCollection || collection instanceof NodeList,
	cls
});

export default cls;