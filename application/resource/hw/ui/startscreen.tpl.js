// This file was automatically generated from startscreen.tpl.
// Please don't edit this file by hand.

goog.provide('tpl.ui.StartScreen');

goog.require('soy');
goog.require('soy.StringBuilder');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
tpl.ui.StartScreen.element = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="', soy.$$escapeHtml(opt_data.id), '" class="', CSS_START_SCREEN, ' ', CSS_CENTER_LAYOUT, '"><div class="', CSS_CENTER_LAYOUT_WRAP_ONE, '"><div class="', CSS_CENTER_LAYOUT_WRAP_TWO, '"><div class="', CSS_START_SCREEN_LOGO, '">fastweb</div><div id="', soy.$$escapeHtml(opt_data.id), '_login" class="', CSS_START_SCREEN_LOGIN_BUTTON, ' ', CSS_BUTTON_BLUE, '" tabindex="1">Login</div><div id="', soy.$$escapeHtml(opt_data.id), '_loading" class="', CSS_LOADING_INDICATIOR, '"><i class="', CSS_LOADING_INDICATIOR_L, '"></i><i class="', CSS_LOADING_INDICATIOR_M, '"></i><i class="', CSS_LOADING_INDICATIOR_R, '"></i></div></div></div></div></div>');
  if (!opt_sb) return output.toString();
};
