// This file was automatically generated from dots.tpl.
// Please don't edit this file by hand.

goog.provide('tpl.ui.Dots');

goog.require('soy');
goog.require('soy.StringBuilder');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
tpl.ui.Dots.element = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="', soy.$$escapeHtml(opt_data.id), '" class="', CSS_DOTS, '"></div>');
  if (!opt_sb) return output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
tpl.ui.Dots.dot = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append((opt_data.selected) ? '<span class="' + CSS_DOTS_DOT + ' ' + CSS_DOTS_DOT_SELECTED + '"></span>' : '<span class="' + CSS_DOTS_DOT + '"></span>');
  if (!opt_sb) return output.toString();
};
