import { iterateArray, iterateObject, keys } from '../../utils';

export function calculateArgs(args, argsObject) {
  iterateArray(keys(argsObject), (arg) => {
    if (!(arg in args)) {
      argsObject[arg] = undefined;
    }
  });

  iterateObject(args, (value, arg) => {
    argsObject[arg] = value;
  });
}
