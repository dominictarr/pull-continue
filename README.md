# pull-continue

A concatenated stream of streams, except the next stream is created
when the previous one ends.

``` js
var pcontinue = require('pull-continue')

  //log a stream of 0-99 10 times.
  pull(
    //i = the index of the stream you are up to (first stream is 0)
    //n = number of items in previous stream.
    pcontinue(function (i, n) {
      if(i > 10) return
      return pull.count(100)
    }),
    pull.log()
  )

```

see also [pull-cat](https://github.com/dominictarr/pull-cat)

## License

MIT
