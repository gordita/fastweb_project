goog.provide('hw.events.AppEventTarget');

goog.require('goog.events.Event');
goog.require('goog.events.EventTarget');
goog.require('hw.Logger');
goog.require('hw.events.EventType');


/**
 * @extends {goog.events.EventTarget}
 * @constructor
 */
hw.events.AppEventTarget = function() {
  goog.base(this);
};
goog.inherits(hw.events.AppEventTarget, goog.events.EventTarget);
goog.addSingletonGetter(hw.events.AppEventTarget);


/**
 * @inheritDoc
 */
hw.events.AppEventTarget.prototype.dispatchEvent  =function(evt){
  hw.Logger.log('hw.events.AppEventTarget:dispatchEvent', evt);
  return goog.base(this, 'dispatchEvent', evt);
};


/**
 * @param {Object} target
 */
hw.events.AppEventTarget.updateLayout = function(target) {
  var evt = new goog.events.Event(hw.events.EventType.LAYOUT_UPDATE, target);
  hw.events.AppEventTarget.getInstance().dispatchEvent(evt);
};


/**
 * @param {Object} target
 */
hw.events.AppEventTarget.login = function(target) {
  var evt = new goog.events.Event(hw.events.EventType.LOGIN, target);
  hw.events.AppEventTarget.getInstance().dispatchEvent(evt);
};


/**
 * @param {Object} target
 */
hw.events.AppEventTarget.logout = function(target) {
  var evt = new goog.events.Event(hw.events.EventType.LOGOUT, target);
  hw.events.AppEventTarget.getInstance().dispatchEvent(evt);
};