goog.provide('hw.events.TouchEvent');

goog.require('goog.events.Event');
goog.require('goog.math.Size');


/**
 *
 * @param {Event=} opt_e Browser event object.
 * @param {Node=} opt_currentTarget Current target for event.
 * @constructor
 * @extends {goog.events.BrowserEvent}
 */
hw.events.TouchEvent = function(opt_e, opt_currentTarget) {
  goog.base(this, opt_e, opt_currentTarget);
  this.initTouches_();
};
goog.inherits(hw.events.TouchEvent, goog.events.BrowserEvent);


/**
 * @type {Array.<Event>}
 * @private
 */
hw.events.TouchEvent.prototype.touches_ = null;

/**
 * @private
 */
hw.events.TouchEvent.hasTouch_ = 'ontouchstart' in window;

/**
 * @param {goog.events.BrowserEvent} evt
 * @return {Event}
 */
hw.events.TouchEvent.getTouch = function(evt) {
  var touches = hw.events.TouchEvent.getTouches(evt);
  // TODO(hedgre): Maybe return the last one?
  return touches[0];
};


/**
 * @param {goog.events.BrowserEvent} evt
 * @return {Array.<Event>}
 */
hw.events.TouchEvent.getTouches = function(evt) {
  var rev;
  var nativeEvt = evt.getBrowserEvent();
  if (hw.events.TouchEvent.hasTouch_) {
    // TODO(hedger): Returns a normalized event.
    if (nativeEvt['touches'] && nativeEvt['touches'][0]) {
      rev = nativeEvt['touches'];
    } else if (nativeEvt['changedTouches'] && nativeEvt['changedTouches'][0]) {
      rev = nativeEvt['changedTouches'];
    } else if (nativeEvt['targetTouches'] && nativeEvt['targetTouches'][0]) {
      rev = nativeEvt['targetTouches'];
    } else {
      rev = [nativeEvt];
    }
  } else {
    rev = [nativeEvt];
  }
  return /** @type {Array.<Event>} */ (rev);
};


/**
 * @return {Event}
 */
hw.events.TouchEvent.prototype.getTouch = function() {
  return this.touches_[0];
};


/**
 * @return {Array.<Event>}
 */
hw.events.TouchEvent.prototype.getTouches = function() {
  return this.touches_;
};


/**
 * @private
 */
hw.events.TouchEvent.prototype.initTouches_ = function() {
  this.touches_ = hw.events.TouchEvent.getTouches(this);
};
