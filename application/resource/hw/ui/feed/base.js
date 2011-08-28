goog.provide('hw.ui.feed.Base');

goog.require('goog.events.Event');
goog.require('goog.dom');
goog.require('goog.events.EventType');
goog.require('goog.events.EventHandler');
goog.require('hw.Logger');
goog.require('hw.async.Fb');
goog.require('hw.events.AppEventTarget');
goog.require('hw.events.EventType');
goog.require('hw.ui.CommandSurface');
goog.require('hw.ui.SearchBox');
goog.require('tpl.CSS_NAMES');
goog.require('tpl.ui.feed.Base');

/**
 * @param {string} userId
 * @constructor
 * @extends {hw.ui.CommandSurface}
 */
hw.ui.feed.Base = function(userId) {
  goog.base(this);
  this.userId_ = userId;
};
goog.inherits(hw.ui.feed.Base, hw.ui.CommandSurface);


/**
 * @type {boolean}
 * @private
 */
hw.ui.feed.Base.prototype.feedError_ = false;


/**
 * @type {Object}
 * @private
 */
hw.ui.feed.Base.prototype.feedData_ = null;


/**
 * @type {string}
 * @private
 */
hw.ui.feed.Base.prototype.userId_ = '';


/**
 * @return {string}
 */
hw.ui.feed.Base.prototype.getUserId = function() {
  return this.userId_;
};


/**
 * @return {goog.async.Deferred}
 */
hw.ui.feed.Base.prototype.getFeed = COMPILED ?
  goog.abstractMethod :
  function() {
    throw new Error('Not implemented');
  };

/**
 * @param {Object} payload
 * @return {string}
 */
hw.ui.feed.Base.prototype.createFeedTemplate = function(payload) {
  return tpl.ui.feed.Base.result(payload).toString();
};


/**
 * @return {string}
 */
hw.ui.feed.Base.prototype.createFeedErrorTemplate = function(payload) {
  hw.Logger.log('createFeedErrorTemplate', payload);
  return tpl.ui.feed.Base.error(payload).toString();
};


/**
 * @return {string}
 */
hw.ui.feed.Base.prototype.createFeedEmptyTemplate = function(payload) {
  hw.Logger.log('createFeedEmptyTemplate', payload);
  return tpl.ui.feed.Base.empty(payload).toString();
};


/** @inheritDoc */
hw.ui.feed.Base.prototype.createTemplate = function(payload) {
  return tpl.ui.feed.Base.element(payload).toString();
};


/** @inheritDoc */
hw.ui.feed.Base.prototype.captureElement = function() {
  goog.base(this, 'captureElement');
  this.refresh_();
};


/** @inheritDoc */
hw.ui.feed.Base.prototype.onCommand = function(cmd, evt) {
  switch (cmd) {
    case 'like_or_comment':
      this.onLikeOrComment_(evt);
      break;
    default:
      return false;
  }
  evt.preventDefault();
  return true;
};


/**
 * @param {Event} evt
 * @private
 */
hw.ui.feed.Base.prototype.onLikeOrComment_ = function(evt) {
  var cssName = tpl.CSS_NAMES.CSS_FEED_LIST_ITEM_LIKE_OR_RESPOND_POPUP;
  var target = /** @type {Element} */ (evt.target);
  var panel = goog.dom.getElementByClass(cssName, target);
  panel.style.display = 'block';

  var handler = new goog.events.EventHandler();
  var touchTarget = evt.target;
  var handleClick = function(clickEvt) {
    if (clickEvt.target == touchTarget ||
      goog.dom.contains(panel, clickEvt.target)) {
      return;
    }
    panel.style.display = '';
    handler.dispose();
    handler = panel = null;
  };

  handler.listen(
    this.getDom().getDocument(),
    hw.events.EventType.TOUCHSTART,
    handleClick,
    true, this);

  handler.listen(
    this.getDom().getDocument(),
    goog.events.EventType.CLICK,
    handleClick,
    true, this);

};


/**
 * @private
 */
hw.ui.feed.Base.prototype.load_ = function() {
  var def = this.getFeed();
  def.addCallback(this.onLoad_, this);
  def.addErrback(this.onError_, this);
};

/**
 * @private
 */
hw.ui.feed.Base.prototype.refresh_ = function() {
  if (!this.feedData_) {
    this.load_();
    return;
  }

  var error = goog.getObjectByName('error.message', this.feedData_);
  var type = goog.getObjectByName('error.type', this.feedData_);
  var payload = {
    data : this.feedData_,
    type: type ? String(type) : '',
    error: error ? String(error) : '',
    id : this.getId()
  };


  var html;

  if (!this.feedError_) {
    try {
      html = this.createFeedTemplate(payload);
    } catch(oops) {
      payload.error = oops.message;
      if (Error.captureStackTrace) {
        Error.call(oops, oops.message);
        Error.captureStackTrace(oops, arguments.callee);
      }
      html = this.createFeedErrorTemplate(payload);
    }
  } else {
    html = this.createFeedErrorTemplate(payload);
  }

  // html = html.replace(/<img[^>]+>/ig, '[IMG]');
  // html = html.replace(/class=/ig, 'noclass=');

  this.getContentElement().innerHTML = html;
  // this.hideDeferElementsAndShowLater();
  hw.events.AppEventTarget.updateLayout(this);
};


/**
 * @param {Object} data
 * @private
 */
hw.ui.feed.Base.prototype.onLoad_ = function(data) {
  this.feedData_ = data;
  this.feedError_ = false;
  this.refresh_();
};


/**
 * @param {Object} data
 * @private
 */
hw.ui.feed.Base.prototype.onError_ = function(data) {
  this.feedData_ = data;
  this.feedError_ = true;
  this.refresh_();
};