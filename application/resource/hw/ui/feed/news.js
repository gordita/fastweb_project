goog.provide('hw.ui.feed.News');

goog.require('hw.ui.feed.Base');
goog.require('hw.async.Fb');

/**
 * @param {string} userId
 * @constructor
 * @extends {hw.ui.feed.Base}
 */
hw.ui.feed.News = function(userId) {
  goog.base(this, userId);
};
goog.inherits(hw.ui.feed.News, hw.ui.feed.Base);


/**
 * @inheritDoc
 */
hw.ui.feed.News.prototype.createFeedTemplate = function(payload) {
  var data = payload.data;
  if (!goog.isArray(data['data']) || !data['data'].length) {
    return this.createFeedEmptyTemplate(payload);
  }
  return goog.base(this, 'createFeedTemplate', payload);
};


/** @inheritDoc */
hw.ui.feed.News.prototype.getFeed = function() {
  return hw.async.Fb.getNewsFeed();
};