goog.provide('hw.ApplicationStartUp');
goog.provide('hw.ApplicationStartUp.CustomError');


goog.require('goog.userAgent');
goog.require('goog.dom.classes');
goog.require('hw.Logger');
goog.require('hw.config');
goog.require('hw.dom.ViewportSizeMonitor');
goog.require('hw.ui.Chrome');


/**
 * @constructor
 */
hw.ApplicationStartUp = function() {
  this.start();
};

/**
 * @type {Window}
 * @private
 */
hw.ApplicationStartUp.prototype.window_ = window;

/**
 * @type {Document}
 * @private
 */
hw.ApplicationStartUp.prototype.document_ = document;


/**
 * Start.
 */
hw.ApplicationStartUp.prototype.start = function() {

  // TODO(hedger): Handle Errors with nice UI.
  if (hw.config.ENABLE_ERROR_ALERT) {
    goog.exportSymbol('Error', hw.ApplicationStartUp.CustomError);
    goog.exportSymbol(
      'Error.captureStackTrace',
      hw.ApplicationStartUp.CustomError.captureStackTrace);

    this.bindError_();
  }

  this.window_.onload = goog.bind(function() {
    this.window_.onload = null;
    hw.dom.ViewportSizeMonitor.getInstance().hideAddressBar();
    var mod = new hw.ui.Chrome();
    mod.render(this.document_.getElementById('page'));
    goog.dom.classes.remove(document.documentElement, 'startup-background');
  }, this);
};


/**
 * @private
 */
hw.ApplicationStartUp.prototype.bindError_ = function() {
  var win = this.window_;

  win.addEventListener('error', function(error) {
    var target = error.target;
    hw.Logger.log('error', error);
    var tagName = String(target.tagName).toLowerCase();
    if (tagName == 'img' || tagName == 'script') {
      return;
    }
    var lines = [error, '\n'];
    for (var key in error) {
      lines.push(key, ':', error[key], '\n');
    }
    alert(lines.join(''));
  }, true);
};


/**
 * @param {*} info
 * @constructor
 */
hw.ApplicationStartUp.CustomError = function(info) {
  var caller = arguments.callee.caller;
  var callers = [];

  while (caller && !caller.__HW_TRACED__) {
    caller.__HW_TRACED__ = true;
    hw.Logger.error(caller, caller.toString());
    callers.push(caller);
    caller = caller.caller;
  }

  while (callers.length) {
    caller = callers.pop();
    delete caller.__HW_TRACED__;
  }
  return new hw.ApplicationStartUp.CustomError.native_(info);
};


/**
 * @type {Function}
 * @private
 */
hw.ApplicationStartUp.CustomError.native_ = Error;


/**
 * @param {...*} var_args
  */
hw.ApplicationStartUp.CustomError.captureStackTrace =
  hw.ApplicationStartUp.CustomError.native_.captureStackTrace ||
    goog.nullFunction;

goog.exportSymbol('startup', function() {
  new hw.ApplicationStartUp();
});