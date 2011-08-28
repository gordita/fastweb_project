// This file was automatically generated from photos.tpl.
// Please don't edit this file by hand.

goog.provide('tpl.ui.feed.Photos');

goog.require('soy');
goog.require('soy.StringBuilder');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
tpl.ui.feed.Photos.result = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="', soy.$$escapeHtml(opt_data.id), '_result">');
  tpl.ui.feed.Photos.content_(opt_data, output);
  output.append('</div>');
  if (!opt_sb) return output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
tpl.ui.feed.Photos.content_ = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div><div class="', CSS_FEED_HEAD, '"><h3 class="', CSS_FEED_HEAD_TEXT, '">My Albums</h3><div class="', CSS_FEED_COUNT_TEXT, '">', soy.$$escapeHtml(opt_data.data['data'].length), ' albums</div></div><div class="', CSS_PHOTOS_FEED_IMGS, '" >');
  var itemList25 = opt_data.data['data'];
  var itemListLen25 = itemList25.length;
  for (var itemIndex25 = 0; itemIndex25 < itemListLen25; itemIndex25++) {
    var itemData25 = itemList25[itemIndex25];
    tpl.ui.feed.Photos.item_({data: itemData25}, output);
  }
  output.append('</div></div>');
  if (!opt_sb) return output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
tpl.ui.feed.Photos.item_ = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  tpl.ui.feed.Photos.img_({src: opt_data.data['picture'], photoId: opt_data.data['id'], width: opt_data.data['width'], height: opt_data.data['height'], largeSrc: opt_data.data['source']}, output);
  if (!opt_sb) return output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
tpl.ui.feed.Photos.img_ = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<a href="/photo?id=', soy.$$escapeHtml(opt_data.photoId), '"  class="', CSS_PHOTOS_FEED_IMG_LINK, '"  data-src="', soy.$$escapeHtml(opt_data.largeSrc), '" />', (opt_data.width > opt_data.height) ? '<img src="' + soy.$$escapeHtml(opt_data.src) + '" class="' + CSS_PHOTOS_FEED_IMG_W + '" />' : '<img src="' + soy.$$escapeHtml(opt_data.src) + '" class="' + CSS_PHOTOS_FEED_IMG_H + '" />', '</a>');
  if (!opt_sb) return output.toString();
};
