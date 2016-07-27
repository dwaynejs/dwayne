/**
 * @module helpers/Symbol
 * @private
 * @description Exports Symbol class.
 */

export const Symbol = global.Symbol || {
  toStringTag: 'Symbol.toStringTag',
  iterator: Math.random().toString(36)
};
