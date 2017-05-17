/* eslint-disable no-nested-ternary, no-negated-condition */
export default typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};
/* eslint-enable no-nested-ternary, no-negated-condition */
