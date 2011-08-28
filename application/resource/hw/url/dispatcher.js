goog.provide('hw.url.Dispatcher');
goog.provide('hw.url.DispatcherEvent');

goog.require('goog.Disposable');
goog.require('goog.Uri');
goog.require('goog.array');
goog.require('goog.events.Event');
goog.require('goog.events.EventHandler');
goog.require('goog.events.EventTarget');
goog.require('hw.events.AppEventTarget');
goog.require('hw.events.EventType');

/**
 * @param {Window=} opt_win
 * @constructor
 * @extends {goog.events.EventTarget}
 */
hw.url.Dispatcher = function(opt_win) {
  goog.base(this);
  this.patterns_ = [];
  this.patternsName_ = {};
  this.resolvedUri_ = null;
  this.window_ = opt_win || window;
};
goog.inherits(hw.url.Dispatcher, goog.events.EventTarget);


/**
 * @type {string}
 * @private
 */
hw.url.Dispatcher.prototype.checkedUrl_ = '';

/**
 * @type {goog.events.EventHandler}
 * @private
 */
hw.url.Dispatcher.prototype.historyHandler_ = null;


/**
 * @type {number}
 * @private
 */
hw.url.Dispatcher.prototype.watchTimer_ = 0;

/**
 * @type {string}
 * @private
 */
hw.url.Dispatcher.prototype.dispatchedName_ = '';


/**
 * @type {goog.Uri}
 * @private
 */
hw.url.Dispatcher.prototype.resolvedUri_ = null;


/**
 * @type {goog.Uri}
 * @private
 */
hw.url.Dispatcher.prototype.dispatchedUri_ = null;


/**
 * @type {Window}
 * @private
 */
hw.url.Dispatcher.prototype.window_ = null;


/**
 * @type {Array.<RegExp>}
 * @private
 */
hw.url.Dispatcher.prototype.patterns_ = null;


/**
 * @type {boolean}
 * @private
 */
hw.url.Dispatcher.prototype.watching_ = false;


/**
 * @type {Object}
 * @private
 */
hw.url.Dispatcher.prototype.patternsName_ = null;


/**
 * @param {boolean=} opt_resolve
 * @return {goog.Uri}
 */
hw.url.Dispatcher.getWindowUri = function(opt_resolve) {
  if (opt_resolve) {
    return hw.url.Dispatcher.resolve(window)
  }
  return new goog.Uri(window.location.href);
};


/**
 * @param {Window|string} source
 * @return {goog.Uri}
 */
hw.url.Dispatcher.resolve = function(source) {
  var urlStr = goog.isString(source) ? source : source.location.href;
  var uri = new goog.Uri(urlStr);
  if (uri.getFragment().indexOf('!/') === 0) {
    var tail = uri.getFragment().substr(1);
    urlStr = uri.getScheme() + '://' +
      uri.getDomain() +
      (uri.getPort() ? ':' + uri.getPort() : '' ) +
      tail;
    return new goog.Uri(urlStr);
  }
  return uri;
};

/** @inheritDoc */
hw.url.Dispatcher.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
  this.patterns_ = null;
  this.patternsName_ = null;
  this.stopWatch();
};

/**
 * @param {string} name
 * @param {RegExp} var_args
 */
hw.url.Dispatcher.prototype.register = function(name, var_args) {
  var patterns = Array.prototype.slice.call(arguments, 1);
  goog.array.forEach(patterns, function(pattern) {
    this.patternsName_[pattern.toString()] = name;
    this.patterns_.push(pattern);
  }, this);
};


/**
 * @return {goog.Uri}
 */
hw.url.Dispatcher.prototype.getDispatchedUri = function() {
  return this.dispatchedUri_;
};


/**
 * @return {string}
 */
hw.url.Dispatcher.prototype.getDispatchedName = function() {
  return this.dispatchedName_;
};


/**
 * Watch
 */
hw.url.Dispatcher.prototype.startWatch = function() {
  if (this.watching_) {
    return;
  }
  this.watching_ = true;

  this.historyHandler_ = new goog.events.EventHandler(this);

  this.historyHandler_.listen(
    hw.events.AppEventTarget.getInstance(),
    hw.events.EventType.URL_UPDATE,
    this.checkUri_);

  this.watchTimer_ = this.window_.setInterval(
    goog.bind(this.checkUri_, this),
    800);

  this.checkUri_();
};


/**
 * stopWatch
 */
hw.url.Dispatcher.prototype.stopWatch = function() {
  if (!this.watching_) {
    return;
  }
  (/** @type {Window} */ (this.window_)).clearInterval(this.watchTimer_);
  this.historyHandler_.dispose();
  this.historyHandler_ = null;
};


/**
 * @private
 */
hw.url.Dispatcher.prototype.checkUri_ = function() {
  var urlStr = this.window_.location.href;
  if (this.checkedUrl_ == urlStr) {
    return;
  }
  this.checkedUrl_ = urlStr;

  var uri = hw.url.Dispatcher.resolve(urlStr);

  if (this.resolvedUri_ && uri.toString() == this.resolvedUri_.toString()) {
    return;
  }
  this.resolvedUri_ = uri;
  var path = uri.getPath();

  goog.array.some(this.patterns_, function(pattern) {
    var matched = path.match(pattern);

    if (matched) {
      this.dispatchedName_ = this.patternsName_[pattern.toString()];

      var dispatchedUri = new goog.Uri(uri);
      var updated = (dispatchedUri.toString() == String(this.dispatchedUri_));
      this.dispatchedUri_ = dispatchedUri;
      var evt = new hw.url.DispatcherEvent(
        hw.events.EventType.URL_DISPATCH,
        this,
        this.dispatchedName_,
        this.dispatchedUri_.clone(),
        updated);
      this.dispatchEvent(evt);
      return true;
    }
  }, this);
};

/**
 *
 * @param {string} type
 * @param {Object} target
 * @param {string} name
 * @param {goog.Uri} uri
 * @param {boolean} updated
 * @constructor
 * @extends {goog.events.Event}
 */
hw.url.DispatcherEvent = function(type, target, name, uri, updated) {
  goog.base(this, type, target);
  /**
   * @type {string}
   */
  this.name = name;
  /**
   * @type {goog.Uri}
   */
  this.uri = uri;
  /**
   * @type {boolean}
   */
  this.updated = updated;
};
goog.inherits(hw.url.DispatcherEvent, goog.events.Event);
