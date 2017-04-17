import { iterateObject, iterateArray } from '../../utils';
import { executeMixinWatchers } from './executeMixinWatchers';
import { createMixin } from './createMixin';

export function calculateAttrs(attrs, attrsObject, elem, firstTime) {
  iterateObject(attrsObject, ({ type, value }, attr) => {
    if (!attrs[attr]) {
      if (type === 'attr') {
        elem.removeAttr(attr);
      } else {
        value.$$.remove();
      }

      delete attrsObject[attr];
    }
  });

  const mixins = [];

  /* eslint guard-for-in: 0 */
  for (const attr in attrs) {
    const {
      type,
      dynamic,
      value,
      opts
    } = attrs[attr];
    let nextType;
    let nextDynamic;
    let nextValue;

    if (attrsObject[attr]) {
      const {
        type: prevType,
        value: prevValue
      } = attrsObject[attr];

      if (type === 'attr') {
        if (prevType === 'mixin') {
          prevValue.$$.remove();
        }

        if (prevValue !== value) {
          elem.attr(attr, value);
        }

        nextValue = value;
      } else {
        const mixin = prevValue;

        if (prevType === 'attr') {
          elem.removeAttr(attr);
        }

        mixin.$$.isDynamic = dynamic;

        if (dynamic) {
          executeMixinWatchers(mixin, value);
        } else if (!mixin.$$.evaluated && opts.Mixin.evaluate) {
          const newValue = mixin.$$.parentScope.$$.evaluate(value, (newValue) => {
            const {
              type,
              dynamic
            } = attrs[attr];

            if (type === 'mixin' && !dynamic) {
              executeMixinWatchers(mixin, newValue);
            }
          }, mixin);

          mixin.$$.evaluated = true;

          executeMixinWatchers(mixin, newValue);
        }

        nextValue = mixin;
      }

      nextType = type;
      nextDynamic = dynamic;
    } else {
      if (type === 'attr') {
        elem.attr(attr, value);

        nextValue = value;
      } else {
        const buildMixin = () => {
          opts.dynamic = dynamic;

          const mixin = createMixin(opts);

          if (!dynamic && opts.Mixin.evaluate) {
            const {
              parentScope,
              value
            } = opts;
            const firstValue = parentScope.$$.evaluate(value, (newValue) => {
              const {
                type,
                dynamic
              } = attrs[attr];

              if (type === 'mixin' && !dynamic) {
                executeMixinWatchers(mixin, newValue);
              }
            }, mixin);

            mixin.$$.evaluated = true;
            mixin.$$.value = firstValue;
          }

          nextValue = mixin;

          return {
            attr,
            opts: {
              type,
              dynamic,
              value: mixin
            }
          };
        };

        if (firstTime) {
          mixins.push(buildMixin);
        } else {
          buildMixin();
        }
      }

      nextType = type;
      nextDynamic = dynamic;
    }

    attrsObject[attr] = {
      type: nextType,
      dynamic: nextDynamic,
      value: nextValue
    };
  }

  if (firstTime) {
    return () => {
      iterateArray(mixins, (buildMixin) => {
        const {
          attr,
          opts
        } = buildMixin();

        attrsObject[attr] = opts;
      });
    };
  }
}
