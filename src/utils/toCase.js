const DASHED_SYMBOL_REGEX = /-[a-z]/g;
const UPPERCASED_SYMBOL_REGEX = /[A-Z]/g;

export function toCamelCase(value) {
  return value.replace(DASHED_SYMBOL_REGEX, capitalize);
}

export function toHyphenCase(value) {
  return value.replace(UPPERCASED_SYMBOL_REGEX, hyphenize);
}

function capitalize(match) {
  return match[1].toUpperCase();
}

function hyphenize(match) {
  return `-${ match[0].toLowerCase() }`;
}
