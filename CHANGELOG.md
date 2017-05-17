## v4.1.0:

* Add `Block#getConstructor` which returns the block constructor.
* Add `Block#_afterConstruct`, `Block._afterRender`,
 `Block._afterDOMChange` and `Block._beforeRemove` and use them as
 proxies for `Block.extend`.
* Add `Block.extend` which helps wrap the default `Block` class.
