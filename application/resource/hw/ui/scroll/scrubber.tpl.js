// This file was automatically generated from scrubber.tpl.
// Please don't edit this file by hand.

goog.provide('tpl.ui.scroll.Scrubber');

goog.require('soy');
goog.require('soy.StringBuilder');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
tpl.ui.scroll.Scrubber.element = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="', soy.$$escapeHtml(opt_data.id), '" class="', CSS_SCRUBBER, '" tabindex="1"><div class="', CSS_SCRUBBER_ICON, '" id="', soy.$$escapeHtml(opt_data.id), '_icon" ></div></div>');
  if (!opt_sb) return output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
tpl.ui.scroll.Scrubber.label = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="', CSS_SCRUBBER_LABEL, '"></div>');
  if (!opt_sb) return output.toString();
};
