// This file was automatically generated from searchbox.tpl.
// Please don't edit this file by hand.

goog.provide('tpl.ui.SearchBox');

goog.require('soy');
goog.require('soy.StringBuilder');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
tpl.ui.SearchBox.element = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="', soy.$$escapeHtml(opt_data.id), '" class="', CSS_SEARCH_BOX, '"><input type="search" id="', soy.$$escapeHtml(opt_data.id), '_text"  class="', CSS_SEARCH_BOX_TEXT, '" placeholder="', soy.$$escapeHtml(opt_data.text), '" /></div>');
  if (!opt_sb) return output.toString();
};
