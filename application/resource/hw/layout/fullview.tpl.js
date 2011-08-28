// This file was automatically generated from fullview.tpl.
// Please don't edit this file by hand.

goog.provide('tpl.layout.FullView');

goog.require('soy');
goog.require('soy.StringBuilder');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
tpl.layout.FullView.element = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="', soy.$$escapeHtml(opt_data.id), '" class="', CSS_FULL_VIEW_LAYOUT, '"></div>');
  if (!opt_sb) return output.toString();
};
