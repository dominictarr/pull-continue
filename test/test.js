var tape = require('tape')
var pull = require('pull-stream')
var pcontinue = require('../')

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

tape('abort while read is pending', function (t) {
  t.plan(2)

  var read = pcontinue(function (i, n) {
    if(i < 10)
      return pull(pull.count(99), pull.asyncMap(function (m, cb) {
        setImmediate( function() {
          cb(null, m + i * 100)
        })
      }))
  })
  
  read(null, function( err, data) {
    t.ok(err, 'callback from read')
  })
  read(true, function(err, data) {
    t.ok(err, 'callback from abort')
  })
})
