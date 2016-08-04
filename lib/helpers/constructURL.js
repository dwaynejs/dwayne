/**
 * @module helpers/constructURL
 * @private
 * @description Exports Object.assign-like method.
 */

import Str from '../String';
import { isArray, isObject } from './checkTypes';
import { iterate } from './iterate';

/**
 * @type {RegExp}
 * @description Absolute URL pattern.
 */
const absoluteURLRegexp = /^([a-z][a-z\d\+\-\.]*:)?\/\//i;

/**
 * @function constructURL
 * @param {String} baseURL - BaseURL of the output URL.
 * @param {String} url - Main part of the output URL.
 * @param {Object} params - Params to replace in the url expressions like ":param".
 * @param {Object} query - Object with query params.
 * @returns {String} Constructed URL.
 * @description Function for constructing URL from the base URL, URL, params and query params.
 */
export default (baseURL, url, params, query) => {
  let URL = isAbsolute(url)
    ? url
    : `${ String(baseURL).replace(/\/+$/, '') }/${ String(url).replace(/^\/+/, '') }`;

  iterate(params, (value, param) => {
    URL = new Str(URL).replaceString(`:${ param }`, value).$;
  });

  const queryParams = [];

  iterate(query, (value, param) => {
    if (isArray(value)) {
      param += '[]';
    } else {
      value = [value];
    }

    iterate(value, (value) => {
      if (isObject(value)) {
        value = JSON.stringify(value);
      } else {
        value = String(value);
      }

      queryParams.push(`${ encode(param) }=${ encode(value) }`);
    });
  });

  if (queryParams.length) {
    URL += (URL.indexOf('?') === -1 ? '?' : '&') + queryParams.join('&');
  }

  return URL;
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
 * @param {String} string - String to encode using encodeURIComponent
 * @returns {String} Encoded string.
 */
function encode(string) {
  return encodeURIComponent(string);
}
