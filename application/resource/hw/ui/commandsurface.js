goog.provide('hw.ui.CommandSurface');

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
 * @constructor
 * @extends {hw.ui.BaseComponent}
 */
hw.ui.CommandSurface = function() {
  goog.base(this);
};
goog.inherits(hw.ui.CommandSurface, hw.ui.BaseComponent);


/**
 * @type {Element}
 * @private
 */
hw.ui.CommandSurface.focusEl_ = null;

/**
 * @type {goog.math.Rect}
 * @private
 */
hw.ui.CommandSurface.prototype.touchedRect_ = null;

/**
 * @type {number}
 * @private
 */
hw.ui.CommandSurface.prototype.touchedRectPadding_ = 5;

/** @inheritDoc */
hw.ui.CommandSurface.prototype.captureElement = function() {
  goog.base(this, 'captureElement');

  this.getHandler().listen(
    this.getElement(),
    hw.events.EventType.TOUCHSTART,
    this.onSurfaceTouch_);

  this.getHandler().listen(
    this.getElement(),
    goog.events.EventType.CLICK,
    this.onSurfaceClick_);
};


/**
 * @param {goog.events.BrowserEvent} evt
 * @private
 */
hw.ui.CommandSurface.prototype.onSurfaceTouch_ = function(evt) {
  if (hw.ui.CommandSurface.focusEl_) {
    goog.dom.classes.remove(
      hw.ui.CommandSurface.focusEl_,
      tpl.CSS_NAMES.CSS_LINK_FOCUS);
    hw.ui.CommandSurface.focusEl_ = null;
  }

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
  var cmd = target.getAttribute('cmd');
  if (cmd) {
    hw.Logger.log('command', cmd, target);
    this.onCommand(cmd.toLowerCase(), /** @type {Event} */ (evt));
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
hw.ui.CommandSurface.prototype.onSurfaceClick_ = function(evt) {
  var target = /** @type {Element} */ (evt.target);
  var n = 0;
  var href = target.href;
  while (n < 3 && target && !href) {
    href = target.href;
    target = /** @type {Element} */ (target.parentNode);
    n++;
  }
  hw.Logger.log('hw.ui.CommandSurface#onSurfaceClick_', href);
  if (!href) {
    return;
  }
  if (this.onHref(href, /** @type {Event} */ (evt))) {
    return;
  }
  evt.preventDefault();


  if (this.touchedRect_) {
    var touch = hw.events.TouchEvent.getTouch(evt);
    var x = touch.clientX;
    var y = touch.clientY;
    var point = new goog.math.Coordinate(x, y);
    if (!this.touchedRect_.contains(point)) {
      return;
    }
  }

  hw.ui.CommandSurface.focusEl_ = target;
  goog.dom.classes.add(target, tpl.CSS_NAMES.CSS_LINK_FOCUS);
  hw.url.Navigator.go(href, this.getDom().getWindow(), true);
};

/**
 * @param {string} command
 * @param {Event} evt
 * @return {boolean}
 */
hw.ui.CommandSurface.prototype.onCommand = goog.nullFunction;


/**
 * @param {goog.Uri} href
 * @param {Event} evt
 * @return {boolean}
 */
hw.ui.CommandSurface.prototype.onHref = goog.nullFunction;