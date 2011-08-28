goog.provide('hw.module.PhotosPage');

goog.require('hw.async.ModuleLoader');
goog.require('hw.module.BasePage');
goog.require('hw.ui.BaseComponent');
goog.require('hw.ui.BlueBar');
goog.require('hw.layout.StackRows');
goog.require('hw.ui.SearchBox');
goog.require('hw.ui.feed.Photos');
goog.require('hw.url.Dispatcher');


/**
 * @constructor
 * @extends {hw.module.BasePage}
 */
hw.module.PhotosPage = function() {
  goog.base(this);

  var uri = hw.url.Dispatcher.getWindowUri(true);
  var queryData = uri.getQueryData();
  var albumId = /** @type {string} */ (queryData.get('fbid'));
  var userId = /** @type {string} */ (queryData.get('id'));
  var layout = new hw.layout.StackRows();

  var bluebar = new hw.ui.BlueBar();
  layout.addToHeader(bluebar);

  var photos = new hw.ui.feed.Photos(userId, albumId);
  layout.addToBody(photos);
  this.addChild(layout);
};
goog.inherits(hw.module.PhotosPage, hw.module.BasePage);


hw.async.ModuleLoader.setLoaded(
  hw.Module.Names.PhotosPage,
  hw.module.PhotosPage);

