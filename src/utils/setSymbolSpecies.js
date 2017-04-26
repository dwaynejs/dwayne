import { defineProperties } from './defineProperty';
import { Symbol } from '../constants';

export function setSymbolSpecies(klass, species) {
  if (Symbol.species) {
    defineProperties(klass, {
      [Symbol.species]: {
        get() {
          return species;
        }
      }
    });
  }
}
