goog.provide('hw.events.Event');

goog.require('goog.events.Event');
goog.require('goog.math.Size');


/**
 * A base class for event objects, so that they can support preventDefault and
 * stopPropagation.
 *
 * @param {string} type Event Type.
 * @param {Object=} opt_target
 * @constructor
 * @extends {goog.events.Event}
 */
hw.events.Event = function(type, opt_target) {
  goog.base(this, type, opt_target);
};
goog.inherits(hw.events.Event, goog.events.Event);

/**
 * @type {number}
 */
hw.events.Event.prototype.index = -1;


/**
 * @type {Object}
 */
hw.events.Event.prototype.data = null;


/**
 * @type {*}
 */
hw.events.Event.prototype.value = null;


/**
 * @type {goog.math.Size}
 */
hw.events.Event.prototype.size = null;