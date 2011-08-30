// This file was automatically generated from notifications.tpl.
// Please don't edit this file by hand.

goog.provide('tpl.ui.feed.Notifications');

goog.require('soy');
goog.require('soy.StringBuilder');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
tpl.ui.feed.Notifications.result = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="', soy.$$escapeHtml(opt_data.id), '_result">');
  tpl.ui.feed.Notifications.listItems_({items: opt_data.data['data']}, output);
  output.append('</div>');
  if (!opt_sb) return output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
tpl.ui.feed.Notifications.listItems_ = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<ul>');
  var itemList11 = opt_data.items;
  var itemListLen11 = itemList11.length;
  for (var itemIndex11 = 0; itemIndex11 < itemListLen11; itemIndex11++) {
    var itemData11 = itemList11[itemIndex11];
    tpl.ui.feed.Notifications.listitem_({item: itemData11}, output);
  }
  output.append('</ul>');
  if (!opt_sb) return output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
tpl.ui.feed.Notifications.listitem_ = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<li class="', CSS_FEED_LIST_ITEM, ' ', CSS_NOTIFICATION_FEED_LIST_ITEM, '"><a href="/message?id=', soy.$$escapeHtml(opt_data.item['id']), '" class="', CSS_NOTIFICATION_FEED_LINK, '"><div class="', CSS_FEED_LIST_ITEM_GRID, '"><div class="', CSS_FEED_LIST_ITEM_ROW, '"><div class="', CSS_FEED_LIST_ITEM_SIDE, '">');
  tpl.ui.feed.Notifications.icon_(opt_data, output);
  output.append('</div><div class="', CSS_FEED_LIST_ITEM_CONTEXT, '"><span class="', CSS_NOTIFICATION_FEED_NAME, '">', soy.$$escapeHtml(opt_data.item['title']), '</span><span class="', CSS_NOTIFICATION_FEED_TIME, '">', soy.$$escapeHtml(opt_data.item['updated_time']), '</span></div></div></div></a></li>');
  if (!opt_sb) return output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
tpl.ui.feed.Notifications.icon_ = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<img class="', CSS_FEED_ITEM_USER_IMG, '" src="//graph.facebook.com/', soy.$$escapeHtml(opt_data.item['from']['id']), '/picture" alt=""/>');
  if (!opt_sb) return output.toString();
};
