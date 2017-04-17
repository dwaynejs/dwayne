import { collectFromObject, assign } from '../../utils';
import { D_REST_REGEX } from '../../constants';
import { mixinMatch } from './mixinMatch';

export function transformRestAttrs(attrs, mixins, mixinDefaultOpts) {
  return collectFromObject(attrs, (eventualAttrs, value, attr) => {
    if (D_REST_REGEX.test(attr)) {
      return assign(eventualAttrs, transformRestAttrs(value, mixins, mixinDefaultOpts));
    }

    const match = mixinMatch(mixins, attr);

    if (match) {
      eventualAttrs[attr] = {
        type: 'mixin',
        dynamic: true,
        opts: {
          value,
          ...match,
          ...mixinDefaultOpts
        },
        value
      };

      return;
    }

    eventualAttrs[attr] = {
      type: 'attr',
      value
    };
  });
}

export function transformRestArgs(args) {
  return collectFromObject(args, addArgs);
}

function addArgs(args, value, arg) {
  if (D_REST_REGEX.test(arg)) {
    assign(args, transformRestArgs(value));
  } else {
    args[arg] = value;
  }
}
