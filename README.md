# mockme

[![build status](https://secure.travis-ci.org/dcousens/mockme.png)](http://travis-ci.org/dcousens/mockme)
[![Version](http://img.shields.io/npm/v/mockme.svg)](https://www.npmjs.org/package/mockme)

A dead simple mock/stub module for Javascript

**TODO**: `mockme/async`

## Examples

``` javascript
let tape = require('tape')
let mockme = require('mockme')

tape('foo returns 0, then 1', mockme((t) => {
	let stub = this.stub(function f () {
		if (f.calls === 0) return 0
		if (f.calls === 1) return 1
	}, 2)

	t.equal(stub(), 0)
	t.equal(stub(), 1)
	// stub(), will throw, and explode on `mockme` finishing
})
```

## License [ISC](LICENSE)
