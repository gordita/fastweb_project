goog.provide('hw.layout.FullView');

goog.require('goog.async.Throttle');
goog.require('goog.dispose');
goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('goog.events.EventType');
goog.require('goog.math.Size');
goog.require('goog.style');
goog.require('hw.config');
goog.require('hw.dom.ViewportSizeMonitor');
goog.require('hw.events.AppEventTarget');
goog.require('hw.events.EventType');
goog.require('hw.ui.BaseComponent');
goog.require('tpl.CSS_NAMES');
goog.require('tpl.layout.FullView');


/**
 * @constructor
 * @extends {hw.ui.BaseComponent}
 */
hw.layout.FullView = function() {
  goog.base(this);

  this.layoutSize_ = null;

  this.resizeThrottle_ = new goog.async.Throttle(
    this.updateSize_, 250, this);

};
goog.inherits(hw.layout.FullView, hw.ui.BaseComponent);


/**
 * @type {goog.math.Size}
 * @private
 */
hw.layout.FullView.prototype.layoutSize_ = null;


/**
 * @type {goog.async.Throttle}
 * @private
 */
hw.layout.FullView.prototype.resizeThrottle_ = null;


/** @inheritDoc */
hw.layout.FullView.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
  goog.dispose(this.resizeThrottle_);
};


/** @inheritDoc */
hw.layout.FullView.prototype.createTemplate = function(payload) {
  return tpl.layout.FullView.element(payload).toString();
};


/** @inheritDoc */
hw.layout.FullView.prototype.captureElement = function() {
  goog.base(this, 'captureElement');

  var win = this.getDom().getWindow();

  // On Android, RESIZE can be invoked by window.scrollTo().

  this.getHandler().listen(
    hw.dom.ViewportSizeMonitor.getInstance(),
    hw.events.EventType.VIEWPORT_SIZE_CHANGE,
    this.updateSize_);

  hw.dom.ViewportSizeMonitor.getInstance().hideAddressBar();
  this.updateSize_();
};

/** @inheritDoc */
hw.layout.FullView.prototype.releaseElement = function() {
  goog.base(this, 'releaseElement');
  this.resizeThrottle_.dispose();
};

/**
 * @private
 */
hw.layout.FullView.prototype.updateSizeLazily_ = function() {
  // this.resizeThrottle_.fire();
  this.updateSize_();
  this.later(this.updateSize_, 800);
};


/**
 * @private
 */
hw.layout.FullView.prototype.updateSize_ = function() {
  var size = hw.dom.ViewportSizeMonitor.getInstance().getSize();

  if (goog.math.Size.equals(size, this.layoutSize_)) {
    return;
  }

  var isH = size.width > size.height;

  var el = this.getElement();
  goog.dom.classes.enable(el, tpl.CSS_NAMES.CSS_ORIENTATION_PORTRAIT, !isH);
  goog.dom.classes.enable(el, tpl.CSS_NAMES.CSS_ORIENTATION_LANDSCAPE, isH);

  this.layoutSize_ = size;
  goog.style.setSize(this.getElement(), size);

  hw.events.AppEventTarget.updateLayout(this);
  this.later(function() {
    // This would give the scroll layout sometime to catch up the layout change.
    // since both layouts use throttle to update their UI.
    hw.events.AppEventTarget.updateLayout(this);
  }, 500);
};