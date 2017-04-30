import { iterateArray, iterateObject } from '../../utils';

export function normalizeArgs(argsChain) {
  const newArgs = {};

  iterateArray(argsChain, (args) => {
    iterateObject(args, (value, arg) => {
      newArgs[arg] = value;
    });
  });

  return newArgs;
}
