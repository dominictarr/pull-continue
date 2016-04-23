

module.exports = function (create) {
  var i = 0, n = 0, read, aborted
  return function (abort, cb) {
    if(aborted) return cb(aborted)
    aborted = abort
    if(abort && !read) return cb(true)
    if(abort)          return read(abort, cb)
    if (!read)         read = create(i++)

    read(null, function (end, data) {
      if(aborted) return cb(aborted)
      if(end) {
        read = create(i++, n)
        if(!read) cb(end)
        else      read(null, cb)
        return
      }  else {
        n++
        cb(null, data)
      }

    })
  }
}
