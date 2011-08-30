goog.provide('hw.ui.CommandSurface');

goog.require('goog.Uri');
goog.require('goog.dom.NodeType');
goog.require('goog.events.EventType');
goog.require('hw.Logger');
goog.require('hw.ui.BaseComponent');
goog.require('hw.events.EventType');


/**
 * @constructor
 * @extends {hw.ui.BaseComponent}
 */
hw.ui.CommandSurface = function() {
  goog.base(this);
};
goog.inherits(hw.ui.CommandSurface, hw.ui.BaseComponent);

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
    if (this.onCommand != goog.nullFunction) {
      hw.Logger.log('command', cmd, target);
      this.onCommand(cmd.toLowerCase(), /** @type {Event} */ (evt));
    }
  }
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
  if (this.onHref != goog.nullFunction) {
    this.onHref(new goog.Uri(href), /** @type {Event} */ (evt));
  }
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