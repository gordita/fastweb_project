goog.provide('hw.url.Navigator');

goog.require('goog.Uri');
goog.require('goog.array');
goog.require('goog.string');
goog.require('goog.userAgent');
goog.require('goog.userAgent.product');
goog.require('hw.config');
goog.require('hw.events.AppEventTarget');
goog.require('hw.events.EventType');
goog.require('hw.url.Dispatcher');

/**
 * @param {string|goog.Uri} url
 * @param {Window=} opt_window
 * @param {boolean=} opt_use_popup
 */
hw.url.Navigator.go = function(url, opt_window, opt_use_popup) {
  var win = opt_window || window;
  var targetUri = new goog.Uri(url);
  var currentUri = hw.url.Dispatcher.resolve(win);
  if (targetUri.getDomain() == 'facebook.com' ||
    goog.string.endsWith(targetUri.getDomain(), '.facebook.com') ||
    targetUri.getDomain() == currentUri.getDomain()) {
    if (targetUri.toString() == currentUri.toString()) {
      return;
    }
    targetUri.setDomain(currentUri.getDomain());
    targetUri.setScheme(currentUri.getScheme());
    targetUri.setPort(currentUri.getPort());

    // Forward params when possible.
    var targetQueryData = targetUri.getQueryData();
    var currentQueryData = currentUri.getQueryData();
    goog.array.forEach(currentQueryData.getKeys(), function(key) {
      if (!targetQueryData.get(key)) {
        targetQueryData.set(key, currentQueryData.get(key));
      }
    });

    targetUri.setQueryData(targetQueryData);

    if (hw.config.ENABLE_HISTORY_PUSHSTATE) {
      win.history['pushState']({}, '', targetUri.toString());
    } else {
      var uriStr = targetUri.toString();
      var path = uriStr.substr(uriStr.indexOf(targetUri.getPath()));
      win.location.hash = '!' + path;
    }

    hw.url.Navigator.previousUrl_ = currentUri;
    hw.events.AppEventTarget.updateLayout(hw.url.Navigator);
    return;
  }

  if (opt_use_popup) {
    win.open(targetUri.toString());
  } else {
    win.href = targetUri.toString();
  }
};


/**
 * @type {goog.Uri}
 * @private
 */
hw.url.Navigator.previousUrl_ = null;

/**
 * @return {goog.Uri}
 */
hw.url.Navigator.getPreviousUrl = function() {
  if (hw.url.Navigator.previousUrl_) {
    return hw.url.Navigator.previousUrl_.clone();
  }
  return null;
};
