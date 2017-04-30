import { iterateArray, iterateObject, keys } from '../../utils';

export function calculateArgs(normalizedArgs, args, argsObject) {
  iterateArray(keys(argsObject), (arg) => {
    if (!(arg in args)) {
      argsObject[arg] = undefined;
    }
  });

  iterateObject(normalizedArgs, (value, arg) => {
    argsObject[arg] = value;
  });
}
