// This file was automatically generated from flypanel.tpl.
// Please don't edit this file by hand.

goog.provide('tpl.ui.FlyPanel');

goog.require('soy');
goog.require('soy.StringBuilder');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
tpl.ui.FlyPanel.element = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="', soy.$$escapeHtml(opt_data.id), '" class="', CSS_FLY_PANEL_LAUNCH_BUTTON, ' ', CSS_BLUE_GRADIENT_BOX, '">&nbsp;</div>');
  if (!opt_sb) return output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
tpl.ui.FlyPanel.panel = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="', soy.$$escapeHtml(opt_data.id), '_panel"  tabindex="1" class="', CSS_FLY_PANEL, '"><div tabindex="1" id="', soy.$$escapeHtml(opt_data.id), '_panelCaption" class="', CSS_FLY_PANEL_LAUNCH_BUTTON, ' ', CSS_BLUE_GRADIENT_BOX, '">', soy.$$escapeHtml(opt_data.caption), '</div><div class="', CSS_FLY_PANEL_BODY, '" id="', soy.$$escapeHtml(opt_data.id), '_panelBody"></div></div>');
  if (!opt_sb) return output.toString();
};
