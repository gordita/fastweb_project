goog.provide('hw.module.HomePage');

goog.require('hw.async.ModuleLoader');
goog.require('hw.layout.StackRows');
goog.require('hw.module.BasePage');
goog.require('hw.ui.BlueBar');
goog.require('hw.ui.ShareBox');
goog.require('hw.ui.feed.News');


/**
 * @constructor
 * @extends {hw.module.BasePage}
 */
hw.module.HomePage = function() {
  goog.base(this);

  var layout = new hw.layout.StackRows();
  var bluebar = new hw.ui.BlueBar();
  layout.addToHeader(bluebar);

  var sharebox = new hw.ui.ShareBox();
  layout.addToHeader(sharebox);

  // TODO(hedger): Use correct userId.
  var newsFeed = new hw.ui.feed.News('me');
  layout.addToBody(newsFeed);

  this.layout_ = layout;
  this.addChild(layout);
};
goog.inherits(hw.module.HomePage, hw.module.BasePage);


/**
 * @type {hw.layout.StackRows}
 * @private
 */
hw.module.HomePage.prototype.layout_ = null;

hw.async.ModuleLoader.setLoaded(
  hw.Module.Names.HomePage,
  hw.module.HomePage);