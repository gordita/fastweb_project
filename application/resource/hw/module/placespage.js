goog.provide('hw.module.PlacesPage');

goog.require('hw.async.ModuleLoader');
goog.require('hw.module.BasePage');
goog.require('hw.ui.BaseComponent');
goog.require('hw.ui.BlueBar');
goog.require('hw.layout.StackRows');
goog.require('hw.url.Dispatcher');
goog.require('hw.ui.feed.Places');


/**
 * @constructor
 * @extends {hw.module.BasePage}
 */
hw.module.PlacesPage = function() {
  goog.base(this);

  var uri = hw.url.Dispatcher.getWindowUri(true);
  var userId = /** @type {string} */ (uri.getQueryData().get('id'));
  var layout = new hw.layout.StackRows();

  var bluebar = new hw.ui.BlueBar();
  layout.addToHeader(bluebar);

  var places = new hw.ui.feed.Places(userId);
  layout.addToBody(places);

  this.addChild(layout);
};
goog.inherits(hw.module.PlacesPage, hw.module.BasePage);


hw.async.ModuleLoader.setLoaded(
  hw.Module.Names.PlacesPage,
  hw.module.PlacesPage);

