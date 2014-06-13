/**
 * Module Dependencies.
 */

var raf = require('raf');

/**
 * Export `throttle`.
 */

module.exports = throttle;

/**
 * Executes a function at most once per animation frame. Kind of like
 * throttle, but it throttles at ~60Hz.
 *
 * @param {Function} fn - the Function to throttle once per animation frame
 * @return {Function}
 * @public
 */

function throttle(fn) {
  var queued = false;

  return function queue() {
    if (queued) return;
    queued = true;
    var ctx = this;
    var args = arguments;

    raf(function() {
      queued = false;
      return fn.apply(ctx, args);
    });
  };
}
