/**
 * @module helpers/resolveURL
 * @private
 * @description Exports Object.assign-like method.
 */

import Str from '../Str';

export default (url, decodeQuery) => {
  const {
    search: query,
    hash
  } = url;
  const params = {
    query: {},
    hash: hash.replace(/^#/, '')
  };

  if (!query) {
    return params;
  }

  new Str(query)
    .split('&')
    .forEach((rawParam) => {
      let [param, value] = rawParam.split('=');

      param = decodeQuery ? decodeURIComponent(param) : param;
      value = decodeQuery ? decodeURIComponent(value) : value;

      if (!/^[^\[]+/.test(param)) {
        return;
      }

      let paramName;
      let paramObject = params.query;

      new Str(param)
        .match(/^[\s\S]*|\[[\s\S]*\]/g)
        .forEach((name) => {
          if (name.indexOf('[')) {
            paramName = name;

            return;
          }

          name = name.slice(1, -1);

          paramObject = paramObject[paramName] = paramObject[paramName] || (name ? {} : []);
          paramName = name || paramObject.length;
        });

      paramObject[paramName] = value;
    });

  return params;
}
