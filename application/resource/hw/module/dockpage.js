goog.provide('hw.module.DockPage');

goog.require('hw.async.ModuleLoader');
goog.require('hw.module.BasePage');
goog.require('hw.ui.BlueBar');
goog.require('hw.ui.BlueBar.Options');
goog.require('hw.layout.StackRows');
goog.require('hw.others.IScroll');
goog.require('hw.ui.scroll.Options');
goog.require('hw.ui.DockIcons');
goog.require('hw.ui.Dots');
goog.require('hw.ui.FlyPanel');


/**
 * @constructor
 * @extends {hw.module.BasePage}
 */
hw.module.DockPage = function() {
  goog.base(this);

  var scrollOptions = new hw.ui.scroll.Options();
  scrollOptions.vScroll = false;
  scrollOptions.hScroll = true;
  scrollOptions.momentum = false;
  scrollOptions.hScrollbar = false;
  scrollOptions.vScrollbar = false;
  scrollOptions.snap = true;
  scrollOptions.onScrollEnd = goog.bind(this.onScrollEnd_, this);

  var layout = new hw.layout.StackRows(scrollOptions);

  var bluebarOptions = new hw.ui.BlueBar.Options();
  bluebarOptions.showBackButton = false;
  var bluebar = new hw.ui.BlueBar(bluebarOptions);
  layout.addToHeader(bluebar);

  var icons = new hw.ui.DockIcons();
  layout.addToBody(icons);

  var dots = new hw.ui.Dots();
  layout.addToFooter(dots);

  // TODO(hedger): use msg.
  var notification = new hw.ui.FlyPanel('Notifications');
  layout.addToFooter(notification);

  this.addChild(layout);

  this.icons_ = icons;
  this.dots_ = dots;
  this.layout_ = layout;

};
goog.inherits(hw.module.DockPage, hw.module.BasePage);

/**
 * @type {hw.layout.StackRows}
 * @private
 */
hw.module.DockPage.prototype.layout_ = null;

/**
 * @type {hw.ui.DockIcons}
 * @private
 */
hw.module.DockPage.prototype.icons_ = null;

/**
 * @type {hw.ui.Dots}
 * @private
 */
hw.module.DockPage.prototype.dots_ = null;


/**
 * @param {hw.others.IScroll} iscroll
 * @private
 */
hw.module.DockPage.prototype.onScrollEnd_ = function(iscroll) {
  if (this.isInDocument()) {
    this.dots_.update(
		  iscroll.getCurrentPageX(),
			iscroll.getPagesXLength());
  }
};

hw.async.ModuleLoader.setLoaded(
  hw.Module.Names.DockPage,
  hw.module.DockPage);
