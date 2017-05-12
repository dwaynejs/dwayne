import { iterateObject, iterateArray, hasOwnProperty } from '../../utils';
import { executeMixinWatchers } from './executeMixinWatchers';
import { InternalMixin } from './InternalMixin';

export function calculateAttrs({
  newAttrs, currentAttrs, currentMixins,
  elem, parentBlock, firstTime
}) {
  iterateObject(currentAttrs, (value, attr) => {
    if (!hasOwnProperty(newAttrs, attr)) {
      if (value instanceof InternalMixin) {
        currentMixins[attr].$$.remove();
        delete currentMixins[attr];
      } else {
        elem.removeAttr(attr);
      }

      delete currentAttrs[attr];
    }
  });

  const mixins = [];

  iterateObject(newAttrs, (value, attr) => {
    const prevValue = currentAttrs[attr];

    if (prevValue === value) {
      return;
    }

    if (value instanceof InternalMixin) {
      const {
        parentScope,
        Mixin,
        value: evalFn
      } = value;

      if (prevValue) {
        const mixin = currentMixins[attr];
        const { $$ } = mixin;
        let newValue;

        $$.internal = value;

        if ($$.internals.indexOf(value) === -1) {
          $$.internals.push(value);

          if (Mixin.evaluate) {
            newValue = parentScope.$$.evaluate(
              evalFn,
              constructMixinWatcher(mixin, value),
              mixin
            );
          }
        } else if (Mixin.evaluate) {
          newValue = parentScope.$$.evaluate(evalFn);
        }

        if (Mixin.evaluate) {
          executeMixinWatchers(mixin, newValue);
        }
      } else {
        const buildMixin = () => {
          const mixin = new Mixin({
            ...value,
            parentBlock,
            elem,
            internal: value
          });
          const { $$ } = mixin;

          $$.internal = value;
          $$.internals = [value];
          currentMixins[attr] = mixin;

          if (Mixin.evaluate) {
            const afterUpdate = (newValue, oldValue) => {
              try {
                mixin.afterUpdate(newValue, oldValue);
              } catch (err) {
                console.error(`Uncaught error in ${ $$.name }#afterUpdate:`, err);
              }
            };

            $$.value = parentScope.$$.evaluate(
              evalFn,
              constructMixinWatcher(mixin, value),
              mixin
            );
            afterUpdate($$.evaluate(afterUpdate));
          }
        };

        if (firstTime) {
          mixins.push(buildMixin);
        } else {
          buildMixin();
        }
      }
    } else {
      elem.attr(attr, value);
    }

    currentAttrs[attr] = value;
  });

  if (firstTime) {
    return () => {
      iterateArray(mixins, buildMixin);
    };
  }
}

function constructMixinWatcher(mixin, internalMixin) {
  return function (newValue) {
    if (mixin.$$.internal === internalMixin) {
      executeMixinWatchers(mixin, newValue);
    }
  };
}

function buildMixin(builder) {
  builder();
}
