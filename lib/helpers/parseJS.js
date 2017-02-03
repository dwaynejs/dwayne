const emptySpaceRegExp = /^\s+/;
const anyEmptySpaceRegExp = /\s+/g;
const anyEscapedExpressionRegExp = /\\[\s\S]/g;
const anyDoubleQuoteRegExp = /"/g;
const anyNewLineRegExp = /\r\n|\r|\n/g;
const anyCommaEmptySpace = /\s*,\s*/;
const properEscapedRegExp = /\\|u|n|f|r|t|b|v|`[0-7]/;

const thisRegExp = /^this(?![a-zA-Z_$][a-zA-Z0-9_$])/;
const simpleExpressionRegExp = /^(?:true|false|null|undefined)(?![a-zA-Z_$][a-zA-Z0-9_$])/;
const variableRegExp = /^[a-zA-Z_$][a-zA-Z0-9_$]*/;
const numberRegExp = /^(?:NaN|-?(?:(?:\d+|\d*\.\d+)(?:[E|e][+|\-]?\d+)?|Infinity))/;
const stringRegExp = /^(?:"(?:(?:\\[\s\S])|[^"\n\\])*"|'(?:(?:\\[\s\S])|[^'\n\\])*')/;
const regexpRegExp = /^\/(?:(?:\\[\s\S])|[^\/\n\\])+\/[gimuy]*/;
const arrowFunctionRegExp = /^(?:(?:\(\s*((?:[a-zA-Z_$][a-zA-Z0-9_$]*\s*,\s*)?(?:[a-zA-Z_$][a-zA-Z0-9_$]*)?)\s*\))|([a-zA-Z_$][a-zA-Z0-9_$]*))\s*=>/;
const templateStringContentRegExp = /^(?:(?:\\[\s\S])|\$(?!\{)|[^`$\\])+/;
const operatorRegExp = /^(?:(?:>>>|>>|<<)=?|&&|\|\||,|(?:\+|-|\*|\/|%|&|\||\^|<|>|==)=?|=)/;
const pointOperatorRegExp = /^\.[a-zA-Z_$][a-zA-Z0-9_$]*/;
const propertyRegExp = /^((?:"(?:(?:\\[\s\S])|[^"\n\\])*"|'(?:(?:\\[\s\S])|[^'\n\\])*'|[a-zA-Z_$][a-zA-Z0-9_$]*))\s*:/;
const shorthandPropertyRegExp = /^([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=,|})(,?)/;
const unaryOperatorRegExp = /^(?:-|~|\+|!)/;

const EXPRESSION = 'expression';
const END_OF_FUNC_BODY = 'end of function body';
const submitString = 'Please, submit an issue at https://github.com/dwaynejs/dwayne/issues/new, if needed.';

function parseJS(string, wholeString, curlyError) {
  curlyError = !!curlyError;

  const initialString = string;
  const expected = {
    expression: true,
    closingExpressions: [],
    functionScope: {}
  };
  const variables = {};
  const { closingExpressions } = expected;
  let expression = '';
  let index = 0;

  while (string.length) {
    let spaceMatch;
    let match;
    let toConcat = '';
    let matched;
    let isEmptySpace;
    let {
      type: properType,
      symbol: properSymbol
    } = closingExpressions[closingExpressions.length - 1] || {};
    const firstSymbol = string[0];

    if ((spaceMatch = string.match(emptySpaceRegExp)) && !expected.templateString) {
      isEmptySpace = true;
      match = spaceMatch[0];
    } else {
      if (expected.expression) {
        match = string.match(arrowFunctionRegExp);

        if (match) {
          const vars = (match[2] || match[1]).split(anyCommaEmptySpace);
          const variables = [];
          const newFunctionVars = Object.create(expected.functionScope);

          for (let i = 0, length = vars.length; i < length; i++) {
            const variable = vars[i];

            if (variable) {
              variables.push(variable);
              newFunctionVars[variable] = true;
            }
          }

          toConcat = `function(${ variables.join(',') }){return `;
          expected.functionScope = newFunctionVars;
          closingExpressions.push({
            type: 'any',
            symbol: END_OF_FUNC_BODY
          }, {
            type: 'any',
            symbol: EXPRESSION
          });
        } else if (firstSymbol === '(') {
          match = '(';
          closingExpressions.push({
            type: 'paren',
            symbol: ')'
          });
        } else if (firstSymbol === '[') {
          match = '[';
          closingExpressions.push({
            type: 'array',
            symbol: ']'
          });
        } else if (firstSymbol === '`') {
          match = '`';
          toConcat = '(""';
          expected.templateString = true;
          closingExpressions.push({
            type: 'templateString',
            symbol: '`'
          });

          delete expected.expression;
        } else if (firstSymbol === '{') {
          match = '{';
          expected.objectProperty = true;
          closingExpressions.push({
            type: 'object',
            symbol: '}'
          });

          delete expected.expression;
        } else {
          match = string.match(unaryOperatorRegExp);

          if (match) {
            toConcat = match[0].replace(anyEmptySpaceRegExp, ' ');
          } else {
            match = string.match(simpleExpressionRegExp);

            if (!match) {
              match = string.match(numberRegExp);

              if (!match) {
                match = string.match(stringRegExp);

                if (!match) {
                  match = string.match(regexpRegExp);

                  if (!match) {
                    match = string.match(thisRegExp);

                    if (match) {
                      toConcat = '$';
                    } else {
                      match = string.match(variableRegExp);

                      if (match) {
                        const variable = match[0];

                        if (!expected.functionScope[variable]) {
                          variables[variable] = true;
                        }

                        toConcat = getVariable(variable, expected.functionScope);
                      }
                    }
                  }
                }
              }
            }

            if (match) {
              expected.operator = true;
              matched = EXPRESSION;

              delete expected.expression;
            }
          }
        }
      } else if (expected.templateString) {
        match = string.match(templateStringContentRegExp);

        if (match) {
          const string = match[0]
            .replace(anyEscapedExpressionRegExp, (match) => {
              const second = match[1];

              return properEscapedRegExp.test(second)
                ? match
                : second;
            })
            .replace(anyDoubleQuoteRegExp, '\\"')
            .replace(anyNewLineRegExp, (match) => {
              if (match === '\r\n') {
                match = '\\r\\n';
              } else if (match === '\r') {
                match = '\\r';
              } else {
                match = '\\n';
              }

              return `"+"${ match }"+"`;
            });

          toConcat = `+"${ string }"`;
        } else if (firstSymbol === '`') {
          match = '`';
          matched = EXPRESSION;
          toConcat = ')';
          expected.operator = true;
          closingExpressions.pop();

          delete expected.templateString;
        } else if (string.slice(0, 2) === '${') {
          match = '${';
          toConcat = '+(';
          expected.expression = true;
          closingExpressions.push({
            type: 'templateString',
            symbol: '}'
          }, {
            type: 'any',
            symbol: EXPRESSION
          });

          delete expected.templateString;
        }
      } else if (expected.objectProperty) {
        match = string.match(propertyRegExp);

        if (match) {
          toConcat = `${ match[1] }:`;
          expected.expression = true;
          closingExpressions.push({
            type: 'any',
            symbol: EXPRESSION
          });

          delete expected.objectProperty;
        } else {
          match = string.match(shorthandPropertyRegExp);

          if (match) {
            const variable = match[1];

            if (!expected.functionScope[variable]) {
              variables[variable] = true;
            }

            toConcat = `${ variable }:${ getVariable(variable, expected.functionScope) }${ match[2] }`;

            if (!match[2]) {
              expected.operator = true;

              delete expected.objectProperty;
            }
          }
        }
      } else if (expected.operator) {
        if (firstSymbol === ')' || firstSymbol === ']' || firstSymbol === '}' || firstSymbol === ',') {
          toConcat = closeFunctionBody(expected);

          ({
            type: properType,
            symbol: properSymbol
          } = closingExpressions[closingExpressions.length - 1] || {});
        }

        if (firstSymbol === '(') {
          match = '(';
          expected.expression = true;
          closingExpressions.push({
            type: 'call',
            symbol: ')'
          });

          delete expected.operator;
        } else if (firstSymbol === '?') {
          match = '?';
          expected.expression = true;
          closingExpressions.push({
            type: 'ternary',
            symbol: ':'
          }, {
            type: 'any',
            symbol: EXPRESSION
          });

          delete expected.operator;
        } else if (firstSymbol === ':' && properSymbol === ':') {
          match = ':';
          expected.expression = true;
          closingExpressions.pop();

          delete expected.operator;
        } else if (firstSymbol === '[') {
          match = '[';
          expected.expression = true;
          closingExpressions.push({
            type: 'property',
            symbol: ']'
          }, {
            type: 'any',
            symbol: EXPRESSION
          });

          delete expected.operator;
        } else if (firstSymbol === '}' && properSymbol === '}' && properType === 'templateString') {
          match = firstSymbol;
          toConcat += ')';
          expected.templateString = true;
          closingExpressions.pop();

          delete expected.operator;
        } else if (firstSymbol === ']' && properSymbol === ']' && properType === 'property') {
          match = firstSymbol;
          toConcat += firstSymbol;
          matched = EXPRESSION;
          closingExpressions.pop();
        } else if (firstSymbol === ')' && properSymbol === ')' && properType === 'paren') {
          match = firstSymbol;
          toConcat += firstSymbol;
          matched = EXPRESSION;
          closingExpressions.pop();
        } else if (firstSymbol === ',' && properSymbol === '}' && properType === 'object') {
          match = firstSymbol;
          toConcat += firstSymbol;
          matched = EXPRESSION;
          expected.objectProperty = true;

          delete expected.operator;
        } else {
          match = string.match(pointOperatorRegExp);

          if (match) {
            matched = EXPRESSION;
          } else {
            match = string.match(operatorRegExp);

            if (match) {
              toConcat += match[0].replace(anyEmptySpaceRegExp, ' ');
              expected.expression = true;
              closingExpressions.push({
                type: 'any',
                symbol: EXPRESSION
              });

              delete expected.operator;
            }
          }
        }
      }

      if (!match) {
        if (firstSymbol === ')' || firstSymbol === ']' || firstSymbol === '}') {
          toConcat += closeFunctionBody(expected);

          ({
            type: properType,
            symbol: properSymbol
          } = closingExpressions[closingExpressions.length - 1] || {});
        }

        let closingBrace;

        if (properSymbol === ')' && firstSymbol === ')' && properType === 'call') {
          closingBrace = true;

          delete expected.expression;
        } else if (properSymbol === ']' && firstSymbol === ']' && properType === 'array') {
          closingBrace = true;

          delete expected.expression;
        } else if (firstSymbol === '}' && properSymbol === '}' && properType === 'object') {
          closingBrace = true;

          delete expected.objectProperty;
        }

        if (closingBrace) {
          match = firstSymbol;
          toConcat += firstSymbol;
          expected.operator = true;
          matched = EXPRESSION;
          closingExpressions.pop();
        }
      }

      if (
        matched === EXPRESSION
        && closingExpressions.length
        && closingExpressions[closingExpressions.length - 1].symbol === EXPRESSION
      ) {
        closingExpressions.pop();
      }
    }

    const noMatch = !match || !match[0];
    const curlyIndex = string.indexOf('}');

    if (noMatch && (curlyIndex > 0 || curlyError)) {
      const expressionString = curlyError
        ? initialString
        : initialString.slice(0, initialString.length - string.length + curlyIndex);

      throw new Error(
        `Syntax error near ~~~ "${ initialString.slice(index, index + 15) }" ~~~ (index: ${ index }, ${ constructErrorInfo(expressionString, wholeString, closingExpressions, curlyError) }`
      );
    } else if (noMatch && curlyIndex === 0) {
      expression += toConcat;

      break;
    } else if (noMatch && curlyIndex === -1) {
      return null;
    }

    match = typeof match === 'string' ? match : match[0];

    if (!isEmptySpace) {
      expression += toConcat || match;
    }

    string = string.slice(match.length);
    index += match.length;
  }

  expression += closeFunctionBody(expected);

  if (closingExpressions.length) {
    const expressionString = initialString.slice(0, initialString.length - string.length);

    throw new Error(`Unexpected end of input (${ constructErrorInfo(expressionString, wholeString, closingExpressions, curlyError) }`);
  }

  if (!string.length && !curlyError) {
    return null;
  }

  return {
    expression,
    variables,
    rest: string.slice(1)
  };
}

function getVariable(name, functionScope) {
  return functionScope[name]
    ? name
    : `$.${ name }`;
}

function closeFunctionBody(expected) {
  const { closingExpressions } = expected;
  let toConcat = '';

  while (
    closingExpressions[closingExpressions.length - 1]
    && closingExpressions[closingExpressions.length - 1].symbol === END_OF_FUNC_BODY
  ) {
    toConcat += '}';
    expected.functionScope = Object.getPrototypeOf(expected.functionScope);
    closingExpressions.pop();

    if (
      closingExpressions.length
      && closingExpressions[closingExpressions.length - 1].symbol === EXPRESSION
    ) {
      closingExpressions.pop();
    }
  }

  return toConcat;
}

function constructErrorInfo(expressionString, wholeString, closingExpressions, curlyError) {
  let { symbol: last } = closingExpressions[closingExpressions.length - 1] || {};
  let wholeStringString = '';

  if (last && last !== EXPRESSION && last !== END_OF_FUNC_BODY) {
    last = `"${ last }"`;
  }

  if (!curlyError) {
    wholeStringString = `, whole string: "${ wholeString }"`;
  }

  const lastString = last
    ? `expected ${ last }, `
    : '';

  return `${ lastString }initial expression: "${ expressionString }"${ wholeStringString }). ${ submitString }`;
}

export default parseJS;
