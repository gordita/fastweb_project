goog.provide('hw.config');

/** @define {string} */
hw.config.APP_ID = '133383393415225';

/** @define {string} */
hw.config.APP_SECRET = 'c4e4973212ec8cc85ed33fdbade7c324'

/** @define {boolean} */
hw.config.USE_HTML_LOGGER = false;

/** @define {boolean} */
hw.config.USE_NATIVE_LOGGER = true;

/** @define {boolean} */
hw.config.OPTIMIZE_FOR_MOBILE = false;

/** @define {boolean} */
hw.config.TARGET_ANDROID = false;

/** @define {boolean} */
hw.config.TARGET_IOS = false;

/** @define {boolean} */
hw.config.TARGET_CHROME = false;


/** @define {boolean} */
hw.config.CHECK_FB_PERMISSIONS_STRICT = false;

/** @define {number} */
hw.config.BUILD_TIME = 100;

/** @define {boolean} */
hw.config.USE_MOCK_FB_API = false;

/** @define {boolean} */
hw.config.USE_MOCK_DATA = !true;

////////////////////////////////////////////////////////////////////////////////
/** @type {string} */
hw.config.USER_AGENT_STRING = window.navigator.appVersion;

/** @type  {boolean} */
hw.config.IS_CHOME = hw.config.TARGET_CHROME ||
  (/chrome/ig).test(hw.config.USER_AGENT_STRING);


/** @type  {boolean} */
hw.config.IS_IOS = hw.config.TARGET_IOS ||
  (/iphone|ipad/ig).test(hw.config.USER_AGENT_STRING);

/** @type  {boolean} */
hw.config.IS_TOUCH_DEVICES = hw.config.IS_IOS ||
  (/android|iphone|ipad/ig).test(hw.config.USER_AGENT_STRING);

/** @type  {boolean} */
hw.config.USE_FACEWEB_LINK = hw.config.IS_IOS || hw.config.IS_CHOME;

/** @type  {boolean} */
hw.config.USE_LOCAL_STORAGE = false;


/** @type {boolean} */
hw.config.ENABLE_ERROR_ALERT = hw.config.TARGET_IOS || hw.config.TARGET_ANDROID;

/** @type {boolean} */
hw.config.ENABLE_SCRUBBER = hw.config.IS_IOS || hw.config.IS_CHOME;

/** @type {boolean} */
hw.config.ENABLE_HISTORY_PUSHSTATE =
  (hw.config.IS_IOS || hw.config.IS_CHOME) &&
    ('pushState' in window.history);

/** @type  {boolean} */
hw.config.ALLOW_PINCH_AND_ZOOM = hw.config.IS_IOS;

/** @type {boolean} */
hw.config.ENABLE_HIDE_ADDRESSBAR = hw.config.IS_IOS &&
  !(window.navigator['standalone']);

/** @type {boolean} */
hw.config.SUPPORT_ORIENTATION = hw.config.IS_TOUCH_DEVICES &&
  ('orientation' in window);

/** @type {boolean} */
hw.config.USE_CSS_TRANSITION = ('WebKitCSSMatrix' in window) &&
  ('m11' in new window['WebKitCSSMatrix']());

