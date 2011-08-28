// This file was automatically generated from profilecard.tpl.
// Please don't edit this file by hand.

goog.provide('tpl.ui.ProfileCard');

goog.require('soy');
goog.require('soy.StringBuilder');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
tpl.ui.ProfileCard.element = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="', soy.$$escapeHtml(opt_data.id), '" class="', CSS_PROFILE_CARD, '"></div>');
  if (!opt_sb) return output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
tpl.ui.ProfileCard.content = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="', CSS_PROFILE_CARD_CONTENT, '"><img src="//graph.facebook.com/', soy.$$escapeHtml(opt_data.data['id']), '/picture" class="', CSS_PROFILE_CARD_CONTENT_IMG, '"/><strong class="', CSS_PROFILE_CARD_CONTENT_NAME, '">', soy.$$escapeHtml(opt_data.data['name']), '</strong></div>');
  if (!opt_sb) return output.toString();
};
