// This file was automatically generated from albums.tpl.
// Please don't edit this file by hand.

goog.provide('tpl.ui.feed.Albums');

goog.require('soy');
goog.require('soy.StringBuilder');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
tpl.ui.feed.Albums.result = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="', soy.$$escapeHtml(opt_data.id), '_result">');
  tpl.ui.feed.Albums.content_(opt_data, output);
  output.append('</div>');
  if (!opt_sb) return output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
tpl.ui.feed.Albums.content_ = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="', CSS_FEED_HEAD, '"><h3 class="', CSS_FEED_HEAD_TEXT, '">My Albums</h3><div class="', CSS_FEED_COUNT_TEXT, '">', soy.$$escapeHtml(opt_data.data['data'].length), ' albums</div></div>');
  var albumList23 = opt_data.data['data'];
  var albumListLen23 = albumList23.length;
  for (var albumIndex23 = 0; albumIndex23 < albumListLen23; albumIndex23++) {
    var albumData23 = albumList23[albumIndex23];
    tpl.ui.feed.Albums.albumItem_({item: albumData23, accessToken: opt_data.data['access_token']}, output);
  }
  if (!opt_sb) return output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
tpl.ui.feed.Albums.albumItem_ = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append((opt_data.item['count']) ? '<a href="' + soy.$$escapeHtml(opt_data.item['link']) + '" class="' + CSS_ALBUMS_FEED_ITEM + '"><img src="https://graph.facebook.com/' + soy.$$escapeHtml(opt_data.item['cover_photo']) + '/picture?type=album&access_token=' + soy.$$escapeHtml(opt_data.accessToken) + '" class="' + CSS_ALBUMS_FEED_ITEM_IMG + '" /><span class="' + CSS_ALBUMS_FEED_ITEM_CONTENT + '"><strong class="' + CSS_ALBUMS_FEED_ITEM_NAME + '">' + soy.$$escapeHtml(opt_data.item['name']) + '</strong><span class="' + CSS_ALBUMS_FEED_ITEM_COUNT + '">' + soy.$$escapeHtml(opt_data.item['count']) + ' photos</span></span></a>' : '');
  if (!opt_sb) return output.toString();
};
