import { iterate } from './iterate';

export function assign(target) {
  iterate(arguments, (source, index) => {
    if (index) {
      iterate(source, (value, key) => {
        target[key] = value;
      });
    }
  });
    
	return target;
}
