/* eslint no-nested-ternary: 0 */
/* eslint no-negated-condition: 0 */
export default typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};
