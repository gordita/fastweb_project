goog.provide('hw.dom.ClickInjector');

goog.require('goog.Disposable');
goog.require('goog.Uri');
goog.require('goog.dom.NodeType');
goog.require('goog.dom.classes');
goog.require('goog.events.EventType');
goog.require('goog.math.Rect');
goog.require('goog.math.Coordinate');
goog.require('hw.Logger');
goog.require('hw.ui.BaseComponent');
goog.require('hw.events.EventType');
goog.require('hw.events.TouchEvent');
goog.require('hw.url.Navigator');
goog.require('tpl.CSS_NAMES');


/**
 * @param {Window} win
 * @extends {goog.Disposable}
 * @constructor
 */
hw.dom.ClickInjector = function(win) {
  goog.base(this);

  this.window_ = win;
  this.doc_ = win.document;

  this.handler_ = new goog.events.EventHandler(this);

  this.handler_.listen(
    this.doc_,
    hw.events.EventType.TOUCHSTART,
    this.onTouchStart_);

  this.handler_.listen(
    this.doc_,
    goog.events.EventType.CLICK,
    this.onClick_);
};
goog.inherits(hw.dom.ClickInjector, goog.Disposable);


/**
 * @type {Element}
 */
hw.dom.ClickInjector.prototype.focusEl_ = null;


/**
 * @type {Window}
 * @private
 */
hw.dom.ClickInjector.prototype.window_ = null;

/**
 * @type {Document}
 * @private
 */
hw.dom.ClickInjector.prototype.doc_ = null;


/**
 * @type {goog.events.EventHandler}
 * @private
 */
hw.dom.ClickInjector.prototype.handler_ = null;


/**
 * @type {goog.math.Rect}
 * @private
 */
hw.dom.ClickInjector.prototype.touchedRect_ = null;


/**
 * @type {number}
 * @private
 */
hw.dom.ClickInjector.prototype.touchedRectPadding_ = 5;


/**
 * @inheritDoc
 */
hw.dom.ClickInjector.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
  this.hideFocus_();
  this.handler_.dispose();
  this.handler_ = null;
  this.doc_ = null;
  this.window_ = null;
};


/**
 * @private
 */
hw.dom.ClickInjector.prototype.hideFocus_ = function() {
  if (this.focusEl_) {
    goog.dom.classes.remove(
      this.focusEl_,
      tpl.CSS_NAMES.CSS_LINK_FOCUS);
    this.focusEl_ = null;
  }
};


/**
 * @param {goog.events.BrowserEvent} evt
 * @private
 */
hw.dom.ClickInjector.prototype.onTouchStart_ = function(evt) {
  this.hideFocus_();

  this.touchedRect_ = null;

  var target = evt.target;
  switch (target.nodeType) {
    case goog.dom.NodeType.TEXT:
      target = target.parentNode;
      break;

    case goog.dom.NodeType.ELEMENT:
      break;

    default:
      return;
  }

  var touch = hw.events.TouchEvent.getTouch(evt);
  var x = touch.clientX;
  var y = touch.clientY;
  var padding = this.touchedRectPadding_;
  this.touchedRect_ = new goog.math.Rect(
    x - padding,
    y - padding,
    x + padding,
    y + padding);
};

/**
 * @param {goog.events.BrowserEvent} evt
 * @private
 */
hw.dom.ClickInjector.prototype.onClick_ = function(evt) {
  if (evt.getBrowserEvent()['defaultPrevented']) {
    hw.Logger.log('hw.dom.ClickInjector#onClick_:skip', evt.getBrowserEvent());
    return;
  }

  var target = /** @type {Element} */ (evt.target);
  var n = 0;
  var href = target.href;
  while (n < 6 && target && !href) {
    href = target.href;
    target = /** @type {Element} */ (target.parentNode);
    n++;
  }
  hw.Logger.log('hw.dom.ClickInjector#onClick_', href);
  if (!href) {
    return;
  }
  evt.preventDefault();

  if (this.touchedRect_) {
    var touch = hw.events.TouchEvent.getTouch(evt);
    var x = touch.clientX;
    var y = touch.clientY;
    var point = new goog.math.Coordinate(x, y);
    if (!this.touchedRect_.contains(point)) {
      hw.Logger.log('hw.dom.ClickInjector#onClick_:miss',
        this.touchedRect_,
        point);
      return;
    }
  }
  this.focusEl_ = target;
  goog.dom.classes.add(target, tpl.CSS_NAMES.CSS_LINK_FOCUS);
  hw.url.Navigator.go(href, this.window_, true);

};