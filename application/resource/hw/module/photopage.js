goog.provide('hw.module.PhotoPage');

goog.require('hw.async.ModuleLoader');
goog.require('hw.module.BasePage');
goog.require('hw.ui.BaseComponent');
goog.require('hw.layout.FullView');
goog.require('hw.ui.BlueBar');
goog.require('hw.ui.PhotosViewer');
goog.require('hw.url.Dispatcher');


/**
 * @constructor
 * @extends {hw.module.BasePage}
 */
hw.module.PhotoPage = function() {
  goog.base(this);
  var uri = hw.url.Dispatcher.getWindowUri(true);
  var queryData = uri.getQueryData();
  var albumId = /** @type {string} */ (queryData.get('fbid'));
  var photoId = /** @type {string} */ (queryData.get('id'));

  if (queryData.get('type') == 1 && queryData.get('set')) {
    // Workaround to patch FB generated URL for single photo.
    photoId = albumId;
    albumId = '';
  }

  var photoViewer = new hw.ui.PhotosViewer(photoId, albumId);
  var bluebar = new hw.ui.BlueBar();
  bluebar.addCssName(tpl.CSS_NAMES.CSS_PHOTOS_VIEWER_TOP_BAR);

  var layout = new hw.layout.FullView();
  layout.addChild(photoViewer);
  layout.addChild(bluebar);
  this.addChild(layout);
};
goog.inherits(hw.module.PhotoPage, hw.module.BasePage);


hw.async.ModuleLoader.setLoaded(
  hw.Module.Names.PhotoPage,
  hw.module.PhotoPage);

