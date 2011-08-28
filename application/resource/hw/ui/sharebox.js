goog.provide('hw.ui.ShareBox');

goog.require('goog.events.EventType');
goog.require('hw.config');
goog.require('hw.ui.BaseComponent');

goog.require('hw.events.EventType');
goog.require('tpl.CSS_NAMES');
goog.require('tpl.ui.ShareBox');


/**
 * @constructor
 * @extends {hw.ui.BaseComponent}
 */
hw.ui.ShareBox = function() {
  goog.base(this);
};
goog.inherits(hw.ui.ShareBox, hw.ui.BaseComponent);

/** @inheritDoc */
hw.ui.ShareBox.prototype.createTemplate = function(payload) {
  payload.showUploadPhotoButton = hw.config.USE_FACEWEB_LINK;
  return tpl.ui.ShareBox.element(payload).toString();
};

/** @inheritDoc */
hw.ui.ShareBox.prototype.captureElement = function() {
  goog.base(this, 'captureElement');

  var el = this.getInnerElement('text');
  this.getHandler().listen(
    el,
    hw.events.EventType.TOUCHSTART,
    this.focusInput_);
  this.getHandler().listen(
    el,
    goog.events.EventType.BLUR,
    this.onInputBlur_);
};

/**
 * @private
 */
hw.ui.ShareBox.prototype.focusInput_ = function() {
  var el = this.getInnerElement('text');
  this.getInnerElement('text').focus();
};

/**
 * @private
 */
hw.ui.ShareBox.prototype.onInputBlur_ = function() {
  var el = this.getInnerElement('text');
  el.scrollTop = 0;
  el.scrollLeft = 0;
};

