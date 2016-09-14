/**
 * @module helpers/Symbol
 * @private
 * @description Exports Symbol class.
 */

import global from '../constants/global';

export const Symbol = global.Symbol || {
  toStringTag: 'Symbol.toStringTag',
  iterator: Math.random().toString(36)
};
