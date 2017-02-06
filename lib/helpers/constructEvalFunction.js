/**
 * @module helpers/constructEvalFunction
 * @private
 * @description Exports constructEvalFunction method.
 */

/**
 * @function constructEvalFunction
 * @param {String} code - JS code.
 * @param {String} original - Original JS code.
 * @returns {*} Eval function.
 * @description Function for constructing eval function.
 */
export function constructEvalFunction(code, original) {
  let func;

  try {
    /* eslint no-new-func: 0 */
    func = new Function('$', `return ${ code }`);
    func.expression = code;
    func.original = original;

    return func;
  } catch (err) {
    throw new Error(`Syntax error (in "${ code }", original code: "${ original }")`);
  }
}
