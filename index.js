var raf = require('raf')

module.exports = function (fn, immediate) {
  var queued = false
  // immediate by default
  if (immediate !== false)
    call()

  return queue

  function queue() {
    if (queued)
      return
    queued = true
    raf(call)
  }

  function call() {
    fn()
    queued = false
  }
}