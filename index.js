module.exports = function hoodwink (f) {
  const mocks = []

  function mock (constructor, functionName, func, n) {
    n = n || Infinity

    const initial = constructor[functionName]
    const context = constructor.constructor.name !== 'Function' ? constructor : null
    function __mock () {
      if (__mock.calls >= n) throw new RangeError('Too many calls')
      const r = func.apply(context, arguments)
      ++__mock.calls
      return r
    }
    __mock.calls = 0
    __mock.expected = n
    __mock.reset = function reset () {
      constructor[functionName] = initial
    }
    constructor[functionName] = __mock
    mocks.push(__mock)
  }

  function stub (func, n) {
    n = n || Infinity

    function __stub () {
      if (__stub.calls >= n) throw new RangeError('Too many calls')
      const r = func.apply(null, arguments)
      ++__stub.calls
      return r
    }
    __stub.calls = 0
    __stub.expected = n

    mocks.push(__stub)
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
