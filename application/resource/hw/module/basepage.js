goog.provide('hw.module.BasePage');

goog.require('hw.async.ModuleLoader');
goog.require('hw.ui.BaseComponent');

/**
 * @constructor
 * @extends {hw.ui.BaseComponent}
 */
hw.module.BasePage = function() {
  goog.base(this);
};
goog.inherits(hw.module.BasePage, hw.ui.BaseComponent);

hw.async.ModuleLoader.setLoaded(
  hw.Module.Names.BasePage,
  hw.module.BasePage);