var tape = require('tape')
var pull = require('pull-stream')
var pcontinue = require('./')

tape('simple', function (t) {

  pull(
    pcontinue(function (i, n) {
      if(i < 10)
        return pull(pull.count(99), pull.map(function (m) {
          return m + i * 100
        }))
    }),
    pull.through(console.error),
    pull.collect(function (err, ary) {
      var expected = []
      for(var i = 0; i < 1000; i++)
        expected.push(i)

      t.deepEqual(ary, expected)
      t.end()
    })
  )

})
