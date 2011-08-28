goog.provide('hw.ui.feed.Albums');

goog.require('hw.ui.feed.Base');
goog.require('hw.async.Fb');
goog.require('tpl.ui.feed.Albums');


/**
 * @param {string} userId
 * @constructor
 * @extends {hw.ui.feed.Base}
 */
hw.ui.feed.Albums = function(userId) {
  goog.base(this, userId);
};
goog.inherits(hw.ui.feed.Albums, hw.ui.feed.Base);


/** @inheritDoc */
hw.ui.feed.Albums.prototype.createFeedTemplate = function(payload) {
  var data = payload.data;
  if (!goog.isArray(data['data']) || !data['data'].length) {
    return this.createFeedEmptyTemplate(payload);
  }
  return tpl.ui.feed.Albums.result(payload).toString();
};

/** @inheritDoc */
hw.ui.feed.Albums.prototype.getFeed = function() {
  return hw.async.Fb.getAlbumsFeed(this.getUserId());
};