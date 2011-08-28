goog.provide('hw.ui.feed.Groups');

goog.require('hw.ui.feed.Base');
goog.require('hw.async.Fb');
goog.require('tpl.ui.feed.Groups');


/**
 * @param {string} userId
 * @constructor
 * @extends {hw.ui.feed.Base}
 */
hw.ui.feed.Groups = function(userId) {
  goog.base(this, userId);
};
goog.inherits(hw.ui.feed.Groups, hw.ui.feed.Base);

/**
 * @type {Array.<Object>}
 * @private
 */
hw.ui.feed.Groups.prototype.friends_ = null;


/** @inheritDoc */
hw.ui.feed.Groups.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};

/** @inheritDoc */
hw.ui.feed.Groups.prototype.createFeedTemplate = function(payload) {
  var data = payload.data['data'];
  if (!goog.isArray(data) || !data.length) {
    return this.createFeedEmptyTemplate(payload);
  }
  // TODO(hedger): Sort groups by bookmark_order.
  return tpl.ui.feed.Groups.result(payload).toString();
};


/** @inheritDoc */
hw.ui.feed.Groups.prototype.getFeed = function() {
  return hw.async.Fb.getGroupsFeed(this.getUserId());
};