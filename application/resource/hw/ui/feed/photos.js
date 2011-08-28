goog.provide('hw.ui.feed.Photos');

goog.require('hw.ui.feed.Base');
goog.require('hw.async.Fb');
goog.require('tpl.ui.feed.Photos');


/**
 * @param {string} userId
 * @param {string} albumId
 * @constructor
 * @extends {hw.ui.feed.Base}
 */
hw.ui.feed.Photos = function(userId, albumId) {
  goog.base(this, userId);
  this.albumId_ = albumId;
};
goog.inherits(hw.ui.feed.Photos, hw.ui.feed.Base);

/**
 * @type {string}
 * @private
 */
hw.ui.feed.Photos.prototype.albumId_ = '';


/** @inheritDoc */
hw.ui.feed.Photos.prototype.createFeedTemplate = function(payload) {
  var data = payload.data['data'];
  if (!goog.isArray(data) || !data.length) {
    return this.createFeedEmptyTemplate(payload);
  }
  return tpl.ui.feed.Photos.result(payload).toString();
};

/**
 * @inheritDoc
 */
hw.ui.feed.Photos.prototype.getFeed = function() {
  return hw.async.Fb.getPhotosFeed(this.albumId_);
};
