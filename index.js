/**
 * Module Dependencies
 */

var raf = require('raf')

/**
 * Export `throttle`
 */

module.exports = throttle;

/**
 * Throttle by the request animation frame.
 *
 * @param {Function} fn
 * @return {Function}
 */

function throttle(fn) {
  var queued = false;
  return queue;

  function queue() {
    if (queued) return;
    queued = true;
    var ctx = this;
    var args = arguments;

    raf(function() {
      queued = false;
      return fn.apply(ctx, args);
    });
  }
}
