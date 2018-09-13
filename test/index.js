const tape = require('tape')
const hoodwink = require('../')

tape('explodes on too few calls', function (t) {
  t.throws(() => {
    hoodwink(function () {
      function f () {}
      const stub = this.stub(f, 3)

      stub()
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
    t.throws(() => stub())
  }, /Too many calls/)()

  t.end()
})
