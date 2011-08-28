// This file was automatically generated from chrome.tpl.
// Please don't edit this file by hand.

goog.provide('tpl.ui.Chrome');

goog.require('soy');
goog.require('soy.StringBuilder');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
tpl.ui.Chrome.element = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="', soy.$$escapeHtml(opt_data.id), '"></div>');
  if (!opt_sb) return output.toString();
};
