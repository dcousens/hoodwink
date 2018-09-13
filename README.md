# hoodwink
[![build status](https://secure.travis-ci.org/dcousens/hoodwink.png)](http://travis-ci.org/dcousens/hoodwink)
[![Version](http://img.shields.io/npm/v/hoodwink.svg)](https://www.npmjs.org/package/hoodwink)

A dead simple mock/stub module for Javascript

**TODO**: `hoodwink/async`


## Examples
``` javascript
const tape = require('tape')
const hoodwink = require('hoodwink')

tape('foo returns 0, then 1', hoodwink(function (t) {
  const stub = this.stub(function f () {
    if (f.calls === 0) return 0
    if (f.calls === 1) return 1
  }, 2)

  t.equal(stub(), 0)
  t.equal(stub(), 1)
  // t.equal(stub(), ...) // would throw! (calls > 2)
})
```
**Pro**tip: use `function (...) {}`, not `() => {}`, to prevent `this` binding issues


## License [MIT](LICENSE)
