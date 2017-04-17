import { iterateArray, keys } from '../../utils';

export function calculateArgs(args, argsObject) {
  iterateArray(keys(argsObject), (arg) => {
    if (!(arg in args)) {
      argsObject[arg] = undefined;
    }
  });

  /* eslint guard-for-in: 0 */
  for (const arg in args) {
    argsObject[arg] = args[arg];
  }
}
