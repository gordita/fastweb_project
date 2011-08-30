goog.provide('hw.ui.feed.Places');

goog.require('hw.ui.feed.Base');
goog.require('hw.async.Fb');
goog.require('tpl.ui.feed.Places');


/**
 * @param {string} userId
 * @constructor
 * @extends {hw.ui.feed.Base}
 */
hw.ui.feed.Places = function(userId) {
  goog.base(this, userId);
};
goog.inherits(hw.ui.feed.Places, hw.ui.feed.Base);


/** @inheritDoc */
hw.ui.feed.Places.prototype.createFeedTemplate = function(payload) {
  var data = payload.data['data'];
  if (!goog.isArray(data) || !data.length) {
    return this.createFeedEmptyTemplate(payload);
  }
  return tpl.ui.feed.Places.result(payload).toString();
};


/** @inheritDoc */
hw.ui.feed.Places.prototype.getFeed = function() {
  return hw.async.Fb.getPlacesFeed(this.getUserId());
};