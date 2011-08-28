// This file was automatically generated from tabs.tpl.
// Please don't edit this file by hand.

goog.provide('tpl.ui.Tabs');

goog.require('soy');
goog.require('soy.StringBuilder');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
tpl.ui.Tabs.element = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<ul id="', soy.$$escapeHtml(opt_data.id), '" class="', CSS_TABS, ' ', CSS_BLUE_GRADIENT_BOX, '"></ul>');
  if (!opt_sb) return output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
tpl.ui.Tabs.tab = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<li id="', soy.$$escapeHtml(opt_data.id), '" tabindex="1" class="', CSS_TAB, ' ', CSS_BLUE_GRADIENT_BOX, '">', soy.$$escapeHtml(opt_data.text), '</li>');
  if (!opt_sb) return output.toString();
};
