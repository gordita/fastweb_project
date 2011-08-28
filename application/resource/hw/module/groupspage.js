goog.provide('hw.module.GroupsPage');

goog.require('hw.async.ModuleLoader');
goog.require('hw.module.BasePage');
goog.require('hw.ui.BaseComponent');
goog.require('hw.ui.BlueBar');
goog.require('hw.layout.StackRows');
goog.require('hw.url.Dispatcher');
goog.require('hw.ui.feed.Groups');


/**
 * @constructor
 * @extends {hw.module.BasePage}
 */
hw.module.GroupsPage = function() {
  goog.base(this);

  var uri = hw.url.Dispatcher.getWindowUri(true);
  var userId = /** @type {string} */ (uri.getQueryData().get('id'));
  var layout = new hw.layout.StackRows();

  var bluebar = new hw.ui.BlueBar();
  layout.addToHeader(bluebar);

  var groupsFeed = new hw.ui.feed.Groups(userId);
  layout.addToBody(groupsFeed);

  this.addChild(layout);
};
goog.inherits(hw.module.GroupsPage, hw.module.BasePage);


hw.async.ModuleLoader.setLoaded(
  hw.Module.Names.GroupsPage,
  hw.module.GroupsPage);

