goog.provide('hw.ui.StatusBar');

goog.require('goog.array');
goog.require('goog.dispose');
goog.require('goog.string');
goog.require('goog.events.EventType');
goog.require('goog.dom');
goog.require('goog.ui.Component');
goog.require('goog.ui.ScrollFloater');
goog.require('soy');


/**
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @extends {goog.ui.Component}
 * @constructor
 */
hw.ui.StatusBar = function(opt_domHelper) {
  goog.base(this, opt_domHelper);

  /**
   * @type {Array.<string>}
   * @private
   */
  this.msgs_ = [];

  /**
   * @type {number}
   * @private
   */
  this.showTimer_ = 0;

  /**
   * @type {Element}
   * @private
   */
  this.textEl_ = null;
};
goog.inherits(hw.ui.StatusBar, goog.ui.Component);


/**
 * @type {hw.ui.StatusBar}
 * @private
 */
hw.ui.StatusBar.instance_ = null;


/**
 * @return {hw.ui.StatusBar}
 * @private
 */
hw.ui.StatusBar.getGlobalInstance_ = function() {
  if (!hw.ui.StatusBar.instance_) {
    hw.ui.StatusBar.instance_ = new hw.ui.StatusBar();
  }
  hw.ui.StatusBar.instance_.tryRenderGlobalInstance_();
  return hw.ui.StatusBar.instance_;
};


/**
 * @param {string|undefined} msg
 */
hw.ui.StatusBar.addMessage = function(msg) {
  hw.ui.StatusBar.getGlobalInstance_().addMessage(msg);
};


/**
 * @param {string|undefined} msg
 */
hw.ui.StatusBar.removeMessage = function(msg) {
  hw.ui.StatusBar.getGlobalInstance_().removeMessage(msg);
};


/**
 * @param {string|undefined} msg
 * @param {*=} opt_remove
 */
hw.ui.StatusBar.updateMessage = function(msg, opt_remove) {
  hw.ui.StatusBar.getGlobalInstance_().updateMessage(msg, opt_remove);
};


/**
 * @inheritDoc
 */
hw.ui.StatusBar.prototype.createDom = function() {
  goog.base(this, 'createDom');
  this.textEl_ = goog.dom.createDom('span', 'status-bar-text');
  this.getElement().appendChild(this.textEl_);
};


/**
 * @param {string|undefined} msg
 * @param {*=} opt_remove
 */
hw.ui.StatusBar.prototype.updateMessage = function(msg, opt_remove) {
  if (opt_remove) {
    this.removeMessage(msg);
  } else {
    this.addMessage(msg);
  }
};


/**
 * @param {string|undefined} msg
 */
hw.ui.StatusBar.prototype.addMessage = function(msg) {
  this.msgs_.push(msg);
  this.showMsg_(msg);
};


/**
 * @param {string|undefined} msg
 */
hw.ui.StatusBar.prototype.removeMessage = function(msg) {
  var idx = goog.array.lastIndexOf(this.msgs_, msg);
  if (idx < 0) {
    return;
  }
  goog.array.removeAt(this.msgs_, idx);
  if (this.msgs_.length == 0) {
    this.showMsg_('');
    return;
  }
  var nextMsg = goog.array.peek(this.msgs_);
  if (nextMsg) {
    this.showMsg_(nextMsg);
  }
};


/**
 * @param {*} msg
 * @private
 */
hw.ui.StatusBar.prototype.showMsg_ = function(msg) {
  if (this.textEl_) {
    if (goog.string.isEmpty(/** @type {string} */ (msg))) {
      // window.clearTimeout(this.showTimer_);
      var hide = goog.bind(function() {
        this.textEl_.innerHTML = '';
        this.textEl_.style.visibility = 'hidden';
        this.showTimer_ = 0;
      }, this);
      this.showTimer_ = window.setTimeout(hide, 500);
      return;
    }
    if (this.showTimer_) {
      window.clearTimeout(this.showTimer_);
    }
    var show = goog.bind(function() {
      this.showTimer_ = 0;
      this.textEl_.style.visibility = '';
      goog.dom.setTextContent(this.textEl_, /** @type {string} */ (msg));
    }, this);


    this.showTimer_ = window.setTimeout(show, 100);
  }
};


/**
 * @private
 */
hw.ui.StatusBar.prototype.tryRenderGlobalInstance_ = function() {
  if (this.isInDocument() || !goog.dom.getElement('status-bar')) {
    return;
  }
  var barEl = goog.dom.getElement('status-bar');
  if (!barEl) {
    return;
  }
  this.render(barEl);
};