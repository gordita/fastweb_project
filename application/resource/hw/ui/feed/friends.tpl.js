// This file was automatically generated from friends.tpl.
// Please don't edit this file by hand.

goog.provide('tpl.ui.feed.Friends');

goog.require('soy');
goog.require('soy.StringBuilder');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
tpl.ui.feed.Friends.result = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="', soy.$$escapeHtml(opt_data.id), '_result" class="', CSS_FRIENDS_FEED, '">');
  tpl.ui.feed.Friends.content_(opt_data, output);
  output.append('</div>');
  if (!opt_sb) return output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
tpl.ui.feed.Friends.content_ = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div >');
  var groupList12 = opt_data.groups;
  var groupListLen12 = groupList12.length;
  for (var groupIndex12 = 0; groupIndex12 < groupListLen12; groupIndex12++) {
    var groupData12 = groupList12[groupIndex12];
    output.append('<h4 id="', soy.$$escapeHtml(opt_data.id), '_', soy.$$escapeHtml(groupData12.id), '" class="', CSS_FRIENDS_FEED_GROUP_LABEL, '">', soy.$$escapeHtml(groupData12.label), '</h4>');
    var friendList22 = groupData12;
    var friendListLen22 = friendList22.length;
    for (var friendIndex22 = 0; friendIndex22 < friendListLen22; friendIndex22++) {
      var friendData22 = friendList22[friendIndex22];
      tpl.ui.feed.Friends.item_({userId: friendData22['id'], name: friendData22['name'], picture: friendData22['picture']}, output);
    }
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
tpl.ui.feed.Friends.item_ = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<a href="/profile?id=', soy.$$escapeHtml(opt_data.userId), '"  class="', CSS_FRIENDS_FEED_ITEM, '"><img src="', soy.$$escapeHtml(opt_data.picture), '" class="', CSS_FRIENDS_FEED_ITEM_PICTURE, '" /><span href="/profile?id=', soy.$$escapeHtml(opt_data.userId), '" class="', CSS_FRIENDS_FEED_ITEM_NAME, '">', soy.$$escapeHtml(opt_data.name), '</span></a>');
  if (!opt_sb) return output.toString();
};
