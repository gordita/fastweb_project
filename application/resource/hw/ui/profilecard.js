goog.provide('hw.ui.ProfileCard');

goog.require('hw.ui.feed.Base');
goog.require('hw.async.Fb');
goog.require('tpl.CSS_NAMES');
goog.require('tpl.ui.ProfileCard');


/**
 * @param {string} userId
 * @constructor
 * @extends {hw.ui.feed.Base}
 */
hw.ui.ProfileCard = function(userId) {
  goog.base(this, userId);
};
goog.inherits(hw.ui.ProfileCard, hw.ui.feed.Base);

/** @inheritDoc */
hw.ui.ProfileCard.prototype.getFeed = function() {
  return hw.async.Fb.getUser(this.getUserId());
};


/** @inheritDoc */
hw.ui.ProfileCard.prototype.createFeedTemplate = function(payload) {
  return tpl.ui.ProfileCard.content(payload).toString();
};


/** @inheritDoc */
hw.ui.ProfileCard.prototype.createFeedErrorTemplate = function() {
  return '';
};


/** @inheritDoc */
hw.ui.ProfileCard.prototype.createTemplate = function(payload) {
  return tpl.ui.ProfileCard.element(payload).toString();
};