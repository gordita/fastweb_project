// This file was automatically generated from sharebox.tpl.
// Please don't edit this file by hand.

goog.provide('tpl.ui.ShareBox');

goog.require('soy');
goog.require('soy.StringBuilder');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
tpl.ui.ShareBox.element = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="', soy.$$escapeHtml(opt_data.id), '" class="', CSS_SHARE_BOX, '"><div class="', CSS_SHARE_BOX_TABLE, '"><div class="', CSS_SHARE_BOX_TR, '">', (opt_data.showUploadPhotoButton) ? '<div class="' + CSS_SHARE_BOX_TD + ' ' + CSS_SHARE_BOX_TD_START + '"><a href="fb://upload/actions" class="' + CSS_UPLOAD_PHOTO_ICON + '">upload photo</a></div>' : '', '<div class="', CSS_SHARE_BOX_TD, '"><div class="', CSS_SHARE_BOX_TEXT_WRAP, '"><textarea id="', soy.$$escapeHtml(opt_data.id), '_text" type="text"  class="', CSS_SHARE_BOX_TEXT, '" placeholder="Share something"></textarea></div></div><div class="', CSS_SHARE_BOX_TD, ' ', CSS_SHARE_BOX_TD_END, '"><input id="', soy.$$escapeHtml(opt_data.id), '_send" type="button" value="Share" class="', CSS_SHARE_BOX_SEND, '"/></div></div></div></div>');
  if (!opt_sb) return output.toString();
};
