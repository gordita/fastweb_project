goog.provide('hw.ui.scroll.Env');

goog.require('goog.userAgent');
goog.require('goog.userAgent.product');


hw.ui.scroll.Env.math = Math;

/**
 * @const
 * @type {string}
 */
hw.ui.scroll.Env.vendor = goog.userAgent.WEBKIT ? 'webkit' :
  goog.userAgent.GECKO ? 'Moz' :
    goog.userAgent.OPERA ? 'O' : '';

/**
 * @const
 * @type {string}
 */
hw.ui.scroll.Env.transitionDelay = hw.ui.scroll.Env.vendor + 'TransitionDelay';

/**
 * @const
 * @type {string}
 */
hw.ui.scroll.Env.transitionProperty = hw.ui.scroll.Env.vendor +
  'TransitionProperty';

/**
 * @const
 * @type {string}
 */
hw.ui.scroll.Env.transitionDuration = hw.ui.scroll.Env.vendor +
  'TransitionDuration';


/**
 * @const
 * @type {string}
 */
hw.ui.scroll.Env.transformOrigin = hw.ui.scroll.Env.vendor +
  'TransformOrigin';

/**
 * @const
 * @type {string}
 */
hw.ui.scroll.Env.ransitionTimingFunction = hw.ui.scroll.Env.vendor +
  'TransitionTimingFunction';

/**
 * @const
 * @type {string}
 */
hw.ui.scroll.Env.transform = hw.ui.scroll.Env.vendor +
  'Transform';


/**
 * @const
 * @type {boolean}
 */
hw.ui.scroll.Env.has3d = 'styleMedia' in window &&
  window['styleMedia']['matchMedium']('(-webkit-transform-3d)');

/**
 * @const
 * @type {boolean}
 */
hw.ui.scroll.Env.hasTouch = 'ontouchstart' in window;


/**
 * @const
 * @type {boolean}
 */
hw.ui.scroll.Env.hasTransform =
  (hw.ui.scroll.Env.vendor + 'Transform') in document.documentElement.style;


/**
 * @const
 * @type {boolean}
 */
hw.ui.scroll.Env.isAndroid = goog.userAgent.product.ANDROID;


/**
 * @const
 * @type {boolean}
 */
hw.ui.scroll.Env.isIDevice = goog.userAgent.product.IPAD ||
  goog.userAgent.product.IPHONE;


/**
 * @const
 * @type {boolean}
 */
hw.ui.scroll.Env.isPlaybook = (/playbook/gi).test(navigator.appVersion);


/**
 * @const
 * @type {boolean}
 */
hw.ui.scroll.Env.hasTransitionEnd = hw.ui.scroll.Env.isIDevice ||
  hw.ui.scroll.Env.isPlaybook;


/**
 * @type {Function}
 * @private
 */
hw.ui.scroll.Env.nextFrame_ = (function() {
  return window['requestAnimationFrame']
    || window['webkitRequestAnimationFrame']
    || window['mozRequestAnimationFrame']
    || window['oRequestAnimationFrame']
    || window['msRequestAnimationFrame']
    || function(callback) {
    return window.setTimeout(callback, 1);
  }
})();


/**
 * @type {Function}
 */
hw.ui.scroll.Env.nextFrame = function(n) {
  return hw.ui.scroll.Env.nextFrame_.apply(window, arguments);
};


/**
 * @type {Function}
 * @private
 */
hw.ui.scroll.Env.cancelFrame_ = (function() {
  return window['cancelRequestAnimationFrame']
    || window['webkitCancelRequestAnimationFrame']
    || window['mozCancelRequestAnimationFrame']
    || window['oCancelRequestAnimationFrame']
    || window['msCancelRequestAnimationFrame']
    || window.clearTimeout
})();


/**
 * @type {Function}
 */
hw.ui.scroll.Env.cancelFrame = function(n) {
  hw.ui.scroll.Env.cancelFrame_.apply(window, arguments);
};


/**
 * @const
 * @type {string}
 */
hw.ui.scroll.Env.RESIZE_EV =
  'onorientationchange' in window ? 'orientationchange' : 'resize';


/**
 * @const
 * @type {string}
 */
hw.ui.scroll.Env.START_EV = hw.ui.scroll.Env.hasTouch ?
  'touchstart' : 'mousedown';


/**
 * @const
 * @type {string}
 */
hw.ui.scroll.Env.MOVE_EV = hw.ui.scroll.Env.hasTouch ?
  'touchmove' : 'mousemove';


/**
 * @const
 * @type {string}
 */
hw.ui.scroll.Env.END_EV = hw.ui.scroll.Env.hasTouch ?
  'touchend' : 'mouseup';

/**
 * @const
 * @type {string}
 */
hw.ui.scroll.Env.CANCEL_EV = hw.ui.scroll.Env.hasTouch ?
  'touchcancel' : 'mouseup';

/**
 * @const
 * @type {string}
 */
hw.ui.scroll.Env.WHEEL_EV = hw.ui.scroll.Env.vendor == 'Moz' ?
  'DOMMouseScroll' : 'mousewheel';


/**
 * @const
 * @type {string}
 */
hw.ui.scroll.Env.TRANSITION_END_EV = 'webkitTransitionEnd';


/**
 * @const
 * @type {string}
 */
hw.ui.scroll.Env.trnOpen = 'translate' + (hw.ui.scroll.Env.has3d ? '3d(' : '(');


/**
 * @const
 * @type {string}
 */
hw.ui.scroll.Env.trnClose = hw.ui.scroll.Env.has3d ? ',0)' : ')';


/**
 * @const
 * @type {string}
 */
hw.ui.scroll.Env.transitionTimingFunction = hw.ui.scroll.Env.vendor +
  'TransitionTimingFunction';