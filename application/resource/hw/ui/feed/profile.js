goog.provide('hw.ui.feed.Profile');

goog.require('goog.array');
goog.require('hw.ui.feed.Base');
goog.require('hw.async.Fb');

/**
 * @param {string} userId
 * @constructor
 * @extends {hw.ui.feed.Base}
 */
hw.ui.feed.Profile = function(userId) {
  goog.base(this, userId);
};
goog.inherits(hw.ui.feed.Profile, hw.ui.feed.Base);


/**
 * @inheritDoc
 */
hw.ui.feed.Profile.prototype.createFeedTemplate = function(payload) {
  var data = payload.data;
  if (!goog.isArray(data['data']) || !data['data'].length) {
    return this.createFeedEmptyTemplate(payload);
  }
  return goog.base(this, 'createFeedTemplate', payload);
};


/** @inheritDoc */
hw.ui.feed.Profile.prototype.getFeed = function() {
  return hw.async.Fb.getProfileFeed(this.getUserId());
};