import { iterateObject, create } from '../../utils';

export function getDefaultArgs(argsDescriptions) {
  const newArgs = create(null);

  iterateObject(argsDescriptions, ({ default: def }, arg) => {
    newArgs[arg] = def;
  });

  return newArgs;
}
