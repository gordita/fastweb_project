goog.provide('hw.ui.scroll.Options');

goog.require('hw.ui.scroll.Env');
goog.require('goog.userAgent');
goog.require('goog.userAgent.product');

/**
 * @constructor
 */
hw.ui.scroll.Options = function() {
};

/** @type {boolean} */
hw.ui.scroll.Options.has3d = hw.ui.scroll.Env.has3d;


/** @type {boolean} */
hw.ui.scroll.Options.prototype.hScroll = true;

/** @type {boolean} */
hw.ui.scroll.Options.prototype.vScroll = true;

/** @type {boolean} */
hw.ui.scroll.Options.prototype.bounce = true;

/** @type {boolean} */
hw.ui.scroll.Options.prototype.bounceLock = false;

/** @type {boolean} */
hw.ui.scroll.Options.prototype.momentum = true;

/** @type {boolean} */
hw.ui.scroll.Options.prototype.lockDirection = true;

/** @type {boolean} */
hw.ui.scroll.Options.prototype.useTransform = true;

/** @type {boolean} */
hw.ui.scroll.Options.prototype.useTransition = false;

/** @type {number} */
hw.ui.scroll.Options.prototype.topOffset = 0;

/** @type {boolean} */
hw.ui.scroll.Options.prototype.checkDOMChanges = false;    // Experimental

// Scrollbar
/** @type {boolean} */
hw.ui.scroll.Options.prototype.hScrollbar = true;


/** @type {boolean} */
hw.ui.scroll.Options.prototype.vScrollbar = true;


/** @type {boolean} */
hw.ui.scroll.Options.prototype.fixedScrollbar =
  hw.ui.scroll.Env.isAndroid;

/** @type {boolean} */
hw.ui.scroll.Options.prototype.hideScrollbar =
  hw.ui.scroll.Env.isIDevice;


/** @type {boolean} */
hw.ui.scroll.Options.prototype.fadeScrollbar =
  hw.ui.scroll.Env.isIDevice && hw.ui.scroll.Env.has3d;


/** @type {string} */
hw.ui.scroll.Options.prototype.scrollbarClass = '';

/** @type {boolean} */
hw.ui.scroll.Options.prototype.zoom = false;

/** @type {number} */
hw.ui.scroll.Options.prototype.zoomMin = 1;

/** @type {number} */
hw.ui.scroll.Options.prototype.zoomMax = 4;

/** @type {number} */
hw.ui.scroll.Options.prototype.doubleTapZoom = 2;

/** @type {string} */
hw.ui.scroll.Options.prototype.wheelAction = 'scroll';

// Snap
/** @type {boolean|string} */
hw.ui.scroll.Options.prototype.snap = false;

/** @type {number} */
hw.ui.scroll.Options.prototype.snapThreshold = 1;

// Events
/** @type {Function} */
hw.ui.scroll.Options.prototype.onRefresh = null;

/** @type {Function} */
hw.ui.scroll.Options.prototype.onBeforeScrollStart = function (e) {
  e.preventDefault();
};

/** @type {Function} */
hw.ui.scroll.Options.prototype.onAnimationEnd = null;

/** @type {Function} */
hw.ui.scroll.Options.prototype.onScrollStart = null;

/** @type {Function} */
hw.ui.scroll.Options.prototype.onBeforeScrollMove = null;

/** @type {Function} */
hw.ui.scroll.Options.prototype.onScrollMove = null;

/** @type {Function} */
hw.ui.scroll.Options.prototype.onBeforeScrollEnd = null;

/** @type {Function} */
hw.ui.scroll.Options.prototype.onScrollEnd = null;

/** @type {Function} */
hw.ui.scroll.Options.prototype.onTouchEnd = null;

/** @type {Function} */
hw.ui.scroll.Options.prototype.onDestroy = null;

/** @type {Function} */
hw.ui.scroll.Options.prototype.onZoomStart = null;

/** @type {Function} */
hw.ui.scroll.Options.prototype.onZoom = null;

/** @type {Function} */
hw.ui.scroll.Options.prototype.onZoomEnd = null;