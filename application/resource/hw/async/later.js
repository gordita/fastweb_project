goog.provide('hw.async.Later');

goog.require('goog.Disposable');
goog.require('goog.dispose');


/**
 * @param {Object} context
 * @extends {goog.Disposable}
 * @constructor
 */
hw.async.Later = function(context) {
  goog.base(this);
  this.context_ = context;
  this.timers_ = {};
};
goog.inherits(hw.async.Later, goog.Disposable);


/**
 * @type {Object}
 * @private
 */
hw.async.Later.prototype.context_ = null;


/**
 * @type {Object}
 * @private
 */
hw.async.Later.prototype.timers_ = null;


/** @inheritDoc */
hw.async.Later.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
  var win = window;
  for (var timer in this.timers_) {
    win.clearTimeout(parseInt(timer, 10));
  }
  this.timers_ = null;
};

/**
 * @param {number} delay
 * @param {...*} var_args
 */
hw.async.Later.prototype.schedule = function(fn, delay, var_args) {
  var args = Array.prototype.slice.call(arguments, 2);
  var that = this;
  var timer = window.setTimeout(function() {
    delete that.timers_[timer];
    var fnArgs = Array.prototype.slice.call(arguments, 0);
    fn.apply(that.context_, fnArgs.concat(args));
    timer = args = fn = null;
  }, delay);
  this.timers_[timer] = true;
};