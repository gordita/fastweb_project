goog.provide('hw.ui.feed.Friends');

goog.require('goog.array');
goog.require('goog.dom');
goog.require('hw.ui.feed.Base');
goog.require('hw.async.Fb');
goog.require('hw.ui.scroll.Scrubber.Container');
goog.require('hw.ui.scroll.Scrubber.Target');
goog.require('tpl.ui.feed.Friends');


/**
 * @param {string} userId
 * @constructor
 * @implements {hw.ui.scroll.Scrubber.Target}
 * @extends {hw.ui.feed.Base}
 */
hw.ui.feed.Friends = function(userId) {
  goog.base(this, userId);
  this.freinds_ = [];
};
goog.inherits(hw.ui.feed.Friends, hw.ui.feed.Base);


/**
 * @type {Array.<Object>}
 * @private
 */
hw.ui.feed.Friends.prototype.friends_ = null;

/**
 * @type {Array.<Array>}
 * @private
 */
hw.ui.feed.Friends.prototype.groups_ = null;


/**
 * @param {number} y
 * @return {number}
 */
hw.ui.feed.Friends.prototype.calculateScrubberValue = function(y) {
  if (!this.groups_ || y < 0) {
    return 0;
  }

  var value = 0;
  goog.array.some(this.groups_, function(group, index) {
    if (group.y < 0) {
      group.y = this.getInnerElement(group.id).offsetTop;
    }
    if (group.y > y) {
      value = index == 0 ? value : index / (this.groups_.length - 1);
      return true;
    }
  }, this);
  return value;
};


/**
 * Impl.
 * @inheritDoc
 */
hw.ui.feed.Friends.prototype.onScrubberValueChange = function(value, label) {
  if (!this.groups_) {
    return 0;
  }
  var index = Math.round(value * (this.groups_.length - 1));
  var group = this.groups_[index];
  if (group.y < 0) {
    group.y = this.getInnerElement(group.id).offsetTop;
  }
  goog.dom.setTextContent(label, group.label);
  return group.y;
};


/** @inheritDoc */
hw.ui.feed.Friends.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
  this.freinds_ = null;
};

/** @inheritDoc */
hw.ui.feed.Friends.prototype.createFeedTemplate = function(payload) {
  var data = payload.data['data'];
  if (!goog.isArray(data) || !data.length) {
    return this.createFeedEmptyTemplate(payload);
  }
  this.processFriendsData_(data);
  payload.friends = this.freinds_;
  payload.groups = this.groups_;
  return tpl.ui.feed.Friends.result(payload).toString();
};


/**
 *
 * @param {Array.<Object>} friends
 */
hw.ui.feed.Friends.prototype.processFriendsData_ = function(friends) {
  if (!goog.isArray(friends)) {
    return;
  }
  this.freinds_ = friends;
  friends.sort(function(a, b) {
    return a['name'] >= b['name'] ? 1 : -1;
  });

  var groups = [];
  var groupsIndex = {};
  goog.array.forEach(friends, function(friend) {
    var firstLetter = friend['name'].toString().charAt(0);
    var group = groupsIndex[firstLetter];
    if (!group) {
      group = groupsIndex[firstLetter] = [];
      group.y = -1;
      group.label = firstLetter;
      group.id = this.generateId(),
        groups.push(group);
    }
    group.push(friend);
  }, this);
  this.groups_ = groups;
};


/** @inheritDoc */
hw.ui.feed.Friends.prototype.getFeed = function() {
  return hw.async.Fb.getFriends(this.getUserId());
};