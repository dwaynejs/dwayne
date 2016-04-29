import D from '../../';
import { default as parent } from '../Array';
import { htmlElement } from '../HtmlElement';
import { dynamicDefineProperties, toString } from '../../libs';
import methods from './methods';

export class HtmlCollection extends parent {
	
}

dynamicDefineProperties(HtmlCollection.prototype, methods, (prop) => {
	return function () {
		const collection = this.$;
		
		for (let i = 0, length = collection.length; i < length; i++) {
			const item = htmlElement(collection[i]);
			
			item[prop].apply(item, arguments);
		}
	};
});

D.HtmlCollection = HtmlCollection;
D.constructors.unshift({
	check: (collection) => toString(collection) === 'HtmlCollection' || toString(collection) === 'NodeList',
	cls: HtmlCollection
});

export default HtmlCollection;