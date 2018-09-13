const tape = require('tape')
const hoodwink = require('../')

tape('explodes on too few calls', function (t) {
  t.throws(() => {
    hoodwink(function () {
      function f () {}
      const stub = this.stub(f, 3)

      t.equal(f.calls, 0)
      stub()
      t.equal(f.calls, 1)
    })()
  }, /Too few calls/)

  t.end()
})

tape('explodes on too many calls', function (t) {
  hoodwink(function () {
    function f () {}
    const stub = this.stub(f, 2)

    stub()
    stub()

    t.equal(f.calls, 2)
    t.throws(() => stub())
    t.equal(f.calls, 2) // doesn't increment when throwing
  }, /Too many calls/)()

  t.end()
})
