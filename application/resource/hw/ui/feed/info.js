goog.provide('hw.ui.feed.Info');

goog.require('hw.ui.feed.Base');
goog.require('hw.async.Fb');
goog.require('tpl.ui.feed.Info');


/**
 * @param {string} userId
 * @constructor
 * @extends {hw.ui.feed.Base}
 */
hw.ui.feed.Info = function(userId) {
  goog.base(this, userId);
};
goog.inherits(hw.ui.feed.Info, hw.ui.feed.Base);


/** @inheritDoc */
hw.ui.feed.Info.prototype.createFeedTemplate = function(payload) {
  return tpl.ui.feed.Info.result(payload).toString();
};


/** @inheritDoc */
hw.ui.feed.Info.prototype.getFeed = function() {
  return  hw.async.Fb.getInfoFeed(this.getUserId());
};