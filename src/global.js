/* eslint-disable no-nested-ternary */
/* eslint-disable no-negated-condition */
export default typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};
/* eslint-enable no-nested-ternary */
/* eslint-enable no-negated-condition */
