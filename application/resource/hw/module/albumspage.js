goog.provide('hw.module.AlbumsPage');

goog.require('hw.async.ModuleLoader');
goog.require('hw.module.BasePage');
goog.require('hw.ui.BlueBar');
goog.require('hw.layout.StackRows');
goog.require('hw.ui.feed.Albums');
goog.require('hw.url.Dispatcher');


/**
 * @constructor
 * @extends {hw.module.BasePage}
 */
hw.module.AlbumsPage = function() {
  goog.base(this);

  var uri = hw.url.Dispatcher.getWindowUri(true);
  var userId = /** @type {string} */ (uri.getQueryData().get('id'));
  var layout = new hw.layout.StackRows();

  var bluebar = new hw.ui.BlueBar();
  layout.addToHeader(bluebar);

  var albumsFeed = new hw.ui.feed.Albums(userId);
  layout.addToBody(albumsFeed);

  this.addChild(layout);
};
goog.inherits(hw.module.AlbumsPage, hw.module.BasePage);


hw.async.ModuleLoader.setLoaded(
  hw.Module.Names.AlbumsPage,
  hw.module.AlbumsPage);

