/**
 * @module helpers/parseHeaders
 * @private
 * @description Exports parseHeaders method.
 */

import Str from '../Str';
import { iterate } from './iterate';

/**
 * @function parseHeaders
 * @param {String} rawHeaders - Raw headers.
 * @returns {Object} Headers object
 * @description Function for parsing raw headers.
 */
export default (rawHeaders) => {
  const headers = {};

  iterate((rawHeaders || '').split('\n'), (value) => {
    const index = value.indexOf(':');
    const key = new Str(value.substring(0, index))
      .trim()
      .toCamelCase().$;
    const val = new Str(value.substring(index + 1)).trim().$;

    if (key) {
      headers[key] = (headers[key] ? `${ headers[key] }, ` : '') + val;
    }
  });

  return headers;
};
