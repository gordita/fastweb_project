// This file was automatically generated from bluebar.tpl.
// Please don't edit this file by hand.

goog.provide('tpl.ui.BlueBar');

goog.require('soy');
goog.require('soy.StringBuilder');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
tpl.ui.BlueBar.element = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="', soy.$$escapeHtml(opt_data.id), '" class="', CSS_BLUE_BAR, ' ', CSS_BLUE_GRADIENT_BOX, '"><div class="', CSS_TABLE, '"><div class="', CSS_TR, '">', (opt_data.backUrl) ? '<div class="' + CSS_TD + '"><a href="' + soy.$$escapeHtml(opt_data.backUrl) + '" class="' + CSS_BLUEBAR_BACK + '">&lsaquo;</a></div><div class="' + CSS_TD + ' ' + CSS_DIVIDER + '"></div>' : '', '<div class="', CSS_TD, '"><a href="/" class="', CSS_BLUEBAR_LOGO, '">fastweb</a></div></div></div></div>');
  if (!opt_sb) return output.toString();
};
