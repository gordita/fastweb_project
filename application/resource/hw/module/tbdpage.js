goog.provide('hw.module.TbdPage');

goog.require('hw.async.ModuleLoader');
goog.require('hw.module.BasePage');
goog.require('hw.ui.BaseComponent');
goog.require('hw.ui.BlueBar');
goog.require('hw.layout.StackRows');
goog.require('hw.ui.feed.Albums');
goog.require('hw.url.Dispatcher');
goog.require('tpl.CSS_NAMES');

/**
 * @constructor
 * @extends {hw.module.BasePage}
 */
hw.module.TbdPage = function() {
  goog.base(this);

  var uri = hw.url.Dispatcher.getWindowUri(true);
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
  this.dummy_.getElement().innerHTML = '<div class="' +
    tpl.CSS_NAMES.CSS_TBD_PAGE_CONTENT + '">' +
    '<h2 style="font-size:2em;margin: 1em;">' +
    window.location.pathname.substr(1) + '</h2>' +
    '<img src="/images/megaman.gif" width="100" height="100" />' +
    '<h3>Coming soon</h3>' +
    '</div>';
};


hw.async.ModuleLoader.setLoaded(
  hw.Module.Names.TbdPage,
  hw.module.TbdPage);

