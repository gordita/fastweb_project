goog.provide('hw.ui.LoginButton');

goog.require('goog.ui.Component');
goog.require('goog.events.EventType');
goog.require('hw.template.common');
goog.require('soy');


/**
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @extends {goog.ui.Component}
 * @constructor
 */
hw.ui.LoginButton = function(opt_domHelper) {
  goog.base(this, opt_domHelper);
};
goog.inherits(hw.ui.LoginButton, goog.ui.Component);


/**
 * @inheritDoc
 */
hw.ui.LoginButton.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');

  this.getElement().innerHTML = hw.template.common.LoginButton();

  this.getHandler().listen(
    this.getElement().firstChild,
    goog.events.EventType.CLICK,
    this.onClick_);
};


/**
 * @param {Event} evt
 * @private
 */
hw.ui.LoginButton.prototype.onClick_ = function(evt) {
  hw.async.Fb.openLoginPopup();
};