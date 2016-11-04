/**
 * @module helpers/transformData
 * @private
 * @description Exports transformData method.
 */

import { Arr } from '../Arr';
import { Super } from '../Super';
import { isObject, toStringTag } from './';

const notToTransform = new Arr(['FormData', 'File', 'Blob', 'ArrayBuffer', 'String', 'Number']);
const withoutBody = new Arr(['DELETE', 'GET', 'HEAD']);

/**
 * @function transformData
 * @param {*} data - Data to transform
 * @param {String} method - HTTP method.
 * @param {Object} headers - Object with headers.
 * @returns {*} - Transformed data.
 */
export default (data, method, headers) => {
  data = new Super(data).$;

  if (withoutBody.indexOfStrict(method) !== -1) {
    return null;
  }

  if (isObject(data) && notToTransform.indexOfStrict(toStringTag(data)) === -1) {
    if (!headers.contentType) {
      headers.contentType = ['application/json;charset=utf-8'];
    }

    return new Super(data).json();
  }

  return data;
};
