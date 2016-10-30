/**
 * @module helpers/markupToJSON
 * @private
 * @description Exports markupToJSON method.
 */

/**
 * @typedef {Object} MarkupElement
 * @property {'comment'|'text'|'element'} type - Type of the node.
 * @property {Object.<String, String>} attrs - Node attributes
 * @property {MarkupElement[]} children - Node children.
 */

const xLinkNS = 'http://www.w3.org/1999/xlink';
const XMLDeclaration = /^<\?xml.*\?>/i;
const DOCTYPE = /^<!doctype\s+(\S+)(?:\s+public\s+(?:"|')([^"']+)(?:"|'))?(?:\s+(?:"|')([^"']+)(?:"|'))?/i;

const { implementation } = document;

/**
 * @function markupToJSON
 * @private
 * @param {String} markup - Markup to parse to JSON.
 * @returns {{ doctype: DocumentType, elements: MarkupElement[] }} Markup elements array.
 * @description Function for parsing html and xml to JSON.
 */
export default (markup) => {
  markup = trimLeft(markup);

  let matchXML;
  let matchDOCTYPE;
  let doctype = implementation.createDocumentType('html', '', '');

  if (matchXML = markup.match(XMLDeclaration)) {
    markup = trimLeft(markup.slice(matchXML[0].length));
  }

  if (matchDOCTYPE = markup.match(DOCTYPE)) {
    markup = trimLeft(markup.slice(matchDOCTYPE.shift().length));

    const [
      qualifiedNameStr = 'html',
      publicId = '',
      systemId = ''
    ] = matchDOCTYPE;

    doctype = implementation.createDocumentType(qualifiedNameStr, publicId, systemId);
  }

  // TODO: parsing elements

  return {
    doctype,
    elements: []
  };
};

/**
 * @function trimLeft
 * @private
 * @param {String} string - String to trim.
 * @returns {String} Trimmed string.
 */
function trimLeft(string) {
  return string.replace(/^\s+/, '');
}
