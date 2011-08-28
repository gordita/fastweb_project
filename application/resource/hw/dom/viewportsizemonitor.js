goog.provide('hw.dom.ViewportSizeMonitor');

goog.require('goog.events.Event');
goog.require('goog.events.EventHandler');
goog.require('goog.events.EventTarget');
goog.require('goog.events.EventType');
goog.require('goog.math.Size');
goog.require('hw.Logger');
goog.require('hw.config');
goog.require('hw.events.Event');
goog.require('hw.events.EventType');


/**
 * @param {Window=} opt_win
 * @extends {goog.events.EventTarget}
 * @constructor
 */
hw.dom.ViewportSizeMonitor = function(opt_win) {
  goog.base(this);
  this.handler_ = new goog.events.EventHandler(this);

  this.window_ = opt_win || window;

  this.handler_.listen(
    this.window_, [
      goog.events.EventType.RESIZE,
      hw.events.EventType.ORIENTATION_CHANGE
    ],
    this.onResize_);


  this.handler_.listen(
    this.window_.document,
    goog.events.EventType.CLICK,
    this.onTouchEnd_);


  this.onResizeInternal_();

  this.intreval_ = this.window_.setInterval(
    goog.bind(this.onResizeInternal_, this),
    1500);
};
goog.inherits(hw.dom.ViewportSizeMonitor, goog.events.EventTarget);
goog.addSingletonGetter(hw.dom.ViewportSizeMonitor);

/**
 * @type {Window}
 * @private
 */
hw.dom.ViewportSizeMonitor.prototype.window_ = null;


/**
 * @type {goog.math.Size}
 * @private
 */
hw.dom.ViewportSizeMonitor.prototype.size_ = null;

/**
 * @type {goog.events.EventHandler}
 * @private
 */
hw.dom.ViewportSizeMonitor.prototype.handler_ = null;


/**
 * @type {number}
 * @private
 */
hw.dom.ViewportSizeMonitor.prototype.intreval_ = 0;

/**
 * @type {number}
 * @private
 */
hw.dom.ViewportSizeMonitor.prototype.timeout_ = 0;


/**
 * @inheritDoc
 */
hw.dom.ViewportSizeMonitor.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
  this.window_.clearInterval(this.intreval_);
  this.window_.clearTimeout(this.timeout_);
  this.handler_.dispose();
  this.handler_ = null;
};

/**
 * hideAddressBar
 */
hw.dom.ViewportSizeMonitor.prototype.hideAddressBar = function() {
  if (hw.config.ENABLE_HIDE_ADDRESSBAR) {
    window.scrollTo(0, 1);
    this.timeout_ = this.window_.setTimeout(
      goog.bind(this.onResizeInternal_, this),
      100);
  }
};


/**
 * @return {goog.math.Size}
 */
hw.dom.ViewportSizeMonitor.prototype.getSize = function() {
  var w = this.window_['innerWidth'];
  var h = this.window_['innerHeight'];
  var size = new goog.math.Size(w, h);
  this.size_ = size;
  return this.size_.clone();
};


/**
 * @param {Event=} evt
 * @private
 */
hw.dom.ViewportSizeMonitor.prototype.onResize_ = function(evt) {
  if (evt && evt.type == hw.events.EventType.ORIENTATION_CHANGE) {
    this.hideAddressBar();
  } else {
    this.onResizeInternal_();
  }
};


/**
 * @private
 */
hw.dom.ViewportSizeMonitor.prototype.onTouchEnd_ = function() {
  this.hideAddressBar();
};


/**
 * @private
 */
hw.dom.ViewportSizeMonitor.prototype.onResizeInternal_ = function() {
  var w = this.window_['innerWidth'];
  var h = this.window_['innerHeight'];
  if (this.size_ && this.size_.width === w && this.size_.height === h) {
    return;
  }
  var size = new goog.math.Size(w, h);
  this.size_ = size;
  var evt = new hw.events.Event(hw.events.EventType.VIEWPORT_SIZE_CHANGE, this);
  evt.size = size.clone();
  this.dispatchEvent(evt);
};
