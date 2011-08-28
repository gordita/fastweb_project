goog.provide('hw.events.EventType');

goog.require('goog.events');
goog.require('hw.config');


/**
 * @type {boolean}
 * @private
 */
hw.events.supportTouchEventType_ = hw.config.OPTIMIZE_FOR_MOBILE ||
  ('ontouchstart' in document);

/**
 * Constants for event names.
 * @enum {string}
 */
hw.events.EventType = {
  // Touch events
  TOUCHSTART : hw.events.supportTouchEventType_ ? 'touchstart' : 'mousedown',
  TOUCHEND : hw.events.supportTouchEventType_ ? 'touchend' : 'mouseup',
  TOUCHCANCEL : hw.events.supportTouchEventType_ ? 'touchcancel' : 'mouseup',
  TOUCHMOVE : hw.events.supportTouchEventType_ ? 'touchmove' : 'mousemove',
  ORIENTATION_CHANGE : hw.events.supportTouchEventType_ ? 'orientationchange' : 'resize',
  // Custom Events.
  LAYOUT_UPDATE : goog.events.getUniqueId('layout'),
  LOGIN : goog.events.getUniqueId('login'),
  LOGOUT : goog.events.getUniqueId('out'),
  SELECTCHANGE :  goog.events.getUniqueId('selectschange'),
  VIEWPORT_SIZE_CHANGE : goog.events.getUniqueId('viewportchange'),
  URL_UPDATE : goog.events.getUniqueId('urlupdate'),
  URL_DISPATCH : goog.events.getUniqueId('urldispatch')
};



