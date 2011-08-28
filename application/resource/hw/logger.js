goog.provide('hw.Logger');
goog.provide('hw.HtmlLogger');

goog.require('goog.userAgent');
goog.require('hw.config');
goog.require('tpl.CSS_NAMES');


/**
 * @type {Console}
 * @private
 */
hw.Logger.console_ = /** @type {Console} */(window['console']);


/**
 * @param {...*} var_args
 */
hw.Logger.log = function(var_args) {
  if (hw.config.USE_HTML_LOGGER) {
    hw.HtmlLogger.log.apply(null, arguments);
    return;
  }

  if (!hw.config.USE_NATIVE_LOGGER) {
    return;
  }

  hw.Logger.console_.log.apply(hw.Logger.console_, arguments);
};


/**
 * @param {...*} var_args
 */
hw.Logger.dir = function(var_args) {
  if (hw.config.USE_HTML_LOGGER) {
    hw.HtmlLogger.log.apply(null, arguments);
  }

  if (!hw.config.USE_NATIVE_LOGGER) {
    return;
  }

  hw.Logger.console_.dir.apply(hw.Logger.console_, arguments);
};

/**
 * @param {...*} var_args
 */
hw.Logger.error = function(var_args) {
  if (hw.config.USE_HTML_LOGGER) {
    hw.HtmlLogger.log.apply(null, arguments);
  }

  if (!hw.config.USE_NATIVE_LOGGER) {
    return;
  }

  hw.Logger.console_.error.apply(hw.Logger.console_, arguments);
};


/**
 * @param {string} msg
 * @param {Function} fn
 * @param {Object=} opt_this
 */
hw.Logger.profile = function(msg, fn, opt_this) {
  if (!hw.config.USE_NATIVE_LOGGER ||
    !hw.Logger.console_.profile ||
    !goog.userAgent.WEBKIT) {
    fn.call(opt_this);
    return;
  }

  var t1 = new Date();
  hw.Logger.console_.profile(msg);
  fn.call(opt_this);
  hw.Logger.console_.profileEnd();
  var t2 = new Date();
  hw.Logger.log(msg, 'time:', t2 - t1);
};

/**
 * @type {Element}
 * @private
 */
hw.HtmlLogger.logBody_ = null;

/**
 * @type {Array}
 * @private
 */
hw.HtmlLogger.logMsgs_ = [];

/**
 * @type {number}
 * @private
 */
hw.HtmlLogger.logCount_ = 1;


/**
 * @param {...*} var_args
 */
hw.HtmlLogger.log = function(var_args) {
  if (!hw.HtmlLogger.logBody_) {
    hw.HtmlLogger.createLogBody_();
  }
  var args = Array.prototype.slice.call(arguments, 0);
  hw.HtmlLogger.logMsgs_.unshift(hw.HtmlLogger.formatArgs_(args));
  if (hw.HtmlLogger.logMsgs_.length > 100) {
    hw.HtmlLogger.logMsgs_.pop();
  }
  hw.HtmlLogger.logBody_.innerHTML = hw.HtmlLogger.logMsgs_.join('');
};

/**
 * @param {Array} args
 * @return {string}
 */
hw.HtmlLogger.formatArgs_ = function(args) {
  return [
    '<div class="', tpl.CSS_NAMES.CSS_LOGGER_ITEM, '">',
    hw.HtmlLogger.logCount_++, '.',
    args.join(', '),
    '</div>'
  ].join('')
};

/**
 * @private
 */
hw.HtmlLogger.createLogBody_ = function() {
  var el = document.createElement('div');
  el.tabIndex = 1;
  el.className = tpl.CSS_NAMES.CSS_LOGGER;
  el.onclick = function() {
    el.style.maxHeight = el.style.maxHeight ?
      '' : '1000px';
  };

  document.documentElement.className +=
    ' ' + tpl.CSS_NAMES.CSS_LOGGER_ENABLED;

  document.body.insertBefore(el, document.body.firstChild);
  hw.HtmlLogger.logBody_ = el;
};