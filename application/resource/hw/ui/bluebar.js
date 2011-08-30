goog.provide('hw.ui.BlueBar');
goog.provide('hw.ui.BlueBar.Options');

goog.require('hw.dom.ViewportSizeMonitor');
goog.require('hw.events.EventType');
goog.require('hw.ui.BaseComponent');
goog.require('hw.url.Navigator');
goog.require('tpl.CSS_NAMES');
goog.require('tpl.ui.BlueBar');


/**
 * @param {hw.ui.BlueBar.Options=} opt_options
 * @constructor
 * @extends {hw.ui.BaseComponent}
 */
hw.ui.BlueBar = function(opt_options) {
  this.options_ = opt_options || new hw.ui.BlueBar.Options();
  goog.base(this);
};
goog.inherits(hw.ui.BlueBar, hw.ui.BaseComponent);

/**
 * @type {hw.ui.BlueBar.Options}
 * @private
 */
hw.ui.BlueBar.prototype.options_ = null;


/** @inheritDoc */
hw.ui.BlueBar.prototype.createTemplate = function(payload) {
  payload.backUrl = this.options_.showBackButton ?
    hw.url.Navigator.getPreviousUrl() :
    null;

  return tpl.ui.BlueBar.element(payload).toString();
};


/**
 * @constructor
 */
hw.ui.BlueBar.Options = function() {
};


/**
 * @type {boolean}
 */
hw.ui.BlueBar.Options.prototype.showBackButton = true;
