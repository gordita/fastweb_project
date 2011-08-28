// This file was automatically generated from groups.tpl.
// Please don't edit this file by hand.

goog.provide('tpl.ui.feed.Groups');

goog.require('soy');
goog.require('soy.StringBuilder');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
tpl.ui.feed.Groups.result = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="', soy.$$escapeHtml(opt_data.id), '_result" class="', CSS_GROUPS_FEED, '">');
  tpl.ui.feed.Groups.content_(opt_data, output);
  output.append('</div>');
  if (!opt_sb) return output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
tpl.ui.feed.Groups.content_ = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div>');
  var itemList12 = opt_data.data['data'];
  var itemListLen12 = itemList12.length;
  for (var itemIndex12 = 0; itemIndex12 < itemListLen12; itemIndex12++) {
    var itemData12 = itemList12[itemIndex12];
    tpl.ui.feed.Groups.item_({groupId: itemData12['id'], name: itemData12['name'], unreadCount: itemData12['unread'], accessToken: opt_data.data['access_token']}, output);
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
tpl.ui.feed.Groups.item_ = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<a href="/profile?id=', soy.$$escapeHtml(opt_data.groupId), '"  class="', CSS_GROUPS_FEED_ITEM, '"><img src="https://graph.facebook.com/', soy.$$escapeHtml(opt_data.groupId), '/picture?access_token=', soy.$$escapeHtml(opt_data.accessToken), '" class="', CSS_GROUPS_FEED_ITEM_IMG, '" /><span class="', CSS_GROUPS_FEED_ITEM_NAME, '">', soy.$$escapeHtml(opt_data.name), '</span>', (opt_data.unreadCount > 0) ? '<span class="' + CSS_GROUPS_FEED_ITEM_UNREAD_COUNT + '">' + soy.$$escapeHtml(opt_data.unreadCount) + '</span>' : '', '<span class="', CSS_GROUPS_FEED_ITEM_CHEVRON, '">&#0155;</span></a>');
  if (!opt_sb) return output.toString();
};
