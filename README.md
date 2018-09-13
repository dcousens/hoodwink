# hoodwink
[![build status](https://secure.travis-ci.org/dcousens/hoodwink.png)](http://travis-ci.org/dcousens/hoodwink)
[![Version](http://img.shields.io/npm/v/hoodwink.svg)](https://www.npmjs.org/package/hoodwink)

A dead simple mock/stub module for Javascript

**TODO**: `hoodwink/async`


## Examples
``` javascript
const tape = require('tape')
const hoodwink = require('hoodwink')

tape('stub returns 0, then 1', hoodwink(function (t) {
  const foo = this.stub(function f () {
    if (foo.calls === 0) return 0
    if (foo.calls === 1) return 1
  }, 2)

  t.equal(foo(), 0)
  t.equal(foo(), 1)
  // t.equal(foo(), ...) // XXX: throws! (as foo.calls would be > 2)
})
```
**Pro**tip: use `function (...) {}`, not `() => {}`, to prevent `this` binding issues


## License [MIT](LICENSE)
