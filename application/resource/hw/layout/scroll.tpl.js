// This file was automatically generated from scroll.tpl.
// Please don't edit this file by hand.

goog.provide('tpl.layout.Scroll');

goog.require('soy');
goog.require('soy.StringBuilder');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
tpl.layout.Scroll.element = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="', soy.$$escapeHtml(opt_data.id), '" class="', CSS_SCROLL_LAYOUT, '"><div id="', soy.$$escapeHtml(opt_data.id), '_body" class="', CSS_SCROLL_LAYOUT_BODY, '"></div></div>');
  if (!opt_sb) return output.toString();
};
