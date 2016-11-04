/**
 * @module helpers/constructURL
 * @private
 * @description Exports constructURL method.
 */

import { Arr } from '../Arr';
import { Str } from '../Str';
import { switcher } from '../Switcher';
import { isArray, isObject, isPlainObject } from './checkTypes';
import { iterate } from './iterate';

/**
 * @type {RegExp}
 * @description Absolute URL pattern.
 */
const absoluteURLRegexp = /^(([a-z][a-z\d\+\-\.]*:)?\/\/|data:[a-z]+\/[a-z]+;base64,)/i;
const querySwitcher = switcher('call', () => new Arr([]))
  .case(isArray, (prefix, query) => {
    let queryParams = new Arr([]);

    iterate(query, (value) => {
      if (isPlainObject(value) || isArray(value)) {
        queryParams = queryParams.concat(querySwitcher(value, [`${ prefix }[]`]));

        return;
      }

      queryParams.push({
        param: `${ prefix }[]`,
        value
      });
    });

    return queryParams.$;
  })
  .case(isPlainObject, (prefix, query) => {
    let queryParams = new Arr([]);

    iterate(query, (value, param) => {
      if (isPlainObject(value) || isArray(value)) {
        queryParams = queryParams.concat(querySwitcher(value, [prefix ? `${ prefix }[${ param }]` : param]));

        return;
      }

      queryParams.push({
        param: prefix ? `${ prefix }[${ param }]` : param,
        value: isObject(value) ? JSON.stringify(value) : String(value)
      });
    });

    return queryParams.$;
  });

/**
 * @function constructURL
 * @param {String} baseURL - BaseURL of the output URL.
 * @param {String} url - Main part of the output URL.
 * @param {Object} params - Params to replace in the url expressions like ":param".
 * @param {Object} query - Object with query params.
 * @param {Object} [hash = ''] - URL hash.
 * @param {Object} [encodeOptions = {}] - If you need to encode something.
 * @param {Object} [encodeOptions.params = true] - If you need to encode params.
 * @param {Object} [encodeOptions.query = true] - If you need to encode query params.
 * @returns {String} Constructed URL.
 * @description Function for constructing URL from the base URL, URL, params and query params.
 */
export default (baseURL, url, params, query, hash = '', encodeOptions = {}) => {
  const {
    params: encodeParams = true,
    query: encodeQuery = true
  } = encodeOptions;
  let URL = isAbsolute(url)
    ? url
    : `${ String(baseURL).replace(/\/+$/, '') }/${ String(url).replace(/^\/+/, '') }`;

  iterate(params, (value, param) => {
    URL = new Str(URL).replaceString(`:${ param }`, encode(value, encodeParams)).$;
  });

  const queryParams = querySwitcher(query, ['']);

  if (queryParams.length) {
    URL += (URL.indexOf('?') === -1 ? '?' : '&') + queryParams
      .map(({ param, value }) => `${ encode(param, encodeQuery) }=${ encode(value, encodeQuery) }`)
      .join('&');
  }

  return `${ URL }${ hash ? `#${ hash }` : '' }`;
};

/**
 * @function isAbsolute
 * @param {String} url - URL to check if it is absolute or not.
 * @returns {Boolean} If the argument URL is absolute or not.
 */
function isAbsolute(url) {
  return absoluteURLRegexp.test(url);
}

/**
 * @function encode
 * @param {String} string - String to encode using encodeURIComponent.
 * @param {Boolean} isEncoded - If the string should be encoded.
 * @returns {String} Encoded string.
 */
function encode(string, isEncoded) {
  return isEncoded ? encodeURIComponent(string) : string;
}
