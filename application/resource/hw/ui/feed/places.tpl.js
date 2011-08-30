// This file was automatically generated from places.tpl.
// Please don't edit this file by hand.

goog.provide('tpl.ui.feed.Places');

goog.require('soy');
goog.require('soy.StringBuilder');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
tpl.ui.feed.Places.result = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="', soy.$$escapeHtml(opt_data.id), '_result">');
  tpl.ui.feed.Places.content_(opt_data, output);
  output.append('</div>');
  if (!opt_sb) return output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
tpl.ui.feed.Places.content_ = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div>');
  var itemList10 = opt_data.data['data'];
  var itemListLen10 = itemList10.length;
  for (var itemIndex10 = 0; itemIndex10 < itemListLen10; itemIndex10++) {
    var itemData10 = itemList10[itemIndex10];
    tpl.ui.feed.Places.item_({from: itemData10['from'], place: itemData10['place'], time: itemData10['created_time']}, output);
  }
  output.append('</div>');
  if (!opt_sb) return output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
tpl.ui.feed.Places.item_ = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<a href="/profile?id=', soy.$$escapeHtml(opt_data.place['id']), '"  class="', CSS_PLACES_FEED_ITEM, '"><img src="https://graph.facebook.com/', soy.$$escapeHtml(opt_data.place['id']), '/picture" class="', CSS_PLACES_FEED_ITEM_IMG, '" /><div class="', CSS_PLACES_FEED_ITEM_CONTEXT, '"><div class="', CSS_PLACES_FEED_ITEM_NAME, '">', soy.$$escapeHtml(opt_data.from['name']), '</div><div class="', CSS_PLACES_FEED_ITEM_PLACE, '">', soy.$$escapeHtml(opt_data.place['name']), '</div><div class="', CSS_PLACES_FEED_ITEM_TIME, '">', soy.$$escapeHtml(opt_data.time), '</div></div></a>');
  if (!opt_sb) return output.toString();
};
