goog.provide('hw.module.TbdPage');

goog.require('hw.async.ModuleLoader');
goog.require('hw.module.BasePage');
goog.require('hw.ui.BaseComponent');
goog.require('hw.ui.BlueBar');
goog.require('hw.layout.StackRows');
goog.require('hw.ui.feed.Albums');
goog.require('hw.url.Dispatcher');


/**
 * @constructor
 * @extends {hw.module.BasePage}
 */
hw.module.TbdPage = function() {
  goog.base(this);

  var uri = hw.url.Dispatcher.getWindowUri(true);
  var userId = /** @type {string} */ (uri.getQueryData().get('id'));
  var layout = new hw.layout.StackRows();

  var bluebar = new hw.ui.BlueBar();
  layout.addToHeader(bluebar);

  var dummy = new hw.ui.BaseComponent();
  layout.addToBody(dummy);


  this.dummy_ = dummy;
  this.addChild(layout);
};
goog.inherits(hw.module.TbdPage, hw.module.BasePage);

/**
 * @type {hw.ui.BaseComponent}
 * @private
 */
hw.module.TbdPage.prototype.dummy_ = null;

/** @inheritDoc */
hw.module.TbdPage.prototype.captureElement = function() {
  this.dummy_.getElement().innerHTML = '<div style="padding: 6px;">' +
    'Coming soon :-P <br />' +
    window.location.pathname +
    '</div>';
};


hw.async.ModuleLoader.setLoaded(
  hw.Module.Names.TbdPage,
  hw.module.TbdPage);

