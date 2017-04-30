import { iterateObject, iterateArray } from '../../utils';
import { executeMixinWatchers } from './executeMixinWatchers';

export function calculateAttrs(normalizedAttrs, attrs, attrsObject, elem, firstTime) {
  iterateObject(attrsObject, ({ type, value }, attr) => {
    if (!(attr in attrs)) {
      if (type === 'attr') {
        elem.removeAttr(attr);
      } else {
        value.$$.remove();
      }

      delete attrsObject[attr];
    }
  });

  const mixins = [];

  iterateObject(normalizedAttrs, ({ type, dynamic, value, opts }, attr) => {
    let nextType;
    let nextDynamic;
    let nextValue;

    if (attrsObject[attr]) {
      const {
        type: prevType,
        value: prevValue,
        dynamic: prevDynamic
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
        let mixin = prevValue;
        let created;

        if (prevType === 'attr') {
          elem.removeAttr(attr);

          created = true;
          opts.dynamic = dynamic;
          mixin = new opts.Mixin(opts);
        } else {
          mixin.$$.isDynamic = dynamic;
        }

        if (dynamic) {
          executeMixinWatchers(mixin, value);
        } else if (!mixin.$$.evaluated && opts.Mixin.evaluate) {
          const newValue = mixin.$$.parentScope.$$.evaluate(
            value,
            constructMixinWatcher(mixin, attr, attrs),
            mixin
          );

          mixin.$$.evaluated = true;

          executeMixinWatchers(mixin, newValue);
        } else if (prevDynamic && opts.Mixin.evaluate) {
          executeMixinWatchers(mixin, mixin.$$.parentScope.$$.evaluate(value));
        }

        nextValue = mixin;

        if (created) {
          mixin.$$.setAfterUpdate();
        }
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

          const mixin = new opts.Mixin(opts);

          if (!dynamic && opts.Mixin.evaluate) {
            const {
              parentScope,
              value
            } = opts;
            const firstValue = parentScope.$$.evaluate(
              value,
              constructMixinWatcher(mixin, attr, attrs),
              mixin
            );

            mixin.$$.evaluated = true;
            mixin.$$.value = firstValue;
          }

          nextValue = mixin;
          mixin.$$.setAfterUpdate();

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
  });

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

function constructMixinWatcher(mixin, attr, attrs) {
  return function (newValue) {
    const {
      type,
      dynamic
    } = attrs[attr];

    if (type === 'mixin' && !dynamic) {
      executeMixinWatchers(mixin, newValue);
    }
  };
}
