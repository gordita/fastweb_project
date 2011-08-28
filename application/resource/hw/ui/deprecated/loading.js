goog.provide('hw.ui.Loading');

goog.require('goog.ui.Component');
goog.require('hw.template.common');
goog.require('soy');


/**
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @extends {goog.ui.Component}
 * @constructor
 */
hw.ui.Loading = function(opt_domHelper) {
  goog.base(this, opt_domHelper);
};
goog.inherits(hw.ui.Loading, goog.ui.Component);


/**
 * @inheritDoc
 */
hw.ui.Loading.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  var tplEl = soy.renderAsFragment(hw.template.common.Loading);
  this.getElement().appendChild(tplEl);
};