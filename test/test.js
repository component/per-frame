
var assert = require('assert');
var throttle = require('../');

describe('per-frame', function () {

  it('should only invoke the given function 1 time when called repeatedly', function () {

    var count = 0;

    var fn = throttle(function () {
      count++;
    });

    assert(count === 0);
    fn();
    assert(count === 1);
    fn();
    assert(count === 1);
    fn();
    assert(count === 1);
  });

  it('should only invoke the given function 1 time per frame', function (done) {

    var count = 0;

    var fn = throttle(function () {
      count++;
    });

    assert(count === 0);
    fn();
    assert(count === 1);
    fn();
    assert(count === 1);
    fn();
    assert(count === 1);

    function one () {
      assert(count === 1);
      fn();
      assert(count === 2);
      fn();
      assert(count === 2);
      fn();
      assert(count === 2);

      setTimeout(two, 50);
    }

    function two () {
      assert(count === 2);
      fn();
      assert(count === 3);
      fn();
      assert(count === 3);
      fn();
      assert(count === 3);

      done();
    }

    setTimeout(one, 50);
  });

  it('should cache the return value', function (done) {
    var count = 0;

    var fn = throttle(function () {
      count++;
      return count === 1 ? 'foo' : 'bar';
    });

    assert(count === 0);
    assert.equal('foo', fn());
    assert(count === 1);
    assert.equal('foo', fn());
    assert(count === 1);
    assert.equal('foo', fn());

    setTimeout(function () {
      assert(count === 1);
      assert.equal('bar', fn());
      assert(count === 2);
      assert.equal('bar', fn());
      assert(count === 2);
      assert.equal('bar', fn());

      done();
    }, 50);
  });

});
