goog.provide('hw.ui.feed.Notifications');

goog.require('hw.ui.feed.Base');
goog.require('hw.async.Fb');
goog.require('tpl.CSS_NAMES');
goog.require('tpl.ui.feed.Notifications');


/**
 * @param {string} userId
 * @constructor
 * @extends {hw.ui.feed.Base}
 */
hw.ui.feed.Notifications = function(userId) {
  goog.base(this, userId);
};
goog.inherits(hw.ui.feed.Notifications, hw.ui.feed.Base);


/** @inheritDoc */
hw.ui.feed.Notifications.prototype.createFeedTemplate = function(payload) {
  var data = payload.data;
  if (!goog.isArray(data['data']) || !data['data'].length) {
    return this.createFeedEmptyTemplate(payload);
  }
  return tpl.ui.feed.Notifications.result(payload).toString();
};


/** @inheritDoc */
hw.ui.feed.Notifications.prototype.getFeed = function() {
  return hw.async.Fb.getNotificationsFeed(this.getUserId());
};