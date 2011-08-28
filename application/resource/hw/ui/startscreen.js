goog.provide('hw.ui.StartScreen');

goog.require('goog.asserts');
goog.require('goog.dom.classes');
goog.require('goog.events.EventType');
goog.require('hw.Logger');
goog.require('hw.async.Fb');
goog.require('hw.events.AppEventTarget');
goog.require('hw.ui.BaseComponent');
goog.require('tpl.CSS_NAMES');
goog.require('tpl.ui.StartScreen');


/**
 * @constructor
 * @extends {hw.ui.BaseComponent}
 */
hw.ui.StartScreen = function() {
  goog.base(this);
};
goog.inherits(hw.ui.StartScreen, hw.ui.BaseComponent);

/** @inheritDoc */
hw.ui.StartScreen.prototype.createTemplate = function(payload) {
  return tpl.ui.StartScreen.element(payload).toString();
};


/**
 * @type {boolean}
 * @private
 */
hw.ui.StartScreen.prototype.loggedIn_ = false;

/**
 * @type {boolean}
 * @private
 */
hw.ui.StartScreen.prototype.opened_ = false;


/**
 * open.
 */
hw.ui.StartScreen.prototype.open = function() {
  goog.asserts.assert(!this.opened_);
  hw.Logger.log('hw.ui.StartScreen#open', this.isInDocument());
  goog.asserts.assert(this.isInDocument());
  this.opened_ = true;
  this.setLoadingVisible_(true);
  this.setLoginButtonVisible_(false);
  hw.async.Fb.checkPermissions().
    addCallback(this.onLogin_, this).
    addErrback(this.displayLogin_, this);
};

/**
 * close.
 */
hw.ui.StartScreen.prototype.close = function() {
  goog.asserts.assert(this.opened_);
  var el = this.getElement();
  if (el) {
    this.setLoadingVisible_(false);
    this.setLoginButtonVisible_(false);
    var elStyle = el.style;
    goog.dom.classes.add(el, tpl.CSS_NAMES.CSS_START_SCREEN_CLOSE_ANIMATION);
    elStyle.webkitTransform = 'scale(1)';
    elStyle.webkitTransition = '-webkit-transform 300ms ease-out';

    this.later(function() {
      elStyle.webkitTransform = 'scale(0.01)';
    }, 1);

    this.getHandler().listenOnce(
      el,
      'webkitTransitionEnd',
      this.destroy);

    this.later(this.destroy, 2000);
  }
};


/**
 * @param {boolean} visible
 */
hw.ui.StartScreen.prototype.setLoadingVisible_ = function(visible) {
  this.getInnerElement('loading').style.visibility = visible ? '' : 'hidden';
};

/**
 * @param {boolean} visible
 */
hw.ui.StartScreen.prototype.setLoginButtonVisible_ = function(visible) {
  this.getInnerElement('login').style.visibility = visible ?
    'visible' :
    'hidden';
};


/**
 * @private
 */
hw.ui.StartScreen.prototype.displayLogin_ = function() {
  if (this.isDisposed()) {
    return;
  }
  this.setLoadingVisible_(false);
  var btn = this.getInnerElement('login');
  this.setLoginButtonVisible_(true);

  this.getHandler().listen(
    btn,
    goog.events.EventType.CLICK,
    function(evt) {
      this.setLoadingVisible_(true);
      this.setLoginButtonVisible_(false);
      this.dispose();
      hw.async.Fb.redirectToLogin();
    });
};

/**
 * @private
 */
hw.ui.StartScreen.prototype.onLogin_ = function() {
  if (this.isDisposed() || this.loggedIn_) {
    return;
  }
  this.loggedIn_ = true;
  this.setLoadingVisible_(false);
  this.setLoginButtonVisible_(false);
  hw.events.AppEventTarget.login(this);
};
