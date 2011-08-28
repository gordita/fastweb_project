goog.provide('hw.ui.SearchBox');

goog.require('goog.events.EventType');
goog.require('hw.ui.BaseComponent');
goog.require('hw.events.EventType');
goog.require('tpl.CSS_NAMES');
goog.require('tpl.ui.SearchBox');


/**
 * @constructor
 * @extends {hw.ui.BaseComponent}
 */
hw.ui.SearchBox = function() {
  goog.base(this);
};
goog.inherits(hw.ui.SearchBox, hw.ui.BaseComponent);

/** @inheritDoc */
hw.ui.SearchBox.prototype.createTemplate = function(payload) {
  // TODO(hedger): msg.
  payload.text = 'Search For...';
  return tpl.ui.SearchBox.element(payload).toString();
};

/** @inheritDoc */
hw.ui.SearchBox.prototype.captureElement = function() {
  goog.base(this, 'captureElement');

  this.getHandler().listen(
    this.getInnerElement('text'),
    hw.events.EventType.TOUCHSTART,
    this.focusInput_);
};

/**
 * @private
 */
hw.ui.SearchBox.prototype.focusInput_ = function() {
  var el = this.getInnerElement('text');
  this.getInnerElement('text').focus();
};
