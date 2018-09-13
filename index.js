module.exports = function hoodwink (f) {
  let mocks = []

  function mock (constructor, functionName, func, n) {
    n = n || Infinity

    let initial = constructor[functionName]
    let context = constructor.constructor.name !== 'Function' ? constructor : null
    function __mock () {
      if (func.calls >= n) throw new RangeError('Too many calls')
      let r = func.apply(context, arguments)
      ++func.calls
      return r
    }
    func.calls = 0
    func.expected = n
    func.reset = function reset () {
      constructor[functionName] = initial
    }
    constructor[functionName] = __mock
    mocks.push(func)
  }

  function stub (func, n) {
    n = n || Infinity

    function __stub () {
      if (func.calls >= n) throw new RangeError('Too many calls')
      let r = func.apply(null, arguments)
      ++func.calls
      return r
    }
    func.calls = 0
    func.expected = n

    mocks.push(func)
    return __stub
  }

  return function run () {
    let err
    try {
      f.apply({
        mock: mock,
        stub: stub
      }, arguments)
    } catch (e) {
      err = e
    }

    mocks.forEach(function (x) {
      if (!err) {
        if (x.expected !== Infinity && x.calls !== x.expected) {
          err = new RangeError('Too few calls')
        }
      }

      if (x.reset) x.reset()
    })

    if (err) throw err
  }
}
