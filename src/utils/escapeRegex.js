const regexpSpecialCharacters = [
  '.',
  '+', '*', '?',
  '(', ')',
  '[', ']',
  '{', '}',
  '<', '>',
  '^', '$',
  '!',
  '=',
  ':',
  '-',
  '|',
  ',',
  '\\'
];
const regexpSpecialsRegexp = new RegExp(
  regexpSpecialCharacters
    .map((s) => `\\${ s }`)
    .join('|'),
  'g'
);

export function escapeRegex(string) {
  return string.replace(regexpSpecialsRegexp, '\\$&');
}
