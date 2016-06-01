import { toArray } from './toArray';

export const crossClassMethods = {
  toHtmlCollection(collection) {
    return toArray(collection);
  }
};
